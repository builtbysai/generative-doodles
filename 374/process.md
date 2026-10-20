# No.374 Moth Mosaic

## Concept

After Olena Kovalova's (al_kovalyova_design) moth suite: a large
moth whose wings are built from small mosaic tiles, each tile a
tiny floral or sprig motif in her stepped blue-to-lavender
watercolor range; the body a fuzzy brown thorax with feathery
antennae; sparse sprigs drifting in the deep-plum negative space.
The moth is dusky and textured rather than butterfly-pretty: the
wing edges carry authored notches, like a worn specimen. The wings
beat slowly; dragging near a wing ripples the tiles outward like
disturbed water and they settle back into place; double-tap
reseeds which motif each tile holds.

Palette, flat only: ground deep plum #2A1F2B; grout #1E1520; body
#4A2E1E; highlight cream #F5EFE2; accent gold #C9A24B. The
blue-to-lavender ramp is six discrete stepped flat tones, never a
gradient: #9BB8D3, #98ACCA, #969FC2, #9393B9, #9186B1, #8E7AA8.

## Construction

One canvas, 2D, all marks drawn directly each frame from fixed
data. No offscreen canvas, no filters, no blur shadows, no
gradients.

- Wings: each wing is authored in local coords (origin at the
  root, +x outward) as a list of cubic segments with three
  straight notch bites: one on the outer edge, one on the trailing
  edge, one on the hindwing bottom. The outline is sampled once
  into a polygon (22 steps per cubic) that serves as both the
  drawn silhouette and the tile mask. The left wing is the exact
  axis mirror: local x negated, rotation negated, about its own
  root.
- Mosaic: an 8x8 grid of 56px cells spans the wing bbox; a cell
  becomes a tile when its centre falls inside the sampled outline
  (ray-cast test), giving 49 tiles per wing, 98 in all. Tiles are
  drawn 50px square so grout shows between them, and clipped to
  the silhouette path each frame, so edge tiles follow the
  tattered outline exactly. Tone steps run from blue at the root
  toward lavender at the tips and lower edge, computed from cell
  position; a fixed authored set of six cells is cream.
- Motifs: the library is exactly four mini-motifs - petal (a
  five-petal flower with a gold heart), dot (a gold cluster with
  a cream centre), leaf (a stem with two leaflets), spiral (an
  Archimedean swirl). Three authored arrangement tables map each
  cell to a motif: a diagonal weave, a scattered stride, and a
  2x2 block pattern. Double-tap advances the table; tones and
  positions never change.
- Body: filled thorax, head and tapered abdomen ellipses in
  #4A2E1E, grout segmentation arcs across the abdomen, and fuzz
  strokes baked at load from a fixed-seed LCG (seed 374), so the
  fuzz is fixed data, never per-frame noise. Antennae are two
  authored cubics with tapering barb strokes sampled along them;
  eyes are gold dots with cream glints.
- Sprigs: eleven fixed sprigs in the negative space, each a
  curved stem with three leaf pairs in stepped tones and a gold
  tip dot, drifting on whole cycles of the master loop (one bob
  cycle, two sway cycles each) so the loop is seamless.
- Loop length: 12 seconds, one seamless master loop. The wing
  beat is a 3s cycle (four whole beats per loop), plus or minus
  10 degrees about each wing root; the sprig drifts complete
  whole cycles per loop.
- Determinism: frame one is drawn synchronously at the constant
  phase T = 1.75s into the loop, where the beat sine sits at
  -0.5, angle -5 degrees: wings mid-beat. The rAF loop
  (typeof-guarded) advances T from that same anchor in fixed
  1/60 ticks. Frame one never reads a wall clock.
- Interaction: dragging applies a radial impulse to tile
  instances within 190 design px of the pointer, pushed outward
  with strength fading by distance and scaled by pointer travel.
  Each tile is on a damped spring (stiffness 110, damping 10)
  back to its authored offset of zero, snapping to exactly zero
  below a hair threshold, so the mosaic always settles back to
  precisely its authored positions. Double-tap (two taps within
  0.35s and 30 design px, each under 0.3s with under 2px of
  travel) advances the motif arrangement table. Never
  click-to-reload. Pointer coordinates convert through the
  stored fit transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via
  style width/height in px; phone detection via window.screen
  min dimension under 700px with aspect fallback (h > w *
  1.15); design space 1280 x 900, centred fit, moth spanning
  about 70% of the frame width; page ground is the piece's own
  plum.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png), all from the
  shipped script.
- thumb.png rendered twice and byte-compared: identical.
- Desktop render inspected: centred moth fills about 70% of the
  frame width; both wings read as a true mosaic, tiles clipped
  cleanly to the wing silhouette with grout between, all four
  motifs present (petals, gold dot clusters, leaves, spirals),
  cream highlight tiles scattered as authored; tones step from
  blue near the body to lavender at the tips; notches bite the
  outer, trailing and bottom edges; fuzzy segmented body and
  feathery antennae read clearly; sprigs sit in the negative
  space without touching the wings.
- First desktop pass caught two outline faults, both fixed and
  re-rendered: the hindwing notch dipped below the bottom edge
  and backtracked in x, throwing triangular spikes under the
  wings (notch rebuilt to bite upward with monotonic x), and
  the leading edge peaked too low, leaving a wide empty grout
  band above the top tile row (leading-edge controls raised so
  the mosaic reaches the wing's top curve).
- Mobile render inspected: centred fit keeps the whole moth in
  frame, plum ground continuous to the edges (the page ground
  is the piece's plum), sprigs visible around it, no
  letterboxing artefacts.
- Load-time assertions pass in the renderer: loop 12s, exactly
  6 stepped tones, exactly 3 motif tables, beat period divides
  the loop, wing mask holds 49 tiles per wing.
