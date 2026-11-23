# No.1635 "String Theories" (MSR4, study #215 marcelo-soria-rodriguez)

- Title: String Theories
- Gallery date: 2006 · 07 · 04
- Interaction cue: "Drag to pluck the strings."
- Prompt: PP882 String Field

## Driver

The piece is a breathing string instrument: straight lines only, density
alone becomes form, and dragging plucks the field.

## Build

- 240 straight line segments between seeded anchor pairs: 150 cross
  cluster, 45 left intra-cluster, 45 right intra-cluster. 44 anchors in
  two loose clusters (22 left at x 0.26, 22 right at x 0.74), the clusters
  offset in height (left centre y 0.46, right centre y 0.58) so the cross
  strings fan diagonally and the centre becomes a real crossing field.
- Every string is drawn with moveTo/lineTo only. No quadratic or cubic
  curve calls, no arc calls anywhere in the file (anchor pegs are 3 px
  flat squares). Straightness verified by source grep and by probe.
- Anchor migration: each anchor drifts on two seeded slow LFOs per axis,
  periods 40 to 70 s, amplitudes 1 to 3 percent of the field. Forms
  appear, dissolve, and reappear over roughly a 48 s breath. Measured:
  anchor 0 moves 39.7 px between t=9 and t=33, and 17.7 px between t=9
  and t=57.
- Charcoal strings (#2B2B28, alpha 0.14 to 0.30, width 1.2) are drawn
  under multiply so crossings accumulate toward black and density alone
  becomes form. 12 cross strings are the violent red accent (#C8102E,
  width 1.4) drawn source-over so the red stays red; its alpha follows
  a 24 s cycle, 0.05 at t=0, 0.26 at t=6, 0.65 at t=12, 0.26 at t=18.
- Drag: pointer drag through the field applies velocity impulses to
  anchors within a 45 percent of min-dimension radius (gain 3.0); each
  anchor is a spring (k 14, damping 4.5) that relaxes back to its
  migration path. Measured: a 12-step drag across the crossing field
  displaces the nearest anchor 37.7 px and changes 135,842 px; after
  release and 4 s of spring steps the displacement is 0.00 px and the
  residual pixel difference from the unplucked field is 0.
- Frame one is at fixed phase t=9 s with seed 1635007 (mulberry32, no
  Math.random, no wall clock). Two fresh draws at t=9 are pixel
  identical. Thumb re-renders byte-identical (md5 below).
- Composition: landscape. Full-bleed on phones; centred landscape band
  (0.80 VH high, up to 1.6 aspect) on desktop with the page ground the
  piece's own paper cream and a hairline frame. Title, date, and hint
  sit on solid paper plates with hairline borders.
- House rules: self-contained, no external assets. Visual Viewport
  sizing with resize listened to on both visualViewport and window.
  Canvas element pinned in draw() via canvas.style.width/height in px.
  Phone detection via window.screen (min dimension under 700 px) with
  aspect fallback. One synchronous frame at load; every
  requestAnimationFrame guarded by a typeof check. Reduced-motion
  renders the fixed frame only. No click-to-reload, no reset button.
  No em dashes in visible copy. No audio. No gradients, no shadowBlur,
  no glow. All motion is slow LFOs, so flicker is far below 14 Hz.

## Deviations from the prompt

- The prompt says lines are drawn "with additive alpha so crossings
  brighten into forms". On a cream ground, additive lightening of dark
  lines is nearly invisible, so crossings are built with multiply
  instead: alpha still accumulates at crossings, but in the direction
  that reads on dark-on-light paper, darker where the strings cross.
  The density-to-form mechanism is preserved; only the blend direction
  changed.
- Anchor scatter is uniform rather than clustered Gaussian, so the two
  clusters fill the band instead of bunching at their centres. This was
  a visual gate fix, not a prompt change: the first build read as a
  thin horizontal bundle.
- The prompt's "seeded slack" is carried as a per-string alpha factor
  (0.75 to 1.0 of base alpha): a straight segment cannot sag, so slack
  modulates how present the string reads rather than bending it.

## Acceptance results (probe harness /tmp/probe-1635.js)

All 22 probes passed:

- Strings 240 (at least 200), cross-cluster 150, accent 12, anchors 44.
- No curve or arc calls in source.
- Anchor migrates (39.7 px over 24 s); clusters sit left and right of
  centre.
- Red cycle varies 0.05 / 0.26 / 0.65 / 0.26 at t=0/6/12/18; 9,440
  red-ish pixels at frame one.
- Drag displaces anchors 37.7 px, visibly moves 135,842 px, springs
  relax to 0.00 px within 4 s, residual 0 px.
- Frame one deterministic (two draws pixel-identical).
- Charcoal crossings present (2,033 px below RGB 120) and the string
  field covers 84,963 ink pixels at frame one.

## QA

- Rendered from the actual script with node
  ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844
  mobile, and 720x720 thumb. All three visually inspected.
- Gate fixes (3 rounds): pluck radius widened 28 to 45 percent of
  min dimension and gain raised 2.0 to 3.0 after the probe showed a
  centre drag barely reaching the cluster anchors; cluster heights
  offset (0.46 / 0.58) and vertical spread widened after the first
  build read as a flat horizontal bundle; anchor scatter changed to
  uniform after the second build still bunched at the cluster centres.
- Final desktop, mobile, and thumb renders inspected: the field fills
  the band, diagonal fanning builds Delaunay-like triangular forms in
  the crossing centre, the red accent reads, title/date/hint plates
  are legible at all three sizes. A render at t=33 confirms the field
  has visibly reconfigured (forms dissolved and re-formed).
- Thumb re-render byte-identical.

## Files

- index.html md5 23e27ce791183a5d3a0c14ca755d14f7
- thumb.png md5 4a003a6a68d86d4ab2c688e7e78625e3
