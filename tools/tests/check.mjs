// Plays Check it with me for each age: from Help, all No, then a mix with Not sure, Back and Check another.
import { chromium } from "playwright-core";
// Set CHROME to your Chrome or Chromium if it is somewhere else.
const b = await chromium.launch({ executablePath: process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const errs = [];
const ok = (c, m) => { if (!c) errs.push("FAIL: " + m); };
for (const age of ["explore", "squad", "crew"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => { try { localStorage.setItem("scamsquad-v2", JSON.stringify({ gateDone: true })); } catch (e) {} });
  const p = await ctx.newPage();
  p.on("pageerror", e => errs.push(age + ": " + e.message));
  const B = "http://localhost:8792/v2/index.html";
  await p.goto(B + "#/age/" + age + "/help"); await p.waitForTimeout(400);
  if (age === "crew" && await p.locator("#sum").count()) {
    const label = await p.locator('label[for="sum"]').innerText(); const [, x, y] = label.match(/(\d+) × (\d+)/);
    await p.fill("#sum", String(x * y)); await p.click("#enter"); await p.waitForTimeout(300);
    await p.evaluate(() => { location.hash = location.hash.replace(/\/[^/]*$/, "") + "/help"; }); await p.goto(B + "#/age/crew/help"); await p.waitForTimeout(300);
  }
  ok(await p.locator(".check-link").count() === 1, age + " help page has the check link");
  await p.click(".check-link"); await p.waitForTimeout(300);
  ok((await p.evaluate(() => location.hash)).endsWith("/check"), age + " opens #/check");
  const n = await p.evaluate(() => Number(document.querySelector(".check-count").textContent.match(/of (\d+)/)[1]));
  // All No
  for (let i = 0; i < n; i++) { await p.click('[data-answer="no"]'); await p.waitForTimeout(80); }
  ok(await p.locator(".check-signs").count() === 0 && await p.locator(".check-result").count() === 1, age + " all No: no signs list");
  ok(!/\bsafe\b/i.test(await p.locator(".check-result").innerText()), age + " result never says safe");
  // Again: Yes on 2 and 4, Not sure on 6, test Back on the way
  await p.click("[data-check-again]"); await p.waitForTimeout(100);
  await p.click('[data-answer="no"]'); await p.click('[data-answer="yes"]'); await p.click('[data-answer="yes"]');
  await p.click("[data-check-back]"); await p.waitForTimeout(80);   // undo the 3rd answer
  ok(/Question 3 of/i.test(await p.locator(".check-count").innerText()), age + " Back goes to question 3");
  await p.click('[data-answer="no"]'); await p.click('[data-answer="yes"]'); await p.click('[data-answer="no"]');
  for (let i = 5; i < n; i++) await p.click('[data-answer="unsure"]');
  await p.waitForTimeout(100);
  const signs = await p.locator(".check-signs li").count();
  ok(signs === 3, age + " shows 2 signs plus 1 not sure line (got " + signs + ")");
  ok(await p.locator(".check-steps li").count() >= 3, age + " shows what to do");
  ok(await p.locator('a.button[href="#/age/' + age + '/help"]').count() === 1, age + " has Get help");
  ok(await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) === 0, age + " no sideways scroll");
  const saved = await p.evaluate(() => JSON.stringify(localStorage));
  ok(!/check|answer/i.test(saved.replace(/answers?\":\{/g, "")), age + " nothing about the check saved");
  await ctx.close();
}
console.log(errs.length ? errs.join("\n") : "all check-it-with-me checks passed");
await b.close();
