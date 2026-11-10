# No.1666 Averaging, Generation 40

- Driver: noise averages itself, generation by generation, until continents appear and the field proves it tiles.
- Study: #219 jos-vromans, prompt PP913 JV3.
- Date: 2006 · 08 · 04
- Interaction: watch-only. No pointer input; the loop is the piece.
- Silent: no audio.

## Mechanism

A 128 x 128 float RGB buffer is seeded with full-color noise (one uniform
random hue per pixel at saturation 0.85, value 0.8, via a fixed-seed
mulberry32 generator; no palette is chosen by hand). Every 0.15 s the
buffer advances one generation: each pixel becomes the mean of itself
and its eight neighbours, edges wrapping toroidally to the far side,
so the field tiles the plane by construction. 120 generations per
cycle (18 s of coalescing), then a 6 s tiling proof: the same buffer
is drawn repeated 2 x 2 with a hairline grid marking the seam
positions, fading in and out as a closed-form function of cycle time.
Then the cycle reseeds from the next entry of a fixed 8-seed table
and starts again.

The buffer is written to the main canvas through a cached ImageData
with nearest-neighbour sampling (no second canvas element, no
offscreen canvas). On phones the field is full-bleed; on desktop it
is a centered square on a muted mauve ground.

## Determinism

Frame one is drawn synchronously at a fixed phase, t = 8.0 s,
generation 53 (islands visible, not raw noise and not fully settled).
The rAF loop is anchored as that offset plus elapsed time since load;
the generation index is a pure function of piece time and the buffer
is cached and stepped forward incrementally, reseeding only when a
cycle wraps. No Math.random() anywhere.

## Resolutions and timing

- Working buffer: 128 x 128 float RGB.
- Generations per cycle: 120, one per 0.15 s (about 9 frames at 60 fps).
- Cycle: 24 s (18 s coalescing, 6 s tiling proof).
- Frame one: generation 53 of cycle 0, seed table index 0.

## Deviations from the prompt

None in mechanism. Two presentational choices, both inside the
prompt's latitude: the seed noise is sampled as random hue at fixed
saturation/value (still full-color noise, no hand-chosen palette) so
the averaged field keeps rainbow hues instead of collapsing to grey;
the page ground is a muted mauve sampled from the settled field's
mean tone.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900
desktop, 390x844 mobile, and 720x720 thumb; all three inspected.
Desktop shows a centered square of muted rainbow islands on mauve
ground; mobile is full-bleed; thumb matches desktop. Probe renders
at t = 1.0 (generation 6, speckles coalescing) and t = 21.0
(generation 119, 2x2 tiling with hairline seam grid, same field in
all four quadrants, no visible seam in the field itself) both
verified. Thumb rendered twice, byte-identical (md5 b7221fdff7b109941ed2488af6d0b37f).
No fix rounds needed.
