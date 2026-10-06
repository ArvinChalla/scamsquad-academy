/*
  game.js
  ScamSquad Academy, made by Arvin Challa.

  This is the code that runs the game. The words of every mission are in
  missions.js, and how things look is in styles.css.

  How the game works, in short:
    1. The home screen asks your age.
    2. You pick Level 1 or Level 2 for that age.
    3. Each mission draws a little game. When you win, you get points and
       a "Next mission" button.
    4. After the last mission you get badges and a certificate.

  Scores and the first name for the certificate are saved in this browser
  only. The game sends just one anonymous +1, the first time it opens on a
  device, for the counter at the bottom (section 16). The contact form for
  adults is the only other thing that sends anything.

  The file goes in this order:
     1. Settings
     2. Tracks: the six sets of missions
     3. Saving progress on this device
     4. What the game remembers while you play
     5. Switching screens
     6. Home screen
     7. Age card and Level 2 lock
     8. Age check for 14 to 18
     9. Playing a mission
    10. Winning, scoring and looking back
    11. The mini-games
    12. End screen
    13. Certificate
    14. Grown-ups panel
    15. Printing and copying
    16. Sound, zoom, confetti and the device counter
    17. Starting the game
*/


/* ========================================================================
   1. SETTINGS
   ======================================================================== */

// Two things use a small free program on Cloudflare
// (cloudflare/contact-worker.js): the "played on ... devices" counter at the
// bottom of the page, and the contact form in the grown-ups panel. Paste the
// two values from Cloudflare here, as cloudflare/SETUP.md explains.
// With workerUrl empty, the game sends nothing anywhere and both stay hidden.
var CLOUDFLARE = {
  workerUrl: "https://scamsquad.cdr0314.workers.dev",
  turnstileSiteKey: "0x4AAAAAAFPlfPolpbQGbHeS"   // the public "site key" of the Turnstile robot check
};


/* ========================================================================
   2. TRACKS: THE SIX SETS OF MISSIONS
   A "track" is one set of missions for one age group. Each age group has
   two: Level 1 (like "squad") and Level 2 (like "squad2"). Both share the
   same buddy, colours and points name from AGE_GROUPS in missions.js.
   ======================================================================== */
var TRACKS = {};
["explore", "squad", "crew"].forEach(function(group){
  [1, 2].forEach(function(level){
    var key = level === 1 ? group : group + "2";
    var track = { key: key, group: group, level: level, missions: MISSIONS[key] };
    var info = AGE_GROUPS[group];
    for (var name in info) { track[name] = info[name]; }
    TRACKS[key] = track;
  });
});

// "squad2" belongs to the "squad" age group. Use this for anything that is
// the same for both levels, like the buddy or the lesson plan.
function ageGroupOf(key){
  return TRACKS[key] ? TRACKS[key].group : String(key || "").replace(/2$/, "");
}

// Ages 6 to 9 get bigger text, simpler words and a star jar.
function isYoungKid(key){
  return ageGroupOf(key || game.trackKey) === "explore";
}

function levelName(track){
  return "Level " + track.level;
}

// Every mission in every track, added up. Shown on the home screen.
function countAllMissions(){
  var total = 0;
  for (var key in TRACKS) { total += TRACKS[key].missions.length; }
  return total;
}


/* ========================================================================
   3. SAVING PROGRESS ON THIS DEVICE
   localStorage is a small notebook inside the browser. Nothing in it ever
   leaves the device. If the browser blocks it, the game still works, it
   just forgets your scores when you close it.

   What is saved, under the name "scamsquad":
     explore, squad2 and so on: { done, best, clean } for each track
     name: the first name typed for the certificate
     unlock2: which Level 2s a teacher opened by hand
   ======================================================================== */
function loadSaved(){
  try { return JSON.parse(localStorage.getItem("scamsquad") || "{}"); }
  catch (e) { return {}; }
}

function saveAll(data){
  try { localStorage.setItem("scamsquad", JSON.stringify(data)); } catch (e) {}
}

// How far a player got on one track. done = missions finished, best = top
// score, clean = finished once without using a clue.
function progressOf(key){
  var saved = loadSaved();
  var p = saved[key];
  return (p && typeof p.done === "number") ? p : { done: 0, best: 0, clean: false };
}

function saveProgress(key, progress){
  var saved = loadSaved();
  saved[key] = progress;
  saveAll(saved);
}


/* ========================================================================
   4. WHAT THE GAME REMEMBERS WHILE YOU PLAY
   This is forgotten when the page closes. Only the end result of a track
   is saved (see section 3).
   ======================================================================== */
var game = {
  trackKey: null,        // the track being played, like "explore" or "squad2"
  missionIndex: 0,       // which mission is on screen. 0 is the first one.
  score: 0,
  wrongTries: 0,         // wrong answers on this mission
  streak: 0,             // missions in a row right the first time
  noCluesUsed: true,     // stays true until a clue or a wrong answer
  missionDone: false,    // true once this mission is won
  choiceOrder: [],       // the shuffled order of the answer buttons
  paidMissions: {},      // missions that already gave points this time round
  lookingBack: false,    // true while replaying a finished mission
  resumeIndex: 0,        // where to go back to after looking back
  passedAgeCheck: false, // the 14 to 18 check is only asked once per visit
  found: 0,              // clues found on this mission
  cameFrom: "home"       // which screen opened the grown-ups panel
};


/* ========================================================================
   5. SWITCHING SCREENS
   The page has five screens. Only one shows at a time.
   ======================================================================== */
var homeScreen     = document.getElementById("screen-home");
var ageCheckScreen = document.getElementById("screen-age-check");
var missionScreen  = document.getElementById("screen-mission");
var endScreen      = document.getElementById("screen-end");
var grownUpsScreen = document.getElementById("screen-grown-ups");
var homeButton     = document.getElementById("home-button");
var grownUpsLink   = document.getElementById("grown-ups-link");
var footerHomeLink = document.getElementById("footer-home-link");

function showScreen(screen){
  [homeScreen, ageCheckScreen, missionScreen, endScreen, grownUpsScreen].forEach(function(s){ s.hidden = true; });
  screen.hidden = false;
  homeButton.hidden = (screen === homeScreen);
  // On the grown-ups page, the footer link goes home instead of to itself.
  grownUpsLink.hidden = (screen === grownUpsScreen);
  footerHomeLink.hidden = (screen !== grownUpsScreen);
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Makes text safe to put on the page, so a name like <b> shows as typed.
function safeText(text){
  return String(text).replace(/[&<>"']/g, function(c){
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
  });
}

// True when the device asks for less movement on screen.
function wantsCalm(){
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

// Makes the words in "el" smaller, one pixel at a time, until fits() says
// they fit, or they reach the smallest size. Used for big words that must
// stay on one line, on very narrow screens.
function shrinkUntil(el, fits, smallest){
  var size = parseFloat(getComputedStyle(el).fontSize);
  while (!fits() && size > smallest) {
    size -= 1;
    el.style.fontSize = size + "px";
  }
}

// Restarts a little shake animation on something.
function shake(el, className){
  el.classList.remove(className);
  void el.offsetWidth;   // makes the browser notice the class came off
  el.classList.add(className);
}


/* ========================================================================
   6. HOME SCREEN
   ======================================================================== */
function showHome(){
  game.trackKey = null;
  document.body.removeAttribute("data-track");

  // Add up points, finished levels and badges across every track.
  var points = 0, levelsDone = 0, badges = 0;
  for (var key in TRACKS) {
    var p = progressOf(key);
    points += p.best || 0;
    if (p.done >= TRACKS[key].missions.length) { levelsDone++; badges++; }
    if (p.clean) { badges++; }
  }

  var trophies = points > 0
    ? '<div class="trophy-row">'
      + '<div class="trophy"><div class="trophy-icon">&#11088;</div><b>' + points + '</b><span>Points</span></div>'
      + '<div class="trophy"><div class="trophy-icon">&#127891;</div><b>' + levelsDone + '/6</b><span>Levels done</span></div>'
      + '<div class="trophy"><div class="trophy-icon">&#127942;</div><b>' + badges + '</b><span>Badges</span></div>'
      + '</div>'
    : '';

  homeScreen.innerHTML =
      '<div class="welcome">'
    +   '<div class="buddies">'
    +     '<span class="buddy-bob">' + buddyPicture("explore", 78) + '</span>'
    +     '<span class="buddy-bob">' + buddyPicture("squad", 92) + '</span>'
    +     '<span class="buddy-bob">' + buddyPicture("crew", 78) + '</span>'
    +   '</div>'
    +   '<h1>Can you <em>spot the trick</em>?</h1>'
    +   '<p class="welcome-text">Real tricks from games and chats. Spot the clues, beat the trick, collect badges. '
    +   'Nobody can lose. Get one wrong and you get a clue and another go.</p>'
    +   '<div class="welcome-chips"><span>&#128302; ' + countAllMissions() + ' puzzles</span><span>&#9889; No losing</span>'
    +   '<span>&#128274; No sign-up</span><span>&#127942; Certificates</span></div>'
    + '</div>'
    + trophies
    + '<div class="age-question">'
    +   '<h2>How old are you?</h2>'
    +   '<p>So we show you the right puzzles.</p>'
    +   '<div class="age-buttons">'
    +     '<button data-age="explore" aria-pressed="false"><span class="age-range">6&ndash;9</span><span class="age-name">Explorers</span></button>'
    +     '<button data-age="squad" aria-pressed="false"><span class="age-range">10&ndash;13</span><span class="age-name">Squad</span></button>'
    +     '<button data-age="crew" aria-pressed="false"><span class="age-range">14&ndash;18</span><span class="age-name">Crew</span></button>'
    +   '</div>'
    + '</div>'
    + '<div id="age-card-spot"></div>'
    + '<div class="home-note"><strong>Grown-ups:</strong> no name, no email, no sign-up, no tracking. '
    + 'Progress stays in this browser. Tap <strong>For grown-ups</strong> at the bottom of the page for what each track covers, '
    + 'the lesson plans, and where the facts come from.</div>';

  var ageButtons = homeScreen.querySelectorAll(".age-buttons button");
  ageButtons.forEach(function(button){
    button.addEventListener("click", function(){
      ageButtons.forEach(function(other){ other.setAttribute("aria-pressed", other === button ? "true" : "false"); });
      showAgeCard(button.getAttribute("data-age"));
    });
  });
  showScreen(homeScreen);
}


/* ========================================================================
   7. AGE CARD AND THE LEVEL 2 LOCK
   The tracks stay hidden until an age is picked, so a young child never
   reads what the teen track is about on the way in.
   ======================================================================== */
function showAgeCard(group){
  var info = AGE_GROUPS[group];
  var level2IsOpen = isLevel2Open(group);

  function levelButton(key, number){
    var track = TRACKS[key], p = progressOf(key), total = track.missions.length;
    var locked = (number === 2 && !level2IsOpen);
    var finished = p.done >= total;
    var percent = Math.round(Math.min(p.done, total) / total * 100);
    var status = locked ? "Finish Level 1 to unlock"
      : p.done === 0 ? total + " missions"
      : finished ? "Finished &#10003; &nbsp;best " + p.best + " " + track.points
      : p.done + " of " + total + " done";
    var go = locked ? "&#128274;"
      : p.done === 0 ? "Let&rsquo;s go &rarr;"
      : finished ? "Play again &rarr;" : "Keep going &rarr;";
    return '<button class="level-button' + (finished ? " done" : "") + (locked ? " locked" : "") + '" data-key="' + key + '"'
      + (locked ? ' aria-disabled="true"' : '') + '>'
      + '<span class="level-name-row"><span class="level-name">' + (locked ? '&#128274; ' : '') + 'Level ' + number + '</span></span>'
      + '<span class="level-topics">' + info.levelTopics[number - 1] + '</span>'
      + (locked ? '' : '<span class="progress-bar"><i style="width:' + percent + '%"></i></span>')
      + '<span class="level-button-bottom"><span class="progress-text">' + status + '</span><span class="level-go">' + go + '</span></span>'
      + '</button>';
  }

  var spot = document.getElementById("age-card-spot");
  spot.innerHTML =
      '<div class="age-card ' + group + '">'
    +   '<div class="age-card-buddy">' + buddyPicture(group, 118) + '</div>'
    +   '<div class="age-card-text">'
    +     '<span class="age-label">' + info.ages + '</span>'
    +     '<h3>' + info.name + '</h3>'
    +     '<p>' + info.tagline + '</p>'
    +     '<div class="level-buttons' + (level2IsOpen ? " level-1-done" : "") + '">'
    +       levelButton(group, 1) + levelButton(group + "2", 2)
    +     '</div>'
    +     '<div class="lock-message" id="lock-message" role="status"></div>'
    +   '</div>'
    + '</div>'
    + '<button class="small-link" id="wrong-age">That is not my age. Pick again</button>';

  spot.querySelectorAll(".level-button").forEach(function(button){
    button.addEventListener("click", function(){
      if (button.classList.contains("locked")) {
        shake(button, "shake");
        document.getElementById("lock-message").textContent = "Level 2 opens when you finish Level 1. You can do it!";
        return;
      }
      openTrack(button.getAttribute("data-key"));
    });
  });
  document.getElementById("wrong-age").addEventListener("click", function(){
    spot.innerHTML = "";
    homeScreen.querySelectorAll(".age-buttons button").forEach(function(b){ b.setAttribute("aria-pressed", "false"); });
    document.querySelector(".age-question").scrollIntoView({ block: "center", behavior: "smooth" });
  });
  document.querySelector(".age-card").scrollIntoView({ block: "center", behavior: "smooth" });
}

/* Level 2 opens once Level 1 of the same age group is finished. It is also
   remembered for this visit, so a browser that blocks saving still opens
   Level 2 straight after Level 1. A teacher can open it from the grown-ups
   panel, for shared school devices. */
var openedThisVisit = {};

function isLevel2Open(key){
  var group = ageGroupOf(key);
  if (openedThisVisit[group]) return true;
  if (progressOf(group).done >= TRACKS[group].missions.length) return true;
  return !!(loadSaved().unlock2 || {})[group];
}

function openLevel2(group, rememberIt){
  openedThisVisit[group] = true;
  if (rememberIt) {
    var saved = loadSaved();
    saved.unlock2 = saved.unlock2 || {};
    saved.unlock2[group] = true;
    saveAll(saved);
  }
}

// Opens a track. The 14 to 18 tracks ask the age check first.
function openTrack(key){
  var track = TRACKS[key];
  if (track.level === 2 && !isLevel2Open(key)) { showAgeCard(track.group); return; }
  if (track.group === "crew" && !game.passedAgeCheck) { showAgeCheck(key); }
  else { startTrack(key); }
}


/* ========================================================================
   8. AGE CHECK FOR 14 TO 18
   This is not a real ID check. It stops a young child who tapped the
   purple card by mistake. It is a sum written in words, so it needs
   reading and maths. A 14 year old clears it in a second. There are only
   3 tries, so it cannot be guessed. Nothing is saved.
   ======================================================================== */
var NUMBER_WORDS = { 6: "six", 7: "seven", 8: "eight", 9: "nine" };

function showAgeCheck(key){
  var info = AGE_GROUPS.crew;
  var a = 6 + Math.floor(Math.random() * 4);
  var b = 6 + Math.floor(Math.random() * 4);
  var rightAnswer = a * b;
  var triesLeft = 3;

  ageCheckScreen.innerHTML = '<div class="age-check">'
    + '<div class="age-check-buddy">' + buddyPicture("crew", 84) + '</div>'
    + '<div class="age-check-label">' + info.ages + '</div>'
    + '<h2>Hold on. This track is for older teens</h2>'
    + '<p>Crew deals with serious things that happen to people aged about 14 and up: '
    + 'scams where someone threatens to share a private photo, fake pictures made with AI, gambling, and money scams.</p>'
    + '<p>It is written to be useful, not frightening. But it is meant for 14 and over.</p>'
    + '<p class="strong">Younger than that? Go back and pick 10 to 13. That track teaches the same skills in a way that fits you better.</p>'
    + '<div class="age-check-quiz"><div class="age-check-question">Type the answer in digits: <b>' + NUMBER_WORDS[a] + ' times ' + NUMBER_WORDS[b] + '</b></div>'
    +   '<div class="age-check-answer">'
    +     '<input id="age-answer" type="text" inputmode="numeric" autocomplete="off" maxlength="3" aria-label="Your answer">'
    +     '<button id="age-go">Continue</button>'
    +   '</div>'
    +   '<div class="age-check-message" id="age-message" role="status"></div>'
    +   '<div class="tries-left" id="tries-left"></div>'
    + '</div>'
    + '<div class="age-check-exit"><button class="button light" id="age-back">Go back to the start</button></div>'
    + '</div>';

  var input = document.getElementById("age-answer");

  function checkAnswer(){
    if (parseInt((input.value || "").trim(), 10) === rightAnswer) {
      game.passedAgeCheck = true;
      startTrack(key);
      return;
    }
    triesLeft--;
    input.value = "";
    if (triesLeft <= 0) {
      document.getElementById("age-message").textContent = "That is alright. Squad is a better fit. Taking you back now.";
      document.getElementById("tries-left").textContent = "";
      input.disabled = true;
      document.getElementById("age-go").disabled = true;
      setTimeout(showHome, 1900);
    } else {
      document.getElementById("age-message").textContent = "Not quite.";
      document.getElementById("tries-left").textContent =
        triesLeft + (triesLeft === 1 ? " try left" : " tries left") + " before we send you to Squad.";
      input.focus();
    }
  }

  document.getElementById("age-go").addEventListener("click", checkAnswer);
  input.addEventListener("keydown", function(e){ if (e.key === "Enter") { checkAnswer(); } });
  document.getElementById("age-back").addEventListener("click", showHome);

  document.body.removeAttribute("data-track");
  showScreen(ageCheckScreen);
  input.focus();
}


/* ========================================================================
   9. PLAYING A MISSION
   Every mission screen is built the same way: a score bar, then a card
   with the mission's icon, title, scene and task, then the mini-game,
   then an empty result box that fills in when you win.
   ======================================================================== */
function startTrack(key){
  game.trackKey = key;
  game.missionIndex = 0;
  game.score = 0;
  game.streak = 0;
  game.noCluesUsed = true;
  game.paidMissions = {};
  game.lookingBack = false;
  game.resumeIndex = 0;
  document.body.setAttribute("data-track", ageGroupOf(key));
  showMission();
}

function currentTrack(){ return TRACKS[game.trackKey]; }
function currentMission(){ return currentTrack().missions[game.missionIndex]; }

// Each mission type has its own mini-game. They are all in section 11.
var MINI_GAMES = {
  dragToBin: playDragToBin,
  sortCards: playSortCards,
  saveTheKey: playSaveTheKey,
  photo: playPhoto,
  trickster: playTrickster,
  findClues: playFindClues,
  spotTheFakes: playSpotTheFakes,
  putInOrder: playPutInOrder
};

function showMission(){
  game.wrongTries = 0;
  game.missionDone = false;
  game.found = 0;
  var mission = currentMission();
  MINI_GAMES[mission.type](currentTrack(), mission);
}

// Draws the mission screen around a mini-game. gameHtml is the mini-game itself.
function drawMission(track, mission, gameHtml){
  var card = '<div class="mission-card">'
    + lookingBackBar()
    + '<div class="mission-top">'
    +   '<div class="mission-icon" style="background:var(--t-' + track.group + '-soft)">' + mission.icon + '</div>'
    +   '<div><div class="mission-number">Mission ' + (game.missionIndex + 1) + '</div><h2>' + mission.title + '</h2></div>'
    + '</div>'
    + '<p class="mission-scene">' + mission.scene + '</p>'
    + taskHtml(mission)
    + gameHtml
    + '<div class="result" id="result"></div>'
    + '</div>';

  if (isYoungKid()) {
    missionScreen.innerHTML = kidScorebarHtml(track) + card;
  } else {
    // Ages 14 to 18 always keep the help card and the way out under every mission.
    var helpAndExit = track.showHelpCard
      ? helpCardHtml() + '<div class="not-for-me"><button id="not-for-me">This track is not for me. Go back to the start</button></div>'
      : '';
    missionScreen.innerHTML = scorebarHtml(track) + card + helpAndExit;
    var exit = document.getElementById("not-for-me");
    if (exit) exit.addEventListener("click", showHome);
  }
  showScreen(missionScreen);
  listenToTrail();
}

/* The task can start with who is tricking you, like "A stranger wants your
   password." That part shows in a small box, and the instruction ("Tap the
   3 tricks.") stays big underneath. The instruction is the first sentence
   that starts with one of these words: Tap, Find, Drag, Pick, Put, Where. */
function taskHtml(mission){
  var sentences = (String(mission.task).match(/[^.!?]+[.!?]*/g) || [])
    .map(function(s){ return s.trim(); })
    .filter(Boolean);
  var i = 0;
  while (i < sentences.length && !/^(Tap|Find|Drag|Pick|Put|Where)\b/.test(sentences[i])) i++;
  if (i === 0 || i >= sentences.length) return '<div class="mission-task">' + mission.task + '</div>';
  return '<div class="mission-task"><span class="mission-who"><span aria-hidden="true">&#127917;</span> '
    + sentences.slice(0, i).join(" ") + '</span>' + sentences.slice(i).join(" ") + '</div>';
}

// The score bar for ages 10 to 18: buddy, score, and a dot for each mission.
function scorebarHtml(track){
  var dots = track.missions.map(function(_, i){
    if (i === game.missionIndex) return '<i class="now"></i>';
    if (i < furthestMission()) return '<i class="done" ' + lookBackAttributes(i) + '></i>';
    return '<i></i>';
  }).join("");
  return '<div class="scorebar">'
    + '<div class="buddy">' + buddyPicture(track.group, 42)
    +   '<div><div class="buddy-name">' + track.buddy + '</div><div class="buddy-job">' + track.buddyJob + '</div></div></div>'
    + '<div class="score"><div><b>' + game.score + '</b><span>' + track.points + '</span></div>'
    +   '<div><b>' + (game.missionIndex + 1) + '/' + track.missions.length + '</b><span>Mission</span></div></div>'
    + '</div>'
    + '<div class="mission-dots">' + dots + '</div>';
}

// The score bar for ages 6 to 9: a jar of stars and a trail of numbered stops.
function kidScorebarHtml(track){
  var trail = track.missions.map(function(_, i){
    if (i === game.missionIndex) return '<i class="now" aria-hidden="true">' + (i + 1) + '</i>';
    if (i < furthestMission()) return '<i class="done" ' + lookBackAttributes(i) + '>&#11088;</i>';
    return '<i aria-hidden="true">' + (i + 1) + '</i>';
  }).join('<span class="trail-line" aria-hidden="true"></span>');
  return '<div class="scorebar kid-scorebar">'
    + '<div class="score star-jar" aria-label="' + game.score + ' stars"><span class="star-jar-icon" aria-hidden="true">&#11088;</span>'
    +   '<b>' + game.score + '</b><span class="star-jar-label">stars</span></div>'
    + '<div class="mission-trail" role="img" aria-label="Mission ' + (game.missionIndex + 1) + ' of ' + track.missions.length + '"><div class="trail-stops">' + trail + '</div></div>'
    + '<div class="buddy kid-buddy">' + buddyPicture(track.group, 52) + '</div>'
    + '</div>';
}

function lookBackAttributes(i){
  return 'role="button" tabindex="0" data-look="' + i + '" title="Look back at Mission ' + (i + 1) + '" aria-label="Look back at Mission ' + (i + 1) + '"';
}

/* The help card under every 14 to 18 mission. It starts folded so it does
   not pull attention from the game, but help is always one tap away.
   Telling a parent comes first and biggest. */
function helpCardHtml(){
  function helpLink(href, icon, name, how){
    var newTab = href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '';
    return '<a class="help-link" href="' + href + '"' + newTab + '><span class="help-link-icon" aria-hidden="true">' + icon + '</span>'
      + '<span class="help-link-text"><b>' + name + '</b><small>' + how + '</small></span></a>';
  }
  return '<details class="help-card">'
    + '<summary class="help-card-bar"><span class="help-card-bar-icon" aria-hidden="true">&#128156;</span>'
    + '<span class="help-card-bar-text"><b>Need help?</b> Is something like this happening to you?</span>'
    + '<span class="help-card-arrow" aria-hidden="true">&#9662;</span></summary>'
    + '<div class="help-card-inside">'
    + '<div class="help-card-main"><span class="help-card-big-icon" aria-hidden="true">&#128156;</span><div>'
    + '<h3>Tell a parent, or another adult you trust.</h3>'
    + '<p><b>You are not in trouble.</b> Whatever happened, you can tell them.</p></div></div>'
    + '<p class="help-card-more">More help, any time</p>'
    + '<div class="help-links">'
    + helpLink("tel:18008435678", "&#128222;", "NCMEC CyberTipline", "Call 1-800-843-5678, or report at missingkids.org/cybertipline")
    + helpLink("https://takeitdown.ncmec.org", "&#128737;&#65039;", "Take It Down", "Stop a private photo spreading. No name needed")
    + helpLink("https://www.ic3.gov", "&#128680;", "FBI", "Report an online crime at ic3.gov")
    + helpLink("tel:988", "&#128172;", "988 Lifeline", "Call or text 988 if you are struggling")
    + '</div>'
    + '<p class="help-card-uk">In the UK: <a href="tel:08001111">Childline 0800 1111</a> and Report Remove.</p>'
    + '</div></details>';
}

/* The lesson after a win. The bold first part always shows. On ages 10 to
   18 the rest hides behind a "Why?" button, so nobody faces a wall of text.
   Ages 6 to 9 always see all of it, because theirs are short. */
function lessonHtml(mission){
  var lesson = mission.lesson || "";
  if (isYoungKid()) return '<div class="lesson">' + lesson + '</div>';
  var parts = lesson.match(/^\s*(<b>[\s\S]*?<\/b>)\s*([\s\S]*)$/);
  if (!parts || !parts[2].replace(/<[^>]+>/g, "").trim()) return '<div class="lesson">' + lesson + '</div>';
  return '<div class="lesson"><p class="lesson-main">' + parts[1] + '</p>'
    + '<details class="lesson-more"' + (mission.showWholeLesson ? ' open' : '') + '><summary>Why?</summary>'
    + '<div class="lesson-more-text">' + parts[2] + '</div></details></div>';
}

/* "Show me a clue" makes the next thing to find glow. Nobody can lose, so
   nobody should get stuck hunting for a tiny target on a phone. Using a
   clue gives up the "no clues" badge, which is fair. */
function showClue(target){
  if (!target) return;
  game.noCluesUsed = false;
  document.querySelectorAll(".glow").forEach(function(el){ el.classList.remove("glow"); });
  target.classList.add("glow");
  target.scrollIntoView({ block: "center", behavior: "smooth" });
  var message = document.getElementById("clue-message");
  if (message) message.textContent = "Look at the glowing part!";
  setTimeout(function(){ target.classList.remove("glow"); }, 4000);
}

// Returns the numbers 0, 1, 2 ... up to count, in a random order.
function shuffledNumbers(count){
  var list = [];
  for (var i = 0; i < count; i++) list.push(i);
  for (var j = list.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var swap = list[j]; list[j] = list[k]; list[k] = swap;
  }
  return list;
}

/* After the clues are found: "What do you do?" The answers are shuffled
   every time so the right one is never always in the same place. */
function askWhatNext(track, mission){
  if (!isStillOn(mission)) return;
  if (!mission.choices) { winMission(track, mission, 100); return; }
  if (document.getElementById("what-now")) return;

  game.choiceOrder = shuffledNumbers(mission.choices.length);
  var buttons = game.choiceOrder.map(function(original, i){
    var choice = mission.choices[original];
    return '<button class="choice" data-i="' + i + '"><span class="choice-letter" aria-hidden="true">' + String.fromCharCode(65 + i) + '</span>'
      + '<span class="choice-text"><b>' + choice.text + '</b>' + (choice.detail ? '<span>' + choice.detail + '</span>' : '') + '</span></button>';
  }).join("");

  var box = document.createElement("div");
  box.id = "what-now";
  box.className = "what-now";
  box.innerHTML = '<div class="what-now-question">' + (mission.question || "You spotted it. Now, what do you do?") + '</div>'
    + '<div class="choices">' + buttons + '</div>';
  var result = document.getElementById("result");
  result.parentNode.insertBefore(box, result);
  box.querySelectorAll(".choice").forEach(function(button){
    button.addEventListener("click", function(){ pickChoice(parseInt(button.getAttribute("data-i"), 10)); });
  });
  box.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

// The player picked answer number i (A is 0).
function pickChoice(i){
  if (game.missionDone) return;
  var track = currentTrack(), mission = currentMission();
  var result = document.getElementById("result");
  var buttons = missionScreen.querySelectorAll(".choice");

  if (game.choiceOrder[i] === mission.rightChoice) {
    // Right first time: 100 points, plus 25 extra after 3 in a row. Right later: 60.
    var points = game.wrongTries === 0 ? 100 : 60;
    if (!game.lookingBack) {
      if (game.wrongTries === 0) { game.streak++; if (game.streak >= 3) points += 25; }
      else { game.streak = 0; }
    }
    buttons.forEach(function(b, n){ b.disabled = true; if (n === i) b.classList.add("picked-right"); });
    winMission(track, mission, points, game.streak >= 3);
    document.getElementById("next").focus();
    result.scrollIntoView({ block: "nearest", behavior: "smooth" });
  } else {
    game.wrongTries++;
    game.noCluesUsed = false;
    buttons[i].classList.add("picked-wrong");
    result.className = "result try-again show";
    result.innerHTML = '<h3>Not that one. Here is a clue</h3><p>' + mission.wrongHint + '</p>'
      + '<p style="font-weight:700">' + (isYoungKid() ? 'Try again! You still have all your stars.' : 'Have another go. You keep everything you’ve earned.') + '</p>';
    playSound(false);
    result.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}


/* ========================================================================
   10. WINNING, SCORING AND LOOKING BACK
   ======================================================================== */

/* A mission only pays out once each time through a track. Looking back at a
   finished mission is just for practice and gives no new points. */
function pointsFor(points){
  if (game.lookingBack || game.paidMissions[game.missionIndex]) return 0;
  game.paidMissions[game.missionIndex] = true;
  return points;
}

/* Some wins happen a moment after the last tap. If the player jumped to a
   different mission in that moment, the win must not land there. */
function isStillOn(mission){
  var track = currentTrack();
  return !!track && track.missions[game.missionIndex] === mission && !missionScreen.hidden;
}

// The mission is won. Add the points and fill in the green result box.
function winMission(track, mission, points, showStreak){
  if (!isStillOn(mission) || game.missionDone) return;
  game.missionDone = true;
  var before = game.score;
  var gained = pointsFor(points || 100);
  game.score += gained;

  var scoreNumber = missionScreen.querySelector(".score b");
  if (scoreNumber && isYoungKid() && gained) { countUpStars(scoreNumber, before, game.score); }
  else if (scoreNumber) { scoreNumber.textContent = game.score; }

  var pointsLine = gained
    ? '+' + gained + ' ' + track.points + ' ' + track.pointsIcon + (showStreak ? ' &nbsp;<b>' + game.streak + ' in a row!</b>' : '')
    : (isYoungKid() ? 'Great remembering!' : 'Nice recap!');
  var result = document.getElementById("result");
  result.className = "result right show";
  result.innerHTML = '<h3>' + mission.winMessage + '</h3><p>' + pointsLine + '</p>' + lessonHtml(mission)
    + '<div class="button-row"><button class="button" id="next">' + nextButtonText(track) + '</button></div>';
  document.getElementById("next").addEventListener("click", goToNextMission);
  playSound(true);
}

function nextButtonText(track){
  if (game.lookingBack) return "Back to Mission " + (game.resumeIndex + 1) + " &rarr;";
  return game.missionIndex + 1 < track.missions.length ? "Next mission &rarr;" : "See your badges &rarr;";
}

function goToNextMission(){
  if (game.lookingBack) { backToPlaying(); return; }
  game.missionIndex++;
  if (game.missionIndex < currentTrack().missions.length) { showMission(); }
  else { showEndScreen(); }
}

/* The star jar counts up, bumps, and a "+100" floats off it.
   With reduced motion switched on, the number just changes. */
function countUpStars(numberEl, from, to){
  var jar = numberEl.closest(".star-jar");
  if (jar) jar.setAttribute("aria-label", to + " stars");
  if (wantsCalm()) { numberEl.textContent = to; return; }
  var start = null, length = 700;
  function step(time){
    if (!start) start = time;
    var progress = Math.min(1, (time - start) / length);
    numberEl.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  // Browsers pause animations in background tabs. This makes sure the real total lands.
  setTimeout(function(){ numberEl.textContent = to; }, length + 120);
  if (jar) {
    shake(jar, "bump");
    var plus = document.createElement("span");
    plus.className = "star-jar-plus";
    plus.textContent = "+" + (to - from);
    jar.appendChild(plus);
    setTimeout(function(){ plus.remove(); }, 1200);
  }
}

/* Looking back: tap a finished stop on the trail (or a finished dot) to
   replay that mission. While looking back, "Next" goes back to where the
   player had got to. */
function furthestMission(){
  return game.lookingBack ? game.resumeIndex : game.missionIndex;
}

function lookBackAt(index){
  if (index === game.missionIndex) return;
  if (!game.lookingBack) {
    game.resumeIndex = game.paidMissions[game.missionIndex] ? game.missionIndex + 1 : game.missionIndex;
  }
  if (index >= furthestMission()) return;
  game.lookingBack = true;
  game.missionIndex = index;
  showMission();
}

function backToPlaying(){
  game.lookingBack = false;
  game.missionIndex = game.resumeIndex;
  if (game.missionIndex < currentTrack().missions.length) { showMission(); }
  else { showEndScreen(); }
}

function lookingBackBar(){
  if (!game.lookingBack) return '';
  return '<div class="looking-back-bar"><span>&#128064; Looking back at Mission ' + (game.missionIndex + 1)
    + '. No new ' + currentTrack().points.toLowerCase() + ' this time.</span>'
    + '<button class="button light" id="back-to-playing">Back to Mission ' + (game.resumeIndex + 1) + ' &rarr;</button></div>';
}

function listenToTrail(){
  missionScreen.querySelectorAll("[data-look]").forEach(function(stop){
    var index = +stop.getAttribute("data-look");
    stop.addEventListener("click", function(){ lookBackAt(index); });
    stop.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lookBackAt(index); }
    });
  });
  var back = document.getElementById("back-to-playing");
  if (back) back.addEventListener("click", backToPlaying);
}


/* ========================================================================
   11. THE MINI-GAMES
   Each one draws its game with drawMission(), then waits for taps or
   drags. When the player wins, it calls winMission().
   ======================================================================== */

/* ---------- Dragging, for the 6 to 9 drag games ----------
   Lets a player drag "item" with a finger or a mouse and drop it on one of
   the "targets". Young children often let go with their finger just
   outside the target, so a drop counts if the finger is inside it, or if
   the item covers a good part of it. */
function makeDraggable(item, targets, whenDropped){
  var startX = 0, startY = 0, itemX = 0, itemY = 0, dragging = false;
  var styleBefore = null;   // how the item looked before the drag, to put it back after a miss
  // zoom is how much the zoom buttons have scaled the page. The finger moves
  // in screen pixels, so divide by zoom or the item drifts from the finger.
  var zoom = 1;

  function fingerInside(el, x, y){
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }
  function overlapArea(a, b){
    var w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    var h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return (w > 0 && h > 0) ? w * h : 0;
  }
  // The target the item is over the most, or null if none.
  function bestTarget(e){
    var itemBox = item.getBoundingClientRect(), best = null, bestScore = 0;
    targets.forEach(function(target){
      var box = target.getBoundingClientRect(), area = Math.max(1, box.width * box.height);
      var score = fingerInside(target, e.clientX, e.clientY) ? 2 : overlapArea(itemBox, box) / area;
      if (score >= 0.35 && score > bestScore) { best = target; bestScore = score; }
    });
    return best;
  }
  function lightUp(target){
    targets.forEach(function(t){ t.classList.toggle("hot", t === target); });
  }

  item.addEventListener("pointerdown", function(e){
    if (game.missionDone) return;
    dragging = true;
    item.setPointerCapture(e.pointerId);
    item.classList.add("dragging");
    styleBefore = item.getAttribute("style");
    var box = item.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY; itemX = box.left; itemY = box.top;
    // Measure the zoom on the box around the item, because the item may be mid-animation.
    var around = item.parentElement || item;
    zoom = around.offsetWidth > 0 ? around.getBoundingClientRect().width / around.offsetWidth : 1;
    if (!(zoom > 0.2 && zoom < 5)) zoom = 1;
    item.style.position = "fixed";
    item.style.left = (itemX / zoom) + "px";
    item.style.top = (itemY / zoom) + "px";
    item.style.transform = "none";
    item.style.margin = "0";
    item.style.width = (box.width / zoom) + "px";
    item.style.zIndex = "999";
  });

  item.addEventListener("pointermove", function(e){
    if (!dragging) return;
    item.style.left = ((itemX + e.clientX - startX) / zoom) + "px";
    item.style.top = ((itemY + e.clientY - startY) / zoom) + "px";
    lightUp(bestTarget(e));
  });

  item.addEventListener("pointerup", function(e){
    if (!dragging) return;
    dragging = false;
    try { item.releasePointerCapture(e.pointerId); } catch (err) {}
    item.classList.remove("dragging");
    var target = bestTarget(e);
    lightUp(null);
    if (target) {
      // The dropped item stays on screen while it fades. Stop it catching
      // taps, or it would sit invisibly on top of the Next button.
      item.style.pointerEvents = "none";
      whenDropped(target);
    } else {
      floatBack();   // not on a target
    }
  });

  item.addEventListener("pointercancel", function(){
    dragging = false;
    item.classList.remove("dragging");
    lightUp(null);
    floatBack();
  });

  function floatBack(){
    if (styleBefore) item.setAttribute("style", styleBefore);
    else item.removeAttribute("style");
  }
}

/* ---------- Drag the trick into the bin (6 to 9) ----------
   A loud "FREE COINS" pop-up barges into a calm game. Drag it into the bin.
   The bin then looks full, so the child can see the trick went in. */
function playDragToBin(track, mission){
  var p = mission.popup;
  drawMission(track, mission,
      '<div class="bin-game">'
    +   '<div class="bin-game-bar">' + mission.gameBar + ' <span class="fake-coins">' + mission.coins + '</span></div>'
    +   '<div class="bin-game-stage">'
    +     '<div class="trick-popup" id="trick-popup" role="button" tabindex="0" aria-label="A trick pop-up. Drag it into the bin.">'
    +       '<div class="gift">' + p.gift + '</div><div class="prize">' + p.prize + '</div>'
    +       '<div class="hurry">' + p.hurry + '</div><span class="click-button">' + p.button + '</span>'
    +     '</div>'
    +   '</div>'
    +   '<div class="bin-game-bottom">'
    +     '<div class="pip">' + buddyPicture("explore", 64) + '</div>'
    +     '<div class="pip-says">' + mission.pipSays + '</div>'
    +     '<div class="bin" id="bin"><span class="bin-icon">🗑️</span>' + mission.binText + '</div>'
    +   '</div>'
    + '</div>');

  var popup = document.getElementById("trick-popup"), bin = document.getElementById("bin");
  // The loud lines stay on one line. On a very narrow screen, shrink them to fit.
  popup.querySelectorAll(".prize, .hurry").forEach(function(line){
    shrinkUntil(line, function(){ return line.scrollWidth <= line.clientWidth; }, 10);
  });
  // Once the pop-up has finished barging in, it keeps pulsing.
  setTimeout(function(){ popup.style.opacity = "1"; popup.classList.add("ready"); }, 1300);

  function trickInTheBin(){
    if (game.missionDone) return;
    popup.style.transition = "transform .45s ease, opacity .45s ease";
    popup.style.transform = "scale(.15) rotate(18deg)";
    popup.style.opacity = "0";
    setTimeout(function(){
      bin.classList.add("full");
      bin.innerHTML = '<span class="bin-gift" aria-hidden="true">' + p.gift + '</span><span class="bin-icon">🗑️</span>' + mission.fullBinText;
    }, 300);
    // The win box also shows the three tricks the pop-up used.
    setTimeout(function(){
      winMission(track, mission, 100);
      var heading = document.querySelector("#result h3");
      if (!heading) return;
      var chips = mission.tricksFound.map(function(text, i){
        return '<span class="trick-chip" style="animation-delay:' + (i * 0.12) + 's">' + text + '</span>';
      }).join("");
      heading.insertAdjacentHTML("afterend", '<div class="trick-chips">' + chips + '</div><p style="margin:10px 0 0">' + mission.tricksNote + '</p>');
    }, 450);
  }

  makeDraggable(popup, [bin], trickInTheBin);
  popup.addEventListener("keydown", function(e){
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trickInTheBin(); }
  });
}

/* ---------- Sort the cards (6 to 9) ----------
   One card at a time floats in. Drag it to "Only my family" or "OK for
   anyone". With a keyboard, Tab to a box and press Enter. */
function playSortCards(track, mission){
  var cardNumber = 0;
  drawMission(track, mission,
      '<div class="sort-game">'
    +   '<div class="sort-top"><div class="sort-player">🎮</div><div class="speech-bubble">' + mission.playerSays + '</div></div>'
    +   '<div class="sort-lane"><div class="sort-card" id="sort-card" tabindex="0">' + mission.cards[0].text + '</div></div>'
    +   '<div class="sort-boxes">'
    +     '<div class="sort-box family" id="family-box" role="button" tabindex="0">' + mission.familyBox + '</div>'
    +     '<div class="sort-box anyone" id="anyone-box" role="button" tabindex="0">' + mission.anyoneBox + '</div>'
    +   '</div>'
    + '</div>'
    + '<p class="game-hint" id="game-hint">You can do it!</p>');

  var familyBox = document.getElementById("family-box"), anyoneBox = document.getElementById("anyone-box");

  function cardGoesTo(box){
    var card = document.getElementById("sort-card"), info = mission.cards[cardNumber];
    var hint = document.getElementById("game-hint");
    var picked = box === familyBox ? "family" : "anyone";
    if (picked !== info.box) {
      playSound(false);
      hint.textContent = "🦉 Pip says: “Check again. " + info.why + "”";
      card.removeAttribute("style");
      return;
    }
    playSound(true);
    hint.textContent = "✨ " + info.why;
    card.style.pointerEvents = "none";
    card.style.transition = "transform .35s ease, opacity .35s ease";
    card.style.opacity = "0";
    card.style.transform = "scale(.3)";
    setTimeout(function(){
      cardNumber++;
      if (cardNumber >= mission.cards.length) { winMission(track, mission, 100); return; }
      // The player may have left this mission in the meantime.
      var lane = missionScreen.querySelector(".sort-lane");
      if (!lane || !document.getElementById("sort-card")) return;
      document.getElementById("sort-card").remove();
      var next = document.createElement("div");
      next.className = "sort-card";
      next.id = "sort-card";
      next.tabIndex = 0;
      next.textContent = mission.cards[cardNumber].text;
      lane.appendChild(next);
      hint.textContent = "Next one! Drag it to where it goes.";
      makeDraggable(next, [familyBox, anyoneBox], cardGoesTo);
    }, 500);
  }

  makeDraggable(document.getElementById("sort-card"), [familyBox, anyoneBox], cardGoesTo);
  [familyBox, anyoneBox].forEach(function(box){
    box.addEventListener("keydown", function(e){
      if ((e.key === "Enter" || e.key === " ") && !game.missionDone) { e.preventDefault(); cardGoesTo(box); }
    });
  });
}

/* ---------- Save the key (6 to 9) ----------
   The password key floats toward the stranger. Drag it into the castle.
   The key then shows up inside the castle, so the child can see it is safe. */
function playSaveTheKey(track, mission){
  drawMission(track, mission,
      '<div class="castle-game">'
    +   '<div class="speech-bubble">' + mission.strangerSays + '</div>'
    +   '<div class="key-lane"><div class="password-key" id="password-key" tabindex="0">🔑 PASSWORD</div></div>'
    +   '<div class="castle-row">'
    +     '<div class="castle" id="castle">🏰<br>SAFE CASTLE<br><small>KEEP IT HERE</small></div>'
    +     '<div class="stranger">🎭<br>STRANGER</div>'
    +   '</div>'
    + '</div>'
    + '<p class="game-hint" id="game-hint">' + mission.startHint + '</p>');

  var key = document.getElementById("password-key"), castle = document.getElementById("castle");

  // On a very narrow screen (or zoomed right in) the key could float out of its lane.
  var lane = key.parentElement;
  shrinkUntil(key, function(){ return key.offsetWidth <= lane.offsetWidth * 0.8; }, 12);

  function keyIsSafe(){
    if (game.missionDone) return;
    key.style.pointerEvents = "none";
    key.style.animation = "none";
    key.style.transition = "transform .4s ease, opacity .4s ease";
    key.style.transform = "scale(.2)";
    key.style.opacity = "0";
    setTimeout(function(){
      castle.classList.add("full");
      castle.innerHTML = '<span class="castle-key" aria-hidden="true">🔑</span>🏰<br>SAFE CASTLE<br><small>KEY IS SAFE</small>';
    }, 300);
    document.getElementById("game-hint").textContent = mission.savedHint;
    playSound(true);
    setTimeout(function(){ winMission(track, mission, 100); }, 650);
  }

  makeDraggable(key, [castle], keyIsSafe);
  key.addEventListener("keydown", function(e){
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); keyIsSafe(); }
  });
}

/* ---------- The photo ----------
   Tap the parts of the photo that show where you live or go to school. */
function playPhoto(track, mission){
  var cluesToFind = mission.spots.filter(function(s){ return s.isClue; }).length;
  var spots = mission.spots.map(function(s, i){
    return '<button class="photo-spot" data-i="' + i + '" style="left:' + s.x + '%;top:' + s.y + '%">' + s.label + '</button>';
  }).join("");
  drawMission(track, mission,
      '<div class="photo-scene"><div class="photo-roof"></div><div class="photo-house"></div>' + spots + '</div>'
    + '<div class="found-count" id="found-count">0 of ' + cluesToFind + ' clues found</div>'
    + '<div class="helper-text" id="helper-text">Look at the whole picture.</div>');

  // On a narrow phone a label near the edge can stick out of the photo.
  // Slide any label like that back inside.
  var scene = missionScreen.querySelector(".photo-scene"), photo = scene.getBoundingClientRect();
  var zoom = scene.offsetWidth ? photo.width / scene.offsetWidth : 1;   // the zoom buttons scale what we measure
  missionScreen.querySelectorAll(".photo-spot").forEach(function(label){
    var box = label.getBoundingClientRect(), gap = 6 * zoom;
    var nudge = (Math.max(0, photo.left + gap - box.left) - Math.max(0, box.right - (photo.right - gap))) / zoom;
    if (nudge) label.style.left = "calc(" + label.style.left + " + " + nudge + "px)";
  });

  missionScreen.querySelectorAll(".photo-spot").forEach(function(button){
    button.addEventListener("click", function(){
      if (button.classList.contains("found")) return;
      var spot = mission.spots[+button.dataset.i], helper = document.getElementById("helper-text");
      if (spot.isClue) {
        button.classList.add("found");
        button.disabled = true;
        game.found++;
        document.getElementById("found-count").textContent = game.found + " of " + cluesToFind + " clues found";
        helper.className = "helper-text right";
        helper.textContent = "🔎 " + spot.why;
        playSound(true);
        if (game.found === cluesToFind) setTimeout(function(){ winMission(track, mission, 100); }, 250);
      } else {
        helper.className = "helper-text oops";
        helper.textContent = spot.hint;
        playSound(false);
      }
    });
  });
}

/* ---------- The Trickster ----------
   The Trickster tries one move at a time. Pick the shield that blocks it.
   A wrong shield shows that move's hint. Each blocked move takes away one
   of the Trickster's hearts. */
function playTrickster(track, mission){
  var trickNumber = 0, total = mission.tricks.length;
  var shields = mission.shields.map(function(s){
    return '<button class="shield" data-key="' + s.key + '">' + s.label + '</button>';
  }).join("");
  drawMission(track, mission,
      '<div class="trickster-box">'
    +   '<div class="hearts" id="hearts">' + '❤️'.repeat(total) + '</div>'
    +   '<div class="trickster-says" id="trickster-says">' + mission.tricks[0].message + '</div>'
    +   '<div class="shields">' + shields + '</div>'
    +   '<div class="helper-text" id="helper-text">Ready? Go!</div>'
    + '</div>');

  missionScreen.querySelectorAll(".shield").forEach(function(button){
    button.addEventListener("click", function(){
      if (trickNumber >= total) return;
      var trick = mission.tricks[trickNumber], helper = document.getElementById("helper-text");
      if (button.dataset.key !== trick.shield) {
        helper.className = "helper-text oops";
        helper.textContent = trick.hint || "Try a different shield!";
        playSound(false);
        return;
      }
      helper.className = "helper-text right";
      helper.textContent = "💥 Blocked! " + trick.why;
      playSound(true);
      trickNumber++;
      if (trickNumber === total) { setTimeout(function(){ winMission(track, mission, 150); }, 250); return; }
      setTimeout(function(){
        document.getElementById("hearts").textContent = "❤️".repeat(total - trickNumber);
        document.getElementById("trickster-says").textContent = mission.tricks[trickNumber].message;
        helper.className = "helper-text";
        helper.textContent = "Next one! Pick a shield.";
      }, 250);
    });
  });
}

/* ---------- Find the clues ----------
   A fake chat, website, email or app screen. Some parts are clues: tap
   them all. Then "What do you do?" asks for the safe choice.
   Tapping a part that is fine costs nothing. It just says why it is fine. */
function playFindClues(track, mission){
  var cluesToFind = mission.screen.filter(function(piece){ return piece.clue; }).length;
  function dots(found){
    var html = "";
    for (var i = 0; i < cluesToFind; i++) html += '<i class="' + (i < found ? "on" : "") + '"></i>';
    return html;
  }
  var clueBar = cluesToFind
    ? '<div class="clue-bar" aria-live="polite"><span id="clue-message">' + (mission.tip || "Tap everything that looks wrong.") + '</span>'
      + '<span class="clue-dots" id="clue-dots">' + dots(0) + '</span>'
      + '<button class="clue-button" id="clue-button" type="button">&#128161; Show me a clue</button></div>'
    : '';
  drawMission(track, mission, fakeScreenHtml(mission) + clueBar);
  if (!cluesToFind) { askWhatNext(track, mission); return; }

  document.getElementById("clue-button").addEventListener("click", function(){
    showClue(missionScreen.querySelector(".clue:not(.found)"));
  });

  missionScreen.querySelectorAll(".clue").forEach(function(clue){
    clue.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clue.click(); }
    });
    clue.addEventListener("click", function(e){
      e.stopPropagation();
      if (clue.classList.contains("found")) return;
      var piece = mission.screen[+clue.dataset.i];
      clue.classList.add("found");
      game.found++;
      document.getElementById("clue-message").innerHTML = piece.why;
      document.getElementById("clue-dots").innerHTML = dots(game.found);
      playSound(true);
      if (game.found === cluesToFind) {
        document.getElementById("clue-button").hidden = true;
        setTimeout(function(){
          var message = document.getElementById("clue-message");
          if (message) message.innerHTML = "<b>All " + cluesToFind + " found.</b> " + piece.why;
          askWhatNext(track, mission);
        }, 500);
      }
    });
  });

  missionScreen.querySelectorAll(".chat, .webpage, .app-page, .email-page").forEach(function(area){
    area.addEventListener("click", function(e){
      if (game.found === cluesToFind || e.target.closest(".clue")) return;
      document.getElementById("clue-message").textContent = mission.notAClue || "That part looks normal. Keep looking.";
    });
  });
}

/* Builds the fake screen from the mission's "screen" pieces, in order.
   A clue that starts with a tag (like a whole chat bubble) is wrapped in a
   block. A clue inside a sentence is wrapped in a span. Real game names are
   plain text only, never logos: a real logo on a fake scam screen would look
   like the very thing the game teaches kids to spot. */
function fakeScreenHtml(mission){
  function pieceHtml(piece, i){
    if (!piece.clue) return piece.text;
    var isBlock = !piece.inline && !piece.inAddressBar && piece.text.charAt(0) === "<";
    var tag = isBlock ? "div" : "span";
    return '<' + tag + ' class="clue' + (isBlock ? " clue-block" : "") + '" role="button" tabindex="0" data-i="' + i + '">' + piece.text + '</' + tag + '>';
  }
  var page = "", address = "";
  mission.screen.forEach(function(piece, i){
    if (piece.inAddressBar) address += pieceHtml(piece, i);
    else page += pieceHtml(piece, i);
  });

  var look = mission.look ? " look-" + mission.look : "";
  var gameName = mission.gameName ? '<span class="game-name">' + mission.gameName + '</span>' : '';
  var sender = '<span class="screen-sender">' + mission.sender + '<small>' + (mission.senderNote || "") + '</small></span>';
  var type = mission.screenType || "chat";

  if (type === "chat" || type === "group") {
    return '<div class="fake-screen' + look + '"><div class="screen-top"><span class="online-dot"></span>' + sender + gameName + '</div>'
      + '<div class="chat">' + page + '</div></div>';
  }
  if (type === "site") {
    return '<div class="fake-screen' + look + '"><div class="address-bar"><span class="address-icon" aria-hidden="true">&#127760;</span>'
      + '<span class="address">' + address + '</span>' + gameName + '</div>'
      + '<div class="webpage">' + page + '</div></div>';
  }
  if (type === "email") {
    return '<div class="fake-screen' + look + '"><div class="screen-top light-top">' + sender + gameName + '</div>'
      + '<div class="email-page">' + page + '</div></div>';
  }
  // "app": a settings screen or a list of notifications
  return '<div class="fake-screen' + look + '"><div class="screen-top light-top">' + sender + gameName + '</div>'
    + '<div class="app-page">' + page + '</div></div>';
}

/* ---------- Spot the fakes ----------
   A pile of messages. Tap the fake ones. Tapping a real one is not a
   mistake: it turns green and says why it is real. */
function playSpotTheFakes(track, mission){
  var fakesToFind = mission.cards.filter(function(c){ return c.isScam; }).length;
  var cards = mission.cards.map(function(c, i){
    return '<button class="message-card' + (c.look ? " look-" + c.look : "") + '" data-i="' + i + '">'
      + '<span class="message-from">' + c.icon + ' ' + c.from + '</span>'
      + '<span class="message-text">' + c.text + '</span>'
      + '<span class="message-verdict"></span></button>';
  }).join("");
  drawMission(track, mission, '<div class="fake-pile">' + cards + '</div>'
    + '<div class="clue-bar" aria-live="polite"><span id="clue-message">' + (mission.tip || "Tap the ones that are scams.") + '</span>'
    + '<button class="clue-button" id="clue-button" type="button">&#128161; Show me a clue</button></div>');

  document.getElementById("clue-button").addEventListener("click", function(){
    var notFoundYet = [].filter.call(missionScreen.querySelectorAll(".message-card"), function(card){
      return mission.cards[+card.dataset.i].isScam && !card.classList.contains("is-scam");
    });
    showClue(notFoundYet[0]);
  });

  missionScreen.querySelectorAll(".message-card").forEach(function(card){
    card.addEventListener("click", function(){
      if (game.found === fakesToFind || card.classList.contains("is-scam") || card.classList.contains("is-real")) return;
      var info = mission.cards[+card.dataset.i];
      card.querySelector(".message-verdict").textContent = info.why;
      document.getElementById("clue-message").textContent = info.why;
      if (info.isScam) {
        card.classList.add("is-scam");
        game.found++;
        playSound(true);
        if (game.found === fakesToFind) {
          document.getElementById("clue-button").hidden = true;
          setTimeout(function(){ askWhatNext(track, mission); }, 450);
        }
      } else {
        card.classList.add("is-real");
        playSound(false);
      }
    });
  });
}

/* ---------- Put in order ----------
   What to do after falling for a trick. Each good step has a rank: 1 goes
   first, then 2, and so on. Steps with the same rank can go in any order.
   Steps with no rank do not help. They are explained and greyed out. */
function playPutInOrder(track, mission){
  var goodSteps = mission.steps.filter(function(s){ return s.rank; });
  var placed = [];   // the good steps already in the plan

  var slots = goodSteps.map(function(_, i){
    return '<li class="order-slot" id="order-slot-' + i + '"><span class="order-number">' + (i + 1) + '</span><span class="order-slot-text">&nbsp;</span></li>';
  }).join("");
  var buttons = shuffledNumbers(mission.steps.length).map(function(i){
    return '<button class="order-step" data-i="' + i + '">' + mission.steps[i].text + '</button>';
  }).join("");
  drawMission(track, mission, '<div class="order-game">'
    + (mission.situation ? '<div class="order-problem">' + mission.situation + '</div>' : '')
    + '<div><div class="order-label">' + (mission.planLabel || "Your plan") + '</div><ol class="order-plan">' + slots + '</ol></div>'
    + '<div class="order-label">' + (mission.pickLabel || "Tap the steps in order") + '</div><div class="order-steps">' + buttons + '</div>'
    + '<div class="helper-text" id="helper-text">' + (mission.tip || "What comes first?") + '</div></div>');

  // The lowest rank that is not in the plan yet.
  function nextRank(){
    var left = goodSteps.filter(function(s){ return placed.indexOf(s) < 0; });
    return left.length ? Math.min.apply(null, left.map(function(s){ return s.rank; })) : null;
  }

  missionScreen.querySelectorAll(".order-step").forEach(function(button){
    button.addEventListener("click", function(){
      if (game.missionDone || button.disabled) return;
      var step = mission.steps[+button.dataset.i], helper = document.getElementById("helper-text");
      if (!step.rank) {
        button.disabled = true;
        button.classList.add("wrong");
        helper.className = "helper-text oops";
        helper.textContent = step.why;
        playSound(false);
        return;
      }
      if (step.rank !== nextRank()) {
        shake(button, "not-yet");
        helper.className = "helper-text oops";
        helper.textContent = mission.notYet || "Good step, but not yet. What has to happen first?";
        playSound(false);
        return;
      }
      var slot = document.getElementById("order-slot-" + placed.length);
      slot.querySelector(".order-slot-text").innerHTML = step.text;
      slot.classList.add("filled");
      placed.push(step);
      button.disabled = true;
      button.classList.add("used");
      helper.className = "helper-text right";
      helper.textContent = step.why;
      playSound(true);
      if (placed.length === goodSteps.length) setTimeout(function(){ winMission(track, mission, 100); }, 600);
    });
  });
}


/* ========================================================================
   12. END SCREEN
   Score, badges, the certificate box, the push to Level 2, the list of
   tricks learned, and three questions to take to a grown-up.
   ======================================================================== */
function showEndScreen(){
  var track = currentTrack(), kid = isYoungKid(track.key);
  var before = progressOf(track.key);
  var best = Math.max(before.best || 0, game.score);
  saveProgress(track.key, { done: track.missions.length, best: best, clean: before.clean || game.noCluesUsed });
  if (track.level === 1) openLevel2(track.group, false);

  var highScore = Math.round(track.missions.length * 100 * 0.85);
  var badges = [
    { icon: "🎓", got: true,
      name: kid ? "All missions done" : "Track complete",
      text: kid ? "You finished all " + track.missions.length + " missions." : "Finished all " + track.missions.length + " missions." },
    { icon: "🧠", got: game.noCluesUsed,
      name: kid ? "No clues needed" : "Clue-free run",
      text: kid ? "You got every mission right the first time." : "Every mission right first time." },
    { icon: "🔥", got: game.score >= highScore,
      name: kid ? "Super star" : "High scorer",
      text: kid ? "You got " + highScore + " stars or more." : "Scored " + highScore + " " + track.points + " or more." }
  ];
  var talk = TALK_CARDS[track.group];
  var savedName = loadSaved().name || "";

  endScreen.innerHTML = '<div class="end-screen">'
    + buddyPicture(track.group, 96)
    + '<h2>' + track.name + ' ' + levelName(track) + ' complete!</h2>'
    + '<p class="end-screen-text">' + track.buddy + (kid ? ' says: you did every mission!' : ' says: that was the whole set.') + '</p>'
    + '<div class="end-score">' + game.score + '</div><div class="end-score-label">' + track.points.toUpperCase() + ' &middot; BEST ' + best + '</div>'
    + '<div class="awards">' + badges.map(function(b){
        return '<div class="award' + (b.got ? " earned" : "") + '"><div class="award-icon">' + (b.got ? b.icon : "🔒") + '</div><b>' + b.name + '</b><span>' + b.text + '</span></div>';
      }).join("") + '</div>'

    // The certificate box
    + '<div class="certificate-box">'
    +   '<div class="certificate-box-top"><span class="certificate-trophy" aria-hidden="true">&#127942;</span><div>'
    +     '<h4>Get your certificate!</h4>'
    +     '<p class="certificate-box-text">Type your first name and we will make one you can print or save.</p>'
    +   '</div></div>'
    +   '<div class="name-row">'
    +     '<input id="first-name" type="text" maxlength="18" autocomplete="off" spellcheck="false" '
    +       'placeholder="Your first name" aria-label="Your first name" value="' + safeText(savedName) + '">'
    +     '<button class="button" id="make-certificate">Make it &#10024;</button>'
    +   '</div>'
    +   '<div class="privacy-line">' + SHIELD_ICON
    +     (kid ? '<span><b>Just your first name.</b> It stays here, and nobody else sees it.</span>'
              : '<span><b>First name only, and it stays on this device.</b> Your certificate is drawn right here in your browser. '
                + 'Your name is never sent anywhere, there is no email box, and nobody else ever sees it.</span>')
    +   '</div>'
    +   '<div id="certificate-spot"></div>'
    +   '<div class="note-box" id="print-note" hidden>If nothing happened, printing is blocked in this view. '
    +   'Use <b>Save as a picture</b> instead, or open the game in its own browser tab.</div>'
    + '</div>'

    // Level 2 is unlocked, or both levels are done
    + (track.level === 1
        ? '<div class="next-level-box"><div class="next-level-icon" aria-hidden="true">&#128640;</div><div class="next-level-text">'
          + '<b>&#128275; Level 2 is unlocked!</b><span>Next up: ' + track.levelTopics[1] + '.</span></div>'
          + '<button class="button" id="start-level-2">Start Level 2 &rarr;</button></div>'
        : '<div class="next-level-box all-done"><div class="next-level-icon" aria-hidden="true">&#127942;</div><div class="next-level-text">'
          + '<b>You finished both levels!</b><span>That is every trick in the ' + track.name + ' track.</span></div></div>')

    + '<div class="learned-list"><h4>What you can now spot</h4><ul>'
    +   track.missions.map(function(m){ return '<li><b>' + m.title + '</b></li>'; }).join("")
    + '</ul></div>'

    // Three questions to take to a grown-up
    + '<div id="talk-card" class="talk-card">'
    +   '<div class="talk-card-label">Take this to a grown-up</div>'
    +   '<h4>Three questions worth asking</h4>'
    +   '<p class="talk-card-intro">' + talk.intro + '</p>'
    +   '<ol>' + talk.questions.map(function(q){ return '<li>' + q[0] + '<span>' + q[1] + '</span></li>'; }).join("") + '</ol>'
    +   '<p class="talk-card-closing">' + talk.closing + '</p>'
    + '</div>'
    + '<div class="save-buttons no-print" style="justify-content:center">'
    +   '<button class="button light" id="copy-talk-card">Copy these questions</button>'
    +   '<button class="button light" id="print-talk-card">Try printing</button></div>'
    + '<div class="note-box no-print" id="talk-card-note" hidden>If nothing happened, printing is blocked in this view. '
    + 'Use <b>Copy these questions</b> and paste them anywhere.</div>'

    + '<div class="button-row" style="justify-content:center">'
    +   (track.level === 1 ? '<button class="button" id="start-level-2-again">Start Level 2 &rarr;</button>' : '')
    +   '<button class="button light" id="play-again">Play ' + levelName(track) + ' again</button>'
    +   '<button class="button light" id="other-age">Choose another age</button></div>'
    + '</div>';

  document.getElementById("play-again").addEventListener("click", function(){ startTrack(track.key); });
  ["start-level-2", "start-level-2-again"].forEach(function(id){
    var button = document.getElementById(id);
    if (button) button.addEventListener("click", function(){ openTrack(track.group + "2"); });
  });
  document.getElementById("other-age").addEventListener("click", showHome);
  document.getElementById("print-talk-card").addEventListener("click", function(){
    printOnly(document.getElementById("talk-card"), document.getElementById("talk-card-note"));
  });
  document.getElementById("copy-talk-card").addEventListener("click", function(e){
    var text = "ScamSquad Academy: " + track.name + " " + levelName(track) + " (" + track.ages + ")\n"
      + "Three questions worth asking\n\n" + talk.intro + "\n\n"
      + talk.questions.map(function(q, i){ return (i + 1) + ". " + q[0] + "\n   " + q[1]; }).join("\n\n")
      + "\n\n" + talk.closing;
    copyToClipboard(text.replace(/<[^>]+>/g, ""), e.currentTarget);
  });
  document.getElementById("make-certificate").addEventListener("click", function(){ makeCertificate(track, badges, best); });
  document.getElementById("first-name").addEventListener("keydown", function(e){
    if (e.key === "Enter") makeCertificate(track, badges, best);
  });
  showScreen(endScreen);
  confetti();
}

// The small shield picture next to the privacy line.
var SHIELD_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">'
  + '<path d="M12 2.6 4.5 5.8v6.1c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V5.8L12 2.6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'
  + '<path d="m8.8 12.2 2.3 2.3 4.2-4.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';


/* ========================================================================
   13. CERTIFICATE
   Made right here in the browser. The first name is only saved on this
   device so it is filled in next time. It is never sent anywhere, and
   there is no email box.
   ======================================================================== */
function makeCertificate(track, badges, best){
  var input = document.getElementById("first-name");
  var name = (input.value || "").trim();
  if (!name) {
    input.focus();
    input.placeholder = "Pop your first name in here first!";
    return;
  }
  var saved = loadSaved();
  saved.name = name;
  saveAll(saved);
  playMakingCertificate(track, name, function(){ showCertificate(track, badges, best, name); });
}

/* "Making your certificate": a bar fills up while a few lines say what the
   player learned, taken from the missions they just finished. It is just
   for fun. With reduced motion switched on it is over almost at once. */
function playMakingCertificate(track, name, whenDone){
  var spot = document.getElementById("certificate-spot");
  var button = document.getElementById("make-certificate"), input = document.getElementById("first-name");
  var who = safeText(name);

  // The bold part of a mission's lesson, short enough for one line.
  function whatTheyLearned(mission){
    var bold = (mission.lesson || "").match(/<b>([\s\S]*?)<\/b>/);
    var text = (bold ? bold[1] : mission.title).replace(/<[^>]+>/g, "").replace(/[.:]+\s*$/, "");
    return text.length > 80 ? mission.title : text;
  }
  // Pick four missions spread across the track: first, a third in, two thirds in, last.
  var n = track.missions.length;
  var picks = [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1].filter(function(v, i, all){ return all.indexOf(v) === i; });
  var lines = ['&#128269; ' + track.buddy + ' is checking ' + who + '&rsquo;s missions&hellip;']
    .concat(picks.map(function(i){ return '&#9989; ' + who + ' learned: <b>' + whatTheyLearned(track.missions[i]) + '</b>'; }))
    .concat(['&#127941; Adding the gold seal&hellip;', '&#10024; ' + track.buddy + ' is signing it&hellip;']);

  spot.innerHTML = '<div class="certificate-making" role="status" aria-live="polite">'
    + '<div class="making-title">Making ' + who + '&rsquo;s certificate</div>'
    + '<div class="making-bar"><i id="making-fill"></i></div>'
    + '<ul class="making-steps" id="making-steps"></ul></div>';
  button.disabled = true;
  input.disabled = true;
  spot.scrollIntoView({ block: "nearest", behavior: "smooth" });

  var pause = wantsCalm() ? 60 : 650, shown = 0;
  function addNextLine(){
    var list = document.getElementById("making-steps"), fill = document.getElementById("making-fill");
    if (!list) return;   // the player left the end screen
    if (shown < lines.length) {
      var li = document.createElement("li");
      li.innerHTML = lines[shown];
      list.appendChild(li);
      fill.style.width = Math.round((shown + 1) / (lines.length + 1) * 100) + "%";
      shown++;
      setTimeout(addNextLine, pause);
    } else {
      fill.style.width = "100%";
      setTimeout(function(){
        button.disabled = false;
        input.disabled = false;
        whenDone();
      }, wantsCalm() ? 60 : 500);
    }
  }
  addNextLine();
}

function showCertificate(track, badges, best, rawName){
  var name = safeText(rawName), kid = isYoungKid(track.key);
  var earned = badges.filter(function(b){ return b.got; }).map(function(b){ return b.icon + " " + b.name; });
  var date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  var title = CERTIFICATE_TITLES[track.group];
  var opening = kid ? "This award goes to" : "This certifies that";
  var finished = kid
    ? "finished " + levelName(track) + " of the <b>" + track.name + "</b> track and can now spot these tricks."
    : "completed " + levelName(track) + " of the <b>" + track.name + "</b> track and can now spot these tricks in the wild.";
  var show = SHOW_A_GROWN_UP[track.group];

  document.getElementById("certificate-spot").innerHTML =
      '<div id="certificate">'
    + '<div class="certificate-buddy">' + buddyPicture(track.group, 74) + '</div>'
    + '<div class="certificate-inner">'
    +   '<div class="certificate-label">ScamSquad Academy</div>'
    +   '<h3>' + title + '</h3><p class="certificate-text" style="margin-top:-4px"><b>' + levelName(track) + '</b></p>'
    +   '<p class="certificate-text">' + opening + '</p>'
    +   '<div class="certificate-name">' + name + '</div>'
    +   '<div class="certificate-line"></div>'
    +   '<p class="certificate-text">' + finished + '</p>'
    +   (earned.length ? '<p class="certificate-awards"><b>Badges earned:</b> ' + earned.join(" &nbsp;&middot;&nbsp; ") + '</p>' : '')
    +   '<div class="certificate-bottom">'
    +     '<div><b>' + track.buddy + '</b>' + track.buddyJob + '</div>'
    +     '<div class="medal" aria-label="Best score ' + best + ' ' + track.points + '"><div class="medal-middle"><span>&#9733;</span><b>' + best + '</b><i>' + track.points + '</i></div></div>'
    +     '<div class="certificate-date"><b>' + date + '</b>Date completed</div>'
    +   '</div>'
    + '</div></div>'
    // The certificate is a reason to go and talk to a parent. Any reward is up to them.
    + '<div class="show-a-grown-up"><span class="show-icon" aria-hidden="true">' + show.icon + '</span><div><b>' + show.title + '</b><span>' + show.text + '</span></div></div>'
    + '<div class="save-buttons">'
    +   '<button class="button" id="save-picture">Save as a picture</button>'
    +   '<button class="button light" id="print-certificate">Try printing</button>'
    + '</div>'
    + '<div id="picture-spot"></div>';

  document.getElementById("save-picture").addEventListener("click", function(){
    var picture = drawCertificatePicture({
      title: title + " · " + levelName(track),
      opening: opening,
      name: rawName,
      line: finished.replace(/<[^>]+>/g, ""),
      badges: earned.join("  ·  "),
      buddy: track.buddy, buddyJob: track.buddyJob,
      best: best, points: track.points,
      date: date
    });
    savePicture(picture, rawName, name);
  });
  document.getElementById("print-certificate").addEventListener("click", function(){
    printOnly(document.getElementById("certificate"), document.getElementById("print-note"));
  });

  // Once the certificate is made, the name box hides. A small link brings it back.
  var box = document.querySelector(".certificate-box");
  var heading = box.querySelector(".certificate-box-top h4"), text = box.querySelector(".certificate-box-text");
  box.classList.add("ready");
  heading.textContent = "Your certificate is ready!";
  text.innerHTML = '<button class="text-button" id="change-name" type="button">&#9999;&#65039; Change the name</button>';
  document.getElementById("change-name").addEventListener("click", function(){
    box.classList.remove("ready");
    heading.textContent = "Get your certificate!";
    text.textContent = "Type your first name and we will make one you can print or save.";
    var input = document.getElementById("first-name");
    input.focus();
    input.select();
  });
  document.getElementById("certificate").scrollIntoView({ block: "nearest", behavior: "smooth" });
  confetti();
}

/* Downloads the picture as a PNG file. Phones often open pictures instead
   of saving them, so on a phone the picture also shows below, ready to
   long-press and save. */
function savePicture(picture, rawName, safeName){
  var spot = document.getElementById("picture-spot");
  if (!picture) {
    spot.innerHTML = '<div class="note-box">Couldn’t make a picture on this device. A screenshot of the certificate above works just as well.</div>';
    return;
  }
  var fileName = "ScamSquad-certificate-" + (rawName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "me") + ".png";
  try {
    var link = document.createElement("a");
    link.href = picture;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {}

  var pictureHtml = '<img id="certificate-picture" src="' + picture + '" alt="Certificate for ' + safeName + '">';
  var isTouchScreen = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchScreen) {
    spot.innerHTML = '<div class="note-box"><b>&#9989; Saved as ' + safeText(fileName) + '.</b> '
      + 'Nothing downloaded? Long-press the picture below and choose Save image.</div>' + pictureHtml;
  } else {
    spot.innerHTML = '<div class="note-box"><b>&#9989; Saved as ' + safeText(fileName) + '.</b> '
      + 'Look in your Downloads folder. <button class="text-button" id="show-picture" type="button">Nothing downloaded? Show the picture</button></div>';
    var showButton = document.getElementById("show-picture");
    showButton.addEventListener("click", function(){
      showButton.insertAdjacentHTML("afterend", '<span class="note-box" style="display:block;margin-top:6px">Right-click the picture and choose Save image as.</span>');
      showButton.remove();
      spot.insertAdjacentHTML("beforeend", pictureHtml);
    });
  }
  spot.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

/* Draws the certificate onto a canvas (a blank picture) so it can be saved
   as a PNG. The canvas is drawn twice as big, so it looks sharp. */
function drawCertificatePicture(c){
  var W = 1100, H = 790, SHARPNESS = 2;
  var canvas = document.createElement("canvas");
  canvas.width = W * SHARPNESS;
  canvas.height = H * SHARPNESS;
  var pen = canvas.getContext("2d");
  pen.scale(SHARPNESS, SHARPNESS);
  var titleFont = '"Fredoka", "Trebuchet MS", sans-serif';
  var textFont = '"Nunito", "Segoe UI", sans-serif';

  // Splits text into lines that fit inside maxWidth.
  function linesThatFit(text, maxWidth){
    var words = text.split(" "), lines = [], line = "";
    words.forEach(function(word){
      var test = line ? line + " " + word : word;
      if (pen.measureText(test).width > maxWidth && line) { lines.push(line); line = word; }
      else { line = test; }
    });
    if (line) lines.push(line);
    return lines;
  }
  function roundedBox(x, y, w, h, r){
    pen.beginPath();
    pen.moveTo(x + r, y); pen.lineTo(x + w - r, y); pen.quadraticCurveTo(x + w, y, x + w, y + r);
    pen.lineTo(x + w, y + h - r); pen.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    pen.lineTo(x + r, y + h); pen.quadraticCurveTo(x, y + h, x, y + h - r);
    pen.lineTo(x, y + r); pen.quadraticCurveTo(x, y, x + r, y); pen.closePath();
  }
  function line(x1, y1, x2, y2, colour){
    pen.strokeStyle = colour; pen.lineWidth = 3;
    pen.beginPath(); pen.moveTo(x1, y1); pen.lineTo(x2, y2); pen.stroke();
  }

  // Paper, gold border and dashed inner border
  pen.fillStyle = "#FFFDF7"; pen.fillRect(0, 0, W, H);
  pen.strokeStyle = "#C9A227"; pen.lineWidth = 8;
  roundedBox(14, 14, W - 28, H - 28, 22); pen.stroke();
  pen.strokeStyle = "#E0CE8E"; pen.lineWidth = 3; pen.setLineDash([9, 9]);
  roundedBox(44, 44, W - 88, H - 88, 14); pen.stroke(); pen.setLineDash([]);

  // Words, top to bottom
  pen.textAlign = "center";
  pen.fillStyle = "#9A7B12"; pen.font = "600 19px " + titleFont;
  pen.fillText("S C A M S Q U A D   A C A D E M Y", W / 2, 118);
  pen.fillStyle = "#221E38"; pen.font = "700 44px " + titleFont;
  pen.fillText(c.title, W / 2, 180);
  pen.fillStyle = "#4A4560"; pen.font = "400 23px " + textFont;
  pen.fillText(c.opening, W / 2, 240);

  // The name, made smaller if it is too long to fit
  var size = 66;
  pen.fillStyle = "#3A2FBE"; pen.font = "700 " + size + "px " + titleFont;
  while (pen.measureText(c.name).width > W - 220 && size > 30) {
    size -= 3;
    pen.font = "700 " + size + "px " + titleFont;
  }
  pen.fillText(c.name, W / 2, 322);
  line(W / 2 - 160, 360, W / 2 + 160, 360, "#E0CE8E");

  pen.fillStyle = "#4A4560"; pen.font = "400 23px " + textFont;
  linesThatFit(c.line, W - 300).forEach(function(text, i){ pen.fillText(text, W / 2, 408 + i * 34); });
  if (c.badges) {
    pen.fillStyle = "#221E38"; pen.font = "600 21px " + textFont;
    linesThatFit("Badges earned: " + c.badges, W - 280).forEach(function(text, i){ pen.fillText(text, W / 2, 500 + i * 30); });
  }
  line(90, 630, W - 90, 630, "#EFE4C0");

  // Bottom row: buddy on the left, date on the right
  pen.textAlign = "left";
  [[c.buddy, c.buddyJob, 100], [c.date, "Date completed", W - 330]].forEach(function(col){
    pen.fillStyle = "#221E38"; pen.font = "600 25px " + titleFont;
    pen.fillText(col[0], col[2], 674);
    pen.fillStyle = "#6A6480"; pen.font = "400 17px " + textFont;
    pen.fillText(col[1], col[2], 702);
  });

  // Gold medal with the score, in the middle of the bottom row
  var mx = W / 2, my = 668;
  pen.fillStyle = "#A6252B";
  [-1, 1].forEach(function(side){   // two red ribbons
    pen.save(); pen.translate(mx + side * 20, my + 26); pen.rotate(side * 0.25);
    pen.beginPath(); pen.moveTo(-12, 0); pen.lineTo(12, 0); pen.lineTo(12, 40); pen.lineTo(0, 31); pen.lineTo(-12, 40); pen.closePath(); pen.fill();
    pen.restore();
  });
  pen.beginPath();   // the bumpy gold edge
  for (var q = 0; q <= 56; q++) {
    var angle = q / 56 * Math.PI * 2, radius = (q % 2 ? 44 : 49);
    pen.lineTo(mx + Math.cos(angle) * radius, my + Math.sin(angle) * radius);
  }
  pen.closePath(); pen.fillStyle = "#C9962A"; pen.fill();
  var shine = pen.createRadialGradient(mx - 12, my - 14, 4, mx, my, 38);
  shine.addColorStop(0, "#FFF3B8"); shine.addColorStop(0.45, "#E2B23C"); shine.addColorStop(1, "#B5841F");
  pen.beginPath(); pen.arc(mx, my, 37, 0, Math.PI * 2); pen.fillStyle = shine; pen.fill();
  pen.textAlign = "center"; pen.fillStyle = "#6B4A0C";
  pen.font = "16px " + textFont; pen.fillText("★", mx, my - 12);
  pen.font = "700 19px " + titleFont; pen.fillText(String(c.best), mx, my + 8);
  pen.font = "700 10px " + textFont; pen.fillText(String(c.points).toUpperCase(), mx, my + 22);

  try { return canvas.toDataURL("image/png"); } catch (e) { return null; }
}


/* ========================================================================
   14. GROWN-UPS PANEL
   Three tabs: Parents, Teachers and About. Short on purpose.
   ======================================================================== */
function showGrownUps(){
  var lessonPlans = ["explore", "squad", "crew"].map(function(group){
    var info = AGE_GROUPS[group], plan = LESSON_PLANS[group];
    return '<div class="lesson-plan" id="lesson-' + group + '">'
      + '<h4>' + info.name + ' &middot; ' + info.ages + '</h4>'
      + '<div class="lesson-tags"><span>' + plan.grades + '</span><span>' + plan.time + '</span><span>' + plan.group + '</span><span>No prep</span><span>No accounts</span></div>'
      + '<h5>Goal</h5><p>' + plan.goal + '</p>'
      + '<h5>Steps</h5><ol>' + plan.steps.map(function(s){ return '<li>' + s + '</li>'; }).join("") + '</ol>'
      + '<h5>Questions to ask</h5><ul>' + plan.questions.map(function(q){ return '<li>' + q + '</li>'; }).join("") + '</ul>'
      + '<h5>If you have time</h5><p>' + plan.extra + '</p>'
      + '<div class="careful-box"><b>Before you start:</b> ' + plan.careful + '</div>'
      + '<div class="save-buttons no-print"><button class="button light" data-copy="' + group + '">Copy this lesson plan</button>'
      + '<button class="button light" data-print="' + group + '">Try printing</button></div>'
      + '<div class="note-box no-print" id="lesson-note-' + group + '" hidden>If nothing happened, printing is blocked in this view. '
      + 'Use <b>Copy this lesson plan</b> and paste it into a document.</div>'
      + '</div>';
  }).join("");

  grownUpsScreen.innerHTML = '<div class="grown-ups">'
    + '<h2>For parents and teachers</h2>'
    + '<p class="grown-ups-intro">What the game does, what it never does, and where the facts come from.</p>'
    + '<div class="tabs no-print" role="tablist">'
    +   '<button id="tab-parents-button" role="tab" aria-selected="true">Parents</button>'
    +   '<button id="tab-teachers-button" role="tab" aria-selected="false">Teachers</button>'
    +   '<button id="tab-about-button" role="tab" aria-selected="false">About</button>'
    + '</div>'

    /* ----- Parents tab ----- */
    + '<div id="tab-parents">'
    +   '<div class="privacy-box"><h3>Privacy</h3>'
    +   '<p>No accounts, no names, no email, no tracking. Scores stay in this browser, and clearing it erases them.</p>'
    +   '<p>Only two things are ever sent. The first time the game opens on a device, it sends one anonymous +1, '
    +   'so we can show how many devices it has been played on. Nothing about the player is sent with it. '
    +   'And an adult can choose to send us a message with the contact form in the About tab.</p></div>'

    +   '<h3>Nobody can lose</h3>'
    +   '<p>A wrong answer gets a clue and another try. Shame is the main reason kids do not tell an adult, '
    +   'so the game never makes them feel stupid for being fooled.</p>'

    +   '<h3>What each age group covers</h3>'
    +   '<p>Level 1 is scams in chats and games. Level 2 is websites, shops, email, texts and apps. It opens when Level 1 is done.</p>'
    +   '<div class="topic-grid">' + ["explore", "squad", "crew"].map(function(group){
          var info = AGE_GROUPS[group];
          return '<div class="topic-box"><b>' + info.name + ' &middot; ' + info.ages.replace("Ages ", "") + '</b>'
            + [1, 2].map(function(level){
                return '<div class="topic-level">Level ' + level + '</div><ul>'
                  + WHAT_EACH_LEVEL_COVERS[group][level - 1].map(function(topic){ return '<li>' + topic + '</li>'; }).join("") + '</ul>';
              }).join("")
            + '</div>';
        }).join("") + '</div>'

    +   '<h3>What the game never shows</h3>'
    +   '<ul>'
    +   '<li>No sexual content, and no description of abuse.</li>'
    +   '<li>No self-harm content.</li>'
    +   '<li>No word-for-word scam scripts. Patterns only.</li>'
    +   '<li>Ages 6 to 9 never see grooming or blackmail.</li>'
    +   '<li>No timers and no way to lose.</li>'
    +   '</ul>'

    +   '<h3>If something has already happened</h3>'
    +   '<ul>'
    +   '<li><b>NCMEC CyberTipline:</b> missingkids.org/cybertipline or 1-800-843-5678</li>'
    +   '<li><b>Take It Down:</b> takeitdown.ncmec.org stops a private photo spreading. No name needed.</li>'
    +   '<li><b>FBI:</b> ic3.gov or 1-800-CALL-FBI</li>'
    +   '<li><b>988 Lifeline:</b> call or text 988</li>'
    +   '<li><b>UK:</b> Childline 0800 1111 and Report Remove</li>'
    +   '</ul>'

    +   '<h3>Where the facts come from</h3>'
    +   '<p>'
    +   '<a href="https://www.missingkids.org/gethelpnow/cybertipline/cybertiplinedata">NCMEC</a>, '
    +   '<a href="https://www.thorn.org/research/library/financial-sextortion/">Thorn</a>, '
    +   '<a href="https://www.iwf.org.uk/annual-data-insights-report-2025/executive-summary/">Internet Watch Foundation</a>, '
    +   '<a href="https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/sextortion/financially-motivated-sextortion">FBI</a>, '
    +   '<a href="https://www.ic3.gov/PSA/2024/PSA241203">FBI on cloned voices</a>, '
    +   '<a href="https://cyberbullying.org/2025-cyberbullying-data">Cyberbullying Research Center</a>, '
    +   '<a href="https://www.commonsensemedia.org/press-releases/nearly-3-in-4-teens-have-used-ai-companions-new-national-survey-finds">Common Sense Media</a>, '
    +   '<a href="https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-ai-adolescent-well-being">American Psychological Association</a>, '
    +   '<a href="https://www.ftc.gov/business-guidance/blog/2026/05/take-it-down-act-enforcement-starts-now-what-know-about-ftc-tida">FTC</a>, '
    +   '<a href="https://www.ftc.gov/news-events/news/press-releases/2024/07/ftc-order-will-ban-ngl-labs-its-founders-offering-anonymous-messaging-apps-kids-under-18-halt">FTC on anonymous apps</a>, '
    +   '<a href="https://www.ftc.gov/business-guidance/blog/2022/12/245-million-ftc-settlement-alleges-fortnite-owner-epic-games-used-digital-dark-patterns-charge">FTC on in-game buying</a>, '
    +   '<a href="https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it">FTC on codes</a>, '
    +   '<a href="https://consumer.ftc.gov/consumer-alerts/2022/07/selling-stuff-online-heres-how-avoid-scam">FTC on selling online</a>, '
    +   '<a href="https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams">FTC on fake virus pop-ups</a>, '
    +   '<a href="https://www.adl.org/resources/report/hate-no-game-hate-and-harassment-online-games-2022">ADL</a>, '
    +   '<a href="https://help.steampowered.com/en/faqs/view/70E6-991B-233B-A37B">Steam</a>, '
    +   '<a href="https://moonlock.com/discord-scams">Moonlock</a>, '
    +   '<a href="https://www.kaspersky.com/blog/curseforge-compromised-fractureiser/48388/">Kaspersky</a>, '
    +   '<a href="https://www.epicgames.com/help/c-202300000001645/c-202300000001755/can-i-buy-sell-or-share-an-epic-games-account-a202300000014094">Epic Games</a>, '
    +   '<a href="https://faq.whatsapp.com/479314433984258">WhatsApp</a>, '
    +   'Malwarebytes and Flare Research. Checked August to October 2026.</p>'
    +   '<p class="disclaimer">Not connected to or endorsed by Mojang, Microsoft, Roblox, Epic Games, Discord, Valve, TikTok, Twitch, Meta or WhatsApp. '
    +   'Their names only show where these tricks happen. No real logos are used.</p>'
    + '</div>'

    /* ----- Teachers tab ----- */
    + '<div id="tab-teachers" hidden>'
    +   '<p>Free, with no accounts and no student data, so there is nothing for a privacy review to check. '
    +   'Each plan is one lesson using Level 1. Level 2 makes a good second lesson.</p>'
    +   lessonPlans
    +   '<h3>Standards</h3>'
    +   '<p>Fits the digital citizenship parts of the ISTE Standards for Students and the Texas TEKS for Technology Applications. '
    +   'Check the current code for your grade.</p>'
    +   '<h3>Open Level 2 on a shared device</h3>'
    +   '<p>Level 2 opens when Level 1 is finished on that device. To open it now for every age group:</p>'
    +   '<p><button class="button light" id="open-all-level-2">Open Level 2 on this device</button> <span class="opened-message" id="opened-message" role="status"></span></p>'
    + '</div>'

    /* ----- About tab ----- */
    + '<div id="tab-about" hidden>'
    +   '<h3>Who made this</h3>'
    +   '<p>ScamSquad Academy was built by <b>Arvin Challa</b>, a high school student in Texas. '
    +   'It is free, there is nothing to buy, and nobody sponsors it.</p>'
    +   '<blockquote>&ldquo;I got the idea for this from what I came across myself while I was growing up online. I ran into '
    +   'different people, scams and threats. I really want to make sure kids do not fall for that. '
    +   'Online scams and cyber crime keep increasing, and kids and elderly people are the easiest targets.&rdquo;</blockquote>'
    +   '<p><b>Arvin Challa</b></p>'
    +   '<h3>Get in touch</h3>'
    +   '<p>For parents, teachers and other adults: questions about using the game in class, ideas, or a correction.</p>'
    +   (contactFormIsOn()
          ? '<div class="careful-box"><b>Are you a kid?</b> This form is for grown-ups. If something is happening to you online, '
            + 'tell a parent, or another adult you trust. You are not in trouble.</div>'
            + contactFormHtml()
            + '<p><b>If a child needs help right now,</b> do not use this form. Use the reporting links in the Parents tab.</p>'
          : (CLOUDFLARE.workerUrl && !isOnTheWeb()
              ? '<p class="note-box">The contact form only works on the website. This copy was opened as a file on this computer, '
                + 'so it is hidden here. It will show up at arvinchalla.github.io.</p>'
              : '<p>A contact form is coming. For now, please reach out through your school.</p>')
            + '<p><b>If a child needs help right now,</b> use the reporting links in the Parents tab.</p>')
    + '</div>'

    + '<div class="button-row no-print"><button class="button" id="back-to-game">'
    +   (game.cameFrom === "mission" && game.trackKey ? 'Back to the game' : '&larr; Back to home') + '</button></div>'
    + '</div>';

  // Tabs
  var tabs = ["parents", "teachers", "about"];
  tabs.forEach(function(name){
    document.getElementById("tab-" + name + "-button").addEventListener("click", function(){
      tabs.forEach(function(other){
        document.getElementById("tab-" + other + "-button").setAttribute("aria-selected", other === name ? "true" : "false");
        document.getElementById("tab-" + other).hidden = (other !== name);
      });
      if (name === "about") setUpContactForm();
    });
  });

  // Lesson plan buttons
  grownUpsScreen.querySelectorAll("[data-print]").forEach(function(button){
    button.addEventListener("click", function(){
      var group = button.getAttribute("data-print");
      printOnly(document.getElementById("lesson-" + group), document.getElementById("lesson-note-" + group));
    });
  });
  grownUpsScreen.querySelectorAll("[data-copy]").forEach(function(button){
    button.addEventListener("click", function(e){
      var group = button.getAttribute("data-copy"), info = AGE_GROUPS[group], plan = LESSON_PLANS[group];
      var text = "ScamSquad Academy: lesson plan\n" + info.name + " (" + info.ages + ")\n"
        + plan.grades + " · " + plan.time + " · " + plan.group + " · no prep, no accounts\n\n"
        + "GOAL\n" + plan.goal + "\n\n"
        + "STEPS\n" + plan.steps.map(function(s, i){ return (i + 1) + ". " + s; }).join("\n") + "\n\n"
        + "QUESTIONS TO ASK\n" + plan.questions.map(function(q){ return "- " + q; }).join("\n") + "\n\n"
        + "IF YOU HAVE TIME\n" + plan.extra + "\n\n"
        + "BEFORE YOU START\n" + plan.careful;
      copyToClipboard(text, e.currentTarget);
    });
  });

  document.getElementById("open-all-level-2").addEventListener("click", function(){
    ["explore", "squad", "crew"].forEach(function(group){ openLevel2(group, true); });
    document.getElementById("opened-message").textContent = "Done. Level 2 is open for all ages on this device.";
  });

  document.getElementById("back-to-game").addEventListener("click", function(){
    if (game.cameFrom === "mission" && game.trackKey) { showMission(); }
    else { showHome(); }
  });
  showScreen(grownUpsScreen);
}


/* ---------- The contact form, in the About tab ----------
   Only adults are meant to use it. What happens to a message is written
   right under the form. The "I am not a robot" check comes from Cloudflare,
   so its script only loads when someone opens the About tab, never while a
   kid is playing the game. */
function contactFormIsOn(){
  return !!(CLOUDFLARE.workerUrl && CLOUDFLARE.turnstileSiteKey) && isOnTheWeb();
}

// The counter and the contact form only work when the game is opened from a
// web address. A file opened straight from a computer has no web address, so
// Cloudflare will not answer it.
function isOnTheWeb(){
  return location.protocol === "http:" || location.protocol === "https:";
}

function contactFormHtml(){
  return '<form id="contact-form" class="contact-form" novalidate>'
    + '<label>I am a <select name="who">'
    +   '<option value="parent">Parent or caregiver</option><option value="teacher">Teacher</option><option value="other adult">Other adult</option>'
    + '</select></label>'
    + '<label>Your message <textarea name="message" rows="6" maxlength="2000"></textarea></label>'
    + '<label>Your email, only if you would like a reply <input type="email" name="email" maxlength="200" autocomplete="email" placeholder="Optional"></label>'
    + '<label class="checkbox-row"><input type="checkbox" name="adult"> I am 18 or over</label>'
    // A box people never see. Spam robots fill it in, and get ignored.
    + '<div class="robot-trap" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>'
    + '<div id="robot-check"></div>'
    + '<div class="button-row"><button class="button" type="submit" id="send-button">Send message</button></div>'
    + '<p class="form-status" id="form-status" role="status" aria-live="polite"></p>'
    + '</form>'
    + '<p class="disclaimer"><b>What happens to your message:</b> it goes to the ScamSquad Academy inbox, and a copy is kept in Cloudflare storage. '
    + 'Only what you type is sent. Your IP address is not saved. Your email is only used to reply, never shared or added to a list.</p>';
}

var robotCheck = { token: "", widget: null };

function setUpContactForm(){
  var form = document.getElementById("contact-form");
  if (!form || form.dataset.ready) return;   // no form, or already set up
  form.dataset.ready = "yes";
  var status = document.getElementById("form-status"), sendButton = document.getElementById("send-button");

  function say(text, isProblem){
    status.textContent = text;
    status.className = "form-status" + (isProblem ? " problem" : " sent");
  }

  // Load Cloudflare's robot check the first time, then draw it in the form.
  function drawRobotCheck(){
    robotCheck.token = "";
    robotCheck.widget = window.turnstile.render("#robot-check", {
      sitekey: CLOUDFLARE.turnstileSiteKey,
      callback: function(token){ robotCheck.token = token; },
      "expired-callback": function(){ robotCheck.token = ""; }
    });
  }
  if (window.turnstile) {
    drawRobotCheck();
  } else {
    window.whenRobotCheckLoads = drawRobotCheck;
    var script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=whenRobotCheckLoads&render=explicit";
    script.async = true;
    document.head.appendChild(script);
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var message = {
      who: form.who.value,
      message: form.message.value.trim(),
      email: form.email.value.trim(),
      adult: form.adult.checked,
      website: form.website.value,
      turnstileToken: robotCheck.token
    };
    // Check the easy things here, so nobody waits to hear about them.
    if (message.message.length < 5) { say("Please write a message first.", true); form.message.focus(); return; }
    if (!message.adult) { say("Please tick the box to say you are 18 or over.", true); return; }
    if (!message.turnstileToken) { say("Please finish the robot check first.", true); return; }

    sendButton.disabled = true;
    say("Sending...", false);
    fetch(CLOUDFLARE.workerUrl + "/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    })
      .then(function(response){ return response.json(); })
      .then(function(result){
        if (result.ok) { form.reset(); say("Thank you. Your message has been sent.", false); }
        else { say(result.error || "Something went wrong. Please try again.", true); }
      })
      .catch(function(){ say("Could not send. Please check your internet connection and try again.", true); })
      .then(function(){
        // Each robot check can only be used once, so get a fresh one.
        robotCheck.token = "";
        if (window.turnstile && robotCheck.widget !== null) window.turnstile.reset(robotCheck.widget);
        sendButton.disabled = false;
      });
  });
}


/* ========================================================================
   15. PRINTING AND COPYING
   ======================================================================== */

// Prints just one part of the page. If printing is blocked (it often is
// when the game is shown inside another page), a note explains what to do.
function printOnly(el, note){
  if (!el) return;
  el.classList.add("print-this");
  try { window.print(); } catch (e) {}
  setTimeout(function(){ el.classList.remove("print-this"); }, 900);
  if (note) note.hidden = false;
}

// Copies text, using the older way first because the newer one is often
// blocked when the game is shown inside another page.
function copyToClipboard(text, button){
  var box = document.createElement("textarea");
  box.value = text;
  box.setAttribute("readonly", "");
  box.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
  document.body.appendChild(box);
  box.select();
  box.setSelectionRange(0, text.length);
  var worked = false;
  try { worked = document.execCommand("copy"); } catch (e) {}
  box.remove();
  if (!worked && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function(){}, function(){});
    worked = true;
  }
  var label = button.textContent;
  button.textContent = worked ? "Copied ✓" : "Couldn’t copy. Select it by hand";
  setTimeout(function(){ button.textContent = label; }, 2400);
}


/* ========================================================================
   16. SOUND, ZOOM, CONFETTI AND THE DEVICE COUNTER
   The sound is made by the browser, so there are no sound files. The
   settings are saved on this device under "scamsquad-prefs".
   ======================================================================== */
var ZOOM_SIZES = [0.8, 0.9, 1, 1.15, 1.3, 1.5];
var settings = { mute: false, volume: 3, zoom: 2 };   // volume is 0 to 5. zoom is a spot in ZOOM_SIZES.
var soundMaker = null;

function loadSettings(){
  try {
    var saved = JSON.parse(localStorage.getItem("scamsquad-prefs") || "{}");
    if (typeof saved.mute === "boolean") settings.mute = saved.mute;
    if (saved.vol >= 0 && saved.vol <= 5) settings.volume = saved.vol;
    if (saved.zoom >= 0 && saved.zoom < ZOOM_SIZES.length) settings.zoom = saved.zoom;
  } catch (e) {}
}

function saveSettings(){
  try {
    localStorage.setItem("scamsquad-prefs", JSON.stringify({ mute: settings.mute, vol: settings.volume, zoom: settings.zoom }));
  } catch (e) {}
}

function isSilent(){ return settings.mute || settings.volume === 0; }

// Updates the buttons and the page zoom to match the settings.
function showSettings(){
  document.documentElement.style.setProperty("--ui-zoom", ZOOM_SIZES[settings.zoom]);
  document.querySelector(".controls").classList.toggle("muted", isSilent());
  var sound = document.getElementById("sound-button");
  sound.innerHTML = isSilent() ? "&#128263;" : "&#128266;";
  sound.setAttribute("aria-pressed", isSilent() ? "true" : "false");
  sound.setAttribute("aria-label", isSilent() ? "Sound is off. Turn sound on" : "Sound is on. Turn sound off");
  document.querySelectorAll("#volume-bars i").forEach(function(bar, i){ bar.classList.toggle("on", i < settings.volume); });
  document.getElementById("volume-bars").setAttribute("aria-label", "Volume " + settings.volume + " of 5");
  document.getElementById("quieter-button").disabled = settings.volume === 0;
  document.getElementById("louder-button").disabled = settings.volume === 5;
  document.getElementById("zoom-level").textContent = Math.round(ZOOM_SIZES[settings.zoom] * 100) + "%";
  document.getElementById("smaller-button").disabled = settings.zoom === 0;
  document.getElementById("bigger-button").disabled = settings.zoom === ZOOM_SIZES.length - 1;
}

function listenToSettings(){
  function onClick(id, change){
    document.getElementById(id).addEventListener("click", function(){ change(); saveSettings(); showSettings(); });
  }
  // A short sound after a volume change, so the player hears the new level.
  function testSound(){ setTimeout(function(){ playSound(true, true); }, 0); }

  onClick("sound-button", function(){
    if (settings.volume === 0) { settings.volume = 3; settings.mute = false; }
    else { settings.mute = !settings.mute; }
    if (!settings.mute) testSound();
  });
  onClick("quieter-button", function(){ if (settings.volume > 0) settings.volume--; settings.mute = false; testSound(); });
  onClick("louder-button", function(){ if (settings.volume < 5) settings.volume++; settings.mute = false; testSound(); });
  onClick("smaller-button", function(){ if (settings.zoom > 0) settings.zoom--; });
  onClick("bigger-button", function(){ if (settings.zoom < ZOOM_SIZES.length - 1) settings.zoom++; });
  showSettings();
}

// A happy rising "ding" when good is true, a low "bonk" when it is false.
function playSound(good, isTest){
  try {
    if (isSilent()) return;
    // Reduced motion keeps the game quiet, except when the player tests the volume.
    if (!isTest && wantsCalm()) return;
    if (!soundMaker) soundMaker = new (window.AudioContext || window.webkitAudioContext)();
    var now = soundMaker.currentTime;
    var tone = soundMaker.createOscillator(), loudness = soundMaker.createGain();
    tone.connect(loudness);
    loudness.connect(soundMaker.destination);
    tone.type = "sine";
    tone.frequency.setValueAtTime(good ? 620 : 330, now);
    if (good) tone.frequency.exponentialRampToValueAtTime(940, now + 0.13);
    loudness.gain.setValueAtTime(0.0001, now);
    loudness.gain.exponentialRampToValueAtTime(0.02 * settings.volume, now + 0.02);
    loudness.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    tone.start();
    tone.stop(now + 0.24);
  } catch (e) {}
}

// Little coloured squares burst up and fall down. Skipped with reduced motion.
function confetti(){
  if (wantsCalm()) return;
  var canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:99";
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.appendChild(canvas);
  var pen = canvas.getContext("2d");
  var colours = ["#4B3FE4", "#E07C00", "#0E7F94", "#0E8F68", "#FFD98A", "#FF8FA3"];
  var bits = [];
  for (var i = 0; i < 110; i++) {
    bits.push({
      x: innerWidth / 2 + (Math.random() - 0.5) * 220, y: innerHeight * 0.32,
      speedX: (Math.random() - 0.5) * 9, speedY: Math.random() * -11 - 3,
      size: 5 + Math.random() * 7, colour: colours[i % colours.length], spin: Math.random() * 6
    });
  }
  var frames = 0;
  // Browsers pause animations in a background tab. This clears the confetti anyway.
  setTimeout(function(){ canvas.remove(); }, 4000);
  (function drawFrame(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(function(b){
      b.x += b.speedX; b.y += b.speedY; b.speedY += 0.34; b.spin += 0.12;   // gravity pulls them down
      pen.save(); pen.translate(b.x, b.y); pen.rotate(b.spin);
      pen.fillStyle = b.colour; pen.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.6);
      pen.restore();
    });
    frames++;
    if (frames < 130) requestAnimationFrame(drawFrame); else canvas.remove();
  })();
}

/* ---------- The "played on ... devices" counter ----------
   The first time the game opens on a device, it sends one +1 to Cloudflare
   and leaves a note in this browser, so this device is never counted again.
   Then it asks for the total and shows it at the bottom of the page.
   Nothing about the player is sent. If anything fails, the counter just
   stays hidden and the game carries on. */
function startCounter(){
  if (!CLOUDFLARE.workerUrl || !isOnTheWeb()) return;

  // If the browser will not keep the note, do not count at all,
  // or every single visit from that browser would add one.
  var countedBefore = true;
  try {
    var note = localStorage.getItem("scamsquad-counted");
    localStorage.setItem("scamsquad-counted", "yes");
    countedBefore = (note === "yes");
  } catch (e) {}

  var addOne = countedBefore
    ? Promise.resolve()
    : fetch(CLOUDFLARE.workerUrl + "/count", { method: "POST" }).catch(function(){});

  addOne
    .then(function(){ return fetch(CLOUDFLARE.workerUrl + "/stats"); })
    .then(function(response){ return response.json(); })
    .then(function(stats){
      if (!stats || !stats.devices) return;
      var counter = document.getElementById("device-counter");
      counter.innerHTML = "&#128737;&#65039; Played on <b>" + Number(stats.devices).toLocaleString() + "</b> devices and counting";
      counter.hidden = false;
    })
    .catch(function(){});
}

/* The three buddies, drawn with SVG (shapes written as code) so there are
   no picture files. Pip the owl is 6 to 9, Byte the robot is 10 to 13, and
   Nova the guide is 14 to 18. */
function buddyPicture(group, size){
  group = ageGroupOf(group);
  var s = size || 76;
  var start = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 100 100" role="img" aria-label="';
  if (group === "explore") {
    return start + 'Pip the owl">'
      + '<circle cx="50" cy="54" r="36" fill="#FFC96B"/>'
      + '<path d="M18 40c0-14 8-24 14-24s10 6 10 6" fill="#FFC96B"/>'
      + '<path d="M82 40c0-14-8-24-14-24s-10 6-10 6" fill="#FFC96B"/>'
      + '<ellipse cx="50" cy="66" rx="20" ry="17" fill="#FFF0D2"/>'
      + '<circle cx="38" cy="47" r="12" fill="#fff"/><circle cx="62" cy="47" r="12" fill="#fff"/>'
      + '<circle cx="39" cy="48" r="6" fill="#2A2140"/><circle cx="61" cy="48" r="6" fill="#2A2140"/>'
      + '<circle cx="41" cy="46" r="2.2" fill="#fff"/><circle cx="63" cy="46" r="2.2" fill="#fff"/>'
      + '<path d="M50 57.5 45 62h10l-5-4.5Z" fill="#E07C00"/>'
      + '<circle cx="24" cy="62" r="5.5" fill="#FF9E9E" opacity=".75"/>'
      + '<circle cx="76" cy="62" r="5.5" fill="#FF9E9E" opacity=".75"/>'
      + '</svg>';
  }
  if (group === "squad") {
    return start + 'Byte the robot">'
      + '<rect x="46.5" y="12" width="7" height="12" rx="3.5" fill="#0E7F94"/><circle cx="50" cy="11" r="6" fill="#5EE0F0"/>'
      + '<rect x="17" y="26" width="66" height="52" rx="18" fill="#2AA6BC"/>'
      + '<rect x="25" y="36" width="50" height="28" rx="13" fill="#08222B"/>'
      + '<circle cx="39" cy="50" r="6.5" fill="#5EE0F0"/><circle cx="61" cy="50" r="6.5" fill="#5EE0F0"/>'
      + '<circle cx="41" cy="48" r="2" fill="#fff"/><circle cx="63" cy="48" r="2" fill="#fff"/>'
      + '<path d="M42 68h16" stroke="#0B4E5C" stroke-width="4" stroke-linecap="round"/>'
      + '<rect x="8" y="42" width="8" height="20" rx="4" fill="#0E7F94"/>'
      + '<rect x="84" y="42" width="8" height="20" rx="4" fill="#0E7F94"/>'
      + '<rect x="34" y="80" width="32" height="8" rx="4" fill="#0E7F94"/>'
      + '</svg>';
  }
  return start + 'Nova the guide">'
    + '<path d="M50 8 84 22v28c0 20-14 34-34 42-20-8-34-22-34-42V22L50 8Z" fill="#7C5CE8"/>'
    + '<path d="M50 18 74 28v22c0 15-10 26-24 32-14-6-24-17-24-32V28l24-10Z" fill="#5A3FD0"/>'
    + '<circle cx="41" cy="46" r="5.5" fill="#D9CEFF"/><circle cx="59" cy="46" r="5.5" fill="#D9CEFF"/>'
    + '<circle cx="42.5" cy="44.5" r="1.8" fill="#2A1E52"/><circle cx="60.5" cy="44.5" r="1.8" fill="#2A1E52"/>'
    + '<path d="M42 60c4 4 12 4 16 0" stroke="#D9CEFF" stroke-width="3.4" stroke-linecap="round" fill="none"/>'
    + '<path d="m50 26 2.6 5.6L58 34l-5.4 2.4L50 42l-2.6-5.6L42 34l5.4-2.4L50 26Z" fill="#FFD98A"/>'
    + '</svg>';
}


/* ========================================================================
   17. STARTING THE GAME
   ======================================================================== */

// Home in the middle of a level loses that level's points, so ask first.
homeButton.addEventListener("click", function(){
  if (missionScreen.hidden) { showHome(); return; }
  var track = currentTrack();
  var box = document.createElement("div");
  box.className = "modal";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-labelledby", "leave-title");
  box.innerHTML = '<div class="modal-box"><h3 id="leave-title">Leave this level?</h3>'
    + '<p>Your ' + (track ? track.points.toLowerCase() : 'progress') + ' from this level will not be saved. You can play it again any time.</p>'
    + '<div class="modal-buttons"><button class="button" id="keep-playing">Keep playing</button><button class="button light" id="leave-now">Leave</button></div></div>';
  document.body.appendChild(box);

  function close(){
    document.removeEventListener("keydown", escapeCloses);
    box.remove();
    homeButton.focus();
  }
  function escapeCloses(e){ if (e.key === "Escape") close(); }
  document.addEventListener("keydown", escapeCloses);
  box.addEventListener("click", function(e){ if (e.target === box) close(); });   // tapping outside the box
  document.getElementById("keep-playing").addEventListener("click", close);
  document.getElementById("leave-now").addEventListener("click", function(){ close(); showHome(); });
  document.getElementById("keep-playing").focus();
});

footerHomeLink.addEventListener("click", showHome);

// The logo works like the Home button, so it also asks first in the middle of a level.
document.getElementById("logo-link").addEventListener("click", function(e){
  e.preventDefault();
  if (homeScreen.hidden) homeButton.click();
  else window.scrollTo({ top: 0, behavior: "smooth" });
});

grownUpsLink.addEventListener("click", function(){
  game.cameFrom = missionScreen.hidden ? "home" : "mission";
  showGrownUps();
});

// Keyboard: press A, B or C to pick an answer.
document.addEventListener("keydown", function(e){
  if (missionScreen.hidden || game.missionDone) return;
  var letter = e.key.toUpperCase();
  if (letter >= "A" && letter <= "C" && letter.length === 1) {
    var button = missionScreen.querySelector('.choice[data-i="' + (letter.charCodeAt(0) - 65) + '"]');
    if (button && !button.disabled) button.click();
  }
});

loadSettings();
listenToSettings();
showHome();
startCounter();
