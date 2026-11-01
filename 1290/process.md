# №1290 "Mill Owners, Repeating" (swapnaa-tamhane ST3, PP457)

## Prompt

A madder-red field covered in a strict block-printed repeat of black
architectural triangles — the diagonal brises-soleil of Le Corbusier's Mill
Owners' Association Building abstracted into geometry — with 3-4 stitched
applique patch rectangles in brighter red interrupting the repeat, exactly
the Mobile Palace interruption grammar (inspected panel detail, 2019-2021).

Palette: madder red #A63A2A, darker madder #7E2A1F, near-black ink
#1E1A16, patch red #C0503A, stitch thread #E5D9C4, print-miss gray
#5A4640.

## What was built

- Full-bleed madder field with six large flat-alpha darker-madder wash
  pools for print variation. No gradients anywhere.
- Motif: a right triangle plus a separate diagonal fin floating parallel
  to its hypotenuse, split from the triangle by a gap of ground color, so
  the brise-soleil slat reads on its own. Per-stamp jitter: rotation
  ±2.5 degrees, position ±3 px (seeded).
- Mis-registration: every 5th motif in boustrophedon order gets an offset
  double-stamp in print-miss gray at 0.55 alpha — the hand showing.
- Applique patches: 3-4 brighter-red rectangles, 8-15% of frame width,
  1.3x as tall, each with a hand-walked dashed stitch border in thread
  color. Patches are placed only over regular (non-misregistered) cells,
  clamped inside the frame with an 8 px margin, and rejected if they
  would overlap another patch — so they interrupt the most regular areas,
  never decorate, and never stack or clip at an edge.
- Watch-only. No text except `<title>`. No click-to-reload, no audio.

## Motion (all closed-form over piece time)

- Loop: stamping phase (0.06 s per motif, boustrophedon order), then
  patch phase (1.2 s per patch, stitch border drawing progressively
  around each rectangle), then a 6 s hold with a barely perceptible weave
  shimmer (wash alpha ±0.02 on a 7 s sine). Then the loop reseeds.
- Reseeds use a mulberry32 PRNG advanced by loop index only — no
  Math.random anywhere — so repeated loads replay the same sequence of
  mis-registration maps and patch layouts.
- Frame one is the start of the hold phase (field complete, patches
  stitched on, breathing), via a boot-flagged `draw(0)`; the
  performance.now() clock starts only with the rAF loop. This is the
  №1275 lesson applied: frame one never reads elapsed wall-clock time.

## Mechanics verification (controlled-clock harness, node)

At 1280x900 (16x11 grid, 176 motifs, 35 mis-registered):

- t=0 load frame: 428 fills = 6 washes + 176 motifs x 2 (triangle + fin)
  + 35 mis-registration doubles x 2; 4 fillRects = ground + 3 patches;
  131 stitch strokes (three complete borders). Hold at t=3 identical.
- t=8 (loop 1 stamping): 84 fills = 6 washes + 33 stamped motifs x 2 +
  6 mis-registration doubles x 2; ground only, no patches, no stitches.
- t=20 (loop 1 patching): full motif fills return, 3 patches on, partial
  third border in progress.
- t=40 (loop 2, reseeded): different patch count and borders, confirming
  the per-loop reseed. Loop boundaries are self-consistent across
  differing per-loop patch counts (the transition instant is independent
  of patch count, so no phase oscillation at reseeds).

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  desktop, 390x844 mobile, 720x720 thumb; all three inspected.
- Thumb rendered three times at 720x720, `cmp` byte-identical, and
  re-verified after the final edits.
- Token scan clean except one comment stating no Math.random is used;
  rAF only behind a typeof guard; no AudioContext, createElement,
  WebGL, offscreen canvas, gradients, filters, shadowBlur, or mic APIs.
- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw(); phone detection via window.screen
  (min dimension < 700 px) with aspect fallback; field full-bleed on
  phones with page ground in the piece's own madder.

## Fix rounds

1. First motif read as a plain triangle: the fin was drawn inside the
   triangle fill in the same ink and merged invisibly. Rebuilt as a
   separate parallelogram offset outward from the hypotenuse (gap 0.10s
   to 0.18s along the outward normal), so the diagonal slat reads.
2. First patches stacked into one tall block in the center and clipped
   at the frame edges. Added frame clamping (8 px margin) and an
   overlap rejection (24 px clearance, up to 12 attempts per patch).
3. Mis-registration ran at 40% of motifs (union of every-4th and
   every-5th). Reduced to every 5th only, so the gray ghosts read as
   occasional hand slips, not a systematic double.
4. Bare `visualViewport` identifier is undefined under the node-canvas
   renderer shim (it lives on window, not as a global). Switched all
   references to `window.visualViewport`; the renderer now registers
   both vv:resize and win:resize listeners.
5. Wash blobs carried a stray moveTo before the ellipse (node-canvas
   ellipse/arc quirk). Removed; ellipse drawn from its own beginPath.
6. Stitch-dash walker overcounted at segment ends, which could leave a
   small gap at full progress. Rewrote it to walk the whole rectangle
   perimeter as one polyline.
