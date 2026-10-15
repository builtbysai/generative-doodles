# №54 · Chromatic Scale - process notes

## Concept
Twelve tiles, one per semitone from C to B after Angela Johal,
each a hard-edge two-color split. A playhead sweeps the scale as
an eighteen second measure; the sounding tile swaps its two
colors for its beat, then snaps back like a tape cut.

## Construction
- Single self-contained page, canvas 2D, no libraries. Split
  type (vertical, horizontal, semicircular arc) is seeded per
  tile; the second color is the note a fifth-step away in the
  prompt palette, so every tile stays inside the twelve listed
  colors. No labels, no audio.
- One row of twelve on phones, a 4 by 3 grid on desktop, tiles
  always abutting on the paper ground. Drag scrubs the playhead;
  the measure loops by construction.
- Visual Viewport sizing; canvas pinned by style; phone layout
  via the screen-size check.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `54/index.html`, `54/thumb.png` (720x720, rendered from the live script), `54/process.md`. Gallery entry added to pieces.json with the formula date.
