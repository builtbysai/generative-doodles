# Counting Coup Census — №1359 (cannupa-hanska-luger CH8, PP582)

## The piece

A ledger grid of abstract data on ledger paper (#ded8c8): 8 columns × 5 rows
of cells, each holding census-style marks — rows of tally strokes in ink black
(#1c1a17) and tally red (#9c3a2a), plus census "numbers" rendered as invented
pseudo-glyphs. On the viewer's attention, a cell resolves into an individual
hand-made unit: a bead, a whistle, a fist of clay, one of 12 procedural
clay-unit forms, hovering slightly above the paper plane on a flat-alpha
shadow. The data feels like people, not statistics: no real census data, no
real population numbers, no pie charts or infographics.

## Interaction

- **Drag across rows to count.** Every cell the drag path passes transforms
  from number to object with a soft clay thump: the glyphs fade out over
  ~0.25 s while the unit pops in with an overshoot scale over 0.5 s
  (closed-form pop curve, a function of time since that cell was counted).
- **Tap a cell to hear its tone.** A tap (movement under 12 px) plays that
  cell's seeded sine tone (200–620 Hz by cell index, 0.9 s decay) and changes
  nothing visually — no reload, no recount.
- **Session-only counting.** Counted cells stay humanized for the session
  only. Nothing persists: frame one is always the full uncounted ledger, so
  the "resets overnight" rule needs no date logic and frame one stays fully
  deterministic. The overnight reset is honored by the fact that a fresh
  visit always opens on the uncounted census.

## Study-wide rule

No readable English anywhere on screen. The ledger's "numbers" are seeded
pseudo-glyphs — bars, ticks, chevrons, arcs, dot pairs, diagonals-with-dots —
never digits, never letterforms, never real data. The only text in the file
is the `<title>`.

## Adaptations (all documented, none silent)

- **Canvas 2D throughout.** No offscreen canvas, no gradients, no shadowBlur,
  no Path2D, no `document.createElement`. Shadows are flat-alpha ellipses;
  shading is flat fills.
- **Audio is gesture-gated.** Tones sound only through lazily created,
  typeof-guarded WebAudio inside the tap gesture. There is no autoplay, no
  microphone, no `getUserMedia` anywhere.
- **Determinism.** Frame one is drawn synchronously at exactly t = 0 via a
  boot flag; the clock starts only with the rAF loop (a plain function
  declaration behind a `typeof` guard). All randomness comes from mulberry32
  streams (seed 1359000 + cell index × 7919), never `Math.random`.
- **Viewport.** Canvas size comes from the Visual Viewport API with resize
  listeners on `visualViewport` and `window`, never `window.innerWidth`
  alone. The canvas is pinned in `draw()` with `style.width/height` in px.
  Phone detection uses `window.screen` physical size (min dimension
  < 700 px) with aspect `h > w*1.15` as fallback; the field composition
  goes full-bleed on phones.
- **Interaction rule.** Drag counts, tap tones, never click-to-reload.

## QA

- Rendered with `~/workspace/tools/render-piece.js` at 1280×900, 390×844,
  and 720×720; all three inspected. Frame one shows the full uncounted
  ledger: invented glyph marks plus tally strokes in every cell, generous
  margins on desktop, full-bleed on phones.
- Thumb renders byte-identical across repeated renders and matches the
  shipped thumb.
- Probe harness (the piece's own pointer listeners, stubbed rAF driven by
  hand): a drag across row 1 changed 29,297 pixels, confined exactly to
  that row's band, while an untouched row differed by 0 pixels; the dragged
  row shows 8 distinct clay units (bead, whistle, fist, shard, bowls,
  ring) hovering on shadows with glyphs faded out. A tap changed 0 pixels
  and did not crash in an audio-less context (AudioContext is undefined
  under node-canvas, and the tone path returns silently).
- One post-QA fix: the ring and knot units first stroked in ink black,
  which read off-palette; both now stroke in dark clay (#7d6f5c). Thumb
  re-rendered and probes re-run after the fix; all checks pass.
- Token scan: no `Math.random`, `createElement`, `getUserMedia`, `Path2D`,
  `shadowBlur`, or gradients. The only `AudioContext` mention is the
  typeof-guarded lazy creation inside the tap handler.
