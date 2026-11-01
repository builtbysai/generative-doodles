# №1361 "For Someone" — process notes

Raven-chacon RC2 (PP584), after *For Zitkála-Šá* (2017–2020). A one-page
graphic score as portrait: a face-like constellation of lines, dots, shapes
and numerology on paper, ringed by 13 small glyph-studies, with a short
poetic instruction line in invented pseudo-script below. The piece is an
invitation, not a control panel: touch voices a glyph, drag rotates the
score, nothing reloads.

## Composition

- Paper `#F4EFE6`, ink `#111111`, red ochre `#9E3B26`, turquoise `#3E7C8C`.
- Portrait constellation, centered: brow arc, two eye dot-clusters (3 and 5
  dots), a nose line, a mouth curve, ochre triangle / turquoise arc cheek
  marks, chin dots (2), forehead dot groups (7 turquoise, 1 ochre). The dot
  counts are numerology as dot groups, never digits. The arrangement suggests
  a face without drawing one: no eyes, nose, or mouth as literal features.
- Ring of exactly 13 glyph-studies at 0.44 × min(W, H) around the center, one
  design each: three-dot triangle, two parallel lines, triangle outline,
  arc, cross bars, chevron, circle-with-dot, zigzag, bar-with-dot, diamond
  outline, crescent, square spiral, dot ring. Ring glyph colors cycle
  ochre / turquoise / ink by index mod 3.
- Instruction line: 14 invented pseudo-script marks (arc, chevron, dot pair,
  bar-with-dot, triangle, wave) in seeded order, fixed below the score.
  No mark is a letterform; no readable text exists anywhere except `<title>`.
- Seeded grain flecks (140, fractions of the field) give the paper tooth.
- Centered composition keeps its shape on phones; the page ground is the
  piece's own paper color. Checked at 390 wide with no clipping.

## Motion and interaction

- The whole score (portrait + ring) rotates very slowly: one revolution per
  300 s, plus cumulative drag rotation (0.005 rad per horizontal drag px).
- Tap (pointer movement under 12 px) on a glyph voices it: a soft tone plus
  an expanding ochre ring flash decaying over ~1.6 s. Drag rotates the
  score; tap vs drag is separated by the 12 px threshold. No tap ever
  reloads, and there are no buttons, sliders, or play controls.

## Glyph → tone mapping (code reference, never on-screen text)

- Ring glyph i (0–12): frequency = 261.63 × 2^((i − 6) / 12) Hz
  (C4-centered, i = 6 sounds C4); duration = 0.6 + sizeN × 1.2 s, where
  sizeN ∈ [0, 1) is the glyph's seeded size factor
  (mulberry32(1361000 + i × 7919)); waveform sine for even i, triangle
  for odd i.
- Portrait constellation glyph j: same frequency rule at half frequency,
  1.0 s duration, sine.
- Tones sound ONLY through lazily created, typeof-guarded WebAudio inside
  the touch gesture. The piece is silent until touched; there is no autoplay,
  no microphone, no getUserMedia.

## Adaptations

- Canvas 2D throughout (the QA renderer has no WebGL, offscreen canvas,
  Path2D, gradients, or shadowBlur, so none are used). Every dot and arc
  gets its own `beginPath` (node-canvas renders batched ellipse/arc
  subpaths as connected polygons).
- Frame one is `draw(0)` via a boot flag; the clock starts only with the
  rAF loop, which is a plain function declaration behind a `typeof` guard.
  All randomness comes from mulberry32 streams (seed 1361000, per-glyph
  1361000 + i × 7919), never `Math.random`.
- Canvas size comes from the Visual Viewport API with an innerWidth/Height
  fallback; the canvas element is pinned in `draw()` (style width/height in
  px). Phone detection uses `window.screen` physical size (min dimension
  < 700 px) with the aspect `h > w × 1.15` fallback.
- The prompt's "poetic instruction line" is invented pseudo-script only;
  no wording from the study is rendered, and no device locale is read.

## QA

- Rendered with `~/workspace/tools/render-piece.js` at 1280×900, 390×844,
  and 720×720; all three inspected. Thumb renders byte-identical across
  repeated renders.
- Probe harness (piece's own pointer listeners, hand-driven rAF clock):
  tapping ring glyph 0 changed 16,939 px at t = 1.5 s (voice flash, no
  crash in the audio-less harness); a 100 px drag changed 45,309 px at
  t = 2 s (score rotated, no reload). Ring count verified as 13 in the
  desktop render (three-dot, two-line, triangle, arc, cross, chevron,
  circle-dot, zigzag, bar-dot, diamond, crescent, spiral, dot-ring).
- Token scan clean except the sanctioned typeof-guarded AudioContext
  creation inside the touch handler.
