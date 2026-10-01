# №8934 · Family of Blobs — process notes

Dated 2026-06-27 · Default seed: 272

## Concept

The assignment as a piece. One seed grows one blob skeleton: five to seven
anchors placed around a ring, with a smooth closed curve threaded through
them. Four cells then build that same blob four different ways, in the same
ink on the same paper, and the comparison is the composition.

1. Harmonic outline. The skeleton curve is sampled at 256 points and its
   complex Fourier descriptors are truncated to harmonics −8..8. What
   survives is the smooth temperament of the blob, drawn in ink beside a
   dotted trace of the original curve.
2. Differential growth. The same outline is resampled into a ring of
   points that push their non-neighbors away, divide when stretched, and
   drift outward until the front carries about 1.4 times the length it
   started with. The extra length has nowhere to go, so it wrinkles.
3. Isocontours. The anchors become gaussian hills in a seeded scalar
   field, plus one broad dome at the center. Marching squares traces three
   heights: a strong shoreline and two lighter levels inside it. Faint
   sampled dots show the field the shoreline came from.
4. Metaball union. The anchors move halfway toward the center and become
   fence circles. The implicit surface f = Σ r²/d² is traced at f = 1,
   where the circles melt into a single edge. The fences stay visible as
   dashed construction.

Every cell shares the same grammar: a dashed one-radius guide circle, the
same faint dotted baseline grid across the plate, small-caps labels in one
voice, one quiet clause under each name. Clicking anywhere reseeds a fresh
family from the same four strategies.

## Family

Comparison plates and method portraits. Nearest relative in the gallery
is №8961 Five Methods, which rebuilds one field five ways to compare
rendering methods; this piece instead asks how one shape gets constructed
in the first place. Golan Levin's assignment-driven exercises informed the
frame: state the rule plainly, then let the rule be the picture.

## Differentiation

Nothing else in the gallery is a 2x2 construction plate, and no other
piece puts four shape-making algorithms side by side on one skeleton. The
blob-by-formulas family is new: a Fourier-truncated outline, a genuinely
simulated growth front, marching-squares isocontours, and an implicit
metaball union, all reading as siblings because they share one seeded
skeleton, one ink, one paper, and one annotation voice.

## What got iterated

The growth cell took three honest failures. First pass ballooned into a
solid black disc; second pass stayed a tame circle; third pass scribbled
the whole cell. The scribble turned out to be an integrator bug, found by
running the simulation headless in Node and watching the perimeter: the
separation force between near-coincident points was moving vertices
farther per step than the edges were long, so the ring exploded into
random chords. Fixed by clamping each step to a small maximum move and
fading the separation force to zero at contact. Smoothness was then
controlled by a length budget instead of guesswork: the front grows until
its perimeter reaches about 1.4 times the base outline, then relaxes.
Finals checked at seeds 272, 1, 7, 42, 1234, 98765, and 555: in every seed
each cell is unmistakably its own strategy, nothing leaves its cell, and
no shoreline touches the label text.

## Gallery note suggestion

*One seed, one blob, four honest ways to build it.*
