# JunKiyoshi: Study Notes

**Site:** junkiyoshi.com (プログラミング de 落描き, "Doodle by programming") |
**GitHub:** github.com/junkiyoshi (DoodleDeProgramming repo) |
**Video:** YouTube channel "JunKiyoshi", neort.io embeds |
**Profile:** x.com/junkiyoshi (login-walled, unreachable)

**Depth:** deep. junkiyoshi.com (front page, About, and five dated sketch
pages) was read in full including three complete ofApp.cpp sources; three
artworks were visually inspected frame by frame via the screenshot rig
(Blood vessel of torus, Nearest, Sinking sphere). His technique is
independently confirmed by two third-party reimplementations (kjwrld's
React Three Fiber Blood Vessel rework, winterdew's Nearest Arrows). The X
profile itself is login-walled and was not reachable.

## Who he is

JunKiyoshi (GitHub lists NAKAUCHI Kiyoshi; his About page gives 中内 純,
a software developer at a packaged-software company in Nagoya, Japan).
Since around 2017 he has posted one generative sketch to Twitter/X and
Instagram every single day, over 8 years of daily output. junkiyoshi.com
is his archive: each post pairs the rendered result with the complete
openFrameworks C++ source, free for anyone to reuse (no warranty).
The format barely changes: a 720x720 window at 25fps, a parametric
surface or agent system, slow camera rotation, frame-grabs exported with
ffmpeg. It is a public sketchbook, and a generous one.

## Core techniques

### Noise-band contour meshes (his signature move)
Most of his 3D pieces are the same construction with different surfaces:
build a parametric mesh (sphere band, torus, ribbon grid), sample
`ofNoise` at each cell using the surface position as noise coordinates
(often 4D with time as the 4th axis), and keep only cells whose noise
value falls in a narrow band, e.g. between 0.44 and 0.56. Then add a
line edge only where a neighboring cell falls outside the band. The
result is a dual mesh: filled faces for occlusion plus contour lines
tracing the noise field, which reads as cellular crackle, maze lines,
or drifting islands on the surface. Sinking sphere is a white wireframe
icosphere with noise-displaced vertices making crater patches; the
homepage's current piece is the same band test on a sphere ring; Tornado
spin twists each ribbon vertex by a noise-mapped rotation matrix.
It is marching-squares thinking applied to parametric 3D surfaces, and
it is cheap: no shaders, no textures, just ofMesh and ofNoise.

### Dual face/line meshes
Every piece keeps two meshes: `face` (filled quads, drawn in the
background color or black for occlusion) and `line` (the contour edges
in the contrast color, drawn at 1.5px). The fill hides everything behind
the surface; the lines draw the texture on top. Simple, and it is why
his work reads like technical drawing rather than 3D rendering.

### Agent walks on mesh graphs
Blood vessel of torus builds a torus mesh, extracts an adjacency graph
from the grid, and releases 3000 actors that random-walk the graph with
a shared destination list so no two actors target the same node.
Between node hops each actor interpolates over a 2-frame span and keeps
a 12-position log; the logs are drawn as line strips with per-vertex
alpha fading from 32 to 255. The trails settle onto the tube surface
and read as cracks or veins, hence the title. The whole system is
deterministic-friendly: seeded RNG (`ofSeedRandom(39)` appears often)
and frame-counted motion.

### Minimal 2D diagrams
Nearest is pure 2D: points drift, and every frame each point draws an
arrow to its nearest neighbor, black on white, animated. It is a
nearest-neighbor graph made pretty by restraint. The same instinct shows
in older sketches: one idea, one system, no decoration.

### The daily-sketch production loop
`ofSetFrameRate(25)`, camera rotation tied to `ofGetFrameNum()` (slow
`ofRotateZ(frameNum * 0.1)` style), a commented-out block in `draw()`
that grabs frames 500..1000 as JPEGs and exits, then `ffmpeg -i
img_%04d.jpg` to video. The loop is the discipline: one idea per day,
same export path, posted everywhere.

## Palette and composition

Almost aggressively monochrome. Backgrounds are either near-white (239,
his default) or black; linework is black or white, 1.5px, with the rare
fixed accent (the blood-vessel trails are a blue-grey 128,128,255 fade
even though the actors are assigned random HSB colors that go unused).
Composition is always the same: one parametric object centered in the
720x720 square, slowly rotating, noise evolving. It looks like blueprint
drawing, quiet and technical, with the motion doing most of the work.

## What makes it sing

- The noise-band contour trick. A 12-line idea that turns a plain sphere
  into crackle porcelain, and he found a hundred variations of it.
- Total source generosity. Every sketch ships the full ofApp.h and
  ofApp.cpp, ready to compile. The archive is a textbook.
- The daily streak. Eight years of one sketch a day builds an instinct
  for which three parameters make a piece.
- Restraint. No bloom, no post effects, no color noise. The white
  wireframe sphere on black works because nothing else is fighting it.

## Techniques to steal (not copy)

- Noise-band selection on parametric surfaces for crackle/maze/island
  textures, contour edges only at band boundaries
- Dual face/line meshes: fill for occlusion, lines for the drawing
- Agent trails on mesh graphs with a shared destination list to avoid
  collisions, alpha-faded position logs as the trail
- Per-vertex noise-twist matrices on ribbon grids (Tornado spin)
- The daily-sketch discipline: fixed canvas, fixed export, one idea
- ofNoise driven by surface position (not just time) so the texture
  sticks to the geometry while it animates

## What NOT to do

- Do not copy his contour loop verbatim; the pattern is the point, write
  our own with our own surfaces.
- Everything is one centered object on a flat ground with slow rotation.
  Across a hundred sketches that sameness is the weakness: no scenes, no
  compositional risk, no color theory beyond black and white.
- Titles are literal filenames ("Sinking sphere."). Fine for a logbook,
  not for a gallery.
- His code repeats the same threshold boilerplate per sketch instead of
  factoring it. Steal the algorithm, not the structure.
- The 720x720 25fps cage is a habit, not a law. Do not inherit it.
