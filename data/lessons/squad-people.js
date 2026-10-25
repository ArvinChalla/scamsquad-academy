/* ========================================================================
   squad-people.js
   Lessons for ages 10 to 13, in the People and feelings world.
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "s-gifts-secrets",
    icon: "🚪",
    title: "Gifts, secrets, new app",
    minutes: 5,
    learn: [
      {
        icon: "🎁",
        title: "It starts out nice",
        text: "An older player is <b>friendly</b>, plays with you, and says you are really good. Then come <b>free gifts</b>, like coins or skins, for no reason.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "ShadowPlays_22",
          note: "met in a lobby 3 weeks ago",
          parts: [
            { role: "them", time: "7:30 pm", text: "gg you carried that round" },
            {
              role: "them",
              time: "7:31 pm",
              text: "how old r u? im 22",
              flag: true,
              why: "An adult working to befriend a much younger player is the first signal."
            },
            {
              role: "them",
              time: "9:48 pm",
              text: "sent u 2000 coins, no reason 🙂",
              flag: true,
              why: "Gifts can make you feel you owe them. That feeling is what they want."
            },
            {
              role: "them",
              time: "11:02 pm",
              text: "dont tell ur parents, they get weird about older friends",
              flag: true,
              why: "A secret from your family is the clearest warning sign."
            },
            {
              role: "them",
              time: "11:03 pm",
              text: "this chat is laggy, add me on the other app?",
              flag: true,
              why: "Moving you somewhere quieter is the point, not the lag."
            }
          ]
        },
        keep: "Gifts plus secrets plus a new app is the pattern."
      },
      {
        icon: "🧩",
        title: "One sign, or the pattern?",
        text: "One thing alone might be nothing. But <b>gifts, secrets and moving apps</b> together are a pattern some adults use to <b>win a child's trust</b> and then harm them.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🌟", text: "Lots of compliments and free gifts" },
            { icon: "🤫", text: "\"Don't tell your parents about me\"" },
            { icon: "🚪", text: "\"Let's talk on another app\"" },
            { icon: "🏠", text: "Questions about your school, where you live, or if you are alone" },
            { icon: "📷", text: "Asking for photos of you" }
          ]
        }
      },
      {
        icon: "🗣️",
        title: "Telling is always okay",
        text: "Tell a parent, or another adult you trust, <b>today</b>. You are <b>never in trouble</b> for telling. Nothing that happened before you told is your fault.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "✋", text: "Stop chatting. Don't move apps." },
            { icon: "💾", text: "Keep the messages. Don't delete them." },
            { icon: "🚨", text: "Report it to the CyberTipline at report.cybertip.org, with an adult's help" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 4 red flags in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "NovaKnight",
          note: "met in a game 2 weeks ago",
          parts: [
            { role: "them", time: "6:45 pm", text: "lol that boss fight was wild" },
            {
              role: "them",
              time: "6:46 pm",
              text: "ur way more mature than other kids ur age",
              flag: true,
              why: "Special flattery makes you feel grown-up and close to them fast."
            },
            {
              role: "them",
              time: "6:50 pm",
              text: "ill buy you the battle pass, my treat",
              flag: true,
              why: "A big gift from someone you met online builds a feeling that you owe them."
            },
            { role: "me", time: "6:51 pm", text: "really? thanks!" },
            {
              role: "them",
              time: "6:52 pm",
              text: "what school do u go to? 🏫",
              flag: true,
              why: "Your school tells a stranger where to find you. Keep it to people you know."
            },
            {
              role: "them",
              time: "6:52 pm",
              text: "just keep it between us ok? 🤐",
              flag: true,
              why: "Asking for a secret from your family is the warning sign."
            }
          ]
        },
        why: "Flattery, a big gift, a school question and a secret. Together they are the pattern."
      },
      {
        type: "choice",
        question: "An online friend says \"Let's talk on another app, it's more private.\" What do you do?",
        answers: [
          { text: "Say no, and tell a parent, or another adult you trust", right: true },
          { text: "Go. They have only ever been nice to me" },
          { text: "Go, but don't give them my real name" }
        ],
        why: "Moving to a quieter app is part of the pattern. Being nice at first is how it works."
      },
      {
        type: "choice",
        question: "Why might someone online give you free coins for no reason?",
        answers: [
          { text: "So you feel you owe them something", right: true },
          { text: "Because they are rich and like being kind" },
          { text: "Because they want you on their team" }
        ],
        why: "Gifts with no reason can make you feel you owe them. That feeling makes it easier to ask for secrets."
      },
      {
        type: "choice",
        question: "You already told them where your school is. Are you in trouble?",
        answers: [
          { text: "No. Tell a parent, or another adult I trust, now", right: true },
          { text: "Yes, so I should keep quiet about it" },
          { text: "Only if I tell someone, so I won't" }
        ],
        why: "You are never in trouble for telling. The adult who asked for secrets is the one doing wrong."
      },
      {
        type: "order",
        question: "Someone online asks you to keep a secret and move apps. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Stop replying and save the messages",
          "Report it to the CyberTipline, with an adult's help",
          "Block the account"
        ],
        why: "Telling gets help. Saved messages help the people who stop this. Block after reporting, so the account can still be found."
      }
    ],
    rule: "A secret from your family is the warning sign.",
    sources: [
      {
        name: "NCMEC: Grooming in the digital age",
        url: "https://www.missingkids.org/blog/2020/grooming-in-the-digital-age"
      },
      { name: "NCMEC: Online enticement", url: "https://www.missingkids.org/theissues/onlineenticement" },
      { name: "NCMEC CyberTipline", url: "https://www.missingkids.org/gethelpnow/cybertipline" },
      {
        name: "NCMEC (2017): The online enticement of children, moving chats to other apps",
        url: "https://www.missingkids.org/content/dam/missingkids/pdfs/ncmec-analysis/Online%20Enticement%20Pre-Travel1.pdf"
      }
    ]
  },
  {
    id: "s-new-account",
    icon: "👯",
    title: "This is my new account",
    minutes: 4,
    learn: [
      {
        icon: "👀",
        title: "Same name, same photo",
        text: "A request comes with your friend's <b>name and photo</b>: \"My old account got hacked, this is my new one!\" Anyone can copy a name and a photo.",
        picture: {
          kind: "chat",
          app: "Social app",
          sender: "maya.r_2",
          note: "new account",
          parts: [
            {
              role: "them",
              time: "5:20 pm",
              text: "heyy its maya!! old account got hacked 😭",
              flag: true,
              why: "Anyone can copy a name and photo. The profile can't prove it's her."
            },
            { role: "them", time: "5:20 pm", text: "this is my new one, add me back" },
            { role: "me", time: "5:22 pm", text: "omg ok" },
            {
              role: "them",
              time: "5:23 pm",
              text: "can u vote for me? just log in on this link",
              flag: true,
              why: "Copies always want something: a login, a code or money."
            },
            {
              role: "them",
              time: "5:23 pm",
              text: "and dont tell anyone yet, its embarrassing",
              flag: true,
              why: "Keeping it quiet stops you checking with the real Maya."
            }
          ]
        },
        keep: "Check with the real friend outside the app."
      },
      {
        icon: "🎯",
        title: "What the copy wants",
        text: "The copy uses your <b>trust in your friend</b>. Soon it asks for something.",
        picture: {
          kind: "checklist",
          color: "red",
          items: [
            { icon: "🔑", text: "Your password, through a \"vote for me\" link" },
            { icon: "🔢", text: "A login code \"sent by mistake\"" },
            { icon: "💸", text: "Money, Robux or gift cards for an \"emergency\"" },
            { icon: "📷", text: "Photos of you or your friends" }
          ]
        }
      },
      {
        icon: "📞",
        title: "Check another way",
        text: "Ask your friend <b>at school</b>, or text their <b>real number</b>. If it is a copy, tell your friend so they can report it. Then block the copy."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this chat.",
        picture: {
          kind: "chat",
          app: "Game chat",
          sender: "leo_plays.real",
          note: "new account",
          parts: [
            {
              role: "them",
              time: "4:01 pm",
              text: "yo its leo, new acc, old one got banned",
              flag: true,
              why: "A \"new account\" story is how copies start. Check with Leo yourself."
            },
            { role: "them", time: "4:01 pm", text: "hows ur weekend" },
            {
              role: "them",
              time: "4:03 pm",
              text: "can u lend me 500 Robux? ill pay u back monday",
              flag: true,
              why: "A copy always gets to the ask. Here it is Robux."
            },
            { role: "me", time: "4:04 pm", text: "um maybe" },
            {
              role: "them",
              time: "4:04 pm",
              text: "send fast before my mom sees",
              flag: true,
              why: "Hurry plus a secret stops you checking."
            }
          ]
        },
        why: "A new account story, an ask, and hurry plus a secret. Ask the real Leo first."
      },
      {
        type: "choice",
        question: "A \"new account\" of your friend asks you for a favor. What do you do first?",
        answers: [
          { text: "Ask my friend at school or on their real number", right: true },
          { text: "Look at the profile photo to see if it's them" },
          { text: "Ask a question only they would know, in this chat" }
        ],
        why: "Photos can be copied, and a hacker may have read your old chats. Checking outside the app is the sure way."
      },
      {
        type: "realfake",
        question: "Real or fake?",
        picture: {
          kind: "chat",
          app: "Social app",
          sender: "Maya 🌙",
          note: "your friend, chatting for 2 years",
          parts: [
            { role: "them", time: "8:40 pm", text: "can you bring my hoodie tomorrow? i left it at yours" },
            { role: "me", time: "8:41 pm", text: "yep 👍" }
          ]
        },
        answer: "real",
        why: "A normal favor that fits real life, with nothing to click, send or hide. Hacked accounts have old chats too, so watch the ask."
      },
      {
        type: "choice",
        question: "You find out the new account was a copy. What next?",
        answers: [
          { text: "Tell my friend and a parent, or another adult I trust", right: true },
          { text: "Message the copy and tell them off for faking" },
          { text: "Ignore it. It's not my account, so not my problem" }
        ],
        why: "Your friend needs to know so others are not fooled. Then block and report the copy, so the app can take it down."
      }
    ],
    rule: "New account? Check with your friend another way.",
    sources: [
      {
        name: "Instagram Help: What can I do if someone is impersonating me?",
        url: "https://help.instagram.com/370054663112398"
      },
      {
        name: "Webroot (2025): Common online scams targeting children",
        url: "https://www.webroot.com/blog/5-common-online-scams-targeting-children-and-how-to-stop-them/"
      }
    ]
  },
  {
    id: "s-left-out",
    icon: "👥",
    title: "Left out on purpose",
    minutes: 4,
    learn: [
      {
        icon: "💬",
        title: "A group without her",
        text: "Someone makes a new group chat with everyone <b>except Kira</b>. Then they share her posts to <b>laugh at her</b>. Nobody says anything to her face.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "the squad 🔥",
          note: "6 members",
          parts: [
            {
              role: "them",
              name: "Jayden",
              time: "8:02 pm",
              text: "new gc 🤫 no kira lol",
              flag: true,
              why: "Making a group just to leave someone out, and joking about it, is bullying."
            },
            {
              role: "them",
              name: "Ava",
              time: "8:03 pm",
              text: "look what she posted 💀",
              flag: true,
              why: "Sharing her posts to laugh at is bullying, even behind her back."
            },
            {
              role: "them",
              name: "Leo",
              time: "8:03 pm",
              text: "😂😂😂",
              flag: true,
              why: "Laughing along makes it bigger, even with just an emoji."
            },
            { role: "them", name: "Ava", time: "8:05 pm", text: "anyway who's free saturday?" }
          ]
        },
        keep: "Leaving someone out on purpose is bullying."
      },
      {
        icon: "🤐",
        title: "Staying quiet keeps it going",
        text: "When nobody speaks up, it looks like <b>everyone agrees</b>. You don't have to be brave in front of everyone. <b>Small moves</b> help a lot.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🚫", text: "Don't add reactions or forward it" },
            { icon: "💬", text: "Say \"not cool\", or change the subject" },
            { icon: "💜", text: "Check on her in private" },
            { icon: "🗣️", text: "Tell a parent, or another adult you trust, like a teacher" },
            { icon: "🚩", text: "Report it in the app" }
          ]
        }
      },
      {
        icon: "💜",
        title: "If you are left out",
        text: "It hurts, and <b>it is not your fault</b>. Save screenshots, block people if you need to, and tell a parent, or another adult you trust."
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 red flags in this class chat.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "7th grade chat",
          note: "24 members",
          parts: [
            { role: "them", name: "Ben", time: "6:30 pm", text: "who's coming to the park on sat?" },
            {
              role: "them",
              name: "Zoe",
              time: "6:31 pm",
              text: "not inviting priya, shes annoying",
              flag: true,
              why: "Leaving someone out on purpose, and saying it to the group, is bullying."
            },
            {
              role: "them",
              name: "Max",
              time: "6:31 pm",
              text: "did u see her new haircut 💀",
              flag: true,
              why: "Mocking someone behind their back is still bullying."
            },
            { role: "them", name: "Ben", time: "6:33 pm", text: "ok, 2pm by the swings" },
            {
              role: "them",
              name: "Zoe",
              time: "6:34 pm",
              text: "screenshot her story and post it here",
              flag: true,
              why: "Sharing someone's posts to laugh at them makes the bullying spread."
            }
          ]
        },
        why: "Leaving her out, mocking her and sharing her posts. Planning the park is normal."
      },
      {
        type: "choice",
        question: "A chat is making fun of someone who isn't there. What helps most?",
        answers: [
          { text: "Say it's not cool, then check on them in private", right: true },
          { text: "Stay quiet. I'm not the one being mean" },
          { text: "Screenshot it and send it to them so they know" }
        ],
        why: "Staying quiet lets it grow. Sending it to them hurts more. Speaking up and checking in helps."
      },
      {
        type: "choice",
        question: "Is it bullying if nobody says anything mean to her face?",
        answers: [
          { text: "Yes. Leaving out and mocking behind her back count", right: true },
          { text: "No. She never even saw it happen" },
          { text: "Only if it happens to her every day" }
        ],
        why: "Bullying does not need to be said to someone's face. A group made to leave someone out still hurts."
      },
      {
        type: "choice",
        question: "The group is laughing at someone's photo. Pick your reply.",
        picture: {
          kind: "chat",
          app: "Group chat",
          sender: "7th grade chat",
          note: "24 members",
          parts: [
            { role: "them", name: "Max", time: "9:14 pm", text: "lol look at priya's pic 💀" },
            { role: "them", name: "Zoe", time: "9:14 pm", text: "😂😂😂" }
          ]
        },
        answers: [
          { text: "not cool. let's leave her alone", right: true },
          { text: "haha ok that's a bit funny" },
          { text: "wait send it to me, i wanna see" }
        ],
        why: "Laughing along makes it bigger, and silence looks like agreeing. A short \"not cool\" helps. Check on her in private later."
      }
    ],
    rule: "Don't laugh along. Speak up, or check in.",
    sources: [
      {
        name: "StopBullying.gov: Bystanders to bullying",
        url: "https://www.stopbullying.gov/prevention/bystanders-to-bullying"
      },
      {
        name: "Cyberbullying Research Center: Standing up to cyberbullying, tips for teens",
        url: "https://cyberbullying.org/standing-up-to-cyberbullying-tips-for-teens"
      }
    ]
  }
];
