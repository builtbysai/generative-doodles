# №1589 Trace, Split, Vanish

EXPANSION #209 che-yu-wu, prompt PP836 / CW6. Region-specific physics plus
boundary-crossing splits are the mechanism.
Gallery date: 2006 · 05 · 19 (formula 2002-01-10 + 1590 days).

## Mechanism

A dark chamber (#060608) is divided into three equal vertical regions
by two boundary polylines, marked only by faint white hairlines. Each
region runs different physics on the same particle field:

- Left: particles orbit the white disc (#F5F5F2) on long golden
  (#D9A441) arcs, steered tangentially with a radial spring holding
  them in a band around the disc.
- Center: particles burst radially outward from the red sun (#D9283A,
  ringed in navy #1E3A8A) in orange (#E8641E) streaks, every fifth
  streak navy.
- Right: sharp yellow (#F5D81E) and white (#FFFFFF) sparks fly
  straight and fast, and die young.

Particles drift across boundaries. Where one crosses, it SPLITS into
two children with velocities rotated plus and minus 55 degrees and a
perpendicular kick, then both children fade out by age. The crossed
boundary hairline pulses bright and decays. Particles never bounce;
they cross, split, and vanish. Each particle draws a fading trail
(26 steps gold, 18 steps streak, 8 steps spark), so arcs and bursts
read as continuous traces, not dots. The field is sustained by a
fixed spawn schedule per region, capped at 420 particles.

Boundaries are 25-row polylines, default two verticals at one and
two thirds of the width. Dragging near a boundary while pressed
redraws it: the rows near the pointer are pulled toward the pointer
with a gaussian falloff, and particles crossing the new border split
by the new region's rules.

## Interaction

Drag across a boundary redraws the chamber's geography while
pressed; the border follows the drag. Tap anywhere reseeds the
particle field from a fixed 8-entry seed table, advancing one entry
per tap. Watch-only otherwise. No click-to-reload.

## Palette

Black ground #060608; white disc #F5F5F2 with gold arcs #D9A441;
red sun #D9283A with navy #1E3A8A ring and orange #E8641E streaks;
yellow #F5D81E and white #FFFFFF sparks. Nothing else.

## Determinism

First frame is drawn synchronously at a constant loop phase of
12.0 s, after a fixed 1/60 s stepped simulation from t = 0. All
positions, spawn times, and split geometry come from a fixed-seed
LCG (mulberry32) and fixed tables. No Math.random, no Date.now, no
wall-clock input anywhere. Tap reseeds are interactive only and
index a fixed seed table.

## Deviations from the prompt

- The sun sits slightly right of its region's left-third center: its
  position is the left third or far enough right that its navy ring
  clears the boundary, whichever is further right. At the authored
  left-third position the ring crossed the boundary line on phones.
- Split children are speed-clamped to 420 px/s (scaled) and a
  lineage may split at most 3 times. Without this, particles
  hovering on a boundary split every step, compounding velocity
  past 3,700 px/s and streaking across the frame in long zigzag
  lines; the probe caught segments up to 62.9 px per step before
  the clamp, 5.2 px after.
- Trails are stored per particle as short position histories. The
  prompt's "long golden arcs" need visible traces; one-step
  segments rendered as faint dots, so each particle keeps its last
  26/18/8 positions and draws a fading polyline.

## Proposed gallery note

"Three regions of different physics share one dark chamber. Particles trace gold arcs, burst from a red sun, and spark, splitting wherever they cross a border. Drag a border to redraw it; tap to reseed."

## QA

Rendered from the actual script with node render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three
read as three regions: gold arcs around the white disc, orange
and navy streaks bursting from the red sun (navy ring clear of
the boundary), yellow-white sparks on black, faint boundary
hairlines. Thumb rendered twice: byte-identical
(md5 ad12708252b4f34ddef47ab701526ca8). Interaction probed with a
node harness driving the real pointer listeners and rAF: a drag
starting on boundary 0 moved its hairline from x 240 to x 316
at the dragged rows (target 320, gaussian falloff); a tap
reseeded the field (different render md5, no errors). Split
cascade probed: max per-step trail segment 5.2 px after the
speed clamp, versus 62.9 px before it.
