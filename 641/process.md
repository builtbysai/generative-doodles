# No.641 "Doce Metros" - EXPANSION #78 paulo-cox, block 1

## Concept

Paulo Cox's 12-metre leporello, EL LIBRO LARGO DE LOS ANDES, read as an
endless strip: one continuous mountain panorama built from three receding
ridgeline layers (far, mid, near), each a darker flat silhouette than the
one behind it. Snow caps the high peaks as flat white shapes clipped to
the ridge form. A single flat dawn-amber band sits behind the farthest
ridge. Plain folio tabs hang from the top edge at regular intervals, each
with one tick mark and no text: the book's tramo / mountain / folio
addressing system made graphic. Dragging unfolds the leporello (the
layers parallax), releasing lets it drift on its own, and a double-tap
generates a new 12-metre stretch. The strip wraps seamlessly forever.

Palette (strict): ground #0C0F14, far ridge #2E3A4A, mid ridge #1E2836,
near ridge #141B26, snow #E8EDF2, dawn amber #E8A33D. No text anywhere;
tabs carry tick marks only.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets,
  no audio. Canvas size comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection uses
  window.screen physical size (min dimension < 700px) with the aspect
  fallback h > w*1.15, and only widens the minimum tab width; the layout
  is all fractions of the frame, so the strip refits a phone frame and
  the page ground is the piece's own near-black.
- Toroidal ridgelines: each ridge is 1D midpoint displacement generated
  on a ring. 256 samples span one strip segment (3 screen widths);
  sample 0 and sample 256 start as the same seeded value, recursive
  midpoint fills (displacement scale multiplied by the layer roughness,
  0.68 to 0.72, each level) preserve that equality, and a final linear
  normalization to [0.04, 1] maps both endpoints identically, so the
  ring stays closed. Height at any strip position is linear
  interpolation between samples with the position taken modulo the
  segment, which makes ridge height a pure function of seeded strip
  position: the wrap cannot seam by construction, at any offset.
- Parallax: far 1/4, mid 11/20, near 1. Layer offsets are computed as
  mod(off, segW*den)*num/den mod segW, so a whole-period base offset
  (20 segments) lands on exactly 0 for every layer instead of a
  floating-point residue. Folio tabs ride at mid parallax (11/20); tab
  count (8 to 10) and phase are seeded per generation, so a reseed
  re-spaces them.
- Snow: each layer has one fixed snow line (a screen-height fraction).
  The ridge silhouette is traced once in its own color, then traced
  again in snow white inside a clip rectangle above the snow line, so
  caps follow the ridge shape exactly and can never float. The amber
  band is one flat rectangle with hard edges behind the far ridge; no
  gradients anywhere.
- Determinism: frame one is the synchronous draw(0) at strip offset 0
  on the anchored clock (performance.now at load; later frames advance
  the offset by dt only while not dragging). Nothing in frame one is
  derived from Date.now. The rAF loop is typeof-guarded. Reseed fades
  the new stretch in from the ground tone over 0.55 s.
- QA hooks (inert in normal viewing): ?seed=off<px> forces a static
  strip offset; ?seed=<n> reseeds. Used below for the wrap checks.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF,
no AudioContext, no document.createElement, no offscreen canvas, no
ctx.filter), so every render is the synchronous first frame.

- qa-desktop.png (1280x900): three flat jagged ridges stacked to the
  horizon, amber band glowing through the far valleys at left, snow on
  the far highland at right, one mid-ridge cap, small near caps, three
  folio tabs with amber ticks at the top edge. Nothing clipped.
- qa-mobile.png (390x844): the strip refits the tall frame; all three
  layers carry snow, tabs legible, nothing clipped. Relief is more
  vertically dramatic on the narrow frame, which reads as steep Andes
  rather than distortion.
- thumb.png (720x720): reads clearly at thumbnail size; layers, band,
  caps and tabs all distinct.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Repeated after every tuning round, identical each time.
- Wrap: a forced render at a whole-period offset (?seed=off43200 at
  720 wide = 20 segments, the common period of the 1, 11/20 and 1/4
  parallaxes) byte-matches the offset-0 thumb exactly. A forced render
  just before a join (?seed=off2140, 20 px before the near layer's
  segment boundary) was read back: ridges and tabs run continuously
  across the frame with no seam line or step at any layer. All forced
  copies were deleted after the checks.
- Tuning rounds: the first build's displacement clustered near its base
  value, giving dune-like ridges and a far ridge that hovered at its
  snow line as one flat slab. Fixed by normalizing each ridge to its
  full relief, raising displacement scale and roughness, and setting
  per-layer snow lines so only true peaks cap (far 0.290H, mid 0.500H,
  near 0.685H of frame height). Where the far ridge's seeded high
  region runs broad, its snow reads as a high snowfield with a jagged
  top edge, consistent with a flat snowline.

## Deviations

- The prompt's "snow only on peaks above a fixed height line" is
  implemented as one fixed snow line per ridge layer (three lines,
  each fixed in frame fractions), so caps appear in every depth plane
  rather than only on the far ridge, which a single global line would
  have produced given the stacked composition. Each line is fixed, and
  the clip construction is exactly as specified.
- No other deviations. No microphone or audio is involved in this
  prompt; nothing was omitted.
