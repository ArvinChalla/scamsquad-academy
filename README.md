# ScamSquad Academy

A free browser game that teaches children aged 6 to 18 to recognize online scams,
manipulation and malware.

**Play it:** https://arvinchalla.github.io/scamsquad-academy/

## What it is

Twenty-four real situations taken from things that actually happen online, split
across three age tracks:

| Track | Ages | Covers |
|---|---|---|
| Explorers | 6 to 9 | Free-stuff tricks, keeping private things private, passwords, unkind messages, secrets from parents |
| Squad | 10 to 13 | Fake currency sites, trust trades, panic phishing, QR account theft, cheat malware, being left out, location sharing |
| Crew | 14 to 18 | Photo blackmail scams, AI-made fake images, moving stolen money, betting game items, AI companions, doxxing, stolen logins, pump scams |

## Design choices

- **Nobody can lose.** A wrong answer gives a clue and another go. There are no
  penalties and no timers. Shame is the main reason children do not tell an adult
  when something has gone wrong, so the game never makes a player feel foolish.
- **Nothing is collected.** No accounts, no email, no analytics, no server.
  Scores and any first name typed for a certificate stay in the browser.
- **The teen track is gated.** An honest description of the content plus a reading
  and arithmetic check, so a young child cannot wander into it.
- **Built for the adult too.** Printable conversation prompts for a parent and a
  one-lesson plan per track for a teacher.

## Why these topics

Research into what existing safety programs cover found that four current threats
had no child-facing educational material anywhere: AI companion chatbots, betting
game items, being recruited to move stolen money, and malware delivered through
game cheats. Those are all in here.

The full project record, including sources and the evidence on whether safety
education works at all, is in `findings.html`.

## Files

- `index.html` is the game
- `findings.html` is the project record
- `threat-register.html` is the underlying catalogue of 56 threats to under-18s

Each file is self-contained. No build step, no dependencies, no server.

## Sources

Figures come from NCMEC, the FBI, the Internet Watch Foundation, Thorn, the FTC,
the Cyberbullying Research Center, Common Sense Media and the American
Psychological Association. Every one is listed and linked inside the pages.
Current as of August 2026.

## Author

Built by Arvin Challa, a high school student in Texas. Not a company, nothing to
buy, no sponsor.
