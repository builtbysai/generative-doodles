# No.439 The Fox Wears the Lights

After Angelina Bambina's animal-accessory merge
(WonderfulWinterWeek24 Prompt 4, "Bobble hat - Snow
fox - Garland"): a woman in a knitted beanie cradles
a white fox whose tail is wrapped in festive lights
that chase along it, snow drifting, her breath
fogging in the cold.

## Concept

The merge is the piece: the garland is not draped on
the fox, it IS the fox's tail. The tail leaves the
body as a thick white ribbon, curls inward across
the right half of the frame in a tapering spiral,
and the fourteen bulbs sit on that spiral's curve,
lit by a chase that travels base to tip. Everything
else stays serene and still: the woman's long white
hair, her green-and-orange beanie, the fox asleep in
her arms, snow falling over a soft pink ground, one
crescent moon. No other animals, no text, no kitsch
beyond the lights themselves.

## Construction

- Palette closed to the eleven specced hexes. Her
  skin resolves inside the palette to the moon cream
  #F6E7B4 (the No.433 resolution in this set); her
  coat takes the beanie green #5C8A4A, her scarf and
  mittens the beanie orange #E8823C; the fox's nose,
  closed eye, paw seams and bulb sockets take the
  hair blue shadow #B8C4D8; blush is the light pink
  at flat alpha. No colour exists outside the set.
- The tail is a tapering spiral ribbon: an
  Archimedean curl from the fox's rear (795, 705),
  radius 244 shrinking to 36 over 1.9 turns about
  (1010, 590), stroked in 48 segments of width 56
  down to 15. Exactly 14 bulbs (asserted) sit ON the
  curve at equal parameter steps, each with a small
  socket dot under its colour.
- Beat table. Master loop 120s (asserted) =
  LCM(3, 8, 10), so every prompted cadence lands in
  whole counts:
  - Tail-light chase: 3s cycle, 40 per loop. One
    wave travels the tail per cycle; each bulb's
    brightness is stepped flat in three levels
    (alpha 0.30 dim, 0.62 lit, 1.0 full with a flat
    0.16 halo disc and a hair-white glint), the
    phase shifted by bulb index along the tail.
  - Fox ear twitch: one every 8s exactly as
    prompted, 15 fixed slots per loop; the far ear
    rotates on a half-sine for the first 0.7s of
    its slot and rests otherwise.
  - Breath fog: one event every 10s exactly as
    prompted, 12 per loop. Each event runs 3s in
    three stepped flat-alpha stages (0.16 / 0.30 /
    0.13) as a four-ellipse cloud at her mouth that
    grows, drifts and thins, gone 7s before the
    next event.
  - Snow: a fixed table of exactly 110 dots
    (asserted), each completing one whole-field
    fall every 10s (12 falls per loop), sideways
    drift on the same 10s period, so the seam is
    exact.
- The double-tap reseed is a FIXED AUTHORED TABLE
  of exactly 3 entries (asserted): the four light
  colours in a new order and the moon at a new
  position change together per entry (top-left,
  top-right, top-centre). Double-tap advances the
  table by one. No Math.random at runtime; the snow
  table is generated once from a fixed-seed LCG.
- The beanie's knit is stitch data clipped to the
  beanie shape: green dome, two orange stripes, an
  orange brim, rows of short stitch dashes in the
  two beanie colours at flat alpha, and a pom-pom
  of six mustard circles. The fox is bezier body
  data with a pointed snout, tucked paws, one
  closed eye; her hair is a tapered mass wide at
  the crown with a blue-shadow rim, side locks and
  a soft-bowed fringe; her sleeves run under the
  fox and the mittens are drawn before the body so
  they cup it from underneath.
- One canvas, no offscreen canvas, no filters, no
  gradients, no shadowBlur. Flat colour only; the
  translucencies are all stepped flat alpha (fog
  stages, bulb glow steps, blush, the grounding
  shadow).
- Interaction: WATCH-ONLY loop plus DOUBLE-TAP
  (0.34s piece-time window, 60 design px) advancing
  the authored table. Never click-to-reload. No
  text, no hint, no UI anywhere.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 21.35s (mid-chase with
  several bulbs lit, breath fog at its middle step,
  snow mid-fall, moon top-left); the animation
  clock anchors there and advances in fixed 1/60
  ticks, never from Date.now() or a wall clock.
  Sizing from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas
  pinned via style width/height every frame; phone
  detection via window.screen min dimension <
  700px with aspect fallback; design space
  1280x900, CENTRED fit with the page ground in the
  ground pink; pointer coordinates converted
  through the stored fit transform (S, OX, OY);
  rAF typeof-guarded. A QA hook (?seed=N) starts
  the piece on table entry N; default play is
  unaffected.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). Thumb rendered twice from the
  shipped script: byte-identical (md5
  13b55ab305878d3a0df5de737400a8b7), re-confirmed
  after the last fix round.
- Desktop frame one reads as specced: crescent moon
  top-left, the woman in her striped beanie with
  pom-pom, long tapering hair and green coat, the
  white fox cradled centre-lower with its tail
  spiralling across the right half, bulbs on the
  spiral at all three chase steps (full gold and
  pink bulbs with halos, lit and dim bulbs between),
  the breath-fog cloud at her mouth, snow over all.
- Fixes during QA: the first hair mass was a plain
  ellipse that read as an egg and dwarfed the face;
  it is now a tapered path, wide at the crown and
  narrowing to the hem. The fringe's return edge
  bowed the wrong way and made a pentagon of the
  face; it now bows down as a bob line. The bulb
  sockets were drawn over the bulb colour at full
  size and read as grey eyes inside the dim bulbs;
  they are now small dots under the colour. The
  scarf's hanging tail sat behind the fox's head
  and vanished; it now hangs on the far side, and
  the band end reads beside the head. One coat-side
  arm cap poked out as a knob; the sleeve now
  starts inside the coat. The mittens sat below the
  fox as loose orange balls; drawn before the body,
  they now cup it from underneath. A stray detail
  dot on the moon was removed.
- Table entries 1 and 2 rendered via the seed hook:
  entry 1 moves the moon to the top-right and runs
  the teal-first colour order; entry 2 centres the
  moon at the top and runs the gold-first order.
  The crescent carve (ground-coloured overlay) reads
  correctly at all three positions.
- Mobile: CENTRED fit keeps the whole composition
  in frame on the ground pink, the pair and the
  full tail spiral legible at phone size.
