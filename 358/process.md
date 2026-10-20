# No.358 Delft Tiles

EXPANSION #37 (betterloveart, Suchita Prakash), prompt 6.
Gallery date: 2003 · 01 · 04 (formula 2002-01-10 + (N+1) days).

## Concept

After Suchita Prakash's Delft tiles challenge entry and her
"blue tit and berry lattice tile" Florentine piece: a
cobalt-on-white tile grid fills the frame edge to edge.
Every square tile holds one small hand-drawn vignette in
cobalt linework and carries an ornamental flourish in all
four corners, split from its neighbours by thin deep-blue
grout lines. The vignette library is closed at exactly ten
motifs. A slow sheen band of layered translucency travels
the grid like light moving across glazed ceramic. Loop
length: 36 seconds. Tap a tile and that tile alone moves
on to its next vignette; the rest of the grid is untouched.
No text, no hint, no UI in the piece.

Palette: cobalt #274C9B, deep blue #1F4E9C, white #F7FAFF.
Two blues on white, nothing else. Flat colour only.

## Construction

- One canvas, 2D, flat colour only: no gradients, no
  shadowBlur, no filters, no offscreen canvas. Design space
  1280x900, cover-fit (field composition, full-bleed on
  phones too).
- Grid: 8 columns x 6 rows of 160px square tiles, 48 tiles.
  The field is painted deep blue first and each tile face is
  filled white inset by half the 3px grout width, so the
  grout reads as thin deep-blue lines between tiles.
- Corner flourish, identical in all four corners of every
  tile: a deep-blue bracket line hugging the corner, a
  cobalt dot inside it and a small diagonal tick, mirrored
  per corner by sign flips.
- The vignette library (indices as used in the data):
  0 moth, 1 berry sprig, 2 blue tit, 3 tulip, 4 windmill,
  5 fish, 6 ship, 7 shell, 8 teapot, 9 sunflower. No
  eleventh motif exists; a runtime assertion checks the
  library holds exactly ten. The prompt's named four (moth,
  berry sprig, blue tit, tulip) are joined by six more in
  the same hand: windmill, fish, ship, shell (a scallop
  fan), teapot and sunflower. Each painter draws centred in
  its tile at radius 54, cobalt strokes with deep-blue flat
  accents (the tit's head and beak, the tulip cup and
  leaves, the sunflower seed head) and paper-white details
  (petal separations on the tulip, seed dots, berry glints).
- Per-tile cycles as JS data: the CYCLES table holds one
  full permutation of the ten motif indices for each of the
  48 tiles, generated offline from fixed seed 3580114 and
  written into the file verbatim. Nothing is runtime
  random. Every tile starts at step 0; the opening motifs
  cover all ten motifs, each opening between 2 and 9 tiles
  (in library order: moth 5, berry sprig 4, blue tit 5,
  tulip 3, windmill 8, fish 9, ship 4, shell 2, teapot 4,
  sunflower 4). A runtime assertion re-checks that every cycle is
  a true permutation of the library. The full cycles:
- Tile 0 (row 1, col 1): windmill -> berry sprig -> blue tit -> teapot -> fish -> ship -> sunflower -> tulip -> moth -> shell.
- Tile 1 (row 1, col 2): ship -> teapot -> moth -> windmill -> fish -> sunflower -> berry sprig -> blue tit -> tulip -> shell.
- Tile 2 (row 1, col 3): blue tit -> berry sprig -> tulip -> windmill -> moth -> shell -> teapot -> fish -> ship -> sunflower.
- Tile 3 (row 1, col 4): windmill -> blue tit -> moth -> shell -> ship -> tulip -> teapot -> sunflower -> fish -> berry sprig.
- Tile 4 (row 1, col 5): moth -> blue tit -> tulip -> ship -> fish -> windmill -> sunflower -> shell -> teapot -> berry sprig.
- Tile 5 (row 1, col 6): shell -> tulip -> moth -> ship -> fish -> teapot -> windmill -> sunflower -> blue tit -> berry sprig.
- Tile 6 (row 1, col 7): fish -> berry sprig -> shell -> teapot -> ship -> moth -> windmill -> blue tit -> tulip -> sunflower.
- Tile 7 (row 1, col 8): windmill -> teapot -> fish -> blue tit -> tulip -> moth -> shell -> berry sprig -> sunflower -> ship.
- Tile 8 (row 2, col 1): blue tit -> berry sprig -> moth -> sunflower -> fish -> windmill -> tulip -> shell -> ship -> teapot.
- Tile 9 (row 2, col 2): teapot -> moth -> blue tit -> tulip -> sunflower -> berry sprig -> ship -> windmill -> shell -> fish.
- Tile 10 (row 2, col 3): berry sprig -> moth -> shell -> fish -> tulip -> sunflower -> teapot -> windmill -> ship -> blue tit.
- Tile 11 (row 2, col 4): teapot -> sunflower -> windmill -> shell -> fish -> tulip -> moth -> ship -> berry sprig -> blue tit.
- Tile 12 (row 2, col 5): ship -> berry sprig -> tulip -> blue tit -> shell -> moth -> fish -> sunflower -> teapot -> windmill.
- Tile 13 (row 2, col 6): fish -> sunflower -> moth -> teapot -> blue tit -> berry sprig -> tulip -> ship -> shell -> windmill.
- Tile 14 (row 2, col 7): windmill -> ship -> teapot -> blue tit -> fish -> tulip -> berry sprig -> shell -> sunflower -> moth.
- Tile 15 (row 2, col 8): blue tit -> sunflower -> teapot -> windmill -> ship -> shell -> tulip -> berry sprig -> moth -> fish.
- Tile 16 (row 3, col 1): sunflower -> windmill -> fish -> teapot -> moth -> berry sprig -> blue tit -> tulip -> shell -> ship.
- Tile 17 (row 3, col 2): fish -> blue tit -> windmill -> ship -> moth -> berry sprig -> teapot -> sunflower -> tulip -> shell.
- Tile 18 (row 3, col 3): berry sprig -> blue tit -> sunflower -> ship -> windmill -> fish -> moth -> tulip -> shell -> teapot.
- Tile 19 (row 3, col 4): fish -> berry sprig -> tulip -> moth -> windmill -> ship -> shell -> blue tit -> teapot -> sunflower.
- Tile 20 (row 3, col 5): windmill -> sunflower -> teapot -> moth -> shell -> ship -> blue tit -> tulip -> fish -> berry sprig.
- Tile 21 (row 3, col 6): shell -> teapot -> windmill -> sunflower -> tulip -> ship -> berry sprig -> fish -> moth -> blue tit.
- Tile 22 (row 3, col 7): moth -> shell -> sunflower -> fish -> teapot -> windmill -> berry sprig -> tulip -> ship -> blue tit.
- Tile 23 (row 3, col 8): fish -> teapot -> berry sprig -> blue tit -> shell -> windmill -> sunflower -> tulip -> moth -> ship.
- Tile 24 (row 4, col 1): moth -> tulip -> fish -> teapot -> blue tit -> shell -> windmill -> sunflower -> ship -> berry sprig.
- Tile 25 (row 4, col 2): fish -> berry sprig -> teapot -> shell -> moth -> blue tit -> tulip -> ship -> windmill -> sunflower.
- Tile 26 (row 4, col 3): tulip -> ship -> windmill -> sunflower -> teapot -> berry sprig -> moth -> fish -> shell -> blue tit.
- Tile 27 (row 4, col 4): moth -> shell -> teapot -> tulip -> fish -> berry sprig -> sunflower -> windmill -> ship -> blue tit.
- Tile 28 (row 4, col 5): sunflower -> ship -> tulip -> fish -> teapot -> windmill -> blue tit -> moth -> shell -> berry sprig.
- Tile 29 (row 4, col 6): blue tit -> fish -> moth -> berry sprig -> shell -> ship -> windmill -> sunflower -> tulip -> teapot.
- Tile 30 (row 4, col 7): teapot -> ship -> shell -> blue tit -> sunflower -> fish -> berry sprig -> windmill -> tulip -> moth.
- Tile 31 (row 4, col 8): fish -> tulip -> blue tit -> sunflower -> shell -> moth -> windmill -> teapot -> ship -> berry sprig.
- Tile 32 (row 5, col 1): ship -> windmill -> sunflower -> moth -> blue tit -> berry sprig -> tulip -> shell -> fish -> teapot.
- Tile 33 (row 5, col 2): fish -> windmill -> moth -> blue tit -> tulip -> shell -> berry sprig -> teapot -> ship -> sunflower.
- Tile 34 (row 5, col 3): tulip -> windmill -> shell -> moth -> fish -> berry sprig -> blue tit -> ship -> sunflower -> teapot.
- Tile 35 (row 5, col 4): tulip -> sunflower -> windmill -> moth -> fish -> berry sprig -> ship -> teapot -> blue tit -> shell.
- Tile 36 (row 5, col 5): sunflower -> windmill -> teapot -> fish -> moth -> blue tit -> tulip -> ship -> shell -> berry sprig.
- Tile 37 (row 5, col 6): berry sprig -> tulip -> ship -> windmill -> fish -> teapot -> blue tit -> shell -> sunflower -> moth.
- Tile 38 (row 5, col 7): windmill -> fish -> shell -> sunflower -> blue tit -> moth -> tulip -> berry sprig -> teapot -> ship.
- Tile 39 (row 5, col 8): teapot -> blue tit -> moth -> sunflower -> shell -> fish -> windmill -> tulip -> ship -> berry sprig.
- Tile 40 (row 6, col 1): sunflower -> berry sprig -> fish -> moth -> teapot -> shell -> blue tit -> ship -> windmill -> tulip.
- Tile 41 (row 6, col 2): windmill -> teapot -> sunflower -> fish -> ship -> shell -> moth -> berry sprig -> blue tit -> tulip.
- Tile 42 (row 6, col 3): fish -> teapot -> moth -> shell -> blue tit -> windmill -> berry sprig -> sunflower -> tulip -> ship.
- Tile 43 (row 6, col 4): berry sprig -> teapot -> shell -> moth -> ship -> blue tit -> fish -> windmill -> tulip -> sunflower.
- Tile 44 (row 6, col 5): windmill -> tulip -> moth -> sunflower -> fish -> ship -> teapot -> shell -> blue tit -> berry sprig.
- Tile 45 (row 6, col 6): ship -> windmill -> tulip -> blue tit -> berry sprig -> sunflower -> moth -> teapot -> shell -> fish.
- Tile 46 (row 6, col 7): blue tit -> sunflower -> windmill -> berry sprig -> shell -> fish -> ship -> tulip -> moth -> teapot.
- Tile 47 (row 6, col 8): moth -> windmill -> fish -> sunflower -> shell -> teapot -> berry sprig -> blue tit -> tulip -> ship.
- Interaction: tap only, per Hans's rethink rule (an
  iteration belongs on a tap here). A pointerup within 12px
  of its pointerdown counts as a tap; the client point is
  converted to design coordinates through the stored cover
  transform (S, OX, OY), the tile is hit-tested by column
  and row, and only that tile's step advances by one,
  wrapping through its own cycle. No drag, no double-tap,
  never click-to-reload.
- Sheen: a diagonal band of three stepped flat-alpha cobalt
  washes (half-widths 170 / 114 / 56 at alpha 0.05 / 0.08 /
  0.12), the same layered-translucency construction as
  No.351's sheen, never a gradient. Its centre crosses the
  frame once per 36s loop and sits fully off-frame at both
  ends of the cycle, so frame 36s is pixel-identical to
  frame 0 at rest.
- Determinism: the synchronous first frame is drawn at the
  constant phase T = 13.0s (sheen mid-travel, grid fully
  developed), and the rAF clock is anchored as that
  constant plus elapsed time since load via a 1/60 tick
  accumulator. Frame one is never drawn from a wall-clock
  offset, so the thumbnail reproduces byte-identically
  from the shipped script.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen minimum dimension < 700px
  with the aspect fallback (h > w * 1.15); every
  requestAnimationFrame use typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png), all from the shipped script.
- Desktop: full 8x6 grid edge to edge, thin grout lines,
  corner flourishes on every tile; all ten motifs present
  and nameable at step 0 (windmill with lattice sails,
  sailing ship with flag and wave bumps, blue tit on its
  perch with deep head and paper cheek, moth with eyespots,
  scallop shell fan, fish with bubbles, berry sprig,
  teapot with stamped flower, tulips, sunflowers with
  dotted seed heads); the sheen band sits mid-travel as
  three visible stepped washes over the left-centre tiles.
- Mobile (390 wide): cover-fit crops the field to the
  centre columns as designed for a field composition;
  tiles run off every edge, motifs legible at the larger
  scale, sheen still crossing.
- Thumb: rendered twice at 720x720 and compared:
  byte-identical (md5 b3dff792d772ace1e9e22e585a45b8e1).
  The constant-phase first frame holds.
- Audits: the shipped file contains only the three
  palette hexes; grep finds no shadowBlur, no gradient
  constructors, no offscreen canvas creation, no
  Date.now, no Math.random, no absolute URLs and no em
  dashes.
