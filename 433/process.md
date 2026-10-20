# No.433 Hair That Becomes a World

EXPANSION #47 (angelina_bambina_dsgn), prompt ANG1.
Gallery date 2003 · 03 · 20.

## Concept

Angelina Bambina's definitive mechanism: a woman in
three-quarter view, eyes closed in calm, whose long
white hair rises upward and morphs into a miniature
winter landscape. The morph is the piece, not a
backdrop: the hair mass itself is the terrain. Its top
edge is a run of scalloped hill crests, and inside it
three ridge lines carry the landscape tier on tier —
snow-roofed houses with lit windows, pine stacks, a
deer crossing the middle ridge, and a smiling crescent
moon nestled in the strands. Below the morph point at
canvas centre she reads an open green book, wearing a
red knitted sweater with a green zigzag. Flat colour,
calm face, no text, no signature (the whole #47 set
forbids text).

## Construction

One canvas, 2D, design space 1280x900, cover fit.
Palette closed to the prompt's nine hexes: pink ground
#F3B7C4, snow #FDFBF7, hair-shadow navy #2A3550,
sweater red #C0392B, zigzag green #2E7A4E, book green
#3E6B3E, moon cream #F6E7B4, deer tan #B98A5A, pine
#2E5B3E. One documented resolution: the prompt names
no skin tone, so her face takes the moon cream, the
warm pale tone already in the palette. House roofs
take the sweater red; lit windows take the moon cream.

The hair silhouette is a single traced path used for
the fill, the strand clip, the ridge clip and the snow
clip, so nothing drawn inside the hair can ever leak
past its edge. Strand ribbons are bezier strokes
flowing from the scalp up into the terrain. Ridge
lines are smoothed polylines; houses (rect body, red
gable with a snow strip along the slopes, cream
windows, navy door) and pines (three stacked tiers
with a snow cap) are authored to sit on them.

Motion, WATCH-ONLY 48s loop, all on whole counts:
- Snow: a fixed table of exactly 110 flakes (seeded
  once from a fixed LCG constant, identical on every
  load), each falling 1 or 2 whole hair-field heights
  per loop, clipped to the hair silhouette — snow
  falls inside the hair only.
- Moon: drifts 6px side to side on 8 whole 6s cycles.
- Deer: crosses the middle ridge at two fixed slots
  per loop, [4s,16s] left-to-right and [28s,40s]
  right-to-left — the prompt's 24s cadence kept inside
  the 48s loop. Body ellipse, leg lines trotting in
  pairs, small branching antlers.
- Book: the right page's outer edge lifts once per
  loop, in the [34s,42s] window, a sine peel up and
  back down.

DOUBLE-TAP advances a FIXED AUTHORED TABLE of exactly
3 landscape arrangements (house, pine, deer-line and
moon positions re-laid, the grammar kept), cycled in
order — the prompt's seeded reseed resolved to
authored tables per the set's standing rule, no
runtime randomness anywhere.

Determinism: frame one is drawn synchronously at the
constant phase T = 10s (snow mid-fall, the first deer
mid-crossing, the moon drifted off centre); the clock
is anchored there and advances in fixed 1/60 ticks,
never from Date.now(). House rules held: Visual
Viewport sizing with resize listeners on
visualViewport and window, canvas pinned every frame,
phone detection via window.screen, pointer coords via
the stored fit transform, rAF typeof-guarded, no
offscreen canvas, no gradients, no shadowBlur.

QA hooks: ?seed=N starts on landscape N, ?seed=tS
starts the clock at S seconds. Default play unaffected.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical.
- First pass fixes: strand and ridge strokes leaked
  past the hair silhouette into the pink ground —
  both are now clipped to the hair path. Hands sat on
  the book's pages as cream smudges — moved to the
  outer corners, sleeves extended to meet them. Side
  locks widened so the face no longer bulges past
  them. Default and third arrangements' moons shifted
  inward (x 858 to 830, 848 to 826) so the crescent
  survives the phone cover crop.
- Probes: seed=t38 shows the second deer mid-crossing
  and the book page at full lift; seed=2 shows the
  third arrangement re-laid with the moon upper right.
- Frame one reads: pink ground, the white hair-world
  with its crests, red-roofed houses and pines on
  three tiers, the tan deer mid-crossing, the smiling
  crescent, and below her calm face, green zigzag
  sweater and the open green book.
