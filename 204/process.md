# No.386 Cloud Dancer Tiles — process

## Concept

After Maryna Lagereva's (@maryna.lagereva) Delft whimsy. A strict
Delft tile grid in deep blue on white, but the traditional
windmills are gone: each tile holds one whimsical vignette from
her observed Delft piece — cat, cupcake, wave, palm tree, tomato,
sailboat, open book, heart. One tile is the Cloud Dancer joke
tile: pure white with a single tiny blue cloud. The discipline
is the piece, so the palette stays strict two-colour throughout.

Palette, closed: ground/tile #FDFCF8, linework #1F4E79, deeper
accent #163A5C for tile borders only. Flat colour only. The
glaze sheen is white at stepped alpha over the top, per the
prompt's 0–0.12 range. No text, no chrome, watch-only.

## Construction

- One canvas, design space 1280x900, cover fit, full-bleed at
  any aspect. Sizing comes from the Visual Viewport API with
  resize listeners on both visualViewport and window; the canvas
  element is pinned by style width/height every frame; phone
  detection uses the window.screen physical size with the
  tall-aspect fallback. Per the batch adaptation flag, the
  prompt's responsive grid resolves to a fixed 8x8 grid in
  design space; phones crop full-bleed under cover-fit.
- Grid: exactly 64 tiles (8x8), asserted at load. Each tile is
  a rounded-square border (corner radius 13px, inset 3.5px so
  the white gaps between borders read as thin grout) sampled
  into points, every point jittered +-1px from fixed seed data,
  so no border is vector-straight. Borders are drawn in the
  deeper #163A5C; motifs in #1F4E79; all strokes 2px with round
  caps and joins.
- Motif library: 8 motifs built purely as stroke data (sampled
  lines, arcs, quadratics and cubics in a 100x80 box), each
  asserted at load to hold 15–25 strokes: cat 20, cupcake 18,
  wave 17, palm 17, tomato 15, sailboat 17, open book 16,
  heart 16. Assignment is a seeded deal: each motif appears 8
  times in a shuffled order across the 64 tiles. Each tile
  bakes its motif strokes transformed into tile space (scale
  about 0.88 with a seeded +-6% variation, rotation within
  +-2 degrees, point jitter +-0.7px) together with cumulative
  arc lengths, so any tile can redraw by stroke reveal.
- Cloud Dancer: exactly one, asserted, at the fixed authored
  seat index 27 (row 3, col 3). Its whole motif is two strokes:
  one tiny scalloped cloud outline and a small inner arc,
  drawn at reduced scale. Pure white tile, one tiny blue cloud.
- Motion: a 100-second loop holding two whole-cycle systems.
  The glaze shimmer sweeps diagonally every 25s (4 sweeps per
  loop): a band of seven flat alpha steps (0.03 to 0.12 white,
  no gradient anywhere) drawn as parallelograms of constant
  x+y, travelling the full diagonal and off both ends. The
  touch-up redraws, per the batch flag, are a FIXED authored
  sequence, not random: tiles 9, 41, 56, 18 and 33 begin
  redrawing at t = 4, 20, 44, 63 and 82s; each blanks and
  re-inks by arc-length stroke reveal over 4s with a smoothstep
  ease, one at a time, like a painter touching up the kiln
  batch. The Dancer is never touched up. WATCH-ONLY: no pointer
  handlers exist.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 37.5s, 0.375 through the loop: the glaze
  band sits exactly mid-sweep (halfway through its 25s period,
  crossing the middle of the grid), every tile is fully inked
  and no touch-up window is open. The animation clock advances
  from that anchor in fixed 1/60 ticks accumulated from rAF
  timestamps; rAF is typeof-guarded. Frame one never reads a
  wall clock. All scatter, jitter and the motif deal come from
  a fixed-seed LCG baked at load.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png).
- Desktop: 64 hand-wobbled tiles edge to edge, all eight
  motifs legible (cats with whiskers and tails, frosted
  cupcakes, cresting waves over scalloped water, ringed palms,
  spotted tomatoes with star calyxes, sailboats with gulls,
  open books with sparkles, hearts with inner hearts), the
  lone Cloud Dancer cloud sitting in row 4. Two motifs were
  revised after the first render: the wave's dome became a
  rising ridge with a hooked crest curl, and the tomato lost
  a symmetric dot-and-arc arrangement that read as a face.
- Mobile: cover crop keeps the grid full-bleed with whole and
  partial tiles running off every edge; motifs read large.
- Thumb: the grid, motifs and the Dancer tile all read at
  gallery size; strict blue on white holds.
- Motion verified with throwaway probe renders (not shipped):
  a boosted-alpha copy confirms the glaze band sweeps the
  true diagonal and lightens only what it crosses; a copy
  frozen at T = 22s shows tile 41 blank mid-redraw while
  every other tile stays complete.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified: no gradients, no shadowBlur, no offscreen
  canvas, no Math.random, no Date.now, no em dashes, no
  absolute URLs.
