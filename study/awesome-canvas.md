# awesome-canvas (raphamorim) (preliminary)

**Source:** https://github.com/raphamorim/awesome-canvas
**Status:** 2026-09-19, preliminary. The repo README (the whole content: a
curated link list) was read in full. Individual example pages were not visually
inspected in this pass: two link checks (kevs3d.co.uk L-system demo,
fralonra.github.io star timelapse) failed to load in this session, and several
listed links point at dead domains (cssdeck.com, creativejs.com). The value
here is the map, not the destinations. A follow-up visual pass on the surviving
examples is worthwhile.

## What it is

An "awesome list" of canvas examples, libraries, and resources. Inspirational
for study because it collects the canonical demo vocabulary of the canvas
community: particles, metaballs, L-systems, metaballs, Lorenz attractors,
Voronoi, isometric graphics, rough hand-drawn styles. Think of it as a reading
list for technique survey, not a source with techniques itself.

## The examples worth opening first (generative-art value)

From the ~35 examples, the ones that map directly onto generative technique
families:

- **30,000 particles** (codepen) - a study of performant Canvas 2D particles.
  Directly relevant: the performance chapter of the Josh On Design notes says
  particles are the engine; this shows how far you can push the count.
- **L-System Turtle Fractal Renderer** (kevs3d.co.uk) - L-systems are a whole
  generative family (plants, branching structures). Turtle interpretation:
  string rewriting where F draws, + and - turn, [ ] push and pop state.
- **3D Lorenz Attractor** (cssdeck, likely dead, but the technique is trivially
  reconstructible) - strange attractors as line drawing: integrate the Lorenz
  equations, plot the trail. A chaotic system producing a structured,
  butterfly-like form. Very little code, very high visual payoff.
- **JS Metaballs** (cssdeck) - metaball fields via thresholding a scalar
  field. The blobby-merge look. Modern approach: draw radial gradients into an
  offscreen canvas, threshold with a pixel pass or CSS contrast filter.
- **Fibrous Texture** - random lines accumulating into a papery pattern, more
  detailed with each iteration. The "accumulate thin strokes" family, same
  impulse as flow fields.
- **Tree in the Breeze** - recursive tree drawing. Branching recursion is one
  of the oldest generative techniques; wind animation adds a second layer.
- **Star Time Lapse Effect** - concentric arc trails, the classic long-exposure
  sky. Same fade-trail idea as the Josh On Design notes, applied radially.
- **Trigonoparty!** - trigonometry visualization. Trig functions as direct
  composition tools: lissajous, spirograph, epitrochoid curves.
- **Canvas Colour Cycling** - full 8-bit color cycling engine. Palette
  animation: the image stays fixed, the palette rotates. A whole aesthetic
  (demoscene) from one lookup-table trick.
- **Distance Field Waves** - ray marching / sphere tracing in a shader.
  GPU-side procedural 3D scenes, the high-end cousin of canvas 2D work.
- **Cloth 3D Effect** - verlet-integration cloth. Soft-body physics is a
  generative medium: pin some points, let the rest fall, draw the mesh.
- **Video Destruction** - block-based destruction of video frames. Glitch
  aesthetics from slicing a live image into tiles and displacing them.

## Libraries that matter for generative work

From the ~30 listed libraries, the ones a generative practice actually needs:

- **p5.js** - the creative-coding standard; the study notes elsewhere already
  use it as the re-render target.
- **Pts.js** - creative-coding math library (points, noise, spatial ops).
- **Paper.js** - vector scenegraph in the browser; the tadpoles/chain examples
  from the study queue live here.
- **Rough.js** - sketchy hand-drawn rendering of shapes. Directly useful for
  plotter-friendly or pencil-look pieces: draw precise geometry, render it
  wobbly.
- **zDog** - flat pseudo-3D for canvas/SVG. Designer-friendly isometric-ish
  illustration; good for pieces that want depth without WebGL.
- **Proton / tsParticles** - particle engines. Fine as references, but for
  generative art you usually want your own particle loop (see Josh On Design
  notes) so the behavior is yours.
- **Javascript-Voronoi** - Fortune's algorithm implementation. Voronoi
  diagrams are a staple generative substrate (cells, cracks, stained glass).
- **isomerjs** - isometric graphics. Isometric projection gives instant
  architectural/city-block aesthetics from grid data.
- **textmode.js** - ASCII/textmode graphics in the browser. ASCII art is its
  own generative family: render your field as characters.

The rest (EaselJS, Fabric, Konva, Pixi, Three.js, Chart.js, game engines) are
application frameworks, useful context but not generative technique sources.

## What to take from it (study, not copy)

Treat the list as a technique checklist: particles, L-systems, attractors,
metaballs, cloth, Voronoi, isometric, ASCII, color cycling, trig curves.
Each is a well-documented family with tiny core algorithms. The generative
doodles project can work through them one family at a time; several (particles,
trig curves, recursive trees) are already covered in other study notes.

## Visual follow-up, 2026-09-20

Retried the shortlisted surviving examples and visually inspected the ones
that load. Depth: deep on the three that render.

- **Trigonoparty (ramesaliyev.com/trigonoparty): ALIVE.** Interactive unit
  circle at 60 FPS, click and drag the angle. Every trig function drawn as a
  labeled color-coded segment: sine, cosine, tangent, cotangent, secant,
  cosecant. Side panel with live values, degree/radian, step-by-frame option.
  Technique: direct trig-as-geometry drawing, one radius line, the six function
  segments derived from it each frame. What makes it sing: the unit circle is
  the whole composition, nothing decorative, yet dragging the angle feels
  tactile and the values ticking over make the math visceral. For doodles: the
  unit circle is an underused generative substrate, and "draw the construction
  lines" can BE the piece.
- **Star Time Lapse (fralonra.github.io/star-time-lapse/demo/): ALIVE.**
  Concentric star-trail arcs on a deep indigo sky, gold and blue trails with
  glowing star heads, arcs of varying length and radius. The classic
  long-exposure look built from arc() calls with per-star phase. Same fade/trail
  idea as other notes but radial instead of linear. Quiet, confident, no UI
  clutter except a Stop button. Avoid-list echo: even a good demo does not need
  much interface.
- **Canvas Colour Cycling (effectgames.com/demos/canvascycle/): ALIVE.**
  Mark Ferrari style living pixel scenes, palette-animated in canvas. The demo
  shows "Jungle Waterfall - Morning" with prev/next scene switching. The image
  is fixed, the 8-bit palette rotates, and water/fire/sparkle regions come
  alive. A whole aesthetic from a lookup-table trick. For doodles: palette
  animation is almost untouched territory in p5.js pieces and could be a
  distinctive No.002 ingredient (animate the palette, not the pixels).
- **raphamorim.io/canvas-experiments/particles: DEAD.** GitHub Pages 404.
  The linked GitHub repo still exists but the Pages deploy path changed. This
  is the link-rot avoid-list in action: when a technique matters, reconstruct
  it locally instead of linking to it.

Overall: the list's value as a map holds, but roughly half its destinations
are gone or moved. The follow-up stands: reconstruct, do not link.

Avoid-list: link rot. Half the examples are on dead domains (cssdeck.com is
gone), which is a general warning about depending on hosted demos: when a
technique matters, reconstruct it locally instead of linking to it. Also,
demo quantity is not quality: most of these examples are tech demos, not art.
The study rule holds: learn the mechanism, ignore the presentation.
