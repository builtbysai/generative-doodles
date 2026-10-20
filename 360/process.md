# No.360 Dark Academia, Three Ways

EXPANSION #37 (betterloveart, Suchita Prakash), prompt 8.
Completes #37.

## Concept

Her curatorial signature from the Dark Academia SPD
collab: one fixed five-colour palette handed to many
designers so the results coordinate into a collection.
The piece runs that idea as a machine: ONE palette,
three generator grammars, shown at once as a triptych.
Left, an ogee damask on plum. Centre, a berry lattice
on ink. Right, Delft-style tiles on parchment. The
panels are divided by hairline parchment lines. Each
panel drifts at its own rate, and a double-tap drops
a new "collection": all three grammars re-roll their
motifs in the same five inks. The palette is the
piece; it never changes.

## Construction

- Palette: exactly five inks, held in a frozen object
  and asserted at load (Object.keys length 5):
  plum #3D2B45, ink #14141C, oxblood #5E1F27,
  parchment #E8DCC3, moss #5A6B48. Every painter reads
  colours from that object alone. A grep of the
  shipped file for hex codes returns exactly those
  five values and no others.
- One canvas, no offscreen canvas, no gradients, no
  shadowBlur, no filters. All motifs are path data
  replayed per panel each frame. Flat colour only.
  No text, no labels, no UI.
- Shared master loop: 40 seconds. Each panel travels
  a whole number of its own pattern periods per loop,
  so frame 40s is pixel-identical to frame 0:
  - Damask (cell 148 x 184, columns half-dropped)
    drifts down two rows (368px) per loop. The motif
    alternation parity (ci + ri) % 2 has vertical
    period two rows, so two rows is the smallest
    whole-period drift.
  - Lattice (diagonal grid in rotated u/v coordinates,
    92px spacing) drifts one period in u AND one in v
    per loop (a 130px horizontal travel of the
    pattern). Node parity (k + j) changes by two under
    that shift, so cluster and accent nodes hold their
    places across the wrap.
  - Tiles (142px squares) drift up one tile per loop.
    The vignette hash (ri * 3 + ci) mod 6 has period
    two rows (3 * 2 = 6, the library size), so a
    one-row shift at the wrap shows identical tiles.
- Damask motifs, four painters: petal medallion,
  acorn sprig, starflower, crescent with star. Lattice
  node clusters, three styles: round cluster of five
  berries with leaves, hanging bunch on a stem,
  sparse three berries with a leaf spray; odd-parity
  nodes carry a small moss diamond accent. Tile
  vignettes, six painters: moth, berry sprig, tulip,
  crescent moon, acorn, star flower, each drawn in a
  two-ink scheme from a table of four pairings of the
  five inks.
- Collections: a fixed table of four authored
  arrangements. Each names the damask motif pair, the
  lattice cluster style and the tile-table rotation.
  Double-tap (two taps within 350ms, each under 400ms
  and under 14 design px of travel) advances the
  collection index only. Palette, grounds, geometry
  and loop are untouched by a re-roll.
- Determinism: frame one is drawn synchronously at
  the constant phase T_OFFSET = 17.35s into the 40s
  loop (all three panels mid-drift); the rAF clock is
  anchored as that offset plus elapsed time in fixed
  1/60 ticks, typeof-guarded. Frame one never comes
  from Date.now() minus an offset. The thumbnail
  re-renders byte-identically.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas
  pinned every frame via style width/height in px;
  phone detection via window.screen min dimension
  under 700px with aspect fallback; design space
  1280x900, cover-fit full-bleed; pointer coordinates
  converted through the stored cover transform
  (S, OX, OY).

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). Thumb rendered twice: byte-
  identical both times.
- Desktop: the triptych reads at once. Damask panel:
  parchment ogee outlines on plum, medallions
  alternating with acorn sprigs, oxblood node
  diamonds at the lattice points. Lattice panel: moss
  diagonal grid on ink, oxblood berry clusters with
  parchment glints at even nodes, small diamond
  accents at odd nodes. Tile panel: parchment tiles
  with ink grout, plum inner borders, oxblood corner
  flourishes, and the six vignettes cycling cleanly.
  Dividers are clean parchment hairlines.
- Thumb: all three grammars and the shared palette
  read at gallery size; the tile vignettes stay
  legible.
- Mobile: cover-fit on a tall phone crops to the
  centre of the design, so the lattice panel fills
  the frame; berries and lattice stay legible at
  390 wide. Expected cover behaviour for a wide
  triptych composition, matching shipped field
  pieces.
- Palette audit: grep of index.html for hex colours
  returns exactly the five specced inks and nothing
  else.
- One drafting leftover (two dead zero-size path
  calls at the head of the moth vignette) was removed
  before QA; no other fixes were needed after the
  first renders.
