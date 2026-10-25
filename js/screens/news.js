/* ========================================================================
   screens/news.js
   "This week" for ages 10 to 18: the tip of the week, then real scam news
   from official sources, written for that age group.

   The news comes from data/news.json. A Python script (backend/news/)
   collects it from official sources only, picks human-written words for
   each age, and a grown-up approves it before it is published.

   If news.json has no items:
     - on this computer (localhost), the page shows clearly marked SAMPLE
       stories, so you can see how it looks;
     - on the real site, it shows "No new warnings this week" and no
       made-up stories.

   A news item in news.json looks like:
     { id, date, category, icon, source, url, ages: ["squad", "crew"],
       squad: { title, summary, doThis },
       crew:  { title, summary, doThis } }
   An item is only shown to the age groups in "ages" that also have words.

   In this file:
     Loading the news   isTesting, loadNews
     Safe words         esc, safeUrl, wordsFor
     The News screen    showNews, newsCardHtml
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { findCategory, categoryFor } from "../../data/categories.js";
import { NEWS_SAMPLE } from "../../data/news-sample.js";
import { showScreen, bottomNavHtml, appHeaderHtml } from "../ui.js";
import { tipCardHtml } from "./tips.js";

/* ---------- Loading the news ---------- */

// Samples only ever show when testing on this computer.
function isTesting() {
  const host = location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".localhost") || location.protocol === "file:";
}

/* Load the approved news once per visit. fetch gives back a "promise", a
   note that says "the answer will come later". It is kept, so opening
   News again uses the same answer instead of loading the file again.
   If the file is missing, empty or broken, the samples (when testing) or
   an empty list (on the real site) are used instead. */
let newsPromise = null;
function loadNews() {
  if (!newsPromise) {
    const empty = isTesting() ? { ...NEWS_SAMPLE, sample: true } : { items: [], sample: false };
    newsPromise = fetch("data/news.json", { cache: "no-cache" })
      .then(response => response.ok ? response.json() : null)
      .then(news => (news && Array.isArray(news.items) && news.items.length) ? { ...news, sample: false } : empty)
      .catch(() => empty);
  }
  return newsPromise;
}

/* ---------- Safe words ---------- */

/* Words from news.json go into the page as text, never as HTML. This is
   stricter than safeText in ui.js: it also turns ' into a safe code, and
   a missing value into "". */
function esc(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* A source link is only made for an https address on an official .gov
   site (samples may link elsewhere). Anything else shows as plain text. */
function safeUrl(url, sample) {
  try {
    const address = new URL(url);
    if (address.protocol !== "https:") return "";
    if (!sample && !address.hostname.endsWith(".gov")) return "";
    return address.href;
  } catch (error) {
    return "";
  }
}

// The words for one age group, or null if this item is not for them.
function wordsFor(item, ageId) {
  if (Array.isArray(item.ages) && !item.ages.includes(ageId)) return null;
  const words = item[ageId] || (item.title ? item : null);   // samples are not split by age
  return words && words.title && words.summary && words.doThis ? words : null;
}

/* ---------- The News screen ---------- */

/* Draw the News screen with "Loading news...", then fill in the stories
   when they arrive. Ages 6 to 9 have no News, so they go to their worlds. */
export function showNews(ageId) {
  const age = findAge(ageId);
  if (!age || !age.news) {
    location.hash = "#/age/" + ageId + "/path";
    return;
  }

  showScreen(
      appHeaderHtml(age, "history")
    + '<header class="page-top"><h1>News</h1><p class="page-sub">Scams in the news this week, from official warnings.</p></header>'
    + tipCardHtml(age.id)
    + '<div id="news"><p class="loading">Loading news...</p></div>'
    + bottomNavHtml(age, "news")
  );

  loadNews().then(news => {
    const box = document.getElementById("news");
    if (!box) return;   // the player already moved on
    const items = news.items.map(item => newsCardHtml(item, age.id, news.sample)).join("");
    box.innerHTML = "<h2>Scams going around</h2>"
      + (news.sample ? '<div class="sample-note">🧪 These are SAMPLE stories, to show how this page will look.</div>' : "")
      + (items
          ? '<div class="news-list">' + items + "</div>"
          : '<p class="help-more">No new warnings this week. The tip above is still worth a look.</p>');
  });
}

/* One news story, in its category's colors. Returns "" if the story has
   no words for this age group. */
function newsCardHtml(item, ageId, sample) {
  const words = wordsFor(item, ageId);
  if (!words) return "";
  const category = categoryFor(findCategory(item.category), ageId) || { icon: "📰", name: "News", id: "messages" };
  const style = "--strong:var(--" + category.id + ");--soft:var(--" + category.id + "-soft)";
  const url = safeUrl(item.url, sample);
  const source = url
    ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(item.source) + "</a>"
    : esc(item.source);
  return '<article class="news-card" style="' + style + '">'
    + '<div class="news-top"><span class="news-icon" aria-hidden="true">' + esc(item.icon) + "</span>"
    +   '<span class="news-tag">' + category.icon + " " + category.name + "</span>"
    +   '<span class="news-date">' + esc(item.date) + "</span></div>"
    + "<h3>" + esc(words.title) + "</h3>"
    + "<p>" + esc(words.summary) + "</p>"
    + '<div class="news-do"><b>Do this:</b> ' + esc(words.doThis) + "</div>"
    + '<p class="news-source">Source: ' + source + "</p>"
    + "</article>";
}
