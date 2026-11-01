# №1407 "The Saw Hand" (alison-odaniel AO8, PP630)

## Prompt
A room where a rug shaped like two arms lies on the floor, swallowing sound —
its acoustic underlay texture visible as dense pile — while saw and blade
silhouettes hang from the ceiling and drift slowly overhead like a mobile; one
hand-shape in the rug's weave keeps signing, one-handed, endlessly. The saw
mobile rotates with glacial slowness; the rug's pile ripples faintly, as if
absorbing sound; the hand-shape signs in a continuous loop (pseudo-gestures
only); dragging the rug's edge lifts it slightly, revealing the acoustic
underlay beneath, then it settles back, swallowing again.

Palette: rug rust #a8321e, rug cream #e8e2d4, saw steel #8a8f94, ceiling
shadow #4a4a44, hand gold #d4a24e, floor wood #7a5a34.

## What was built
- Room in plan view: a ceiling-shadow band fills the upper third, wood floor
  with plank seams below, gold dust motes drifting on the floor.
- Saw mobile: a hub hung from the ceiling with five blades on lines — three
  toothed circular saw discs and two tapered handsaw silhouettes. The whole
  mobile rotates once per 120 s (glacial), and each blade sways on its own
  seeded pendulum period (7–11 s). All closed-form functions of piece time.
- Rug: two arm-shaped lobes spreading left and right from the center, drawn as
  bezier capsules with a cream border and a rust field, covered in seeded pile
  stipple (700 dots, clipped to the rug). Faint sinusoidal ripple bands cross
  the pile, as if absorbing sound.
- Signing hand-shape at the rug's center, small but bright: gold palm, four
  fingers articulating in sequence and a curling thumb on a 12 s gesture loop,
  plus a faint breathing gold halo ring. Pseudo-gestures only — never a real
  ASL word.
- Drag interaction: dragging the rug's edge lifts it (up to full lift at
  140 px of drag), revealing a dark acoustic-underlay panel with dense stipple
  beneath, plus a cast shadow that shifts with the lift. On release the lift
  decays exponentially (tau 1.5 s) and the rug settles back, swallowing again.
  Never click-to-reload.

## Adaptations
- Rug as a bezier arm-silhouette with seeded pile stipple; mobile as a
  rotating silhouette set with closed-form pendulum sway; hand-shape as a
  looping gesture cycle; drag as a lift-and-settle interaction with a
  closed-form decayed return.
- Optional low hum (55 Hz sine) ONLY via lazily created, typeof-guarded
  WebAudio inside the first pointerdown, sounding only while the pointer is
  held, and dulling (gain ×0.3) while the rug is lifted. Never autoplay; the
  piece is fully visual without it.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  localStorage, getUserMedia, or fillText/strokeText — no readable text
  anywhere except `<title>`.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque in node-canvas);
  dots drawn as filled rects; every arc preceded by its own beginPath/moveTo.
- The cut is never shown — only the rug, the saws, and the signing hand.
- Study-wide rules honored: captions are material objects, never subtitle
  strips; sound is felt or seen, never merely heard; the piece is about sound
  politics and access, not about simulating d/Deaf experience as deficit.

## Determinism
Synchronous first frame at a constant phase via a boot flag (frame one =
draw(0)); the clock starts only with the rAF loop (plain function declaration
behind a typeof guard). All randomness from mulberry32 (seed 1407000),
never Math.random. Two fresh frame-one renders are byte-identical.

## Verification (forced-time probe harness, stubbed rAF + pointer events)
- Fresh frame-one renders: 0 px diff; thumb byte-identical across repeated
  renders, including after the fix round.
- t=0 vs t=30 differ in 28,460 px (mobile sway, gesture, ripple move).
- Hand region t=0 vs t=6 differs in 2,886 px (finger articulation).
- Held 200 px drag at t=5.5: 74,426 px diff vs frame one; underlay-zone dark
  pixels 0 → 6,820 (underlay revealed beneath the lifted rug).
- 0.5 s after release: 52,912 px diff vs undragged at the same clock time
  (lift still decaying). 14.5 s after release: frames match within
  antialiasing noise (992 px differing, max channel delta 7, only 9 px above
  5) — the lift has settled back to zero.
- Token scan clean: no getUserMedia, fillText/strokeText, Path2D,
  createElement, Math.random, gradients, shadowBlur, or localStorage;
  AudioContext appears only inside the gesture-gated hum path.

## Fix rounds
1. The rug rendered with only one arm: `armPath` opened its own beginPath, so
   the second arm call discarded the first. Removed the beginPath from
   `armPath` so callers combine both arms into one path. All renders re-done
   after the fix; the rug now reads as two arms spread left and right.
