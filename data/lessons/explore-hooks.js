/* ========================================================================
   explore-hooks.js
   Lessons for ages 6 to 9, in the Apps that hook you world
   (called "Games that keep you playing" for this age group).
   How to write a lesson: see FORMAT.md in this folder.

   Every box in this world is the game's OWN screen (kind "game", with a
   real "Close"), not a box a trickster made. So here Close is the safe
   thing to tap. Learn card 2 of e-mystery-box says how to tell them apart.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-mystery-box",
    icon: "🎁",
    title: "The Mystery Box",
    minutes: 3,
    learn: [
      {
        icon: "🎁",
        title: "What is inside?",
        text: "Many <b>mystery boxes</b> cost real money. You do not know what is inside until you pay.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "🎁 MYSTERY BOX" },
            {
              role: "line",
              text: "Could be a GOLD DRAGON!",
              flag: true,
              why: "\"Could be\" means you might not get it at all."
            },
            { role: "price", text: "Only $1.99" },
            { role: "button", text: "OPEN ONE MORE!", flag: true, why: "The game wants you to keep buying." },
            { role: "close", text: "Close" }
          ]
        }
      },
      {
        icon: "🎮",
        title: "Your game's own box",
        text: "Your game's own box has a <b>Close</b> button. That Close is <b>OK to tap</b>.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Bunny Run Shop" },
            { role: "price", text: "🥕 Carrot hat: $0.99" },
            { role: "button", text: "BUY" },
            { role: "close", text: "Close" }
          ]
        },
        keep: "FREE coins, or wants your password? Get your grown-up."
      },
      {
        icon: "🔁",
        title: "Just one more?",
        text: "You might get a <b>small thing</b>. So you want to try <b>one more</b>. And one more."
      },
      {
        icon: "🦉",
        title: "Ask before you open",
        text: "Mystery boxes cost <b>real money</b>. Ask your grown-up first. It is OK if they say no.",
        keep: "You do not know what is inside. That is the trick."
      }
    ],
    quiz: [
      {
        type: "tap",
        question: "This box wants you to buy. Tap the safe thing.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "🎁 Mystery box!" },
            { role: "price", text: "Open now for $0.99" },
            { role: "button", text: "OPEN BOX" },
            { role: "close", text: "Close", right: true }
          ]
        },
        why: "This box is from your game, so its Close is real. Want a box? Ask your grown-up first."
      },
      {
        type: "choice",
        question: "Do you know what is inside a mystery box?",
        answers: [
          { text: "No, not until I open it", right: true },
          { text: "Yes, always the best prize" },
          { text: "Yes, the box tells me" }
        ],
        why: "The box shows the best prize. You may get something much smaller."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this box.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "🎁 Mystery Box" },
            { role: "line", text: "Pets, hats and more" },
            {
              role: "line",
              text: "Maybe a rare unicorn inside!",
              flag: true,
              why: "Maybe means you might not get it."
            },
            {
              role: "line",
              text: "Only 3 boxes left!",
              flag: true,
              why: "This is to make you hurry. Hurry is a trick."
            },
            { role: "price", text: "$0.99 a box" },
            { role: "button", text: "OPEN" },
            { role: "close", text: "Close" }
          ]
        },
        why: "\"Maybe\" hides what you get. \"Only 3 left\" makes you hurry. The price and the button are normal."
      },
      {
        type: "choice",
        question: "A small prize. The box says: try again! What now?",
        answers: [
          { text: "Stop and close the box", right: true },
          { text: "Buy just one more box" },
          { text: "Buy lots to win big" }
        ],
        why: "\"One more\" is how the box keeps you buying. Stopping is always OK."
      }
    ],
    rule: "You do not know what is inside. Ask first.",
    sources: [
      {
        name: "FTC (2025): Genshin Impact mystery box order",
        url: "https://consumer.ftc.gov/consumer-alerts/2025/01/ftc-settlement-order-bans-sales-genshin-impact-loot-boxes-kids-under-16-without-their-parents"
      }
    ]
  },
  {
    id: "e-hurry-timer",
    icon: "⏰",
    title: "The Hurry Timer",
    minutes: 3,
    learn: [
      {
        icon: "⏰",
        title: "Only 10 seconds left!",
        text: "A <b>timer</b> counts down. It wants you to buy <b>before you think</b>.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            {
              role: "title",
              text: "⏰ SALE ENDS IN 0:10!",
              flag: true,
              why: "The timer makes you hurry, so you do not stop and ask."
            },
            { role: "price", text: "500 gems: $4.99" },
            {
              role: "line",
              text: "Everyone is buying!",
              flag: true,
              why: "This is to make you feel left out."
            },
            { role: "button", text: "BUY NOW" },
            { role: "close", text: "Close" }
          ]
        }
      },
      {
        icon: "🔁",
        title: "The timer can be fake",
        text: "Some timers are <b>fake</b>. When it ends, the same deal can come right back."
      },
      {
        icon: "🐢",
        title: "Slow down",
        text: "A timer is a <b>hurry trick</b>. Ask your grown-up. A good deal is not worth a rush.",
        keep: "The timer is the trick."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 hurry tricks in this box.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Super Pet Pack" },
            { role: "line", text: "A puppy, a cat and a hat" },
            { role: "line", text: "Ends in 5 seconds!", flag: true, why: "A timer is a hurry trick." },
            {
              role: "line",
              text: "Only 2 left!",
              flag: true,
              why: "\"Only 2 left\" is there to make you rush."
            },
            { role: "price", text: "$2.99" },
            { role: "button", text: "BUY" },
            { role: "close", text: "Close" }
          ]
        },
        why: "A timer and \"only 2 left\" both want you to rush. The name, price and button are normal."
      },
      {
        type: "choice",
        question: "A timer says: buy in 10 seconds! What do you do?",
        answers: [
          { text: "Close it and ask my grown-up", right: true },
          { text: "Buy fast before it ends" },
          { text: "Ask a friend to buy it" }
        ],
        why: "The timer is the trick. It is OK to miss a deal."
      },
      {
        type: "tap",
        question: "The timer is ticking. Tap the safe thing.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "LAST CHANCE!" },
            { role: "line", text: "⏰ 0:05" },
            { role: "price", text: "$2.99" },
            { role: "button", text: "BUY NOW" },
            { role: "close", text: "Close", right: true }
          ]
        },
        why: "This box is from your game, so its Close is real. Then you have time to ask your grown-up."
      },
      {
        type: "choice",
        question: "Why do games show hurry timers?",
        answers: [
          { text: "So you buy before you think", right: true },
          { text: "To help you save money" },
          { text: "Because it is a race" }
        ],
        why: "When you hurry, you do not stop to ask. That is why the timer is there."
      }
    ],
    rule: "The timer is the trick. Slow down and ask.",
    sources: [
      {
        name: "FTC (2022): Bringing Dark Patterns to Light, fake timers and \"only 2 left\"",
        url: "https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf"
      },
      {
        name: "FTC (2022): fake countdown timers and other tricks",
        url: "https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers"
      }
    ]
  },
  {
    id: "e-dont-go",
    icon: "👋",
    title: "When Games Say \"Don't Go\"",
    minutes: 3,
    learn: [
      {
        icon: "😢",
        title: "A sad face when you stop",
        text: "You want to stop. The game shows a <b>sad face</b> to keep you playing.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            {
              role: "title",
              text: "😢 Bun will be SO sad!",
              flag: true,
              why: "The game wants you to feel bad, so you keep playing."
            },
            {
              role: "line",
              text: "Stay 5 more minutes for a prize!",
              flag: true,
              why: "A prize to stay is a trick to keep you there."
            },
            { role: "button", text: "KEEP PLAYING" },
            { role: "close", text: "Close" }
          ]
        }
      },
      {
        icon: "🧲",
        title: "A trick to keep you playing",
        text: "Some games are made to <b>keep you playing</b>. A sad face is one way they do it."
      },
      {
        icon: "👋",
        title: "You can stop",
        text: "<b>You are the boss.</b> It is OK to stop. Your game will be fine without you.",
        keep: "Stopping is always OK."
      }
    ],
    quiz: [
      {
        type: "tap",
        question: "You want to stop playing. Tap the way out.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Wait! Don't go!" },
            { role: "line", text: "You will lose your prize!" },
            { role: "button", text: "KEEP PLAYING" },
            { role: "button", text: "Stop for today", right: true }
          ]
        },
        why: "KEEP PLAYING is there to keep you playing. You are the boss. You can stop."
      },
      {
        type: "choice",
        question: "The game says your pet will be sad. Is that true?",
        answers: [
          { text: "No, it is a trick", right: true },
          { text: "Yes, so I must play" },
          { text: "Yes, my pet will cry" }
        ],
        why: "A game pet does not really feel sad. The game says it so you keep playing."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this box.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Time to go?" },
            { role: "line", text: "You played for 30 minutes." },
            {
              role: "line",
              text: "Your team will be mad at you!",
              flag: true,
              why: "It wants you to feel bad for stopping."
            },
            { role: "line", text: "Stay now for a free gift!", flag: true, why: "A gift to stay is a trick to keep you." },
            { role: "button", text: "Stop playing" },
            { role: "close", text: "Close" }
          ]
        },
        why: "Feeling bad and a gift to stay are both tricks. It is OK to go."
      },
      {
        type: "choice",
        question: "A game keeps saying don't go. What do you do?",
        answers: [
          { text: "Stop. I am the boss", right: true },
          { text: "Keep playing so it stops" },
          { text: "Play just a bit more" }
        ],
        why: "Stopping is always OK. Your grown-up can help you set a time to stop."
      }
    ],
    rule: "Stopping is always OK. You are the boss.",
    sources: [
      {
        name: "FTC (2022): Bringing Dark Patterns to Light, characters that pressure children",
        url: "https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf"
      },
      {
        name: "Radesky and others, JAMA Network Open (2022): game characters that pressure kids to keep playing",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9206186/"
      }
    ]
  }
];
