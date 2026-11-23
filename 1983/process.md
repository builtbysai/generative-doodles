# №1983 Set Piece

CR8 / PP1230, study #258 ciara-reddy, completing the study. Gallery date 2007-06-17, shown as "2007 · 06 · 17". Interaction cue: watch the light fade.

## What the piece does

Sunset over a dry gold field. A huge smoke column rises from the field and dominates the right two thirds, dark orange-gray against a fading sky, with embers rising inside it. A small hooded figure crouches low in the left third, back to the camera, utterly still, watching the event. The piece is the gap between the scale of the event and the stillness of the watcher.

- Sky: a smooth gradient cross-fades from sunset (deep orange top, pale gold horizon) to dusk (plum top, ember remnant at the horizon) and back, on a slow cosine, so there is no cut. Faint stars fade in with dusk in the upper sky. The low sun is glow alone behind the column, no disc.
- Column: stacked scrolling noise sprites. Rows of soft radial-gradient blobs drift on a slow 1D noise field and scroll upward with time, wrapping at the top. Three passes (outer warm smoke, mid smoke, dark core) give the column volume. An ember-lit rim of overlapping warm sprites hugs its left edge, and an ember glow sits at its base over a scorch shadow.
- Embers: 70 particles rising inside the column at seeded speeds, flickering, dimming toward the top.
- Field: dry gold gradient with grass strokes and four flat shrub mounds sunk into the horizon line, left of the column.
- Figure: a static dark silhouette, hood dome, back curve, folded knees, with a faint ember rim on its column-facing side. No term of t enters the figure drawing; it never moves.

## FIRST_T

FIRST_T = 18 s. Cycle length 240 s. dayFrac at t = 18 is about 0.05 (still sunset) and column density is about 1.0 (full), so the first frame shows the event at its strongest with the small watcher in place. The frame is a pure function of elapsed time; no wall clock or Date is read for animation state, and all randomness is seeded (mulberry32, hash1).

## Interaction

Watch-only. No pointer listeners at all. The viewer is the second watcher: the column density breathes on the 240 s clock (0.72 plus 0.28 sine, phase offset so it is full at the first frame) and the light fades sunset to dusk and back. In reduced-motion mode there is no automatic loop; the first frame is rendered and stays still.

## QA hook

?t=<seconds> or ?seed=<seconds> sets the virtual clock at load. window.__draw(t) drives draw() with a virtual clock; window.__piece1983 exposes firstT, cycle, state(t), dayFrac(t), density(t), redraw(t).

## Deviations from the prompt

One, visual only, and in the direction the prompt asks for. The prompt calls the sun part of a sunset scene; the build keeps the low sun as glow alone and draws no disc, because a disc showed through the thin smoke at the column's base as a pale orb beside the smoke. The glow behind the column carries the sunset. No other deviation.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual script. Note: the render tool resizes its canvas to the stage, so each PNG is the stage only (828x828 desktop, 390x844 mobile, 720x720 thumb).

- t = 18 (FIRST_T), desktop 1280x900, mobile 390x844, thumb 720x720: sunset sky, full dark column with embers, figure readable low left, caption and hint legible, no clipping or overlap. Clean on all three sizes.
- t = 60, thumb size: sky deepened to mauve (dayFrac 0.5), field darkening, column density 0.82, embers still rising. Confirms the light fades and the column breathes.
- t = 120, thumb size: full dusk (dayFrac 1.0), plum sky with stars, field dark brown, column fainter against the dark sky but still readable with embers and rim, figure in exactly the same place. Confirms the dusk end of the cycle and the figure's stillness.
- Determinism: thumb.png rendered twice, md5 ddb02fee7cff852efdde0f5f6f302929 both times, byte-identical.
- Probes differ: thumb md5 ddb02fee7cff852efdde0f5f6f302929, t = 60 md5 2eabf74071fe21299d8976f3eab13af8, t = 120 md5 84f4ac7f1d2f164dfab55a92291382a4.

## Fix rounds

Three fix rounds, after the first render pass.

- Round 1: the column read as a stack of discrete discs with hard circular edges. Fixed by replacing solid-circle blobs with radial-gradient sprites fading to transparent at the edge, with more rows and more blobs per row, so overlaps melt into one another. The sun disc showed as a pale orb through the thin smoke at the column base; fixed by moving the sun behind the column centre and then, in round 2, dropping the disc entirely (glow alone). The shrubs read as a row of perfect dark balls; fixed by drawing them as wide flat mounds sunk into the horizon line.
- Round 2: the ember-lit rim read as a dotted line of distinct orange beads, detached from the column. Fixed by making the rim sprites overlap heavily (larger radius, tighter step), so it reads as a continuous soft glow band.
- Round 3: the rim still read as a dotted line on mobile, where the stage is narrow and the sprite radius is width-based. Fixed by sizing the rim sprite radius from the larger of width and height (max(W * 0.014, H * 0.011)) with a tighter step, so the sprite diameter exceeds the step on every size. Verified continuous on the re-rendered mobile frame.

## Known warts

Minor notes, none open. At full dusk (t = 120) the column is faint against the dark plum sky; it stays readable through the embers and the rim, which is the dim end of the cycle by design. The figure is deliberately simple, a hooded silhouette with no facial or limb detail, and reads slightly tombstone-like at thumb size; the hood dome and folded knee carry the crouch. The rim band curves away from the column toward the top of the frame as the column widens; it follows the column edge, but at the very top it reads a little like a separate light shaft. The grass strokes are uniform ticks; they read as dry grass at full size and as faint rain-like marks at thumb size.
