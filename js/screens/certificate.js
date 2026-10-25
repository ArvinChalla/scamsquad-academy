/* ========================================================================
   screens/certificate.js
   The certificate, made the same way as in version 1:
     1. "Get your certificate!": type a first name, tap Make it.
     2. "Making Sam's certificate": a bar fills while the buddy lists what
        Sam learned, taken from the lessons Sam finished.
     3. The certificate: buddy, name, worlds finished, a gold medal with the
        stars, and the date. Save it as a picture, or print it (one page).

   The name stays on this device. Everything is drawn in the browser.

   In this file, in order:
     Words             the titles and lines for each age group
     The name box      certificateBoxHtml, wireCertificateBox (me.js uses these)
     Making it         the short "making your certificate" show
     The certificate   drawing it, and its buttons
     Print and save
   ======================================================================== */

import { findAge } from "../../data/ages.js";
import { pathFor } from "../../data/lessons/index.js";
import { lessonResult, playerName, setPlayerName } from "../store.js";
import { safeText, $ } from "../ui.js";
import { progressFor } from "./me.js";
import { buddyPicture, drawCertificatePicture } from "../certificate-art.js";
import { confetti } from "../confetti.js";

/* ---------- Words ---------- */

const TITLES = {
  explore: "Certificate of Safe Exploring",
  squad: "Certificate of Scam Spotting",
  crew: "Certificate of Online Street Smarts"
};
const SHOW_A_GROWN_UP = {
  explore: { icon: "🎉", title: "Show this to your grown-up!", text: "Tell them one trick you learned today. Maybe you will get a high five, a big hug, or a little treat!" },
  squad: { icon: "🎉", title: "Show this to a parent, or another adult you trust!", text: "Tell them one trick you learned. That has to be worth a high five, or maybe a treat." },
  crew: { icon: "🙌", title: "Show this to a parent, or another adult you trust.", text: "Tell them the one scam that surprised you most. You might be the one who teaches them something today." }
};
const BUDDY_JOB = { explore: "Your trick-spotting buddy", squad: "Your scam scanner", crew: "Your online guide" };

// True when the device is set to "reduce motion". Then the making show runs almost at once.
function calm() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- The name box ---------- */

// The box on the Me screen where you type your name.
export function certificateBoxHtml(age) {
  const kid = age.id === "explore";
  return '<div class="certificate-box">'
    + '<div class="certificate-box-top"><span class="certificate-trophy" aria-hidden="true">🏆</span><div>'
    +   "<h4>Get your certificate!</h4>"
    +   '<p class="certificate-box-text">Type your first name and we will make one you can print or save.</p>'
    + "</div></div>"
    + '<div class="name-row">'
    +   '<input id="first-name" type="text" maxlength="18" autocomplete="off" spellcheck="false" placeholder="Your first name" aria-label="Your first name" value="' + safeText(playerName()) + '">'
    +   '<button class="button" id="make-certificate" type="button">' + (age.id === "crew" ? "Create certificate" : "Make it ✨") + "</button>"
    + "</div>"
    + '<p class="name-error" id="name-needed" aria-live="polite"></p>'
    + '<div class="privacy-line"><span aria-hidden="true">🔒</span>'
    +   (kid ? "<span><b>Just your first name.</b> It stays here, and nobody else sees it.</span>"
             : "<span><b>First name only, and it stays on this device.</b> Your certificate is drawn right here in your browser. Your name is never sent anywhere.</span>")
    + "</div>"
    + '<div id="certificate-spot"></div>'
    + '<div class="note-box" id="print-note" hidden>If nothing happened, printing is blocked here. Use <b>Save as a picture</b> instead.</div>'
    + "</div>";
}

// Wire up the box: Make it, the "making" show, then the certificate.
export function wireCertificateBox(ageId) {
  const age = findAge(ageId);
  const input = $("#first-name");
  const button = $("#make-certificate");
  input.addEventListener("keydown", e => { if (e.key === "Enter") button.click(); });
  button.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) {
      input.focus();
      $("#name-needed").textContent = age.id === "explore" ? "🦉 Type your first name first! Your grown-up can help." : "Type your first name first.";
      return;
    }
    $("#name-needed").textContent = "";
    setPlayerName(name);
    // The heading on Me shows the name too, so change it straight away.
    const title = document.getElementById("me-title");
    if (title) title.textContent = (age.id === "crew" ? "" : age.face + " ") + name;
    playMaking(age, name, () => showCertificate(age, name));
  });
}

/* ---------- Making it ---------- */

/* The short show before the certificate appears: one line at a time, with
   a bar that fills up. whenDone runs at the end. If the player leaves the
   screen half way, the show stops. */
function playMaking(age, name, whenDone) {
  const who = safeText(name);
  const lines = ["🔍 " + age.buddy + " is checking " + who + "’s lessons…"]
    .concat(learnedLines(age).map(rule => "✅ " + who + " learned: <b>" + rule + "</b>"))
    .concat(["🏅 Adding the gold seal…", "✨ " + age.buddy + " is signing it…"]);
  const spot = $("#certificate-spot");
  const button = $("#make-certificate");
  const input = $("#first-name");
  spot.innerHTML = '<div class="certificate-making" role="status" aria-live="polite">'
    + '<div class="making-title">Making ' + who + "’s certificate</div>"
    + '<div class="making-bar"><i id="making-fill"></i></div>'
    + '<ul class="making-steps" id="making-steps"></ul></div>';
  button.disabled = true;
  input.disabled = true;
  spot.scrollIntoView({ block: "nearest", behavior: "smooth" });

  const pause = calm() ? 60 : 650;   // milliseconds between lines
  let shown = 0;

  // Adds one line, then waits and calls itself again, until every line is shown.
  function addNextLine() {
    const list = document.getElementById("making-steps");
    const fill = document.getElementById("making-fill");
    if (!list) return;   // the player left the screen
    if (shown < lines.length) {
      const li = document.createElement("li");
      li.innerHTML = lines[shown];
      list.appendChild(li);
      fill.style.width = Math.round((shown + 1) / (lines.length + 1) * 100) + "%";
      shown++;
      setTimeout(addNextLine, pause);
      return;
    }
    fill.style.width = "100%";
    setTimeout(() => {
      if (!document.getElementById("certificate-spot")) return;   // the player left the screen
      button.disabled = false;
      input.disabled = false;
      whenDone();
    }, calm() ? 60 : 500);
  }
  addNextLine();
}

// What a player learned: the rule of each lesson they finished, without its full stop.
function learnedLines(age) {
  const lines = [];
  pathFor(age.id).forEach(unit => unit.lessons.forEach(lesson => {
    if (!lesson.soon && lessonResult(lesson.id)) lines.push(lesson.rule.replace(/[.]+\s*$/, ""));
  }));
  // Up to four, spread across what they did: the first, the last, and two from the middle.
  if (lines.length <= 4) return lines;
  const n = lines.length;
  return [0, Math.floor(n / 3), Math.floor(2 * n / 3), n - 1].map(i => lines[i]);
}

/* ---------- The certificate ---------- */

/* Draw the certificate under the name box, with Save, Print and Change
   the name. rawName is the name as typed. It is made safe before it goes
   into the page (see safeText in ui.js). */
function showCertificate(age, rawName) {
  const name = safeText(rawName);
  const kid = age.id === "explore";
  const p = progressFor(age.id);
  // Icon and name stay together on one line ("\u00A0" is a space that never breaks).
  const earned = p.worlds.filter(w => w.badge).map(w => w.category.icon + "\u00A0" + w.category.name);
  const starWord = p.stars === 1 ? "star" : "stars";
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const title = TITLES[age.id];
  const opening = kid ? "This award goes to" : "This certifies that";
  const finished = (kid ? "finished " : "completed ") + p.lessonsDone + (p.lessonsDone === 1 ? " lesson" : " lessons")
    + " in the ScamSquad <b>" + age.name + "</b> track" + (kid ? " and learned to spot these tricks." : " and practiced spotting these tricks.");
  const show = SHOW_A_GROWN_UP[age.id];
  const awards = earned.length
    ? '<p class="certificate-awards"><b>Badges earned:</b> ' + earned.map(b => '<span class="award">' + b + "</span>").join(" ") + "</p>"
    : "";

  $("#certificate-spot").innerHTML =
      '<div id="certificate">'
    + '<div class="certificate-buddy">' + buddyPicture(age.id, 74) + "</div>"
    + '<div class="certificate-inner">'
    +   '<div class="certificate-label">ScamSquad Academy</div>'
    +   "<h3>" + title + '</h3><p class="certificate-text" style="margin-top:-4px"><b>Ages ' + age.range + "</b></p>"
    +   '<p class="certificate-text">' + opening + "</p>"
    +   '<div class="certificate-name">' + name + "</div>"
    +   '<div class="certificate-line"></div>'
    +   '<p class="certificate-text">' + finished + "</p>"
    +   awards
    +   '<div class="certificate-bottom">'
    +     "<div><b>" + age.buddy + "</b>" + BUDDY_JOB[age.id] + "</div>"
    +     '<div class="medal" role="img" aria-label="' + p.stars + " " + starWord + '"><div class="medal-middle"><span>★</span><b>' + p.stars + "</b><i>" + starWord + "</i></div></div>"
    +     '<div class="certificate-date"><b>' + date + "</b>Date completed</div>"
    +   "</div>"
    + "</div></div>"
    + '<div class="show-a-grown-up"><span class="show-icon" aria-hidden="true">' + show.icon + "</span><div><b>" + show.title + "</b><span>" + show.text + "</span></div></div>"
    + '<div class="save-buttons">'
    +   '<button class="button" id="save-picture" type="button">Save as a picture</button>'
    +   '<button class="button quiet" id="print-certificate" type="button">Print it</button>'
    + "</div>"
    + '<button class="text-button" id="change-name" type="button">Change the name</button>'
    + '<div id="picture-spot"></div>';

  // The picture is drawn from the same words, as plain text (no HTML tags).
  $("#save-picture").addEventListener("click", () => {
    const picture = drawCertificatePicture({
      title: title + " · Ages " + age.range,
      opening: opening,
      name: rawName,
      line: finished.replace(/<[^>]+>/g, ""),
      badges: earned.join("  ·  "),
      buddy: age.buddy,
      buddyJob: BUDDY_JOB[age.id],
      best: p.stars,
      points: starWord,
      date: date
    });
    savePicture(picture, rawName, name);
  });
  $("#print-certificate").addEventListener("click", printCertificate);
  $("#change-name").addEventListener("click", () => {
    $(".certificate-box").classList.remove("ready");
    $("#certificate-spot").innerHTML = "";
    $("#first-name").focus();
  });
  // The name box steps aside once the certificate is made.
  $(".certificate-box").classList.add("ready");
  document.getElementById("certificate").scrollIntoView({ block: "nearest", behavior: "smooth" });
  confetti();
}

/* ---------- Print and save ---------- */

/* Print a copy that sits on its own at the top of the page, with the
   rest of the page hidden, so it fits on one sheet. The copy is removed
   when printing ends. If printing never starts (some phones and school
   devices block it), a note suggests saving a picture instead. */
function printCertificate() {
  if (document.getElementById("print-root")) return;   // already printing
  const copy = document.createElement("div");
  copy.id = "print-root";
  const cert = document.getElementById("certificate").cloneNode(true);
  copy.appendChild(cert);
  document.body.appendChild(copy);
  document.body.classList.add("printing");
  let printed = false;
  // Put the page back the way it was. The browser calls this when printing ends.
  const cleanUp = () => {
    printed = true;
    copy.remove();
    document.body.classList.remove("printing");
    window.removeEventListener("afterprint", cleanUp);
  };
  window.addEventListener("afterprint", cleanUp);
  try { window.print(); } catch (error) { /* printing blocked */ }
  setTimeout(() => {
    if (printed) return;
    const note = document.getElementById("print-note");
    if (note) note.hidden = false;
  }, 1500);
  setTimeout(() => { if (!printed) cleanUp(); }, 60000);   // never leave the copy behind
}

/* Downloads the picture as a PNG file. Phones often open pictures instead
   of saving them, so on a phone the picture also shows, to long-press.
   picture is the picture as a data address (from certificate-art.js), or
   nothing if it could not be drawn. */
function savePicture(picture, rawName, safeName) {
  const spot = $("#picture-spot");
  if (!picture) {
    spot.innerHTML = '<div class="note-box">Couldn’t make a picture on this device. A screenshot of the certificate works just as well.</div>';
    return;
  }
  // Only letters and numbers go in the file name, like ScamSquad-certificate-Sam.png.
  const fileName = "ScamSquad-certificate-" + (rawName.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "me") + ".png";
  try {
    const link = document.createElement("a");
    link.href = picture;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) { /* the picture below still works */ }
  const img = '<img id="certificate-picture" src="' + picture + '" alt="Certificate for ' + safeName + '">';
  const touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  spot.innerHTML = '<div class="note-box"><b>✅ Saved as ' + safeText(fileName) + ".</b> "
    + (touch ? "Nothing downloaded? Long-press the picture below and choose Save image.</div>" + img
             : "Look in your Downloads folder.</div>");
  spot.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
