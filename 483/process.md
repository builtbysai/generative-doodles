# №1559 The Flock's Wake

kiyoshinakauchi JK8, PP806, cron expansion study #205. Gallery date: 2006 · 04 · 19.
This piece COMPLETES EXPANSION #205.

## Palette

- Ground light grey #EFEFEF; dashes near-black #1a1a1a; nothing else.
- 320 short dashes, length 7-13 px, lineWidth 1.4-2.2 px, round caps.

## Composition

Full-bleed field, no borders. 320 boids on a jittered 20x16 grid so the flock
covers the whole frame at every size; homes inset to 4%-96% of the frame.
No visible text except the page title. The mover is never drawn.

## Motion

Watch-first parting loop. Each boid's position is a closed-form function of
piece time: seeded home + its stream group's slow Lissajous drift (5 groups,
periods 40-115 s, amplitudes 0.06-0.12 of frame width) + a small per-boid bob
(perpendicular and along-track sines, 5-14 s periods). A per-boid time offset
of up to +/-4 s inside the group breaks lockstep without breaking the shared
stream direction. Dash orientation comes from a finite difference of the final
position, so dashes align with their velocity and tilt around the mover.

The mover is an invisible point on a closed-form noise path: three layered
sines per axis (periods 47/83/131 s in x, 59/97/149 s in y), wandering the
central 16%-84% of the frame, never shown. Boids within R = max(70 px,
0.11 * minDim) of the mover are pushed radially out to exactly R, leaving a
clean empty wake that fills in behind as the mover wanders on, since the push
is a function of the mover's current position only. A soft pull inside a
48 px edge margin keeps every boid in frame; no hard clamp, no trails.

## Interaction

Dragging takes the mover: pointerdown starts a press, pointermove records
samples, and while pressed the mover eases toward the latest pointer position
(tau 0.5 s), so the flock parts around the finger. On release the mover eases
back to its wander path (tau 2.0 s) and the flock refills behind it. Drag
never scatters the flock permanently, never shows the mover, never adds boids.
No click-to-reload, no sound: fully silent, no AudioContext anywhere.

## Determinism

All layout randomness from mulberry32(1559000); no Math.random, no wall
clock, no per-frame randomness. Boid state, mover path, and wake are pure
functions of piece time plus the recorded drag-event list, so the same
timestamp always renders the same frame. Fixed-phase first frame; one
synchronous frame drawn at load; requestAnimationFrame calls typeof-guarded.

## Probes (node probe-1559.js, stubbed rAF driving the piece's own loop)

- Frame-one determinism: two fresh 1280x900 renders byte-identical
  (md5 04efcff675e0afe1af8a0f1d49ecd155); thumb re-rendered three times,
  all md5 d76f51fbfbf768b1aef9f6caa0c68956.
- t=0 vs t=20 differ; t=20 vs t=40 differ; mover wandered from (844,347)
  at t=0 to (378,596) at t=20.
- Wake: 0 dark pixels inside a 0.6R disc around the mover at t=0 and t=20
  (3 antialiased dash-tip pixels inside 0.7R at t=20, the rest 0); annulus
  1.2R-1.8R holds 297-369 dark pixels, so the rim is populated; 0 dark
  pixels within 4 px of the mover itself, the mover is never drawn.
- Drag: pointerdown at (300,600), move to (500,650), at t=6 the mover sits
  at (541,616), 54 px from the pointer, with a 0-dark-pixel wake at the
  pointer. After release, at t=16 the mover is 2.2 px from the undisturbed
  wander position and the dragged frame differs from the clean frame in
  only 538 of 1,152,000 pixels: the parting fully settles and the flock
  refills.
- All 16 probe checks passed on the final build.

## Render inspection

- Desktop 1280x900: even scatter of dashes across the whole field, wake
  visible as a clean empty patch around (844,347) with a denser rim.
- Mobile 390x844: same full-bleed composition, no clipping, wake visible
  upper-center.
- Thumb 720x720: same composition; wake visible as the empty patch around
  (475,277).
- t=20 and t=40 renders inspected: field stays evenly scattered, flock has
  moved, wake has traveled with the mover; drag render inspected: a clean
  empty hole sits exactly at the pointer.
- Forbidden-token grep clean: no AudioContext, gradients, shadowBlur,
  Path2D, createElement, localStorage, getUserMedia, fillText/strokeText,
  Math.random, Date, or em dashes.

## Fix rounds

Two, both in the first build's motion model:

1. First build put each boid on its stream group's Lissajous path with a
   +/-9 s lag: the flock clumped into 4 isolated clusters, most of the
   field empty. Reworked to seeded grid homes plus shared group drift.
2. Second build assigned groups by column (group = boid index mod 5, and
   the index runs row-major, so group = column mod 5): the field separated
   into vertical bands with empty gaps by t=40, and hard edge clamping
   stacked boids into full-height lines at the left and right edges.
   Fixed with seeded random group assignment, per-boid +/-4 s drift
   offsets, inset homes, and a soft 48 px edge pull replacing the clamp.
   Third render is even at t=0, t=20, and t=40.

## Gallery note

A light-grey field scattered with hundreds of short black dash-marks, a
boids flock in top view. A slow invisible mover wanders the field and the
flock parts around it, leaving a clean empty wake that fills in behind.
Drag to take the mover: the flock parts around your finger.
