# No.1544 — The X-Ray Rowhouse (elissa-blount-moorhead EM1, PP791)

Gallery date: 2006 · 04 · 04 (formula date; recorded here only, never drawn
in the piece).

## What it is

A dark field with a row of five flat house-outlines (simple rectangles with
pitched roofs, no doors, no windows drawn) across the lower two-thirds, under
a generous dark sky. Inside each outline, three small warm light-marks move:
an amber dot that drifts room to room, a short line that rocks like a chair,
and a tiny teal circle that pulses (the one cool light per house). The
outlines stay dark and empty except for these lights; no house is ever fully
lit or fully dark. One house at a time glows brighter, then dims as another
takes over.

Palette: night field near-black blue #0e1218; house outlines muted slate
#3a4350; light-marks warm amber #e8b04b, soft gold #c9a86a, pale cream
#e8e0d0; one cool light per house muted teal #5a7a72. No other color.

## Motion

Watch-first, inhabiting loop. The bright-house focus moves from house to
house in order on a seeded schedule: five durations in [20, 40] s
(21.150, 27.181, 29.758, 30.951, 31.566), summing to a 140.607 s loop that
repeats exactly. Focus crossfades over 1.5 s at each boundary. All other
motion runs on loop-local phase: the dot hops through four room anchors in
12 segments per loop (moving 70% of each segment, dwelling 30%), the rocking
line completes 24 tilt cycles per loop, the pulsing circle 36 pulse cycles
per loop — so t=LOOP equals t=0 exactly.

Dragging on a house brightens it while pressed (its lights move faster via
a 2x time warp, others dim to 0.3); releasing restores the schedule.
Dragging a light-mark moves it within its house (clamped to the rect
interior): line and pulse homes move to the release point, the dot glides
back to its schedule over 7 s. Drag never moves a light outside its house,
never lights all houses at once, never adds a house.

## Adaptations and readings

- Prompt's "re-randomized"/independent schedules are adapted to a seeded
  mulberry32 stream (seed 1544000) so every focus duration, room order and
  phase is reproducible and the loop closes exactly.
- Houses are stroked outlines only, never filled; light-marks are small
  glyphs, never furniture, people shapes, doors or windows.
- Fully silent; canvas 2D only; flat colors, no gradients; fading alphas
  rounded to 4 decimals; dots drawn as single arcs with their own
  beginPath; fixed-phase first frame; rAF loop as a plain function
  declaration; viewport from the Visual Viewport API with canvas pinned in
  draw(); phone detection via window.screen with aspect fallback.

## QA

- probe-1544.js: 22/22 pass (vm-isolated, real node-canvas, driving the
  piece's own rAF loop). Frame one identical across instances; loop
  closure byte-identical at t=LOOP and t=2*LOOP; exactly five houses in
  the lower two-thirds with varying heights; focus durations all in
  [20, 40] s with exactly one bright house at each segment midpoint; all
  marks inside their own house at every 2 s sample over the loop; every
  house's lit fraction in (0, 0.25) at every sample; house drag brightens
  only that house, speeds its dot (>1.5x control displacement) and
  restores on release; mark drag follows the pointer clamped inside the
  house, leaves other marks untouched, and glides back to schedule (matches
  control at +9 s).
- Desktop (1280x720) and mobile (390 wide) renders inspected personally:
  five outlined houses, varying heights, generous dark sky, marks inside
  outlines only, no clipping.
- Thumb byte-compare: two independent 720x720 renders byte-identical to
  the shipped thumb.
- Forbidden-API grep: 0 hits (Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage,
  gradients, fillText, strokeText).

## Fix rounds

- Probe-side correction only: the first brightness-restore check sampled
  t0+14, which lands inside the next segment's 1.5 s blend window; the
  probe now checks restore at segment 2's midpoint. No piece change.
