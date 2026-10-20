# No.428 Leaf Picnic — yaelhofri (EXPANSION #46, YAE4)

Gallery date: 2003 · 03 · 15 (formula date, 2002-01-10 + (428+1) days).

## Concept

After Yael Hofri's Sweetemberdays26 Prompt 3: food
as communal glue, the sharing moment rather than
the eaters. A pink checked picnic blanket lies
rotated as a diamond over grass, its edges bleeding
off the frame; at the centre sits a lattice-topped
pie. Exactly four hands, spanning three skin tones
and four sleeve colours, enter from the top, left,
right and bottom edges; the right hand holds a
coffee pot and pours a dotted stream into a blue
mug at the bottom right. Fall leaves rest on the
blanket, tumble across its edge and drift down
through the air. There are no faces and no text
anywhere in the piece.

## Construction

One canvas, flat colour only, palette closed at the
specced hexes (blanket pink and its check pink,
crust gold, lattice brown, coffee, mug blue, three
leaf colours, three hand skin tones, grass). Design
space 1280x900, full-bleed cover-fit. The blanket is
a square of side 1640 centred on (640, 470) and
rotated by pi/5, so the corners bleed off every
frame edge and grass triangles show at the frame
corners; its gingham is drawn in blanket-local
space, two flat-alpha stripe passes (checks pink at
alpha 0.30 in both directions) over the blanket
base, with a check-pink hem line inside the edge.

The dish table (fixed authored, exactly 4, advanced
one step per double-tap, blanket and leaves never
change):
0. Lattice pie: lattice-brown tin base, crust body,
   darker filling, and a woven lattice clipped to
   the filling ellipse (crust vertical strips, crust
   horizontal strips, then crust patches redrawn at
   the even crossings so the weave reads over and
   under), finished with a thick crust rim ring and
   18 lattice crimp pinches.
1. Cake: mug-blue plate, crust sponge ring, check-
   pink frosting top, a blanket-pink cream dollop,
   and 6 red cherries with lattice stems around the
   ring.
2. Bread basket: 3 crust rolls with lattice score
   arcs behind a woven trapezoid basket (lattice
   body, crust vertical strips and two horizontal
   bands clipped to the trapezoid) with a crust rim
   band.
3. Fruit bowl: a shallow mug-blue rim with a coffee
   interior, 5 fruit circles in the three leaf
   colours plus red, two grass leaves on top, then
   the mug-blue half-ellipse body front and foot so
   the fruit sits inside the bowl.

The hands are exactly 4, asserted in code along
with the count of distinct skin tones (exactly 3:
light, mid, deep). Each hand is a flat mitten drawn
in local space: a sleeve running off-frame to the
wrist, a blanket-pink cuff, a round palm, four
finger capsules of varied length (36, 47, 43, 31)
with bare gaps between them as the finger notches,
and a thumb capsule on the side. Sleeves are check
pink (top), mug blue (left), grass (right) and
crust gold (bottom). The right hand grips the
coffee pot's handle; the pot is drawn in spout-tip
local space, rotated about its tip (1026, 606), with
a lattice lid and knob. The coffee stream is
exactly 9 dots travelling from the spout tip to the
mug's coffee surface; each dot makes 3 whole trips
per loop (an 8s trip), easing down a power curve,
with a small flat-alpha splash ellipse where it
lands. The mug is a rounded rect with a ring handle
and a coffee ellipse on top.

Leaves are one five-lobed shape drawn from a polar
lobe function (pointed lobes, deep sinuses), with a
short stem and, on the airborne and foreground
leaves, a lattice centre vein at flat alpha. Three
families: 13 resting leaves scattered on the blanket
and grass (asserted), swaying a breath on 2 whole
cycles; 2 tumbling leaves (asserted), each crossing
the frame exactly once per loop along a blanket-
edge band, end over end with 4 whole turns per
crossing, so the blanket edge sees two crossings
per 24s loop; 5 falling leaves (asserted), each
falling a whole number of field heights per loop
(1 or 2), swaying on whole cycles and tumbling on
whole turns. 3 large foreground leaves drawn last
overlap the blanket edge and the frame corners.

Interaction (the adaptation flag, exactly):
DOUBLE-TAP (two pointerdowns within 0.34s of piece
time and 60 design px) advances the dish table by
one. DRAG rotates the airborne leaves: pointer
movement adds directly to a shared rotation offset
for the tumblers and fallers, a fling velocity is
tracked from the move events, and on release a
damped spring on fixed ticks (stiffness 120,
damping 14) returns the offset to zero, snapping
the last epsilon (offset under 0.0008 with velocity
under 0.008) to exactly zero, so the leaves settle
back onto their pure loop paths. Resting and
foreground leaves never take the drag offset.

Ambient 24s loop, everything on whole cycles:
coffee trips 3, scatter sway 2, tumbler crossings 1
each, faller falls 1 or 2, faller sways 2 to 4,
faller tumbles 1 or 2 turns.

Determinism: frame one is drawn synchronously at
the constant phase T = 7.0s (pie centred, coffee
mid-pour, one tumbler mid-crossing, fallers
mid-fall); the animation clock is anchored there and
advances in fixed 1/60 ticks from rAF timestamps,
never from a wall clock. No Math.random anywhere;
every table is authored data. House rules hold:
Visual Viewport sizing with resize listeners on
visualViewport and window, canvas pinned every
frame via style width/height in px, phone detection
via window.screen min dimension < 700px with the
aspect fallback, pointer coordinates converted
through the stored fit transform, rAF
typeof-guarded. QA hook via ?seed=: dish=N starts
the piece on dish N of the table.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The thumb was rendered
  twice from the shipped script and compared byte
  for byte: identical, re-verified after each fix.
- Desktop: gingham diamond fills the frame with
  grass at the corners; lattice pie centred with the
  woven over/under reading clearly; four hands enter
  from the four edges (top hand's pink sleeve over
  the cuff, left hand blue sleeve with four finger
  prongs clear, right hand gripping the pot, bottom
  hand gold sleeve); the pot tips a clean dotted
  stream into the blue mug; leaves rest, tumble and
  fall across the scene; the three large foreground
  leaves anchor the corners.
- Probes: ?seed=dish=1 shows the cake (blue plate,
  pink frosting, cream dollop, six cherries);
  dish=2 the bread basket (woven body, three scored
  rolls); dish=3 the fruit bowl (fruit piled over a
  shallow dark rim inside the blue body). All other
  elements are unchanged across the probes,
  confirming the table swaps only the centre dish.
- Mobile: cover-fit centre crop holds the pie, the
  bottom hand and the leaves whole; side hands and
  the mug crop at the edges, the house behaviour for
  full-bleed field pieces.
- First-pass fixes: the leaf lobe function first
  used a soft exponent and the leaves read as
  clover; the exponent was sharpened (2.6, with a
  lower base radius) so the lobes come to points,
  and the stem and vein were shortened. The lattice
  strips were widened (34 to 40 on a 60 pitch) so
  the weave reads at gallery size. The fruit bowl's
  interior was first a tall dark ellipse drawn over
  the fruit, reading as a lid; it is now a shallow
  rim drawn before the fruit, with the bowl body
  front tucking the fruit bottoms behind the rim.
