# №53 · Intersecting Colour - process notes

## Concept
Four horizontal and four vertical hard-edge bands crossing over
a bone field after Angela Johal's 2026 solo show. Where bands
meet, the overlap snaps to a flat mixed hue from a lookup, never
alpha blending. Bands drift on their own axes and wrap around
the field.

## Construction
- Single self-contained page, canvas 2D, no libraries. Band
  widths and starting positions are seeded; speeds are integer
  ratios of the 28 second loop so the seam closes and the first
  and last frames match.
- Draw order: ground, horizontal bands, vertical bands, then
  overlap quads in their mixed hues. Drag grabs the nearest band
  and moves it along its axis; release resumes the drift.
- Square on desktop, full-bleed on phones via the screen-size
  check; Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `53/index.html`, `53/thumb.png` (720x720, rendered from the live script), `53/process.md`. Gallery entry added to pieces.json with the formula date.
