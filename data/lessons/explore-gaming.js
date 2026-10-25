/* ========================================================================
   explore-gaming.js
   Lessons for ages 6 to 9, in the Gaming world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-free-coins",
    icon: "✨",
    title: "The Free Coins Trick",
    minutes: 3,
    learn: [
      {
        icon: "🎁",
        title: "A big FREE box appears",
        text: "You are playing. Then a box says <b>FREE COINS</b>! <b>Only 10 seconds!</b> A trickster made it.",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            {
              role: "title",
              text: "1,000,000 FREE COINS!",
              flag: true,
              why: "A huge free prize is how the trick gets you to tap."
            },
            {
              role: "line",
              text: "⏰ Only 10 seconds left!",
              flag: true,
              why: "Hurry is a trick. It wants you to tap before you think."
            },
            {
              role: "button",
              text: "CLICK NOW!",
              flag: true,
              why: "This big button is what the trickster wants you to tap."
            }
          ]
        },
        keep: "FREE + HURRY = STOP."
      },
      {
        icon: "✋",
        title: "Do not tap the box",
        text: "Do not tap anything in the box, not even the ✕. <b>Get your grown-up.</b>",
        keep: "A trick box can hide a fake ✕."
      },
      {
        icon: "🪙",
        title: "Where real coins come from",
        text: "Real coins come from <b>your game itself</b>, or your grown-up buying them. Not from a FREE box.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Level 3 done! ⭐" },
            { role: "line", text: "You got 20 coins for playing." },
            { role: "close", text: "Close" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "This box shows up in your game. What do you do?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "FREE GEMS FOR YOU!" },
            { role: "line", text: "Hurry! Only 5 seconds!" },
            { role: "button", text: "GET GEMS NOW" }
          ]
        },
        answers: [
          { text: "Stop. Get my grown-up", right: true },
          { text: "Tap GET GEMS NOW fast" },
          { text: "Tap the small ✕" }
        ],
        why: "A trick box can have a fake ✕. Do not tap anything. Your grown-up can close it safely."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this box.",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "Hi, player!" },
            { role: "line", text: "Nice jumping today." },
            {
              role: "line",
              text: "🎉 You won 5,000 coins!",
              flag: true,
              why: "You did not win anything. A surprise prize is a trick."
            },
            {
              role: "line",
              text: "Tap fast before it is gone!",
              flag: true,
              why: "Hurry is a trick. Real things can wait."
            },
            { role: "line", text: "Have a fun day!" }
          ]
        },
        why: "A surprise prize and a hurry message are the tricks. The other words are just friendly."
      },
      {
        type: "choice",
        question: "Where do real game coins come from?",
        answers: [
          { text: "From my game, or my grown-up", right: true },
          { text: "A box that says FREE coins" },
          { text: "A nice grown-up in game chat" }
        ],
        why: "Coins come from your game, or when your grown-up buys them. A stranger in chat is not your grown-up."
      },
      {
        type: "choice",
        question: "You tapped CLICK NOW by mistake. What do you do?",
        answers: [
          { text: "Stop and show my grown-up", right: true },
          { text: "Tap the ✕ to fix it" },
          { text: "Hide it so nobody knows" }
        ],
        why: "You are not in trouble. Tapping more or hiding it makes it harder. Your grown-up can help."
      }
    ],
    rule: "FREE and HURRY? Stop. Get your grown-up.",
    sources: [
      {
        name: "Roblox Support: Free Robux generators",
        url: "https://en.help.roblox.com/hc/en-us/articles/204262550-Free-Robux-or-Subscription-Generators"
      },
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      }
    ]
  },
  {
    id: "e-coin-doubler",
    icon: "🪙",
    title: "The Coin Doubler",
    minutes: 3,
    learn: [
      {
        icon: "🪙",
        title: "Give 100, get 200?",
        text: "A player says: give me <b>100 coins</b> and I will give you <b>200 back</b>. It sounds great.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "CoinKing_77",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "hi! i can double your coins" },
            {
              role: "them",
              text: "give me 100, i give you 200",
              flag: true,
              why: "Players cannot double coins. This is a trick to take yours."
            },
            { role: "me", text: "really?" },
            {
              role: "them",
              text: "fast, i have to go soon",
              flag: true,
              why: "Hurry is a trick. It stops you from thinking."
            }
          ]
        }
      },
      {
        icon: "💨",
        title: "What really happens",
        text: "They never send any back.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🪙", text: "You give them 100 coins." },
            { icon: "🏃", text: "The player leaves the game." },
            { icon: "😢", text: "You get nothing back." }
          ]
        },
        keep: "A player can never double your coins."
      },
      {
        icon: "🛑",
        title: "What to do",
        text: "Say no. Do not send coins. <b>Tell your grown-up.</b> They can help you tell the game."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 tricks in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "LuckyLlama",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "nice house you built!" },
            { role: "me", text: "thanks!" },
            {
              role: "them",
              text: "send me 50 gems, i send 100 back",
              flag: true,
              why: "Players cannot double gems. You would lose your 50."
            },
            { role: "me", text: "hmm" },
            {
              role: "them",
              text: "only today! hurry!",
              flag: true,
              why: "Hurry is a trick to stop you asking your grown-up."
            }
          ]
        },
        why: "Doubling and hurry are the tricks. \"Nice house\" is just a nice thing to say."
      },
      {
        type: "choice",
        question: "A player says they can double your coins. Is it true?",
        answers: [
          { text: "No, it is a trick", right: true },
          { text: "Yes, if they promise" },
          { text: "Yes, if they seem nice" }
        ],
        why: "A player cannot double coins. A promise or a nice word does not change that."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Great job! Level 5 done." },
            { role: "line", text: "You got 20 coins for playing." },
            { role: "close", text: "Close" }
          ]
        },
        answer: "real",
        why: "It is your game's own screen. It gives coins for playing and asks for nothing."
      },
      {
        type: "choice",
        question: "You sent coins and got none back. What first?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Ask the player again" },
          { text: "Say nothing, it is my fault" }
        ],
        why: "You are not in trouble. It is the trickster's fault. Your grown-up can help you report them."
      }
    ],
    rule: "Players never double coins. Say no and tell your grown-up.",
    sources: [
      {
        name: "Roblox Support: Keep Your Account Safe",
        url: "https://en.help.roblox.com/hc/en-us/articles/203313380"
      },
      { name: "NCMEC NetSmartz", url: "https://www.missingkids.org/netsmartz" }
    ]
  },
  {
    id: "e-game-password",
    icon: "🔑",
    title: "A Player Wants Your Password",
    minutes: 3,
    learn: [
      {
        icon: "🐉",
        title: "A gift for your password?",
        text: "A player says they will give you a <b>rare pet</b>. They just need your <b>password</b>.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "ProHelper_1",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "wow you are so good!" },
            {
              role: "them",
              text: "i can give you a rare pet",
              flag: true,
              why: "A big gift from someone you do not know is a trick sign."
            },
            {
              role: "them",
              text: "just tell me your password",
              flag: true,
              why: "Nobody needs your password to give you a gift."
            }
          ]
        }
      },
      {
        icon: "🏰",
        title: "A password is a key",
        text: "Your password opens <b>your game</b>. If a player has it, they can take your things.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "You tell them your password." },
            { icon: "🔓", text: "They go into your game." },
            { icon: "😢", text: "They take your things and you cannot get in." }
          ]
        }
      },
      {
        icon: "👪",
        title: "Who can know it",
        text: "Not friends. Not players. Not game helpers.",
        keep: "Your password is only for you and your grown-up."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Who can know your game password?",
        answers: [
          { text: "Me and my grown-up", right: true },
          { text: "Me and my best friend" },
          { text: "A game helper in the chat" }
        ],
        why: "Even a good friend can tell someone by mistake. Real game helpers never ask for it."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "FreeStuffGuy",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "hi, you play really well" },
            { role: "me", text: "thanks!" },
            {
              role: "them",
              text: "type your password and get free gems",
              flag: true,
              why: "Nobody needs your password to give you gems."
            },
            { role: "me", text: "ok?" },
            {
              role: "them",
              text: "do it now, it ends soon",
              flag: true,
              why: "Hurry is a trick. Real gifts can wait."
            }
          ]
        },
        why: "Asking for your password and rushing you are the tricks. Saying hi is normal."
      },
      {
        type: "choice",
        question: "A video says: go to this page. What now?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "free-pets-for-you.net" },
            { role: "big", text: "FREE RARE PET!" },
            { role: "field", text: "Your game password" },
            { role: "button", text: "GET MY PET" }
          ]
        },
        answers: [
          { text: "Stop. Get my grown-up", right: true },
          { text: "Type my password fast" },
          { text: "Tap GET MY PET" }
        ],
        why: "Free pet pages want your password. Do not tap or type. Your grown-up can close it safely."
      },
      {
        type: "choice",
        question: "You told a player your password. What now?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Wait and see what happens" },
          { text: "Ask the player to forget it" }
        ],
        why: "You are not in trouble. Your grown-up can make a new password before the player uses it."
      }
    ],
    rule: "Your password is only for you and your grown-up.",
    sources: [
      {
        name: "Roblox Support: Keep Your Account Safe",
        url: "https://en.help.roblox.com/hc/en-us/articles/203313380"
      },
      {
        name: "Roblox Support: Free Robux generators",
        url: "https://en.help.roblox.com/hc/en-us/articles/204262550-Free-Robux-or-Subscription-Generators"
      }
    ]
  }
];
