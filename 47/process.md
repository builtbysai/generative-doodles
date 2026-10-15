# №47 · Pigment Water - process notes

## Concept
Three pigment blobs bloom and diffuse on a dark canvas like
chemicals dropped into water (after darien.brito; prompt 12 in
Bug's ig-artist-study queue, homage to Pigments). A Gray-Scott
reaction-diffusion field does the growing; three seeded pigment
territories (flat #e2574c, #e8a33d, #4cc9e2) claim it, and a narrow
concentration band stays black, drawing the thin separating lines
where pigments meet. Ground #0b0b0e.

## Construction
- Single self-contained page, canvas 2D, no libraries. The sim
  runs on a 96 by 96 toroidal grid, seeded and pre-run 900 steps
  at load so the first frame is already formed; feed rate breathes
  on a 24 second cycle so the pattern moves between dots and
  stripes. Five steps per animation frame.
- Drag injects chemical under the finger. Field is full-bleed on
  phones via the screen-size check, square on desktop; Visual
  Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing: formed coral-like worms in all three
  territories at first frame, black seams visible. Hans's
  real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `47/index.html`, `47/thumb.png` (720x720, rendered from the live script), `47/process.md`. Gallery entry added to pieces.json with the formula date.
