# №1380 "Crime Scene Plate" (adam-piron AP5, PP603)

A forensic spread of archival plates laid like evidence photos on a near-black
table. Five plates in a loose, slightly rotated grid, each tagged with a
label card overlapping its bottom-right corner, red string lines connecting
pin points between plates across the table.

## What is on screen

- Five plates, each a framed procedural mini-scene: a sepia stereograph pair
  (ridge lines, sun dots, figure marks), a tree-burn panel (dark trunk and
  branches, embers rising), a dot-matrix ticker fragment (scrolling orange
  glyph rows), a logarithmic spiral with glyph stamps (mission teal and rust),
  and a hunter's-moon red street scene with blue cipher glyphs.
- Label cards carry rows of pseudo-script glyphs only — bars, chevrons, dot
  pairs, arcs, triangles, crosses, zigzags, loops — never letters, never
  readable words. The only text anywhere is the `<title>`.
- Six red strings connect the plates pin-to-pin (0–1, 1–2, 0–3, 3–4, 2–4,
  1–4), with small red pins on both top corners of every plate.

## Motion (all closed-form functions of piece time and recorded events)

- Hovering witness camera: a slow drift, `sin(t·0.05)·12` horizontally and
  `cos(t·0.04)·9` vertically, applied to the whole scene.
- Lift and resettle: each plate lifts on a staggered 24 s cycle (phases 0,
  0.21, 0.47, 0.68, 0.86), rising up to 10 px with a slight scale-up and a
  flat-alpha offset shadow, then settling back over a 4.3 s window.
- Ticker rows scroll at three speeds; embers rise at seeded speeds and wrap;
  the spiral is a static logarithmic field with stamped glyphs.
- Dragging a plate moves it (it stays where dropped) and re-routes its
  strings; on release, attached strings carry a decaying wobble
  (`14·exp(−dt/1.4)·sin(7·dt)`) for up to 6 s. No frame-integrated physics
  anywhere; strings are quadratic curves with a sag plus that wobble term.

## Adaptations

- No WebAudio, no audio at all: the prompt specs no sound for this piece.
- No offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  `createElement`, no `getUserMedia`, no `fillText`/`strokeText` (glyphs are
  drawn shapes, so no readable text can leak in).
- Grain/embers are seeded, closed-form positions, not per-frame noise.
- Determinism: frame one is `draw(0)` via a boot flag; the rAF loop is a
  plain function declaration behind a `typeof` guard, and the clock starts
  only with the loop. All randomness comes from mulberry32 seeded
  1380000 (+ per-element offsets), never `Math.random`.
- Viewport from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas pinned in `draw()`; phone detection via
  `window.screen` physical size (min dimension < 700 px) with the aspect
  fallback. Desktop uses a spread 5-plate layout; portrait phones use a
  stacked layout with the same centered composition and no clipping.
- Interaction: drag a plate to re-route its strings; never click-to-reload,
  no buttons.

## QA

- Rendered with `render-piece.js` at 1280×900, 390×844, and 720×720; all
  three inspected. Desktop and mobile both show five plates, label cards,
  pins, and strings with no clipping.
- Thumb byte-identical across repeated renders, including after the final
  pin fix (see below).
- Probe harness driving the piece's own rAF loop at forced timestamps and
  its own pointer listeners: t=0 vs t=2 differs in 92,963 px (lift + drift),
  t=0 vs t=12 in 139,647 px (drift + ticker + embers), and a (+80,+40) drag
  of plate 0 at t=5 differs from undragged at t=5 in 95,586 px with red
  string pixels present in both (14,897 → 15,061 after the drag).
- One fix round: strings originally attached to top-right corners that had
  no pins — pins are now drawn on both top corners of every plate, and all
  renders were re-done after the fix.
- Token scan clean except one comment stating `Math.random` is never used.
