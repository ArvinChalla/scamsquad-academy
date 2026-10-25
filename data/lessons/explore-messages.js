/* ========================================================================
   explore-messages.js
   Lessons for ages 6 to 9, in the Messages and calls world
   (called "Messages" for this age group).
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "e-prize-message",
    icon: "🏆",
    title: "You Won a Prize?",
    minutes: 3,
    learn: [
      {
        icon: "🏆",
        title: "A surprise prize message",
        text: "A message says you won a <b>prize</b>. You did not try to win. It is a trick.",
        picture: {
          kind: "text",
          sender: "+1 (312) 555-0147",
          parts: [
            {
              role: "them",
              text: "🎉 YOU WON a new tablet!",
              flag: true,
              why: "You did not try to win anything. A surprise prize is a trick sign."
            },
            {
              role: "them",
              text: "Tap here: prize-4-you.net",
              flag: true,
              why: "A link from someone you do not know can take you to a trick page."
            },
            {
              role: "them",
              text: "Hurry! It ends in 1 hour!",
              flag: true,
              why: "Hurry is a trick. Real prizes do not rush you."
            }
          ]
        }
      },
      {
        icon: "💳",
        title: "Real prizes are free",
        text: "If a prize wants <b>money</b> or your grown-up's <b>card number</b>, it is not real.",
        keep: "Real prizes are free."
      },
      {
        icon: "✋",
        title: "What to do",
        text: "You found a trick. Here is what to do.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🚫", text: "Do not tap the link" },
            { icon: "🙊", text: "Do not write back" },
            { icon: "🦉", text: "Show your grown-up" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 tricks in this message.",
        picture: {
          kind: "text",
          sender: "+1 (415) 555-0121",
          parts: [
            { role: "them", text: "Hi there!" },
            { role: "them", text: "Hope you are well." },
            {
              role: "them",
              text: "You won 500 free coins!",
              flag: true,
              why: "You did not try to win anything. A surprise prize is a trick sign."
            },
            {
              role: "them",
              text: "Pay $1 to get them",
              flag: true,
              why: "Real prizes are free. Paying is the trick."
            },
            { role: "them", text: "Have a nice day" }
          ]
        },
        why: "A surprise prize that wants money is a trick. Saying hi is normal."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Aunt Rosa ❤️",
          note: "Saved in your phone",
          parts: [
            { role: "them", text: "Happy birthday! 🎂" },
            { role: "them", text: "See you at the party on Saturday!" }
          ]
        },
        answer: "real",
        why: "Aunt Rosa is saved in your phone, and she asks for nothing. No prize, no hurry, no money."
      },
      {
        type: "choice",
        question: "A prize message asks for a card number. What is it?",
        answers: [
          { text: "It is a trick", right: true },
          { text: "It is a real prize" },
          { text: "A normal step to get it" }
        ],
        why: "Real prizes are free. Asking for money or a card number is the trick."
      },
      {
        type: "choice",
        question: "What do you do with a surprise prize message?",
        answers: [
          { text: "Show it to my grown-up", right: true },
          { text: "Tap the link to see" },
          { text: "Write back to ask more" }
        ],
        why: "Tapping or writing back tells the trickster you are there. Your grown-up can help."
      }
    ],
    rule: "Real prizes are free. Show your grown-up.",
    sources: [
      {
        name: "FTC: Fake prize, sweepstakes and lottery scams",
        url: "https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams"
      },
      {
        name: "FTC: How to spot spam text messages",
        url: "https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages"
      },
      {
        name: "FTC: Youville, online safety for kids",
        url: "https://consumer.ftc.gov/consumer-alerts/2026/08/youville-helping-kids-build-online-safety-skills-summer-and-school-year"
      }
    ]
  },
  {
    id: "e-phone-number-code",
    icon: "📱",
    title: "The Code on the Phone",
    minutes: 3,
    learn: [
      {
        icon: "📱",
        title: "A code comes to the phone",
        text: "Your grown-up's phone can get a <b>code</b>, a short number. It helps them open their apps.",
        picture: {
          kind: "text",
          sender: "Bunny Run",
          parts: [
            { role: "them", text: "Your code is 4829. Do not give it to anyone." }
          ]
        }
      },
      {
        icon: "🕵️",
        title: "Then a player asks for it",
        text: "A player says <b>tell me the code</b>. They want to get into your grown-up's things.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "GameHelper",
          note: "a player you do not know",
          parts: [
            {
              role: "them",
              text: "hi! i can give you a free pet",
              flag: true,
              why: "A free gift from someone you do not know is a trick sign."
            },
            {
              role: "them",
              text: "tell me the code on the phone",
              flag: true,
              why: "Only a trickster asks for that code."
            },
            {
              role: "them",
              text: "quick, before it goes away!",
              flag: true,
              why: "Hurry is a trick. Slow down."
            }
          ]
        }
      },
      {
        icon: "🦉",
        title: "That code is for your grown-up",
        text: "Never tell anyone the code. Not a player. Not a helper. <b>Show your grown-up</b> the message.",
        keep: "The code on the phone is only for your grown-up."
      }
    ],
    quiz: [
      {
        type: "choice",
        question: "A player asks for your grown-up's phone code. Now what?",
        answers: [
          { text: "Say no and tell my grown-up", right: true },
          { text: "Tell them, they seem nice" },
          { text: "Ask my friend what to do" }
        ],
        why: "The code is only for your grown-up. Say no, and show your grown-up the chat."
      },
      {
        type: "spot",
        question: "Tap the 2 tricks in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "Star_Helper",
          note: "a player you do not know",
          parts: [
            { role: "them", text: "hi! nice game" },
            { role: "me", text: "thanks" },
            {
              role: "them",
              text: "your mom's phone got a code. tell me",
              flag: true,
              why: "Only a trickster asks for the code on the phone."
            },
            { role: "me", text: "why?" },
            {
              role: "them",
              text: "you will get 1,000 gems",
              flag: true,
              why: "A big gift for the code is a trick."
            }
          ]
        },
        why: "Asking for the code and a big gift for it are the tricks. Saying hi is normal."
      },
      {
        type: "choice",
        question: "Who should see the code on the phone?",
        answers: [
          { text: "Only my grown-up", right: true },
          { text: "Anyone who asks nicely" },
          { text: "A game helper who asks" }
        ],
        why: "Real helpers never ask for it. The code is only for your grown-up."
      },
      {
        type: "choice",
        question: "You told a player the code. What now?",
        answers: [
          { text: "Tell my grown-up now", right: true },
          { text: "Hope nothing happens" },
          { text: "Ask them to give it back" }
        ],
        why: "You are not in trouble. Telling fast lets your grown-up fix it before the trickster uses it."
      }
    ],
    rule: "The code on the phone is only for your grown-up.",
    sources: [
      {
        name: "FTC: What's a verification code and why would someone ask me for it?",
        url: "https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it"
      }
    ]
  },
  {
    id: "e-new-phone-mom",
    icon: "📲",
    title: "Hi, It's Mom!",
    minutes: 4,
    learn: [
      {
        icon: "📲",
        title: "A message from Mom?",
        text: "A message says it is from <b>Mom</b>. But it comes from a <b>new number</b>.",
        picture: {
          kind: "text",
          sender: "+1 (646) 555-0163",
          parts: [
            {
              role: "them",
              text: "Hi sweetie, it's Mom! I got a new phone.",
              flag: true,
              why: "Anyone can type Mom. A new number could be anyone."
            },
            {
              role: "them",
              text: "Send me the code on Dad's phone, quick!",
              flag: true,
              why: "Mom would not rush you to send a code."
            },
            {
              role: "them",
              text: "Don't tell Dad, ok?",
              flag: true,
              why: "Real family does not ask you to hide things from family."
            }
          ]
        }
      },
      {
        icon: "🔤",
        title: "Pick a family word",
        text: "Pick a <b>family word</b> with your grown-up. They can ask for it if a message says it's family.",
        keep: "A family word is only for your family."
      },
      {
        icon: "☎️",
        title: "Check another way",
        text: "Show your grown-up right away. They can <b>call Mom</b> on the number they already know.",
        keep: "New number says it's Mom? Do not answer. Show your grown-up."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 2 tricks in this message.",
        picture: {
          kind: "text",
          sender: "+1 (202) 555-0118",
          parts: [
            {
              role: "them",
              text: "Hi, it's your dad. New phone!",
              flag: true,
              why: "Anyone can say they are Dad. A new number is a sign to check."
            },
            { role: "them", text: "How was school?" },
            { role: "them", text: "Did you eat lunch?" },
            {
              role: "them",
              text: "Send me Grandma's card number fast",
              flag: true,
              why: "Asking for a card number and hurry are tricks."
            },
            { role: "them", text: "Love you" }
          ]
        },
        why: "A new number that wants a card number fast is a trick. Nice words alone are normal."
      },
      {
        type: "choice",
        question: "A new number says \"It's Mom\". What do you do?",
        answers: [
          { text: "Show my grown-up right away", right: true },
          { text: "Answer fast, she needs help" },
          { text: "Write back: is it you?" }
        ],
        why: "Anyone can type Mom. Do not answer. Your grown-up can call Mom on the number they know."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "text",
          sender: "Mom ❤️",
          note: "Saved in your phone",
          parts: [
            { role: "them", text: "Dinner is at 6. Love you!" }
          ]
        },
        answer: "real",
        why: "Mom is saved in your phone, and she asks for nothing. Not sure? Ask your grown-up."
      },
      {
        type: "choice",
        question: "What is a family word?",
        answers: [
          { text: "A word only my family knows", right: true },
          { text: "My password for my game" },
          { text: "Our family's last name" }
        ],
        why: "Lots of people know your last name. Your family word is just for your family."
      },
      {
        type: "choice",
        question: "You already wrote back to the new number. Now?",
        answers: [
          { text: "Show my grown-up the chat", right: true },
          { text: "Delete it and forget it" },
          { text: "Keep writing to find out" }
        ],
        why: "You are not in trouble. Your grown-up needs to see it to help."
      }
    ],
    rule: "New number says it's family? Show your grown-up.",
    sources: [
      {
        name: "FBI IC3 (2024): make a family word to check who is calling",
        url: "https://www.ic3.gov/PSA/2024/PSA241203"
      },
      { name: "FTC: How to avoid imposters", url: "https://www.ftc.gov/imposters" },
      { name: "FTC: Family emergency imposters (video)", url: "https://consumer.ftc.gov/media/79938" }
    ]
  }
];
