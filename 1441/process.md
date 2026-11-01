# №1441 "Brush Meets Needle" (kathe-kruse KK2, PP672)

A black vinyl record turns slowly on a warm gray ground. A paintbrush loaded
with oil paint creeps in from the lower left while the pickup arm creeps in
from the upper right; between them a thin painted arc grows in one of twelve
secondary colours. The record keeps turning until brush and needle meet — then
everything stops: silence, stillness, a held frame that lasts two beats before
the loop quietly resets to a new colour.

## Composition

- Record centered, diameter ~65% of frame height (capped at 92% of frame width
  on phones, so the centered composition holds with no clipping).
- Ground warm gray #d8d2c8; vinyl black #141414; groove sheen #3a3a3a;
  label cream #f2ead8; brush handle wood #8a5a2a; bristle #2a1a0a.
- Twelve secondary colours cycle per loop: teal, olive, plum, rust, slate blue,
  ochre, moss, mauve, turquoise, amber, wine, sage (loop 1 is teal).
- The painted arc sits on the record's outer third (radius 0.80R), sweeping
  from 130° (lower left) to 60° (lower right) across the bottom of the record.
- Tonearm pivot upper right of the record; the arm runs down to the needle tip,
  which starts just outside the record's lower-right edge and creeps to the
  meeting point at the end of the painted arc.

## Motion

- Loop with a built-in ending, not an endless spin: ~8 s approach, 1.2 s held
  silence on contact (two beats), 1.0 s soft reset (brush and arm ease back,
  old arc fades), then a new colour.
- Record rotation is visible through a black dot on the cream label and three
  short groove-sheen arcs, all rotating at a slow 24 s/rev rate driven by
  accumulated approach time — so rotation freezes exactly during the hold and
  the reset, and never jumps between loops.
- The tone is a closed-form visual indicator only: a faint cream ring pulsing
  at 2 Hz around the label while brush and needle are apart, gone on contact.
  The piece is fully silent by design — no AudioContext, no autoplay, nothing
  to gate.
- Drag the brush: moving the pointer along the sweep direction (toward the
  needle) multiplies the approach rate by 2.5 and hurries the meeting;
  moving it back multiplies by 0.25 and prolongs the music. Release restores
  the base rate; the loop never restarts mid-approach.

## Study rules honoured

- ALTER, DON'T INVENT, AND LET THE RULE LEAK: the painted arc is drawn as
  short segments with a seeded per-segment radial jitter, stable across loops
  — the hand stays visible, never smoothed out.
- Touch/drag, never click-to-reload. No visible text except `<title>`.
- Avoid cases respected: no endless spin (every approach ends in a meeting),
  no sound past contact (there is no sound at all), no full-disc painting
  (the arc spans 70° only), no click-to-reload.

## Adaptations

- Record as concentric groove circles with slow rotation; brush and arm as
  two agents on converging paths; loop resets the colour index, never
  restarts mid-approach on drag release.
- All state is a closed-form function of piece time plus the recorded drag
  event list (`stateAt(t)` simulates the approach/hold/return machine over
  rate-change events) — no frame-integrated state, so frame one and every
  loop are reproducible.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. Fading alphas rounded to 4 decimals; dots as
  single own-beginPath arcs (node-canvas quirks).
- Frame one = draw(0) via boot flag; clock starts only with the rAF loop
  (plain function declaration behind a typeof guard). All randomness from
  mulberry32 (seed 1441000), never Math.random (the single grep hit is a
  comment stating so).

## Verification (forced-time probe harness, vm-isolated, stubbed rAF)

- t=0: start dot at the arc's start angle; brush lower left, arm upper right.
- t=4: arc grown across 100–125° (84/130 samples), 60–70° not yet painted (0/55).
- t=7: label dot at the 105° rotation position (53/64 black samples).
- t=8: meeting — arc complete across 60–70° (26/55), upper half clean (0/705).
- t=8.6 (hold): label dot still at the 120° position (52/64), old position
  empty (2/64) — rotation frozen during the hold.
- t=10.5: new loop — olive arc at the start angle (4/30), old teal arc fully
  faded (0/355). Colour index advanced exactly once.
- Determinism: two fresh instances byte-identical at t=0; thumb byte-identical
  across repeated renders.
- Drag: toward-needle drag meets by t=4 (control: t=8); away-drag at t=8 has
  no arc in 60–70° (0/55) and is still growing (76/130).
- Renders inspected at 1280×900, 390×844, 720×720. No fix rounds needed.
