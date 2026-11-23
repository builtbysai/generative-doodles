# №9066 · Undertow - process notes

## Concept
A still, closed radial system: 64 to 87 thin concentric ink rings on bone,
disturbed by a slow rotating flow field. Each ring's radius is wobbled by
low-frequency angular lobes (2, 3 and 5 lobes only, summed sines) whose
phase rotates gradually with radius, a rotational shear. Neighboring rings
therefore lean against each other, crowd together and merge into dark
interference bands in some sectors while staying clean and separate in
others. The interference is the subject: where the field piles rings up,
translucent teal ink gathers into bands; where it pulls them apart, the
bone ground breathes through. Exactly one vermilion ring, placed by the
seed in the calmest mid-radius gap, is the single note that is not teal.
Generous margins; the outermost ring is scale-fitted to stay inside them.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9066. `?seed=` shareable; click mints a new build and writes
  `?seed=` into the URL. Square composition letterboxed on the dark page bg;
  DPR capped at 2; resize redraws.
- Ring geometry: base radii spaced slightly irregularly (0.014..0.024 in
  normalized units, starting at 0.24); center offset from the square center
  plus a small per-ring drift. radius(theta) = r_i * (1 + A2*sin(2t+q2_i) +
  A3*sin(3t+q3_i) + A5*sin(5t+q5_i)), 720 segments per ring. The shear is in
  the per-ring phases: q_k_i = p_k + totalTurn * w_k * i/(R-1) + jitter, with
  totalTurn 0.55..1.4 full turns across the stack, so the lobe pattern turns
  slowly as radius grows and rings shear against their neighbors.
- Compositional safety: every candidate is measured, not eyeballed. Adjacent
  ring gaps are sampled at 720 angles; an interference zone is a run of 22+
  samples (~11 degrees) with gap below 0.52x the mean gap. If a candidate has
  fewer than 3 zones or no clean vermilion spot, the next derived seed
  (seed + attempt*0x9E3779B9) is tried, up to 16 attempts. Vermilion is
  restricted to 0.34..0.66 of the ring stack and placed at the cleanest gap
  there (gap above 0.72x mean over most of the ring), so it never lands
  inside a dark band.
- Draw order: teal rings at 0.66 alpha (crowding accumulates into dark bands
  naturally), the vermilion ring last at 0.96 alpha and 1.7x line weight,
  then 2600 restrained 1px grain speckles (teal and warm umber, ~0.05 alpha).
- Visible copy: hint "click for another undertow". No em dashes, no date
  strings, no absolute URLs anywhere in the visible page.

## Iteration
- v1: shear too strong (up to 2.6 full turns across the stack) plus wide
  jitter; the piece read as a ball of yarn, tangled rather than watery.
  Cut totalTurn to 0.55..1.4 turns and jitter to 0.06..0.13. The shear still
  builds real interference, but the rings now read as disturbed water.
- v1 inner radius 0.34 left a large empty disc at the center. Dropped to
  0.24 so the rings fill inward; the center stays calm but not hollow.
- Raised lobe-2 amplitude (0.06..0.115) so modulation is unmistakably visible
  (the fatal failure mode was perfect boring circles) while keeping only
  low frequencies, and raised teal alpha 0.60 to 0.66 so bands gather dark.
- Drift amplitude halved (it was adding to the tangle); margin fitting kept
  at 10.5% of S via measured max extent, so no ring ever escapes.

## Differentiation
- vs №8930 (Silent Score): that piece is a polar waveform ring performing a
  composed ghost track with a playhead and beat detection. It is an audio
  piece made visible. Undertow is a still: static rings disturbed by a
  spatial field, interference as subject. Different subject, different
  system, no time axis.
- vs №9003 (Lichtenberg): diffusion-limited aggregation, a lightning-tree
  growth of random walkers freezing onto a cluster. Undertow has no agents,
  no growth, no randomness in placement; it is a deterministic closed
  radial field of concentric rings.
- vs №9059/9061 (Underdrawing and kin): open-field compositions where lines
  walk an unbounded plane. Undertow is a closed radial system, everything
  concentric around a shared (offset) center.
- Family name: "sheared concentric ring interference".

## QA log
- Seeds screenshotted and inspected at 1280px: 9066 (default; strong dark
  band across the top, clean sectors elsewhere, vermilion singing in a calm
  mid-radius gap), 424242 (gentler, vermilion clean), 777001 (strong bands
  top-left and bottom-right, excellent), 271828 (subtle but composing; zones
  present per measurement). All four satisfy the 3-zone gate at build time.
- Mobile 390px width: square composition letterboxes correctly, hint
  legible, rings crisp. Responsive OK.
- console-check.js run against the served page: zero console messages, zero
  errors; body rendered (8669 chars).
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9066/index.html` (the piece), `9066/thumb.png` (720x720 crop of
  the live square composition), `9066/process.md` (this file). Nothing
  committed; gallery untouched.
