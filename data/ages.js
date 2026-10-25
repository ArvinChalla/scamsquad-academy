/* ========================================================================
   ages.js
   The three age groups. Each one has its own buddy, color and words.
   "words" holds the small bits of text that change by age, so 6 year
   olds get cheering and teens get plain, direct words.
   "id" is used in the web address, like #/age/squad.

   In this file:
     AGES      the three age groups, youngest first
     findAge   finds one age group by its id
   ======================================================================== */

export const AGES = [
  {
    id: "explore",
    range: "6 to 9",
    short: "6-9",
    name: "Explorers",
    face: "🦉",
    buddy: "Pip",
    hello: "Hi! I'm Pip. Let's beat the tricksters together!",
    intro: "Tricksters try to fool kids online. I'll show you their tricks, one at a time. Ready?",
    ready: "I'm ready to beat the tricksters!",   // the button on the hello screen
    next: "🦉 Start here!",                        // the label over the next lesson
    coin: { icon: "🪙", name: "coins" },
    words: { right: "🎉 Yay! Right!", wrong: "Not quite.", perfect: "Perfect! Pip is so proud.", some: "Good try! Let's practice the ones you missed.", low: "These are tricky. Let's try them again!", worlds: "Pick a world", confetti: true },
    news: false            // ages 6 to 9 get a Tip of the week, not news
  },
  {
    id: "squad",
    range: "10 to 13",
    short: "10-13",
    name: "Squad",
    face: "🤖",
    buddy: "Byte",
    hello: "I'm Byte, your scam scanner. Pick a world to explore.",
    intro: "I'm your scam scanner. We'll start with games, then texts, money and more. One step at a time.",
    ready: "I'm ready to spot the scams!",
    next: "🤖 Start here!",
    coin: { icon: "🪙", name: "coins" },
    words: { right: "🎉 Right!", wrong: "Not quite.", perfect: "Perfect! Every one right.", some: "Good work. Practice the ones you missed to lock them in.", low: "These are tricky. Practice them and they will stick.", worlds: "Pick a world", confetti: true },
    news: true
  },
  {
    id: "crew",
    range: "14 to 18",
    short: "14-18",
    name: "Crew",
    face: "🛡️",
    buddy: "Shield",
    hello: "Real scams, real tricks, real fixes. Pick a topic.",
    intro: "Real scams teens face, how they work, and what to do. Short lessons, then a quick check.",
    ready: "Start",
    next: "Next up",
    // Teens get plain words, no confetti and no buddy speech bubble.
    coin: { icon: "⚡", name: "XP" },
    words: { right: "Correct.", wrong: "Not quite.", perfect: "All correct.", some: "Review the ones you missed.", low: "Tough set. Run the missed ones again.", worlds: "Topics", confetti: false, plainHello: true },
    news: true
  }
];

// Find one age group by its id. Returns undefined if there is no match.
export function findAge(id) {
  return AGES.find(age => age.id === id);
}
