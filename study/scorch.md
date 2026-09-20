# scorch: Study Notes (17 pens deep, more to come)

**Profile:** codepen.io/scorch | Prolific generative sketch artist, many genuary entries
**Status:** 17 pens visually inspected live with JS read (2026-09-20, three passes).
Technique summaries below. Remaining plan-list pens for a later pass: jZeVGN,
KQGwOL, jZvqrO, yPaaoG, YrgWYQ, JrzKEG, MExeWZ, mBoPpV, NpogGr.

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

## Cross-cutting observations

- Seeded random is a habit across the stronger pens. Reproducibility lets a good
  composition be kept; it also makes parameter exploration honest.
- Monochrome or two-color discipline does more for perceived quality than any
  algorithm choice. The pieces that sing are the ones with the strictest palette.
- Scorch reuses scaffolds with one parameter changed (the two "lines" pens, the
  two "cpc-generative-blocks" pens). A small series from one scaffold is a
  legitimate format, not a shortcut.
