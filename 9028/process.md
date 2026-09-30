# №9028 · Wire Garden — process notes

Date: 2026-09-29 · Default seed: 43

## Concept

One continuous "mega-wire" grown from a pool of short polyline fragments.
Each growth step deals a hand of 5 random fragments from a pool of 72,
scores each by the angle between its exit heading and a slowly wandering
target heading, and draws the best match. One step in ten ignores the
score and plays a random fragment from the hand instead: the 10%
wild-card pick. The wire bends toward the heading but never obeys it.

The target heading is a lure: a point drifting around the page on a slow
Lissajous path (periods 17–26 s, per-seed), plus a breath of sine wander
for texture. The wire chases the lure from a distance; within 300 px it
follows pure wander instead of orbiting, which keeps the trail open.
Because the lure never leaves the page, the wire needs no walls, bounces,
or penalty fields: boundedness comes from the lure's bounded motion.

Two quiet biases keep the drawing honest. A laziness term (0.35 × |net
turn|) makes the greedy prefer gentler fragments when scores are close,
so the wire meanders instead of tracking the target precisely. An
anti-windup term punishes fragments that continue the wire's accumulated
recent turn, so the heading can never coil into a yarn-ball. Sharp-turn
fragment kinds (hook, hairpin, loop) are excluded from greedy selection
entirely; only the 10% wild card may play them, marked by a small rust
dot at the joint so the wildness is visible.

## Algorithm

1. Build a seeded pool of 72 fragments. Each fragment is a smooth arc
   (glide, bend, curve, S-curve, meander) with a characteristic net turn
   plus a small hand-drawn texture wiggle; a few sharp kinds (hook,
   hairpin, loop) exist for wild cards only.
2. Each step: draw a 5-fragment hand; score each non-sharp fragment by
   |angleDiff(exit heading, target)| + 0.35·|net turn| + anti-windup;
   play the lowest score.
3. With probability 0.10, ignore the scores and play a random hand
   fragment (wild card, rust dot at the joint).
4. Advance the tip, accumulate the turn, repeat. The wire draws itself
   live over about ten minutes (cap 4200 fragments); tapping anywhere
   rebuilds with a fresh random seed.
5. A small dial in the lower-right shows the wandering target heading.

## Palette and design

Warm paper `#f5f0e3`, dark ink `#26221a` at varying width and alpha,
rust `#9a5b3c` dots marking wild-card joints. The palette is fixed for
every seed: the variation comes from the wire's path, never from color.
The number/title plate sits top-left; a one-line hint sits bottom-center.
No date strings on the page. No em dashes in the copy.

## Seeds tried

Rendered at 1280×800 (fast-forwarded) and inspected: 43, 7, 21, 77, 99,
123. Early in the study many more were sampled while diagnosing a
coiling problem (see below); the six above are the final comparison set.

## Why seed 43 won

Seed 43 draws a balanced garden: open meandering curves across the whole
page, a few denser thickets that never collapse into black blobs,
breathing room between passages, and the rust wild-card dots scattered
like seeds. Seeds 7 and 21 are elegant but sparser; 77 leans heavy on the
right side; 99 and 123 cluster more centrally. 43 is the most
landscape-like: it reads as one wire discovering a place, not as a
statistic of one.

## The coiling problem (what did not work)

The first dozen approaches all produced the same failure: the wire wound
itself into dense black yarn-balls, or paced the page edges like a
picture frame. Tried and rejected: hard edge steering, center attraction,
a wandering home point, vector-field targets (stagnation points where the
field cancelled), one- and two-sided edge penalties in the greedy score,
an ink-density avoidance grid, mirror bounces at the margin, and a
circular-flow nudge. Each either trapped the wire (local minima in a
penalty landscape) or herded it to the boundary.

The fix was subtractive, not additive. Trajectory analysis showed the
greedy was too good at matching: it tracked the target so faithfully
that any containment field could trap it. Making the greedy lazier
(stronger preference for gentle turns, smaller hand of 5) let the wire
meander on its own terms, and replacing every containment mechanism with
a single bounded lure removed all the traps at once. The anti-windup
term was the last piece: it directly forbids the sustained same-direction
turning that yarn-balls are made of.

## QA

- Rendered via isolated CDP on port 9333 (never 9222); every PNG
  inspected visually, including the final 1280×800 seed-43 render.
- `~/workspace/tools/cdp_exceptions.py`: exit 0 at 1280×800 and at
  390×844, zero console errors on both.
- Responsive: no scrolling or overflow at desktop and 390 px widths;
  plate, hint, and dial all legible on mobile.
- Click/tap regeneration verified through CDP input dispatch.
- `thumb.png` is exactly 1280×800, rendered from the final seed 43.
- No files outside `~/workspace/generative-doodles/9028/` were touched.
- Not pushed to GitHub; the coordinator handles publishing.

## Differentiation

- **№9008 · Field Notes** is a grid of small observational sketches, many
  discrete marks composed like specimens on a page. Wire Garden is a
  single continuous line: one wire, one path, no grid, no specimens.
- **№8972 · Eye Garden** is built around radial, eye-like motifs with a
  clear center of attention in each element. Wire Garden has no centers
  and no radial symmetry; its interest is in the meander itself, and the
  lure that guides it is deliberately kept off-center and always moving.
- **№8979 · Almost Perfect** is about near-geometric precision, shapes
  that almost close, almost align. Wire Garden pursues the opposite
  virtue: the wire bends toward its target but never obeys it, and the
  10% wild cards guarantee it never settles into anything perfect.
