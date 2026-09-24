# Golan Levin: Study Notes

**Artist / educator:** Golan Levin, Professor of Electronic Art at Carnegie
Mellon University. flong.com (work 1994-2019). Doorway: cited next to
Anatoly Zenkov in the color lectures that anchored the meodai/Zenkov
thread. This is the territory break after a long run of color tools: a
gestural-interactive artist whose first pure-generative statement is a
long-form Art Blocks project.

**Depth: deep on text, local re-render inspected; his own images not seen.**
The full Art Blocks Cytographia interview read end to end; the flong.com
archive index catalogued; a four-plate blob-family re-render built from
the interview's technique descriptions and visually inspected at full
resolution. What I did NOT do: see his actual artwork. A fetch of his
GitHub "personal history of generative and computational blob research"
notes failed mid-session, and his live project pages were not visited.
So this is honest about what it is: technique extraction from his own
words plus a local reconstruction, not a visual study of the work. A
visual pass on Cytographia outputs and the flong project pages is still
wanted.

## Lineage: DBN, Maeda, Processing

From the Le Random interview: Levin came up through MIT's Aesthetics and
Computation Group under John Maeda, where Design by Numbers (DBN) was the
pedagogical tool, a deliberately constrained canvas (100 x 100 pixels,
grayscale). Maeda's idea was that stark limitations force insight. Casey
Reas and Ben Fry wanted bigger, colorful, useful: that became Processing.
Levin's *Yellowtail* (1998, originally "audiovisual gestural instrument")
has shipped as a Processing example sketch since 2000; he was one of the
first to teach with Processing (Columbia, Cooper Union, Parsons, fall
2000), feeding examples back to Reas and Fry. The throughline: simple
constraints as a teaching device, and gesture as the input that never
stops being interesting.

## The Audiovisual Environment Suite (1998-2000)

Five interactive instruments: Aurora (1999), Floo (1999), Yellowtail
(1999), Warbo (2000), Loom (1999). Per the fondation-langlois bio, each
has unique properties letting users "create related audio and visual
compositions through the gestures they make with their cursors": the
visual and aural dimensions are "deeply plastic, commensurably malleable,
and tightly connected by perceptually-motivated mappings." He performed
*Scribble* (2000) live at Ars Electronica as "colour-music." Later work
in the same family: *Dialtones (A Telesymphony)* (2001, a concert played
through the audience's own ringing cellphones), *RE:MARK* (2002) and
*Hidden Worlds of Noise and Voice* (2002) with Zach Lieberman, *Messa di
Voce* (2003, voice- and camera-responsive projection), *The Manual Input
Workstation* (2004, gestural drawing with hands in light).

The portable idea: cross-modal binding as a compositional material. Color
is not a decoration layered on a system; the same gesture parameter
drives pitch, stroke width, and hue together so the senses read one
event. That is the palette thinking to steal, not a swatch list.

## Teaching as research

Co-author (with Tega Brain) of *Code as Creative Medium* (MIT Press,
2021), an educator's handbook. Levin's stated method: "give provocative
assignments to my students as a way of causing interesting things to
happen in the world, and to advance the state of the art in how
code-based art practices are taught." His course sites (golancourses.net)
are public. This matters for the study because his best-known generative
work started as a class demo.

## Cytographia (Art Blocks, Jan 2024)

His Ethereum debut and, in his own words, his "first major generative
artwork that does not depend on user input to exist." Until now,
generativity "took a back seat to interactivity" in his practice
(the Augmented Hand Series shows a blank screen until someone puts
their hand in the box). Cytographia keeps the premise that an artwork
should be unique at every moment, but hands the surprise-generation to
algorithms instead of participants.

**What it is.** A long-form generative artwork presenting "illustrations
from an imaginary book about imaginary microorganisms." One-celled
creatures, hand-drawn engraving style, black lines on a pale ground.
Each cell is generated in full: anatomy and behavior, line quality,
nonsense labeling glyphs, ground details. The organisms grow and move
autonomously and respond to real-time input (clicks, touch, keys) via
simulations of flocking, differential growth, elastic physics, and fluid
flow. "If prodded, like any living creature, the artwork will do its
best to accommodate and restore its equilibrium."

**Construction details from the interview.**

- Custom vertex-shaded lines. "It was important to me that every aspect
  of the project reflect deliberate choices on my part; I felt strongly
  that I needed to make the lines my own, and not just rely on the
  expedient but bland line() commands." This is the headline craft
  lesson: line rendering is a signature, not a utility.
- Asemic glyphs: an asemic writing system unique to each token, letterforms
  loosely based on 16th-century typefaces by Ludovico degli Arrighi.
  Labels are generated, not typeset.
- Enlightenment-diagram grammar: dashed indicators, hachure, leader lines,
  borrowing from the visual language of scientific illustration.
- Recursive layout implementing Christopher Alexander's fifteen properties
  of living systems (from The Nature of Order, 2002): organelles with
  thick boundaries, strong centers and voids, smaller organelles nested
  inside to establish levels of scale, shapes smushed together to make
  interlocking spaces. Alexander served as "a constant guide."
- A "phallus detector." His freeform blob generator kept producing
  phallic shapes that also moved suggestively on their springy structure,
  so he built a culling pass. The honest lesson: generative QA is part
  of the algorithm, not an afterthought.
- References: Hooke's Micrographia (1665), Fry's Pantographia (1799),
  Haeckel's Kunstformen der Natur (1899), Serafini's Codex
  Seraphinianus (1981).
- It is plottable: signed editions on a vintage HP7475A pen plotter
  (0.28mm Uni-ball Signo on acid-free Canson, ~160x160mm). Vector-first
  construction gives a second life to the work.
- Time-based by design: "It doesn't accumulate a static image; rather,
  it evolves and changes perpetually." The hash determines a sequence,
  but the animation never loops, repeats, or comes to a standstill.

**Diagram, not painting.** "The particular problems of full-page
composition and color are not my concerns here." Mints are distinguished
by structure: component types, shapes, grouping, growth, behavior over
time. The framing is a deliberate refusal of the usual generative-art
obsession with full-bleed color fields.

## The blob assignment (Oct 2021)

Cytographia "got its kickoff as part of an assignment" in the fall 2021
*Drawing with Machines* course at CMU, a studio course on generative art
for robotic pen-plotters (the #PlotterTwitter scene). One shape unit,
with a nod to a Zach Lieberman investigation: "generate a family of
blobs." No single solution; "coding one's own blobs can be a deeply
personal and educational rite of passage for generative artists."
Levin made a pedagogical sketch to show his approach and never stopped.
The article's classroom photo shows student results: isocontour blobs,
differential growth blobs, implicit surface blobs, Bezier blobs.

This is a recipe for the seed file: one constraint, many constructions.
The "family" framing turns a single exercise into a comparative study.

## Local re-render: Familia Bloborum

Four plates, each a student-strategy construction, drawn with
hand-built vertex-shaded lines (triangle strips with per-vertex
width shaped by a calligraphic rhythm), hachure ticks, dashed
indicators, asemic glyph labels, in ink on a pale ground.

- Plate I: harmonic blob (radius from three sine terms). The
  calligraphic stroke reads instantly: width swells and thins around
  the curve and the line stops looking like a library call. This was
  the single biggest quality lever in the whole render.
- Plate II: differential growth (noise-pushed node chain, subdivided
  when segments stretch). Grew wide and flat with a spike; it needs
  damping or an attraction back toward centroid, or it wanders. The
  "eye" dot reads, oddly charming.
- Plate III: isocontour over a turbulence field (marching squares).
  Many separate islands at the chosen threshold; reads as a topo map,
  not a creature. Threshold choice is everything here.
- Plate IV: twin metaballs at the merge threshold (implicit surface,
  marching squares). Clean, the merging neck is the money detail.

Honest notes: the hachure ticks point outward on Plate I instead of
inward (normal sign depends on winding; visually fine either way).
The asemic glyphs read as scratch marks at small size; they need
Arrighi's actual slant and contrast to feel like writing. The plates
work as a family precisely because the constraint (ink, paper,
grammar) holds while the constructions differ: Levin's diagram
framing, confirmed locally.

## What makes it sing

- Lines with deliberate character, built from vertices up. The refusal
  of the default stroke is the most imitable craft decision in the
  whole interview.
- Behavior designed first, appearance second. Equilibrium-restoring
  interaction (prod it and it settles back) is a richer interactivity
  than "move the mouse, things follow."
- The diagram frame: pale ground, one subject, annotation grammar.
  Constraint that reads as confidence.
- Alexander's properties as an executable checklist: thick boundaries,
  centers, levels of scale, interlock. It gives organic structure a
  vocabulary instead of vibes.

## Overdone / avoid

- The default stroke. After this study, canvas lineWidth looks like
  a placeholder everywhere.
- Full-bleed everything. Cytographia's strength is partly that it
  refuses the full-page composition problem; but that refusal only
  works with the diagram grammar to replace it.
- Generative systems shipped without a culling pass. The phallus
  detector is funny until you ship something that needs one.
- "Interactive" as cursor-following. Levin's bar: the system has a
  life of its own and the participant merely prods it.

## Doorways for future passes

- His GitHub notes on the personal history of generative and
  computational blob research (fetch failed this session; retry).
- The Le Random "Potentiality of Blobs" interview in full (only the
  DBN/Processing summary was read here).
- golancourses.net lecture notes and assignments (the color lectures
  that started this thread; Drawing with Machines materials).
- Yellowtail as a live Processing sketch: the gesture-to-audiovisual
  mapping in playable form.
- The Augmented Hand Series and Manual Input Workstation project pages.
- Zach Lieberman's blob investigation (the nod behind the assignment).
