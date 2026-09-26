# WebGL Attractors Trip: Hopalong orbit flights

**Source:** Iacopo Sassarini, "Barry Martin's Hopalong Orbits Visualizer", a Chrome
Experiment (later Experiments with Google: experiments.withgoogle.com/webgl-attractors-trip).
Live at https://iacopoapps.appspot.com/hopalongwebgl/.

**Depth: deep.** Full page source read (recovered verbatim in
goals/generative-doodles-site/hidden_files/study-2026-09-25-attractors/demo.html).
Live page run in the real engine headless (software WebGL via swiftshader) and
frames visually inspected at 1280x800, zero console errors. The shipped og:image
preview inspected. The Hopalong iteration re-implemented from the source in
Python and rendered three ways (additive points, histogram density, three
parameter families), all frames visually inspected.

## The piece

An interactive flight through strange-attractor orbits. Millions of glowing
points form lace-like mandalas on black; the camera flies forward through seven
stacked copies of the orbit, each tinted its own random hue; every three seconds
the orbit parameters re-roll and the whole scene dissolves into a new
attractor. Mouse steers the camera, up/down keys change flight speed,
left/right change rotation, H hides the UI. It is the flight, not the static
image, that makes it sing: the tunnel rush, the wrap-around pop when a layer
cycles from front to back, the slow rotation of each layer as it approaches.

## The formula, exactly

The page credits Barry Martin's Hopalong formula:

    (x, y) -> (y - sign(x)*sqrt(abs(b*x - c)), a - x)

Sassarini generalizes it with two extra parameters d and e, and picks one of
three z-kick variants at random per orbit:

    z = d + sqrt(abs(b*x - c))                 (choice < 0.5)
    z = d + sqrt(sqrt(abs(b*x - c)))           (0.5 <= choice < 0.75)
    z = d + log(2 + sqrt(abs(b*x - c)))        (choice >= 0.75)
    x1 = y - z   if x > 0,  y   if x == 0,  y + z  if x < 0
    y  = a - x
    x  = x1 + e

Parameter ranges in the source: a in [-30, 30], b in [0.2, 1.8], c in [5, 17],
d in [0, 10], e in [0, 12].

What each piece does, confirmed by re-rendering:
- The `sqrt(|bx - c|)` kick is the chaos engine. It is the only nonlinear,
  non-smooth part, and the sign(x) fold is what mirrors everything into the
  symmetric lacework. Smooth it (sqrt of sqrt, or log) and the orbits tighten
  into sparser, more geometric dotted patterns. The local re-render shows all
  three branches as visually distinct families: the raw sqrt branch gives the
  classic pearl-chain webs, the log branch gives sparse tiled rosettes.
- `a` slides the whole y-update, controlling the orbit's reach and whether it
  folds into rings or sprawls.
- `d` raises the kick floor (bigger z means wilder hops), `e` shifts every x
  forward, rotating which part of the map the orbit explores.
- The dud rate is real: my first re-render with a naive parameter draw
  collapsed into a dotted lattice instead of lace. The piece accepts this,
  re-rolling every 3 seconds, so duds are part of the texture of the show.

## How the flight is built (the 3D part)

224,000 points total: 7 subsets of 32,000. Each subset starts the iteration from
a slightly different seed point, so all seven trace the same attractor at
different phases, and each gets its own random hue (saturation 0.8, value 1).

The z-stack: for each of 7 levels, all 7 subsets are placed as THREE point
clouds, staggered in depth (LEVEL_DEPTH = 600 per level, subsets offset by
level/7). Every frame each layer moves +z toward the camera at `speed` and
rotates around z at 0.005 rad/frame. When a layer passes the camera it wraps to
the back; the wrap is where the vertex data and hue get refreshed on
regeneration ticks. FogExp2 (density 0.0010) fades distant layers so the tunnel
has depth.

Rendering choices that matter:
- Additive blending, depthTest off, point sprites from a soft radial texture
  (galaxy.png). The glow is the sprite, not a post effect.
- Points, not lines: the orbit "hopalongs", jumping from point to point, so
  connecting lines would be lies. The dotted pearl-chain look IS the truth of
  the map, and the additive pile-up where the orbit lingers draws the
  brightness for free.
- Normalization: scaleX = 2*1500/(xMax-xMin), centered into a 3000-unit box.
  No culling, no outlier rejection. An exploding orbit just stretches the box
  and the frame goes quiet for three seconds, then a new orbit arrives.

## Palette and composition

Per-subset random hue on black, additive. The signature look is jewel-toned
lacework: magenta arches, teal filigree, orange accents, one subset often
rolling a bright green that dominates the wrap plane. The symmetry is emergent,
not imposed: the sign(x) fold mirrors every hop.

## Lineage

- Barry Martin, Aston University, Birmingham. Popularized by A. K. Dewdney's
  "Computer Recreations" column, Scientific American, September 1986, who
  nicknamed it "Hopalong". German readers met it as "HUEPFER" in Spektrum der
  Wissenschaft (1988).
- Martin's own writeup: "Graphic Potential of Recursive Functions" in
  Lansdown/Earnshaw, Computers in Art, Design and Animation (1989).
- Pickover's Computers, Pattern, Chaos, and Beauty (1990) carries the sibling
  Clifford/Pickover attractor family (sine-based, different animal: smooth
  coupled maps instead of the sqrt kick).
- Modern continuation: BrutPitt's glChAoS.P, a GPU attractor explorer with
  cockpit-view flights through the orbit, particle lifetimes, wind and gravity.
  Cross-domain: Attrattore, a 2026 VST synth that uses chaotic attractors
  (Lorenz, Roessler, Chua) as oscillators, the sound of the orbit itself.

## What makes it sing

1. The flight turns a static fractal into a place. The same orbit as a still
   image is pretty; flown through, it is a tunnel you travel.
2. The 3-second regeneration is a compositional choice: the piece is a slot
   machine of attractors, and the dud frames make the good ones land harder.
3. Points, not lines. Respecting the discrete nature of the map is what makes
   the pearl chains read as structure instead of noise.

## Overdone / avoid-list

- Random-hue slot machines: the per-subset random hue is the weakest choice
  here. A hue journey (analogous spread, or one hue family per level of depth)
  would carry the tunnel's depth instead of fighting it.
- Sprite glow as a crutch: the soft radial sprite hides how sparse the points
  are. At high zoom the lace dissolves into blobs. Density-mapped rendering
  (histogram plus log tone map, the flame-renderer approach) holds up better
  and my re-render confirms it: the same orbit reads as solid filigree in
  density mode where the sprite version reads as dots.

## Doorways opened

- glChAoS.P (BrutPitt): the modern deep end of this vein, GPU flights with a
  cockpit camera riding the orbit head. Wants a full visual pass.
- Clifford/Pickover attractors: the sine-family sibling, partially covered in
  the bibliography notes; a visual pass comparing the two families side by
  side would be worth a session.
- The "flight through stacked copies with fog" as a portable rig: apply it to
  flow fields, particle fonts, the ikeryou particle text.

## Seeds

Seeds 100-102 in FUTURE_PIECES.md.
