# №1448 "The Costume Is the Body" (tabea-blumenschein TB1, PP679)

## What it is

A bare stage with a single costume stand, and on it a full feathered-creature
costume with nobody inside it. Deep teal backdrop, warm gray stage floor,
dark wood stand visible below the hem. The costume — tall feathered
shoulders, feather crest, turquoise bodice with magenta sash, scarlet wide
skirt with a scalloped feather hem — breathes and sways as if a body were
inside it, but no wearer, mannequin, or face ever appears: the collar is an
empty cream ring, and the costume is the performer.

## Motion (all closed-form over piece time and recorded events)

- Sway: the whole costume swings on a 6 s pendulum rhythm; breathing is a
  0.5% vertical oscillation on a 5 s period; individual feathers ripple on a
  3 s wave with seeded per-feather phase offsets.
- Gestures: one small gesture per 8 s block, alternating — block 0 lifts the
  left sleeve, block 1 turns the shoulder fans. Each gesture eases in over
  1 s, holds 1.5 s, and eases out over 1 s.
- The full loop closes exactly: 6 s, 5 s, 3 s, and the 16 s gesture cycle
  share LCM 240 s, verified 0 px different between t = 0 and t = 240.
- Drag across the costume adds impulse to the ripple field (exponential
  decay, tau 1.5 s), making feathers ripple and the skirt swing harder.
  Dragging the hem upward lifts the skirt (exponential decay, tau 2 s);
  it settles back on release. Drag state is a recorded event list, never
  frame-integrated.

## Adaptations

- Costume as a filled silhouette with layered feather shapes (one beginPath
  per feather ellipse, never batched subpaths); sway as sine-driven rotation
  and ripple per feather layer; drag adds impulse to the ripple field that
  decays — all per the brief.
- Fully silent: no AudioContext at all. No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, or text drawing (only `<title>`).
  Fading alphas are literal fixed decimals; dots are filled rects or
  own-beginPath arcs (node-canvas quirks).
- Costume scale fits height (~75%) and, on narrow phones, width too, so the
  feather fans never clip at the frame edges; the costume is near-vertically
  centered when width-constrained.

## Determinism

Frame one = draw(0) via a boot flag; the clock starts only with the rAF loop
(plain function declaration behind a typeof guard). All randomness from a
seeded mulberry32 PRNG (seed 1448000), never Math.random (the single grep
hit is a comment stating so). Thumb renders byte-identical across repeated
renders.

## Verification (forced-time probe harness, vm-isolated instance)

- Two fresh instances byte-identical at t = 0.
- t = 0 vs t = 3 differs by 21,533 px (sway/ripple live).
- Gesture 0 sleeve zone differs by 2,376 px (t = 1.5 vs t = 5); gesture 1
  shoulder zone differs by 5,204 px (t = 9.5 vs t = 13).
- t = 240 vs t = 0: 0 px (loop closes exactly).
- Ripple drag event changes the frame by 44,021 px; hem drag event by
  26,516 px (21,514 px inside the hem zone).
- Pointer wiring verified: firePointer down/move pushes a ripple event.

## Fix rounds (2)

1. The costume first rendered shifted far right and clipped: the draw code
   translated by `cx` and then drew with absolute `cx` coordinates,
   double-counting the center. Fixed to translate by the sway offset only.
2. On phones the costume (sized by height) clipped its feather fans at the
   frame edges. Costume scale now fits both height and width
   (min(0.75h, 1.05w)) with near-vertical centering when width-constrained.
   All renders re-done after each fix.
