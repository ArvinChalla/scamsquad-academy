/* ========================================================================
   squad-realfake.js
   Lessons for ages 10 to 13, in the Real or fake? world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-deepfake-creator",
    icon: "🎭",
    title: "Is that really him?",
    minutes: 4,
    learn: [
      {
        icon: "📺",
        title: "A famous creator says FREE",
        text: "A video shows a <b>famous creator</b> giving away free skins at a site. It looks and sounds like him. It might be <b>made by AI</b>.",
        picture: {
          kind: "post",
          app: "YouTube",
          author: "TopTierTyler",
          handle: "@toptiertyler.gifts",
          video: true,
          parts: [
            {
              role: "media",
              text: "Tyler talks to the camera: \"Free skins for everyone!\"",
              flag: true,
              why: "It looks and sounds like him. AI can copy a face and a voice."
            },
            {
              role: "caption",
              text: "FREE skins giveaway 🎁 only 7 minutes left",
              flag: true,
              why: "Free stuff plus hurry stops you checking."
            },
            {
              role: "link",
              text: "tyler-gifts-official.net",
              flag: true,
              why: "Not his real channel or the game. A copy site wants your login."
            },
            {
              role: "comment",
              text: "omg it worked, got mine 😍",
              flag: true,
              why: "Comments can be fake too. Scammers post them to look real."
            },
            { role: "button", text: "Subscribe" }
          ]
        },
        keep: "A video can look and sound real and still be fake."
      },
      {
        icon: "🤖",
        title: "How AI fakes work",
        text: "AI can copy a person's <b>face and voice</b> from old videos. The FTC, the US government's scam watchdog, warns that fake celebrity videos keep <b>getting better</b>.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "👄", text: "Lips that don't quite match the words" },
            { icon: "🔊", text: "A voice that sounds flat or a bit odd" },
            { icon: "📢", text: "Posted by an account that isn't theirs" },
            { icon: "🔗", text: "A link to a strange site, not the game" },
            { icon: "⏰", text: "Free stuff plus hurry" }
          ]
        },
        keep: "Good fakes may show no glitches at all."
      },
      {
        icon: "🔁",
        title: "Check somewhere else",
        text: "Go to the creator's <b>real channel</b> yourself. Search their name plus <b>\"scam\"</b> or <b>\"fake\"</b>. If the giveaway isn't there, it isn't real."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this video ad.",
        picture: {
          kind: "post",
          app: "TikTok",
          author: "MaxPlaysLive",
          handle: "@maxplays.live.gifts",
          video: true,
          parts: [
            {
              role: "media",
              text: "A famous streamer says: \"10,000 Robux for everyone!\"",
              flag: true,
              why: "No outside giveaway can make Robux. The famous face is the bait."
            },
            {
              role: "caption",
              text: "Sponsored · Log in with your Roblox account to claim",
              flag: true,
              why: "A real giveaway never needs your password."
            },
            {
              role: "link",
              text: "stream-gift-drop.net",
              flag: true,
              why: "Not Roblox and not his channel. It is a copy site."
            },
            { role: "comment", text: "wait is this real??" },
            { role: "button", text: "Follow" }
          ]
        },
        why: "Free Robux, a login ask and a strange site. A famous face doesn't make it real."
      },
      {
        type: "choice",
        question: "A video of your favorite creator promises free skins. How do you check?",
        answers: [
          { text: "Look on their real channel, and search their name plus scam", right: true },
          { text: "Watch it again, slowly, to see if it looks real" },
          { text: "Read the comments to see if it worked for others" }
        ],
        why: "Fakes can look perfect, and comments can be fake too. Checking their real channel is the sure way."
      },
      {
        type: "choice",
        question: "The video looks perfect. No glitches at all. Does that prove it's real?",
        answers: [
          { text: "No. Good fakes may have no glitches", right: true },
          { text: "Yes. AI fakes always leave some mistakes" },
          { text: "Yes, if it has millions of views" }
        ],
        why: "AI fakes keep getting better. Where it came from matters more than how it looks."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "toptiertyler-giveaway.live/claim" },
            { role: "big", text: "Tyler's giveaway: log in to win" },
            { role: "field", text: "Game username" },
            { role: "field", text: "Game password" },
            { role: "button", text: "ENTER" }
          ]
        },
        answer: "fake",
        why: "A made-up site that wants your game password. Real giveaways are on the creator's real channel and never need it."
      }
    ],
    rule: "Seen a giveaway? Check the creator's real channel first.",
    sources: [
      {
        name: "FTC (2024): Did a celebrity really endorse that? Maybe not",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/04/did-celebrity-really-endorse-maybe-not"
      },
      {
        name: "FTC (2024): New protections to combat AI impersonation",
        url: "https://www.ftc.gov/news-events/news/press-releases/2024/02/ftc-proposes-new-protections-combat-ai-impersonation-individuals"
      }
    ]
  },
  {
    id: "s-viral-challenge",
    icon: "🔥",
    title: "The challenge everyone's doing",
    minutes: 4,
    learn: [
      {
        icon: "📱",
        title: "Everyone is doing it",
        text: "A challenge is <b>all over your feed</b>. Friends say you have to try it. But lots of views don't mean it is <b>safe or even real</b>.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "the squad 🔥",
          note: "5 members",
          parts: [
            { role: "them", name: "Ava", time: "7:40 pm", text: "did u see the new challenge?? 😱" },
            {
              role: "them",
              name: "Leo",
              time: "7:41 pm",
              text: "everyone at school is doing it",
              flag: true,
              why: "\"Everyone\" is pressure, not proof it is safe."
            },
            {
              role: "them",
              name: "Ava",
              time: "7:42 pm",
              text: "film urs tonight or ur out of the group",
              flag: true,
              why: "Threats to leave you out are pressure. Real friends don't do that."
            },
            {
              role: "them",
              name: "Leo",
              time: "7:42 pm",
              text: "its fine, it has like 5 million views",
              flag: true,
              why: "Views show it is popular, not that it is safe."
            }
          ]
        },
        keep: "Popular doesn't mean safe."
      },
      {
        icon: "🛑",
        title: "Stop, think, decide, act",
        text: "<b>Stop</b> before you join in. <b>Think</b>: is it safe, could it hurt someone, is it real? <b>Decide</b>: not sure means skip it. <b>Act</b>: report it.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "✋", text: "Stop. Don't copy it the moment you see it." },
            { icon: "🤔", text: "Think. Could it hurt you or anyone else?" },
            { icon: "🚫", text: "Decide. Not sure means skip it." },
            { icon: "🚩", text: "Act. Report it, and don't share it." }
          ]
        }
      },
      {
        icon: "👻",
        title: "Some are hoaxes",
        text: "Some scary \"challenges\" are <b>made up</b> to frighten people. Sharing the warning spreads the hoax. <b>Check a trusted news site</b>, or ask a parent, or another adult you trust."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A challenge has millions of views. What does that tell you?",
        answers: [
          { text: "It's popular. That doesn't tell me it's safe", right: true },
          { text: "It must be safe, or the app would ban it" },
          { text: "Lots of people tried it, so it's fine" }
        ],
        why: "Views measure attention, not safety. Doctors warn some online challenges have caused serious injuries."
      },
      {
        type: "spot",
        question: "Tap the 2 red flags in this group chat.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "gaming crew",
          note: "8 members",
          parts: [
            { role: "them", name: "Sam", time: "8:20 pm", text: "new challenge just dropped 👀" },
            {
              role: "them",
              name: "Jo",
              time: "8:21 pm",
              text: "u have to do it or ur a baby lol",
              flag: true,
              why: "Calling you names to make you do it is pressure."
            },
            { role: "me", time: "8:21 pm", text: "what is it?" },
            { role: "them", name: "Sam", time: "8:22 pm", text: "its a dance to the new song" },
            {
              role: "them",
              name: "Sam",
              time: "8:22 pm",
              text: "dont tell ur parents, theyll ruin it",
              flag: true,
              why: "Hiding it from your family is a warning sign. Ask yourself why."
            }
          ]
        },
        why: "Name-calling and a secret from your family are pressure. A dance can be fine. The pressure is the red flag."
      },
      {
        type: "choice",
        question: "A scary message says a challenge character visits kids at night. Share it to warn friends?",
        answers: [
          { text: "No. Check first. It may be a hoax", right: true },
          { text: "Yes. Warning people is always a good thing" },
          { text: "Yes, and add a few scary details" }
        ],
        why: "Some scary challenges are made up. Sharing spreads the fear. Ask a parent, or another adult you trust, first."
      },
      {
        type: "order",
        question: "You see a risky challenge. Put the steps in order.",
        steps: [
          "Stop",
          "Think: is it safe and real?",
          "Decide: not sure means skip it",
          "Report it and don't share it"
        ],
        why: "Stop, think, decide, act. Pausing first gives your brain time to catch the risk."
      }
    ],
    rule: "Popular is not proof. Stop and check first.",
    sources: [
      {
        name: "TikTok Safety Center: Online challenges",
        url: "https://www.tiktok.com/safety/en/online-challenges"
      },
      {
        name: "American Academy of Pediatrics (HealthyChildren.org): Dangerous internet challenges",
        url: "https://www.healthychildren.org/English/family-life/Media/Pages/Dangerous-Internet-Challenges.aspx"
      }
    ]
  },
  {
    id: "s-fake-screenshot",
    icon: "🖼️",
    title: "Screenshots can lie",
    minutes: 3,
    learn: [
      {
        icon: "📸",
        title: "Anyone can fake a screenshot",
        text: "Apps let anyone make a <b>fake chat</b> or a fake post in seconds. A screenshot is just a picture. It is <b>not proof</b> that it happened.",
        picture: {
          kind: "post",
          app: "Instagram",
          author: "max.k",
          handle: "@max.k_07",
          parts: [
            {
              role: "media",
              text: "Screenshot of a chat: \"Nora: our whole class is so boring\"",
              flag: true,
              why: "A fake chat picture takes seconds to make."
            },
            {
              role: "caption",
              text: "LOOK what Nora said about everyone 😱",
              flag: true,
              why: "Max is sharing it, not proving it. Where did it come from?"
            },
            {
              role: "comment",
              text: "zoe.b: omg send it to everyone",
              flag: true,
              why: "Sharing before checking spreads something that may be fake."
            },
            { role: "comment", text: "ben_r: wait, did Nora really say that?" },
            { role: "button", text: "Share" }
          ]
        },
        keep: "A screenshot is a picture, not proof."
      },
      {
        icon: "🎨",
        title: "Edited pictures too",
        text: "Photos can be <b>edited or made by AI</b>. A real photo can also be from <b>a different time or place</b>. Ask where it came from and when."
      },
      {
        icon: "🔁",
        title: "Check a second source",
        text: "Before you believe or share, <b>find it somewhere else</b>. Look at the real account, or trusted news sites. Not there? <b>Don't share it.</b>",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "❓", text: "Ask: who made this, and where is the original?" },
            { icon: "👤", text: "Look at the real account or post yourself" },
            { icon: "📰", text: "Check if trusted sites say the same" },
            { icon: "✋", text: "Not sure? Don't share it." }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this post.",
        picture: {
          kind: "post",
          app: "Instagram",
          author: "jo.plays",
          handle: "@jo.plays",
          parts: [
            {
              role: "media",
              text: "Screenshot of a headline: \"Roblox shutting down next week\"",
              flag: true,
              why: "A screenshot is easy to fake. Find the original."
            },
            {
              role: "caption",
              text: "ROBLOX IS SHUTTING DOWN 😭 share it everywhere",
              flag: true,
              why: "Huge news with a push to share. Check the real company first."
            },
            { role: "comment", text: "sam_k: where did u see it?" },
            {
              role: "comment",
              text: "jo.plays: idk my cousin sent it",
              flag: true,
              why: "No source at all. Check before you pass it on."
            },
            { role: "button", text: "Share" }
          ]
        },
        why: "A screenshot, a push to share and no source. Asking where it came from was the right question."
      },
      {
        type: "choice",
        question: "A screenshot shows a classmate saying something mean. What first?",
        answers: [
          { text: "Ask where it came from before believing it", right: true },
          { text: "Share it, so everyone knows what they're like" },
          { text: "Message the classmate and tell them off" }
        ],
        why: "Screenshots can be faked or cut to hide what came before. Check first, and don't spread it."
      },
      {
        type: "choice",
        question: "What is the best way to check a surprising post?",
        answers: [
          { text: "Find it on the real account or a news site", right: true },
          { text: "Check how many likes and shares it has" },
          { text: "See if my friends believe it too" }
        ],
        why: "Likes and friends can be fooled. A second source you find yourself is the real check."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "news-update-today.buzz/roblox-closing" },
            { role: "big", text: "BREAKING: Roblox closing forever on Friday" },
            { role: "line", text: "Shared by millions! Don't let your friends miss it." },
            { role: "button", text: "SHARE NOW" }
          ]
        },
        answer: "fake",
        why: "A made-up news site, a shocking claim and a push to share. Check the real company's page first."
      }
    ],
    rule: "Seen it? Check it somewhere else before sharing.",
    sources: [
      {
        name: "Common Sense Media: How to help kids spot misinformation",
        url: "https://www.commonsensemedia.org/articles/how-to-help-kids-spot-misinformation-and-disinformation"
      },
      {
        name: "News Literacy Project: Fact-check it!",
        url: "https://newslit.org/educators/resources/fact-check-it"
      }
    ]
  }
];
