/* ========================================================================
   tips-crew.js
   Tips of the week for ages 14 to 18 (Crew). There are 53, one for each
   week of the year plus one spare. Every device shows them in its own
   random order (see js/screens/tips.js).

   Each tip: icon, title (up to 6 words), text (up to 18 words).
   One habit per tip. Plain and direct, never babyish.

   In this file:
     TIPS   the 53 tips
   ======================================================================== */

export const TIPS = [
  // Gaming
  { icon: "🏴‍☠️", title: "Skip cracked games", text: "Cracked games and repacks often hide password stealers. Buy the game, or wait for a sale." },
  { icon: "👾", title: "Never run a sent game", text: "\"Can you test my game?\" files often steal accounts. Real playtests come through a store page." },
  { icon: "📦", title: "A locked zip is a warning", text: "A password on a download stops security tools scanning it. That is why scammers lock them." },
  { icon: "🛑", title: "The warning is usually right", text: "If someone says click Run anyway or turn off antivirus, the warning was right. Don't." },
  { icon: "⌨️", title: "Never paste a stranger's command", text: "A forum fix that says paste this as admin can install malware. Use official support instead." },
  { icon: "✋", title: "Human checks never need pasting", text: "A \"prove you're human\" page that says press keys and paste is a trap. Close the tab." },
  { icon: "🛒", title: "Bought accounts get taken back", text: "Cheap accounts with rare skins are often stolen. The real owner recovers them, and your money's gone." },
  { icon: "🎰", title: "Skins are real money", text: "Betting skins is real gambling, usually with no age check and no license. Skip those sites." },
  { icon: "🛡️", title: "Mute, block, report", text: "Harassed in a match? Mute and block for peace. Report so it's on record." },

  // Messages and calls
  { icon: "🚗", title: "Toll texts are usually scams", text: "A text about an unpaid toll with a link is likely fake. Check the agency's real site yourself." },
  { icon: "🙊", title: "Don't reply STOP", text: "Replying to a scam text shows your number works. Report it as junk, then delete it." },
  { icon: "🌀", title: "Every pause trains your feed", text: "Feeds learn from what you watch and for how long. Pausing on something asks for more." },
  { icon: "📞", title: "Caller ID can be faked", text: "A call showing your bank's name proves nothing. Hang up and call the number on your card." },
  { icon: "🧹", title: "Retrain a feed you don't like", text: "Tap Not interested, remove watch history, and follow what you actually want to see more of." },
  { icon: "🔢", title: "Nobody gets your code", text: "Anyone who asks for your verification code is a scammer. That includes \"the bank\"." },
  { icon: "📲", title: "A surprise code is a warning", text: "A login code you didn't ask for means someone may have your password. Change it now." },
  { icon: "🎙️", title: "Voices can be cloned", text: "AI can copy a voice from a short clip. A familiar voice asking for money isn't proof." },
  { icon: "🗝️", title: "Pick a family word", text: "Pick a secret family word, offline. Ask for it whenever a panicked call wants money." },
  { icon: "☎️", title: "Check on the number you know", text: "\"New number, it's me\"? Call or text the old number you already have before anything else." },
  { icon: "©️", title: "Copyright strikes live in the app", text: "A scary copyright email with a button is usually phishing. Open the app yourself and check." },

  // Money and shopping
  { icon: "💸", title: "No real job moves money", text: "\"Receive money, keep 10%, send the rest\" is money muling. The account in trouble is yours." },
  { icon: "🔄", title: "Cash flips are always fake", text: "Nobody can turn $50 into $500 for you. You'll pay, then pay \"fees\", then get blocked." },
  { icon: "🧾", title: "Never send back from a check", text: "A check that comes with \"send some back\" will bounce. You'll owe the bank the money." },
  { icon: "🎓", title: "Never pay for a scholarship", text: "Paying a fee to get a scholarship is always a scam. Real ones are free to apply for." },
  { icon: "🔐", title: "Your FSA ID is yours alone", text: "Never share your FSA ID, not even with a helpful consultant. The FAFSA is free to file." },
  { icon: "🎟️", title: "Tickets transfer in the app", text: "A seller offering screenshots instead of an app transfer is likely a scammer. Use official resale." },
  { icon: "💳", title: "Strangers don't get gift cards", text: "Gift cards, crypto and friends-and-family payments are hard to get back. Never pay strangers that way." },
  { icon: "📬", title: "An email is not money", text: "Selling something? Check the payment app yourself before you ship. A \"payment email\" can be fake." },
  { icon: "📦", title: "Loot boxes work like slots", text: "Paying for a random item is built like gambling. Check for \"Includes Random Items\" on the rating." },

  // People and feelings
  { icon: "💜", title: "Photo threats are never your fault", text: "You are not in trouble. Keep the messages. Don't pay. Tell a parent, or another adult you trust." },
  { icon: "💸", title: "Paying doesn't make it stop", text: "With photo threats, paying usually brings more demands. Get help first instead." },
  { icon: "🛡️", title: "Take It Down exists", text: "takeitdown.ncmec.org helps stop a photo of you, taken under 18, spreading. No name needed." },
  { icon: "📸", title: "Save the proof, then block", text: "Screenshot their profile and keep the chat, then block them. The proof helps stop them." },
  { icon: "🖼️", title: "Fake image, real person", text: "Never forward an AI fake of a classmate, even as a joke. Sharing can be a crime." },
  { icon: "🤝", title: "Message the person, not the group", text: "If a fake image of someone spreads, report it. Then send them one kind, normal message." },
  { icon: "💭", title: "AI friends, plus real ones", text: "If you talk to an AI companion, make sure one real person knows what's going on." },
  { icon: "🤫", title: "Secrets from family are the flag", text: "Anyone, human or bot, pushing you to hide things from family is the warning sign." },
  { icon: "🗣️", title: "Have a second adult", text: "Tell a parent, or another adult you trust. Know now who your second person would be." },
  { icon: "📞", title: "988 is there, any time", text: "Struggling? Call or text 988, any time, day or night. You don't need a crisis to call." },

  // Securing your account
  { icon: "🔑", title: "Security keys beat text codes", text: "A security key or passkey won't work on a fake site. An authenticator app beats text codes." },
  { icon: "📶", title: "Add a carrier PIN", text: "Ask whoever pays for your phone to add a carrier PIN. It makes a SIM swap harder." },
  { icon: "🩺", title: "Check your signed-in devices", text: "Every few months, check where your accounts are signed in. Sign out anything you don't know." },
  { icon: "🛟", title: "Keep recovery details current", text: "Make sure your recovery email and phone are ones you can still open. Old ones lock you out." },
  { icon: "✉️", title: "Your email is the master key", text: "Whoever controls your email can reset everything else. Give it the strongest password and 2-step verification." },
  { icon: "🧩", title: "One site, one password", text: "Use a password manager so every account gets its own long password. One leak stays one leak." },
  { icon: "🔒", title: "The padlock isn't a promise", text: "https and a padlock mean the connection is private, not that the site is honest." },
  { icon: "🔎", title: "Find who really owns a site", text: "Skip the https://. Find the next /. The owner is the last two parts just before it." },
  { icon: "😬", title: "Clicked? Move fast", text: "Typed a password on a fake page? Tell someone, change it in the real app, sign out everywhere." },

  // Real or fake
  { icon: "👥", title: "A crowd can be one person", text: "Dozens of identical, brand new accounts praising something is likely a bot network." },
  { icon: "⭐", title: "Watch for review bursts", text: "Hundreds of reviews in a few days, from one-review accounts, can mean fake reviews." },
  { icon: "📈", title: "Guaranteed returns are a scam", text: "Nobody can guarantee investment returns. A creator promising that is selling something to you." },
  { icon: "🎬", title: "Famous face, fake ad", text: "AI can fake a celebrity's face and voice. Check their own account before believing a giveaway." },

  // Apps that hook you (more are spread above)
  { icon: "🔥", title: "The timer is the trick", text: "Streak warnings, shop timers and \"only today\" deals are built to rush you. Rushed means slow down." }
];
