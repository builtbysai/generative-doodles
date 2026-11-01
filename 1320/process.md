# №1320 "The Dossier Wall" (sadie-barnette SB1, PP487)

## Source work
Barnette's *My Father's FBI File, Project III* (2017: laser prints with aerosol
paint and rhinestones on neon pink plexiglas) and *Dear 1968,...* (2017-18:
B&W wallpaper built from signatures and seals found in the file). The engine
is THE FLIP: hostile state documents re-appropriated with pink spray, glitter,
and rhinestones.

## What the piece is
A gallery wall covered floor-to-ceiling with a 10x6 grid of copied
surveillance-dossier pages mounted on a glowing neon-pink plexiglas substrate,
darkened at the edges. Each off-white page carries pseudo-type lines (short
gray dashes, never readable prose), one to three black redaction bars, and —
on about 60 percent of pages — a stylized signature scrawl that is never a
real name. Every redaction bar is drawn over a text block it obscures. Three
handwritten margin notes carry the only legible words in the piece, verbatim
from the prompt: "HOW DO WE GET FREE?", "HERE", "NOW".

Over the wall: a hot-pink spray-mist field biased to the left third, and gold
rhinestone glints clustered near page corners like constellations.

## Motion (watch-only, 120 s loop)
- Lateral drift: the whole grid pans on a sine with a 120-second period, as if
  the camera is reading the wall. Ping-pong, so the loop never jumps.
- Rhinestones glint on a sinusoidal pulse plus a traveling light wave that
  sweeps the wall every 14 seconds.
- Spray mist slowly re-settles: each blob drifts on its own slow sine phase
  and breathes in alpha.
- Double-tap reseeds the page layout and rhinestone positions from a seeded
  stream (seed 1320000 + reseedIndex x 7919). A single tap never reloads.

## Adaptations from the prompt
- The neon-pink plexi substrate is layered flat alpha shapes, not a gradient:
  the QA renderer cannot render gradients reliably. Edge darkening is flat
  alpha bands and corner blocks.
- The margin-note text is fitted to its page at runtime: the font shrinks
  until the measured phrase fits 92 percent of the page width. This fixed a
  first-pass bug where notes were anchored at page center and the long
  "HOW DO WE GET FREE?" note ran off the field edge.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop. All layout, mist, and glint variation comes
from mulberry32 seeded streams, never Math.random. Resize redraws at the
current piece time, never restarting the performance. The rAF loop is a plain
function declaration behind a typeof guard. Thumb rendered three times after
the final edit, byte-identical all three.

## House-rule compliance
Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height; phone detection via
window.screen physical size with the aspect fallback; full-bleed field
composition, checked at 390 wide. No gradients, no shadowBlur, no filters,
no offscreen canvas, no AudioContext, no getUserMedia. Dots and glints drawn
as closed paths with moveTo before batched arcs. No visible text except
<title> and the three prompt-specced margin phrases.
