/* ========================================================================
   screens/tips.js
   Tip of the week. Every age group has its own 53 tips:
     data/tips.js        ages 6 to 9 (they get tips instead of news)
     data/tips-squad.js  ages 10 to 13 (shown at the top of News)
     data/tips-crew.js   ages 14 to 18 (shown at the top of News)

   Every device has its own random order of tips (saved in store.js).
   The tip changes once a week, counted from the first visit on this
   device. "Another tip" shows the next one early.

   In this file:
     tipsFor       the list of tips for one age group
     tipFor        the tip for this week, or a later week
     tipCardHtml   the small tip card at the top of News
     showTips      the full Tip of the week screen, for ages 6 to 9
   ======================================================================== */

import { TIPS as EXPLORE } from "../../data/tips.js";
import { TIPS as SQUAD } from "../../data/tips-squad.js";
import { TIPS as CREW } from "../../data/tips-crew.js";
import { findAge } from "../../data/ages.js";
import { tipOrder } from "../store.js";
import { showScreen, bottomNavHtml, $, appHeaderHtml } from "../ui.js";

const WEEK = 7 * 24 * 60 * 60 * 1000;   // one week, in milliseconds
const ALL = { explore: EXPLORE, squad: SQUAD, crew: CREW };

/* ---------- Choosing a tip ---------- */

// The tips for one age group. An unknown or empty group gets the 6 to 9 tips.
export function tipsFor(ageId) {
  return ALL[ageId] && ALL[ageId].length ? ALL[ageId] : EXPLORE;
}

// The tip "extra" weeks after this one (0 is this week), for one age group.
export function tipFor(ageId, extra) {
  const tips = tipsFor(ageId);
  const { order, firstVisit } = tipOrder(tips.length, ageId);
  // Never below 0, in case the device clock was wrong on the first visit.
  const weeksSinceFirstVisit = Math.max(0, Math.floor((Date.now() - firstVisit) / WEEK));
  const place = (weeksSinceFirstVisit + (extra || 0)) % order.length;
  return tips[order[place]];
}

/* ---------- Showing a tip ---------- */

// The small tip card that sits at the top of the News page.
export function tipCardHtml(ageId) {
  const tip = tipFor(ageId, 0);
  return '<div class="tip-strip"><span class="tip-icon" aria-hidden="true">' + tip.icon + "</span>"
    + "<div><small>Tip of the week</small><b>" + tip.title + "</b><span>" + tip.text + "</span></div></div>";
}

/* The full Tip of the week screen, for ages 6 to 9. "Another tip" draws
   the screen again with the next tip. */
export function showTips(ageId) {
  const age = findAge(ageId);
  let extra = 0;   // how many times "Another tip" was pressed
  draw();

  function draw() {
    const tip = tipFor(ageId, extra);
    showScreen(
        appHeaderHtml(age, "history")
      + '<header class="page-top"><h1>' + (extra === 0 ? "Tip of the week" : "Another tip") + "</h1></header>"
      + '<article class="tip-big">'
      +   '<div class="tip-big-icon" aria-hidden="true">' + tip.icon + "</div>"
      +   "<h2>" + tip.title + "</h2>"
      +   "<p>" + tip.text + "</p>"
      + "</article>"
      + '<div class="button-row center"><button class="button" id="another" type="button">🎲 Another tip</button></div>'
      + bottomNavHtml(age, "news")
    );
    $("#another").addEventListener("click", () => {
      extra++;
      draw();
    });
  }
}
