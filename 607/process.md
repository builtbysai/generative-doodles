# No.607 "White on White"

EXPANSION #73 paz-tamburrini, prompt block 7 "Pieles del Papel".

## Concept

Her "Papel en escala de blancos" as a slow relief landscape: a near-monochrome
field of white paper relief, readable only through shadow. Rolling embossed
dunes flow diagonally across a horizonless, full-bleed sheet; three incised
line rivers are carved through the field; exactly three sharp cut slits are
the only hard events, each revealing the warm deep shadow under the sheet.
Watch-only. No input of any kind, no hint text. The light breathes on a
roughly 60 second cycle and the relief appears and dissolves as it moves.

Palette, strict and complete: paper white #F7F4EC, warm shadow #CFC4B0,
deep slit shadow #8A7A64. No accent anywhere.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Height field: analytic dune function in unit space. Two sine ridges run
  diagonally (height varies fastest along the NE-SW diagonal, warped by
  seeded value-noise fbm) plus a low fbm swell. Rivers are three seeded
  quadratic curves; the height is carved by a Gaussian channel
  (sigma 0.021 in unit space) along the distance to each curve, the curves
  sampled at 241 points so the channel is continuous.
- Shading grid: the height field is sampled on a grid of 210 columns across
  the long dimension on desktop (150 on phones), rows following the aspect;
  at 1280x900 that is 210x148 cells of about 6 px. Each frame, slopes are
  taken by central differences over the grid and each cell is filled with
  one of 64 precomputed steps lerped between the paper white and the warm
  shadow, chosen by how the slope faces the current light vector, with a
  0.30 ambient so flat paper stays at paper white. Cells are drawn with a
  0.6 px overlap so no seams or facet edges appear; adjacent cells share
  the smooth height function, so the sheet reads as one continuous surface.
- Slits: three fixed tapered lens shapes. Each is drawn three times: a warm
  shadow underlay offset away from the light, a paper-white lip offset
  toward the light, then the deep slit shadow core.
- Grain: 2,600 seeded speckle points (mulberry32), drawn directly each
  frame in the two shadow tones at low alpha. No image data, no offscreen
  canvas, no filters.
- Light and determinism: frame one is drawn synchronously at phase 0, a
  fixed low raking angle from the upper left. The loop is anchored as
  elapsed-since-load over a 60,000 ms breath (azimuth swings about 0.55 rad,
  elevation component eases in counterphase). Nothing is derived from the
  wall clock; the animation start is the first rAF timestamp. rAF is
  typeof-guarded, so under the QA renderer only the synchronous frame one
  is drawn.
- Sizing: canvas follows the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height are pinned in
  px inside draw() on every frame. Phone detection uses window.screen
  physical size (min dimension < 700) with the h > w*1.15 aspect fallback;
  phones get the coarser 150-column grid, purely a performance choice, the
  composition is full-bleed at every size. Page ground is the paper white.
- No pointer, touch, keyboard, or wheel handlers are registered at all.
  No audio, no microphone.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Repeated after the fix round below: identical again. The
  second render was deleted both times.
- First pass defects, fixed and re-rendered:
  - Rivers sampled at only 41 points with a narrow carve read as dashed,
    zipper-like perforated tracks instead of incised channels. Fixed by
    sampling each curve at 241 points, widening the channel sigma to
    0.021, and switching slopes to central differences.
  - The 150-column grid showed as a soft mosaic in flat areas. Raised to
    210 columns on desktop (150 on phones); the sheet now reads as one
    continuous surface with no visible facet grid.
- Final read-back, all three sizes: one continuous white sheet, dunes and
  three river channels reading through shadow only, exactly three slits as
  hard events with lit paper lips, fine grain throughout, nothing clipped
  on mobile, no text anywhere.
- Deviations: none from the prompt. The prompt's technical note suggests
  precomputing height and shading per frame, which is exactly what the
  grid does (grid resolution 210x148 desktop, 150 across on phones, as
  recorded above).
