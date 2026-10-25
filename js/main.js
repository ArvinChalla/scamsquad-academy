/* ========================================================================
   main.js
   The start of the game. It reads the web address after the # and shows
   the matching screen. This is called "routing". Because every screen has
   its own address, the browser Back button works everywhere.

   The route table ("squad" can be any age group: explore, squad or crew,
   and "gaming" any world, like money or people):

     Address                                  Screen
     #/                                       home: pick your age
     #/help                                   help: pick your age first
     #/help/squad                             help for one age group
     #/grown-ups                              for parents and teachers
     #/age/squad                              hello the first time, then the worlds
     #/age/squad/path                         the seven worlds
     #/age/squad/path/money                   one world's lessons
     #/age/squad/gaming                       one world's lessons (same screen)
     #/age/squad/practice                     Spot Check
     #/age/squad/practice/play                playing a Spot Check
     #/age/squad/news                         this week's scams (10 to 18)
     #/age/explore/tips                       tip of the week (6 to 9)
     #/age/squad/me                           badges, name and certificate
     #/age/squad/certificate                  also Me, where the certificate is made
     #/age/squad/help                         help, with the bottom menu
     #/age/squad/check                        Check it with me, for a real message
     #/age/squad/gaming/s-free-robux          a lesson (starts at card 1)
     #/age/squad/gaming/s-free-robux/learn/2  card 3 of the lesson
     #/age/squad/gaming/s-free-robux/play     the quiz

   Any address not in the table shows the home screen. The 14 to 18 track
   (crew) shows its quick check first, once on each device (see gate.js).

   In this file:
     the imports      one show... function for each screen
     route()          reads the address and shows the screen
     start-up         runs route() now and on every address change
   ======================================================================== */

import { findAge } from "../data/ages.js";
import { hasSeenHello } from "./store.js";
import { lessonMode } from "./ui.js";
import { startCounter } from "./counter.js";
import { settingsHtml } from "./settings.js";
import { showHome } from "./screens/home.js";
import { showHelp } from "./screens/help.js";
import { showCheck } from "./screens/check.js";
import { showGrownups } from "./screens/grownups.js";
import { showGate, gatePassed } from "./screens/gate.js";
import { showHello } from "./screens/hello.js";
import { showWorlds, showWorld } from "./screens/path.js";
import { showPractice, playSpotCheck } from "./screens/practice.js";
import { showNews } from "./screens/news.js";
import { showTips } from "./screens/tips.js";
import { showMe } from "./screens/me.js";
import { showLearn } from "./screens/learn.js";
import { startQuiz } from "./screens/quiz.js";

/* ---------- Routing ---------- */

// Read the address and show the screen for it (see the table above).
function route() {
  // Lesson screens turn lesson mode back on themselves.
  lessonMode(false);

  // body data-age="explore" (or squad, crew) lets styles/ages.css change
  // the look for each age group: bigger for 6 to 9, "pro" for 14 to 18.
  const ageMatch = location.hash.match(/^#\/(?:age|help)\/(explore|squad|crew)(?=\/|$)/);
  const hashAge = ageMatch ? ageMatch[1] : undefined;
  if (hashAge) document.body.dataset.age = hashAge;
  else delete document.body.dataset.age;

  // "#/age/squad/gaming" becomes ["age", "squad", "gaming"].
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [first, ageId, second, lessonId, part, number] = parts;

  // The home button is hidden on the home screen itself, where it would do nothing.
  const onHome = first !== "help" && first !== "grown-ups" && (first !== "age" || !findAge(ageId));
  document.body.classList.toggle("on-home", onHome);

  // Screens that are not inside an age group.
  if (first === "help") return showHelp(findAge(ageId) ? ageId : null);
  if (first === "grown-ups") return showGrownups();
  if (first !== "age" || !findAge(ageId)) return showHome();

  // The 14 to 18 track asks its quick check once on each device.
  if (ageId === "crew" && !gatePassed()) return showGate(route);

  // Screens inside an age group: #/age/<age>/<second>/...
  if (!second) return hasSeenHello(ageId) ? showWorlds(ageId) : showHello(ageId);
  if (second === "path") {
    // Here the third part of the address is a world, not a lesson.
    const worldId = lessonId;
    return worldId ? showWorld(ageId, worldId) : showWorlds(ageId);
  }
  if (second === "practice") return lessonId === "play" ? playSpotCheck(ageId) : showPractice(ageId);
  if (second === "news") return showNews(ageId);
  if (second === "tips") return showTips(ageId);
  if (second === "me") return showMe(ageId);
  if (second === "certificate") return showMe(ageId);
  if (second === "help") return showHelp(ageId);
  if (second === "check") return showCheck(ageId);

  // Anything else is a world (a category like "gaming"), then a lesson in it.
  const categoryId = second;
  if (!lessonId) return showWorld(ageId, categoryId);
  if (part === "play") return startQuiz(ageId, categoryId, lessonId);
  const cardNumber = parseInt(number, 10) || 0;
  return showLearn(ageId, categoryId, lessonId, cardNumber);
}

/* ---------- Start-up ---------- */

window.addEventListener("hashchange", route);
route();
startCounter();
document.getElementById("footer-settings").innerHTML = settingsHtml();
