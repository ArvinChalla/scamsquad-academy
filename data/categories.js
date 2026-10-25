/* ========================================================================
   categories.js
   The seven worlds of the game, in path order. Every lesson belongs to
   one of them.

   id       used in web addresses and as the color name in base.css
   icon     the big picture on the card
   name     the title
   rule     the one thing to remember for this whole world
   explore, squad, crew   (optional) a different name or rule for one age
            group. For ages 6 to 9 it uses words a 6 year old knows.
            categoryFor() picks the right one.

   In this file:
     CATEGORIES     the seven worlds
     findCategory   finds one world by its id
     categoryFor    a world as one age group sees it
   ======================================================================== */

export const CATEGORIES = [
  {
    id: "gaming",
    icon: "🎮",
    name: "Gaming",
    rule: "Nothing free comes from outside the game.",
    crew: { rule: "Never run a file or command a stranger sends." },
    explore: { rule: "FREE and HURRY? Stop. Get your grown-up." }
  },
  {
    id: "messages",
    icon: "💬",
    name: "Messages and calls",
    rule: "Hang up. Look it up. Call back.",
    explore: { name: "Messages", rule: "New number or a prize? Show your grown-up." },
    squad: { rule: "Got a strange ask? Check another way first." }
  },
  {
    id: "money",
    icon: "💸",
    name: "Money and shopping",
    rule: "Real deals are never in a hurry."
  },
  {
    id: "people",
    icon: "🫂",
    name: "People and feelings",
    rule: "A secret from your family is the warning sign.",
    crew: { name: "People and pressure", rule: "Pressure to keep it secret is the warning sign." }
  },
  {
    id: "securing",
    icon: "🔒",
    name: "Securing your account",
    rule: "Your password and codes are only for you.",
    explore: { name: "Keep your game safe", rule: "Your password is for you and your grown-up." },
    crew: { name: "Account security" }
  },
  {
    id: "realfake",
    icon: "🔍",
    name: "Real or fake?",
    rule: "Seen it? Check it somewhere else.",
    explore: { rule: "Not sure it is real? Ask your grown-up." }
  },
  {
    id: "hooks",
    icon: "🪝",
    name: "Apps that hook you",
    rule: "The timer is the trick.",
    explore: { name: "Games that keep you playing", rule: "You can always stop. Stopping is OK." }
  }
];

export function findCategory(id) {
  return CATEGORIES.find(category => category.id === id);
}

// A world as one age group sees it: the same world, with that age group's
// own name or rule swapped in when it has one (explore, squad or crew).
export function categoryFor(category, ageId) {
  const own = category && category[ageId];
  return own ? Object.assign({}, category, own) : category;
}
