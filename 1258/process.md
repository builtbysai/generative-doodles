# №1258 — Genesis (Living Portrait)

Esther Hz study block EH3, after her *Genesis* (2018): a plaster face-cast of a
grieving young woman, overtaken over days by living oyster-mushroom mycelium —
bioremediation read as psychic cleansing. Her timelapse note for the original:
"one week and the mycelium seems to be thriving!"

A plaster profile in matte off-white (#E6E0D3) faces right on black (#0E0C09),
left of center, drawn as a flat illustration: smoothed silhouette, flat shading
shapes and soft shading ellipses in decay shadow (#3A342A), a sparse hashed
plaster speckle, a closed eye (one calm lid line and crease), an ear, a nostril,
a mouth line. Serene, not a horror mask. Over it grows a cream (#F2EEDF)
mycelium colony with amber (#D9A441) growth tips.

## House adaptation (persistence)

The original grows across real days and return visits; a gallery piece cannot
persist between visits. The growth arc is therefore one visit long and the
day counter counts compressed days: the full colony completes in 600
growth-seconds (~10 minutes unmisted), seven compressed days at ~86 seconds
each. The timelapse fiction is kept, and stated here rather than hidden.

## Colony and front model

The colony is pre-grown as data, never simulated per frame. A seeded branching
walk (integer hash only) grows filament trees from three seed points — the ear
(main), the jaw, the hairline — with walkers that turn by hash, steer back
inside the face outline, branch to depth 4, and skirt the eye socket and mouth
while young. This yields 820 segments; each carries a growth coordinate g0n,
its path length from its seed normalised across the colony. Depth-0 stems in
their first fifth render thicker as rhizomorph cords.

Growth is a moving front over that coordinate: front = (clock + 2 × boosted)
/ 600, where the clock runs in growth-seconds and "boosted" is the union of all
mist intervals plus a 10-second tail each, during which the rate triples.
Segments ahead of the front are not drawn; a segment the front is crossing is
drawn partially, with an amber tip dot at the crossing point. A faint wide
under-pass gives the mat its softness.

## Determinism

Frame one is drawn synchronously at a fixed phase: clock = 132 growth-seconds,
front exactly 0.22 — day 2 by the counter's rule (day = 1 + floor(front × 7),
capped at 7). At that front the filaments fan from the ear across the mid-cheek
and descend the forehead from the hairline; the eye and mouth are still clear
(the nearest visible segment end is ~0.09 of face-width from the eye). The
animation loop is anchored to that same clock plus elapsed time, so the live
piece continues from the frame-one state. The 720×720 thumbnail was rendered
twice from the finished file and compared byte-identical.

## Interaction

- Press and hold anywhere: misting. Fine spray dots fall over the face, a soft
  disc gathers at the pointer, and the growth rate triples while held, with a
  10-second tail after release. Neglect is the default: left alone, the front
  creeps at base rate.
- Double-tap: reseed — a new colony (salt + 1) germinates and the clock
  restarts at day 2's front.
- The only UI is the day counter in the lower-left corner, with a small drawn
  droplet mark: "day N", N from 1 to 7.

Silent. No external assets. Canvas sizing follows the Visual Viewport API;
phone layout is detected from the screen's physical size with an aspect
fallback, and the face is composed from width on phones.
