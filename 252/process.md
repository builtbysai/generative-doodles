# No.495 Palm Tones

EXPANSION #59 eugenio-bertozzi, prompt EB7.

## Concept

His SELVA poster as a living colorway system. Flat palm glyphs in two or
three colors stand on a near-black field: two large palms, a descending
run of smaller ones, one cluster of oversized fronds in the upper right
and a small crown mid-left, with star dots scattered through the black.
One small line of accent-colored micro-type sits bottom-left, naming the
colorway like the colophon on a print: "SELVA · COLORAZIONE 02 / 05".
Each of the five colorways is one of his five printed colorazioni; the
first frame opens on colorway 2 (chartreuse, teal, cream), the richest
of the five. Watch-only motion: the palms sway a breath and the stars
pulse. A tap moves to the next colorway; a double-tap reseeds the grove.

## Construction

- Single self-contained index.html, canvas 2D, flat fills only, no
  strokes, no gradients. Ground #101010. Colorways exactly as specced:
  (1) #E8401F + #8A8F98; (2) #B8D62E + #1F7A6D + #F2E8C9; (3) #F2E8C9 +
  #C33E21; (4) #B9A8E0 + #0E3B2C; (5) #FAFAF6 + #E8722A. Each colorway
  also names an accent (its label/star color), chosen as the palette's
  most legible member against the black: gray, cream, rust, lavender,
  orange respectively.
- Palm glyph: a seeded frond generator. Each frond is a quadratic droop
  curve; along it, 12-14 precomputed leaflets sit as tapered quads
  angled 36-42 degrees off the rib, swept toward the tip, alternating
  sides, longest just past the middle of the rib. Leaflets draw first
  and the rib draws over their bases as a clean tapering arc, which is
  what makes the feather read. A tree palm is a gently leaning tapered
  trunk plus a crown of 6-7 fronds fanned across the upper hemisphere;
  crown clusters are the same crown without a trunk (the corner cluster
  fans up, left, and down-left only, so it never reaches for the right
  edge).
- Layout: eight seeded slots (six trees at descending scales, two
  crowns) with small seeded jitter, sized and spaced so the black stays
  generous and every frond keeps an in-frame margin at phone width.
  Each palm takes one color from the current colorway by seeded index,
  so a colorway change re-dresses the whole grove at once.
- Motion: sway is a rotation about each palm's base, sin(time + phase)
  at a per-palm speed, amplitude about 1.5 degrees. Star twinkle is a
  seeded per-dot alpha pulse (diamonds, plus four-point sparkles for
  the larger dots). Tap vs double-tap is resolved with a 330 ms window:
  a lone tap cycles the colorway, a double-tap increments the seed and
  rebuilds the layout.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; the poster keeps its shape
  on phones and the page ground is the near-black.
- Determinism: the first frame is drawn synchronously at a constant
  phase (t = 4.2s: palms mid-sway, dots at fixed twinkle alphas,
  colorway 2). The animation loop, when running, is anchored as that
  fixed offset plus elapsed time since load, and requestAnimationFrame
  is typeof-guarded so the node QA renderer draws the same frame. All
  layout uses a seeded mulberry32 RNG (seed 495007); no Math.random,
  no Date.now() anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical; re-verified after the final geometry pass. Second render
  deleted after each check.
- Three build iterations on the palm glyph, the make-or-break element:
  (1) first pass scaled frond lengths in unit fractions instead of
  pixels, so only trunks rendered; fixed by moving all palm geometry
  into a unit space scaled by palm height at draw time. (2) Long,
  steep leaflets (up to 46% of rib length at 50-60 degrees) read as
  spiky starbursts; shortened and narrowed them. (3) Still tangled:
  gentler droop and rise on the rib curve, leaflets finer and more
  numerous at 36-42 degrees, rib drawn over the leaflet bases. Final
  read: clean feathered fronds, palms legible at all three sizes.
- Desktop and thumb: six trunked palms at descending scales across the
  lower frame in teal and cream (colorway 2's seeded assignment), the
  chartreuse frond cluster upper right, small chartreuse crown
  mid-left, sparse twinkling stars, label bottom-left in cream.
- Mobile: composition keeps its shape, palms group in the lower half
  under a tall black sky, no frond clipped, label fits.
- Deviations from the prompt letter: none. Two implementation choices:
  palm positions come from structured seeded slots rather than free
  random scatter (protects the black space and the edge margins), and
  each colorway's accent is a named palette member rather than a
  computed value.
