# No.379 Romantsy Toile

## Concept

After Jen K's (jenkbdoodles) modern toile: fine purple
line-art vignettes tiled in half-drop on cream, with her
sparkly textured speckle over the top. The vignette library
is exactly the prompt's eight: a flying dragon, a
mountain-top castle, stacked books with roses, a sword, a
crown, a candle, a crescent moon, and clouds. It is line
art only, no filled shapes, in the romantasy purple on
cream colourway (the dark-blue variant is not shipped).
The piece is a wallpaper to watch being inked: the field
draws itself in, holds, fades to blank, and redraws.

## Construction

- One self-contained canvas, design space 1280x900,
  cover-fit: the toile field bleeds past the frame at any
  aspect and the page ground stays the piece's cream
  #F3EBDD. Canvas pinned every frame via style width/height
  in px; sizing from the Visual Viewport API with resize
  listeners on visualViewport and window; phone detection
  via window.screen physical size (min dimension under
  700px) with the aspect fallback.
- Palette, closed: ground and page #F3EBDD, linework
  #7B5FA6, speckle white #FFFFFF at 0.15 alpha and gold
  #C9A24B micro-dots. Flat colour only: no gradients, no
  filters, no shadowBlur, no offscreen canvas.
- Vignette library of exactly 8, asserted at load. Each
  vignette is a set of polylines authored as point lists:
  the dragon is an S-curve bezier spine with jagged
  membrane wings, belly ticks taken from the sampled spine,
  claw legs and a spiral tail curl; the castle is a
  crenellated centre tower with flag, roofed side towers,
  door arch and windows on a mountain ridge; the books are
  three stacked spined rectangles with page lines and a
  spiral rose; the sword is a ridged blade, guard with
  curled ends, wrapped grip and pommel; the crown is a
  zigzag with tip circles and a jewelled band; the candle
  is a dripped body with a teardrop flame on a dished
  holder; the moon is a true two-circle crescent computed
  from the circles' intersections, with sparkles; the
  clouds are sampled bump-function outlines with flat
  bottoms. Every path is resampled to a 3.5px step and
  given a fixed 1px seeded wobble baked in at load, so the
  2px round-cap strokes read hand-drawn, never vector
  perfect. The wobble never changes after load.
- Layout: a half-drop grid, tile about 1/5 of the design
  height (180px), columns 256px apart, odd rows dropped
  half a tile, bleeding past every edge so the cover crop
  stays full. 49 instances pull motifs from a seeded
  shuffle of the 8-library, each rotated within plus/minus
  15 degrees with small seeded position jitter: evenly
  spaced but not rigid, non-directional.
- Speckle: a fixed seeded table drawn directly each
  frame, 240 white dots whose 0.15 alpha shimmers on 3
  whole cycles per loop and 90 gold micro-dots twinkling
  on 5 whole cycles with per-dot phases.
- Loop: seamless 36 second master loop in three whole
  phases. Draw-in (12s): the reveal walks each vignette's
  resampled points in order, so strokes grow like a pen
  drawing them, with the start staggered by row (row r
  starts at 0.05 r of the phase and draws over 0.70 of
  it). Hold (12s): the field sits complete while the
  speckle shimmers. Fade (12s): the linework alpha eases
  to zero, then the loop redraws.
- Interaction: none. Watch-only, per Hans's rethink rule:
  not everything needs to be interacted with. No text, no
  labels, no chrome, no pointer handlers.
- Determinism: the first frame is drawn synchronously at
  the constant phase T = 18.0s, the middle of the hold
  phase with the vignettes complete (the constant anchor,
  not blank), the clock anchored there and advanced in
  fixed 1/60 ticks, requestAnimationFrame typeof-guarded.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Desktop: the full library reads at a
  glance, castles, crowns, books with roses, swords,
  candles, moons and clouds in half-drop, dragons legible
  as winged S-curve flyers with curled tails, gold speckle
  faint over the cream. Mobile: cover crop keeps whole
  vignettes in frame, cream ground continuous to every
  edge. Thumb: the field reads as toile instantly at
  gallery size, motifs distinct.
- Thumb rendered twice from the shipped script and
  compared: byte-identical (md5 6d8520e5...).
- Phase probes (temporary copies with the anchor moved,
  not shipped): at T = 6.0 (mid draw-in) the top rows are
  nearly complete while the lower rows are first strokes
  only, moons still open arcs, confirming the row stagger;
  at T = 30.0 (mid fade) the complete field sits at half
  alpha. Both rendered without errors.
- Vignette count asserted in code (8). The loop phases
  are time-driven and verified by the anchor probes
  above; there is no pointer state to exercise.
