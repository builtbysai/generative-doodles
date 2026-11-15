# №1796 "Rotation Diary" (LE5, PP1043)

EXPANSION #235 lawrence-english. Date: 2006 · 12 · 12. Gallery note: "A diary grid accretes tile by tile; last year's ring waits behind. Watch only."

Source: TASKS.md prompt block lawrence-english, LE5 (PP1043), mechanism 5 (The photograph as listening note).

## Driver

The diary is a slow accretion of fixed marks; the mechanism is the seeded tile clock and the year-end fold into a ring, not a slideshow.

## Build

A square 7 by 7 grid of paper tiles accretes on a black ground, one tile per 4 seconds, stated honestly as accelerated in the hint plate. Each tile carries one tiny abstract mark from a fixed vocabulary of twelve (horizon line, crow glyph, circle, waveform, vertical line, plus, slash, three dots, arc, triangle outline, double line, zigzag) and a transit stamp in the bottom left corner: a log number over two airport codes, like "53. ASP BNE". Tiles not yet placed show as faint empty cells, waiting. A completed rotation folds once into a ring and freezes as a faint watermark behind the next grid.

Palette: black #0A0A0A ground and ink, paper white #F5F2EA tiles, and exactly one grey, warm grey #8A8378, used for the grid frame, empty cells, plate borders, the rotation line, and the transit numbers at 0.70 alpha (faded warm grey, per the prompt). The previous rotation's ring is drawn in paper white at 0.09 alpha.

## Frame one (fixed phase, t = 62 s)

- Rotation 1, 16 of 49 tiles placed. Tiles 50 through 64 are fully developed; tile 65, born at t = 60 s, is 2 of 3 seconds into its develop-in fade and reads as a mid-grey tile with a vertical mark, its stamp still faint.
- The first 16 tiles show all twelve marks: slash, plus, double line, triangle, waveform, zigzag, vertical, crow, horizon, circle, dots, arc. Marks come from a seeded shuffled deck per rotation (see Deviations), so the vocabulary is complete in every twelve tiles.
- Rotation 0's ring sits behind the grid at 0.09 alpha, its 49 marks encircling the grid square, visible in the margins and faintly through the gaps.
- Title plate top left: "Rotation Diary", "2006 · 12 · 12", "ROTATION 01 · TILE 16 / 49". Hint plate bottom left: "Watch only. One tile per 4 s, accelerated." Plates are paper slips with black ink on the black ground; neither covers a tile.

## Clock and fold

- Tile i is born at i times 4 s within its rotation and develops over 3 s. A rotation is 49 tiles, 196 s. At 196 s the 12 s fold begins: every tile eases from its grid cell to its ring position, shrinking to 0.55 size and fading to 0.10 alpha, while its watermark mark fades in at the ring position. At 208 s the next rotation begins with the folded ring as its watermark. Log numbers continue across rotations (rotation 2 opens at tile 99).
- All timing is closed form of t with seeded RNG only. Frame one is t = 62 s with no wall clock read. Verified by rendering at t = 202 s (mid-fold: tiles mid-flight toward the ring, watermark marks appearing) and t = 260 s (rotation 2, 14 tiles placed, log numbers 99 to 111, rotation 1 ring behind).

## Interaction

Watch-only. Nothing the viewer does adds a tile. No tap, no click-to-reload, no pointer handlers at all. prefers-reduced-motion renders the fixed frame one still.

## Deviations

- A rotation is 49 tiles (7 by 7), not 52. The prompt gives no tile count for a year; a 7 by 7 square grid keeps the "square grid" composition, so the year is 49 tiles at one per 4 s (196 s) plus a 12 s fold.
- Marks are dealt from a seeded shuffled deck per rotation (each twelve tiles contain the whole vocabulary once, the deck rotating by three each pass) rather than drawn independently per tile. The first build drew marks independently and chance gave five circles in the first sixteen tiles; the deck keeps the vocabulary fixed and repeated while guaranteeing the full set is visible.
- The diary is presented mid-life: rotation 0 already completed before viewing, so its ring is the watermark at frame one. Without this there could be no previous-year ring at t = 62 s in the first rotation.
- Transit stamps are two lines (log number over the two codes) so they fit the tile corner at phone size.
- During the fold, paper tiles fade as they travel while their watermark marks fade in at the ring positions; there is no offscreen canvas, since the QA harness has no document.createElement.
- Palette hand-picked from the prompt's named colors (black, white, one grey, faded warm grey numbers) because studies/lawrence-english.md does not exist in the repo.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script:

- Desktop 1280x900: square grid centered on black ground with generous margin, sixteen paper tiles with legible marks and transit stamps, tile 65 mid-develop in grey, faint empty cells for the remaining thirty-three, rotation 0 ring faintly visible around the grid, plates legible top left and bottom left, nothing clipped. Pass.
- Mobile 390x844: square grid stays square and centered, marks legible, ring faint at the edges, plates legible, nothing clipped. Transit numbers are small at phone size (6 px) and read as log texture; the marks carry the tile. Pass.
- Thumb 720x720: same composition as desktop, grid and marks clearly readable at small size. thumb.png IS the 720x720 render. Pass.
- Determinism: two desktop renders produce identical md5 (3d09948370721cffc8448bae86741096), matching 1796-desktop.png. Frame one is closed form of t = 62 s with seeded RNG only; no Date.now or Math.random affects it. requestAnimationFrame calls are guarded with typeof checks.
- Fold and second rotation verified by rendering the same script at t = 202 s and t = 260 s (see Clock and fold above). Pass.
- No em dashes in visible copy. No document.createElement. Literal middot characters in the date and rotation lines, no unicode escapes.
