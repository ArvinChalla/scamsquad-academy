/* ========================================================================
   settings.js
   Sound on or off, and how big everything is on the screen. Both are
   saved on this device only, under "scamsquad-v2-prefs".

   There is one sound button, not a volume control: kids already know how
   to turn their device up or down. The sounds are made by the browser, so
   there are no sound files to load.

   In this file:
     playSound           a short sound for a right answer, a wrong one, or
                         the end of a lesson
     soundButtonHtml     the 🔊 button (the lesson bar uses just this)
     settingsHtml        the 🔊 button and the size buttons together
     the click listener  one listener on the page handles every button
   ======================================================================== */

const KEY = "scamsquad-v2-prefs";
const SIZES = [0.9, 1, 1.15, 1.3];   // how big the screen is drawn: 90% to 130%
const NARROWEST = 320;               // the game is built to fit 320px; never draw it narrower
const prefs = { sound: true, size: 1 };
let soundMaker = null;               // the browser's sound maker, made on first use

// Read the saved settings. If saving is blocked, the defaults are used.
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  if (typeof saved.sound === "boolean") prefs.sound = saved.sound;
  if (saved.size >= 0 && saved.size < SIZES.length) prefs.size = saved.size;
} catch (e) { /* keep the defaults */ }

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) { /* not saved, still works for this visit */ }
}

/* The biggest size that still leaves 320px for the game. On a phone that
   is often 100% or 115%; on a computer, every size fits. */
function biggest() {
  let i = SIZES.length - 1;
  while (i > 0 && window.innerWidth / SIZES[i] < NARROWEST) i--;
  return i;
}
function size() {
  return Math.min(prefs.size, biggest());
}

// Calm mode (the device asks for less motion) keeps the game quiet too.
function calm() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- Sounds ---------- */

// One note: a pitch, when it starts, and how long it lasts (in seconds).
function note(pitch, start, length, slideTo) {
  const now = soundMaker.currentTime + start;
  const tone = soundMaker.createOscillator();
  const loudness = soundMaker.createGain();
  tone.connect(loudness);
  loudness.connect(soundMaker.destination);
  tone.type = "sine";
  tone.frequency.setValueAtTime(pitch, now);
  if (slideTo) tone.frequency.exponentialRampToValueAtTime(slideTo, now + length * 0.6);
  loudness.gain.setValueAtTime(0.0001, now);
  loudness.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
  loudness.gain.exponentialRampToValueAtTime(0.0001, now + length);
  tone.start(now);
  tone.stop(now + length + 0.02);
}

/* kind is "right" (a happy rising ding), "wrong" (a soft low bonk, never
   harsh) or "done" (three notes going up, at the end of a lesson).
   test is true when the player has just turned the sound on. */
export function playSound(kind, test) {
  if (!prefs.sound || (calm() && !test)) return;
  try {
    if (!soundMaker) soundMaker = new (window.AudioContext || window.webkitAudioContext)();
    if (kind === "right") note(620, 0, 0.22, 940);
    else if (kind === "wrong") note(330, 0, 0.2, 280);
    else if (kind === "done") { note(523, 0, 0.18); note(659, 0.12, 0.18); note(784, 0.24, 0.35); }
  } catch (e) { /* no sound on this device; the game works the same */ }
}

/* ---------- Buttons ---------- */

function soundLabel() {
  return prefs.sound ? "Sound is on. Tap to turn it off" : "Sound is off. Tap to turn it on";
}

// The 🔊 button. Every copy on the page changes together.
export function soundButtonHtml() {
  return '<button class="sound-button" type="button" data-sound aria-pressed="' + !prefs.sound + '" aria-label="' + soundLabel() + '">'
    + (prefs.sound ? "🔊" : "🔇") + "</button>";
}

// The 🔊 button, then smaller, the size, and bigger.
export function settingsHtml() {
  return '<div class="settings" role="group" aria-label="Sound and size">'
    + soundButtonHtml()
    + '<span class="settings-line" aria-hidden="true"></span>'
    + '<button class="size-button" type="button" data-size="-1" aria-label="Make everything smaller"' + (size() === 0 ? " disabled" : "") + '><span aria-hidden="true">🔍−</span></button>'
    + '<span class="size-now" aria-live="polite">' + Math.round(SIZES[size()] * 100) + "%</span>"
    + '<button class="size-button" type="button" data-size="1" aria-label="Make everything bigger"' + (size() === biggest() ? " disabled" : "") + '><span aria-hidden="true">🔍+</span></button>'
    + "</div>";
}

// Put the saved size on the page, and make every button match the settings.
function showSettings() {
  document.documentElement.style.setProperty("--ui-zoom", SIZES[size()]);
  document.querySelectorAll("[data-sound]").forEach(button => {
    button.textContent = prefs.sound ? "🔊" : "🔇";
    button.setAttribute("aria-pressed", String(!prefs.sound));
    button.setAttribute("aria-label", soundLabel());
  });
  document.querySelectorAll(".size-now").forEach(level => { level.textContent = Math.round(SIZES[size()] * 100) + "%"; });
  document.querySelectorAll('[data-size="-1"]').forEach(button => { button.disabled = size() === 0; });
  document.querySelectorAll('[data-size="1"]').forEach(button => { button.disabled = size() === biggest(); });
}
showSettings();
// Turning a phone sideways changes how much room there is.
window.addEventListener("resize", showSettings);

/* One listener on the whole page handles every sound and size button,
   because screens are drawn again and again (the same idea as Help in
   help.js). New buttons are drawn already matching the settings. */
document.addEventListener("click", e => {
  const sound = e.target.closest("[data-sound]");
  const sizeButton = e.target.closest("[data-size]");
  if (sound) {
    prefs.sound = !prefs.sound;
    if (prefs.sound) playSound("right", true);   // so the player hears it is on
  } else if (sizeButton) {
    prefs.size = Math.min(Math.max(size() + Number(sizeButton.dataset.size), 0), biggest());
  } else {
    return;
  }
  save();
  showSettings();
});
