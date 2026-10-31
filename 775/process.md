# No.775 Black Earth

EXPANSION #94 mary-corse, prompt block 8 "Black Earth". A large black-glazed
slab lying flat, finger-rippled across the whole surface, catching slow sheen
waves as light rakes over it. No bands, no geometry, no objects: pure material
and reflected light.

## Concept

Mary Corse's Black Earth works (late 1970s) are black glaze worked by hand, so
the surface is a field of shallow finger ripples that only exists visually when
light moves across it. The piece is watch-only in spirit: the slab never moves,
never changes; only the light travels. A single slow pass (35 s, across and
back) sends sheen bands sliding over the ripples, troughs falling to pit black,
aligned facets rising through the sheen gray and picking up a faint warm tint
at the steepest glancing angles. Dragging places the lamp in the visitor's
hand; on release the light eases back into its slow pass.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no
  text except the `<title>`. Strict palette: pit black `#060607`, base
  `#0E0E10`, sheen `#2A2A2E`, warm highlight `#4A4238`; page ground is the pit
  black.
- Ripple field: a heightmap built as the sum of four low-frequency sine fields
  (frequencies ~2.1 / 3.4 / 5.2 / 7.9 cycles across the slab, amplitudes
  1.00 / 0.62 / 0.38 / 0.20) whose directions and phases come from a seeded
  mulberry32 stream. The analytic gradient of the heightmap is precomputed
  once per layout on a coarse grid (~11 px cells, ~13 px on phones), together
  with a very low frequency broad-undulation term so the glaze is never flat.
  Per frame each cell is shaded from the current light direction only, so the
  sheen slides without any per-pixel cost and without sparkle: this is glaze,
  not glitter.
- Specular term: `s = -(grad . lightDir)`, scaled by a pass-elevation factor
  and the broad undulation, then mapped through a 20-step quantized ramp
  across the four palette tones (pit in the troughs, base on the flats, sheen
  on aligned slopes, warm only at the top of the ramp). Gradients are
  normalized by their mean magnitude so typical facets spread across the ramp
  instead of huddling at its dark end.
- Perspective: the slab fills the frame edge to edge; the floor-plane
  perspective is applied to the sampling, not the outline. Field samples are
  warped (`warpU` widens the sampled span toward the top, `warpV` compresses
  it vertically), so the top of the frame reads as the narrower, farther edge
  of a floor piece seen from above while the surface still covers everything.
- Light motion: idle azimuth is a closed-form function of elapsed time over
  the 35 s pass (triangular sweep with a sinusoidal wobble, plus an elevation
  breath). Frame one is the synchronous draw at `t = 0`, light raking from
  the left, sheen bands lying diagonally across the ripples. Dragging sets
  the light azimuth from the pointer's direction relative to the slab center
  (the hand carries the lamp); release records the azimuth and time, and the
  azimuth blends back to the idle pass over 1.6 s in closed form. No
  `Date.now()` is ever used for frame one; the rAF loop is anchored at its
  first timestamp and is `typeof`-guarded.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on both `visualViewport` and `window`, canvas style pinned in px inside
  `draw()`, phone detection via `window.screen` (min dimension < 700 px) with
  the `h > w * 1.15` aspect fallback.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and byte-compared
  with `cmp`: identical; the duplicate was deleted.
- First pass read wrong twice over: the slab sat as an inset trapezoid with
  dead black wedges at the sides (not the edge-to-edge floor piece the prompt
  specifies) and the shading huddled at the dark end of the ramp, so the sheen
  barely registered. Fixed by moving the perspective into the sampling warp
  (full-frame surface, compressed far edge) and normalizing gradients by mean
  magnitude with a wider ramp; re-rendered all three sizes.
- Final read-back: all three sizes show a near-black rippled surface filling
  the frame, diagonal sheen bands in `#2A2A2E` with warm `#4A4238` facets,
  pit-black troughs, no sparkle, no blue tint, no text. Mobile keeps the full
  surface with nothing clipped.
- Motion check: a throwaway copy forced to `draw(12)` renders visibly
  different from frame one (sheen bands displaced), confirming the pass moves
  the light while the slab stays fixed; throwaway deleted.

## Deviations

- Perspective is a sampling warp over a full-frame field rather than a drawn
  trapezoid slab outline. Reason: the prompt requires both "slab fills the
  frame edge to edge" and "top edge narrower"; warping the samples satisfies
  both at once, while an inset outline left dead margins that read as a slab
  floating in a void.
- The drag azimuth is derived from the pointer's direction relative to the
  slab center rather than from drag velocity vectors. Reason: it is a stable
  closed-form control (no dependence on event sampling rate), and it matches
  the prompt's model of the visitor carrying the light source across the
  glaze.
