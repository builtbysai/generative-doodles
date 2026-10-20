# No.406 Bear Hug — process

## Concept

After Nina Clausonet's (@nina.clausonet) animal-
embrace mechanism from her 2020 seed illustration:
the white-haired muse with closed eyes and red lips
hugging a huge cream polar bear, both wearing red —
her mittens oversized, a paper crown tilted on her
head, a red scarf on the bear — with a brown
Christmas tree behind them and snow falling over a
blush ground. It is a pure motion loop: watch-only,
no interaction at all; the tenderness is the piece.

Palette is closed at the specced hexes: ground blush
#F7D8C9, muse skin pink #E8A58A, hair and snow white
#FFFFFF, bear cream #F5EDE0, red #E63329, tree brown
#8B5A3C. Flat colour only; hexes are used flat or at
flat alpha steps (the bear's warm shadow strokes are
the tree brown stepped down). The page ground takes
the blush tone.

## Construction

One canvas, design space 1280x900, centred fit
(S = min(W/DW, H/DH)) with the full canvas filled in
blush first, so the letterbox is the piece's own
ground at every size. The canvas is pinned via style
width/height in px every frame and sizing comes from
the Visual Viewport API with resize listeners on
both visualViewport and window. Phone detection uses
window.screen physical size (min dimension < 700px)
with the aspect fallback (h > w*1.15).

The two figures fill the frame as one grouped flat-
blob recipe. The bear is drawn first: feet, a big
body ellipse with a belly arc in brown at 0.16 alpha,
side arms resting down its flanks, ears (cream with
brown inner ellipses at 0.22 alpha), a round head
with a soft cheek shade, a stroked muzzle, brown
nose, a small mouth arc, and closed-eye cap arcs.
Its red scarf is a curved band across the neck with
a fringed tail at its right side. The muse stands in
front of the bear's left chest: a white hair mass
falling past her shoulders, a white sweater torso, a
pink face with closed-eye arcs and a small red lip
ellipse, side hair locks framing the face, and two
white-sleeved arms reaching around the bear ending
in oversized red mittens (ellipse plus thumb circle)
resting on its belly. The bear's front paws are
drawn last inside the group, so the hug wraps around
her — the left paw overlaps her sweater's edge. The
paper crown is a three-point red band with three
cream dots, drawn under a constant rotation of
exactly -8 degrees; the tilt never animates.

The tree stands behind the group at the upper right
and does not move: a trunk with a root flare, three
scalloped tiers of overlapping brown ellipses, 15
red bauble dots at fixed positions, and a cream
five-point star on top.

Motion, all on one 24s clock. The embrace rock is a
shared 6s sine (four whole cycles per loop): the
whole figure group rotates 1.1 degrees either way
about a low pivot at (640, 885) with a small companion
bob; tree, snow and grain stay outside the group.
Snow is exactly 140 particles, asserted at load:
the first 55 draw behind the figures, the remaining
85 in front. Each flake falls a whole number of
field heights per loop (k = 1, 2 or 3, asserted
integral) and sways on a period of 6, 8, 12 or 24s,
each dividing the loop, so every flake is home at the
wrap. The bear's left ear twitches once per cycle at
one fixed slot, 13.0s to 13.9s of the loop: a damped
triple flick (rotation keyframed from the loop phase)
that is exactly zero outside the slot.

Grain is fixed speckle data, per the batch grain
rule: exactly 900 static dots and exactly 200
slow-drifting dots, asserted at load, all baked from
a fixed-seed LCG at flat alpha steps (0.05, 0.07,
0.09) in palette colours. Drifting dots wander on
small circular paths with periods of 6, 8, 12 or
24s, all dividing the loop. Grain is drawn over
everything, last but for the signature.

The signature is the piece's one designed-text
element, per the batch exception: hand-lettered
script stroke paths (five strokes plus an i-dot and
an underline flourish) in red #E63329, small, at the
bottom left. No font text is used anywhere.

Loop length: 24s, seamless. Motion is watch-only;
there are no pointer handlers.

Determinism: frame one is drawn synchronously at the
constant phase T0 = 9.4s — the embrace mid-rock, snow
mid-fall — and the animation clock advances from
that anchor in fixed 1/60 ticks accumulated from rAF
timestamps; rAF is typeof-guarded. Frame one never
reads a wall clock.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms both
  resize listeners register (watch-only: no pointer
  listeners).
- First pass fix: a head shading arc on the bear was
  centred too far left, so part of the arc floated off
  the head's silhouette behind the muse's crown and
  read as a stray wire. It was replaced with a soft
  cheek-shade ellipse kept fully inside the head, and
  all three renders were re-made from the fixed
  script.
- Desktop: the muse at the bear's left chest, crown
  tilted, red mittens on its belly, the bear serene
  in its red scarf, the dotted tree and its star at
  the upper right, snow over everything, signature
  at the bottom left.
- Thumb: muse, crown, mittens, bear and tree all read
  instantly at gallery size.
- Mobile: the centred fit holds the whole embrace in
  frame on the continuous blush ground.
- Thumb rendered twice from the shipped script:
  byte-identical both times (md5
  89ff33d2e61207870b514b9d76ec2e8a).
- Grep-verified in the piece script: no gradients,
  no shadowBlur use (the word appears once, in a
  comment noting its absence), no offscreen canvas,
  no Math.random, no Date.now, no em dashes, no
  absolute URLs. The palette holds only the six
  specced hexes, each used flat or at flat alpha
  steps.
