/* ========================================================================
   screens/quiz.js
   Plays questions: at the end of a lesson, when practicing the ones you
   missed, and in Spot Check. Then shows the Results.

   How it works (on purpose):
   - Each question gets ONE try. Tapping every button until one turns
     green teaches nothing, so the first answer counts.
   - Right or wrong, the right answer is shown and one line says why.
     A sheet slides up from the bottom with Continue.
   - Right answers earn coins: 10 the first time a question is ever
     answered, 3 after that. A hint costs 15 coins (free for 14 to 18,
     one per question).
   - Stars at the end of a lesson: 3 for all right, 2 for at least half,
     1 for the rest. So every mistake can cost a star.
   - "Practice the ones I missed" asks only those again, answers in a new
     order, so the player remembers the answer, not where the button was.
   - Leaving half way asks first, so a stray tap on ✕ loses nothing.

   The question types (see data/lessons/FORMAT.md):
     choice    pick one answer
     realfake  Real or Fake?
     spot      tap every red flag on a fake screen
     tap       tap the one safe thing
     order     tap the steps in the right order

   In this file, in order:
     Settings          coins and the hint price
     The quiz          what is being played right now
     Starting a quiz   startQuiz, startSpotCheck
     One question      drawing the question and its answers
     Taps              what happens when each type is answered
     Hints             the hint chip and what a hint does
     After an answer   the sheet that says right or wrong
     Leaving           the ✕ and the Escape key
     Results           the score screen at the end
   ======================================================================== */

import { findLesson } from "../../data/lessons/index.js";
import { findAge } from "../../data/ages.js";
import { pictureHtml } from "../pictures.js";
import { saveLessonResult, improveLesson, lessonResult, coins, addCoins, spendCoins, recordAnswer, answeredBefore, markSpotCheckDone, certificateSeen } from "../store.js";
import { showScreen, lessonMode, $, $all, shuffle, askFirst, appHeaderHtml } from "../ui.js";
import { lessonBarHtml, replaceOnClick } from "./learn.js";
import { confetti } from "../confetti.js";
import { isOpen } from "./path.js";
import { progressFor, certificateUnlocked } from "./me.js";
import { spotCheckDue } from "./practice.js";
import { playSound } from "../settings.js";

/* ---------- Settings ---------- */

const COINS_FIRST_TIME = 10;   // the first time a question is ever answered right
const COINS_AGAIN = 3;         // replays, practice and Spot Check
const HINT_PRICE = 15;

/* ---------- The quiz ---------- */

// Everything about the questions being played right now.
let quiz = null;

// The age group being played, for its words (see data/ages.js).
function age() {
  return findAge(quiz.ageId);
}

// Ages 14 to 18 are called "crew" in the code.
function isTeen() {
  return quiz.ageId === "crew";
}

// Teens get hints free, one per question. Younger players pay coins.
function freeHints() {
  return isTeen();
}

// The coin count in the top bar, like "🪙 45".
function coinText() {
  return age().coin.icon + " " + coins();
}

// The question on screen now, and where it came from.
function current() {
  const item = quiz.items[quiz.step];
  return { item, q: item.lesson.quiz[item.n] };
}

/* ---------- Starting a quiz ---------- */

/* Start a lesson's quiz.
   questionNumbers  which questions to ask (their places in lesson.quiz).
   isPractice       true when practicing the missed ones. */
export function startQuiz(ageId, categoryId, lessonId, questionNumbers, isPractice) {
  const lesson = findLesson(ageId, categoryId, lessonId);
  // A lesson that does not exist yet, or is still locked, sends the player back to its world.
  if (!lesson || lesson.soon || !isOpen(ageId, lessonId)) {
    location.replace("#/age/" + ageId + "/path/" + categoryId);
    return;
  }

  const numbers = questionNumbers || lesson.quiz.map((_, i) => i);
  begin({
    ageId, worldId: categoryId, lesson,
    items: numbers.map(n => ({ lesson, n })),
    mode: isPractice ? "practice" : "lesson"
  });
}

/* Start a Spot Check: a mix of questions from lessons already done.
   items is a list of { lesson, n } made by screens/practice.js.
   wasDue says if it was due, or played early (see store.js). */
export function startSpotCheck(ageId, items, wasDue) {
  begin({ ageId, worldId: "", lesson: null, items, mode: "spotcheck", wasDue });
}

// Set up a fresh quiz and show its first question.
function begin(settings) {
  quiz = Object.assign(settings, { step: 0, missed: [], earned: 0, touched: false });
  // Remember if this world's badge was already earned, to cheer when it is.
  quiz.badgeBefore = worldBadge();
  // Clear any confetti still falling from the last results screen.
  document.querySelectorAll(".confetti").forEach(c => c.remove());
  showQuestion();
}

// Has this world's badge been earned? (Spot Check has no world.)
function worldBadge() {
  if (!quiz.worldId) return false;
  const world = progressFor(quiz.ageId).worlds.find(w => w.category.id === quiz.worldId);
  return Boolean(world && world.badge);
}

/* ---------- One question ---------- */

// Draw the question on screen, then make its buttons work.
function showQuestion() {
  const { item, q } = current();
  quiz.hintUsed = false;

  const coinCount = '<span class="coin-count" id="coins"' + (isTeen() ? " hidden" : "") + ">" + coinText() + "</span>";
  const progress = quiz.step / quiz.items.length;
  // Spot Check mixes lessons from many worlds, so only color the screen for this lesson's own world.
  const worldColor = item.lesson === quiz.lesson ? quiz.worldId : "";

  lessonMode(true);
  showScreen(
      lessonBarHtml(quiz.ageId, progress, coinCount, quiz.worldId)
    + '<article class="quiz-card">'
    +   '<div class="quiz-top"><span class="quiz-count">' + questionLabel() + (quiz.step + 1) + " of " + quiz.items.length + "</span></div>"
    +   '<h1 class="quiz-question">' + q.question + "</h1>"
    +   bodyHtml(q)
    +   (hasHint(q) ? '<div class="hint-row"><button class="hint-chip" id="hint" type="button"></button></div>' : "")
    + "</article>"
    // The bottom bar stays empty until the player answers. Then it shows right or wrong.
    + '<div id="bottom" aria-live="polite"></div>',
    worldColor
  );

  wire(q);
  wireLeave();
  watchForFirstTap();
  const hint = $("#hint");
  if (hint) {
    drawHintChip();
    hint.addEventListener("click", () => useHint(q));
  }
}

// The word before the question number, like "Question 2 of 4".
function questionLabel() {
  if (quiz.mode === "spotcheck") return "Spot Check ";
  if (quiz.mode === "practice") return isTeen() ? "Redo " : "Try again ";
  return "Question ";
}

// What goes under the question, for each type.
function bodyHtml(q) {
  if (q.type === "choice") {
    return pictureHtml(q.picture, "plain") + answersHtml(shuffle(q.answers));
  }
  if (q.type === "realfake") {
    // Real and Fake always sit in the same place, so it is about the screen, not the buttons.
    // Ages 6 to 13 get a reminder of what Real and Fake mean.
    const key = isTeen() ? ""
      : '<p class="realfake-key"><b>Real</b> means true and safe. <b>Fake</b> means a trick or made up.</p>';
    const buttons = [
      { text: '<span aria-hidden="true">👍</span> Real', right: q.answer === "real" },
      { text: '<span aria-hidden="true">🚩</span> Fake', right: q.answer === "fake" }
    ];
    return pictureHtml(q.picture, "plain") + answersHtml(buttons, true) + key;
  }
  if (q.type === "spot") {
    const flagCount = q.picture.parts.filter(p => p.flag).length;
    return '<p class="spot-count" id="spot-count" aria-live="polite">0 of ' + flagCount + " found</p>"
      + pictureHtml(q.picture, "spot")
      + '<p class="spot-note" id="spot-note" aria-live="polite"></p>';
  }
  if (q.type === "tap") {
    return pictureHtml(q.picture, "tap");
  }
  if (q.type === "order") {
    return orderHtml(q);
  }
  return "";
}

// The answer buttons for choice and Real or Fake. sideBySide is for Real and Fake.
function answersHtml(answers, sideBySide) {
  const buttons = answers.map((answer, i) =>
    '<button class="answer" type="button" data-right="' + (answer.right ? "yes" : "no") + '">'
    + (sideBySide ? "" : '<span class="letter" aria-hidden="true">' + "ABCD"[i] + "</span>")
    + '<span class="answer-text">' + answer.text + "</span></button>"
  ).join("");
  return '<div class="answers' + (sideBySide ? " two" : "") + '">' + buttons + "</div>";
}

/* The steps of an order question, mixed up. Each button keeps its right
   place in data-i, so the taps can be checked. */
function orderHtml(q) {
  const steps = q.steps.map((text, i) => ({ text, i }));
  let mixed = shuffle(steps);
  // Never start in the right order already.
  while (mixed.every((step, place) => step.i === place)) mixed = shuffle(steps);
  const buttons = mixed.map(step =>
    '<button class="answer order-step" type="button" data-i="' + step.i + '">'
    + '<span class="letter" aria-hidden="true"></span><span class="answer-text">' + step.text + "</span></button>"
  ).join("");
  return '<p class="spot-count" id="order-heading">Tap them in order: first to last.</p><div class="answers" id="order">' + buttons + "</div>";
}

/* ---------- Taps ---------- */

// Make the answer buttons work, for each type of question.
function wire(q) {
  if (q.type === "choice" || q.type === "realfake") wireAnswers(q);
  if (q.type === "tap") wireTap(q);
  if (q.type === "spot") wireSpot(q);
  if (q.type === "order") wireOrder(q);
}

// Choice and Real or Fake: one tap answers the question.
function wireAnswers(q) {
  $all(".answer").forEach(button => button.addEventListener("click", () => {
    const right = button.dataset.right === "yes";
    showReply(q, button);
    lockAnswers(button, q.type === "choice");
    finish(right, q);
  }));
}

/* "Pick your reply" questions: the reply the player picked appears in the
   chat as their own message, so they see what they just "sent". */
function showReply(q, button) {
  if (q.type !== "choice" || !/pick your reply/i.test(q.question)) return;
  const chat = $(".picture.chat .bubbles, .picture.text .bubbles");
  if (!chat) return;
  const words = button.querySelector(".answer-text").innerHTML;
  chat.insertAdjacentHTML("beforeend", '<div class="part role-me sent">' + words + "</div>");
}

/* Choice and Real or Fake: show which was right, and which was picked.
   withMarks: a ✅ or ❌ at the end of the button. Real and Fake already
   have their own icons, so they only change color. */
function lockAnswers(picked, withMarks) {
  $all(".answer").forEach(button => {
    button.disabled = true;
    if (button.dataset.right === "yes") {
      button.classList.add("is-right");
      if (withMarks) button.insertAdjacentHTML("beforeend", '<span class="mark" aria-hidden="true">✅</span>');
    } else if (button === picked) {
      button.classList.add("is-wrong");
      if (withMarks) button.insertAdjacentHTML("beforeend", '<span class="mark" aria-hidden="true">❌</span>');
    } else {
      button.classList.add("faded");
    }
  });
}

/* Tap the one safe thing. After one tap every part locks, and the safe
   one turns green, so the player sees it even after a wrong tap. */
function wireTap(q) {
  const parts = q.picture.parts;
  $all("button.part").forEach(button => button.addEventListener("click", () => {
    const part = parts[Number(button.dataset.i)];
    $all("button.part").forEach(b => {
      b.disabled = true;
      if (parts[Number(b.dataset.i)].right) {
        b.classList.add("is-right");
        addTag(b, "right", "Safe");
      }
    });
    // A red ring alone would look like a red flag, so the wrong tap is labeled.
    if (!part.right) {
      button.classList.add("is-wrong");
      addTag(button, "wrong", "Your tap");
    }
    finish(Boolean(part.right), q);
  }));
}

// A small word on a fake-screen part after it is tapped: "Safe", "Your tap" or
// "Fine", so the colors never have to be guessed.
function addTag(button, kind, words) {
  button.insertAdjacentHTML("beforeend", '<span class="part-tag ' + kind + '">' + words + "</span>");
}

/* Spot the red flags. Every part can be tapped except the ✕, which is just
   part of the window. A red flag turns red with its number and says why.
   A normal part says so. One stray tap still counts as right, because
   tapping around to look is how children explore. */
function wireSpot(q) {
  const parts = q.picture.parts;
  const flagCount = parts.filter(p => p.flag).length;
  const normalCount = $all("button.part").length - flagCount;
  const allowedMistakes = 1;   // one stray tap is fine; tapping everything is not
  let found = 0;
  let mistakes = 0;

  $all("button.part").forEach(button => button.addEventListener("click", () => {
    const part = parts[Number(button.dataset.i)];
    if (button.classList.contains("found") || button.classList.contains("normal")) return;   // tapped already
    const note = $("#spot-note");
    button.classList.remove("hinted");
    if (part.flag) {
      found++;
      button.classList.add("found");
      button.insertAdjacentHTML("afterbegin", '<span class="flag-badge" aria-hidden="true">' + found + "</span>");
      note.innerHTML = "🚩 <b>Red flag " + found + ".</b> " + part.why;
      $("#spot-count").textContent = found + " of " + flagCount + " found";
    } else {
      mistakes++;
      button.classList.add("normal");
      addTag(button, "fine", "Fine");
      note.innerHTML = "Not one of the red flags. Keep looking.";
    }
    if (found === flagCount) {
      $all("button.part").forEach(b => { b.disabled = true; });
      note.innerHTML = "";   // the sheet says it all now
      const right = mistakes <= allowedMistakes && mistakes < normalCount;
      finish(right, q, spotMistakeLine(mistakes, right, normalCount));
    }
  }));
}

// After all the red flags are found: one line about any stray taps.
function spotMistakeLine(mistakes, right, normalCount) {
  if (!mistakes) return "";
  if (right) return "You found them all. Next time, tap only the red flags.";
  if (mistakes >= normalCount) return "You tapped every part. Try to find only the red flags.";
  return "You found them all, but also tapped " + mistakes + " parts that were fine.";
}

/* Put in order. Tap the first step, then the next. One wrong tap and the
   right order is shown. At the end the steps move into the right order,
   1 at the top, so the last thing the player sees is the right answer. */
function wireOrder(q) {
  let next = 0;   // the place of the step that should be tapped next
  $all(".order-step").forEach(button => button.addEventListener("click", () => {
    const place = Number(button.dataset.i);
    button.classList.remove("hinted");
    if (place === next) {
      next++;
      button.disabled = true;
      button.classList.add("is-right");
      button.querySelector(".letter").textContent = next;
      if (next === q.steps.length) {
        putInOrder();
        finish(true, q);
      }
      return;
    }
    // Wrong step. The list turns into the right order, all green and numbered,
    // so it reads as the answer. What the player tapped is said in words in
    // the sheet, instead of a red mark on a step that is in the right place.
    $all(".order-step").forEach(b => {
      b.disabled = true;
      b.querySelector(".letter").textContent = Number(b.dataset.i) + 1;
      b.classList.add("is-right");
    });
    putInOrder();
    const heading = $("#order-heading");
    if (heading) heading.textContent = "The right order:";
    finish(false, q, orderMistakeLine(q.steps[place], next + 1, place + 1));
  }));
}

// One plain sentence about the step tapped too early.
// tappedAs: the place the player gave it. belongs: its real place.
function orderMistakeLine(stepText, tappedAs, belongs) {
  const step = "“" + stepText + "”";
  if (quiz.ageId === "explore") return "You tapped " + step + " too soon. It is step " + belongs + ".";
  return "You picked " + step + " as step " + tappedAs + ". It is step " + belongs + ".";
}

// Move the order buttons so they sit in the right order, first at the top.
function putInOrder() {
  const box = $("#order");
  const sorted = $all(".order-step").sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i));
  sorted.forEach(b => box.appendChild(b));
}

/* ---------- Hints ---------- */

// Only choice, spot and order questions have a hint.
function hasHint(q) {
  return q.type === "choice" || q.type === "spot" || q.type === "order";
}

// The chip says what a hint costs, and is switched off when it can't be used.
// message, when given, shows in place of the price for a moment (see flash).
function drawHintChip(message) {
  const hint = $("#hint");
  if (!hint) return;
  const icon = age().coin.icon;
  let price = freeHints() ? "Free" : HINT_PRICE + " " + icon;
  let off = false;
  if (freeHints() && quiz.hintUsed) {
    price = "Used";
    off = true;
  } else if (!freeHints() && coins() < HINT_PRICE) {
    price = "Need " + HINT_PRICE + " " + icon;
    off = true;
  }
  hint.disabled = off;
  hint.innerHTML = '<span aria-hidden="true">💡</span> Hint <small>' + (message || price) + "</small>";
}

/* What a hint does:
   choice  takes away one wrong answer
   spot    puts a yellow ring on one red flag not found yet
   order   puts a yellow ring on the next step
   The player pays only when the hint really helps. */
function useHint(q) {
  if (q.type === "choice") {
    const wrongOnes = $all('.answer[data-right="no"]:not(.removed)');
    if (wrongOnes.length <= 1) { flash("Only one wrong answer left!"); return; }
    if (!pay()) return;
    const gone = wrongOnes[Math.floor(Math.random() * wrongOnes.length)];
    gone.classList.add("removed");
    gone.disabled = true;
  }
  if (q.type === "spot") {
    // A part already showing "Look here" is still waiting: no charge for the same help twice.
    if ($(".part.hinted")) { flash("Look for the yellow ring"); return; }
    const notFound = $all("button.part:not(.found):not(.normal)").filter(b => q.picture.parts[Number(b.dataset.i)].flag);
    if (!notFound.length) return;
    if (!pay()) return;
    notFound[0].classList.add("hinted");
  }
  if (q.type === "order") {
    if ($(".order-step.hinted")) { flash("Look for the yellow ring"); return; }
    const doneCount = $all(".order-step.is-right").length;
    const nextStep = $all(".order-step").find(b => Number(b.dataset.i) === doneCount);
    if (!nextStep || nextStep.disabled) return;
    if (!pay()) return;
    nextStep.classList.add("hinted");
  }
  drawHintChip();
}

// Pay for a hint. Returns false when it can't be paid for.
function pay() {
  if (freeHints()) {
    if (quiz.hintUsed) return false;
    quiz.hintUsed = true;
    return true;
  }
  if (!spendCoins(HINT_PRICE)) {
    drawHintChip();
    return false;
  }
  $("#coins").textContent = coinText();
  return true;
}

// A short message on the hint chip, then it goes back to normal.
let flashTimer = 0;
function flash(text) {
  drawHintChip(text);
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => drawHintChip(), 1800);
}

/* ---------- After an answer ---------- */

/* Every question type ends here. It saves the answer, gives coins for a
   right one, and slides up the sheet that says right or wrong and why.
   extra is a line to show in place of the right answer (spot and order). */
function finish(right, q, extra) {
  const { item } = current();
  const hint = $("#hint");
  if (hint) hint.closest(".hint-row").hidden = true;   // no hints after answering

  // Check this before saving the answer, or it would always look answered before.
  const firstEver = !answeredBefore(item.lesson.id, item.n);
  recordAnswer(item.lesson.id, item.n, right);
  playSound(right ? "right" : "wrong");
  const amount = firstEver && quiz.mode === "lesson" ? COINS_FIRST_TIME : COINS_AGAIN;
  if (right) {
    quiz.earned += amount;
    addCoins(amount);
    $("#coins").textContent = coinText();
  } else {
    quiz.missed.push(quiz.step);
  }

  const isLast = quiz.step === quiz.items.length - 1;
  // Show the coins earned, so children see where coins come from (not for teens).
  const coinsLine = right && !isTeen()
    ? ' <span class="sheet-coins">+' + amount + " " + age().coin.icon + "</span>"
    : "";
  const words = age().words;
  const bottom = $("#bottom");
  bottom.className = "bottom-bar sheet " + (right ? "right" : "wrong");
  bottom.innerHTML =
      '<div class="sheet-text">'
    +   '<div class="sheet-title">' + (right ? words.right : words.wrong) + coinsLine + "</div>"
    +   answerLineHtml(right, q, extra)
    +   '<div class="sheet-why">' + q.why + "</div>"
    + "</div>"
    + '<button class="button wide" id="next" type="button">' + (isLast ? "See my score" : "Continue") + "</button>";

  const next = $("#next");
  next.addEventListener("click", () => {
    quiz.step++;
    if (quiz.step < quiz.items.length) showQuestion();
    else showResults();
  });
  next.focus({ preventScroll: true });
  // Scroll to the end, so the answers sit just above the sheet instead of under it.
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
}

// The bold line on the sheet: the extra line if there is one, else the right answer after a wrong one.
function answerLineHtml(right, q, extra) {
  if (extra) return '<div class="sheet-why"><b>' + extra + "</b></div>";
  if (right) return "";
  return '<div class="sheet-why"><b>' + rightAnswerText(q) + "</b></div>";
}

// The right answer, in words, for "Not quite" and for "See what I missed".
function rightAnswerText(q) {
  if (q.type === "choice") return "The right answer: " + q.answers.find(a => a.right).text;
  if (q.type === "realfake") return "It was " + q.answer + ".";
  if (q.type === "tap") return "The safe thing to tap: " + q.picture.parts.find(p => p.right).text;
  if (q.type === "order") return "The order: " + q.steps.map((s, i) => (i + 1) + ". " + s).join(" ");
  if (q.type === "spot") return "The red flags: " + q.picture.parts.filter(p => p.flag).map(p => p.text).join(" · ");
  return "";
}

/* ---------- Leaving ---------- */

/* The ✕ (and the Escape key) leave the quiz. Once a question has been
   answered, it asks first, so a stray tap does not throw the answers away. */
function wireLeave() {
  const quit = $("#quit");
  quit.addEventListener("click", e => {
    if (!quiz.step && !quiz.touched) return;   // nothing tapped yet: just leave
    e.preventDefault();
    askFirst({
      title: "Leave the quiz?",
      text: isTeen() ? "Your score for this quiz won't count." : "Your score for this quiz won't count. You keep your coins.",
      stay: "Keep going",
      leave: "Leave",
      onLeave: () => location.replace(quit.getAttribute("href"))
    });
  });
}

// Any tap on an answer counts as started, so leaving asks first. The hint chip does not count.
function watchForFirstTap() {
  $(".quiz-card").addEventListener("click", e => {
    if (e.target.closest("button") && !e.target.closest("#hint")) quiz.touched = true;
  });
}

/* Escape works like the ✕. This is set up once, when the file loads, and
   does nothing unless a quiz is on screen. It also does nothing while the
   "Leave the quiz?" sheet (#ask) or the Help sheet is open, since those
   sheets use Escape to close themselves. */
document.addEventListener("keydown", e => {
  if (e.key !== "Escape" || document.getElementById("ask") || document.getElementById("help-sheet")) return;
  const quit = document.querySelector(".quiz-card") && document.getElementById("quit");
  if (quit) quit.click();
});

/* ---------- Results ---------- */

/* The results screen. What it shows depends on what was played:
   - a lesson: stars, the score, coins, the rule to keep
   - practicing the missed ones: if they are all right now, the lesson
     goes up a star (see store.js improveLesson)
   - a Spot Check: the score and when the next one is best
   Teens see plain scores: no stars and no XP.
   The score is saved first, because the badge and certificate news read
   the saved progress. */
function showResults() {
  const total = quiz.items.length;
  const missedCount = quiz.missed.length;
  const right = total - missedCount;
  const { stars, note } = saveResult(right, total);
  const progress = progressFor(quiz.ageId);

  lessonMode(true);
  showScreen(
      appHeaderHtml(age())
    + '<section class="results">'
    +   (showStars() ? starsHtml(stars) : "")
    +   "<h1>" + right + " of " + total + " right</h1>"
    +   '<p class="cheer">' + cheerText(right, total, stars) + "</p>"
    +   (note ? '<p class="result-note">' + note + "</p>" : "")
    +   earnedHtml()
    +   badgeNewsHtml(progress) + certificateNewsHtml(progress)
    +   keepBoxHtml()
    +   missedHtml()
    + "</section>"
    + resultsButtonsHtml(),
    quiz.worldId
  );
  replaceOnClick($("#done"));
  playSound("done");

  if (stars >= 2 && age().words.confetti && quiz.mode !== "spotcheck") confetti();
  if (missedCount) wirePracticeMissed();
}

/* Save the result, and work out the stars to show and the one line under
   the score that explains what changed. Returns { stars, note }. */
function saveResult(right, total) {
  const stars = starsFor(right, total);
  if (quiz.mode === "lesson") {
    saveLessonResult(quiz.lesson.id, stars, right, total);
  }
  if (quiz.mode === "practice" && quiz.lesson) {
    return practiceResult(stars, total);
  }
  if (quiz.mode === "spotcheck") {
    return { stars, note: spotCheckNote() };
  }
  return { stars, note: "" };
}

// 3 stars for all right, 2 for at least half, 1 for the rest.
function starsFor(right, total) {
  if (right === total) return 3;
  if (right >= Math.ceil(total / 2)) return 2;
  return 1;
}

/* After practicing the missed ones. All right now: the lesson goes up a
   star (if it can). Some still missed: the lesson keeps its old stars. */
function practiceResult(stars, total) {
  const lessonId = quiz.lesson.id;
  if (!quiz.missed.length) {
    const better = improveLesson(lessonId, total);
    if (!better) return { stars, note: "" };
    const note = isTeen()
      ? "Fixed. Lesson score now " + better.right + " of " + better.total + "."
      : "You fixed them! This lesson now has " + better.stars + " of 3 stars.";
    return { stars: better.stars, note };
  }
  const saved = lessonResult(lessonId);
  const note = isTeen()
    ? "Lesson score stays " + (saved ? saved.right + " of " + saved.total : "the same") + "."
    : "Get them all right to add a star to this lesson.";
  return { stars: saved ? saved.stars : stars, note };
}

// Mark the Spot Check as done, and say when the next one is best (if it is not due already).
function spotCheckNote() {
  markSpotCheckDone(quiz.ageId, quiz.wasDue);
  const next = spotCheckDue(quiz.ageId);
  if (next.due) return "";
  const day = new Date(next.nextAt).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  return "Next Spot Check: " + day + ".";
}

// Stars show for lessons and practice, not for Spot Check, and never for teens.
function showStars() {
  return !isTeen() && quiz.mode !== "spotcheck";
}

// The row of three stars, lit up to the number earned.
function starsHtml(stars) {
  const row = '<span class="star-on">⭐</span>'.repeat(stars) + '<span class="star-off">⭐</span>'.repeat(3 - stars);
  return '<div class="result-stars" role="img" aria-label="' + stars + ' of 3 stars">' + row + "</div>";
}

// The line under the score.
function cheerText(right, total, stars) {
  const words = age().words;
  if (quiz.mode === "practice" && !quiz.missed.length) {
    return isTeen() ? "All correct." : "You got them all this time!";
  }
  if (right === total) return words.perfect;
  if (stars === 1) return words.low;
  return words.some;
}

// The coins earned in this quiz (not shown to teens).
function earnedHtml() {
  if (!quiz.earned || isTeen()) return "";
  const coin = age().coin;
  return '<div class="earned">' + coin.icon + " +" + quiz.earned + " " + coin.name + "</div>";
}

/* A badge moment when this quiz earned its world's badge. Or, when every
   lesson in the world is done but some answers are still wrong, a note on
   how to get the badge. Nothing for Spot Check. */
function badgeNewsHtml(progress) {
  if (!quiz.worldId) return "";
  const world = progress.worlds.find(w => w.category.id === quiz.worldId);
  if (!world) return "";
  const name = world.category.name;

  if (world.badge && !quiz.badgeBefore) {
    const worldsToGo = progress.worlds.filter(w => w.ready && !w.badge).length;
    const icon = isTeen() ? "✓" : "🏅";
    const news = isTeen() ? name + " complete." : name + " badge earned!";
    const toGo = worldsToGo ? " " + worldsToGo + (isTeen() ? " topics" : " to go") + "." : "";
    return '<p class="badge-news"><span aria-hidden="true">' + icon + "</span> " + news + toGo + "</p>";
  }
  if (!world.badge && world.done === world.ready) {
    const howTo = isTeen()
      ? "Redo the missed ones to complete this topic."
      : "Get the missed ones right to earn the " + name + " badge.";
    return '<p class="badge-news soft">' + howTo + "</p>";
  }
  return "";
}

// The lesson that earns the last badge unlocks the certificate: say where it is.
function certificateNewsHtml(progress) {
  if (!quiz.lesson || !certificateUnlocked(progress) || certificateSeen(quiz.ageId)) return "";
  const news = isTeen() ? "Every topic complete." : "Every badge earned!";
  return '<p class="certificate-news"><span aria-hidden="true">🏆</span> ' + news
    + ' Your certificate is ready on <a href="#/age/' + quiz.ageId + '/me">Me</a>.</p>';
}

// The lesson's rule to remember. Spot Check has no lesson, so it says why it is there.
function keepBoxHtml() {
  const rule = quiz.lesson ? quiz.lesson.rule : "Spot Check brings back what you learned, so it sticks.";
  return '<div class="keep-box"><span class="keep-icon" aria-hidden="true">💡</span><div>'
    + '<div class="keep-label">Keep this</div><div class="keep-text">' + rule + "</div></div></div>";
}

// "See what I missed": each missed question with its right answer, folded away until tapped.
function missedHtml() {
  const missedCount = quiz.missed.length;
  if (!missedCount) return "";
  const rows = quiz.missed.map(step => {
    const item = quiz.items[step];
    const q = item.lesson.quiz[item.n];
    return "<li><b>" + q.question + "</b><span>✅ " + rightAnswerText(q) + "</span></li>";
  }).join("");
  return '<details class="missed"><summary>See what I missed (' + missedCount + ")</summary><ul>" + rows + "</ul></details>";
}

// The buttons at the bottom: try the missed ones again (if any), and Continue.
function resultsButtonsHtml() {
  const missedCount = quiz.missed.length;
  const back = quiz.worldId ? "#/age/" + quiz.ageId + "/path/" + quiz.worldId : "#/age/" + quiz.ageId + "/practice";
  // When something was missed, trying it again is the main button.
  const tryAgain = missedCount
    ? '<button class="button wide" id="practice" type="button">' + tryAgainLabel(missedCount) + "</button>"
    : "";
  return '<div class="bottom-bar">'
    + tryAgain
    + '<a class="button wide' + (missedCount ? " quiet" : "") + '" id="done" href="' + back + '">Continue</a>'
    + "</div>";
}

// The words on the try-again button.
function tryAgainLabel(missedCount) {
  if (isTeen()) return "🔁 Redo the " + missedCount + " missed";
  return "🔁 Try the " + (missedCount === 1 ? "one" : missedCount) + " I missed again";
}

// The try-again button starts a new quiz of just the missed questions, in a new order.
function wirePracticeMissed() {
  const again = shuffle(quiz.missed.map(step => quiz.items[step]));
  const settings = { ageId: quiz.ageId, worldId: quiz.worldId, lesson: quiz.lesson, items: again, mode: "practice" };
  $("#practice").addEventListener("click", () => begin(settings));
}
