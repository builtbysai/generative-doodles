# №1461 "Cham in the Grasslands" (ulrike-ottinger UO6, PP708)

## Prompt

A wide steppe under a huge sky. A circle of masked dancers performs a slow
ritual dance: masked figures in layered robes turn in unison, drums beat, long
banners hang still. The camera does not move and does not cut. At the frame
edge, a train window frame is barely visible: the staged world and the real
world share one edge. Watch-only, long-take stillness — no interaction at all.

## What was built

- Huge pale sky (#c8d8dc) down to a low horizon at 70% of frame height, so
  the sky dominates; steppe grass (#8a9a5b) below, with an earth (#6b5a3e)
  strip along the very bottom.
- Dance circle centered at 52% width, small against the steppe: 8 robed
  figures on a circle path with a shared rotation phase, one full turn per
  60 s loop. Robes cycle rust (#a34a24), ochre (#d9a441), deep blue
  (#1e2a3a) from a single seeded stream; each robe is a trapezoid with a
  contrasting layer stripe. Masks are fixed ivory (#efe6d0) ovals with a
  scarlet (#c1272d) accent stripe and two scarlet eye dots.
- Drum pulse: a subtle 1.5% scale pulse on the circle, 2 s period.
- Two long banners on poles flanking the circle (rust and ochre, scarlet hem
  stripe), swaying almost imperceptibly (±0.012 rad, 12 s period, seeded
  phases).
- Train-window edge: a thin deep-blue strip at the left, exactly 6% of frame
  width (under the prompt's tenth cap), with a thin ivory inner edge line and
  one horizontal ivory bar hinting at a window frame.
- Loop: 60 s. Rotation 60 s, drum 2 s, banner sway 12 s — every period divides
  60, so t = 60 redraws t = 0 exactly and the loop point is hidden by the
  circle's symmetry. No camera movement, no cuts.

## Interaction

NONE. Watch-only by the prompt's own rule: this piece has no pointer handlers
at all — no drag, no tap, no click. The only listeners are the two resize
listeners (window and visualViewport).

## Adaptations

- Dance circle as robed figures on a circle path with a shared rotation
  phase; the vertical squash (0.42) is perspective, the circle seen from a
  low viewpoint, not a camera move.
- Banners as near-still sway shapes; drum pulse as a subtle scale pulse on
  the circle (visual only — no audio, no AudioContext anywhere).
- Ground-mark under the dancers is the palette earth colour at 0.25 flat
  alpha (a flat-alpha overlay of a palette colour, never a new colour, never
  a gradient).
- Exoticism guard honoured: the dance is abstract (turning circle, banners,
  masks) — no imitation of any real ceremony's specific sacred gestures, no
  narration, no text of any kind.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; fading
  alphas are literal fixed decimals; dots are own-beginPath arcs
  (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1461000), never Math.random.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 and inspected all three;
  desktop and mobile both read as one coherent tableau with no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, piece driven via
  window.__piece.draw(t)): t = 60 vs t = 0 = 0 px (loop closes exactly);
  t = 0 vs t = 15 differs by 8,772 px (rotation live); t = 0.5 vs t = 1.0
  differs by 10,917 px (drum pulse + rotation live); frame-one palette
  counts: sky 331,880 px, grass 80,455 px, ivory 3,079 px, scarlet 1,257 px,
  deep blue 31,391 px; train-window strip measures exactly 6.0% of frame
  width at y = 100.
- Token scan clean apart from comments stating the banned APIs are never
  used. No fix rounds needed.
