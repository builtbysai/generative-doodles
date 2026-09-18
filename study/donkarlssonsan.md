# DonKarlssonSan (Johan Karlsson): Study Notes

**Profile:** codepen.io/DonKarlssonSan | Prolific CodePen generative artist | MIT-licensed, educational

## Style profile
High-volume daily-practice artist. Clean vanilla JS + canvas. Every pen is click-to-redraw,
responsive, and readable. His code IS his teaching, well-structured, commented, reusable
(his own `victory` vector library on npm).

## Signature techniques (from reading his actual code)

### 1. Particle systems with vector physics
Custom Vector class; particles with position/velocity, forces applied per frame,
velocity clamped to max length. Planets exert gravity/repulsion. Particles drawn as
short line segments (pos → pos+vel) rather than dots, creates streaky motion-blur feel.

**Pattern:** `move(force)` → clamp velocity → `draw()` as segment. Hue drifts over time
(`hue += hueSpeed`), low particle opacity (0.1–0.2) for accumulation glow.

### 2. Text as particle target (Repellers)
Particles form letterforms; "planet" gravity wells repel them on mousemove.
Typography + physics = interactive poster.

**Takeaway:** Text is just a set of target coordinates. Sample text to points (canvas
pixel-read or font path), then let agents/particles seek, orbit, or flee those points.

### 3. Flow fields (Swirly)
Simplex-noise flow field driving thousands of particles. Config-driven:
`noiseSpeed`, `fieldForce`, `widthToSpikeLengthRatio`. Noise re-seeded per redraw.

### 4. Tessellations (Hand Fan Tessellation)
Geometric tiling via canvas clip paths: draw arcs, `ctx.clip()`, then fill the clipped
region with concentric circles. Alternating rotations per row/column create the weave.

**Takeaway:** `clip()` turns any shape into a mask for pattern fills, hugely versatile
for tessellation work.

### 5. Recursive subdivision (Genuary 6: Triangle Subdivision)
Pick a random edge point (lerp 0.25–0.75), split triangle into two, recurse with
decreasing levels. Random HSL fill per triangle. Two/three large triangles fill the canvas.

### 6. Grid-based geometric homage (Manfred Mohr tribute)
Grid of squares; each square's internal triangles positioned by simplex noise angle;
4-tone shading (darkgray/gray/black/beige) + drop shadow. Mohr's algorithmic aesthetic
recreated faithfully.

### 7. Delaunay triangulation (Bowyer-Watson from scratch)
Full hand-rolled Bowyer-Watson with super-triangle. Random points → triangulation →
each triangle filled from curated color schemes.

## Working method
- **Config objects** at top (`config`, `colorConfig`), every pen is tunable.
- **Click to redraw, resize to regenerate**, the piece is a *system*, not an image.
- **HSL everywhere** with baseHue + hueRange + drift, cohesive color without palettes.
- **Genuary participant**, daily prompts as creative constraint.

## Techniques to steal (not copy)
- Particle-as-segment rendering (streaky, not dotty)
- Hue-drift over time for living color
- clip() as tessellation mask
- Text-to-particle-targets for typographic physics
- Config-driven sketches (tunable systems)
- Recursive triangle subdivision with random split ratios

## What NOT to do
- His pens are exercises in clarity, don't mistake simplicity for lack of depth,
  but also don't ship a tutorial-grade sketch as a finished doodle. Push further.
