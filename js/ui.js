/* ========================================================================
   ui.js
   Small helpers that every screen uses. Screens are drawn as text (HTML)
   and put inside <main id="app"> in index.html. These helpers draw a
   screen, find things on it, make typed text safe, build the menus and
   bars that many screens share, show small pop-ups, and go back.

   In this file:
     Drawing screens        showScreen, setColor, lessonMode
     Finding things         $, $all
     Safe text and lists    safeText, shuffle
     Menus and bars         setMeDot, bottomNavHtml, appHeaderHtml
     Pop-ups                showToast, askFirst
     Going back             goBack, and the click listener for Back arrows
   ======================================================================== */

import { coins } from "./store.js";

// The <main> box where every screen is drawn.
const app = document.getElementById("app");

/* ---------- Drawing screens ---------- */

/* Put a new screen on the page.
   html  is the screen, as text.
   color is the category name (like "gaming"), so the screen uses its colors.
   After drawing, the page jumps to the top and the main heading gets focus,
   so people using a screen reader hear the new screen's title. */
export function showScreen(html, color) {
  app.innerHTML = html;
  setColor(color);
  window.scrollTo(0, 0);
  const heading = app.querySelector("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

/* Every category has two colors in base.css: a strong one (--gaming) and a
   soft one (--gaming-soft). This copies them into --strong and --soft, so
   the same CSS works for every category. */
export function setColor(color) {
  const name = color || "brand";
  app.style.setProperty("--strong", "var(--" + name + ")");
  app.style.setProperty("--soft", "var(--" + name + "-soft)");
}

/* Lesson mode hides the site's top bar and footer, so a lesson or quiz
   fills the screen like an app, with nothing else to tap. */
export function lessonMode(on) {
  document.body.classList.toggle("in-lesson", !!on);
}

/* ---------- Finding things on the screen ---------- */

// Find one thing on the screen, like $("#next").
export function $(selector) {
  return app.querySelector(selector);
}

// Find every matching thing on the screen, as a list.
export function $all(selector) {
  return Array.from(app.querySelectorAll(selector));
}

/* ---------- Safe text and lists ---------- */

/* Make text safe to put inside HTML. Only needed for text the player types,
   like their name on the certificate. Our own words in data/ are trusted. */
export function safeText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Return a copy of a list in a random order. This is the "Fisher-Yates
   shuffle": walk from the end, and swap each item with a random one at or
   before it, so every order is equally likely. */
export function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------- Menus and bars ---------- */

/* A dot on Me says a certificate is waiting there. ui.js cannot know that
   by itself, so me.js hands it a check to run with setMeDot. Until then
   the check always says "no dot". */
let meDot = () => false;

// me.js calls this once, with a function that takes an age id and says yes or no.
export function setMeDot(check) {
  meDot = check;
}

/* The menu at the bottom of the main screens.
   active is "path", "practice", "news", "me" or "help" (shown as Worlds or
   Topics, Spot Check, News or Tips, Me and Help: one name for each thing).
   Ages 6 to 9 get Tips instead of News. */
export function bottomNavHtml(age, active) {
  const start = "#/age/" + age.id + "/";
  const newsOrTips = age.news
    ? { id: "news", icon: "📰", label: "News", href: start + "news" }
    : { id: "news", icon: "💡", label: "Tips", href: start + "tips" };
  const items = [
    { id: "path", icon: "🗺️", label: age.id === "crew" ? "Topics" : "Worlds", href: start + "path" },
    { id: "practice", icon: "🔁", label: "Spot Check", href: start + "practice" },
    newsOrTips,
    { id: "me", icon: "🏅", label: "Me", href: start + "me" },
    { id: "help", icon: "💜", label: "Help", href: start + "help" }
  ];
  const links = items.map(item => navLinkHtml(item, age.id, active)).join("");
  return '<nav class="bottom-nav" aria-label="Main menu">' + links + "</nav>";
}

// One link in the bottom menu. The link for the current screen is marked "on".
function navLinkHtml(item, ageId, active) {
  const current = item.id === active ? ' class="on" aria-current="page"' : "";
  const showDot = item.id === "me" && active !== "me" && meDot(ageId);
  const dot = showDot ? '<i class="nav-dot"><span class="sr-only">, new</span></i>' : "";
  return '<a href="' + item.href + '"' + current + ">"
    + '<span aria-hidden="true">' + item.icon + "</span>" + item.label
    + dot
    + "</a>";
}

/* The bar at the top of every main screen: Back, the logo (home), the age
   group, and coins (not for teens, whose hints are free).
   back is a web address for the arrow, or "history" to go back to the
   last screen (or the worlds, if the player came straight here). */
export function appHeaderHtml(age, back) {
  const worlds = "#/age/" + age.id + "/path";
  return '<header class="path-top">'
    + '<div class="path-left">'
    +   backArrowHtml(back, worlds)
    +   '<a class="mini-logo" href="#/" aria-label="ScamSquad Academy home"><img class="logo-img" src="images/logo-shield.png" alt="" width="62" height="44"><span class="mini-logo-name">ScamSquad</span></a>'
    +   '<span class="age-chip"><span aria-hidden="true">' + age.face + "</span> " + age.name + "</span>"
    + "</div>"
    + coinsHtml(age)
    + "</header>";
}

/* The Back arrow in the top bar. "history" makes a button that goBack
   handles (see the click listener at the end of this file). Any other
   address makes a plain link. No address, no arrow. */
function backArrowHtml(back, worlds) {
  if (!back) return "";
  if (back === "history") {
    return '<button class="path-back" type="button" data-back="' + worlds + '" aria-label="Back">←</button>';
  }
  return '<a class="path-back" href="' + back + '" aria-label="Back">←</a>';
}

// The coin count in the top bar. Teens have no coins.
function coinsHtml(age) {
  if (age.id === "crew") return "";
  const count = coins();
  return '<span class="stat" aria-label="' + count + " " + age.coin.name + '">' + age.coin.icon + " " + count + "</span>";
}

/* ---------- Pop-ups ---------- */

/* A short message that pops up at the bottom for a moment, like
   "Finish Free Robux first." Read out by screen readers too. */
let toastTimer = 0;
export function showToast(text) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* A small sheet that asks before doing something you can't undo, like
   leaving a quiz half way. The safe choice is the big button.
   options: { title, text, stay, leave, onLeave } */
export function askFirst(options) {
  const old = document.getElementById("ask");
  if (old) old.remove();

  const box = document.createElement("div");
  box.id = "ask";
  box.className = "ask-backdrop";
  box.innerHTML = '<div class="ask" role="dialog" aria-modal="true" aria-labelledby="ask-title">'
    + '<h2 id="ask-title">' + options.title + "</h2>"
    + (options.text ? "<p>" + options.text + "</p>" : "")
    + '<button class="button wide" id="ask-stay" type="button">' + options.stay + "</button>"
    + '<button class="button quiet wide" id="ask-leave" type="button">' + options.leave + "</button>"
    + "</div>";
  document.body.appendChild(box);

  // Closing the sheet also stops listening for the Escape key.
  function close() {
    box.remove();
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  document.addEventListener("keydown", onKey);

  // A tap on the dark area around the sheet counts as "stay".
  box.addEventListener("click", e => {
    if (e.target === box) close();
  });
  box.querySelector("#ask-stay").addEventListener("click", close);
  box.querySelector("#ask-leave").addEventListener("click", () => {
    close();
    options.onLeave();
  });
  box.querySelector("#ask-stay").focus();
}

/* A new screen clears the last screen's pop-up message and any confetti
   still falling. This listens on the whole window because toasts and
   confetti sit outside <main>, so drawing a new screen does not remove them. */
window.addEventListener("hashchange", () => {
  const toast = document.getElementById("toast");
  if (toast) toast.classList.remove("show");
  document.querySelectorAll(".confetti").forEach(shower => shower.remove());
});

/* ---------- Going back ---------- */

/* "Back" buttons should only go back inside the game. This counts moves
   inside the game, so a Back button never takes the player to another site. */
let movesInGame = 0;
window.addEventListener("hashchange", () => {
  movesInGame++;
});

// Go back one screen, or to "fallback" if the player came straight here.
export function goBack(fallback) {
  if (movesInGame > 0) history.back();
  else location.hash = fallback || "#/";
}

/* Back arrows made with appHeaderHtml(age, "history") have data-back.
   One listener on the whole page handles all of them, because the arrows
   are drawn again with every screen and a listener on each one would be
   lost each time. */
document.addEventListener("click", e => {
  const button = e.target.closest("[data-back]");
  if (button) goBack(button.dataset.back);
});
