# №1267 "Vacuum Topography" (sdk-forsale SF4, PP426)

## Prompt

A landscape of lumpy, plastic-sheathed forms: the ghosts of packed memory
objects (a photo frame, a shoe, a book) pressed flat. The packing action
compresses the whole terrain along one axis; released, it springs back. The
final state renders in aluminum with a graphite wash, personal ephemera read
as geological strata. Grounded in Sammy Seung-min Lee's 70lbs Topography
Models (2025) and 62" Topographic model (2024): aluminum castings of
vacuum-sealed storage bags as geological terrain.

## What the piece is

A low horizon (sky is the upper third, terrain the lower two-thirds) over a
matte aluminum heightfield. Three object bulges rise from the field: a photo
frame at 0.20, a shoe at 0.50, a book at 0.78 across the width. Each object
is drawn clipped to the terrain silhouette, so it reads as an effect pressed
under the bag surface, never floating above the crest: the frame is a
graphite panel with a seam-red inner frame, the shoe a flattened dark wedge
with a red sole line, the book a lined panel with a red spine. Four graphite
strata bands follow the profile, a red dashed stitch runs along the crest,
and flat light-alpha ellipses give the bag sheen. Palette exactly as
specced: aluminum #B9BEC4, graphite #3B3D40, bag sheen #D8DDE2, shadow
#22242A, seam red #A03A2E. No chrome, no generic noise terrain.

## Motion

One 24-second pack/seal/release cycle, closed form over cycle time:

- 0-6 s relaxed (compression 0)
- 6-12 s compress, smoothstep to 1: the relief presses down along the
  vertical axis (height x 0.45 at full press) and tightens 8% toward center
- 12-18 s sealed hold at 1
- 18-24 s spring release: cosine fall with a small damped overshoot
  oscillation, back to 0 at 24 s

Frame one is t = 0, the relaxed state, so the three objects read clearly.

## Interaction

Drag anywhere on the terrain to compress a region: a Gaussian dimple
centered on the drag point deepens with dragged distance (0.3 base, up to
0.7) and, on release, breathes back over 4 seconds with a small rebound
oscillation. All dimple state is a closed-form function of the recorded
drag list and piece time, never frame-integrated. No click-to-reload, no
visible text besides the title.

## House adaptations

- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 fallback; landscape fill is full-bleed on phones,
  page ground is the piece's own shadow color.
- Deterministic first frame at constant phase t = 0; the rAF loop is
  anchored as offset plus elapsed-since-load. No Math.random anywhere;
  terrain undulation is fixed sines plus fixed object bumps.
- node-canvas safe: no requestAnimationFrame without a typeof guard, no
  AudioContext, no document.createElement, no WebGL, no offscreen canvas,
  no ctx.filter, no shadowBlur, no gradients. Sheen and wash are flat
  alpha shapes; the terrain clip keeps them inside the silhouette.
  Ellipses are single-subpath calls with a moveTo before each, per the
  node-canvas arc quirk.
- Silent: no audio, no microphone, no getUserMedia.

## QA

- Rendered from the actual script at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected. Desktop and mobile hold the same
  read: three object insets pressed into a stratum-banded aluminum field
  under a red stitched crest.
- Fix rounds: (1) first pass had sharp peaks and sheen ellipses floating
  in the sky, and objects hovering above the crest; softened the bumps,
  clipped sheen/wash/objects to the terrain silhouette, and re-centered
  the objects into the relief. (2) The shoe's visible sliver was too thin
  after clipping; shifted its center down so the flattened wedge reads.
- Cycle and dimple verified numerically from the shipped code:
  compressAt(0)=0, (9)=0.5, (15)=1, (24)=0; a test dimple reads >0.2
  mid-drag, exactly 0 four seconds after release, and <0.01 far from its
  center.
- Thumb rendered twice at 720x720, cmp byte-identical.
- index.html md5: cfa8c397e3168e3c71296744e195ea66
