/* ========================================================================
   explore-people.js
   Lessons for ages 6 to 9, in the People and feelings world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-who-can-know",
    icon: "🏠",
    title: "Who Can Know This?",
    minutes: 3,
    learn: [
      {
        icon: "🏠",
        title: "Only my family",
        text: "Some things are for <b>your family only</b>. They help people find you, or get into your game.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🏠", text: "Where I live" },
            { icon: "🏫", text: "My school name" },
            { icon: "🔑", text: "My password" },
            { icon: "📞", text: "My phone number" },
            { icon: "📸", text: "A picture of me" }
          ]
        }
      },
      {
        icon: "😊",
        title: "OK for anyone",
        text: "Fun things are fine to share: your <b>favorite color</b>, animal or food.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🐶", text: "My favorite animal" },
            { icon: "🎨", text: "My favorite color" },
            { icon: "🍕", text: "My favorite food" }
          ]
        },
        keep: "Not sure? Ask your grown-up before you share."
      },
      {
        icon: "🧩",
        title: "Fun quizzes can be tricks",
        text: "A quiz says: <b>your pet + your street = your hero name!</b> That asks for family things.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "super-hero-name-quiz.net" },
            { role: "big", text: "What is your hero name?" },
            {
              role: "field",
              text: "Your pet's name",
              flag: true,
              why: "Pet names can help someone get into games and apps. That is family only."
            },
            {
              role: "field",
              text: "Your street",
              flag: true,
              why: "Your street tells people where you live."
            },
            { role: "button", text: "SEE MY NAME" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A new player asks your school name. What now?",
        answers: [
          { text: "Do not say. Tell my grown-up", right: true },
          { text: "Tell them, it is fine" },
          { text: "Tell them only my town" }
        ],
        why: "Your school tells people where you are all day. It is for your family only."
      },
      {
        type: "choice",
        question: "Which one is OK to share with anyone?",
        answers: [
          { text: "My favorite color", right: true },
          { text: "My street name" },
          { text: "My school name" }
        ],
        why: "A favorite color does not help anyone find you. Your street and school do."
      },
      {
        type: "spot",
        question: "Tap the 2 things this quiz should not ask.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "fun-name-quiz.net" },
            { role: "big", text: "Find your unicorn name!" },
            { role: "field", text: "Your favorite color" },
            {
              role: "field",
              text: "Your street name",
              flag: true,
              why: "Your street tells people where you live."
            },
            {
              role: "field",
              text: "Your school",
              flag: true,
              why: "Your school tells people where you are all day."
            },
            { role: "button", text: "GO" }
          ]
        },
        why: "Street and school are family only. A favorite color is fine to share."
      },
      {
        type: "choice",
        question: "You told a player your school. What now?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Nothing, it is just a name" },
          { text: "Leave the game, tell nobody" }
        ],
        why: "You are not in trouble. Your grown-up can help you block the player and stay safe."
      }
    ],
    rule: "Where you live and your school are family only.",
    sources: [
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      },
      { name: "NCMEC NetSmartz", url: "https://www.missingkids.org/netsmartz" }
    ]
  },
  {
    id: "e-dont-tell-mom",
    icon: "🤫",
    title: "\"Don't Tell Your Mom\"",
    minutes: 4,
    learn: [
      {
        icon: "🤫",
        title: "A nice player, then a secret",
        text: "A player is nice to you. Then they say: <b>don't tell your mom</b>.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "CoolGamer",
          note: "you met in a game",
          parts: [
            { role: "them", text: "you are really good at this!" },
            {
              role: "them",
              text: "let's talk on another app",
              flag: true,
              why: "They want you where your grown-up cannot see."
            },
            { role: "them", text: "just you and me", flag: true, why: "They want you all alone." },
            {
              role: "them",
              text: "don't tell your mom, ok? 🤫",
              flag: true,
              why: "A secret from your grown-up? Tell them."
            }
          ]
        }
      },
      {
        icon: "🚨",
        title: "That is the alarm",
        text: "Good friends never ask you to hide things from family. That is a <b>warning sign</b>.",
        keep: "A secret from your grown-up? Tell them right away."
      },
      {
        icon: "🎉",
        title: "Surprise or secret?",
        text: "A <b>surprise</b> party ends soon and makes people happy. A bad secret, you <b>tell</b>."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 alarm messages in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "StarPlayer9",
          note: "you met in a game",
          parts: [
            { role: "them", text: "gg! that was fun" },
            { role: "me", text: "thanks!" },
            { role: "them", text: "want to play again?" },
            {
              role: "them",
              text: "come to another app with me",
              flag: true,
              why: "They want you where your grown-up cannot see."
            },
            {
              role: "them",
              text: "this is our secret, ok?",
              flag: true,
              why: "A secret from your family is the warning sign."
            }
          ]
        },
        why: "Another app and a secret are the alarms. \"gg\" means good game. That is normal."
      },
      {
        type: "choice",
        question: "A player says: don't tell your mom. What do you do?",
        answers: [
          { text: "Tell my grown-up right away", right: true },
          { text: "Stay quiet, they asked nicely" },
          { text: "Tell only my best friend" }
        ],
        why: "When someone says don't tell, that is the time to tell your grown-up."
      },
      {
        type: "choice",
        question: "Which one is OK to wait and tell later?",
        answers: [
          { text: "A surprise party for Dad", right: true },
          { text: "A secret chat with a player" },
          { text: "A present from a player" }
        ],
        why: "A surprise ends soon and makes people happy. Secrets with a player are a warning sign."
      },
      {
        type: "choice",
        question: "They say you will be in trouble if you tell. True?",
        answers: [
          { text: "No. I am not in trouble", right: true },
          { text: "Yes, so I stay quiet" },
          { text: "Maybe, so I wait" }
        ],
        why: "You are never in trouble for telling. Tricksters say that so you stay quiet."
      }
    ],
    rule: "A secret from your family is the warning sign.",
    sources: [
      { name: "NCMEC: Online enticement", url: "https://www.missingkids.org/theissues/onlineenticement" },
      { name: "NCMEC NetSmartz", url: "https://www.missingkids.org/netsmartz" }
    ]
  },
  {
    id: "e-mean-words-kind-words",
    icon: "💬",
    title: "Mean Words, Kind Words",
    minutes: 3,
    learn: [
      {
        icon: "💬",
        title: "Mean words are not your fault",
        text: "Sometimes a player sends <b>mean messages</b> on purpose. It is <b>not your fault</b>.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "BlockBuddy99",
          note: "a player in your game",
          parts: [
            { role: "them", text: "nice house you built!" },
            {
              role: "them",
              text: "you are SO bad at this 😂",
              flag: true,
              why: "That is mean. Mean words are never your fault."
            },
            {
              role: "them",
              text: "nobody wants to play with you",
              flag: true,
              why: "That is meant to hurt. It is not true."
            }
          ]
        }
      },
      {
        icon: "🛑",
        title: "What to do",
        text: "Mean words hurt. Here is what to do.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🙊", text: "Do not write back" },
            { icon: "🦉", text: "Show your grown-up" },
            { icon: "🚫", text: "Block and report, together" }
          ]
        }
      },
      {
        icon: "🤝",
        title: "Be a kind teammate",
        text: "Is a player mean to someone? <b>Do not join in.</b> Play with them, and tell your grown-up.",
        keep: "Being kind is a superpower."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 mean messages in this chat.",
        picture: {
          kind: "chat",
          app: "Team chat",
          sender: "Max_Plays",
          note: "a player on your team",
          parts: [
            { role: "them", text: "new kid joined" },
            { role: "me", text: "hi everyone!" },
            {
              role: "them",
              text: "noob, get out of our team",
              flag: true,
              why: "Calling names to push someone out is mean."
            },
            {
              role: "them",
              text: "yeah nobody likes you",
              flag: true,
              why: "That is meant to hurt. It is not true."
            },
            { role: "them", text: "ok let's start the game" }
          ]
        },
        why: "Name-calling and \"nobody likes you\" are mean. The other messages are normal."
      },
      {
        type: "choice",
        question: "A player sends you mean words. What first?",
        answers: [
          { text: "Do not reply. Show my grown-up", right: true },
          { text: "Send mean words back" },
          { text: "Hide it and tell nobody" }
        ],
        why: "Mean words back make it bigger. Hiding it means nobody can help."
      },
      {
        type: "choice",
        question: "Players are mean to Sam. What can you do?",
        answers: [
          { text: "Play with Sam, tell my grown-up", right: true },
          { text: "Laugh so they like me" },
          { text: "Say mean things too" }
        ],
        why: "Being kind helps Sam feel less alone. Your grown-up can help too."
      },
      {
        type: "choice",
        question: "Is a mean message ever your fault?",
        answers: [
          { text: "No, never", right: true },
          { text: "Yes, if I played badly" },
          { text: "Sometimes it is" }
        ],
        why: "Mean words are the sender's choice, not your fault. Your grown-up can help."
      }
    ],
    rule: "Mean words? Do not reply. Show your grown-up.",
    sources: [
      {
        name: "StopBullying.gov: What is cyberbullying",
        url: "https://www.stopbullying.gov/cyberbullying/what-is-it"
      }
    ]
  }
];
