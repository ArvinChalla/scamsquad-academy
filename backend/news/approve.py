"""
========================================================================
backend/news/approve.py
Publishes the news drafts a grown-up has read. It copies the approved
drafts from pending.json (made by collect.py) into ../../data/news.json,
which the game's "This week" page reads. Then publish the site as usual.

How to run it, from this folder (any Python 3 works, nothing to install):
  python approve.py                    approve every draft in pending.json
  python approve.py --drop ID ID       approve all except the listed ids
  python approve.py --pr-body FILE     also write a pull request description
                                       that lists every item for review
  python approve.py --pending FILE     read drafts from FILE (for test runs)
  python approve.py --news FILE        write to FILE instead of data/news.json
  python approve.py --allow-empty      publish even with no items (clears the news)

Safety rules:
  - With no drafts it changes nothing, so a quiet week (or every feed
    failing) can never wipe the news that is live. Use --allow-empty to
    clear the news on purpose.
  - If the drafts are the same as the news already live, it changes
    nothing, so no pull request is opened.

In this file, in order:
  Reading the command line   the flags above
  The pull request           the description a reviewer reads on GitHub
  main()                     picks the drafts and writes news.json
========================================================================
"""

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).parent   # this folder, where pending.json lives
FLAGS = {"--drop", "--pr-body", "--pending", "--news", "--allow-empty"}
AGE_NAMES = {"squad": "Ages 10 to 13", "crew": "Ages 14 to 18"}


# ---------- Reading the command line ----------

# The value after a flag, like FILE in "--news FILE". Returns default when
# the flag is missing. If the flag is there but its file name is missing,
# the script stops: guessing could overwrite the real news file by mistake.
def option(name, default=None):
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv) and sys.argv[i + 1] not in FLAGS:
            return sys.argv[i + 1]
        if name in ("--news", "--pending"):
            sys.exit(name + " needs a file name after it, like: " + name + " test-news.json")
    return default


# Every id listed after --drop, up to the next flag.
def dropped_ids():
    if "--drop" not in sys.argv:
        return set()
    ids = []
    for word in sys.argv[sys.argv.index("--drop") + 1:]:
        if word in FLAGS:
            break
        ids.append(word)
    return set(ids)


# ---------- The pull request ----------

# Text that is safe inside the pull request description. Any HTML tag
# shows as plain text instead of working, and "|" becomes "/", because
# Markdown can read "|" as part of a table.
def safe_text(text):
    return str(text).replace("<", "&lt;").replace(">", "&gt;").replace("|", "/").strip()


# A pull request description (in Markdown, GitHub's simple text format)
# that shows the reviewer everything: each official item, the scam type it
# matched, and the exact words each age group will see.
def pr_body(drafts):
    lines = [
        "Weekly scam news for the \"This week\" page. **Nothing is live until this is merged.**",
        "",
        "For each item: open the official page, check it really is about the scam our words describe,",
        "and that the page is fine for the ages listed. To drop an item, delete it from",
        "`data/news.json` in this pull request. To skip the whole week, close this pull request.",
        "",
    ]
    for number, draft in enumerate(drafts, 1):
        lines += [
            "### " + str(number) + ". " + safe_text(draft.get("officialTitle", "(no title)")),
            "",
            "- Source: " + safe_text(draft["source"]),
            "- Date: " + safe_text(draft["date"]),
            "- Official page: " + safe_text(draft["url"]),
            "- Matched scam type: `" + safe_text(draft.get("type", "?")) + "`",
            "- Shown to: " + ", ".join(AGE_NAMES.get(age, age) for age in draft["ages"]),
            "",
        ]
        for age in draft["ages"]:
            words = draft[age]
            lines += [
                "**" + AGE_NAMES.get(age, age) + " will see:**",
                "",
                "> **" + safe_text(words["title"]) + "**  ",
                "> " + safe_text(words["summary"]) + "  ",
                "> Do this: " + safe_text(words["doThis"]),
                "",
            ]
        if "squad" not in draft["ages"]:
            lines += ["Not shown to ages 10 to 13.", ""]
    lines += ["Drafts come from official sources only. The words come from `backend/news/cards.json`."]
    return "\n".join(lines) + "\n"


# ---------- main() ----------

# Picks the approved drafts and writes news.json, unless nothing would change.
def main():
    pending_file = Path(option("--pending", HERE / "pending.json"))
    news_file = Path(option("--news", HERE.parent.parent / "data" / "news.json"))
    pending = json.loads(pending_file.read_text(encoding="utf-8"))
    drop = dropped_ids()
    drafts = [draft for draft in pending["items"] if draft["id"] not in drop]

    if not drafts and "--allow-empty" not in sys.argv:
        print("No drafts to publish. news.json is unchanged.")
        return

    # The game shows our words, with a link to the official page. The
    # official title and the matched type are only for the reviewer.
    items = []
    for draft in drafts:
        items.append({key: value for key, value in draft.items() if key not in ("officialTitle", "type")})

    # The news that is live now. None if there is no news file yet, or it can't be read.
    try:
        live = json.loads(news_file.read_text(encoding="utf-8")).get("items", [])
    except (OSError, ValueError):
        live = None
    if live == items:
        print("Same news as before. news.json is unchanged.")
        return

    news = {
        "note": "Approved news. Made by backend/news/approve.py.",
        "updated": datetime.now(timezone.utc).strftime("%d %b %Y"),
        "items": items,
    }
    news_file.write_text(json.dumps(news, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(len(items), "items written to", news_file)

    body_file = option("--pr-body")
    if body_file:
        Path(body_file).write_text(pr_body(drafts), encoding="utf-8")
        print("Pull request description written to", body_file)


if __name__ == "__main__":
    main()
