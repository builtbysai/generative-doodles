# №1699 "Forty-Two Lines" - process notes

PP946, EXPANSION #223 piter-pasma. Date 2006 · 09 · 06. Gallery note:
"Bold tubular loops in two inks with halftone grain. Watch only."

## Build
- A (2,3) torus-knot tube rendered in Canvas 2D: 720 centerline samples,
  split into segments, painter-sorted by depth so near tube passes over far
  tube, stroked with round caps. Tube width grows slightly with depth.
- Halftone shading: ground-ink dots inside the tubes, placed across each
  tube cross-section and gated by a 4x4 Bayer matrix (ordered dither, never
  random). Dot size and presence follow a directional shade from the tube
  normal (light from upper left) plus a small depth term. A slow sine term
  shimmers the grain.
- Palette: four duotone sets on a 3-minute cycle, 45 seconds each, hard
  switch only (no blending, so the frame never holds a third color):
  golden yellow + black, paper cream + indigo, signal red + off-black,
  teal + bone. Frame one is golden yellow + black, knot at a fixed
  seed-walk phase (t = 0).
- The knot slowly rotates and re-ties: the two rotation angles are sums of
  sines of t with fixed phases, so every frame is a pure function of t.
- The code that draws the loops is delimited in index.html between the
  `KNOT: 42 lines` markers and is exactly 42 lines, and the colophon
  "42 lines of code" states that count.
- Plates drawn on canvas: title + date top left, "Watch only." bottom left,
  "42 lines of code" bottom right, all ink plates with ground text.
- Watch only: no interaction, no click handlers, no palette UI.

## Deviations
- WebGL-to-2D substitution (per house rules): the prompt's SDF tube loops
  are drawn as a 2D stroked torus-knot path with painter-sorted segments
  instead of a raymarched SDF, because node-canvas has no WebGL and the
  piece must render frame one in the QA gate. The halftone is ordered
  Bayer dither as specced, not a shader.
- The budget colophon is drawn as a small plate (ink fill, ground text)
  rather than bare type, so it stays legible where a tube passes under it.
  This was caught in QA: bare ink type was swallowed by a black tube in
  the square thumb.

## QA
- Rendered the actual script with node-canvas at 1280x900, 390x844 and
  720x720; inspected all three. Desktop: black trefoil knot on gold,
  bleeding off all four edges, halftone grain inside the tubes, all plates
  legible. Mobile: knot centered, bleeding left and right, plates legible.
  Thumb (720x720): same, budget plate legible over the tube.
- Pixel census on later frames: t=50 is exactly cream #F4EFE3 + indigo
  #232B6B; t=100 is exactly signal red #D9381E + off-black #141210;
  t=30 is gold #F2B705 + black #111111. Only anti-aliasing edge pixels
  sit outside the two flat colors.
- Deterministic frame one: seeded sines only, no Date.now or Math.random
  anywhere in the frame path. Reduced-motion path draws frame one only.
- One fix round: budget colophon changed from bare type to a plate after
  the first thumb render; all three sizes re-rendered and re-inspected
  after the edit.
