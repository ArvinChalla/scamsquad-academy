/* ========================================================================
   crew-messages.js
   Lessons for ages 14 to 18, in the Messages and calls world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-toll-text",
    icon: "🚗",
    title: "You owe a toll?",
    minutes: 3,
    learn: [
      {
        icon: "📱",
        title: "The tiny bill with a deadline",
        text: "Scam texts say you owe a <b>small toll</b> and must pay <b>today</b>. The link opens a fake page that takes your <b>card details</b>.",
        picture: {
          kind: "text",
          sender: "+1 (469) 555-0137",
          parts: [
            { role: "them", text: "Toll Services: you have an unpaid toll balance of $4.85." },
            {
              role: "them",
              text: "Pay by tonight to avoid a $50 late fee and a license hold.",
              flag: true,
              why: "A scary deadline over a tiny amount. They want you to pay before you think."
            },
            {
              role: "them",
              text: "tollservices-payment-help.com/pay",
              flag: true,
              why: "Not the real toll agency. This page wants your card number."
            },
            {
              role: "them",
              text: "Reply Y, then reopen this text to activate the link.",
              flag: true,
              why: "Replying turns the link on, and tells them a real person reads this number."
            }
          ]
        },
        keep: "Check tolls on the agency's real site, never the text's link."
      },
      {
        icon: "🧐",
        title: "You don't even drive?",
        text: "Doesn't matter. These go out to <b>huge lists of numbers</b>. The FTC says contact the toll agency using a number or website <b>you already know</b> is real."
      },
      {
        icon: "🙊",
        title: "Don't reply, not even STOP",
        text: "Any reply, even <b>STOP</b>, tells them the number works. Use <b>Report junk</b>, or forward the text to <b>7726</b> (SPAM). Then delete it.",
        keep: "Report it, block it, delete it. No replies."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this text.",
        picture: {
          kind: "text",
          sender: "+1 (214) 555-0108",
          parts: [
            { role: "them", text: "Final notice from your state toll road." },
            { role: "them", text: "Our records show one unpaid trip." },
            {
              role: "them",
              text: "Pay $3.25 within 12 hours or your license is suspended.",
              flag: true,
              why: "Losing a license over $3 in 12 hours is a scare tactic."
            },
            {
              role: "them",
              text: "statetoll-paynow.info/invoice",
              flag: true,
              why: "A made-up address, not the agency's real site."
            },
            {
              role: "them",
              text: "Have your card ready.",
              flag: true,
              why: "It is after your card number, not the $3."
            }
          ]
        },
        why: "A crazy deadline, a strange link and a card request. Real toll agencies don't collect like this by text."
      },
      {
        type: "choice",
        question: "You get a toll text and you don't even drive. Should you reply STOP?",
        answers: [
          { text: "No. Report it as junk, then delete it", right: true },
          { text: "Yes, so they take you off their list" },
          { text: "Reply asking who they are" }
        ],
        why: "Any reply shows a real person is reading. That can mean more scam texts, not fewer."
      },
      {
        type: "realfake",
        question: "A toll text sends you to this page. Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "statetoll.tolls-payment-portal.top/invoice" },
            { role: "big", text: "Pay your outstanding toll" },
            { role: "field", text: "Card number" },
            { role: "field", text: "Driver's license number" },
            { role: "button", text: "PAY $4.85" }
          ]
        },
        answer: "fake",
        why: "Skip the https://. Find the next /. The owner is the last two parts just before it: tolls-payment-portal.top. The real-sounding start means nothing."
      },
      {
        type: "order",
        question: "You typed your card into a toll text page. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Call the bank to block the card",
          "Report the text as junk"
        ],
        why: "Tell someone first. Blocking the card fast limits what they can spend. Reporting helps get the site taken down."
      }
    ],
    rule: "Real bills: check on the real site, never the link.",
    sources: [
      {
        name: "FTC: Got a text about unpaid tolls? It's probably a scam",
        url: "https://consumer.ftc.gov/consumer-alerts/2025/01/got-text-about-unpaid-tolls-its-probably-scam"
      },
      {
        name: "FBI IC3 (2024): Smishing scam about unpaid road tolls",
        url: "https://www.ic3.gov/PSA/2024/PSA240412"
      }
    ]
  },
  {
    id: "c-caller-id-bank",
    icon: "📞",
    title: "The call says \"Bank\"",
    minutes: 4,
    learn: [
      {
        icon: "🎭",
        title: "Caller ID can lie",
        text: "The FTC says scammers can make <b>any name or number</b> show on caller ID. It's called <b>spoofing</b>. \"First City Bank\" on screen proves nothing.",
        picture: {
          kind: "call",
          caller: "First City Bank",
          label: "Incoming call",
          number: "+1 (312) 555-0164",
          parts: [
            {
              role: "line",
              text: "This is the fraud team. Someone just spent $900 on your card.",
              flag: true,
              why: "A scare first. Fear makes you follow orders."
            },
            {
              role: "line",
              text: "We texted you a code. Read it to me to block the charge.",
              flag: true,
              why: "The code is what lets them into your account. Real banks never ask for it."
            },
            { role: "me", text: "um ok, hang on" },
            {
              role: "line",
              text: "Don't hang up or the account gets frozen.",
              flag: true,
              why: "Keeping you on the line stops you checking with the real bank."
            }
          ]
        },
        keep: "A name on caller ID is not proof."
      },
      {
        icon: "🔁",
        title: "Hang up, look it up",
        text: "Hang up. Find the number on the <b>back of your card</b>, your statement, or the bank's <b>real app</b>. Call that number yourself.",
        keep: "Hang up, look it up, call back."
      },
      {
        icon: "🔑",
        title: "A code is a key",
        text: "A login code proves <b>you</b> are the one signing in. The FTC says anyone who asks for your verification code is a <b>scammer</b>.",
        picture: {
          kind: "text",
          sender: "First City Bank",
          parts: [
            { role: "them", text: "Your sign-in code is 662 019." },
            { role: "them", text: "We will never call or text to ask for this code." }
          ]
        },
        keep: "The real text says never share it. Believe it."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this call.",
        picture: {
          kind: "call",
          caller: "Bank Fraud Dept",
          label: "Call",
          number: "+1 (415) 555-0121",
          parts: [
            { role: "line", text: "Hi, am I speaking to the account holder?" },
            { role: "me", text: "yes?" },
            {
              role: "line",
              text: "We need you to move your money to a safe account today.",
              flag: true,
              why: "The FTC says never move money to \"protect\" it. That is the scam."
            },
            {
              role: "line",
              text: "Read me the code we just sent so I can confirm it's you.",
              flag: true,
              why: "A real bank already knows it's you. It never needs your code."
            },
            {
              role: "line",
              text: "Don't tell anyone, this is a fraud investigation.",
              flag: true,
              why: "Secrecy keeps away the people who would spot the trick."
            }
          ]
        },
        why: "Move money, read a code, keep it secret. Any one of these means hang up."
      },
      {
        type: "choice",
        question: "Caller ID shows your bank's real number. What proves the call is really them?",
        answers: [
          { text: "Nothing on the call. Hang up and call the card's number", right: true },
          { text: "They know your name and last 4 card digits" },
          { text: "The caller ID matches the bank's website" }
        ],
        why: "Caller ID can be faked, and scammers buy leaked details. The only check is a call you start yourself."
      },
      {
        type: "realfake",
        question: "You just tried to sign in to your bank app yourself. This text arrives. Real or fake?",
        picture: {
          kind: "text",
          sender: "First City Bank",
          parts: [
            { role: "them", text: "Your sign-in code is 481 113." },
            { role: "them", text: "Don't share it. We will never ask you for it." }
          ]
        },
        answer: "real",
        why: "You asked for it, it has no link, and it asks for nothing. Type it in the app yourself. Never read it to anyone."
      },
      {
        type: "order",
        question: "You hung up on a \"bank fraud team\" call. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Find the number on your card or the real app",
          "Call that number yourself",
          "If money moved, report it at ReportFraud.ftc.gov"
        ],
        why: "Get someone on your side first. Then you start the call, on a number you found yourself. Report anything that went wrong."
      }
    ],
    rule: "Hang up, look it up, call back.",
    sources: [
      { name: "FTC: Phone scams (spoofed caller ID)", url: "https://consumer.ftc.gov/articles/phone-scams" },
      {
        name: "FTC (2024): Got a call about fraud on your bank account? It could be a scammer",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/06/got-call-about-fraud-activity-your-bank-account-it-could-be-scammer"
      },
      {
        name: "FTC (2024): What's a verification code and why would someone ask me for it?",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it"
      }
    ]
  },
  {
    id: "c-voice-clone",
    icon: "🎙️",
    title: "It sounds just like him",
    minutes: 4,
    learn: [
      {
        icon: "🗣️",
        title: "A voice can be copied",
        text: "AI can copy a voice from a <b>short clip</b>. The FTC and FBI warn it is used to fake <b>family emergencies</b>. This voicemail sounds like your brother.",
        picture: {
          kind: "call",
          caller: "Unknown number",
          label: "Voicemail",
          number: "+1 (347) 555-0156",
          parts: [
            {
              role: "line",
              text: "hey it's me, this is my new number",
              flag: true,
              why: "A new number means you can't check by calling back on it."
            },
            {
              role: "line",
              text: "i crashed the car, i'm in trouble",
              flag: true,
              why: "A sudden emergency makes you act before you check."
            },
            {
              role: "line",
              text: "please don't tell mom and dad",
              flag: true,
              why: "Keeping parents out keeps away the people who'd spot it."
            },
            {
              role: "line",
              text: "i need $500 in gift cards right now",
              flag: true,
              why: "Gift cards are near impossible to get back. Scammers love them."
            }
          ]
        },
        keep: "The voice can be fake. The request gives it away."
      },
      {
        icon: "🗝️",
        title: "Your family word",
        text: "The FBI suggests a <b>secret word</b> your family agrees on, offline. If a call asks for money in a panic, ask for the word. A clone won't know it.",
        keep: "No family word, no money."
      },
      {
        icon: "📲",
        title: "Check on a number you know",
        text: "Hang up. Call or text the person on the <b>number you already have</b>. Can't reach them? The FTC says try another relative or a friend.",
        keep: "Never check by replying to the new number."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "This voicemail sounds like your cousin Maya. Tap the 4 red flags.",
        picture: {
          kind: "call",
          caller: "+1 (646) 555-0182",
          label: "Voicemail",
          parts: [
            {
              role: "line",
              text: "hi, it's Maya, my phone died so i'm on a friend's",
              flag: true,
              why: "A different number stops you calling her real one to check."
            },
            { role: "line", text: "sorry, i know this is random" },
            {
              role: "line",
              text: "can you send $300 on a payment app? i'll pay you back",
              flag: true,
              why: "Money that's hard to get back, to an account you don't know."
            },
            {
              role: "line",
              text: "don't tell anyone, i'll get in so much trouble",
              flag: true,
              why: "Secrecy keeps the people who would check away."
            },
            {
              role: "line",
              text: "please hurry, like in the next 10 minutes",
              flag: true,
              why: "A real emergency can wait two minutes for a call back."
            },
            { role: "line", text: "love you, bye" }
          ]
        },
        why: "New number, money, secrecy, hurry. The voice sounding right is not proof."
      },
      {
        type: "choice",
        question: "A call sounds exactly like your brother, panicking and asking for money. Best first move?",
        answers: [
          { text: "Hang up and call him on his saved number", right: true },
          { text: "Ask \"Is it really you?\"" },
          { text: "Ask how much he needs and send it fast" }
        ],
        why: "A clone can say \"yes, it's me\". His real number settles it. A family word, if you have one, works too."
      },
      {
        type: "realfake",
        question: "This text arrives. Real or fake?",
        picture: {
          kind: "text",
          sender: "Mom",
          parts: [
            { role: "them", text: "running late, pick up is 5:30 not 5" },
            { role: "them", text: "see you at the side gate" }
          ]
        },
        answer: "real",
        why: "Saved number, no money, no secret, no rush. Normal family plans. Scams almost always ask for something."
      },
      {
        type: "order",
        question: "You hung up on a voice like your brother's asking for gift cards. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Call your brother on the number you already have",
          "Can't reach him? Try family or his friends",
          "Report the number at ReportFraud.ftc.gov"
        ],
        why: "An adult you trust can help you check. His real number settles it. If he doesn't answer, the FTC says try family or friends."
      }
    ],
    rule: "Money in a panic? Ask for the family word.",
    sources: [
      {
        name: "FTC (2023): Scammers use AI to enhance their family emergency schemes",
        url: "https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes"
      },
      {
        name: "FBI IC3 (2024): Criminals use generative AI to commit fraud",
        url: "https://www.ic3.gov/PSA/2024/PSA241203"
      }
    ]
  }
];
