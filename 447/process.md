# №1453 "Sailor and Bearded Lady, One Figure" (tabea-blumenschein TB6, PP684)

## What it is
One proud figure, centered, ~80% of frame height, full body visible, on a
paper panel against a warm gray ground. It carries both attribute sets at
once, with dignity and no transformation gag: a sailor's striped top and
anchor + heart tattoos on one arm, and a long plaited beard with scarlet
and gold ribbon accents on its face, plus bare shoulders and a white
sailor cap. No second figure, no split screen, no before/after.

## Palette (verbatim from the prompt)
Ground paper #f2ead8, contour ink #1a1a1a, sailor stripes navy #1a2a5a
and white #f2f2ee, cap white #f2f2ee, tattoos red #c81a2a and ink blue
#2a2a4a, beard chestnut #5a3418 with ribbon accents scarlet #d81a2a and
gold #e8a81a, skin warm #e8c8a8, background warm gray #cfc8bc.

## Motion (all closed-form over piece time and recorded events)
- Beard sway: 6 s sine per strand, seeded phase offsets; plait ticks are
  static marks on each strand.
- Ribbon flutter: 3 s sine rotation on the ribbon diamonds.
- Tattooed arm flex: 5 s sine; cap tip: 10 s sine.
- Emphasis shift on a 30 s cycle with 1 s smooth crossfades: 0–10 s the
  beard is foregrounded (scale +6%, ribbons at full alpha), 10–20 s the
  sailor side is vivid (tattoo alpha up, stripe outlines crisper),
  20–30 s both settle equal. Every ambient period divides 30 s, so the
  loop closes exactly (probe: t=30 vs t=0 = 0 px diff).
- Drag the beard: strands part under the finger (Gaussian falloff around
  each recorded drag point, exponential decay tau 2 s) and fall back.
- Drag the tattooed arm: a soft red glow blooms under the finger and the
  tattoos read brighter; decays after release.
- Never click-to-reload; no transformation, no second figure.

## Adaptations
- Figure as one contour path with attribute layers: beard as strand
  paths with sway, tattoos as small shapes on the arm, emphasis shift as
  timed alpha/scale tweens on the two attribute groups.
- Fully silent by design (no AudioContext at all); no offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, getUserMedia, or text
  drawing. The only visible text is `<title>`.
- Fading alphas rounded to 4 decimals; dots as own-beginPath arcs
  (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1453000), never Math.random (the one
  grep hit is a comment stating so).

## Verification
- Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
  byte-identical across repeated renders including a final re-verify.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving
  the piece's own loop, pointer events to its own listeners):
  loop closes exactly at t=30 (0 px); motion live (t=0 vs t=3 =
  21,456 px); beard chestnut 12,174 px in the beard phase vs 11,017 px
  in the sailor phase (emphasis shift works); beard drag changes the
  t=5 frame by 10,246 px; arm drag changes the frame by 6,576 px;
  tattoos present in the arm zone (860 near-red px for the heart,
  2,453 near-ink-blue px for the anchor); navy present on both halves
  (one centered figure, not two).
- No fix rounds needed.
