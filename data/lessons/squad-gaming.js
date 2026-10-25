/* ========================================================================
   squad-gaming.js
   Lessons for ages 10 to 13, in the Gaming world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-free-robux",
    icon: "💎",
    title: "Free Robux? It's a trap",
    minutes: 4,
    learn: [
      {
        icon: "🎣",
        title: "Free Robux sites are fake",
        text: "A video says a site gives <b>free Robux</b>. It even looks like Roblox. But no outside site can make Robux.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "freebux-gen2026.net/claim",
              flag: true,
              why: "This is not roblox.com."
            },
            {
              role: "big",
              text: "Get 10,000 FREE ROBUX!",
              flag: true,
              why: "Too good to be true. That is the bait."
            },
            { role: "field", text: "Roblox username" },
            { role: "field", text: "Roblox password", flag: true, why: "This is what they really want." },
            { role: "button", text: "CLAIM ROBUX" }
          ]
        },
        keep: "Real Robux come only from Roblox or a real Roblox gift card."
      },
      {
        icon: "🔎",
        title: "Who really owns the site?",
        text: "Skip the https://. Find the next /. The owner is the <b>last two parts</b> just before it. A real name further left can be a <b>costume</b>.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "roblox.com.gift-drop26.net/login",
              flag: true,
              why: "The owner is gift-drop26.net. The roblox.com in front is a costume."
            },
            { role: "big", text: "Log in for your free Robux" },
            { role: "field", text: "Password" },
            { role: "button", text: "LOG IN" }
          ]
        },
        keep: "The owner is the last two parts before the /."
      },
      {
        icon: "🕵️",
        title: "What they really want",
        text: "The site does not care about Robux. It wants <b>your password</b>, a parent's <b>card</b>, or for you to <b>install an app</b>.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔑", text: "Your Roblox password" },
            { icon: "💳", text: "A card for a \"free trial\" that keeps charging" },
            { icon: "📲", text: "An app that is really a virus" }
          ]
        }
      },
      {
        icon: "💥",
        title: "If you fall for it",
        text: "It can happen fast.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "You type your password into the fake site." },
            { icon: "🔓", text: "They log in as you and change your password." },
            { icon: "😢", text: "They sell your items and message your friends as you." }
          ]
        },
        keep: "Your account is worth money to them, even with a few items."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this site.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "free-gift-center26.net/free",
              flag: true,
              why: "Not roblox.com. Real Robux never come from another site."
            },
            {
              role: "big",
              text: "Free 5,000 Robux for everyone!",
              flag: true,
              why: "A huge free prize is the bait."
            },
            { role: "line", text: "Pick your avatar color" },
            {
              role: "field",
              text: "Your Roblox password",
              flag: true,
              why: "A real gift never needs your password."
            },
            { role: "button", text: "GET ROBUX" }
          ]
        },
        why: "The address, the huge prize and the password box all give it away."
      },
      {
        type: "choice",
        question: "A site says: \"Prove you are human. Install our app.\" What is it really?",
        answers: [
          { text: "A trick to get you to install something", right: true },
          { text: "A safety check, like an \"I'm not a robot\" box" },
          { text: "A normal step before you get free Robux" }
        ],
        why: "A real CAPTCHA, the \"I'm not a robot\" check, never makes you install an app. The \"check\" is the scam."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "roblox.com.gift-claim-2026.net/login" },
            { role: "big", text: "Log in to get your gift" },
            { role: "field", text: "Username" },
            { role: "field", text: "Password" },
            { role: "button", text: "LOG IN" }
          ]
        },
        answer: "fake",
        why: "The real name is at the front, but the owner is gift-claim-2026.net, the last two parts before the /."
      },
      {
        type: "order",
        question: "You typed your password on a fake site. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Change the password in the real app",
          "Sign out of other devices",
          "Turn on 2-step verification"
        ],
        why: "Telling first gets you help fast. A new password stops the stolen one. Signing out kicks them out. 2-step adds a second lock."
      },
      {
        type: "choice",
        question: "Where can real Robux come from?",
        answers: [
          { text: "Roblox itself, or a real Roblox gift card", right: true },
          { text: "A generator site from a YouTube video" },
          { text: "A player in chat who says they have a hack" }
        ],
        why: "No outside site, app or player can make Robux. Not one."
      }
    ],
    rule: "No outside site can make Robux. Not one.",
    sources: [
      {
        name: "Roblox Support: Free Robux or Membership Generators",
        url: "https://en.help.roblox.com/hc/en-us/articles/204262550"
      },
      {
        name: "TechSpot (2023): fake Robux and V-Bucks generator pages",
        url: "https://www.techspot.com/news/99782-marketing-scam-targets-kids-fortnite-roblox-offers.html"
      }
    ]
  },
  {
    id: "s-trade-tricks",
    icon: "🔄",
    title: "Trade tricks",
    minutes: 3,
    learn: [
      {
        icon: "🤝",
        title: "\"You go first\"",
        text: "A player wants your rare pet. They say <b>\"send yours first, then I'll send mine\"</b>. Once you send it, they leave.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "xX_TradeKing_Xx",
          note: "not on your friends list",
          parts: [
            { role: "them", time: "6:10 pm", text: "nice dragon!! ill trade u my mega unicorn" },
            { role: "me", time: "6:10 pm", text: "ok how" },
            {
              role: "them",
              time: "6:11 pm",
              text: "send urs first then ill send mine",
              flag: true,
              why: "Whoever goes first outside the trade window loses."
            },
            {
              role: "them",
              time: "6:11 pm",
              text: "hurry my mom is making me log off",
              flag: true,
              why: "Rushing you so you don't stop and think."
            }
          ]
        },
        keep: "Whoever goes first outside the trade window loses."
      },
      {
        icon: "🪟",
        title: "Use the real trade window",
        text: "Real trades happen in the <b>game's own trade window</b>. Both players put their items in. Both press accept. Nobody goes first.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🪟", text: "Trade only in the game's trade window" },
            { icon: "👀", text: "Check both sides before you accept" },
            { icon: "🚫", text: "No trades in DMs or other apps" }
          ]
        }
      },
      {
        icon: "🎭",
        title: "The \"trusted middleman\"",
        text: "They say: <b>\"My friend is a middleman. Give him your pet and he holds it.\"</b> The friend is on their team. Both disappear.",
        keep: "A middleman you don't know is part of the trick."
      },
      {
        icon: "💥",
        title: "If you fall for it",
        text: "It is over in seconds.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🐉", text: "You send your rare pet first." },
            { icon: "🚪", text: "They block you and leave." },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust, and report them. You are not in trouble." }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 red flags in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "petz_pro_2013",
          note: "not on your friends list",
          parts: [
            { role: "them", text: "hey want to trade?" },
            {
              role: "them",
              text: "my cousin is a trusted middleman, give him ur pet",
              flag: true,
              why: "A middleman you don't know is on their team."
            },
            { role: "me", text: "what do i get" },
            {
              role: "them",
              text: "lets do it on discord not here",
              flag: true,
              why: "Moving out of the game takes away the trade window's protection."
            }
          ]
        },
        why: "A stranger's middleman and moving the trade off the game are the two big signs."
      },
      {
        type: "choice",
        question: "This player wants your dragon. Pick your reply.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "dragonz_4ever",
          note: "not on your friends list",
          parts: [
            { role: "them", time: "7:02 pm", text: "send urs first, i promise ill send mine" },
            { role: "them", time: "7:02 pm", text: "pls hurry i have to go soon" }
          ]
        },
        answers: [
          { text: "no. trade window or no trade", right: true },
          { text: "ok sending it now, u promised" },
          { text: "send half now and half later?" }
        ],
        why: "A promise is free. The trade window makes both sides hand over at the same time."
      },
      {
        type: "choice",
        question: "Where is the safest place to trade?",
        answers: [
          { text: "The game's own trade window", right: true },
          { text: "In a Discord DM, with screenshots as proof" },
          { text: "A trading website with lots of good reviews" }
        ],
        why: "Outside the game, nothing protects you. Inside the trade window, both sides must accept."
      },
      {
        type: "choice",
        question: "You got scammed in a trade. What first?",
        answers: [
          { text: "Tell a parent, or another adult you trust, then report them", right: true },
          { text: "Keep it quiet, so I don't get in trouble for trading" },
          { text: "Find their friends and scam one of them back" }
        ],
        why: "You are not in trouble. Reporting helps stop them doing it to someone else."
      }
    ],
    rule: "Trade in the trade window, or don't trade.",
    sources: [
      {
        name: "Roblox Support: Scams and deals outside official features",
        url: "https://en.help.roblox.com/hc/en-us/articles/203312390"
      }
    ]
  },
  {
    id: "s-cheat-virus",
    icon: "🦠",
    title: "Cheats that carry viruses",
    minutes: 4,
    learn: [
      {
        icon: "🎬",
        title: "The cheat video",
        text: "A video shows a cheat that gives <b>unlimited coins</b>. The download link is in the description. The cheat is the bait. The <b>hidden virus</b> is the point.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "free-cheats-zone.net/download",
              flag: true,
              why: "A random download site, not the game's own store."
            },
            { role: "big", text: "UNLIMITED COINS CHEAT v5" },
            {
              role: "line",
              text: "Password for the zip: 1234",
              flag: true,
              why: "Antivirus cannot check inside a locked zip. That is why they lock it."
            },
            {
              role: "line",
              text: "Turn off your antivirus first. It gives a false alarm.",
              flag: true,
              why: "Nothing safe needs your protection turned off. The alarm is right."
            },
            { role: "button", text: "DOWNLOAD cheat_tool.zip" }
          ]
        },
        keep: "If it says turn off your antivirus, close it."
      },
      {
        icon: "🪟",
        title: "When Windows warns you",
        text: "If Windows says it <b>protected your PC</b>, it is right. Never click <b>More info</b>, then <b>Run anyway</b>. A file ending in <b>.exe</b> can run anything.",
        picture: {
          kind: "system",
          app: "Windows",
          parts: [
            { role: "title", text: "Windows protected your PC" },
            { role: "line", text: "Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk." },
            {
              role: "link",
              text: "More info",
              flag: true,
              why: "More info shows a Run anyway button. Cheat pages tell you to click it."
            },
            { role: "button", text: "Don't run" }
          ]
        },
        keep: "The warning is right. Click Don't run."
      },
      {
        icon: "🕵️",
        title: "What the virus takes",
        text: "A fake cheat can hide a <b>password stealer</b>. It quietly copies things from your computer and sends them to the scammer.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔑", text: "Passwords saved in your browser" },
            { icon: "🎮", text: "Your game and chat app logins" },
            { icon: "💳", text: "Card details saved in the browser" },
            { icon: "🖥️", text: "Pictures of your screen" }
          ]
        }
      },
      {
        icon: "💥",
        title: "If you run it",
        text: "It can happen <b>in seconds</b>, while you wait for the cheat to load.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🛡️", text: "You turn off your antivirus and open the file." },
            { icon: "🕳️", text: "Something else installs quietly in the background." },
            { icon: "📤", text: "Your saved passwords go to the scammer." },
            { icon: "😢", text: "They take your accounts and trick your friends as you." }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this mod download page.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "mega-mods-free.top/mega",
              flag: true,
              why: "Not a mod site you know. Random sites are where infected files hide."
            },
            { role: "big", text: "MEGA MOD PACK 1.21" },
            {
              role: "line",
              text: "Windows may warn you. Click More info, then Run anyway.",
              flag: true,
              why: "Clicking past the warning is the trap. The warning was right."
            },
            { role: "line", text: "Works on Java Edition" },
            {
              role: "button",
              text: "DOWNLOAD MegaPack_installer.exe",
              flag: true,
              why: "An .exe can run anything on your computer. Ask a parent, or another adult you trust, first."
            }
          ]
        },
        why: "The unknown site, the skip-the-warning step and the .exe file give it away."
      },
      {
        type: "choice",
        question: "The cheat page says your antivirus will give a false alarm. What do you do?",
        answers: [
          { text: "Close it. Safe files never need antivirus off", right: true },
          { text: "Turn it off for one minute, then back on" },
          { text: "Download it now, but wait to open it" }
        ],
        why: "One minute is enough. Once it runs, the virus is in, even after your protection comes back on."
      },
      {
        type: "choice",
        question: "Why do scammers put cheats in a zip with a password?",
        answers: [
          { text: "So antivirus can't check inside before you open it", right: true },
          { text: "To stop other players stealing the cheat for free" },
          { text: "Because the cheat file is too big to send" }
        ],
        why: "Antivirus cannot look inside a locked zip. Scammers lock it so the virus slips past the check."
      },
      {
        type: "choice",
        question: "This pops up over a cheat video. What is the safest move?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "Cheat download ready!" },
            { role: "line", text: "Your antivirus is blocking it. Turn it off to continue." },
            { role: "button", text: "TURN OFF ANTIVIRUS" },
            { role: "button", text: "DOWNLOAD NOW" }
          ]
        },
        answers: [
          { text: "Close the whole tab or app", right: true },
          { text: "Tap the small ✕ on the pop-up" },
          { text: "Tap TURN OFF ANTIVIRUS, just for a second" }
        ],
        why: "A scammer drew this pop-up, so its ✕ can be fake too. Closing the whole tab or app is the safe way out."
      },
      {
        type: "order",
        question: "You ran a cheat file and now your account acts weird. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Stop using that computer until an adult cleans it",
          "Change your passwords on a different device",
          "Turn on 2-step verification"
        ],
        why: "Telling first gets you help. Using another device keeps your new passwords away from the virus. You are not in trouble."
      }
    ],
    rule: "If it says turn off your antivirus, close it.",
    sources: [
      {
        name: "FTC: How to recognize, remove, and avoid malware",
        url: "https://consumer.ftc.gov/articles/how-recognize-remove-avoid-malware"
      },
      {
        name: "Discord Safety: Understanding and avoiding common scams",
        url: "https://discord.com/safety/understanding-and-avoiding-common-scams"
      },
      {
        name: "Kaspersky (2025): Arcane stealer hidden in Minecraft cheats",
        url: "https://www.kaspersky.com/blog/arcane-stealer-instead-of-cheats-for-minecraft/53178/"
      },
      {
        name: "Kaspersky (2023): locked archives and \"turn off your antivirus\"",
        url: "https://www.kaspersky.com/blog/modern-gamers-threats/47363/"
      }
    ]
  }
];
