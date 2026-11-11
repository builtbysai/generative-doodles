# №1707 Agate Field (PP954, #224 aaron-penne)

Driver: a domain-warped noise field rendered as topographic iso-contours, so the piece reads as a slab of agate whose veins crawl like slow geology.

## Mechanism

Seeded value noise (mulberry32 seed 1707, 256-entry permutation) drives 4-octave fbm. The scalar field is domain-warped fbm at frequency 5.0 with two low-frequency warp octaves, plus sine/cosine undulation and two Gaussian basin bumps that form the contour lakes at (0.30, 0.36) and (0.70, 0.66). Bands are filled by classifying every sample of the field into alternating light bands (cream #F2EAD8, pale beige #E6D9BC, sand #DCC9A3) and dark bands (umber #8A5A33, dark olive #55552F, deep umber #6B4423); on top, real marching-squares extraction draws the iso-contour at each level as a dark umber vein, so lines come from the field and never cross or tangle. The field evolves with a slow phase drift, and the piece redraws at most every 140 ms, so contours crawl, merge, and split. Watch-only, no pointer interaction. Frame one is fixed phase t = 0 with seeded RNG only. Desktop shows a square slab on a deep umber ground; phones go full-bleed.

## Acceptance numbers (measured with probes on the actual script)

- Contour levels: 14, from -0.60 in steps of 0.127 (top level 1.178).
- Field range on a 41x41 probe grid: [-0.596, 1.117] at t = 0 and [-0.598, 1.106] at t = 8, so all 14 levels sit inside the live range.
- Lakes: 2 of 2 verified closed-contour (lake 1 center field 0.619 vs 0.320 at a 2.2 sigma ring; lake 2 passes the same test).
- Crawl: scanline crossings of the mid level count 4 at t = 0, 6 at t = 8, 4 at t = 20; field at stage center moves from -0.122 at t = 0 to -0.023 at t = 8. A rendered t = 8 frame was inspected against frame one: contours visibly shifted, merged, and split, with no crossings anywhere.
- No crossings: marching squares emits at most two non-touching segments per cell, with a fixed saddle pairing, so iso-lines cannot cross by construction; none observed in any render.
- QA renders inspected: desktop 1280x900, mobile 390x844, thumb 720x720. Plates legible in all three; mobile full-bleed; desktop square centered.

## Deviations from the prompt

- None in mechanism or palette. Two presentation choices: the desktop ground is deep umber (#3E2A1A) instead of cream, so the square reads as a framed agate slab; and in a real browser the band fills go through an offscreen ImageData canvas with smoothing, while the node-canvas QA path uses per-cell fillRect with the same field and classification (the QA renders are therefore slightly more faceted than the browser original).
- Fix round: first build used 13 levels at step 0.095, which left the lake peaks above the top level and the fill grid at 200 showed stair-stepped edges; levels were re-spanned to the measured field range, the fill grid raised to 320, and the marching-squares grid to 150.

## Gallery note

Watch the veins crawl.
