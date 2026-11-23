# №40 · Moire Rings - process notes

## Concept
Two identical fields of dots: concentric rings, ring r carrying
6r dots, one field ink, one indigo. The fields rotate in opposite
directions at slightly different rates, so interference bands
breathe slowly across the field. Nothing is drawn but the two
fields; the moire is the picture. Drag horizontally to shift the
second field's phase; on release the offset eases back to the
loop rate. Spec: BATCH-36-40-SPEC.md.

## Construction
- Single self-contained page, canvas 2D, no libraries. 16 rings,
  816 dots per field. Rotation rates 0.05 and -0.043 rad/s give a
  slow beat period the eye can follow.
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
- Files: `40/index.html`, `40/thumb.png` (720x720, rendered from the live script), `40/process.md`. Gallery entry added to pieces.json with the formula date.
