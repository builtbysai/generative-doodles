# Tyler Hobbs: Study Notes

**Site:** tylerxhobbs.com/works | **Key works:** Fidenza (2021, 999 outputs), QQL (2022), Incomplete Control, F(l)ight

## Core technique: Flow Fields

The definitive technique. A grid of angles covers the canvas (with 50% margin outside
the frame so curves can flow back in). Particles/lines walk through the field, each step
looking up the local angle and moving in that direction. Result: organic, smooth,
non-overlapping curves.

**Construction (from his "Flow Fields" essay + algorithm reconstructions):**
1. Grid resolution ~0.5–1% of image width. Bounds extend 50% beyond canvas edges.
2. Fill grid with angles. Most common: Perlin noise at ~0.005 step, mapped 0→2π.
   - Alternatives he uses: rounded angles (multiples of π/10 or π/4 for structured feel),
     random-per-row, random-per-cell.
3. Walk curves: start at a seed point, step ~0.1–0.5% of width per iteration, look up
   grid angle, move. Hundreds of steps per curve.
4. Layering: multiple passes with different palettes, scales, turbulence settings.

**What makes it sing:**
- **Order/disorder balance.** Hobbs explicitly aims for "controlled and unpredictable"
 , precise like a computer, organic like the analog world. The flow field IS that mixture.
- **Non-overlapping curves.** Careful seeding + field design keeps curves from crossing,
  which reads as intentional rather than chaotic.
- **Turbulence variation.** Different noise scales/octaves per layer create depth,
  fine detail vs. broad sweeps.
- **Sharp angle snapping.** Occasionally quantizing angles to 45°/90° creates architectural
  moments inside organic flow.
- **Color authority.** In Fidenza, the algorithm "chooses" palettes, scales, turbulence,
  some traits rarer than others. Color does heavy lifting: bold contrasts vs. quiet monos.

## Philosophy (from interviews)

- **Discovery mindset:** "I typically do not have many thoughts about a desired end result.
  I ask 'what if I combined this algorithm with that one?'... I find I create better work
  if I let go of expectations."
- **Variety as a goal:** Early programs were interesting for 1–2 outputs. Fidenza needed
  to be interesting across 999, that constraint drove the layering/trait system.
- **Never repeats himself:** Each flow-field usage experiments differently. The field is
  "just one ingredient"; everything else builds on top.
- **QQL insight:** Letting collectors tune parameters ("parametric artist"), interactivity
  as a compositional tool, not just a viewer toy.

## Visual study pass (2026-09-20, deep)

Inspected full-resolution images on tylerxhobbs.com: 4 Fidenza outputs
(cool blues, dark plum, near-white, teal), 2 QQL outputs, 2 Incomplete Control
outputs, plus the works index thumbnails.

### Fidenza, seen up close

- **Strokes layer.** Thick curves are drawn OVER thinner ones in places, no
  pure non-overlap. The cream ground separates them, so it reads clean anyway.
- **Dry-brush ends.** Stroke caps are frayed and ragged, never round. Some
  strokes taper, thin out, and break mid-curve into dash segments.
- **Palette discipline.** Each output commits to 5-8 colors plus the ground.
  Pastel accents (lavender, mint, coral) appear in tiny doses, like spice.
- **Density gradient.** The field is not uniform: dense clusters of curves in
  one region, open breathing room elsewhere. That contrast is what makes an
  output feel composed rather than wallpapered.
- **Monochrome proof.** The near-white output works with almost no color at
  all. The composition is flow and density first; color is a second voice.

### QQL, two distinct modes

- **The mark is a bullseye.** Every dot is a concentric-ring target, not a
  flat circle. That ring structure is the whole identity, it reads as
  embroidery or woven texture at scale.
- **Stipple-wave mode:** thousands of solid dots in tonal bands build a
  Hokusai-style great wave. Contour lines emerge from dot color bands, not
  from drawn lines. Scattered bright dots read as spray or sparks.
- **Ring-field mode:** bullseyes on a jittered grid, positions and color
  following a flow field (blue diagonal sweep, warm edges). The grid
  distortion carries the motion.
- QQL feels more graphic and structured than Fidenza. The parametric angle
  (collector-tuned parameters) makes sense here: the system is legible
  enough to tune.

### Incomplete Control

- **Shaky rectangles.** Loose rows of hand-drawn rectangles, each edge
  retraced several times with wobble, like a nervous hand tracing a ruler
  line. Jitter amplitude varies per rectangle.
- **Three fill treatments:** dense scribble hatching, flat pastel color blocks
  (pink, yellow, blue, black) with visible brush grain, or bare outlines.
- Cream paper ground throughout. The color blocks are painted, not flat fills.
- The name fits: it is a study of control versus looseness. The wobble is the
  content, not a defect.

### New works on the index (thumbnails only)

- **Please Respond, 2026:** tall piece of stratified horizontal color bands
  with jittered edges, reads like geological strata or stacked flow segments.
- **From Noise, 2025:** thousands of colored speckles in a falling density
  gradient, a pointillist noise field.
- **Translated Gestures, 2025:** physical painted panels, blob gestures in
  flat color. He keeps a foot in physical media.

## Techniques to steal (not copy)

- Flow-field curve walking with margin-extended grids
- Layered passes with independent palettes/scales
- Angle quantization for structural contrast
- Trait-rarity thinking: weight some parameter choices as rare
- Seeded randomness with curated parameter ranges (not pure chaos)

## What NOT to do
- Don't just run Perlin-noise flow fields with default palettes, that's the most
  overdone generative trope. Hobbs's distinction is in the layering, color, and curation.
- Don't mimic Fidenza's specific look (thick outlined strokes on cream). Learn the
  method, find own visual language.
