/* ========================================================================
   explore-realfake.js
   Lessons for ages 6 to 9, in the Real or fake? world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-is-that-real",
    icon: "🐳",
    title: "Is That Real?",
    minutes: 3,
    learn: [
      {
        icon: "🐳",
        title: "Pictures can be made up",
        text: "Apps can now <b>make pictures and videos</b> that look real. But they never really happened."
      },
      {
        icon: "🎬",
        title: "A video can copy a person",
        text: "A video can show a <b>famous player</b> saying things they never said. Like \"free skins for all!\"",
        picture: {
          kind: "post",
          app: "ClipView",
          author: "Star Gamer",
          video: true,
          parts: [
            { role: "media", text: "▶️ A famous gamer talking to the camera" },
            {
              role: "caption",
              text: "FREE skins for everyone!",
              flag: true,
              why: "A made-up video can copy a famous face and voice."
            },
            {
              role: "link",
              text: "Tap the link to get yours",
              flag: true,
              why: "The link is the trick. It wants your game password."
            },
            { role: "comment", text: "omg thank you!!" }
          ]
        }
      },
      {
        icon: "🤔",
        title: "Could it really happen?",
        text: "Ask yourself: <b>could this really happen?</b> Not sure? <b>Ask your grown-up.</b>",
        keep: "Seen something wow? Check it with your grown-up."
      }
    ],
    quiz: [
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "wow-pics-daily.net" },
            { role: "big", text: "📸 A whale swims down Main Street!" },
            { role: "line", text: "Share this with everyone!" }
          ]
        },
        answer: "fake",
        why: "Whales cannot swim down a street. A made-up picture can still look real."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Aunt Mia ❤️",
          note: "Saved in your phone",
          parts: [
            { role: "them", text: "Look! We got a new puppy 🐶" },
            { role: "them", text: "Come meet her this weekend!" }
          ]
        },
        answer: "real",
        why: "Aunt Mia is saved in your phone. A puppy can really happen, and she asks for nothing."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks on this video page.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "watch-fun-vids.net" },
            {
              role: "big",
              text: "▶️ Top gamer: free gems for all!",
              flag: true,
              why: "A video can be made up to copy a famous player."
            },
            {
              role: "line",
              text: "Type your password to get them",
              flag: true,
              why: "Nobody needs your password to give you gems."
            },
            { role: "line", text: "👍 1,000 likes" },
            { role: "line", text: "💬 24 comments" },
            { role: "button", text: "▶️ Watch again" }
          ]
        },
        why: "Free gems from a famous face, and a password box. Lots of likes does not make it real."
      },
      {
        type: "choice",
        question: "A video shows something amazing. What do you do?",
        answers: [
          { text: "Ask my grown-up first", right: true },
          { text: "Share it with my friends" },
          { text: "Believe it, it looks real" }
        ],
        why: "Made-up videos can look real. Your grown-up can help you check."
      }
    ],
    rule: "Looks real? It might be made up. Ask your grown-up.",
    sources: [
      { name: "NCMEC NetSmartz", url: "https://www.missingkids.org/netsmartz" },
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      }
    ]
  },
  {
    id: "e-too-good-to-be-true",
    icon: "🌈",
    title: "Too Good to Be True",
    minutes: 3,
    learn: [
      {
        icon: "🌈",
        title: "Too good? Look again",
        text: "A <b>huge prize for nothing</b> is too good to be true. That is a trick sign."
      },
      {
        icon: "🚩",
        title: "The too-good signs",
        text: "These signs mean <b>stop</b>.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🎁", text: "A huge free prize" },
            { icon: "⏰", text: "Hurry! Only now!" },
            { icon: "💳", text: "It wants a card or a password" },
            { icon: "🤫", text: "It says do not tell" }
          ]
        }
      },
      {
        icon: "🦉",
        title: "Check with your grown-up",
        text: "Not sure? <b>Show your grown-up.</b> Good things can wait for you to ask.",
        keep: "If it sounds too good to be true, stop."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "Which one is too good to be true?",
        answers: [
          { text: "A free tablet for everyone", right: true },
          { text: "A star for finishing a level" },
          { text: "A friend saying good game" }
        ],
        why: "Nobody gives everyone a free tablet. A star for playing is normal."
      },
      {
        type: "spot",
        question: "Tap the 2 too-good tricks in this message.",
        picture: {
          kind: "text",
          sender: "+1 (312) 555-0190",
          parts: [
            { role: "them", text: "Hi there!" },
            { role: "them", text: "Hope school is fun." },
            {
              role: "them",
              text: "Everyone gets a free tablet today!",
              flag: true,
              why: "Too good to be true. That is the trick."
            },
            {
              role: "them",
              text: "Answer in 2 minutes or it is gone!",
              flag: true,
              why: "Hurry is a trick to stop you asking."
            },
            { role: "them", text: "Have a great day" }
          ]
        },
        why: "A huge free prize and a hurry. Saying hi is normal."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Level 10 done! ⭐⭐⭐" },
            { role: "line", text: "You got 3 stars." },
            { role: "line", text: "See you next time!" },
            { role: "close", text: "Close" }
          ]
        },
        answer: "real",
        why: "It is your game's own screen. Stars for playing, and it asks for nothing."
      },
      {
        type: "choice",
        question: "A deal says: only today, tell nobody! What do you do?",
        answers: [
          { text: "Stop and show my grown-up", right: true },
          { text: "Hurry before it ends" },
          { text: "Tell nobody, like it says" }
        ],
        why: "Hurry and \"tell nobody\" are two trick signs at once. Show your grown-up."
      }
    ],
    rule: "Too good to be true? Stop and ask.",
    sources: [
      {
        name: "FTC: Fake prize, sweepstakes and lottery scams",
        url: "https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams"
      },
      {
        name: "FTC (2022): Bringing Dark Patterns to Light, fake timers",
        url: "https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf"
      }
    ]
  },
  {
    id: "e-scary-screen",
    icon: "😱",
    title: "Scary Screens Can Be Fake",
    minutes: 3,
    learn: [
      {
        icon: "😱",
        title: "A scary screen",
        text: "A screen says your tablet is <b>broken</b>. It wants you to <b>call</b> a number.",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            {
              role: "title",
              text: "⚠️ Your tablet is broken!",
              flag: true,
              why: "It is trying to scare you. It is just a picture."
            },
            {
              role: "line",
              text: "Call now: +1 (202) 555-0199",
              flag: true,
              why: "Real warnings on a screen never ask you to call."
            },
            {
              role: "button",
              text: "Do NOT close this!",
              flag: true,
              why: "It wants you scared and stuck. Your grown-up can close it."
            }
          ]
        }
      },
      {
        icon: "🧠",
        title: "Scared is a trick sign",
        text: "Tricks want you <b>scared</b> so you act fast. Scared and hurry? <b>Slow down.</b>"
      },
      {
        icon: "🦉",
        title: "Not sure? Ask!",
        text: "Not sure if something is real? <b>Stop</b> and <b>ask your grown-up</b>. Asking is smart.",
        keep: "Not sure? Ask your grown-up. Every time."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A scary box shows up. What do you do?",
        picture: {
          kind: "popup",
          parts: [
            { role: "close", text: "✕" },
            { role: "title", text: "WARNING! TABLET BROKEN!" },
            { role: "line", text: "Call +1 (415) 555-0155 now" },
            { role: "button", text: "FIX IT" }
          ]
        },
        answers: [
          { text: "Stop. Get my grown-up", right: true },
          { text: "Call the number fast" },
          { text: "Tap FIX IT to fix it" }
        ],
        why: "Do not tap anything on it. Your grown-up can close it the safe way."
      },
      {
        type: "choice",
        question: "Do real warnings on a screen ask you to call?",
        answers: [
          { text: "No, that is a trick", right: true },
          { text: "Yes, call right away" },
          { text: "Yes, if it looks scary" }
        ],
        why: "Real warnings on a screen never ask you to call. A scary screen is made to rush you."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "game",
          game: "Bunny Run",
          parts: [
            { role: "title", text: "Time for a break! 🌳" },
            { role: "line", text: "Your game is saved. See you later!" },
            { role: "close", text: "Close" }
          ]
        },
        answer: "real",
        why: "It is your game's own screen. It is calm, and it asks for nothing. No call, no hurry, no money."
      },
      {
        type: "choice",
        question: "You are not sure if something is real. What do you do?",
        answers: [
          { text: "Ask my grown-up", right: true },
          { text: "Guess and tap it" },
          { text: "Ask a grown-up in the chat" }
        ],
        why: "A grown-up in a game chat could be a trickster. Your own grown-up can help you check."
      }
    ],
    rule: "Not sure if it is real? Ask your grown-up.",
    sources: [
      {
        name: "FTC: How to spot, avoid and report tech support scams",
        url: "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams"
      },
      { name: "FTC: Tech support tricks (video)", url: "https://consumer.ftc.gov/media/79827" },
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      }
    ]
  }
];
