# No.502 Portrait Inset

EXPANSION #60 giulia-tassi, prompt GT6. Her Nino Bibbia device: a winter
scene split by a diagonal, with a circular portrait-inset on dotted
mustard ground overlapping both halves.

## Concept

A square stage is split by a seeded diagonal (44 degrees for this seed)
into a white top half and a turquoise bottom half, the two polygons
sharing the edge with no seam stroke. The white half carries a navy
village silhouette with a kid sledding in front of the houses; the
turquoise half carries a prone skeleton-style slider among rain dashes
and a mustard medal glyph in the lower half. Centred on the diagonal
itself sits the portrait inset: a mustard disc, 25 percent of the stage
width, with a shimmering white dot field and a tight face built from her
grammar (flat hair block, 2-arc eyes, L-line nose, short-curve smile,
dot-cluster beard). A stroke-only invented name block, NILO BRANDT, runs
vertically along the right edge. Snow dashes drift down across the whole
stage and wrap.

Interaction is drag: the inset is spring-anchored at the diagonal
centre. Dragging pulls it off-centre (clamped so it never leaves the
stage), the face's pupils track the drag point while it is displaced,
and on release it swings back with damped oscillation. Idle is
watch-only: snow drifts, the slider glides a few pixels side to side,
the dot field shimmers. A single subtle lowercase "drag" hint sits in
the bottom-left corner.

## Construction

Single self-contained index.html, 2D canvas, no external assets.
Everything seeded with mulberry32 (seed 50260): diagonal angle, beard
on/off, snow and rain dash layouts, beard dot cluster. The halves are
built by Sutherland-Hodgman clipping of the unit square against the
diagonal half-plane; each mini scene is drawn clipped to its own half
so nothing crosses the split. The stage is the centred square of the
viewport (composition keeps its shape on phones; page ground is white),
sized from the Visual Viewport API with resize listeners on both
visualViewport and window, and the canvas style is pinned in px inside
draw(). Phone detection uses window.screen physical size with the
aspect fallback, per house rules.

The inset face: skin disc over the dot field (so no dots land on the
face), hair as a filled arc segment with a shallow fringe curve, eye
arcs with pupil dots offset toward the drag vector or the spring
displacement, capped at a small radius. Spring integration runs only
inside the rAF loop (underdamped, k=110, c=10.5); drag sets position
directly and seeds release velocity from the drag motion.

Determinism: the first frame is drawn synchronously at t=0 with the
inset exactly at its anchor and all dash offsets fixed; the rAF loop is
typeof-guarded and elapsed-anchored, and no frame is ever derived from
Date.now(). Flat fills only; no gradients anywhere.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with
  cmp: identical. Second render deleted.
- Read-back, desktop and thumb: diagonal white/turquoise split reads
  immediately; village plus sledding kid in the white half; slider and
  medal in the turquoise half; mustard inset straddles the diagonal at
  centre with a legible grammar face; vertical stroke-only name legible
  along the right edge; nothing clipped.
- Read-back, mobile: square composition centred in the tall frame,
  inset, name, medal and both mini scenes all in frame, nothing
  clipped.
- Fixes during QA: (1) an early pass stroked the diagonal with a navy
  seam, which cut through the inset ring and read as a hard graphic
  border; removed, the split is now two unedged flat polygons as in her
  device. (2) The hair block's fringe curve was too deep and merged
  with the eye arcs; flattened the fringe and raised the pupils so the
  2-arc eyes read cleanly.
- Deviations: none against the prompt. The medal uses the palette's
  mustard for its disc (the palette has no separate gold), and the
  slider's rain-dash texture uses the snow-dash colour, both within
  the specified palette.
