# №1985 Exposed for the Force

MC2 / PP1232, study #259 mateo-villanueva-brandt. Gallery date 2007-06-19, shown as "2007 · 06 · 19". Interaction cue: Watch the column churn.

## What the piece does

Sunset over vast dark dunes. A towering smoke column rises from the dunes and fills the right two thirds, ember-lit and detailed against a burnt orange sky, with a tiny hooded figure standing small at lower left, near-black, gazing up at it. The camera exposes for the smoke: the plume carries the light, the human is a dark anchor.

- Sky: a smooth gradient cross-fades from sunset (deep brown top, burnt orange middle, ember horizon) to dusk (near-black plum top, ember remnant at the horizon) and back, on a slow cosine, so there is no cut. Faint stars fade in with dusk in the upper sky. The low sun is glow alone behind the column, no disc.
- Column: stacked scrolling noise sprites. Rows of soft radial-gradient blobs drift on a slow 1D noise field and scroll upward with time, wrapping at the top. Three passes (outer warm smoke, mid smoke, dark core) give the column volume. Vertical temperature gradient: the smoke is ember-warm near the base and cools to near-black toward the top. One ember-gold core glows inside the column, brightest at the base and fading with height. An ember-lit rim hugs the column's left edge, and an ember glow sits at its base over a scorch shadow.
- Embers: 70 particles rising inside the column at seeded speeds, flickering, dimming toward the top.
- Dunes: three layered ridges, darkening toward the viewer, with a warm crest light catching the near ridge from the column side. The ground is empty but for the figure, so the scale stays with the column.
- Figure: a static dark silhouette standing at lower left, hood dome tilted up toward the column, cloak falling straight to the ground, with a faint ember rim on its column-facing side. No term of t enters the figure drawing; it never moves.

## FIRST_T

FIRST_T = 24 s. Cycle length 240 s. dayFrac at t = 24 is about 0.10 (still sunset) and column density is about 1.0 (full), so the first frame shows the plume mid-churn with embers visible and the figure in place. The frame is a pure function of elapsed time; no wall clock or Date is read for animation state, and all randomness is seeded (mulberry32, hash1).

## Interaction

Watch-only. No pointer listeners at all. The piece earns its scale from stillness, any input would shrink it. The column density breathes on the 240 s clock (0.72 plus 0.28 sine, phase offset so it is full at the first frame) and the light fades sunset to dusk and back. In reduced-motion mode there is no automatic loop; the first frame is rendered and stays still.

## QA hook

?t=<seconds> or ?seed=<seconds> sets the virtual clock at load. window.__draw(t) drives draw() with a virtual clock; window.__piece1985 exposes firstT, cycle, state(t), dayFrac(t), density(t), redraw(t).

## Deviations from the prompt

None of substance. Two choices worth recording. The prompt says the figure gazes up, so the figure stands rather than crouches, which is the natural reading of gazing up at a towering column. The low sun is glow alone with no disc, because a disc would read as a pale orb through the thin smoke at the column's base, and the prompt's exposure rule puts the light in the smoke, not in a visible sun.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual script. Note: the render tool resizes its canvas to the stage, so each PNG is the stage only (828x828 desktop, 390x844 mobile, 576x576 thumb).

- t = 24 (FIRST_T), desktop 1280x900, mobile 390x844, thumb 720x720: sunset sky, full wide column with wavy ember-gold core and drifting embers, figure readable low left, caption and hint legible, horizon clean, no clipping or overlap. Clean on all three sizes.
- t = 60, thumb size: sky deepened to mauve-red (dayFrac about 0.5), column churned into a different blob pattern with the core wobbling on a new path, embers in new positions, figure in exactly the same place. Confirms the column churns, the embers drift, and the figure never moves.
- t = 120, thumb size: full dusk (dayFrac 1.0), plum sky with stars, dunes near-black, column still readable through the core, rim, and embers, figure in exactly the same place. Confirms the dusk end of the cycle and the figure's stillness.
- Determinism: thumb.png rendered twice, md5 68600bdda0fe989dea1259ad59ef8f97 both times, byte-identical (after the parent fix round below; the pre-fix thumb was e5d4d787844dd21f337f510b52175237).
- Probes differ: thumb md5 68600bdda0fe989dea1259ad59ef8f97, t = 60 md5 c560a723acb9946c61dc957c8c940688, t = 120 md5 dd96f23bdc10f19bb31eef0cc13ba763.

## Fix rounds

Three fix rounds, after the first render pass, plus one parent fix round at the gate.

- Round 1: the column read as a stack of discrete dark discs in a vertical chain, and the rim and core read as two detached thin light shafts floating left of the smoke. Fixed by warming and lightening the smoke colors, using 7 blobs per row with larger radii, a tighter row step, and higher pass alphas so the overlaps melt into one mass, and by widening the core and giving it a stronger lateral wobble so it reads as a spine inside the smoke rather than a ruler line.
- Round 2: a hard near-black band ran along the horizon on both sides of the column where the far dune crest dipped below the sky bottom, exposing the page ground, and the rim still curved away from the visible smoke edge toward the top. Fixed by drawing the dunes before the column, so the plume sits in front of the dunes, and by moving the rim to 0.62 of the column half-width so it hugs the visible smoke edge instead of the nominal column outline.
- Round 3: after the draw-order change, a thin near-black strip still showed at the horizon wherever the far crest dipped below the sky bottom. Fixed by filling a flat far-dune base from the horizon down past the deepest possible crest dip before drawing the ridges, so the strip is far-dune brown. Verified by pixel sampling along the horizon line.
- Parent fix round (gate): the shipped thumb (720x720 render, 576 stage) showed a near-black triangular wedge at the right edge, y 375 to 552, widening toward the edge, while the desktop and mobile renders were clean. Root cause: the dune crest loops accumulated x += W / 60 in floating point, and at W = 576 the sum stops one step short (last crest point 566.4, never reaching W), so the closing lineTo(W, H) cut diagonally from the last crest point and left a triangular gap of page ground #160b06. Confirmed by pixel sampling (wedge color exactly #160b06), by time-independence (identical at t = 0, 12, 60), and by the node check that the loop yields 60 points ending at 566.4 for W = 576. Fixed by stepping both the duneRidge crest loop and the crest stroke loop by integer index (x = i * W / 60, i = 0..60), which lands exactly on W. Re-gated all three sizes and both time probes: zero ground-color pixels at the right edge everywhere, new thumb md5 68600bdda0fe989dea1259ad59ef8f97, rendered twice byte-identical.

## Known warts

Minor notes, none open. At full dusk (t = 120) the figure is nearly invisible against the near-black dunes, only its ember rim line shows; that is the dim end of the cycle by design, and at sunset the figure reads clearly. The scorch shadow at the column base reads as a flat dark oval, a little plate-like at desktop size, but it grounds the column on the dunes. The rim still reads as a fairly distinct diagonal line in the upper half of the column, though it now stays on the smoke edge; it reads as the lit face of the plume. The figure is deliberately simple, a hooded silhouette with no facial or limb detail, and reads slightly tombstone-like at thumb size; the tilted hood dome carries the gaze upward.
