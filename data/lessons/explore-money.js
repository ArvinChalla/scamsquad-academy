/* ========================================================================
   explore-money.js
   Lessons for ages 6 to 9, in the Money and shopping world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-ask-before-buy",
    icon: "🛒",
    title: "Ask Before You Buy",
    minutes: 3,
    learn: [
      {
        icon: "🛒",
        title: "Some things cost real money",
        text: "Game shops use <b>real money</b>. Look for a price, like $1.99. Gems and Robux cost money too.",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Bunny Run Shop" },
            { role: "line", text: "🌈 Rainbow hat: FREE" },
            { role: "price", text: "💎 500 gems: $4.99" },
            { role: "price", text: "🎁 Mystery box: $1.99" },
            { role: "button", text: "BUY with saved card" },
            { role: "close", text: "Close" }
          ]
        }
      },
      {
        icon: "💳",
        title: "One tap can spend money",
        text: "Your grown-up's card can be <b>saved in the game</b>. Then <b>one tap</b> spends their real money."
      },
      {
        icon: "🦉",
        title: "Ask every time",
        text: "Want something with a price? <b>Ask your grown-up first.</b>",
        keep: "Ask before you buy. Every time."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Which one costs real money?",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Bunny Run Shop" },
            { role: "line", text: "⭐ Next level: FREE" },
            { role: "line", text: "🌈 Rainbow hat: FREE" },
            { role: "price", text: "💎 100 gems: $0.99" },
            { role: "close", text: "Close" }
          ]
        },
        answers: [
          { text: "💎 100 gems: $0.99", right: true },
          { text: "⭐ Next level: FREE" },
          { text: "🌈 Rainbow hat: FREE" }
        ],
        why: "A $ sign means real money. Gems and Robux cost real money too. Ask first."
      },
      {
        type: "choice",
        question: "You really want the gems. What do you do?",
        answers: [
          { text: "Ask my grown-up first", right: true },
          { text: "Tap buy, it is cheap" },
          { text: "Use the saved card fast" }
        ],
        why: "Real money is your grown-up's choice, even a little bit."
      },
      {
        type: "order",
        question: "You want gems. Tap the 3 steps in order.",
        steps: ["Ask my grown-up", "Wait for a yes or no", "Buy it together, if yes"],
        why: "Ask your grown-up first, and wait for their answer. If it is yes, buy it together."
      },
      {
        type: "choice",
        question: "Whose money is on the saved card?",
        answers: [
          { text: "My grown-up's real money", right: true },
          { text: "The game's own money" },
          { text: "Nobody's, it is free" }
        ],
        why: "A saved card spends your grown-up's real money. That is why you ask first."
      },
      {
        type: "choice",
        question: "Oops! You bought gems by mistake. What now?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Put the tablet away fast" },
          { text: "Hope nobody ever sees" }
        ],
        why: "You are not in trouble. Telling soon gives your grown-up the best chance to fix it."
      }
    ],
    rule: "Ask before you buy. Every time.",
    sources: [
      {
        name: "FTC: Epic Games settlement over one-tap buying in Fortnite (2022)",
        url: "https://www.ftc.gov/business-guidance/blog/2022/12/245-million-ftc-settlement-alleges-fortnite-owner-epic-games-used-digital-dark-patterns-charge"
      },
      {
        name: "FTC (2022): Bringing Dark Patterns to Light, game coins that cost real money",
        url: "https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf"
      }
    ]
  },
  {
    id: "e-gift-card-numbers",
    icon: "💳",
    title: "Gift Cards Are Like Money",
    minutes: 3,
    learn: [
      {
        icon: "🎁",
        title: "The numbers are the money",
        text: "The <b>numbers</b> on the back of a gift card are like money. Whoever has them can spend it.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔢", text: "The numbers on the back" },
            { icon: "📸", text: "A picture of the back" },
            { icon: "🎁", text: "The card itself" }
          ]
        },
        keep: "Never send any of these to a player."
      },
      {
        icon: "🕵️",
        title: "A trickster asks for them",
        text: "A player wants a <b>picture of your gift card</b>. Then the money is gone.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "Gem_Giver",
          note: "a player you do not know",
          parts: [
            {
              role: "them",
              text: "i can give you 10,000 gems",
              flag: true,
              why: "Lots of gems for nothing is a trick sign."
            },
            {
              role: "them",
              text: "just send a picture of a gift card",
              flag: true,
              why: "A picture of the numbers lets them spend the money."
            },
            { role: "me", text: "my grandma gave me one" },
            { role: "them", text: "send the back side, fast", flag: true, why: "Hurry is a trick." }
          ]
        }
      },
      {
        icon: "🦉",
        title: "Gift cards are for gifts",
        text: "Gift cards are for <b>gifts</b>, not for paying people.",
        keep: "Use gift cards only with your grown-up."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 tricks in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "FreeRobot22",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "hey! nice skin" },
            { role: "me", text: "thanks!" },
            {
              role: "them",
              text: "send me your gift card numbers",
              flag: true,
              why: "The numbers are money. Only a trickster asks for them."
            },
            { role: "me", text: "why?" },
            {
              role: "them",
              text: "you will get a free rare pet",
              flag: true,
              why: "A free pet for your numbers is a trick."
            }
          ]
        },
        why: "Asking for the numbers and a free pet for them are the tricks. Saying hi is normal."
      },
      {
        type: "choice",
        question: "Why should nobody get your gift card numbers?",
        answers: [
          { text: "They are like money", right: true },
          { text: "The numbers do not matter" },
          { text: "Only the card itself matters" }
        ],
        why: "Anyone with the numbers can spend the money. Once it is spent, it is hard to get back."
      },
      {
        type: "choice",
        question: "A player wants a gift card picture. What do you do?",
        answers: [
          { text: "Say no and tell my grown-up", right: true },
          { text: "Send it, they seem nice" },
          { text: "Send it if they send first" }
        ],
        why: "Only tricksters ask for gift card numbers. Say no, even if they say they will send first."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Grandma ❤️",
          note: "Saved in your phone",
          parts: [
            { role: "them", text: "Happy birthday! There is a gift card in your birthday card. 💕" },
            { role: "them", text: "Have fun picking a toy!" }
          ]
        },
        answer: "real",
        why: "Grandma is saved in your phone. She is giving you a gift, not asking for any numbers."
      },
      {
        type: "choice",
        question: "You sent the numbers. What now?",
        answers: [
          { text: "Tell my grown-up fast", right: true },
          { text: "Wait for the free pet" },
          { text: "Send more to get it back" }
        ],
        why: "You are not in trouble. Fast is best. Your grown-up can call the gift card company."
      }
    ],
    rule: "Gift card numbers are money. Never send them.",
    sources: [
      { name: "FTC: Gift cards are for gifts", url: "https://www.ftc.gov/giftcards" }
    ]
  },
  {
    id: "e-prize-for-playing",
    icon: "🏅",
    title: "A Prize for Playing?",
    minutes: 3,
    learn: [
      {
        icon: "🏅",
        title: "A prize that wants a card",
        text: "A page from a video says you <b>won a prize</b> and wants a <b>card number</b>.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "game-prize-club.net/win" },
            {
              role: "big",
              text: "You won a $100 prize card!",
              flag: true,
              why: "You did not try to win anything. A big surprise prize is a trick sign."
            },
            { role: "line", text: "Thanks for playing so much!" },
            {
              role: "field",
              text: "Card number",
              flag: true,
              why: "A real prize never needs a card number."
            },
            { role: "button", text: "GET MY PRIZE" }
          ]
        }
      },
      {
        icon: "💸",
        title: "Why they want the card",
        text: "With the card numbers, the trickster can <b>spend your grown-up's money</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "You type the card numbers." },
            { icon: "💸", text: "The trickster spends the money." },
            { icon: "🎁", text: "No prize ever comes." }
          ]
        }
      },
      {
        icon: "🛑",
        title: "What to do",
        text: "Real prizes are free. <b>Stop.</b> Do not type or tap. <b>Get your grown-up.</b>",
        keep: "A prize that wants card numbers is a trick."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A video sent you to this page. What now?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "prize-for-players.net" },
            { role: "big", text: "Claim your free prize!" },
            { role: "field", text: "Grown-up's card number" },
            { role: "button", text: "CLAIM PRIZE" }
          ]
        },
        answers: [
          { text: "Stop. Get my grown-up", right: true },
          { text: "Type the card number" },
          { text: "Tap CLAIM PRIZE to see" }
        ],
        why: "Do not type or tap. Your grown-up can close it and keep the money safe."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this message.",
        picture: {
          kind: "text",
          sender: "Game Prizes",
          parts: [
            { role: "them", text: "You play so well!" },
            { role: "them", text: "Hope you had a good day." },
            {
              role: "them",
              text: "You won a $50 prize card!",
              flag: true,
              why: "You did not try to win anything. A surprise prize is a trick sign."
            },
            {
              role: "them",
              text: "Type a grown-up's card number to get it",
              flag: true,
              why: "A real prize never needs a card number."
            },
            { role: "them", text: "Have fun!" }
          ]
        },
        why: "A surprise prize that wants a card number is a trick. Nice words alone are normal."
      },
      {
        type: "choice",
        question: "Do real prizes ask for money or card numbers?",
        answers: [
          { text: "No, real prizes are free", right: true },
          { text: "Yes, but just a little" },
          { text: "Yes, for the big prizes" }
        ],
        why: "Real prizes are free. If it asks for money or a card, it is a trick."
      },
      {
        type: "choice",
        question: "You typed the card numbers. What now?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Wait for the prize to come" },
          { text: "Hide it from my grown-up" }
        ],
        why: "You are not in trouble. Your grown-up can call the bank fast and stop the trickster."
      }
    ],
    rule: "A prize that wants card numbers is a trick.",
    sources: [
      {
        name: "FTC: Fake prize, sweepstakes and lottery scams",
        url: "https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams"
      },
      {
        name: "Kaspersky (2024): fake game prize pages that ask for card details",
        url: "https://www.kaspersky.com/blog/young-gamers-report-2024"
      }
    ]
  }
];
