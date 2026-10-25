/* ========================================================================
   squad-hooks.js
   Lessons for ages 10 to 13, in the Apps that hook you world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-loot-box",
    icon: "🎁",
    title: "The mystery box",
    minutes: 4,
    learn: [
      {
        icon: "📦",
        title: "What's in the box?",
        text: "A loot box is a <b>mystery box</b> you pay for. You don't know what's inside. It <b>may or may not</b> have the thing you want.",
        picture: {
          kind: "game",
          game: "Gemfall Isles",
          parts: [
            { role: "title", text: "🎁 Legendary Chest" },
            {
              role: "price",
              text: "Open for 160 Gems",
              flag: true,
              why: "Gems hide the real price. How many dollars is 160 Gems?"
            },
            {
              role: "line",
              text: "Chance of Golden Dragon: very rare",
              flag: true,
              why: "Tiny odds are easy to hide. You might never get it."
            },
            {
              role: "button",
              text: "OPEN 10 MORE",
              flag: true,
              why: "Buying more doesn't promise the prize. Each box is a new gamble."
            },
            { role: "close", text: "Close" }
          ]
        },
        keep: "Before you open one, ask: how much is this in real money?"
      },
      {
        icon: "💱",
        title: "Gems hide the real price",
        text: "Games turn money into <b>gems, coins or crystals</b>. Swapping between them hides the <b>real cost</b>. The FTC, the US government's scam watchdog, said one game did exactly this."
      },
      {
        icon: "⚖️",
        title: "When the FTC stepped in",
        text: "In 2025 the FTC said the maker of <b>Genshin Impact</b> misled players about the <b>odds</b> of top prizes. Some players spent <b>hundreds or thousands of dollars</b>.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Ask a parent, or another adult you trust, before buying any box" },
            { icon: "🧮", text: "Work out the price in real money" },
            { icon: "🛑", text: "Set a spending limit with them" },
            { icon: "🎲", text: "Remember: you might never get the prize" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this offer.",
        picture: {
          kind: "game",
          game: "Gemfall Isles",
          parts: [
            { role: "title", text: "MEGA LOOT BOX SALE" },
            {
              role: "line",
              text: "Only 2 hours left!",
              flag: true,
              why: "A timer rushes you so you don't think about the cost."
            },
            {
              role: "price",
              text: "500 Crystals. Buy Crystals in the shop.",
              flag: true,
              why: "Crystals hide the real money price."
            },
            {
              role: "line",
              text: "Odds: secret",
              flag: true,
              why: "If you can't see the odds, you can't know your chances."
            },
            { role: "button", text: "BUY ONE BOX" },
            { role: "close", text: "Close" }
          ]
        },
        why: "A timer, a hidden price and hidden odds. All three push you to spend without thinking."
      },
      {
        type: "choice",
        question: "You opened 6 boxes and still don't have the skin. What is true?",
        answers: [
          { text: "There's no promise the next box has it", right: true },
          { text: "I'm due a win, so it must be soon" },
          { text: "If I keep spending, it pays off in the end" }
        ],
        why: "Boxes are made so you keep paying. Stop and talk to a parent, or another adult you trust."
      },
      {
        type: "choice",
        question: "A box costs 300 Gems. What should you check first?",
        answers: [
          { text: "How much 300 Gems costs in real money", right: true },
          { text: "How cool the box looks in the shop" },
          { text: "What my friends got from their boxes" }
        ],
        why: "Gems hide real money. Working out the price helps you decide with a parent, or another adult you trust."
      },
      {
        type: "tap",
        question: "You want to stop buying spins. Tap the safe way out.",
        picture: {
          kind: "game",
          game: "Gemfall Isles",
          parts: [
            { role: "title", text: "Lucky Spin!" },
            { role: "line", text: "So close! Next spin only 99 Gems" },
            { role: "button", text: "SPIN AGAIN" },
            { role: "button", text: "SPIN 10 TIMES" },
            { role: "close", text: "Close", right: true }
          ]
        },
        why: "This is the game's own screen, so its Close really closes it. On a page a trickster made, close the whole tab or app."
      }
    ],
    rule: "Before any box, ask: how much in real money?",
    sources: [
      {
        name: "FTC (2025): Settlement bans Genshin Impact loot box sales to kids under 16 without parents",
        url: "https://consumer.ftc.gov/consumer-alerts/2025/01/ftc-settlement-order-bans-sales-genshin-impact-loot-boxes-kids-under-16-without-their-parents"
      },
      {
        name: "FTC (2025): Genshin Impact developer press release",
        url: "https://www.ftc.gov/news-events/news/press-releases/2025/01/genshin-impact-game-developer-will-be-banned-selling-lootboxes-teens-under-16-without-parental"
      }
    ]
  },
  {
    id: "s-streaks",
    icon: "🔥",
    title: "Don't break your streak",
    minutes: 3,
    learn: [
      {
        icon: "🔥",
        title: "The streak counter",
        text: "Apps count the <b>days in a row</b> you open them. Miss one and it goes back to zero. It is built to make you <b>come back every day</b>.",
        picture: {
          kind: "notification",
          parts: [
            { role: "app", text: "PicChat", time: "11:48 pm" },
            {
              role: "title",
              text: "🔥 Your 87-day streak ends tonight!",
              flag: true,
              why: "The scary message is there to pull you back, even late at night."
            },
            {
              role: "line",
              text: "Don't let Sam down. Your streak together is at risk.",
              flag: true,
              why: "Using a friend to make you feel guilty is a hook."
            },
            { role: "app", text: "PicChat", time: "11:50 pm" },
            { role: "title", text: "Restore your streak" },
            {
              role: "line",
              text: "Save it for 50 coins",
              flag: true,
              why: "Paying to fix a bad feeling is how the app makes money."
            }
          ]
        },
        keep: "A streak is a number, not a friendship."
      },
      {
        icon: "😟",
        title: "How it makes you feel",
        text: "Common Sense Media says <b>many teens feel pressure</b> to keep streaks going, even sending random snaps just to keep them. That stress is a sign to <b>step back</b>."
      },
      {
        icon: "🔕",
        title: "Take back control",
        text: "You can <b>mute streak reminders</b> in settings. Tell friends you are taking a break. A real friend cares about you, not a number.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🔕", text: "Mute streak reminders in settings" },
            { icon: "💬", text: "Tell friends you're ending streaks" },
            { icon: "🌙", text: "Pick a phone bedtime with your family" },
            { icon: "🧭", text: "Notice when an app makes you feel bad" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Why do apps use streaks?",
        answers: [
          { text: "To get you to open the app every day", right: true },
          { text: "To reward you for being a good friend" },
          { text: "To help you remember to message people" }
        ],
        why: "Streaks are built to keep you checking in. Knowing that helps you choose for yourself."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags in these notifications.",
        picture: {
          kind: "notification",
          parts: [
            { role: "app", text: "PicChat", time: "11:48 pm" },
            {
              role: "title",
              text: "😢 Your streak with Jess is about to die",
              flag: true,
              why: "Sad words make you feel guilty, so you open the app."
            },
            {
              role: "line",
              text: "Only 12 minutes left!",
              flag: true,
              why: "Late-night pressure steals your sleep. The timer is the trick."
            },
            { role: "app", text: "PicChat", time: "11:49 pm" },
            { role: "title", text: "Jess sent you a photo" },
            {
              role: "line",
              text: "Restore your streak for 99 coins",
              flag: true,
              why: "Paying to fix a feeling is how the app makes money."
            }
          ]
        },
        why: "Guilt, a late-night timer and a price to fix it. The app wins either way."
      },
      {
        type: "choice",
        question: "You missed a day and lost your 200-day streak. What is true?",
        answers: [
          { text: "It's just a number. The friendship is still there", right: true },
          { text: "My friend will think I don't care about them" },
          { text: "I should pay to get it back right away" }
        ],
        why: "Streaks are made to make you feel bad for missing a day. A real friend cares about you, not the count."
      },
      {
        type: "choice",
        question: "What is a good way to stop streak stress?",
        answers: [
          { text: "Mute streak reminders and tell friends I'm stopping", right: true },
          { text: "Set alarms so I never miss a single day" },
          { text: "Give a friend my login to keep it going" }
        ],
        why: "Giving anyone your login is risky. Muting reminders takes the pressure away."
      }
    ],
    rule: "A streak is a number, not a friendship.",
    sources: [
      {
        name: "Common Sense Media: Parents' ultimate guide to Snapchat (streaks)",
        url: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-snapchat"
      },
      {
        name: "FTC (2022): Report on dark patterns that trick and trap people",
        url: "https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers"
      }
    ]
  },
  {
    id: "s-fake-timer",
    icon: "⏰",
    title: "Only 3 minutes left!",
    minutes: 3,
    learn: [
      {
        icon: "⏳",
        title: "The timer that resets",
        text: "A game shop says <b>\"Sale ends in 3 minutes!\"</b> Next day, the same timer is back. The FTC, the US government's scam watchdog, calls fake timers a <b>dark pattern</b>.",
        picture: {
          kind: "game",
          game: "Starbit Arena",
          parts: [
            {
              role: "title",
              text: "⏰ Sale ends in 02:59",
              flag: true,
              why: "The rush is the point. A real deal can wait while you ask."
            },
            {
              role: "line",
              text: "Only 2 left at this price!",
              flag: true,
              why: "You can't check this is true. It is there to push you."
            },
            {
              role: "line",
              text: "37 people are looking at this now",
              flag: true,
              why: "Numbers like this make you buy before you think."
            },
            { role: "price", text: "$4.99" },
            { role: "button", text: "BUY NOW" },
            { role: "close", text: "Close" }
          ]
        },
        keep: "The timer is the trick."
      },
      {
        icon: "🧠",
        title: "Why rushing works",
        text: "When you feel rushed, you <b>stop checking</b>. You don't ask anyone. You don't compare prices. That is exactly why the timer is there."
      },
      {
        icon: "🎮",
        title: "Games do it too",
        text: "\"Last chance\" deals and confusing buttons can make you <b>buy by mistake</b>. The FTC said Fortnite's maker used tricky buttons that caused <b>unwanted charges</b>.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "⏸️", text: "Wait a day before buying" },
            { icon: "🗣️", text: "Ask a parent, or another adult you trust" },
            { icon: "❌", text: "Close the shop and come back later" },
            { icon: "🔒", text: "Ask the adult who pays to turn on purchase approval" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this game shop offer.",
        picture: {
          kind: "game",
          game: "Starbit Arena",
          parts: [
            { role: "title", text: "Starter Bundle: 500 coins and a pet" },
            {
              role: "line",
              text: "Offer ends in 00:04:59",
              flag: true,
              why: "A countdown rushes you so you skip asking."
            },
            {
              role: "line",
              text: "Only 1 bundle left!",
              flag: true,
              why: "You can't check this. It is there to rush you."
            },
            {
              role: "line",
              text: "12 people bought this in the last minute",
              flag: true,
              why: "This is there to make you feel left behind."
            },
            { role: "price", text: "$4.99" },
            { role: "button", text: "BUY NOW" },
            { role: "close", text: "Close" }
          ]
        },
        why: "A countdown, a fake \"last one\" and a crowd. All three rush you."
      },
      {
        type: "choice",
        question: "A deal says it ends in 5 minutes. What is the smart move?",
        answers: [
          { text: "Close it and wait a day. Deals come back", right: true },
          { text: "Buy fast, before it's gone for good" },
          { text: "Buy it now and ask about it later" }
        ],
        why: "The rush is there to stop you asking. If the deal is gone, you lost nothing."
      },
      {
        type: "tap",
        question: "You don't want this pack. Tap the safe way to close it.",
        picture: {
          kind: "game",
          game: "Starbit Arena",
          parts: [
            { role: "title", text: "LAST CHANCE! Starter pack 70% off" },
            { role: "line", text: "Ends in 00:59" },
            { role: "button", text: "YES, BUY IT" },
            { role: "button", text: "No, I don't want to get stronger" },
            { role: "close", text: "Close", right: true }
          ]
        },
        why: "This is the game's own shop, so its Close is real. The mean \"No\" button is there to make you feel bad."
      },
      {
        type: "choice",
        question: "You come back the next day and the same timer is running again. What does it show?",
        answers: [
          { text: "The timer was fake, made to rush me", right: true },
          { text: "I'm lucky, the sale got longer for me" },
          { text: "The shop has a bug in its timer" }
        ],
        why: "A timer that keeps restarting was never real. The FTC calls fake countdown timers a dark pattern, a design trick."
      }
    ],
    rule: "The timer is the trick. Wait and ask.",
    sources: [
      {
        name: "FTC (2022): Report on dark patterns that trick and trap people",
        url: "https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers"
      },
      {
        name: "FTC (2022): Fortnite maker Epic Games and unwanted charges",
        url: "https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations"
      }
    ]
  }
];
