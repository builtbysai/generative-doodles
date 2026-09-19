# akella: Study Notes

**GitHub:** github.com/akella | **Codrops author:** tympanus.net/codrops/author/akella/
| **Profile:** x.com/akella | **Video:** youtube.com/@akella_

**Depth:** deep. Read two Codrops articles in full (Rotating Twisted 3D
Typography; On-Scroll Revealing WebGL Images), the fake3d fragment and
vertex shaders verbatim plus its JS harness, and a full technique
breakdown of all six signature repos (fake3d, ExplodingObjects,
webGLImageTransitions, DistortedPixels, UnrollingImages,
webgl-mouseover-effects) extracted from their actual sources. Visually
inspected six images through the screenshot rig: the live fake3d demo
rendered in the browser, the twisted-typography cover art, the pixelated
scroll-reveal GIF, the glass portal GIF, the Eiffel Tower catapult
cover, and his Codrops author page. The X profile is login-walled and
was not reachable; the YouTube channel was not loaded directly.

## Who he is

Yuri Artiukh, a creative developer from Kyiv, runs a small frontend
agency (Coderiver) and is Codrops' most prolific three.js/WebGL
contributor: 18 articles on the author page, mostly "recreate this
award-winning site's effect" deconstructions with playable demos and
full source. He also livecodes on YouTube, walking through each effect
line by line. He is not a gallery artist. He is an educator who takes
one polished production effect at a time, reduces it to its mechanism,
and ships the code.

## Core techniques

### Fake 3D via depth-map parallax (fake3d, plain WebGL, no three.js)
One fullscreen quad, two textures: the color image and a hand-painted
grayscale depth map (white = near, black = far). The whole effect is
four lines in the fragment shader:

    vec2 vUv = (uv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec4 tex1 = texture2D(image1, mirrored(vUv));       // depth
    vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5) * mouse.x / threshold.x,
                       vUv.y + (tex1.r - 0.5) * mouse.y / threshold.y);
    gl_FragColor = texture2D(image0, mirrored(fake3d)); // color

Depth minus 0.5 centers the shift: near pixels slide with the mouse,
far pixels slide against it, mid-gray stays. x and y get independent
thresholds (35 vs 15 in the demo), so vertical parallax is stronger.
`mirrored()` is a triangle-wave mirror so displaced UVs never smear at
the edges. The mouse target is exponential-smoothed every frame and on
mobile GyroNorm feeds device tilt into the same uniform. The live demo
shows giant serif "QO" letters on black drifting against each other
with mouse movement. Lesson: the depth data is authored by hand, the
shader only does the cheap trick.

### GPU exploding objects with baked per-shard attributes (ExplodingObjects)
The explosion is authored, not simulated. Models are Voronoi-fractured
in Blender, Draco-compressed to glb, and each shard carries a baked
centroid, a random spin axis, and a per-shard id. JS merges all shards
into two BufferGeometries (surface skins, fracture interiors), so the
whole explosion is two draw calls. One `progress` uniform (0 = whole,
1 = exploded) drives everything in the vertex shader: per-shard stagger
computed from the centroid position (a spatial wave, not random timing),
shards fly out along their centroids with id-scaled distances, and an
axis-angle rotation matrix in GLSL spins them. Different objects (heart,
brain, egg, icosahedron) are the same template with different constants.

### Fragment-shader transition toolkit (webGLImageTransitions)
Eight wipes, all driven by a single `progress` uniform tweened 0 to 1
with GSAP. The transitions ARE the fragment shader's mix(). The toolkit
recurs everywhere: `parabola(x,k) = pow(4*x*(1-x), k)` for a band that
peaks mid-transition, classic Perlin cnoise pasted into the shader for
eroded leading edges, aspect-corrected pixelation via
`floor(vUv * gridSize) / gridSize`, displaced UV bands with pow-10 hard
edges, luminance-driven smear, and hash noise for per-pixel jitter.

### Twisted 3D typography (Codrops article)
TextGeometry centered, then a vertex shader twists it: map each
vertex's x across the bounding box to an angle theta, rotate pos.yz by
that angle, then bend the whole strip into a circle with
`pos = circlePoint * RADIUS + circlePoint * pos.y + vec3(0,0,pos.z)`.
The cover art shows "EVERYTHING IS POSSIBLE" as a ring of 3D
extruded letters, purple-blue gradient on black, each letter rotated
further as it travels around the circle. Same formula shapes the
normals for correct lighting. The move generalizes: map a linear
coordinate to an angle, push vertices onto the circle, keep the
perpendicular offsets.

One honest bug in his article text: the JS snippet sets
`uMax.value = geo.boundingBox.min` where it clearly means `.max`.
The demos work; the article copy has the typo.

### Eiffel Tower catapult (Sep 2026, his most recent)
Three ingredients, all named in the article. First, a springy tower:
the Wiggle library rigs any mesh with a column of bones and runs spring
physics on them, so dragging the tower deforms it and stores spring
energy. Second, real Paris: Cesium ion plus Google Photorealistic 3D
Tiles stream the actual city; he collapsed the scanned tower model to
the ground and stood the rigged tower in its place. Third, the launch:
a ball sits at the tower tip, release fires it along your aim, and a
physics engine handles trajectory, collisions, and landing. The cover
shot shows the cartoon ball ("Gustave Fling") mid-air over the
photogrammetry city. Built as a promo for the first Three.js conference
in Paris.

### Reflective Grid: an honest gap
His Crosswire reflective-grid piece exists only as a YouTube stream;
the article is just the embed and the setup gist link is truncated in
every copy, so the actual shader is not retrievable from text. No
fabrication here: the informed shape of it (fragment-shader grid lines
via fract(), fresnel falloff, a traveling radial highlight uniform)
matches his toolkit, but the source itself stays out of reach.

### Scroll-driven WebGL reveals (Codrops article)
R3F drei's `<View>` embeds WebGL meshes inside DOM elements, with the
pixelation shader plus pixel borders revealing the image. Native
IntersectionObserver triggers GSAP tweens of a single `uProgress`
uniform. The hard lesson he documents: HTML and WebGL are two layers,
and native scroll makes them jitter against each other, so he drives
the page with Lenis (smooth scroll) via R3F's `addEffect`. The
captured GIF shows a glowing orange-pink figure resolving out of
square pixels on black, captioned "Embrace of Heat 2023".

### Unrolling images (UnrollingImages)
An 80x80 segmented plane curls into a spiral in the vertex shader
(radius shrinking along the sheet for a paper-roll cross-section),
then a `progress` uniform unwinds it while a per-strip stagger snaps
each vertical strip from curled to flat as the wave passes, with a
baked fake shadow (curled part darker) in the fragment shader.
IntersectionObserver fires the roll/unroll as images cross the fold.

### DistortedPixels: simulation state in a DataTexture
A low-res float grid lives in a THREE.DataTexture. JS stamps mouse
velocity into cells near the cursor (falling off as 1/distance) and
decays the whole grid by 0.9 per frame; the fragment shader just reads
the grid as a UV offset. Cheap, resolution-independent, relaxes to rest
on its own. The pattern recurs wherever he needs a brush.

### Post-process hover (webgl-mouseover-effects)
DOM images become matched three.js planes, but the per-item shaders are
trivial. All the hover effect is one fullscreen ShaderPass driven by
smoothed mouse velocity: chromatic aberration walking R/G/B apart near
the cursor, a suction warp toward the pointer, or per-pixel hash jitter.
Render the scene plain, do the effect in one pass.

## Cross-repo patterns worth stealing

- One `progress` uniform (0 to 1) tweened from JS is the whole
  animation system. All time logic is a pure function of progress;
  easing lives in JS, shaping in GLSL.
- Bake per-piece IDs as vertex attributes (shard index, centroid,
  random axis) so one merged draw call animates hundreds of pieces in
  the vertex shader.
- Stagger with a spatial hash: `tProgress = (progress - f(pos)*k)/(1-k)`.
  No per-object JS timers.
- Authored data, cheap shader: painted depth maps, Blender fractures,
  Gaussian splats. The shader animates; it never generates the hard data.
- Edge handling is first-class: mirrored UVs and cover-crop resolution
  math appear in every repo.
- Smooth the inputs: mouse and scroll always go through exponential
  smoothing before touching a uniform.

## Palette and composition

Dark stages with one glowing subject: gold serif letters on black in
the fake3d demo, purple-blue extruded type rings, warm orange-pink
pixelated figures, bright white edge highlights on glass portals over
Gaussian-splat statues. His covers read like tutorial thumbnails:
high contrast, additive glow, one clear subject. Playful where it can
be: the Eiffel Tower bent into a catapult flinging a cartoon ball
("Gustave Fling") over a 3D photogrammetry Paris.

## What makes it sing

- Ruthless reduction. Each effect is the smallest possible mechanism:
  fake 3D is four lines, the pixel reveal is one floor() call.
- The uniform discipline. One or two lerped uniforms carry every
  animation, which makes the demos trivially tunable and reusable.
- Teaching in public. Every repo is a Codrops tutorial with the
  reasoning, the demo, and the source, so the techniques are all
  verifiable against real code.
- Production taste. He picks effects from real award sites (Crosswire,
  MIDWAM, Stripe's lava lamp, Kenta Toshikura's glass), so the
  techniques he isolates are the ones that already survived contact
  with paying clients.

## Techniques to steal (not copy)

- Depth-map parallax with independent x/y thresholds and mirrored edge
  sampling for fake 3D image depth
- Baked per-shard attributes plus a single progress uniform for GPU
  explosions and shatter effects
- Parabola-shaped transition bands and noise-eroded wipe edges for
  image reveals
- `floor(vUv * gridSize) / gridSize` pixelation with aspect correction
- Spatial-hash stagger for per-piece timing without JS timers
- CPU brush in a DataTexture with decay for interactive distortion
- Fullscreen post-process hover driven by smoothed mouse velocity
- Twist-then-bend vertex math for ribboned typography

## What NOT to do

- His repos are r110-era three.js with Parcel/webpack bundles, dead
  shader files, and debug assignments left in (DistortedPixels assigns
  gl_FragColor four times). Steal the algorithms, not the scaffolding.
- The glow-on-black tutorial-thumbnail look is his packaging, not the
  technique. Do not import the aesthetic along with the math.
- Some repos ship buildable-source mismatches (ExplodingObjects' src
  imports a shader file that is not in the repo). Treat his sources as
  references to reimplement from, not code to lift.
