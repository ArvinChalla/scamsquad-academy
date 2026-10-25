/* ========================================================================
   crew-realfake.js
   Lessons for ages 14 to 18, in the Real or fake? world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-bot-or-person",
    icon: "👥",
    title: "Bot or person?",
    minutes: 4,
    learn: [
      {
        icon: "👥",
        title: "A crowd of one",
        text: "The FBI warns criminals use AI to make <b>lots of fake profiles</b> with realistic photos. A comment section full of praise can be <b>one person</b> with many accounts.",
        picture: {
          kind: "post",
          app: "Chirp",
          author: "moonshot.mike",
          handle: "@moonshot.mike",
          parts: [
            { role: "media", text: "Screenshot of a trading app showing +1,450%" },
            { role: "caption", text: "Turned $200 into $3,100 with ZORBLE coin 🚀" },
            {
              role: "comment",
              text: "@crypto_kate_8812: wow this is real, I made 4x too!",
              flag: true,
              why: "Same words as other replies. Copy-paste praise is a bot sign."
            },
            {
              role: "comment",
              text: "@mike_trades_4471: wow this is real, I made 4x too!",
              flag: true,
              why: "A new name, the same message. Probably the same operator."
            },
            { role: "comment", text: "@jules.k: is there a source for this?" },
            {
              role: "comment",
              text: "@ana_gains_5530 (joined this week): wow this is real, I made 4x too!",
              flag: true,
              why: "A third copy from a brand new account. A crowd like this points to a bot network."
            }
          ]
        },
        keep: "Lots of agreement is not proof. It can be bought."
      },
      {
        icon: "🚩",
        title: "Bot clues",
        text: "None of these proves it alone. Several together should make you stop.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🐣", text: "Brand new account, hundreds of posts" },
            { icon: "🔢", text: "Name that ends in a long number" },
            { icon: "📋", text: "Same words as other replies" },
            { icon: "📢", text: "Only ever posts about one coin or product" },
            { icon: "🖼️", text: "A perfect face, and no real friends or photos" }
          ]
        }
      },
      {
        icon: "⭐",
        title: "Fake reviews work the same",
        text: "The FTC says watch for a <b>burst</b> of reviews in a short time, and reviewers who made an account just to post <b>one review</b>.",
        keep: "Check reviews on more than one site."
      },
      {
        icon: "🔎",
        title: "Seen it? Check it elsewhere",
        text: "Search the claim with <b>scam</b> or <b>review</b> on sites you find yourself. Already bought or paid? <b>You are not in trouble.</b> Tell a parent, or another adult you trust.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "🏦", text: "Call the bank or app if you paid" },
            { icon: "🚩", text: "Report the accounts on the platform" },
            { icon: "🚨", text: "Report it at ReportFraud.ftc.gov" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 replies that look like bots.",
        picture: {
          kind: "post",
          app: "Chirp",
          author: "playtoearn.daily",
          handle: "@playtoearn.daily",
          parts: [
            { role: "caption", text: "This app paid me $500 just for playing games 🎮" },
            {
              role: "comment",
              text: "@gamer_life_20391: legit!! got paid in 2 days 💯",
              flag: true,
              why: "A long number in the name and pure hype."
            },
            { role: "comment", text: "@sam.r: which app? sounds too good" },
            {
              role: "comment",
              text: "@real_reviews_88213: legit!! got paid in 2 days 💯",
              flag: true,
              why: "Word for word the same as another reply."
            },
            { role: "comment", text: "@ty_codes: my cousin tried it, never got paid" },
            {
              role: "comment",
              text: "@winbig_4413 (joined today): best app ever, link in bio",
              flag: true,
              why: "Joined today and pushing a link. Classic bot."
            }
          ]
        },
        why: "Copied words, number names, brand new accounts. The two doubting replies are the real people."
      },
      {
        type: "choice",
        question: "A product has 2,000 five-star reviews, all posted this week. What does that suggest?",
        answers: [
          { text: "The reviews may be fake. Check other sites", right: true },
          { text: "It's very popular, so it must be good" },
          { text: "Nothing. Reviews are always checked" }
        ],
        why: "The FTC says a burst of reviews in a short time can be a sign they are fake."
      },
      {
        type: "realfake",
        question: "Reviews for headphones you want. Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "soundloop-audio-shop.com/headphones/reviews" },
            { role: "big", text: "4.1 stars, 312 reviews over 2 years" },
            { role: "line", text: "★★★★★ Great sound, case feels cheap" },
            { role: "line", text: "★★☆☆☆ Left side died after 8 months" },
            { role: "line", text: "★★★★☆ Good for the price, bass is weak" }
          ]
        },
        answer: "real",
        why: "Mixed stars, spread over years, with specific complaints. Real reviews usually look like this, a bit messy."
      },
      {
        type: "choice",
        question: "Lots of accounts say a coin is \"going to the moon\". What should you do?",
        answers: [
          { text: "Search it yourself on sites you trust first", right: true },
          { text: "Buy a little before everyone else does" },
          { text: "Trust it, so many people can't all be wrong" }
        ],
        why: "Those \"many people\" may be one person's bots. Check it somewhere they don't control."
      }
    ],
    rule: "Seen it? Check it somewhere else.",
    sources: [
      {
        name: "FBI IC3 (2024): Criminals use generative AI to commit fraud",
        url: "https://www.ic3.gov/PSA/2024/PSA241203"
      },
      {
        name: "FTC: How to evaluate online reviews",
        url: "https://consumer.ftc.gov/articles/how-evaluate-online-reviews"
      }
    ]
  },
  {
    id: "c-finfluencer",
    icon: "📈",
    title: "Trust this finfluencer?",
    minutes: 4,
    learn: [
      {
        icon: "💰",
        title: "Who makes money here?",
        text: "A creator charges to join a group that says <b>what to buy and when</b>. Ask one question: <b>who makes money here, and when?</b>",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "💰 Max's Money Club",
          note: "paid group · 2,300 members",
          parts: [
            {
              role: "them",
              name: "Max",
              time: "2:41 pm",
              text: "told you it would go up 🚀 +420% this week",
              flag: true,
              why: "Anyone can post a screenshot of a win. You never see the losses."
            },
            {
              role: "them",
              name: "Max",
              time: "2:42 pm",
              text: "EVERYONE buy ZORBLE coin at exactly 3:00pm Friday",
              flag: true,
              why: "Everyone buying at once makes the price jump. Max already bought, cheap."
            },
            {
              role: "them",
              name: "Max",
              time: "2:42 pm",
              text: "do not sell until I say 🙏",
              flag: true,
              why: "While you wait, Max sells at the top."
            },
            { role: "them", name: "tyler_j", time: "2:43 pm", text: "im in!! 💰" }
          ]
        },
        keep: "If they tell you when to buy, ask when they sell."
      },
      {
        icon: "🎢",
        title: "The pump and dump",
        text: "The SEC calls this a <b>pump and dump</b>: hype a price with misleading claims, then <b>sell into the buying frenzy</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🛒", text: "Before 3:00, Max buys while it's cheap." },
            { icon: "🚀", text: "At 3:00, the group buys. The price jumps." },
            { icon: "💸", text: "Max sells at the top." },
            { icon: "📉", text: "The price crashes. The group holds the loss." }
          ]
        }
      },
      {
        icon: "🚩",
        title: "Finfluencer red flags",
        text: "The FTC says anyone promising <b>guaranteed</b> or quick returns is likely a scammer. All investing has risk.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "📸", text: "Screenshots of huge wins, never losses" },
            { icon: "✅", text: "\"Guaranteed\" or \"can't lose\"" },
            { icon: "⏰", text: "Buy right now, before it's too late" },
            { icon: "💳", text: "A paid group or course is the real product" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this creator's post.",
        picture: {
          kind: "post",
          app: "Instagram",
          author: "richbefore20",
          handle: "312k followers",
          video: true,
          parts: [
            { role: "media", text: "Video: a teen counting cash in a parked car" },
            {
              role: "caption",
              text: "I made $10k in ONE week at 17 💸",
              flag: true,
              why: "A huge win, no proof of losses. That is marketing."
            },
            { role: "comment", text: "lena.v: what did you start with?" },
            { role: "comment", text: "richbefore20: started with a part-time job" },
            {
              role: "comment",
              text: "richbefore20: my system is guaranteed, zero risk",
              flag: true,
              why: "Nobody can guarantee returns. The FTC calls that a scam sign."
            },
            {
              role: "link",
              text: "Course $199, only 20 spots left tonight",
              flag: true,
              why: "The course is how he gets paid. The rush stops you checking."
            }
          ]
        },
        why: "Big wins, \"guaranteed\" and a paid course with a timer. His money comes from you."
      },
      {
        type: "choice",
        question: "A group leader tells everyone to buy a coin at 3:00. Who holds it when it crashes?",
        answers: [
          { text: "The members who bought at 3:00", right: true },
          { text: "The leader, because he bought the most" },
          { text: "Nobody. Everyone sells together" }
        ],
        why: "The leader bought early and sold at the top. The group bought high and is left with the loss."
      },
      {
        type: "realfake",
        question: "This video shows up in your feed. Real or fake?",
        picture: {
          kind: "post",
          app: "TikTok",
          author: "dm.me.START",
          handle: "account made 2 weeks ago",
          video: true,
          parts: [
            { role: "media", text: "Video: a phone screen full of green charts" },
            { role: "caption", text: "comment START and I'll DM you my crypto signals. my students made 300% last month" },
            { role: "link", text: "First week free, then $79" }
          ]
        },
        answer: "fake",
        why: "Unproven huge returns, private DMs and a subscription. You are the customer, not the winner."
      },
      {
        type: "choice",
        question: "You lost money in a pump group. What is the best next move?",
        answers: [
          { text: "Stop, and tell a parent, or another adult you trust", right: true },
          { text: "Put more in to win it back" },
          { text: "Wait for the leader's next pick to make it back" }
        ],
        why: "Chasing losses is exactly what keeps the group profitable. Stop, tell someone, and report the group at ic3.gov."
      }
    ],
    rule: "Guaranteed returns are a scam. Every time.",
    sources: [
      {
        name: "FTC: What to know about cryptocurrency and scams",
        url: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams"
      },
      {
        name: "SEC Investor.gov: Social media and stock tip scams",
        url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/social-media-stock-scams"
      }
    ]
  },
  {
    id: "c-deepfake-ad",
    icon: "🎬",
    title: "Deepfake celebrity ad",
    minutes: 3,
    learn: [
      {
        icon: "🎭",
        title: "A famous face, faked",
        text: "AI can fake a famous person's <b>face and voice</b>. The FTC warns scammers use doctored video to push products and <b>money-making</b> schemes.",
        picture: {
          kind: "post",
          app: "YouTube",
          author: "Jaxon Reyes Giveaway",
          handle: "Sponsored",
          video: true,
          parts: [
            { role: "media", text: "Video: Jaxon Reyes says \"I'm giving back to my fans!\"" },
            { role: "caption", text: "Jaxon Reyes is giving away 1,000 phones!" },
            {
              role: "link",
              text: "Only 50 left. Offer ends in 09:59",
              flag: true,
              why: "A countdown stops you checking his real account."
            },
            {
              role: "button",
              text: "Claim mine, just pay $2.99 shipping",
              flag: true,
              why: "The small fee gets your card number. Then the charges start."
            }
          ]
        },
        keep: "Check the claim, not the video."
      },
      {
        icon: "🔍",
        title: "Clues, but don't rely on them",
        text: "The FBI lists clues like <b>distorted hands, teeth or eyes</b> and <b>unnatural movement</b>. Fakes keep improving, so a clean-looking video proves nothing.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "👄", text: "Lips and words slightly out of sync" },
            { icon: "✋", text: "Odd hands, teeth or eyes" },
            { icon: "🌗", text: "Shadows or edges that don't look right" },
            { icon: "🗣️", text: "A voice with an odd tone or word choice" }
          ]
        }
      },
      {
        icon: "✅",
        title: "The real check",
        text: "Go to the person's <b>own account</b> or website, found yourself. The FTC says search their name plus <b>scam</b> or <b>fake</b>. Real giveaways never need your card."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this video ad.",
        picture: {
          kind: "post",
          app: "YouTube",
          author: "trading_tips_official_2291",
          handle: "Sponsored",
          video: true,
          parts: [
            { role: "media", text: "Video of a famous streamer talking in his usual room" },
            { role: "caption", text: "Famous streamer reveals his trading secret" },
            {
              role: "caption",
              text: "\"I turned $250 into $8,000. Anyone can.\"",
              flag: true,
              why: "A huge, easy return. The FTC says promises like this are a red flag."
            },
            {
              role: "link",
              text: "trading-secret-start.net/streamer",
              flag: true,
              why: "Not his real site or account. Real creators post on their own page."
            },
            {
              role: "button",
              text: "START WITH $250 NOW",
              flag: true,
              why: "Money first, for a pitch you can't check. That is the scam."
            }
          ]
        },
        why: "Easy money, a site that isn't his and a pay-now button. The face looking real changes nothing."
      },
      {
        type: "choice",
        question: "The video looks perfect. No glitches at all. Is it real?",
        answers: [
          { text: "You can't tell from the video. Check their own account", right: true },
          { text: "Yes. Fakes always have glitches" },
          { text: "Yes, if it has lots of likes" }
        ],
        why: "Good fakes can look clean, and likes can come from bots. Check the person's own account instead."
      },
      {
        type: "choice",
        question: "This ad pops up over your video. What is the safest move?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "Free gaming PC from your favorite YouTuber!" },
            { role: "line", text: "Enter your card for $1 shipping" },
            { role: "button", text: "CLAIM NOW" },
            { role: "button", text: "Tell me more" }
          ]
        },
        answers: [
          { text: "Close the tab or app, then check the creator's own account", right: true },
          { text: "Tap the small ✕ on the ad" },
          { text: "Tap \"Tell me more\" to check it out" }
        ],
        why: "A scam ad can draw a fake ✕ that opens it instead. Closing the whole tab or app is the sure way out."
      },
      {
        type: "choice",
        question: "You paid $2.99 \"shipping\" to a celebrity giveaway ad. What now?",
        answers: [
          { text: "Tell a parent, or another adult you trust, then block the card", right: true },
          { text: "Wait and see if the prize comes" },
          { text: "It's only $2.99, so ignore it" }
        ],
        why: "That small charge gave them your card. Calling the card company to block it fast prevents bigger charges."
      }
    ],
    rule: "A famous face in an ad proves nothing.",
    sources: [
      {
        name: "FTC (2024): Did a celebrity really endorse that? Maybe not",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/04/did-celebrity-really-endorse-maybe-not"
      },
      {
        name: "FBI IC3 (2024): Criminals use generative AI to commit fraud",
        url: "https://www.ic3.gov/PSA/2024/PSA241203"
      }
    ]
  }
];
