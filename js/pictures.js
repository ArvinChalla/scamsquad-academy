/* ========================================================================
   pictures.js
   Turns a "picture" from a lesson into HTML. See data/lessons/FORMAT.md.

   Fake screens are built from "parts". The kinds:
     site, chat, text, email, popup     web pages, chats, texts, emails, trick boxes
     system                             a real Windows warning
     call                               a phone call or voicemail, with a transcript
     post                               a social post or a video
     payment                            a payment app
     notification                       phone notifications on the lock screen
     forum                              a forum or comment thread
     game                               the game's OWN screen (shop, prize). Its Close is real.

   They can be drawn four ways (the "mode"):
     "learn"  red flags are circled and numbered, and the reasons are listed
              underneath, to teach what to look for
     "plain"  no hints, for questions like "Real or fake?"
     "tap"    every part is a button, for "tap" questions
     "spot"   like tap, but a Close or ✕ is only part of the window, not a
              button, for "spot the red flags" questions

   Fake screens look like the real apps, even in dark mode. Real game
   names are plain text, never logos. Each one sits on the device it is
   really seen on: a phone, or an iPad (see deviceHtml).

   The other two kinds are for learn cards only:
     steps      numbered steps, like "what happens if you fall for it"
     checklist  a list with icons, red for warning signs, green for what to do

   In this file:
     pictureHtml        the one function other files use
     Parts              partHtml, contentHtml, senderHtml, breakable, reasonsHtml
     The fake screens   SCREENS: one draw function for each kind
     The device         deviceHtml: the phone or iPad around a fake screen
     Screen helpers     initial, chatTheme, plainLabel, sortByRole
     Learn card lists   stepsHtml, checklistHtml
   ======================================================================== */

import { safeText } from "./ui.js";

// A plain grey person, for an avatar when there is no name to take a letter from.
const PERSON = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><circle cx="12" cy="8.5" r="4.5"/><path d="M3.5 21c.8-4.4 4.3-7 8.5-7s7.7 2.6 8.5 7z"/></svg>';

/* ---------- Drawing a picture ---------- */

/* The HTML for one picture, drawn in one of the four modes above.
   Returns "" for a missing picture or a kind this file does not know. */
export function pictureHtml(picture, mode) {
  if (!picture) return "";
  if (picture.kind === "steps") return stepsHtml(picture);
  if (picture.kind === "checklist") return checklistHtml(picture);
  const screen = SCREENS[picture.kind];
  if (!screen) return "";
  mode = mode || "plain";

  // Red flags are numbered 1, 2, 3 in the order they are drawn on the screen.
  const parts = picture.parts;
  const order = screen.order ? screen.order(parts) : parts.map((part, i) => i);
  const numbers = {};
  let flagCount = 0;
  order.forEach(i => {
    if (parts[i].flag) {
      flagCount++;
      numbers[i] = flagCount;
    }
  });

  /* drawParts is handed to each screen's draw function. It draws this
     picture's parts in the right mode, with the right red flag numbers,
     so the screens only have to say where each part goes. */
  const drawParts = {
    // One part, by its place in the list. "tag" is the HTML tag to use.
    part: (i, tag) => partHtml(parts[i], i, mode, numbers, tag || "div"),

    // The first part with this role, like "address", or "" if there is none.
    one: (role, tag) => {
      const i = parts.findIndex(part => part.role === role);
      return i === -1 ? "" : drawParts.part(i, tag);
    },

    /* Every part, in the order they are listed. "tags" says which HTML tag
       each role uses (anything else is a div). Roles in "skip" are left
       out, because the screen draws them somewhere else. */
    all: (tags, skip) => parts.map((part, i) => {
      if (skip && skip.includes(part.role)) return "";
      return drawParts.part(i, tags[part.role] || "div");
    }).join("")
  };

  let html = deviceHtml(picture, screen.draw(picture, drawParts));
  if (mode === "learn" && flagCount) html += reasonsHtml(parts, order, numbers);
  return html;
}

/* ---------- Parts ---------- */

/* One part of a fake screen. In "tap" mode it is a button that knows its
   number (data-i). In "learn" mode a red flag gets a numbered badge.
   The player's own messages that are worth noticing get an amber ring,
   not a red one, because the player did nothing wrong. */
function partHtml(part, i, mode, numbers, tag) {
  const mine = part.role === "me";
  const cls = "part role-" + part.role;
  const inside = contentHtml(part);
  if (mode === "tap" || (mode === "spot" && part.role !== "close")) {
    return '<button type="button" class="' + cls + '" data-i="' + i + '">' + inside + "</button>";
  }
  if (mode === "learn" && part.flag) {
    const badgeLabel = (mine ? "Worth noticing " : "Red flag ") + numbers[i];
    return "<" + tag + ' class="' + cls + " flagged" + (mine ? " mine" : "") + '">'
      + '<span class="flag-badge' + (mine ? " mine" : "") + '" aria-label="' + badgeLabel + '">' + numbers[i] + "</span>"
      + inside + "</" + tag + ">";
  }
  return "<" + tag + ' class="' + cls + '">' + inside + "</" + tag + ">";
}

// What goes inside a part: its words, plus a name and time for chat bubbles.
function contentHtml(part) {
  let text = part.text;
  if (part.role === "address") text = breakable(text);
  if (part.role === "from") text = senderHtml(text);
  if (part.role === "them" || part.role === "me") {
    return (part.name ? '<span class="msg-name">' + part.name + "</span>" : "")
      + text
      + (part.time ? '<span class="msg-stamp">' + part.time + "</span>" : "");
  }
  return text;
}

/* An email sender like "Awards Office <awards@brightpath-grants.org>".
   The < > would be read as HTML, so the name and the address are drawn
   separately, the address under the name, like a mail app shows it. */
function senderHtml(text) {
  const plain = String(text).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const match = plain.match(/^(.*?)\s*<([^<>]+)>\s*$/);
  if (!match) return safeText(plain);
  const name = match[1];
  const address = match[2];
  return (name ? "<b>" + safeText(name) + "</b> " : "")
    + '<span class="email-address">&lt;' + safeText(address) + "&gt;</span>";
}

/* A web address may wrap onto two lines on a small phone, but only after
   a dot or a slash, so the site's name is never cut in the middle. */
function breakable(address) {
  return String(address).replace(/([./])/g, "$1<wbr>");
}

/* On learn cards: the reason for each numbered circle, in a list under
   the picture, so a child is never left with a red circle and no why. */
function reasonsHtml(parts, order, numbers) {
  const items = order.filter(i => parts[i].flag).map(i => {
    const mine = parts[i].role === "me";
    return '<li class="' + (mine ? "mine" : "") + '">'
      + '<span class="flag-badge' + (mine ? " mine" : "") + '" aria-hidden="true">' + numbers[i] + "</span>"
      + "<span>" + (parts[i].why || "") + "</span></li>";
  }).join("");
  return '<ol class="flag-reasons" aria-label="Why each one is a red flag">' + items + "</ol>";
}

/* ---------- The fake screens ----------
   One entry for each kind. "draw" builds the screen around its parts.
   "order", when there is one, gives the order the parts appear on the
   screen, so the red flag numbers read top to bottom. */

const SCREENS = {
  // A web page inside a browser window: tab dots, padlock, address, page.
  site: {
    draw: (picture, drawParts) => '<div class="picture screen site" role="group" aria-label="A web page">'
      + '<div class="browser-top"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>'
      +   '<div class="address-bar"><span class="lock" aria-hidden="true">🔒</span>' + drawParts.one("address", "span") + "</div></div>"
      + '<div class="screen-page">' + drawParts.all({ big: "div", line: "p", field: "div", button: "div" }, ["address"]) + "</div>"
      + "</div>",
    order: parts => sortByRole(parts, ["address"])
  },

  // A game chat or a DM, on a phone.
  chat: {
    draw: (picture, drawParts) => '<div class="picture screen phone chat' + chatTheme(picture.app) + '" role="group" aria-label="A chat with ' + plainLabel(picture.sender) + '">'
      + '<div class="phone-head">' + initial(picture.sender) + '<div class="who"><b>' + picture.sender + "</b>"
      +   (picture.note ? "<small>" + picture.note + "</small>" : "") + "</div>"
      +   (picture.app ? '<span class="chat-app">' + picture.app + "</span>" : "") + "</div>"
      + '<div class="screen-page bubbles">' + drawParts.all({}) + "</div>"
      + MESSAGE_BOX
      + "</div>"
  },

  // A text message, like a phone's Messages app.
  text: {
    draw: (picture, drawParts) => '<div class="picture screen phone text" role="group" aria-label="A text message from ' + plainLabel(picture.sender) + '">'
      + '<div class="phone-head center">' + initial(picture.sender) + '<div class="who"><b>' + picture.sender + "</b>"
      +   (picture.note ? "<small>" + picture.note + "</small>" : "") + "</div></div>"
      + '<div class="screen-page bubbles"><p class="msg-time">Text Message · ' + (picture.time || "Today 9:41 AM") + "</p>" + drawParts.all({}) + "</div>"
      + MESSAGE_BOX
      + "</div>"
  },

  // An email, like a mail app: subject, sender and address, then the message.
  email: {
    draw: (picture, drawParts) => {
      const from = picture.parts.find(part => part.role === "from");
      return '<div class="picture screen email" role="group" aria-label="An email">'
        + '<div class="screen-page">'
        +   '<div class="email-subject">' + drawParts.one("subject", "span") + "</div>"
        +   '<div class="email-from">' + initial(from ? from.text : "?") + '<div class="who">' + drawParts.one("from", "span") + "<small>to me</small></div></div>"
        +   '<div class="email-body">' + drawParts.all({ line: "p", button: "div" }, ["from", "subject"]) + "</div>"
        + "</div></div>";
    },
    order: parts => sortByRole(parts, ["subject", "from"])
  },

  /* A real Windows warning (SmartScreen): a dark blue panel with the
     title, the message, a "More info" link and a "Don't run" button. */
  system: {
    draw: (picture, drawParts) => '<div class="picture screen system" role="group" aria-label="A ' + plainLabel(picture.app || "Windows") + ' warning">'
      + '<div class="system-panel">'
      +   drawParts.all({ title: "div", line: "p", link: "div", button: "div" }, ["button"])
      +   '<div class="system-buttons">' + drawParts.one("button", "span") + "</div>"
      + "</div></div>",
    order: parts => sortByRole(parts, [], ["button"])
  },

  // A box a trickster made, floating over a game, with a small ✕ in the corner.
  popup: {
    draw: (picture, drawParts) => '<div class="picture screen popup-scene" role="group" aria-label="A box that pops up over a game">'
      + GAME_BEHIND
      + '<div class="popup-box">'
      +   '<div class="popup-close-row">' + drawParts.one("close", "span") + "</div>"
      +   drawParts.all({ title: "div", line: "p", button: "div" }, ["close"])
      + "</div></div>",
    order: parts => sortByRole(parts, ["close"])
  },

  /* The game's OWN screen, like its shop or a prize for a level. It looks
     like part of the game (a bar with the game's name and a Close button),
     not like a box floating over it, so children can tell the two apart. */
  game: {
    draw: (picture, drawParts) => '<div class="picture screen game-screen" role="group" aria-label="A screen from the game ' + plainLabel(picture.game) + '">'
      + '<div class="game-bar"><span class="game-name"><span aria-hidden="true">🎮</span> ' + picture.game + "</span>" + drawParts.one("close", "span") + "</div>"
      + '<div class="game-body">' + drawParts.all({ title: "div", line: "p", price: "div", button: "div" }, ["close"]) + "</div>"
      + "</div>",
    order: parts => sortByRole(parts, ["close"])
  },

  // A phone call or a voicemail: who is calling, then what they say.
  call: {
    draw: (picture, drawParts) => {
      const incoming = /incoming/i.test(picture.label || "");
      const voicemail = /voicemail/i.test(picture.label || "");
      return '<div class="picture screen phone call" role="group" aria-label="' + plainLabel(picture.label) + " from " + plainLabel(picture.caller) + '">'
        + '<div class="call-top">' + initial(picture.caller)
        +   '<b class="call-name">' + picture.caller + "</b>"
        +   (picture.number ? '<span class="call-number">' + picture.number + "</span>" : "")
        +   '<span class="call-label">' + picture.label + "</span></div>"
        + '<div class="call-transcript"><p class="call-transcript-title">' + (voicemail ? "Voicemail transcript" : "What they say") + "</p>"
        +   drawParts.all({ line: "p", me: "p" }) + "</div>"
        + (incoming ? '<div class="call-buttons" aria-hidden="true"><span class="call-decline">✕</span><span class="call-accept">✓</span></div>' : "")
        + "</div>";
    }
  },

  // A social post or a video: who posted it, the picture or video, the words under it.
  post: {
    draw: (picture, drawParts) => '<div class="picture screen post' + (picture.video ? " video" : "") + '" role="group" aria-label="A ' + (picture.video ? "video" : "post") + " by " + plainLabel(picture.author) + " on " + plainLabel(picture.app) + '">'
      + '<div class="post-head">' + initial(picture.author) + '<div class="who"><b>' + picture.author + "</b>"
      +   (picture.handle ? "<small>" + picture.handle + "</small>" : "") + "</div>"
      +   '<span class="chat-app">' + picture.app + "</span></div>"
      + '<div class="post-body">' + drawParts.all({ media: "div", caption: "p", link: "div", comment: "p", button: "div" }) + "</div>"
      + "</div>"
  },

  // A payment app: the amount, who it is from, the note, the buttons.
  payment: {
    draw: (picture, drawParts) => '<div class="picture screen phone payment" role="group" aria-label="A payment app">'
      + '<div class="pay-head"><b>' + picture.app + "</b><small>Activity</small></div>"
      + '<div class="pay-body">' + drawParts.all({ amount: "div", from: "div", note: "p", line: "p", button: "div" }) + "</div>"
      + "</div>"
  },

  // Notifications on a phone's lock screen. Each "app" part starts a new banner.
  notification: {
    draw: (picture, drawParts) => {
      // banners is a list of banners, each one a list of part numbers.
      const banners = [];
      picture.parts.forEach((part, i) => {
        if (part.role === "app" || !banners.length) banners.push([]);
        banners[banners.length - 1].push(i);
      });
      const bannersHtml = banners.map(list => {
        const inside = list.map(i => drawParts.part(i, picture.parts[i].role === "line" ? "p" : "div")).join("");
        return '<div class="banner">' + inside + "</div>";
      }).join("");
      return '<div class="picture screen phone lock-screen" role="group" aria-label="Notifications on a phone">'
        + '<div class="lock-time">' + (picture.time || "9:41") + "</div>"
        + bannersHtml
        + "</div>";
    }
  },

  // A forum or comment thread: one post per part, each with a name.
  forum: {
    draw: (picture, drawParts) => {
      const posts = picture.parts.map((part, i) => '<div class="forum-post">' + initial(part.name)
        + '<div class="forum-text"><div class="forum-meta"><b>' + (part.name || "") + "</b>" + (part.time ? "<small>" + part.time + "</small>" : "") + "</div>"
        + drawParts.part(i, "div") + "</div></div>").join("");
      return '<div class="picture screen forum" role="group" aria-label="A forum on ' + plainLabel(picture.site) + '">'
        + '<div class="forum-head"><b>' + picture.site + "</b>" + (picture.thread ? "<span>" + picture.thread + "</span>" : "") + "</div>"
        + posts
        + "</div>";
    }
  }
};

/* ---------- The device ---------- */

/* Which device each kind of screen is seen on. Chats, texts, calls,
   payments, notifications and posts are on a phone. Websites, emails,
   forums and games are on an iPad. The Windows warning is a computer
   window, so it has no device around it. */
const DEVICES = {
  chat: "phone", text: "phone", call: "phone", payment: "phone", notification: "phone", post: "phone",
  site: "tablet", email: "tablet", forum: "tablet", game: "tablet", popup: "tablet"
};

// The signal, wifi and battery at the top right of the device.
const STATUS_ICONS = '<span class="status-icons">'
  + '<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>'
  + '<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.3 10.3 0 0 0 8 .3 10.3 10.3 0 0 0 .7 3.2L2 4.6a8.4 8.4 0 0 1 6-2.4Zm0 3.7c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4 6.8 6.8 0 0 0 3.3 5.8l1.3 1.4C5.5 6.4 6.7 5.9 8 5.9Zm0 3.6c.6 0 1.1.2 1.5.6L8 11.7l-1.5-1.6c.4-.4.9-.6 1.5-.6Z"/></svg>'
  + '<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>'
  + "</span>";

// The box at the bottom of a chat, where you would type.
const MESSAGE_BOX = '<div class="message-box" aria-hidden="true">Message…</div>';

// A simple game behind a pop-up: sky, grass, blocks, a player, hearts and coins.
const GAME_BEHIND = '<div class="game-behind" aria-hidden="true"><div class="sky"></div><div class="ground"></div>'
  + '<div class="block" style="left:10%"></div><div class="block" style="left:10%;bottom:calc(36% + 40px)"></div><div class="block" style="left:22%"></div>'
  + '<div class="block" style="right:12%"></div><div class="hud"><span>❤️❤️❤️</span><span>🪙 120</span></div></div>';

// Screens whose top is dark, so the time and battery are drawn in white.
function darkTop(picture) {
  if (["call", "notification", "popup", "forum"].includes(picture.kind)) return true;
  return picture.kind === "chat" && chatTheme(picture.app) !== " theme-social";
}

/* The phone or iPad around a fake screen: the time, the signal and
   battery, the screen, and the bar at the bottom. The phone has the
   camera notch; the iPad has an even edge all round. */
function deviceHtml(picture, screen) {
  const type = DEVICES[picture.kind];
  if (!type) return screen;
  return '<div class="device ' + type + " device-" + picture.kind + (darkTop(picture) ? " dark-top" : "") + '">'
    + '<div class="device-screen">'
    +   '<div class="status-bar" aria-hidden="true"><span class="status-time">9:41</span>'
    +     (type === "phone" ? '<span class="notch"></span>' : "") + STATUS_ICONS + "</div>"
    +   screen
    +   '<div class="home-bar" aria-hidden="true"></div>'
    + "</div></div>";
}

/* ---------- Screen helpers ---------- */

/* The first letter of a name, for a round avatar like real apps show.
   A phone number gets a plain grey person, like an unknown number does. */
function initial(name) {
  const plain = String(name || "").replace(/<[^>]+>/g, "").replace(/&lt;.*$/, "");
  if (!plain || /^[+(\d]/.test(plain)) return '<span class="avatar" aria-hidden="true">' + PERSON + "</span>";
  const letter = plain.replace(/[^A-Za-z0-9]/g, "").charAt(0) || "?";
  return '<span class="avatar" aria-hidden="true">' + letter.toUpperCase() + "</span>";
}

/* Chats that say Discord get Discord's dark colors. Instagram, DMs, TikTok
   and Snapchat get a social app look. Others look like a game chat. */
function chatTheme(app) {
  if (/discord/i.test(app || "")) return " theme-dark";
  if (/insta|dm|tiktok|snap/i.test(app || "")) return " theme-social";
  return " theme-game";
}

// A short plain label for screen readers, without any HTML tags.
function plainLabel(text) {
  return safeText(String(text || "").replace(/<[^>]+>/g, ""));
}

/* The order parts are drawn in: the roles in "first" come first, the
   roles in "last" come last, everything else in between in its own order. */
function sortByRole(parts, first, last) {
  const all = parts.map((part, i) => i);
  const head = (first || []).flatMap(role => all.filter(i => parts[i].role === role));
  const tail = (last || []).flatMap(role => all.filter(i => parts[i].role === role));
  const middle = all.filter(i => !head.includes(i) && !tail.includes(i));
  return head.concat(middle, tail);
}

/* ---------- Learn card lists ---------- */

// Numbered steps, each with an icon.
function stepsHtml(picture) {
  const steps = picture.items.map((item, i) =>
    '<li class="step"><span class="step-num">' + (i + 1) + "</span>"
    + '<span class="step-icon" aria-hidden="true">' + item.icon + "</span>"
    + '<span class="step-text">' + item.text + "</span></li>"
  ).join("");
  return '<ol class="picture steps">' + steps + "</ol>";
}

// A list with icons, all red (warning signs) or all green (what to do).
function checklistHtml(picture) {
  const color = picture.color === "green" ? "green" : "red";
  const items = picture.items.map(item =>
    '<li class="check ' + color + '"><span class="check-icon" aria-hidden="true">' + item.icon + "</span>" + item.text + "</li>"
  ).join("");
  return '<ul class="picture checklist">' + items + "</ul>";
}
