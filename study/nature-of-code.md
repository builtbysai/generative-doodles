# The Nature of Code (Daniel Shiffman): the simulation textbook generative art keeps quoting

**Site:** https://natureofcode.com/ — the whole 2nd edition free online,
CC BY-NC-SA 4.0 (code examples MIT). Daniel Shiffman, ITP / NYU, of The
Coding Train. Print: No Starch Press, 9781718503700.
**Author lineage:** Reynolds (steering, boids) -> Braitenberg (Vehicles) ->
Shiffman (p5.js pedagogy).
**Status:** 2026-09-25, deep on Chapters 4 (Particle Systems) and 5
(Autonomous Agents): full text read end to end, all code examples read,
key figures visually inspected at full resolution (flow-field arrow grid,
smoke-texture progression, hand-drawn flocking-rules diagram), and two
techniques re-implemented from scratch in plain canvas and visually
inspected (Perlin flow-field particle trails, 130-boid flock). Remaining
chapters surveyed via the table of contents and the Coding Train syllabus
mapping, not full reads.

## What the book is

Twelve chapters (0 Randomness/Perlin noise, 1 Vectors, 2 Forces,
3 Oscillation, 4 Particle Systems, 5 Autonomous Agents, 6 Physics
Libraries, 7 Cellular Automata, 8 Fractals, 9 Evolutionary Computing,
10 Neural Networks, 11 Neuroevolution). The chapters I studied are the
engine room for generative art: how to manage many things, and how to
give them goals. Everything else in the book builds on Chapter 4's
"systems of many things" pattern.

The pedagogy has a shape worth stealing: every chapter opens with the
one governing idea stated plainly, derives a tiny reusable formula or
class contract, then spends the chapter reusing it. Chapter 5's whole
intellectual payload is one line: steering force = desired velocity
minus current velocity. Ninety pages of behavior are that formula with
different desireds.

## Chapter 5: Autonomous Agents (the deep pass)

The hero class is `Vehicle` (Reynolds's term): position, velocity,
acceleration, maxspeed, maxforce, applyForce. Every behavior computes a
*desired velocity* and runs the same three lines:

```
let steer = p5.Vector.sub(desired, velocity);
steer.limit(maxforce);
applyForce(steer);
```

Behaviors covered: seek (desired = target - position, setMag(maxspeed)),
flee (negated seek), pursue/evade (predict target future position),
arrive (desired magnitude scales with distance so the vehicle
decelerates into the target instead of orbiting it), wander (Perlin
noise driving a displaced circle ahead of the vehicle, the trick that
keeps wander smooth instead of jittery), path following (dot product to
find the normal point on a path segment, steer toward a point ahead),
flow-field following, and finally flocking.

**Flow fields** (Example 5.3 area): the `FlowField` class is resolution,
cols, rows, and a 2D array of unit vectors. Lookup divides the position
by resolution, constrains to the grid, returns a copy. The noise recipe:
`angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI)` with xoff/yoff
stepped at 0.1. The detail that matters: Perlin noise has a
Gaussian-like distribution, so angles near PI get picked more often and
the field drifts left. The book's figure uses 0 to 4PI to flatten that
bias, same trick as the spinning confetti in Chapter 4. Exercises point
two doors outward: time-varying fields via the third noise dimension,
and image-derived fields with vectors pointing dark to light. `follow()`
is the whole behavior: look up, setMag(maxspeed), steer formula, done.

**Flocking** (Examples 5.9-5.12): Reynolds's three rules, each one the
steer formula again. Separation: average of flee vectors for neighbors
inside a short radius, each weighted by 1/d so close neighbors push
harder; Shiffman notes the divide-by-count step is unnecessary since
setMag is applied anyway. Alignment: average neighbor velocity as the
desired. Cohesion: neighbor centroid as the target (seek with a target).
Combined in `flock()` as a weighted sum, applied one after another.
Shiffman frames the trio as complex-systems theory in miniature:
alignment and cohesion are cooperation, separation is competition, and
removing either collapses the behavior. Then the honest engineering
chapter: naive flocking is O(n^2), 100 boids means 10,000 distance
checks per frame, and Reynolds's answer is bin-lattice spatial
subdivision (divide space into a grid, only compare within a cell),
with quadtree as the exercise. The "don't make gazillions of
p5.Vector objects" section is the same lesson stated as craft:
reuse vectors, use magSq().

**Complex systems framing** (the section before flocking): three
principles, simple units with short-range relationships, units operating
in parallel, emergent phenomena; plus nonlinearity (the Lorenz 0.506 vs
0.506127 anecdote), competition and cooperation, feedback. This is the
book at its most quotable and it earns it.

**The Ecosystem Project:** every chapter ends with the same open-ended
prompt, extended across the book. For Chapter 5: creature schools, seek
for food with pursue for moving prey, flow-field river environments,
countless steering behaviors with time-varying weights, nested complex
systems (a creature made of a flock of boids, then a flock of those
creatures), and memory/adaptation (history driving weight changes).
These prompts are practically a piece generator by themselves.

## Chapter 4: Particle Systems (the deep pass)

Reeves's 1982 definition is the epigraph in spirit: a collection of
minute particles that together represent a fuzzy object; particles are
generated, move and change, and die. The chapter is really about
*data management*: the architecture goal is a main sketch where
`setup()` and `draw()` never reference an individual particle.

The ladder: single `Particle` (position, velocity, acceleration,
lifespan counting down from 255, `isDead()`), array of particles with
reverse-loop splice removal, then the `Emitter` class (holds the array,
`run()` updates and culls, `addParticle()`), then a system of emitters,
then inheritance and polymorphism so one list can hold mixed particle
types (the `Confetti` extends `Particle` example with rotation), then
forces and a `Repeller` (inverse-square, constrained to avoid the
divide-by-zero singularity).

Two sections carry the visual payload. **Procedural textures:** the
smoke example builds its texture in code, a radial-gradient blob,
because loading image files for thousands of particles is a performance
trap; size the texture to the largest size you will draw, never resize
per frame. **Additive blending:** credited to Robert Hodgin's
Magnetosphere, which became the early iTunes visualizer. `blendMode(ADD)`
on a black background, pixel values summing and capping at 255, gives
the space-age glow where dense particle regions bloom white. The book
pairs it with the WEBGL renderer note: additive particle systems are
exactly the case where switching renderers buys real headroom, at the
cost of the origin moving to canvas center. Exercises: `tint()` plus
additive for rainbow systems, and trying SUBTRACT, LIGHTEST, DIFFERENCE,
EXCLUSION, MULTIPLY. (This connects directly to the existing
study/robert-hodgin.md notes.)

Lifespan doubling as alpha is the chapter's signature micro-pattern:
the death timer and the fade are the same variable, so a dead particle
has literally faded away.

## What makes it sing

The book's power is architectural, not visual. Its example renders are
deliberately bare: gray circles on white, triangles for boids. The
generative-art value is the contracts: Particle/Emitter, Vehicle with
the steer formula, FlowField with lookup. Every one of them is
framework-agnostic and small enough to memorize. The exercises are
honest research prompts, not homework: time-varying noise fields,
image-derived fields, nested flocks, adaptive weights. The ecosystem
project, carried across all twelve chapters, is a standing invitation
to build one evolving world instead of twelve demos.

## Overdone and the avoid-list

- The default NoC look: gray circles on a white background. Every
  example renders this way and a thousand tutorials copy it. The book
  even says so: just because particle systems tend to look sparkly and
  fall with gravity does not mean yours should. The rendering layer is
  the artist's job; the book hands you the simulation.
- Uniform random flow fields (the random2D() figure) read as static
  noise. The noise version is the whole point: coherence at the local
  scale, surprise at the global scale.
- Unbounded emitters with no death condition. The book is explicit that
  this grinds the sketch to a halt; lifespan or boundary death is part
  of the design, not a cleanup detail.
- O(n^2) neighbor checks past ~200 boids without binning. The chapter
  tells you exactly when it breaks and gives the fix.

## What I verified by re-rendering

- **Flow-field trails** (plain canvas, seeded value noise, angle mapped
  0 to 4PI per the book's bias note): 2200 particles walking 90 steps
  each with wrap-around edges. The render shows hair-fine streaming
  lines, clear vortices, and dark convergence seams where the field
  funnels particles together. Balanced, no directional bias. The 4PI
  correction is load-bearing, not decorative.
- **Flocking** (plain canvas, 130 boids, perception 60, separation
  radius 35 with 1/d^2 weighting, weights sep 1.4 / ali 1.0 / coh 0.9,
  420 steps): one large coherent flock with aligned headings streaming
  across the frame, a smaller sub-flock trailing, spaced stragglers
  peeling off. Emergence from three rules confirmed in pixels.

## Doors outward

- Craig Reynolds's steering papers (red3d.com): the primary source the
  chapter is built on, worth a direct read for the behaviors Shiffman
  skips (obstacle avoidance, containment, queuing).
- Valentino Braitenberg, Vehicles: Experiments in Synthetic Psychology:
  the philosophical parent, simple wiring producing fear, aggression,
  love. An underused prompt source for piece concepts.
- Robert Hodgin's Magnetosphere (already studied in study/robert-hodgin.md):
  the additive-blending origin story the book credits.
- The Coding Train's Nature of Code 2 video track and the p5.js Web
  Editor collections (editor.p5js.org/natureofcode) for the live
  examples, plus the py5 and nannou (Rust) ports for non-browser
  renderings of the same algorithms.
- Remaining chapters worth future deep passes for generative purposes:
  7 (cellular automata), 8 (fractals, L-systems), 9 (evolutionary
  computing, smart rockets).
