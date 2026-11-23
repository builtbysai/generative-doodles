# №1484 "The Shelf Is the Work" (ioana-wieder IW5, PP731)

A wall of archive shelves holding rows of tape spines, each a flat rectangle
in a muted color, some with a thin gold stripe. One shelf at a time is lit;
the rest sit in soft shadow. Tapping a spine pulls it out slightly and its
scene plays in a small monitor frame at the wall's center; tapping again
pushes it back and restores the wall exactly.

## Frame one

Charcoal wall; five shelves in a grid of 10 spines each, in muted blue,
brown, dark green, purple, and cream, some with a thin gold stripe, standing
on wood boards. The top shelf is lit, marked by a thin gold underline; the
four lower shelves sit in soft shadow. The centered gold-bordered monitor
frame (about a third of the frame, overlapping the shelves) shows an idle
charcoal screen with a small gold dot drifting slowly across it. Mobile
keeps the same full-bleed composition with no clipping. No visible text
except `<title>`.

## Mechanics (all closed-form over piece time and recorded taps)

- Watch-first with tap-to-pull: the lit shelf advances down the wall every
  7 s on its own (5-row cycle, 35 s).
- Tapping a spine pulls it 2.4% of frame height upward out of its slot over
  0.3 s and plays its miniature scene in the monitor (spine index % 3:
  room / crowd / monitor wall, each a looping closed-form miniature).
  Tapping the pulled spine pushes it back over 0.3 s; tapping another spine
  swaps. Taps on the monitor itself, or on a spine hidden behind it, are
  ignored. Tap never removes a tape, never empties a shelf, never restarts
  the wall. Never click-to-reload.
- Miniatures: room (12 s; speaker cycles every 4 s, head tilts, gold
  zigzag voice-line rises), crowd (8 s; seven figures nodding on staggered
  slow sines), monitor wall (6 s; screens cycle cream/grey/teal, scarlet
  and gold blocks flicker every 2 s).

## Adaptations

- The prompt's "wall" is the charcoal shadow colour, so the lit shelf reads
  against it; monitor-screen tints use only prompt-palette tones.
- The pulled spine shifts upward out of its slot rather than scaling, so it
  never clips a neighbour row; it is drawn again above the monitor so it
  stays visible if it overlaps the monitor edge.
- Lit-row timing is 7 s per shelf (35 s cycle) and the idle monitor shows a
  slowly drifting gold dot — own timing and idle state, distinct from
  №1477 "The Archive of Eight Hundred Tapes" (CR6), which this prompt
  revisits by design. Spine colours/stripes come from a different seed
  stream (1484000 + index × 7919), so the wall layout itself differs.
  The overlap is inherent to the prompt and is flagged, not hidden.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; fading
  alphas are literal fixed decimals (the row shadow is a single
  `rgba(42,42,48,0.55)` fill); dots are own-beginPath arcs or filled rects
  (node-canvas quirks).

## Determinism

Frame one = draw(0) via boot flag, clock starts only with the rAF loop
(plain function declaration behind a typeof guard); all spine colours and
gold stripes from per-spine mulberry32 seeds, never Math.random. The whole
script is wrapped in an IIFE so its locals never collide with the QA
renderer's own top-level names (the №1467 lesson).

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify.
Forced-time probe harness (vm-isolated instance, real node-canvas, piece
driven via window.__piece, `tmp/probe1484.js`): t = 0 redraw identical;
litRow 0/1/0 at t = 0/7/35; tap on spine 0 pulls it (123,503 px frame diff
as the monitor scene appears); second tap pushes it back (0 px diff vs a
fresh idle instance at the same time — wall restores exactly); taps on the
monitor and on the monitor-occluded spine 25 ignored; tap on spine 20 pulls
it, tap on spine 1 swaps, and the swapped frame equals a direct-pull frame
exactly (0 px). Token scan clean (the single "Math.random" hit is the code
comment stating it is never used). No fix rounds needed.
