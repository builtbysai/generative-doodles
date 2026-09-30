# №8966 · Fifty-Three Divisions — process notes

## Seed
267 "Fifty-Three Divisions" (from the Sabat 53-comma octave study).

## Concept
Sabat's 53-comma octave as a visual instrument: 53 equal wedges around a ring,
five wholetones of 9 commas, two limmas of 4. The seven diatonic anchors
(0, 9, 18, 22, 31, 40, 49) get long spokes and note names; the two narrow
limma bands, which honestly hold the 4.2-cent closure error, are bracketed in
brass with a slow shimmer. Hovering or tapping a wedge reads its comma number,
its cents, its nearest 12-tone neighbor with deviation, and whether it sits in
a limma seam.

## Technique
Raw canvas 2D. Wedge color maps comma to hue (c*360/53). Pointer mapped to
wedge by atan2 with rotation offset; readout panel updates live. Click nudges
rotation for tactile feel. Seeded RNG for the initial rotation only; the math
is exact, no RNG in the division itself.
