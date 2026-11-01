# №1433 "The Grid Glows" (nikolaus-utermoehlen NU2, PP656)

A wall of quartered pictures — swords, armour, fragments of text about grief, love,
and happiness — cut into panels whose inner edges glow: fluorescent lines and
gold-leaf seams, so the crosses between sections are the brightest things on
screen, forming one continuous coordinate grid over the whole wall.

## Frame one

4 × 3 grid of parchment panels filling the frame on dark wall ground. Vertical
seams run the full height (fluorescent green, gold, rose); horizontal seams run
the full width (gold, rose); the six crossings are white-hot cores. Panel
pictures, seeded once: diagonal steel swords with guard and pommel, helmet-and-
breastplate armour, and single-word text fragments ("grief", "love",
"happiness") — fragments only, never sentences, never a readable message.
Pictures sit inside the grid, never over the seams. Mobile keeps the same
full-bleed composition with no clipping.

## Motion

Seamless loop. The seam glow breathes slowly (24 s sine on the halo alphas)
while the pictures inside stay still. A travelling signal — the ambient pulse —
spawns every 12 s at the top of vertical seam 1, runs down it, turns the corner,
and runs right along horizontal seam 2, completing the route in 12 s; the
segment is drawn as a bright stroke with a white head dot. The whole never
resolves: no panel explains the set, no message assembles.

## Interaction (touch/drag, never click-to-reload)

- Drag along a seam: injects a brighter pulse from the finger, travelling along
  that seam in the drag direction at 160 px/s and fading out over 8 s.
- Drag across a panel edge (perpendicular to a seam): widens or narrows that
  seam's glowing gutter (clamped −5 / +16 px around the 10 px base); the panel
  rects reflow around the new gutter widths.
- Both gestures are folded from recorded event lists each frame (closed-form
  over piece time and events, never frame-integrated state).

## Technical adaptations

- Panel grid with seam lines rendered as layered flat-alpha strokes (wide faint
  halo, mid veil, bright core) — no gradients, no shadowBlur, no offscreen
  canvas, no Path2D, no createElement, no AudioContext, no getUserMedia.
- Pulse as a travelling brightness parameter along seam polylines; ambient
  route computed from seam geometry; injected pulses from drag events.
- Fading alphas rounded to 4 decimals before stringifying; dots as filled
  rects or own-beginPath arcs (node-canvas quirks).
- Canvas sized from the Visual Viewport API, pinned in draw(); phone detection
  via window.screen physical size with aspect fallback; field-like composition
  goes full-bleed on phones.
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all randomness
  from seeded mulberry32 (seed 1433000 + index·7919), never Math.random.

## Verification

- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop, pointer
  events to its own listeners): two fresh instances byte-identical at t = 0;
  panel interior pixels identical t = 0 vs t = 10 and t = 0 vs t = 120
  (pictures stay still); ambient pulse head 0 → 90 white px at (640, 460) at
  t = 6 and 95 px on the horizontal leg at (807, 600) at t = 10 (turns the
  corner); seam drag injects a pulse (0 → 81 near-white px at the head,
  expired by t = 11); perpendicular drag widens the rose seam (200 → 800
  rose px in the same band).
- One probe-metric fix, not a piece fix: the first injected-pulse probe used a
  strict >245 all-channel white threshold, which missed heads composited over
  the green seam (blue ≈ 230); a near-white threshold confirmed the heads.
  No piece fix rounds needed.
