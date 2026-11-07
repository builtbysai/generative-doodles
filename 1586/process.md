# №1586 — Reality Lens (CW3, #209 che-yu-wu)

Formula date: 2006 · 05 · 16. Gallery note: "Fifteen invisible points twist a marbled field. Drag to add a sixteenth point; tap to respawn."

## What the piece does

A dense, psychedelic marbled field fills the frame: paint-swirls in
orange #E8641E, green #3FD14A, cyan-blue #2EA8E8 and magenta #E82EA8
fold through each other like paper marbling on a black ground
#08080C, threaded with thin warm-white #F5F0E8 veins. Fifteen
invisible points orbit the field, each dragging its local pixels
around it, so the marbling churns continuously without ever tearing.
The points are invisible, but they read in the swirl centers: broad
orange fields curl into spirals and vortices across the whole frame.
Drag anywhere and your finger becomes a sixteenth invisible point
while pressed: the marbling visibly orbits the touch point. Tap
anywhere and the fifteen points respawn to new orbits. No text, no
caption, no signature anywhere in the piece, per the batch rule.

## Mechanism

- Coarse CPU grid with bilinear resampling, drawn directly on the
  main canvas. No shader/WebGL, no offscreen canvas, no
  getImageData, no pre-rendered sprites, per the spec adaptation.
  One cell per ~1% of the short side (6-12 px); each cell samples
  the marbled source field at a warped coordinate and fills a rect.
- Source field: folded sine bands over two octaves of bilinear
  value noise on a fixed 16x16 lattice (mulberry32, seed 1586).
  Colour comes from an authored palette ramp (orange, green, cyan,
  magenta, with a narrow warm-white stop that also feeds the thin
  vein highlights where a second folded band crosses zero).
- Warp: for each of the fifteen points, the sampled coordinate is
  displaced tangentially around the point's current centre, with a
  smooth 1/(1+(r/R)^2) falloff and a near-centre clamp, so the
  displacement field is continuous everywhere and the marbling
  folds instead of tearing. Each point orbits a small circle around
  its base position; its swirl strength breathes slowly, so the
  churn never repeats. The drag point applies the same warp with
  fixed strength 0.9 and radius 0.16 of the short side while pressed.
- Fifteen points, one per cell of a 4x4 sector grid (one sector
  empty, a different one per table entry), so no two points ever
  share a sector and the swirl centers stay spread across the
  field. The prompt's "no two share a quadrant" is read this way:
  fifteen points cannot occupy four 2x2 quadrants one each, so the
  sector grid is the working interpretation, one point per sector.
- Interaction: pointerdown sets the sixteenth point; pointermove
  follows it; pointerup clears it. A press that moves less than
  12 px is a tap and advances the orbit table (four entries, fixed
  seeds 158600 + entry*17), rebuilding all fifteen points from the
  next entry. A real drag never respawns. No click-to-reload
  anywhere; taps reseed within the piece.
- Determinism: the synchronous first frame is drawn at t = 0 with
  orbit-table entry 0; the rAF loop is anchored as elapsed-since-load.
  No Math.random() anywhere; all variation comes from the fixed
  lattice and fixed-seed LCG tables. Thumb renders byte-compare
  identical across runs (verified, md5
  399b9a59d18879c5e957b64e7ade6f75).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via
  window.screen (min dimension under 700 px) with the aspect
  h > w*1.15 fallback; full-bleed field on phones and desktop;
  one synchronous frame at load; typeof-guarded
  requestAnimationFrame.

## QA

- Rendered from the actual script with node-canvas at 1280x900
  desktop, 390x844 mobile and 720x720 thumb; all three inspected.
  Desktop and mobile show broad orange fields folding into
  green/cyan/magenta bands with white veins and legible swirl
  centers (top-left spiral, top-centre vortex, centre-left curl,
  bottom-right swirl); no tearing, no flicker, no black gaps.
- Fix round: the first build's marbling was too fine and noisy
  (fold coefficients and vein density too high, swirl radii too
  small), reading as static with muddled centers. The fix lowered
  the band frequency, halved the noise fold, thinned the veins and
  enlarged the swirl radii and strengths; re-rendered and
  re-inspected at all three sizes.
- Drag/tap probed in a node harness against the real script:
  dragging from (360,360) to (420,400) at fixed t changed the frame
  near the touch point (mean channel difference 54.9 over the
  300-500 px region) while the far corner was untouched (0.000);
  releasing after a drag left the orbit table at 0; a tap advanced
  the table 0 to 1 with new centres, a second tap to 2, and the
  respawned frame differs from the baseline across the whole field
  (mean difference 68.2). Fifteen centres confirmed in diagnostics.

## Deviation from the prompt

One interpretation, noted above: "no two share a quadrant" is
implemented as one point per cell of a 4x4 sector grid, since
fifteen points cannot each hold one of four quadrants. Everything
else follows the prompt and the spec adaptation exactly.
