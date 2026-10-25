/* ========================================================================
   help.js
   The "If it happened to you" screen, one version per age group.
   Telling a parent comes first and biggest. Hotlines come after, and only
   for ages 10 and up.

   Real phone numbers and web addresses here are checked and must stay
   exactly as they are. Last checked 21 October 2026.

   A hotline is one of two shapes:
     { icon, name, how, href }             the whole card is one link
     { icon, name, how, links: [ { label, href }, ... ] }
                                           a card with several links in it

   In this file:
     the hotlines   one constant for each (DANGER, NCMEC, FBI...)
     BLOCK, TELL    lines used in more than one place
     HELP           the screen for each age group: explore, squad, crew
   ======================================================================== */

const DANGER = {
  icon: "🚑", name: "In danger right now?",
  how: "Call 911.",
  href: "tel:911"
};

const NCMEC = {
  icon: "📞", name: "NCMEC CyberTipline",
  how: "Someone online asked for photos, or is threatening you. Call 1-800-843-5678, any time, day or night.",
  links: [
    { label: "Call", href: "tel:18008435678" },
    { label: "Report online at report.cybertip.org", href: "https://report.cybertip.org" }
  ]
};

// Ages 10 to 13 are all under 18, so they only need Take It Down.
const TAKE_IT_DOWN = {
  icon: "🛡️", name: "Take It Down",
  how: "A photo of you with no clothes on, taken before you were 18? This helps get it off many apps. No name needed.",
  href: "https://takeitdown.ncmec.org"
};

// Ages 14 to 18: Take It Down is for photos taken under 18. StopNCII is for 18 and over.
const TAKE_IT_DOWN_CREW = {
  icon: "🛡️", name: "Take It Down",
  how: "A nude or sexual photo of you, taken before you were 18? This helps get it off many apps. No name needed.",
  links: [
    { label: "takeitdown.ncmec.org", href: "https://takeitdown.ncmec.org" },
    { label: "Taken at 18 or over? stopncii.org", href: "https://stopncii.org" }
  ]
};

const FBI = {
  icon: "🚨", name: "FBI",
  how: "Report an online crime at ic3.gov",
  href: "https://www.ic3.gov"
};

const LIFELINE = {
  icon: "💬", name: "988 Lifeline",
  how: "Struggling? Call or text 988, any time. Free.",
  links: [
    { label: "Call 988", href: "tel:988" },
    { label: "Text 988", href: "sms:988" },
    { label: "Chat online", href: "https://chat.988lifeline.org" }
  ]
};

// Ages 10 to 13 get simpler words for the same line.
const LIFELINE_SQUAD = {
  icon: "💬", name: "988 Lifeline",
  how: "Feeling really sad, scared or alone? Call or text 988.",
  links: [
    { label: "Call 988", href: "tel:988" },
    { label: "Text 988", href: "sms:988" }
  ]
};

const CRISIS_TEXT = {
  icon: "📱", name: "Crisis Text Line",
  how: "Text HOME to 741741, any time. Free.",
  href: "sms:741741"
};

// Checked on ncpgambling.org: 1-800-MY-RESET is the national helpline, 24/7, call, text or chat.
const GAMBLING = {
  icon: "🎰", name: "Problem Gambling Helpline",
  how: "Betting skins or money got out of hand? Call or text 1-800-MY-RESET (1-800-697-3738), any time.",
  href: "tel:18006973738"
};

// One rule for blocking, everywhere: save, report, then block.
const BLOCK = "Save the messages, report, then block";
const TELL = "Tell a parent, or another adult you trust";

export const HELP = {
  // Ages 6 to 9: only words a 6 year old knows. The answer is always the grown-up.
  explore: {
    first: {
      icon: "🦉",
      title: "You are not in trouble.",
      text: "Tell your grown-up. Say: \"Something weird happened. Can I show you?\""
    },
    what: [
      { icon: "👆", title: "I tapped a trick", steps: ["Stop and show your grown-up", "Don't tap anything else", "You are not in trouble"] },
      { icon: "💸", title: "I sent something or bought something", steps: ["Stop and show your grown-up", "You are not in trouble"] },
      { icon: "😞", title: "Someone was mean to me", steps: ["Show your grown-up", "Don't write back", "Your grown-up can help you save it, report it, then block them"] },
      { icon: "🏠", title: "Someone asked where I live", steps: ["Show your grown-up", "Don't tell them", "Stop talking to them"] },
      { icon: "🔑", title: "Someone asked for my password", steps: ["Show your grown-up", "Don't give it", "Your grown-up can change it with you"] },
      { icon: "🤫", title: "Someone said don't tell", steps: ["Show your grown-up", "Stop talking to them", "You are not in trouble"] },
      { icon: "😨", title: "I saw something scary", steps: ["Look away and get your grown-up", "It is not your fault"] }
    ],
    more: "No grown-up at home? Tell a teacher you like.",
    hotlines: []
  },

  // Ages 10 to 13
  squad: {
    first: {
      icon: "🤖",
      title: "You are not in trouble.",
      text: "Tell a parent, or another adult you trust. Say: \"Something weird happened online. Can I show you?\""
    },
    what: [
      { icon: "🔑", title: "I typed my password somewhere", steps: [TELL, "Change your password in the real app", "Sign out of other devices", "Turn on 2-step verification"] },
      { icon: "🔢", title: "I sent my code and now I'm locked out", steps: [TELL, "Use the real app's own \"forgot password\" or help page", "Never pay anyone who says they can get it back", "Back in? Change your password, sign out of other devices, and turn on 2-step verification", "Warn your friends. The scammer may message them next"] },
      { icon: "💸", title: "I sent money or a gift card", steps: [TELL + ", now", "They can call the bank or gift card company right away", "Save the messages", "They can report it at reportfraud.ftc.gov"] },
      { icon: "🦠", title: "I downloaded a cheat and my computer acts weird", steps: [TELL, "Stop logging in to anything on that computer", "On a different device, change your passwords and turn on 2-step verification", "Ask them to help clean the computer before you use it again"] },
      { icon: "🚪", title: "Someone wants to meet me", steps: [TELL + ", before you answer", "Don't go, and don't share where you live or go to school", BLOCK, "Pushing you to meet or keep it secret? Report it at report.cybertip.org"] },
      { icon: "🤫", title: "Someone wants photos or secrets", steps: [TELL, "Stop replying", "Don't send anything", BLOCK] },
      { icon: "📸", title: "Someone says they will share a photo", steps: [TELL, "You are not in trouble", "Stop replying. Don't pay or send more", BLOCK, "Use Take It Down"] },
      { icon: "😞", title: "Someone is being mean to me", steps: [TELL, "Don't reply", BLOCK] }
    ],
    more: "More help, any time",
    hotlines: [DANGER, NCMEC, TAKE_IT_DOWN, LIFELINE_SQUAD]
  },

  // Ages 14 to 18
  crew: {
    first: {
      icon: "🛡️",
      title: "You are not in trouble.",
      text: "Tell a parent, or another adult you trust. Say: \"Something happened online. Can I show you?\""
    },
    what: [
      { icon: "🔑", title: "I typed my password somewhere", steps: [TELL, "Change the password in the real app", "Sign out of other devices", "Turn on 2-step verification"] },
      { icon: "💸", title: "I sent money, crypto or a gift card", steps: [TELL + ", now", "Call the bank, app or gift card company right away", "Save every message", "Report it at reportfraud.ftc.gov or ic3.gov"] },
      { icon: "🏦", title: "I moved money for a job", steps: [TELL + ", now", "Stop. Don't move any more money, even if they threaten you", "Call your bank right away and tell them everything", BLOCK, "Report it at ic3.gov"] },
      { icon: "📸", title: "Someone is threatening to share a photo", steps: [TELL, "Stop replying", "Don't pay. It does not make it stop", BLOCK, "Use Take It Down", "Report it at report.cybertip.org"] },
      { icon: "🖼️", title: "A fake image of me is going around", steps: [TELL, "You are not in trouble. You did nothing wrong", "Save the links and screenshots", "Report it in the app. Under the Take It Down Act, apps must remove it within 48 hours", "Nude or sexual, and you are under 18? Use Take It Down and report at report.cybertip.org"] },
      { icon: "💻", title: "I ran a file or pasted a command", steps: [TELL, "Take that computer offline", "On a different device, sign out everywhere, then change your passwords. Email first", "Get the computer cleaned before you log in on it again"] },
      { icon: "😞", title: "Someone is harassing me", steps: [TELL, "Don't reply", BLOCK, "Tell a teacher or counselor too"] },
      { icon: "🌧️", title: "I feel low, or an app has taken over", steps: [TELL, "You don't need a crisis to call or text 988", "Take a break: mute alerts, log out, or delete the app for a while", "A school counselor can help too"] }
    ],
    more: "More help, any time",
    hotlines: [DANGER, NCMEC, TAKE_IT_DOWN_CREW, FBI, LIFELINE, CRISIS_TEXT, GAMBLING]
  }
};
