/* ========================================================================
   crew-gaming.js
   Lessons for ages 14 to 18, in the Gaming world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-cracked-repack",
    icon: "🏴‍☠️",
    title: "The repack that worked fine",
    minutes: 4,
    learn: [
      {
        icon: "🎁",
        title: "Free game, hidden passenger",
        text: "A <b>cracked game</b> or repack can carry a <b>password stealer</b>. The game runs fine, so you never suspect it. The stealer works quietly in the background.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "fullgames-repack.net/racer-free",
              flag: true,
              why: "A random download site, not a real store."
            },
            {
              role: "big",
              text: "FULL GAME FREE. Pre-installed, all DLC",
              flag: true,
              why: "A paid game for free is the bait. You pay some other way."
            },
            {
              role: "line",
              text: "Zip password: 1234",
              flag: true,
              why: "A locked zip stops security tools looking inside it."
            },
            {
              role: "line",
              text: "Turn off antivirus before you install, it gives false alarms",
              flag: true,
              why: "Turning off protection is the trap. The alarm is not false."
            },
            { role: "button", text: "DOWNLOAD (4.2 GB)" }
          ]
        },
        keep: "If a paid game is free, you pay some other way."
      },
      {
        icon: "🕵️",
        title: "What a stealer takes",
        text: "Kaspersky found one stealer, hidden in fake cheats, taking <b>browser passwords</b>, <b>card details</b>, and logins for <b>Discord, Steam and Roblox</b>.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔑", text: "Passwords saved in your browser" },
            { icon: "🍪", text: "\"Already signed in\" sessions for Discord, Steam and email" },
            { icon: "💳", text: "Card details saved in the browser" },
            { icon: "🪙", text: "Crypto wallets and game accounts" }
          ]
        }
      },
      {
        icon: "🔓",
        title: "Why 2-step verification did not help",
        text: "Stealers copy the file that says you are <b>already signed in</b>. The thief skips the login, so <b>no password or code</b> is ever asked for.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🎮", text: "You install the repack. It works great." },
            { icon: "🌍", text: "Weeks later: a login from another country. No code was asked." },
            { icon: "✉️", text: "Your email settings change." },
            { icon: "🔁", text: "They reset your other accounts from your email." }
          ]
        },
        keep: "2-step verification guards the login. A stolen session skips it."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 4 red flags on this download page.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "games-unlocked-free.org/download",
              flag: true,
              why: "Not a real game store. Anyone can put files here."
            },
            {
              role: "big",
              text: "Space Rangers 2. Cracked, works 100%",
              flag: true,
              why: "Cracked means pirated. That is where stealers hide."
            },
            { role: "line", text: "Size: 38 GB" },
            {
              role: "line",
              text: "If Windows warns you, click Run anyway",
              flag: true,
              why: "The warning is right. Clicking past it is the whole trick."
            },
            {
              role: "line",
              text: "Archive password is in the comments",
              flag: true,
              why: "A password on the file hides what is inside from security scans."
            },
            { role: "button", text: "DOWNLOAD" }
          ]
        },
        why: "A cracked game, a random site, a locked file and \"ignore the warning\". Four giveaways."
      },
      {
        type: "realfake",
        question: "You open the repack and this appears. Is this a real Windows warning, or a fake?",
        picture: {
          kind: "system",
          app: "Windows",
          parts: [
            { role: "title", text: "Windows protected your PC" },
            {
              role: "line",
              text: "Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk."
            },
            { role: "link", text: "More info" },
            { role: "button", text: "Don't run" }
          ]
        },
        answer: "real",
        why: "This one is real, and it is right. It asks for nothing. Listen to it and do not run the file."
      },
      {
        type: "choice",
        question: "Your account was taken, but 2-step verification was on. How did they get in?",
        answers: [
          { text: "They stole your signed-in session, so no code was asked", right: true },
          { text: "They guessed the six-digit code" },
          { text: "2-step verification must have switched itself off" }
        ],
        why: "A stealer copies the \"already signed in\" file. The thief never logs in, so 2-step verification never fires."
      },
      {
        type: "choice",
        question: "Your accounts look hacked after you installed a cracked game. What do you do first with that PC?",
        answers: [
          { text: "Take it off the internet", right: true },
          { text: "Change all your passwords on it right away" },
          { text: "Run a quick scan and keep playing" }
        ],
        why: "Offline stops it sending more. Change passwords from a clean device, with a parent, or another adult you trust, helping."
      },
      {
        type: "choice",
        question: "Where is the safest place to get a game?",
        answers: [
          { text: "The official store or the game's own launcher", right: true },
          { text: "A repack site with lots of good comments" },
          { text: "A file a friend shares on a USB stick" }
        ],
        why: "Comments on a repack site can be fake. Official stores check files, though even they slip sometimes, so read reviews too."
      }
    ],
    rule: "A cracked game is the classic hiding place for stealers.",
    sources: [
      {
        name: "FTC: Malware, how to protect against, detect and remove it",
        url: "https://consumer.ftc.gov/articles/how-recognize-remove-avoid-malware"
      },
      {
        name: "Kaspersky (2025): Arcane stealer instead of Minecraft cheats",
        url: "https://www.kaspersky.com/blog/arcane-stealer-instead-of-cheats-for-minecraft/53178/"
      }
    ]
  },
  {
    id: "c-test-my-game",
    icon: "👾",
    title: "Can you test my game?",
    minutes: 4,
    learn: [
      {
        icon: "🎣",
        title: "The playtest that steals",
        text: "Someone asks you to <b>test their game</b>. The file is really a <b>password stealer</b>. Often the message comes from a <b>friend's hacked account</b>.",
        picture: {
          kind: "chat",
          app: "Discord",
          sender: "devon.dev",
          note: "from a server you are in",
          parts: [
            {
              role: "them",
              text: "made a game with my friends, can u test it? ill pay $15 in nitro 🙏",
              flag: true,
              why: "Being paid to test feels flattering. That is the hook."
            },
            {
              role: "them",
              text: "SkyRaiders_beta.zip, password 2026",
              flag: true,
              why: "A password on the file stops security tools scanning inside it."
            },
            { role: "me", text: "uh sure" },
            {
              role: "them",
              text: "if windows blocks it just click run anyway",
              flag: true,
              why: "Clicking past the warning is the whole trap. The warning was right."
            }
          ]
        },
        keep: "A locked file plus \"ignore the warning\" means no."
      },
      {
        icon: "🧑‍🤝‍🧑",
        title: "Why it comes from friends",
        text: "Once an account is stolen, the thief messages <b>that person's friends</b>. Same name, same picture, same server. That is exactly why it feels safe.",
        keep: "A strange ask from a friend? Check with them another way."
      },
      {
        icon: "✅",
        title: "What real playtests look like",
        text: "Malwarebytes traced these \"try my game\" messages to fake game sites and locked downloads. Real indie playtests look different.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🏪", text: "They come through a real store or launcher page" },
            { icon: "📦", text: "No locked zip, no password in the message" },
            { icon: "🛑", text: "Nobody tells you to click past a warning" },
            { icon: "⏳", text: "No rush. A real dev can wait a day" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 4 red flags in this message.",
        picture: {
          kind: "chat",
          app: "Discord",
          sender: "kai_builds",
          note: "on your friends list",
          parts: [
            { role: "them", text: "yo you still play shooters?" },
            {
              role: "them",
              text: "my studio needs testers, $20 per hour of play",
              flag: true,
              why: "Big pay for a tiny job is bait."
            },
            {
              role: "them",
              text: "download from this file host link, pw: kai123",
              flag: true,
              why: "A random file host and a locked file. Real tests use a store page."
            },
            {
              role: "them",
              text: "turn off antivirus first, it flags our anti-cheat",
              flag: true,
              why: "No real game needs your protection switched off."
            },
            { role: "me", text: "maybe later" },
            {
              role: "them",
              text: "need it tonight bro, please",
              flag: true,
              why: "Hurry stops you checking with him another way."
            }
          ]
        },
        why: "Bait pay, a locked file, \"turn off antivirus\" and a rush. Kai's account may have been stolen."
      },
      {
        type: "choice",
        question: "A good friend's account sends you a game to test, and it sounds a bit off. Best move?",
        answers: [
          { text: "Ask them on another app or in person first", right: true },
          { text: "Run it. It's from a real friend" },
          { text: "Scan it with antivirus, then run it" }
        ],
        why: "The account may be stolen. Asking another way takes a minute. A locked file can also hide from a scan."
      },
      {
        type: "tap",
        question: "You opened the file and Windows shows this. Tap the safe choice.",
        picture: {
          kind: "system",
          app: "Windows",
          parts: [
            { role: "title", text: "Windows protected your PC" },
            {
              role: "line",
              text: "Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk."
            },
            { role: "link", text: "More info" },
            { role: "button", text: "Don't run", right: true }
          ]
        },
        why: "\"Don't run\" is right. The warning is doing its job. The message told you to click past it for a reason."
      },
      {
        type: "choice",
        question: "You already ran a \"test my game\" file. Where should you change your passwords?",
        answers: [
          { text: "On a clean device, with the infected PC offline", right: true },
          { text: "On the same PC, as fast as you can" },
          { text: "Nowhere. 2-step verification will stop them" }
        ],
        why: "A stealer can copy new passwords typed on that PC. Tell a parent, or another adult you trust, and use a clean device."
      }
    ],
    rule: "Never run a game sent in a message.",
    sources: [
      {
        name: "Malwarebytes (2025): \"Can you try a game I made?\" fake game sites lead to information stealers",
        url: "https://www.malwarebytes.com/blog/news/2025/01/can-you-try-a-game-i-made-fake-game-sites-lead-to-information-stealers"
      },
      {
        name: "FTC: Malware, how to protect against, detect and remove it",
        url: "https://consumer.ftc.gov/articles/how-recognize-remove-avoid-malware"
      }
    ]
  },
  {
    id: "c-paste-this-fix",
    icon: "⌨️",
    title: "Just paste this fix",
    minutes: 4,
    learn: [
      {
        icon: "🧰",
        title: "The helpful stranger",
        text: "You ask about a crash. A <b>helpful stranger</b> says paste one line into the <b>command window as admin</b>. That line downloads and runs their program.",
        picture: {
          kind: "forum",
          site: "Game forum · Help and support",
          parts: [
            { role: "post", name: "you", time: "9:12 pm", text: "game crashes on launch since the update, anyone?" },
            { role: "post", name: "fixit_pro · joined yesterday", time: "9:14 pm", text: "had the same thing, easy fix" },
            {
              role: "post",
              name: "fixit_pro · joined yesterday",
              time: "9:14 pm",
              text: "open PowerShell as admin and paste this line",
              flag: true,
              why: "A stranger asking you to paste a command as admin is the trap."
            },
            {
              role: "post",
              name: "fixit_pro · joined yesterday",
              time: "9:15 pm",
              text: "[command hidden by ScamSquad]",
              flag: true,
              why: "These commands are often scrambled so you can't tell what they do. It fetches their program."
            },
            {
              role: "post",
              name: "fixit_pro · joined yesterday",
              time: "9:15 pm",
              text: "it shows a cleanup tool, that's normal",
              flag: true,
              why: "The fake tool is a cover so you do not notice what really installed."
            }
          ]
        },
        keep: "Never paste a command you cannot read yourself."
      },
      {
        icon: "⛏️",
        title: "What it really installed",
        text: "Kaspersky (August 2026) found this on Steam forums. The pasted line showed a fake cleanup tool. Behind it, a hidden <b>crypto miner</b> used players' PCs.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "You paste the line as admin." },
            { icon: "🧹", text: "A fake tool says it is tidying up." },
            { icon: "🙈", text: "A hidden miner starts every time the PC boots." },
            { icon: "🔥", text: "Your PC runs hot and slow. They get paid." }
          ]
        }
      },
      {
        icon: "🎭",
        title: "Same trick, other costumes",
        text: "This trick is called <b>ClickFix</b>. It is not only on forums. Watch for any page or person telling you to <b>paste something</b> into your computer.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🧩", text: "A \"prove you're human\" page that says press keys and paste" },
            { icon: "💬", text: "A \"fix\" in a video comment or Discord reply" },
            { icon: "🎁", text: "\"Paste this in the console for free items\"" },
            { icon: "📋", text: "A page that copied something to your clipboard for you" }
          ]
        }
      },
      {
        icon: "✅",
        title: "Where real fixes come from",
        text: "Real fixes come from the <b>game's official support</b> page, a <b>driver update</b>, or the launcher's <b>verify files</b> button. Not a stranger's line.",
        keep: "A real fix never needs a stranger's command."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this forum reply.",
        picture: {
          kind: "forum",
          site: "Game forum · Bugs",
          parts: [
            { role: "post", name: "you", time: "4:02 pm", text: "my inventory items vanished after the patch" },
            { role: "post", name: "PCwizard_77 · 2 posts", time: "4:10 pm", text: "this happened to lots of people" },
            {
              role: "post",
              name: "PCwizard_77 · 2 posts",
              time: "4:10 pm",
              text: "press Windows + R and paste what I put below",
              flag: true,
              why: "Being told to paste a command into Windows is ClickFix."
            },
            {
              role: "post",
              name: "PCwizard_77 · 2 posts",
              time: "4:11 pm",
              text: "run it as administrator or it won't work",
              flag: true,
              why: "Admin rights let it change anything on your PC."
            },
            {
              role: "post",
              name: "PCwizard_77 · 2 posts",
              time: "4:11 pm",
              text: "ignore any warning, it's a false positive",
              flag: true,
              why: "Telling you to ignore warnings is how the trick gets past your protection."
            }
          ]
        },
        why: "Paste a command, as admin, and ignore warnings. All three together are the ClickFix pattern."
      },
      {
        type: "realfake",
        question: "A game wiki shows this before you can read it. Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "wiki-check-human.net/verify" },
            { role: "big", text: "Verify you are human" },
            { role: "line", text: "Step 1: Press Windows + R" },
            { role: "line", text: "Step 2: Press Ctrl + V, then Enter" },
            { role: "button", text: "I'm not a robot" }
          ]
        },
        answer: "fake",
        why: "Real human checks never ask you to paste anything into Windows. Ctrl + V pastes a command the page secretly copied."
      },
      {
        type: "choice",
        question: "Your game keeps crashing. Where should the fix come from?",
        answers: [
          { text: "The game's official support page or launcher", right: true },
          { text: "The forum reply with the most upvotes" },
          { text: "A stranger who had the same problem" }
        ],
        why: "Upvotes can be faked. Official support and the launcher's verify files button never ask you to paste a command."
      },
      {
        type: "choice",
        question: "You pasted a stranger's command an hour ago. What is the first move?",
        answers: [
          { text: "Take that PC off the internet", right: true },
          { text: "Clear your clipboard so the command is gone" },
          { text: "Restart the PC and see if it's fine" }
        ],
        why: "Offline stops it downloading more or sending your data. Then tell a parent, or another adult you trust, and fix accounts from a clean device."
      }
    ],
    rule: "Never paste a stranger's command into your computer.",
    sources: [
      {
        name: "Kaspersky (Aug 2026): ClickFix attack on Steam forums",
        url: "https://www.kaspersky.com/blog/steam-forum-clickfix-attack-irm-iex/56285/"
      },
      {
        name: "FTC: Malware, how to protect against, detect and remove it",
        url: "https://consumer.ftc.gov/articles/how-recognize-remove-avoid-malware"
      }
    ]
  }
];
