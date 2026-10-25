/* ========================================================================
   counter.js
   "Played on N devices". The only thing the game sends anywhere while a
   player is playing (the parents page also has a contact form for adults).

   The first time the game opens on a device, it asks the counter to add
   one. Then it keeps a note on the device, so it never counts twice.
   Nothing about the player is sent: no name, no score, no age group.
   It only runs on the real web address (see config.js), never in testing.

   In this file:
     startCounter   counts this device once, then shows the total in the footer
   ======================================================================== */

import { CONFIG } from "./config.js";

// The note kept in localStorage once this device has been counted.
const NOTE = "scamsquad-v2-counted";

/* ---------- The counter ---------- */

// Count this device if it is new, then show the number in the footer.
export function startCounter() {
  if (!CONFIG.counterUrl || !CONFIG.liveHosts.includes(location.hostname)) return;

  // Only count when the browser can keep the note. Otherwise every visit
  // would count again.
  let canKeepNote = false;
  let countedBefore = false;
  try {
    countedBefore = localStorage.getItem(NOTE) === "yes";
    localStorage.setItem(NOTE + "-test", "1");
    localStorage.removeItem(NOTE + "-test");
    canKeepNote = true;
  } catch (error) {
    // Storage is blocked: just look at the number, do not add to it.
  }

  // POST adds one and sends back the total. GET only looks.
  const method = canKeepNote && !countedBefore ? "POST" : "GET";
  fetch(CONFIG.counterUrl, { method: method })
    .then(response => response.json())
    .then(stats => {
      if (!stats || !stats.ok) return;
      if (stats.counted) {
        try {
          localStorage.setItem(NOTE, "yes");
        } catch (error) {
          // Could not keep the note. The count still went up once.
        }
      }
      const spot = document.getElementById("device-counter");
      if (spot) {
        spot.textContent = "Played on " + Number(stats.devices).toLocaleString() + " devices";
        spot.hidden = false;
      }
    })
    .catch(() => {
      // No internet, or the counter is blocked: the game carries on without it.
    });
}
