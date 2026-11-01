# №1444 "Annual Stripe, Year by Year" (kathe-kruse KK5, PP675)

A life as an uneditable barcode: a tall narrow field of horizontal colour
stripes, one per year, stacked earliest at top to latest at bottom, each in
one of twelve secondary colours from Kruse's fixed personal palette. The
stripes are not flat: every stripe carries hand-painted edges (top and bottom
displaced by a seeded sine + noise, stable per stripe, so the error stays
visible and never flickers) and a brush drag at one end (three short strokes
past the field edge, fading). A thin charcoal year-line ticks down the
field's left edge as new stripes arrive.

## Motion

Slow loop, accumulation-driven, never a finished chart. Fourteen stripes are
already on the field at frame one; a new stripe grows in every 3 s (0.6 s
eased grow-in), and once the field fills, the oldest stripes scroll gently
off the top — never deleted, just out of view. Dragging down the field
scrolls through the years (older stripes return from above); dragging a
stripe sideways stretches it slightly, and on release it snaps back with an
exponential decay, wobble intact. The colour sequence is a fixed 12-colour
cycle indexed by year: it is never re-sorted or re-coloured. No
click-to-reload, no legend, no text labels on the stripes, no visible text
besides `<title>`. Fully silent.

## House-rule compliance

- Canvas sized from the Visual Viewport API (visualViewport width/height +
  resize listeners on visualViewport and window, never window.innerWidth /
  Height alone); canvas pinned in draw() with style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; the field-like composition goes
  full-bleed on phones (field spans the full width, year-line at the left
  edge); desktop field is centered at ~60% of frame width. Checked at 390
  wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, written as a
  plain function declaration behind a typeof guard); all randomness from a
  seeded mulberry32 PRNG (seed 1444000 + index*7919), never Math.random.
- All state is closed-form over piece time and recorded events: scroll
  offset from the accumulation clock, drag shift from recorded pointer
  deltas, stretch from the recorded drag plus exponential release decay.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. Fading alphas rounded to 4 decimals;
  dots drawn as filled rects (node-canvas quirks).

## Verification

- Rendered with node-canvas at 1280x900, 390x844, and 720x720; all three
  inspected. Thumb byte-identical across repeated renders, including after
  the final fix.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop, pointer events to its own listeners): two fresh
  instances byte-identical at t = 0; stripe runs at field centre grow from
  14 at t = 0 to 16 at t = 3.5 and 18 at t = 9.5 (one new stripe per 3 s,
  counting the stripe currently growing in);
  at t = 90 the top visible stripe is index 21 (amber, palette 9), proving
  the oldest stripes have scrolled off the top; a +200 px drag down moves
  the top visible stripe to an older year; a +120 px sideways drag on a
  stripe extends its colour past the field edge, and 3 s after release the
  colour is back inside the field (snap-back complete).
- Token scan clean: no Math.random, getUserMedia, AudioContext,
  createElement, Path2D, shadowBlur, or gradients in the shipped file.

## Fix rounds (2)

1. The growing stripe's brush-drag strokes leaked onto the field at height
   0 (a plum sliver below the 14th stripe at frame one): brush drag is now
   skipped for stripes shorter than 4 px.
2. The zero-height growing stripe still painted a thin wavy band because
   the wobble offsets give its polygon nonzero area: the growing stripe is
   now skipped entirely until it is at least 4 px tall. All renders re-done
   after each fix; frame one now shows exactly the 14 settled stripes.
