/* ========================================================================
   squad-securing.js
   Lessons for ages 10 to 13, in the Securing your account world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-passphrase",
    icon: "🔑",
    title: "One password, every game?",
    minutes: 4,
    learn: [
      {
        icon: "🧩",
        title: "Long beats tricky",
        text: "Make it long: <b>at least 16 characters</b>. A <b>passphrase</b> of 4 or more random words works well, if it reaches 16 characters. Easy to remember, hard to guess.",
        keep: "Long and random beats short with symbols."
      },
      {
        icon: "🚩",
        title: "Spot the weak ones",
        text: "Names, birthdays, pets and favorite games get guessed first. <b>Four random words</b>, like PickleCometLanternMoose, do not. Don't copy that one. Make your own.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🎂", text: "liam2013: a name and a birth year" },
            { icon: "🔢", text: "password123: one of the first ones tried" },
            { icon: "🎮", text: "fortnite4life: your favorite game, easy to guess" },
            { icon: "🔣", text: "P@ssw0rd: swapping letters for symbols is a known trick" }
          ]
        }
      },
      {
        icon: "🔗",
        title: "One password everywhere?",
        text: "If you use <b>the same password</b> for every game, one leak opens them all. Scammers try a stolen password on <b>lots of other sites</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "💥", text: "A small game site gets hacked." },
            { icon: "📤", text: "Your password leaks." },
            { icon: "🔁", text: "Scammers try it on Roblox, Discord and your email." },
            { icon: "😢", text: "Every account with that password is theirs." }
          ]
        },
        keep: "A password manager remembers a different one for each."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Which password is the strongest?",
        answers: [
          { text: "MangoTrumpetGlacierSock", right: true },
          { text: "passwordpassword1234" },
          { text: "Liam2013!" },
          { text: "P@ssw0rd" }
        ],
        why: "Four random words are long and hard to guess. Repeating \"password\" or swapping letters for symbols are tricks scammers know."
      },
      {
        type: "choice",
        question: "Your friend says their new password is fortnite4life. Pick your reply.",
        answers: [
          { text: "thats easy to guess. try 4 random words", right: true },
          { text: "nice, nobody will ever guess that one" },
          { text: "add a ! at the end, then its strong" }
        ],
        why: "A favorite game is easy to guess from a profile. Four random words are long and much harder to guess."
      },
      {
        type: "choice",
        question: "You use one password for every game. A small game gets hacked. What's the risk?",
        answers: [
          { text: "Scammers try it on all my other accounts", right: true },
          { text: "Only that one small game is at risk" },
          { text: "Nothing. Hackers only care about big games" }
        ],
        why: "Stolen passwords get tried everywhere. A different password for each account stops one leak spreading."
      },
      {
        type: "choice",
        question: "Where is a safe place to keep your passwords?",
        answers: [
          { text: "A password manager app", right: true },
          { text: "A note on my phone called Passwords" },
          { text: "In a chat with my best friend" }
        ],
        why: "A password manager locks them up. Set it up with a parent, or another adult you trust. Notes and chats can be read."
      },
      {
        type: "order",
        question: "Make your own strong passphrase. Put these in order.",
        steps: [
          "Pick 4 random words nobody would link to you",
          "Join them into one long password",
          "Check it has at least 16 characters",
          "Save it in a password manager"
        ],
        why: "Random words first, then join them. Count the length, and let a password manager remember it for you."
      }
    ],
    rule: "Long passphrase. A different one for every account.",
    sources: [
      {
        name: "CISA Secure Our World: Use strong passwords",
        url: "https://www.cisa.gov/secure-our-world/use-strong-passwords"
      }
    ]
  },
  {
    id: "s-two-step",
    icon: "🔐",
    title: "Lock it with 2-step verification",
    minutes: 4,
    learn: [
      {
        icon: "🚪",
        title: "Two locks, not one",
        text: "<b>2-step verification</b> asks for a second thing after your password, like a code. A scammer with only your password <b>usually can't get in</b>.",
        keep: "Turn it on for your email and every game."
      },
      {
        icon: "⚙️",
        title: "Turn it on, with help",
        text: "Look in <b>Settings</b>, then <b>Security</b>. Best: a <b>passkey</b>, which lets your phone unlock it, or an <b>authenticator app</b>, which makes the codes. Text codes help too.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Ask a parent, or another adult you trust, to help" },
            { icon: "⚙️", text: "Open Settings, then Security, in the real app" },
            { icon: "🔐", text: "Find 2-step verification and turn it on" },
            { icon: "🗂️", text: "Keep any backup codes safe with that adult" }
          ]
        }
      },
      {
        icon: "🛑",
        title: "Never share the code",
        text: "The code is your second lock. If anyone asks for it, even \"staff\", <b>they are the scammer</b>. Real staff never need it.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "Roblox_Support_Team",
          note: "not on your friends list",
          parts: [
            { role: "them", time: "9:01 pm", text: "We noticed a strange login on your account." },
            {
              role: "them",
              time: "9:01 pm",
              text: "To keep it safe, tell us the code we just sent you.",
              flag: true,
              why: "The code is your second lock. Giving it away opens the door."
            },
            {
              role: "them",
              time: "9:02 pm",
              text: "Hurry, it expires in 2 minutes.",
              flag: true,
              why: "Hurry is there to stop you thinking."
            },
            { role: "me", time: "9:02 pm", text: "ok one sec" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A scammer has your password, but you have 2-step verification on. What happens?",
        answers: [
          { text: "They usually can't get in without the code", right: true },
          { text: "They get in anyway. The code doesn't matter" },
          { text: "The app deletes my account to be safe" }
        ],
        why: "The password alone is not enough. That second step is why 2-step verification matters."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags in this chat.",
        picture: {
          kind: "chat",
          app: "Discord",
          sender: "Discord_Safety",
          note: "sent you a friend request",
          parts: [
            { role: "them", time: "10:12 pm", text: "hey, are you there?" },
            {
              role: "them",
              time: "10:12 pm",
              text: "your account was reported for breaking the rules",
              flag: true,
              why: "A scary report story is how this trick starts. Discord doesn't send DMs like this."
            },
            { role: "me", time: "10:13 pm", text: "what did i do??" },
            {
              role: "them",
              time: "10:13 pm",
              text: "send your password and the 6-digit code to unlock it",
              flag: true,
              why: "Discord says it will never ask for your password in a DM. Nobody needs your code."
            },
            {
              role: "them",
              time: "10:14 pm",
              text: "or it gets deleted tonight",
              flag: true,
              why: "A scary deadline is there to rush you."
            }
          ]
        },
        why: "A report story, a password and code ask, and a deadline. Block it and tell a parent, or another adult you trust."
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
        why: "Telling first gets help fast. A new password stops the stolen one, and signing out kicks them out."
      },
      {
        type: "choice",
        question: "Where should you turn on 2-step verification?",
        answers: [
          { text: "In the real app's Settings, under Security", right: true },
          { text: "On a site from a link a player sent me" },
          { text: "By asking a helpful player to set it up" }
        ],
        why: "Only set it up inside the real app. A link in a DM can lead to a fake page."
      }
    ],
    rule: "Turn on 2-step verification. Never share the code.",
    sources: [
      { name: "CISA Secure Our World: Turn on MFA", url: "https://www.cisa.gov/secure-our-world/turn-mfa" },
      {
        name: "CISA (2022): Phishing-resistant MFA is the strongest kind",
        url: "https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf"
      },
      {
        name: "Roblox Support: 2-Step Verification",
        url: "https://en.help.roblox.com/hc/articles/212459863"
      },
      { name: "Discord Safety Library", url: "https://discord.com/safety-library" }
    ]
  },
  {
    id: "s-read-address",
    icon: "🔎",
    title: "Read the web address",
    minutes: 5,
    learn: [
      {
        icon: "🏠",
        title: "Find the real owner",
        text: "Skip the <b>https://</b>. Find the next <b>/</b>. The <b>owner</b> is the <b>last two parts</b> just before it. Real names further left can be a costume.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "roblox.com.gift-claim-2026.net/login",
              flag: true,
              why: "The owner is gift-claim-2026.net, the last two parts just before the /."
            },
            { role: "big", text: "Log in to claim your gift" },
            { role: "field", text: "Username" },
            { role: "field", text: "Password" },
            { role: "button", text: "LOG IN" }
          ]
        },
        keep: "Skip https://. The owner is the last two parts before /."
      },
      {
        icon: "🔒",
        title: "The padlock is not a promise",
        text: "<b>https</b> and the padlock mean the connection is private. They <b>don't mean the site is honest</b>. The FBI warns that fake sites use them too.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "https://free-boost-gifts.net/claim",
              flag: true,
              why: "It has https, but the owner is free-boost-gifts.net, not Discord."
            },
            {
              role: "big",
              text: "🔒 Secure claim page",
              flag: true,
              why: "Saying secure proves nothing. Anyone can type it."
            },
            { role: "line", text: "Free Nitro for 3 months" },
            { role: "button", text: "CLAIM" }
          ]
        }
      },
      {
        icon: "🔍",
        title: "Top results can be fakes",
        text: "Fake pages can show up <b>at the top of search results</b>, and even in <b>AI answers</b>. Being first doesn't make a site real.",
        keep: "Open games from the real app or your own bookmark."
      },
      {
        icon: "📌",
        title: "Open it yourself",
        text: "Skip links in messages. Open the <b>real app</b> or a <b>bookmark</b> you saved. Typed your password on a fake? <b>You are not in trouble.</b> Do this:",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "🔁", text: "Change the password in the real app" },
            { icon: "🚪", text: "Sign out of other devices" },
            { icon: "🔐", text: "Turn on 2-step verification" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "discord.com-security-check.net/login" },
            { role: "big", text: "Welcome back!" },
            { role: "field", text: "Email" },
            { role: "field", text: "Password" },
            { role: "button", text: "LOG IN" }
          ]
        },
        answer: "fake",
        why: "The owner is the last two parts before the /: com-security-check.net. The discord.com in front is a costume."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags on this page.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "https://epicgames.com.free-skins-store.net/free",
              flag: true,
              why: "Skip https://. The owner is free-skins-store.net, the last two parts before the /. https doesn't make it real."
            },
            {
              role: "line",
              text: "🔒 Verified safe site",
              flag: true,
              why: "Anyone can type safe. It proves nothing."
            },
            {
              role: "big",
              text: "Free V-Bucks for new players",
              flag: true,
              why: "V-Bucks only come from the real game store."
            },
            { role: "line", text: "Choose your platform" },
            { role: "button", text: "CONTINUE" }
          ]
        },
        why: "A costume address, a fake safety badge and free V-Bucks. The padlock didn't help."
      },
      {
        type: "choice",
        question: "A free Robux site is the top search result. Does that make it real?",
        answers: [
          { text: "No. Fake pages can be top results too", right: true },
          { text: "Yes. Search engines check every top result" },
          { text: "Yes, as long as it has a padlock" }
        ],
        why: "Being first proves nothing. Scam pages have even been hidden on real government sites to rank high."
      },
      {
        type: "choice",
        question: "This pops up while you browse. What is the safest move?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "Your game account needs attention" },
            { role: "line", text: "Log in again to keep your items." },
            { role: "button", text: "LOG IN NOW" }
          ]
        },
        answers: [
          { text: "Close the tab, then open the real app myself", right: true },
          { text: "Tap LOG IN NOW so I keep my items" },
          { text: "Tap the small ✕, then keep browsing" }
        ],
        why: "A scam pop-up's ✕ can be fake. Close the tab, then open the real app. If something is wrong, it shows there."
      }
    ],
    rule: "Open the real app yourself. Never trust the link.",
    sources: [
      {
        name: "FBI IC3 (2019): Cyber actors exploit \"secure\" websites in phishing",
        url: "https://www.ic3.gov/PSA/2019/PSA190610"
      },
      {
        name: "FBI IC3 (2022): Fake brand ads at the top of search results",
        url: "https://www.ic3.gov/PSA/2022/PSA221221"
      },
      {
        name: "FTC: How to recognize and avoid phishing scams",
        url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
      },
      {
        name: "TechSpot (2023): scam pages on .gov sites lead to fake Robux generators",
        url: "https://www.techspot.com/news/99782-marketing-scam-targets-kids-fortnite-roblox-offers.html"
      },
      {
        name: "Netcraft (2025): AI chatbots that give out wrong or fake login addresses",
        url: "https://www.netcraft.com/blog/large-language-models-are-falling-for-phishing-scams"
      }
    ]
  }
];
