/* ========================================================================
   screens/help.js
   "If it happened to you". Each age group gets its own version (see
   data/help.js). Telling a parent comes first and biggest.

   From an age group's bottom menu it shows that age's version.
   From the Help button on the home page, the player picks their age first.
   In a lesson, Help opens as a sheet over the lesson, with "Back to my
   lesson", so the player never loses their place.

   In this file:
     showHelp        the Help screen (or the age picker before it), with a
                     link to Check it with me (check.js) at the top
     helpBodyHtml    everything on the Help page for one age group
     whatHtml        one "What happened?" item, folded shut
     hotlineHtml     one hotline card
     openHelpSheet   Help as a sheet over a lesson, and its two listeners
     wireBack        the Back button on the screens without a bottom menu
   ======================================================================== */

import { HELP } from "../../data/help.js";
import { CHECK } from "../../data/check.js";
import { AGES, findAge } from "../../data/ages.js";
import { showScreen, bottomNavHtml, $, goBack, appHeaderHtml } from "../ui.js";

/* ---------- The Help screen ---------- */

/* Show Help for one age group. With no age group (the Help button on the
   home page), the player picks their age first. */
export function showHelp(ageId) {
  const age = ageId ? findAge(ageId) : null;

  // Opened from the home page: pick an age, then show that version.
  if (!age) {
    const picks = AGES.map(a =>
      '<a class="age-card" href="#/help/' + a.id + '"><span class="age-face" aria-hidden="true">' + a.face + "</span>"
      + '<span class="age-range">' + a.range + "</span></a>"
    ).join("");
    // Say what Help is for first, so nobody lands here wondering why.
    const examples = [
      ["👆", "I tapped or typed something on a trick page"],
      ["💸", "I sent money, coins or a gift card"],
      ["🔑", "Someone asked for my password or a code"],
      ["😞", "Someone was mean, or wants a photo"]
    ].map(e => '<li><span aria-hidden="true">' + e[0] + "</span>" + e[1] + "</li>").join("");
    showScreen(
        '<button class="back" id="back" type="button">← Back</button>'
      + '<section class="panel help-first"><div class="learn-icon" aria-hidden="true">💜</div>'
      + "<h1>Need help with something online?</h1>"
      + '<p class="learn-text">If something weird, scary or mean happened, this page shows you what to do, step by step. '
      +   "<b>You are not in trouble.</b></p>"
      + '<ul class="help-examples">' + examples + "</ul>"
      + "</section>"
      + '<h2 class="help-pick">How old are you?</h2>'
      + '<div class="age-grid">' + picks + "</div>"
      + '<p class="help-danger"><b>In danger right now?</b> Call 911.</p>'
    );
    wireBack();
    return;
  }

  // Opened from an age group's bottom menu (#/age/...), it keeps the top bar
  // and the menu. Opened from the home page, there is no menu, so it gets a
  // Back button instead.
  const fromMenu = location.hash.startsWith("#/age/");
  showScreen(
      (fromMenu ? appHeaderHtml(age, "history") : '<button class="back" id="back" type="button">← Back</button>')
    // First, a way to check a message they got (see check.js)
    + '<a class="next-step check-link" href="#/age/' + age.id + '/check"><span aria-hidden="true">🔍</span><span>' + CHECK[age.id].cta + "</span></a>"
    + helpBodyHtml(age, "h1")
    + (fromMenu ? bottomNavHtml(age, "help") : "")
  );
  if (!fromMenu) wireBack();
}

/* ---------- What is on the Help page ---------- */

/* Everything on the Help page for one age group: telling someone first,
   then "What happened?", then the hotlines. "top" is the heading tag:
   h1 on the Help screen, h2 inside the sheet over a lesson. */
function helpBodyHtml(age, top) {
  const help = HELP[age.id];
  const what = help.what.map(whatHtml).join("");
  const hotlines = help.hotlines.map(hotlineHtml).join("");

  const moreHtml = hotlines
    ? '<h2 style="margin-top:22px">' + help.more + "</h2>" + '<div class="hotlines">' + hotlines + "</div>"
    : '<p class="help-more">' + help.more + "</p>";

  return '<section class="panel help-first">'
    +   '<div class="learn-icon" aria-hidden="true">' + help.first.icon + "</div>"
    +   "<" + top + ' id="help-title">' + help.first.title + "</" + top + ">"
    +   '<p class="learn-text">' + help.first.text + "</p>"
    + "</section>"
    + "<h2>What happened?</h2>"
    + '<div class="help-list">' + what + "</div>"
    + moreHtml;
}

// One "What happened?" item. It opens to show numbered steps when tapped.
function whatHtml(item) {
  const steps = item.steps.map(step => "<li>" + step + "</li>").join("");
  return '<details class="help-what">'
    + '<summary><span class="help-what-icon" aria-hidden="true">' + item.icon + "</span>" + item.title + "</summary>"
    + '<ol class="help-steps">' + steps + "</ol>"
    + "</details>";
}

/* One hotline. A hotline with one "href" is one big link. A hotline with
   "links" is a card with a row of links inside it (for example Call 988
   and Text 988). */
function hotlineHtml(line) {
  const inside = '<span class="hotline-icon" aria-hidden="true">' + line.icon + "</span>"
    + "<span><b>" + line.name + "</b><br><small>" + line.how + "</small>";
  if (line.links) {
    const links = line.links.map(link => '<a href="' + link.href + '"' + newTab(link.href) + ">" + link.label + "</a>").join(" ");
    return '<div class="hotline">' + inside
      + '<br><span class="hotline-links">' + links + "</span>"
      + "</span></div>";
  }
  return '<a class="hotline" href="' + line.href + '"' + newTab(line.href) + ">" + inside + "</span></a>";
}

// Web links open in a new tab. Phone (tel:) and text (sms:) links do not.
function newTab(href) {
  return href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
}

/* ---------- Help as a sheet over a lesson ---------- */

/* Help as a sheet over a lesson or quiz, so the player keeps their place.
   It has "Back to my lesson" at the top and the bottom. Escape closes it
   too, and so does the phone's or browser's Back button: opening the sheet
   adds a step to the browser's history (same address), so Back only takes
   that step away instead of leaving the lesson. Closing puts the focus
   back on the lesson's Help button. */
function openHelpSheet(ageId) {
  const age = findAge(ageId);
  if (!age || document.getElementById("help-sheet")) return;

  const back = '<button class="button wide help-sheet-back" type="button">← Back to my lesson</button>';
  const sheet = document.createElement("div");
  sheet.id = "help-sheet";
  sheet.className = "help-sheet";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-labelledby", "help-title");
  sheet.innerHTML = '<div class="help-sheet-inner">' + back + helpBodyHtml(age, "h2") + back + "</div>";
  document.body.appendChild(sheet);
  document.body.classList.add("sheet-open");
  history.pushState({ helpSheet: true }, "");

  // Take the sheet away and stop listening for Escape and Back.
  function remove() {
    const wasOpen = sheet.isConnected;
    sheet.remove();
    document.body.classList.remove("sheet-open");
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("popstate", remove);
    const opener = document.querySelector(".lesson-help");
    if (wasOpen && opener) opener.focus();
  }
  // The sheet's own buttons and Escape go Back one step, which removes it.
  function close() {
    if (history.state && history.state.helpSheet) history.back();
    else remove();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  document.addEventListener("keydown", onKey);
  window.addEventListener("popstate", remove);
  sheet.querySelectorAll(".help-sheet-back").forEach(button => button.addEventListener("click", close));
  sheet.querySelector(".help-sheet-back").focus();
}

/* Any link with data-help-sheet (like the Help button in the lesson bar)
   opens the sheet instead of leaving the lesson. One listener on the whole
   page handles every such link, because lesson screens are drawn again
   and again, and a listener on each link would be lost each time. It is
   set up here, when this file first loads, so it is ready before any
   lesson is drawn. */
document.addEventListener("click", e => {
  const link = e.target.closest("[data-help-sheet]");
  if (!link) return;
  e.preventDefault();
  openHelpSheet(link.dataset.helpSheet);
});

/* The sheet belongs to the screen it was opened on. It sits outside
   <main>, so drawing a new screen does not remove it. This removes it
   whenever the address changes, for example with the browser Back button. */
window.addEventListener("hashchange", () => {
  const sheet = document.getElementById("help-sheet");
  if (sheet) {
    sheet.remove();
    document.body.classList.remove("sheet-open");
  }
});

/* ---------- Going back ---------- */

// Go back to wherever the player came from. If they came straight here, go home.
function wireBack() {
  $("#back").addEventListener("click", () => {
    goBack("#/");
  });
}
