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
