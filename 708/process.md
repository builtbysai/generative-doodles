# No.708 — Undefined Territory

EXPANSION #86 mona-hatoum, prompt block 5. A world map laid loose on a
dark floor in thousands of small red glass spheres: continents with no
borders and no countries, trembling faintly, one tap away from being
scattered by whatever force wants to try.

## Concept

Hatoum's map works because the territory is only ever resting. The
spheres are not fixed, not glued, not bordered: the landmass is an
agreement among loose parts, and any disturbance proves it. The piece
keeps exactly that tension. At rest the map is complete and still,
breathing at the edge of perception. A tap is the external force: the
shockwave rolls spheres outward, and then, slowly, over about twenty
seconds, they creep home. The territory re-forms, but it re-forms from
the disturbance, never through it, and the next tap finds a map that
has already survived one.

## Construction

- **Projection.** Cylindrical equal-area (the Gall-Peters family),
  standard parallel 45 degrees. x is longitude, linear; y is
  sin(latitude), the equal-area coordinate, over the window
  sin(-60°) to sin(85°). The map space is therefore 1 wide by 0.593
  tall and is fitted into the frame without distortion. No Mercator
  proportions anywhere: Africa sits large and centered, the Americas
  to the left, Asia to the right, southern landmasses visually heavier
  than a Mercator would allow.
- **Continent polygons.** Fourteen hand-authored coarse polygons in
  lon/lat (10–60 points each): North + Central America (with a real
  Hudson Bay notch cut into its north-east), Greenland, South America,
  Africa, Madagascar, Eurasia, Britain, Japan, Sumatra, Borneo, Java,
  New Guinea, Australia, Tasmania. Eurasia is a single unbroken
  polygon — one landmass, no internal seam — because the work admits
  no borders at all, not even continental ones drawn too proudly.
- **Scatter model.** One fixed mulberry32 stream. Each polygon is
  allocated spheres in proportion to its projected area (shoelace, in
  equal-area space, so the allocation is itself equal-area honest),
  summing to a 2,500 target. Homes are placed by rejection sampling in
  the polygon's bounding box with a point-in-polygon test, subject to
  a minimum-distance rule (0.94 × the mean spacing) checked against a
  spatial hash grid: loose packing, small gaps, no overlaps, nothing
  outside the coastlines. If a polygon underfills after generous
  attempts, the minimum distance relaxes in 0.86× steps (three rounds
  maximum) and sampling tops up. Final count: 2,505 spheres, radius
  0.44 × mean spacing.
- **Tremble.** Each sphere carries seeded phases and a slow angular
  frequency (0.45–0.95 rad/s). Its frame offset is a closed-form
  ~1 px shiver, sin on x and cos on y at slightly different rates so
  the floor's breathing never resolves into a pattern.
- **Tap scatter.** Taps are recorded as {map position, anchored time},
  capped at the last 16. A sphere's displacement from each tap is a
  pure function of elapsed time: a Gaussian influence over distance
  (radius 0.17 of map width), a fast roll-out (1 − exp(−τ/0.22)), and
  a friction decay (exp(−τ/5.2)) that is under 2.5% by τ ≈ 19 s: the
  ~20 s creep home. Direction is radial from the tap with a 0.3
  tangential roll. Successive taps sum. Because position = home +
  tremble + Σ tap functions, the re-formed map is a function of its
  history and is never reset.
- **Drawing.** Three batched passes: the continent silhouettes filled
  in deep shadow tone at 0.5 alpha, pooled slightly down-right beneath
  the spheres; one faint offset shadow dot per sphere (black, 0.38);
  the red discs; then one small pale highlight dot per sphere. Batched
  single-path fills keep ~2,500 spheres cheap per frame.
- **House rules.** Canvas sized from the Visual Viewport API with
  resize listeners on both visualViewport and window; canvas pinned in
  px inside draw(); phone detection via window.screen physical size
  (min dimension < 700) with the tall-aspect fallback; page ground is
  the floor tone. Frame one is the synchronous draw at t = 0. rAF is
  typeof-guarded; no audio, no text but the title.

## Deviations

- **Flat spheres instead of radial-gradient glass.** The house
  renderer has no gradients (and this piece's brief forbids them), so
  each sphere is a flat #C41E1A disc with one #FF7A6B highlight dot:
  stylised glass, as the prompt allows.
- **Closed-form scatter instead of integrated spring physics.** The
  prompt describes spring-back physics; integrated physics cannot
  pass the determinism gate, so the roll-out and creep-home are
  evaluated as decaying functions of the recorded tap events. The
  visible behaviour — scatter, friction, slow re-forming — is the
  same.
- **Deep shadow as pooled silhouette.** The palette's deep shadow tone
  is rendered as the continent shapes pooled under the sphere field
  (plus the one faint per-sphere shadow dot), which is what "deep
  shadow between spheres" looks like from above.
- **Antarctica omitted.** The polygon set covers the inhabited
  continents of the original floor works; the empty southern ocean is
  left as floor.

## QA log

- Rendered with the house node-canvas renderer at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Second render deleted.
- Sphere count verified by an instrumented throwaway copy: 2,505
  homes placed (spec band 2,000–3,000), radius 0.0036 map units.
- Read-backs: desktop shows a clearly recognisable equal-area world —
  Americas left with the Hudson Bay bite and a tapering Central
  America, Greenland above, Africa large and centered under a thin
  Mediterranean gap, India's triangle and South-East Asia's tail,
  Indonesia as an island scatter, Australia bottom right with its
  Tasmania dot. No spheres outside coastlines; no labels, no borders,
  no text. Mobile keeps the full map unclipped and legible at phone
  scale, letterboxed on the floor tone. Thumb matches frame one.
