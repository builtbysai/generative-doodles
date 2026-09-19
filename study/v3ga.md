# Julien Gachadoat (v3ga): Study Notes

**Site:** v3ga.net (works index + About read in full) |
**Profile:** x.com/v3ga (not attempted; X is login-walled for all artist profiles in this project, and his own site carries far more) |
**Secondary:** Galerie Data Sinusoïdes exhibition PDF (algorithm description), Gene Kogan research card, Kate Vass / Verse / Vetropages

**Depth:** deep. Four artworks visually inspected in full resolution
(Structures-000, Umwelt-000, Radiance testnet-001, Haze-01 Tribute-HWF)
via direct image reads; v3ga.net works index and About page read in full;
the Cascades/Sinusoïdes algorithm confirmed from the Galerie Data
exhibition text describing the construction.

## Who he is

Julien Gachadoat, working as v3ga, from Bordeaux, France. He grew up in
the 90s demo scene making visuals with code, and has spent the years
since building his own creative tools on simple graphic rules. He
co-founded the interactive studio 2Roqs, has taught creative coding for
15+ years (Domestika courses, live-plotting workshops), and works
primarily in Processing/openFrameworks driving an AxiDraw pen plotter:
0.5 mm black Uni-pin on Fabriano bristol paper, physical ink on paper.
Since 2021 he has also worked on-chain: Radiance on ArtBlocks (2021),
Umwelt and Mineral on Feral File (curated by Casey Reas, 2021 and 2023),
Haze as a tribute to Herbert W. Franke on objkt (2022), Structures on
Plottables (2023, 1/1/256), a DiceGL collaboration with Vera Molnár
(2023), and the Noir Orion sketchbook (2025, 63 drawings exploring the
gradual transformation of a circle). His stated lineage is the 60s-70s
computational pioneers: Vera Molnár, Herbert W. Franke, Manfred Mohr.

## Core techniques

### Modulated sinusoid fields (Sinusoïdes / Cascades / Falling)
His signature construction, described precisely in the Galerie Data
exhibition text: a set of vertically modulated sinusoidal waves whose
amplitude and frequency vary as you move from the top to the bottom of
the drawing space. In Falling (2020) the sinusoids are superimposed with
modulations in pitch, so peaks and troughs oscillate differently, each
carrying its own frequency and amplitude signature. The interstices
between two sinusoids are then filled with vertical stripes whose
orientation and density follow spatial rules plus random numbers, and
noise functions add microvariations that bring subtle nuance to the
overall organization. Visually this reads as engraved waves, tonal
bands emerging purely from line density. It is flow-field thinking
reduced to one dimension: the wave is the field, the hatching is the
rendering.

### Combinatorial motif grids (Structures, Plottables 2023)
Structures-000, inspected at full resolution, is an 8x8 isometric grid
on deep blue, white linework, each cell holding one primitive from a
small motif vocabulary: offset square stacks, stepped pyramids,
wireframe Gaussian hills drawn as nested arcs, concentric arc fans,
triangles, hatch blocks, lone diagonal strokes. The series enumerates
256 states (1/1/256). The trick is that every motif is drawn with the
same uniform stroke and fits the same cell, so any random combination
stays coherent: the grid is the composition, the motif draw is the
surprise. This is a general long-form strategy: constrain the cell,
free the motif.

### Dense curvilinear line-field panels (Umwelt, Feral File 2021)
Umwelt-000 is a 3x4 panel grid, white lines on black, each panel a
different warped line field: bent grids, swirling moiré zones,
crosshatched noise regions, calm diagonal flows. Each panel is one warp
function applied to a regular line set; the piece is a survey of warps.
Tone comes entirely from line density and crossing angle. The panel
frame keeps chaos legible: twelve small studies read as one calm
composition.

### Rectilinear labyrinth paths (Radiance, ArtBlocks 2021)
Radiance-testnet-001 is white on blue orthogonal linework: spiraling
rectangular corridors, nested right-angle paths that turn like a
circuit-board labyrinth, some zones dense with parallel tracks, others
open. The logic is space-filling path routing under rectilinear
constraints: draw a corridor, turn at boundaries, nest. It reads as both
maze and chip layout, and the uniform stroke keeps hundreds of parallel
lines from turning to mush.

### Crosshatch tonal fields (Haze, tribute to Herbert W. Franke 2022)
Haze-01 is black on white, no blue: fine hatching laid at multiple
angles in overlapping zones, building smoky tonal masses out of nothing
but straight strokes. Where hatch sets cross, tone deepens; where they
run parallel and sparse, the paper breathes. It is the most painterly
of the inspected pieces and the clearest statement of his core move:
tone from density, form from accumulation, never a fill.

### Random-walk paths (Déambulations, 2024)
Named for wandering: path/random-walk compositions, the line itself
doing the exploring. Part of the same family as Structures, one step
looser.

### Dice-driven composition (DiceGL, with Vera Molnár 2023)
Composition parameters taken from literal dice rolls, built for the
collaboration drawing "Deux générations pour un sommaire". Randomness
as protocol, not as decoration: the dice are the seed ritual, and the
ritual is the point. It connects directly to Molnár's own dice pieces.

### Recoding as study (Delahaye books, p5.js)
He recoded Jean-Paul Delahaye's 1985 books "Dessins géométriques et
artistiques" into p5.js and published them on GitHub. Study by
reimplementation: the same method this project uses, made public.

## Palette and composition

Monochrome discipline. Physical work is black ink on white paper, the
native constraint of the plotter. Digital series move to white on deep
blue (Structures, Radiance) or stay black on white (Haze). Limited
palettes appear only in silkscreen editions. Never gradients, never
fills, never photographic anything. Composition is grid-first:
full-bleed fields, panel grids, isometric cells. The paper margin is
part of the piece on physical work.

## Mark-making and texture

Crisp, uniform-weight vector strokes, flat and unmodeled. Texture is
purely the accumulation of clean lines: Moiré from overlapping regular
sets, tone from hatch density, shimmer from offset arc families. It
feels engraved, like a technical drawing that learned to breathe.
Because the stroke never varies, the system has to do all the talking,
which is why his systems are so well built.

## What makes it sing

- The plotter constraint as style. One pen width, no fills, no undo:
  the limitation forces the algorithms to be interesting, and the
  physical ink gives digital work a warmth screens cannot fake.
- Simple rules, exhaustively explored. Noir Orion is 63 drawings of one
  circle transforming. He finds how deep a shallow idea goes.
- Lineage worn openly. Molnár, Franke, Mohr are cited, recoded,
  collaborated with, not just name-checked. The work sits in a
  tradition and extends it.
- The combinatorial grid. Structures shows how to make long-form
  generative work stay coherent: small motif vocabulary, strict cell,
  free combination.
- Teaching as practice. The Domestika courses, live plotting, and
  public recodings mean his techniques are documented by him, in his
  words, which is rare.

## Techniques to steal (not copy)

- Sinusoid fields with interstitial hatching: wave sets with varying
  amplitude/frequency/pitch, gaps filled with rule-driven stripe sets,
  noise microvariation on top
- Combinatorial motif grids: fixed cell, small primitive vocabulary,
  uniform stroke, random assignment per cell
- Tone from density only: crosshatch at multiple angles, no fills
- Warp surveys: one warp function per panel, grid of panels as the
  composition
- Rectilinear labyrinth routing: nested orthogonal corridors,
  space-filling path logic
- Dice-roll seeding as compositional protocol, stated openly
- Recoding historical pieces in p5.js as a study method

## What NOT to do

- Do not copy his motifs (the arc fans, the stepped pyramids). The
  pattern is the cell-plus-vocabulary system, not the shapes.
- Monochrome is his native tongue; across a whole gallery of our own
  work it would read as imitation. Take the density discipline, choose
  our own palette logic.
- His physical pieces are the point and the screen versions are
  documents of them. Do not mistake the PNG for the work: the ink,
  paper weight, and pen are compositional choices.
- The edition machinery (ArtBlocks, Plottables, objkt drops) is
  distribution, not technique. Study the algorithms, ignore the market.
