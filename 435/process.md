# No.435 Cardigan Season

After Angelina Bambina's cozy-autumn vignette (EXPANSION #47, prompt ANG3, from her Sweetemberdays24 "Cardigan season"): a woman with short white hair in an olive cardigan, sipping from a yellow mug at a dark wooden table; an open sketchbook with fall-leaf sketches; a slice of lattice-top pie; scattered autumn leaves; mustard ground. No snow, no winter elements, no text anywhere.

## Concept

The prompt is a still life with two slow clocks in it: she sips, and the leaves come down one at a time. The piece runs both cadences exactly as specced and lets everything else hold still, so the table reads as a laid autumn vignette that happens to be alive. Her reseed becomes a fixed authored table of three still-life arrangements, cycled by double-tap.

## Construction

One canvas, design space 1280x900, COVER fit (a field composition): the design fills the frame at any size and the centre (figure, mug, table) always survives the crop; on a narrow phone the book and pie sit at the frame edges, the house behaviour for cover-fit fields. Ground and table fills run far past the design edges so no seam shows at any aspect.

Palette only: mustard #D9A441, cardigan olive #6B7A2A, mug yellow #F2C230, table #3A2E2A, pie crust #E0A458, filling #B3392F, leaves #C65D2E / #D9A441 / #8A5A2A, hair white #F5F2EA. Flat colour only: no gradients, no shadowBlur, no offscreen canvas. Resolution inside the palette, as the spec allows: skin is the pie-crust #E0A458, the palette's warm mid-tone; the sketchbook pages use the hair white.

Loop timing (84s master loop, asserted in code): 84 is the LCM of the prompt's two cadences, so both land whole: the sip cycle runs 12s (7 per loop) and one leaf falls and lands every 14s (6 per loop). Sip cycle: rest, a smoothstep lift of mug and forearm together to her lips, a held sip, a smoothstep lowering. The mug tilts toward the mouth as it rises; the elbow bends with the lift (the two arm segments are drawn separately with round caps, after QA caught the joined polyline throwing a miter spike at the sharp full-lift bend). The cardigan knit breathes on the same 12s period: its hem width moves +/-2px and the rib alpha deepens from 0.13 to 0.20 as she sips.

The knit is procedural data, not a texture: the cardigan silhouette is clipped, then vertical rib columns (table dark, stepped flat alpha, every 15px) and rows of little v-stitches (hair white at 0.20 alpha, 21px x 26px grid) are drawn inside it every frame. A skin V at the neck and four dark buttons close the front.

Steam is the prompt's one allowed translucency, shipped stepped and flat: 3 bezier ribbons in hair white at alphas 0.28 / 0.18 / 0.10, rising from the mug's mouth wherever the mug is. Their sway is a 2-phase sine (12s and 7s periods, both dividing the 84s loop), so the seam is clean.

Leaves: a pointed-ellipse sprite drawn from data (fill, vein, stem). Each arrangement scatters 10 leaves on a loose 5x5 anchor grid (asserted) with authored jitter, rotation, colour and size, plus 6 landed leaves in six fixed spots on the table front (asserted). The falling leaves land INTO those six spots: during a leaf's 14s slot its spot sits empty while the leaf fades in above, accelerates down (progress^1.35) with a sideways sway and spin, lands at u = 0.55 and rests to the slot's end. The leaf count therefore never pops, and at the 84s seam every leaf is home.

The sketchbook is an olive cover under two hair-white pages, holding six outlined leaf scribbles and a spine line: sketches only, never text. The pie is a wedge on a hair-white plate: red filling, a lattice of crust strips clipped to the filling, and a thick crust rim down the wide edge.

Arrangements: exactly 3 authored tables (asserted). Each re-lays the book's position and rotation, the pie's position, the mug's rest offset and every leaf. DOUBLE-TAP advances the table; tap timing is read from the anchored piece clock, never a wall clock. State is a pure function of the phase plus the arrangement index.

Determinism: frame one is drawn synchronously at the constant phase T = 17.4s: the mug is at her lips mid-sip (sip phase 0.45) and the second leaf is mid-fall (fall progress 0.44). The clock is anchored at that offset and advances in fixed 1/60 ticks; rAF is typeof-guarded.

## QA log

Rendered with render-piece.js (node-canvas):

- qa-desktop.png (1280x900): mid-sip as specced. White bob and fringe over a calm closed-eye face, the yellow mug at her lips with its hand and bent forearm, faint steam curls above it, the olive knit reading as ribs and v-stitches with buttons down the front, the open book with leaf scribbles at the left of the table, the lattice pie on its plate at the right, leaves scattered on the mustard and the table, one leaf mid-fall at her right. No text, no winter elements.
- thumb.png (720x720): the whole vignette inside the square, figure centred, book and pie both legible. Rendered twice from the shipped script: byte-identical.
- qa-mobile.png (390x844): cover-fit centre crop keeps the figure, the knit, the mug at her lips and the table's centre with its landed leaves; the book and pie sit at the frame edges.
- Probes via the house seed pattern (not shipped behaviour): ?seed=rest starts at T=1.0s, mug down in her hand at the table edge with steam rising off it, the first leaf just leaving; ?seed=land starts at T=76.0s, late in the last leaf's fall.
- Fixes during QA: the mug's lip position was nudged in so its rim meets her mouth; the left hand was raised out from behind the book's corner; the pie wedge was rebuilt taller with a flatter base, a sparser lattice and the plate shadow moved under the plate; the arm was split into two separately stroked segments after the joined path threw a miter spike at full lift.
