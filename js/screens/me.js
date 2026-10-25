/* ========================================================================
   screens/me.js
   "Me": stars, coins, the seven world badges, and the certificate
   (made right here, see certificate.js).

   How it adds up:
   - A lesson is "done" once it is finished.
   - A world's badge needs every question in it answered right at least
     once. Practicing the missed ones counts.
   - The certificate unlocks when every world's badge is earned.
   Teens (14 to 18) see plain counts, with no stars or XP.

   The first name for the certificate is typed here. It stays on this
   device only and is never sent anywhere. No other details are asked.

   In this file, in order:
     The menu dot          the dot on Me in the bottom menu
     Adding up progress    progressFor, certificateUnlocked (other screens use these)
     The Me screen         showMe, the stats and the badge tiles
     The locked certificate
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { pathFor } from "../../data/lessons/index.js";
import { lessonResult, lessonMastered, coins, playerName, certificateSeen, markCertificateSeen } from "../store.js";
import { showScreen, bottomNavHtml, safeText, setMeDot, appHeaderHtml } from "../ui.js";
import { certificateBoxHtml, wireCertificateBox } from "./certificate.js";

/* ---------- The menu dot ---------- */

// The bottom menu shows a dot on Me once the certificate is unlocked, until Me is opened.
// This runs once, when the file loads. ui.js calls the check each time it draws the menu.
setMeDot(ageId => !certificateSeen(ageId) && certificateUnlocked(progressFor(ageId)));

/* ---------- Adding up progress ---------- */

/* Totals for one age group: stars, lessons done, and which worlds have
   their badge. A lesson marked "soon" is not written yet, so it does not count. */
export function progressFor(ageId) {
  let stars = 0;
  let maxStars = 0;
  let lessonsDone = 0;
  let lessonsReady = 0;
  let lessonsMastered = 0;
  const worlds = pathFor(ageId).map(unit => {
    const ready = unit.lessons.filter(lesson => !lesson.soon);
    const done = ready.filter(lesson => lessonResult(lesson.id));
    const mastered = done.filter(lesson => lessonMastered(lesson));
    ready.forEach(lesson => {
      maxStars += 3;
      const result = lessonResult(lesson.id);
      if (result) stars += result.stars;
    });
    lessonsDone += done.length;
    lessonsReady += ready.length;
    lessonsMastered += mastered.length;
    return {
      category: unit.category,
      ready: ready.length,
      done: done.length,
      mastered: mastered.length,
      badge: ready.length > 0 && mastered.length === ready.length
    };
  });
  const badges = worlds.filter(w => w.badge).length;
  return { stars, maxStars, lessonsDone, lessonsReady, lessonsMastered, worlds, badges };
}

/* The certificate is earned, not given: it unlocks when every world's
   badge is earned, so it means the player really finished the track.
   p is what progressFor() returns. */
export function certificateUnlocked(p) {
  return p.lessonsReady > 0 && p.badges === p.worlds.filter(w => w.ready).length;
}

/* ---------- The Me screen ---------- */

export function showMe(ageId) {
  const age = findAge(ageId);
  const progress = progressFor(age.id);
  const name = playerName();
  const teen = age.id === "crew";

  // Opening Me with the certificate unlocked counts as seeing it, so the menu dot goes away.
  const unlocked = certificateUnlocked(progress);
  if (unlocked) markCertificateSeen(age.id);
  const certificate = '<h2 class="me-certificate-title">Your certificate</h2>'
    + (unlocked ? certificateBoxHtml(age) : lockedCertificateHtml(age, progress));
  const tiles = progress.worlds.map(world => badgeTileHtml(world, teen)).join("");
  const badgeList = "<h2>" + (teen ? "Topics" : "Badges") + "</h2>" + '<div class="badge-grid">' + tiles + "</div>";

  showScreen(
      appHeaderHtml(age, "history")
    + '<header class="page-top"><h1 id="me-title">' + (teen ? "" : age.face + " ") + (name ? safeText(name) : "Me") + "</h1></header>"
    + '<div class="me-stats' + (teen ? " two" : "") + '">' + statsHtml(age, progress, teen) + "</div>"
    // Once it is unlocked, the certificate comes first.
    + (unlocked ? certificate + badgeList : badgeList + certificate)
    + bottomNavHtml(age, "me")
  );

  if (unlocked) wireCertificateBox(age.id);
}

// The numbers at the top. Teens get plain counts. Younger players get stars, coins and badges.
function statsHtml(age, progress, teen) {
  if (teen) {
    return '<div class="me-stat"><b>' + progress.lessonsDone + " of " + progress.lessonsReady + "</b><span>lessons done</span></div>"
      + '<div class="me-stat"><b>' + progress.badges + " of 7</b><span>topics complete</span></div>";
  }
  return '<div class="me-stat"><b>⭐ ' + progress.stars + "</b><span>of " + progress.maxStars + " stars</span></div>"
    + '<div class="me-stat"><b>' + age.coin.icon + " " + coins() + "</b><span>" + age.coin.name + ", for 💡 hints</span></div>"
    + '<div class="me-stat"><b>🏅 ' + progress.badges + "</b><span>of 7 badges</span></div>";
}

// One world's tile, in its own color, with a medal once the badge is earned.
function badgeTileHtml(world, teen) {
  const category = world.category;
  const medal = world.badge && !teen ? '<i class="badge-medal">🏅</i>' : "";
  return '<div class="badge-tile' + (world.badge ? " earned" : "") + '" style="--strong:var(--' + category.id + ");--soft:var(--" + category.id + '-soft)">'
    + '<span class="badge-icon" aria-hidden="true">' + category.icon + medal + "</span>"
    + '<span class="badge-name">' + category.name + "</span>"
    + '<span class="badge-count">' + badgeStatus(world, teen) + "</span></div>";
}

// What a tile says: earned, finished but some missed, or how many lessons.
function badgeStatus(world, teen) {
  if (world.badge) return teen ? "✓ Complete" : "Badge earned";
  if (world.ready && world.done === world.ready) return teen ? "Redo the missed ones" : "Fix the missed ones";
  if (world.ready) return world.done + " of " + world.ready + " lessons";
  return "Soon";
}

/* ---------- The locked certificate ---------- */

// Before it unlocks: a locked card that shows how far there is to go.
function lockedCertificateHtml(age, progress) {
  const total = progress.worlds.filter(w => w.ready).length;
  const percent = total ? Math.round(progress.badges / total * 100) : 0;
  const words = namesFor(age);
  const howTo = age.id === "explore"
    ? "A world's badge comes when you get every question in it right. Missed one? Try it again!"
    : "A badge needs every question in that " + words.world + " answered right once. Practicing the missed ones counts.";
  return '<div class="certificate-locked">'
    + '<span class="certificate-locked-icon" aria-hidden="true">🏆</span>'
    + '<div class="certificate-locked-text"><b>' + words.unlock + "</b>"
    + '<div class="world-progress" role="progressbar" aria-label="Badges earned" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + percent + '"><i style="width:' + percent + '%"></i></div>'
    + "<span>" + progress.badges + " of " + total + " " + (age.id === "crew" ? "topics complete" : "badges") + ". " + howTo + "</span></div></div>";
}

// The word for a world, and how to unlock the certificate, for each age group.
function namesFor(age) {
  if (age.id === "crew") return { world: "topic", unlock: "Complete every topic to unlock your certificate." };
  if (age.id === "explore") return { world: "world", unlock: "Get all 7 badges to get your certificate!" };
  return { world: "world", unlock: "Earn all 7 badges to unlock your certificate." };
}
