# №1692 — Relief, 7KB

- Prompt: MK5, mpkoz PP939, EXPANSION #222. The SDF relief turn: a small dense
  relief lit like a Rodin bronze, a slow raking light crossing a heightfield of
  merged blobs and sharp creases, one blob merging into another every 20-30 s,
  never a hard cut. Pure math, no textures, no models, 7KB feel.
- Date: 2006 · 08 · 30 (formula date 2002-01-10 + 1693 days).
- Gallery note: "A bronze relief of merged blobs, raked by a slow light. Watch only."

## Build

- Canvas 2D only (no WebGL, per prompt; node-canvas QA cannot run shaders).
- Heightfield: closed-form sum of 9 smooth Gaussian blobs (two seeded anchor
  sets, mulberry32 seed 939) plus 3 crease ridges (Gaussian profile across a
  line, falloff along it). Analytic gradient gives the surface normal; shading
  is the dot product with a moving raking light plus a height-based crevice
  darkening term and a warm-white specular lift. No textures, no models.
- Morph: blob parameters interpolate between anchor sets A and B with weight
  w(t) = 0.5 - 0.5 cos(2 pi t / 50); a full merge cycle takes 50 s, so a blob
  merges into another roughly every 25 s, continuously, never a hard cut.
  Ridge angles drift slowly (+/- 0.18 rad over 170 s). No topology changes.
- Light: raking, low elevation, azimuth drifting slowly (90 s period) from the
  upper left at frame one.
- Steel pass: every 210 s the palette swaps to slate (#5A6672 lit, #1B2126
  shadow, cool light #EAF2F8) for the final 30 s of the cycle, then back to
  bronze. The swap is instantaneous at the cycle boundary and never mixes
  the two palettes.
- Composition: relief fills about 80 percent of a square frame; its boundary
  is a wobbly torn edge (radius modulated by sines at 3/7/11/23 cycles) against
  the dark ground #0D0B08. No UI, no text beyond the plates. Watch-only.
- Palette: bronze lit #8A5A33, shadow #2E1E10, ground #0D0B08, light #FFF2DF.
- House rules: Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw() via style.width/height in px; phone
  detection via window.screen (min dimension < 700 px) with aspect fallback;
  centered geometric piece, square on desktop, page ground is the piece's own
  dark ground; one synchronous frame at load; requestAnimationFrame guarded
  with typeof checks; fixed-phase first frame at t = 12 (mid-morph, light
  from the upper left); seeded RNG only, no Date.now()/Math.random() in frame
  one; no em dashes in visible copy; never click-to-reload.
- Performance: the field is evaluated on a 240x240 cell grid (57,600 cells,
  9 Gaussians + 3 ridges each) with analytic gradients; node render takes
  about 0.75 s at 1280x900. In the browser, redraws are throttled to at most
  every 0.08 s since all motion is slow by design. Flicker safety: all motion
  is slow sinusoidal drift; nothing strobes.
- Template: live №1687 (Wildfire Eats the Grid) for plates, sizing, and
  probe structure.

## Deviations

- The steel pass swaps palettes instantly at a cycle boundary (a color-only
  switch, not a morph cut); the prompt allows the swap and forbids mixing,
  so an instant swap is the faithful reading.
- A 0.30 ambient floor was added to the shading so shadowed blob flanks stay
  readable; without it the first frame read as one flat dark mass. The
  raking contrast is preserved on the lit flanks and creases.
- First frame is t = 12 rather than t = 0 so the morph sits mid-merge and the
  light sits at a readable upper-left angle; both are fixed phases, so frame
  one is still fully deterministic.
- The relief boundary radius was scaled to 0.4 of the frame (about 80 percent
  of the square) after a first build at 0.5 overflowed and clipped the frame.

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js at
  1280x900, 390x844, and 720x720; all three renders read and inspected.
- Desktop: bronze relief centered in the square frame, torn wobbly boundary
  visible against the dark ground, bright lit flank upper left, dark crevice
  running diagonally, plates legible ("Relief, 7KB", "2006 · 08 · 30",
  "Watch only.").
- Mobile: relief fills the top square, plates legible, hint plate at the
  bottom; the lower half is dark ground, matching the №1687 template's phone
  field behavior.
- Thumb (720x720): same composition, relief and plates read clearly at
  thumbnail size.
- Fix rounds: (1) first build clipped the frame and read as a flat dark
  mass, so the boundary was rescaled to 0.4, ridge amplitudes lowered, light
  moved to the upper left, and an ambient floor added; (2) grid raised from
  150 to 240 to soften visible cell stepping. Re-gated after each edit; the
  final renders above are from the shipped files.
- Determinism: frame one uses fixed t = 12 and seed 939 only.
