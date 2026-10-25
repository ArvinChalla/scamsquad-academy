/* ========================================================================
   crew-money.js
   Lessons for ages 14 to 18, in the Money and shopping world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-easy-money-job",
    icon: "💸",
    title: "Easy money, no experience",
    minutes: 4,
    learn: [
      {
        icon: "📩",
        title: "The job that finds you",
        text: "The \"job\" is moving money through <b>your bank account</b>. That money is usually stolen. Doing this is called being a <b>money mule</b>.",
        picture: {
          kind: "chat",
          app: "Instagram",
          sender: "Jobs4Teens 💼",
          note: "message request",
          parts: [
            {
              role: "them",
              text: "hey! want to make $300 a week from your phone?",
              flag: true,
              why: "Easy money with no skills is bait. Real jobs don't find you in DMs."
            },
            {
              role: "them",
              text: "no interview, no experience, start today",
              flag: true,
              why: "They don't care who you are. They only need your account."
            },
            {
              role: "them",
              text: "money comes into your bank, you keep 10%, send the rest on as crypto",
              flag: true,
              why: "Money in, straight out as crypto, is how stolen money gets hidden."
            },
            { role: "me", text: "is this legit?" },
            { role: "them", text: "100% legit bro, my cousin does it" }
          ]
        },
        keep: "No real job sends money out through your account."
      },
      {
        icon: "🎯",
        title: "Why they want a teen",
        text: "The FBI has warned that criminals <b>recruit teens</b> for this. They need a clean account with a real name. When police follow the money, they find <b>you</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "💰", text: "Stolen money lands in your account." },
            { icon: "🪙", text: "You send it on as crypto or gift cards." },
            { icon: "🚨", text: "The real victim reports it to their bank." },
            { icon: "🧊", text: "Your account is frozen, and it is your name on it." }
          ]
        }
      },
      {
        icon: "🔄",
        title: "Cash flips and fake checks",
        text: "Same family: <b>\"send $100, get $1,000 back\"</b>. Nobody can multiply money. Or a <b>check</b> arrives and you send some back. The FTC says it bounces later.",
        keep: "If they pay you first, then ask for money back, stop."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 4 red flags in this job offer.",
        picture: {
          kind: "chat",
          app: "Snapchat",
          sender: "Ella | Remote Work",
          note: "added you by username",
          parts: [
            { role: "me", text: "saw ur story about remote work, what is it?" },
            {
              role: "them",
              text: "hiring payment assistants, $50 per transfer",
              flag: true,
              why: "Paid per transfer means the job is moving money. That is muling."
            },
            {
              role: "them",
              text: "just need your bank login so we can set it up",
              flag: true,
              why: "No employer ever needs your bank login."
            },
            { role: "me", text: "what's the company called?" },
            {
              role: "them",
              text: "it's a private firm, can't say yet",
              flag: true,
              why: "A real employer tells you its name. Hiding it stops you checking."
            },
            {
              role: "them",
              text: "don't mention it to your parents, it's a surprise bonus thing",
              flag: true,
              why: "Keeping it from parents keeps away people who'd stop it."
            }
          ]
        },
        why: "Pay per transfer, a bank login, a hidden company name and \"don't tell your parents\". It is a mule job."
      },
      {
        type: "choice",
        question: "\"You keep 10%, send the rest on.\" What is this job really?",
        answers: [
          { text: "Moving stolen money, with your name on the account", right: true },
          { text: "A normal remote assistant job" },
          { text: "Fine, as long as the amounts stay small" }
        ],
        why: "Small or big, it is still moving stolen money. Not knowing does not protect your account."
      },
      {
        type: "realfake",
        question: "A creator posts this. Real or fake?",
        picture: {
          kind: "post",
          app: "Instagram",
          author: "flipking.cash",
          handle: "48k followers",
          parts: [
            { role: "media", text: "Photo: a fan of $100 bills next to a phone" },
            { role: "caption", text: "CASH FLIP SATURDAY 💸 send $50, get $500 back in an hour. Winners in my story" },
            { role: "comment", text: "deshawn.k: got my $500!! 🙌" },
            { role: "button", text: "DM me, only 10 spots left" }
          ]
        },
        answer: "fake",
        why: "Nobody can turn $50 into $500 for you. You send money, then they ask for \"fees\", then they block you."
      },
      {
        type: "order",
        question: "You already moved money for a \"job\". Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Stop moving any more money",
          "Call your bank together"
        ],
        why: "You are not in trouble for telling. Stopping now limits the damage. An adult can help you call the bank and report it at ic3.gov."
      }
    ],
    rule: "No real job moves money through your account.",
    sources: [
      {
        name: "FBI: Money mules",
        url: "https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-scams-and-crimes/money-mules"
      },
      {
        name: "FBI Omaha: Money mule scheme targets teenagers and young adults",
        url: "https://www.fbi.gov/contact-us/field-offices/omaha/news/money-mule-scheme-targets-teenagers-and-young-adults"
      },
      { name: "FTC: Job scams", url: "https://consumer.ftc.gov/articles/job-scams" }
    ]
  },
  {
    id: "c-scholarship-fee",
    icon: "🎓",
    title: "Scholarship, just pay the fee",
    minutes: 4,
    learn: [
      {
        icon: "📧",
        title: "You won? You never applied",
        text: "Scam awards say you <b>won</b> something you never applied for. Then comes a <b>fee</b>, a <b>guarantee</b>, or a request for your <b>FSA ID</b>.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "Awards Office <awards@brightpath-grants.org>",
              flag: true,
              why: "You never applied. Real awards don't email out of nowhere asking for money."
            },
            { role: "subject", text: "Congratulations! You won a $5,000 scholarship" },
            {
              role: "line",
              text: "Pay a $49 processing fee to release your award.",
              flag: true,
              why: "The FTC says scammers ask for fees before you get anything."
            },
            {
              role: "line",
              text: "Guaranteed, or your money back.",
              flag: true,
              why: "Nobody can guarantee a scholarship. A guarantee is a scam sign."
            },
            {
              role: "line",
              text: "Send your FSA ID so we can file your FAFSA for you.",
              flag: true,
              why: "Your FSA ID is your FAFSA login. Never share it with anyone."
            },
            { role: "button", text: "CLAIM MY AWARD" }
          ]
        },
        keep: "If you pay to win it, it's not a scholarship."
      },
      {
        icon: "🆓",
        title: "The FAFSA is free",
        text: "The FAFSA is <b>free</b> to file at studentaid.gov. Nobody needs your <b>FSA ID</b> to help you. Your counselor can help, for free.",
        keep: "Your FSA ID is yours alone, like a password."
      },
      {
        icon: "🧾",
        title: "The check that bounces",
        text: "Some send a <b>check</b>, then ask you to send part back \"for taxes\". The FTC warns fake checks <b>bounce</b>, and you owe the bank what you sent."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this email.",
        picture: {
          kind: "email",
          parts: [
            { role: "from", text: "Future Leaders Fund <grants@futureleaders-award.co>" },
            { role: "subject", text: "Final step to receive your grant" },
            {
              role: "line",
              text: "You have been selected from thousands of students.",
              flag: true,
              why: "Selected for something you never entered is the bait."
            },
            {
              role: "line",
              text: "We need your bank details to hold your grant.",
              flag: true,
              why: "The FTC warns \"to hold\" or \"confirm\" bank requests are used to take money."
            },
            {
              role: "line",
              text: "Reply within 48 hours or the grant goes to another student.",
              flag: true,
              why: "A rush stops you asking your counselor."
            },
            { role: "button", text: "CONFIRM DETAILS" }
          ]
        },
        why: "Picked out of nowhere, bank details and a rush. Real awards don't work like this."
      },
      {
        type: "choice",
        question: "Who can you safely give your FSA ID to?",
        answers: [
          { text: "Nobody. Not even a helpful consultant", right: true },
          { text: "A company that files the FAFSA for you" },
          { text: "A scholarship site, to check you qualify" }
        ],
        why: "The FTC says never share it. It opens your FAFSA and your personal details."
      },
      {
        type: "realfake",
        question: "This email arrives. Real or fake?",
        picture: {
          kind: "email",
          parts: [
            { role: "from", text: "Ms. Ortiz, School Counseling <ortiz@maplecrest-hs.org>" },
            { role: "subject", text: "Local scholarship list for seniors" },
            { role: "line", text: "The list is posted on the counseling page of the school website." },
            { role: "line", text: "Each one is free to apply for. Come see me with questions." }
          ]
        },
        answer: "real",
        why: "A school counselor's address, no fee, no link to sign in, and it sends you to the school website you already know."
      },
      {
        type: "choice",
        question: "You shared your FSA ID with a \"scholarship\" site. What fixes that?",
        answers: [
          { text: "Change your FSA ID password at studentaid.gov", right: true },
          { text: "Ask the site to delete your details" },
          { text: "Nothing. An FSA ID can't be misused" }
        ],
        why: "Changing it locks them out of your aid details. Tell a parent, or another adult you trust, and call the bank if you paid."
      }
    ],
    rule: "Paying to get a scholarship is always a scam.",
    sources: [
      {
        name: "FTC: How to avoid scholarship and financial aid scams",
        url: "https://consumer.ftc.gov/articles/how-avoid-scholarship-and-financial-aid-scams"
      },
      { name: "FTC: Job scams (fake checks)", url: "https://consumer.ftc.gov/articles/job-scams" }
    ]
  },
  {
    id: "c-tickets-dm",
    icon: "🎟️",
    title: "Tickets in your DMs",
    minutes: 3,
    learn: [
      {
        icon: "🎤",
        title: "The sold-out show",
        text: "A stranger in your DMs has tickets to the sold-out show. The usual catch: <b>screenshots</b> instead of a real transfer, and <b>payment app only</b>.",
        picture: {
          kind: "chat",
          app: "Instagram",
          sender: "tix_resale_marie",
          note: "account made last month",
          parts: [
            { role: "them", text: "selling 2 floor tix for saturday, face value $120 each" },
            {
              role: "them",
              text: "can't do the app transfer, i'll send screenshots",
              flag: true,
              why: "A screenshot can be sold to many people. Real tickets move inside the official app."
            },
            {
              role: "them",
              text: "pay friends and family on a payment app, no fees",
              flag: true,
              why: "Those payments are for people you know. If it goes wrong, it's hard to get back."
            },
            {
              role: "them",
              text: "3 other people want them, pay in 10 min",
              flag: true,
              why: "A rush stops you checking the seller."
            }
          ]
        },
        keep: "No real transfer in the official app, no deal."
      },
      {
        icon: "🏟️",
        title: "Buy where the ticket lives",
        text: "Buy from the <b>venue</b>, the <b>official ticket app</b>, or its own resale. The FTC says someone selling a <b>screenshot</b> is likely a scammer."
      },
      {
        icon: "💳",
        title: "How you pay matters",
        text: "The FTC says payment app money is <b>hard to get back</b>. BBB says a <b>credit card</b> lets you dispute a charge. Use one, yours or a trusted adult's.",
        keep: "Strangers get no gift cards, crypto or friends-and-family payments."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this ticket chat.",
        picture: {
          kind: "chat",
          app: "TikTok",
          sender: "concertplug22",
          note: "not following you",
          parts: [
            { role: "them", text: "saw ur comment, i have 1 extra for friday" },
            { role: "me", text: "omg how much" },
            {
              role: "them",
              text: "$60, way under face value cause i can't go",
              flag: true,
              why: "Far below everyone else's price is the bait."
            },
            {
              role: "them",
              text: "gift card only, my payment app is broken",
              flag: true,
              why: "Gift cards can't be pulled back. A \"broken\" app is an excuse."
            },
            {
              role: "them",
              text: "i'll email the ticket after you pay",
              flag: true,
              why: "Paying first for a ticket you can't check means it may never come."
            }
          ]
        },
        why: "Too cheap, gift card only, and pay before you see anything. All three are classic ticket scam signs."
      },
      {
        type: "choice",
        question: "The seller sends a screenshot of the tickets as proof. What does it prove?",
        answers: [
          { text: "Nothing. A screenshot can be copied and resold", right: true },
          { text: "They really own the tickets" },
          { text: "The tickets will scan at the door" }
        ],
        why: "The same screenshot can go to many buyers. Only one person, maybe nobody, gets in."
      },
      {
        type: "choice",
        question: "What is the safest way to buy a resale ticket?",
        answers: [
          { text: "The official ticket app's resale, paid by credit card", right: true },
          { text: "A seller with lots of followers, by payment app" },
          { text: "A cheap listing, paid with a gift card" }
        ],
        why: "The official app moves the real ticket to you. A card gives a way to dispute the charge."
      },
      {
        type: "order",
        question: "You paid a stranger for tickets and they blocked you. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Screenshot the chat and profile",
          "Report the payment in the payment app"
        ],
        why: "Tell someone first. Save proof before anything disappears. Then report the payment fast for the best chance of getting money back."
      }
    ],
    rule: "Tickets: official app only. Never pay a stranger first.",
    sources: [
      {
        name: "FTC (2026): How to make your World Cup experience scam free",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/03/how-make-your-world-cup-experience-scam-free"
      },
      {
        name: "FTC: Mobile payment apps, how to avoid a scam when you use one",
        url: "https://consumer.ftc.gov/articles/mobile-payment-apps-how-avoid-scam-when-you-use-one"
      },
      {
        name: "BBB: Buying tickets to the big game or concert? Don't get scammed",
        url: "https://www.bbb.org/article/tips/13986-bbb-tip-buying-tickets"
      }
    ]
  }
];
