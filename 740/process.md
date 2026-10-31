# No.740 Walden Rope

EXPANSION #90 spencer-finch, prompt block 5 "Walden Rope" (verified verbatim from TASKS.md).
After Thoreau's 700 Walden Pond soundings, re-enacted by Finch as a rope of tagged depths.

## Concept

A single hemp rope spans the full frame on dark water-black ground, sagging like a
sounding line. Paper tags hang from it on short strings, each carrying a hand-wobbled
watercolor swatch in one of four water-greens and a tiny depth figure. The swatch tone
darkens with the tag's depth. A readout at top-left gives the current center depth and
the Walden coordinates. There is no pond scene: the rope and its tags are the whole piece.

Interaction: drag vertically to work the line. Dragging down lowers the sounding line
(center depth toward 30 m), the rope's sag deepens, the tags' depth figures rise, and the
tag stream advances: fresh tags fade in at the leading (right) edge while the oldest tag
at the trailing (left) edge fades and drops away. Release and the line eases back to its
rest depth of 11.3 m. Idle, every tag sways gently on its own seeded pendulum phase.
Never click-to-reload; there is no reseed gesture.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio.
- Palette strict: ground #0C1210, rope hemp #8A6F4D, tag paper #EFE9D8, tag ink #2B2B28,
  swatch ramp (light to dark) #6B8A7D, #587A6B, #3E6B5E, #2E4F48. No gradients, no glow.
- Sizing from the Visual Viewport API, with resize listeners on visualViewport and on
  window. Canvas style width/height pinned in px inside draw() every frame. Phone
  detection via window.screen (min dimension < 700 px) with aspect fallback (h > w*1.15).
- Rope: one smooth parabola across the whole span, y = anchor + sag * (1 - (2u-1)^2),
  zero slope at midspan, drawn as two parallel hemp strokes. Anchors sit at 24% of frame
  height; sag runs from 5% of height at the surface to 22% at 30 m depth.
- Catenary/drag depth model: depth is a recorded control, not a simulation. A vertical
  pointer drag sets a target (drag-start depth plus drag distance mapped over the frame
  height onto 0..30 m, clamped); the live depth eases toward the target at a fixed rate
  from the rAF clock. On release the target returns to the 11.3 m rest depth, so the rope
  rises and the sag relaxes on its own. The rope curve, the readout, every tag's depth
  figure and swatch tone are all pure functions of the current eased depth.
- Tag stream: tags are an unbounded seeded sequence indexed by integer k. Each tag's
  attributes (slot jitter, sway phase/amplitude/speed, string length factor, own sounding
  depth, swatch jitter roll, eight swatch-corner wobble values) come from mulberry32
  seeded by k, so a tag is identical whenever it appears. A window offset, in tag units,
  advances by 0.35 tags per metre of depth travel: lowering the line brings new tags in
  at the right edge and retires them at the left; raising reverses the stream. The leaving
  slot fades and drops as the offset's fractional part crosses it; at rest the offset is a
  whole number and every visible tag is fully present. Visible count: 40 on desktop, 26 on
  square-ish frames under 950 px wide, 24 on phones (alive count never exceeds 42 drawn
  slots, under the ~50 cap). A tag's displayed depth is its own seeded sounding shifted by
  (current depth minus rest depth), clamped to 0..30 m; its swatch tone is the ramp entry
  for that depth, with a rare one-step jitter.
- Swatches are drawn as quadrilaterals whose four corners are individually jittered from
  the tag's seed: hand-wobbled squares, never clean chips.
- Sway: each tag rotates about its rope anchor by a seeded two-sine pendulum sum.
- Determinism: frame one is the synchronous draw(0) at load, fixed phase, rest depth,
  window offset 0. No Date.now, no Math.random anywhere; the rAF loop, when present, is
  anchored to elapsed time since load and typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas) from the actual
  script at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared identical, before and
  after the fix round below. Duplicate render deleted.
- Read-back, desktop: smooth sagging double rope across the full width; 40 paper tags on
  strings, each with a wobbled green swatch and a one-line depth figure ("12.9 m",
  "23.3 m"); readout top-left reads DEPTH 11.3 M and the coordinates. Thumb: same
  composition at 26 tags. Mobile: 24 smaller tags on the tall frame, rope full width,
  readout intact, nothing clipped except the deliberate partial tags at the frame edges
  where the rope runs offscreen.
- Fix round during QA: the first build drew the rope as two half-beziers that met in a
  sharp V at midspan, tags overlapped because tag width was set from frame width rather
  than slot width, and the depth unit sat on a second line that neighbouring tags hid.
  Rope replaced with the single parabola, tag width derived from slot width with reduced
  counts on square/phone frames, depth figure set on one line, and the edge fade reworked
  so no tag sits half-faded at rest. All renders redone and byte-compare re-run.

## Deviations

- The prompt's catenary is drawn as a parabola through the drag-controlled sag rather
  than a solved cosh catenary: at these sag ratios the curves are visually identical, and
  the parabola keeps the midpoint depth mapping exact and closed-form.
- Coordinates in the readout are Walden Pond's, held fixed with a sub-arcsecond seeded
  drift from the sway clock; the prompt asks for coordinates on the tags' readout but
  fixes no values, and a surveyed point should not wander.
- Phone and square frames show fewer tags (24/26 instead of 40) so each tag and its depth
  figure stay legible; the stream mechanism and the offscreen continuation are unchanged.
