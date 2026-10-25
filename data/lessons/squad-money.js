/* ========================================================================
   squad-money.js
   Lessons for ages 10 to 13, in the Money and shopping world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-oops-money",
    icon: "💸",
    title: "Oops, I sent you money",
    minutes: 4,
    learn: [
      {
        icon: "📲",
        title: "Money from a stranger",
        text: "A stranger sends money to your payment app. Then the note says: <b>\"Oops, wrong person! Please send it back.\"</b> It sounds fair. It is a trick.",
        picture: {
          kind: "payment",
          app: "PayFriend",
          parts: [
            { role: "amount", text: "+$40.00" },
            { role: "from", text: "From Jordan_K · not in your contacts" },
            {
              role: "note",
              text: "\"oops wrong person!! pls send it back 🙏\"",
              flag: true,
              why: "A stranger's mistake is for the app to fix, not you."
            },
            {
              role: "line",
              text: "New message: send it to my other account @jordan_k2, this one is locked",
              flag: true,
              why: "A new payment to another account is how you lose real money."
            },
            {
              role: "line",
              text: "New message: hurry my rent is due today",
              flag: true,
              why: "A sad story plus hurry stops you checking."
            },
            {
              role: "button",
              text: "Pay $40",
              flag: true,
              why: "A new payment can't be undone. The app's support is the safe fix."
            }
          ]
        },
        keep: "Don't send it back yourself. Let the app fix it."
      },
      {
        icon: "🔁",
        title: "How you lose money",
        text: "The money they sent may <b>disappear later</b>. The money you send back <b>does not</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "💳", text: "They pay you, maybe with a stolen card." },
            { icon: "📤", text: "You send the same amount back as a new payment." },
            { icon: "↩️", text: "The card owner reports it, and the first payment is pulled back." },
            { icon: "😢", text: "Their money is gone from your app. So is yours." }
          ]
        }
      },
      {
        icon: "✅",
        title: "The safe way",
        text: "Don't send anything. Tell a parent, or another adult you trust. Together, <b>contact support inside the real app</b> so the app reverses the payment.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "✋", text: "Don't send money back yourself" },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "🛟", text: "Use the app's support or refund button, never a new payment" },
            { icon: "🚫", text: "Block the stranger" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this payment screen.",
        picture: {
          kind: "payment",
          app: "PayFriend",
          parts: [
            { role: "amount", text: "+$25.00" },
            { role: "from", text: "From Kay.Rivera22 · not in your contacts" },
            {
              role: "note",
              text: "\"sent by accident, meant it for my cousin\"",
              flag: true,
              why: "Surprise money plus a \"mistake\" story is how this trick starts."
            },
            {
              role: "line",
              text: "New message: pls send $25 to @kay_backup instead",
              flag: true,
              why: "Sending to a different account means a brand new payment. That money is gone."
            },
            {
              role: "line",
              text: "New message: dont bother support, they take forever",
              flag: true,
              why: "They want to stop you using the app's support, the one safe fix."
            },
            { role: "button", text: "Done" }
          ]
        },
        why: "A \"mistake\", a different account, and \"don't contact support\". Let the app sort it out."
      },
      {
        type: "choice",
        question: "A stranger sends you $25 by mistake and asks for it back. What do you do?",
        answers: [
          { text: "Tell a parent, or another adult you trust, and use the app", right: true },
          { text: "Send it back right away. That's the honest thing to do" },
          { text: "Keep it. It was their mistake, so it's mine now" }
        ],
        why: "Being honest is good. The safe honest way is through the app's support, not a new payment to a stranger."
      },
      {
        type: "choice",
        question: "Why might the money a stranger sent you vanish later?",
        answers: [
          { text: "It may come from a stolen card and get pulled back", right: true },
          { text: "Payment apps delete money from strangers after one week" },
          { text: "It can't vanish. Once it arrives, it is mine" }
        ],
        why: "When a stolen card is reported, that payment can be pulled back. Anything you sent stays sent."
      },
      {
        type: "order",
        question: "Money arrived from a stranger who wants it back. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Open support inside the real app",
          "Let the app reverse the payment",
          "Block the stranger"
        ],
        why: "Get help first. The app can reverse the payment safely. Block last, so support can still see the messages. You are not in trouble."
      }
    ],
    rule: "Money sent by mistake? Let the app fix it.",
    sources: [
      {
        name: "Venmo Help: Common scams on Venmo (payments from strangers)",
        url: "https://help.venmo.com/cs/articles/common-scams-on-venmo-vhel167"
      }
    ]
  },
  {
    id: "s-prize-playing",
    icon: "🏆",
    title: "A prize for playing?",
    minutes: 4,
    learn: [
      {
        icon: "🎉",
        title: "You won! Or did you?",
        text: "A page in your game's colors says you <b>won a prize for playing</b>. To claim it, you just need to type in <b>card numbers</b>.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "game-rewards-club.net/winner",
              flag: true,
              why: "Not the real game's site. A prize page on a random site is a trap."
            },
            {
              role: "big",
              text: "🎉 You won a $100 gift card for playing!",
              flag: true,
              why: "You didn't enter anything. A surprise prize is the bait."
            },
            { role: "line", text: "Your prize ships in 3 to 5 days" },
            {
              role: "field",
              text: "Card number",
              flag: true,
              why: "Real prizes are free. No prize needs a card number."
            },
            { role: "button", text: "CLAIM MY PRIZE" }
          ]
        },
        keep: "Have to pay or give a card? Then there is no prize."
      },
      {
        icon: "💳",
        title: "\"Just for shipping\"",
        text: "They say the card is just for a <b>small fee</b> or an age check. The FTC, the US government's scam watchdog, says paying for a prize means a scam."
      },
      {
        icon: "🧠",
        title: "Why it works on kids",
        text: "They know most kids don't have a card. They hope you will <b>borrow a parent's</b> without asking. The \"reward\" feeling makes it seem fair.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🎁", text: "A prize you never entered to win" },
            { icon: "💳", text: "A card number \"for shipping\" or \"to check your age\"" },
            { icon: "⏰", text: "A timer to claim it fast" },
            { icon: "🔑", text: "Your game password to \"send the prize\"" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this prize page.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "player-prize-claim.co/claim",
              flag: true,
              why: "Not the real game. Prize pages on random sites are traps."
            },
            {
              role: "big",
              text: "Thanks for playing! Claim 13,500 free V-Bucks",
              flag: true,
              why: "V-Bucks only come from the real game store."
            },
            { role: "line", text: "Step 1: Pick your platform" },
            {
              role: "field",
              text: "Parent's card number (for age check)",
              flag: true,
              why: "A prize page has no reason to take a card. This takes money."
            },
            { role: "button", text: "CLAIM" }
          ]
        },
        why: "A fake address, a huge free prize and a card number box. There is no prize."
      },
      {
        type: "choice",
        question: "The prize page says the card is only to pay $1.99 shipping. Is that okay?",
        answers: [
          { text: "No. If you must pay, there is no prize", right: true },
          { text: "Yes. $1.99 is cheap for a big prize" },
          { text: "Yes, if I pay my parent back later" }
        ],
        why: "A small fee is how they get the card number. After that, they can charge much more."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "game",
          game: "Starbit Arena",
          parts: [
            { role: "title", text: "Level 10 complete! 🎉" },
            { role: "line", text: "You earned 50 coins for playing." },
            { role: "button", text: "Collect" },
            { role: "close", text: "Close" }
          ]
        },
        answer: "real",
        why: "It is the game's own screen. It gives game coins for playing and asks for nothing. Real rewards never need a card."
      },
      {
        type: "choice",
        question: "You typed a parent's card on a prize page. What first?",
        answers: [
          { text: "Tell the card's owner right away, so they can stop it", right: true },
          { text: "Wait a few days and see if any money goes" },
          { text: "Delete my browser history so nobody finds out" }
        ],
        why: "Telling fast means the bank can stop the card. You are not in trouble."
      }
    ],
    rule: "Real prizes are free. Never type a card number.",
    sources: [
      {
        name: "FTC: Fake prize, sweepstakes, and lottery scams",
        url: "https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams"
      },
      {
        name: "Kaspersky (2024): Threats behind the screen, fake prize pages for young gamers",
        url: "https://www.kaspersky.com/blog/young-gamers-report-2024"
      }
    ]
  },
  {
    id: "s-gift-card",
    icon: "🎁",
    title: "The gift card ask",
    minutes: 3,
    learn: [
      {
        icon: "🎁",
        title: "Why scammers love gift cards",
        text: "Once someone has the <b>numbers on the back</b> of a gift card, the money is theirs. It is fast, and it is very hard to get back."
      },
      {
        icon: "🎭",
        title: "Who asks for them",
        text: "Fake staff, a \"friend\" in a game, or an email that looks like your <b>principal</b>. The way they want to be paid gives them away.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "Support_Team_Roblox",
          note: "not on your friends list",
          parts: [
            {
              role: "them",
              time: "8:15 pm",
              text: "Your account will be banned for cheating.",
              flag: true,
              why: "Scaring you first is the hook."
            },
            { role: "me", time: "8:16 pm", text: "but i didnt cheat" },
            {
              role: "them",
              time: "8:16 pm",
              text: "Pay the unban fee with a Roblox gift card. Send the code here.",
              flag: true,
              why: "No real company asks for gift card codes in a chat."
            },
            {
              role: "them",
              time: "8:17 pm",
              text: "Do not tell your parents or the ban is forever.",
              flag: true,
              why: "A secret from your family is the warning sign."
            }
          ]
        }
      },
      {
        icon: "🛑",
        title: "The gift card rule",
        text: "The FTC, the US government's scam watchdog, says <b>no real business or government</b> will tell you to pay with a gift card. Gift cards are presents, not payments.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "⚖️", text: "\"Pay this fine or fee with gift cards\"" },
            { icon: "🔢", text: "\"Send me the numbers on the back\"" },
            { icon: "🛒", text: "\"Buy some for me, I'll pay you back\"" },
            { icon: "🤫", text: "\"Keep this secret from your parents\"" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "\"Staff\" say pay a fine with gift cards or lose your account. What do you do?",
        answers: [
          { text: "Block them, and tell a parent, or another adult you trust", right: true },
          { text: "Pay it. Losing my whole account would be worse" },
          { text: "Ask if I can pay with a smaller gift card" }
        ],
        why: "No real company takes gift cards for fines. Real game warnings are inside the app, not in a chat."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags in this email.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "principal.jones.school@freemail-box.com",
              flag: true,
              why: "A school email from a free mail site. Not your school's address."
            },
            { role: "subject", text: "Staff surprise this Friday" },
            {
              role: "line",
              text: "I need 4 gift cards for a staff surprise. I will pay you back.",
              flag: true,
              why: "A principal would not ask a student to buy gift cards."
            },
            {
              role: "line",
              text: "Scratch the back and send me photos of the codes.",
              flag: true,
              why: "The codes are the money. Whoever has them can spend it."
            },
            { role: "line", text: "Thanks, Principal Jones" }
          ]
        },
        why: "A free mail address, a gift card favor and a code ask. Show a parent, or another adult you trust."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Grandma",
          parts: [
            { role: "them", time: "10:03 am", text: "happy birthday!! there's a gift card inside your card 🎂" },
            { role: "me", time: "10:05 am", text: "thank you grandma!!" }
          ]
        },
        answer: "real",
        why: "She is giving you a gift card, not asking for one. The warning sign is anyone asking YOU to buy one and send the code."
      },
      {
        type: "choice",
        question: "Which of these is the biggest red flag in a message?",
        answers: [
          { text: "\"Send me photos of the codes on the back\"", right: true },
          { text: "\"I'll send you a gift card for your birthday\"" },
          { text: "\"Can you help me pick a gift for my mom?\"" }
        ],
        why: "The codes are the money. Anyone asking for them wants to spend it."
      }
    ],
    rule: "Anyone asking for gift card codes is a scammer.",
    sources: [
      {
        name: "FTC: Avoiding and reporting gift card scams",
        url: "https://consumer.ftc.gov/articles/avoiding-and-reporting-gift-card-scams"
      }
    ]
  }
];
