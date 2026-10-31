# No.787 Observatory

EXPANSION #96 daniel-buren, prompt block PP4 "Observatory": Buren's
L'Observatoire de la lumiere (2016, Fondation Louis Vuitton), colored
filters and white cells across Gehry's glass sails, forms appearing
and disappearing by light alone.

## Concept

Three curved glass sails sweep across a sky that runs a full day in
sixty seconds. Each sail is a checkerboard of translucent colored
cells alternating with white cells. Nothing in the drawing moves:
the sun moves. As the sun's azimuth sweeps the loop, each cell
ignites in turn according to its own phase, saturated like a lantern
when the sun is low, washing pale at noon, glowing again at dusk.
Watch-only; there is no gesture, because the piece is the light.

## Construction

- Sails: three curved patches, each bounded by two quadratic
  beziers (top and bottom edges in frame fractions). A point on a
  sail is the vertical blend of the two edge points at the same u,
  so the checkerboard grid bends with the sail's sweep. Largest
  sail (11 x 7 cells) anchored lower-left, middle (9 x 6)
  center-right, smallest (7 x 4) upper-right, drawn back to front
  so overlaps composite like stacked filters.
- Cells: checker parity decides white vs colored; colored cells
  cycle the eight specced filter colors by grid position
  ((i*3 + j*5 + sail*2) mod 8). Each cell is inset toward its
  centroid (0.93, 0.90 on phones) so the sail base shows between
  cells as the panel seam. Cells are flat fills only; no gradients
  anywhere. Three seeded dither speckles of the sail base per cell
  at alpha 0.06 break up the flat fill.
- Sun function: phase p = (t mod 60) / 60 over one seamless 60 s
  loop (20 s dawn, 20 s noon, 20 s dusk; integer ratios only).
  Elevation e = sin(pi * p). Sky = mix of dusk #2E3440 toward the
  white cell tone #F6F3EC by e^0.8. Each cell's ignition is a
  gaussian (sigma 0.165) of the circular distance between the
  sweeping azimuth (az = p) and the cell's phase, where phase =
  u * 0.72 + v * 0.28 + the sail's offset, precomputed from grid
  coordinates. Alpha = (0.30 + 0.24e + g * (0.36 + 0.46 * (1 - e)))
  times a seeded facet factor in [0.90, 1.0), clamped to 0.98.
  Colored fills are mixed toward the white tone by wash = 0.72e,
  so noon bleaches the sails while dawn and dusk saturate them.
- Determinism: frame one is the synchronous draw(0) at load, dawn's
  first instant (sky deep, azimuth 0, the phase-near-zero cells of
  the largest sail igniting at its left edge). All randomness is
  one mulberry32 stream (seed 787001) consumed once at startup for
  phases, facets and speckles. No Date.now, no clock reads; the
  animation loop only offsets t from its first rAF timestamp, and
  rAF is typeof-guarded so headless renders stop at frame one.
- House rules: canvas sized from the Visual Viewport API with
  resize listeners on visualViewport and window; canvas style
  width/height pinned in px inside draw(); phone detection via
  window.screen (min dimension < 700) with the h > w * 1.15 aspect
  fallback; the page ground follows the sky tone, set in CSS for
  frame one and updated from draw() when a body is present.
  Palette is strict: the eight filter colors, white cell tone,
  sail base, dusk sky, and mixes between them only.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, cmp byte-compare
  identical; duplicate deleted and the check re-run after the
  fix round, identical again.
- First read-back: the sails crowded the frame, the sky barely
  read, and quiet cells went muddy gray. Fix round: middle sail
  pushed right and down, largest sail's top edge lowered, sail
  base silhouette alpha 0.30 to 0.20, quiet-cell alpha floor
  0.22 to 0.30, ignition sigma 0.14 to 0.165 with a stronger
  lantern term. Re-rendered all sizes; frame one now shows deep
  sky at top-left and bottom-right, three distinct sails, a
  saturated ignition cluster at the largest sail's left edge and
  lit green/teal passages on the right sails, quiet cells muted
  but colored, overlaps compositing translucently.
- Noon check: a throwaway copy with the initial draw forced to
  t = 30 rendered the noon wash (pale pastel checker on a
  near-white sky, sails still legible), verified by eye, then
  deleted.
- Mobile: full composition holds in the tall frame, sails bleed
  off the edges by design, nothing essential clipped.
- Deviations: none from the prompt's substance. Construction
  notes: the noon sky uses the white cell tone #F6F3EC as the
  near-white (per the brief's "from the white-cell tone family");
  sail translucency is plain canvas alpha compositing, since the
  QA renderer has no filters or shaders.
