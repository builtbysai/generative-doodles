# Gorillasun (Ahmad Moussa): Study Notes

**Site:** gorillasun.de | **Key works:** Vestige, Grand Canyon, Neo Supremus, Behind the Canvas, Exotic Quarpets, Parasite

## Deep pass: tutorials, 2026-09-20

Read two of his strongest technique tutorials end to end. Note: the legacy
animated GIFs on gorillasun.de no longer load (the Ghost migration dropped the
old /assets/images files), so both sketches were re-rendered locally in p5.js
from his published code and visually inspected at 700px wide. Depth: deep.

### Tutorial 1: Creating Patterns with Grids and Sine Waves in P5

The article teaches "instancing" as the core idea: a Square class (position,
size, curvature, color, display()) held in a SquareGrid class that positions
squares at arbitrary rows and columns. Because every square is redrawn each
frame, one line change in display() becomes a whole animation.

The progression builds in five small steps, each a single line change:

1. Uniform pulse: `size = 20 + 14 * sin(millis()/500)`. All squares breathe together.
2. Phase offset by x: `sin(positionX + millis()/500)`. The pulse becomes a traveling wave along the x axis.
3. Same with y: vertical traveling wave.
4. x + y combined: diagonal waves sweeping the grid.
5. Color through the same channel: `fill(127.5 + 127.5*cos(x + tan(millis()/5000) + millis()/500), 127.5 + 127.5*sin(y + cos(millis()/500) + millis()/500), 120.5)`. Greys and off-tones drift across the grid as a second, slower layer.

Re-render confirmed: diagonal wave bands of swelling squares, tonal bands
moving across the field. The technique is shockingly cheap, a few dozen lines,
and the modular structure is what lets him "play" instead of code: change one
parameter, get a different sketch.

Takeaways for the doodles: phase-offset trig is the cheapest reliable path to
motion in a static grid piece; modulate geometry AND color with different
periods and the piece gets two independent rhythms; nested trig (sin of x plus
tan of time) gives non-repeating drift that reads as organic.

### Tutorial 2: Making of Grand Canyon

The full build of his minimalist animated mountainscape, in seven steps:

1. **Boolean grid as substrate.** A 2D array of zeros, sized by padding and
   spacing parameters. The grid does not draw anything, it defines the
   positions into which the sketch is allowed to draw. This is a general
   composition tool: constrain a generative process to a discrete set of
   allowed positions.
2. **One true entry per column.** In setup, set one random entry per column to
   1. Draw ellipses at those spots, then connect them with lines using
   prevI/prevJ tracking. Result is jagged.
3. **Smooth it with noise.** Replace the random row index with
   `int(noise(x*0.01, y*0.01) * row.length)`. The rez (resolution) parameter
   controls smoothness: lower rez, smoother path. Instant mountainscape.
4. **Ornaments.** Boulders: `if(random()>0.9)` draw a rect at the cell.
   Rain: short vertical line segments above the path, gated by a `below`
   flag so rain only falls above the mountain line.
5. **Animate.** Wrap grid generation in redrawGrid(t), feed t into the noise
   x-input each frame, the mountains slide right to left like a car window.
   The random() ornaments flicker; fix with noise() for pseudo-persistence
   (random values that change slowly over time).
6. **Perfect loop, naive version.** Modulo on the noise input,
   `noise(((x + t*100) % (wx - padding)) * 0.01, y * 0.01)`, and reset t
   periodically. Works, but the cut-off ridge is visible.
7. **Perfect loop, seamless version.** Treat the canvas as a sliding window
   over a much wider pre-generated column-index array. Keep generating until a
   column index matches the first entry, then wrap. Smooth every time, at the
   cost of a long precompute. He includes debug readouts and a red circle
   marker on the loop point.

Re-render confirmed: noise-walk mountain line with boulders and rain,
drifting animation. Note the step quantization: at spacing 5 the line is
chunky by design, which is the minimalist look, not a bug.

Takeaways: the boolean-grid-as-constraint idea ports to plotter work (allowed
positions on the page); the sliding-window loop is a reusable pattern for any
perfect-loop GIF (precompute longer than the visible window, find the wrap
point); and the rez parameter is the single knob that tunes a noise path from
jagged to rolling hills.

## Why he matters for this project
Unlike most masters, Gorillasun documents EVERYTHING. His "Making of" series is a
free masterclass in generative technique. He is the single best study resource on the list.

## Core techniques

### 1. Radial Perlin noise (tree rings)
Concentric rings where each vertex is displaced by Perlin noise sampled at (x, y).
Randomly break and rejoin rings (`if (random() > threshold) { endShape(); beginShape(); }`).
Modulate the break threshold with radius or a sine wave for organic variation.
Result: fingerprints, tree rings, topographic contours.

**Takeaway:** Tiny conditional breaks transform a boring perfect shape into something
organic. The "disconnect/rejoin" trick is broadly applicable to any closed-loop drawing.

### 2. Grainy textures
Co-wrote the fxtext article "All About That Grain" and championed meezwhite's p5.grain
library. Grain is the difference between "flat digital" and "printed artwork."

**Takeaway:** ALWAYS consider a grain pass. Multiple methods: overlay noise, per-pixel
manipulation, library (p5.grain). Grain unifies disparate elements and adds tactility.

### 3. Marching squares for contours
Extended marching squares to find contours of arbitrary polygonal shapes, raycast to
test if grid vertices fall inside shapes, then extract contours. Point-line distance
gives rounded contour falloff.

**Takeaway:** Iso-contour extraction turns any scalar field into beautiful line art.
Applicable to noise fields, distance fields, image brightness.

### 4. Irregular grids + rectangle subdivision
"Somewhere in Between", approached rectangle divisions in a new manner. Recursive
subdivision with irregular splits, filled with varied treatments.

### 5. Art-history translation (Neo Supremus)
Generative ode to Malevich's Suprematist compositions. Studied the source compositions,
extracted the *rules* (floating geometric shapes, limited palette, dynamic diagonals),
then generated new instances.

**Takeaway:** This is the correct way to be "inspired by", extract compositional rules
from art history, generate new work from the rules.

### 6. Boolean grid + Perlin noise minimalism (Grand Canyon)
Minimal aesthetic from the simplest possible ingredients: a boolean grid modulated
by noise. Restraint as a feature.

### 7. Squiggly movement (Parasite)
Step-by-step tutorial on organic squiggle motion, sine-driven wandering with noise.

## Philosophy
- Relentless documenter; weekly newsletter with technique explorations.
- Draws inspiration from Pinterest/browsing, then asks "what would this look like
  in generative form?", then figures out the algorithm for the SHAPE first.
- Shape-first thinking: "The first step would be to figure out how to create the
  shape of a puzzle tile algorithmically."

## Techniques to steal (not copy)
- Disconnect/rejoin trick for organic line breaks
- Grain pass on everything
- Marching squares / iso-contours from scalar fields
- Art-history rule extraction (pick a movement, extract rules, generate)
- Shape-first: solve the geometry, then decorate

## What NOT to do
- Don't reproduce his specific tutorials 1:1 as "doodles", that IS copying.
  Use the techniques with new subjects.
