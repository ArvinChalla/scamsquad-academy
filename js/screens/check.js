/* ========================================================================
   screens/check.js
   "Check it with me": for a message a player really got. They answer a
   few yes or no questions, one at a time, and the game shows the warning
   signs it found and what to do. The words for each age group are in
   data/check.js.

   Nothing is saved or sent. The answers live only in this screen, and are
   gone when the player leaves it. The result never says "safe": it always
   ends with showing a parent, or another adult you trust.

   #/age/squad/check   the first question (reached from the Help page)

   In this file:
     showCheck      starts a fresh check
     questionHtml   one question with Yes, No and Not sure
     resultHtml     the warning signs found, and what to do
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { CHECK } from "../../data/check.js";
import { showScreen, bottomNavHtml, appHeaderHtml, $all } from "../ui.js";

// Start a fresh check. answers[i] is "yes", "no" or "unsure".
export function showCheck(ageId) {
  const age = findAge(ageId);
  const words = CHECK[age.id];
  const answers = [];

  function draw() {
    const done = answers.length === words.questions.length;
    showScreen(
        appHeaderHtml(age, "history")
      + (done ? resultHtml(age, words, answers) : questionHtml(words, answers.length))
      + bottomNavHtml(age, "help")
    );
    // Yes, No and Not sure record the answer and move to the next question
    $all("[data-answer]").forEach(button => button.addEventListener("click", () => {
      answers.push(button.dataset.answer);
      draw();
    }));
    // "Back" undoes the last answer; "Check another" starts again
    $all("[data-check-back]").forEach(button => button.addEventListener("click", () => {
      answers.pop();
      draw();
    }));
    $all("[data-check-again]").forEach(button => button.addEventListener("click", () => {
      answers.length = 0;
      draw();
    }));
  }
  draw();
}

/* One question. The first one also says what this is and that nothing is
   saved, so a player knows it is fine to answer honestly. */
function questionHtml(words, n) {
  const q = words.questions[n];
  const first = n === 0;
  return '<section class="panel check-card">'
    + (first ? '<h1 class="check-title">' + words.title + "</h1>" + '<p class="check-intro">' + words.intro + "</p>" : "")
    + '<p class="check-count">Question ' + (n + 1) + " of " + words.questions.length + "</p>"
    + '<div class="check-icon" aria-hidden="true">' + q.icon + "</div>"
    + (first ? '<h2 class="check-ask">' : '<h1 class="check-ask">') + q.ask + (first ? "</h2>" : "</h1>")
    + '<div class="answers check-answers">'
    +   '<button class="answer" type="button" data-answer="yes"><span class="answer-text">Yes</span></button>'
    +   '<button class="answer" type="button" data-answer="no"><span class="answer-text">No</span></button>'
    +   '<button class="answer" type="button" data-answer="unsure"><span class="answer-text">Not sure</span></button>'
    + "</div>"
    + (n > 0 ? '<button class="check-back" type="button" data-check-back>← Back</button>' : "")
    + '<p class="check-private">🔒 Nothing you tap here is saved or sent.</p>'
    + "</section>";
}

// The result: the warning signs (each Yes, and one line for any Not sure), then what to do.
function resultHtml(age, words, answers) {
  const signs = words.questions.filter((q, i) => answers[i] === "yes").map(q => q.sign);
  const unsure = answers.includes("unsure");
  const found = signs.length > 0 || unsure;
  const list = signs.map(sign => '<li><span aria-hidden="true">🚩</span>' + sign + "</li>").join("")
    + (unsure ? '<li><span aria-hidden="true">❓</span>' + words.unsureSign + "</li>" : "");
  const head = signs.length ? words.trick : words.noSigns;
  const steps = words.doThis.map(step => "<li>" + step + "</li>").join("");

  return '<section class="panel check-card check-result' + (signs.length ? " is-trick" : "") + '">'
    + '<div class="check-icon" aria-hidden="true">' + head.icon + "</div>"
    + '<h1 class="check-ask">' + head.title + "</h1>"
    + (found ? '<ul class="check-signs">' + list + "</ul>" : "")
    + (signs.length ? "" : '<p class="check-intro">' + words.noSigns.text + "</p>")
    + (signs.length || unsure ? "<h2>What to do</h2>" + '<ol class="check-steps">' + steps + "</ol>" : "")
    + '<div class="button-row center">'
    +   '<a class="button" href="#/age/' + age.id + '/help">Get help</a>'
    +   '<button class="button quiet" type="button" data-check-again>Check another</button>'
    + "</div>"
    + '<p class="check-private">🔒 Nothing you tapped was saved or sent.</p>'
    + "</section>";
}
