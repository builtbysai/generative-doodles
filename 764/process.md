# №9075 · Warp - process notes

## Concept
A plain checkerboard, black and bone, put through two sine fields:
every corner of every square is pushed sideways by one wave and up or
down by another, so the board bulges and pinches like cloth over
something round. Nothing else is drawn; the motion comes from the grid
itself.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9075. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 26 columns; rows follow the rect aspect. Corners displaced by primary
  plus cross terms in both axes, cells filled as quads in board order.
- Compositional safety: strongest sampled corner displacement is
  measured; seeds under 0.022 of the side (about a quarter cell) are
  rejected, 16 attempts, because under that the board reads as a
  printing error.

## Differentiation
- vs No.9076 (Quarter Turn): tiles with arcs that connect into paths.
  Warp has no lines at all; its cells are filled and the edges are
  implied by the color change.
- vs No.9066 (Undertow): a centered radial system. Warp has no center;
  the deformation is two crossing wave fields over the whole board.
- Family name: "sine-warped checkerboard".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, full-bleed
  fields / grounded centered pieces). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9075/index.html`, `9075/thumb.png` (720x720, rendered from the live script), `9075/process.md`. Gallery index updated with the №9075 entry.
