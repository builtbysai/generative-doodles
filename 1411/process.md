# №1411 "Prolonged Echo" (christine-sun-kim CS4, PP634)

A white wall covered in thick black arcs — each arc the bounce of a hand off a
palm, sloping and overlapping across the frame — with white showing through
the black in places, and smaller charcoal echo drawings layered on top of the
mural, echo upon echo.

## Composition

- Wall white #f2f0e8 fills the frame edge to edge (full-bleed on phones).
- Thick black arcs span the full width, sloping rightward, overlapping like
  waves; seeded gaps in each stroke let white show through the black.
- Four static charcoal panels composited over the mural: two large, two small,
  drawn as soft-alpha gray arc clusters.
- Valley labels carry ONLY the prompt's own two capital labels, "OWE" and
  "HAND PALM" — labels for the echo's mechanism, not sentences. No other
  readable text except `<title>`.

## Motion

- A tap event (a hand-shape touching a palm-shape at frame left) launches an
  arc that travels rightward over 7 s, bouncing and decaying as it goes.
- Every tap replays at +1 s, +2.5 s, +5 s with decreasing amplitude
  (1 / 0.6 / 0.35 / 0.18) and increasing distortion — the echo train.
- A seeded schedule fires a tap every 9 s from t = 4 s, so the wall keeps
  thickening on its own.
- Arcs accumulate as stored history; only the oldest echoes fade, toward a
  0.14 alpha floor — the wall never clears, only thickens.
- Drag anywhere launches a new tap at the drag point; its echo train visibly
  lags, distorts, and piles up.

## Adaptations

- Prompt "delay buffer" implemented as explicit delayed arc copies with
  amplitude/distortion parameters, all closed-form over piece time and
  recorded events — no simulation, no canvas-fade.
- Frame one is pre-thickened: four taps seeded at t = -30, -22, -14, -6 s, so
  the wall already carries accumulated arcs at load.
- Fully silent: no AudioContext, no getUserMedia. The echo is visible.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement, or
  localStorage. fillText is used only for the two specced valley labels.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects; every arc segment gets its own
  beginPath with a moveTo.
- House rules: canvas size from the Visual Viewport API with resize
  listeners; canvas pinned in draw(); phone detection via window.screen
  physical size with aspect fallback; synchronous first frame at constant
  phase via a boot flag (frame one = draw(0), clock starts only with the rAF
  loop); rAF loop as a plain function declaration behind a typeof guard; all
  randomness from a seeded mulberry32 PRNG (seed 1411000), never Math.random.

## Verification

- Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
  byte-identical across repeated renders.
- Desktop frame one: thick black arcs spanning the full width, sloping
  rightward and overlapping, white showing through via seeded stroke gaps,
  gray echo copies, charcoal panels visible, OWE and HAND PALM labels only.
- Mobile: same full-bleed composition, no clipping.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): drag zone dark pixels 0 before a
  drag to 2,935 two seconds after (new tap arc growing); full-frame dark
  pixels 27,878 at t = 8 s to 29,964 at t = 30 s (wall thickens, never
  clears).
- Token scan clean: the only forbidden-token match is a comment noting the
  PRNG is never Math.random.

## Fix rounds

- One fix during the build: the QA renderer has no `document.body`, so body
  and hint style accesses are now typeof-guarded; the piece renders in the
  harness and in a real browser alike. All renders re-done after the fix.
- One fix during the build: scheduled taps first fired on a time-window
  check that could double-fire; they now fire exactly once via a fired
  pointer.
