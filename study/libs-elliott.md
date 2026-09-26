# Libs Elliott: Study Notes

**Date:** 2026-09-26
**Artist:** Libs Elliott (Elizabeth Elliott), Toronto. libselliott.com. Textile
artist and fabric designer, OCAD Material Art and Design, quilting since 2009.
**Doorway:** territory break into textile, the one medium the study queue never
touched. Hop from the plotter lineage (Polargraph/Melt, Lehni cable plotters):
stitches as strokes, the quilt grid as a program.

**Depth: deep.** Her about page and studio-notes pages read end to end, the
2016 Andover Fabrics interview read end to end, the 2013 Gizmodo piece read in
full, the Perth Modern Quilt Guild workshop page read in full, two quilt
images visually inspected at full res (a busy pink/orange/black improvisational
triangle quilt, 1000px; "Embrace the Chaos", 1500px). Her Processing code is
not public, so the generator mechanics are reconstructed from the work and her
own descriptions. Noted honestly.

## The practice: quick gratification of code, slow craft of cloth

Her own formulation, from the about page: in 2012 she collaborated with artist
Joshua Davis, who gave her customized Processing code for designing quilts.
She plays with palettes, simple geometric shapes, and variables in the code to
generate random compositions, then adjusts in Illustrator, then sews. The
Perth guild workshop page puts it plainly: her quilts are randomly designed
using Processing from simple geometric and traditional quilt block shapes.

The idea that survives everything: the computer proposes, the hand disposes.
Generation is the cheap part (endless permutations, addictive). Translation
into cloth is the expensive part (cutting, piecing, quilting), so the
generator acts as a taste filter: only compositions beautiful enough to wrap
herself in get made. The constraint of the medium (a quilt must hold together,
must be sewn) is the quality control that keeps the randomness from being
slop. That is a design principle we can steal: couple a fast generator to a
slow expensive medium, and the slop filters itself.

## The reconstructed generator (from "Embrace the Chaos")

The ETC quilt is unmistakably a program output, and the program is legible
from the pixels:

- 6x6 grid of half-square triangles. One half of each cell is always
  white/cream, the other is colored.
- Diagonal orientation random per cell, both slash directions, roughly even.
- Colored half: one hue family (blue), VALUE ramped by row: pale ice blue at
  the top rows, deep navy at the bottom, mid grays scattered through.
- Rare all-white cells break the rhythm (about 1 in 16).

Re-rendered locally in Python/PIL from that spec and visually inspected. The
mechanic confirms: random diagonal orientation plus a row-correlated value
ramp produces the emergent diagonal flow and the calm-to-dense descent. My
render came out choppier than hers (grays too frequent, ramp too jittery),
which tells me her ramp is smoother and her gray placement more deliberate,
or she curates outputs and only sews the good seeds. Either way the lesson
holds: the generator is three rules, the curation is the art.

## The wild mode: "if triangles had sex"

The second quilt (pink/orange/black, polka dots, olive prints, black
negative-space bird shapes) shows her other pole: dense improvisational
triangle piecing where the negative space between colored triangles resolves
into bird-like black silhouettes. This is the Gizmodo 2013 "kinky geometric"
work. Technique reading: same triangle vocabulary, but instead of a grid of
HSTs the generator (or her Illustrator pass) lets triangles overlap and
collide, and the EYE completes the birds from the black ground. Palette is
maximal: hot pink, safety orange, black, olive, polka-dot whites. What makes
it sing is the figure/ground flip: the black shapes are the leftover space,
yet they read as the subject.

## Controlled chance as a physical practice

Her recent Kaleidoscope Quilt workshop drops the computer for the same idea
in analog: dice and bingo chips randomize a library of block patterns, then
mirroring folds the randomness into a kaleidoscope quilt. This is the same
generator discipline with the machine removed: constrain the vocabulary
(one block library), randomize the arrangement (dice), apply one strong
transform (mirror). The workshop description names the real balance: begin
with chance, end with vast possibilities, then rein it in. Every generator
we build should have an explicit rein-it-in step: curation, mirroring,
value ramp, binding. Randomness is the beginning of the composition, not
the composition.

## What to steal, what to avoid

Steal: the three-rule generator (vocabulary, randomize, one transform); the
row-correlated value ramp over a random grid; the fast-propose slow-dispose
coupling; dice as a legitimate random source with a fixed vocabulary.
Avoid: pure-uniform randomness with no ramp or transform (it reads as noise,
not design); palettes without a value structure (her blue quilt works because
value, not hue, carries the composition); mistaking the generator output for
the finished piece (she still curates, adjusts in Illustrator, and sews).

## Cross-links

- Polargraph/Melt: stitches as pen strokes, the quilt as a plotter program.
- Anni Albers (same session): the textile ancestor; Libs is the
  Processing-era descendant of the draft-as-program.
- Genuary prompts: several prompt families (grids, triangles, value ramps)
  map directly onto quilt-block generators.
