# No.378 Marine Building Fan — process

## Concept

After Jen K's (@jenkbdoodles) art-deco celestial maximalism: the
flapper sunburst she drew from the Marine Building elevator doors in
Vancouver, rebuilt as a watch-only wall of opulence. Thirty-six gold
ray bundles rise from a vanishing arc below the frame and spread 140
degrees across near-black, one band of them oxblood. Inside the fan,
her celestial icon grammar (crescent moons, five-point stars,
all-seeing eyes, crystals) sits in cream and gold, large at the rim
and shrinking toward the arc. The rays breathe slowly and a shimmer
sweeps across them; there is nothing to touch, by design.

Palette, closed: ground #101014, ray gold #C9A24B, shadow-line deep
gold #8A6A2E, icons cream #F3EBDD and star gold #E8C547, one oxblood
band #7A2E4A. Flat colour only.

## Construction

- One canvas, design space 1280x900, centred fit; the page ground is
  the piece's own near-black, so the fan floats on the same black at
  any viewport. Sizing comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; the canvas element is
  pinned by style width/height every frame; phone detection uses the
  window.screen physical size with the tall-aspect fallback.
- Fan geometry: arc centre at (640, 1120), below the frame. The wedge
  spans exactly 140 degrees, canvas angles -160 to -20. Rays start on
  the base arc at radius 300 and end on the rim: at the centre angle
  the rim reaches y = 300, so the fan mass occupies the lower
  two-thirds. A deep-gold annular sector under the ray roots and two
  rim arcs (gold at the long radius, deep gold at the short) finish
  the fan.
- Ray bundles: exactly 36, asserted at load. Each bundle is three flat
  lines: a gold main with a deep-gold shadow line on each flank. Even
  bundles run to radius 820, odd bundles stop at 774, so the rim
  scallops. Bundles 26-29 form the single oxblood band, asserted to be
  exactly four and contiguous. Every bundle's angle jitter (plus or
  minus 0.3 degrees) and length jitter (plus or minus 10px) is baked
  at load from a fixed-seed LCG; nothing is random per frame.
- Icons: exactly 96, asserted, from a library of four motifs only.
  Crescent by exact two-circle geometry (inner circle centred at
  0.42R with radius sqrt(R^2 + (0.42R)^2), so its arc passes through
  the outer circle's top and bottom points). Star as a ten-point
  alternating polygon. Eye as a filled almond with a ground-colour
  iris, gold ring and cream pupil. Crystal as a faceted polygon with
  ground-colour facet lines. Positions are a fixed seeded scatter
  inside the wedge; each icon's scale is a function of its radius
  (0.5 at the arc growing to 1.25 at the rim), so the grammar shrinks
  toward the arc as hers does. Icons are drawn as path data every
  frame, clipped to the wedge path; no sprites, no offscreen canvas.
- The prompt's gradient-mask shimmer on a separate ray layer is
  replaced, per the batch adaptation flag, with data-only drawing on
  the same canvas: once per 20s a band about 16 degrees wide sweeps
  the wedge, and bundles inside it get their main line redrawn in
  translucent cream directly over the gold, alpha shaped by distance
  from the band centre and a sine envelope that fades at both ends of
  the sweep. Nothing is composited and no gradient is used.
- Loop: 60 seconds. It holds 5 whole breath cycles of 12s (ray
  widths oscillate about plus or minus 1px around their base, phased
  slightly from bundle to bundle) and 3 whole shimmer sweeps of 20s,
  so the loop is seamless.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 30s, where the shimmer band is centred on -90
  degrees at full envelope (mid-sweep over the middle rays) and the
  breath sine is at zero (widths at base, mid-breath). The animation
  clock advances from that anchor in fixed 1/60 ticks accumulated
  from rAF timestamps; rAF is typeof-guarded. Frame one never reads
  a wall clock. No pointer handlers exist: watch-only.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Desktop: fan complete and centred, 36 bundles visible as grouped
  triple lines with the scalloped double rim, the oxblood band in
  one run on the right, icons reading clearly in all four motifs and
  shrinking toward the base arc, the shimmer caught mid-sweep as a
  brighter column over the central rays.
- Thumb: the fan, the oxblood band and the icon field all read at
  gallery size.
- Mobile: centred fit keeps the whole fan in frame on the continuous
  near-black ground, no letterboxing colour break.
- Thumb rendered twice from the shipped script: byte-identical.
- Grep-verified: no gradients, no shadowBlur, no offscreen canvas,
  no Math.random, no Date.now, no em dashes, no absolute URLs.
