# №452 Mucha Siren — process.md

## Concept
An art-nouveau festival poster: a tall arched frame, a slowly rotating
violet-and-cream sunburst medallion, a siren in a draped peach gown holding a
stylized electric guitar instead of a lyre, orange-rose florals in the bottom
corners, and a tall hand-lettered title arched over the top. The hair is the
motion system: ten ribbons flowing across the full poster width, each
displaced by three summed sine waves.

## Construction
- Poster 3:4, centered: the poster keeps its shape on phones and the page
  ground takes the arch ground tan. Title occupies the top 18%, florals sit
  in the two bottom corners.
- Fixed authored tables, index 0 at load: hair color [cobalt, crimson];
  gown fold layouts (three fixed sets); title words [STAGE, AMPLIFY,
  ENCORE, RESONANCE] in order, load word STAGE. Tap advances one step
  (tap index modulo 12, the LCM of the three cycles, so the load state
  recurs exactly); never reloads. Title letters are drawn individually,
  manually spaced along a shallow arch, in a tall condensed font.
- Hair ribbons are filled bezier-style paths sampled at 21 points per
  ribbon, each point displaced by three sines (fixed frequencies,
  amplitudes, phases per ribbon). Petals detach and drift on a fixed cycle.
  First frame is drawn synchronously at a fixed phase (1.5s); the rAF loop
  is anchored to that phase and guarded by a typeof check.
- Standing rules kept: Visual Viewport sizing with listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; no offscreen canvas, no document.createElement; the
  title is the only designed lettering, from the fixed table.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Thumb 720x720 rendered twice: md5 dd97237fe8b3062ddf850923f91c901d
  both runs, byte-identical (determinism gate PASS).
- Desktop 1280x900 inspected: arched double frame, STAGE title in yellow
  over the sunburst, cobalt ribbon hair flowing edge to edge, gown with
  fold lines, stylized guitar, corner roses, drifting petals. Mobile
  390x844 inspected: poster keeps its 3:4 shape centered, page ground tan,
  all elements present.
- No fixes needed.
