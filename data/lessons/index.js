/* ========================================================================
   lessons/index.js
   The list of every lesson file. There is one file per age group and
   world, named "age-world.js". For example "squad-gaming.js" holds the
   Gaming lessons for ages 10 to 13 (Squad).

   How to write a lesson: see FORMAT.md in this folder.

   In this file:
     the imports   every lesson file, by age group, then world
     ALL           the same lists, found by "age-world"
     lessonsFor    the lessons for one age group in one world
     findLesson    one lesson by its id
     pathFor       the whole path for an age group, world by world
   ======================================================================== */

import { LESSONS as explore_gaming } from "./explore-gaming.js";
import { LESSONS as explore_messages } from "./explore-messages.js";
import { LESSONS as explore_money } from "./explore-money.js";
import { LESSONS as explore_people } from "./explore-people.js";
import { LESSONS as explore_securing } from "./explore-securing.js";
import { LESSONS as explore_realfake } from "./explore-realfake.js";
import { LESSONS as explore_hooks } from "./explore-hooks.js";
import { LESSONS as squad_gaming } from "./squad-gaming.js";
import { LESSONS as squad_messages } from "./squad-messages.js";
import { LESSONS as squad_money } from "./squad-money.js";
import { LESSONS as squad_people } from "./squad-people.js";
import { LESSONS as squad_securing } from "./squad-securing.js";
import { LESSONS as squad_realfake } from "./squad-realfake.js";
import { LESSONS as squad_hooks } from "./squad-hooks.js";
import { LESSONS as crew_gaming } from "./crew-gaming.js";
import { LESSONS as crew_messages } from "./crew-messages.js";
import { LESSONS as crew_money } from "./crew-money.js";
import { LESSONS as crew_people } from "./crew-people.js";
import { LESSONS as crew_securing } from "./crew-securing.js";
import { LESSONS as crew_realfake } from "./crew-realfake.js";
import { LESSONS as crew_hooks } from "./crew-hooks.js";
import { CATEGORIES, categoryFor } from "../categories.js";

const ALL = {
  "explore-gaming": explore_gaming,
  "explore-messages": explore_messages,
  "explore-money": explore_money,
  "explore-people": explore_people,
  "explore-securing": explore_securing,
  "explore-realfake": explore_realfake,
  "explore-hooks": explore_hooks,
  "squad-gaming": squad_gaming,
  "squad-messages": squad_messages,
  "squad-money": squad_money,
  "squad-people": squad_people,
  "squad-securing": squad_securing,
  "squad-realfake": squad_realfake,
  "squad-hooks": squad_hooks,
  "crew-gaming": crew_gaming,
  "crew-messages": crew_messages,
  "crew-money": crew_money,
  "crew-people": crew_people,
  "crew-securing": crew_securing,
  "crew-realfake": crew_realfake,
  "crew-hooks": crew_hooks
};

// All the lessons for one age group in one world. Returns [] if none yet.
export function lessonsFor(ageId, categoryId) {
  return ALL[ageId + "-" + categoryId] || [];
}

// One lesson by its id. Returns undefined if it does not exist.
export function findLesson(ageId, categoryId, lessonId) {
  return lessonsFor(ageId, categoryId).find(lesson => lesson.id === lessonId);
}

/* The whole path for an age group: one "unit" per world, in the order of
   CATEGORIES, each with its lessons. Worlds with no lessons yet are still
   listed, so the path shows what is coming. */
export function pathFor(ageId) {
  return CATEGORIES.map(category => ({
    category: categoryFor(category, ageId),
    lessons: lessonsFor(ageId, category.id)
  }));
}
