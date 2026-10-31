# No.494 Edge Type

EXPANSION #59 eugenio-bertozzi, prompt EB6.

## Concept

His ALBA and SBROK wine labels (2024) as a watch-only loop. Tall
condensed white caps run vertically down the left edge of the frame,
reading bottom to top, over an abstract woven field: interlacing
translucent ribbons in orange, violet, and light blue on deep indigo.
The edge placement is the device: the type never centers, and the
ribbons never touch it. The word is a seeded invented word, CUDRO,
assembled from syllable pieces; it is not a wine name, not a brand,
and the source labels' own names are blocklisted in the generator.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette: indigo ground #1E1B4B, ribbons #E8722A, #7C5CBF, #9DC3E6
  at 55-70% opacity, type #FFFFFF. Nothing else.
- Ribbons: 6-8 seeded diagonal bands. Each band is a uniform stroke
  whose centreline is a sine wave along the band's own axis
  (quadratic-band logic realised as a sampled wave path with round
  caps and joins), stroked with globalAlpha in a fixed back-to-front
  order so crossings blend and read as a weave.
- Motion: a seamless 48s watch-only loop. Each band's phase advances
  along its own axis by a whole number of wavelengths per loop (1-2,
  seeded direction), so the slide wraps invisibly; the bands run past
  the field edges, so no cap ever crosses the frame. The edge type
  stays fixed. Tap (pointerdown / touchstart) reseeds the ribbon
  colors and angles from the next seed in the stream; it is a reseed,
  never a page reload, and the word never changes.
- The no-cover rule is structural: ribbons are drawn inside a clip
  rect that starts at a guard line right of the type column, then the
  type is drawn last, above the weave.
- Type: condensed caps from a narrow system stack ("Arial Narrow",
  "Liberation Sans Narrow", Helvetica Neue, Arial), additionally
  condensed by a 0.62 horizontal scale so the letters stay narrow in
  any renderer. Rotated -90 degrees for the bottom-to-top read,
  letter-by-letter with tight letterspacing; size fits the word to
  about 80% of the frame height, capped so the cap height fits the
  type column with air on both sides.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in
  draw() every frame. Phone detection via window.screen (min
  dimension under 700px) with the h > w*1.15 aspect fallback; the
  composition keeps its shape on phones and the page ground is the
  indigo #1E1B4B.
- Determinism: the first frame is drawn synchronously at the constant
  pre-roll phase PHASE0 = 19s (ribbons partway through their weave
  cycle at fixed seeded offsets). The animation loop, when running,
  is anchored as that fixed offset plus elapsed time since load, and
  requestAnimationFrame is typeof-guarded so the node QA renderer
  draws the same frame. All layout derives from mulberry32 seeds
  (word 494003, ribbons 494101 + reseed step); no Math.random, no
  clock reads, no offscreen canvas, no document.createElement.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical. Second render deleted after the check.
- Desktop: CUDRO reads bottom to top in tall white condensed caps
  along the left edge; orange, violet and light blue translucent
  bands weave diagonally across the indigo field, stopping at the
  type column boundary and never touching the letters.
- Thumb: same read at small size; word legible, weave dense.
- Mobile: composition keeps its shape in portrait; word fits its
  column, bands fill the field, nothing clipped.
- Deviations from the prompt letter: none of substance. The band
  centreline is a sampled sine wave rather than a literal quadratic
  path; the prompt names quadratic bands as the technical approach,
  and the wave gives the same interlacing ribbon with the periodic
  shape the seamless wrap requires. The type is drawn with a narrow
  system stack plus a fixed horizontal condense, one of the two
  options the prompt allows (narrow system stack).
