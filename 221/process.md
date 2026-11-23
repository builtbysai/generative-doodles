# No.411 Tuesday Funtivity - process

## Concept

After Yeti Iglesias's cat-series mechanism
(yeti-iglesias study, EXPANSION #44 prompt YETI3;
Tuesday Funtivity / Collecting leaves): one orange
striped cat with huge sparkle-eyes, wearing a green
scarf with an orange-dot pattern, sitting inside a
brown leaf-bag with a gold diamond lattice; autumn
leaves falling around; a big orange pumpkin beside
the bag; hot pink ground; starbursts and dots
scattered in the sky. Her hand-lettered "Yeti"
signature sits bottom right as stroke paths, the
set's designed-text exception; no other text.

Per Hans's RETHINK rule this is the batch's system
to disturb: drag anywhere and a gust follows. The
calm state is a 24s seamless loop, and the gust
lives entirely in spring offsets on top of it, so
when the drag ends the piece settles back to the
exact calm loop, bit for bit.

## Construction

One self-contained canvas, design space 1280x900,
full-bleed cover fit; the page ground is the hot
pink #FF4FA3. All marks are JS data drawn directly
each frame; no offscreen canvas, no gradients, no
filters, no shadowBlur. Flat colour only, palette
closed at the twelve specced hexes (hot pink
#FF4FA3, cat orange #F26A1B, stripes #B8430F, scarf
green #2E7D4F, dot orange #F5A623, bag brown
#7A3B14, lattice gold #F5C13B, pumpkin orange
#FF7B1C, rib #D95F0E, leaves #E08A2E and #6BAE6B,
sparkle cream #FFF6E8; grep-verified).

Composition: the bag is centred in the lower half
(its front panel runs y 556-830, x 352-848), the cat
emerges from its mouth (head centre 600,396, radius
102), the scarf wraps the neck and its free end
drapes over the bag front, both front paws rest on
the rim, the segmented striped tail curls out of
the bag's left side, and the pumpkin (centre 885,
690, radii 155x135) overlaps the bag front-right.

The cat: body ellipse behind the bag front, head
circle with triangle ears (stripe-coloured inners),
forehead and cheek stripes, whiskers, and two huge
eyes, dark stripe-coloured circles of radius 27,
each holding a cream 4-point sparkle highlight and
a tiny cream dot. Blink slots are FIXED inside the
24s loop: dips centred at 7.0s and 17.0s (the
prompt's 6-9s cadence resolved to fixed slots); the
eye height scale reaches 0.1 at the centre of each
0.25s window and is 1 outside it. The scarf is a
thick green arc with five orange dots across the
neck, a knot at the right, and a free end (46 wide,
148 long, four orange dots, fringed) that sways on
an 8s cycle, 3 whole cycles per loop. The tail is 9
segmented circles along a quadratic curve,
alternating orange and stripe, swaying on a 12s
cycle; its radius is scaled by the gust puff spring.

The bag front panel carries the gold diamond
lattice (diagonal lines at 46-unit spacing, both
directions, clipped to the panel) with a gold
stitch line along its top edge. The pumpkin's ribs
are three darker-orange ellipses clipped inside its
outline, with a brown stem.

Leaves: exactly 26 asserted, baked from a fixed
seed. Each falls a whole number of field spans per
loop (span 1040 design units; k = 1 or 2), sways on
a period from {6, 8, 12, 24} and tumbles on a period
of 8 or 12, all dividing 24, so the calm loop is
seamless. A leaf is a pointed oval with a centre
vein, in one of the two autumn tones. Five leaves
are dealt to the front layer and draw over the
subjects; the rest fall behind. Sky seasoning:
exactly 22 cream 4-point starbursts twinkling on
periods from {3, 4, 6, 8} and 40 small static cream
dots.

Grain follows the batch rule: exactly 600 speckle
dots at 0.08 alpha asserted, baked by rejection
sampling from a fixed seed, 300 inside the bag
front panel (gold) and 300 inside the pumpkin
(brown), drawn over their shapes in table order.
Never a noise texture or overlay.

Interaction: a pointer drag's per-event delta,
converted to design space through the stored fit
transform (S, OX, OY), is capped at 60 units and
applied to every leaf as an impulse along the drag
vector, scaled by a falloff factor (0.2 floor plus
0.8 times squared proximity, proximity reaching 0
at 560 design units from the pointer); leaf speeds
cap at 900 units per second. The same drag feeds
the tail puff spring (thickness offset) and the
sparkle swirl (the sparkle layer rotates around the
composition centre 640,400). In the fixed 1/60 step,
each offset integrates a damped spring (leaves
k 30, c 6.5; puff k 70, c 10; swirl k 24, c 6) and
snaps to exactly zero once it and its velocity fall
below small thresholds, so on release everything
settles back to the calm 24s loop exactly. A tap
alone does nothing. Never click-to-reload.

Determinism: frame one is drawn synchronously at
the constant phase T = 9.0s into the 24s loop
(leaves mid-fall, cat composed, eyes open between
the blink slots). The animation clock is anchored
at that constant and advances in fixed 1/60 ticks
accumulated from rAF timestamps, typeof guarded;
frame one is never derived from Date.now() or any
wall clock. Sizing uses the Visual Viewport API
with resize listeners on visualViewport and window;
the canvas is pinned by style width/height every
frame; phone detection uses window.screen with the
aspect fallback.

Two QA probe hooks ride the query string the house
renderer passes (?seed=...): gust sets a developed
gust state directly (leaf offsets up-right, tail
puff 0.55, sparkle swirl 0.12), blink parks the
clock at the 7.0s blink centre. Default play is
unaffected.

## QA log

Rendered with the house renderer
(node ~/workspace/tools/render-piece.js):

- qa-desktop.png (1280x900): frame one. Sparkle-eye
  cat in its dotted green scarf inside the
  gold-latticed bag, tail curled out at the left,
  ribbed pumpkin front-right, leaves mid-fall across
  the pink, starbursts twinkling, "Yeti" signature
  legible bottom right.
- qa-mobile.png (390x844): cover fit crops the
  sides as field pieces do; the cat stays centred
  and whole, the bag fills the frame, the pumpkin
  and signature crop out at the right edge.
- thumb.png (720x720): rendered twice from the
  shipped script; byte-identical (md5
  f494d458da2e44f1f5c96983e31919c8). Under the
  square cover crop the signature sits off-frame;
  it appears in full-frame views.
- Probe renders (temporary, not shipped): blink at
  the 7.0s slot (eyes squashed to thin slits, the
  sparkle highlights compressed) and gust (leaves
  displaced along the gust vector, tail visibly
  puffed thicker, sparkles swirled).

Fixes during QA: the signature's "e" first rendered
as a closed loop that read as "Yoti", then as a "9";
it is now two strokes, a short middle bar plus an
open body curve, and reads "Yeti" cleanly. The right
front paw was hidden behind the scarf's free end;
it moved out along the rim to (742, 586) so both
paws read.

Deviations: none from the spec or its adaptation
flag. Blink slots are the flag's fixed-slot
resolution of the prompt's 6-9s cadence, documented
above.
