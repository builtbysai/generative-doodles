# No.440 Abstract Fruits

EXPANSION #47, angelina_bambina_dsgn prompt ANG8 ("Abstract
Fruits"), after her "Abstract fruits" licensing collection
(2025-11-10). Built per BATCH-438-440-SPEC.md.

## Concept

Her commercial pattern grid as art: a 2x2 grid of four
seamless fruit patterns, each quadrant a live tile. Top-left,
a minimalist leaf motif on mustard; top-right, dense stylised
pomegranates in teal, pink and orange; bottom-left, orange
pomegranates with dark-green leaves on soft pink;
bottom-right, a speckled polka-dot texture on light gray.
Thin cream dividers split the halves. Flat textile-design
discipline throughout: no mockup chrome, no text, nothing
that is not pattern.

## Construction

One canvas, flat colour only, no gradients, no shadowBlur,
no text. The prompt's technical note specifies offscreen
tile canvases; the house rule forbids them (QA renderer
constraint, the same override as No.436), so each quadrant's
tile is motif DATA drawn directly on the one canvas each
frame, clipped to its quadrant rect and repeated at wrapped
offsets (one tile of margin on every side), so motifs
complete across tile borders inside the quadrant and the
repeat is seamless there. The quadrants are exact halves
(640 x 450 in the 1280 x 900 design space); the cream
dividers are drawn last, over the joins, as a 2px vertical
and a 2px horizontal rect in design space.

Tiles and motifs, so the tiling is checkable:

- Q1: one leaf pair per 160 x 150 tile (4 x 3 tiles visible).
  A leaf is a pointed ellipse with a centre vein in the
  ground colour; a pair is two leaves grown out of one stem
  point, each leaf's centre offset along its own direction
  so the pair reads as a sprig. Pair orientation alternates
  by tile parity.
- Q2: pomegranates on a 128 x 150 tile (5 x 3 visible). A
  pomegranate is a round body, a three-point crown whose
  silhouette breaks the circle's top, and seed dots inside
  in the ground colour. Fruit colour cycles through the
  scheme's three fruit colours by tile index.
- Q3: a pomegranate with a leaf pair beside it per
  160 x 150 tile (4 x 3 visible).
- Q4: polka dots 2 x 2 per 160 x 150 tile plus a speckle
  table of 14 fixed points per tile, generated once at
  load from a fixed seed per motif set (a tiny LCG;
  deterministic data, never Math.random).

Pulse: every motif is drawn at a scale of 1 + 0.02 sine
(the prompt's 2%) about its own centre, on per-quadrant
periods that divide the 80s loop (8s, 10s, 16s, 20s in
quadrant order) with fixed per-quadrant phase offsets, so
the four quadrants breathe out of step and frame one
already shows differing phases. The scale is identical at
every wrapped copy of a motif, and motifs keep clear of
tile edges by more than the pulse can move them, so the
pulse never breaks a seam.

Scheme rotation: there are four authored harvest schemes;
each is a full assignment of the closed palette to the
quadrants' roles (grounds, leaf, fruit colours, dots,
speckles), and scheme 0 is the authored opening for every
quadrant. Rotation is an index read from the loop clock,
never a hue shift or filter. In every 80s loop each
quadrant takes one 20s rotation window (Q4 [0,20), Q1
[20,40), Q2 [40,60), Q3 [60,80)); inside its window it
steps through the four schemes in its own authored order
(one scheme every 5s, four steps), and it is back on its
opening scheme when the window ends; outside its window
it rests on the opening scheme. Exactly one quadrant is
rotating at any moment, and because every quadrant's
scheme is a pure function of loop time, the 80s seam is
exact: at the seam all four quadrants are on their
frame-one schemes.

Interaction: WATCH-ONLY loop plus TAP. A tap (under
280ms, under 14 design px of travel; pointer and touch
reports of the same tap are counted once) advances all
four motif tables by one at once, the prompt's re-seed
built as fixed authored tables: three sets per quadrant
(leaf size/splay/tilt, pomegranate radius/density/seeds,
dot radius/speckle seed), asserted in code to hold
exactly three each. Pointer coordinates convert through
the stored cover-fit transform (S, OX, OY from frame()).

Determinism: frame one is drawn synchronously at the
constant phase T = 2.0s into the 80s loop (all four
quadrants on their authored opening schemes, Q4 at step
0 of its rotation window, pulses at differing phases);
the animation clock is anchored there and advances in
fixed 1/60 ticks from the rAF timestamp delta, never
from Date.now() minus an offset. QA probes via the
renderer's seed argument (m1 / m2 = start on motif set
1 / 2, late = start at T = 47s, inside Q2's rotation
window) follow the No.436 probe precedent and do not
affect normal viewing.

Palette: the prompt's closed set only (mustard #D9A441,
teal #2E8B8B, pink #F06A8A, orange #E8823C, soft pink
#F6C9D4, leaf green #2E5B3E, gray #D8D8D8, speckles
#8A8A8A, divider cream #F5F0E6). One resolution,
documented here: the prompt names Q2's fruit colours
but no ground for that quadrant, so Q2's opening ground
takes the mustard, the collection's lead ground (its
rotated schemes give it teal, soft-pink and gray grounds
in turn).

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical.
- Seam and divider check at desktop size: the cream
  cross is exactly 2px, centred, and meets cleanly at
  the middle; no motif is cut by a divider (quadrant
  clips hold), tiles march evenly inside each quadrant
  with no gaps or doubled motifs at tile borders, and
  motifs clipped at a quadrant's outer edge are the
  full-bleed field behaviour, not seams.
- Rotation probe (seed=late, T = 47s) inspected: Q2 is
  mid-rotation on scheme 2 (soft-pink ground, teal /
  orange / mustard fruits, soft-pink seeds) while Q1,
  Q3 and Q4 rest on their opening schemes; exactly one
  quadrant rotated, as specced.
- Motif probe (seed=m1) inspected: all four quadrants
  on set 1 (smaller wide-splayed sprigs; denser Q2 with
  its small partner fruits; smaller Q3 fruits and
  leaves; smaller Q4 dots with the second speckle
  table), seams intact.
- Fixes during QA: the first pass drew each leaf pair
  as two leaves crossed at one centre, which read as
  small four-point stars, and the Q3 pairs were too
  small to read beside the fruit; pairs are now sprigs
  grown from a stem point and both sets were enlarged.
  The pomegranate crowns were also too low to break
  the body's silhouette and were raised and widened.
  Mobile and thumb were re-rendered from the fixed
  script and the thumb byte-compare repeated.
- Mobile: cover-fit centre crop keeps the divider
  cross centred with all four quadrants represented;
  motifs continue cleanly across the crop edges.
