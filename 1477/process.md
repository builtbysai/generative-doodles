# №1477 "The Archive of Eight Hundred Tapes" (carole-roussopoulos CR6, PP724)

## Prompt
A wall of archive shelves holding rows of tape spines, each spine a flat
rectangle in one of a few muted colors, some with a thin gold stripe. One
shelf at a time is lit; the rest sit in soft shadow. Tapping a spine pulls it
out slightly and its scene plays in a small monitor frame at the wall's
center: a room, a crowd, or a monitor wall, in miniature.

## Build
- Self-contained `index.html`, no external assets, fully silent
  (no AudioContext at all).
- Shelves: a 10 x 5 grid of spines on wood boards, drawn against a charcoal
  wall. Spine colours and gold-stripe flags come from one mulberry32 stream
  (seed 1477000), fixed at load, never Math.random.
- Lit shelf: the lit-row index is `floor(t / 6) % 5`, advancing down the wall
  on its own and cycling. Unlit rows sit under a flat charcoal overlay at
  alpha 0.35; the lit shelf is marked by a thin gold underline.
- Monitor: centred, gold-bordered charcoal frame, about a third of the
  frame, drawn above the grid. Idle state is a charcoal screen with a small
  gold dot pulsing on a 2 s sine (alpha rounded to 4 decimals).
- Tap-to-pull: taps are recorded in an event list and replayed closed-form
  (tapping a spine pulls it, tapping the pulled spine pushes it back,
  tapping another swaps). The pulled spine draws shifted 14 px out of its
  slot, above the shadow, and its miniature scene plays in the monitor:
  spine index % 3 picks room / crowd / monitor wall. Taps on the monitor
  itself, or on a spine hidden behind it, are ignored. Tap never removes a
  tape, never empties a shelf, never restarts the wall.
- Miniatures are closed-form functions of piece time: room (12 s speaker
  cycle, 4 s per speaker, gold zigzag voice-line), crowd (7 figures nodding
  on staggered slow sines), monitor wall (3 screens cycling cream / grey /
  purple every 2 s, blocks flickering every 0.5 s).
- No visible text besides `<title>`; no text labels on spines, no search
  box, no catalog UI, no photorealism. No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
  Fading alphas are literal fixed decimals; dots are own-beginPath arcs
  (node-canvas quirks).
- Determinism: frame one = draw(0) via a boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard), so the
  QA renderer paints exactly frame one.

## QA
- Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
  byte-identical across repeated renders (final re-verify after all edits).
- Forced-time probe harness (`tmp/probe1477.js`, vm-isolated instance,
  real node-canvas, piece driven via `window.__piece`): t = 0 redraw 0 px;
  litRow 0/1/0 at t = 0/6/30 (6 s timer, 5-row cycle); tap on spine 0 pulls
  it (monitor scene appears, 165,985 px frame diff); second tap on spine 0
  pushes it back (0 px diff vs idle — exact return); tap on spine 20 pulls
  it (scene 2, monitor wall, 90,062 px diff); taps on the monitor and on
  the monitor-occluded spine 25 are ignored (pulled stays 20); spine
  colours present across lit rows (purple appears in lit rows 1, 3, 4; row
  2's 10 spines happen to hold none, which is why it reads 0 px at t = 0).
- Desktop frame one: lit top shelf with gold underline, four shadowed
  shelves below, gold-striped spines, centred gold-bordered monitor with
  the idle gold dot. Mobile: same full-bleed composition, no clipping.

## Adaptations
- The prompt's "wall" is the charcoal shadow colour, so the lit shelf reads
  against it; shelf boards are wood bands under each spine row.
- Monitor-screen tints use only prompt-palette tones (cream, grey, purple);
  no extra colour was introduced for the screen cycle.
- Pulled spine shifts upward out of its slot (toward the viewer) rather
  than scaling, so it never clips a neighbour row.

## Fix rounds
None needed. One probe correction during QA only: the first probe tapped
spine 25, which sits behind the monitor and is correctly ignored; the
probe was moved to the visible spine 20. No piece code changed.
