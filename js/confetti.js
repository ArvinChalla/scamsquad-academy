/* ========================================================================
   confetti.js
   A short shower of confetti for the results screen. Skipped when the
   device asks for less movement (a setting some people need, because
   moving things on screen can make them feel unwell).

   In this file:
     COLORS     the confetti colors
     confetti   drops 90 pieces, then tidies them away
   ======================================================================== */

const COLORS = ["#F7C948", "#7BC8F6", "#F49AC4", "#8EDB9F", "#B9A0FF", "#F7A877"];
const PIECES = 90;

/* ---------- Confetti ---------- */

/* Each piece is a small <i> with its own place, color, start time, speed
   and tilt, so they do not all fall together. The falling itself is a CSS
   animation on .confetti i (see styles/app.css). */
export function confetti() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const box = document.createElement("div");
  box.className = "confetti";
  box.setAttribute("aria-hidden", "true");
  for (let i = 0; i < PIECES; i++) {
    const piece = document.createElement("i");
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.animationDelay = (Math.random() * 0.6) + "s";
    piece.style.animationDuration = (1.8 + Math.random() * 1.4) + "s";
    piece.style.transform = "rotate(" + Math.round(Math.random() * 360) + "deg)";
    box.appendChild(piece);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3800);   // tidy up when it has all fallen
}
