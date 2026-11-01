# №1388 "Séance Frames" (adam-khalil AK5, PP611)

## What it is
Figures from different centuries — a daguerreotype-era silhouette, a
VHS-grain wanderer, a drone-feed ghost — gathered in one dim room,
refusing to resolve into a single timeline. The room is centered, the
figures stand in a loose circle facing inward around a single candle,
and candlelight flickers across all of them.

## Composition
- Room near-black `#12100e`, centered wall panel and floor band in flat
  fills, no gradients.
- Three figures in a loose circle: left in daguerreotype sepia `#b08d5f`,
  center in VHS blue `#3d5a80`, right in drone green `#9dff57`.
- Candle at the circle's center: flat-alpha glow disc, white body, amber
  flame `#e0962a`.
- No visible text except `<title>`. No readable words anywhere; the
  piece needs no labels at all.

## Motion (all closed-form over piece time and recorded drags)
- Figures drift on small sine/cosine orbits and gesture with swinging
  arms (closed-form phase functions, never frame-integrated state).
- Candle flicker is a seeded envelope of quantized 0.12 s time, never
  per-frame random.
- Era grain is per-figure and per-era, all seeded functions of quantized
  time: daguerreotype static dots (2 s quantum), VHS tracking lines
  drifting down with band jumps (0.33 s quantum), drone pixel blocks
  re-keyed every 0.5 s.
- Era-grain swap: every 24 s the figures rotate era-grain (a scheduled
  exchange, cycle = floor(t/24)), so the same figure is sepia, then VHS,
  then drone, then sepia again.
- Drag: pointerdown/move records the nearest figure; that figure pulls
  forward (scale up to 1.17, alpha to 1.0) while the others sit dimmed
  (scale 0.95, alpha 0.55). Focus weight is a decaying sum over recorded
  drags (tau 2.5 s), settling after release. No buttons, never
  click-to-reload.

## Adaptations from the prompt
- Focus/blur is flat-alpha and scale change, not `ctx.filter` — the QA
  renderer provides no filter support.
- Era grains are seeded functions of quantized time, never per-frame
  noise, so frame one and every frame are reproducible.
- Glow is flat-alpha discs, not gradients (the QA renderer handles
  gradients unreliably).
- The piece ships fully silent; the prompt specs no audio for it.

## House rules
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  `canvas.style.width/height` in px.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px) with aspect `h > w*1.15` as fallback; centered composition
  keeps its shape, page ground takes the piece's own background color.
- Determinism: synchronous first frame at a constant phase via a boot
  flag (frame one = `draw(0)`, clock starts only with the rAF loop);
  all randomness from mulberry32 (seed 1388000 + index·7919), never
  `Math.random` (the only match in the file is a comment stating this).
- rAF loop as a plain function declaration behind a `typeof` guard.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, or getUserMedia. No fillText/strokeText.

## QA
- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900,
  390x844, and 720x720; all three inspected. Desktop and mobile keep the
  same centered composition with no clipping.
- Thumb byte-identical across repeated renders, including a final
  re-verify after the fix rounds.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280x900):
  - t=0: left region sepia 610 px, center blue 12,076 px, right green
    13,047 px — each figure in its own era color.
  - t=0 vs t=5 differ in 41,726 px (drift, gesture, flicker move).
  - t=25 (after the 24 s swap): left region blue 12,872 px / sepia 0,
    center green 11,955 px, right sepia 585 px — the era rotation works.
  - Drag focus: pointerdown near the left figure at t=5, rendered at
    t=5.5, left-region sepia pixels 18,045 vs 526 undragged, full-frame
    diff 21,992 px — the dragged figure pulls forward, fully opaque
    and larger, while the others stay dimmed.
- Fix rounds (2): the candle glow disc was first drawn at canvas origin
  (0,0) instead of the circle's center — now drawn at (cx, cy); figure
  scale was raised from min/900 to min/700 so the figures read at
  desktop and mobile sizes. All renders re-done after each fix.
