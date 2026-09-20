# Oleg Frolov (Volorf): Study Notes

**Site:** dribbble.com/Volorf (Processing Posters, Processing Animation, Processing Animation Experiment, Generista shots) |
**Secondary:** behance.net/Volorf (Generista Posters I and II, June 2024; Launch Screen Processing Animation; Generatik 3D Exploration) |
**Source of code:** github.com/Volorf/Processing-Posters (8 posters + all 8 p5.js sketches, read in full) and github.com/volorf/shader-posters (Unity 2D/3D shaders, read) |
**Technique detail:** his own YouTube demo of Generista, the Figma plugin he built

**Depth:** deep. All 8 Processing Posters visually inspected (repo images, dark
and light variants), all 8 sketches read line by line, both shader sources
read. Outstanding: Generista Posters I and II on Behance not yet visually
inspected (plugin demo shots on Dribbble are mp4 UI demos, not art frames);
Processing Animation shots are short loops, not yet frame-captured.

## Who he is

Oleg Frolov, London-based product designer working in AR/VR and spatial
computing. His Dribbble profile (71k followers) is dominated by UI
microinteractions: loaders, switchers, tab bars, hundreds of tiny
looping gifs. The generative work sits at the edge of that practice:
processing sketches turned into posters and launch-screen animation, not
gallery pieces. That framing matters. His generative art exists to
decorate and energize interfaces, not to stand alone.

## The workflow: sketch output is raw material

The important structural fact, from the repo README: he generates the
pattern in p5.js and composes it into a poster in Figma. The sketches
render plain marks on a 400x400 black field, no typography at all. The
poster treatment (type blocks, date stamps, margins, dark/light pairs)
happens in Figma. Each poster ships as a dark-ground and a light-ground
version from the same sketch. The lesson for our doodles: treat the
generator and the presentation as two separate steps. A weak-looking
sketch run can become a good poster with framing, and a generator worth
shipping should be able to carry both a dark and a light ground.

The typography is consistent across all eight: "PROCESSING" with the O
replaced by a filled dot in poster I, a subtitle ("Creative coding
environment" / "Generative Design"), and a date stamp like "2019
January, 25 Friday". Restrained, Swiss-poster layout, generous margins.

## The eight posters, technique by technique

### I. Noise dot grid (sketch: 10x10 grid, random radius 0-10)

The whole sketch is eleven lines: margin 40, ten iterations per axis,
`radius = random(0, 10)`, ellipse per cell. No noise at all, just uniform
random. What makes it sing is not the algorithm, it is the pairing: one
dot grid in white on black next to the same grid in black on white,
plus the figma type. Proof that composition carries simple generators.

### II. Exponential Loop (concentric circles, decay envelope)

`decay = exp(-pow(i, 2))` for i in 0..1, radius 300*decay,
strokeWeight 1*decay. About ten concentric circles whose strokes get
finer toward the center. Called "Exponential Loop" in the poster footer.
The gaussian envelope on radius gives the set its spacing rhythm:
even-looking rings without any explicit spacing math. Draws in a loop,
so it could be animated, though the poster shows one frame.

### III. Singularity dots (random points, 1/sin size blowup)

10000 random points, each drawn with size `decay*10` where
`decay = exp(-pow(d/100, 2)) / sin(d)`, d the distance from center.
The gaussian kills distant points, and wherever sin(d) is near zero
the radius explodes, so occasional huge thin circles appear among
dense tiny dots. A one-line trick worth stealing: dividing by a
periodic function turns a dot field into a dot field plus rare giant
rings. The composed poster shows exactly that, a few large orbits
and scattered specks.

### IV. Dashed column rhythm (32 columns, random segment heights)

Each of 32 columns is filled top to bottom with rectangles of random
height 5-30 with 5px gaps; the final rectangle stretches to fill the
column exactly. Result: a barcode-like field of vertical dashes with a
random rhythm per column. Reads like a punch card or a city skyline.
Simple, but the fill-to-exact-height bookkeeping makes it look
deliberate instead of ragged.

### V. Rotating wireframe cube grid (p5 WEBGL, ortho)

10x10 grid of wireframe boxes, each with a random starting rotation on
three axes and its own direction vector, all animating with ortho()
projection. The FCube class is clean: constructor randomizes, animate
advances by step times direction. The poster frame shows one still,
but the sketch is a living field of slowly turning cubes. Noteworthy
because the code is genuinely well structured, an FCube class with
randomize/create/animate, unlike the one-off throwaway style of the
other sketches.

### VI. Barcode stripes (20 vertical lines, random weight 1-40)

Stroke weight random between 1 and 40, x position jittered by half a
step. One loop, noLoop, done. The visual is a classic random barcode.
The white-on-black and black-on-white pairings do all the work.

### VII. Sphere wire ball (1000 points, random chords)

1000 points on a circle of radius 150. Each step picks one index from
a gaussian (mean 20, spread 1000) and one from uniform random, and draws
the chord between them. The gaussian-clumped endpoint makes chords
bunch in one region, which reads as a tangled sphere. Thin strokes
(0.5 weight), hundreds of lines. This is the most "generative art"
feeling of the eight: random chords constrained to a circle, one line
of code doing the visual work.

### VIII. Truchet half-discs (16x16 grid, arcs at random quarter turns)

Each cell draws a white half-disc arc rotated to one of four quarter
turns at random. Classic Truchet tiling. The Pattern class also has
line variants (straight edges, diagonals) that are not used in the
final poster, which is all arcs. The composed result has that QR-code
labyrinth energy. Honest note: the code has dead scaffolding (the
empty for loop in poster VII, unused pattern types here), which is
fine for sketches but a reminder to clean before publishing.

## Shader posters

A separate repo, "Generative Posters made with Shaders" (Unity).
Two shaders so far, both named 000 Dots:

- 2D fragment shader: a grid of dots computed in the shader itself.
  Per-cell radius from a hash of the random seed, smoothstep edges,
  main/background colors and animation speed as inspector properties.
  Red dots on yellow in the defaults. Same idea as poster I, but the
  GPU does the whole thing per pixel with no geometry.
- 3D vertex shader: displaces sphere vertices by sin(_Time.y) for a
  breathing dot sphere. Minimal, unlit.

The takeaway: he re-implements his simplest 2D idea as a shader to get
free animation and crisp resolution independence. For doodle pages,
shader versions of dot/grid sketches are worth considering when a piece
needs to scale to any screen.

## Generista: generative techniques as a Figma plugin

His most interesting tool. Generista applies generative algorithms
directly to Figma design layers with real-time update. The shipped
algorithm list, from his own demo:

- Noise
- Random Sequence
- Random Range

Roadmap (announced in the same video):

- Vector field equations
- Proximity falloff
- Properties: rotation, scale, position offset, alpha, colors
- Presets manager, create/save/delete, share

This is a perfect minimal taxonomy of "what designers actually want
from generative art." Not L-systems, not reaction-diffusion. Noise,
random ranges, and transforms applied to existing elements, live.
The roadmap reads like a wishlist for our own doodles too: vector
fields and proximity falloff are exactly the tools that turn random
dots into something with direction and intent.

The Behance side shows the plugin in use: Generista Posters I and II
(June 2024), posters generated with the plugin, plus a 3D exploration
series (Generatik) that suggests he extends the same thinking into 3D.
Not yet visually inspected.

## What is overdone (avoid-list)

- Dot-and-noise minimalism is everywhere on Dribbble; his posters read
  well because of the dark-ground discipline and the Figma composition,
  not because the algorithms are novel. "Dots with noise" alone is not
  a piece, and poster I proves even uniform random can work if the
  framing is good.
- Barcode stripes (poster VI) is the weakest of the eight: it is the
  same trick as poster IV with less care. One good dashed-field piece
  per sketchbook is enough.
- Launcher-style animation is a solved genre: if a loop does not have
  a second reading (color shift, figure/ground flip, event at the loop
  seam), it is decoration, not art.

## Lesson for doodles

Three practical takeaways. First, design the smallest useful algorithm
set: noise, range, rotation, alpha. If those four cannot make a good
poster, the piece needs a better idea, not more machinery. Second,
split generation from presentation: render the pattern raw, then
compose (margins, type, dark/light pairs) as a separate step. Third,
real-time parameter control is worth building into doodle pages (a
few sliders), because watching the parameter space move is how you
find the good regions.
