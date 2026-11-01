# №1497 "Process Time" (claire-atherton CA2, PP744)

## Frame one (t = 0, verified at 1280x900, 390x844, 720x720)

Split frame, equal halves. Left: warm cream #e8e0d0 ground, walnut bench band
across the lower third, three silver-grey film strips hanging in loops from the
top (each strip curls back up at the bottom), two silver-grey reels with walnut
spokes on the bench, large skin-tone winding hands above the reels, silver-grey
dust motes drifting. Right: cold grey #55565e ground, walnut bench band, a
small scarlet cursor at its home spot (no windows yet — the first click lands
at 0.8 s). A thin gold thread crosses the seam at mid-height, slightly wavy.
No visible text except `<title>`.

## Mechanics (all closed-form over loop-local time and recorded drags)

- 24 s loop. Left side: slow sine-driven winding — reels turn one full
  revolution per loop, hands rock on a 12 s sine, strips sway on 12 s / 8 s
  sines, dust motes drift on 24 s / 12 s / 8 s periods. Every period divides
  24, so the left side closes exactly.
- Right side: a click counter with an accelerating interval (1.4 s shrinking
  by 0.82 per click to a 0.18 s floor) and a stall threshold — 75 clicks from
  0.8 s to 17.821 s, then a stall from 18 s to the loop boundary, which is the
  reset. Each click opens a silver-grey window (walnut frame) at a seeded
  position; windows stack newest-on-top (max 6 alive, 2.5 s life, fading over
  the last 0.5 s), then vanish. The cursor jumps to the most recent click's
  window centre and blinks at 3 Hz while active, sits steady during the stall.
- Gold thread: a wavy polyline at mid-height, 12 s wave period, crossing the
  seam.
- Drag: a pointerdown on the right half starts a drag; downward movement maps
  to a rate clamp(1 - dy/600, 0.25, 1) applied to the right bench's clock as a
  closed-form integral over recorded rate segments, so dragging downward
  slows the clicking toward the left bench's pace and release resumes the
  speedup from the slowed position. Drags starting on the left half are
  ignored. Drag never stops the left bench, never deletes the right bench,
  never merges the two benches. Never click-to-reload.

## Adaptations

- Left loop as a slow sine-driven winding animation; right loop as a click
  counter with accelerating interval and a stall threshold; drag maps pointer
  y to the right bench's interval multiplier — all as specced.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. Fading
  window alphas are rounded to 4 decimals; dots are filled rects; arcs use
  their own beginPath with moveTo first (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all decoration
  from mulberry32 (seed 1497000; window positions from 1497000 + index*7919),
  never Math.random. Loop-closure discipline (the №1482 lesson, applied from
  the start): every sine runs on loop-local time, never absolute piece time.
- The script is wrapped in an IIFE and never declares top-level W/H (the
  №1467 lesson: the QA renderer's own const W/H collide with piece globals).

## Verification (forced-time probe, tmp/probe1497.js, vm-isolated, real node-canvas)

- t = 0 redraw 0 px; fresh instance t = 0 identical; t = 24 vs t = 0 = 0 px;
  t = 48 vs t = 0 = 0 px (loop closes exactly, twice over).
- Alive: t = 0 vs t = 6 differs by 119,363 px; left-half diff 18,397 px.
- Click schedule accelerates: 9 clicks by 6 s, 42 by 12 s, 75 by 18 s; intervals
  1.148 s -> 0.519 s -> 0.180 s; last click 17.821 s.
- Windows: right-half silver px 33,594 at t = 2, 76,897 at t = 10 (stacked),
  0 at t = 23 (stall tail, all vanished).
- Cursor: 117 scarlet px at frame one; gold thread 1,282 px at frame one.
- Drag: downward drag on the right bench (dy = 300 from t = 4) gives effT(6)
  = 5 (rate 0.5 from the move) and effT(10) = 9 after release at t = 6 — the
  right clock slows and resumes from the slowed position; left half of the
  dragged t = 6 frame equals the undragged t = 6 frame exactly (0 px);
  left-bench drag leaves effT(6) = 6 (ignored).
- Token scan clean: no fillText, AudioContext, getUserMedia, createElement,
  Path2D, gradients, shadowBlur, or Math.random.
- Thumb byte-identical across repeated renders, including a final re-verify.

## Fix rounds

None needed. One in-build correction before QA renders: window frames now fade
with the same alpha as their fill (an opaque frame on a fading window would
have popped out at the end of the window's life).
