# scorch: Study Notes (26 pens deep, complete)

**Profile:** codepen.io/scorch | Prolific generative sketch artist, many genuary entries
**Status:** all 26 plan-list pens visually inspected live with JS read (2026-09-20,
four passes). Technique summaries below.

## Style profile

Scorch works like a daily sketch practitioner: one small idea per pen, executed
tightly. Heavy monochrome discipline (black ground with white, or white ground
with black) plus a few limited-palette pieces. Recurring devices: noise-steered
growth, circle packing, line grids with local displacement, seeded random so a
composition is reproducible. Most pens are static outputs; some animate.

## Technique breakdowns

### 1. "Abstract Vegetation" (yLPBJNo, GENUARY2022)

White branching fern-like plants growing on near-black. Each plant grows segment
by segment, steered by two SimplexNoise instances; a semi-transparent background
redraw each frame leaves motion trails, so growth leaves fading history.

**Takeaway:** segmented growth with noise steering is a strong vegetation idiom.
Trail-fade via translucent background fill is the cheap, good motion-history trick.

### 2. "Another noise field" (RwjmJoV)

6000 points advected through a noise flow field, each drawing a short line
segment per frame. The marks accumulate into a swirling petal/flower pattern on
black.

**Takeaway:** density through accumulation. The composition emerges from thousands
of tiny contributions rather than being drawn directly. Flow fields want points,
not paths.

### 3. "SPACE" (QWqrdYe, Genuary2022 no.3)

Ringed Saturn-like planet built from rotated ellipse arcs, a star field, and a
jagged noise-displaced horizon line. Simple primitives plus noise composition.

**Takeaway:** noise does not have to be the subject. Here it roughens one horizon
line while the rest is clean geometry, and that one irregular line carries the
whole piece's organic feel.

### 4. "DITHER" (WNZzLQv, Genuary2022 no.2)

A grid of blob tiles, each holding a randomized cartoon face (eyes, brows,
mouths). Built with two.js as fullscreen SVG, per-cell randomized feature
parameters, subtle animation.

**Takeaway:** grid-plus-variation is a durable generative format: fix the
structure (grid of cells), randomize the contents (features per cell). Works for
faces, tiles, glyphs, anything modular.

### 5. "diamond tiles" (JjJWoZQ, p5.js)

Concentric diamond outlines in rows on black, each stroked multiple times with
slight random offset jitter. Fixed palette: deep navy, burnt orange, off-white.
Seeded random, so the layout is fixed.

**Takeaway:** offset multi-stroke plus a limited palette is a complete drawing
rule. The jitter makes one geometric shape read as hand-drawn and rich.

### 6. "Packed like circles" (KKqPpdj)

Dozens of overlapping organic blobs on white; each blob is a ring of concentric
wavy contours with light-to-dark shading that reads as 3D embossed relief, like
pebbles or microbes. Vanilla 2D canvas. Circle packing by random attempts with
collision checking (up to ~500 circles, radii growing to contact). Each circle's
rings are displaced by a sine of angle with a per-circle phase, giving the wavy
organic outline; inside-out grayscale shading sells the relief. Seeded random.

**Takeaway:** embossed relief comes from shading, not geometry. Concentric rings
plus a phase-shifted sine and a radial light gradient turn flat packing into
something tactile.

### 7. "p5js ~ lines" (mdmmppK)

Twelve thin horizontal polylines on white, straight at top and bottom, wavy in
a central band (the Joy Division Unknown Pleasures idiom). A 12x40 grid of
points; points inside an annular region around the canvas center get sinusoidal
vertical displacement scaled by distance; points outside stay flat, yielding
straight outer lines.

**Takeaway:** masking displacement by a region (annulus here) is the composition
move. The untouched margins frame the chaos in the middle.

### 8. "p5js ~ lines 2" (NWjjeeZ)

Same 12-line layout, but the waveforms are jagged and spiky in the center band,
like an oscilloscope static burst. Same construction as the sibling, except each
vertex gets a per-point random vertical offset instead of smooth sine waves.

**Takeaway:** random versus smooth displacement is an entire aesthetic axis. Same
scaffold, opposite character. Worth remembering when a piece feels too calm or
too harsh: swap the noise source first.

### 9. "cpc-generative-blocks (animated)" (GRJMNNr)

Pale peach ground; concentric translucent rotated squares radiating from a dark
gear-like star core; small outlined diamonds orbit a middle ring; the layered
forms slowly pulse and rotate. p5.js animation loop. Each frame draws concentric
layers of rotated polygons (4 or 6 sides), radii cycling through a 130-step
cycle; random booleans toggle filled layers versus diamond ornaments. Palette:
dark navy and gray with alpha fills for the translucent layering.

**Takeaway:** translucent layering of simple rotated shapes is an easy route to
richness. A restrained two-color palette plus alpha does the work that a bigger
palette would do.

### 10. "cpc-generative-blocks" (ExjvGaQ)

Dark navy ground with six bright-red hexagonal "cage" wireframes in hexagonal
arrangement, white triangles and small tick marks around the forms. Geometric,
high-contrast, emblem-like. p5.js; random side counts, radii, and colors per
run; nested wireframe polygons drawn in stroke; a click handler regenerates the
composition on demand.

**Takeaway:** wireframe nests plus tick marks read as technical emblems. The
click-to-regenerate loop turns a static piece into a slot machine.

### 11. "loops - grid" (oPyVZR)

Mondrian-style grid of outlined black and white rectangles of varying widths
and heights on a near-black ground. Vanilla 2D canvas; a 10x10 nested-loop grid
generator places rectangles with randomized cell spans. No animation.

**Takeaway:** the simplest possible generator (nested loops, randomized spans)
can produce a composed look if the palette and stroke discipline hold. Random
rectangles only look random when the taste is missing.

## Batch 3 (2026-09-20, third live pass)

Two standalone studies plus a four-pen "polygon slicing" series that reads as a
single idea iterated in public, from minimal prototype to smoothed and tuned
instrument.

### 12. "Untitled" (PeLmpY): rotating hatch grid

A grid of jittered square cells on cream; each cell holds fine dark hatch lines
at a slightly different angle, forming an evolving angular moire texture like
plotter line work. Vanilla 2D canvas: a grid of random quads with jittered
corners, each quad picking a random hatch angle; parallel lines are swept across
the quad's rotated bounding box and clipped to the quad via a segment-segment
intersection routine, so only interior segments draw. Each frame increments every
quad's angle by pi/360, so the whole hatch field rotates continuously. Palette:
cream ground rgb(242,235,222), semi-transparent navy hatch #00227766; dense
full-bleed grid.

**Takeaway:** clipping line sweeps to arbitrary quads is a general motif-maker.
One hatch rule times a jittered grid gives a texture that reads as woven. The
slow uniform rotation turns a static pattern into ambient motion without any
compositional risk.

### 13. "Untitled" (deaZxz): counter-rotating petal mandala

A white layered petal/flower mandala with gray outlines on pale pink, soft and
organic, like a blooming flower seen from above. p5.js: a Shape class stores
points in Cartesian coordinates but caches their polar transform so rotation and
scale apply cheaply; shapes drawn with beginShape/curveVertex. Four concentric
layers (center blob, then 6, 9, 15 petal copies at even angular steps, scaled
1.1/1.4/1.8). The translucent pale-pink background [242,225,222,150] is drawn
with alpha each frame, so motion leaves trails. The three petal layers rotate at
different speeds (0.0035/0.0051/0.0064 rad/frame), counter-rotating. White-filled
petals, gray/black 1.4px outlines, centered 520px canvas, no interaction.

**Takeaway:** counter-rotation at irrational-ish speed ratios is what keeps a
mandala from locking into a periodic flipbook. Alpha background redraw is the
same trail trick as Abstract Vegetation, here serving smoothness rather than
history.

### 14-17. The "polygon slicing" series (WzojLb, ZxLajX, NYoNJq, JLNOvr)

An interactive instrument built in public, four iterations. The engine is
constant: a seeded polygon, a click-drag defining a line, segment-segment
intersection tests against every polygon edge, and bisection of each polygon hit
by exactly two intersections. Rendering is what evolves:

- **WzojLb "polygon slicing":** the minimal prototype. Plain white square with
  thin black border on crimson (190,50,70); default p5 white fill/black stroke,
  raw vertex() rendering, no smoothing, no coloring. A dark-red drag line shows
  while the mouse is pressed.
- **ZxLajX "polygon slicing (2)":** adds craft. Each piece's vertices inset
  slightly toward the polygon centroid (0.98/0.02 blend); pieces filled with a
  near-white rose tint varying subtly per piece (220,200,200 plus a sin wobble).
  Crimson ground, pale-rose square, "Click + Drag..." hint on canvas.
- **NYoNJq "Polygon Slicing 6 (circle)":** seeds a 120-vertex circle instead of
  a quad, renders as an open unfilled stroke with double Chaikin smoothing.
  Adds a dat.GUI S1 slider (0.51-0.99, default 0.95) controlling the smoothing
  factor live. Gray background, dark desaturated-green stroke; the most minimal
  composition of the four.
- **JLNOvr "polygon slicing (5) cell division":** the richest. Vertices pulled
  slightly toward centroid, then smoothed with two passes of Chaikin-style corner
  cutting and drawn with curveVertex into blobby forms; two passes draw outer
  salmon layer (240,120,120 with sin wobble) over an inner rose layer
  (180,40,70,180). Burnt-sienna background [122,44,28]; cells read as
  microscopic cell-division slides. Subtle sine "breathing" wobble each frame,
  so cuts accumulate on a living form.

**Takeaway:** publish the series, not just the best version. Four pens trace one
engine from raw prototype to polished instrument, and the trail teaches more
than any single piece. For our own work: Chaikin corner-cutting plus centroid
pull is the fastest route from angular generated geometry to organic blobby
forms, and exposing one tuning parameter (the smoothing slider) turns a demo
into an instrument.

## Batch 4 (2026-09-20, fourth live pass): the last 9 pens

### 18. "Untitled" (jZeVGN): Twig radial sea-urchin

p5.js. 47 "Twig" strands radiate from canvas center; each strand is a chain of
points walking outward along Perlin noise angles, with random jitter and an
inverse-square mouse repulsion (800000/(dx^2+dy^2)) that bends strands away from
the cursor. Each strand renders as a filled ribbon: two offset polylines stitched
with curveVertex in dark fill (47) on warm beige (220,210,200), plus a small
circle at each tip. A central blob is built by joining all strand base points
with curveVertex and filling it. Strands slowly rotate (angle drift 0.003/frame)
with jitter and live mouse bending. Sings: organic hand-drawn feel, smooth
ribbon rendering, strong beige/black contrast. Weak: one composition repeated
frame to frame, uniform tips, and the blob can read as a blob rather than a
flower head.

### 19. "Untitled" (KQGwOL): the same Twig engine, breathing

Visually near-identical to #18 in a still frame. Code differences: a conf object
(NUM_PARTICLES 8, NUM_STRANDS 12, FRAME_RATE 120), frameRate(120), and a global
sine cycle (c/cS) added to the mouse force so the strands slowly breathe in and
out over roughly 200-second cycles. Strength: smoother 120fps motion. Weakness:
a duplicate study of #18, and the config object looks vestigial (fields like
NUM_PARTICLES and NUM_STRANDS appear unused in the visible code).

### 20. "Untitled" (jZvqrO): Twig spears

Same engine, but strand width 2.4, no tip dots, and the final segment of each
strand swells (w=(w+1)*1.4), so each strand tapers into a spear or leaf tip. Reads
as a dandelion or pincushion starburst. Keeps the 120fps and sine breathing from
#19. Sharper silhouette and confident botanical linework. Weak: thick strands
pile into visual noise near the center, and the central blob is less elegant
without the tip dots.

### 21. "#Codevember 6: Storm" (yPaaoG): lightning via midpoint displacement

Raw Canvas 2D, three layered canvases composited with 'screen' blend. The bolt is
classic midpoint displacement: 8 subdivision iterations between two endpoints,
each new midpoint offset perpendicular by a random amount with decreasing range
200/(i*i+1). The bolt strokes in flickering blue-violet hsla (hue around 238)
with width modulated by sin/cos of the frame step; every frame applies a
full-canvas blur plus a translucent background fill, giving phosphor-like fading
trails. Soft dark cloud blobs drift on a second layer. Interaction: mousemove
moves one endpoint, mousedown moves the other, and endpoints auto re-seed at
random. Palette: near-black teal (13,27,34) with a blue-violet bolt. Strengths:
genuinely stochastic bolt geometry, atmospheric glow, good layered compositing.
Weaknesses: the bolt sometimes exits the frame awkwardly, the clouds are crude
blobs, and heavy trailing can smear into murk.

### 22-25. The "experiment 992" DOM-grid series (no canvas at all)

Four pens share one trick: 400 DOM divs in a 20x20 grid, animated purely with
CSS. Each cell is a dark rounded square whose half-fill is a linear-gradient
rotated by the atan2 angle from a pointer point, plus a global cosine wave over
120 frames that animates fill heights and slight rotation. The result is a vortex
of half-filled squares rippling in concentric waves around the cursor,
near-black cells on off-white (#f4f4f4). Crisp, mesmerizing moire motion that is
cheap and smooth to render; but DOM-heavy, and at rest it is just a static grid,
so the effect only lives under mouse movement.

- **YrgWYQ "experiment 992-Br":** the half-fill squares described above.
- **JrzKEG "experiment 992-Fp":** same engine in blue (#28a); the gradient fill
  is vertical with the blue band positioned by cos(distance/170) plus the global
  wave, so columns of blue bars rise and fall in concentric waves radiating from
  the pointer, like an equalizer or waterfall. Clean and hypnotic, but the bars
  vary in only one dimension, so less dynamic range than its sibling.
- **MExeWZ "experiment 992-Pk":** each cell shows a diagonal stripe via a rotated
  linear-gradient (transparent 30%, #333 from 30.5% to 70%), producing
  parallelogram blades that all point at the cursor, like a school of fish or
  compass needles. Strong directional field, elegant vortex, minimal and graphic.
  Weakness: stripe clipping at cell edges can look choppy at some angles.
- **mBoPpV "experiment 992-[Beethoven]":** 600 divs at 60px cells; each cell a
  hard diagonal split (linear-gradient at the pointer angle, #333 50%, #f4f4f4
  50.5%) making two-tone triangle cells, a bold Op-Art pinwheel vortex radiating
  from the pointer (default focus at 150,150). High-contrast and very hypnotic
  under motion. Weaknesses: 600-node DOM is heavy, visible aliasing on the
  diagonal edges, strictly monochrome which limits depth.

### 26. "Zap zap" (NpogGr): plasma ribbons

Single canvas on setInterval(animate, 60ms). Each tick draws one
midpoint-displacement arc (8 iterations, the same 200/(i*i+1) falloff as the
Storm pen) between pt1, which follows the mousemove, and pt2, set on mousedown.
Stroke hue cycles with sin(step/30)*120+50 at 90% saturation, 70% lightness.
Each frame starts with a blur and a 0.17 fade, so past arcs linger as ghost
filaments; the live view shows a stream of neon yellow-green electric ribbons
sweeping across the dark teal field. Lovely plasma-ribbon motion, the trails
make arc history visible, and the code is simple and effective. Weaknesses: one
arc per tick can feel sparse, the hue cycle passes through muddy greens, and
nothing on the page hints that it is interactive.

## Cross-cutting observations

- Seeded random is a habit across the stronger pens. Reproducibility lets a good
  composition be kept; it also makes parameter exploration honest.
- Monochrome or two-color discipline does more for perceived quality than any
  algorithm choice. The pieces that sing are the ones with the strictest palette.
- Scorch reuses scaffolds with one parameter changed (the two "lines" pens, the
  two "cpc-generative-blocks" pens). A small series from one scaffold is a
  legitimate format, not a shortcut.
- The final 9 pens add two more series to that point: three Twig radial pens
  and four "experiment 992" DOM-grid pens. Across the whole body of work, the
  series itself is the signature device: vary one parameter, publish the
  family.
- Pointer-driven CSS gradient fields (the experiment 992 trick: atan2-rotated
  linear-gradients on divs, global cosine wave) are a legitimate generative
  technique with zero canvas code. GPU-cheap, smooth, and sharp; the tradeoff
  is DOM weight and no idle-state composition.
- Midpoint-displacement lightning recipe worth stealing: 8 iterations,
  200/(i*i+1) offset falloff, each frame a blur plus a translucent fade for
  phosphor trails, composited 'screen' over drifting background layers.
