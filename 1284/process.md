# №1284 "Mango Choga" (jagdeep-raina JR5, PP443)

## Prompt
A draped robe form, a mango-shaped choga (coat), built from embroidered Kashmiri Ambi (mango/paisley) motifs tiled across muslin, the paisley curves drawn in cotton-thread dashes, the robe standing upright at center on a plain ground. Grounded in Raina's Beautiful weaver (2020, "embroidered tapestry, Kashmiri Ambi on Cotton") and Adorned in her Mango shaped choga (2023, quilt-sandwich construction): the Ambi motif as the cultural DNA carried in cloth.

## What was built
A full-length muslin choga standing centered on plain dark ground (#161210), no horizon line: neck at top centre with a dashed V neckline, shoulders sloping out, sleeves suggested at both sides, body flaring to a wide hem finished with a crimson dashed hem stitch. Fifty-eight Ambi motifs tile the robe, clipped exactly to its silhouette: each is a mango teardrop outline (three bezier segments: round body, tapering side, hook curling inward at the tip) with an inner spiral, both drawn as hand-stitched dashes with seeded jitter, in thread crimson #A6343C, teal #2F7D74, saffron #D9973B, and motif infill rose #C97B84, plus dark seed dots. Rows pack tighter toward the hem, so the paisley field is densest at the bottom edge. No visible text except `<title>`. No symmetrical mandala arrangement; every motif carries its own rotation and scale from the seeded layout.

## Motion / interaction
- Travelling unfurl wave: each motif's inner spiral rotates open a few degrees and closes on a 9 s loop, the phase travelling down and across the robe, so the wave moves over the cloth.
- Drag across the robe: paisleys near the touch bloom open fully (up to about 26 degrees of extra spiral rotation, radial falloff over roughly half the robe width) and relax on an exponential decay (tau 1.2 s); stillness returns the travelling wave.
- Never click-to-reload. All state is closed-form over recorded drag events and piece time.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen physical size (min dimension < 700 px) with aspect fallback; centered geometric piece keeps its shape, page ground is the piece's own background color.
- Deterministic first frame: synchronous first draw is draw(0) via the boot flag; the performance.now() clock starts only with the rAF loop. No Math.random, no AudioContext, no gradients, no shadowBlur, no filters, no offscreen canvas, no document.createElement, no getUserMedia. Dots drawn as arcs with moveTo before each arc; the floor shadow is a single flat-alpha ellipse in its own path.

## QA
Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected. Frame one: muslin choga whole at centre, dashed neckline and hem stitch visible, Ambi teardrops distinct in all four thread colors, denser at the hem, plain dark ground. Thumb rendered three times at 720x720, cmp byte-identical. Drag-bloom verified through a temp instrumented copy: unfurl angle at a touched motif rose from -0.066 to 0.353 rad while a far motif stayed near its wave value, and the wave phase varies across motifs.

## Fix rounds
1. First pass: paisley outlines built from a polar formula read as overlapping whorls, not mango teardrops, and the tiling overlapped everywhere. Rebuilt the outline from three bezier segments (round body, tapering side, inward hook) and widened row spacing (0.235 to 0.26 of robe width) with slightly smaller motifs, so individual Ambi teardrops read while the hem stays densest. Re-rendered and re-inspected at all three sizes.
