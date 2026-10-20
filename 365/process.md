# No.365 Sandpiper Pair

## Concept

After Julianne Haness's (jmarie.creates) "White Bedding
Sandpiper": cream sandpipers standing in conversing pairs on
a warm caramel ground, hand-inked in dark umber with stippled
feather texture. Two-tone discipline plus the ground, nothing
else: cream #F1E7D2, umber #5A3A22, caramel #B26A35. The
birds are a wallpaper repeat at three staggered stations per
tile, each pair two birds facing each other at slightly
different angles and scales, beaks almost meeting. The ground
is not bare: broad flat umber thread bands cross it in a
plain weave, their intersections stepping darker. The only
motion is the peck. In each pair, one bird occasionally dips
its head in a slow probing bow while its partner watches.

## Construction

- One hand-authored bird vector in local coords (feet at
  y = 0, facing +x): two long jointed legs with three-toed
  feet, a short tail wedge, a plump bezier body, a wing lens
  with two scallop ticks, and a head group (neck wedge, round
  head, crown line, eye, long slanting probing beak) that
  rotates about the neck base at (184, -142).
- Stipple is fixed data, generated offline from fixed seeds
  and written into the file: two body fields of exactly 118
  dots and two head fields of exactly 13 dots (asserted at
  load). Dots are drawn as JS data each frame, clipped to the
  body and head paths with canvas clip; the prompt's offscreen
  layer is never used. One canvas total; no gradients, no
  filters, no shadowBlur.
- Pairs come from a fixed table of 3 arrangements, each with
  exactly 3 pairs (asserted): anchor, scale (0.86-1.10), pair
  tilt, gap (588-622, so the beak tips nearly meet but the
  bodies never merge), per-bird tilts, which bird dips, and
  its dip slot. Double-tap advances the arrangement; drag
  pans the oversized repeat (tile 1040x920) with the position
  clamped to one period and persisting on release.
- The peck schedule lives inside one seamless 24-second
  master loop: each pair's dip window is 2s long, the three
  windows in an arrangement are staggered and asserted
  non-overlapping, and the dip angle is a sine bump peaking
  at 0.45 rad mid-window. Exactly one bird dips at a time.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 4.6s, which is 0.6s into pair 0's dip
  window (4.0-6.0s), so exactly one head is mid-dip, beak
  swung down. The animation clock is anchored to that
  constant plus elapsed time in 1/60 ticks, rAF
  typeof-guarded; frame one is never derived from a wall
  clock, so the thumbnail reproduces byte-identically.
- House rules: Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned every frame in
  px; phone detection via window.screen min dimension
  < 700px with aspect fallback; design space 1280x900,
  cover-fit full-bleed (field composition), page ground in
  the piece's caramel.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (desktop), 390x844 (mobile) and 720x720 (thumb). Thumb
  rendered twice: byte-identical (md5 7139b133...).
- First desktop pass failed inspection: the pair gap (318-348)
  was sized for bodies alone and the 284px beak-to-tail span
  made each pair fuse into one two-headed blob, the second
  bird's body covering the first bird's head. Gaps widened to
  588-622 so beak tips nearly meet and bodies never overlap;
  the breast curve was also rounded (it read pinched) and the
  first weave (alternating dash checker) read as brickwork,
  so it was rebuilt as broad thread bands with stepping
  crossings. Re-rendered and re-inspected after the fixes.
- Desktop: three conversing pairs at three scales on the
  woven caramel, stipple and wing lenses legible, top-left
  pair's left bird mid-dip with its beak swung down, all
  other heads up.
- Schedule probe (temporary copy at T = 11.8s, not shipped):
  the middle pair's right bird is at full dip (its slot is
  10.8-12.8s) and every other head is up, confirming the
  staggered schedule and that the dip direction survives the
  mirrored bird.
- Mobile: cover-fit centre crop, birds large and legible,
  weave continuous to every edge, no letterboxing.
- Palette audit: the file contains exactly the three specced
  hexes and no others; no em dashes; no absolute URLs; no
  Math.random (all variation is tabled data).
