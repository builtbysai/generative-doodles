# No.710 "Hair Grid" — EXPANSION #86 mona-hatoum, block 7

## Concept

A dark textile woven from hair-fine strands hangs in black space, after Mona
Hatoum's hair-grid works: a keffieh-like net reduced to pure structure. Fifty
warp strands and fifty-two weft strands (forty and forty-four on phones) cross
in a plain weave, pinned along the top edge, the cloth bowing under its own
weight. Nothing is pictured and nothing is labeled; the piece is the weave
itself, its seeded flaws, and the slow wind moving through it. A few
intersections are knotted, and each knot carries one tiny point of light that
pulses on its own slow phase.

Palette, strict: background #0D0D10, strands #4A4A52, sheen #8E8E99,
knots #2A2A30, glints #D8D8E0. No other colors appear anywhere.

## Construction

- Geometry. The textile occupies the middle 88% of the width and 90% of the
  height, hung from near the top edge. Each point is addressed in normalized
  (u, v) cloth coordinates. A catenary-style sag, sin(pi * u) weighted by
  (0.25 + 0.75 * v), bows the rows downward increasingly toward the free
  bottom edge while the pinned top row stays nearly straight.
- Wind. Displacement is a closed-form sum of two travelling sines over
  (u, v, t), with an amplitude envelope of v^1.5 so the top stays pinned and
  the bottom moves most. Each sine is differenced against its own t = 0
  value, so displacement is exactly zero everywhere at frame one and the
  first frame is the cloth at rest, hanging with its sag. The two time
  frequencies (periods 12 s and 8 s) make the motion loop seamlessly over
  24 s. A weaker cross-displacement (0.35x) keeps the ripple from reading
  as a purely horizontal slide.
- Weave read (over/under). Strands are not interleaved geometrically; the
  weave is faked with a three-pass overdraw. Pass 1 strokes every warp
  strand as a full polyline (plus the seeded doubled strands, offset a
  couple of pixels alongside their partner). Pass 2 strokes every weft
  strand as a full polyline, so weft temporarily sits on top everywhere.
  Pass 3 corrects the crossings: wherever checkerboard parity (i + j even)
  or a seeded float says the warp belongs on top, a short, slightly wider
  warp dash is redrawn over the crossing. The alternating dash pattern is
  what the eye reads as plain weave. Seeded floats make one warp strand
  ride over three consecutive crossings, a woven flaw. Seeded gaps are
  painted last in the background color at double width, erasing a short
  run of a strand so the thread reads as missing; run before the knots so
  a knot can still sit on a gapped crossing.
- Sheen. After the weave passes, warp segments are re-examined: where the
  local wave slope (change in wind displacement per pixel of segment
  length) exceeds a threshold, that segment is redrawn in the sheen tone
  with alpha proportional to slope, capped at 0.5. The highlight therefore
  travels with the bending part of the wave rather than sitting on the
  cloth, and frame one (zero displacement, zero slope) shows no sheen.
- Knots and glints. Twelve to twenty intersections per epoch are chosen
  from a seeded mulberry32 stream (kept off the pinned top rows), drawn as
  dark filled circles of radius roughly 3.5-4.8 px riding the displaced
  crossing point, each with a sub-pixel glint dot offset up-left whose
  alpha pulses as (0.5 + 0.5 sin(0.6 t + phase))^2 scaled into 0.25-0.8.
- Interaction. Watch-only motion; a tap (pointerdown/touchstart) advances
  the epoch, rebuilding knots, floats, gaps, and doubled strands from the
  next seed and restarting the wave from phase zero. No click-to-reload,
  no hint text, no UI, no audio.
- House compliance. Single self-contained file, canvas 2D only, no
  external assets, no absolute URLs, no date strings, no em dashes, no
  visible text besides the title. Sizing comes from the Visual Viewport
  API with resize listeners on both visualViewport and window; the canvas
  style width/height are pinned in px inside every draw. Phone detection
  uses window.screen's smaller dimension under 700 px, with the aspect
  fallback (h > w * 1.15) applied on resize. requestAnimationFrame is
  typeof-guarded; the first frame is drawn synchronously at t = 0, and
  elapsed time comes from performance.now relative to load, never from
  Date.now.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp; byte
  identical. Second render deleted.
- Desktop read: textile fills the frame with margins on all sides, top
  edge straight, bottom rows bowing with the sag, checkerboard weave
  texture visible across the field, a doubled warp strand and faint gaps
  present as flaws, knots visible as small dark nodes with pinpoints of
  glint.
- Mobile read: same cloth fitted to the tall frame, strand counts reduced
  (40 warp / 44 weft) so the weave stays open, knots and glints still
  legible, nothing clipped.
- One adjustment during QA: knot radius raised from 2.7-3.8 px to
  3.5-4.8 px after the first render pass, where the knots read as mere
  specks rather than knots; re-rendered all three sizes and re-verified
  determinism afterward.
- Deviations: none from the prompt. The only judgment call is the
  imperfection mix: the prompt allows skipped threads generally, and the
  build implements them as three seeded flaw types (floats, gaps,
  doubled strands) rather than one, all drawn from the same epoch seed.
