# The tests

Four scripts that play the game in a real browser and check it.

| Script | What it checks |
|---|---|
| `play-all.mjs` | Plays every lesson in every age group the way a child would: learn cards, every question (one wrong answer on purpose), practicing the missed one, Spot Check, Me, the certificate (and that it prints on one page), tips or news, and Help. Also checks that nothing scrolls sideways. |
| `edge.mjs` | The tricky cases: very small phones, locked lessons, leaving a quiz half way, the Back button, a browser that blocks saving, the teen quick check, hints when the device asks for less motion, Real or Fake buttons at 320px, and a clock that was wrong on the first visit. |
| `check.mjs` | "Check it with me" for every age group: the link on Help, all No, a mix with Not sure, Back, Check another, that the result never says "safe", and that nothing is saved. |
| `axe.mjs` | Accessibility: color contrast, labels, headings, and everything a screen reader needs, on every kind of screen, in light and dark mode. It also checks the colors of every fake screen in every lesson, and each picture on the home page. |

## Running them

1. Start the game on your computer (see the main README), so it opens at http://localhost:8792/v2/.
2. Install the two helpers once, in this folder:
   ```
   npm install playwright-core axe-core
   ```
3. Run a script from this folder:
   ```
   node play-all.mjs shots phone
   node edge.mjs edge-shots
   node check.mjs
   node axe.mjs
   ```
   `play-all.mjs` takes a folder for its screenshots and a size: `phone`, `tablet` or `desktop`.

Each one ends by printing "all checks passed" (or "TOTAL violations: 0" for axe), or a list of what
failed. The scripts use Google Chrome. If Chrome is not in its usual place, set `CHROME` to its path
first.

The lesson checker is separate and needs no browser: from the folder above v2, run
`node v2/tools/check-content.mjs`. It must print `0 problems`.
