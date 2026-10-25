import { chromium } from "playwright-core";
import { createRequire } from "node:module";
// Set CHROME to your Chrome or Chromium if it is somewhere else.
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
// axe-core is the accessibility checker. It is found wherever npm installed it.
const AXE = createRequire(import.meta.url).resolve("axe-core/axe.min.js");
const BASE = "http://localhost:8792/v2/index.html";
const browser = await chromium.launch({ executablePath: CHROME });
const report = {};

// Everything runs twice: once with the device in light mode, once in dark mode.
for (const scheme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", colorScheme: scheme, bypassCSP: true });
  async function scan(name) {
    await page.waitForTimeout(250);
    await page.addScriptTag({ path: AXE });
    const r = await page.evaluate(async () => (await axe.run(document, { resultTypes: ["violations"] })).violations.map(v => v.id + " (" + v.impact + ", " + v.nodes.length + "): " + v.nodes[0].target.join(" ")));
    report[scheme + " " + name] = r;
  }
  const go = async h => { await page.evaluate(x => { location.hash = x; }, h); };
  await page.goto(BASE + "#/"); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto(BASE + "#/");

  // The home page picture changes, so check each one
  const heroCount = await page.locator(".hero-dot").count();
  for (let i = 0; i < heroCount; i++) {
    await page.click('.hero-dot[data-show="' + i + '"]');
    await scan("home picture " + (i + 1));
  }
  await go("#/help"); await scan("help-pick");
  await go("#/grown-ups"); await scan("grownups");
  await go("#/age/squad"); await scan("hello");
  await page.click("#ready"); await scan("worlds");
  await go("#/age/squad/path/gaming"); await scan("world-road");
  await go("#/age/squad/gaming/s-free-robux"); await scan("learn");
  await go("#/age/squad/gaming/s-free-robux/play"); await scan("quiz-spot");
  await page.click("#hint"); await page.waitForTimeout(100);
  for (const i of [0,1,3]) await page.click('button.part[data-i="'+i+'"]');
  await scan("quiz-sheet");
  await go("#/age/squad/practice"); await scan("practice");
  await go("#/age/squad/news"); await page.waitForTimeout(400); await scan("news");
  await go("#/age/squad/me"); await scan("me");
  await go("#/age/squad/help"); await scan("help");
  await go("#/age/squad/check"); await scan("check question");
  for (const answer of ["yes", "no", "unsure", "yes", "no", "no"]) await page.click('[data-answer="' + answer + '"]');
  await scan("check result");
  await go("#/age/explore"); await scan("explore hello");
  await go("#/age/explore/path/gaming"); await scan("explore world-road");
  await go("#/age/explore/tips"); await scan("tips");
  await go("#/age/crew"); await scan("gate");
  // Pass the teen quick check, then look at the teen screens
  const label = await page.locator('label[for="sum"]').innerText();
  const [, a, b] = label.match(/(\d+) × (\d+)/);
  await page.fill("#sum", String(a * b)); await page.click("#enter");
  await scan("crew worlds");
  await go("#/age/crew/path/gaming"); await scan("crew world-road");
  await go("#/age/crew/help"); await scan("crew help");

  // Every fake screen in every lesson: draw each one on its own and check
  // only the colors, because the screens copy real apps and are easy to get
  // too faint.
  report[scheme + " every lesson picture"] = await page.evaluate(async () => {
    const { pictureHtml } = await import("./js/pictures.js");
    const { lessonsFor } = await import("./data/lessons/index.js");
    const { CATEGORIES } = await import("./data/categories.js");
    const modes = { spot: "spot", tap: "tap" };
    const found = {};
    for (const age of ["explore", "squad", "crew"]) {
      document.body.dataset.age = age;
      for (const c of CATEGORIES) for (const lesson of lessonsFor(age, c.id)) {
        const pictures = [];
        (lesson.learn || []).forEach(card => card.picture && pictures.push([card.picture, "learn"]));
        (lesson.quiz || []).forEach(q => q.picture && pictures.push([q.picture, modes[q.type] || "plain"]));
        for (const [picture, mode] of pictures) {
          const app = document.getElementById("app");
          app.innerHTML = pictureHtml(picture, mode);
          const r = await axe.run(app, { runOnly: ["color-contrast"] });
          for (const v of r.violations) for (const n of v.nodes) found[n.target.join(" ") + " in " + lesson.id] = true;
        }
      }
    }
    return Object.keys(found).map(k => "color-contrast: " + k);
  });
  await page.close();
}
await browser.close();
let total = 0;
for (const [k, v] of Object.entries(report)) { total += v.length; console.log(k + ": " + (v.length ? "\n   " + v.join("\n   ") : "ok")); }
console.log("TOTAL violations:", total);
