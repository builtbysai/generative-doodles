# Vera Molnar - Deep Study Notes

**Date:** 2026-09-23 (study pass)
**Artist:** Vera Molnar (1924-2023), Budapest born, Paris based. Founder of
generative art before the term existed.
**Hop path:** Tyler Hobbs deep study, into his cited influences.
**Depth:** deep. Six (Des)Ordres pieces plus full-size single piece visually
inspected; four Interruptions pieces inspected; Hypertransformation (1 of 2)
inspected at full resolution. Local re-render of the (Des)Ordres recipe in
p5.js, visually inspected. Lettres de ma mere, Hommage a Durer, and Themes
and Variations are text-deep from museum and press sources; their images
were not visually inspected this pass.

## Who she was, in technique terms

Molnar spent 1959 to 1968 doing algorithmic art BY HAND, her "machine
imaginaire" method: rule systems strict enough to execute on paper with a
ruler and a steady hand, a decade before she got computer time. That is the
discipline test worth copying. If your rule needs a computer to be
interesting, the rule is weak. If you can run it by hand, the computer only
makes it faster.

In 1968 she got access to a Sorbonne computer and a plotter. She learned
Fortran and Basic, fed punch cards, waited several days for results. She
co-wrote the "Molnart" software with her husband, artist Francois Molnar.
Founding member of GRAV. Ars Electronica Golden Nica 2018. Venice Biennale
main show 2022. Died December 2023 at 99, still working.

## Works visually inspected

**(Des)Ordres, 1974.** Six pieces on the DAM page, plus one at 1200px full
resolution. Grid of cells, each holding concentric squares in black ink.
The piece I studied close is roughly 20 columns by 17 rows. Most cells are
near-perfect: three to five clean nested squares with a faint tremble at
the corners. A few cells are "storm" cells: heavier corner jitter, more
rings, darker ink, almost tangled. Some cells carry a single sparse ring.
Signed "V. MOLNAR" bottom right, inscribed "DE LA SERIE (DES)ORDRES/1974"
bottom left. The V&A holds E.271-2011, a 20x20 grid in colored inks (pink,
red, green, orange, yellow, purple, blue), squares of different sizes set
within one another, described as "jostling", on Benson France paper with
the sprocket holes still attached. The DAM text: concentric squares
"randomly disrupted in order to highlight the contrast between order and
disorder and create tensions in the orthogonal structure, as if the squares
were subject to a vibrating force." The title is a pun between "desordres"
(disorders) and "des ordres" (some orders): inside the apparent mess sits
an underlying logic.

**Interruptions, 1968-1969.** Four pieces on the DAM page. A grid covered
with equal-length straight lines, each randomly rotated, producing a dense
woven texture. Then the "interruptions": random sections where lines are
erased, leaving voids shaped both by the missing lines and by the lines
around them. One piece shows a large white void blooming in the middle of
the weave. The V&A label on Interruptions (E.269-2011, 1969) says she ran
the series as an iterative process: each new work slightly modified the
algorithm of the one before, exploring a range of possibilities. That is a
working method, not just a look: tweak the program between pieces, let the
series walk the parameter space.

**Hypertransformation (1 of 2), 1974.** In the Bre Pettis collection
(PION.2018.004), 23x23 cm, ink on paper. About twenty nested concentric
squares, but several inner squares are rotated out of alignment, drawn as
one continuous path, the pen never lifting. Pettis wrote that he likes the
series because it tells the story of "almost perfect." That phrase is the
whole technique: perfection held, then strained.

## Core techniques, as stealable recipes

**Disorder as rare localized events, not uniform noise.** This is the
signature move and the one most re-renders get wrong. Uniform jitter over
everything reads as mush. Molnar's grids are mostly orderly; the disorder
lands in a few cells. Her titles name the doctrine outright: "1% de
desordre" (1976), and the late "2% of disorder in co-operation" (2022),
which she expanded into the 2023 Sotheby's project. The dose is the art.
Budget the disorder, spend it in events, let the surrounding order make the
events legible.

**One grid, one motif, one swept parameter.** Nested squares, parallel
lines, single squares. The complexity comes from the variation, never from
the inventory. She explored simple forms for sixty years and never ran out.

**Erasure as a drawing tool.** In Interruptions the voids are not
background; they are the figure, shaped by absence. The technique: draw the
dense field first, delete in shaped regions, and let the boundary lines do
the compositional work.

**The continuous pen.** Hypertransformations are drawn without lifting the
pen, so rotation and drift accumulate along one path. In code terms: do not
draw N independent squares; draw one path whose state (rotation, offset)
evolves as it goes. The tremble becomes a narrative.

**Iterate the algorithm between pieces.** A series is a walk through
parameter space, one tweak per piece. Molnar did this by hand in 1969.
Every seed in a modern generative piece can be a step in such a walk, but
the walk should be curated: change one thing, look, change one more.

**Hand plus machine.** Lettres de ma mere (1981-1990): she fed her mother's
handwriting through the plotter into Twombly-like scribbles, a formal
etude of crescendo left to right, then overlaid her own freehand dark-blue
zigzags (the "contre-ecritures"). Two registers on one sheet, machine
precision under human wobble. The collision of the two is the piece.

**Color as a separate dose.** The black-ink pieces are the backbone; the
colored (Des)Ordres stay within one pastel family per piece (or a
restrained rainbow of plotter inks). Color never carries the structure;
the structure is always the geometry. Add color the way she added disorder:
measured.

## What makes it sing

Restraint. The trembling line. Order that is interesting because it is
almost failing. Her line: "I love order, but I can't stand it. I make
mistakes, I stutter, I mix up my words." The plotter is the order, the
stutter is hers. What fails in lesser hands is the courage to keep the
motif dumb: squares, lines, grids. Because the motif is dumb, the
variation is loud.

## Overdone, per this study (avoid-list additions)

- Uniform perlin jitter over a grid. The default p5 sketch trope. Molnar's
  lesson is the exact opposite: localize the chaos.
- Rainbow palettes on structural geometry. If the geometry is doing the
  work, color should be one family, near-monochrome, or absent.
- "Generative" as random-everywhere. Her randomness is always a named
  quantity (1%, 2%) with a named target.

## Local re-render

Built a p5.js study of the (Des)Ordres recipe: 12x14 grid of concentric
squares on warm paper, seeded RNG. Every cell gets a micro-tremble
(corner jitter ~0.6% of cell size); 4.5% of cells become storm cells with
heavy jitter (6-13%), extra rings, and darker, thicker strokes. Rendering
confirmed the key dynamic: the storm cells read as accidents the
composition survives, and the piece stays in the family of the original.
Files: hidden_files/molnar-study/sketch.js, render at /tmp/molnar_study_render.png.

## Doors onward

- **Martin Grasser**: co-author of Themes and Variations (2023). Also the
  QQL collaborator. A systems typographer; the letterform-to-geometry door.
- **Jean-Pierre Hebert and Roman Verostko**: the "algoristes" named as her
  direct inheritors. Plotter lineage, one hop.
- **Frieder Nake, Manfred Mohr**: the contemporaries, same era, different
  answers to the same machines.
- **Themes and Variations mint mechanic**: sequential, where the background
  of piece N informs the foreground of piece N+1. A chain-composition idea
  no piece in the doodles practice has tried yet.
