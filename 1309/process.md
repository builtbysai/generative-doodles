# №1309 "Catching Hole" (kristan-horton KH6, PP476)

## Source

Kristan Horton's *Catching Hole* (2009) and *Pluripotent* (2008): a fan of
prints under glass, each bearing a hand gesture. The stack reads as one
object from a distance, seven prints up close.

## What it is

A square panel on a dark matte ground. A white frame with a thin dark matte
inner line holds a paper field inset by the 12% frame margin. Seven B&W
prints fan from a pivot at the bottom-center of the field, rotated -45 to
+45 degrees. Each print is paper white with a thin ink border, a faint gray
wash, and a procedurally drawn hand gesture: a palm ellipse with crease
arcs, a wrist stub, and 4-5 finger arcs fanning from the palm top, plus a
short thumb arc. Line art only, never photorealistic hands, no 3D
extrusion, no literal reproduction of the artwork.

## Motion

Watch-only slow breathing: the fan's spread oscillates gently on a 14 s
sine (spread factor 1 ± 0.09). A specular reflection sweeps the glass once
per 18 s cycle: a 3 s diagonal sheen band (two flat-alpha bands, clipped to
the inner field so it never spills onto the ground). Double-tap reseeds
the fan arrangement and the hand gestures immediately; a single tap never
reloads. Never click-to-reload.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop (plain function
declaration behind a typeof guard, per the №1278 lesson). All layouts come
from a seeded mulberry32 stream (seed 1309000 + reseedIndex × 7919):
rotation jitter, vertical jitter, finger count, curl, spread, tilt,
open/relaxed state, and wash tone. No Math.random anywhere. Thumb rendered
three times at 720×720, byte-identical, and re-verified against the
finished index.html.

## Fix rounds

1. First renders: the glass sheen band spilled onto the dark ground outside
   the panel at frame one. Fixed by clipping the sheen to the inner field
   rect.
2. First renders: hands sat at print centers and were mostly covered by
   the next print in the fan, and the fan read bottom-heavy. Fixed by
   lengthening the prints (0.52 to 0.62 of the inner field), moving each
   hand toward the top of its print and toward its counterclockwise edge,
   so every gesture peeks out of the fan.
3. Finger rendering: fingertip dots read as antenna tips and made the
   palms read as heads. Removed the dots, thickened the finger strokes,
   and added palm crease arcs so the shapes read as hands.

## Verification

- Desktop 1280×900, mobile 390×844, thumb 720×720 inspected: fan reads as
  one object from a distance, seven prints up close; all seven gestures
  visible; mobile holds the same read as a centered square on the dark
  matte ground.
- Forced-time probe (temp copy, discarded): the t = 9 frame differs from
  frame one, confirming the breathing spread and sweep cycle run.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, filters, offscreen canvas (the
  single grep hit is a comment stating no Math.random is used).

## Palette

Ink black #101010, paper #F5F3EC, gray #77776F, glass sheen #CFE0E8,
frame matte #1C1C1E. The frame is paper white with a dark matte inner
line, honoring both the prompt's "white frame" and its matte color entry.
