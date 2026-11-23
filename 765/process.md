# №9076 · Quarter Turn - process notes

## Concept
A grid of truchet tiles, one rule per tile: two quarter-circle arcs
joining the midpoints of neighboring edges. Each tile flips a seeded
coin for which pair of corners its arcs use, and the flips chain across
the grid into long accidental paths. No path is designed; the piece is
what the coin flips happen to connect. A few tiles draw their arcs in
vermilion.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9076. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style;
  full-bleed on phones via the screen check.
- 13 columns; rows follow the rect. Arc line width 0.13 of the cell.
  Vermilion tiles are a separate seeded stream at 4.5 percent so the
  mix gate does not eat them.
- Compositional safety: the orientation mix is measured; seeds where
  either orientation exceeds about 64 percent are rejected (16
  attempts), because a lopsided mix collapses into stripes.

## Differentiation
- vs No.9063 (Loom): threads strung on nested rings by design. Quarter
  Turn is a flat grid of local rules; its long paths are emergent, not
  strung.
- vs No.9075 (Warp): filled cells, implied edges. Quarter Turn is all
  edge, stroked arcs on plain ground.
- Family name: "coin-flip truchet arcs".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, full-bleed
  fields / grounded centered pieces). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9076/index.html`, `9076/thumb.png` (720x720, rendered from the live script), `9076/process.md`. Gallery index updated with the №9076 entry.
