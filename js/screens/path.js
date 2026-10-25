/* ========================================================================
   screens/path.js
   The learning path for one age group. Two screens:

   1. The worlds (#/age/squad/path)
      Seven big square cards, one per world (Gaming, Messages and calls...).
      Every world is open, so a player can start with the topic they care
      about. Each card shows how many lessons are done. The first world
      that is not finished says "Start here".

   2. One world's path (#/age/squad/path/gaming)
      The lessons as stops on a winding road, like Duolingo, with a trophy
      at the end. Ages 14 to 18 get a plain numbered list instead. The rules:
      - The first lesson of every world is open. Each next lesson in that
        world opens after the one before it is finished.
      - The open lesson that is not done yet is "next", with "Start here!".
      - Finished lessons show their stars and can be played again.
      - Tapping a locked lesson says which one to finish first.
      - Lessons that are not written yet show "Soon".

   In this file, in order:
     Working out the path   pathState, isOpen
     Screen 1               showWorlds, and the cards and line on it
     Screen 2               showWorld, the road, the course list, locked taps
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { pathFor } from "../../data/lessons/index.js";
import { lessonResult, lessonMastered, certificateSeen } from "../store.js";
import { showScreen, bottomNavHtml, safeText, showToast, $all, appHeaderHtml } from "../ui.js";
import { spotCheckDue } from "./practice.js";
import { progressFor, certificateUnlocked } from "./me.js";

// How far each stop sits from the middle, in pixels, so the road winds left and right.
const WIND = [0, 50, 70, 50, 0, -50, -70, -50];

/* ---------- Working out the path ---------- */

/* Work out the state of every world and lesson for this age group.
   Returns the units from pathFor(), each with extra facts added:
   readyCount, doneCount, finished, done (badge earned), hasNext, current,
   and lessonStates (each lesson with "soon", "done", "next" or "locked"). */
function pathState(ageId) {
  const units = pathFor(ageId);
  let foundCurrent = false;    // only one world says "Start here"

  units.forEach(unit => {
    let previousDone = true;   // the first lesson of every world is open
    let foundNext = false;     // only one lesson per world can be "next"
    let previousTitle = "";    // the lesson to finish first, for locked ones
    unit.readyCount = unit.lessons.filter(lesson => !lesson.soon).length;
    unit.lessonStates = unit.lessons.map(lesson => {
      if (lesson.soon) return { lesson, state: "soon" };
      const result = lessonResult(lesson.id);
      let state;
      if (result) {
        state = "done";
      } else if (previousDone && !foundNext) {
        state = "next";
        foundNext = true;
      } else {
        state = "locked";
      }
      const waitFor = previousTitle;
      previousDone = Boolean(result);
      previousTitle = lesson.title;
      return { lesson, state, result, waitFor };
    });
    unit.doneCount = unit.lessonStates.filter(s => s.state === "done").length;
    unit.finished = unit.readyCount > 0 && unit.doneCount === unit.readyCount;
    // The badge needs every question right once (see me.js), not just finishing.
    unit.done = unit.finished && unit.lessons.every(lesson => lesson.soon || lessonMastered(lesson));
    unit.hasNext = unit.lessonStates.some(s => s.state === "next");
    unit.current = unit.hasNext && !foundCurrent;
    if (unit.current) foundCurrent = true;
  });
  return units;
}

/* Is this lesson open to play? It is if every lesson before it in its own
   world is finished. Used so that typing a locked lesson's address does
   not skip ahead. */
export function isOpen(ageId, lessonId) {
  for (const unit of pathFor(ageId)) {
    if (!unit.lessons.some(lesson => lesson.id === lessonId)) continue;
    for (const lesson of unit.lessons) {
      if (lesson.soon) continue;
      if (lesson.id === lessonId) return true;
      if (!lessonResult(lesson.id)) return false;
    }
  }
  return false;
}

/* ---------- Screen 1: the seven worlds ---------- */

export function showWorlds(ageId) {
  const age = findAge(ageId);
  const units = pathState(age.id);
  const cards = units.map(unit => worldCardHtml(age, unit)).join("");

  showScreen(
      appHeaderHtml(age)
    + '<h1 class="worlds-title">' + age.words.worlds + "</h1>"
    + nextStepHtml(age, units)
    + '<div class="world-grid">' + cards + "</div>"
    + bottomNavHtml(age, "path")
  );
}

/* One world's card: its icon, name and how many lessons are done, plus a
   flag in the corner for a badge, missed answers to fix, or "Start here". */
function worldCardHtml(age, unit) {
  const category = unit.category;
  const style = "--strong:var(--" + category.id + ");--soft:var(--" + category.id + '-soft)';
  let cls = "world-card";
  let flag = "";
  if (!unit.readyCount) {
    cls += " empty";   // the card itself says "Coming soon"
  } else if (unit.done) {
    cls += " finished";
    flag = '<span class="world-flag">' + (age.id === "crew" ? "✓ Complete" : "🏅 Badge") + "</span>";
  } else if (unit.finished) {
    flag = '<span class="world-flag">🔁 ' + (age.id === "crew" ? "Redo missed" : "Fix missed") + "</span>";
  } else if (unit.current) {
    cls += " current";
    flag = '<span class="world-flag go">' + age.next.replace("!", "") + "</span>";
  }

  const percent = unit.readyCount ? Math.round(unit.doneCount / unit.readyCount * 100) : 0;
  const progress = unit.readyCount
    ? '<span class="world-progress"><i style="width:' + percent + '%"></i></span>'
      + '<span class="world-count">' + unit.doneCount + " of " + unit.readyCount + " lessons</span>"
    : '<span class="world-count">Coming soon</span>';

  return '<a class="' + cls + '" style="' + style + '" href="#/age/' + age.id + "/path/" + category.id + '">'
    + flag
    + '<span class="world-icon" aria-hidden="true">' + category.icon + "</span>"
    + '<span class="world-name">' + category.name + "</span>"
    + progress
    + "</a>";
}

/* One line at the top of the worlds screen that says what to do next:
   the certificate when it is ready, a Spot Check when it is due, or the
   next lesson. Nothing on the very first visit (the cards say Start here),
   except a short note for teens. */
function nextStepHtml(age, units) {
  const base = "#/age/" + age.id;
  const progress = progressFor(age.id);
  let icon, text, href;
  if (certificateUnlocked(progress) && !certificateSeen(age.id)) {
    icon = "🏆";
    href = base + "/me";
    text = age.id === "crew" ? "Every topic complete. Your certificate is on Me." : "You earned every badge! Your certificate is ready on Me.";
  } else if (progress.lessonsDone && spotCheckDue(age.id).due) {
    icon = "🔁";
    href = base + "/practice";
    text = age.id === "explore" ? "Your Spot Check is ready. 5 quick questions!" : "Your Spot Check is ready.";
  } else if (progress.lessonsDone) {
    const unit = units.find(u => u.current);
    const next = unit && unit.lessonStates.find(s => s.state === "next");
    if (!next) return "";
    icon = "▶";
    href = base + "/" + unit.category.id + "/" + next.lesson.id;
    text = (age.id === "crew" ? "Up next: " : "Next up: ") + next.lesson.title;
  } else {
    return age.id === "crew" ? '<p class="next-note">Pick any topic. 3 short lessons each, about 4 minutes.</p>' : "";
  }
  return '<a class="next-step" href="' + href + '"><span aria-hidden="true">' + icon + "</span><span>" + text + "</span></a>";
}

/* ---------- Screen 2: one world's winding path ---------- */

export function showWorld(ageId, worldId) {
  const age = findAge(ageId);
  const units = pathState(age.id);
  const unit = units.find(u => u.category.id === worldId);
  if (!unit) { showWorlds(ageId); return; }
  const category = unit.category;

  // Teens get a plain course list. Younger players get the winding road.
  let road;
  if (!unit.lessons.length) {
    road = emptyHtml(age);
  } else if (age.id === "crew") {
    road = courseListHtml(age, category, unit);
  } else {
    const stops = unit.lessonStates.map((s, i) => stopHtml(age, category, s, WIND[i % WIND.length])).join("");
    road = '<div class="road" id="road"><svg class="road-line" aria-hidden="true"></svg>' + stops + trophyHtml(age, unit) + "</div>";
  }
  road += worldNextHtml(age, units, unit);

  showScreen(
      appHeaderHtml(age, "#/age/" + age.id + "/path")
    + '<section class="world-head" style="--strong:var(--' + category.id + ");--soft:var(--" + category.id + '-soft)">'
    +   '<span class="world-head-icon" aria-hidden="true">' + category.icon + "</span>"
    +   '<div><h1 class="world-head-name">' + category.name + "</h1>"
    +   '<p class="world-head-rule">' + (age.id === "crew" ? "" : "⭐ ") + category.rule + "</p></div>"
    + "</section>"
    + road
    + bottomNavHtml(age, "path"),
    category.id
  );

  drawRoad();
  wireLocked();
  // Bring the next lesson into view, so a long road does not hide it.
  const next = document.querySelector(".node.next");
  if (next) next.scrollIntoView({ block: "center" });
}

// A world with no lessons written yet.
function emptyHtml(age) {
  const words = age.id === "crew"
    ? "<p><b>Lessons for this topic are on the way.</b><br>Pick another topic for now.</p>"
    : "<p><b>" + age.buddy + " is still making these lessons.</b><br>Pick another world for now.</p>";
  return '<div class="world-empty"><span aria-hidden="true">' + age.face + "</span>" + words + "</div>";
}

/* For ages 14 to 18: the lessons as a numbered course list, like a
   learning platform. Same rules as the road: one at a time, in order. */
function courseListHtml(age, category, unit) {
  const rows = unit.lessonStates.map((s, i) => {
    const lesson = s.lesson;
    const href = "#/age/" + age.id + "/" + category.id + "/" + lesson.id;
    let status;
    if (s.state === "done") status = '<span class="course-status done">✓ ' + s.result.right + "/" + s.result.total + "</span>";
    else if (s.state === "next") status = '<span class="course-status next">Start</span>';
    else if (s.state === "soon") status = '<span class="course-status">Soon</span>';
    else status = '<span class="course-status">🔒</span>';
    const inside = '<span class="course-num">' + (i + 1) + "</span>"
      + '<span class="course-text"><b>' + lesson.title + "</b><small>" + lesson.minutes + " min</small></span>" + status;
    // Done and next rows are links. Locked rows are buttons that say what to finish first.
    if (s.state === "done" || s.state === "next") return '<a class="course-row ' + s.state + '" href="' + href + '">' + inside + "</a>";
    if (s.state === "locked") return '<button class="course-row locked" type="button" data-locked="' + safeText(s.waitFor) + '">' + inside + "</button>";
    return '<div class="course-row ' + s.state + '">' + inside + "</div>";
  }).join("");
  return '<div class="course-list">' + rows + "</div>";
}

/* One stop on the road. s is one of the lessonStates from pathState().
   shift is how far the stop sits from the middle (see WIND). */
function stopHtml(age, category, s, shift) {
  const lesson = s.lesson;
  const href = "#/age/" + age.id + "/" + category.id + "/" + lesson.id;
  const open = '<div class="stop" style="--shift:' + shift + 'px">';
  const title = '<span class="stop-title">' + lesson.title + "</span>";
  const name = safeText(lesson.title);   // titles can have quotes, like "Don't Go"

  if (s.state === "soon") {
    return open + '<div class="node soon" role="img" aria-label="' + name + ', coming soon"><span aria-hidden="true">' + lesson.icon + "</span></div>"
      + title + '<span class="stop-note">Soon</span></div>';
  }
  if (s.state === "locked") {
    return open + '<button class="node locked" type="button" data-locked="' + safeText(s.waitFor) + '" aria-label="' + name + ', locked">'
      + '<span aria-hidden="true">🔒</span></button>'
      + title + "</div>";
  }
  if (s.state === "done") {
    const stars = "⭐".repeat(s.result.stars) + '<span class="dim">⭐</span>'.repeat(3 - s.result.stars);
    return open + '<a class="node done" href="' + href + '" aria-label="' + name + ", " + s.result.stars + ' stars. Play again">'
      + '<span aria-hidden="true">' + lesson.icon + "</span></a>"
      + title + '<span class="stop-stars" aria-hidden="true">' + stars + "</span></div>";
  }
  // The only state left is "next".
  return open + '<span class="start-here">' + age.next + "</span>"
    + '<a class="node next" href="' + href + '" aria-label="' + name + ', start">'
    + '<span aria-hidden="true">' + lesson.icon + "</span></a>"
    + title + "</div>";
}

/* The first lesson in a world that still has a question never answered
   right. Playing it again is how the badge is earned. */
function lessonToFix(unit) {
  const s = unit.lessonStates.find(s => s.state === "done" && !lessonMastered(s.lesson));
  return s && s.lesson;
}

/* The trophy at the end of the road. It turns into a medal once the badge
   is earned, and then it opens Me, where the badges are. If every lesson is
   played but a question was missed, it opens that lesson to try again. */
function trophyHtml(age, unit) {
  const shift = WIND[unit.lessonStates.length % WIND.length];
  const open = '<div class="stop" style="--shift:' + shift + 'px">';
  const fix = unit.finished && !unit.done ? lessonToFix(unit) : null;
  if (unit.done) {
    return open + '<a class="node trophy won" href="#/age/' + age.id + '/me" aria-label="Badge earned. See your badges">'
      + '<span aria-hidden="true">🏅</span></a><span class="stop-title">Badge earned!</span></div>';
  }
  if (fix) {
    return open + '<a class="node trophy" href="#/age/' + age.id + "/" + unit.category.id + "/" + fix.id + '" aria-label="World badge. Play ' + safeText(fix.title) + ' again to earn it">'
      + '<span aria-hidden="true">🏆</span></a><span class="stop-title">Get every answer right to earn it</span></div>';
  }
  return open + '<div class="node trophy" role="img" aria-label="World badge"><span aria-hidden="true">🏆</span></div>'
    + '<span class="stop-title">World badge</span></div>';
}

/* Under the road, once every lesson in the world is played: what to do
   next. Earn the badge if a question was missed, then the next world, then
   the certificate when every badge is earned. */
function worldNextHtml(age, units, unit) {
  if (!unit.finished) return "";
  const base = "#/age/" + age.id;
  const explore = age.id === "explore";
  let icon, text, href;
  const fix = unit.done ? null : lessonToFix(unit);
  if (fix) {
    icon = "🏆";
    href = base + "/" + unit.category.id + "/" + fix.id;
    text = explore ? "Play “" + fix.title + "” again. Get them all right to win the badge!"
                   : "Play “" + fix.title + "” again and get every answer right to earn the badge.";
  } else {
    // The next world that still has a lesson to play, starting after this one.
    const at = units.indexOf(unit);
    const others = units.slice(at + 1).concat(units.slice(0, at));
    const next = others.find(u => u.hasNext);
    // Every lesson played everywhere, but another world's badge is missing
    const noBadge = others.find(u => u.finished && !u.done);
    if (next) {
      icon = next.category.icon;
      href = base + "/path/" + next.category.id;
      text = (age.id === "crew" ? "Next topic: " : "Next world: ") + next.category.name;
    } else if (noBadge) {
      icon = noBadge.category.icon;
      href = base + "/path/" + noBadge.category.id;
      text = "Earn the " + noBadge.category.name + " badge next";
    } else {
      icon = "🏆";
      href = base + "/me";
      text = age.id === "crew" ? "Every topic complete. Your certificate is on Me." : "You earned every badge! Your certificate is ready on Me.";
    }
  }
  return '<a class="next-step world-next" href="' + href + '"><span aria-hidden="true">' + icon + "</span><span>" + text + "</span></a>";
}

/* Draw the dotted road that joins the stops. It runs through the middle
   of every stop, curving between them. Drawn after the stops are on the
   page, because it needs to know where they ended up. */
function drawRoad() {
  const road = document.getElementById("road");
  if (!road) return;
  const svg = road.querySelector(".road-line");
  const box = road.getBoundingClientRect();
  // The middle of every stop, measured from the top left of the road.
  const points = Array.from(road.querySelectorAll(".node")).map(node => {
    const r = node.getBoundingClientRect();
    return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
  });
  if (points.length < 2) return;
  // An SVG path: "M" moves to the first point, then each "C" draws a soft S-curve to the next.
  let d = "M" + points[0].x + " " + points[0].y;
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1];
    const to = points[i];
    const midY = (from.y + to.y) / 2;
    d += " C" + from.x + " " + midY + " " + to.x + " " + midY + " " + to.x + " " + to.y;
  }
  svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
  svg.setAttribute("width", box.width);
  svg.setAttribute("height", box.height);
  svg.innerHTML = '<path d="' + d + '" fill="none" stroke="var(--line-2)" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 18"/>';
}

// Locked lessons are buttons that say which lesson to finish first.
function wireLocked() {
  $all("[data-locked]").forEach(button => button.addEventListener("click", () => {
    showToast("🔒 Finish “" + button.dataset.locked + "” first.");
  }));
}
