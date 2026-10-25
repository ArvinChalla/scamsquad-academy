/* ========================================================================
   config.js
   Settings that change when the game moves to its real web address.
   counter.js and contact.js read them. Nothing else in the game does.

   In this file, one object, CONFIG:
     counterUrl        the Cloudflare Worker that counts devices (one number,
                       nothing else). v1 and v2 count together under "devices".
                       The new domain must be added to the Worker's
                       ALLOWED_ORIGINS before it will answer.
     liveHosts         the web addresses where the game counts devices. Testing
                       on this computer is not in the list, so it never adds
                       to the count.
     contactUrl        the same Worker's /contact address, for the form on the
                       parents page. Messages are saved and emailed to Div.
     turnstileSiteKey  the public key of the Cloudflare "I am not a robot"
                       check. The new domain must be added to that widget too.
   ======================================================================== */

export const CONFIG = {
  counterUrl: "https://scamsquad.cdr0314.workers.dev/stats",
  liveHosts: ["scamsquad.app", "www.scamsquad.app"],
  contactUrl: "https://scamsquad.cdr0314.workers.dev/contact",
  turnstileSiteKey: "0x4AAAAAAFPlfPolpbQGbHeS"
};
