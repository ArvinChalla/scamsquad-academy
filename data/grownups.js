/* ========================================================================
   grownups.js
   The words on the "For parents and teachers" page.

   In GROWNUPS, in the order the page shows them:
     intro     the first line
     how       how the game works
     privacy   what the game does not collect
     talk      questions to ask at dinner, by age group
     tips      tips for parents
     report    where to report
     about     "Who made this": Arvin's own words
     contact   the words around the contact form (adults only)
     more      a link to the research behind the game
     madeBy    the line at the bottom
   ======================================================================== */

export const GROWNUPS = {
  intro: "ScamSquad Academy is a free game that teaches children aged 6 to 18 the tricks scammers use online, and what to do if something goes wrong.",

  how: [
    { icon: "📖", title: "Learn, then play", text: "Each lesson is a few short cards, then 4 or 5 questions on realistic fake screens." },
    { icon: "🎯", title: "One try per question", text: "The first answer counts, so children think before tapping. The right answer and the reason always show." },
    { icon: "🔁", title: "Come back to remember", text: "Spot Check asks 5 questions from finished lessons, missed ones first. It is due 2 days later, then after 1 week, 3 weeks and 2 months. No streaks and nothing lost for skipping." },
    { icon: "🪙", title: "Coins, stars and badges", text: "Ages 6 to 13 earn coins for right answers and spend them on hints. A lesson gives 3 stars for all right, and practicing the missed questions fixes them. A world's badge comes when every question in it has been answered right, and all 7 badges unlock the certificate. Ages 14 to 18 see plain scores, and their hints are free." },
    { icon: "💜", title: "Help is one tap away", text: "Every screen has Help: \"You are not in trouble\", what to do, and where to report." }
  ],

  privacy: [
    "No sign-up, no email, no tracking, no ads.",
    "Progress stays in this browser only.",
    "The first name for the certificate stays on this device.",
    "The first time the game opens on a device, it adds one to a public play count. Nothing else is sent or stored. A device can be counted again if its browser data is cleared."
  ],

  // Questions to ask at dinner, by age group.
  talk: {
    explore: [
      "If a game said \"free coins, tap now!\", what would you do?",
      "Who is allowed to know your password?",
      "Let's pick a family word together, a word only our family knows."
    ],
    squad: [
      "Has anyone ever asked you to trade outside the game?",
      "If money showed up in your app from someone you don't know, what would you do?",
      "What would make you feel OK telling me something went wrong online?"
    ],
    crew: [
      "Have you seen \"easy money\" job offers in DMs?",
      "If someone threatened to share a photo, who would you tell first?",
      "Which of your accounts have 2-step verification turned on?"
    ]
  },

  tips: [
    "For ages 6 and 7, sit with your child and read the cards together.",
    "Pick a family word together. Use it to check surprise requests for money or help.",
    "Tell your child what you check on their devices, and why. Trust is what gets you the early warning.",
    "Set up 2-step verification and automatic updates together, as a family job.",
    "If something happens, start with \"You are not in trouble.\" Shame is why children stay quiet."
  ],

  report: [
    { name: "NCMEC CyberTipline", how: "Online threats to children, or photo threats", href: "https://report.cybertip.org" },
    { name: "Take It Down", how: "Helps remove nude or sexual images taken under 18 from participating apps", href: "https://takeitdown.ncmec.org" },
    { name: "FTC", how: "Report a scam", href: "https://reportfraud.ftc.gov" },
    { name: "FBI IC3", how: "Report an online crime", href: "https://www.ic3.gov" }
  ],

  // "Who made this": Arvin's own words, from version 1.
  about: {
    text: "ScamSquad Academy was built by <b>Arvin Challa</b>, a high school student in Texas, openly with AI help. It is free, there is nothing to buy, and nobody sponsors it.",
    quote: "I got the idea for this from what I came across myself while I was growing up online. I ran into different people, scams and threats. I really want to make sure kids do not fall for that. Online scams and cyber crime keep increasing, and kids and elderly people are the easiest targets.",
    who: "Arvin Challa"
  },

  // "Get in touch": the contact form is for adults only.
  contact: {
    intro: "For parents, teachers and other adults: questions about using the game in class, ideas, or a correction.",
    kids: "<b>Are you a kid?</b> This form is for grown-ups. If something is happening to you online, tell a parent, or another adult you trust. You are not in trouble.",
    urgent: "<b>If a child needs help right now,</b> do not use this form. Use the report links above.",
    afterwards: "<b>What happens to your message:</b> it goes to the ScamSquad Academy inbox, and a copy is kept in Cloudflare storage. Only what you type is sent. Your IP address is not saved. Your email is only used to reply, never shared or added to a list."
  },

  // "More from ScamSquad": the research behind the game.
  more: [
    { icon: "📋", name: "The threat register", how: "56 online threats to under-18s, with sources", href: "research/threat-register.html" }
  ],

  madeBy: "Made by Arvin Challa, a high school student in Texas, built openly with AI help."
};
