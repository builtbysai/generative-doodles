# No.340 Click-In Grammar

## Concept

After MyClayCo's Click n Clay Multi Jig demo (2025-02-18): a
multi-jig read as a composition engine. A fixed 2 x 3 batch
grid of rainbow-arch jigs fills the frame, each cell's arch
holding one cream insert motif, like making six pairs at a
time. The grammar is the constraint: the motif set is closed
at four (star, heart, flower, dot), the cell count is closed
at six, and every board state comes from authored tables, so
the piece is a finite, fully reproducible state machine
rather than a randomiser.

## Construction

One self-contained canvas, design space 1280x900, cover-fit
(full-bleed field) with the page ground in the piece's own
near-black #121417. Visual Viewport sizing with resize
listeners on visualViewport and window; the canvas is pinned
every frame via style width/height in px; phone detection via
window.screen min dimension under 700px with the aspect
fallback (h > w*1.15).

Each of the exactly 6 cells (asserted in code, with a
structural check that they form 2 rows x 3 columns) holds one
arch drawn as six concentric band strokes of path data:
semicircle over straight legs, radii 172 down to 44.5, stroke
width 24, in flat red #D64545, orange #E08A3C, yellow
#E8C547, green #4F9D69, blue #3E7CB1, violet #7B5EA7, outer
to inner, with thin ground gaps between bands. The insert
sits centred in the arch doorway and is one of four
parametric cream #F2EBD8 motifs: five-point star, bezier
heart, six-petal flower, dot. Nothing else is ever drawn;
no fifth motif exists in the code.

State is indices into fixed tables, never runtime random.
Each cell has its own seeded order table (8 entries, each
motif exactly twice, asserted); a tap on a cell advances
that cell to the next entry. A fixed table of 4 authored
deals (each 6 pointers into the per-cell orders, asserted)
drives the whole board; a double-tap inside the 350ms
window advances to the next deal. A single tap is held for
that 350ms window so a double-tap never half-advances one
cell before the re-deal lands; if no second tap arrives the
held tap fires on its own. Tap hit-tests run in design
coords through the stored cover transform (S, OX, OY).

The click-in settle is a scale spring on the incoming motif
only (0.55 at arrival, damped cosine decay, settled by
0.55s); the arch bands never move. Idle, a brightness step
travels cell to cell in fixed reading order, soft-edged,
lifting the active cell's band colours toward white and the
motif slightly with it: 1.25s per cell, a 7.5s loop,
asserted in code (loop = 6 steps). Frame one opens on deal
one (star, dot, flower / heart, star, flower) already
clicked in with the shimmer mid-travel on the third cell.
The first frame is drawn synchronously and
requestAnimationFrame is typeof-guarded. No offscreen
canvas, no shadowBlur, no gradients, no filters, no text.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from
the piece's own script; all in-code assertions passed at
every size (6 cells, 2x3 structure, 6 bands, 4 motifs, order
and deal tables in range).

- qa-desktop.png (1280x900): all six arches complete and
  evenly gridded with thin dark gutters; deal one reads
  star, dot, flower across the top row and heart, star,
  flower across the bottom; the shimmer lift is visible
  mid-travel on the top-right cell, its bands a clear pastel
  step up from the other five cells.
- qa-mobile.png (390x844): cover-fit shows the centre
  column (dot over star) full-bleed at large scale; bands
  and motifs crisp, nothing clipped mid-cell vertically.
- thumb.png (720x720, in this folder): square cover crop
  keeps the centre column whole and both centre motifs
  legible; side columns crop at the frame edges as expected
  for a full-bleed field; the shimmer cell reads at the
  right edge.

Deviations: none from the spec or its adaptation flag. The
tap, double-tap and pop-spring paths are event-driven and
cannot fire in the headless renderer; they are guarded,
hit-tested in design coords, and change piece state only,
never a reload.
