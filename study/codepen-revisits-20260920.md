# CodePen revisit pass — 2026-09-20 (PRIVATE, never push)

All five blocked items were reachable today via live browser (raw fetch had
failed earlier). Every pen below was viewed live with its visual output
confirmed, signed out. Technique summaries only, no code dumps.

## tarick — jWOWOV "HTML5 Canvas animated clock"
Glowing neon-cyan clock on a dark circular medallion over light gray. Big
center text shows time and date; hands are thick luminous concentric arcs
with ctx.shadowBlur glow, the seconds ring sweeping smoothly. Construction:
vanilla canvas 2D, setInterval render loop, h/m/s each mapped to arc angles
via degToRad, round-capped stroked arcs. Classic layered-dial clock idiom;
the glow does most of the aesthetic work.

## tksiiii — rxdaEP "floating circle particle"
Cream/beige ground, ~100 small teal dots of varying size in a rough ring,
drifting gently around home positions with easing. Construction: p5.js
(instance mode); an image-driven particle system — positions, sizes and
colors sampled from a source image's pixel data (one particle per sampled
pixel), then particles float/idle with drift. Code comments in Japanese.
Lesson: image-driven seeding gives calm, non-uniform arrangements for free.

## xdesro — three interfacelovers playlist-cover homages
- "#03 - Sweeney" (abbRRQp): thin black circle outline on white, small dots
  at random points on the circumference joined by thin chord lines. Click to
  re-render. N points sampled at random angles, connected with straight
  strokes — canvas-sketch-style render({context,width,height}) structure.
- "#01 - Tran" (wvvYzjP): equilateral triangle built from stacked,
  semi-transparent jittered gray triangle layers — faceted origami / low-poly
  mountain look. Multiple alpha fills on jittered vertices.
- "#156 - Saville" (PooyoKo): black line-art hexagon with random diagonal
  chord lines across its interior. Polygon vertices via cos/sin, outline
  stroked, chords between vertices/edge points.
All three: minimal geometry + randomness + click regeneration. A tight,
repeatable format — one rule, white ground, construction visible.

## scorch — 11 of ~21 pens
- "Abstract Vegetation ~ GENUARY2022" (yLPBJNo): white branching fern-like
  plants growing on near-black; each plant grows segment by segment with
  two SimplexNoise instances steering it; semi-transparent background
  redraw leaves motion trails. Swaying segmented growth is the key move.
- "Another noise field" (RwjmJoV): 6000 points advected through a noise
  flow field, each drawing short line segments per frame, accumulating into
  a swirling petal/flower pattern on black. Density-through-accumulation.
- "SPACE ~ Genuary2022 no.3" (QWqrdYe): ringed Saturn-like planet (rotated
  ellipse arcs for the ring), star field, jagged noise-displaced horizon
  line. Simple primitives + noise composition.
- "DITHER ~ Genuary2022 no.2" (WNZzLQv): grid of blob tiles, each with a
  randomized cartoon face (eyes, brows, mouths). two.js fullscreen SVG,
  per-cell randomized feature parameters, subtle animation.
- "diamond tiles(p5js)" (JjJWoZQ): concentric diamond outlines in rows on
  black, each stroked multiple times with slight random offset jitter, from
  a fixed palette (deep navy, burnt orange, off-white); seeded random so
  the layout is fixed. Offset multi-stroke + limited palette.
- "Packed like circles" (KKqPpdj): dozens of overlapping organic blobs on
  white; each blob a ring of concentric wavy contours with light/dark
  shading that reads as 3D embossed relief, like pebbles or microbes.
  Vanilla canvas circle-packing (random attempts, radii grow to contact);
  each circle's rings displaced by sine-of-angle with per-circle phase;
  inside-out grayscale shading gives the relief. Seeded random.
- "p5js ~ lines" (mdmmppK): twelve thin horizontal polylines on white,
  straight top and bottom, wavy in a central band (Joy Division
  Unknown Pleasures idiom). p5.js; 12x40 point grid, points inside an
  annular region get sinusoid vertical displacement, lines drawn as strips.
- "p5js ~ lines 2" (NWjjeeZ): same 12-line layout, waveforms jagged and
  spiky in the center band, like an oscilloscope static burst. Same
  construction as the sibling, but per-point random vertical offsets
  instead of smooth sine waves. Random vs smooth is the whole difference.
- "cpc-generative-blocks (animated)" (GRJMNNr): pale peach ground,
  concentric translucent rotated squares radiating from a dark gear-like
  star core, small outlined diamonds orbiting a middle ring, slow
  pulse/rotate. p5.js animation loop; layered rotated polygons (n=4 or 6
  sides), radii cycling a 130-step cycle; palette #2b2d42 / #8d99ae with
  alpha fills for the translucent layering.
- "cpc-generative-blocks" (ExjvGaQ): dark navy ground, six bright-red
  hexagonal "cage" wireframes in hexagonal arrangement, white triangles
  and tick marks around the forms; high-contrast emblems. p5.js; random
  side counts, radii, colors per run; nested wireframe polygons in stroke;
  click calls setup() to regenerate on demand.
- "loops - grid" (oPyVZR): Mondrian-style grid of outlined black/white
  rectangles of varying spans on near-black. Vanilla canvas; 10x10
  nested-loop grid with randomized cell spans and fills, no animation.

## DonKarlssonSan — 6 pens
- "Noisy Circles | Simplex Noise" (WzbYBr): nested white wobbly concentric
  circles on black, like topographic tree rings, animated and mouse-reactive.
  Vanilla canvas; radii modulated by simplex noise evolving over time; mouse
  position influences the drawing. 351 loves — his strongest study in how
  little is needed for a hypnotic piece.
- "Lissajous Particles" (dyReXmq): particles in orange/black/gray/purple
  glide along Lissajous curves leaving fading trails on light gray.
  Particle class; x/y = sin/cos at different frequency ratios; trails via
  translucent background overlay.
- "Gray Spiral Delaunay with Texture" (vYOpYVW): low-poly gray triangles
  with grainy texture, denser toward a spiral center. Delaunay implemented
  from scratch (Bowyer-Watson); points along a spiral; each triangle gets a
  grayscale gradient + texture. "Click to generate new pattern."
- "Nine Rotating Squares | p5js" (QWMWwqX): black rotating-square outlines
  accumulating into a spirograph-like woven mandala on white. A vector
  rotates around a center; 9 squares drawn at rotated positions each frame
  (push/rotate/drawRect); trails form the mandala.
- "#circlemorphing triangle #codingtrain" (POwopx): white loop line on black
  continuously morphing triangle-to-circle with springy easing. Point-set
  morphing: triangle vertices lerped to circle points through
  easeInOutQuad/Quint/Elastic (credited to gre's gist), drawn as continuous
  polygon.
- "Mobius Bands - InstancedMesh" (QWMWwqX): VIEWED 2026-09-20 (the earlier
  blank canvas was the headless environment, not the pen: Chrome 128+ needs
  --enable-unsafe-swiftshader for software WebGL, fixed and re-rendered,
  two frames inspected). Three.js r128, one WebGL canvas, zero console
  errors. 64 cuboids as an InstancedMesh placed along Mobius band parametric
  curves, rendered monochrome with specular lighting on black. It reads as a
  slowly turning gear-vortex or turbine seen from above; between two frames
  taken seconds apart the view visibly shifts (band rotation or camera
  drift). The cuboid teeth catch one strong light, so the ring pulses between
  matte black and silver as it turns. Mouse interaction and scroll camera are
  in the code. Grayscale in motion, despite the colored profile thumbnail, so
  the thumbnail is likely stale or an interaction state.

## Seeds for future pieces
- Noise-modulated concentric rings (Karlsson WzbYBr) as a topographic
  device — different subject matter, same elegance.
- Offset multi-stroke with a fixed seed (scorch JjJWoZQ) as a drawing rule.
- Segmented growth with noise steering (scorch yLPBJNo) — vegetation idiom
  to borrow the method from, not the look.
- One-rule geometry + click regeneration (xdesro format) as a sketchbook
  exercise: one compositional rule per sketch, white ground.
