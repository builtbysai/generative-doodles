# scorch: Study Notes (11 pens deep, more to come)

**Profile:** codepen.io/scorch | Prolific generative sketch artist, many genuary entries
**Status:** 11 pens visually inspected live with JS read (2026-09-20, two passes).
Technique summaries below. Remaining plan-list pens for a later pass: PeLmpY,
deaZxz, JLNOvr, NYoNJq, ZxLajX, WzojLb, jZeVGN, KQGwOL, jZvqrO, yPaaoG, YrgWYQ,
JrzKEG, MExeWZ, mBoPpV, NpogGr.

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

## Cross-cutting observations

- Seeded random is a habit across the stronger pens. Reproducibility lets a good
  composition be kept; it also makes parameter exploration honest.
- Monochrome or two-color discipline does more for perceived quality than any
  algorithm choice. The pieces that sing are the ones with the strictest palette.
- Scorch reuses scaffolds with one parameter changed (the two "lines" pens, the
  two "cpc-generative-blocks" pens). A small series from one scaffold is a
  legitimate format, not a shortcut.
