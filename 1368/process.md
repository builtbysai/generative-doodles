# №1368 "Subtitle Inversion" (sky-hopinka SH1, PP591)

A slow pan across a generated river-and-forest landscape in Pacific-Northwest
tones. Two parallel text streams drift through the frame — one in an invented
hand-drawn glyph script, one in a plain geometric pseudo-script. Each stream
periodically becomes the other's subtitle: when the glyph script leads, the
geometric stream renders small beneath it, and vice versa, swapping on a slow
clock. Neither script is ever the default.

## Composition

- Horizontal scroll, horizon at 55%: rain-grey sky (#6B7683) above, cedar
  ground (#2E4A38) below, a river band (#3E5A6B) meandering through the
  ground, wet-bark (#1E1A16) trunks, seeded pines, a distant cedar ridge, and
  flat-alpha cloud ellipses at 0.3 parallax.
- The stream pair trades thirds every 40 s (plus a slow-drag bonus of up to
  8 s): phase 0 sits in the lower third with the hand-drawn script leading
  large and the geometric script small beneath it; phase 1 sits in the upper
  third with the geometric script leading and the hand script small beneath.
  The pair glides between thirds over the first 3 s of each phase.
- The active subtitle scrolls LEFT at exactly the pan speed (12 px/s), so its
  marks feel woven into the landscape; the lead scrolls right, floating.
- Drag horizontally to push the pan: recorded drag samples contribute a
  closed-form offset (exponential decay, tau 3 s, capped at ±320 px). The
  piece never rewards speed — fast drags are capped the same as slow ones —
  and slow drags (under 120 px/s) deepen the swap cadence by up to 8 s.
  No click actions, no buttons, no translation-key UI.

## Rules honoured

- Study-wide rule: NO readable English anywhere on screen. Both scripts are
  invented marks only (hand script: wavy lines, loops, hooks, dot clusters,
  strokes; geometric script: triangles, squares, bars, crosses, chevrons,
  diamonds), drawn in bone (#D9D2C2). Nothing on screen is ever a word.
- Adaptations: the two glyph atlases are seeded glyph functions drawn per
  glyph on the main canvas (no atlas buffer); the film-grain overlay is 240
  seeded dots whose alpha is a function of (dot index, quantized 2 s time
  index), never per-frame random. No offscreen canvas, no gradients, no
  shadowBlur, no Path2D, no createElement, no AudioContext, no getUserMedia.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw() via
  style.width/height; phone detection via window.screen physical size
  (min dimension < 700 px) with aspect h > w*1.15 as fallback; field-like
  composition goes full-bleed on phones, checked at 390 wide.
- Determinism: frame one = draw(0) via a boot flag, the clock starts only
  with the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1368000 + index*7919), never Math.random.
  The landscape is a pure function of world x (seeded 90 px cells, sine-sum
  ridge and river), so the pan never wraps visibly.

## Verification

- Rendered at 1280x900, 390x844, 720x720 with
  `node ~/workspace/tools/render-piece.js`; all three inspected. Thumb
  byte-identical across repeated renders, including a final re-verify after
  the canopy fix below.
- Probe harness (stubbed rAF driving the piece's own loop, pointer events to
  its own listeners): at t=0 the bone-coloured streams sit only in the lower
  third (2,691 px lower, 0 upper); at t=45 only in the upper third (4,930 px
  upper, 0 lower) — the ~40 s trade confirmed. A 300 px drag at t=10 changes
  213,083 px at t=11 (the pan is visibly pushed); by t=45 the drag has
  decayed to nothing, as specced. Pan movement t=0 vs t=10 changes
  130,728 px in the ground band.
- One fix round: the first canopy fill used the ground's own cedar, so
  foliage was invisible against the ground and only trunks read. Canopies
  are now a lighter cedar shade (#3D5A49) in two stacked triangles; all
  renders re-done after the fix.
- Token scan clean except one comment stating Math.random is never used.
