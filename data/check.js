/* ========================================================================
   check.js
   The words for "Check it with me" (see js/screens/check.js): a few yes
   or no questions about a message a player really got, one version per
   age group. Nothing the player taps is saved or sent anywhere.

   The result never says a message is "safe". Scammers can be clever, so
   it always ends with showing a parent, or another adult you trust.

   Each age group has:
     cta               the link to it at the top of the Help page
     title, intro      the top of the first screen
     questions         { icon, ask, sign } each. "ask" is the question.
                       "sign" is the warning sign, shown on the result
                       when the answer was Yes.
     unsureSign        shown on the result for each "Not sure" answer
     trick             the result when there was a warning sign
     noSigns           the result when there was none
     doThis            what to do, after a warning sign
   ======================================================================== */

export const CHECK = {
  // Ages 6 to 9: only words a 6-year-old knows.
  explore: {
    cta: "Got a message or a game box that wants something? Check it with Pip",
    title: "Check it with Pip",
    intro: "Got a message, a box in a game, or a site that wants something? Tap yes or no. Pip will help.",
    questions: [
      { icon: "🙋", ask: "Is it from someone you don't know?", sign: "It is from someone you don't know." },
      { icon: "🔑", ask: "Does it ask for your password or a code?", sign: "It asks for your password or a code." },
      { icon: "🪙", ask: "Does it ask for money, gift cards or game coins?", sign: "It asks for money, gift cards or coins." },
      { icon: "⏰", ask: "Does it say hurry, or something bad will happen?", sign: "It says hurry." },
      { icon: "🎁", ask: "Does it give you free stuff?", sign: "It gives free stuff. Free stuff is a trick." },
      { icon: "🤫", ask: "Does it say tap a link, or don't tell your grown-up?", sign: "It says tap a link, or don't tell." }
    ],
    unsureSign: "You were not sure about one. That is OK. Ask your grown-up.",
    trick: { icon: "🚩", title: "This looks like a trick!" },
    noSigns: { icon: "🤔", title: "No trick signs found", text: "Tricks can be sneaky. Show it to your grown-up to be sure." },
    doThis: ["Don't tap it.", "Don't answer.", "Show it to your grown-up now. You are not in trouble!"]
  },

  // Ages 10 to 13
  squad: {
    cta: "Got a message that seems off? Check it with me",
    title: "Check it with me",
    intro: "Got a message, a pop-up or a website that wants something from you? Answer a few quick questions.",
    questions: [
      { icon: "🙋", ask: "Is it from someone you don't know, or a new account or number?", sign: "It is from a stranger, or a new account or number." },
      { icon: "🔑", ask: "Does it ask for your password, a code or your login?", sign: "It asks for your password, a code or your login." },
      { icon: "💸", ask: "Does it ask for money, gift cards or game items?", sign: "It asks for money, gift cards or game items." },
      { icon: "⏰", ask: "Does it rush you, or say something bad will happen?", sign: "It rushes you or scares you." },
      { icon: "🎁", ask: "Does it offer something free, or too good to be true?", sign: "It offers something free or too good to be true." },
      { icon: "🔗", ask: "Does it ask you to click a link, download something, or keep it secret?", sign: "It wants you to click, download, or keep it secret." }
    ],
    unsureSign: "You weren't sure about one. When you're not sure, ask before you do anything.",
    trick: { icon: "🚩", title: "This looks like a scam" },
    noSigns: { icon: "🤔", title: "No warning signs found", text: "That's good, but scammers can be clever. If anything feels off, show a parent, or another adult you trust." },
    doThis: ["Don't click, reply, pay or download.", "Show it to a parent, or another adult you trust. You're not in trouble.", "Then block and report it in the app."]
  },

  // Ages 14 to 18
  crew: {
    cta: "Got a suspicious message? Check it",
    title: "Check a message",
    intro: "Got a DM, text, email, pop-up or site asking for something? Run it through these questions.",
    questions: [
      { icon: "🙋", ask: "Is it from someone you don't know, a new account, or a number you don't have saved?", sign: "It is from an unknown sender or a new account." },
      { icon: "🔑", ask: "Does it ask for a password, a login code or account access?", sign: "It asks for a password, code or account access." },
      { icon: "💸", ask: "Does it ask for money, gift cards, crypto, or for you to move money for someone?", sign: "It asks for money, gift cards, crypto or a transfer." },
      { icon: "⏰", ask: "Is there a deadline, a threat, or pressure to act now?", sign: "It uses a deadline, a threat or pressure." },
      { icon: "🎁", ask: "Is it an offer that's too good to be true, like easy money or free items?", sign: "The offer is too good to be true." },
      { icon: "🔗", ask: "Does it push a link or a download, or ask you to keep it secret?", sign: "It pushes a link, a download or secrecy." }
    ],
    unsureSign: "You weren't sure about one. Check it another way before you act.",
    trick: { icon: "🚩", title: "Red flags found" },
    noSigns: { icon: "🤔", title: "No red flags found", text: "Still be careful. Check it another way, like the official app or website, and if anything feels off, talk to a parent, or another adult you trust." },
    doThis: ["Don't click, reply, pay or download.", "Talk to a parent, or another adult you trust. You're not in trouble.", "Block and report it. If money or an account is involved, act fast with an adult."]
  }
};
