# No.353 Harlequin Overflow

EXPANSION #37 (betterloveart, Suchita Prakash), prompt 1.
Gallery date: 2002 · 12 · 30 (formula 2002-01-10 + (N+1) days).

## Concept

After Suchita Prakash's "Merry Maximalist" Christmas harlequin
patchwork: a zero-margin diamond lattice in hot pink #E0509A,
kelly green #1E8A49 and royal blue #4A90D9 fills the frame edge
to edge, and every diamond holds exactly one small Christmas
vignette drawn flat in cream #F5EEDC, cranberry #A61C3C and
amber #E8A93D. The vignette library is closed at exactly the
prompt's eight nameable motifs: Santa, nutcracker, gingerbread
house, snowman, bauble, stocking, owl, beetroot. No ninth
motif exists. Each diamond also carries an overflow (bleed)
factor: vignettes are painted in a second pass over the
lattice at radius R * (1 + bleed), so the high-bleed ones
spill past their diamond borders onto their neighbours while
the lattice stays legible underneath. The whole repeat is a
living wallpaper: it drifts slowly sideways, one full table
period per loop. Loop length: 60 seconds. Watch it drift;
drag to pan the repeat (the position persists on release);
double-tap to advance the whole packing to the next authored
arrangement.

## Construction

- One canvas, 2D, flat colour only: no gradients, no
  shadowBlur, no filters, no offscreen canvas. Design space
  1280x900, cover-fit (field composition, full-bleed on
  phones too).
- Harlequin lattice: rhombi with diagonals 176 x 130 on a
  half-drop layout (rows pitched at half the vertical
  diagonal, alternate rows offset half a width), drawn with
  shared edges and no grout lines, tiled from a wrapped
  repeat of 8 columns x 12 rows (96 cells). Cells are drawn
  over the visible range plus margin from the pan offset, so
  coverage holds at any pan position.
- Assignment tables as JS data: three authored arrangements,
  each holding a colour, motif and bleed entry for all 96
  cells, generated offline from fixed seeds and written into
  the file verbatim. Nothing is runtime random. Colours were
  seeded at random and repaired under a soft patchwork rule
  (no diamond ends up with more than one edge-neighbour of
  its own colour), giving an organic scatter with balanced
  counts (28 to 36 per colour per arrangement) instead of
  stripes. Motifs are dealt exactly 12 of each of the eight
  per arrangement. Bleed values come from the discrete set
  {0, 0.06, 0.12, 0.18, 0.24, 0.30}, clamped to the prompt's
  0 to 30 percent past the border; a runtime assertion
  re-checks the clamp, the table sizes and that every motif
  appears in every arrangement.
- The eight vignettes are hand-authored parametric painters
  (flat fills, a few cream strokes for the bauble loop,
  stocking loop and beetroot rings), each drawn centred in
  its diamond at base radius 44 scaled by (1 + bleed).
- Motion: watch-only drift. The pan offset is a pure
  function of the loop clock: drift = (T mod 60) / 60 x
  1408px, exactly one repeat period per 60s loop, so frame
  60s is pixel-identical to frame 0 at rest.
- Interaction: drag pans the repeat through the stored
  cover transform (S, OX, OY) and the pan persists on
  release, clamped to one period in each axis (invisible,
  since the field is periodic). Double-tap (two taps within
  0.38s of loop-clock time, near the same spot, without a
  drag) advances arrIdx through the three authored
  arrangements. No text, no hint, no UI in the piece.
- Determinism: the synchronous first frame is drawn at the
  constant phase T = 23.0s (drift mid-pan, packing fully
  developed), and the rAF clock is anchored as that constant
  plus elapsed time since load via a 1/60 tick accumulator.
  Frame one is never drawn from a wall-clock offset, so the
  thumbnail reproduces byte-identically from the shipped
  script.
- House rules: Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned every frame
  via style width/height in px; phone detection via
  window.screen minimum dimension < 700px with the aspect
  fallback (h > w * 1.15); every requestAnimationFrame use
  typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png), all from the shipped script.
- Desktop: full-bleed lattice, zero negative space, the
  three diamond colours scattered without banding; all
  eight motifs present and nameable (Santa with pompom
  hat, nutcracker with tall amber hat, gingerbread house
  with icing-dotted roof, snowman with top hat and scarf,
  zigzag bauble, cuffed stocking, amber owl, beetroot with
  amber leaves and cream rings); high-bleed baubles visibly
  spill over their borders; no grout lines, no text.
- Mobile (390 wide): cover-fit crops the field sides as
  designed for a field composition; lattice still runs off
  every edge, motifs legible at the larger scale.
- Thumb: rendered twice at 720x720 and compared: byte-
  identical. The constant-phase first frame holds.
- Table generation QA (offline, before embedding): colour
  maps printed per arrangement and eyeballed for banding
  (two earlier generator passes that produced row stripes
  were rejected); final tables verified in the generator
  for the soft neighbour rule and balanced counts, and
  re-asserted at runtime in the piece itself.
