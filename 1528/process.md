# No.1528 "The Flag Held, Not Waved" (mohamed-bourouissa MB1, PP775)

Gallery date: 2006 · 03 · 19 (recorded here only, never drawn in the piece).

## What it is

Near-black field #0e0d10 with a row of nine pale tower-block silhouettes
across the back (flat rectangles of slightly different heights, seeded,
no windows, #232028), bases at 0.35 of the height. In front, five abstract
figure-marks (torso line + arm lines + leg lines, no heads) hold a frozen
group pose on a ground line at 0.80 height: mark 0 stands higher than the
rest on a low platform and holds a small bright signal-red rectangle (the
flag, #c23b2a) in a raised arm; mark 1 crouches; mark 2 is half-turned
(x-scale 0.55); mark 3 has both arms out; mark 4 stands plain. A single
hard light pool from the lower right (layered flat-alpha amber discs)
carves the marks out of the dark: marks inside the pool render in warm
grey #b9b2a4, marks outside render as dim silhouettes (see Adaptation 2).

## Motion

Watch-first tableau loop, 21 s: three poses, each holding exactly 7 s,
then a hard cut to the next pose (0 -> 1 -> 2 -> 0). No smooth motion
between poses, only the cut; per-mark poses are frozen inside a hold.
Mark 0 holds the flag in all three poses (raised-arm angle varies). The
light pool drifts very slowly on closed-form sines over the loop, so the
same poses are re-carved differently over time.

## Interaction

- Dragging inside the light pool moves the pool (figures stay posed; only
  what is lit changes). After release the pool keeps a persistent offset
  from its drift centre, so it stays where it was left and keeps drifting
  slowly around the new anchor.
- Dragging on a figure-mark nudges that mark into its next pose early
  (only that mark); at the next scheduled global cut it rejoins the group
  tableau. Implemented closed-form: a mark's effective pose is
  (globalPose + 1) % 3 only if it has an early-advance event inside the
  current hold interval, else globalPose.
- Disambiguation: a pointerdown tests marks first, then the pool. Where
  the pool overlaps a mark, the mark wins (a visitor grabbing a lit mark
  gets a pose nudge, not a pool move).
- Drag never animates a walk, never adds a figure, never turns the light
  off. The piece is fully silent.

## Adaptations (documented deviations from the prompt wording)

1. Light pool: the prompt's "radial gradient" is rendered as three
   layered flat-alpha amber discs (alphas 0.04 / 0.06 / 0.08), never a
   gradient, per the standing no-gradient rule.
2. Silhouette: marks outside the pool render in the mark colour at flat
   0.38 alpha, not in the tower colour. Thin lines in #232028 vanish
   against #0e0d10 (the first desktop render proved it: unlit marks were
   nearly invisible); the silhouette treatment is a dimming of the mark
   colour, not a second colour, and lit marks stay clearly brighter.
3. The flag stays signal red in all poses and whether lit or not: it is
   the title element, a bright rectangle by spec, and the silhouette rule
   is applied to the figure-marks.
4. Fifth mark: the prompt describes four roles for five marks (platform,
   crouching, half-turned, arms out); the fifth is a plain standing mark.
5. The platform mark stands on the platform in all poses (feet at ground
   minus platform height); other marks stand on the ground line.

## Technical notes

- Canvas 2D only. Frame one = draw(0); the rAF loop is anchored as
  offset + elapsed-since-load. Loop is 21 s = 3 x 7 s holds; every
  animation sine runs on loop-local time, so t=21 and t=42 close
  byte-identically to t=0. All motion is closed-form over piece time and
  recorded events (early-advance event lists, pool-drag session log with
  move times and release offset); nothing is frame-integrated.
- Seed 1528000 (mulberry32) for tower heights only; poses are a fixed
  table, not random. No Math.random anywhere.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback. Field-like
  scene: full viewport on both desktop and phone.
- Probe-only hook window.__t28 exposes pool centre/radius, global pose,
  loop length, and per-mark position/pose/lit flag; it draws nothing.

## QA

- Renders inspected personally: qa-desktop.png (1280x720) and
  qa-mobile.png (390 wide) from the final file — towers, platform,
  flag, five headless marks, pool, ground line all present; no clipping.
- probe-1528.js: 20/20 pass (vm-isolated, real node-canvas, driving the
  piece's own rAF loop). Covers: frame one identical across instances;
  loop closure at t=21 and t=42 byte-identical; pose 0 through the first
  hold, hard cuts at t=7 and t=14, return to pose 0 at t=21; per-mark
  poses frozen inside a hold; five marks; some lit and some silhouette
  at t=0; pool present with positive radius; signal-red flag pixels
  above mark 0; pool drift small over 10 s; pool drag moves the pool by
  the drag delta with no pose change and 5 marks intact; figure drag
  advances only that mark early and it rejoins at the next cut; same
  drag sequence byte-identical across instances.
- Thumb byte-compare: three independent 720x720 renders byte-identical
  to the shipped thumb.
- Forbidden-API grep: 0 hits (Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage,
  gradients, fillText, strokeText). The two early hits were words inside
  code comments, reworded; no calls.
- Fix rounds: 2 piece changes, both before final QA. (1) Silhouette
  treatment changed from tower colour to flat 0.38-alpha mark colour
  after the first desktop render showed unlit marks nearly invisible;
  pool disc alphas softened 0.05/0.07/0.09 to 0.04/0.06/0.08 at the same
  time. (2) Flag rectangle resized from viewport fractions to
  min-dimension fractions so it stays proportionate on narrow phones.
  After (2) the shipped thumb was briefly stale (rendered pre-edit);
  all renders were re-done from the final file and the thumb
  byte-compare re-run. No probe-side changes except the pool-drag grab
  point: the pool centre sits within the mark hit radius of mark 4, so
  the probe grabs an off-mark pool point (marks take priority, as
  documented above).
