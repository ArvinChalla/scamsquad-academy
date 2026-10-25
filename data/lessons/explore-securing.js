/* ========================================================================
   explore-securing.js
   Lessons for ages 6 to 9, in the Securing your account world
   (called "Keep your game safe" for this age group).
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-silly-password",
    icon: "🦄",
    title: "A Strong Silly Password",
    minutes: 3,
    learn: [
      {
        icon: "🔑",
        title: "Long is strong",
        text: "Your password is a key to your game. Put <b>4 silly words</b> together, like frog jelly rocket sock.",
        keep: "Long and silly is strong. Pick your own words."
      },
      {
        icon: "🙅",
        title: "Easy to guess is weak",
        text: "Tricksters guess easy passwords first. Do not use these.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔢", text: "1234" },
            { icon: "😀", text: "Your own name" },
            { icon: "🐶", text: "Your pet's name" }
          ]
        }
      },
      {
        icon: "🎮",
        title: "This game never asks for it",
        text: "This game never asks for your <b>real password</b>. Make one at home <b>with your grown-up</b>."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Which password is the strongest?",
        answers: [
          { text: "moon pickle bike drum", right: true },
          { text: "1234" },
          { text: "Bella, my dog's name" }
        ],
        why: "Four silly words make a long password. Long is strong. Names and 1234 are easy to guess."
      },
      {
        type: "choice",
        question: "Which one is long and strong?",
        answers: [
          { text: "taco cloud sock jump", right: true },
          { text: "Max2017" },
          { text: "abcd" }
        ],
        why: "Four silly words make it long. A name with a year, or abcd, is easy to guess."
      },
      {
        type: "choice",
        question: "A page says: type your real password to test it. Do you?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "password-strength-fun.net" },
            { role: "big", text: "Is your password strong?" },
            { role: "field", text: "Type your real password" },
            { role: "button", text: "CHECK IT" }
          ]
        },
        answers: [
          { text: "No, I never type it", right: true },
          { text: "Yes, just to check it" },
          { text: "Yes, if the page looks nice" }
        ],
        why: "Never type your real password into a page to test it. Practice with silly words instead."
      },
      {
        type: "order",
        question: "Make your real password. Tap the 3 steps in order.",
        steps: ["Get my grown-up", "Pick 4 silly words", "Type it only in my game"],
        why: "Make it with your grown-up first. Use 4 silly words. Then type it only in your real game."
      },
      {
        type: "choice",
        question: "A friend now knows your password. What do you do?",
        answers: [
          { text: "Tell my grown-up. Change it.", right: true },
          { text: "Nothing, friends are fine" },
          { text: "Ask them to forget it" }
        ],
        why: "You are not in trouble. A new password fixes it, and friends can tell others by mistake."
      }
    ],
    rule: "Long and silly is strong. Make it with your grown-up.",
    sources: [
      {
        name: "CISA: Use strong passwords",
        url: "https://www.cisa.gov/secure-our-world/use-strong-passwords"
      },
      {
        name: "Roblox Support: Keep Your Account Safe",
        url: "https://en.help.roblox.com/hc/en-us/articles/203313380"
      }
    ]
  },
  {
    id: "e-where-password-goes",
    icon: "🏰",
    title: "Where My Password Goes",
    minutes: 3,
    learn: [
      {
        icon: "🏰",
        title: "Only in your real game",
        text: "Type your password <b>only in your real game</b>, with your grown-up there to help."
      },
      {
        icon: "🎣",
        title: "Pages from videos and messages",
        text: "A video or message sends you to a page. It wants your <b>password</b>. It is a trick.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "free-pets-now.net/pets" },
            { role: "big", text: "Get a free pet!", flag: true, why: "A free pet is how the trick gets you to type." },
            { role: "field", text: "Your game name" },
            { role: "field", text: "Your password", flag: true, why: "This is what the trickster really wants." },
            { role: "button", text: "GET MY PET" }
          ]
        }
      },
      {
        icon: "🛑",
        title: "Stop and ask first",
        text: "A page asks for your password? <b>Stop.</b> Ask your grown-up: is this our real game?",
        keep: "Not sure? Ask your grown-up before you type."
      }
    ],
    quiz: [
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "free-block-coins.net" },
            { role: "big", text: "Free Minecoins for video fans!" },
            { role: "line", text: "Came from the video? Type your password" },
            { role: "field", text: "Your password" },
            { role: "button", text: "GET COINS" }
          ]
        },
        answer: "fake",
        why: "A page from a video wants your password for free coins. Minecoins come only from the real Minecraft game."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks on this page.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "pet-party-fun.net" },
            { role: "big", text: "Pet Party" },
            { role: "line", text: "Pick a color for your pet" },
            {
              role: "line",
              text: "🎁 Free rare pet for you!",
              flag: true,
              why: "A free pet is how the trick gets you to type."
            },
            {
              role: "field",
              text: "Your game password",
              flag: true,
              why: "A page from a link should never get your password."
            },
            { role: "button", text: "NEXT" }
          ]
        },
        why: "A free pet and a password box are the tricks. Stop. Get your grown-up."
      },
      {
        type: "choice",
        question: "Where do you type your game password?",
        answers: [
          { text: "Only in my real game", right: true },
          { text: "Any page that asks nicely" },
          { text: "In a chat with a helper" }
        ],
        why: "Pages from links and helpers in chat can be tricksters. Only your real game gets it."
      },
      {
        type: "choice",
        question: "You typed your password on a trick page. What now?",
        answers: [
          { text: "Tell my grown-up now", right: true },
          { text: "Wait and see what happens" },
          { text: "Type it again to check" }
        ],
        why: "You are not in trouble. Your grown-up can make a new password before the trickster uses it."
      }
    ],
    rule: "Your password goes only in your real game.",
    sources: [
      {
        name: "Roblox Support: Free Robux generators",
        url: "https://en.help.roblox.com/hc/en-us/articles/204262550-Free-Robux-or-Subscription-Generators"
      },
      {
        name: "Roblox Support: Keep Your Account Safe",
        url: "https://en.help.roblox.com/hc/en-us/articles/203313380"
      }
    ]
  },
  {
    id: "e-oops-i-tapped-it",
    icon: "😬",
    title: "Oops, I Tapped It",
    minutes: 3,
    learn: [
      {
        icon: "😬",
        title: "Oops happens",
        text: "Everyone taps a trick sometimes. Even grown-ups. <b>You are not in trouble.</b>"
      },
      {
        icon: "🛑",
        title: "Stop, tell, fix",
        text: "Do these 3 things, in this order.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🦉", text: "Stop and tell your grown-up." },
            { icon: "👀", text: "Show them what you tapped." },
            { icon: "🤝", text: "Your grown-up fixes it with you." }
          ]
        }
      },
      {
        icon: "🙈",
        title: "Do not hide it",
        text: "Hiding it means nobody can help. <b>Telling fast</b> makes it easier to fix.",
        keep: "Telling is brave. You are never in trouble for telling."
      },
      {
        icon: "🗣️",
        title: "What to say",
        text: "Say: <b>\"Something weird happened. Can I show you?\"</b> Your grown-up will help."
      }
    ],
    quiz: [
      {
        type: "order",
        question: "You tapped a trick. Tap the 3 steps in order.",
        steps: ["Stop and tell my grown-up", "Show them what I tapped", "Fix it with my grown-up"],
        why: "Stop and tell first, so it does not get worse. Show them. Then fix it together."
      },
      {
        type: "choice",
        question: "Are you in trouble for tapping a trick?",
        answers: [
          { text: "No. I am not in trouble", right: true },
          { text: "Yes, so I hide it" },
          { text: "Yes, so I fix it alone" }
        ],
        why: "You are never in trouble for telling. Your grown-up wants to help."
      },
      {
        type: "choice",
        question: "A box says your game is stuck. What do you do?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "Uh-oh! Your game is stuck!" },
            { role: "line", text: "Type your password to fix it" },
            { role: "button", text: "FIX IT NOW" }
          ]
        },
        answers: [
          { text: "Stop. Get my grown-up", right: true },
          { text: "Type my password to fix it" },
          { text: "Tap FIX IT NOW" }
        ],
        why: "Do not tap or type on a trick box. Your grown-up can close it safely."
      },
      {
        type: "choice",
        question: "What can you say to your grown-up?",
        answers: [
          { text: "\"Can I show you something weird?\"", right: true },
          { text: "Nothing, I fix it alone" },
          { text: "\"It was not me!\"" }
        ],
        why: "Those few words get you help fast. You are not in trouble."
      }
    ],
    rule: "Oops? Stop, tell, fix. You are not in trouble.",
    sources: [
      {
        name: "FTC: What to do if you were scammed",
        url: "https://consumer.ftc.gov/articles/what-do-if-you-were-scammed"
      },
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      }
    ]
  }
];
