/* ========================================================================
   screens/grownups.js
   "For parents and teachers": what the game covers, how it works, what it
   does not collect, questions to talk about, where to report, who made it,
   a contact form (adults only, see contact.js), and a link to the
   research behind the game. All the words are in data/grownups.js.
   Reached from the small link at the bottom of the home page.

   In this file:
     showGrownups   draws the page, top to bottom
     coversHtml     the "What it covers" table, counted from the lessons
     talkHtml       questions to talk about, one card for each age group
     linkCardHtml   one link card, for "Report something" and the research link
     contactHtml    the contact form, or a note when it cannot work here
   ======================================================================== */

import { AGES } from "../../data/ages.js";
import { GROWNUPS } from "../../data/grownups.js";
import { pathFor } from "../../data/lessons/index.js";
import { showScreen, $, goBack } from "../ui.js";
import { contactFormIsOn, contactFormHtml, setUpContactForm } from "../contact.js";

/* ---------- The page ---------- */

// Draw the page for parents and teachers, then make Back and the form work.
export function showGrownups() {
  const how = GROWNUPS.how.map(item =>
    '<div class="gu-card"><span class="gu-icon" aria-hidden="true">' + item.icon + "</span><div><h3>" + item.title + "</h3><p>" + item.text + "</p></div></div>"
  ).join("");
  const privacy = GROWNUPS.privacy.map(line => "<li>🔒 " + line + "</li>").join("");
  const tips = GROWNUPS.tips.map(tip => "<li>💡 " + tip + "</li>").join("");
  const report = GROWNUPS.report.map(link => linkCardHtml(link, "🔗")).join("");
  const more = GROWNUPS.more.map(link => linkCardHtml(link, link.icon)).join("");

  showScreen(
      '<button class="back" id="back" type="button">← Back</button>'
    + "<h1>For parents and teachers</h1>"
    + '<p class="gu-intro">' + GROWNUPS.intro + "</p>"
    + "<h2>How it works</h2>"
    + '<div class="gu-grid">' + how + "</div>"
    + "<h2>What it covers</h2>"
    + '<div class="tbl"><table><thead><tr><th>Age group</th><th>Lessons</th><th>Worlds</th></tr></thead><tbody>' + coversHtml() + "</tbody></table></div>"
    + "<h2>What it collects</h2>"
    + '<ul class="gu-list">' + privacy + "</ul>"
    + "<h2>Talk about it</h2>"
    + '<div class="gu-grid">' + talkHtml() + "</div>"
    + "<h2>Tips for families</h2>"
    + '<ul class="gu-list">' + tips + "</ul>"
    + "<h2>Report something</h2>"
    + '<div class="hotlines">' + report + "</div>"
    + "<h2>Who made this</h2>"
    + '<div class="gu-about"><p>' + GROWNUPS.about.text + "</p>"
    +   "<blockquote>&ldquo;" + GROWNUPS.about.quote + "&rdquo;</blockquote>"
    +   "<p><b>" + GROWNUPS.about.who + "</b></p></div>"
    + "<h2>Get in touch</h2>"
    + "<p>" + GROWNUPS.contact.intro + "</p>"
    + contactHtml()
    + "<h2>The research behind the game</h2>"
    + '<div class="hotlines">' + more + "</div>"
    + '<p class="gu-made">' + GROWNUPS.madeBy + "</p>"
  );
  $("#back").addEventListener("click", () => goBack("#/"));
  setUpContactForm();
}

/* ---------- Parts of the page ---------- */

/* One table row for each age group: how many lessons it has, and which
   worlds. Counted from the lesson files, so it is never out of date.
   Lessons marked "soon" are not counted. */
function coversHtml() {
  return AGES.map(age => {
    const units = pathFor(age.id);
    const lessonCount = units.reduce((total, unit) => total + unit.lessons.filter(lesson => !lesson.soon).length, 0);
    const worlds = units
      .filter(unit => unit.lessons.some(lesson => !lesson.soon))
      .map(unit => unit.category.icon + " " + unit.category.name)
      .join(", ");
    return "<tr><td><b>" + age.face + " " + age.name + "</b><br><small>ages " + age.range + "</small></td>"
      + "<td>" + lessonCount + "</td>"
      + "<td>" + (worlds || "Coming soon") + "</td></tr>";
  }).join("");
}

// Questions a parent or teacher can ask, one card for each age group.
function talkHtml() {
  return AGES.map(age => {
    const questions = GROWNUPS.talk[age.id].map(question => "<li>" + question + "</li>").join("");
    return '<div class="gu-card"><span class="gu-icon" aria-hidden="true">' + age.face + "</span>"
      + "<div><h3>Ages " + age.range + "</h3><ul>" + questions + "</ul></div></div>";
  }).join("");
}

// One link card that opens in a new tab: an icon, a name, and a line under it.
function linkCardHtml(link, icon) {
  return '<a class="hotline" href="' + link.href + '" target="_blank" rel="noopener"><span class="hotline-icon" aria-hidden="true">' + icon + "</span>"
    + "<span><b>" + link.name + "</b><br><small>" + link.how + "</small></span></a>";
}

/* The contact form shows only on a real web address (see contact.js).
   In a copy opened as a file, a note says so instead. */
function contactHtml() {
  if (contactFormIsOn()) {
    return '<div class="careful-box"><p>' + GROWNUPS.contact.kids + "</p><p>" + GROWNUPS.contact.urgent + "</p></div>"
      + contactFormHtml()
      + '<p class="disclaimer">' + GROWNUPS.contact.afterwards + "</p>";
  }
  return '<p class="note-box">The contact form only works on the website, not in a copy opened as a file.</p>'
    + '<div class="careful-box"><p>' + GROWNUPS.contact.urgent + "</p></div>";
}
