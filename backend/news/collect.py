"""
========================================================================
backend/news/collect.py
Collects scam news for the game's "This week" page (ages 10 to 18) from
official sources only, and writes DRAFTS for a grown-up to read.
Nothing goes live from here. To publish, run approve.py (see README.md).

How to run it, from this folder (any Python 3 works, nothing to install):
  python collect.py                    write the drafts in this folder
  python collect.py --out SOME_FOLDER  write them somewhere else (for a test run)

How it works:
  1. Reads each official feed in SOURCES (RSS from the FTC, FBI and others).
  2. Keeps dated items from the last DAYS days that are scam warnings,
     match a scam type in cards.json, and link to the source's own
     official site. Drops court news, grown-up topics and anything not
     right for children.
  3. Gives each item the human-written words for its scam type from
     cards.json, for ages 10 to 13 and 14 to 18. No AI writes advice.
  4. Writes pending.json (the drafts) and review.html (a page to read them).

In this file, in order:
  Settings          how far back to look, and the official sources
  Filters           the word lists that decide what a kids' page can show
  Reading feeds     downloading a feed and reading its items
  Matching          official links, and which scam type an item is about
  Drafts            turning an item into a draft
  The review page   review.html
  main()            runs it all
========================================================================
"""

import json
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree


# ---------- Settings ----------

HERE = Path(__file__).parent   # this folder, where cards.json lives
DAYS = 45                      # how far back to look
MAX_ITEMS = 6                  # how many drafts at most

# Official sources only. Each one is an RSS feed (a list of news items a
# website publishes for programs to read).
# "domain" is the official site. An item's link must be on it, or on a
# part of it like consumer.ftc.gov for ftc.gov, or the item is skipped.
# Some sites block automated requests from some networks (the FTC from
# some computers, CISA from others). When one fails, the others still work.
SOURCES = [
    {"id": "ftc_alerts", "name": "FTC consumer alert", "domain": "ftc.gov", "url": "https://consumer.ftc.gov/blog/gd-rss.xml"},
    {"id": "ftc_press", "name": "FTC press release", "domain": "ftc.gov", "url": "https://www.ftc.gov/feeds/press-release-consumer-protection.xml"},
    {"id": "ic3_psa", "name": "FBI IC3 public service announcement", "domain": "ic3.gov", "url": "https://www.ic3.gov/PSA/RSS"},
    {"id": "uspis", "name": "US Postal Inspection Service", "domain": "uspis.gov", "url": "https://www.uspis.gov/news/press-release/feed"},
    {"id": "cfpb", "name": "Consumer Financial Protection Bureau", "domain": "consumerfinance.gov", "url": "https://www.consumerfinance.gov/about-us/newsroom/feed/"},
    {"id": "cisa", "name": "CISA", "domain": "cisa.gov", "url": "https://www.cisa.gov/news.xml"},
    {"id": "nc_doj", "name": "North Carolina Attorney General", "domain": "ncdoj.gov", "url": "https://ncdoj.gov/feed/?cat=7"},
    {"id": "pa_ag", "name": "Pennsylvania Attorney General", "domain": "attorneygeneral.gov", "url": "https://www.attorneygeneral.gov/feed/?cat=38"},
    {"id": "ca_ag", "name": "California Attorney General", "domain": "oag.ca.gov", "url": "https://oag.ca.gov/news/feed"},
    {"id": "az_ag", "name": "Arizona Attorney General", "domain": "azag.gov", "url": "https://www.azag.gov/rss.xml"},
]


# ---------- Filters ----------
# Each one is a regular expression: a pattern of words to look for.
# \b means "the edge of a word", so "scam" does not match inside "scampi".

# An item must be a warning about a scam, not just any news.
SCAM_WORDS = re.compile(r"\b(scam|scams|scammer|scammers|fraud|fraudulent|phishing|smishing|impersonat\w*|imposter|warn\w*|alert|fake)\b", re.IGNORECASE)

# Court and arrest news tells nobody what to watch for, so it is skipped.
# It can also name the people involved, which a kids' page must not do.
# The list leaves out "arrest", "jail", "charges" and "trial", because
# warnings use them too ("they threaten arrest", "hidden charges", "free trial").
COURT_NEWS = re.compile(
    r"\b(sentenced|sentencing|pleads?|pleaded|guilty|indicted|indictment|convicted|charged|arrested|"
    r"sues|sued|lawsuit|settlement|settles|verdict|prison|takes action|public comment|redress|refunds?|returns more|"
    r"sends more|annual report|judgment|restitution|injunction|defendants?|accused|alleged|allegedly|stand trial|jury|"
    r"extradit\w*|seiz\w*|forfeit\w*|secures|obtains|filed a complaint|files a complaint|consent order)\b",
    re.IGNORECASE,
)

# Grown-up topics that do not belong on a kids' page.
ADULT_ONLY = re.compile(
    r"medicare|health insurance|open enrollment|retire|mortgage|franchis|farm equipment|small business|older adults|"
    r"seniors|tax preparer|hospital|dealership|contact lens|cash advance|immigration|notario|porch pirat|student loan|"
    r"timeshare|home repair|contractor|debt relief|credit repair|utility",
    re.IGNORECASE,
)

# Items with these words are never shown to children, whatever the source.
NOT_FOR_KIDS = re.compile(
    r"suicid|died|death|killed|murder|rape|sexual abuse|child sexual|csam|porn|explicit|overdose|drug|weapon|firearm|"
    r"nude|naked|kidnap|abduct|traffick|exploitation|assault|shooting|hostage|bomb|terror|abuse",
    re.IGNORECASE,
)

# Every scam type in cards.json, most specific first. When an item matches
# more than one type, the first one in this list wins.
PRIORITY = ["sextortion", "takedown", "ai", "toll", "giftcard", "crypto", "job", "techsupport", "gaming", "impersonation", "package", "shopping", "textscam"]


# ---------- Reading feeds ----------

# Downloads a feed. Returns the raw bytes, or b"" (nothing) if it fails.
# Bytes, not text, so the XML reader can use the feed's own encoding.
def download_feed(url):
    request = urllib.request.Request(url, headers={
        "User-Agent": "ScamSquadNews/1.0 (+kids scam safety game)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
    })
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read()
    except Exception as error:   # one broken feed must not stop the others
        print("  could not read", url, "->", error, file=sys.stderr)
        return b""


# Text without HTML tags, HTML codes like &amp;, or extra spaces.
def plain_text(text):
    without_tags = re.sub(r"<[^>]+>", " ", text or "")
    return re.sub(r"\s+", " ", unescape(without_tags)).strip()


# The date of a feed item, or None if it has no date we can read.
def read_date(when):
    try:
        date = parsedate_to_datetime(when) if when else None
    except (TypeError, ValueError):
        date = None
    # The FTC writes dates like "October 6, 2026 | 12:47PM".
    if not date and when:
        try:
            date = datetime.strptime(when.split("|")[0].strip(), "%B %d, %Y")
        except ValueError:
            date = None
    # Some feeds leave out the time zone. Treat those dates as UTC.
    if date and date.tzinfo is None:
        date = date.replace(tzinfo=timezone.utc)
    return date


# Every item in an RSS feed with a title and an https link.
# Each item is a dictionary: title, link, date, title_words (the title in
# lower case) and words (the title and description in lower case).
def read_items(feed):
    items = []
    if not feed:
        return items
    try:
        root = ElementTree.fromstring(feed)
    except ElementTree.ParseError:   # not a feed we can read
        return items
    for node in root.iter("item"):
        title = plain_text(node.findtext("title"))
        link = (node.findtext("link") or "").strip()
        description = plain_text(node.findtext("description"))
        date = read_date(node.findtext("pubDate"))
        if title and link.startswith("https://"):
            items.append({
                "title": title,
                "link": link,
                "date": date,
                "title_words": title.lower(),
                "words": (title + " " + description).lower(),
            })
    return items


# ---------- Matching ----------

# True if the link is a plain https address on the source's own site.
# A link with spaces, quotes or angle brackets in it is never trusted.
def link_is_official(link, domain):
    if not link.startswith("https://") or re.search(r"[\s\"'<>\\]", link):
        return False
    host = (urlparse(link).hostname or "").lower()
    return host == domain or host.endswith("." + domain)


# True if the item is a scam warning that is fine for a kids' page.
def is_kids_scam_warning(words):
    if NOT_FOR_KIDS.search(words) or COURT_NEWS.search(words) or ADULT_ONLY.search(words):
        return False
    return bool(SCAM_WORDS.search(words))


# True if one of the card's keywords is in the words as a whole word, so
# "Tolleson" does not count as "toll". A plural counts too, so "deepfake"
# also finds "deepfakes".
def has_keyword(card, words):
    for keyword in card["keywords"]:
        pattern = r"(?<![a-z])" + re.escape(keyword.strip().lower()) + r"(?:s|es)?(?![a-z])"
        if re.search(pattern, words):
            return True
    return False


# The scam type an item is about, or None.
# First try: keywords in the official title, most specific type first.
# Second try: keywords anywhere in the item, but only for types whose
# keywords are not common words (types marked titleOnly are skipped).
def scam_type(item, types):
    for type_id in PRIORITY:
        if has_keyword(types[type_id], item["title_words"]):
            return type_id
    for type_id in PRIORITY:
        card = types[type_id]
        if not card.get("titleOnly") and has_keyword(card, item["words"]):
            return type_id
    return None


# ---------- Drafts ----------

# The age groups a card has words for. Most cards are for both "squad"
# (10 to 13) and "crew" (14 to 18). A card can limit itself with "ages".
def ages_for(card):
    return [age for age in card.get("ages", ["squad", "crew"]) if age in card]


# One draft: where the item came from, plus our own words for each age group.
# "officialTitle" and "type" are only for the reviewer. approve.py removes them.
def make_draft(source, item, type_id, card, ages):
    short_name = re.sub(r"[^a-z0-9]+", "-", item["title"].lower())[:50].strip("-")
    draft = {
        "id": source["id"] + "-" + short_name,
        "date": item["date"].strftime("%d %b %Y"),
        "category": card["category"],
        "icon": card["icon"],
        "source": source["name"],
        "url": item["link"],
        "officialTitle": item["title"],
        "type": type_id,
        "ages": ages,
    }
    for age in ages:
        draft[age] = dict(card[age])
    return draft


# Reads every source and returns the drafts, one story per scam type.
def collect_drafts(types):
    since = datetime.now(timezone.utc) - timedelta(days=DAYS)
    drafts = []
    types_used = set()
    for source in SOURCES:
        print("Reading", source["name"])
        for item in read_items(download_feed(source["url"])):
            if not item["date"] or item["date"] < since:   # undated items could be old
                continue
            if not link_is_official(item["link"], source["domain"]):
                continue
            if not is_kids_scam_warning(item["words"]):
                continue
            type_id = scam_type(item, types)
            if not type_id or type_id in types_used:
                continue
            card = types[type_id]
            ages = ages_for(card)
            if not ages:
                continue
            types_used.add(type_id)
            drafts.append(make_draft(source, item, type_id, card, ages))
    return drafts


# ---------- The review page ----------

# A simple page that shows each draft next to the official item.
def review_page(pending):
    sections = []
    for draft in pending["items"]:
        words_by_age = ""
        for age in draft["ages"]:
            age_name = "10 to 13" if age == "squad" else "14 to 18"
            words = draft[age]
            words_by_age += "<p><b>Ages {}:</b> {}<br>{}<br><i>Do this:</i> {}</p>".format(
                age_name, escape(words["title"]), escape(words["summary"]), escape(words["doThis"]))
        if "squad" not in draft["ages"]:
            words_by_age += "<p><i>Not shown to ages 10 to 13.</i></p>"
        sections.append(
            "<section><h2>{} {} ({})</h2><p>Official: <a href='{}'>{}</a> ({}, {})</p>{}<p><code>{}</code></p></section>".format(
                draft["icon"], escape(draft["category"]), escape(draft["type"]),
                escape(draft["url"]), escape(draft["officialTitle"]), escape(draft["source"]), escape(draft["date"]),
                words_by_age, escape(draft["id"])))
    return ("<!doctype html><meta charset='utf-8'><title>ScamSquad news to approve</title>"
            "<style>body{font-family:system-ui;max-width:760px;margin:20px auto;padding:0 16px}section{border:1px solid #ccc;padding:12px;margin:12px 0}</style>"
            "<h1>ScamSquad news to approve</h1><p>Made " + escape(pending["made"]) + ". "
            "Approve all with <code>python approve.py</code>, or drop some with <code>python approve.py --drop ID ID</code>.</p>"
            + "".join(sections))


# ---------- main() ----------

# Reads the words, collects the drafts, and writes pending.json and review.html.
def main():
    out = Path(sys.argv[sys.argv.index("--out") + 1]) if "--out" in sys.argv else HERE
    out.mkdir(parents=True, exist_ok=True)

    # Stop early if a scam type in PRIORITY has no words in cards.json.
    types = json.loads((HERE / "cards.json").read_text(encoding="utf-8"))["types"]
    missing = [type_id for type_id in PRIORITY if type_id not in types]
    if missing:
        sys.exit("cards.json has no words for: " + ", ".join(missing))

    drafts = collect_drafts(types)[:MAX_ITEMS]
    pending = {"made": datetime.now(timezone.utc).strftime("%d %b %Y %H:%M UTC"), "items": drafts}
    (out / "pending.json").write_text(json.dumps(pending, ensure_ascii=False, indent=2), encoding="utf-8")
    (out / "review.html").write_text(review_page(pending), encoding="utf-8")
    print(len(drafts), "drafts written to", out / "pending.json", ". Read them in review.html, then run approve.py.")


if __name__ == "__main__":
    main()
