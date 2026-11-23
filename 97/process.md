# №102 · Gradient Weather - process notes

## Concept
No form at all: a full-frame dawn gradient field breathing like
weather (after teknosis_sis, batch 0 prompt 22). A 4-octave fbm
domain at low base frequency keeps only 2 to 3 colour masses in
frame at once, drifting on a 14s loop. The value range is
compressed so contrast stays low-mid throughout; colour grading
is the content.

## Construction
- Single self-contained page, canvas 2D, no libraries. Software
  shader route: field sampled on a reduced grid, FIELD_CELL 8px
  (10px on phones), drawn full-frame. No WebGL.
- Drift uses wrapped sine time (offset returns to zero at the
  loop point), and a slow hue rotation rides on the same wrapped
  phase. Drag scrubs the hue rotation directly; on release the
  offset eases back and the automatic drift resumes.
- Edge-to-edge field on every screen: no centre, no figure, no
  margin. Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `102/index.html`, `102/thumb.png` (720x720, rendered from the live script), `102/process.md`. Gallery entry belongs in pieces.json with the formula date.
