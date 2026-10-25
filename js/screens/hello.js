/* ========================================================================
   screens/hello.js
   The first time a player picks an age, their buddy says hello and
   there is one button, like "I'm ready to spot the scams!" (each age has
   its own words, in data/ages.js). After that, picking the same age
   goes straight to the path.

   In this file:
     showHello   draws the hello screen
     factsHtml   three short lines about coins, badges and the certificate
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { markHelloSeen } from "../store.js";
import { showScreen, lessonMode, $ } from "../ui.js";

/* ---------- The hello screen ---------- */

// Draw the hello for one age group. The button saves "seen" and opens the worlds.
export function showHello(ageId) {
  const age = findAge(ageId);
  lessonMode(true);   // just the intro and one button, nothing else

  // Teens get a plain intro with no buddy talking. Younger ages meet their buddy.
  const intro = age.words.plainHello
    ? '<section class="hello plain"><h1>Ages ' + age.range + "</h1><p>" + age.intro + "</p></section>"
    : '<section class="hello">'
      + '<div class="hello-face" aria-hidden="true">' + age.face + "</div>"
      + '<div class="speech"><h1>' + "Hi! I'm " + age.buddy + ".</h1><p>" + age.intro + "</p></div>"
      + factsHtml(age)
      + "</section>";

  showScreen(
      '<a class="mini-logo hello-logo" href="#/"><img class="logo-img" src="images/logo-shield.png" alt="" width="62" height="44"> ScamSquad Academy</a>'
    + intro
    + '<div class="bottom-bar"><button class="button wide" id="ready" type="button">' + age.ready + "</button></div>"
  );

  $("#ready").addEventListener("click", () => {
    markHelloSeen(age.id);
    location.hash = "#/age/" + age.id + "/path";
  });
}

/* Three short lines so coins, badges and the certificate are never a
   mystery. Said once, here, before the first lesson. Each fact is
   [icon, words]. Ages 6 to 9 get simpler words. */
function factsHtml(age) {
  const facts = age.id === "explore"
    ? [["🪙", "Right answers give you coins. Use coins for a hint."],
       ["🏅", "Get every answer in a world right to win its badge."],
       ["🏆", "Win all 7 badges to get your certificate!"]]
    : [["🪙", "Right answers earn coins. Spend them on 💡 hints."],
       ["🏅", "Get every question in a world right to earn its badge."],
       ["🏆", "Earn all 7 badges to unlock your certificate."]];
  const items = facts.map(fact => '<li><span aria-hidden="true">' + fact[0] + "</span>" + fact[1] + "</li>").join("");
  return '<ul class="hello-facts">' + items + "</ul>";
}
