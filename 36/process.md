# №36 · Twenty-Four Orders - process notes

## Concept
Four distinct dots have exactly 24 orders. This piece generates
them in Steinhaus-Johnson-Trotter order, where every step is a
single adjacent swap, and asserts the count: 24 orders, all unique.
The hero row walks the sequence: on each beat the swapping pair
slides past each other. Below, all 24 orders sit in a 4x6 grid of
small rows with the hero's current row highlighted. The dots keep
their identity colors everywhere (ink, indigo, vermilion, gold),
so an order reads as a color order. Spec: BATCH-36-40-SPEC.md.

## Construction
- Single self-contained page, canvas 2D, no libraries. Drag
  horizontally on the hero to scrub the sequence; on release it
  holds 4 idle seconds, then resumes. Never click-to-reload.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing; enumeration contents verified against
  the generation order (No.37 was iterated once: diagonal skylines
  replaced by true staircases). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `36/index.html`, `36/thumb.png` (720x720, rendered from the live script), `36/process.md`. Gallery entry added to pieces.json with the formula date.
