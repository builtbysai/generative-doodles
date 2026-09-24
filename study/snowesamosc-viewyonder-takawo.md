# Snow Esamosc / viewyonder / takawo: two p5.js micro-sketches (Sep 2024 cluster)

**Sources:**
- Gist https://gist.github.com/viewyonder/a640cb109a9f5cfb24b5b0e0b7e1e2c2 "Rotating squares and sliding circles in p5js" (2024-09-04), credited "original by Snow Esamosc https://x.com/SnowEsamosc/status/1830993146056175789"
- Gist https://gist.github.com/viewyonder/7bf5463ecae1a1b13c0d1beb4ca0f6ba "10 MIN CODING by Takawo" (2024-09-04), code from https://x.com/takawo/status/1831126129018843619
- Queue items: viewyonder gist, takawo X post, SnowEsamosc X profile

**Author note:** viewyonder is Steve Chambers (injectionator.com), a collector rather
than a generative artist. His gists archive other people's sketches, sometimes
with AI-generated line-by-line explanations pasted in (the takawo gist includes
a full "Explained by ClaudeAI" walkthrough plus a follow-up Q/A about lines 20-21).
So this cluster is: two X micro-sketches plus the person who bookmarked them.

**Status:** 2026-09-24, deep. Both sources read in full from the gists. The X
posts themselves are login-walled, so the original videos/posts were not seen;
the Snow Esamosc original is known only through viewyonder's credited remix.
Both sketches were re-implemented from the authored code in plain canvas (my own
Perlin noise standing in for p5's, structurally faithful) and rendered frames
were visually inspected.

## Sketch 1: "Rotating squares and sliding circles" (Snow Esamosc, via viewyonder)

The full code, about 25 lines:

```js
let f = 0;
function setup() { createCanvas(500, 500); }
function draw() {
  if (f === 0) { createCanvas(500, 500); }  // odd no-op-ish line, harmless
  f++;
  blendMode(BLEND);
  background(0);
  for (let x = -f % 50; x < 600; x += 50) {
    for (let y = -f % 50 - x / 2; y < 600; y += 50) {
      circle(x, y, 50 * noise(x + f, y + f + x / 2));
    }
  }
  blendMode(DIFFERENCE);
  push();
  translate(250, 250);
  rotate(f / 99);
  rectMode(CENTER);
  rect(0, 0, 400, 400);
  pop();
}
```

## Technique

p5.js, 500 by 500, single frame counter f. A 50px grid of white circles on black,
each diameter set by Perlin noise: 50 * noise(x + f, y + f + x / 2). The noise
field is sampled in space plus time, so every dot breathes in size on a smooth
slow cycle.

The grid slides and wraps: x starts at -f % 50, which in JS runs 0, -1, -2 ...
-49 then snaps back to 0 every 50 frames, so the whole field drifts up-left at
one pixel per frame while the sampling point (x + f) advances continuously. The
dots never jump, the wrapping grid just re-covers them. y starts at
-f % 50 - x / 2, staggering each column's rows by half a cell, which lays the
dots out along diagonal bands. So there are two motions at once: translational
slide and per-dot size pulsing.

Then the punch: blendMode(DIFFERENCE), a 400 by 400 white square rotating at
f / 99 radians per frame (about 10 seconds per revolution), drawn dead center.
White XOR the dot field inverts everything under the square: black background
becomes white, white dots become black. The 1px black stroke on the rect is
invisible under DIFFERENCE, so the square reads as a clean inverted window.
Circles that straddle the square's edge come out half black, half white, which
is the loveliest detail in the piece, those bisected dots marking the boundary.

## Sketch 2: takawo "10 MIN CODING" (concentric dashed rings)

The code, about 30 lines. Full-bleed canvas, background 240 gray, frame counter t:

```js
for (let r = rMax; r > 0; r -= rStep) {           // rStep = 2
  let d = TWO_PI * r;
  let a = map(sin(radians(r + t)), -1, 1, 2, 10);
  drawingContext.setLineDash([d / a / 2]);
  drawingContext.lineDashOffset = (t / 30) % (d / a);
  strokeWeight(rStep);
  stroke(0);
  push();
  translate(width / 2, height / 2);
  let v = (r / rMax) * 360 * 3 * sin((r / rMax) * PI + t / 100) + t;
  rotate(radians(v / 3 + 90 * sin(radians(t))));
  circle(0, 0, r * 2);
  pop();
}
```

About 318 concentric rings, each stroke weight exactly equal to the radial step,
so the rings tile the canvas with no gaps: the whole screen becomes a dense
hatched field. Each ring is dashed: dash length and gap both d / a / 2, where
a (2 to 10) oscillates along the radius as sin(r + t), so a standing wave of
dash counts runs from the center outward. The dash offset crawls at t / 30 per
frame, so dashes orbit their own ring. Each ring is rotated by an angle that
mixes a radius-scaled sine (phase sweeping along the radius, plus t / 100
drift) with a global +t rotation and a plus/minus 90 degree whole-field rock on
sin(t). Inner rings get smaller but quicker rotational changes, outer rings
larger but slower.

## What makes the takawo piece sing

The emergent solidity. From ~300 individually thin dashed rings, the eye reads
thick black spiral blades and a tunnel vortex that is not drawn anywhere in the
code, it appears where adjacent rings' dashes happen to align. The rendered
frames look like op-art engraving, with deep moire curves that move on their
own schedule. All of it from one trick: dash count modulated by radius.

## Palette and composition

Both pieces are strict two-tone: sketch 1 pure black and white, sketch 2 black
on light gray (240). Sketch 1 is centered and calm, the square nearly filling
the frame with a slow tilt. Sketch 2 is full-bleed chaos, rings running past
the window edge, the vortex center slightly alive. Composition in both cases is
"let the algorithm fill the frame," no focal-point stagecraft.

## What makes the cluster sing

Both sketches are under 35 lines and both get their power from a single
post-processing-style move applied to a plain field: DIFFERENCE blend in the
first, lineDash in the second. The base fields are almost boring (dot grid,
concentric rings); the twist operation is where the artwork happens. That is the
10-minute-coding ethos in one sentence: find one cheap operation that
re-contextualizes everything under it.

## Avoid-list notes

- Concentric-ring op-art is a well-worn genre; the dash-count modulation is the
  only fresh lever, and the genre reads instantly as "screensaver" if the
  modulation is shallow.
- Pure monochrome high-contrast plus DIFFERENCE inversion is a known
  generative-art cliche. What saves sketch 1 is the bisected edge circles and
  the diagonal slide; without a boundary detail the inversion is just a
  filter trick.
- The AI-generated explanation pasted into the takawo gist is mostly right but
  slightly hand-wavy ("The time-based components ensure a cohesive animation").
  If you ever study a sketch from a pasted explanation alone instead of the
  code, you are studying the explainer, not the art.

## Cross-links

- The DIFFERENCE inversion window pairs with the xdesro "Sweeney" chord-circle
  studies (overlay as re-contextualizer) and the Volorf poster systems (one
  rule applied relentlessly).
- The dash-modulated rings are a cousin of the takawo-style dense hatching in
  the inspirationfeed minimal geometrics pass; the standing wave of dash counts
  is the technique to steal, applied to any radial or linear hatch field.
- The sliding-wrap grid (modulo start offset plus continuous sample offset) is
  a general recipe for endless scrolling fields without seams.
