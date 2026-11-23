# №123 · Hashed Arcs - process notes

## Concept
After Yazid's fxhash #44 and the early computer art of Mohr, Noll and Nees: hard-edge compositions of arc fragments on a strict grid, black on paper, where precision is the aesthetic and exactly one geometric disruption is the art. One arc is wrong; everything else obeys.

## Construction
- Single self-contained page, no libraries. 2D canvas. An 8x8 grid of arc cells floats in paper #F5F2EA with generous margins; each cell holds one arc (quarter, half or three-quarter sweep) at a seeded rotation, stroked in ink #111110. Arcs only; no fills, no gradients, no glow.
- The disruption: exactly one cell breaks the rule at any time, drawn in signal red #C22E1F. It cycles through three kinds: rotated one quarter-turn wrong, doubled (a second red arc added at a quarter-turn offset), and missing. The missing kind leaves only a faint red ghost of the arc at alpha 0.18, so the single red signature survives even in absence. Every 20 seconds the disruption migrates to a different cell and the whole grid wipes and redraws (sweep animates 0 to full over 0.7 s). A very slow radius breathing (plus or minus 0.6 percent) keeps the grid from feeling frozen between migrations.
- Interaction: tap a cell to make it the disruption; it breaks on release and holds for 20 s before the schedule resumes. Never click-to-reload.
- The grid keeps its square shape on phones; the page ground takes the paper colour. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px each frame; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting.
- Pixel-level verification on the desktop frame: dark-pixel counts per cell match the three sweep classes (about 300, 610 and 925 px), all 64 cells are populated, and red pixels total exactly 296, all inside one single cell: the one disruption, a quarter arc rotated wrong. At thumbnail size the red disruption is still findable. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `123/index.html`, `123/thumb.png` (720x720, rendered from the live script), `123/process.md`. Gallery entry to be added to pieces.json by fly with the formula date 2002 · 05 · 14.
