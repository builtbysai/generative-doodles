# №9027 · Trellis — process notes

## Concept
Seed 118 "Skeleton Trellis" from FUTURE_PIECES.md: the Leon Sans plants
mechanic without the font. The viewer types a word; the piece rasterizes it
in an italic serif, reduces it to true stroke skeletons with Zhang-Suen
thinning, prunes serif spurs, then grows a garden along the skeleton. Every
sprout anchors to a skeleton pixel and extends perpendicular to the local
stroke tangent (tangent estimated by PCA over a small skeleton neighborhood,
plus seeded jitter), carrying 2 to 3 veined leaves; about 1 in 13 sprouts
bears a coral blossom instead, and the tittles of i and j bloom into flowers
on their own. Growth spreads through the letterforms by BFS depth from the
leftmost stroke, so the hedge visibly vines its way across the word over
about three seconds, then settles into a gentle sway. The legibility trick is
draw order: all foliage is painted first and the skeleton is drawn over it as
a dark umber vine, so leaves attach to the strokes but can never cross or
cover them. The hedge stays readable because the skeleton always wins.

## Success criteria
A viewer types their own name and gets a hedge that is still readable as
their name. Verified with "Hans" (the toughest short-word case): every
letter reads at first glance, the H crossbar and the S curve intact.

## Differentiation from №9012 "Murmuration"
Murmuration is particle typography: hundreds of free particles springing to
per-particle orbit goals sampled from letterforms, with deterministic gusts
that scatter and reform them. Trellis has no particle system, no orbit goals,
no gusts. Nothing moves through space to hold a letter; instead the piece
computes one static stroke skeleton per word and grows botanical geometry
along it, each sprout oriented by the local stroke tangent. The subject is
growth along a skeleton, not particles holding a shape.

## Words and seeds tried
- "trellis" seed 118 (default): 7 mixed letters, double l, tittle blossom on
  the i. Lush but every letter reads. Chosen as the shipped default because
  it names the piece and shows the full mechanic.
- "garden" seed 118: descender on the g skeletonizes cleanly; the hedge
  reads beautifully. Runner-up default.
- "Hans" seed 118: capital H with crossbar, short word, still perfectly
  legible. The success-criterion case, passed.
- "fern" via typed Enter with a random seed: confirmed the type-and-Enter
  path regrows from a fresh seed.
- "garden" via the "new word" button: confirmed the curated-word cycler.
- Tap on canvas: seed 118 to 408266864, same word regrown fresh.

## Why seed 118 won
It is the FUTURE_PIECES seed number for this concept, so the default state
is self-documenting, and its garden came out balanced: blossoms spread
across the word rather than clumped, no letter drowned in leaves, the i
tittle landing a flower exactly on the dot.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0), 12s soak, 1280x800.
- 1280x800 desktop: no overflow, word centered, controls and hint clear.
- 390x844 mobile: no overflow, full word fits, input and both buttons
  usable, hint wraps to two lines inside the frame. (One early mobile shot
  showed a clipped word; re-shot clean. It was a stale compositor frame,
  probed layout values were correct throughout.)
- Interaction: Enter regrows, "new word" cycles the curated list, canvas
  tap regrows the same word from a fresh seed. All three verified live via
  CDP. URL params ?word= and ?seed= reproduce exact states.
- thumb.png is exactly 1280x800.
- Copy check: no em dashes in any visible string; hint uses middle dots.

## Gallery caption
Type a word and watch it grow into a hedge you can still read.
