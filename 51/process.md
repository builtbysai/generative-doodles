# №52 · Rhythm and Colour - process notes

## Concept
Concentric hard-edge rings cut into arc segments after Angela
Johal, on near-black. The color assignment marches outward step
by step like a musical round while the whole stack turns once
per loop. A thin bone ring and a flat dark center disk close
the composition.

## Construction
- Single self-contained page, canvas 2D, no libraries. Nine rings
  with seeded widths and seeded segment counts; the color of a
  segment is palette[(ring + segment + march) mod 8].
- The loop is 32 seconds: rotation closes a full turn and the
  march advances sixteen steps of two seconds, returning to zero
  modulo eight, so the first and last frames match by
  construction. Drag rotates the stack directly.
- Centered on desktop and phones on the matching dark ground;
  Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `52/index.html`, `52/thumb.png` (720x720, rendered from the live script), `52/process.md`. Gallery entry added to pieces.json with the formula date.
