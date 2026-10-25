/* ========================================================================
   screens/home.js
   The first screen, laid out like a regular home page:
     1. The hero: what the game is in one line, two buttons, and real
        screens from lessons as the picture, taking turns.
     2. "Pick your age to start": the three age cards.
     3. How it works, in three steps.
     4. What you will learn: the seven worlds.
     5. Our promises, then a band for parents and teachers.
   Only things you can tap look like cards. Everything else is plain, so
   nothing looks like a button when it is not one.

   In this file:
     showHome            draws the home screen
     heroHtml            the top of the page
     startHeroPictures   makes the hero picture change every few seconds
     agesHtml            the three age cards
     detailsHtml         how it works, the worlds, the promises, grown-ups
   ======================================================================== */

import { AGES } from "../../data/ages.js";
import { CATEGORIES } from "../../data/categories.js";
import { pathFor, lessonsFor } from "../../data/lessons/index.js";
import { pictureHtml } from "../pictures.js";
import { showScreen, $ } from "../ui.js";

/* ---------- The home screen ---------- */

// Draw the home screen, then make "Start playing" scroll down to the ages.
export function showHome() {
  showScreen(heroHtml() + agesHtml() + detailsHtml());
  // A plain scroll, not a link: a link would change the address, and the
  // address is what decides which screen shows (see main.js).
  $("#start").addEventListener("click", () => {
    $("#ages").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  startHeroPictures();
}

/* ---------- 1. The hero ---------- */

/* The pictures the hero takes turns showing: real screens from lessons,
   red flags circled, so a visitor sees the game itself. Each one is a
   common trick kids really meet, and none is about anything frightening.
   age, world and lesson say where the screen comes from; card is which
   learn card (counting from 0). */
const HERO_EXAMPLES = [
  { age: "explore", world: "gaming", lesson: "e-coin-doubler", card: 0, caption: "A coin doubler in a game chat" },
  { age: "squad", world: "gaming", lesson: "s-free-robux", card: 0, caption: "A free Robux website" },
  { age: "explore", world: "messages", lesson: "e-prize-message", card: 0, caption: "A surprise prize text" },
  { age: "squad", world: "messages", lesson: "s-password-expires", card: 0, caption: "A fake school email" },
  { age: "explore", world: "gaming", lesson: "e-free-coins", card: 0, caption: "A FREE coins box in a game" },
  { age: "squad", world: "money", lesson: "s-oops-money", card: 0, caption: "Money sent “by mistake”" },
  { age: "squad", world: "realfake", lesson: "s-deepfake-creator", card: 0, caption: "A fake creator giveaway" },
  { age: "squad", world: "messages", lesson: "s-code-mistake", card: 0, caption: "A code you never asked for" }
];
const HERO_SECONDS = 6;   // how long each picture shows before the next

// The examples that can really be found in the lesson files.
function heroExamples() {
  return HERO_EXAMPLES.map(example => {
    const lesson = lessonsFor(example.age, example.world).find(l => l.id === example.lesson);
    const card = lesson && lesson.learn[example.card];
    return card && card.picture ? Object.assign({ picture: card.picture }, example) : null;
  }).filter(Boolean);
}

// The top of the page: a headline, two buttons, and the changing picture.
function heroHtml() {
  const examples = heroExamples();
  const dots = examples.map((example, i) =>
    '<button class="hero-dot" type="button" data-show="' + i + '" aria-label="Show example ' + (i + 1) + ": " + example.caption + '"></button>'
  ).join("");

  return '<section class="home-hero">'
    + '<div class="home-hero-text">'
    +   '<p class="home-eyebrow"><span>Free · No sign-up · No personal data</span><span class="home-eyebrow-dot"> · </span><span>Ages 6 to 18</span></p>'
    +   "<h1>Can you spot the trick?</h1>"
    +   '<p class="home-lead">Short, fun lessons that show kids the tricks people use online, '
    +     "then let them practice spotting them on screens that look real.</p>"
    +   '<div class="home-actions">'
    +     '<button class="button" id="start" type="button">Start playing</button>'
    +     '<a class="button quiet" href="#/grown-ups">For parents and teachers</a>'
    +   "</div>"
    + "</div>"
    + '<figure class="home-hero-picture" aria-roledescription="slideshow" aria-label="Tricks from the lessons">'
    +   '<div class="hero-slide" id="hero-slide" aria-live="polite"></div>'
    +   '<figcaption><b id="hero-caption"></b>'
    +     "<span>A real screen from a lesson. The red circles are the tricks to spot.</span></figcaption>"
    +   '<div class="hero-controls">' + dots
    +     '<button class="hero-pause" id="hero-pause" type="button" aria-label="Pause the pictures">⏸</button>'
    +   "</div>"
    + "</figure>"
    + "</section>";
}

/* The hero picture changes every few seconds, starting on a random one.
   It stops when the player pauses it, points at it, or moves into it with
   the keyboard, and it never moves on its own if the device asks for less
   motion. The dots pick one straight away. */
function startHeroPictures() {
  const examples = heroExamples();
  const slide = $("#hero-slide");
  if (!slide || !examples.length) return;
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let shown = Math.floor(Math.random() * examples.length);
  let paused = calm;
  let hovering = false;

  // Show one example: its picture, its caption and which dot is lit.
  function show(index) {
    shown = (index + examples.length) % examples.length;
    const example = examples[shown];
    slide.innerHTML = pictureHtml(example.picture, "learn");
    slide.classList.remove("fade-in");
    void slide.offsetWidth;   // restart the fade
    slide.classList.add("fade-in");
    $("#hero-caption").textContent = example.caption;
    document.querySelectorAll(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("on", i === shown);
      dot.setAttribute("aria-current", i === shown ? "true" : "false");
    });
  }

  // The pause button shows what tapping it will do.
  function drawPauseButton() {
    const button = $("#hero-pause");
    button.textContent = paused ? "▶" : "⏸";
    button.setAttribute("aria-label", paused ? "Play the pictures" : "Pause the pictures");
  }

  show(shown);
  drawPauseButton();

  document.querySelectorAll(".hero-dot").forEach(dot =>
    dot.addEventListener("click", () => show(Number(dot.dataset.show))));
  $("#hero-pause").addEventListener("click", () => { paused = !paused; drawPauseButton(); });
  const figure = slide.closest("figure");
  figure.addEventListener("mouseenter", () => { hovering = true; });
  figure.addEventListener("mouseleave", () => { hovering = false; });
  figure.addEventListener("focusin", () => { hovering = true; });
  figure.addEventListener("focusout", () => { hovering = false; });

  // Move on every few seconds. Once the home page is gone, the timer stops.
  const timer = setInterval(() => {
    if (!document.getElementById("hero-slide")) { clearInterval(timer); return; }
    if (!paused && !hovering) show(shown + 1);
  }, HERO_SECONDS * 1000);
}

/* ---------- 2. The age cards ---------- */

// "Pick your age to start": one card for each age group.
function agesHtml() {
  const cards = AGES.map(age =>
    '<a class="age-card" href="#/age/' + age.id + '">'
    + '<span class="age-face" aria-hidden="true">' + age.face + "</span>"
    + '<span class="age-range">' + age.range + "</span>"
    + '<span class="age-name">' + age.name + "</span></a>"
  ).join("");
  return '<section class="home-section" id="ages" aria-labelledby="ages-title">'
    + '<h2 id="ages-title">Pick your age to start</h2>'
    + '<p class="home-sub">Each age group has its own lessons, words and look.</p>'
    + '<div class="age-grid">' + cards + "</div>"
    + "</section>";
}

/* ---------- 3 to 5. The details ---------- */

// A few words on what each world covers, shown under its name.
const WORLD_WORDS = {
  gaming: "Free coins, trades and cheats",
  messages: "Texts, emails and calls",
  money: "Shops, prizes and payments",
  people: "Strangers, secrets and bullies",
  securing: "Passwords and codes",
  realfake: "Fake videos, photos and news",
  hooks: "Timers, streaks and loot boxes"
};

// The "How it works" steps, in order.
const STEPS = [
  ["📖", "Learn", "A few short cards show one trick, on a screen that looks like the real app."],
  ["🎯", "Spot it", "Find the red flags, pick the safe choice, or say if it is real or fake."],
  ["🏆", "Earn", "Stars for each lesson, a badge for each world, then a certificate."]
];

// How it works, the worlds, the promises and the grown-ups band.
function detailsHtml() {
  const lessonCount = AGES.reduce((total, age) =>
    total + pathFor(age.id).reduce((n, unit) => n + unit.lessons.filter(l => !l.soon).length, 0), 0);

  const steps = STEPS.map((step, i) =>
    '<li class="home-step"><span class="home-step-icon" aria-hidden="true">' + step[0] + "</span>"
    + '<span class="home-step-number">Step ' + (i + 1) + "</span>"
    + "<h3>" + step[1] + "</h3><p>" + step[2] + "</p></li>"
  ).join("");

  const worlds = CATEGORIES.map(c =>
    '<li><span class="home-world-icon" aria-hidden="true">' + c.icon + "</span>"
    + "<span><b>" + c.name + "</b><small>" + (WORLD_WORDS[c.id] || "") + "</small></span></li>"
  ).join("");

  return '<section class="home-section">'
    +   "<h2>How it works</h2>"
    +   '<ol class="home-steps">' + steps + "</ol>"
    +   '<p class="home-note">🔁 A few days later, Spot Check brings it back, so it sticks.</p>'
    + "</section>"

    + '<section class="home-section">'
    +   "<h2>What you will learn</h2>"
    +   '<p class="home-sub">' + lessonCount + " short lessons in " + CATEGORIES.length + " worlds.</p>"
    +   '<ul class="home-worlds">' + worlds + "</ul>"
    + "</section>"

    + '<section class="home-section">'
    +   '<ul class="home-promises" aria-label="Our promises">'
    +     '<li><span aria-hidden="true">🆓</span><b>Free</b>No sign-up, no ads, nothing to buy.</li>'
    +     '<li><span aria-hidden="true">🔒</span><b>Private</b>Nothing about you is collected. Your progress stays on this device.</li>'
    +     '<li><span aria-hidden="true">💜</span><b>Help is close</b>On every screen: what to do, who to tell.</li>'
    +   "</ul>"
    + "</section>"

    + '<section class="home-grownups">'
    +   "<div><h2>For parents and teachers</h2>"
    +   "<p>What each age group covers, questions to talk about at home or in class, and where to report.</p></div>"
    +   '<a class="button" href="#/grown-ups">Read more</a>'
    + "</section>"
    + '<p class="home-made">Made by Arvin Challa, a high school student in Texas.</p>';
}
