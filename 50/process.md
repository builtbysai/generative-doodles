# №51 · Chromesthetic Grid - process notes

## Concept
A 4 by 5 grid of hard-edge modules after Angela Johal's Variations
on a Theme: each module is split by two nested semicircular arcs
into flat color wedges, and a near-black structural band crosses
the middle like staff lines. A retune wave crosses the grid in
reading order, rotating each module's arcs and stepping its colors.

## Construction
- Single self-contained page, canvas 2D, no libraries. Twenty
  modules precomputed from a seeded generator: arc centers, two
  radii, a starting angle and a closed cycle of three color tuples
  per module, all from the prompt palette. No gradients, no
  outlines between regions, colors abut.
- The wave takes about 24 seconds for all twenty modules (1.2s
  each); the color swap snaps at 60 percent of each transition.
  Horizontal drag scrubs the wave position.
- Full-bleed on phones via the screen-size check, square field on
  desktop on the matching band color; Visual Viewport sizing;
  canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `51/index.html`, `51/thumb.png` (720x720, rendered from the live script), `51/process.md`. Gallery entry added to pieces.json with the formula date.
