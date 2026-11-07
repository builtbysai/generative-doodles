# No.1599 "New Colors Only Where They Touch" (NY8, study #210 newyellow, PP846)

Driver: twenty seeded rounded rectangles in teal, pink and white slide around a loose 4x5 grid on a vermilion field, and wherever two overlap the multiply blend computes a new color live, so the palette only exists where shapes touch.

## Build

- Loose 4x5 grid of rounded rectangles on vermilion #E83A2A, shapes in dark teal #1E4E4E, pink #E89AA8 and white #F5F2EA, seven teal, seven pink, six white, shuffled from a fixed seed.
- Shapes are drawn with globalCompositeOperation 'multiply' onto the transparent canvas, then the vermilion field is painted behind with 'destination-over'. The overlap colors are computed by the blend on every frame, never pre-baked.
- Tap anywhere (pointerup within 12px of pointerdown) deals a new seeded layout: every shape tweens position and size to its new cell over 2s with easeInOutCubic, and the multiply recompute runs continuously through the slide, so overlap colors appear, move and vanish mid-flight.
- Watch-only by default; reduced motion jumps straight to the new layout.
- Fixed-phase deterministic first frame: all layout, color and jitter values come from mulberry32 seeds only, no Math.random anywhere. Gallery date 2006 · 05 · 29. Hint: "Tap to deal a new layout."

## Deviations from the prompt

1. The prompt names the overlap colors as deep plum #5A2A4A (teal over pink), pale ice #B8D8D8 (white over teal) and rust #A84A2A, produced by multiply. Those three colors cannot be produced by multiply from these shape colors: verified numerically in node-canvas across every standard blend mode, no single mode yields the named trio, and under multiply white is (near-)identity, so white over teal can never make ice. Implemented the specified mechanism faithfully instead: multiply computes the overlaps live. The actual computed overlaps are dark slate #1B2F33 (teal over pink, 5,693 px in frame one), deeper pink #DF929A (pink over white, 2,663 px), and near-teal #1D4A48 (white over teal, barely visible). Frame one was seed-picked so the dark slate patches are large and unmistakable.
2. No separate offscreen canvas: shapes multiply directly on the main canvas over transparency and vermilion is painted behind with 'destination-over'. The pixel math is identical to the specified offscreen layer, and it keeps one code path so the node-canvas QA render tests exactly what ships (render-piece.js does not shim document.createElement).

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile and 720x720 (thumb.png). Inspected all three: loose Bauhaus grid on vermilion, title/date/hint legible, dark slate overlap patches clearly visible on desktop and mobile, mobile full-bleed tall grid.
- Pixel census of frame one at 720x720: vermilion 56.9%, teal 13.5%, pink 13.2%, white 12.0%, dark slate overlap 1.10%, deeper pink overlap 0.51%.
- Tap probe (pointerdown/up, then stepped draw): at t=1.0 the geometry differs from both frame one and the target, with overlap colors still present mid-slide; at t=2.0 the geometry equals the target layout exactly and differs from frame one. The 2s slide and live recompute are confirmed.
- Determinism: repeat renders at 720x720 and 1280x900 are byte-identical (md5 match).
- Fix rounds: one. First build had overlap areas too small to read (dark slate 0.14% of frame); jitter widened from +-0.15/0.12 to +-0.22/0.18 cell and the frame-one seed was picked by an area-weighted scan (seed 1606919: 12 overlapping pairs, 5 teal-over-pink, visible overlap area 3.30% of the grid).
