# №1400 "Quasi-Closed Captions" (alison-odaniel AO1, PP623)

## What it is

Sound made into objects. Five rough plywood frames dangle from the top of the
frame on delicate steel chains, each holding a kaleidoscopic window of shifting
flat color. Two necklace chains droop like wind chimes that never chime,
casting spider-web shadows, with teal and magenta beads hanging from the droop.
Two steel hoops float as quiet portals. Long flat-alpha shadows fall
down-right across a quiet paper ground. Nothing sits on a baseline: everything
dangles, sways, or floats.

Palette, verbatim from the prompt: plywood raw #b08a5e, chain steel #8a8f94,
kaleidoscope teal #2e8f86, kaleidoscope magenta #c23b6e, shadow gray #4a4a44,
paper #e4dfd2.

## Motion and interaction

- Each frame sways on its chain at its own seeded period (5.5–9 s) as a
  closed-form pendulum function of piece time; the chains never tangle and the
  motion never stops.
- Kaleidoscope windows rotate their flat color fields slowly (seeded rate and
  direction per frame); an inner pale ring echoes each window's center.
- Shadows are offset flat-alpha projections from a fixed light angle and swing
  with their frames.
- Dragging a frame sets it swinging: while held, the drag displacement becomes
  a pendulum angle; on release it becomes a decaying swing impulse
  (tau 2.5 s, capped at 8 stored impulses). No buttons, never click-to-reload.
- No audio at all: the prompt requires none ("no audio required — the piece
  is the sound's replacement"). No AudioContext, no getUserMedia anywhere.

## Study-wide rules honored

- Captions are material objects, never subtitle strips: there is no text on
  screen at all except `<title>`. No fillText/strokeText anywhere.
- Sound is felt or seen, never merely heard: the piece is the sound's
  replacement, fully visual.
- Nothing here frames d/Deaf experience as deficit or as something to
  simulate: the piece is about sound made tangible as objects, not about
  imitating hearing or deafness.

## Adaptations from the prompt

- Chains are catenary-style link curves with closed-form sway offsets, not
  physics simulation; sway is a closed-form pendulum function plus decaying
  recorded drag impulses, never frame-integrated state.
- Kaleidoscope windows are seeded rotating flat color wedges, never gradients
  (the QA renderer handles gradients unreliably).
- Shadows are flat-alpha rects/discs from a fixed light angle, not
  shadowBlur (which the QA renderer does not provide).
- No offscreen canvas, no Path2D, no createElement, no gradients, no
  shadowBlur. Dots are filled rects; every arc has its own beginPath.
- Fading alphas are rounded to 4 decimals before stringifying (node-canvas
  misparses scientific-notation alphas like 2.5e-15 as opaque).
- Frame height derives from frame width (fixed 1.1 aspect) so portrait phones
  keep desktop proportions instead of stretching tall; this was a fix round
  after the first mobile render showed tall narrow frames.
- Canvas size comes from the Visual Viewport API with resize listeners on
  visualViewport and window, and the canvas is pinned in draw() with
  style.width/height in px. Phone detection uses window.screen physical size
  (min dimension < 700 px) with aspect h > w*1.15 as fallback only.

## Determinism

Synchronous first frame at a constant phase via a boot flag
(frame one = draw(0), clock starts only with the rAF loop). All randomness
from a seeded mulberry32 PRNG (seed 1400000), never Math.random. The rAF loop
is a plain function declaration behind a typeof guard.

## Verification

Rendered with node ~/workspace/tools/render-piece.js at 1280x900, 390x844,
and 720x720; all three inspected. Thumb byte-identical across repeated
renders, including a final re-verify after process.md was written.

Forced-time probe harness (vm-isolated instances, stubbed rAF driving the
piece's own loop, pointer events to its own listeners, 1280x900):

- t=0 vs t=2 differ in 207,701 px (sway + kaleidoscope rotation move).
- Teal pixels in frame 0's window change 4,016 -> 4,318 from t=0 to t=2
  (kaleidoscope fields rotate).
- A 120 px drag on frame 0 (plywood centroid 127,260) moves its centroid to
  214,272 at t=1; dragged vs undragged frames differ in 55,511 px at t=1
  (frame + shadow move together).
- Dragged vs undragged at t=12 differ in only 3,076 px (swing impulse
  decayed, tau 2.5 s).
- Shadow-zone pixel counts differ between dragged (20,201) and undragged
  (22,483) at t=1, confirming shadows track their frames.
- Token scan clean except one comment stating Math.random is never used:
  no fillText/strokeText, gradients, Path2D, createElement, AudioContext,
  getUserMedia, shadowBlur, or offscreen canvas.

Fix rounds (1): frame height first scaled with viewport height, which made
mobile frames tall and narrow; height now derives from width at a fixed 1.1
aspect. All renders re-done after the fix.
