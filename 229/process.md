# No.421 DOGUE — kittyo.illustration (EXPANSION #45, KIT5)

Gallery date: 2003 · 03 · 08 (formula date, 2002-01-10 + (421+1) days).

## Concept

After Kitty O'Rourke's DOGUE magazine-cover parody
(#drawwhatyoulove26): a brown poodle cover girl in a
red beret, black sunglasses and a cream jacket
patterned with red hearts, chin up on a flat hot-pink
ground, the DOGUE masthead across the top in giant
hand-lettered caps, three cover lines stacked down
the left edge at angles, a barcode box bottom-left
and a yellow I (heart) DADDY patch overlapping the
jacket bottom-right. Fashion-magazine layout, humour
intact. Per the set's text rule there is no signature;
the masthead, cover lines and patch are the piece's
own designed text, drawn as hand-lettered stroke
paths on the one canvas, never system fonts, and no
real magazine branding anywhere.

## Construction

One canvas, flat colour only, palette closed at the
eight specced hexes (hot pink ground, poodle brown,
darker curls, beret/heart red, ink, jacket cream,
barcode white, patch yellow). Design space 1280x900,
CENTRED fit with the page ground in the hot pink.

Lettering: every letter is authored path data, a list
of polylines in a unit box (bowls sampled from arcs,
the S from three cubics), stroked with round caps and
joins at a weight proportional to the letter height,
with a fixed per-position jitter table so the hand
sits like hand work and is identical in every render.
Cover lines wear the set's black shadow (an ink pass
offset down-right under the cream pass). Letterforms
cover exactly the glyphs the pool, masthead and patch
need: A B C D E G H I L M O P R S T U V W Y and &.

The cover-line cycle (fixed authored, never random):
the pool holds exactly seven lines in authored order,
BEST GIRL, THE LOVE EDIT, SASSY, CUPID PUPS, WAG
MORE, TREAT YOURSELF, PAWS & POSE, each with authored
display rows (long lines wrap to two rows in their
slot). Three slots sit down the left edge at fixed
angles. Frame one shows pool entries 0, 1, 2 in slots
1, 2, 3. A tap increments one shared counter; slot s
then shows entry (s + counter) mod 7, so the three
lines on the cover are always distinct and always in
authored order, and seven taps return the cover to
its opening lines. On a tap each slot flips: scaleX
runs through 0 over 0.45s on fixed ticks (|cos|
profile), the words swap at the midpoint, and the
slots are staggered 0.07s apart so the flip cascades
down the edge. Taps landing while a flip is running
are ignored, so the cycle can never land mid-swap.

The poodle is a fixed recipe: a seeded curl cluster
of exactly 96 circles (head ring plus two floppy-ear
rings, every third curl in the dark tone) over a
smooth face plate, snout high on the face for the
chin-up pose, dark nose and a two-curve smile.
Sunglasses are two rounded rects with a bridge,
temple arms and one flat cream highlight slash per
lens. The jacket is a cream bust shape with a V-neck
collar fold and exactly ten authored red hearts
clipped inside it. The barcode box holds exactly 32
bars from a fixed width table: geometric bar data,
deliberately not a scannable code.

Ambient 30s loop, everything on whole cycles: the
beret (a tilted red ellipse with a nub, anchored at
the head top) sways exactly 3 degrees; one authored
jacket heart (table entry 5, the large heart low
centre-left) pulses in scale; the poodle blinks at
four fixed slots in the loop, centres at 4.0s,
11.5s, 19.0s and 26.5s, 0.22s each, one at a time.
The prompt's 5-8s blink timer is thus made fixed, and
because her face recipe puts the eyes behind the
sunglasses, the blink is realised as the shades
dipping in height (scaleY to 0.18 at the blink peak).

Determinism: frame one is drawn synchronously at the
constant phase T = 6.3s (beret mid-sway, pulse heart
near full swell, no blink active, opening cover lines
in place); the animation clock is anchored there and
advances in fixed 1/60 ticks from rAF timestamps,
never from a wall clock. No Math.random at runtime;
the only seed work is the fixed-seed LCG that bakes
the curl table at load. House rules hold: Visual
Viewport sizing with resize listeners on
visualViewport and window, canvas pinned every frame
via style width/height in px, phone detection via
window.screen min dimension < 700px with the aspect
fallback, pointer coordinates converted through the
stored fit transform, rAF typeof-guarded. A QA hook
(?seed=tap=N) starts the cover at tap state N.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The thumb was rendered
  twice from the shipped script and compared byte for
  byte: identical.
- Desktop: masthead giant and legible, G reads as a G
  with its crossbar inside the bowl; poodle bust
  large and right of centre, chin up; the three
  opening lines (BEST GIRL / THE LOVE EDIT / SASSY)
  stacked at their angles; barcode bottom-left;
  patch overlapping the jacket bottom-right.
- Tap state checked via the QA hook (?seed=tap=1):
  the slots show THE LOVE EDIT / SASSY / CUPID PUPS,
  each advanced exactly one step through the authored
  cycle, confirming the fixed rotation.
- Mobile: centred fit holds the whole cover on
  continuous hot pink; masthead, lines, barcode and
  patch all stay legible at 390 wide.
- First-pass fixes: the G crossbar first ran past the
  bowl and merged into the U (shortened to end inside
  the bowl); the beret first floated above the curls
  on a stalk (reseated onto the head, stalk replaced
  by a small nub); the head first floated over the
  jacket (a neck now runs under the collar); the
  collar's first lapel polygons read as stray
  triangles (replaced by a clean two-pass V fold).
