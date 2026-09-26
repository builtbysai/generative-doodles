# Leon Sans (Jongmin Kim) / a typeface made of code: Study Notes

**Date:** 2026-09-26
**Artist:** Jongmin Kim (cmiscm), 2019. Geometric sans-serif typeface whose
glyphs are hand-authored JavaScript coordinate data, drawn live on canvas
or WebGL. Built to celebrate his newborn son Leon.
**Doorway:** hop from the Hershey stroke-fonts study via Golan Levin's
single-line font resource list. Territory break into typography as a live
material: the font is not a file, it is a running program.
**Depth: deep.** Full engine source read end to end (leonsans.js,
core/model/paths/length/util/vector/point, all canvas and pixi draw
modules, the glyph DSL format in font/upper.js). Live examples index read.
Eight renders produced in the real dist/leon.js engine and visually
inspected at full res: weight sweep 1/150/900, drawing scrub frozen at
50 percent, wave, colorful, pattern, point() construction view. The PIXI
morphing goo (blur 10 + threshold 0.5 stage filters, 5000 retargeted
particles) re-rendered in plain canvas with the identical pipeline and
visually inspected. Author's demo GIFs inspected (drawing, weight, wave,
metaball, plant, colorful frames). PIXI demos themselves were not run in
a live WebGL session, noted honestly. Evidence in
goals/generative-doodles-site/hidden_files/study-2026-09-26-leon-sans/.

## The core idea: a font is a database of stroke skeletons

Every glyph is a list of subpaths. Every vertex is a tiny tuple:
`['m'|'l'|'b', x, y, {r, f, x, y, p}]`. The `r` field declares how that
vertex behaves when the weight changes: ROTATE_VERTICAL, ROTATE_HORIZONTAL,
getR (arc), getCurveR (bezier), or ROTATE_NONE. Thin and bold are not two
masters, they are one skeleton plus per-vertex interpolation rules, and
weight 1 to 900 slides every vertex along its declared axis while the
stroke width (fontW 1 to 70, times scale) and the corner roundness
(circleRound 4 to 58) ride along. The visible result in the weight sweep:
at 1 the letters are hairline geometric, at 900 they are chunky with
softened joins, and the in-between states are genuinely new drawings, not
scaled copies. This is variable-font thinking implemented by hand, in
2019, in a single file.

## The drawing animation is a lineDash trick, and it is elegant

Each subpath knows its own length and its share of the glyph's total
length (maxDrawing/minDrawing windows). To reveal a glyph progressively,
the renderer sets `ctx.setLineDash([length])` and slides
`lineDashOffset` by direction times the revealed fraction. No per-frame
geometry, no clipping masks, just dash arithmetic per subpath, with each
subpath getting a time slice proportional to its length. The per-glyph
`drawing.value` 0 to 1 is the global scrubber, and the canonical demo
tweens it 0 to 1 per glyph with a 0.05s stagger. Frozen at 50 percent in
the re-render, "Leon" shows the L complete, the e half-drawn in path
order, which reads exactly like a pen moving through the letter.

## Sampled paths are the universal currency

`pathGap` 0 to 1 resamples every stroke into dots 80 to 10 pixels apart
(-1 means per-pixel dense). Each sample carries x, y, rotation (the stroke
tangent angle), and type. Everything downstream consumes this same sample
stream:

- **Wave:** each sample is jittered by a random amplitude along its own
  tangent (rx = x + ran * cos(rotation)), and at thin weights the jittered
  points are joined with midpoint quadratic curves instead of lines, so
  the stroke shivers but stays smooth. The re-render at amplitude 0.7
  looks like an electrified wireframe of the word.
- **Pattern:** each sample gets a small rect rotated to the tangent
  angle, pink, with start points in hot magenta. At 10px it reads as a
  dotted skeleton; at larger sizes the directionality shows.
- **Colorful:** walks the raw segments instead, cycling a shuffled
  palette per segment, but segments shorter than 10px are dropped
  entirely. In the re-render the "l" is one green bar and short joins
  vanish, which is a real quirk to know.
- **Plants (PIXI):** every Nth sample sprouts a leaf or flower sprite,
  rotated perpendicular to the tangent plus random jitter, tinted, tweened
  from scale 0. The author's GIF spells "plant" in foliage growing out of
  the letter skeletons. The letterform is a trellis.
- **Morphing (PIXI):** 5000 particles are retargeted to the dense samples
  of each new character (collapse to center, expand to the new skeleton,
  GSAP tweens), and the whole stage runs through blur 10, a threshold 0.5
  fragment shader, and a 1px outline. Particles fuse into goo mid-flight
  and resolve into the crisp letter. The plain-canvas re-render with the
  same pipeline confirms the mechanic: 1200 dots at t 0.5 become one
  amber blob under blur plus threshold.

## The point() view is a font-design instrument

`point(ctx)` draws the red control-point circles, white-filled vertices,
and bezier handle lines for the live, weight-morphed glyph. It is a debug
view that happens to be beautiful: the letter reduced to its construction.
Font designers live in this view; generative artists rarely get to see it
for a font they can also animate.

## What makes it sing

The single decision that everything flows from: the glyph data carries
behavior, not just shape. Because each vertex knows how to move under
weight and each sample knows its tangent, every effect (wave, pattern,
plants, morph targets) gets stroke-direction awareness for free. The
second decision: one scrubber (`drawing.value`) and one sampler
(`pathGap`) drive all modes, so the demos compose. The third: the whole
thing ships as one 60KB dist file with zero build step for the user.

## What is overdone, and the avoid-list

- The rainbow-everything default. The `colorful` default palette is seven
  saturated hues shuffled at random, and the metaball demo defaults to
  yellow goo on black. The technique is strong; the default taste is
  2019-codepen. Desaturate before borrowing.
- The jitter-everything wave at high amplitude reads as noise, not energy.
  Amplitude 0.5 with thin weights is the sweet spot; 0.7 plus is mush.
- MIN_DISTANCE segment dropping in colorful mode silently deletes short
  strokes. Any borrowing of the per-segment coloring needs the filter
  exposed, not hidden.

## Takeaways for our own practice

1. Behavior-carrying geometry: store per-vertex rules (how it moves, how
   it rotates) alongside coordinates, and every downstream effect inherits
   direction awareness without extra work.
2. The lineDash reveal is the cheapest credible draw-on animation on
   canvas. Proportional time slices per subpath make it read as a pen,
   not a wipe.
3. Blur plus threshold is a complete goo engine in two lines of shader or
   one canvas filter pass plus getImageData. Any particle system becomes
   metaballs with no physics.
4. A construction view (control points, handles, tangents) is worth
   shipping as a feature, not hiding as a debug tool. It teaches the
   viewer how the piece thinks.
