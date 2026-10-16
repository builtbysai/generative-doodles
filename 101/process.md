# №101 · Flower Gradient - process notes

## Concept
A free blossom mass with no radial structure: exactly 4 metaballs
on Lissajous paths fuse and fold into one soft body that blooms
and relaxes on a 10s loop (after teknosis_sis, batch 0 prompt 21).
Colours drift through rose, peach, lilac and deep plum over a
20s super-cycle, so every odd loop starts from the same palette
position as the first. The mass stays centred, fills about 70% of
the frame and never touches an edge. No hard edges anywhere.

## Construction
- Single self-contained page, canvas 2D, no libraries. Software
  shader route (the No.81-84 pattern): the field is sampled on a
  reduced grid, FIELD_CELL 8px (10px on phones), and drawn
  full-frame each frame. No WebGL, so thumbnails are true
  node-canvas renders.
- Shading: field value sets the body, a vertical gradient and
  domain-warped noise move the colour through a cyclic ramp of
  the four chromatic palette stops (deep ground never cycles
  into the bloom), and an exponential term near the iso surface
  gives a fresnel-like rim.
- Palette rotation choice, recorded per the spec: the rotation
  runs through the ramp itself over the wrapped 20s super-cycle,
  so only palette colours ever appear.
- Drag warps the domain while pressed; release eases back.
  Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, ground margin kept.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `101/index.html`, `101/thumb.png` (720x720, rendered from the live script), `101/process.md`. Gallery entry belongs in pieces.json with the formula date.
