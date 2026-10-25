/* ========================================================================
   tools/check-content.mjs
   Checks every lesson file against the rules in data/lessons/FORMAT.md,
   then the tips, the world names and the Help screen.

   Run it from the "Div App" folder:   node v2/tools/check-content.mjs
   It prints each problem with the file and lesson, then a total.
   "0 problems" means everything follows the rules.

   In this file, in order:
     The rules            the lists the checks use (worlds, picture kinds...)
     Keeping a list of problems
     Reading text         counting words, finding every string a player sees
     Word rules           dashes, phone numbers, words banned for ages 6 to 9
     Pictures             the fake screens, steps and checklists
     Questions            each question type
     Lessons              a whole lesson
     Running the checks   lessons, tips, worlds and Help, then the total
   ======================================================================== */

import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "data");
const lessonsDir = join(dataDir, "lessons");

/* ---------- The rules ---------- */

// A lesson id starts with the letter of its age group: e-, s- or c-.
const AGE_FROM_LETTER = { e: "explore", s: "squad", c: "crew" };
const AGE_IDS = ["explore", "squad", "crew"];
const WORLDS = ["gaming", "messages", "money", "people", "securing", "realfake", "hooks"];
const QUESTION_TYPES = ["choice", "realfake", "spot", "tap", "order"];

// Every fake screen kind, and the roles its parts may have.
const PICTURE_ROLES = {
  site: ["address", "big", "line", "field", "button"],
  chat: ["them", "me"],
  text: ["them", "me"],
  email: ["from", "subject", "line", "button"],
  popup: ["close", "title", "line", "button"],
  system: ["title", "line", "link", "button"],
  call: ["line", "me"],
  post: ["media", "caption", "link", "comment", "button"],
  payment: ["amount", "from", "note", "line", "button"],
  notification: ["app", "title", "line"],
  forum: ["post"],
  game: ["title", "line", "price", "button", "close"]
};

// Settings each kind needs. They are shown in the picture's frame and can't be tapped.
const PICTURE_NEEDS = {
  chat: ["sender"],
  text: ["sender"],
  call: ["caller", "label"],
  post: ["app", "author"],
  payment: ["app"],
  forum: ["site"],
  game: ["game"]
};

// Words a 6 year old may not know, or that send the wrong message (see FORMAT.md).
const EXPLORE_BANNED = ["private", "vault", "trusted", "account", "accounts", "pop-up", "popup", "identify",
  "reveal", "post", "verify", "scam", "scams", "scammer", "scammers", "keep it secret"];

// Toll-free area codes. A fake screen must never show one, because they are real businesses.
const TOLL_FREE = ["800", "888", "877", "866", "855", "844", "833"];

// So "Tap the three red flags" counts as saying 3.
const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4 };

// The tips: 53 for each age group. Ages 6 to 9 get shorter text and the word rules.
const TIP_FILES = [
  { file: "tips.js", age: "explore", maxText: 14 },
  { file: "tips-squad.js", age: "squad", maxText: 18 },
  { file: "tips-crew.js", age: "crew", maxText: 18 }
];

/* ---------- Keeping a list of problems ---------- */

const problems = [];

// Where we are right now, like "squad-gaming.js / s-free-robux".
// Each check sets it first, so every problem says where it was found.
let where = "";

function problem(text) {
  problems.push(where + ": " + text);
}

/* ---------- Reading text ---------- */

// A bit of text without its HTML tags.
function plain(text) {
  return String(text || "").replace(/<[^>]+>/g, " ");
}

// How many words a bit of text has, not counting HTML tags.
function words(text) {
  return plain(text).trim().split(/\s+/).filter(Boolean).length;
}

/* Settings players never see, so the word rules skip them. The sources
   list is skipped too, because a source's name must stay exactly as the
   page itself writes it. */
const NOT_SHOWN = new Set(["kind", "role", "id", "answer", "type", "color", "url", "sources"]);

// Every string a player can see, anywhere inside a lesson, tip or world.
function allStrings(value, out = []) {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach(item => allStrings(item, out));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (!NOT_SHOWN.has(key)) allStrings(item, out);
    }
  }
  return out;
}

/* ---------- Word rules ---------- */

/* Checks every string a player sees for dashes, phone numbers and (for
   ages 6 to 9) banned words. realNumbers is true only for Help, which
   lists real hotlines on purpose. */
function checkWords(thing, age, realNumbers) {
  for (const s of allStrings(thing)) {
    if (/[\u2013\u2014]/.test(s)) problem("dash found (use a full stop or comma): " + s.slice(0, 60));

    // Phone numbers on fake screens: only 555-0100 to 555-0199, and never toll-free.
    if (!realNumbers) {
      for (const match of s.matchAll(/\(?(\d{3})\)?[\s.-]+(\d{3})[\s.-]+(\d{4})/g)) {
        const [, area, middle, last] = match;
        if (middle !== "555" || !/^01\d\d$/.test(last)) problem("phone number must be 555-0100 to 555-0199: " + match[0]);
        if (TOLL_FREE.includes(area)) problem("toll-free area code in a fake number: " + match[0]);
      }
    }

    // A banned word only counts as a whole word, so "postcard" is fine but "post" is not.
    if (age === "explore") {
      const lower = plain(s).toLowerCase();
      for (const bad of EXPLORE_BANNED) {
        const wholeWord = new RegExp("(^|[^a-z])" + bad.replace("-", "\\-") + "($|[^a-z])");
        if (wholeWord.test(lower)) problem('word not allowed for ages 6 to 9: "' + bad + '" in: ' + s.slice(0, 60));
      }
    }
  }
}

/* ---------- Pictures ---------- */

/* Checks one picture. context says where it is ("learn card 2"). isQuiz is
   true for a picture in a question, where steps and checklists are not allowed. */
function checkPicture(p, context, isQuiz) {
  if (!p) return;

  // Steps and checklists are lists, not fake screens, so they have items instead of parts.
  if (p.kind === "steps" || p.kind === "checklist") {
    if (isQuiz) problem(context + ": steps and checklist pictures are for learn cards only");
    if (!Array.isArray(p.items) || !p.items.length) problem(context + ": " + p.kind + " needs items");
    if (p.kind === "checklist" && !["red", "green"].includes(p.color)) problem(context + ': checklist color must be "red" or "green"');
    return;
  }

  // Every other kind is a fake screen built from parts.
  const roles = PICTURE_ROLES[p.kind];
  if (!roles) {
    problem(context + ": unknown picture kind " + p.kind);
    return;
  }
  if (!Array.isArray(p.parts) || !p.parts.length) {
    problem(context + ": picture needs parts");
    return;
  }
  for (const need of PICTURE_NEEDS[p.kind] || []) {
    if (!p[need]) problem(context + ": " + p.kind + " picture needs " + need);
  }

  // Rules for single kinds.
  if (p.kind === "notification" && p.parts[0].role !== "app") problem(context + ": a notification's first part must be the app");
  if (p.kind === "forum" && p.parts.some(part => !part.name)) problem(context + ": every forum post needs a name");
  if (p.kind === "site" && p.parts[0].role !== "address") problem(context + ": a site's first part must be the address");

  // Rules for every part.
  p.parts.forEach((part, i) => {
    const partName = "part " + (i + 1);
    if (!roles.includes(part.role)) problem(context + ": " + partName + ' has role "' + part.role + '", allowed: ' + roles.join(", "));
    if (!part.text) problem(context + ": " + partName + " has no text");
    if (part.flag && !part.why) problem(context + ": flagged " + partName + " needs a why");
    if (part.why && words(part.why) > 20) problem(context + ": " + partName + " why is over 20 words");
  });
}

/* ---------- Questions ---------- */

// Checks one quiz question. n is its number in the lesson, starting at 1.
function checkQuestion(q, n, age) {
  const context = "question " + n;
  if (!QUESTION_TYPES.includes(q.type)) {
    problem(context + ": type must be one of " + QUESTION_TYPES.join(", "));
    return;
  }

  // Every type: a short question and a short "why".
  const maxQuestion = age === "explore" ? 12 : 20;
  if (!q.question) problem(context + ": no question");
  else if (words(q.question) > maxQuestion) problem(context + ": question over " + maxQuestion + " words");
  if (!q.why) problem(context + ": no why");
  else if (words(q.why) > 25) problem(context + ": why over 25 words");

  // choice: 2 to 4 answers (3 for ages 6 to 9), exactly one right.
  if (q.type === "choice") {
    const maxAnswers = age === "explore" ? 3 : 4;
    if (!Array.isArray(q.answers) || q.answers.length < 2 || q.answers.length > maxAnswers) {
      problem(context + ": needs 2 to " + maxAnswers + " answers");
    } else {
      const rightCount = q.answers.filter(a => a.right).length;
      if (rightCount !== 1) problem(context + ": needs exactly one right answer, has " + rightCount);
      const maxAnswerWords = age === "explore" ? 6 : 12;
      q.answers.forEach(a => {
        if (words(a.text) > maxAnswerWords) problem(context + ": answer over " + maxAnswerWords + " words: " + a.text);
      });
    }
    checkPicture(q.picture, context, true);
  }

  // realfake: a picture, and the answer "real" or "fake".
  if (q.type === "realfake") {
    if (!q.picture) problem(context + ": realfake needs a picture");
    if (!["real", "fake"].includes(q.answer)) problem(context + ': answer must be "real" or "fake"');
    checkPicture(q.picture, context, true);
  }

  // spot: a fake screen with 2 to 4 red flags, and the question says how many.
  if (q.type === "spot") {
    if (!q.picture || !PICTURE_ROLES[q.picture.kind]) {
      problem(context + ": spot needs a fake screen picture, not steps or a checklist");
      return;
    }
    checkPicture(q.picture, context, true);
    const parts = q.picture.parts;
    const flagCount = parts.filter(p => p.flag).length;
    // The ✕ can't be tapped in a spot question, so it does not count as a normal part.
    const normalCount = parts.filter(p => !p.flag && p.role !== "close").length;
    if (parts.some(p => p.flag && p.role === "close")) problem(context + ": the ✕ can't be tapped in a spot question, so it can't be a red flag");
    if (flagCount < 2 || flagCount > 4) problem(context + ": spot needs 2 to 4 flagged parts, has " + flagCount);
    if (normalCount < 2) problem(context + ": spot needs at least 2 parts that are not flagged (not counting the ✕)");

    // The first number in the question, as a digit or a word, must match the flags.
    const said = q.question.toLowerCase().match(/\b(\d|one|two|three|four)\b/);
    const numberSaid = said ? (NUMBER_WORDS[said[1]] || parseInt(said[1], 10)) : null;
    if (numberSaid !== flagCount) problem(context + ": the question must say how many red flags (" + flagCount + ")");
  }

  // tap: a fake screen with exactly one right part.
  if (q.type === "tap") {
    if (!q.picture || !PICTURE_ROLES[q.picture.kind]) {
      problem(context + ": tap needs a fake screen picture, not steps or a checklist");
      return;
    }
    checkPicture(q.picture, context, true);
    const rightCount = q.picture.parts.filter(p => p.right).length;
    if (rightCount !== 1) problem(context + ": tap needs exactly one part with right: true, has " + rightCount);
  }

  // order: 3 or 4 steps.
  if (q.type === "order") {
    if (!Array.isArray(q.steps) || q.steps.length < 3 || q.steps.length > 4) problem(context + ": order needs 3 or 4 steps");
  }
}

/* ---------- Lessons ---------- */

/* Checks one lesson from a file. ids holds every lesson id seen so far,
   so an id used twice anywhere in the game is caught. */
function checkLesson(lesson, file, ids) {
  const age = file.split("-")[0];
  where = file + " / " + (lesson.id || "(no id)");
  if (lesson.soon) return;   // a "coming soon" placeholder has nothing to check

  // The id
  if (!lesson.id || !/^[esc]-[a-z0-9-]+$/.test(lesson.id)) problem("id must start with e-, s- or c- and use kebab-case");
  else if (AGE_FROM_LETTER[lesson.id[0]] !== age) problem("id letter does not match the file's age");
  if (ids.has(lesson.id)) problem("id used twice: " + lesson.id);
  ids.add(lesson.id);

  // The lesson's own fields
  if (!lesson.icon) problem("no icon");
  if (!lesson.title || words(lesson.title) > 5) problem("title missing or over 5 words");
  if (!(lesson.minutes >= 2 && lesson.minutes <= 5)) problem("minutes must be 2 to 5");
  if (!lesson.rule || words(lesson.rule) > 10) problem("rule missing or over 10 words");
  if (!Array.isArray(lesson.sources) || !lesson.sources.length) {
    problem("needs at least one source");
  } else {
    lesson.sources.forEach(s => {
      if (!s.name || !/^https:\/\//.test(s.url || "")) problem("source needs a name and an https url");
    });
  }

  // The learn cards
  const maxCardText = age === "explore" ? 18 : 30;
  if (!Array.isArray(lesson.learn) || lesson.learn.length < 3 || lesson.learn.length > 5) {
    problem("needs 3 to 5 learn cards");
  } else {
    lesson.learn.forEach((card, i) => {
      const context = "learn card " + (i + 1);
      if (!card.icon) problem(context + ": no icon");
      if (!card.title || words(card.title) > 6) problem(context + ": title missing or over 6 words");
      if (card.text && words(card.text) > maxCardText) problem(context + ": text over " + maxCardText + " words");
      if (card.keep && words(card.keep) > 12) problem(context + ": keep over 12 words");
      checkPicture(card.picture, context, false);
    });
  }

  // The quiz
  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 4 || lesson.quiz.length > 6) {
    problem("needs 4 to 6 questions");
  } else {
    lesson.quiz.forEach((q, i) => checkQuestion(q, i + 1, age));
    const typesUsed = new Set(lesson.quiz.map(q => q.type));
    if (typesUsed.size < 2) problem("use at least 2 different question types");
  }

  // Every word in the lesson
  checkWords(lesson, age, false);
}

/* ---------- Running the checks ---------- */

// Loads a data file by its path inside data/, the same way the game does.
function loadData(path) {
  return import(pathToFileURL(join(dataDir, path)).href);
}

// 1. Every lesson file, named like "squad-gaming.js".
const ids = new Set();
let lessonCount = 0;
const lessonFiles = readdirSync(lessonsDir).filter(f => /^(explore|squad|crew)-[a-z]+\.js$/.test(f)).sort();
for (const file of lessonFiles) {
  const world = file.replace(/^[a-z]+-/, "").replace(".js", "");
  where = file;
  if (!WORLDS.includes(world)) {
    problem("unknown world in file name");
    continue;
  }
  const lessonModule = await loadData(join("lessons", file));
  if (!Array.isArray(lessonModule.LESSONS)) {
    problem("must export LESSONS as a list");
    continue;
  }
  for (const lesson of lessonModule.LESSONS) {
    checkLesson(lesson, file, ids);
    if (!lesson.soon) lessonCount++;
  }
}

// 2. The tips of the week.
let tipCount = 0;
for (const tipFile of TIP_FILES) {
  const { TIPS } = await loadData(tipFile.file);
  where = tipFile.file;
  if (TIPS.length !== 53) problem("needs 53 tips, has " + TIPS.length);
  tipCount += TIPS.length;
  TIPS.forEach((tip, i) => {
    where = tipFile.file + " / tip " + (i + 1);
    if (!tip.icon || !tip.title || !tip.text) problem("needs icon, title and text");
    if (words(tip.title) > 6) problem("title over 6 words");
    if (words(tip.text) > tipFile.maxText) problem("text over " + tipFile.maxText + " words");
    checkWords(tip, tipFile.age, false);
  });
}

// 3. World names and rules, as each age group sees them. Every age reads these.
const { CATEGORIES, categoryFor } = await loadData("categories.js");
for (const category of CATEGORIES) {
  for (const age of AGE_IDS) {
    where = "categories.js / " + category.id + " (" + age + ")";
    const seen = categoryFor(category, age);
    checkWords({ name: seen.name, rule: seen.rule }, age, false);
  }
}

// 4. Help, one version per age group. It lists real hotlines, so phone numbers are not checked.
const { HELP } = await loadData("help.js");
for (const age of AGE_IDS) {
  where = "help.js / " + age;
  if (HELP[age]) checkWords(HELP[age], age, true);
}

// Print every problem, then the total. A non-zero exit code tells other tools it failed.
console.log(problems.join("\n"));
console.log("\n" + lessonFiles.length + " files, " + lessonCount + " lessons, " + tipCount + " tips: " + problems.length + " problems");
process.exit(problems.length ? 1 : 0);
