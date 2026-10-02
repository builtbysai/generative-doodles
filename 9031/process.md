# №9031 · Halved, process notes

A participation piece. One random polygon (seeded; the default seed gives
an ellipse). The viewer draws a line through the shape and every polygon
the line crosses splits in two. Cut the pieces again, as far as you like.
Tonal steps fill the pieces so the result reads as a print.

## Technique

- Exact segment/line intersection geometry: an infinite line through the
  drag endpoints is tested against every polygon edge; each polygon with
  two or more hits is split into two new polygons.
- Fill tones step darker with split depth, ink outlines throughout, warm
  paper ground. Undo and new-shape controls, piece counter.
- Plain canvas 2D, no dependencies, seeded mulberry32, ?seed= shareable.

## QA (2026-10-02, Bug direct)

- CDP fail-closed exception probe (isolated Chrome :9333): zero
  exceptions, zero console errors.
- Drove seven scripted drag-cuts through the default shape: 15 polygons,
  all splits geometrically clean, no slivers or overlaps.
- Held locally 2026-10-01 when Hans redirected mid-QA; published
  2026-10-02 at his request ("Link?"). Thumbnail shows the piece after
  seven cuts, since the blank initial state does not represent it.
