/* ========================================================================
   screens/learn.js
   The Learn part of a lesson: one big card per screen.

   Like an app: at the top an ✕ to leave, a progress bar and Help, at the
   bottom one Continue button. After the last card, Continue starts the
   quiz. Fake screens on learn cards show the red flags circled and numbered.

   Moving between cards replaces the address instead of adding a new one,
   so the browser Back button leaves the lesson in one step.

   In this file, in order:
     showLearn       one learn card
     replaceOnClick  a link that swaps the address (quiz.js uses it too)
     lessonBarHtml   the bar at the top of lesson and quiz screens (quiz.js too)
   ======================================================================== */

import { findLesson } from "../../data/lessons/index.js";
import { soundButtonHtml } from "../settings.js";
import { pictureHtml } from "../pictures.js";
import { showScreen, lessonMode, $ } from "../ui.js";
import { isOpen } from "./path.js";

/* ---------- Learn cards ---------- */

// Show one learn card. cardNumber counts from 0.
export function showLearn(ageId, categoryId, lessonId, cardNumber) {
  const lesson = findLesson(ageId, categoryId, lessonId);
  // A lesson that does not exist yet, or is still locked, sends the player back to its world.
  if (!lesson || lesson.soon || !isOpen(ageId, lessonId)) {
    location.replace("#/age/" + ageId + "/path/" + categoryId);
    return;
  }

  const total = lesson.learn.length;
  const cardIndex = Math.min(Math.max(cardNumber || 0, 0), total - 1);   // keep it inside 0 to total-1
  const card = lesson.learn[cardIndex];
  const base = "#/age/" + ageId + "/" + categoryId + "/" + lessonId;
  const isLast = cardIndex === total - 1;
  const nextHref = base + (isLast ? "/play" : "/learn/" + (cardIndex + 1));

  lessonMode(true);
  showScreen(
      lessonBarHtml(ageId, (cardIndex + 1) / total, "", categoryId)
    + '<article class="learn-card">'
    +   '<div class="learn-top"><span class="learn-icon" aria-hidden="true">' + card.icon + "</span></div>"
    +   '<h1 class="learn-title">' + card.title + "</h1>"
    +   (card.text ? '<p class="learn-text">' + card.text + "</p>" : "")
    +   pictureHtml(card.picture, "learn")
    +   (card.keep ? keepBoxHtml(card.keep) : "")
    + "</article>"
    + '<div class="bottom-bar">'
    +   '<a class="button wide" id="continue" href="' + nextHref + '">'
    +   (isLast ? "Start the quiz 🎯" : "Continue") + "</a>"
    + "</div>",
    categoryId
  );
  replaceOnClick($("#continue"));
}

// The "Keep this" box: the one thing to remember from a card.
function keepBoxHtml(text) {
  return '<div class="keep-box"><span class="keep-icon" aria-hidden="true">💡</span><div>'
    + '<div class="keep-label">Keep this</div><div class="keep-text">' + text + "</div></div></div>";
}

/* ---------- Shared with the quiz ---------- */

// A link that swaps the address instead of adding one (see the top comment).
export function replaceOnClick(link) {
  link.addEventListener("click", e => {
    e.preventDefault();
    location.replace(link.getAttribute("href"));
  });
}

/* The bar at the top of every lesson and quiz screen: an ✕ that goes back
   to the lesson's world, a bar that fills up, and Help, so help is one tap
   away even in the middle of a lesson.
   done     how far through, from 0 to 1
   extra    anything to show on the right, like the coin count
   worldId  where the ✕ goes. Spot Check has no world, so it goes back to Spot Check. */
export function lessonBarHtml(ageId, done, extra, worldId) {
  const percent = Math.round(Math.min(Math.max(done, 0), 1) * 100);
  const leave = worldId ? "#/age/" + ageId + "/path/" + worldId : "#/age/" + ageId + "/practice";
  return '<header class="lesson-bar">'
    + '<img class="lesson-logo" src="images/logo-shield.png" alt="ScamSquad Academy" width="48" height="34">'
    + '<a class="quit" id="quit" href="' + leave + '" aria-label="Leave">✕</a>'
    + '<div class="meter" role="progressbar" aria-label="How far you are" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + percent + '">'
    +   '<i style="width:' + percent + '%"></i></div>'
    + (extra || "")
    // Sound on or off (see settings.js). Help opens as a sheet over the lesson
    // (see help.js), with its word always showing.
    + soundButtonHtml()
    + '<a class="lesson-help" href="#/age/' + ageId + '/help" data-help-sheet="' + ageId + '"><span aria-hidden="true">💜</span> Help</a>'
    + "</header>";
}
