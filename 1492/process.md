# №1492 "The Song, Revoiced" — nadja-ringart NR5 (PP739)

## What it is

A single voice-line, a flowing gold polyline like a sung melody, travels left to
right across a deep charcoal field. At the field's midpoint, marked by a thin
vertical cream seam, the line changes: its color shifts from gold to scarlet and
its stroke thickens, but its melody-shape stays exactly the same. A small
abstract singer-figure stands at each side of the seam, still, facing the line.
Watch-first, handover loop: the line draws itself from the left, crosses the
seam, exits right, then the loop restarts.

This prompt revisits the prior study's voice-line crossing by its own design,
kept distinct: here the line changes color and weight at a seam while its shape
stays exactly the same; the prior study's line (IW1) was unchanged across two
rooms.

## Palette (NR5 only, no other color)

- Field deep charcoal `#2a2a30`
- First voice gold `#d9a441`
- Revoiced line scarlet `#c1272d`
- Seam cream `#e8e0d0`
- Figures' clothes `#4a5a7a` (blue, left) and `#6b4a3a` (brown, right)
- Singer heads use the seam cream (a palette color); eyes use the field color

## Composition

- Field full frame; seam at the vertical center, full height, 2 px wide
  (scaled slightly with width)
- Melody-line crosses at the vertical center (base y = 0.45H, seeded sine
  undulation around it)
- One singer-figure at each side, small, at the lower corners (0.12W / 0.88W,
  0.80H): torso rect, cream head disc, dot eye offset toward the center so
  each figure faces the line. Figures never move.

## Motion (24 s loop, all loop-local time)

- 0–16 s: the line draws itself left to right (draw-progress 0 → 1)
- 16–18 s: full line held
- 18–24 s: the whole line translates right off the frame (exit), so at t = 24
  the frame is exactly frame one again
- Dragging sideways speeds or slows travel: drag rate =
  clamp(1 + dx/150, 0.25, 3), applied as a closed-form integral of rate over
  recorded drag segments. Release restores rate 1 and travel continues from
  the dragged position. Drag never changes the melody-shape, never moves the
  seam, never swaps the singers. Never click-to-reload.

## Technical

- Melody as one fixed 49-point polyline literal (seeded sine undulation,
  mulberry32 seed 1492000), never mutated; draw-progress reveals it.
- Seam split: the polyline is split at the seam into a gold thin stroke
  (width max(2, 0.004W)) and a scarlet thick stroke (1.8x). Every point is
  assigned to its side; a point exactly on the seam goes to both lists, and a
  straddling segment contributes its interpolated crossing point to both, so
  neither stroke has a gap at the seam. During exit the split stays at the
  seam (a spatial property of the revoicing), so the line's shape is
  translation-only throughout.
- Frame one = draw(0) via a boot flag; the rAF loop (plain function
  declaration behind a typeof guard) starts the clock only after load.
- Every animation value derives from loop-local time (effective time modulo
  24), so the loop closes exactly — the №1482 lesson applied preemptively.
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
  Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; field-like composition goes full-bleed
  on phones.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. No fading
  alphas at all (every fill opaque). Dots as own-beginPath arcs with moveTo
  first (node-canvas quirks). No visible text except `<title>`.

## Verification (forced-time probe, tmp/probe1492.js; vm-isolated instance,
real node-canvas, piece driven via window.__piece)

- t = 0 redraw 0 px; t = 24 vs t = 0 = 0 px; t = 48 vs t = 0 = 0 px; fresh
  instance t = 0 identical (loop closes exactly, twice over)
- t = 8 (mid-draw, p = 0.5): gold 2657 px left of seam, 6 px right (round cap
  at the seam tip), scarlet 0 — line just reaching the seam
- t = 12 (p = 0.75): gold 2636 px left, 0 right; scarlet 25 px left (thick
  round cap spilling over the seam) / 2792 px right — color and weight
  changed at the seam, shape continuing
- t = 17 (hold, full line): gold 2636 px left, 0 right; scarlet 25 / 5425 —
  same left gold as t = 12, confirming the split is stable
- t = 22 (exit): gold 0, scarlet 0 left / 2485 right — line slid right, split
  still at the seam
- Shape invariance: partial-line gold pixels at t = 8 vs full-line gold at
  t = 17 differ by only 27 px in a 6x4 px blob at the seam tip (x 635–641,
  y 482–486) — the gold tip cap being overpainted by the scarlet thick
  stroke's cap once the line crosses, by design; the shape itself is
  unchanged
- Seam cream pixels stable across t = 0/12/22 (3030 / 3008 / 3030; the small
  dip at t = 12 is the line crossing over the seam)
- Drag: at t = 6, gold 1995 px undragged vs 2636 px after a +300 px drag
  (ahead) vs 1511 px after a −150 px drag (behind); dragged frames differ
  from undragged by 3060 / 749 px; after release at t = 6, the t = 8 frame
  differs from undragged t = 8 by 3673 px — travel continues from the dragged
  position, never jumps back
- Rendered at 1280x900, 390x844, 720x720 and inspected: desktop and mobile
  frame one show the dark field, cream seam, and two still singers at the
  lower corners with no clipping; a mid-loop render at t = 12 (tmp/midloop.png)
  shows the thin gold melody flowing from the left, becoming the thicker
  scarlet line at the seam with the identical flowing shape
- Thumb byte-identical across repeated renders

## Fix rounds (1, seam split)

The first build's seam-split loop pushed each segment's start point into one
list only, so a polyline point landing exactly on the seam (path x = 0.50W)
was assigned to the scarlet list alone and the gold stroke stopped one point
short of the seam — the partial-vs-full gold comparison showed 107 px
outside in a 26x8 px box at the seam. Rewrote the split as a per-point
assignment (point on the seam goes to both lists; straddling segments
contribute their interpolated crossing to both). Re-verified: outside pixels
down to the 27 px tip-cap blob above, gold left identical at t = 12 and
t = 17, thumb byte-identical. The drag probe's first run also released the
drag at the same instant it moved, so no time elapsed at the new rate; the
probe was corrected to hold the drag open across the measured interval (the
piece code was correct).
