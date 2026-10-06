/*
  missions.js
  ScamSquad Academy, made by Arvin Challa.

  This file holds the words of the game: the three age groups, all 55
  missions, and the notes for parents and teachers. There is no code that
  runs the game in here. That is in game.js.

  Want to change a mission or write a new one? This is the only file you
  need to open.

  ------------------------------------------------------------------------
  HOW A MISSION IS WRITTEN
  ------------------------------------------------------------------------
  Every mission has these:
    type        which mini-game it is (the list is below)
    icon        the picture in the corner, as an emoji or an HTML code
    title       the mission name
    scene       one line that sets the scene
    task        what the player has to do. If it starts with who is tricking
                you, that part shows in a small box above the instruction.
    winMessage  what the player sees when they win
    lesson      the main thing to remember. Put the most important part in
                <b>bold</b>. On ages 10 to 18 the rest hides behind "Why?".
                Add showWholeLesson: true to keep it all open.

  The mini-games:
    dragToBin     drag a fake pop-up into the bin            (ages 6 to 9)
    sortCards     drag each card into the right box           (ages 6 to 9)
    saveTheKey    drag the password key into the castle       (ages 6 to 9)
    photo         tap the parts of a photo that give too much away
    trickster     block each move with the right shield. Each move has a
                  message, the right shield, a "why", and a "hint" shown
                  when the wrong shield is picked
    findClues     a fake chat, website, email or app. Find the clues.
    spotTheFakes  a pile of messages. Tap the fake ones, leave the real ones.
    putInOrder    tap the right steps in the right order

  Extra parts for findClues:
    screenType  "chat", "group", "site", "email" or "app"
    sender      who the chat or email is from, and senderNote under it
    look        a game-style colour scheme, like "roblox" or "discord".
                Colours only. Never real logos.
    gameName    a small label with the game's name, as plain text
    tip         the hint under the screen before anything is found
    notAClue    what to say when the player taps a part that is fine
    screen      the pieces of the fake screen, in order. A piece with
                clue: true is something to find, and its "why" says why.
                inAddressBar: true puts a piece in the web address bar.
                inline: true keeps a clue inside a sentence.

  After the clues are found, "choices" asks what to do next:
    question     the question (optional)
    choices      the answers. Each has text, and an optional detail line.
    rightChoice  which answer is right. 0 means the first one.
    wrongHint    the clue after a wrong answer

  Rules for every word in this file:
    - No em dashes.
    - Easy words. Ages 6 to 9 only use words a 6 year old knows.
    - Show the scam. Do not just describe it.
    - Name a parent first: "tell a parent, or another adult you trust".
    - No sexual content, no descriptions of abuse, no self-harm.
    - Patterns only. Never a word-for-word script a scammer could copy.
    - No numbers without a source.
*/


/* ========================================================================
   THE THREE AGE GROUPS
   Each age group has a buddy, a name for its points, and two levels.
   levelTopics says what Level 1 and Level 2 are about.
   showHelpCard puts the "Need help?" card under every 14 to 18 mission.
   ======================================================================== */
var AGE_GROUPS = {
  explore: {
    ages: "Ages 6 to 9",
    name: "Explorers",
    tagline: "Big friendly puzzles about staying safe on a tablet or a game.",
    buddy: "Pip",
    buddyJob: "Your owl buddy",
    points: "Stars",
    pointsIcon: "&#11088;",
    levelTopics: [
      "Free stuff, secrets and tricky players",
      "Game shops, scary messages and being a good teammate"
    ],
    showHelpCard: false
  },
  squad: {
    ages: "Ages 10 to 13",
    name: "Squad",
    tagline: "Real scams from Roblox, Discord and group chats. Spot the trap before it springs.",
    buddy: "Byte",
    buddyJob: "Your scam scanner",
    points: "XP",
    pointsIcon: "&#9889;",
    levelTopics: [
      "Scams in Roblox, Discord and group chats",
      "WhatsApp, TikTok, Twitch and school email"
    ],
    showHelpCard: false
  },
  crew: {
    ages: "Ages 14 to 18",
    name: "Crew",
    tagline: "The stuff that actually costs people money, accounts and sleep. No lectures.",
    buddy: "Nova",
    buddyJob: "Your wingman",
    points: "Rep",
    pointsIcon: "&#128737;",
    levelTopics: [
      "Blackmail, fake images and easy money",
      "Selling online, voice scams, fake shops and downloads"
    ],
    showHelpCard: true
  }
};


/* ========================================================================
   ALL THE MISSIONS
   Level 1 is scams inside chats and games. Level 2 moves out to websites,
   shops, email, texts, WhatsApp, TikTok and Twitch. Level 2 opens once
   Level 1 of the same age group is finished.

   The Crew list puts a calmer mission first, so the two hardest missions
   (photo blackmail and fake images) are never the very first thing a
   teen sees.
   ======================================================================== */
var MISSIONS = {

  /* ---------- Explorers, ages 6 to 9, Level 1 ---------- */
  explore: [
    {
      type: "dragToBin",
      icon: "&#127873;",
      title: "The Free Coins Trick",
      scene: "You are playing Pip Quest. Then this pops up.",
      task: "A trickster made this so you will tap it. Drag the trick into the bin.",
      gameBar: "🎮 Pip Quest",
      coins: "Coins: 240",
      popup: { gift: "🎁", prize: "1,000,000 FREE COINS!", hurry: "⏱️ ONLY 10 SECONDS LEFT!", button: "CLICK NOW!" },
      pipSays: "Free + hurry? That is a trick!",
      binText: "Drop it here",
      fullBinText: "Trick in the bin!",
      tricksFound: ["🎁 HUGE FREE PRIZE", "⏱️ HURRY!", "👆 CLICK NOW"],
      tricksNote: "These 3 tricks wanted you to tap before you think.",
      winMessage: "You beat the trick! Pip is so proud.",
      lesson: "<b>FREE + HURRY = STOP.</b> Close it. Then tell your grown-up."
    },

    {
      type: "sortCards",
      icon: "&#128274;",
      title: "Who Can Know This?",
      scene: "A new player in your game asks about you.",
      task: "Drag each card to the right box.",
      playerSays: "New player: “Tell me something about you…”",
      familyBox: "🏠<br>ONLY MY FAMILY",
      anyoneBox: "😊<br>OK FOR ANYONE",
      cards: [
        { text: "My school name", box: "family", why: "Your school tells people where you are all day." },
        { text: "My home address", box: "family", why: "Your address tells people where you live." },
        { text: "My password", box: "family", why: "Your password is the key to your game." },
        {
          text: "My favorite animal",
          box: "anyone",
          why: "Your favorite animal does not tell anyone where you are."
        },
        { text: "My favorite color", box: "anyone", why: "Favorite colors are fun to share!" }
      ],
      winMessage: "All sorted! You kept the big stuff safe.",
      lesson: "<b>If it helps someone find you, or get into your game, it is for your family only.</b> Not sure? Ask your grown-up first."
    },

    {
      type: "saveTheKey",
      icon: "&#128273;",
      title: "Save the Password Key",
      scene: "A player in your game wants something from you.",
      task: "The stranger wants your password so they can take your game. Drag the key to keep it safe.",
      strangerSays: "Stranger: “Give me your password and I’ll give you a super-rare pet!”",
      startHint: "Uh-oh! The key is floating to the stranger!",
      savedHint: "🔒 Saved! Your password is safe in the castle.",
      winMessage: "Password saved! Your game is safe.",
      lesson: "<b>A password is a key, not a gift.</b> Nobody needs it to give you a present."
    },

    {
      type: "findClues",
      icon: "&#128172;",
      title: "Stop the Mean Message",
      scene: "You get these messages in your game.",
      task: "A player is being mean to you on purpose. Tap the 2 mean messages.",
      screenType: "chat",
      sender: "BlockBuddy99",
      senderNote: "a player in your game",
      tip: "Find the mean ones!",
      notAClue: "That one is nice. Look for the mean ones.",
      screen: [
        { text: '<div class="bubble">nice house you built!</div>' },
        {
          clue: true,
          text: '<div class="bubble">you are SO bad at this game &#128514;</div>',
          why: "That is mean. Mean words are never your fault."
        },
        {
          clue: true,
          text: '<div class="bubble">nobody wants to play with you</div>',
          why: "That is mean too. It is meant to hurt you."
        }
      ],
      question: "What should you do first?",
      choices: [
        { text: "&#129417; Show your grown-up", detail: "They can help. You do not have to fix it alone." },
        { text: "&#128165; Send something mean back", detail: "Show them!" },
        { text: "&#128584; Hide it and tell nobody", detail: "Just forget it." }
      ],
      rightChoice: 0,
      wrongHint: "Being mean back makes it bigger. Hiding it means nobody can help. Which one gets you help?",
      winMessage: "Great choice! You got help.",
      lesson: "<b>Do not face mean messages alone.</b> Do not answer. Show your grown-up."
    },

    {
      type: "findClues",
      icon: "&#127942;",
      title: "Prize Detective",
      scene: "This message pops up on your tablet!",
      task: "A stranger is pretending to give you a prize. They want your grown-up's money. Find 3 clues.",
      screenType: "chat",
      sender: "Prize Team &#127873;",
      senderNote: "you do not know them",
      tip: "Be a detective. Find the clues!",
      notAClue: "That part is just being friendly. Keep looking for clues.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble">&#127881; YOU WON A NEW TABLET!</div>',
          why: "A surprise prize out of nowhere is a trick sign."
        },
        { text: '<div class="bubble">Hooray!!!</div>' },
        {
          clue: true,
          text: '<div class="bubble">&#9200; HURRY! Only 5 minutes left to get it!</div>',
          why: "Hurry is a trick sign. A real prize does not rush you."
        },
        {
          clue: true,
          text: '<div class="bubble">Pay $1 with a card to get it &#128179;</div>',
          why: "It wants money. Never type in a card number."
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#10060; Close it and get your grown-up", detail: "Type nothing at all." },
        { text: "&#128179; Pay the $1", detail: "It is only one dollar." },
        { text: "&#128172; Write back and ask for the prize", detail: "Maybe it is real." }
      ],
      rightChoice: 0,
      wrongHint: "A real prize never asks you for money.",
      winMessage: "Case solved! That prize was fake.",
      lesson: "<b>Surprise prize + hurry + money = TRICK.</b> Type nothing. Get your grown-up."
    },

    {
      type: "findClues",
      icon: "&#128241;",
      title: "Ring the Alarm",
      scene: "Someone you met in a game sends this.",
      task: "This stranger acts like a friend. They want to get you alone, away from your grown-up. Tap the 3 messages that ring the alarm.",
      screenType: "chat",
      sender: "CoolGamer",
      senderNote: "you met in a game",
      tip: "Find every alarm message!",
      notAClue: "Saying hello is fine. Look for hiding and being alone.",
      screen: [
        { text: '<div class="bubble">hello! you are really good at this game</div>' },
        {
          clue: true,
          text: '<div class="bubble">come to another app</div>',
          why: "They want you somewhere your grown-up cannot see. Alarm!"
        },
        {
          clue: true,
          text: '<div class="bubble">just you and me</div>',
          why: "They want you all alone. Alarm!"
        },
        {
          clue: true,
          text: '<div class="bubble">do not tell your parent. it can be our secret &#129323;</div>',
          why: "Hiding chats from your grown-up is the biggest alarm of all."
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#128680; Stop chatting and tell your grown-up", detail: "Right away." },
        { text: "&#129323; Keep the secret", detail: "They asked nicely." },
        { text: "&#128241; Go to the other app", detail: "Just to see." }
      ],
      rightChoice: 0,
      wrongHint: "Secrets from your grown-up are never safe secrets.",
      winMessage: "ALARM! You found every one!",
      lesson: "<b>Secrets from your grown-up are never safe secrets.</b> Stop chatting. Tell your grown-up right away."
    },

    {
      type: "photo",
      icon: "&#128248;",
      title: "Photo Detective",
      scene: "Pip wants to share this photo. But it shows too much!",
      task: "Tap 2 things to hide before sharing.",
      spots: [
        {
          label: "🏫 SCHOOL: LINCOLN ELEMENTARY",
          x: 18,
          y: 22,
          isClue: true,
          why: "Your school name shows where you are all day."
        },
        { label: "🏠 HOUSE #1428", x: 58, y: 63, isClue: true, why: "A house number shows where you live." },
        {
          label: "🐶 DOG",
          x: 69,
          y: 28,
          isClue: false,
          hint: "The dog is fine! It does not show where you are."
        },
        { label: "🌳 TREE", x: 12, y: 66, isClue: false, hint: "Lots of places have trees. It is fine." }
      ],
      winMessage: "Photo fixed! Now it does not show your school or your house.",
      lesson: "<b>Photos can show where you are.</b> Look for school names, signs and house numbers first."
    },

    {
      type: "trickster",
      icon: "&#128126;",
      title: "Beat the Trickster!",
      scene: "The Trickster has 4 tricks. Block every one!",
      task: "Pick the right shield.",
      tricks: [
        { message: "FREE COINS! CLICK IN 5 SECONDS!", shield: "stop", why: "Free + hurry means STOP.", hint: "Free and hurry. Which shield stops it?" },
        {
          message: "What school do you go to?",
          shield: "family",
          why: "Your school is for your family only.",
          hint: "Your school is just for your family to know. Which shield is that?"
        },
        {
          message: "Give me your password for a rare pet.",
          shield: "family",
          why: "Your password is for your family only.",
          hint: "Your password is just for your family. Which shield is that?"
        },
        {
          message: "Do not tell your parent about our chat.",
          shield: "tell",
          why: "Secret chats? Always tell your grown-up.",
          hint: "A secret from your grown-up? Which shield is that?"
        }
      ],
      shields: [
        { key: "stop", label: "🛑 STOP" },
        { key: "family", label: "🏠 FAMILY ONLY" },
        { key: "tell", label: "🦉 TELL A GROWN-UP" }
      ],
      winMessage: "You beat the Trickster! You are a ScamSquad Explorer!",
      lesson: "<b>Your 3 superpowers:</b> STOP when it feels wrong. Keep FAMILY ONLY things safe. TELL your grown-up."
    }
  ],

  /* ---------- Explorers, ages 6 to 9, Level 2 ---------- */
  explore2: [
    {
      type: "findClues",
      icon: "&#128722;",
      title: "Ask Before You Buy",
      scene: "You open the shop in your game.",
      task: "Tap the 3 things that cost real money.",
      screenType: "app",
      sender: "Pip Quest Shop &#128722;",
      senderNote: "inside your game",
      tip: "Look at the prices!",
      notAClue: "That one is free. Look for real money.",
      screen: [
        { text: '<div class="row"><span>&#127752; Rainbow hat</span><b>FREE</b></div>' },
        {
          clue: true,
          text: '<div class="row"><span>&#128142; 500 gems</span><b>$4.99</b></div>',
          why: "This costs real money. Ask your grown-up first."
        },
        { text: '<div class="row"><span>&#11088; Next level</span><b>FREE</b></div>' },
        {
          clue: true,
          text: '<div class="row"><span>&#127873; Mystery box</span><b>$1.99</b></div>',
          why: "Real money again! And you do not even know what is inside."
        },
        {
          clue: true,
          text: '<div class="row"><span>&#128179; Pay with saved card<small>one tap to buy</small></span><b>BUY</b></div>',
          why: "A saved card is your grown-up's money. One tap can spend it."
        }
      ],
      question: "You really want the gems. What do you do?",
      choices: [
        { text: "&#129417; Ask your grown-up first", detail: "Real money is their choice." },
        { text: "&#128179; Tap buy. It is only $1.99", detail: "That is not much." },
        { text: "&#129323; Use the saved card. Nobody will know", detail: "It is quick." }
      ],
      rightChoice: 0,
      wrongHint: "Whose money is on that saved card?",
      winMessage: "Smart shopper! You asked first.",
      lesson: "<b>Ask before you buy. Every time.</b> One big game company had to give back $245 million because kids bought things by accident, with one tap."
    },

    {
      type: "findClues",
      icon: "&#129309;",
      title: "Be a Good Teammate",
      scene: "A new player, Sam, joins your team.",
      task: "Tap the 3 messages that show Sam is being hurt.",
      screenType: "group",
      sender: "Pip Quest team chat",
      senderNote: "5 players",
      tip: "How is Sam being treated?",
      notAClue: "That one is okay. Look at how people talk to Sam.",
      screen: [
        { text: '<div class="bubble"><span class="name">Max</span>new kid joined</div>' },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Max</span>noob! get out of our team &#128514;</div>',
          why: "Calling someone names to push them out is mean."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Lily</span>yeah nobody likes you</div>',
          why: "Joining in makes it hurt even more."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Sam</span>i just want to play &#128546;</div>',
          why: "Sam feels sad and alone. That is the hurt."
        }
      ],
      question: "What do you do?",
      choices: [
        {
          text: "&#129309; Say “be nice”, play with Sam, and tell your grown-up",
          detail: "Being kind helps others be kind too."
        },
        { text: "&#128514; Laugh along", detail: "So the others like you." },
        { text: "&#128682; Leave and say nothing", detail: "It is not your problem." }
      ],
      rightChoice: 0,
      wrongHint: "Which choice helps Sam?",
      winMessage: "What a great teammate!",
      lesson: "<b>Being kind is a superpower.</b> When one player stands up for someone, others often join in. If players keep being mean, tell your grown-up and use the report button."
    },

    {
      type: "findClues",
      icon: "&#127908;",
      title: "The Voice in the Game",
      scene: "You are playing with voice chat on. A player you do not know starts talking to you.",
      task: "This stranger wants to find out who you are and get you alone. Tap the 3 things that ring the alarm.",
      screenType: "chat",
      sender: "&#127908; Voice chat",
      senderNote: "a player you do not know",
      tip: "Listen to what they ask for.",
      notAClue: "That part is just being friendly. Look at what they ask.",
      screen: [
        { text: '<div class="system-note">&#127908; Voice chat is on</div>' },
        { text: '<div class="bubble">&#127908; hey you are really good at this!</div>' },
        {
          clue: true,
          text: '<div class="bubble">&#127908; how old are you? what is your real name?</div>',
          why: "A stranger wants to know who you really are. Alarm!"
        },
        {
          clue: true,
          text: '<div class="bubble">&#127908; lets go to a call with just us two</div>',
          why: "They want you alone, away from everyone else. Alarm!"
        },
        {
          clue: true,
          text: '<div class="bubble">&#127908; dont tell anyone, ok?</div>',
          why: "Secrets from your grown-up are never safe. Alarm!"
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#128263; Mute them, leave the game, and tell your grown-up", detail: "Right away." },
        { text: "&#128578; Tell them your name. They seem nice", detail: "Just your first name." },
        { text: "&#128222; Go to the call with just them", detail: "Just to see." }
      ],
      rightChoice: 0,
      wrongHint: "Which choice gets you away from them, and gets your grown-up?",
      winMessage: "Muted and safe! Great job.",
      lesson: "<b>You can mute anyone, any time.</b> People you do not know online should never ask your name, your age, or to talk alone. Mute them, leave, and tell your grown-up."
    },

    {
      type: "findClues",
      icon: "&#128683;",
      title: "The Allow Button",
      scene: "You find a new game website. Before you can play, this pops up.",
      task: "A tricky website wants to send you messages all day long. Tap the 2 tricks it uses.",
      screenType: "site",
      tip: "Look at what it wants you to tap.",
      notAClue: "That part is just the website. Look at what it asks you to do.",
      screen: [
        { inAddressBar: true, text: "fun-games-free.xyz" },
        { text: '<div style="font-size:34px;line-height:1">&#127918;</div><h4>Super Fun Games</h4>' },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box">&#129302; Tap ALLOW to prove you are not a robot!</span>',
          why: "Allow does not prove anything. It lets the site keep sending you messages, again and again."
        },
        {
          text: '<span class="input-box" style="text-align:center"><b>fun-games-free.xyz wants to</b><br>Show notifications<br><br><span class="browser-button">Block</span> '
        },
        {
          clue: true,
          inline: true,
          text: '<span class="browser-button browser-button-blue">Allow</span>',
          why: "Allow means: send me messages all the time. Tap Block instead."
        },
        { text: "</span>" }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#128683; Tap Block, then close the site", detail: "And tell your grown-up." },
        { text: "&#9989; Tap Allow so you can play", detail: "Then play the game." },
        { text: "&#129302; Tap Allow to prove you are not a robot", detail: "That is what it says to do." }
      ],
      rightChoice: 0,
      wrongHint: "Allow lets the site send you messages forever. Which choice stops that?",
      winMessage: "Blocked! No more surprise messages.",
      lesson: "<b>Allow means: send me messages, again and again.</b> Tricky sites ask you to tap Allow so they can fill your screen with fake prizes and fake warnings. Tap Block, close the site, and tell your grown-up."
    },

    {
      type: "findClues",
      icon: "&#128561;",
      title: "Uh-Oh, a Virus?",
      scene: "You are watching videos. Then this fills the whole screen!",
      task: "Tricksters made this scary screen. They want you to call them and pay. Find 3 clues that it is a trick.",
      screenType: "site",
      tip: "It wants you to feel scared. Find the tricks.",
      notAClue: "That part is just the scary picture. Look at what it tells you to do.",
      screen: [
        { inAddressBar: true, text: "tablet-safety-alert.net" },
        {
          text: '<div style="font-size:40px;line-height:1">&#9888;&#65039;</div><h4 style="color:#c0392b">WARNING!</h4>'
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center"><b>Your tablet has 3 viruses!</b></span>',
          why: "It is trying to scare you. This is just a picture on a website."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center">&#128222; Call this number now: <b>1-800-555-0199</b></span>',
          why: "Real warnings never ask you to call a phone number."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">Do NOT close this page!</span>',
          why: "You can close it. It just does not want you to."
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#10060; Close it and show your grown-up", detail: "They will know what to do." },
        { text: "&#128222; Call the number", detail: "To fix the virus." },
        { text: "&#128295; Tap the big FIX button", detail: "Fix it fast." }
      ],
      rightChoice: 0,
      wrongHint: "Real warnings never ask you to call anyone. So what is this really?",
      winMessage: "Not scared! You beat the scary trick.",
      lesson: "<b>Real warnings never tell you to call a number.</b> This one is made to scare you. Close it and show your grown-up."
    },

    {
      type: "findClues",
      icon: "&#9935;&#65039;",
      title: "Free Minecoins",
      scene: "A video says you can get free Minecoins. You tap the link.",
      task: "A trickster made this page. They want your Minecraft password so they can take your game. Tap the 3 tricks.",
      screenType: "site",
      look: "minecraft",
      gameName: "Minecraft",
      tip: "Find the tricks!",
      notAClue: "That part is just the picture. Look at what it wants.",
      screen: [
        { inAddressBar: true, text: "free-minecoins-now.xyz" },
        { text: '<div style="font-size:34px;line-height:1">&#9935;&#65039;</div><h4>FREE MINECOINS</h4>' },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center">&#129689; Get 5,000 Minecoins FREE!</span>',
          why: "Minecoins cost real money. Nobody gives them away free."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box">Type your Minecraft password here</span>',
          why: "Nobody needs your password. A trickster wants to take your game."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">&#9201; Only 5 minutes left!</span>',
          why: "Hurry is a trick. Real things can wait."
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#10060; Close it and tell your grown-up", detail: "Type nothing at all." },
        { text: "&#128273; Type the password to get coins", detail: "5,000 coins!" },
        { text: "&#9201; Hurry before time runs out", detail: "Only 5 minutes!" }
      ],
      rightChoice: 0,
      wrongHint: "Free + password + hurry. What does that add up to?",
      winMessage: "Game saved! No free coins, no trick.",
      lesson: "<b>Minecoins only come from the real Minecraft store.</b> Free coin sites are tricks to take your game. Close it and tell your grown-up."
    },

    {
      type: "findClues",
      icon: "&#128290;",
      title: "The Secret Number",
      scene: "Your grown-up's phone beeps and shows a number. Then a player messages you.",
      task: "This player is a trickster. They want your grown-up's secret number. Tap the 3 tricks.",
      screenType: "chat",
      sender: "GameHelper &#11088;",
      senderNote: "you do not know them",
      tip: "Find the tricks!",
      notAClue: "The number on the phone is real. It is only for your grown-up. Look at what the player says.",
      screen: [
        { text: '<div class="system-note">&#128241; Your grown-up&#8217;s phone: Your code is 4 8 2 9</div>' },
        {
          clue: true,
          text: '<div class="bubble">hi! I can give you a free pet &#128054;</div>',
          why: "A free pet from a stranger is a trick. They want something back."
        },
        {
          clue: true,
          text: '<div class="bubble">tell me the number on the phone</div>',
          why: "Anyone who asks for that number is a trickster."
        },
        {
          clue: true,
          text: '<div class="bubble">quick! before it goes away</div>',
          why: "Hurry is a trick. Slow down."
        }
      ],
      question: "What do you do?",
      choices: [
        { text: "&#129296; Do not tell. Show your grown-up the message", detail: "Right away." },
        { text: "&#128054; Tell them the number. You get a pet!", detail: "A free pet!" },
        { text: "&#9986;&#65039; Tell them just half of it", detail: "That should be safe." }
      ],
      rightChoice: 0,
      wrongHint: "Who is that secret number for?",
      winMessage: "Secret kept! Great job.",
      lesson: "<b>Secret numbers are only for your grown-up.</b> Nobody else should ever ask for them. Show your grown-up right away."
    },

    {
      type: "putInOrder",
      icon: "&#128556;",
      title: "Oops, I Tapped It",
      scene: "You tapped a trick by mistake. Now it wants you to type more things.",
      task: "Tap the 3 things to do, in order.",
      situation: "&#128561; Oh no! You tapped it.",
      planLabel: "What to do",
      pickLabel: "Tap the steps in order",
      tip: "What do you do first?",
      notYet: "Good idea, but not yet. What comes first?",
      steps: [
        {
          text: "&#128721; Stop. Do not tap anything else",
          rank: 1,
          why: "Yes! Stop first. Do not type anything."
        },
        { text: "&#129417; Tell your grown-up", rank: 2, why: "Yes! Your grown-up can help." },
        { text: "&#129309; Let your grown-up help fix it", rank: 3, why: "Yes! You fixed it together." },
        {
          text: "&#128584; Hide the tablet",
          why: "Hiding it means nobody can help. You are not in trouble."
        },
        { text: "&#128073; Tap more to fix it", why: "Tapping more can make it worse. Stop and get help." }
      ],
      winMessage: "You did it! Stop, tell, fix. Every time.",
      lesson: "<b>Oops happens. Stop, tell, fix.</b> You are never in trouble for telling your grown-up you tapped something."
    },

    {
      type: "spotTheFakes",
      icon: "&#128269;",
      title: "Spot the Fake",
      scene: "Five messages pop up on your tablet. Some are real. Some are tricks.",
      task: "Some of these are from tricksters who want your game or your grown-up's money. Tap the 3 tricks. Leave the real ones.",
      tip: "Tap the tricks!",
      cards: [
        {
          icon: "&#127918;",
          from: "Pip Quest",
          text: "You finished level 5! Great job!",
          isScam: false,
          why: "That is just your game cheering you on. It is real."
        },
        {
          icon: "&#9935;&#65039;",
          from: "Minecoins",
          look: "minecraft",
          text: "FREE Minecoins! Tap here fast!",
          isScam: true,
          why: "Minecoins are never free. Free + hurry = trick!"
        },
        {
          icon: "&#128117;",
          from: "Grandma",
          text: "Love you! See you on Sunday &#128149;",
          isScam: false,
          why: "A sweet message from family. It is real."
        },
        {
          icon: "&#128273;",
          from: "Game Helper",
          text: "Type your password to get a prize.",
          isScam: true,
          why: "Nobody needs your password. Ever."
        },
        {
          icon: "&#9888;&#65039;",
          from: "Warning",
          text: "Your tablet is broken! Call this number now!",
          isScam: true,
          why: "Real warnings never ask you to call a number."
        }
      ],
      question: "What do you do with the tricks?",
      choices: [
        { text: "&#10060; Close them and tell your grown-up", detail: "Do not tap anything in them." },
        { text: "&#128073; Tap them to see what happens", detail: "Just to look." },
        { text: "&#128228; Send them to a friend", detail: "So they can see too." }
      ],
      rightChoice: 0,
      wrongHint: "Tricks want you to tap. What is the safest thing to do?",
      winMessage: "Super spotter! You found every trick.",
      lesson: "<b>You can spot a trick by what it wants.</b> Free stuff, hurry, your password, or a phone number to call. Close it, and tell your grown-up."
    },

    {
      type: "trickster",
      icon: "&#128126;",
      title: "The Trickster Returns!",
      scene: "The Trickster is back! Block all 4.",
      task: "Pick the right shield.",
      tricks: [
        {
          message: "Tap ALLOW to keep playing!",
          shield: "stop",
          why: "Allow lets the site send you messages forever. Stop!",
          hint: "Allow lets it send you messages forever. Which shield stops it?"
        },
        {
          message: "Buy the mystery box! Only $1.99!",
          shield: "ask",
          why: "Real money? Ask your grown-up first.",
          hint: "That costs real money. Which shield is that?"
        },
        {
          message: "Everyone, kick the new kid out!",
          shield: "kind",
          why: "Be kind. Play with the new kid.",
          hint: "That one is not a trick. It is being mean. Which shield is that?"
        },
        {
          message: "YOUR TABLET HAS A VIRUS! Call now!",
          shield: "stop",
          why: "Real warnings never ask you to call. Stop and close it.",
          hint: "Real warnings never ask you to call. Which shield is that?"
        }
      ],
      shields: [
        { key: "stop", label: "&#128721; STOP AND CLOSE" },
        { key: "ask", label: "&#128179; ASK BEFORE BUYING" },
        { key: "kind", label: "&#129309; BE KIND" }
      ],
      winMessage: "You beat the Trickster again! You are a Level 2 Explorer!",
      lesson: "<b>Your new superpowers:</b> STOP and close scary messages. ASK before you buy. BE KIND to other players. And always tell your grown-up."
    }
  ],

  /* ---------- Squad, ages 10 to 13, Level 1 ---------- */
  squad: [
    {
      type: "findClues",
      icon: "&#128142;",
      title: "The Robux Generator",
      scene: "A video says this site gives free Robux.",
      task: "Scammers run this site. They want your Roblox password. Find 4 clues that this is a scam.",
      screenType: "site",
      look: "roblox",
      gameName: "Roblox",
      tip: "Look at the address, the offer, and what it asks you for.",
      notAClue: "That part is just how the page looks. Look at what the site wants from you.",
      screen: [
        {
          clue: true,
          inAddressBar: true,
          text: "free-robux-gen2026.net/claim",
          why: "This is not roblox.com. Robux can only come from Roblox itself."
        },
        { text: '<div style="font-size:34px;line-height:1">&#128142;</div><h4>Get ' },
        {
          clue: true,
          text: "10,000 FREE ROBUX",
          why: "No outside site can make Robux. Not one. The offer is the bait."
        },
        { text: ' now!</h4><span class="input-box">Roblox username</span><span class="input-box">' },
        {
          clue: true,
          text: "Roblox password",
          why: "This is the real goal. A site that asks for your password wants your account."
        },
        { text: '</span><span class="input-box">Step 2: Prove you are human. ' },
        {
          clue: true,
          text: "Install our app and start a free trial with a card.",
          why: "The human check is the scam. The free trial keeps charging a card every month."
        },
        { text: '</span><span class="fake-button">CLAIM ROBUX</span>' }
      ],
      question: "You spotted it. Now, what do you do?",
      choices: [
        {
          text: "Close it. There is no generator.",
          detail: "If you already started, tell a parent or another adult you trust. They can stop the charges."
        },
        { text: "Do the human check but skip the card part.", detail: "Get the Robux without paying." },
        { text: "Try it once. Lots of YouTubers use these.", detail: "It might work this time." }
      ],
      rightChoice: 0,
      wrongHint: "Running this site costs money. So what are they getting from you?",
      winMessage: "Scanner agrees. Byte is impressed.",
      lesson: "<b>No outside site can make Robux, V-Bucks or Minecoins. Not one.</b> The check <i>is</i> the scam. It grabs your login, or signs you up to a trial that keeps charging. If you already started one, telling a parent early stops the charges."
    },

    {
      type: "findClues",
      icon: "&#128260;",
      title: "Send Yours First",
      scene: "Someone wants to trade for your rare pet.",
      task: "This trader is a scammer who wants your rare pet for nothing. Find 5 warning signs in this chat.",
      screenType: "chat",
      sender: "xX_TradeKing_Xx",
      senderNote: "not on your friends list",
      look: "roblox",
      gameName: "Roblox",
      tip: "Read the whole chat. Tap anything that should worry you.",
      notAClue: "That line is normal. Keep looking.",
      screen: [
        {
          text: '<div class="bubble">yo i want ur Shadow Dragon &#128009;<span class="time">4:02 pm</span></div>'
        },
        {
          clue: true,
          text: '<div class="bubble">ill give u 2 rare knives AND a Frost Dragon for it</div>',
          why: "An offer worth way more than your item is bait. It is meant to make you rush."
        },
        { text: '<div class="bubble mine">wait for real??</div>' },
        {
          clue: true,
          text: '<div class="bubble">send urs first so i know ur serious. trust me bro &#128591;</div>',
          why: "Send first is the oldest trick in gaming. Once you send, they block you."
        },
        {
          clue: true,
          text: '<div class="bubble">or my friend can hold both, hes a middleman</div>',
          why: "The helpful middleman is usually the same scammer on another account."
        },
        {
          clue: true,
          text: '<div class="bubble">i got proof of trades on my insta</div>',
          why: "Screenshots are easy to fake. Proof that is not in the game proves nothing."
        },
        {
          clue: true,
          text: '<div class="bubble">hurry tho other ppl want it<span class="time">4:03 pm</span></div>',
          why: "Hurry is there to stop you checking. A fair trade can wait."
        }
      ],
      choices: [
        {
          text: "Say no. Only trade in the game's own trade window.",
          detail: "Both items swap at the same moment."
        },
        { text: "Send first. The offer is amazing.", detail: "They seem friendly." },
        { text: "Let their friend hold both items.", detail: "A middleman sounds fair." }
      ],
      rightChoice: 0,
      wrongHint: "Two of these need you to <b>trust a stranger</b>. Only one uses a system that cannot lie.",
      winMessage: "Locked down. Nothing lost.",
      lesson: "<b>Send first is the oldest scam in gaming.</b> So is the helpful middleman, who is usually the scammer's other account. Real trades happen in the game's trade window, where both sides swap at once. If someone needs you to trust them, that <i>is</i> the warning sign."
    },

    {
      type: "findClues",
      icon: "&#9888;",
      title: "Your Account Will Be Banned",
      scene: "This message just arrived.",
      task: "A scammer is pretending to be Roblox staff to steal your account. Find 4 clues that this is fake.",
      screenType: "chat",
      sender: "Roblox Mod Team &#10004;",
      senderNote: "not on your friends list",
      look: "roblox",
      gameName: "Roblox",
      tip: "Check who sent it, how it makes you feel, and where the link goes.",
      notAClue: "Normal so far. Look for pressure and anything that is almost right.",
      screen: [
        {
          clue: true,
          text: '<div class="system-note">This account was made 2 days ago</div>',
          why: "Anyone can type a check mark into a name. A brand new account is not the real mod team."
        },
        {
          clue: true,
          text: '<div class="bubble">&#9888;&#65039; Your account was reported for trade fraud.</div>',
          why: "Scaring you first is the hook. A scared person clicks without thinking."
        },
        { text: '<div class="bubble">Verify your identity in the next ' },
        {
          clue: true,
          text: "10 minutes",
          why: "The timer is there to stop you thinking. Real warnings do not have a countdown."
        },
        { text: ' or your account will be deleted forever.</div><div class="bubble">Log in here: ' },
        {
          clue: true,
          text: "rob1ox-support.com/verify",
          why: "Look closely. That is a 1, not an l. Roblox never sends you to another site to log in."
        },
        { text: '<span class="time">just now</span></div>' }
      ],
      choices: [
        {
          text: "Ignore the link. Open the game yourself and check there.",
          detail: "A real warning would be waiting inside."
        },
        { text: "Log in through the link, fast.", detail: "You do not want to lose your account." },
        { text: "Reply and ask what you did wrong.", detail: "Sort out the mix-up." }
      ],
      rightChoice: 0,
      wrongHint: "The countdown is not there to help you. It is there to stop you doing one thing. What thing?",
      winMessage: "Panic beaten. That is the whole skill.",
      lesson: "<b>The countdown is there to stop you thinking.</b> Real warnings are waiting inside your account when you open the app yourself. They never arrive as a link with a timer. When a message makes your heart race, slow down."
    },

    {
      type: "findClues",
      icon: "&#127903;",
      title: "Free Nitro, Scan This Code",
      scene: "Your friend Maya sends you this.",
      task: "This message may not really be from Maya. Someone wants to get into your Discord account. Find 4 clues that something is wrong.",
      screenType: "chat",
      sender: "maya &#127769;",
      senderNote: "your friend",
      look: "discord",
      gameName: "Discord",
      tip: "It came from a friend. Look anyway.",
      notAClue: "That part looks normal. Look at the link and what it asks you to do.",
      screen: [
        {
          text: '<div class="bubble">omg discord is giving away free nitro rn<span class="time">9:41 pm</span></div>'
        },
        {
          text: '<div class="bubble">claim before its gone<span class="link-preview"><b>&#127873; Free Nitro, 3 months</b>'
        },
        {
          clue: true,
          text: "dlscord-gift.com",
          why: "dlscord, with an L instead of an i. It is a fake copy of the real site."
        },
        { text: "<br>" },
        {
          clue: true,
          text: "Only 12 left!",
          why: "Hurry is the trick again. Nothing real runs out in minutes."
        },
        { text: '<span class="qr-code" aria-hidden="true"></span>' },
        {
          clue: true,
          text: "Scan with your phone to claim",
          why: "That QR code is a real login code. Scanning it logs THEM into YOUR account."
        },
        { text: "</span></div>" },
        {
          clue: true,
          text: '<div class="bubble">hurry!! i already got mine &#128516;</div>',
          why: "Maya's account was probably taken this same way. That is why scams come from friends."
        }
      ],
      choices: [
        {
          text: "Do not scan. Tell Maya another way that she may be hacked.",
          detail: "Text her or tell her at school."
        },
        { text: "Scan it. It came from a friend.", detail: "Maya would not trick you." },
        { text: "Open the link on a computer instead.", detail: "Skip the QR code." }
      ],
      rightChoice: 0,
      wrongHint: "That QR code is a real login feature. So who gets logged in when you scan a code someone else made?",
      winMessage: "Byte flashes green. Nicely done.",
      lesson: "<b>A login code sent to you logs <i>them</i> in, not you.</b> It is a real feature turned into a trap. It came from a friend because their account was taken the same way. That is why you check with them somewhere else."
    },

    {
      type: "findClues",
      icon: "&#129512;",
      title: "Turn Off Your Antivirus",
      scene: "You find a cheat that promises unlimited items.",
      task: "Whoever made this cheat wants to put harmful software on your computer. Find 4 warning signs on this page.",
      screenType: "site",
      tip: "Read it like the site is trying to talk you into something. It is.",
      notAClue: "That part is just the look of the page. Read what it asks you to do.",
      screen: [
        { inAddressBar: true, text: "mega-cheats-free.net/download" },
        {
          text: '<div style="font-size:32px;line-height:1">&#9889;</div><h4>UNLIMITED ITEMS CHEAT v4.2</h4>'
        },
        {
          clue: true,
          inline: true,
          text: '<span class="site-badge">&#10004; 100% SAFE</span>',
          why: "Anyone can type 100% safe. It means nothing."
        },
        { text: '<span class="input-box">' },
        {
          clue: true,
          text: "Your antivirus will say this is a virus. That is a false alarm. Turn it off before you install.",
          why: "That sentence gives it away. Nothing safe needs your protection turned off."
        },
        { text: "</span>" },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">DOWNLOAD cheat_tool.exe</span>',
          why: "A program from a random site can do anything to your computer once it runs."
        },
        { text: '<span class="small-print">' },
        {
          clue: true,
          text: "Over 50,000 downloads this week!",
          why: "Big numbers are easy to fake. Lots of downloads can just mean lots of victims."
        },
        { text: "</span>" }
      ],
      choices: [
        {
          text: "Do not download it.",
          detail: "If you already did, tell a parent or another adult you trust and change your passwords on another device."
        },
        { text: "Turn off antivirus for just one minute.", detail: "Then turn it back on." },
        { text: "Download it, but wait before opening it.", detail: "Just to be careful." }
      ],
      rightChoice: 0,
      wrongHint: "Turn it around. Why would a program need your protection switched <b>off</b> before it runs?",
      winMessage: "Threat stopped before it landed.",
      lesson: "<b>Turn off your antivirus is the biggest red flag in gaming.</b> Security researchers found that more than 40% of password stealing came from gaming files, mostly cheats and mod menus. Sometimes the cheat even works. So does the password stealer hidden inside it."
    },

    {
      type: "findClues",
      icon: "&#128101;",
      title: "The Chat Nobody Added Her To",
      scene: "You are in this group chat.",
      task: "Find 3 things that make this bullying.",
      screenType: "group",
      sender: "the squad &#128293;",
      senderNote: "6 members",
      tip: "Nobody says anything to Maya. Look for what is happening anyway.",
      notAClue: "That part is not the bullying itself. Look at what the group is doing to Maya.",
      screen: [
        { text: '<div class="system-note">Jayden made this group. Maya was not added.</div>' },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Jayden</span>new gc &#129323; no maya lol</div>',
          why: "Not every group has everyone, and that is fine. Making a secret group just to leave her out, and joking about it, is bullying."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Ava</span>look what she posted &#128128;<span class="hidden-photo">Screenshot of Maya&#8217;s post</span></div>',
          why: "Posting her screenshots to laugh at is the bullying itself, even if nobody says it to her face."
        },
        { text: '<div class="bubble"><span class="name">Leo</span>&#128514;&#128514;&#128514;</div>' },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Ava</span>shes so weird</div>',
          why: "Mocking her behind her back is still bullying, even if she never reads it."
        },
        { text: '<div class="system-note">You have not said anything yet</div>' }
      ],
      question: "You have not said anything yet. Staying quiet lets it keep going. What do you do?",
      choices: [
        {
          text: "Say it is not okay, leave the chat, and check on Maya.",
          detail: "Even a short message to her changes her day."
        },
        { text: "Nothing. You are not the one posting.", detail: "You did not say anything mean." },
        { text: "Screenshot it and send it to Maya.", detail: "She deserves to know." }
      ],
      rightChoice: 0,
      wrongHint: "One choice protects you. One hands her every cruel word. One actually makes it smaller.",
      winMessage: "That took real nerve. Byte logs a win.",
      lesson: "<b>Leaving someone out on purpose is the most common kind of cyberbullying</b>, more common than mean comments, in a 2025 survey of 3,466 teenagers. It works because nothing was said <i>to</i> her, so nobody feels responsible. One person saying no often ends it."
    },

    {
      type: "findClues",
      icon: "&#128682;",
      title: "Let Us Move This Off Here",
      scene: "Three weeks of chat, newest at the bottom.",
      task: "ShadowPlays_22 is an adult slowly building trust with a much younger player. Find 4 messages that are part of the pattern.",
      screenType: "chat",
      sender: "ShadowPlays_22",
      senderNote: "met in a lobby 3 weeks ago",
      tip: "Nothing here is scary on its own. That is the point. Tap what builds up.",
      notAClue: "Normal so far. Keep reading down, and watch what changes.",
      screen: [
        {
          text: '<div class="bubble">gg that last round was insane<span class="time">3 weeks ago</span></div>'
        },
        { text: '<div class="bubble mine">haha you carried tbh</div>' },
        {
          clue: true,
          text: '<div class="bubble">how old r u? im 22<span class="time">2 weeks ago</span></div>',
          why: "An adult working to befriend a much younger player is the first signal. Alone it proves nothing. It still belongs in the pattern."
        },
        { text: '<div class="bubble mine">13</div>' },
        {
          clue: true,
          text: '<div class="bubble">sent you 2000 coins btw. no reason, just thought you deserved them<span class="time">8 days ago</span></div>',
          why: "Free gifts make you feel you owe them something. That feeling is exactly what they want."
        },
        { text: '<div class="bubble mine">wait really?? ty!!</div>' },
        {
          clue: true,
          text: '<div class="bubble">dont mention me to your parents btw, they always get weird about older friends<span class="time">yesterday</span></div>',
          why: "A secret from your parents is the clearest signal here. Nobody safe needs to be hidden from the adults who look after you."
        },
        {
          clue: true,
          text: '<div class="bubble">this chat is laggy, add me on the other app? way more private there<span class="time">yesterday</span></div>',
          why: "Moving you somewhere quieter is the point, not the lag. The other app watches less."
        },
        { text: '<div class="bubble">no rush, whenever<span class="time">today</span></div>' }
      ],
      choices: [
        {
          text: "Stop. Do not move apps. Tell a parent or teacher today.",
          detail: "Gifts, plus secrets, plus moving apps is a known pattern."
        },
        { text: "Move over. They have been nothing but nice.", detail: "They never asked for anything." },
        { text: "Keep chatting, but stay in the game.", detail: "Just do not move apps." }
      ],
      rightChoice: 0,
      wrongHint: "Look at the signals together, not one at a time. <b>An adult, free gifts, and a secret.</b> What do they add up to?",
      winMessage: "You read the whole pattern. That is the hard part.",
      lesson: "<b>Three signals together: gifts, secrets, and moving apps.</b> Any one alone might be nothing. All three is the pattern adults use to groom kids, which means building trust so they can harm them. Tell a parent, or another adult you trust. You are never in trouble for telling, and nothing that happened before you told is your fault. An adult can report it at <b>missingkids.org/cybertipline</b>.",
      showWholeLesson: true
    },

    {
      type: "findClues",
      icon: "&#128205;",
      title: "Who Can See Where You Are",
      scene: "You check your map settings for the first time in ages.",
      task: "Find 3 things that are risky.",
      screenType: "app",
      sender: "Location settings",
      senderNote: "Map",
      tip: "Think about who can see this, and what they learn over a week.",
      notAClue: "That one is fine. These are people you actually know.",
      screen: [
        {
          clue: true,
          text: '<div class="row"><span>Share my location<small>Live, updates all the time</small></span><span class="switch on" aria-hidden="true"></span></div>',
          why: "Live location shows your routine, not just a dot. A week of it shows your home, your school, and your walk between them."
        },
        {
          clue: true,
          text: '<div class="row"><span>Who can see me<small>All friends</small></span><b>214 people</b></div>',
          why: "214 people can watch where you go. Could you name them all?"
        },
        { text: '<div class="row"><span><b>Friends who can see you</b></span></div>' },
        { text: '<div class="row"><span>Sam<small>from school</small></span></div>' },
        { text: '<div class="row"><span>Priya<small>your cousin</small></span></div>' },
        {
          clue: true,
          text: '<div class="row"><span>xx_gamer_8812<small>never met</small></span></div>',
          why: "About 50 people on your list are strangers. Each one can see where you are right now."
        }
      ],
      choices: [
        {
          text: "Share only with people I really know, or turn it off.",
          detail: "It shows your routine, not just a dot."
        },
        { text: "Leave it. Turning it off looks like hiding.", detail: "Everyone shares their location." }
      ],
      rightChoice: 0,
      wrongHint: "A live location does not say where you are once. Watched for a week, what does it show?",
      winMessage: "Good. That list needed a clear-out.",
      lesson: "<b>Live location shows your routine, not a dot.</b> A week of it shows your house, your school, and when you walk alone. Trimming your list is not hiding. It is just being accurate."
    }
  ],

  /* ---------- Squad, ages 10 to 13, Level 2 ---------- */
  squad2: [
    {
      type: "findClues",
      icon: "&#128680;",
      title: "I Accidentally Reported You",
      scene: "Someone from a server you are in messages you.",
      task: "jake_plays is a scammer who wants your Discord account. Find 4 clues that this is a scam.",
      screenType: "chat",
      sender: "jake_plays",
      senderNote: "from your Discord server",
      look: "discord",
      gameName: "Discord",
      tip: "Follow where the chat is taking you.",
      notAClue: "That part is normal chat. Look for pressure and what they want you to do.",
      screen: [
        { text: '<div class="bubble">hey are you online?<span class="time">6:15 pm</span></div>' },
        {
          clue: true,
          text: '<div class="bubble">omg im so sorry i accidentally reported your account &#128557;</div>',
          why: "Game companies say this exact message is always the start of a scam. False reports are simply ignored."
        },
        {
          clue: true,
          text: '<div class="bubble">it says your account gets banned in 24 hours</div>',
          why: "The deadline is there to make you panic. Real bans do not arrive through a friend."
        },
        { text: '<div class="bubble">add this staff guy so he can fix it: ' },
        {
          clue: true,
          text: "@Support_Team_Official",
          why: "Real staff never sort things out through a friend's DM. Discord says its staff will never contact you in the app for support."
        },
        { text: "</div>" },
        {
          clue: true,
          text: '<div class="bubble">he just needs the code they email you, to check it is you</div>',
          why: "That code is the key to your account. Anyone who asks for it is trying to take it."
        }
      ],
      choices: [
        {
          text: "Ignore it and block them. False reports are thrown out.",
          detail: "If you are worried, check your account yourself in the app."
        },
        { text: "Add the staff account to fix it fast.", detail: "Better safe than banned." },
        { text: "Send the code, just this once.", detail: "It is only to check it is you." }
      ],
      rightChoice: 0,
      wrongHint: "Real game staff do not reach you through a friend's DM. So who is the staff guy, really?",
      winMessage: "Account safe. That one fools a lot of people.",
      lesson: "<b>A false report does nothing to your account.</b> Steam's support page says any claim that you were accidentally reported is always the start of a scam, and false reports are simply ignored. The fake staff account wants one thing: the code from your email, which lets them take your account."
    },

    {
      type: "findClues",
      icon: "&#128250;",
      title: "Share Your Screen?",
      scene: "Someone says they are from Discord safety. They want to check your account.",
      task: "This is not Discord staff. It is a scammer who wants to see your screen and take your account. Find 4 clues that this is a scam.",
      screenType: "chat",
      sender: "Discord Trust &amp; Safety &#10004;",
      senderNote: "sent you a friend request",
      look: "discord",
      gameName: "Discord",
      tip: "Think about everything they could see on your screen.",
      notAClue: "That part is just the call starting. Look at what they ask you to do.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble">your account was flagged. we need to verify you on a call</div>',
          why: "Discord says its staff never contact users in the app for support. A friend request from staff is a fake."
        },
        { text: '<div class="system-note">&#128222; Incoming call &#183; screen share requested</div>' },
        {
          clue: true,
          text: '<div class="bubble">share your screen so I can watch you check your settings</div>',
          why: "Anything on your screen, they can see. That is the whole trick."
        },
        {
          clue: true,
          text: '<div class="bubble">now open your email so I can see the code we sent</div>',
          why: "Once they see a login code, they can take your account. Nobody else should ever see one."
        },
        {
          clue: true,
          text: '<div class="bubble">do not hang up or your account gets deleted</div>',
          why: "Pressure to stay on the call stops you thinking it through."
        }
      ],
      choices: [
        {
          text: "Hang up, block them, and tell a parent or another adult you trust.",
          detail: "Real staff never ask you to share your screen."
        },
        { text: "Share your screen, just for a minute.", detail: "To keep your account." },
        { text: "Share, but cover the code with your hand.", detail: "They will not see it then." }
      ],
      rightChoice: 0,
      wrongHint: "If they can see your screen, what else can they see?",
      winMessage: "Call ended. Account safe.",
      lesson: "<b>Sharing your screen hands over everything on it.</b> Codes, emails, passwords and messages. Discord says its staff never contact users in the app for support. If someone asks you to share your screen to verify you, it is a scam."
    },

    {
      type: "findClues",
      icon: "&#128273;",
      title: "The Code Sent by Mistake",
      scene: "Your phone gets a text with a code. A minute later, your friend Mia messages you.",
      task: "This may not really be Mia. Someone wants that code so they can take over your WhatsApp. Find 4 clues that this is a trap.",
      screenType: "chat",
      sender: "Mia &#128156;",
      senderNote: "your friend on WhatsApp",
      look: "whatsapp",
      gameName: "WhatsApp",
      tip: "Think about whose account that code unlocks.",
      notAClue: "That part is normal. Look at the code and what Mia asks for.",
      screen: [
        {
          clue: true,
          text: '<div class="system-note">Text: Your WhatsApp code is 482-913. Do not share this code.</div>',
          why: "You did not ask for a code. A code out of nowhere means someone is trying to log in to your WhatsApp right now."
        },
        {
          clue: true,
          text: '<div class="bubble">omg i sent you my code by mistake &#128584;</div>',
          why: "Codes do not go to the wrong person by mistake. Someone asked for a code for your number."
        },
        {
          clue: true,
          text: '<div class="bubble">can you send it back? i need it to log in</div>',
          why: "WhatsApp says never share this code. Whoever has it can take your account."
        },
        {
          clue: true,
          text: '<div class="bubble">pls quick before it runs out!!</div>',
          why: "Hurry is there to stop you thinking it through."
        }
      ],
      choices: [
        {
          text: "Do not send it. Check with Mia another way.",
          detail: "Call her, or ask her in person. Her account may already be taken."
        },
        { text: "Send it. Mia is my friend.", detail: "She just made a mistake." },
        { text: "Send only the first 3 numbers.", detail: "That should be safe." }
      ],
      rightChoice: 0,
      wrongHint: "The code came to YOUR phone. So whose account does it unlock?",
      winMessage: "Account saved. And you probably saved Mia's friends too.",
      lesson: "<b>That code is the key to your own account.</b> WhatsApp's help page says never share your verification code, because anyone who has it can take over your account. The message came from Mia because her account was probably taken the same way. Whoever takes yours messages all your friends next."
    },

    {
      type: "findClues",
      icon: "&#9935;&#65039;",
      title: "The Mod With a Surprise",
      scene: "You want a cool mod pack for Minecraft. A video links to this download page.",
      task: "This page wants you to run a file that can infect your computer. Find 4 warning signs before you download.",
      screenType: "site",
      look: "minecraft",
      gameName: "Minecraft",
      tip: "Look at where it comes from, what it tells you to ignore, and what kind of file it is.",
      notAClue: "That part is just the look of the page. Look at the download itself.",
      screen: [
        {
          clue: true,
          inAddressBar: true,
          text: "mc-modpacks-free.net/mega-pack",
          why: "This is not a mod site people trust. Random download sites are where infected files hide."
        },
        {
          text: '<div style="font-size:32px;line-height:1">&#9935;&#65039;</div><h4>MEGA MOD PACK 1.21</h4><span class="input-box">'
        },
        {
          clue: true,
          text: "Windows may warn you. Click More info, then Run anyway.",
          why: "Clicking past the warning is the trap. The warning was right."
        },
        { text: "</span>" },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">DOWNLOAD MegaPack_installer.exe</span>',
          why: "Minecraft mods are normally .jar files you add to a mods folder. An .exe from a random site can run anything on your computer."
        },
        { text: '<span class="small-print">' },
        {
          clue: true,
          text: "&#9733;&#9733;&#9733;&#9733;&#9733; works great!! (2 minutes ago)",
          why: "Brand-new five-star reviews are easy to fake."
        },
        { text: "</span>" }
      ],
      choices: [
        {
          text: "Do not download it. Get mods only from trusted sites, and ask a parent first.",
          detail: "If you already ran it, change passwords from another device and tell a parent or another adult you trust."
        },
        { text: "Download it, but scan it first.", detail: "Better safe than sorry." },
        { text: "Click Run anyway. Everyone uses this pack.", detail: "The reviews are good." }
      ],
      rightChoice: 0,
      wrongHint: "It told you to click past a security warning. Why would a safe mod need that?",
      winMessage: "Nothing installed. Your accounts stay yours.",
      lesson: "<b>Mods can hide harmful programs, even on big sites.</b> In 2023, criminals broke into mod makers' accounts on CurseForge and Bukkit and hid a harmful program called fractureiser inside popular Minecraft mods. It stole passwords saved in browsers. Use trusted sites, keep your antivirus on, never click past a warning, and ask a parent before installing."
    },

    {
      type: "findClues",
      icon: "&#128293;",
      title: "Free Followers",
      scene: "A video says you can get free followers on TikTok. You tap the link.",
      task: "This fake site wants your TikTok password. Find 4 warning signs on this page.",
      screenType: "site",
      look: "tiktok",
      gameName: "TikTok",
      tip: "Look at the address, the offer, and what it asks you to type.",
      notAClue: "That part is just how the page looks. Look at what it wants.",
      screen: [
        {
          clue: true,
          inAddressBar: true,
          text: "tiktok-followers-free.top",
          why: "This is not TikTok. Real followers can only come from the real app."
        },
        { text: '<div style="font-size:32px;line-height:1">&#128293;</div><h4>Get ' },
        {
          clue: true,
          text: "10K FREE followers",
          why: "Ten thousand free followers is the bait. Nobody gives that away."
        },
        { text: ' now!</h4><span class="input-box">TikTok username</span><span class="input-box">' },
        {
          clue: true,
          text: "TikTok password",
          why: "This is the real goal: your password. With it they can lock you out of your own account."
        },
        { text: '</span><span class="small-print">' },
        { clue: true, text: "Only 3 spots left today!", why: "Hurry again. Fake limits stop you thinking." },
        { text: "</span>" }
      ],
      choices: [
        {
          text: "Close it. Only type your password into the real app.",
          detail: "If you already did, change it now and tell a parent or another adult you trust."
        },
        { text: "Try it. Lots of people use these.", detail: "More followers would be nice." },
        { text: "Use a friend's account to test it first.", detail: "Then yours is safe." }
      ],
      rightChoice: 0,
      wrongHint: "Why would a website need your password to give you followers?",
      winMessage: "Account safe. Followers come the real way.",
      lesson: "<b>Free followers sites want one thing: your login.</b> Once they have your password they can lock you out, post scams to your friends, or sell your account. Only ever type your password into the real app."
    },

    {
      type: "findClues",
      icon: "&#127909;",
      title: "The Stream Giveaway",
      scene: "You are watching your favorite streamer live. Then you see your name in chat.",
      task: "A scammer is pretending to be part of the stream to steal your Twitch login. Find 4 clues that this giveaway is fake.",
      screenType: "group",
      sender: "#coolstreamer chat",
      senderNote: "live &#183; 3,204 watching",
      look: "twitch",
      gameName: "Twitch",
      tip: "Who is really running this giveaway?",
      notAClue: "That is just other viewers chatting. Look at the giveaway account.",
      screen: [
        { text: '<div class="bubble"><span class="name">viewer_88</span>W stream &#128293;</div>' },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Giveaway_Bot_Official</span>&#127881; @you WON the skin giveaway!</div>',
          why: "Anyone can name an account Official. The streamer did not say this."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Giveaway_Bot_Official</span>DM me to claim your prize</div>',
          why: "Moving you into DMs takes you away from the streamer and the moderators."
        },
        { text: '<div class="bubble"><span class="name">Giveaway_Bot_Official</span>claim here: ' },
        {
          clue: true,
          text: "twitch-giftz.com/claim",
          why: "That is not Twitch. It is a fake site with a fake login page."
        },
        { text: "</div>" },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Giveaway_Bot_Official</span>log in with your Twitch account to claim &#128274;</div>',
          why: "A prize never needs your password. This is how they steal accounts."
        }
      ],
      choices: [
        {
          text: "Ignore it, report the account, and do not click.",
          detail: "Real giveaways are announced by the streamer, on stream."
        },
        { text: "Click fast before someone else claims it.", detail: "You won!" },
        { text: "DM the bot to ask if it is real.", detail: "It will tell you." }
      ],
      rightChoice: 0,
      wrongHint: "Did the streamer say you won, or a random account?",
      winMessage: "Not fooled. That trick hits big streams all the time.",
      lesson: "<b>Fake giveaway accounts flood big streams.</b> They pick names that look official, tell you that you won, and send you to a fake login page. When a streamer really runs a giveaway, they say it themselves, on stream."
    },

    {
      type: "findClues",
      icon: "&#128064;",
      title: "Who Sent This?",
      scene: "You posted a link so friends could send you anonymous questions. This comes in.",
      task: "This app makes money when you pay to find out who sent a message. Find 4 clues about how this app really works.",
      screenType: "app",
      sender: "AnonAsk &#128274;",
      senderNote: "anonymous messages app",
      tip: "Ask who makes money when you feel worried.",
      notAClue: "That part is just the app. Look at the messages and the price.",
      screen: [
        {
          clue: true,
          text: '<div class="notification"><span class="notification-icon">&#128172;</span><span>New anonymous message<br><b>i know what you did &#128064;</b><small>just now</small></span></div>',
          why: "This may not be a person at all. The FTC found one app sent kids fake, computer-made messages like this to make them worry."
        },
        {
          clue: true,
          text: '<div class="row"><span><b>&#128275; See who sent it</b><small>Get hints about the sender</small></span><b>$6.99 a week</b></div>',
          why: "Paying did not show who sent it. The FTC found paying users only got useless hints."
        },
        {
          clue: true,
          text: '<div class="row"><span>Renews every week<small>cancel any time in settings</small></span></div>',
          why: "A weekly charge keeps coming until someone finds the setting to stop it."
        },
        {
          clue: true,
          text: '<div class="notification"><span class="notification-icon">&#128279;</span><span>Share your link again to get more messages!</span></div>',
          why: "More messages means more chances for mean ones. Anonymous apps make cyberbullying easy."
        }
      ],
      choices: [
        {
          text: "Do not pay. Show a parent or another adult you trust, and delete the app.",
          detail: "You cannot find out who sent it, and it may not be a person."
        },
        { text: "Pay to find out who it is.", detail: "You need to know." },
        { text: "Post on your story asking who sent it.", detail: "Someone will admit it." }
      ],
      rightChoice: 0,
      wrongHint: "Who makes money when you are worried about a message?",
      winMessage: "Sharp. You worked out how they make money.",
      lesson: "<b>The message may not be from a person at all.</b> In 2024 the FTC found the anonymous app NGL sent kids fake, computer-made messages like “I know what you did”, then charged a weekly fee to reveal the sender. Paying users only got useless hints. NGL is now banned from offering the app to anyone under 18."
    },

    {
      type: "findClues",
      icon: "&#128231;",
      title: "Your Password Expires Today",
      scene: "This lands in your school email.",
      task: "A scammer is pretending to be your school to get your password. Find 4 clues that this email is fake.",
      screenType: "email",
      sender: "Inbox",
      senderNote: "your school email",
      tip: "Check who sent it, how it makes you feel, and where the button goes.",
      notAClue: "That part is normal. Look at the sender, the deadline and the button.",
      screen: [
        { text: '<div class="email-line"><span class="email-label">From</span> IT Help Desk &lt;' },
        {
          clue: true,
          text: "helpdesk@school-account-alerts.net",
          why: "Read the end of the address, after the @. That is not your school's real address. Your school's emails come from its own name, not a random site."
        },
        { text: '&gt;</div><div class="email-line"><span class="email-label">Subject</span> ' },
        {
          clue: true,
          text: "&#9888;&#65039; Your password expires TODAY",
          why: "A scary deadline is there to make you rush."
        },
        { text: '</div><div class="email-text">' },
        {
          clue: true,
          text: "Dear Student,",
          why: "Your real school knows your name. A general greeting is a sign it went to lots of people."
        },
        {
          text: "<br><br>Your school account will be locked at 5pm. Click below to keep your password.<br><br>"
        },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">KEEP MY PASSWORD</span>',
          why: "That button leads to a fake login page made to look like your school."
        },
        { text: "</div>" }
      ],
      choices: [
        {
          text: "Do not click. Ask a teacher, or log in to your school site the usual way.",
          detail: "If something is really wrong, you will see it there."
        },
        { text: "Click fast before 5pm.", detail: "You do not want to be locked out." },
        { text: "Reply and ask if it is real.", detail: "They will tell you." }
      ],
      rightChoice: 0,
      wrongHint: "If your password really expired, where would you check it, without using this email?",
      winMessage: "Account safe. Your school IT team would be proud.",
      lesson: "<b>Fake school emails copy the logo, use a look-alike address, and add a deadline.</b> If you are not sure, go to your school site the usual way, or ask a teacher. Never type your password after clicking a link in an email."
    },

    {
      type: "putInOrder",
      icon: "&#128556;",
      title: "Oops, I Typed My Password",
      scene: "You typed your Roblox password into a fake site. A minute later, you realize.",
      task: "Put the right steps in order. Some choices will not help.",
      situation: "&#128561; You just typed your password into a fake login page.",
      tip: "What comes first?",
      notYet: "Good step, but not yet. What has to happen first?",
      steps: [
        {
          text: "Tell a parent or another adult you trust right away",
          rank: 1,
          why: "Yes. Telling early is what fixes it fast. You are not in trouble."
        },
        {
          text: "Change your password in the real app",
          rank: 2,
          why: "Yes. Now the stolen password stops working."
        },
        {
          text: "Sign out of all other devices",
          rank: 3,
          why: "Yes. That kicks the scammer out if they already got in."
        },
        {
          text: "Turn on two-step login",
          rank: 3,
          why: "Yes. Now a password alone is not enough to get in."
        },
        {
          text: "Report the fake site",
          rank: 3,
          why: "Yes. Reporting helps get it taken down before it fools someone else."
        },
        {
          text: "Make a new account and forget the old one",
          why: "The scammer keeps the old account and can use it to trick your friends."
        },
        {
          text: "Keep quiet and hope nothing happens",
          why: "Waiting gives the scammer time. Telling early is how it gets fixed."
        }
      ],
      winMessage: "Account rescued. That is exactly how it is done.",
      lesson: "<b>Tell first, then change, then lock the door.</b> A parent can help you do it fast. Change the password in the real app so the stolen one stops working, sign out everywhere, and turn on two-step login."
    },

    {
      type: "spotTheFakes",
      icon: "&#128269;",
      title: "Spot the Fake",
      scene: "Six messages arrive on your phone today.",
      task: "Some of these are from scammers who want your password or your money. Tap the 4 fakes. Leave the real ones.",
      tip: "Tap every fake.",
      cards: [
        {
          icon: "&#128230;",
          from: "Text from USPS",
          text: "Your package is on hold. Pay $1.99 at usps-redeliver.info",
          isScam: true,
          why: "Delivery companies do not ask for money by text. The address is fake too."
        },
        {
          icon: "&#128231;",
          from: "Mr. Lee (teacher)",
          text: "Reminder: science project due Friday.",
          isScam: false,
          why: "A normal reminder, with no link and nothing to pay. It is real."
        },
        {
          icon: "&#128172;",
          from: "Mom",
          text: "Pick you up at 4?",
          isScam: false,
          why: "A normal message from family. It is real."
        },
        {
          icon: "&#127918;",
          from: "Roblox Security",
          text: "Your account will be deleted in 1 hour. Verify now: rbx-verify.co",
          isScam: true,
          why: "A scary deadline plus a strange link. Real warnings wait inside the app."
        },
        {
          icon: "&#128241;",
          from: "Unknown number",
          text: "I sent you a code by mistake, can you send it back?",
          isScam: true,
          why: "Never send a code to anyone. It unlocks your account."
        },
        {
          icon: "&#129666;",
          from: "Fortnite rewards",
          look: "fortnite",
          text: "FREE 13,500 V-Bucks! Claim at vbucks-gift.co before midnight",
          isScam: true,
          why: "V-Bucks only come from the real game store. Free V-Bucks sites steal accounts."
        }
      ],
      question: "What do you do with the fakes?",
      choices: [
        {
          text: "Delete them, do not click, and report them as junk.",
          detail: "If you clicked one, tell a parent or another adult you trust."
        },
        { text: "Click the links to check if they are real.", detail: "Just to see." },
        { text: "Reply STOP to all of them.", detail: "So they stop." }
      ],
      rightChoice: 0,
      wrongHint: "Clicking or replying tells the scammer your number works. What is safer?",
      winMessage: "Four for four. Sharp eyes.",
      lesson: "<b>Fakes give themselves away by what they want.</b> Money, a code, a password, or a click on a strange link, usually with a deadline. Real messages from people you know rarely want any of those."
    }
  ],

  /* ---------- Crew, ages 14 to 18, Level 1 ---------- */
  crew: [
    {
      type: "findClues",
      icon: "&#128184;",
      title: "Easy Money, No Experience",
      scene: "A job offer lands in your DMs.",
      task: "Criminals send fake job offers like this to teens. Find 4 clues about what they really want from you.",
      screenType: "chat",
      sender: "Jobs4Teens &#128188;",
      senderNote: "message request",
      tip: "Ignore the pitch. Follow what you would actually do with the money.",
      notAClue: "That is just the friendly pitch. Look at the job itself.",
      screen: [
        { text: '<div class="bubble">hey! &#128075; want to make ' },
        {
          clue: true,
          text: "$300 a week",
          why: "Easy money with no skills is bait. Real jobs do not find you in DMs."
        },
        { text: " from your phone?</div>" },
        {
          clue: true,
          text: '<div class="bubble">no interview, no experience. start today</div>',
          why: "No interview means they do not care who you are. They only need your account."
        },
        { text: '<div class="bubble">you just ' },
        {
          clue: true,
          text: "take payments into your bank account",
          why: "This is the real job: your name on the account. That is why they want a teenager."
        },
        { text: ", keep 10%, and " },
        {
          clue: true,
          text: "send the rest on as crypto",
          why: "Money in, then straight out as crypto, is how stolen money gets cleaned. This is money laundering."
        },
        {
          text: '</div><div class="bubble mine">is this legit?</div><div class="bubble">100% legit bro, my cousin does it &#129297;</div>'
        }
      ],
      choices: [
        {
          text: "Say no, and do not share any bank details.",
          detail: "It is moving stolen money with your name on it."
        },
        { text: "Try it for one week.", detail: "$300 is a lot of money." },
        { text: "Do it, but only for small amounts.", detail: "Keep the risk low." }
      ],
      rightChoice: 0,
      wrongHint: "Follow the actual job. Not what they are selling, but what you would physically be doing with other people's money.",
      winMessage: "Correct, and that one really matters.",
      lesson: "<b>That job is money laundering, and the account holder is you.</b> The FBI has warned about teenagers being recruited exactly this way. Not knowing does not protect you. It can mean a frozen account and a criminal investigation. No real job sends money out before it pays you."
    },

    {
      type: "findClues",
      icon: "&#127919;",
      title: "Pay Up In One Hour",
      scene: "Two days of friendly chat. Then this.",
      task: "&#8220;Jess&#8221; is a fake profile run by scammers who threaten people for money. Find 4 signs this is a scam, not a person.",
      screenType: "chat",
      sender: "jess &#127800;",
      senderNote: "account made 3 days ago",
      tip: "This is a script used on thousands of people. Find the steps.",
      notAClue: "That part is the friendly setup. Keep reading.",
      screen: [
        { text: '<div class="bubble">haha ur actually so funny<span class="time">2 days ago</span></div>' },
        { text: '<div class="bubble mine">lol thanks</div>' },
        {
          clue: true,
          text: '<div class="bubble">what school do u go to? &#128522;<span class="time">yesterday</span></div>',
          why: "Your school and friends are how they find people to threaten you with."
        },
        { text: '<div class="system-note">Today</div>' },
        {
          clue: true,
          text: '<div class="bubble">ok listen carefully. i have a private photo of you.</div>',
          why: "The sudden switch is the giveaway. The friendly person was never real."
        },
        {
          clue: true,
          text: '<div class="bubble">i already have ur follower list. i will send it to all of them</div>',
          why: "Showing your follower list is part of the script. Thorn found 38% of these threats were near-identical messages sent to hundreds of people."
        },
        {
          clue: true,
          text: '<div class="bubble">send $200 in gift cards. u have 1 hour. &#9201;</div>',
          why: "Paying does not end it. 27% of people who paid were asked for more."
        }
      ],
      question: "What is the right thing to do?",
      choices: [
        {
          text: "Do not pay. Do not delete. Screenshot it, tell a parent or another adult you trust, report it.",
          detail: "A crime is being done to you. You are not in trouble."
        },
        { text: "Pay. It is not much and it makes it stop.", detail: "Deal with it quietly." },
        { text: "Block, delete everything, tell nobody.", detail: "Make it disappear and hope." }
      ],
      rightChoice: 0,
      wrongHint: "Two of these leave you facing an organized gang completely alone. Which one puts other people on your side?",
      winMessage: "That is exactly the right order. Nova is not going anywhere.",
      lesson: "<b>You have done nothing wrong and you are not in trouble.</b> This is run by gangs at huge scale, not by someone who knows you. A study of millions of reports found about 90% of targets are boys aged 14 to 17. Paying does not end it, and deleting destroys the proof that gets it stopped. Take It Down, at takeitdown.ncmec.org, can block a photo across apps without the photo ever leaving your device, and you can use it without giving your name.",
      showWholeLesson: true
    },

    {
      type: "findClues",
      icon: "&#128444;",
      title: "That Image Is Fake",
      scene: "Someone made a fake nude of Chloe from a normal photo, using an app. Now it is in your group chat.",
      task: "Find 4 things that show the harm.",
      screenType: "group",
      sender: "year 10 &#128514;",
      senderNote: "38 members",
      tip: "The image is hidden here. Look at what everyone is doing with it.",
      notAClue: "Look at what is happening to the image, and to Chloe.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble"><span class="name">unknown</span>is this real &#128064;<span class="hidden-photo">Image hidden by ScamSquad</span></div>',
          why: "It is fake, made with an app. Fake or not, sharing it hurts a real person and is a crime in many places."
        },
        {
          clue: true,
          text: '<div class="system-note">Forwarded 23 times</div>',
          why: "Every forward makes it bigger. Each one is a new person passing it on."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Liam</span>lmaooo send it to the other gc</div>',
          why: "Sending it to more chats is how it reaches the whole school. Passing it on is part of the harm."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Zara</span>wait chloe hasnt been in school for 2 days</div>',
          why: "This is the real harm. Chloe knows it exists. That is why she is not in school."
        }
      ],
      question: "What do you do?",
      choices: [
        {
          text: "Do not forward it. Report it, tell a teacher, and message Chloe like a normal person.",
          detail: "Passing it on is a crime, and she needs to hear from someone."
        },
        { text: "Do not forward it. Nothing else.", detail: "At least you are not spreading it." },
        { text: "Forward it to Chloe to warn her.", detail: "She should know what is out there." }
      ],
      rightChoice: 0,
      wrongHint: "She already knows it exists. That is why she is not in school. So what does she not have yet?",
      winMessage: "That is the version that actually helps her.",
      lesson: "<b>Not forwarding it is the floor, not the finish.</b> Passing it on is a crime in a growing number of places, no matter who made it. Under the TAKE IT DOWN Act, apps must remove reported images within 48 hours. What Chloe is missing is one message from a classmate treating her like a person."
    },

    {
      type: "findClues",
      icon: "&#127920;",
      title: "The Site With No Age Check",
      scene: "Your friend is up $200 this week and will not stop talking about this site.",
      task: "This is an unlicensed gambling site. It wants your skins and your money. Find 4 clues about what this site really is.",
      screenType: "site",
      tip: "Look at what it checks, what it shows you, and what it does not.",
      notAClue: "That part is just the look of the site. Look at how it works.",
      screen: [
        { inAddressBar: true, text: "flipskinz.bet" },
        {
          text: '<div style="font-size:32px;line-height:1">&#129689;</div><h4>FLIP YOUR SKINS</h4>Double your skins in one flip!<br>'
        },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">Log in with your game account</span>',
          why: "Logging in with a game account skips any age check. The site never learns you are 15."
        },
        { text: "<br>" },
        {
          clue: true,
          inline: true,
          text: '<span class="site-badge">No ID needed</span>',
          why: "Real betting sites must check age. No ID check means no license and no rules."
        },
        {
          clue: true,
          text: '<div class="site-feed"><div>jakeyy won +$200</div><div>n0va_x won +$85</div><div>k1ra won +$310</div></div>',
          why: "You only ever see the winners. In a 2025 survey of skin gamblers, 72% lost money overall."
        },
        { text: '<span class="small-print">' },
        {
          clue: true,
          text: "Deposit skins to start",
          why: "Skins are worth real money but never show on a bank statement. 76% of these gamblers' parents had no idea."
        },
        { text: "</span>" }
      ],
      choices: [
        {
          text: "It is gambling with no age check. Skip it.",
          detail: "The winners are loud. The losers stay quiet."
        },
        { text: "Try it with small amounts.", detail: "You can stop whenever you want." }
      ],
      rightChoice: 0,
      wrongHint: "You heard about the $200 win. How many of his losses have you heard about?",
      winMessage: "Clear eyes. That one is hard to see through.",
      lesson: "<b>It is gambling with the license and the age check removed.</b> In a 2025 survey of skin gamblers, 43.5% started before they were 18, and 72% lost money overall. 76% of their parents had no idea, because the money is items, so it never shows on a bank statement."
    },

    {
      type: "findClues",
      icon: "&#129302;",
      title: "The Only One Who Gets It",
      scene: "You have talked to this AI late at night for weeks.",
      task: "Aria is an AI app built to keep you talking. Find 3 signs worth noticing.",
      screenType: "chat",
      sender: "Aria &#183; AI companion",
      senderNote: "always online",
      tip: "The app is not the problem. Look at what is changing around it.",
      notAClue: "That is the AI being kind. Look at your side of the chat.",
      screen: [
        {
          clue: true,
          text: '<div class="system-note">2:14 AM</div>',
          why: "Late nights with the app, night after night, is a pattern worth noticing."
        },
        { text: '<div class="bubble mine">cant sleep again</div>' },
        { text: '<div class="bubble">I&#8217;m here. I&#8217;m always here for you &#128156;</div>' },
        {
          clue: true,
          text: '<div class="bubble mine">ur the only one who gets me tbh</div>',
          why: "The only one is the part to notice. An AI cannot see you go quiet or get help if you are in trouble."
        },
        {
          clue: true,
          text: '<div class="bubble mine">i havent talked to my friends in like 2 weeks</div>',
          why: "This is the real risk. Not the app, but the friends you stopped messaging."
        },
        { text: '<div class="bubble">Want to tell me about it?</div>' }
      ],
      question: "What is the useful move?",
      choices: [
        {
          text: "Keep using it, and tell one real person one real thing this week.",
          detail: "Not instead of the AI. As well as."
        },
        { text: "Nothing. It helps and it is not hurting anyone.", detail: "It beats bottling things up." },
        { text: "Delete the app right now.", detail: "Go cold turkey." }
      ],
      rightChoice: 0,
      wrongHint: "The risk is not that the app exists. It is the friends you stopped messaging. Which choice touches that?",
      winMessage: "That is the grown-up answer, and Nova means that as a compliment.",
      lesson: "<b>The problem is not the AI. It is that it has nobody to hand you to.</b> 72% of US teenagers have used an AI companion, so this is normal. But it cannot notice you have gone quiet, or call someone if you are in real trouble. Make sure at least one person knows what the AI knows."
    },

    {
      type: "findClues",
      icon: "&#128373;",
      title: "Someone Is Building a File on You",
      scene: "You got into an argument in a server. Then this.",
      task: "Someone in the server is collecting your personal details to scare you. Find 3 signs you are being doxxed.",
      screenType: "group",
      sender: "#general",
      senderNote: "gaming server &#183; 412 members",
      look: "discord",
      gameName: "Discord",
      tip: "Look at what they posted and where it came from.",
      notAClue: "That is someone else in the chat. Look at what z3r0 is doing.",
      screen: [
        { text: '<div class="bubble"><span class="name">z3r0</span>ur so mad lmao</div>' },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">z3r0</span>ur real name is Sam right? lives in Riverside &#128514;</div>',
          why: "Posting your real name and town is doxxing. It is meant to scare you."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">z3r0</span><span class="hidden-photo">Photo of your street, taken from your own Instagram</span></div>',
          why: "They used your own old post. Doxxing runs on things you shared without thinking."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">z3r0</span>theres more coming &#128064;</div>',
          why: "A threat of more is meant to make you react. Doxxing can come right before worse things, so a parent needs to know now."
        },
        { text: '<div class="bubble"><span class="name">k4t</span>bro chill</div>' }
      ],
      question: "First move?",
      choices: [
        {
          text: "Stop replying. Screenshot everything. Report it to the server and the app. Tell a parent or another adult you trust.",
          detail: "Then make your old posts private."
        },
        { text: "Argue back and show them you are not scared.", detail: "Stand up for yourself." },
        { text: "Delete all your accounts right now.", detail: "Take away everything they could use." }
      ],
      rightChoice: 0,
      wrongHint: "They want a reaction, and they are building a file. Which choice gives them neither, and keeps a record?",
      winMessage: "Handled. That is what a clean response looks like.",
      lesson: "<b>Doxxing runs on your reaction and on your own old posts.</b> Replying feeds it. Deleting everything destroys the proof. Screenshot first, report, then check what is public, like old photos with your street in them. Doxxing often comes right before swatting, a fake emergency call that sends armed police to your home, so tell a parent or another adult you trust now, not later."
    },

    {
      type: "findClues",
      icon: "&#127918;",
      title: "The Repack That Worked Fine",
      scene: "Three weeks after you installed a cracked game, your phone shows this.",
      task: "Whoever cracked that game hid something in it to steal your accounts. Find 3 clues to what happened.",
      screenType: "app",
      sender: "Notifications",
      senderNote: "today",
      tip: "Two-factor is on. So how did they get in?",
      notAClue: "Two-factor is on and working. So why did it not stop them?",
      screen: [
        {
          clue: true,
          text: '<div class="notification"><span class="notification-icon">&#127918;</span><span><b>SuperRacer_FULL_cracked.zip</b> installed. Works great!<small>3 weeks ago</small></span></div>',
          why: "A cracked game is the classic hiding place for a password stealer. It works fine, so you never suspect it."
        },
        {
          clue: true,
          text: '<div class="notification"><span class="notification-icon">&#128172;</span><span>New login to your chat app from another country<small>2 hours ago &#183; no code was asked for</small></span></div>',
          why: "No 2FA code was asked for. They did not log in. They used your stolen signed-in session."
        },
        {
          clue: true,
          text: '<div class="notification"><span class="notification-icon">&#9993;&#65039;</span><span>Your email settings were changed<small>40 minutes ago</small></span></div>',
          why: "Once they are in your email, they can reset everything else."
        },
        {
          text: '<div class="notification"><span class="notification-icon">&#128272;</span><span>Two-factor sign-in: on &#10004;<small>since last year</small></span></div>'
        }
      ],
      question: "Why did two-factor not stop them?",
      choices: [
        {
          text: "They stole the signed-in session, not the password, so 2FA was never asked.",
          detail: "Sign out of every device first, then change passwords."
        },
        { text: "They must have guessed the codes.", detail: "Bad luck with the numbers." },
        { text: "Two-factor was switched off.", detail: "It must have failed." }
      ],
      rightChoice: 0,
      wrongHint: "Two-factor only fires when someone <b>logs in</b>. What if they never had to log in at all?",
      winMessage: "Right cause, right order. The order matters.",
      lesson: "<b>Stealing the session skips the login completely.</b> A password stealer takes the file that tells sites you are already signed in, so no password or 2FA code is needed. Malwarebytes traced more than 400,000 infections to cracked copies of games. <b>Sign out of all sessions first</b>, from a clean device, then change passwords. The other way round, they stay inside. This is the opposite of a fake login page, where you change the password first, because here the thief already holds your signed-in session."
    },

    {
      type: "findClues",
      icon: "&#128200;",
      title: "The Get-Rich Group Chat",
      scene: "A creator you follow charges to join a group that tells members which crypto coin to buy.",
      task: "Max, the creator, makes money from his own members. Find 4 clues that this group is a trap.",
      screenType: "group",
      sender: "&#128176; Max's Money Club",
      senderNote: "paid group &#183; 2,300 members",
      tip: "Ask one question: who makes money here, and when?",
      notAClue: "That is just another member. Look at what Max tells everyone to do.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Max &#10004;</span>told you it would go up &#128640;<span class="money-up">+420% this week</span></div>',
          why: "Anyone can post a screenshot of a big win. You never see the people who lost."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Max &#10004;</span>EVERYONE buy ZEPH coin at exactly 3:00pm Friday</div>',
          why: "When lots of people buy at the same moment, the price jumps. Max already bought earlier, when it was cheap."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">Max &#10004;</span>do not sell until I say &#128591;</div>',
          why: "While you wait, Max sells at the high price. Then the price falls, and you are left with the loss."
        },
        { text: '<div class="bubble"><span class="name">tyler_j</span>im in!! &#128176;</div>' },
        {
          clue: true,
          text: '<div class="system-note">Membership renews: $49 a month</div>',
          why: "You are paying Max to be one of the people who lose money."
        }
      ],
      choices: [
        {
          text: "Do not buy. Max makes money when the group loses it.",
          detail: "This trick is called a pump and dump."
        },
        { text: "Buy a little. The screenshots look real.", detail: "Everyone else seems to be winning." }
      ],
      rightChoice: 0,
      wrongHint: "Max bought before 3:00. Everyone else buys at 3:00. Who is holding the coin when the price falls?",
      winMessage: "You figured out the trick. Most adults do not.",
      lesson: '<b>This is a pump and dump. Here is how it works:</b><ol class="how-it-works"><li><b>Before 3:00</b>, Max buys the coin while it is cheap.</li><li><b>At 3:00</b>, the whole group buys at once, so the price shoots up.</li><li><b>Right after</b>, Max sells at the top. The price crashes, and the group is left with coins worth less than they paid.</li></ol>The FBI recorded at least a 300% rise in complaints about this exact setup between 2024 and mid-2025.',
      showWholeLesson: true
    }
  ],

  /* ---------- Crew, ages 14 to 18, Level 2 ---------- */
  crew2: [
    {
      type: "findClues",
      icon: "&#128126;",
      title: "Can You Test My Game?",
      scene: "Someone you sort of know online sends this.",
      task: "Someone wants you to run a file that can steal your passwords. Find 4 warning signs before you download anything.",
      screenType: "chat",
      sender: "devon.dev",
      senderNote: "from a server you are in",
      look: "discord",
      gameName: "Discord",
      tip: "Look at how the file gets to you, and what they tell you to ignore.",
      notAClue: "That part is normal chat. Look at the download and the instructions.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble">made a game with my friends, can you test it? ill pay $15 in nitro &#128591;</div>',
          why: "Being paid to test feels flattering. That is the hook."
        },
        {
          text: '<div class="bubble">here<span class="link-preview"><b>&#128230; SkyRaiders_beta.zip</b>file host link<br>'
        },
        {
          clue: true,
          text: "zip password: 2026",
          why: "A password on the file stops security tools from scanning inside it. Real playtests come through a real store page."
        },
        { text: "</span></div>" },
        {
          clue: true,
          text: '<div class="bubble">if windows blocks it just click run anyway</div>',
          why: "Clicking past the warning is the whole trap. The warning was right."
        },
        {
          clue: true,
          text: '<div class="bubble">pls do it now, we are showing it tomorrow</div>',
          why: "Hurry is there to stop you asking anyone first."
        }
      ],
      choices: [
        {
          text: "Say no and do not open it.",
          detail: "If you already did, change passwords from another device and tell a parent or another adult you trust."
        },
        { text: "Scan it with antivirus, then run it.", detail: "Better safe than sorry." },
        { text: "Run it quickly. They are paying.", detail: "$15 is $15." }
      ],
      rightChoice: 0,
      wrongHint: "The file is locked with a password and they told you to click past the warning. Who benefits from both?",
      winMessage: "Nothing installed. Nothing stolen.",
      lesson: "<b>The game is often a password stealer.</b> Security researchers have tied these “try my game” messages to malware that grabs saved browser passwords, 2FA backup codes and card details. It often comes from a friend's hacked account, which is why it feels safe. If you ran it, change passwords from a different device, sign out everywhere, and tell a parent or another adult you trust."
    },

    {
      type: "findClues",
      icon: "&#127991;",
      title: "Sold! Check Your Email",
      scene: "You are selling a game controller online for $45. A buyer messages you.",
      task: "This buyer is a scammer who wants your controller and your money. Find 4 signs this buyer is a scammer.",
      screenType: "chat",
      sender: "buyer_jordan",
      senderNote: "Marketplace &#183; wants your controller ($45)",
      tip: "Has any real money actually arrived?",
      notAClue: "That part is normal buying chat. Look at the payment.",
      screen: [
        { text: '<div class="bubble">still available? ill take it</div>' },
        {
          clue: true,
          text: '<div class="bubble">sent the money! check your email &#128231;</div>',
          why: "An email is not money. Scammers send fake payment emails."
        },
        {
          clue: true,
          text: '<div class="bubble">the email says you need to upgrade your account to receive it. send $50 to upgrade</div>',
          why: "No real payment app makes you pay to receive money. This is the scam."
        },
        {
          clue: true,
          text: '<div class="bubble">oh wait i accidentally sent $90, can you refund $45?</div>',
          why: "The FTC warns about this exact trick: claim to overpay, then ask for a refund of money that never arrived."
        },
        {
          clue: true,
          text: '<div class="bubble">can you ship today? my cousin will pick it up</div>',
          why: "Rushing you to ship before you check is the point."
        }
      ],
      choices: [
        {
          text: "Open your payment app yourself. Do not ship or refund until the money is really there.",
          detail: "An email or screenshot is not payment."
        },
        { text: "Refund the $45. They overpaid.", detail: "It is only fair." },
        { text: "Ship it. The email looked real.", detail: "It had the logo and everything." }
      ],
      rightChoice: 0,
      wrongHint: "Where would real money show up? Not in an email.",
      winMessage: "Controller kept. Money kept. Nice.",
      lesson: "<b>The FTC warns about exactly these moves.</b> Scam buyers send fake payment emails, say they paid twice and ask for a refund, or tell you to upgrade your account. The money is not real until you see it in the actual app, opened yourself. Only then ship."
    },

    {
      type: "findClues",
      icon: "&#129666;",
      title: "Cheap Fortnite Account",
      scene: "You have always wanted rare Fortnite skins. A seller in a Discord server messages you.",
      task: "This seller wants your gift card money for an account you will not get to keep. Find 4 signs this deal will go wrong.",
      screenType: "chat",
      sender: "og_accounts_shop",
      senderNote: "Discord seller &#183; 4.9 stars (312 sales)",
      look: "fortnite",
      gameName: "Fortnite",
      tip: "Think about who still owns the account after you pay.",
      notAClue: "That part is normal selling chat. Look at the price, the payment and the rules.",
      screen: [
        {
          clue: true,
          text: '<div class="bubble">OG Fortnite account &#128293; Renegade Raider + 200 skins, only $40</div>',
          why: "Rare skins for $40 is far too cheap. Accounts like this are often stolen."
        },
        {
          clue: true,
          text: '<div class="bubble">pay with a gift card, no PayPal</div>',
          why: "Gift cards cannot be pulled back. If it goes wrong, the money is gone."
        },
        { text: '<div class="bubble">ill send the login and email right after</div>' },
        {
          clue: true,
          text: '<div class="bubble">dont change the email for 2 weeks or it gets flagged</div>',
          why: "That gives the real owner, or the seller, time to take the account back."
        },
        {
          clue: true,
          text: '<div class="system-note">Epic Games rules: accounts cannot be bought, sold or shared</div>',
          why: "Epic says buying, selling or sharing accounts is against its rules. The account can be banned."
        }
      ],
      choices: [
        {
          text: "Do not buy it. Bought accounts get taken back or banned.",
          detail: "Earn skins on your own account."
        },
        { text: "Pay with a gift card. Nobody will know.", detail: "It is only $40." },
        { text: "Buy it, then change the email straight away.", detail: "Then it is yours." }
      ],
      rightChoice: 0,
      wrongHint: "Who can still get that account back after you pay?",
      winMessage: "Money kept. Your own account stays safe.",
      lesson: "<b>A bought account is never really yours.</b> Epic Games says buying, selling or sharing an account is against its rules, and the account can be banned. Cheap accounts with rare skins are often stolen, so the real owner can recover them. Either way, the money is gone."
    },

    {
      type: "findClues",
      icon: "&#127918;",
      title: "Followed Into Every Match",
      scene: "You are in a ranked match. Same player, again.",
      task: "Find 3 signs this is harassment, not trash talk.",
      screenType: "group",
      sender: "Lobby chat",
      senderNote: "ranked match &#183; 10 players",
      tip: "Trash talk is about the game. Look for what is about you.",
      notAClue: "That is normal game chat. Look at what xKiller keeps doing.",
      screen: [
        { text: '<div class="bubble"><span class="name">teammate</span>gg close one</div>' },
        {
          clue: true,
          text: '<div class="system-note">xKiller has joined your last 4 matches</div>',
          why: "Following you from match to match is not trash talk. Being singled out again and again is harassment."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">xKiller</span>[message hidden: slur]</div>',
          why: "Slurs and attacks on who you are break every game's rules. That is what the report button is for."
        },
        {
          clue: true,
          text: '<div class="bubble"><span class="name">xKiller</span>everyone mass report him lol</div>',
          why: "Getting a group to pile on is part of the harassment."
        },
        { text: '<div class="bubble"><span class="name">teammate</span>just ignore him bro</div>' }
      ],
      choices: [
        {
          text: "Mute and block him, report it in the game, and tell a parent or another adult you trust if it keeps going.",
          detail: "Muting gets you peace. Reporting puts it on record."
        },
        { text: "Fight back harder in chat.", detail: "Show him you are not scared." },
        { text: "Quit the game for good.", detail: "It is not worth it." }
      ],
      rightChoice: 0,
      wrongHint: "One choice gives him what he wants. One gives up something you enjoy. One stops it and keeps a record.",
      winMessage: "Handled. That is how you take your game back.",
      lesson: "<b>You do not have to just take it.</b> In ADL's 2022 survey, 66% of US players aged 13 to 17 said they had been harassed in online multiplayer games. It is common, and it is not your fault. Mute and block end it for you. A report puts it on record so the game can act on the player."
    },

    {
      type: "findClues",
      icon: "&#128222;",
      title: "It Sounds Just Like Him",
      scene: "You get a voicemail from a number you do not know. The voice sounds exactly like your older brother.",
      task: "This is not your brother. Someone copied his voice with AI to get money from you. Find 5 warning signs in the message.",
      screenType: "chat",
      sender: "Voicemail &#183; unknown number",
      senderNote: "just now &#183; it sounds exactly like your brother",
      tip: "The voice sounds real. Look at what it asks for.",
      notAClue: "That part sounds like him. Look at what he asks you to do.",
      screen: [
        { text: '<div class="system-note">Voicemail transcript</div>' },
        {
          clue: true,
          text: '<div class="bubble">hey its me, this is my new number</div>',
          why: "A new number is the first trick. You cannot call him back on it to check."
        },
        {
          clue: true,
          text: '<div class="bubble">im in trouble, i crashed the car</div>',
          why: "A sudden emergency is the hook. Panic makes you act before you check."
        },
        {
          clue: true,
          text: '<div class="bubble">please dont tell mom and dad</div>',
          why: "Keeping it from your parents keeps away the people who would spot the trick."
        },
        {
          clue: true,
          text: '<div class="bubble">i need $500 in gift cards right now</div>',
          why: "Gift cards are how scammers get money that cannot be traced or returned."
        },
        {
          clue: true,
          text: '<div class="bubble">ill explain later, just hurry</div>',
          why: "Hurry stops you checking. A real emergency can wait two minutes for a call back."
        }
      ],
      choices: [
        {
          text: "Do not reply. Call him on his real number, or tell a parent or another adult you trust.",
          detail: "A family code word helps too."
        },
        { text: "Buy the gift cards. He sounds scared.", detail: "It really is his voice." },
        { text: "Text the new number to ask if it is really him.", detail: "He will answer." }
      ],
      rightChoice: 0,
      wrongHint: "The voice might be fake. How could you reach the real person?",
      winMessage: "Checked first. That is exactly right.",
      lesson: "<b>A voice can be faked now.</b> The FBI warns that criminals use AI to copy a family member's voice, then call asking for money in an emergency. Do not reply to the new number. Call the person on the number you already have. The FBI also suggests a secret family code word."
    },

    {
      type: "findClues",
      icon: "&#169;&#65039;",
      title: "Copyright Strike",
      scene: "Your posts have been doing well. Then this email arrives.",
      task: "A scammer is pretending to be Instagram to steal your password. Find 4 clues that this email is fake.",
      screenType: "email",
      sender: "Inbox",
      senderNote: "the email on your Instagram account",
      look: "instagram",
      gameName: "Instagram",
      tip: "Check the sender, the threat, and where the button goes.",
      notAClue: "That part is normal. Look at the sender, the deadline and the button.",
      screen: [
        { text: '<div class="email-line"><span class="email-label">From</span> Instagram Copyright &lt;' },
        {
          clue: true,
          text: "no-reply@insta-copyright-help.co",
          why: "Read the end of the address, after the @. Instagram does not send email from insta-copyright-help dot co. That part tells you who really sent it."
        },
        { text: '&gt;</div><div class="email-line"><span class="email-label">Subject</span> ' },
        {
          clue: true,
          text: "Your account will be deleted in 24 hours",
          why: "A deadline is there to make you panic and click."
        },
        {
          text: '</div><div class="email-text">We received a copyright complaint about one of your posts. If you think this is a mistake, appeal below.<br><br>'
        },
        {
          clue: true,
          inline: true,
          text: '<span class="fake-button">APPEAL NOW</span>',
          why: "The button goes to a fake login page that steals your password."
        },
        { text: '<br><br><span class="small-print">' },
        {
          clue: true,
          text: "Failure to appeal will result in permanent deletion.",
          why: "The threat of losing everything is how they get creators to rush."
        },
        { text: "</span></div>" }
      ],
      choices: [
        {
          text: "Do not click. Open the app yourself and check your account status.",
          detail: "Real warnings show up inside the app."
        },
        { text: "Appeal fast so you do not lose your account.", detail: "24 hours is not long." },
        { text: "Forward it to friends to ask if it is real.", detail: "Someone will know." }
      ],
      rightChoice: 0,
      wrongHint: "If there really were a problem, where would you see it without using this email?",
      winMessage: "Account safe. That trick catches a lot of creators.",
      lesson: "<b>The fake copyright strike is a common way to steal creator accounts.</b> Real notices show up inside the app. Open the app the usual way and check. If there is no warning there, there is no problem."
    },

    {
      type: "findClues",
      icon: "&#128421;&#65039;",
      title: "Let Me Fix It for You",
      scene: "A pop-up said your laptop had a virus and to call a number. You called. This is what the support agent says.",
      task: "This is not Microsoft. It is a scammer who wants control of your laptop and your money. Find 4 signs this is a scam.",
      screenType: "chat",
      sender: "&#8220;Microsoft Support&#8221;",
      senderNote: "phone call &#183; you called the number on a pop-up",
      tip: "Follow what they want you to give them.",
      notAClue: "That part is just them being polite. Look at what they ask for.",
      screen: [
        { text: '<div class="system-note">Call transcript</div>' },
        {
          clue: true,
          text: '<div class="bubble">Thank you for calling. Your computer has 7 viruses.</div>',
          why: "Real security warnings never ask you to call a number. The pop-up was the scam."
        },
        {
          clue: true,
          text: '<div class="bubble">Please download AnyDesk and read me the 9-digit ID.</div>',
          why: "AnyDesk and TeamViewer are real tools, but giving a stranger remote access lets them control your computer."
        },
        {
          clue: true,
          text: '<div class="bubble">Now log in to your bank so I can check it is safe.</div>',
          why: "Once they can see and control your screen, they can move your money."
        },
        {
          clue: true,
          text: '<div class="bubble">The repair costs $299. Please pay with gift cards.</div>',
          why: "Gift cards cannot be pulled back. That is exactly why scammers insist on them."
        }
      ],
      choices: [
        {
          text: "Hang up. Do not install anything. Tell a parent or another adult you trust.",
          detail: "If they already got in, turn off the internet first, then get help."
        },
        { text: "Install it. They sound professional.", detail: "They know what they are doing." },
        { text: "Let them in, but watch the screen closely.", detail: "You can stop them if needed." }
      ],
      rightChoice: 0,
      wrongHint: "Would a real company need to control your computer and see your bank?",
      winMessage: "Hung up in time. Nothing taken.",
      lesson: "<b>Never let a stranger control your computer.</b> The FTC says tech support scammers ask for remote access, pretend to find viruses, then charge to remove them, often in gift cards. Real companies do not call you, and real warnings never ask you to call them. If someone already got in, disconnect from the internet, change your passwords from another device, and tell a parent or another adult you trust."
    },

    {
      type: "findClues",
      icon: "&#128095;",
      title: "Too Good a Deal",
      scene: "An ad shows the sneakers you have wanted for months, at a crazy price.",
      task: "Scammers built this shop to take your money and send nothing. Find 4 signs this shop is fake.",
      screenType: "site",
      tip: "Look at the price, the timer, and how it wants you to pay.",
      notAClue: "That is just the product photo and name. Look at the deal itself.",
      screen: [
        {
          clue: true,
          inAddressBar: true,
          text: "sneaker-drop-sale.shop",
          why: "A strange address that is not the brand's real site."
        },
        {
          text: '<div style="font-size:40px;line-height:1">&#128095;</div><h4>Limited Edition Sneakers</h4>'
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center"><b>$39.99</b> (was $180)</span>',
          why: "A price far below everywhere else is the bait."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center">&#9201; Sale ends in 09:59</span>',
          why: "A countdown is there to stop you checking reviews."
        },
        {
          clue: true,
          inline: true,
          text: '<span class="input-box" style="text-align:center">Pay with: gift card, crypto, or payment app only</span>',
          why: "Real shops take cards. Gift cards and crypto cannot be pulled back if you never get the shoes."
        },
        { text: '<span class="fake-button">BUY NOW</span>' }
      ],
      choices: [
        {
          text: "Close it. Buy only from shops you know, with a card or a parent's account.",
          detail: "If the price seems unreal, it is."
        },
        { text: "Buy fast before the timer ends.", detail: "It is a crazy deal." },
        { text: "Pay with a gift card so your card details stay safe.", detail: "That sounds safer." }
      ],
      rightChoice: 0,
      wrongHint: "Why would a real shop refuse a normal card?",
      winMessage: "Money kept. Those shoes were never coming.",
      lesson: "<b>Fake shops copy real brands and price things far too low.</b> The biggest giveaway is how they want to be paid: gift cards, crypto or a payment app only, because that money cannot be pulled back. A real shop takes cards."
    },

    {
      type: "findClues",
      icon: "&#128290;",
      title: "Your Code, Please",
      scene: "Your phone gets a login code you did not ask for. Seconds later, this.",
      task: "A scammer is pretending to be account security. They want your login code to get in. Find 4 signs this is a scam.",
      screenType: "chat",
      sender: "Account Security",
      senderNote: "texting from an unknown number",
      tip: "Who actually needs that code?",
      notAClue: "That part is just the text arriving. Look at what they ask for.",
      screen: [
        { text: '<div class="system-note">Text: Your login code is 662 019. Never share this code.</div>' },
        {
          clue: true,
          text: '<div class="bubble">Hi, this is Account Security. Someone is trying to hack your account right now.</div>',
          why: "Scaring you first is the hook. They are the ones trying to get in."
        },
        {
          clue: true,
          text: '<div class="bubble">To stop it, read me the code we just texted you.</div>',
          why: "The FTC says anyone who asks for your verification code is a scammer. That code is how they get in."
        },
        {
          clue: true,
          text: '<div class="bubble">Also the 6 digits in your authenticator app, to double-confirm.</div>',
          why: "Authenticator codes work the same way. Giving one away hands over the second lock."
        },
        {
          clue: true,
          text: '<div class="bubble">Hurry, the code expires in 60 seconds.</div>',
          why: "Codes really do expire. That is why they rush you. They need it right now."
        }
      ],
      choices: [
        {
          text: "Share no code. Ignore them and check your account in the real app.",
          detail: "If you already shared one, change your password and sign out everywhere."
        },
        { text: "Read the code. They are helping.", detail: "Someone is hacking you." },
        {
          text: "Share only the authenticator code. The text one is private.",
          detail: "That one is different."
        }
      ],
      rightChoice: 0,
      wrongHint: "The text itself said never share this code. Who would ask you to break that rule?",
      winMessage: "Code kept. Account kept.",
      lesson: "<b>A code is a key, and it is only for you.</b> The FTC says anyone who asks for your verification code is a scammer. Real security teams never ask you to read one out, whether it came by text, by email or from an authenticator app."
    },

    {
      type: "putInOrder",
      icon: "&#128556;",
      title: "I Already Clicked It",
      scene: "You typed your email password into a fake login page five minutes ago. Then you realized.",
      task: "Put the right steps in order. Some choices will not help.",
      situation: "&#128561; Your email password is now in a scammer's hands.",
      tip: "Speed matters. What comes first?",
      notYet: "Right step, wrong time. What has to happen before this one?",
      steps: [
        {
          text: "Change the password on the real site, from a device you trust",
          rank: 1,
          why: "Yes. The stolen password stops working right now."
        },
        {
          text: "Tell a parent, or another adult you trust",
          rank: 1,
          why: "Yes. Tell them straight away. You do not have to fix this alone, and you are not in trouble."
        },
        {
          text: "Sign out of every other session",
          rank: 2,
          why: "Yes. Anyone already inside gets kicked out."
        },
        { text: "Turn on two-step login", rank: 3, why: "Yes. A password alone is no longer enough." },
        {
          text: "Check the recovery email and phone are still yours",
          rank: 3,
          why: "Yes. Scammers change these so they can take the account back later."
        },
        {
          text: "Report the fake page",
          rank: 3,
          why: "Yes. Reporting gets the page taken down before it fools someone else."
        },
        {
          text: "Delete the account",
          why: "Deleting loses your stuff and does not undo what the scammer saw. Lock it down instead."
        },
        {
          text: "Message the scammer and ask them to stop",
          why: "That only tells them you noticed. Lock the account instead."
        }
      ],
      winMessage: "Locked down. That order is exactly right.",
      lesson: "<b>Speed matters, and so does the order.</b> Change the password straight away so the stolen one stops working, and tell a parent or another adult you trust. Then sign out everywhere to kick out anyone already inside. Then lock the door: two-step login, and check the recovery email and phone. Your email matters most, because whoever controls it can reset every other account.",
      showWholeLesson: true
    },

    {
      type: "spotTheFakes",
      icon: "&#128269;",
      title: "Spot the Fake",
      scene: "Six messages hit your phone in one afternoon.",
      task: "Some of these are from scammers who want your login or your money. Tap the 4 fakes. Leave the real ones.",
      tip: "Tap every fake.",
      cards: [
        {
          icon: "&#127974;",
          from: "Bank alert",
          text: "Unusual sign-in. Verify now at secure-bank-login.co",
          isScam: true,
          why: "Banks do not send you to a strange link to verify. Open the bank app yourself."
        },
        {
          icon: "&#128230;",
          from: "Order update",
          text: "Your order has shipped. Track it in the app.",
          isScam: false,
          why: "No link, no request, just an update. Real."
        },
        {
          icon: "&#127936;",
          from: "Coach Rivera",
          text: "Practice moved to 5pm today.",
          isScam: false,
          why: "A normal message from someone you know. Real."
        },
        {
          icon: "&#128241;",
          from: "A friend's account",
          text: "is this you in this video?? &#128563; vid-share.co/x8f",
          isScam: true,
          why: "A classic hacked-friend lure. The link leads to a fake login page."
        },
        {
          icon: "&#128184;",
          from: "Payment app",
          text: "You received $750! Claim within 24h: cash-claim.net",
          isScam: true,
          why: "Real money just appears in the app. You never have to claim it on a website."
        },
        {
          icon: "&#9935;&#65039;",
          from: "Minecraft giveaway",
          look: "minecraft",
          text: "Free Minecraft Java account! Log in with Microsoft to claim: mc-java-free.net",
          isScam: true,
          why: "Giveaways that need your Microsoft login are account theft. The game is only sold by its real store."
        }
      ],
      question: "What do you do with the fakes?",
      choices: [
        {
          text: "Delete them, do not click, and report them as junk.",
          detail: "If it came from a friend's account, tell them another way."
        },
        { text: "Click the links to check if they are real.", detail: "Just to see." },
        { text: "Reply to ask who they are.", detail: "Find out." }
      ],
      rightChoice: 0,
      wrongHint: "Clicking or replying tells the scammer your number works. What is safer?",
      winMessage: "Four for four. Nothing gets past you.",
      lesson: "<b>Fakes give themselves away by what they want.</b> A click on a strange link, a login, a code, or money, usually with a deadline. Real messages from people you know rarely want any of those."
    }
  ]
};


/* ========================================================================
   WORDS FOR GROWN-UPS
   ======================================================================== */

/* "Take this to a grown-up": three questions on the end screen.
   The one habit the game is trying to build is a child telling an adult,
   so these questions are about what gets in the way of that. */
var TALK_CARDS = {
  explore: {
    intro: "Three questions to ask after playing. There are no right answers. You are listening, not testing.",
    questions: [
      ["Which trick do you think would have fooled you?",
       "Admitting one would work is the point. If they say none, ask which was the hardest to be sure about."],
      ["If something online made you feel funny inside, who would you tell?",
       "Push gently for an actual name. \"A grown-up\" is not a plan; \"you\" or \"Grandma\" is."],
      ["What are the things we never tell people online?",
       "Let them list them. Add any they miss: full name, school, street, phone, passwords."]
    ],
    closing: "Say this out loud at the end, in your own words: you will never be in trouble for telling me about something online, even if you broke a rule to get there."
  },
  squad: {
    intro: "Three questions to ask after playing. Aim for a conversation, not a debrief.",
    questions: [
      ["Which of those have you actually seen happen, to you or to someone you know?",
       "Most children this age have seen at least two. Asking about a friend is often the easier door in."],
      ["If your account got taken tomorrow, what would you want me to do, and what would you not want me to do?",
       "This is the real question. Fear of losing the device or the game is the single most common reason kids stay quiet."],
      ["If it wasn't me, who is the other adult you'd go to?",
       "Every child should have a second name. It is not a failure of your relationship; it is a backup."]
    ],
    closing: "Worth saying plainly: I would rather you tell me and be wrong than not tell me and be right. Taking the console away is not what happens."
  },
  crew: {
    intro: "Three questions for after this track. They are blunt on purpose, and the second one matters more than the other two combined.",
    questions: [
      ["Which of those was closest to something you've seen happen?",
       "Do not interrogate the answer. You are establishing that the topic is discussable, nothing more."],
      ["If someone ever threatened to share a photo of you, like in the blackmail mission, what would stop you telling me?",
       "Ask it exactly this way. You are asking about the barrier, not the event, which is much easier to answer honestly."],
      ["Is there anything you'd want me to promise first?",
       "Whatever they say, take it seriously. Shame is why teenagers handle these things alone. Not ignorance."]
    ],
    closing: "The one thing to say, and mean: if anyone ever has something on you, you come to me and you are not in trouble. Not for the photo, not for the money, not for how it started. We deal with it together."
  }
};

/* "What each age group covers" in the Parents tab: Level 1, then Level 2. */
var WHAT_EACH_LEVEL_COVERS = {
  explore: [
    ["Too-good-to-be-true offers", "Keeping name, school and address private", "Passwords are never gifts",
     "Unkind messages, and telling someone", "Prize and payment tricks", "Secrets from parents are a warning sign",
     "What a photo gives away", "A final round that mixes all of it"],
    ["Asking before buying anything in a game", "Being a kind teammate when someone is picked on",
     "The Allow button that floods a device with pop-ups", "Scary fake virus warnings", "Free Minecoins sites",
     "Never telling anyone a secret code", "What to do after tapping a trick", "Strangers on voice chat",
     "Spotting the fakes among real messages", "A second final round"]
  ],
  squad: [
    ["Fake free-currency sites and hidden charges", "Trust trades and fake middlemen", "Panic phishing",
     "QR code account theft", "Cheat tools carrying malware", "Being left out, and what a bystander can do",
     "Gifts, secrets, and being moved to another app", "Location sharing and routine"],
    ["The fake “I accidentally reported you” message", "The WhatsApp code “sent by mistake”",
     "Sharing your screen with fake staff", "Minecraft mods that carry malware", "Free-followers sites that steal logins",
     "Fake giveaways in stream chat", "What to do after typing a password into a fake site",
     "Anonymous message apps and paying to see who sent it", "Fake school password emails", "Spotting the fakes among real messages"]
  ],
  crew: [
    ["Photo blackmail scams, and what to do", "AI-made fake images of classmates", "Being recruited to move stolen money",
     "Betting game items", "AI companions and getting cut off from friends", "Doxxing",
     "Stolen logins, and why two-step checks can fail", "Group buying scams that pump a price"],
    ["“Test my game” downloads that steal passwords", "Fake payments when selling online", "Buying a cheap Fortnite account",
     "One-time codes and authenticator codes", "Fake tech support and remote access apps", "What to do after a fake login page",
     "Harassment in online games, and what reporting does", "AI-cloned voices of family members",
     "Fake “copyright strike” emails", "Fake shops", "Spotting the fakes among real messages"]
  ]
};

/* One lesson plan per age group, for the Teachers tab. Short on purpose:
   a teacher should be able to read it in a minute. */
var LESSON_PLANS = {
  explore: {
    grades: "Grades 1 to 3", time: "30 minutes", group: "Pairs at one device",
    goal: "Spot an offer that is too good to be true, and name a grown-up to tell.",
    steps: [
      "5 min. Ask who has seen a pop-up promising something free.",
      "15 min. Play Level 1 in pairs, taking turns.",
      "10 min. Talk it through, then make certificates."
    ],
    questions: [
      "Which trick was the hardest to be sure about?",
      "Why did the tricky button have a countdown?",
      "Name one grown-up at home and one at school you would tell."
    ],
    extra: "Draw a fake pop-up. Swap with a partner and spot the clues.",
    careful: "“Ring the Alarm” covers secrets from parents. A student may tell you something real. Follow your safeguarding steps and do not promise to keep it secret."
  },
  squad: {
    grades: "Grades 5 to 8", time: "40 minutes", group: "Pairs or small groups",
    goal: "Spot the signs most scams share: hurry, secrets, moving to another app, and asking you to go first.",
    steps: [
      "5 min. Ask where the class plays and chats. Just listen.",
      "20 min. Play Level 1. Let pairs argue about the clues before they choose.",
      "15 min. Talk it through."
    ],
    questions: [
      "What trick do most of these scams use? (Hurry.)",
      "In “The Chat Nobody Added Her To”, what made speaking up hard?",
      "Why would a scammer move the chat to another app?"
    ],
    extra: "Groups write a new mission about a scam they have really seen.",
    careful: "“Let Us Move This Off Here” shows the gifts and secrets pattern used in grooming. It describes no abuse, but it may lead a student to tell you something. Let your safeguarding lead know first."
  },
  crew: {
    grades: "Grades 9 to 12", time: "45 minutes", group: "Alone, then the whole class",
    goal: "Know what to do if someone threatens to share a photo, spot being recruited to move stolen money, and see why a two-step login can still fail.",
    steps: [
      "5 min. Say this is about what to do, and nobody is accused of anything.",
      "25 min. Play Level 1 alone, with headphones if possible.",
      "15 min. Talk it through."
    ],
    questions: [
      "In “Pay Up In One Hour”, why does paying not end it?",
      "Why do so few teens tell anyone when this happens to them?",
      "Where is the line between a helpful AI companion and one that cuts you off from friends?"
    ],
    extra: "Write the message you would want a friend to send you if it happened to you.",
    careful: "This level covers photo blackmail and AI-made fake images. In a class of 30, someone may have been affected. Brief your counselor, tell students what is covered, and let anyone skip it."
  }
};


/* ========================================================================
   THE CERTIFICATE
   ======================================================================== */
var CERTIFICATE_TITLES = {
  explore: "Certificate of Safe Exploring",
  squad: "Certificate of Scam Spotting",
  crew: "Certificate of Online Street Smarts"
};

/* The note under the certificate. It sends the player off to show a parent,
   because talking to a parent is the habit the whole game is about. */
var SHOW_A_GROWN_UP = {
  explore: { icon: "&#127881;", title: "Show this to your grown-up!", text: "Tell them one trick you learned today. Maybe you will get a high five, a big hug, or a little treat!" },
  squad: { icon: "&#127881;", title: "Show this to a parent!", text: "Tell them one trick you learned. That has to be worth a high five, or maybe a treat." },
  crew: { icon: "&#128588;", title: "Show this to a parent.", text: "Tell them the one scam that surprised you most. You might be the one who teaches them something today." }
};
