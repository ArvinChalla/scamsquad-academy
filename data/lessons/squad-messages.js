/* ========================================================================
   squad-messages.js
   Lessons for ages 10 to 13, in the Messages and calls world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-code-mistake",
    icon: "🔑",
    title: "The code sent by mistake",
    minutes: 4,
    learn: [
      {
        icon: "📲",
        title: "A code you didn't ask for",
        text: "A login code arrives on your phone. Then a friend says <b>\"I sent my code to you by mistake\"</b>. That code unlocks <b>your</b> account, so it stays with you.",
        picture: {
          kind: "chat",
          app: "WhatsApp",
          sender: "Mia 💜",
          note: "your friend",
          parts: [
            {
              role: "them",
              time: "4:12 pm",
              text: "omg i sent my code to u by mistake 🙈",
              flag: true,
              why: "Mix-ups like this are very rare. Someone most likely typed in your number."
            },
            {
              role: "them",
              time: "4:12 pm",
              text: "can u send it back? i need it to log in",
              flag: true,
              why: "That code unlocks YOUR account, not hers."
            },
            { role: "me", time: "4:13 pm", text: "wait what code" },
            {
              role: "them",
              time: "4:13 pm",
              text: "pls quick it runs out!!",
              flag: true,
              why: "Hurry is there to stop you thinking."
            }
          ]
        },
        keep: "A code that came to your phone is only for you."
      },
      {
        icon: "🔓",
        title: "What the code really does",
        text: "Someone typed <b>your number</b> into their phone to log in as you. The code is the last key. Send it, and they <b>own your account</b>.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "They type your number into their own phone." },
            { icon: "📩", text: "The app sends a code to your phone." },
            { icon: "🎣", text: "They trick you into sending it to them." },
            { icon: "😢", text: "They log in as you and message all your friends." }
          ]
        }
      },
      {
        icon: "🤔",
        title: "Why it came from a friend",
        text: "Mia's account was probably <b>taken the same way</b>. Now the scammer uses it to trick her friends. Check with Mia <b>another way</b>, like calling her.",
        keep: "Check with your friend outside the app."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this Discord chat.",
        picture: {
          kind: "chat",
          app: "Discord",
          sender: "jake_plays",
          note: "from your server",
          parts: [
            { role: "them", time: "9:40 pm", text: "hey r u online?" },
            {
              role: "them",
              time: "9:41 pm",
              text: "a code just went to ur email by mistake, its mine",
              flag: true,
              why: "Codes go to the account owner. That code is for your account."
            },
            { role: "me", time: "9:41 pm", text: "oh ok?" },
            {
              role: "them",
              time: "9:42 pm",
              text: "read it to me so i can log in",
              flag: true,
              why: "Anyone who asks for your code is trying to take your account."
            },
            {
              role: "them",
              time: "9:42 pm",
              text: "dont tell anyone, id get in trouble lol",
              flag: true,
              why: "Asking for a secret is a warning sign. Telling is always okay."
            }
          ]
        },
        why: "The \"by mistake\" story, the ask for the code and the secret all point to a trap."
      },
      {
        type: "choice",
        question: "A login code arrives that you never asked for. What does it most likely mean?",
        answers: [
          { text: "Someone is trying to log in to my account", right: true },
          { text: "The app sent it to me by accident" },
          { text: "I won something and this is my claim code" }
        ],
        why: "A surprise code means someone typed in your number. Don't share it. Tell a parent, or another adult you trust, and turn on 2-step verification."
      },
      {
        type: "choice",
        question: "Your best friend asks for the code that just came to your phone. Pick your reply.",
        answers: [
          { text: "no, codes are only for me. even with you", right: true },
          { text: "ok, but only because ur my best friend" },
          { text: "ill send just the first 3 numbers" }
        ],
        why: "Real friends never need your code. If they ask, their account may already be taken."
      },
      {
        type: "order",
        question: "You sent your code and now you are locked out. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Get back in through the real app's login or recovery",
          "Turn on 2-step verification"
        ],
        why: "Telling first gets help fast. Getting back in kicks the scammer out. Then warn your friends the scammer may message them."
      }
    ],
    rule: "A code sent to you is only for you.",
    sources: [
      {
        name: "WhatsApp Help: About registration and two-step verification",
        url: "https://faq.whatsapp.com/506595211487528"
      },
      {
        name: "WhatsApp Help: How to recover a compromised account",
        url: "https://faq.whatsapp.com/1131652977717250"
      },
      { name: "Discord Safety Library", url: "https://discord.com/safety-library" }
    ]
  },
  {
    id: "s-password-expires",
    icon: "📧",
    title: "Your password expires today",
    minutes: 4,
    learn: [
      {
        icon: "🏫",
        title: "A scary school email",
        text: "It looks like it is from your school's IT team. It says your password <b>expires today</b>. The button goes to a <b>fake login page</b>.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "IT Help Desk (helpdesk@school-account-alerts.net)",
              flag: true,
              why: "Read the part after the @. It is not your school's real address."
            },
            {
              role: "subject",
              text: "⚠️ Your password expires TODAY",
              flag: true,
              why: "A scary deadline is there to make you rush."
            },
            { role: "line", text: "Dear Student,", flag: true, why: "Your real school knows your name." },
            { role: "line", text: "Your account will be locked at 5pm. Click below to keep your password." },
            { role: "button", text: "KEEP MY PASSWORD" }
          ]
        },
        keep: "Never type your password after clicking a link in an email."
      },
      {
        icon: "🧭",
        title: "Check it the safe way",
        text: "Don't click. Open your school site <b>the way you always do</b>, or ask a teacher. If something is really wrong, you will see it there.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "📌", text: "Open your school site from your bookmark" },
            { icon: "🧑‍🏫", text: "Ask a teacher or the school office" },
            { icon: "🚩", text: "Report it with the email's report button" }
          ]
        }
      },
      {
        icon: "💥",
        title: "If you fall for it",
        text: "One stolen school login can trick a <b>whole class</b>, because the next fake email comes from you.",
        picture: {
          kind: "steps",
          items: [
            { icon: "⌨️", text: "You type your school password on the fake page." },
            { icon: "🔓", text: "They log in to your school email." },
            { icon: "📨", text: "They send the same trick to your whole class, as you." }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 4 red flags in this email.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "noreply@schoo1-portal-login.com",
              flag: true,
              why: "School with a 1 instead of an l. It is a look-alike address."
            },
            {
              role: "subject",
              text: "Final notice: account closing in 1 hour",
              flag: true,
              why: "A countdown is there to rush you."
            },
            { role: "line", text: "Dear student,", flag: true, why: "Your real school knows your name." },
            { role: "line", text: "We are updating our school system this week." },
            {
              role: "line",
              text: "Sign in now with your email and password to keep your files.",
              flag: true,
              why: "Your school will not ask for your password through an email link."
            },
            { role: "button", text: "SIGN IN" }
          ]
        },
        why: "A look-alike address, a countdown, no name and a password ask. That is a fake school email."
      },
      {
        type: "choice",
        question: "The email says your school account locks at 5pm. What is the best move?",
        answers: [
          { text: "Open the school site the usual way and check", right: true },
          { text: "Click fast so I don't get locked out at 5" },
          { text: "Reply to the email and ask if it is real" }
        ],
        why: "Replying goes to the scammer. Checking the usual way shows you the truth."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "email",
          parts: [
            { role: "from", text: "Mr. Lee &lt;lee@maplewood-ms-k12.org&gt;" },
            { role: "subject", text: "Science project due Friday" },
            { role: "line", text: "Hi Sam, remember to bring your poster on Friday." },
            { role: "line", text: "No need to reply. See you in class!" }
          ]
        },
        answer: "real",
        why: "It comes from the school's own address, uses your name, has no link and asks for nothing. That is a normal reminder."
      },
      {
        type: "choice",
        question: "Why does a fake email say \"Dear Student\" and not your name?",
        answers: [
          { text: "It was sent to lots of people at once", right: true },
          { text: "Schools always write their emails like that" },
          { text: "To keep your name private and safe" }
        ],
        why: "Scammers send one email to many people. Your real school usually knows your name."
      }
    ],
    rule: "Check your school account the usual way, never the link.",
    sources: [
      {
        name: "FTC: How to recognize and avoid phishing scams",
        url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
      },
      {
        name: "CISA: Recognize and report phishing",
        url: "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"
      }
    ]
  },
  {
    id: "s-new-number",
    icon: "📱",
    title: "It's me, new number",
    minutes: 4,
    learn: [
      {
        icon: "💬",
        title: "A text from \"Mom\"",
        text: "A number you don't know says <b>\"Hi, it's Mom, I lost my phone\"</b>. Then comes the ask: a code, money or a <b>gift card</b>.",
        picture: {
          kind: "text",
          sender: "+1 (312) 555-0164",
          parts: [
            {
              role: "them",
              time: "2:05 pm",
              text: "hi sweetie its mom, this is my new number",
              flag: true,
              why: "Anyone can say they are Mom from a new number."
            },
            {
              role: "them",
              time: "2:05 pm",
              text: "lost my phone, cant call right now",
              flag: true,
              why: "No call means you can't hear if it is really her."
            },
            { role: "me", time: "2:07 pm", text: "ok?" },
            {
              role: "them",
              time: "2:07 pm",
              text: "can u buy a gift card and send me the code? ill pay u back",
              flag: true,
              why: "Asking you for gift card codes is a big warning sign."
            }
          ]
        },
        keep: "Check with your family on the number you already have."
      },
      {
        icon: "🔐",
        title: "Use a family word",
        text: "Pick a <b>family word</b> with your family. Only they know it. If \"Mom\" can't say the word, it isn't Mom.",
        keep: "No family word? Call them on the number you already have."
      },
      {
        icon: "🚫",
        title: "Scam text? Don't reply STOP.",
        text: "Replying to a scam text, even with <b>STOP</b>, tells scammers your number works. Then more texts come. <b>Block</b> the number and report it as junk instead.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "📞", text: "Call your family on the number you already have" },
            { icon: "🔐", text: "Ask for the family word" },
            { icon: "🚫", text: "Block the new number and report it as junk" },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "\"Mom\" texts from a new number. How do you check it is really her?",
        answers: [
          { text: "Call her old number, or ask for our family word", right: true },
          { text: "Ask her to tell me my full name and birthday" },
          { text: "Check that her profile picture looks like her" }
        ],
        why: "A scammer may already know your name and copy a photo. Only the real Mom knows the family word."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags in this text.",
        picture: {
          kind: "text",
          sender: "+1 (646) 555-0119",
          parts: [
            {
              role: "them",
              time: "3:30 pm",
              text: "hey its dad, new phone 📱",
              flag: true,
              why: "Anyone can say they are Dad from a new number."
            },
            { role: "them", time: "3:30 pm", text: "how was school today?" },
            {
              role: "them",
              time: "3:31 pm",
              text: "dont call, im in a meeting",
              flag: true,
              why: "Stopping you from calling means you can't check his voice."
            },
            { role: "me", time: "3:33 pm", text: "fine. why?" },
            {
              role: "them",
              time: "3:33 pm",
              text: "send me the code that just came to your phone",
              flag: true,
              why: "A code on your phone unlocks your account. Never send it."
            }
          ]
        },
        why: "A new number, no calls allowed, and a code ask. Check with Dad on his real number."
      },
      {
        type: "choice",
        question: "A scam text says \"Reply STOP to end messages.\" What should you do?",
        answers: [
          { text: "Don't reply. Block it and report it as junk", right: true },
          { text: "Reply STOP, so they leave me alone for good" },
          { text: "Reply and ask them who they are" }
        ],
        why: "Any reply, even STOP, tells them your number is real. Then more scam texts come."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Mom",
          parts: [
            { role: "them", time: "3:52 pm", text: "running 10 min late, wait inside the library" },
            { role: "me", time: "3:52 pm", text: "ok 👍" }
          ]
        },
        answer: "real",
        why: "It asks for nothing and fits your day. Even from a saved contact, watch for asks for codes, money or secrets."
      }
    ],
    rule: "New number? Check on the old one first.",
    sources: [
      {
        name: "FBI IC3 (2024): Create a secret word or phrase with your family",
        url: "https://www.ic3.gov/PSA/2024/PSA241203"
      },
      {
        name: "FTC: Scammers use fake emergencies to steal your money",
        url: "https://consumer.ftc.gov/articles/scammers-use-fake-emergencies-steal-your-money"
      },
      {
        name: "FCC: Avoid the temptation of smishing scams (don't text STOP)",
        url: "https://www.fcc.gov/avoid-temptation-smishing-scams"
      },
      {
        name: "FTC (2024): Why it's not rude to ignore texts from strangers",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/05/why-its-not-rude-ignore-hi-how-are-you-text-messages-strangers"
      },
      {
        name: "FTC: How to recognize and report spam text messages",
        url: "https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages"
      }
    ]
  }
];
