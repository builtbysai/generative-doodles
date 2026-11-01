# №1352 "Every One" (cannupa-hanska-luger CH1, PP575)

## What it is
A full-bleed field of thousands of hand-rolled clay beads on a dark ground.
At arm's length the beads resolve into the pixelated monochrome portrait of a
woman — implied, never sharp: a dark hair mass, a lighter face oval, and a
broad shoulder wedge, all ghosting in and out on a slow drift wave.

## How it is built
- Beads: a ~14 px grid with ±2 px position jitter and per-bead radius jitter
  (5.5–8 px), drawn as individual ellipses on the main canvas. Value jitter
  (±0.07, plus an 8% chance of a ±0.10 outlier) means no two beads are
  identical and the portrait edges break up instead of rendering clean.
- Portrait brightness field: analytic blobs only — no photo, no real face,
  no likeness. A dark hair ellipse, a lighter face ellipse laid over it, and
  a shoulder ellipse below, each with a feathered 0.85–1.15 radii edge band.
  Bead tone maps from the field value: ≥0.64 white #f2f0ea, 0.36–0.64 gray
  #8a867d, <0.36 near-black #2b2a28, on ground #121110.
- Drift wave (40 s loop): bead tone contrast breathes 0.55–1.0, so the
  portrait cycles between ghost and legibility; a ±1.2 px traveling position
  ripple and a ±0.01 portrait-center sway run on the same clock. Frame one
  (t=0) sits at contrast 0.775 with the face oval already legible.
- Drag stir: pointer drags record samples (midpoint, delta, piece time).
  Each bead's offset is a closed-form sum over samples within 8 s:
  radial push, Gaussian falloff (σ 70 px), exponential settle (τ 2.5 s),
  capped at 40 px. The portrait reforms as the stir decays; after the
  samples expire the field is exactly the undisturbed field again.

## Interaction
Touch/drag only: dragging stirs beads aside; release lets them settle back
over several seconds. No tap action, no click-to-reload, no buttons, no text
on screen except `<title>`.

## Adaptations
- The prompt's WebGL spec is adapted to canvas 2D (the QA renderer has no
  WebGL): beads are flat ellipse fills, the portrait is a seeded analytic
  brightness function, never an image.
- The prompt's "portrait reforms but never exactly the same" is carried by
  the ever-running 40 s drift wave: the field is always slowly changing, so
  no two moments match, while the drag stir itself settles exactly.
- No offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  createElement, no AudioContext (silent piece), no Math.random anywhere.
  All randomness is mulberry32 (seed 1352000). Frame one is drawn
  synchronously via a boot flag (draw(0)); the rAF loop is a plain function
  declaration behind a typeof guard and starts the clock only after load.
- Viewport from the Visual Viewport API; canvas pinned in px; phone
  detection via window.screen physical size with the aspect fallback;
  field-like composition goes full-bleed on phones.

## Verification
- Rendered at 1280×900, 390×844, and 720×720 with
  `~/workspace/tools/render-piece.js` and inspected all three: desktop and
  mobile both read as a packed, irregular bead field with the hair mass and
  face oval ghosting at center; no clean grid, no sharp portrait, no text.
- Thumb byte-identical across repeated renders and matching the shipped
  thumb.png.
- Probe harness driving the piece's own pointer listeners through its rAF
  loop: a drag at t=1 s changes 132,790 px at t=1.5 s (beads visibly shoved
  aside along the drag path, opening a gap in the face oval); at t=9 s only
  an exponential-tail residue remains; at t=12 s the dragged run is pixel-
  identical (0 differing px) to the undisturbed run — the stir fully settles.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, Path2D, offscreen canvas, or text
  drawing calls.
