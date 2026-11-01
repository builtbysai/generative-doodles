# №1150 — De/Calibration Grid

Rosa Menkman study block RM7 (DE/CALIBRATION ARMY). One wall of
calibration-target cards that refuses to stay calibrated.

## The piece

A wall of twenty-four color-checker cards on black (6×4 on desktop, turning
4×6 on portrait phones so the patches stay legible). Each card carries twelve flat
patches — the six calibration hues (#FF0000, #00FF00, #0000FF, #FFFF00,
#FF00FF, #00FFFF) and six grays from white to near-black — on a #0B0B0B card
ground, separated by 2px black gutters. No text, no faces, no brand marks:
just the patches and their wrongness.

Every card is miscalibrated in its own seeded way. A card's recipe combines a
hue rotation, a saturation and lightness bend, a gamma bend, an optional
permutation of the hue patches (red↔blue, a triad rotation, magenta↔cyan,
traded triads, a scramble), and a resting decalibration level around 0.45. A
patch's drawn color is the HSL lerp, by the card's current level, between its
correct color and the recipe's fully wrong color — so at rest the wall reads
as a checker wall gone quietly, variously wrong: some cards rotated, some
swapped, some washed or crushed by bent gamma (the grays bend too).

## Interaction

- **Drag** across the wall decalibrates. Pressing and crossing cards records
  disturbance events; a card's level is a closed-form function of the event
  list — its own hits decay exponentially with a 30-second time constant back
  toward the card's resting level, so untouched regions re-calibrate on their
  own and the system always drifts back to order unless disturbed.
- The disturbance **spreads**: each orthogonal neighbor receives 0.4× of a
  card's hits, delayed 2.5 seconds per step, like a slow infection moving
  through the grid.
- **Double-tap** a card reseeds its miscalibration recipe (a new generation
  of wrongness for that card only); the two presses that form the double-tap
  leave no disturbance behind.

Silent by design. No audio, no microphone, nothing leaves the page.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in every draw.
- Phone detection via `window.screen` physical size (min dimension < 700px)
  with aspect fallback (h > w × 1.15).
- Determinism: the first frame is drawn synchronously at a fixed phase — the
  wall at rest, every card wrong in its own way, no disturbance active. All
  later state is a closed-form function of recorded events and elapsed time;
  requestAnimationFrame is used only behind a typeof guard.
- Flat rects only: no gradients, no ctx.filter, no shadowBlur, no
  createElement, no offscreen canvas.
