/* ========================================================================
   crew-securing.js
   Lessons for ages 14 to 18, in the Securing your account world
   (called "Account security" for this age group).
   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     LESSONS   the lessons, in the order the path shows them
   ======================================================================== */

export const LESSONS = [
  {
    id: "c-lock-account",
    icon: "🔐",
    title: "Lock your account",
    minutes: 4,
    learn: [
      {
        icon: "🚪",
        title: "Two locks beat one",
        text: "<b>2-step verification</b> means a password plus a second check. If your password leaks, a thief still needs the <b>second lock</b>.",
        keep: "Any 2-step verification beats none."
      },
      {
        icon: "🥇",
        title: "Not all second locks are equal",
        text: "CISA says <b>FIDO logins</b>, like security keys and passkeys, are the only widely available <b>phishing-resistant</b> kind. An <b>authenticator app</b> is a strong second choice. Text codes come last.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🔑", text: "Security key or passkey: won't work on a fake site" },
            { icon: "📱", text: "Authenticator app: codes stay on your phone" },
            { icon: "💬", text: "Text code: better than nothing, but can be stolen" }
          ]
        }
      },
      {
        icon: "📶",
        title: "What a SIM swap is",
        text: "A thief talks your phone company into moving <b>your number</b> to their SIM. Now your <b>text codes</b> go to them. The FTC says add a <b>PIN</b> to the phone account.",
        keep: "Ask whoever pays for your phone to add a carrier PIN."
      },
      {
        icon: "🩺",
        title: "The five minute check-up",
        text: "Check three things: <b>signed-in devices</b>, your <b>recovery email and phone</b>, and that 2-step verification is <b>on</b>.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "accounts.chirply-app.com/security" },
            { role: "big", text: "Security check-up" },
            {
              role: "line",
              text: "Signed in: your phone, and a Windows PC in another country",
              flag: true,
              why: "A device you don't know. Sign it out now."
            },
            {
              role: "line",
              text: "Recovery email: an old school address you can't open",
              flag: true,
              why: "If you can't open it, you can't get your account back."
            },
            {
              role: "line",
              text: "2-step verification: off",
              flag: true,
              why: "One leaked password is all a thief needs."
            },
            { role: "button", text: "Sign out of all other devices" }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "spot",
        question: "Tap the 3 problems on this security page.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "accounts.questforge-games.com/security" },
            { role: "big", text: "Your account security" },
            { role: "line", text: "Password: changed 3 months ago" },
            {
              role: "line",
              text: "Recovery phone: a number you don't recognize",
              flag: true,
              why: "Someone else could use it to reset your password."
            },
            {
              role: "line",
              text: "2-step verification: not set up",
              flag: true,
              why: "Without it, one leaked password opens the account."
            },
            {
              role: "line",
              text: "Signed in: 5 devices, 2 unknown",
              flag: true,
              why: "Unknown devices may be someone already inside. Sign them out."
            },
            { role: "line", text: "Display name: Nova_Rider" }
          ]
        },
        why: "A strange recovery phone, no 2-step verification and unknown devices. Fix all three."
      },
      {
        type: "choice",
        question: "Which second lock is strongest against fake login pages?",
        answers: [
          { text: "A security key or passkey", right: true },
          { text: "A code sent by text" },
          { text: "A really long password on its own" }
        ],
        why: "A security key checks the real site address itself, so a fake page gets nothing. CISA calls it phishing-resistant."
      },
      {
        type: "choice",
        question: "Someone SIM swaps your number. Which second lock still protects you?",
        answers: [
          { text: "An authenticator app or security key", right: true },
          { text: "Text message codes" },
          { text: "Your security question answers" }
        ],
        why: "Text codes follow your number to the thief. The FTC suggests an authenticator app or security key instead."
      },
      {
        type: "tap",
        question: "An unknown device is signed in to your account. Tap the button that kicks it out.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "accounts.chirply-app.com/devices" },
            { role: "big", text: "Where you're signed in" },
            { role: "line", text: "iPhone, this device" },
            { role: "line", text: "Windows PC, unknown location" },
            { role: "button", text: "Change profile picture" },
            { role: "button", text: "Sign out of all other devices", right: true }
          ]
        },
        why: "Signing out everywhere kicks out anyone inside. Then change your password and turn on 2-step verification."
      }
    ],
    rule: "2-step verification on, recovery email yours, strangers signed out.",
    sources: [
      { name: "CISA: More than a password (MFA)", url: "https://www.cisa.gov/MFA" },
      {
        name: "FTC: SIM swap scams, how to protect yourself",
        url: "https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself"
      },
      {
        name: "FTC: How to recover your hacked email or social media account",
        url: "https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account"
      }
    ]
  },
  {
    id: "c-padlock-lies",
    icon: "🔒",
    title: "The padlock lies",
    minutes: 4,
    learn: [
      {
        icon: "🔒",
        title: "Locked does not mean honest",
        text: "The padlock and <b>https</b> only mean the connection is <b>encrypted</b>. The FBI says don't trust a site just because it has a lock icon.",
        picture: {
          kind: "site",
          parts: [
            {
              role: "address",
              text: "🔒 https://instagram.copyright-appeal-center.help/login",
              flag: true,
              why: "The padlock is real. The site is still fake. The owner is copyright-appeal-center.help."
            },
            { role: "big", text: "Appeal your copyright strike" },
            { role: "field", text: "Username" },
            { role: "field", text: "Password", flag: true, why: "This is what they really want." },
            { role: "button", text: "APPEAL" }
          ]
        },
        keep: "A padlock means private. It doesn't mean safe."
      },
      {
        icon: "🔎",
        title: "Read the real address",
        text: "Skip the https://. Find the next /. The owner is the <b>last two parts</b> just before it. In instagram.com.help-center.net/login, the owner is <b>help-center.net</b>.",
        keep: "The last two parts before the next / are the owner."
      },
      {
        icon: "🧠",
        title: "Let your password manager check",
        text: "A password manager fills in only on the <b>exact site</b> it saved. If it won't fill, <b>stop</b>. That's a strong hint the address is a look-alike."
      },
      {
        icon: "📲",
        title: "Open it yourself",
        text: "For any warning about your account, <b>open the app yourself</b>. Real notices show up inside it. Never use the email's button.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "Instagram Copyright <no-reply@copyright-notice-team.co>",
              flag: true,
              why: "Read after the @. That is not Instagram's address."
            },
            {
              role: "subject",
              text: "Your account will be deleted in 24 hours",
              flag: true,
              why: "A deadline is there to make you panic and click."
            },
            { role: "line", text: "We received a copyright complaint about one of your posts." },
            {
              role: "button",
              text: "APPEAL NOW",
              flag: true,
              why: "It goes to a fake login page that steals your password."
            }
          ]
        }
      }
    ],
    quiz: [
      {
        type: "realfake",
        question: "This page has a padlock and https. Real or fake?",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "🔒 https://discord.com.claim-boost.gift/login" },
            { role: "big", text: "Claim your free Nitro" },
            { role: "field", text: "Email" },
            { role: "field", text: "Password" },
            { role: "button", text: "LOG IN" }
          ]
        },
        answer: "fake",
        why: "Skip the https://. The last two parts before the next / are claim-boost.gift. Anyone can get a padlock for a fake site."
      },
      {
        type: "choice",
        question: "What does the padlock next to a web address prove?",
        answers: [
          { text: "The connection is encrypted. Not who owns the site", right: true },
          { text: "The site has been checked and is safe" },
          { text: "The site belongs to a real company" }
        ],
        why: "Scam sites use https too. The FBI says the lock alone is no reason to trust a site."
      },
      {
        type: "choice",
        question: "Which address is really owned by instagram.com?",
        answers: [
          { text: "help.instagram.com/appeal", right: true },
          { text: "instagram.com.appeal-help-center.net" },
          { text: "appeal-helpdesk.net/instagram" }
        ],
        why: "Skip the https://. Find the next /. The owner is the last two parts just before it. Only the first is instagram.com."
      },
      {
        type: "spot",
        question: "Tap the 3 red flags in this email.",
        picture: {
          kind: "email",
          parts: [
            {
              role: "from",
              text: "YouTube Partner Team <alerts@creator-partner-review.net>",
              flag: true,
              why: "Not a YouTube address. Read the part after the @."
            },
            {
              role: "subject",
              text: "Copyright strike: channel removal in 12 hours",
              flag: true,
              why: "A short deadline makes you rush."
            },
            { role: "line", text: "A claim was made against one of your videos." },
            { role: "line", text: "Sign in below to see the claim and appeal." },
            {
              role: "button",
              text: "SIGN IN TO APPEAL",
              flag: true,
              why: "Real strikes show inside the app. This button leads to a fake login."
            }
          ]
        },
        why: "Wrong sender, panic deadline, sign-in button. Open YouTube yourself to check for any real strike."
      }
    ],
    rule: "Read the address. The padlock proves nothing about honesty.",
    sources: [
      {
        name: "FBI IC3 (2019): Cyber actors exploit \"secure\" websites in phishing",
        url: "https://www.ic3.gov/PSA/2019/PSA190610"
      },
      {
        name: "FTC: How to recognize and avoid phishing scams",
        url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
      }
    ]
  },
  {
    id: "c-already-clicked",
    icon: "😬",
    title: "I already clicked it",
    minutes: 4,
    learn: [
      {
        icon: "💜",
        title: "Breathe. Then move fast",
        text: "<b>You are not in trouble.</b> Everyone clicks something eventually. What counts is the next <b>ten minutes</b>. Here is what a thief does if you wait.",
        picture: {
          kind: "steps",
          items: [
            { icon: "🔓", text: "They log in with your password." },
            { icon: "✉️", text: "They change your recovery email." },
            { icon: "🔁", text: "They reset your other accounts from it." },
            { icon: "💬", text: "They message your friends as you." }
          ]
        }
      },
      {
        icon: "🔑",
        title: "Typed a password?",
        text: "Tell someone, then change the password <b>fast</b>, so the stolen one stops working. Then kick everyone out and lock the door.",
        picture: {
          kind: "checklist",
          color: "green",
          items: [
            { icon: "🗣️", text: "Tell a parent, or another adult you trust" },
            { icon: "🔁", text: "Change the password in the real app" },
            { icon: "🚪", text: "Sign out of other devices" },
            { icon: "🔐", text: "Turn on 2-step verification" },
            { icon: "🛟", text: "Check the recovery email and phone are yours" }
          ]
        }
      },
      {
        icon: "📦",
        title: "Ran a file? Different order",
        text: "A stealer may hold your <b>signed-in sessions</b>. Take that computer offline. From a <b>clean device</b>, sign out everywhere, then change passwords. Then get it cleaned."
      },
      {
        icon: "✉️",
        title: "Email first",
        text: "Whoever controls your <b>email</b> can reset everything else. The FTC says also check for <b>forwarding rules</b> you didn't set up.",
        keep: "Your email is the master key."
      },
      {
        icon: "💸",
        title: "Shared a code or money?",
        text: "Shared a code: change your password and sign out everywhere. Sent money: tell a parent, or another adult you trust, now. Call the bank or app, and report at <b>ReportFraud.ftc.gov.</b>"
      }
    ],
    quiz: [
      {
        type: "order",
        question: "You typed your email password into a fake page. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Change the password in the real app",
          "Sign out of other devices",
          "Turn on 2-step verification"
        ],
        why: "Tell someone first. A new password stops the stolen one working. Signing out kicks out anyone inside. Then lock the door."
      },
      {
        type: "order",
        question: "You ran a file that turned out to be a stealer. Put these in order.",
        steps: [
          "Tell a parent, or another adult you trust",
          "Take the infected computer off the internet",
          "On a clean device, sign out everywhere and change passwords",
          "Get the infected computer cleaned or reset"
        ],
        why: "A stealer can copy new passwords typed on that computer. Use a clean device, then clean the infected one before using it."
      },
      {
        type: "spot",
        question: "Your email was hacked. Tap the 3 signs the thief changed something.",
        picture: {
          kind: "site",
          parts: [
            { role: "address", text: "mail.postlark-mail.com/settings" },
            { role: "big", text: "Email settings" },
            {
              role: "line",
              text: "Forwarding: all mail to backup.k8x@mailbox-forward.net",
              flag: true,
              why: "A forwarding rule copies every reset email to the thief."
            },
            {
              role: "line",
              text: "Recovery phone: +1 (646) 555-0193, not yours",
              flag: true,
              why: "A new recovery number lets them take the account back later."
            },
            { role: "line", text: "Theme: dark" },
            {
              role: "line",
              text: "Sent today: 40 messages to your contacts",
              flag: true,
              why: "They are messaging your friends as you."
            },
            { role: "line", text: "Language: English" }
          ]
        },
        why: "Forwarding, a new recovery phone and sent messages. Remove them, then warn your contacts."
      },
      {
        type: "choice",
        question: "Which account should you secure first after a hack?",
        answers: [
          { text: "Your email", right: true },
          { text: "Your main game account" },
          { text: "The social app you use most" }
        ],
        why: "Your email can reset almost every other account. Lock it first."
      },
      {
        type: "choice",
        question: "You clicked a scam link. Should you delete the account to be safe?",
        answers: [
          { text: "No. Lock it down and tell someone instead", right: true },
          { text: "Yes, deleting it undoes the damage" },
          { text: "Yes, then make a new one" }
        ],
        why: "Deleting loses your stuff and doesn't undo what they saw. Securing it, with help, does more."
      }
    ],
    rule: "Clicked it? Tell someone, then lock it down fast.",
    sources: [
      {
        name: "FTC: How to recover your hacked email or social media account",
        url: "https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account"
      },
      {
        name: "FTC: Malware, how to protect against, detect and remove it",
        url: "https://consumer.ftc.gov/articles/how-recognize-remove-avoid-malware"
      }
    ]
  }
];
