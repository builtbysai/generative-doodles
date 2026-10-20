# No.401 Hair River — process

## Concept

After Nina Clausonet's (@nina.clausonet) flowing-hair-
as-current mechanism, from her SHINE YOUR LIGHT
illustration: the white-haired muse in profile, closed
eyes, turquoise dress, on a golden-yellow textured
ground. Her white hair leaves her head as a broad
river-band crossing the full frame, and riding the
current are three teal birds, golden leaves and small
white petals. A flat sunburst sits behind her head,
and her dark-red script signature rests at the bottom
right. It is a pure motion loop — watch-only, no
interaction at all; the loop is the piece.

Palette is closed at the specced hexes: ground gold
#F2A81D, dress teal #1FA3A3, hair white #FFFFFF, birds
teal #1899A8, leaves #F5C13B and #E08A2E, skin warm
#D97B3F, signature deep red #8C2F28. Flat colour only;
hexes are used flat or at flat alpha steps. The page
ground takes the gold tone.

## Construction

One canvas, design space 1280x900, cover fit
(S = max(W/DW, H/DH)); the canvas is pinned via style
width/height in px every frame and sizing comes from
the Visual Viewport API with resize listeners on both
visualViewport and window. Phone detection uses
window.screen physical size (min dimension < 700px)
with the aspect fallback (h > w*1.15). On phones the
centred cover crop would cut the muse — she sits in
the left third — out of the frame entirely, so the
phone crop window anchors to design x=100: head and
dress stay in frame and the river still flows off the
right edge.

The hair river is a filled band between two cubic
bezier edge curves (top and bottom), redrawn every
frame from 28 sampled points per edge. Each edge
ripples on a 6s period — five whole cycles per loop —
with phase stepped along the edge, like slow water.
Inside the band run four bezier flow curves, each
baked at load into a 240-sample arc-length table.
Sprites are {curve, traversals, offset} data and are
positioned by arc length, with a small bob sampled
from the same 6s ripple.

The sprite table, asserted at load: exactly 3 birds,
8 leaves, 10 petals. Birds ride curves 0, 1 and 2
(one at double speed), each drawn as a three-blob
recipe — body ellipse, head circle, tail polygon,
orange beak, gold eye — with a wing that flaps on a
0.75s two-frame cycle (40 whole cycles per loop).
Leaves ride all four curves in both golds, tumbling
on periods of 5, 6, 7.5 and 10s, each drawn as a
rotated ellipse with a centre vein in the other gold.
Petals are small white ellipses with a gold centre
dot, rotating on 6, 10 and 15s periods. Every sprite
completes a whole number of curve traversals per 30s
loop, and every tumble/rotation period divides the
loop, so everything is home at the wrap.

The muse is flat path data: a profile face silhouette
(forehead, small nose bump, lips, chin, jaw) in warm
skin, a white hair cap covering the top and back of
the head and falling to the shoulder where it merges
into the river band, and a flared teal dress with
three fold strokes. Face detail is two strokes in the
signature red: a serene closed-eye cap arc with two
lash ticks, and a small lip curve. The sunburst
behind the head is 24 flat wedges in two alternating
alpha steps of leaf-gold, plus two flat discs — no
gradient anywhere.

Grain is fixed speckle data, per the batch grain
rule: exactly 900 static dots and exactly 200
slow-drifting dots, asserted at load, all baked from
a fixed-seed LCG at flat alpha steps (0.06, 0.09,
0.12). Static dots that land inside the hair band (or
the hair cap region) are tinted warm — skin or ground
at 0.10–0.12 alpha — which is the hair's light grain;
the rest cycle the palette. Drifting dots wander on
small circular paths with periods of 10, 15 or 30s,
all dividing the loop, so each is home at the wrap.
Grain is drawn over everything, last but for the
signature.

The signature is the piece's one designed-text
element, per the batch exception: hand-lettered
script stroke paths (five strokes plus an i-dot and
an underline flourish) in deep red #8C2F28, stroked
at the bottom right. No font text is used anywhere.

Loop length: 30s, seamless. Motion is watch-only;
there are no pointer handlers.

Determinism: frame one is drawn synchronously at the
constant phase T0 = 11.0s — the river mid-flow,
sprites spread along their curves — and the
animation clock advances from that anchor in fixed
1/60 ticks accumulated from rAF timestamps; rAF is
typeof-guarded. Frame one never reads a wall clock.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms both
  resize listeners register (watch-only: no pointer
  listeners).
- First pass fixes: at the constant phase the third
  bird (curve 2, double traversal) sat exactly on the
  muse's lips, hiding them; its table offset moved
  from 0.31 to 0.55, putting it mid-river at frame
  one. The first mobile render cropped the muse out
  of the frame entirely under the centred cover fit;
  the phone crop now anchors to design x=100, and the
  re-render shows the muse large in profile with the
  river flowing off the right edge.
- Desktop: muse in profile at the left third, white
  hair river crossing the full width with birds and
  leaves riding it, stepped sunburst behind the head,
  grain over everything, signature flourish at the
  bottom right.
- Thumb: muse, river, birds and sunburst all read
  instantly at gallery size; the signature crops at
  the corner, as it does in the full field.
- Mobile: the anchored crop keeps the head, hair cap
  and dress in frame — a large serene profile with
  the white river leaving the frame right.
- Thumb rendered twice from the shipped script:
  byte-identical both times (md5
  66fb9c76802f5507735a4044da9e2e41).
- Grep-verified in the piece script: no gradients,
  no shadowBlur use (the word appears once, in a
  comment noting its absence), no offscreen canvas,
  no Math.random, no Date.now, no em dashes, no
  absolute URLs. The palette holds only the eight
  specced hexes, each used flat or at flat alpha
  steps.
