# Aljaz Francic: Generative Art Gallery (deep, interactively inspected)

**Site:** aljazfrancic.github.io/generative-art-gallery
**Tagline:** "Interactive algorithmic art, tap to explore"
**Status:** 2026-09-19, deep. The gallery grid, two full-screen sketches
(Flow Field with its parameter panel open, Reaction-Diffusion mid-render),
and all thirteen card descriptions were inspected live in the browser.

What it is: a teaching gallery, not a portfolio. Thirteen classic
generative algorithms, each as a live canvas card with its own parameter
panel. Filter tags across the top: 3d, algorithm, classic, curves, fractal,
geometry, math, noise, organic, particles, patterns, physics, recursive,
simulation. Dark theme with a light toggle. The whole thing reads as one
person's clean-room reimplementation of the generative canon, built to be
played with.

## The thirteen sketches (from the gallery's own card text)

- Flow Field: particles trace paths through a Perlin noise vector field,
  leaving luminous trails that reveal hidden currents.
- Fractal Tree: recursive branching structures grow organically, swaying in
  a gentle procedural wind.
- Particle System: particles burst from the center with gravity, repulsion,
  and evolving color, a miniature fireworks engine.
- Wave Interference: overlapping sine waves make moire interference
  patterns with vibrant color channels.
- Mandelbrot Set: Mandelbrot and Julia fractals; click to zoom in,
  right-click to zoom out.
- Voronoi Diagram: animated Voronoi cells colored by distance to drifting
  seed points, pixel-rendered, gradient or monochrome modes.
- Cellular Automata: Conway's Game of Life on a wrapping grid, with
  Life, HighLife, and Day & Night rule variants and custom colors.
- Spirograph: parametric hypotrochoid curves drawn incrementally, with
  adjustable radii and pen distance.
- Reaction-Diffusion: Gray-Scott model, two chemicals A and B interacting
  on a grid into organic, evolving patterns.
- Perlin Landscape: scrolling 3D wireframe terrain as rows of triangle
  strips from Perlin noise, with fake perspective projection.
- Lissajous Curves: x = A sin(a t + d), y = B sin(b t), drawn with
  trailing lines and optional rainbow coloring.
- Circle Packing: progressively fills the canvas with non-overlapping
  circles that grow until they touch edges or each other.
- Maze Generator: animated recursive-backtracker maze with optional
  solution visualization.

## Flow Field, full-screen (inspected with parameters open)

Clicking a card opens a viewer: back button, theme toggle, prev/next
sketch, and a sidebar with About, Parameters, Actions, and Keyboard
Shortcuts. The Flow Field defaults, read off the panel: Particles 2000,
Noise Scale 0.01, Speed 2, Trail Fade 8, Evolution 0.00, Color A (purple),
Color B (red), Background (black). Actions: Randomize, Reset, Save PNG,
Copy Link, Record Video, Fullscreen. Shortcuts: arrows for prev/next, S
save, F fullscreen, R randomize, Esc back.

What it looks like: two thousand short luminous strokes in a
purple-to-red gradient on black. The surprise is that the trails are
angular, almost stair-stepped, not the silky curves the genre is known
for. At noise scale 0.01 and speed 2 the particles turn hard between
steps, so the field reads as cracked circuitry or lightning rather than
wind. The Evolution slider (0.00 at rest) is the time axis of the noise:
raising it animates the field itself, so trails re-route live. Trail Fade
8 is the fade-rect alpha that sets trail length.

## Reaction-Diffusion, full-screen

Observed mid-render: a lime-green field (chemical A) with a cyan
expanding wavefront where B was seeded, plus a visible dither/checkerboard
texture across the field at this zoom. Classic Gray-Scott early stage: the
seed blob's reaction front propagates outward before it breaks into the
worms-and-loops regime. The pixel-level rendering is honest about the
grid; nothing is smoothed.

## What the gallery gets right

The viewer chrome is the real design work here. Every sketch gets the
same contract: parameters with live sliders, randomize, reset, save PNG,
copy link (parameters encoded in the URL, presumably), record video,
fullscreen. That turns each algorithm from a demo into an instrument. The
card descriptions are one sentence of plain technique, which is the right
amount. And the whole thing is a reminder that the classics are classic
for a reason: Gray-Scott, flow fields, and circle packing still look good
with almost no art direction.

What to take from it (study, not copy):
- The gallery format itself: one sketch per card, one parameter panel per
  sketch, shared viewer chrome. A doodle-a-day site could steal this
  structure outright (it is a format, not a style).
- Exposing the time axis of a noise field as a slider (Evolution) is a
  small control with a large payoff: it turns a static composition into a
  performance.
- Save PNG / Record Video / Copy Link as first-class actions. If a doodle
  is worth making, it is worth keeping and sharing; the export buttons
  should be in the frame, not an afterthought.
- The angular-trail accident is worth remembering: flow fields do not have
  to be smooth. Coarse noise scale plus high speed gives a completely
  different texture family (circuitry, cracks, lightning) from the same
  code.

Avoid-list: the source was not read (single minified bundle), so
technique claims rest on the gallery's own descriptions and observed
behavior, flagged as such. The checkerboard texture in Reaction-Diffusion
may be a render-scale artifact rather than a property of the simulation;
I would want to see it at 1:1 before claiming anything.
