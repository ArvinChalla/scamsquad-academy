/* ========================================================================
   screens/gate.js
   Before the 14 to 18 track: an honest line about what is in it, and a
   quick sum, so a young child does not wander in by mistake.
   It is asked once on each device (store.js saves only "done"), so a teen
   does not have to do it every visit. "This is not for me" goes back to
   the start. Passing it also counts as the hello, so teens go straight
   to their topics.

   In this file:
     gatePassed   has this device passed the check?
     showGate     draws the check and handles the answer
     markPassed   saves "passed" and "hello seen"
   ======================================================================== */

import { showScreen, lessonMode, $ } from "../ui.js";
import { gateDone, markGateDone, markHelloSeen } from "../store.js";

/* ---------- The quick check ---------- */

// Has the quick check been passed on this device? main.js asks before every crew screen.
export function gatePassed() {
  return gateDone();
}

/* Draw the quick check: two random numbers from 6 to 9 to multiply.
   "then" is what to do after a right answer (main.js passes its route,
   so the screen the player asked for opens). */
export function showGate(then) {
  const firstNumber = 6 + Math.floor(Math.random() * 4);   // 6 to 9
  const secondNumber = 6 + Math.floor(Math.random() * 4);
  lessonMode(true);
  showScreen(
      '<a class="mini-logo hello-logo" href="#/"><img class="logo-img" src="images/logo-shield.png" alt="" width="62" height="44"> ScamSquad Academy</a>'
    + '<section class="practice-card left gate">'
    +   '<span class="practice-icon" aria-hidden="true">🛡️</span>'
    +   "<h1>Ages 14 to 18</h1>"
    +   "<p>This track talks about serious things teens face online: photo threats, money crimes, fake jobs and AI fakes. Nothing graphic, and help is always one tap away.</p>"
    +   '<label class="name-label" for="sum">Quick check, to keep younger kids out: what is ' + firstNumber + " × " + secondNumber + "?</label>"
    +   '<input id="sum" class="name-input" type="text" inputmode="numeric" autocomplete="off">'
    +   '<p class="name-error" id="sum-error" aria-live="polite"></p>'
    +   '<button class="button wide" id="enter" type="button">Continue</button>'
    +   '<a class="button quiet wide" href="#/" style="margin-top:10px">This is not for me</a>'
    + "</section>"
  );

  const input = $("#sum");
  const error = $("#sum-error");

  // Typing again clears the last message. Enter works like the Continue button.
  input.addEventListener("input", () => {
    error.textContent = "";
  });
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") check();
  });
  $("#enter").addEventListener("click", check);

  // Check the typed answer. A wrong answer can be tried again, as often as needed.
  function check() {
    const typed = input.value.trim();
    if (!typed) {
      error.textContent = "Type the answer first.";
      input.focus();
      return;
    }
    if (parseInt(typed, 10) !== firstNumber * secondNumber) {
      error.textContent = "Not quite. Try again, or pick a different age.";
      input.select();
      return;
    }
    markPassed();
    then();
  }
}

/* ---------- Saving ---------- */

// Passing the check also counts as the hello, so teens go straight to their topics.
function markPassed() {
  markGateDone();
  markHelloSeen("crew");
}
