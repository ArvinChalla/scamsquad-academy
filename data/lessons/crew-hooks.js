/* ========================================================================
   crew-hooks.js
   Lessons for ages 14 to 18, in the Apps that hook you world.
   How to write a lesson: see FORMAT.md in this folder.

   Feeds: teach the mechanism only. Never show self-harm or
   eating-disorder content, even as an example.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-endless-feed",
    icon: "🌀",
    title: "The feed that won't stop",
    minutes: 4,
    learn: [
      {
        icon: "👀",
        title: "It learns from what you watch",
        text: "Feeds learn from <b>what you watch</b> and <b>for how long</b>. Pausing on a video tells the feed to show you <b>more like it</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⏸️", text: "You pause on one kind of video." },
            { icon: "📲", text: "The feed shows you more like it." },
            { icon: "⏱️", text: "You watch longer, so it learns faster." },
            { icon: "🔁", text: "Soon your feed is mostly one topic." }
          ]
        },
        keep: "Every pause is a vote for more of the same."
      },
      {
        icon: "♾️",
        title: "No natural stopping point",
        text: "Endless scroll and autoplay remove the moment where you'd stop. Pew found <b>45%</b> of US teens say they spend <b>too much time</b> on social media.",
        picture: {
          kind: "post",
          app: "YouTube",
          author: "nightdrive.clips",
          handle: "a channel you watch",
          video: true,
          parts: [
            { role: "media", text: "Video: a car driving through a city at night" },
            { role: "caption", text: "3 hours of night driving, no talking" },
            {
              role: "link",
              text: "Up next in 3...",
              flag: true,
              why: "The next video starts before you decide. Deciding is the stopping point."
            },
            {
              role: "button",
              text: "Autoplay: on",
              flag: true,
              why: "On by default, so stopping takes effort and watching takes none."
            }
          ]
        },
        keep: "It's the design, not a weakness in you."
      },
      {
        icon: "🧹",
        title: "You can retrain it",
        text: "A feed can be <b>reset</b>. YouTube, for example, lets you remove watch history and mark videos <b>Not interested</b>. Other apps have similar settings.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🙅", text: "Tap Not interested on videos you don't want" },
            { icon: "🚫", text: "Use Don't recommend this channel" },
            { icon: "🗑️", text: "Remove or pause watch history" },
            { icon: "➕", text: "Search and follow what you actually want more of" },
            { icon: "⏲️", text: "Turn off autoplay and set a time limit" }
          ]
        }
      },
      {
        icon: "💜",
        title: "Feeling worse after scrolling?",
        text: "That's a signal, not a weakness. <b>You are not in trouble.</b> Reset the feed, and tell a parent, or another adult you trust. Struggling? Call or text <b>988</b>."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 design tricks on this screen that keep you watching.",
        picture: {
          kind: "post",
          app: "TikTok",
          author: "guitar.with.dev",
          handle: "a creator you follow",
          video: true,
          parts: [
            { role: "media", text: "Video: someone learning a guitar riff" },
            { role: "caption", text: "day 3 of learning guitar 🎸" },
            {
              role: "link",
              text: "Next video in 3... autoplay on",
              flag: true,
              why: "It starts the next one before you choose."
            },
            {
              role: "button",
              text: "Swipe up. There's always more",
              flag: true,
              why: "Endless scroll removes the natural place to stop."
            },
            {
              role: "button",
              text: "4 friends are live now. Don't miss it!",
              flag: true,
              why: "Fear of missing out pulls you back."
            }
          ]
        },
        why: "Autoplay, endless scroll and FOMO alerts are built to keep you watching. The app's settings are where you push back."
      },
      {
        type: "choice",
        question: "Your feed is suddenly full of one kind of video. Why?",
        answers: [
          { text: "You paused or rewatched a few, so it learned", right: true },
          { text: "Everyone is seeing the same thing" },
          { text: "It's random, nothing you did" }
        ],
        why: "Watch time is a strong signal. A few long looks can reshape the whole feed."
      },
      {
        type: "tap",
        question: "You don't want more videos like this one. Tap the best option.",
        picture: {
          kind: "post",
          app: "YouTube",
          author: "prank.zone.daily",
          handle: "recommended for you",
          video: true,
          parts: [
            { role: "media", text: "Video: a loud prank on a stranger" },
            { role: "button", text: "Save" },
            { role: "button", text: "Share" },
            { role: "button", text: "Not interested", right: true }
          ]
        },
        why: "Not interested is a clear signal to show less like it. Scrolling past is only a weak one."
      },
      {
        type: "choice",
        question: "Your feed keeps making you feel worse. What helps most?",
        answers: [
          { text: "Clear your watch history and tap Not interested on repeats", right: true },
          { text: "Scroll faster past the bad videos" },
          { text: "Keep watching. The feed will change by itself" }
        ],
        why: "Clearing history and Not interested retrain the feed. Feeling worse is worth telling a parent, or another adult you trust, too."
      }
    ],
    rule: "Your feed learns from you. You can retrain it.",
    sources: [
      {
        name: "YouTube Help: Manage your recommendations and search results",
        url: "https://support.google.com/youtube/answer/6342839?hl=en"
      },
      {
        name: "Pew Research Center (April 2025): Teens, social media and mental health",
        url: "https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/"
      }
    ]
  },
  {
    id: "c-streaks-fomo",
    icon: "🔥",
    title: "Don't break your streak",
    minutes: 3,
    learn: [
      {
        icon: "⏳",
        title: "A habit turned into a debt",
        text: "Streaks make you feel you <b>owe</b> the app a visit. Snapchat shows an <b>hourglass</b> when a streak is about to end. Miss a day, and it's \"gone\".",
        picture: {
          kind: "notification",
          parts: [
            { role: "app", text: "Snapchat", time: "10:02 pm" },
            { role: "title", text: "🔥 Your 212-day streak with Sam ends in 2 hours!" },
            {
              role: "line",
              text: "⏳ Don't let Sam down",
              flag: true,
              why: "Guilt about a friend keeps you coming back."
            },
            { role: "app", text: "Snapchat", time: "10:30 pm" },
            { role: "title", text: "Streak lost?" },
            {
              role: "line",
              text: "Restore it for $0.99",
              flag: true,
              why: "The fear of losing it is turned into a sale."
            }
          ]
        },
        keep: "A streak is a number. Your friend is still your friend."
      },
      {
        icon: "😰",
        title: "FOMO is the product",
        text: "Timers, \"only today\" deals and \"your friends are online\" alerts use <b>fear of missing out</b>. Feeling rushed is your cue to <b>slow down</b>.",
        keep: "The timer is the trick."
      },
      {
        icon: "🛌",
        title: "Take back control",
        text: "Pew found <b>45%</b> of US teens say social media hurts how much they <b>sleep</b>. A few settings help a lot.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🔕", text: "Turn off notifications you don't need" },
            { icon: "💬", text: "Tell friends you're dropping streaks" },
            { icon: "🌙", text: "Phone out of the bedroom at night" },
            { icon: "⏲️", text: "Set app time limits" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 FOMO tricks on this game screen.",
        picture: {
          kind: "game",
          game: "Skyrift Legends",
          parts: [
            { role: "close", text: "Close" },
            { role: "title", text: "Daily reward!" },
            {
              role: "line",
              text: "Log in 3 more days for the legendary skin",
              flag: true,
              why: "Makes skipping a day feel like losing something."
            },
            {
              role: "line",
              text: "Shop resets in 00:14:59",
              flag: true,
              why: "A timer rushes you to buy before you think."
            },
            {
              role: "line",
              text: "4 friends are online now",
              flag: true,
              why: "Built to make you feel left out if you leave."
            },
            { role: "line", text: "Today: 50 coins collected" },
            { role: "button", text: "Collect" }
          ]
        },
        why: "Login rewards, timers and \"friends online\" are all built to pull you back. Noticing them is the first step."
      },
      {
        type: "choice",
        question: "Why does the app warn you that your streak is about to end?",
        answers: [
          { text: "So you open it again, every single day", right: true },
          { text: "To help you look after your friendships" },
          { text: "Because the streak really matters to your friend" }
        ],
        why: "Daily opens are what the app wants. Your friend will still be your friend without the number."
      },
      {
        type: "choice",
        question: "You want to sleep but this keeps pinging. What helps most?",
        picture: {
          kind: "notification",
          parts: [
            { role: "app", text: "Snapchat", time: "11:48 pm" },
            { role: "title", text: "Sam sent you a snap" },
            { role: "line", text: "Your streak is at risk!" },
            { role: "app", text: "Snapchat", time: "11:52 pm" },
            { role: "title", text: "Sam is typing..." }
          ]
        },
        answers: [
          { text: "Turn off these notifications in settings", right: true },
          { text: "Open the app so the alerts stop" },
          { text: "Reply to Sam so the streak is safe" }
        ],
        why: "Turning them off stops the pings tonight and every night. Opening the app starts the loop again."
      },
      {
        type: "choice",
        question: "\"Only 2 left! Offer ends in 5 minutes!\" What is the smart move?",
        answers: [
          { text: "Close it. A real deal survives you thinking", right: true },
          { text: "Buy fast before it's gone" },
          { text: "Wait until 1 minute left, then buy" }
        ],
        why: "The countdown is there to rush you. If you'd still want it tomorrow, decide then."
      }
    ],
    rule: "The timer is the trick. Slow down.",
    sources: [
      {
        name: "Snapchat Support: What are Snapstreaks?",
        url: "https://help.snapchat.com/hc/en-us/articles/7012394193684-What-are-Snapstreaks-and-how-do-I-keep-them-going"
      },
      {
        name: "Pew Research Center (April 2025): Teens, social media and mental health",
        url: "https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/"
      }
    ]
  },
  {
    id: "c-loot-and-skins",
    icon: "🎰",
    title: "Loot boxes and skin flips",
    minutes: 4,
    learn: [
      {
        icon: "📦",
        title: "Pay first, find out after",
        text: "A loot box takes money, then gives a <b>random</b> item. The ESRB marks games with these <b>\"In-Game Purchases (Includes Random Items)\"</b>.",
        picture: {
          kind: "game",
          game: "Skyrift Legends",
          parts: [
            { role: "close", text: "Close" },
            { role: "title", text: "MYSTIC CRATE" },
            {
              role: "line",
              text: "Legendary drop chance: see small print",
              flag: true,
              why: "The odds are hidden because they are tiny."
            },
            {
              role: "line",
              text: "So close! You nearly got the legendary!",
              flag: true,
              why: "A near miss makes you feel almost lucky. That feeling is designed."
            },
            {
              role: "line",
              text: "Only 2 crates left at this price. 04:59",
              flag: true,
              why: "A timer rushes you into one more go."
            },
            { role: "price", text: "500 gems" },
            { role: "button", text: "OPEN CRATE" }
          ]
        },
        keep: "A paid random box works like a slot machine."
      },
      {
        icon: "🪙",
        title: "Skin gambling is gambling",
        text: "Sites that let you bet <b>skins</b> often skip the <b>age check</b> and the license. Skins are worth real money, so this is <b>real gambling</b>.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "flipskinz.bet" },
            { role: "big", text: "Double your skins in one flip!" },
            {
              role: "button",
              text: "Log in with your game account",
              flag: true,
              why: "Logging in with your game account on a strange site can hand it over."
            },
            {
              role: "line",
              text: "No ID needed",
              flag: true,
              why: "No age check. Licensed betting must check age. No check, no rules."
            },
            {
              role: "line",
              text: "jakeyy won +$200 · k1ra won +$310",
              flag: true,
              why: "You only see winners. The losers stay quiet."
            },
            { role: "line", text: "Deposit skins to start" }
          ]
        }
      },
      {
        icon: "📊",
        title: "The quiet losses",
        text: "Sites show a feed of wins. Losses stay quiet. A UK Gambling Commission survey found <b>4%</b> of 11 to 17 year olds had already bet with in-game items.",
        keep: "The winners are loud. The losers stay quiet."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags on this skin site.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "skinroll-arena.gg" },
            { role: "big", text: "Spin to win rare knives!" },
            {
              role: "line",
              text: "No verification, play in seconds",
              flag: true,
              why: "No age or ID check means no license and no protection."
            },
            {
              role: "line",
              text: "Live wins: +$420, +$95, +$1,200",
              flag: true,
              why: "A feed of only winners hides how many lose."
            },
            {
              role: "line",
              text: "Free first spin with promo code from your favorite streamer",
              flag: true,
              why: "Streamer codes pull you in. The streamer may be paid to promote it."
            },
            { role: "line", text: "Dark mode available" },
            { role: "button", text: "DEPOSIT SKINS" }
          ]
        },
        why: "No checks, a winners-only feed and paid promo codes. The site is built so you deposit and lose."
      },
      {
        type: "choice",
        question: "Your friend is up $200 this week on a skin site. What aren't you hearing?",
        answers: [
          { text: "His losses, and everyone else's", right: true },
          { text: "Nothing. He's just good at it" },
          { text: "How easy it is to win" }
        ],
        why: "People share wins and hide losses. Betting sites are built so that, over time, the site comes out ahead."
      },
      {
        type: "choice",
        question: "A game's rating says \"Includes Random Items\". What does that tell you?",
        answers: [
          { text: "You can pay without knowing what you'll get", right: true },
          { text: "The game is free to play" },
          { text: "Items are handed out fairly to everyone" }
        ],
        why: "The ESRB uses that label for loot boxes, card packs, prize wheels and similar paid random rewards."
      },
      {
        type: "order",
        question: "You've lost more skins than you meant to. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Stop depositing",
          "Remove saved cards and unlink your game account"
        ],
        why: "Tell someone, then stop so you protect what's left. Free, private help any time: call or text 1-800-MY-RESET."
      }
    ],
    rule: "Paid random rewards are gambling. Know when to walk.",
    sources: [
      {
        name: "ESRB: In-Game Purchases (Includes Random Items)",
        url: "https://www.esrb.org/blog/in-game-purchases-includes-random-items/"
      },
      {
        name: "UK Gambling Commission (2024): Young People and Gambling, online gambling summary",
        url: "https://www.gamblingcommission.gov.uk/report/young-people-and-gambling-2024-official-statistics/ypg-2024-online-gambling-summary"
      },
      {
        name: "National Council on Problem Gambling: National Problem Gambling Helpline",
        url: "https://ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
      }
    ]
  }
];
