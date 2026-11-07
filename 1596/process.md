# №1596 Pots That Grow Their Own

EXPANSION #210 newyellow, prompt PP843 / NY5. Thick hand-drawn planters hold still while the green inside them grows on its own staggered clock, and the frame is the constraint.
Gallery date: 2006 · 05 · 26 (formula 2002-01-10 + 1597 days).

## Mechanism

A charcoal field (#2A2A2E) holds four rounded-rectangle planters in pink #E87AA8, coral #E88A6A, turquoise #4AD8C8 and orange #E8A03A, one per corner, each about 40 percent of the composition wide and cropped by the frame edges like a garden bed. Each planter frame is a thick hand-drawn stroke: a jittered rounded-rectangle outline generated once from a fixed seed, drawn twice (a full-weight pass plus a fainter offset pass) with a thin inner lip line, so the frames wobble like a pen line and never move.

Inside each frame a plant grows from a recursive branching tree. Every branch is born from a fixed-seed mulberry32 generator (a different seed per planter), splits into two or three children with a wide upward spread, and ends in jittered leaf dabs in two greens (#4E9A51 and #7AC86A). Each segment and leaf carries a birth value in the growth range 0 to 1, so growth is a reveal: the plant draws stem by stem, leaf by leaf, over a 40 second cycle, then holds full for 8 seconds and reseeds itself on a 48 second loop. The plant drawing is clipped to the planter inner rect, so no green ever escapes a frame. Leaves are gated on their parent segment being mostly grown, so no dab ever floats ahead of its stem.

The four plants run on staggered clocks. At the fixed first-frame phase of 20 seconds they sit at growth 0.05, 0.50, 0.95 and 1.00: one seedling, one mid shoot, one near full, one full bush. Each planter's seed differs, so no two plants share a shape.

## Interaction

Watch-only by default: the staggered growth cycles are the piece. Tap a planter and that planter's plant reseeds and regrows from a seedling. The tap picks the next seed from a fixed authored sequence (11, 23, 37, 53, 71, 97, 131, 173), never Math.random, so regrowth stays deterministic. Taps outside any planter do nothing. No other interaction.

## Palette

Charcoal ground #2A2A2E; planters pink #E87AA8, coral #E88A6A, turquoise #4AD8C8, orange #E8A03A; plants green #4E9A51 and #7AC86A. Nothing else except a low-alpha warm grey for the title, date and hint text.

## Determinism

First frame is drawn synchronously at a constant phase of 20.0 seconds. The rAF loop is anchored as phase plus elapsed-since-load. All frame jitter, tree shapes, leaf positions and reseed seeds come from fixed-seed mulberry32 generators. No Math.random, no Date.now, no wall-clock input anywhere. Reduced-motion preference renders the static first frame only.

## Deviations from the prompt

- On phones the two rows sit at 25 and 75 percent of viewport height instead of 13 and 87 percent, so the tall phone frames do not leave a dead charcoal band across the middle. Desktop keeps the spec positions.
- The title, date and hint are drawn on the canvas in low-alpha warm grey (the convention from recent pieces), since the spec palette has no text tone.
- Full plants fill roughly the upper two thirds of their frames rather than the whole frame: branch reach is capped so canopies never pile up against the top inner edge and get clipped flat.

## Proposed gallery note

"Plants grow inside their frames, never past them. Tap a pot to regrow."

## QA

Rendered from the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected: four planters with distinct growth stages (seedling stem, mid shoot, near-full and full bush), plants contained inside their frames, hand-drawn jittered frames, planters cropped by the edges, mobile full-bleed with tighter row spacing. Thumb rendered twice: byte-identical (md5 50222cf14c9417ce8ee6d8ade69af1b0).
index.html md5 8a694a05f9daf7a148eb6096fc686919.

Fix rounds: round 1, planters sat fully inside the frame and the full plants were small clouds in the middle, so the layout was pushed outward for real edge cropping and the trees were made bushier with leaves at every node. Round 2, the longer trees grew up through the top inner edge and piled into a flat clipped hedge, and seedling leaves floated ahead of their stems, so branch reach was shortened, the upward bias was widened into a lateral spread, and leaves were gated on their parent segment being mostly grown.

A node harness confirmed the mechanism: growth at t=20 reads exactly 0.050, 0.500, 0.950, 1.000 across the four planters. Tapping the full turquoise planter reseeded it (seed index advanced, tree regenerated, growth 0.0125 at t=20.5) while the other planters were untouched, and a tap in the empty middle reseeded nothing. A post-tap render at t=25 shows the tapped plant as a fresh seedling, the pink plant advanced, the coral plant bushier, and the orange plant auto-reseeded after its 48 second cycle ended. Two fresh first-frame renders are byte-identical, and the script contains no Math.random or Date.now.
