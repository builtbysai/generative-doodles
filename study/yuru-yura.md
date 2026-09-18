# yuru yura (@yuruyurau): Study Notes

**Profile:** x.com/yuruyurau | **Key works:** Magnoquill Driftflare Quiverbloom,
flow pieces, pure-trig point clouds

**Depth:** deep. The X profile itself is unreachable from here (login wall), but
the work is heavily documented elsewhere: full original source code read and
re-rendered in p5.js 1.9.4, frames visually inspected at multiple animation
times, plus independent reimplementations (WebGL port, C translation, Clarion
template set, a web rebuild) confirming the technique. Nothing here is claimed
from the artist's own feed directly.

## Who he is
A creative coder on X known for tiny hand-typed p5.js sketches: character-golfed,
pure-trigonometry parametric point clouds that animate like living creatures.
The signature piece, "Magnoquill Driftflare Quiverbloom," got its own Wolfram
Community analysis, a C translation, a WebGL port at 60 FPS, a Clarion template
set with six presets (Ribbon, Seashell, Nebula, Lattice, Reeds, Plume), and a
web rebuild by lee677/freya with the generative math unchanged. That many
independent reimplementations is the strongest possible signal: the technique is
compact, legible, and portable across languages.

## The signature piece, read in full

Original code (as reproduced in francescopaolol/magnoquill, original by
@yuruyurau):

```js
a=(x,y,d=mag(k=(4+sin(x/11+t*8))*cos(x/14),e=y/8-19)+sin(y/9+t*2))=>
  point((q=2*sin(k*2)+sin(y/17)*k*(9+2*sin(y-d*3)))+50*cos(c=d*d/49-t)+200,
        q*sin(c)+d*39-440)

t=0,draw=$=>{
  t||createCanvas(w=400,w);
  background(9).stroke(w,96);
  for(t+=PI/240,i=1e4;i--;)a(i,i/235)
}
```

### Technique breakdown
- Parametric point cloud. A function maps (x, y) to a screen position. Each
  frame plots 10,000 points along x = i, y = i/235. No agents, no noise sampling,
  no randomness anywhere: the variety comes entirely from the math.
- Pure trig. Nested sin and cos of scaled x, y, and time t, plus mag() (vector
  magnitude). Time enters at several rates at once (t*8, t*2, -t), so different
  layers of the form breathe at different speeds. That frequency layering is what
  makes the result look organic instead of mechanical.
- Two-stage field construction. k and e are intermediate fields; d is a distance
  field (magnitude plus a traveling sine wave); q wraps k into a radial
  modulation; c = d*d/49 - t becomes the angle of a rotating offset. The final
  position is a base point plus a small rotating vector (50*cos(c), q*sin(c)).
  Orbiting offsets around a deformed grid: that is the core "creature" trick.
- Fold-and-accumulate rendering. background(9) clears to near-black every frame.
  stroke(w,96) plots gray 400 (clamps toward white) at alpha 96, so overlapping
  points accumulate toward white. Wherever the mapping folds space, points pile
  up and the form glows for free. Bright ridges are a property of density, not
  of any explicit lighting.
- Determinism. Every frame is a pure function of t, so the animation loops
  perfectly and can be scrubbed. Seeded-random techniques are simply irrelevant
  to this pipeline.

## What the renders showed
Re-rendered the code above and screenshotted at several animation times. The
form reads as a feathery creature, somewhere between a sea feather and a moth
wing, white on near-black, constantly folding and unfolding as t advances.
Dense and bright where the mapping compresses, wispy at the edges. The motion
is slow and hypnotic. Individual frames hold up as stills: the piece is a loop
of poses rather than a journey with a destination.

Palette and composition: near-black field, monochrome points, generous negative
space. The 400px square canvas and the tiny source are part of the aesthetic.
Constraint as style.

## What makes it sing
- Frequency layering: several sine terms at different spatial and temporal
  frequencies fight and cooperate, producing shapes no single term suggests.
  Same principle as a flow field, except the "field" is an analytic function
  instead of sampled noise.
- The rotating offset turns a static deformed grid into something that feels
  alive. A tiny amount of rotational motion does most of the emotional work.
- Code golf as a design discipline: the whole sketch fits in a few lines, which
  forces the technique to be one clean idea. Every reimplementation found the
  same core because the core was all there was.

## Techniques to steal (not copy)
- Parametric point clouds: f(x, y, t) to position, plotted densely. Cheaper
  than agents, smoother than noise, fully deterministic.
- Build intermediate fields first (k, e, d), then feed them into the final
  mapping. Readable structure survives inside compact code.
- Small rotating offsets on a deformed base grid: instant creature motion.
- Accumulating alpha strokes on a dark ground instead of solid fills: brightness
  as an emergent property of point density.
- Write the sketch under a strict line budget first, then expand with sliders
  for parameter exploration. Keep the golfed version as the artifact, explain
  it in plain code.

## What NOT to do
- White dots on a black point cloud is a recognizable look now, and several
  reimplementations already exist. Anything using this exact pipeline needs a
  distinct twist: palette, mapping, or interactivity.
- Do not mistake brevity for simplicity. The golfed source is fun to read but
  hard to tune; parameter exploration wants a readable version with sliders.
- Be honest about frame rate: 10,000 point() calls per frame chugs in p5 on
  real machines (the WebGL port exists precisely for this). Budget the point
  count for any public piece.
