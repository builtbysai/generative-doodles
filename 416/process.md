# No.416 Noodle Lift — process

EXPANSION #44 (yeti-iglesias), prompt YETI8. Gallery
date 2003 · 03 · 03 (formula date).

## Concept

After Yeti Iglesias's earliest signature mechanism
(her 2018 ramen, "All you need is ramen"): a dark red
bowl of orange broth on a hot pink ground, and from
the upper left a neon-yellow hand on dark chopsticks
lifts a bundle of neon yellow noodle strands out of
the bowl. In the broth sit a halved egg, three purple
narutomaki spirals and two green nori sheets. The
piece is her flat, maximum-saturation illustration
made gently alive: the noodles sway as hanging
curves, the broth shimmers, steam rises, and tapping
the bowl makes the hand lift the noodles higher.

## Construction

One canvas, flat colour only, palette closed at the
ten specced hexes (hot pink ground, dark red bowl,
navy base, orange broth, neon yellow noodles and
hand, dark red chopsticks, white egg, orange yolk,
purple narutomaki, green nori). No gradients, no
shadowBlur, no offscreen canvas; grain is 500 fixed
speckle dots drawn as data in table order every
frame. The only lettering is her hand-lettered
"Yeti" signature, stroke paths in navy at the bottom
right (the set's designed-text exception); no font
text anywhere.

Composition is a centred fit on the 1280x900 design
space: bowl centred in the lower half (rim ellipse
centre 640,566), hand entering from the left edge as
a flat yellow mitt with 3 finger lines drawn as
smooth quadratic bows in yolk orange, chopstick
grips tucked under the mitt.

Bowl contents are resolved counts, asserted at load:
exactly 1 egg half with yolk showing, exactly 3
narutomaki slices (purple discs with a white spiral
stroke), exactly 2 nori sheets standing at the back
of the bowl with their feet under the broth ellipse.

The noodles are exactly 10 strands, asserted. Each
strand is built on a quadratic curve from a tip
anchor (spread along the segment between the two
chopstick tips, with fixed jitter) to an authored
landing point inside the broth ellipse, recomputed
every frame: the control point sags below the chord
by a per-strand factor of the live tip-to-landing
distance and sways on the strand's whole cycles of
the loop (k = 2, 3 or 4 cycles per 28s, fixed
phases), and the strand is sampled along that
quadratic with a gentle perpendicular ripple, zero
at both ends, so it hangs as a wavy line. Because
the curve is recomputed from the tip, a lift
stretches the hang for real; nothing is ever a
scaled drawn layer.

Tap cycle (the piece's one interaction): a tap is a
press and release close together in design space
landing on the bowl. It starts a fixed 2.4s cycle on
fixed 1/60 ticks from the tap: 0.8s smoothstep ease
up (assembly rises 92px and drifts 18px left), 0.8s
hold at the peak, 0.8s smoothstep ease back down to
exactly the rest pose. The whole assembly (both
chopsticks, the mitt, and the strands' tip anchors)
shares the one offset. One authored steam puff, a
fixed spiral stroke above the broth, swells and
fades across the hold phase. A tap landing while a
cycle runs is ignored, so the motion is always the
authored one; the piece never reloads.

Ambient loop is 28s, seamless: noodle sway, broth
shimmer (2 ellipse strokes clipped to the surface,
alpha oscillating on 2 and 3 whole cycles) and the 2
ambient steam curls (sampled sine curves stroked as
three layered paths so the ends fade without
banding, rising on 2 and 3 whole cycles) all divide
the loop.

Determinism: frame one is drawn synchronously at the
constant phase T = 9.0s (noodles mid-sway at rest
height, steam mid-rise, no tap running); the clock
is anchored there and advances in fixed 1/60 ticks,
rAF typeof-guarded, never from a wall clock. A QA
probe (?seed=lift=1) pins the tap cycle at its hold
midpoint so the lifted state can be rendered and
inspected; default play is unaffected.

House rules honoured: Visual Viewport sizing with
resize listeners on visualViewport and window,
canvas pinned every frame via style width/height in
px, phone detection via window.screen min dimension
< 700px with aspect fallback, pointer coordinates
converted through the stored fit transform (S, OX,
OY), fixed seeds only.

## QA log

Rendered with render-piece.js at 1280x900
(qa-desktop.png), 390x844 (qa-mobile.png) and
720x720 (thumb.png). The thumb was rendered twice
from the shipped script and compared byte-identical.

First pass findings, all fixed before shipping:

- The 3 narutomaki slices sat too low and hung over
  the broth's front edge onto the bowl wall, reading
  as ornaments stuck on the bowl. Their centres moved
  up into the broth interior; they now sit in the
  soup beside the egg, piling slightly as toppings
  do.
- The ambient steam, drawn as 24 per-segment strokes,
  banded into a beaded chain. It is now sampled at 40
  points and stroked as three layered whole paths;
  the curls read as smooth soft ribbons.
- The noodle strands were smooth single-bend swooshes
  and merged into one wedge. Each strand now carries
  a perpendicular ripple along its quadratic and a
  per-strand sag factor; the bundle separates into
  ten wavy strands, and the lowest landing points
  were raised a few px off the broth's front edge.
- The mitt's 3 finger lines read as orange chevrons,
  twice: first as short angled segments at the mitt's
  edge, then as kinked polylines. They are now single
  smooth quadratic bows sampled at 7 points, long and
  near-vertical inside the mitt, and read as finger
  separations.

A lift probe render (?seed=lift=1, desktop size)
confirmed the tap state: assembly at full 92px lift,
strands visibly stretched longer by recomputation,
and the authored steam puff mid-swell at the peak.

Mobile render: centred fit holds the whole scene
(bowl, hand, noodles, signature) in frame on the
continuous hot pink page ground. Desktop and thumb
read instantly: red bowl, neon lift, purple spirals.
Deviations from the spec: none.
