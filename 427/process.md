# №1376 "Stereograph Rupture" (adam-piron AP1, PP599)

## What it is

A weathered archival plate rendered twice side by side with a center gap,
like Muybridge's Modoc War stereograph card. The two near-identical frames
sit in the middle band with a center gutter; an ornate bordered caption strip
runs along the bottom edge. Every 9 seconds the plates fracture along the
split into displaced shards that grind back together. Dragging across the
canvas scrubs the rupture phase.

## Palette and composition

- Sepia plate #c9a25f, yellow ochre border #e0a92e, aged paper #d8c194,
  dark umber #3d2c1e, near-black field #0d0b08.
- Each plate: aged-paper ground (pre-blended with the sepia wash as flat
  #d3b681), a seeded dark-umber ridge silhouette, four standing figure
  silhouettes, a low structure, a pole, and sky speckles. The right plate
  renders the same scene with a fixed 6 px parallax shift.
- Ornate border: double ochre frame with corner blocks, drawn unfractured
  on top of the shards.
- Caption strip: aged-paper bar with a double ochre border carrying a row
  of seeded pseudo-script glyphs (open spirals, hooks, chevron pairs, dot
  trails, ticks, waves). No readable words anywhere; no visible text except
  `<title>`.

## Motion

- Rupture envelope: 9 s cycle, fast attack (0 to full over 0.8 s) then
  exponential grind back toward zero. Shard displacement up to 14 px,
  stronger near the gutter, radiating outward from it; fracture seams
  (dark lines from the gutter) fade in with the envelope.
- Fracture cells: 5 x 4 Voronoi-ish grid per plate, each cell with a seeded
  displacement vector; cells are drawn by clipping the full scene to the
  cell rect and translating, as closed-form functions of piece time.
- Drag: recorded drag samples add a phase offset (0.006 s per px) that
  decays exponentially (tau 4 s), so a scrub shifts the rupture and the
  loop resumes. No buttons, no reload.

## Adaptations (from the prompt's technical notes)

- The prompt's "low audio-rate signal (noise + slow LFO through WebAudio)"
  is replaced by a closed-form LFO envelope: the piece ships fully silent,
  with no AudioContext at all. The rupture is driven by the envelope, not
  by sound.
- Grain is seeded dots keyed by (dot, quantized 0.25 s time index), never
  per-frame noise, so frame one is reproducible.
- No offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  createElement, no getUserMedia. Vignette edges are flat-alpha bands.
- Canvas 2D throughout; the prompt's WebGL/shader option was not used.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; the centered composition keeps its
  shape on phones, the page ground takes the piece's own near-black, and
  the layout was checked at 390 wide.
- Determinism: frame one = draw(0) via a boot flag; the clock starts only
  with the rAF loop. All randomness from mulberry32 (seed 1376000 +
  index*7919), never Math.random. The rAF loop is a plain function
  declaration behind a typeof guard.

## QA

- Rendered with node-canvas at 1280x900, 390x844, 720x720; all three
  inspected. Thumb byte-identical across repeated renders.
- Probe harness (stubbed rAF driving the piece's own loop, pointer events
  to its own listeners, 1280x900):
  - Frame one: both plate centers exactly paper (211,182,129), gutter
    near-black (13,11,8).
  - Rupture attack: t=0 vs t=0.4 differ in 20,964 px (shards displace).
  - Cycle closes: t=0 vs t=8.9 differ in 53 px (grain dots only — shards
    ground back together).
  - Drag scrub: a 300 px drag at t=2.0 changes 14,385 px at t=2.1 versus
    the undragged render.
- Fix rounds (3): (1) translucent per-cell fills doubled up at cell
  boundaries, showing a grid — all scene fills made opaque with
  pre-blended colors; (2) two glyph shapes read as closed "0" rings —
  replaced with an open spiral tail and a wave line; (3) fractional clip
  rects antialiased at cell columns, blending ridge with paper — cell
  clips snapped to integer pixel boundaries. All renders re-done after
  each fix.
