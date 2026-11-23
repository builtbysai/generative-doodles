# №103 · Bloom Cycle - process notes

## Concept
One blossom head-on, built from exactly 8 gradient petals, each
a cluster of 3 metaballs, 24 field sources in total (after
teknosis_sis, batch 0 prompt 23). The bloom opens over 6s, holds
a breath, and folds back over 6s on a 12s loop. Colour runs from
a deep violet heart through magenta to pale petal and cream
tips. No stamen, no leaves, no tilt: botanical without being
literal. Diameter 75% of frame, dark ground margin all around.

## Construction
- Single self-contained page, canvas 2D, no libraries. Software
  shader route: radial metaball field sampled on a reduced
  grid, FIELD_CELL 8px (10px on phones), drawn full-frame.
  No WebGL.
- Petal shade is set by radial distance and field value through
  the 4-stop ramp, with a fresnel-like rim term near the iso
  surface. Petal angles carry a small Lissajous wobble so the
  head never sits perfectly still.
- QA iteration: the first shading pass inverted the colour flow
  (cream heart, pink rim); the radial term was flipped so the
  violet sits at the heart as specified.
- Drag up to open, down to close: the bloom holds at the
  finger's height while pressed; release resumes the cycle.
  Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `103/index.html`, `103/thumb.png` (720x720, rendered from the live script), `103/process.md`. Gallery entry belongs in pieces.json with the formula date.
