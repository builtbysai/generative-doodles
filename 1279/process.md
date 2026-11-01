# №1279 "Wonder Women" (suchitra-mattai SM8, PP438)

## Prompt

Field of vintage-sari fragments, dark and dense, across which female figures
repeat in a loose procession, each a flat sari-print silhouette in a different
saturated tone, walking left to right. Small LED-like dots glow and pulse warm
across the field. Grounded in Mattai's *wonder women* (2026, acrylic on vintage
sari, LEDs), her first documented integration of light into the sari surface.

## What was built

- Sari fragment field: seeded jittered tile grid in six dark indigo shades
  over a shadow ground, with faint stitch dots on about half the tiles.
  Flat shapes only, no gradients.
- Procession: 9 seeded figures, each with its own scale (0.55-1.30), speed
  (10-24 px/s scaled), tone (magenta #C2185B, marigold #E8A020, peacock
  #0F7B8A, rose #D97B8C), arm pose, sari drape shift, bob frequency and
  phase. Flat trapezoid drape with white print dots, round head, line arms
  and legs with a walking swing. Figures loop left to right around a
  W+400 span, so the procession never ends and never marches in step.
- LEDs: 42 warm #FFD98A dots, scattered by seed (never on a grid), each
  pulsing on its own 3.2-6.2 s period with a slow wave across x. Small dots
  with a soft flat-alpha halo, never a neon-sign look.
- Drag-dim: drag downward dims the field and figures (dim = 1 - dy*0.004,
  clamped to 0.12); the LEDs stay lit. Release restores via exp decay
  (tau 0.9 s). All closed-form over recorded pointer events and piece time,
  never frame-integrated state.

## House adaptations

- None needed beyond the standing rules. No typed input, no audio, no text
  on canvas (title only); the gallery note carries the interaction cue.

## Determinism (№1275 lesson applied)

- Frame one is drawn synchronously at exactly t=0 via a boot flag
  (`draw(0)` at load; resize handlers also redraw `draw(0)`). The clock
  (performance.now() minus T0) starts with the rAF loop only. Frame one
  never reads performance.now() or Date.now().
- Thumb rendered three times at 720x720: all byte-identical.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Desktop read: dark dense fragment field, seven figures visible in
  marigold/peacock/rose at varied scales, warm LED dots scattered.
- Mobile read: same field full-bleed, procession intact (two figures
  mid-wrap at the edges, as a looping procession should show), page ground
  in the piece's own background color.
- Dim mechanic probed through the piece's own pointer handlers in a
  node-canvas harness (frozen clock, manual frame): whole-frame brightness
  151.1 undimmed, 134.4 at a 60 px downward drag, 91.1 at a 250 px drag
  (clamped dim 0.12). Figures sink into the dark; LEDs stay lit.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, offscreen canvas, pixel buffers.
  requestAnimationFrame appears only behind typeof guards.
- Fix rounds: none required. First renders passed at all three sizes.

## Files

- index.html (md5 aa71f4158f7896a06545f01851d83734), self-contained, silent
- process.md (this file)
- thumb.png (720x720, byte-identical across three renders)
