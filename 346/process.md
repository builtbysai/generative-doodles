# No.346 Harlequin Haunt — process

## Concept

After Emi Bee's harlequin diamond Halloween grid: a full-bleed
lattice of diamonds in alternating warm browns on a near-black
ground, each diamond holding exactly one small motif from her
whimsigoth set: a cream ghost with an ember bow, a black cat
with glowing yellow eyes, a bright eight-pointed star with a
red centre, a dark swirl, a small bat. One motif per diamond,
no exceptions, no sixth motif. A slow wave pulse ripples
across the grid so the whole haunt breathes cell by cell, and
a drag pushes the wave around before it settles back to its
resting loop.

## Construction

- Grid: exactly 9 columns x 6 rows = 54 diamonds, asserted in
  code. Diamonds are drawn at 0.96 of the cell size so a thin
  ground lattice shows between them; fills checker-alternate
  #2A1408 and #331B0A on ground #1A0E06.
- Motif assignment is a fixed seeded table of 54 entries
  written out as data in the script (motif counts 11 / 11 /
  10 / 11 / 11 across ghost, cat, star, swirl, bat), asserted
  at load: length 54, every entry inside the five-motif set,
  every motif present. Never runtime random.
- The five motifs are small parametric painters drawn centred
  in each cell inside radius 46: ghost (cream dome with a
  scalloped hem, ember bow, black eyes and mouth), cat (black
  head and ears, yellow almond eyes), star (16-vertex
  eight-point star in yellow with an ember centre disc),
  swirl (archimedean spiral stroke, 2.75 turns, in cat black),
  bat (cream scalloped wings, body and ears, black eyes).
- Wave: per-cell scale = 1 + 0.06 * sin(dist(cell, wavefront)
  * 0.02 - phase), the wavefront a point sweeping the frame
  diagonal on a 12s cycle, phase advancing two full turns per
  cycle. Both the wavefront position and the phase are pure
  functions of T mod 12, so frame 12s is pixel-identical to
  frame 0 at rest: the loop is seamless.
- Drag: pointer positions are converted to design coords via
  the stored cover transform (S, OX, OY); movement adds to a
  phase impulse clamped to ±3, which enters the wave's sine
  argument and decays by 0.972 per 1/60 tick (snapped to zero
  below 0.002), so at rest no drag energy remains and the
  seam is never broken.
- Clock: T starts at the constant 4.2 (a developed wave phase)
  and advances in fixed 1/60 ticks from rAF timestamps; the
  synchronous first frame is drawn at exactly T = 4.2, so
  renders reproduce byte-identically. rAF is typeof-guarded.
- House rules throughout: Visual Viewport sizing with resize
  listeners on visualViewport and window, canvas pinned every
  frame via style width/height in px, phone detection via
  window.screen min dimension < 700px with aspect fallback,
  cover-fit over the 1280x900 design space, one canvas only,
  no offscreen canvas, no gradients, no shadowBlur, flat
  colour only, palette restricted to the seven specced hexes.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png); all three
  inspected by eye.
- Desktop: full 9 x 6 grid readable, checker alternation
  clear, all five motifs legible, exactly one per diamond,
  wave scale variation visible across the field (cells near
  the wavefront's ripples sit slightly larger).
- Thumb: rendered twice; the two files are byte-identical
  (cmp clean), confirming the fixed-phase first frame.
- Mobile: cover-fit centre crop, motifs large and legible,
  ground consistent to the edges, nothing clipped mid-cell.
- Palette audit: the file contains exactly #1A0E06, #2A1408,
  #331B0A, #F5E6C8, #E4572E, #F2B134, #0B0805 and no other
  colour; no em dashes, no absolute URLs, no text or UI.
- Deviations: none from the spec or its adaptation flag.
