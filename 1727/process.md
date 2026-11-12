# Sea Glass Grid, No. 1727

PP974 / ZB8, study #226 zach-bodtorf. Watch-only piece.

## Build log

Built 2026-11-12 from the TASKS.md prompt verbatim: a 3x4 grid of digital
sea-glass pieces on deep charcoal, each piece layered translucent Bezier blobs
plus square facets, with a slow diagonal light sweep every 20 seconds.

## Decisions

- Grid: 12 pieces, 3 columns by 4 rows, wide margins (13 percent of the
  stage on each side). Each piece is seeded (mulberry32, seed 1727) with its
  own size, rotation, jitter, dominant color family, 3 to 5 blobs and 1 to 2
  facets, so no two are alike. Blobs are closed quadratic-smoothed paths
  with 6 to 8 lobes; facets are rotated squares in warm amber or pale white.
- Palette: sea green, milky blue and pale amber on deep charcoal #202624,
  exactly as prompted. No drop shadows anywhere.
- Sweep: the front travels the grid diagonal on a fixed 20 second cycle,
  from -0.30 to 1.30, so it is off the grid at both ends and the loop wraps
  invisibly. Each piece brightens by a Gaussian of its diagonal coordinate
  against the front position, redrawn lighter toward white, and a narrow
  diagonal band clipped to the grid marks the front itself.
- Determinism: frame one is fixed at t = 10.0 s, front at 0.5, mid-grid, so
  the thumb shows the sweep in progress. No wall clock, no unseeded random.
- Plates: title, formula date 2006-10-04 and hint on dark plates with a
  sea-green rule, top-left and bottom-left. The centered grid keeps its
  shape on phones with the charcoal ground.

## Deviations

None from the prompt. The bright rim first tried around lit pieces was cut:
it read as a bubble outline around every piece instead of light, so the
brightening now comes only from the relit blobs and the sweep band.
