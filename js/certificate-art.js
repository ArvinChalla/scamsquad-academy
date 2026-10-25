/* ========================================================================
   certificate-art.js
   The pictures on the certificate, first made for version 1 of the game,
   where the certificate looked its best. Everything is drawn in this
   browser. Nothing is sent anywhere.

   In this file:
     buddyPicture            Pip, Byte and Shield drawn as small pictures (SVG)
     drawCertificatePicture  draws the certificate as a PNG picture to save
   ======================================================================== */

/* ---------- The buddies ---------- */

/* The three buddies, drawn with SVG (shapes written as code) so there are
   no picture files. Pip the owl is 6 to 9, Byte the robot is 10 to 13, and
   Shield is 14 to 18. "size" is the width and height in pixels. */
export function buddyPicture(group, size) {
  const s = size || 76;
  const start = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 100 100" role="img" aria-label="';
  if (group === "explore") {
    return start + 'Pip the owl">'
      + '<circle cx="50" cy="54" r="36" fill="#FFC96B"/>'
      + '<path d="M18 40c0-14 8-24 14-24s10 6 10 6" fill="#FFC96B"/>'
      + '<path d="M82 40c0-14-8-24-14-24s-10 6-10 6" fill="#FFC96B"/>'
      + '<ellipse cx="50" cy="66" rx="20" ry="17" fill="#FFF0D2"/>'
      + '<circle cx="38" cy="47" r="12" fill="#fff"/><circle cx="62" cy="47" r="12" fill="#fff"/>'
      + '<circle cx="39" cy="48" r="6" fill="#2A2140"/><circle cx="61" cy="48" r="6" fill="#2A2140"/>'
      + '<circle cx="41" cy="46" r="2.2" fill="#fff"/><circle cx="63" cy="46" r="2.2" fill="#fff"/>'
      + '<path d="M50 57.5 45 62h10l-5-4.5Z" fill="#E07C00"/>'
      + '<circle cx="24" cy="62" r="5.5" fill="#FF9E9E" opacity=".75"/>'
      + '<circle cx="76" cy="62" r="5.5" fill="#FF9E9E" opacity=".75"/>'
      + "</svg>";
  }
  if (group === "squad") {
    return start + 'Byte the robot">'
      + '<rect x="46.5" y="12" width="7" height="12" rx="3.5" fill="#0E7F94"/><circle cx="50" cy="11" r="6" fill="#5EE0F0"/>'
      + '<rect x="17" y="26" width="66" height="52" rx="18" fill="#2AA6BC"/>'
      + '<rect x="25" y="36" width="50" height="28" rx="13" fill="#08222B"/>'
      + '<circle cx="39" cy="50" r="6.5" fill="#5EE0F0"/><circle cx="61" cy="50" r="6.5" fill="#5EE0F0"/>'
      + '<circle cx="41" cy="48" r="2" fill="#fff"/><circle cx="63" cy="48" r="2" fill="#fff"/>'
      + '<path d="M42 68h16" stroke="#0B4E5C" stroke-width="4" stroke-linecap="round"/>'
      + '<rect x="8" y="42" width="8" height="20" rx="4" fill="#0E7F94"/>'
      + '<rect x="84" y="42" width="8" height="20" rx="4" fill="#0E7F94"/>'
      + '<rect x="34" y="80" width="32" height="8" rx="4" fill="#0E7F94"/>'
      + "</svg>";
  }
  return start + 'Shield, the online guide">'
    + '<path d="M50 8 84 22v28c0 20-14 34-34 42-20-8-34-22-34-42V22L50 8Z" fill="#7C5CE8"/>'
    + '<path d="M50 18 74 28v22c0 15-10 26-24 32-14-6-24-17-24-32V28l24-10Z" fill="#5A3FD0"/>'
    + '<circle cx="41" cy="46" r="5.5" fill="#D9CEFF"/><circle cx="59" cy="46" r="5.5" fill="#D9CEFF"/>'
    + '<circle cx="42.5" cy="44.5" r="1.8" fill="#2A1E52"/><circle cx="60.5" cy="44.5" r="1.8" fill="#2A1E52"/>'
    + '<path d="M42 60c4 4 12 4 16 0" stroke="#D9CEFF" stroke-width="3.4" stroke-linecap="round" fill="none"/>'
    + '<path d="m50 26 2.6 5.6L58 34l-5.4 2.4L50 42l-2.6-5.6L42 34l5.4-2.4L50 26Z" fill="#FFD98A"/>'
    + "</svg>";
}

/* ---------- The certificate as a picture ---------- */

/* Draws the certificate onto a canvas (a blank picture) so it can be saved
   as a PNG. The canvas is drawn twice as big, so it looks sharp.
   "c" holds the words: title, opening, name, line, badges, buddy,
   buddyJob, date, best and points (see screens/certificate.js).
   Returns the picture as a data address, or null if the browser refuses. */
export function drawCertificatePicture(c) {
  const W = 1100;
  const H = 790;
  const SHARPNESS = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * SHARPNESS;
  canvas.height = H * SHARPNESS;
  const pen = canvas.getContext("2d");
  pen.scale(SHARPNESS, SHARPNESS);
  const titleFont = '"Fredoka", "Trebuchet MS", sans-serif';
  const textFont = '"Nunito", "Segoe UI", sans-serif';

  // Splits text into lines that fit inside maxWidth.
  function linesThatFit(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach(word => {
      const test = line ? line + " " + word : word;
      if (pen.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  // The outline of a box with round corners of radius r, ready to stroke.
  function roundedBox(x, y, w, h, r) {
    pen.beginPath();
    pen.moveTo(x + r, y);
    pen.lineTo(x + w - r, y);
    pen.quadraticCurveTo(x + w, y, x + w, y + r);
    pen.lineTo(x + w, y + h - r);
    pen.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    pen.lineTo(x + r, y + h);
    pen.quadraticCurveTo(x, y + h, x, y + h - r);
    pen.lineTo(x, y + r);
    pen.quadraticCurveTo(x, y, x + r, y);
    pen.closePath();
  }

  // A straight line, 3 pixels wide.
  function line(x1, y1, x2, y2, color) {
    pen.strokeStyle = color;
    pen.lineWidth = 3;
    pen.beginPath();
    pen.moveTo(x1, y1);
    pen.lineTo(x2, y2);
    pen.stroke();
  }

  // Paper, gold border and dashed inner border.
  pen.fillStyle = "#FFFDF7";
  pen.fillRect(0, 0, W, H);
  pen.strokeStyle = "#C9A227";
  pen.lineWidth = 8;
  roundedBox(14, 14, W - 28, H - 28, 22);
  pen.stroke();
  pen.strokeStyle = "#E0CE8E";
  pen.lineWidth = 3;
  pen.setLineDash([9, 9]);
  roundedBox(44, 44, W - 88, H - 88, 14);
  pen.stroke();
  pen.setLineDash([]);

  // Words, top to bottom.
  pen.textAlign = "center";
  pen.fillStyle = "#9A7B12";
  pen.font = "600 19px " + titleFont;
  pen.fillText("S C A M S Q U A D   A C A D E M Y", W / 2, 118);
  pen.fillStyle = "#221E38";
  pen.font = "700 44px " + titleFont;
  pen.fillText(c.title, W / 2, 180);
  pen.fillStyle = "#4A4560";
  pen.font = "400 23px " + textFont;
  pen.fillText(c.opening, W / 2, 240);

  // The name, made smaller if it is too long to fit.
  let size = 66;
  pen.fillStyle = "#3A2FBE";
  pen.font = "700 " + size + "px " + titleFont;
  while (pen.measureText(c.name).width > W - 220 && size > 30) {
    size -= 3;
    pen.font = "700 " + size + "px " + titleFont;
  }
  pen.fillText(c.name, W / 2, 322);
  line(W / 2 - 160, 360, W / 2 + 160, 360, "#E0CE8E");

  pen.fillStyle = "#4A4560";
  pen.font = "400 23px " + textFont;
  linesThatFit(c.line, W - 300).forEach((text, i) => {
    pen.fillText(text, W / 2, 408 + i * 34);
  });
  if (c.badges) {
    pen.fillStyle = "#221E38";
    pen.font = "600 21px " + textFont;
    linesThatFit("Badges earned: " + c.badges, W - 280).forEach((text, i) => {
      pen.fillText(text, W / 2, 500 + i * 30);
    });
  }
  line(90, 630, W - 90, 630, "#EFE4C0");

  // Bottom row: buddy on the left, date on the right. Each is [big words, small words, x].
  pen.textAlign = "left";
  const bottomRow = [
    [c.buddy, c.buddyJob, 100],
    [c.date, "Date completed", W - 330]
  ];
  bottomRow.forEach(column => {
    pen.fillStyle = "#221E38";
    pen.font = "600 25px " + titleFont;
    pen.fillText(column[0], column[2], 674);
    pen.fillStyle = "#6A6480";
    pen.font = "400 17px " + textFont;
    pen.fillText(column[1], column[2], 702);
  });

  // Gold medal with the score, in the middle of the bottom row.
  const mx = W / 2;
  const my = 668;

  // Two red ribbons, tilted out to the left and the right.
  pen.fillStyle = "#A6252B";
  [-1, 1].forEach(side => {
    pen.save();
    pen.translate(mx + side * 20, my + 26);
    pen.rotate(side * 0.25);
    pen.beginPath();
    pen.moveTo(-12, 0);
    pen.lineTo(12, 0);
    pen.lineTo(12, 40);
    pen.lineTo(0, 31);
    pen.lineTo(-12, 40);
    pen.closePath();
    pen.fill();
    pen.restore();
  });

  // The bumpy gold edge: 56 points around a circle, in and out by turns.
  pen.beginPath();
  for (let q = 0; q <= 56; q++) {
    const angle = q / 56 * Math.PI * 2;
    const radius = q % 2 ? 44 : 49;
    pen.lineTo(mx + Math.cos(angle) * radius, my + Math.sin(angle) * radius);
  }
  pen.closePath();
  pen.fillStyle = "#C9962A";
  pen.fill();

  // The shiny middle of the medal.
  const shine = pen.createRadialGradient(mx - 12, my - 14, 4, mx, my, 38);
  shine.addColorStop(0, "#FFF3B8");
  shine.addColorStop(0.45, "#E2B23C");
  shine.addColorStop(1, "#B5841F");
  pen.beginPath();
  pen.arc(mx, my, 37, 0, Math.PI * 2);
  pen.fillStyle = shine;
  pen.fill();

  // A star, the best score, and the word for points.
  pen.textAlign = "center";
  pen.fillStyle = "#6B4A0C";
  pen.font = "16px " + textFont;
  pen.fillText("★", mx, my - 12);
  pen.font = "700 19px " + titleFont;
  pen.fillText(String(c.best), mx, my + 8);
  pen.font = "700 10px " + textFont;
  pen.fillText(String(c.points).toUpperCase(), mx, my + 22);

  // A browser can refuse to turn a canvas into a picture. Then there is nothing to save.
  try {
    return canvas.toDataURL("image/png");
  } catch (error) {
    return null;
  }
}
