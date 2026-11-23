# №104 · Slate Drift - process notes

## Concept
The dark counterpart to No.102 and the quietest piece in the
batch (after teknosis_sis, batch 0 prompt 24). Deep slate and
ink gradients with slow aurora bands of muted teal and dusty
violet drifting across on a 16s loop, the slowest drift in the
set. Restraint is the piece: the value range is compressed
dark and nothing bright ever appears.

## Construction
- Single self-contained page, canvas 2D, no libraries. Software
  shader route: field sampled on a reduced grid, FIELD_CELL 8px
  (10px on phones), drawn full-frame. No WebGL.
- Low-octave fbm (3 octaves) sampled with uv scaled 1:3, x
  frequency a third of y, so the bands stretch horizontally;
  a sine band term warped by the same noise keeps the band
  edges from ever sitting straight.
- QA iteration: the first pass had a hard horizontal step
  mid-frame that read as a horizon; band frequency and weight
  were lowered and the warp strengthened until the transition
  dissolved.
- Drag sets the drift direction while pressed; release eases
  back to the automatic flow. Visual Viewport sizing; canvas
  pinned by style; full-bleed on phones.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `104/index.html`, `104/thumb.png` (720x720, rendered from the live script), `104/process.md`. Gallery entry belongs in pieces.json with the formula date.
