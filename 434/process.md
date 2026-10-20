# No.434 Three Things in a Pocket

EXPANSION #47 (angelina_bambina_dsgn), prompt ANG2.
Gallery date: 2003 · 03 · 21.

## Concept

Angelina Bambina's prompt-trio combinator as a living
generator. Every challenge day in her work resolves
three drawn slots — a CLOTHING ITEM, an ANIMAL MASCOT,
an ACCESSORY — into one walking figure composition.
Here the trio is three authored slot indexes the
viewer can shuffle: a stylised woman walks in place
across a star-sprinkled beige ground, her animal ahead
of her on a thin leash, an accessory cluster standing
on the ground lower-right. The candy-cane stripe rides
the hem of every garment, the way her accessories
merge into the outfit. Star sprinkles drift down like
snow over the whole field.

## Construction

One canvas, flat colour only, no offscreen canvas, no
gradients, no shadowBlur, no text. Design space
1280x900, cover-fit; Visual Viewport sizing with
resize listeners on visualViewport and window; canvas
pinned every frame via style width/height in px;
phone detection via window.screen min dimension
< 700px with aspect fallback (h > w*1.15). Pointer
coords convert through the stored fit transform
(S, OX, OY). Every rAF typeof-guarded.

Determinism: frame one is drawn synchronously at the
constant phase T = 13.7s into the 36s loop (default
trio, both figures mid-stride, sprinkles falling, no
ear twitch active). The clock is anchored there and
advances in fixed 1/60 ticks, never from a wall clock.

### Slot tables (all authored, asserted length 3)

- GARMENT: 0 dark-green winter coat (turtleneck
  triangle, cream belt and pocket flaps), 1 knitted
  jumper, 2 cardigan (open front, cream buttons,
  yellow stitch dashes). Sleeve colour follows the
  garment.
- ANIMAL: 0 reindeer (24 stride cycles per loop),
  1 capybara (20), 2 fox (28). Each animal sets its
  own collar anchor each frame.
- ACCESSORY (ground cluster lower-right): 0 shopping
  bags (tall red, short green, cream handles, star on
  the red bag), 1 book stack (green/red/yellow with
  cream page edges, star on top), 2 gift boxes (red
  with cream ribbon, green with yellow ribbon, a
  candy cane leaning at the side).

### Interaction

- Horizontal drag released past 90 design px swaps
  the GARMENT (drag right = next, left = previous).
- Vertical drag released past 90 design px swaps the
  ANIMAL (down = next, up = previous).
- TAP (press under 14 design px and 0.5s) advances
  all three slots by one.
- Every swap triggers a settle bounce: a 0.6s hop
  (translate -18*sin(pi*p)) applied to the figures,
  ending at exactly zero on the resting pose.
- The leash is a thin red quadratic curve recomputed
  every frame from her hand to the current animal's
  collar point, with a fixed sag, so it holds in all
  27 combinations.

### Ambient loop (36s, all beats whole)

- 64 star sprinkles from a fixed table (built once
  from a fixed-seed LCG, identical every load) drift
  down 1 or 2 whole field heights per loop and pulse
  radius on a whole number of twinkle cycles.
- The animal's ear twitches inside the first 0.7s of
  each fixed 9s slot (4 per loop).
- The pair walk in place: woman 20 stride cycles per
  loop, bob = |sin| * 5; animals on their own whole
  stride counts with matching bob and leg swings.

### Palette resolutions (closed set, nothing added)

Closed set: ground #E8D9B8, coat green #2E5B3E,
turtleneck yellow #F2C230, boot red #B3392F, animal
orange #E07B39, star cream #F6E7B4. Inside it: her
skin and the fox's chest, snout and tail tip take the
star cream; her hair takes the animal orange; the
jumper is the turtleneck yellow with knit ribs in
animal orange and a green crew band; the cardigan is
boot red over the yellow turtleneck; the reindeer's
antlers and hooves take boot red (its nose too);
eyes, noses and nostrils take coat green; the
candy-cane stripe is boot red on star cream; flat
shadow pools are coat green at 0.13 alpha.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical (md5
  084ba0d22721de278822df91e7d5de17 both times).
- Desktop frame one: coat, reindeer and bags trio;
  woman mid-stride in red boots, candy-cane hem
  reading clearly, leash landing on the reindeer's
  collar bell, sprinkles falling, generous sprinkled
  negative space above. Mobile cover-crops to the
  leash span between her hand and the reindeer (the
  house behaviour for full-bleed fields).
- All 27 combinations exercised by rendering temp
  copies with each non-default trio: jumper + capybara
  + books and cardigan + fox + gifts inspected at
  desktop size; the leash meets the collar in every
  animal, and every variant stays inside the palette.
- Fixes during QA: her knees converged to a single
  centre point (legs read as an A-frame) — knees now
  keep their hip offset through the stride; the rear
  arm was drawn under the torso and its hand vanished
  inside the silhouette — it is now drawn over the
  torso edge with the hand clear; the front arm's
  elbow sat inside the coat — pushed out so the arm
  reads as an arm; the fox's head floated past its
  body's front edge and its tail read as two loose
  blobs — the fox gained a neck, an overlapping head,
  a smaller chest patch, and a tail drawn as one thick
  curved stroke with a cream-dipped tip.
