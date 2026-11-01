# №1452 "Big Birds, No Catwalk" (tabea-blumenschein TB5, PP683)

## Prompt

A dark hall divided by wire-mesh barriers, lit only by cones of light from
individual spotlights; inside, figures in bright knit costumes move like
birds — heads bobbing, arms held like wings, steps quick and pecking —
while high above them, two performers swing on a trapeze. At the start of
each loop a large egg cracks open and a new bird-figure hatches.

Palette: hall black #141414, mesh steel #6a6a6a, spotlight warm white
#fff2cc, spotlight cone pale gold at low alpha #e8c86a, knit costumes
scarlet #d81a2a, gold #e8a81a, turquoise #1a9aaa, magenta #c81a6a, egg
shell cream #f2ead8, shadow #2a2a2a.

## What was built

A single self-contained `index.html` (canvas 2D, no external assets, fully
silent). Frame one: a dark hall filling the frame, four vertical
wire-mesh barriers dividing four bays, one spotlight cone per bay with a
warm pool on the floor, a trapeze spanning the upper third with two small
hanging performers, four bird-figures in bright knit costumes (scarlet,
gold, turquoise, magenta) pecking and bobbing in their bays, and a large
cream egg center-low.

Motion, all closed-form over piece time and recorded events (never
frame-integrated state):

- 48 s seamless loop; every ambient period divides 48 s (bob 1.6/2/2.4/3 s,
  peck 0.8/1.2/1.6/2.4 s, trapeze swing 6 s, spotlight sway 12 s), so the
  loop closes exactly (probe: t=48 vs t=0 = 0 px diff).
- Birds bob on a y sine and peck via a squared-sine head pitch, each with a
  seeded phase offset; knit bands, wing arms, beaks, and legs are flat
  shapes with strong contours — stylised figures, never photorealistic.
- Egg cycle: intact 0–3 s, crack lines grow 3–5 s, shell parts into two
  halves 5–8 s, a gold bird-figure unfolds from it 5–9 s and joins bay 2,
  present until 44 s, then fades out 44–48 s while a new egg fades in.
- Trapeze: pendulum swing (6 s period) around a top-centre pivot, two
  performers hanging from the bar.
- Spotlights: flat-alpha cone layers (0.07/0.06 pale gold) plus a warm floor
  pool, swaying slightly — never canvas gradients.

Interaction (touch/drag, never click-to-reload):

- Drag across a bay startles its birds: a hop + wing flutter driven by an
  exponentially decaying envelope over the recorded startle events
  (probe: 2,666 px diff at the same t, envelope 0.0498 after 4.5 s).
- Drag the trapeze to change its swing: the swing offset follows the
  pointer while dragging and decays exponentially after release (probe:
  8,443 px diff under drag, release offset 0.3125 recorded).
- No runway, no catwalk line, no fashion-show order, no bright even
  lighting, no text besides `<title>`.

## Adaptations

- Spotlight cones are layered flat-alpha polygons, not gradients: the
  prompt's "cone gradients" are unreliable in the node-canvas QA renderer,
  and flat alpha reads identically at low alpha.
- No audio at all: the piece is silent by design (the prompt specs no
  sound; the "costume is the body" study rule needs no tone).
- Egg halves replace the whole egg during 5–8 s rather than drawing over
  it (see fix rounds).
- Trapeze performers hang head-near-bar, body below (see fix rounds).

## House-rule compliance

- Canvas size from Visual Viewport API + resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 fallback; field-like composition goes full-bleed
  on phones (verified at 390×844, no clipping).
- Determinism: frame one = draw(0) via a boot flag; the rAF clock starts
  only with the loop; all randomness from a seeded mulberry32 PRNG
  (seed 1452000 + index·7919), never Math.random; rAF loop is a plain
  function declaration behind a typeof guard.
- Node-canvas quirks: every fading alpha rounded to 4 decimals before
  stringifying; dots drawn as filled rects or own-beginPath arcs (each
  ellipse/circle call opens its own path with a moveTo first, never batched
  subpaths).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or canvas text. Token scan clean (the single
  "Math.random" hit is a comment stating it is never used).

## Verification

Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
390×844, and 720×720; all three inspected. Thumb renders byte-identical
across repeated renders (including after the final fix).

Forced-time probe harness (`tmp/probe1452.js`, vm-isolated instance,
stubbed rAF driving the piece's own loop via `window.__piece.draw`,
pointer events to its own listeners):

- Two fresh instances byte-identical at t = 0; fresh t = 0 redraw = 0 px.
- Egg cream 9,615 px in the center-low zone at t = 0; shell-parted zone
  3,343 px at t = 7 (after the fix; was 9,664 px before, see below).
- Hatched bird: 3,476 gold px in the bay-2 bird zone at t = 12.
- Loop closes exactly: t = 48 vs t = 0 = 0 px diff.
- Startle: bay-0 drag at t = 0.5 changes 2,666 px at the same t; event
  recorded; envelope decays to 0.0498 by t = 5.
- Trapeze drag changes 8,443 px at the same t; release records offset
  0.3125, decaying as exp(-dt/2).

Fix rounds (2):

1. Trapeze performers first rendered head-below-body, reading as dangling
   blobs; reordered so the head sits near the bar and the body hangs below.
   All renders re-done after the fix.
2. During 5–8 s the egg was drawn both whole and as two parting halves, so
   the egg-zone cream count at t = 7 (9,664 px) exceeded frame one
   (9,615 px) instead of dropping: the shell visually duplicated instead of
   splitting. The full egg is now skipped during 5–8 s so the egg exists
   only as its two halves; t = 7 now reads 3,343 px (a real gap between the
   halves). All renders re-done after the fix; frame one is unchanged by
   this fix.
