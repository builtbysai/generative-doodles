# №33 · Ten Ways In - process notes

## Concept
Four items can be paired up in exactly 10 ways: the involutions of
4 elements. This piece enumerates all 10 by recursion at load (the
first free item either stays single or pairs with each later item)
and asserts nothing needs asserting: the recursion cannot produce
anything else. Each panel shows 4 dots on a line, two filled, two
open, the split fixed, with the pairing drawn as shallow indigo
arcs above the line, crossings plain. A cursor dot visits panel
after panel; in the visited panel the arcs lift, cross, and settle
into the next involution. After the last panel the strip resets.
Ground #f4f1ea, ink #1a1a1a, arcs indigo #2b3a67.

## Construction
- Single self-contained page, canvas 2D, no libraries. Arcs morph by
  presence: every possible pair carries a presence value that is
  interpolated between involutions, so arcs grow, shrink, and cross
  smoothly with no special cases.
- Motion and interaction per Hans's direction: perfect loop, never
  click-to-reload. Drag horizontally to scrub the visit; on release
  it holds 4 idle seconds, then resumes.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing, including a mid-assembly frame for
  No.34 and a mid-morph frame for No.33 and No.35. The enumeration
  contents were verified panel by panel against the recursion
  order. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `33/index.html`, `33/thumb.png` (720x720, rendered from the live script), `33/process.md`. Gallery entry added to pieces.json with the formula date.
