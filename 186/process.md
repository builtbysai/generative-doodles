# No.343 Trinket Drape

## Concept

After MyClayCo's breakout trinket-dish cutters (2022-07-05)
and their Tiered Ginkgo Leaf cutter (2023-04-23): a radial
petal profile draped into a shallow dish, seen from
directly above, shaded in flat bands like a topographic
map. The dish turns slowly on a 28s seamless loop while a
ripple travels petal to petal, each petal lifting in
sequence. Watch-only: the transformation and the travelling
lift are the piece. No interaction, no text, no chrome.

## Construction

- One canvas, 2D, self-contained. Design space 1280x900,
  centred fit; the page ground takes the piece's near-black
  #101314 so the dish sits in dark margins on any screen.
- Profile: exactly 12 petals, asserted in code
  (PETALS === 12). The rim radius at any angle is full at
  petal tips, pinched to about 0.905 in the grooves, with a
  small ginkgo notch cut at the centre of each tip.
- Drape: a heightfield h(u, theta) held as data, where u is
  radius normalised by the local rim radius. Three terms:
  a shallow bowl drape rising from basin to rim; a petal
  sculpt that raises each fan and dips the grooves, growing
  toward the rim; and a travelling ripple, a 12-lobed wave
  whose phase advances exactly 2*pi per 28s cycle, so the
  lift visits the petals in fixed index order and returns
  to petal 1 at the seam.
- Render: the field is thresholded into exactly 4 flat
  teal bands, asserted (BANDS.length === 4): #163E3D,
  #1D5250, #256664, #2E7D7B, low basin to high rim. Drawn
  as a polar raster of annular cells (92 radial x 264
  angular, 22 cells per petal), each cell filled flat with
  its band colour and overlapped by a hair so no seams
  open. The 12-petal profile is stroked over the field in
  cream #F2EBD8 as the petal edge line. No smooth shading,
  no gradients, no shadowBlur, no filters, no offscreen
  canvas; the petal edge is the only line.
- Motion: rotation is a theta offset completing exactly
  one whole turn per 28s cycle (TURNS = 1, asserted
  integer), so frame 28s is identical to frame 0. The
  clock starts offset 11s, so frame one is already
  mid-rotation with the ripple mid-travel.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px with
  aspect fallback (h > w*1.15); synchronous first frame;
  requestAnimationFrame typeof-guarded; fixed analytic
  field, no runtime randomness, no seeds needed.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png); all three inspected.
- Desktop: the dish sits centred in dark margins, 12
  petal lobes countable around the cream rim with the
  ginkgo notch visible at the tips, four flat bands
  stepping basin to rim like a contour map, the band
  edges wobbling with the petal sculpt; the travelling
  lift shows as one sector's bands pushed outward.
  Frame one is developed: mid-rotation, ripple
  mid-travel, no empty or half-drawn state.
- Mobile: centred fit holds the whole dish mid-frame on
  the continuous near-black ground, nothing clipped,
  bands and petal count still legible at 390 wide.
- Thumb: fully legible at 720px; the 12-petal silhouette
  and the four bands read at gallery size.
- One build fix: per-ring angular resolution was tried
  to calm the polar cells and rejected, because
  mismatched wedge grids between neighbouring rings
  opened hairline ground-colour gaps across the field.
  The grid stays uniform (92 x 264); a flat centre cap
  disc at the centre band colour covers the pole and
  reads as the dish's small centre medallion.
- Determinism fix (fly's gate): the first frame was
  drawn from a wall clock (Date.now() minus an 11s
  offset), so the rendered phase drifted with real
  elapsed time and the thumb did not reproduce from the
  script. The clock is restructured: frame one is drawn
  at the constant phase T_OFFSET = 11s exactly, and the
  rAF loop computes t = 11 + elapsed seconds since load
  from that same anchor. Verified after the fix: three
  renders at 720x720 are byte-identical (same md5), the
  saved thumb.png is one of those renders, and the
  re-rendered desktop and mobile frames show the same
  developed frame as before - dish mid-rotation, ripple
  mid-travel, nothing else changed.
