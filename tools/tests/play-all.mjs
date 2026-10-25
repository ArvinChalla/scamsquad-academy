// Plays EVERY lesson in every age group, the way a child would, and checks each step.
// Usage: node play-all.mjs <screenshot folder> [phone|tablet|desktop]
import { chromium } from "playwright-core";
import { pathToFileURL, fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import fs from "node:fs";

const OUT = process.argv[2];
const SIZE = process.argv[3] || "phone";
const VIEW = { phone: { width: 390, height: 844 }, tablet: { width: 820, height: 1180 }, desktop: { width: 1366, height: 900 } }[SIZE];
const BASE = "http://localhost:8792/v2/index.html";
// Where things are. The game must be running on a local server first (see README.md).
// Set CHROME to your Chrome or Chromium if it is somewhere else.
const LESSONS = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data", "lessons") + path.sep;
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const AGES = ["explore", "squad", "crew"];
const WORLDS = ["gaming", "messages", "money", "people", "securing", "realfake", "hooks"];
const fails = [];
const check = (ok, what) => { if (!ok) fails.push(what); };
const plain = html => String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
fs.mkdirSync(OUT, { recursive: true });

// Load the lesson data, so the test knows the right answers.
const data = {};
for (const a of AGES) {
  data[a] = [];
  for (const w of WORLDS) {
    const mod = await import(pathToFileURL(LESSONS + a + "-" + w + ".js").href + "?t=" + Date.now());
    mod.LESSONS.filter(l => !l.soon).forEach(l => data[a].push({ world: w, lesson: l }));
  }
}

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: VIEW, deviceScaleFactor: 1, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", e => errors.push(e.message));
page.on("console", m => { if (m.type() === "error" && !/favicon|news\.json/.test(m.text())) errors.push(m.text()); });
const wait = ms => page.waitForTimeout(ms);
const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const shot = async (name, full = true) => page.screenshot({ path: path.join(OUT, SIZE + "-" + name + ".png"), fullPage: full });
let shots = 0;

async function answer(q, makeMistake) {
  if (q.type === "choice") {
    const target = makeMistake ? q.answers.find(a => !a.right) : q.answers.find(a => a.right);
    await page.locator(".answer", { hasText: plain(target.text) }).first().click();
  } else if (q.type === "realfake") {
    const pick = makeMistake ? (q.answer === "real" ? "Fake" : "Real") : (q.answer === "real" ? "Real" : "Fake");
    await page.locator(".answer", { hasText: pick }).first().click();
  } else if (q.type === "tap") {
    const idx = makeMistake ? q.picture.parts.findIndex(p => !p.right) : q.picture.parts.findIndex(p => p.right);
    await page.click('button.part[data-i="' + idx + '"]');
  } else if (q.type === "spot") {
    if (makeMistake) { const n = q.picture.parts.findIndex(p => !p.flag); await page.click('button.part[data-i="' + n + '"]'); }
    for (let i = 0; i < q.picture.parts.length; i++) if (q.picture.parts[i].flag) await page.click('button.part[data-i="' + i + '"]');
  } else if (q.type === "order") {
    const order = makeMistake ? [1, 0] : q.steps.map((_, i) => i);
    for (const i of order) { const b = page.locator('.order-step[data-i="' + i + '"]'); if (await b.isEnabled()) await b.click(); }
  }
  await page.waitForSelector("#next", { timeout: 4000 });
}

for (const age of AGES) {
  await page.goto(BASE + "#/");
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto(BASE + "#/age/" + age); await wait(250);

  if (age === "crew") {   // the quick sum before 14 to 18
    const label = await page.locator('label[for="sum"]').innerText();
    const [, a, b] = label.match(/(\d+) × (\d+)/);
    await page.fill("#sum", "1"); await page.click("#enter");
    check((await page.locator("#sum-error").innerText()).length > 0, "crew: wrong sum shows an error");
    await page.fill("#sum", String(a * b)); await page.click("#enter"); await wait(200);
  }
  if (age !== "crew") {   // teens skip the hello: passing the quick check counts as it
    check(await page.locator("#ready").count() === 1, age + ": hello screen");
    if (shots < 40) { await shot(age + "-01-hello", false); shots++; }
    await page.click("#ready"); await wait(250);
  }
  check(await page.locator(".world-card").count() === 7, age + ": 7 world cards");
  if (shots < 40) { await shot(age + "-02-worlds"); shots++; }

  let lessonNo = 0;
  for (const { world, lesson } of data[age]) {
    lessonNo++;
    // Go to this lesson's world; the lesson must be the next one.
    await page.evaluate(h => { location.hash = h; }, "#/age/" + age + "/path/" + world); await wait(200);
    const nextSel = age === "crew" ? "a.course-row.next" : "a.node.next";
    const href = await page.locator(nextSel).first().getAttribute("href").catch(() => null);
    check(href && href.endsWith("/" + lesson.id), age + "/" + lesson.id + ": is the next lesson (found " + href + ")");
    if (lessonNo === 1 && shots < 40) { await shot(age + "-03-world"); shots++; }
    await page.locator(nextSel).first().click(); await wait(150);

    // Learn cards
    for (let c = 0; c < lesson.learn.length; c++) {
      check(await overflow() <= 0, age + "/" + lesson.id + " card " + (c + 1) + ": no sideways scroll");
      if (lessonNo === 1 && shots < 40) { await shot(age + "-04-learn-" + (c + 1)); shots++; }
      await page.click(".bottom-bar .button"); await wait(120);
    }
    // Questions: one mistake on the first non-spot question after question 1
    // (spot questions forgive a stray tap), to test the practice flow.
    const wrongOne = lesson.quiz.findIndex((q, i) => i >= 1 && q.type !== "spot");
    for (let i = 0; i < lesson.quiz.length; i++) {
      const q = lesson.quiz[i];
      const shown = plain(await page.locator(".quiz-question").innerText());
      check(shown === plain(q.question), age + "/" + lesson.id + " q" + (i + 1) + ": shows the right question");
      await answer(q, i === wrongOne);
      check(await overflow() <= 0, age + "/" + lesson.id + " q" + (i + 1) + ": no sideways scroll");
      if (lessonNo <= 2 && shots < 40) { await shot(age + "-05-" + lesson.id + "-q" + (i + 1)); shots++; }
      await page.click("#next"); await wait(120);
    }
    const score = await page.locator(".results h1").innerText();
    check(score === (lesson.quiz.length - 1) + " of " + lesson.quiz.length + " right", age + "/" + lesson.id + ": score is " + score);
    // Fix the missed one every time: a badge needs every question right once.
    if (lessonNo === 1 && shots < 40) { await shot(age + "-06-results"); shots++; }
    await page.click("#practice"); await wait(150);
    await answer(lesson.quiz[wrongOne], false); await page.click("#next"); await wait(150);
    check((await page.locator(".results h1").innerText()) === "1 of 1 right", age + "/" + lesson.id + ": practice the missed one");
    if (lessonNo === 1 && shots < 40) { await shot(age + "-06b-practice-results"); shots++; }
    await page.click(".bottom-bar a.button"); await wait(150);
  }

  // Practice, Me, certificate, tips or news, help
  await page.evaluate(h => { location.hash = h; }, "#/age/" + age + "/practice"); await wait(200);
  if (data[age].length) {
    await page.click("#go"); await wait(150);
    check(await page.locator(".quiz-question").count() === 1, age + ": Spot Check starts");
    await page.evaluate(h => { location.hash = h; }, "#/age/" + age + "/practice"); await wait(150);
  }
  await shot(age + "-07-practice");
  await page.evaluate(h => { location.hash = h; }, "#/age/" + age + "/me"); await wait(200);
  await shot(age + "-08-me");
  if (data[age].length) {
    await page.fill("#first-name", "");
    await page.click("#make-certificate");
    check(await page.locator("#certificate").count() === 0, age + ": certificate needs a name");
    await page.fill("#first-name", "Sam"); await page.click("#make-certificate");
    await page.waitForSelector("#certificate", { timeout: 8000 });
    check((await page.locator(".certificate-name").innerText()).trim() === "Sam", age + ": certificate shows the name");
    await wait(300);
    await shot(age + "-09-certificate");
    await page.evaluate(() => { window.print = () => {}; });
    await page.click("#print-certificate");
    check(await page.locator("#print-root #certificate").count() === 1, age + ": print copy made");
    const pdf = await page.pdf({ format: "Letter", landscape: true, preferCSSPageSize: true });
    await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
    await wait(300);
    check(await page.locator("#print-root").count() === 0, age + ": print copy removed");
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    check(pages === 1, age + ": certificate prints on 1 page (got " + pages + ")");
  }
  await page.evaluate(h => { location.hash = h; }, "#/age/" + age + (age === "explore" ? "/tips" : "/news")); await wait(400);
  await shot(age + "-10-" + (age === "explore" ? "tips" : "news"));
  await page.evaluate(h => { location.hash = h; }, "#/age/" + age + "/help"); await wait(200);
  await shot(age + "-11-help");
  check(await overflow() <= 0, age + ": help no sideways scroll");
  console.log(age + ": played " + data[age].length + " lessons");
}

await page.goto(BASE + "#/grown-ups"); await wait(300); await shot("12-grownups");
await page.goto(BASE + "#/help"); await wait(200); await shot("13-help-pick-age");
await page.goto(BASE + "#/"); await wait(200); await shot("14-home");

console.log(errors.length ? "PAGE ERRORS:\n" + [...new Set(errors)].join("\n") : "no page errors");
console.log(fails.length ? fails.length + " FAILED CHECKS:\n- " + fails.slice(0, 60).join("\n- ") : "all checks passed");
await browser.close();
