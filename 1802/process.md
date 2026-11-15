# №1802 Four Hundred and One Fragments

EXPANSION #236 robin-rimbaud, SC3 (PP1049). Gallery date 2006 · 12 · 18.
Gallery note: "Four hundred and one fragments, never the same wall twice. Watch only."

## What it is

A wall of small tiles in a regular 24 by 14 grid, each tile holding one tiny
fragment: a noise field, a line cluster, a glyph, or scanlines. Three
invisible layers govern the wall. Every few seconds a handful of tiles swap,
fade, or restack on a slow irregular clock, so the wall is never the same
arrangement twice. Once per long cycle one tile enlarges briefly to fill a
quadrant, as if the archivist pulled a cassette to listen to it, then it
slides back into the wall. Watch only. No interaction, no progress indicator,
no caption on the wall itself beyond the house title/date/hint plates.

## The 401-seed table

One fixed table of 401 fragment seeds, built once at load from
mulberry32(1802). Kind counts, probed from the shipped script: 122 noise
fields, 93 line clusters, 95 glyphs, 91 scanlines. Each seed carries its own
small palette drawn from paper (#E9E3D3, #DED7C4), ink (#211D19), rust
(#A34D2D), tape-box brown (#8A6B4A), and photocopy grey (#9A968C), plus an
angle, a mark count, a glyph, a scanline gap, and two alphas. A seed is drawn
from a fresh mulberry32 seeded by its own index, so the same seed always
draws the same fragment at any size. The wall as a whole reads warm grey
(#C9C4B8 ground) from a distance.

## The three-layer index

Layer 1, archive: base_i = (i * 37 + 11) mod 401 scatters the 401 seeds
across the 336 cells, so seeds rotate through cells and no two neighbours
share a seed. 24 by 14 is 336 cells, so 65 seeds sit out of the wall on any
given epoch and rotate in through swaps.

Layer 2, cell clock: each cell has its own swap period chosen from
7, 11, 17, 26, 40, 61, 97, 150, 240 seconds, its own phase offset, and its
own step of 1 to 7 seeds. At swap epoch k the cell moves from seed
idx(i, k-1) to idx(i, k) over a 2.5 second crossfade with a small slide of
up to 3 px in a fixed per-cell direction. Swaps are quiet fades and slides
only, never flashes or pops.

Layer 3, drift: every 12th swap a cell also advances by a small per-cell
drift step of 1 to 3 seeds, a slow rotation of the whole archive.

idx(i, k) = (base_i + k * step_i + floor(k / 12) * drift_i) mod 401.
Everything is a pure function of cell and epoch, so a swap never jumps
mid-fade and frame one stays byte-comparable.

## Swap schedule at frame one

Frame one is fixed phase t = 60 s. Probed from the shipped script, 37 of the
336 cells are mid-swap at t = 60 s. Examples: cell 12 (col 12, row 0) fading
seed 58 to seed 60 at 0.75; cell 52 (col 4, row 2) fading seed 343 to seed
349 at 0.53; cell 22 (col 22, row 0) fading seed 30 to seed 31 at 0.18.
At t = 200 s, 40 cells are mid-swap, so the wall keeps turning over at a
similar quiet rate.

## Enlarge schedule

One enlarge per 420 second cycle. Start = 60 + j * 420 + jitter (+/-25 s)
from mulberry32(1802 + 91). Duration 16 s: grow 5 s, hold 6 s, return 5 s,
all eased. The enlarged tile is drawn last, on top, interpolating from its
cell rect to its quadrant rect with a soft shadow, and the cell underneath
keeps its own live seed.

At frame one (t = 60 s) the j = 0 enlarge is in progress: it started at
50.96 s on cell 27 (col 3, row 1), seed 208, a glyph fragment (approx), so
at t = 60 s it is 9.04 s old, in its hold phase at full scale 1.0, filling
the top-left quadrant with a giant approx glyph and one small rust
satellite square. The next enlarge starts at 468.55 s on cell 298
(col 10, row 12), seed 231, a line cluster, over the bottom-left quadrant.

## Deviation from the prompt

The prompt does not restrict which tile enlarges. The build restricts the
enlarge tile to a line cluster or glyph seed: the tile is the first cell,
scanning forward from a seeded start cell, whose seed at the event start is
kind 1 or 2. A noise field enlarged to quadrant scale reads as a few huge
bars in an empty field (caught in the first QA render, where cell 24 seed 90
enlarged that way); a glyph or line cluster stays legible as an enlarged
fragment. The scan is deterministic and closed form, so frame one is
unaffected in comparability. Everything else follows the prompt verbatim,
including watch-only, no margins on the tile wall, no captions, no frame,
and no progress indicator. The small title/date/hint plates are the house
template, as on every other piece.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window.
Canvas pinned in draw() via canvas.style.width/height in px. Phone detection
via window.screen (min dimension under 700 px) with aspect fallback
(h > w * 1.15). Field composition: full-bleed on phones, square on desktop
with the page ground set to the warm grey wall color. One synchronous frame
at load; requestAnimationFrame guarded by a typeof check. No Date.now or
Math.random affects frame one; all state derives from seeded RNG and closed
form functions of piece time. No click-to-reload, no pointer or keyboard
handlers at all. Reduced-motion viewers get the static frame one. No audio.
Canvas 2D only.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: square warm grey field centered on a warm grey ground,
  24 by 14 tile grid, paper/ink/rust/brown/grey fragments, glyphs, line
  clusters, noise and scanlines all legible, the top-left quadrant filled by
  the enlarged approx glyph at full scale with a soft shadow, title plate
  top left, "Watch only." plate bottom left.
- Mobile 390x844: full-bleed grid, tall thin tiles, fragments still legible,
  enlarged approx glyph visible in the top-left quadrant, plates intact and
  unobstructed.
- Thumb 720x720: same as desktop at square size; this file is thumb.png.

Determinism: three desktop renders of the final file are byte-identical,
md5 58f291e705777f278beeb119562be6e1. No em dashes in visible copy. First
build failed QA on the enlarged noise tile (see Deviation above); fixed by
restricting enlarge tiles to line/glyph kinds and re-gated after the edit.
