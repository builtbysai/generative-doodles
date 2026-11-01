# №1493 "Credits Without Hierarchy" (nadja-ringart NR6, PP740)

## Prompt
A dark field. A credit list appears as rows of abstract name-shapes: each row
is a full flowing line-signature followed by a shorter, heavier block-shape
(the surname). One by one, the block-shapes drop off the rows like leaves and
dissolve, leaving only the flowing first-name signatures, which then drift
upward and float across the frame. Rows appear, surname blocks drop and
dissolve one row at a time, signatures float free, then the loop restarts
with new rows. Dragging downward over the field slows the shedding (blocks
linger and wobble before dropping); releasing resumes the shed. Drag never
freezes a signature into a title card, never restores a dropped surname,
never adds a role or job title.

## Build
- Field deep charcoal #2a2a30. Five rows stacked in the center. Each row: a
  flowing line-signature (25-point seeded two-sine polyline) in cream
  #e8e0d0, gold #d9a441, teal #2e6f6a, or brick #a8674a, cycling with the
  fifth row repeating cream, followed by a shorter, heavier surname block
  in charcoal-grey #55565e. Every signature uses the same stroke width:
  no hierarchy among the signatures.
- Signatures are pure flowing polylines with no letterforms. The study's
  "first names only" allowance applies here exactly as it did in IW3
  (№1482): flowing line-signatures only, never readable names. No text
  anywhere except `<title>`.
- 48 s loop, all state from loop-local time (shedT % 48), so the loop
  closes exactly (the №1482 lesson, applied from the start):
  - Rows shed one at a time at 2, 7, 12, 17, 22 s. Each block drops over
    1.5 s: falls with a quadratic ease, sways sideways, and fades out
    over the last 60% of the drop. After the drop the block is gone
    for good.
  - Once freed, a signature rises toward a bounded asymptote
    (0.16H * (1 - exp(-elapsed/8))) so freed signatures stay on the
    field, with a gentle bob (12 s period) and horizontal sway (24 s
    period); both periods divide the 48 s loop.
  - Over the last 4 s (44-48) the signatures fade out, so the loop
    restarts with fresh rows at t = 48 = t = 0.
- Drag: any pointerdown starts tracking; a downward move (dy > 20 px)
  switches the shed timeline to rate 0.3, so blocks linger and wobble
  (sin wobble while the slow segment is active) before dropping.
  Releasing resumes the shed from the slowed position via a closed-form
  integral over recorded rate segments. An upward drag does not slow.
  Drag never freezes a signature into a title card, never restores a
  dropped surname, never adds a role or job title. Never click-to-reload.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
  Fading alphas are rounded to 4 decimals before stringifying
  (node-canvas scientific-notation quirk); dots drawn as filled rects or
  own-beginPath arcs with moveTo first.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  decoration from mulberry32 (seed 1493000 + row index * 7919), never
  Math.random (the single grep hit is the code comment stating this).
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection
  via window.screen physical size with aspect fallback; centered
  composition keeps its shape, page ground takes the field color.

## QA
Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
byte-identical across repeated renders. Frame one: dark field, five rows
stacked in the center, each a flowing line-signature followed by a
charcoal-grey surname block; no clipping at either size; no text.

Forced-time probe (vm-isolated instance, real node-canvas, piece driven
via window.__piece, tmp/probe1493.js):
- t = 0 redraw 0 px; t = 48 vs t = 0 = 0 px; t = 96 vs t = 0 = 0 px;
  fresh instance t = 0 identical (loop closes exactly).
- Block px t = 0/4/10/24/30: 35600 / 28480 / 21360 / 0 / 0 (five blocks
  of 7120 px each, shed one row at a time, all gone by t = 24).
- Signature px persist through the drift (t = 0/10/40 all four colors
  present); signature centroid y falls 426.9 -> 379.3 -> 312.8
  (drifting upward); signature px at t = 47 = 0 (fade-out), back at
  t = 48.
- Down-drag t = 2-10: block px at t = 10 = 28480 vs 21360 undragged
  (shedding slowed, only row 0 shed); dragged frame differs 24947 px;
  wobble visible during the drag (8139 px between t = 10 and t = 10.4);
  post-release t = 20 block px 14240 vs 7120 undragged (behind
  schedule, not reset); a dropped block never returns.
- Up-drag at t = 10: block px 21360, equal to undragged (upward drag
  does not slow the shed).
- Token scan clean (the single "Math.random" hit is the code comment).

## Fix rounds
None needed.
