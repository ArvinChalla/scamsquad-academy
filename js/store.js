/* ========================================================================
   store.js
   The game's notebook: the player's saved progress. It is kept on THIS
   device only, in localStorage (the browser's own notebook for a web
   page), under the name "scamsquad-v2". Nothing in it ever leaves the
   device: no file in the game sends any of it anywhere.

   What it saves, all inside one object:
     results          for each finished lesson: { stars, right, total }
     coins            coins earned by answering right, spent on hints
     answers          for each question ("lessonId#number"):
                      { right, at, misses, everRight }, for Spot Check
     spotChecks       for each age group: { count, last, played }
     gate             true once the 14 to 18 quick check is passed
     certificateSeen  for each age group: true once Me was opened with the
                      certificate ready
     name             the first name typed for the certificate (20 letters at most)
     hello            for each age group: true once the buddy's hello was seen
     tipOrders        for each age group: this device's own random order of tips
     firstVisit       when the first tip order was made, to count the weeks

   Some browsers block localStorage (private windows, school settings).
   So the notebook is also kept in memory while the page is open. If
   saving is blocked, the game still remembers everything during this
   visit, and only forgets when the page closes.

   In this file:
     Reading and saving        readAll, writeAll
     Lesson results            lessonResult, saveLessonResult
     Coins                     coins, addCoins, spendCoins
     Answers and Spot Check    recordAnswer, lessonMastered, improveLesson,
                               answerHistory, answeredBefore, spotCheckState,
                               markSpotCheckDone, spotChecksPlayed
     The 14 to 18 quick check  gateDone, markGateDone
     The certificate dot       certificateSeen, markCertificateSeen
     The first name            playerName, setPlayerName
     The buddy's hello         hasSeenHello, markHelloSeen
     Tips                      tipOrder
   ======================================================================== */

const KEY = "scamsquad-v2";
const STARTING_COINS = 30;   // enough for two hints on the very first lesson

/* ---------- Reading and saving ---------- */

// The notebook in memory. Filled from localStorage the first time it is read.
let memory = null;

// Read the whole notebook. Returns {} if there is nothing saved yet.
function readAll() {
  if (!memory) {
    try {
      memory = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
    } catch (error) {
      memory = {};
    }
  }
  // A copy, so a screen can change it and then save it with writeAll.
  return JSON.parse(JSON.stringify(memory));
}

// Save the whole notebook: in memory first, then on the device if allowed.
function writeAll(data) {
  memory = data;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    // Storage is blocked. That is fine. The memory copy keeps this visit going.
  }
}

/* ---------- Lesson results ---------- */

// The saved result for a lesson, like { stars: 2, right: 4, total: 5 }, or null.
export function lessonResult(lessonId) {
  const results = readAll().results || {};
  return results[lessonId] || null;
}

// Save a result, but only if it beats the old one (more stars, or the
// same stars with more right answers).
export function saveLessonResult(lessonId, stars, right, total) {
  const data = readAll();
  data.results = data.results || {};
  const old = data.results[lessonId];
  const better = !old || stars > old.stars || (stars === old.stars && right > old.right);
  if (better) {
    data.results[lessonId] = { stars: stars, right: right, total: total };
  }
  writeAll(data);
}

/* ---------- Coins ---------- */

// How many coins the player has. A new player starts with STARTING_COINS.
export function coins() {
  const saved = readAll().coins;
  return typeof saved === "number" ? saved : STARTING_COINS;
}

// Add coins, and return the new total.
export function addCoins(amount) {
  const data = readAll();
  data.coins = coins() + amount;
  writeAll(data);
  return data.coins;
}

// Spend coins. Returns false (and spends nothing) if there are not enough.
export function spendCoins(amount) {
  const have = coins();
  if (have < amount) return false;
  const data = readAll();
  data.coins = have - amount;
  writeAll(data);
  return true;
}

/* ---------- Answers and Spot Check ----------
   For each question: was it right last time, when, and how often it was
   missed. Spot Check uses this to bring back the ones that need practice. */

// Save one answer. A question's key is the lesson id, "#", and its number.
export function recordAnswer(lessonId, questionIndex, right) {
  const data = readAll();
  data.answers = data.answers || {};
  const key = lessonId + "#" + questionIndex;
  const old = data.answers[key] || { misses: 0 };
  data.answers[key] = {
    right: right,
    at: Date.now(),
    misses: old.misses + (right ? 0 : 1),
    // Answered right at least once, in the lesson, a replay or Spot Check.
    everRight: !!old.everRight || right
  };
  writeAll(data);
}

/* Has every question in this lesson been answered right at least once?
   A world's badge needs this for every lesson in it, so a badge means the
   player really knows it, not just that they clicked through. */
export function lessonMastered(lesson) {
  const answers = readAll().answers || {};
  return lesson.quiz.every((question, n) => (answers[lesson.id + "#" + n] || {}).everRight);
}

/* After practicing the missed ones and getting them all right, the
   lesson goes up one star (up to 3), and the fixed ones count as right.
   Returns the new result, or null if the lesson was never finished. */
export function improveLesson(lessonId, fixed) {
  const data = readAll();
  const old = (data.results || {})[lessonId];
  if (!old) return null;
  const better = {
    stars: Math.min(3, old.stars + 1),
    right: Math.min(old.total, old.right + fixed),
    total: old.total
  };
  data.results[lessonId] = better;
  writeAll(data);
  return better;
}

// Every saved answer, for Spot Check to choose from.
export function answerHistory() {
  return readAll().answers || {};
}

// Has this question ever been answered on this device? First answers earn
// full coins; leaving and starting again does not earn them twice.
export function answeredBefore(lessonId, questionIndex) {
  return !!(readAll().answers || {})[lessonId + "#" + questionIndex];
}

/* Spot Check, for each age group: how many have been done on time, and
   when the last one was. */
export function spotCheckState(ageId) {
  const all = readAll().spotChecks || {};
  const saved = all[ageId] || {};
  return { count: saved.count || 0, last: saved.last || 0 };
}

// wasDue: true when the Spot Check was due. Playing early is good practice,
// but it does not move the player on to the next, longer gap.
export function markSpotCheckDone(ageId, wasDue) {
  const data = readAll();
  const old = spotCheckState(ageId);
  data.spotChecks = data.spotChecks || {};
  const played = (data.spotChecks[ageId] || {}).played || 0;
  data.spotChecks[ageId] = {
    count: old.count + (wasDue ? 1 : 0),
    last: wasDue ? Date.now() : old.last,
    played: played + 1
  };
  writeAll(data);
}

// How many Spot Checks this age group has played, on time or early.
export function spotChecksPlayed(ageId) {
  return ((readAll().spotChecks || {})[ageId] || {}).played || 0;
}

/* ---------- The 14 to 18 quick check ----------
   Passed once on this device. Only "yes" is saved, nothing about the person. */

// Has the quick check been passed on this device?
export function gateDone() {
  return !!readAll().gate;
}

// Remember that the quick check was passed.
export function markGateDone() {
  const data = readAll();
  data.gate = true;
  writeAll(data);
}

/* ---------- Has the player opened their certificate yet? ----------
   When every badge is earned, a dot on the Me tab says the certificate
   is waiting. It goes away once the player opens Me. */

// Has this age group opened Me since the certificate was ready?
export function certificateSeen(ageId) {
  return !!(readAll().certificateSeen || {})[ageId];
}

// Remember that this age group opened Me, so the dot goes away.
export function markCertificateSeen(ageId) {
  const data = readAll();
  data.certificateSeen = data.certificateSeen || {};
  data.certificateSeen[ageId] = true;
  writeAll(data);
}

/* ---------- The first name for the certificate ----------
   Only ever kept on this device. Never sent anywhere. */

// The saved first name, or "" if there is none.
export function playerName() {
  return readAll().name || "";
}

// Save the first name, trimmed and cut to 20 letters at most.
export function setPlayerName(name) {
  const data = readAll();
  data.name = String(name || "").trim().slice(0, 20);
  writeAll(data);
}

/* ---------- The buddy's hello, shown once per age group ---------- */

// Has this age group seen its buddy's hello on this device?
export function hasSeenHello(ageId) {
  return !!(readAll().hello || {})[ageId];
}

// Remember that this age group has seen the hello.
export function markHelloSeen(ageId) {
  const data = readAll();
  data.hello = data.hello || {};
  data.hello[ageId] = true;
  writeAll(data);
}

/* ---------- Tips ---------- */

/* The order this device shows the tips in. The first time, it makes a
   random order and remembers it, so every device gets its own order.
   "count" is how many tips there are. A new order is made if the number
   of tips changes. The shuffle is written out here, not taken from ui.js,
   because ui.js already uses this file and the two must not depend on
   each other. */
export function tipOrder(count, ageId) {
  const data = readAll();
  data.tipOrders = data.tipOrders || {};
  const key = ageId || "explore";
  if (!data.tipOrders[key] || data.tipOrders[key].length !== count) {
    const order = [];
    for (let i = 0; i < count; i++) order.push(i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    data.tipOrders[key] = order;
    data.firstVisit = data.firstVisit || Date.now();
    writeAll(data);
  }
  return { order: data.tipOrders[key], firstVisit: data.firstVisit || Date.now() };
}
