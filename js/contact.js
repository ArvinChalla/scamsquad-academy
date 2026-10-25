/* ========================================================================
   contact.js
   The contact form on the parents page. For adults only.

   What it sends: who they are, the message, an optional email, and the
   "I am not a robot" token from Cloudflare Turnstile. The Worker
   (cloudflare/contact-worker.js, shared with version 1) checks the token,
   saves the message and emails a copy. Nothing about any child is sent.

   The robot-check script loads only when the form is on the screen, never
   while a kid is playing. The form only works on a real web address: a file
   opened straight from a computer has no origin, so Cloudflare will not
   answer it.

   In this file:
     contactFormIsOn    can the form work here?
     contactFormHtml    the form itself
     setUpContactForm   loads the robot check and sends the message
   ======================================================================== */

import { CONFIG } from "./config.js";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=whenRobotCheckLoads&render=explicit";

/* ---------- The form ---------- */

// The form works only when config.js has its settings and the page is on the web.
export function contactFormIsOn() {
  const onTheWeb = location.protocol === "http:" || location.protocol === "https:";
  return !!(CONFIG.contactUrl && CONFIG.turnstileSiteKey) && onTheWeb;
}

// The form, as HTML. setUpContactForm makes it work once it is on the page.
export function contactFormHtml() {
  return '<form id="contact-form" class="contact-form" novalidate>'
    + '<label>I am a <select name="who">'
    +   '<option value="parent">Parent or caregiver</option><option value="teacher">Teacher</option><option value="other adult">Other adult</option>'
    + "</select></label>"
    + '<label>Your message <textarea name="message" rows="6" maxlength="2000"></textarea></label>'
    + '<label>Your email, only if you would like a reply <input type="email" name="email" maxlength="200" autocomplete="email" placeholder="Optional"></label>'
    + '<label class="checkbox-row"><input type="checkbox" name="adult"> I am 18 or over</label>'
    // A box people never see. Spam robots fill it in, and get ignored.
    + '<div class="robot-trap" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>'
    + '<div id="robot-check"></div>'
    + '<div class="button-row"><button class="button" type="submit" id="send-button">Send message</button></div>'
    + '<p class="form-status" id="form-status" role="status" aria-live="polite"></p>'
    + "</form>";
}

/* ---------- Sending ---------- */

// The robot check's answer (a one-time token) and the widget that shows it.
const robotCheck = { token: "", widget: null };

/* Make the form on the screen work: draw the robot check, check the
   message, send it and say what happened. Safe to call more than once. */
export function setUpContactForm() {
  const form = document.getElementById("contact-form");
  if (!form || form.dataset.ready) return;   // no form, or already set up
  form.dataset.ready = "yes";
  const status = document.getElementById("form-status");
  const sendButton = document.getElementById("send-button");

  // Show a line under the form: red for a problem, green otherwise.
  function say(text, isProblem) {
    status.textContent = text;
    status.className = "form-status" + (isProblem ? " problem" : " sent");
  }

  // Load Cloudflare's robot check the first time, then draw it in the form.
  function drawRobotCheck() {
    if (!document.getElementById("robot-check")) return;   // the page changed
    robotCheck.token = "";
    robotCheck.widget = window.turnstile.render("#robot-check", {
      sitekey: CONFIG.turnstileSiteKey,
      callback: token => { robotCheck.token = token; },
      "expired-callback": () => { robotCheck.token = ""; }
    });
  }
  if (window.turnstile) {
    drawRobotCheck();
  } else {
    // Cloudflare's script calls whenRobotCheckLoads when it is ready (see TURNSTILE_SCRIPT).
    window.whenRobotCheckLoads = drawRobotCheck;
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const message = {
      who: form.who.value,
      message: form.message.value.trim(),
      email: form.email.value.trim(),
      adult: form.adult.checked,
      website: form.website.value,
      turnstileToken: robotCheck.token
    };

    // Check the easy things here, so nobody waits to hear about them.
    if (message.message.length < 5) {
      say("Please write a message first.", true);
      form.message.focus();
      return;
    }
    if (!message.adult) {
      say("Please tick the box to say you are 18 or over.", true);
      return;
    }
    if (!message.turnstileToken) {
      say("Please finish the robot check first.", true);
      return;
    }

    sendButton.disabled = true;
    say("Sending...", false);
    fetch(CONFIG.contactUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    })
      .then(response => response.json())
      .then(result => {
        if (result.ok) {
          form.reset();
          say("Thank you. Your message has been sent.", false);
        } else {
          say(result.error || "Something went wrong. Please try again.", true);
        }
      })
      .catch(() => {
        say("Could not send. Please check your internet connection and try again.", true);
      })
      // This last step runs whether sending worked or not.
      .then(() => {
        // Each robot check can only be used once, so get a fresh one.
        robotCheck.token = "";
        if (window.turnstile && robotCheck.widget !== null) window.turnstile.reset(robotCheck.widget);
        sendButton.disabled = false;
      });
  });
}
