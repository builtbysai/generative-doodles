# №1324 "DOTS (instruction no. 1)" — sadie-barnette SB5 (PP491)

## Source

Barnette's DOTS 1-8 (2026): a pattern designed, translated into a translucent
vinyl stencil, built up through tight systematic colored-pencil layers. Three
predetermined palettes; cool-gray shadows make the dots hover; some break into
half-moons. Openly in the Sol LeWitt conceptual lineage: this is a RULE, and
the grid is the point.

## What the piece is

A square 12x12 dot grid on paper (#F5F1E8) with generous margins. A faint
stencil grid underlies everything. Each dot carries a cool-gray offset shadow
(#8A8F96 at 40% alpha) so it hovers slightly above the paper. Dots fill
layer by layer in a seeded order: each cell starts on a 0.15 s stagger and
fills over 2 s in three flat-alpha pencil passes plus faint chord strokes
that simulate pencil texture. Exactly one hack per cycle: one seeded cell
breaks into a half-moon at a seeded angle. On completion the grid holds 8 s,
then crossfades over 4 s to the next predetermined palette. Palette order:
PRIMARY, RAINBOW, BLACK-AND-WHITE, cycling. Double-tap reseeds the pattern
and jumps to a seeded random palette; a single tap never reloads. No viewer
drawing, no freeform scatter, no palettes outside the three predetermined
sets, no gradients inside dots (pencil layers are flat-alpha strokes).

## Frame one and determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop. The cycle is phase-shifted 12 s so frame one
opens mid-build: stencil plus most dots filled, the last seeded cells still
empty or mid-fill. Fixed phase, gate-valid. All randomness comes from seeded
mulberry32 streams (seed 1324000 plus tap count, cycle index, and cell
index); Math.random is never used. Palette jumps, fill order, dot colors,
hack cell, and hack angle are closed-form functions of piece time and the
recorded double-tap list. The rAF loop is a plain function declaration
behind a typeof guard; one synchronous frame draws at load for the QA
renderer.

## Adaptations

- Pencil layers as flat-alpha strokes, no gradients (QA renderer).
- No offscreen canvas; the palette crossfade draws both palettes on the main
  canvas with complementary alphas.
- Dots drawn one per beginPath with moveTo before every arc (node-canvas
  ellipse/arc quirk).

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. Desktop and mobile both read as a centered
square grid on the paper ground, mid-build, PRIMARY palette, faint stencil
lines, hover shadows offset down-right. A forced-time probe at t = 16
(hold phase) shows the complete 12x12 grid with exactly one half-moon
(row 11, column 4, blue). Thumb rendered three times, cmp byte-identical,
and re-verified against the finished index.html after process.md was
written.

## Fix rounds

One: the first frame-one render was an empty stencil grid, because at t = 0
no cell had progress above zero. Fixed by phase-shifting the cycle 12 s so
frame one opens mid-build, per the hold-phase precedent of earlier pieces.
No other fixes required.
