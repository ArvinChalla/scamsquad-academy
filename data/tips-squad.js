/* ========================================================================
   tips-squad.js
   Tips of the week for ages 10 to 13 (Squad). There are 53, one for each
   week of the year plus one spare. Every device shows them in its own
   random order (see js/screens/tips.js).

   Each tip: icon, title (up to 6 words), text (up to 18 words).
   One habit per tip. Easy words, short sentences.

   In this file:
     TIPS   the 53 tips
   ======================================================================== */

export const TIPS = [
  { icon: "🪟", title: "Trade in the trade window", text: "Only trade inside the game's own trade window. Nobody goes first, and both sides must accept." },
  { icon: "🤝", title: "\"You go first\" means no", text: "If a player wants you to send first, say no. Whoever goes first outside the window loses." },
  { icon: "🎭", title: "Skip the stranger middleman", text: "A middleman you don't know is usually on the scammer's team. Use the trade window instead." },
  { icon: "💎", title: "No Robux generators exist", text: "No outside site can make Robux, V-Bucks or Minecoins. Any site that says it can is lying." },
  { icon: "🔢", title: "Codes are only for you", text: "Never send a login code to anyone. Not a friend, not staff, not family on a new number." },
  { icon: "📲", title: "A surprise code means danger", text: "Surprise code? Someone is trying to log in as you. Tell a parent, or another adult you trust." },
  { icon: "🔑", title: "Use a long passphrase", text: "Four or more random words, 16 or more characters, make a strong password." },
  { icon: "🧩", title: "One account, one password", text: "Give every game its own password. Then one leak can't open all your accounts." },
  { icon: "🔐", title: "Turn on 2-step verification today", text: "Ask a parent, or another adult you trust, to help turn it on for games and email." },
  { icon: "🔎", title: "Find a site's real owner", text: "Skip the https://. Find the next /. The owner is the last two parts just before it." },
  { icon: "🔒", title: "The padlock isn't a promise", text: "A padlock means the connection is private. It does not mean the site is honest." },
  { icon: "📌", title: "Open games from a bookmark", text: "Log in from the real app or your own bookmark. Never from a link in a message." },
  { icon: "🔍", title: "Top results can be fakes", text: "A search result or an AI answer can point to a fake site. Check the address anyway." },
  { icon: "🦠", title: "Antivirus stays on", text: "If a download says turn off your antivirus, close it. Nothing safe needs that." },
  { icon: "🗜️", title: "Locked zips hide viruses", text: "A cheat in a zip with a password is a red flag. Antivirus can't check inside." },
  { icon: "🎬", title: "Careful with description links", text: "Cheat links under videos can lead to viruses. Ask a parent, or another adult you trust, first." },
  { icon: "⚠️", title: "Fake staff don't DM you", text: "Real game staff don't message you in chat to ask for your password or code." },
  { icon: "🚨", title: "\"I reported you\" is a trick", text: "A player who says they reported you by accident is starting a scam. Block and ignore." },
  { icon: "📷", title: "Don't scan a stranger's QR", text: "A QR code from a stranger can log them into your account. Don't scan it." },
  { icon: "📧", title: "Scary school email? Check first", text: "An email says your password expires today? Open your school site the usual way, or ask a teacher." },
  { icon: "📱", title: "New number? Call the old one", text: "A text says \"It's Mom, new number\"? Call or text the number you already have saved." },
  { icon: "🗝️", title: "Pick a family word", text: "Choose a family word with your family. Use it to check a surprise call or text." },
  { icon: "🚫", title: "Don't reply STOP to scams", text: "Replying tells scammers your number works. Block the number and report it as junk." },
  { icon: "💸", title: "Money by mistake? Use the app", text: "Don't send it back. Tell a parent, or another adult you trust, and use the app's support." },
  { icon: "🏆", title: "Real prizes are free", text: "If a prize needs a card number or a fee, there is no prize. Close the page." },
  { icon: "🎁", title: "Gift card codes are money", text: "Anyone who asks for the numbers on a gift card is trying to steal it." },
  { icon: "💳", title: "Ask before using a card", text: "Never type a parent's card number into a game or site without asking first." },
  { icon: "📦", title: "Check the real price", text: "Before buying gems or a loot box, work out what it costs in real money." },
  { icon: "🎲", title: "Boxes don't promise prizes", text: "Next box may not have it. Stop and talk to a parent, or another adult you trust." },
  { icon: "⏰", title: "The timer is the trick", text: "\"Ends in 3 minutes!\" is there to rush you. Close it and wait a day." },
  { icon: "🛒", title: "Wait a day before buying", text: "Want something in a game? Wait a day. Still want it? Ask the adult who pays." },
  { icon: "🔥", title: "A streak is just a number", text: "Missing a day doesn't end a friendship. You can mute streak reminders in settings." },
  { icon: "🌙", title: "Phones sleep too", text: "Charge your phone outside your bedroom at night. Late-night alerts can wait until morning." },
  { icon: "🤫", title: "Secrets from family are warnings", text: "Someone online says \"don't tell your parents\"? Tell a parent, or another adult you trust, right away." },
  { icon: "🚪", title: "Don't move to another app", text: "Online friend wants a more private app? Say no. Tell a parent, or another adult you trust." },
  { icon: "🎁", title: "Free gifts can have strings", text: "Coins or skins from someone you met online, for no reason, are a warning sign." },
  { icon: "🏠", title: "Keep your school and street private", text: "Don't share your school, street or daily routine with people you only know online." },
  { icon: "📍", title: "Check who sees your location", text: "Look at your map settings. Share your location only with family, or friends your family okays." },
  { icon: "👯", title: "\"New account\"? Check first", text: "A friend's \"new account\" asks for something? Ask your friend at school or on their real number." },
  { icon: "👥", title: "Don't laugh along", text: "If a chat is mocking someone, don't add an emoji. Say it's not cool, or change the subject." },
  { icon: "💜", title: "Check on the left-out kid", text: "Saw someone left out or mocked? A short private message to them can really help." },
  { icon: "💾", title: "Save it, then report it", text: "Mean messages or scams? Take a screenshot, report it in the app, then block." },
  { icon: "🎭", title: "Videos can be AI fakes", text: "A famous creator giving away free stuff? Check their real channel before you click anything." },
  { icon: "🖼️", title: "Screenshots are not proof", text: "Anyone can fake a chat screenshot. Ask where it came from before you believe it." },
  { icon: "🔁", title: "Check a second source", text: "Surprising news? Find it on a trusted site or the real account before you share." },
  { icon: "🛑", title: "Stop before a challenge", text: "Before copying a viral challenge, stop and think: is it safe, and is it even real?" },
  { icon: "📤", title: "Think before you share", text: "Not sure something is true? Don't share it. Spreading a fake can hurt real people." },
  { icon: "🖥️", title: "Never share your screen", text: "Don't share your screen with anyone who says they are staff. They can see your codes." },
  { icon: "🔄", title: "Update your apps", text: "Turn on automatic updates. Updates fix holes that scammers use to get in." },
  { icon: "🧾", title: "Don't save passwords in random places", text: "Use a password manager. Set it up with a parent, or another adult you trust." },
  { icon: "😬", title: "Typed your password? Act fast", text: "Tell a parent, or another adult you trust. Change it, sign out everywhere, turn on 2-step verification." },
  { icon: "🙋", title: "You're not in trouble for telling", text: "Something weird happened online? Say \"Can I show you?\" to a parent, or another adult you trust." },
  { icon: "🗣️", title: "Have a second adult", text: "Pick one more adult you trust, like a teacher or relative, in case a parent isn't around." }
];
