# ScamSquad news

The "This week" page for ages 10 to 18 shows real scam warnings from official sources, written
for each age group. A grown-up approves every batch before it goes live.

## How it works

1. `collect.py` reads official feeds only: FTC, FBI IC3, US Postal Inspection Service, CFPB,
   CISA, and the North Carolina, Pennsylvania, California and Arizona attorneys general.
2. It keeps dated items from the last 45 days that are scam warnings and match a scam type in
   `cards.json`. The item's link must be on that source's own official site. It skips court
   and arrest news (which can name the people involved), grown-up topics (Medicare, mortgages,
   immigration and so on) and anything not right for children.
3. Common words (like "text" or "delivery") only count when they are in the official title.
   This stops a story about one thing getting the advice card for another.
4. For each item it uses the human-written words in `cards.json` for ages 10 to 13 and 14 to 18,
   with a link to the official page. No AI writes the advice. One story per scam type, up to 6.
   Some types (photo threats, image removal) are for 14 to 18 only, and the game never shows
   them to 10 to 13.
5. It writes `pending.json` and `review.html`. Nothing is published.
6. `approve.py` copies approved items into `../../data/news.json`, which the game reads.
   With no drafts, or the same news as last time, it changes nothing.

Only Python's standard library is used, so there is nothing to install. Any Python 3 works.

## The files

| File | What it is |
|---|---|
| `collect.py` | Reads the official feeds and writes the drafts. |
| `approve.py` | Copies the approved drafts into `data/news.json`. |
| `cards.json` | The human-written words for each scam type, and the keywords that match it. |
| `pending.json`, `review.html` | The drafts, made by `collect.py`. Not saved in git (see `.gitignore`). |

## Run it by hand

From this folder. On some computers the command is `python3` or `py` instead of `python`.

```
python collect.py           # make drafts, then open review.html
python approve.py           # publish every draft
python approve.py --drop ID # publish all except some (ids are in review.html)
```

For a test run that touches nothing in the project:

```
python collect.py --out C:\some\scratch\folder
python approve.py --pending C:\some\scratch\folder\pending.json --news C:\some\scratch\folder\news.json --pr-body C:\some\scratch\folder\pr-body.md
```

## Run it every week, with an email to approve

`.github/workflows/news.yml` runs `collect.py` every Monday on GitHub. If there is new news, it
opens a pull request with the new `data/news.json`. The pull request description lists every
item: the official title, source, date and link, the scam type it matched, and the exact words
each age group will see. Read each one, open the official page, and check it matches.

- **Approve:** merge the pull request. The site then publishes as usual.
- **Drop one item:** delete it from `data/news.json` in the pull request, then merge.
- **Skip the week:** close the pull request.

GitHub emails the repository's watchers about the pull request. To get the email, watch the
repository on GitHub (Watch, then All activity, or Custom with Pull requests).

## Two settings to set up once

1. **Let the workflow open pull requests.** On GitHub: Settings, Actions, General, Workflow
   permissions. Tick "Allow GitHub Actions to create and approve pull requests". Without it,
   the workflow fails at the last step.
2. **Stop unapproved news showing on a preview address.** If the site is on Cloudflare Pages,
   Cloudflare builds a public preview of every branch, including the `news-...` branches,
   before anyone approves them. In Cloudflare: Workers and Pages, the ScamSquad project,
   Settings, Builds, Branch control. Set preview branches to "None", or add `news-*` to the
   excluded branches.

## Editing the words

Change the words for a scam type in `cards.json`. Keep them short, no em dashes or en dashes, and always
"tell a parent, or another adult you trust". To add a scam type, add it to `cards.json` and to
`PRIORITY` in `collect.py`. If its keywords are common words, set `"titleOnly": true`.

## Notes

- Some official sites block automated requests from some networks. On the computer this was
  built on, the FTC worked but CISA answered "403 Forbidden" to the collector, so CISA items may
  never appear. The other sources still work when one fails.
- Official sources rarely write about children, so some weeks have only one or two items, or
  none. That is fine: the page shows the tip of the week, and "No new warnings this week".
