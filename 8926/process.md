# №8926 · Desordres - process notes

## Concept
A grid of squares, each one disobeying a little. Per-cell rotation and
offset come from two octaves of seeded value noise, so neighbouring
squares lean into and away from each other like a crowd shifting its
weight. Most squares are warm charcoal outlines; a few, chosen by the
seed, burn vermilion and sit a touch heavier. After Molnar's (Des)Ordres,
which Hans saved.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 8926. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
- 9x9 grid on desktop (centered, ground is the page color); on phones the
  grid goes full-bleed (9 columns, rows fill the viewport) per the field
  piece rule. Phone detection via window.screen with aspect fallback.
- Rotation: two noise octaves, amplitude 0.16-0.26 rad broad plus half
  that at high frequency. Offset: up to 0.10-0.20 of cell. Square side
  0.60-0.68 of cell with seeded variation.
- Vermilion cells where the coarse noise field exceeds 0.80-0.88,
  drawn 1.5x heavier at 0.94 alpha.
- Bone ground #ece5d3, charcoal ink #201d17, vermilion #c65a34.

## Differentiation
- vs No.9078 (Shimmer): Shimmer is radial dash interference. Desordres
  is a rectilinear grid; its interest is in per-cell disobedience.
- vs No.9074 (Hatch): Hatch is line hatching. Desordres is outline
  squares, no fill, no hatching.
- Family name: "grid disobedience".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  desktop 1280x800, mobile 390x844 (phone screen simulated), and thumb
  720x720. All three inspected: grid reads calm with vermilion clusters,
  no clipping, no doubling.
- Mobile first pass centered a square and left dead space top/bottom;
  revised to full-bleed rows per the field piece rule, re-rendered,
  confirmed full-bleed.
- Piece date 2026-06-20 from the 2002-01-10 + (N+1) formula.
