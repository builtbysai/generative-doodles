# №38 · Thirty-Two Words - process notes

## Concept
Five lamps, each on or off, make exactly 32 words. All 32 binary
strings of length 5 are listed, one per row, filled lamp for 1,
open ring for 0. A counting sweep lights the rows in binary
counting order and the current row inverts, so the count reads as
a moving band of light. The units column, the lamp that flips on
every count, is neon, tying back to No.35. Drag vertically to move
the count by hand. Spec: BATCH-36-40-SPEC.md.

## Construction
- Single self-contained page, canvas 2D, no libraries. The words
  are generated as the values 0 to 31, each exactly once by
  construction; column periods (16, 8, 4, 2, 1) verify the count
  visually. On release the loop holds 4 idle seconds, then resumes.
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
- Files: `38/index.html`, `38/thumb.png` (720x720, rendered from the live script), `38/process.md`. Gallery entry added to pieces.json with the formula date.
