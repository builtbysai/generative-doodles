# №1365 "Report: Limitations" — raven-chacon RC6 (PP588)

A self-imposed-constraint piece after Chacon's *Report* (2001): one pitch, one
timbre, fixed volume — only time varies. A 3:48 loop of near-static video grain
with a single unwavering tone; the printed 10-page score is visible as faint
page-flashes.

## Frame one

Full-bleed grain field in video-static grays (#3A3A3A–#777777, 8 px blocks
with rare darker/lighter specks). Centered, a faint paper panel (#E4E0D6) —
page 1 of the 10-page score — covered in a 8×5 grid of invented pseudo-script
glyphs (bars, chevrons, arcs, dot pairs, zigzags, 3×3 dot grids, triangles,
crosses, circle-dots, dash rows). A thin signal-red (#D43A2F) scan-line stands
at the left edge. No readable text anywhere except `<title>`.

## Motion and structure

- **Loop:** 228 s (3:48). Grain is a seeded function of (block, quantized
  0.5 s time index): the same quantum always paints the same field, so the
  static shimmers slowly and reproducibly, never per-frame random.
- **Scan-line:** a 2 px vertical red line whose x position is
  (elapsed / 228) × width. It is a line, not a progress bar: no track, no
  percentage, no fill.
- **Page-flashes:** one page of the 10-page score per 22.8 s slot, fading in
  over 0.6 s, holding to 2.2 s, fading out by 3.2 s, at 0.30 alpha. The clock
  is phase-shifted +1.2 s so frame one already shows page 1 mid-flash.
- **Touch (anti-interaction by design):** a pointerdown records a touch flash
  — a score page revealed momentarily at the touch point (420×280 max, fading
  over 2.5 s, capped at the last 8). It is an overlay only: it changes nothing
  else, rewards nothing, and never controls the clock, the grain, or the
  scan-line. The piece raises more questions than it resolves.

## Adaptations

- **Silence:** the prompt's single unwavering tone is refused as autonomous
  audio under the house no-autoplay rule. The piece ships fully silent — no
  AudioContext exists in it at all — and the tone's structure is carried
  visually by the scan-line and the page-flashes.
- **Grain:** seeded block function (mulberry32 over block index + time
  quantum), never per-frame random; no offscreen canvas, no gradients, no
  shadowBlur, no Path2D, no createElement.
- **Glyphs:** every glyph drawn on its own path (beginPath per glyph), per
  the node-canvas batched-arc quirk; page-flash and touch glyphs are invented
  pseudo-script only, never readable words, never device-locale readings.
- **Determinism:** synchronous first frame at a constant phase via a boot
  flag (frame one = draw(0)); the clock starts only with the rAF loop, which
  is a plain function declaration behind a typeof guard. All randomness from
  mulberry32 (seed 1365000 + index·7919), never Math.random.
- **Viewport and phones:** size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw(); phone
  detection via window.screen physical size with aspect fallback; field-like
  composition goes full-bleed on phones.

## Verification

- Rendered with node-canvas at 1280×900, 390×844, and 720×720; all three
  inspected. Desktop and mobile both show the full-bleed grain, the faint
  centered score page, and the red scan-line at the left edge; mobile has no
  clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listener): scan-line column tracks elapsed time
  exactly (t=22 s → x=123, full 900 px column; t=23 s → x=129, as
  (t/228)×1280 predicts); touch vs no-touch at t=23 s differs in 117,491 px
  confined exactly to the touch panel bbox (x430–849, y310–589) — grain,
  clock page-flash, and scan-line identical, proving the touch changes
  nothing else.
- Token scan clean: no AudioContext, no getUserMedia, no gradients,
  no shadowBlur, no Path2D, no createElement, no Math.random.
