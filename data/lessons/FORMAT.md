# How to write a ScamSquad v2 lesson

This guide is for anyone adding or changing a lesson. Read it top to bottom once, then use it as
a checklist.

## Where lessons live

Every lesson lives in a file named `<age>-<world>.js` in this folder. For example,
`squad-gaming.js` holds the lessons for ages 10 to 13 in the Gaming world. Every age group and
world already has a file, so a new lesson goes into the list in the right one:

```js
export const LESSONS = [ { ...lesson 1... }, { ...lesson 2... }, { ...lesson 3... } ];
```

When you are done, check your work from the `Div App` folder:

```
node v2/tools/check-content.mjs
```

It must print `0 problems`. It checks the counts and word limits below, the picture rules, the
phone numbers, the dashes and the words banned for ages 6 to 9. It can't check that a lesson is
true, fair or easy to read. That part is up to you.

## Ages and worlds

| age id | ages | buddy | words |
|---|---|---|---|
| `explore` | 6 to 9 | Pip the owl | Only words a 6 year old knows. Say "your grown-up". |
| `squad` | 10 to 13 | Byte the robot | Easy words, short sentences. |
| `crew` | 14 to 18 | Shield | Plain, direct, never babyish. |

The worlds, in path order. Some have a different name for one age group (set in
`data/categories.js`):

| world id | name | other names |
|---|---|---|
| `gaming` | Gaming | |
| `messages` | Messages and calls | "Messages" for `explore` |
| `money` | Money and shopping | |
| `people` | People and feelings | "People and pressure" for `crew` |
| `securing` | Securing your account | "Keep your game safe" for `explore`, "Account security" for `crew` |
| `realfake` | Real or fake? | |
| `hooks` | Apps that hook you | "Games that keep you playing" for `explore` |

## A lesson

| field | rule |
|---|---|
| `id` | Unique in the whole game. Starts with the age letter, `e-`, `s-` or `c-`, then kebab-case (small letters and numbers joined by `-`). Example: `s-free-robux`. |
| `icon` | One emoji. |
| `title` | Up to 5 words. |
| `minutes` | 2 to 5. |
| `learn` | 3 to 5 learn cards (see below). |
| `quiz` | 4 to 6 questions (see below), with at least 2 different question types. |
| `rule` | The one thing to remember. Up to 10 words. |
| `sources` | At least one `{ name, url }`, with an `https://` address. Official pages first: FTC, FBI/IC3, CISA, NCMEC, the game or app company's help pages. |

Do not add an "Already did it?" card at the end. Children play this before something happens,
not during it, and the Help screen (one tap away everywhere) covers "you are not in trouble" and
what to do. Only write that card when it is the point of the lesson (for example "I already
clicked it" or Take It Down).

## A learn card

| field | rule |
|---|---|
| `icon` | One emoji. |
| `title` | Up to 6 words. |
| `text` | Up to 30 words (up to 18 for `explore`). Put the key words in `<b>bold</b>`. |
| `keep` | Optional. The line to remember, up to 12 words. |
| `picture` | Optional. One of the pictures below. |

## Pictures

A picture is either a fake screen or a list (`steps` or `checklist`). Lists are for learn cards
only, never for questions.

A fake screen is built from `parts`. A part is `{ role, text, flag?, why?, right? }`:

- `role` says which piece of the screen it is. Each kind allows only the roles in the table.
- `text` is what the part says. Every part needs it.
- `flag: true` marks a red flag. Every flagged part needs a `why`, up to 20 words. On a learn
  card, red flags are circled in red with a number, and the whys are listed under the picture
  with the same numbers, so the child sees each reason.
- `right: true` marks the one safe part in a `tap` question.

| kind | roles, in order | settings | example use |
|---|---|---|---|
| `site` | `address` first, then any of `big`, `line`, `field`, `button` | | a fake website |
| `chat` | `them`, `me` | needs `sender`. Optional `note`, `app` | a game chat or DM |
| `text` | `them`, `me` | needs `sender` (a phone number or name). Optional `time` (the line above the messages) | a text message |
| `email` | `from`, `subject`, then `line`, `button` | | an email |
| `popup` | `close` (text "✕"), `title`, `line`, `button` | | a pop-up a trickster made, over a game or video |
| `system` | `title`, `line`, `link`, `button` | optional `app`, like `"Windows"` | a real computer warning, like Windows SmartScreen |
| `call` | `line` (what the caller says), `me` (what you say) | needs `caller` and `label` (`"Incoming call"`, `"Voicemail"` or `"Call"`). Optional `number` | a phone call or voicemail, shown as a call screen with a transcript |
| `post` | `media` (what the photo or video shows, in words), `caption`, `link`, `comment`, `button` | needs `app` and `author`. Optional `handle`, `video: true` | a social post, a creator's video, a video ad |
| `payment` | `amount` (like `"+$25.00"`), `from`, `note`, `line`, `button` | needs `app`: a made-up name like `"PayFriend"`, or the real app's name as plain text | a payment app screen |
| `notification` | `app` first (each `app` part starts a new banner), then `title`, `line` | optional `time` (the lock screen clock) | phone notifications on the lock screen |
| `forum` | `post` | needs `site`. Every post part needs `name`, optional `time` | a game forum or comment thread |
| `game` | `title`, `line`, `price`, `button`, `close` (text "Close") | needs `game`: a made-up game name, never "Pip" | the game's OWN screen: its shop, a reward, a level done. Its Close is real |
| `steps` | none: `items: [{ icon, text }]`, numbered | | "what happens if you fall for it" (learn cards only) |
| `checklist` | none: `items: [{ icon, text }]` | needs `color: "red"` or `"green"` | red flags, or what to do (learn cards only) |

More picture rules:

- Chat and text parts may have `name` (who said it, for group chats) and `time` (like
  `"11:42 pm"`). Times show escalation: a message at 2 am feels different.
- Use `game` for anything the real game shows (its shop, a prize for a level). Use `popup` only
  for a box a trickster made. They look different on purpose, so children can tell them apart.
- On a screen a trickster made, never teach that a button on it is safe (its ✕, "Leave",
  "Close"). The safe move is to stop and tell a parent, or another adult you trust, or to close
  the whole tab or app. The game's own screens, like a shop box inside the game, can use their
  real ✕.
- Phone numbers: only 555-0100 to 555-0199 with an ordinary area code, like
  `+1 (202) 555-0142`. Never a toll-free code (800, 888, 877, 866, 855, 844 or 833), because
  those numbers can belong to real businesses.
- Fake web addresses must be made up (`free-robux-gen2026.net`). Check with `nslookup` that the
  domain is not registered. No real brand inside the registered part (`gift-claim-2026.net`). A
  brand in front, like `roblox.com.gift-claim-2026.net`, is fine when that is the lesson.
- Real game names appear only as plain text, never as logos.
- How to read an address, in these exact words everywhere: "Skip the https://. Find the next /.
  The owner is the last two parts just before it."

## Quiz questions

Every question has `type`, `question` (up to 20 words, up to 12 for `explore`) and `why` (one
line shown after the answer, right or wrong, up to 25 words).

| type | extra fields | what the player does |
|---|---|---|
| `choice` | `answers: [{ text, right? }]`: 2 to 4 answers (2 or 3 for `explore`), exactly one with `right: true`. Optional `picture` (a fake screen). | Taps one answer. One try only. |
| `realfake` | `picture` (required), `answer: "real"` or `"fake"` | Taps Real or Fake. |
| `spot` | `picture` of any fake screen kind, with 2 to 4 parts flagged and at least 2 other parts not flagged. The ✕ (`close`) can't be tapped here, so it is never flagged and does not count. The question must say the number, like "Tap the 3 red flags." | Taps every red flag. A normal part says "Not one of the red flags. Keep looking." One stray tap is forgiven. |
| `tap` | `picture` of a fake screen with exactly one part `right: true` | Taps the one safe thing, like the small ✕ on a pop-up. |
| `order` | `steps`: 3 or 4 short strings, in the right order | Taps the steps in order. |

### Writing good questions and answers

- Answer text: up to 12 words (up to 6 for `explore`).
- Wrong answers must be things a child might really think, not silly ones. Make them about as
  long as the right one.
- Do not let the right answer always be the one that names a grown-up. Some right answers are
  "Say no" or "Do not tap". Some wrong answers can name an adult in a wrong way ("Ask a grown-up
  in the game chat").
- Real or fake questions are neutral ("Real or fake?"). Never name the safe sender in the
  question. Let the picture carry the clue.
- Spot Check mixes questions from different lessons, so every question must make sense alone:
  no names from a learn card that the question does not show.
- Order steps: only one order may be fair. When telling an adult is a step, it is always step 1.
  Steps never carry their own order words ("Next", "Last", "Then", "Only then").
- The steps for "I typed my password on a fake site" are always: Tell a parent, or another adult
  you trust / Change the password in the real app / Sign out of other devices / Turn on 2-step
  verification.

## Rules for every word

1. No em dashes or en dashes anywhere. Use a full stop or a comma.
2. Short sentences. One idea each.
3. Name a parent first, in exactly these words: "tell a parent, or another adult you trust".
   Never "a parent" or "Mom" alone, because not every child can tell a parent. For `explore`,
   say "your grown-up".
4. Show the scam on a fake screen whenever you can. Do not just describe it.
5. Patterns only. Never a word-for-word script a scammer could copy and use.
6. No numbers or statistics unless the source is in `sources` and you opened that page.
7. No sexual content, no descriptions of abuse, no self-harm. Topics like photo threats are
   covered as patterns plus "you are not in trouble" and where to get help.
8. Never say the game makes anyone safe or "works".
9. `explore` must not use: private, vault, trusted, account(s), pop-up or popup, identify,
   reveal, post, verify, scam, scams, scammer, scammers (say "trick" and "trickster"). Say "your
   game" instead of "account". Do not say "keep it secret", because secrets from family are the
   warning sign.
10. US spelling: practice, color, favorite, recognize. Say "2-step verification".
