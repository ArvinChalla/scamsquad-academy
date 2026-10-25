// Checks the tricky cases a normal play-through misses (see README.md in this folder).
// Usage: node edge.mjs <out folder>
import { chromium } from "playwright-core";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Where things are. The game must be running on a local server first (see README.md).
// Set CHROME to your Chrome or Chromium if it is somewhere else.
const HERE = dirname(fileURLToPath(import.meta.url));
const LESSONS_DIR = join(HERE, "..", "..", "data", "lessons");
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:8792/v2/index.html";
const fails = [], passes = [];
const check = (ok, what) => (ok ? passes : fails).push(what);
const browser = await chromium.launch({ executablePath: CHROME });
const errors = [];

async function fresh(view, opts = {}) {
  const ctx = await browser.newContext({ viewport: view, reducedMotion: opts.reduce ? "reduce" : "no-preference", colorScheme: opts.dark ? "dark" : "light" });
  if (opts.blockStorage) await ctx.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
    Object.defineProperty(window, "sessionStorage", { get() { throw new Error("blocked"); } });
  });
  const page = await ctx.newPage();
  page.on("pageerror", e => errors.push(e.message));
  return { ctx, page };
}
const go = (page, hash) => page.evaluate(h => { location.hash = h; }, hash).then(() => page.waitForTimeout(250));
const overflow = page => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

// Finish one lesson quickly, all right, by reading the data.
async function playLesson(page, ageId, world, id) {
  const lessons = (await import(pathToFileURL(join(LESSONS_DIR, ageId + "-" + world + ".js")).href)).LESSONS;
  const lesson = lessons.find(l => l.id === id);
  await go(page, "#/age/" + ageId + "/" + world + "/" + id);
  for (let c = 0; c < lesson.learn.length; c++) { await page.click("#continue"); await page.waitForTimeout(80); }
  for (const q of lesson.quiz) {
    if (q.type === "choice") await page.locator(".answer", { hasText: q.answers.find(a => a.right).text.replace(/<[^>]+>/g, "") }).first().click();
    if (q.type === "realfake") await page.locator(".answer", { hasText: q.answer === "real" ? "Real" : "Fake" }).click();
    if (q.type === "tap") await page.click('button.part[data-i="' + q.picture.parts.findIndex(p => p.right) + '"]');
    if (q.type === "spot") for (let i = 0; i < q.picture.parts.length; i++) if (q.picture.parts[i].flag) await page.click('button.part[data-i="' + i + '"]');
    if (q.type === "order") for (let i = 0; i < q.steps.length; i++) await page.click('.order-step[data-i="' + i + '"]');
    await page.click("#next"); await page.waitForTimeout(60);
  }
}

// 1. Overflow at 320 and 390 on main screens
for (const w of [320, 390]) {
  const { ctx, page } = await fresh({ width: w, height: 700 });
  await page.goto(BASE + "#/"); await page.waitForTimeout(300);
  check(await overflow(page) <= 0, w + "px home: no sideways scroll (" + await overflow(page) + ")");
  await page.evaluate(() => localStorage.setItem("scamsquad-v2", JSON.stringify({ hello: { explore: true, squad: true } })));
  for (const age of ["explore", "squad"]) {
    await page.goto(BASE + "#/age/" + age + "/path"); await page.waitForTimeout(300);
    check(await overflow(page) <= 0, w + "px " + age + " worlds: no sideways scroll (" + await overflow(page) + ")");
    await page.screenshot({ path: OUT + "/" + w + "-" + age + "-worlds.png", fullPage: true });
    await go(page, "#/age/" + age + "/path/gaming");
    check(await overflow(page) <= 0, w + "px " + age + " path: no sideways scroll (" + await overflow(page) + ")");
  }
  await ctx.close();
}

// 2. Within-world unlocking, locked toast, Spot Check exits, leave sheet, Back from quiz
{
  const { ctx, page } = await fresh({ width: 390, height: 844 });
  await page.goto(BASE + "#/"); await page.evaluate(() => localStorage.setItem("scamsquad-v2", JSON.stringify({ hello: { squad: true } })));
  await go(page, "#/age/squad/path/money");
  check(await page.locator("a.node.next").count() === 1, "every world's first lesson is open (money has a next lesson)");
  await page.locator("button.node.locked").first().click(); await page.waitForTimeout(200);
  const toast = await page.locator("#toast").innerText().catch(() => "");
  check(/Finish/.test(toast), "locked lesson says what to finish first: " + toast);
  await page.screenshot({ path: OUT + "/locked-toast.png" });

  await playLesson(page, "squad", "gaming", "s-free-robux");
  check(await page.locator(".results").count() === 1, "lesson played to results");
  check(await page.locator(".certificate-news").count() === 0, "one lesson does not unlock the certificate");
  await page.screenshot({ path: OUT + "/results-first.png", fullPage: true });
  await page.click("#done"); await page.waitForTimeout(250);
  check(await page.locator(".nav-dot").count() === 0, "no Me dot before the certificate unlocks");
  await go(page, "#/age/squad/me");
  check(await page.locator(".certificate-locked").count() === 1 && await page.locator("#first-name").count() === 0, "Me shows a locked certificate with progress");
  await page.screenshot({ path: OUT + "/me-locked.png", fullPage: true });

  // Spot Check: X and Continue go back to Practice
  await go(page, "#/age/squad/practice");
  await page.click("#go"); await page.waitForTimeout(250);
  check(await page.locator(".quiz-question").count() === 1, "Spot Check starts");
  await page.click("#quit"); await page.waitForTimeout(250);
  check(await page.locator(".practice-card").count() === 1, "Spot Check X goes back to Practice");
  await page.click("#go"); await page.waitForTimeout(250);
  await page.locator(".answer, button.part, .order-step").first().click(); await page.waitForTimeout(150);
  await page.click("#quit"); await page.waitForTimeout(200);
  check(await page.locator("#ask").count() === 1, "leaving after an answer asks first");
  await page.screenshot({ path: OUT + "/leave-sheet.png" });
  await page.click("#ask-stay"); await page.waitForTimeout(150);
  check(await page.locator(".quiz-question").count() === 1, "Keep going stays in the quiz");
  await page.keyboard.press("Escape"); await page.waitForTimeout(150);
  check(await page.locator("#ask").count() === 1, "Escape asks to leave too");
  await page.click("#ask-leave"); await page.waitForTimeout(250);
  check(await page.locator(".practice-card").count() === 1, "Leave goes to Practice");

  // Back from a quiz goes to the path, not a learn card
  await go(page, "#/age/squad/path/gaming");
  await page.click("a.node.next", { force: true }); await page.waitForTimeout(200);
  while (await page.locator("#continue").count()) { await page.click("#continue"); await page.waitForTimeout(80); }
  await page.goBack(); await page.waitForTimeout(300);
  check(/path\/gaming$/.test(page.url()), "Back from the quiz goes to the path: " + page.url().split("#")[1]);
  await ctx.close();
}

// 3. Storage blocked: progress still counts during the visit, teen gate passes
{
  const { ctx, page } = await fresh({ width: 390, height: 844 }, { blockStorage: true });
  await page.goto(BASE + "#/age/squad"); await page.waitForTimeout(300);
  await page.click("#ready"); await page.waitForTimeout(200);
  await playLesson(page, "squad", "gaming", "s-free-robux");
  await page.click("#done"); await page.waitForTimeout(250);
  check(await page.locator("a.node.done").count() === 1, "storage blocked: finished lesson still shows as done");
  await go(page, "#/age/crew");
  const label = await page.locator('label[for="sum"]').innerText();
  const [, a, b] = label.match(/(\d+) × (\d+)/);
  await page.fill("#sum", String(a * b)); await page.click("#enter"); await page.waitForTimeout(250);
  check(await page.locator(".world-card").count() === 7, "storage blocked: teen gate lets you in, straight to topics");
  await ctx.close();
}

// 4. Gate remembered on the device
{
  const { ctx, page } = await fresh({ width: 390, height: 844 });
  await page.goto(BASE + "#/age/crew"); await page.waitForTimeout(250);
  const label = await page.locator('label[for="sum"]').innerText();
  const [, a, b] = label.match(/(\d+) × (\d+)/);
  await page.fill("#sum", String(a * b)); await page.click("#enter"); await page.waitForTimeout(250);
  const p2 = await ctx.newPage(); await p2.goto(BASE + "#/age/crew"); await p2.waitForTimeout(300);
  check(await p2.locator("#sum").count() === 0 && await p2.locator(".world-card").count() === 7, "teen gate is remembered on the device");
  // Teen hints are free, once per question
  await p2.evaluate(() => { location.hash = "#/age/crew/gaming/c-cracked-repack/play"; }); await p2.waitForTimeout(300);
  const chip = await p2.locator("#hint").innerText().catch(() => "");
  check(/Free/.test(chip), "teen hint chip says Free: " + chip.replace(/\s+/g, " "));
  await p2.screenshot({ path: OUT + "/crew-quiz-hint.png", fullPage: true });
  await ctx.close();
}

// 5. Hints with reduced motion: a lasting ring, no double charge
{
  const { ctx, page } = await fresh({ width: 390, height: 844 }, { reduce: true });
  await page.goto(BASE + "#/"); await page.evaluate(() => localStorage.setItem("scamsquad-v2", JSON.stringify({ hello: { explore: true }, coins: 100 })));
  const lessons = (await import(pathToFileURL(join(LESSONS_DIR, "explore-gaming.js")).href)).LESSONS;
  const lesson = lessons[0];
  const spotAt = lesson.quiz.findIndex(q => q.type === "spot");
  await go(page, "#/age/explore/gaming/" + lesson.id + "/play");
  for (let i = 0; i < spotAt; i++) {
    const q = lesson.quiz[i];
    await page.locator(".answer, button.part, .order-step").first().click(); await page.waitForTimeout(80);
    if (q.type === "order") for (let k = 0; k < 4; k++) { const b = page.locator(".order-step:not([disabled])").first(); if (await b.count()) await b.click(); }
    await page.click("#next"); await page.waitForTimeout(80);
  }
  const before = await page.locator("#coins").innerText();
  await page.click("#hint"); await page.waitForTimeout(100);
  await page.click("#hint"); await page.waitForTimeout(100);
  const after = await page.locator("#coins").innerText();
  check(await page.locator(".part.hinted").count() === 1, "hint shows a lasting Look here ring with reduced motion");
  check(parseInt(before.replace(/\D/g, "")) - parseInt(after.replace(/\D/g, "")) === 15, "two hint taps charge once: " + before + " -> " + after);
  await page.screenshot({ path: OUT + "/hint-ring.png", fullPage: true });
  // the ✕ is not tappable in a spot question
  check(await page.locator("button.role-close").count() === 0, "spot question: the ✕ is not a button");
  await ctx.close();
}

// 6. Real/Fake buttons at 320, order ends in order, tips with a future clock
{
  const { ctx, page } = await fresh({ width: 320, height: 640 });
  await page.goto(BASE + "#/"); await page.evaluate(() => localStorage.setItem("scamsquad-v2", JSON.stringify({ hello: { squad: true, explore: true }, firstVisit: Date.now() + 3 * 86400000, tipOrders: {} })));
  const lessons = (await import(pathToFileURL(join(LESSONS_DIR, "squad-gaming.js")).href)).LESSONS;
  const lesson = lessons[0];
  await go(page, "#/age/squad/gaming/" + lesson.id + "/play");
  for (const q of lesson.quiz) {
    if (q.type === "realfake") {
      await page.locator(".answer").first().click(); await page.waitForTimeout(100);
      const texts = await page.locator(".answers.two .answer").allInnerTexts();
      check(texts.every(t => (t.match(/✅/g) || []).length <= 1), "Real/Fake shows one tick at most: " + texts.join(" | ").replace(/\n/g, " "));
      const lines = await page.locator(".answers.two .answer-text").evaluateAll(els => els.map(e => Math.round(e.getBoundingClientRect().height)));
      check(lines.every(h => h < 40), "Real/Fake words stay on one line at 320 (" + lines + ")");
      await page.screenshot({ path: OUT + "/320-realfake.png", fullPage: true });
    } else if (q.type === "order") {
      await page.click('.order-step[data-i="1"]'); await page.waitForTimeout(100);
      const order = await page.locator(".order-step").evaluateAll(els => els.map(e => e.dataset.i).join(""));
      check(order === q.steps.map((_, i) => i).join(""), "order question ends with steps in the right order: " + order);
    } else {
      await page.locator(".answer, button.part").first().click(); await page.waitForTimeout(80);
      if (q.type === "spot") for (let i = 0; i < q.picture.parts.length; i++) if (q.picture.parts[i].flag) { const b = page.locator('button.part[data-i="' + i + '"]:not([disabled])'); if (await b.count()) await b.click(); }
    }
    check(await overflow(page) <= 0, "320px question " + q.type + ": no sideways scroll");
    await page.click("#next"); await page.waitForTimeout(80);
  }
  await go(page, "#/age/explore/tips");
  check(await page.locator(".tip-big").count() === 1, "tips work when the clock was ahead on the first visit");
  await ctx.close();
}

// 7. Help Back with no history stays in the game; dark mode path screenshot
{
  const { ctx, page } = await fresh({ width: 390, height: 844 }, { dark: true });
  await page.goto("about:blank"); await page.goto(BASE + "#/help"); await page.waitForTimeout(300);
  const back = page.locator("#back");
  if (await back.count()) { await back.click(); await page.waitForTimeout(300); }
  check(page.url().startsWith(BASE), "Help Back stays in the game: " + page.url());
  await page.evaluate(() => localStorage.setItem("scamsquad-v2", JSON.stringify({ hello: { explore: true } })));
  await page.goto(BASE + "#/age/explore/path/gaming"); await page.waitForTimeout(300);
  await page.screenshot({ path: OUT + "/dark-path.png" });
  await page.goto(BASE + "#/age/crew/help"); await page.waitForTimeout(300);
  await ctx.close();
}

console.log(passes.length + " passed");
console.log(errors.length ? "PAGE ERRORS:\n" + [...new Set(errors)].join("\n") : "no page errors");
console.log(fails.length ? fails.length + " FAILED:\n- " + fails.join("\n- ") : "all edge checks passed");
await browser.close();
