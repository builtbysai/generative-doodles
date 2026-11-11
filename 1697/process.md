# №1697 "One Continuous Line" (PP944, EXPANSION #223 piter-pasma)

Date: 2006 · 09 · 04. Gallery note: "One unbroken line draws a figure at plotter pace. Watch only."
Pure watch piece, no interaction. Black Uni-ball on bristol white, single
weight about 1.5px at full res.

## Build

A seeded brightness field defines a stipple nebula / dendritic lichen
figure: a broad faint halo, six Gaussian blobs clustered near the figure
center, and eight curved tendril chains of small discs radiating outward
(all from mulberry32 seed 944, no Date.now or Math.random anywhere).

The figure is one continuous polyline over a 120 by 80 grid covering the
figure rect. Cells are visited in a rectangular spiral: nested perimeters
from the center strip outward, alternating clockwise and counterclockwise
per ring, so the line covers the figure evenly as it draws and the figure
reads long before the line finishes. Each cell is crossed by a small
serpentine whose density follows the field: darkness under 0.20 gets one
point, under 0.45 a 3 by 3 meander, under 0.85 a 5 by 5 meander, darkest a
7 by 7 meander. Lattice points carry a seeded jitter of 0.35 cell so the
light-area line reads as a hand-drawn meander, not a maze. The whole
figure is a single point list drawn as one path, so the pen never lifts.

Measured for cycle 0 at desktop size: 53,479 segments (spec 40k to 80k),
53,480 points, cell counts m1 7539 / m3 907 / m5 782 / m7 372 (sum 9600,
every cell visited exactly once). Longest single step 31.9px against a
cell diagonal of 13.3px: short local stitches between rings and meanders,
no lifts, no jumps across the figure.

## Motion

Frame one is t = 30 with the line pre-advanced deterministically to 57
percent of the path (FIRST_PHASE 0.57), so the thumb reads the full
figure: dark core and dendritic arms legible, light contour texture
around it. The live draw continues from there at plotter pace; a full
figure takes 200 seconds (3 min 20 s, inside the 2 to 4 minute spec).
When a figure completes (cycle 0 ends at t = 116), the old drawing fades
over 10 seconds while the next seed's line begins (seed 944 + cycle *
7919, so each figure differs). A thin hairline along the bottom edge
shows the single line's advance and resets when a new figure starts.

House rules: Visual Viewport sizing with resize on visualViewport and
window; canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension under 700px) with the
aspect fallback; field-like full-bleed figure on phones, centered 3:2
figure on desktop; one synchronous frame at load; requestAnimationFrame
guarded by a typeof check; title, date and hint plates drawn on canvas.
No em dashes in visible copy, no AI-signature copy, never click-to-reload.

## Deviations from the prompt

1. Rectangular spiral walk instead of a Hilbert-ordered grid walk. A
   Hilbert curve visits quadrant by quadrant, so at 57 percent the right
   side of the figure was blank and the thumb read as unfinished. The
   spiral covers the figure evenly at any prefix while keeping every step
   local. The continuity and segment-count acceptances are unchanged.
2. A 7 by 7 tier for the darkest core, added so the path reaches the
   40k to 80k segment range with a lighter overall field (the first
   tuning pass landed at 22,119 segments with the field too pale).
3. Seeded jitter on lattice points (see Build), so the light-area line
   does not read as a geometric maze.

## QA (node-canvas, actual script)

- 1280x900 desktop: dark lichen core with dendritic arms legible at
  center, wobbly contour texture around it, title plate top left, hint
  plate bottom left, hairline at 57 percent. Good.
- 390x844 mobile: figure full-bleed, core reads as a vertical lichen
  column with arms, plates legible, hairline visible. Good.
- 720x720 thumb: same as desktop, figure centered in the 3:2 band,
  plates legible. thumb.png IS this render.
- t = 116 (cycle complete): whole figure rect covered, dark core and
  arms clear against the contour ground, hairline full. Good.
- t = 121 (mid-fade): old figure at 50 percent gray, new cycle's line
  just starting as a short black bar at center, hairline reset. Good.
- t = 200 (cycle 1 at 42 percent): a visibly different second figure
  emerging from the center. Good.
- Determinism: frame one rendered three separate times, byte-identical
  (md5 a4713fb7c6a9b568aca3ad3fb082055c at 1280x900). Final re-gate after
  the last edit: all three sizes byte-identical to the inspected renders.
- Frame-one draw took about 0.4 s in node-canvas. Live redraws the full
  prefix each frame at the 0.08 s throttle, same pattern as №1695.
