# №1417 "Helping Hands" (thomas-mader TM2, PP640)

## Prompt
Two figures standing front-to-back, cropped to torso and arms, where the
front figure's face and the back figure's arms form one composite signer.
The arms describe a table (round, oversized, wooden) while the face supplies
the texture, the weight, the wobble — and then the two figures swap roles
and describe a window. One object per ~30 seconds; at each swap the roles
visibly trade and the description's fluency visibly changes (the learner's
version is slower, clumsier, more charming). Dragging a described object
re-routes the description, and the face reacts to the new object before the
arms catch up.

## What was built
- Pair centered and large, cropped at the waist (torsos cut at 0.92H):
  front figure in ink #26241f, back figure offset behind in #7a6a55.
- The back figure's two arms reach forward and trace the described object's
  outline in the air; the outline appears beside the pair, faint where
  untraced, stronger where the hands have passed.
- 60 s seamless loop: 0–30 s table (fluent roles: face = dark figure,
  arms = brown figure), 30–60 s window (roles swapped, learner fluency).
  The swap animates during the last 2.5 s of each phase — the figures
  visibly trade places, draw order flipping at the swap midpoint — so
  frame one (t = 0) is stable, mid-table.
- Face animates the object's qualities: a heavy table gets a strained face
  (angled brows, narrowed eyes, tight mouth); a tall window gets a
  stretched face (taller head, wide eyes, open mouth). The learner phase
  adds a small asymmetric smile tilt.
- Learner fluency: trace progress lags with hesitation dwells, hand wobble
  grows from ~0.003S to ~0.010S, and window corners overshoot slightly.
- Drag on the object outline re-routes the description live: table
  radius/depth or window width/height follow the pointer. The face reads
  the live target params instantly; the arms trace eased params (closed-
  form exponential decay, tau 1.5 s, folded over recorded drag events),
  so the face demonstrably reacts before the arms catch up.
- No visible text except `<title>`. No audio of any kind. Pseudo-gestures
  only: the arms trace object outlines, never real ASL words, and nothing
  is captioned as an English translation.

## Adaptations
- Two agents (face agent, arms agent) with separate repertoires and fluency
  parameters, per the brief; role swap as a timed state exchange.
- All motion closed-form over piece time and recorded events — no physics
  sim, no frame-integrated state. Eased outline params are folded from the
  drag-event log, never accumulated per frame.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying; dots drawn as filled rects; every arc/ellipse on
  its own beginPath (never batched); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, localStorage, AudioContext, or
  getUserMedia.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; page ground is the piece's own paper color.
- Determinism: synchronous first frame at constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop); all
  randomness from a seeded mulberry32 PRNG (seed 1417000), never
  Math.random; rAF loop as a plain function declaration behind a typeof
  guard (the №1278 named-function-expression lesson).

## Fix rounds
1. rAF loop first written as a named function expression — rewritten as a
   plain function declaration before any render (would have thrown
   ReferenceError in a real browser while staying invisible to node-canvas).
2. Table outline depth first scaled by viewport height, making the table a
   tall oval on phones — depth now scales by min(W, H), so the table reads
   round and oversized at every size. All renders re-done after the fix.

## Verification (forced-time probe harness: stubbed rAF driving the piece's
own loop, pointer events to its own listeners)
- Two fresh instances render byte-identical frame-one images (0 px diff);
  thumb re-renders byte-identical.
- t = 0 vs t = 10 differ in 29,997 px (arms trace, outline grows).
- Phase swap: head-center pixel at t = 15 is dark ink (38, 36, 31), at
  t = 45 brown ink (122, 106, 85) — the face figure has traded places;
  window-glass pixels in the object zone go 0 → 1,689; t = 15 vs t = 29
  (mid-swap) differ in 157,025 px.
- Drag: dragging the table outline wider at t = 5 changes the face region
  within 0.1 s (1,255 px diff vs undragged control, control 0 px), while
  the outline is still easing; by t = 12 the outline has caught up
  (far-right wood pixels 781 dragged vs 226 undragged).
- Window phase t = 45 vs 45.5 differ in 22,324 px (notes drift, lines
  re-steer — here: hands drift, outline re-traces).
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used). No fix rounds needed beyond the two above.
