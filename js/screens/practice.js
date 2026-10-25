/* ========================================================================
   screens/practice.js
   Spot Check: up to 5 quick questions from lessons already finished.

   Why: people forget warnings after a few weeks, and practice spread out
   over time sticks much better than one long go. So Spot Check is "due"
   2 days after the first one, then 1 week, 3 weeks and 2 months later.
   It can always be played early (that does not change the schedule).
   There are no streaks and nothing is lost for skipping one.
   Each age group keeps its own schedule.

   Which questions: ones missed last time come first, then the ones
   missed most often, then the ones not seen for the longest.

   #/age/squad/practice        the Spot Check card
   #/age/squad/practice/play   playing a Spot Check

   In this file, in order:
     Settings        the schedule and how many questions
     The questions   which questions can come up, and which are picked
     The schedule    spotCheckDue (path.js and quiz.js use it too)
     The screens     showPractice, playSpotCheck
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { pathFor } from "../../data/lessons/index.js";
import { lessonResult, answerHistory, spotCheckState, spotChecksPlayed } from "../store.js";
import { showScreen, bottomNavHtml, shuffle, appHeaderHtml } from "../ui.js";
import { startSpotCheck } from "./quiz.js";

/* ---------- Settings ---------- */

const DAY = 24 * 60 * 60 * 1000;            // one day in milliseconds
const GAPS_IN_DAYS = [0, 2, 7, 21, 60];    // before the 1st, 2nd, 3rd, 4th, 5th Spot Check
const HOW_MANY = 5;

/* ---------- The questions ---------- */

// Every question from every finished lesson in this age group.
function questionsDone(ageId) {
  const list = [];
  pathFor(ageId).forEach(unit => unit.lessons.forEach(lesson => {
    if (lesson.soon || !lessonResult(lesson.id)) return;
    lesson.quiz.forEach((_, n) => list.push({ lesson, n }));
  }));
  return list;
}

/* Pick the questions: missed last time first, then most missed, then oldest.
   Each question gets a score, and the highest scores win. They are mixed
   up first, so questions with the same score come up in a new order. */
function pickQuestions(ageId) {
  const history = answerHistory();
  const scored = shuffle(questionsDone(ageId)).map(item => {
    const saved = history[item.lesson.id + "#" + item.n];
    // A question with no history yet counts as seen a week ago, not as missed.
    const seen = saved || { right: true, misses: 0, at: Date.now() - 7 * DAY };
    const daysAgo = Math.min((Date.now() - seen.at) / DAY, 90);
    const score = (seen.right ? 0 : 1000) + seen.misses * 100 + daysAgo;
    return { item, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return shuffle(scored.slice(0, HOW_MANY).map(s => s.item));
}

/* ---------- The schedule ---------- */

// Midnight at the start of a day, so "due on Sunday" means all of Sunday.
function startOfDay(time) {
  const d = new Date(time);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/* Is a Spot Check due now? Returns { due, nextAt }, where nextAt is the
   time the next one is due. When no lesson is finished yet there is
   nothing to ask, and it also says none: true. */
export function spotCheckDue(ageId) {
  if (!questionsDone(ageId).length) return { due: false, nextAt: 0, none: true };
  const { count, last } = spotCheckState(ageId);
  if (count === 0) return { due: true, nextAt: 0 };
  const gapDays = GAPS_IN_DAYS[Math.min(count, GAPS_IN_DAYS.length - 1)];
  // Add the days on the calendar, then take the start of that day.
  const day = new Date(startOfDay(last));
  day.setDate(day.getDate() + gapDays);
  const nextAt = day.getTime();
  return { due: Date.now() >= nextAt, nextAt };
}

/* ---------- The screens ---------- */

// #/age/squad/practice: the Spot Check card.
export function showPractice(ageId) {
  const age = findAge(ageId);
  const state = spotCheckDue(ageId);
  const body = state.none ? noLessonsYetHtml(age) : spotCheckCardHtml(age, state);

  showScreen(
      appHeaderHtml(age, "history")
    + '<header class="page-top"><h1>Spot Check</h1></header>'
    + body
    + bottomNavHtml(age, "practice")
  );
}

// Before any lesson is finished there is nothing to check yet.
function noLessonsYetHtml(age) {
  return '<div class="practice-card">'
    + '<span class="practice-icon" aria-hidden="true">' + age.face + "</span>"
    + "<h2>Finish a lesson first</h2>"
    + "<p>Spot Check mixes questions from lessons you have done. Start one on the path.</p>"
    + '<a class="button wide" href="#/age/' + age.id + '/path">Go to the path</a></div>';
}

// The Spot Check card: ready now, or the day the next one is best.
function spotCheckCardHtml(age, state) {
  const howMany = Math.min(HOW_MANY, questionsDone(age.id).length);
  const nextDay = new Date(state.nextAt).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  const when = state.due
    ? '<span class="due on">Ready now</span>'
    : '<span class="due">Next one is best on ' + nextDay + "</span>";
  return '<div class="practice-card">'
    + '<span class="practice-icon" aria-hidden="true">🔁</span>'
    + "<h2>Spot Check</h2>"
    + when
    + "<p>" + howMany + " quick question" + (howMany === 1 ? "" : "s") + " from lessons you have done. The ones you missed come back first.</p>"
    + '<a class="button wide" id="go" href="#/age/' + age.id + '/practice/play">' + (state.due ? "Start Spot Check" : "Practice early") + "</a>"
    + '<p class="practice-done">Spot Checks done: ' + spotChecksPlayed(age.id) + "</p></div>"
    + '<p class="practice-why">Why come back? Warnings fade after a few weeks. A quick check every so often keeps them fresh.</p>';
}

// #/age/squad/practice/play: start a Spot Check.
export function playSpotCheck(ageId) {
  const state = spotCheckDue(ageId);
  if (state.none) { location.replace("#/age/" + ageId + "/practice"); return; }
  startSpotCheck(ageId, pickQuestions(ageId), state.due);
}
