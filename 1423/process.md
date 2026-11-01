# №1423 "Eye Spy" (thomas-mader TM8, PP646)

The last piece of the thomas-mader study (#175 / EXPANSION #188).

## What it is

Two transparent figures face each other across a pale field, passing a
pair of eyeballs back and forth between them — the eyes travel as a small,
careful parcel, hand to hand, and each time they arrive, the receiving
figure's view of the field changes: colors shift, edges sharpen, a hidden
layer shows through.

## Frame one (t = 0, via boot flag)

Pale paper field #e8e2d4. Two transparent figures (edge lines only, glass
#9ab4c0) stand left and right, facing inward, arms reaching toward the
center. The eyes parcel — two white eyeballs with brown irises — rests at
the left figure's hand. The left half shows the hidden layer (faint blue
#2e6f8e circles, arcs, crosses, dot clusters) plus a gold view-shift
accent line; the right half shows only the plain field. No visible text
except `<title>`. No horror imagery, no eye transplant, no moral caption.

## Mechanics (all closed-form over piece time and recorded events)

- 24 s seamless cycle: hold left 5 s, travel left→right 7 s (smoothstep
  easing), hold right 5 s, travel right→left 7 s. A +2.5 s phase offset
  puts frame one mid-hold at the left hand, so the hidden layer already
  reads at load.
- Each handoff is marked by a small pause (the hold itself) plus a gold
  pulse ring expanding from the receiving hand over the first 1.2 s of
  the hold.
- While a figure holds the eyes, that side of the field shows its hidden
  layer (a faint second drawing beneath the first, seeded per side) and
  gold edge-sharpening accents; the other side shows the plain field.
  The reveal ramps in over the first 0.8 s of a hold and out over the
  last 0.8 s; while the eyes travel, neither side shows the hidden layer.
- The eyes bob gently (±2 px) on a 12 s periodic sine, so the loop closes
  exactly at the 24 s wrap (verified: t = 0 vs t = 24 is 0 px different).
- Drag the eyes mid-pass to steal them: while dragging, the parcel
  follows the pointer and the nearest side instantly becomes the holding
  side (its hidden layer appears, the other side goes plain). On release
  the pass schedule re-anchors at the nearest figure's hand (5 s hold,
  then the alternating cycle resumes). The eyes never drop, never break,
  only change hands.

## Adaptations

- Figures as transparent edge-line sprites (stroke only, no fill).
- Eyes as a draggable parcel object on a timed pass schedule.
- Field as two composited layers with a per-side visibility mask driven
  by eyes-holder state (including the drag-steal state).
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or fillText/strokeText.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying (scientific-notation alphas parse as opaque);
  dots as filled rects; every arc on its own beginPath with a moveTo.
- Determinism: frame one = draw(0) via boot flag; the rAF clock anchors
  on the first rAF call (plain function declaration behind a typeof
  guard); all randomness from mulberry32 (seed 1423000), never
  Math.random.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw()
  (style width/height in px); phone detection via window.screen physical
  size (min dimension < 700 px) with aspect h > w*1.15 fallback; centered
  composition keeps its shape, page ground takes the piece's own
  background color; checked at 390 wide with no clipping.

## Verification (forced-time probe harness, stubbed rAF driving the piece's
own loop, pointer events to its own listeners)

- Two fresh instances byte-identical at t = 0.
- t = 0: 632 eye-white px in the left hand zone, 0 in the right; hidden
  layer present on the left (3744 blue-tinted px vs 3187 glass-only
  baseline on the right).
- t = 8 (travel): eyes near the right hand (636 px); hidden layer off on
  both sides (3184 / 3187, glass baseline only).
- t = 12 (hold right): eyes at the right hand (632 px); hidden layer on
  the right (3852 vs 3184).
- t = 24 vs t = 0: 0 px different — the loop closes exactly.
- Drag steal: at t = 3 (early travel) a grab at the left hand, drag to
  (900, 470), release — mid-drag the eyes follow the pointer and the
  right side's hidden layer appears instantly (3967 vs 3184); after
  release the eyes sit at the right hand (634 px) and the schedule holds
  right (still holding at t = 9).
- Rendered at 1280×900, 390×844, and 720×720; all three inspected.
  Thumb byte-identical across repeated renders, including a final
  re-verify after the last fix.

## Fix rounds (1)

- The eyes' gentle bob first used sin(t * 1.4) on raw clock time, which
  would not close at the 24 s wrap (a ~2 px pop). The bob is now a
  function of cycle phase with a 12 s period, which divides the 24 s
  cycle, so the loop closes exactly. All renders re-done after the fix.

## Probe note (not a piece issue)

- An early probe counted 0 eye-white px in the hand zones despite 632
  globally: the probe's zone bounds were floats, producing fractional
  byte indices into the pixel buffer (each sample read the wrong
  channel). Integer zone bounds fixed the probe; the piece was unchanged.
