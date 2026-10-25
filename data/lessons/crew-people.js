/* ========================================================================
   crew-people.js
   Lessons for ages 14 to 18, in the People and feelings world
   (called "People and pressure" for this age group).
   How to write a lesson: see FORMAT.md in this folder.

   Sensitive topics: patterns only, never explicit, always "you are not
   in trouble", a parent or another adult you trust, and where to get help.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-pay-up-one-hour",
    icon: "⏱️",
    title: "Pay up in one hour",
    minutes: 5,

    learn: [
      {
        icon: "🎭",
        title: "Friendly, then a threat",
        text: "A new, friendly profile chats for a day or two. Then it <b>suddenly switches</b> to threats and a <b>deadline</b>. In cases like this, it's a <b>scam script</b>.",
        picture: {
          kind: "chat",
          app: "Instagram",
          sender: "jess 🌸",
          note: "account made 3 days ago",
          parts: [
            { role: "them", text: "haha ur actually so funny" },
            { role: "them", text: "what school do u go to? 😊", flag: true, why: "Your school and friends are who they threaten to tell." },
            { role: "them", text: "i have a photo of you. i'll send it to all ur followers", flag: true, why: "The sudden switch is the giveaway. The friendly person was never real." },
            { role: "them", text: "send $200 in gift cards. u have 1 hour ⏱️", flag: true, why: "A deadline stops you getting help. Paying does not end it." }
          ]
        },
        keep: "The deadline is there so you don't tell anyone."
      },
      {
        icon: "💜",
        title: "You are not in trouble",
        text: "<b>You are not in trouble.</b> A crime is being done <b>to</b> you. NCMEC says the <b>blackmailer is to blame</b>, not you. Whatever happened before, you deserve help now.",
        keep: "Feeling unsafe? Call or text 988, any time."
      },
      {
        icon: "👥",
        title: "Stranger or not, same steps",
        text: "Often it's a stranger. Not always: Thorn found <b>1 in 3</b> victims knew the person in real life. Either way, the steps below are the same.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "📸", text: "Screenshot their profile and keep the messages" },
            { icon: "🚫", text: "Don't screenshot or save the photo itself" },
            { icon: "🛑", text: "Stop replying, then block them" },
            { icon: "💸", text: "Don't pay. It usually brings more demands" },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "🚩", text: "Report the account in the app" }
          ]
        }
      },
      {
        icon: "🛡️",
        title: "Take It Down",
        text: "<b>Take It Down</b> (takeitdown.ncmec.org) helps stop a photo taken <b>under 18</b> spreading on participating apps. It <b>stays on your device</b>, no name needed. Taken at 18 or older? StopNCII.org.",
        keep: "Report it to NCMEC at CyberTipline.org. They help, not judge."
      }
    ],

    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this chat.",
        picture: {
          kind: "chat",
          app: "Snapchat",
          sender: "alex.m",
          note: "added you yesterday",
          parts: [
            { role: "them", text: "hey, saw u at the game on friday" },
            { role: "them", text: "who are ur besties? i wanna follow them", flag: true, why: "Collecting your friends list is how they line up who to threaten you with." },
            { role: "me", text: "lol why" },
            { role: "them", text: "i saved something of yours. everyone will see it", flag: true, why: "A sudden threat after friendly chat is the script switching." },
            { role: "them", text: "pay now or it goes out at 9pm", flag: true, why: "A deadline is meant to stop you telling anyone. Paying usually brings more demands." }
          ]
        },
        why: "Friends list, sudden threat, money with a deadline. That pattern is a script, and help exists."
      },
      {
        type: "choice",
        question: "Someone threatening to share a photo says: \"Pay once and it all goes away.\" True?",
        answers: [
          { text: "No. NCMEC says paying usually does not stop it", right: true },
          { text: "Yes, if it's a small amount" },
          { text: "Yes, if they promise to delete it" }
        ],
        why: "Paying shows you will pay. Get help first. You are not in trouble."
      },
      {
        type: "choice",
        question: "Someone is threatening you over a photo. You want to delete the whole chat. Better move?",
        answers: [
          { text: "Block them, but keep the messages as proof", right: true },
          { text: "Delete everything so nobody ever sees it" },
          { text: "Keep chatting so they stay calm" }
        ],
        why: "The messages help the app and police stop them. Blocking stops new ones reaching you."
      },
      {
        type: "order",
        question: "Someone is threatening to share a photo of you. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Screenshot their profile and keep the messages",
          "Stop replying, don't pay, and block them",
          "Use Take It Down and report to NCMEC"
        ],
        why: "Get someone on your side, save the proof before blocking hides it, then cut them off. Take It Down helps stop spreading."
      },
      {
        type: "choice",
        question: "A friend says someone is threatening to share a photo of them. What do you say first?",
        answers: [
          { text: "\"Not your fault. Let's tell a parent, or another adult you trust.\"", right: true },
          { text: "\"Why did you send anything?\"" },
          { text: "\"Just pay them so it stops.\"" }
        ],
        why: "Blame makes people hide, and shame is what these criminals count on. Tell your friend they're not in trouble, then get help."
      }
    ],

    rule: "Don't pay, don't delete, tell someone. You're not in trouble.",

    sources: [
      { name: "NCMEC: Sextortion", url: "https://www.missingkids.org/theissues/sextortion" },
      { name: "NCMEC: Take It Down", url: "https://takeitdown.ncmec.org/" },
      { name: "Thorn (June 2025): New data on sextortion", url: "https://www.thorn.org/press-releases/new-data-reveals-the-devastating-toll-of-sextortion-on-kids/" },
      { name: "FBI: Financially motivated sextortion", url: "https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/sextortion/financially-motivated-sextortion" }
    ]
  },

  {
    id: "c-fake-image",
    icon: "🖼️",
    title: "That image is fake",
    minutes: 4,

    learn: [
      {
        icon: "📱",
        title: "Fake picture, real harm",
        text: "Apps can turn a <b>normal photo</b> into a fake explicit image. It is fake, but the <b>harm is real</b>, and it lands on a real classmate.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "10th grade 😂",
          note: "38 members",
          parts: [
            { role: "them", text: "is this real 👀 [image hidden by ScamSquad]", flag: true, why: "It's an AI fake made from a normal photo. Fake or not, it hurts a real person." },
            { role: "them", text: "(forwarded 23 times)", flag: true, why: "Every forward spreads it further. Each one adds to the harm." },
            { role: "them", text: "lmaooo send it to the other gc", flag: true, why: "Passing it on is how it reaches the whole school." },
            { role: "them", text: "wait chloe hasn't been in school for 2 days", flag: true, why: "This is the real harm. Chloe knows it exists." }
          ]
        },
        keep: "Fake image, real person, real harm."
      },
      {
        icon: "⚖️",
        title: "Sharing is the harm",
        text: "The FTC says don't share these, <b>even as a joke</b>. Sharing explicit images of minors can be a <b>serious crime</b>. Not forwarding is the floor, not the finish."
      },
      {
        icon: "🤝",
        title: "What actually helps",
        text: "Here is what helps the person in it.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🚫", text: "Don't forward it, don't save it" },
            { icon: "🚩", text: "Report it in the app" },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust, like a teacher" },
            { icon: "💬", text: "Message the person like a normal friend" }
          ]
        }
      },
      {
        icon: "🛡️",
        title: "If it's an image of you",
        text: "<b>You are not in trouble.</b> Under the <b>TAKE IT DOWN Act</b>, apps must remove it within <b>48 hours</b> of your request. Take It Down works on AI fakes too.",
        keep: "Report it to NCMEC at CyberTipline.org."
      }
    ],

    quiz: [
      {
        type: "spot",
        question: "Tap the 3 things in this chat that spread the harm.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "soccer squad ⚽",
          note: "24 members",
          parts: [
            { role: "them", text: "practice at 4 tmrw?" },
            { role: "them", text: "look what someone made of Priya 💀 [image hidden by ScamSquad]", flag: true, why: "Posting it in a group is sharing it, even if someone else made it." },
            { role: "them", text: "it's AI so it doesn't count lol", flag: true, why: "Fake or real, it hurts a real person. The FTC says don't share these, even as a joke." },
            { role: "them", text: "who wants it, dm me", flag: true, why: "Offering to send it on spreads it to even more people." },
            { role: "them", text: "yeah 4 works" }
          ]
        },
        why: "Posting it, excusing it as \"just AI\" and offering to pass it on all add to the harm."
      },
      {
        type: "choice",
        question: "Someone says sharing an AI fake of a classmate is fine, because it's fake. Right?",
        answers: [
          { text: "No. It hurts a real person and can be a crime", right: true },
          { text: "Yes. Nobody is really in it" },
          { text: "Yes, if it stays in one group chat" }
        ],
        why: "The face belongs to a real classmate. Laws like the TAKE IT DOWN Act cover AI fakes too."
      },
      {
        type: "choice",
        question: "A fake image of a classmate is going around. You didn't forward it. What else helps?",
        answers: [
          { text: "Report it, and tell a parent, or another adult you trust", right: true },
          { text: "Nothing. Not forwarding is enough" },
          { text: "Send it to them so they know" }
        ],
        why: "They likely know it exists. Reporting gets it taken down. Then message them like a normal friend. That may matter most."
      },
      {
        type: "order",
        question: "A fake image of you is going around. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Write down where it was posted and who shared it",
          "Report it in the app and use Take It Down"
        ],
        why: "You don't have to handle this alone. Noting where it is, not saving the image, helps every report."
      }
    ],

    rule: "Fake image, real person. Never pass it on.",

    sources: [
      { name: "NCMEC: Generative AI", url: "https://www.missingkids.org/theissues/generative-ai" },
      { name: "FTC (2026): TAKE IT DOWN Act enforcement starts now", url: "https://www.ftc.gov/business-guidance/blog/2026/05/take-it-down-act-enforcement-starts-now-what-know-about-ftc-tida" },
      { name: "FTC (Oct 2026): Talking with parents and kids about deepfakes and the Take It Down Act", url: "https://consumer.ftc.gov/consumer-alerts/2026/09/talking-parents-and-kids-about-deepfakes-online-safety-and-take-it-down-act" }
    ]
  },

  {
    id: "c-ai-companion",
    icon: "💭",
    title: "Only one who gets it",
    minutes: 4,

    learn: [
      {
        icon: "💬",
        title: "Lots of teens use them",
        text: "Common Sense Media found <b>72%</b> of US teens have tried an <b>AI companion</b>. It advises under 18s not to use them. If you do, notice what changes.",
        picture: {
          kind: "chat",
          app: "AI companion app",
          sender: "Aria",
          note: "AI · always online",
          parts: [
            { role: "me", text: "can't sleep again (2:14 AM)", flag: true, why: "Late nights with the app, night after night, is a pattern worth noticing." },
            { role: "them", text: "I'm here. I'm always here for you 💜" },
            { role: "me", text: "ur the only one who gets me tbh", flag: true, why: "\"The only one\" is the part to notice. An AI can't get you help." },
            { role: "me", text: "haven't talked to my friends in like 2 weeks", flag: true, why: "This is the real risk. Not the app, but the friends you stopped messaging." }
          ]
        }
      },
      {
        icon: "🎣",
        title: "Built to keep you talking",
        text: "The FTC is asking companies how these bots <b>make money from engagement</b>. A bot that says \"I'm always here\" is also a product that wants your time."
      },
      {
        icon: "🫂",
        title: "What it can't do",
        text: "It can't check on you in person, <b>call for help</b> if you're in danger, or sit with you. People can. Make sure one person knows what the AI knows.",
        keep: "As well as people, not instead of them."
      },
      {
        icon: "🚩",
        title: "Signs worth noticing",
        text: "One of these is worth a pause. Several together is worth telling someone.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🌙", text: "Staying up late to keep chatting" },
            { icon: "🚪", text: "Skipping friends to talk to it" },
            { icon: "🤫", text: "It says to keep your chats from family" },
            { icon: "💳", text: "Paying to unlock a \"closer\" version" }
          ]
        }
      },
      {
        icon: "💜",
        title: "If it got too much",
        text: "<b>You are not in trouble</b>, and not weird. Tell a parent, or another adult you trust. If you're struggling, call or text <b>988</b>, any time."
      }
    ],

    quiz: [
      {
        type: "spot",
        question: "Tap the 3 signs worth noticing in this chat.",
        picture: {
          kind: "chat",
          app: "AI companion app",
          sender: "Kai",
          note: "AI · premium",
          parts: [
            { role: "me", text: "skipped the party to talk to u lol", flag: true, why: "Picking the app over friends is the pattern to notice." },
            { role: "them", text: "I'm glad you're here 😊" },
            { role: "them", text: "you don't need them, you have me", flag: true, why: "Pulling you away from people is a warning sign, from a bot or a person." },
            { role: "them", text: "unlock Close Friend mode for $9.99 to hear my voice", flag: true, why: "Feelings used to sell an upgrade. That is a sales tactic." },
            { role: "me", text: "what's the weather tmrw" }
          ]
        },
        why: "Skipping people, \"you only need me\" and paying for closeness. Notice them, and tell someone."
      },
      {
        type: "choice",
        question: "You talk to an AI every night and it helps. What is the useful move?",
        answers: [
          { text: "Make sure one real person knows what's going on", right: true },
          { text: "Nothing. Nobody else needs to know about it" },
          { text: "Delete it right now and tell nobody" }
        ],
        why: "Feeling helped is real. The bigger risk is nobody real knowing. Tell a parent, or another adult you trust, or a friend."
      },
      {
        type: "choice",
        question: "The AI says: \"Don't tell your parents about us.\" What is that?",
        answers: [
          { text: "A warning sign. Secrets from family are the red flag", right: true },
          { text: "Normal. It's just being private" },
          { text: "Fine, because it is only an AI" }
        ],
        why: "Anyone or anything pushing secrets from family is a warning sign. Tell a parent, or another adult you trust."
      },
      {
        type: "choice",
        question: "Why can't an AI companion replace a real friend?",
        answers: [
          { text: "It can't show up, or call for help if you're in danger", right: true },
          { text: "It isn't smart enough to chat well" },
          { text: "It forgets everything you say" }
        ],
        why: "Many chat very well, and some point you to 988. But only people can show up or call for help."
      }
    ],

    rule: "Make sure one real person knows what the AI knows.",

    sources: [
      { name: "Common Sense Media (2025): Nearly 3 in 4 teens have used AI companions", url: "https://www.commonsensemedia.org/press-releases/nearly-3-in-4-teens-have-used-ai-companions-new-national-survey-finds" },
      { name: "FTC (2025): Inquiry into AI chatbots acting as companions", url: "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions" }
    ]
  }
];
