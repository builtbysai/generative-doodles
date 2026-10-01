# №9036 · Colonnade: process

Built 2026-10-01 from seed 341 in FUTURE_PIECES.md, after the
lammetje_nl study. His Donuts And Windows discipline (one
primitive, translucency as the only depth cue, flat saturated
ground, tight palette, generous margin) with the primitive
transformed from donut to arch and the scatter composed into
architecture.

## The piece

Rows of overlapping translucent arches rise from a single held
baseline like an aqueduct or cloister. One primitive (the arch:
two legs and a semicircular top), one depth cue (translucency,
drawn with multiply so overlaps bloom into new hues), a flat
ground, a tight four-hue palette, generous margin. Three to four
rows recede upward; a few small arches float above like clerestory
windows. Click for a new colonnade (reseeds, updates `?seed=`).

## Decisions

- Multiply blending at 0.82 alpha: the overlap hues (deep
  aubergine, pine, bronze) are discovered, not chosen.
- The baseline is drawn as one continuous line; everything sits on
  it. Rows step up and shrink with depth.
- Static composition, no animation: it is a print. The interaction
  is only reseeding.

## QA (2026-10-01)

- Zero console exceptions over 8s.
- Desktop 1280x800 inspected: overlaps bloom, baseline holds,
  reads as built rather than scattered. Caption unclipped, no
  overflow.

Held for Hans's verdict before any public push (shipping hold).
