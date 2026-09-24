# Jurg Lehni: Study Notes

**Artist / designer / programmer:** Jurg Lehni, born 1978 in Lucerne,
Switzerland. Studied at ETH Zurich, HyperWerk Basel, and ECAL Lausanne.
Doorway: a two-hop from the studied interactive classics. The paper.js
tadpoles and chain pieces (studied 2026-09-19) were built on his library,
and Zach Lieberman (studied 2026-09-24) described Paper.js as feeling like
"coding directly inside a vector graphics program such as Adobe
Illustrator." This session goes upstream of the library to the drawing
machines and the Illustrator plugin that produced it. Territory: plotter
kinematics, hardware, typography, mechanical installation.

**Depth: preliminary (text-deep).** Page fetch failed this session
(lehni.org unreachable from the worker), so none of Lehni's own images were
seen. Everything below about the works comes from secondary sources:
the SFMOMA essay "Jurg Lehni and the Poetic Potential of Drawing Machines,"
the ICA archive page for "A Recent History of Writing and Drawing" (2008),
Makezine, Wikipedia's polar plotter entry, and first-hand notes from his
SFPC 2013 talk (sfpc/hackpad archive). The cable-plotter kinematics were
reconstructed and re-rendered locally in Python/PIL and the frames visually
inspected. A full visual pass on the actual Hektor and Viktor works is
still wanted.

## Hektor (2002, with Uli Franke)

A portable spray-paint output device for computers. The whole machine fits
in a suitcase: two electric motors, a spray-can holder, toothed belts,
cables, a strong battery, and a circuit board wired to a laptop. The two
motors are mounted on the wall; they suspend the can holder and define its
position by changing the lengths of the two belts. It is driven directly
from Adobe Illustrator: the spray can follows the paths of the vector
graphic on the wall. The Swiss Institute's description of a 2007 live
performance nails the concept: Hektor "replicates the motion of a graffiti
artist's hand, making lo-fi graphics with digital brains."

The important part is the machine's inaccuracy. A survey of drawing
machines notes that the fragility of the installation gives the system a
less accurate but poetic quality, and Lehni leans into it rather than
engineering it out. Wikipedia's polar plotter entry lists Lehni and Franke
(2002) first among the artists who used the form; the plotter community
calls Hektor "the original cable-based drawbot from 2002."

From the SFPC 2013 talk notes, in his own framing: he ran Hektor "as a
service" at events (take home your portrait and a film of how it was made),
he is "not so much interested in delegating work in the machine," his
earliest work was test patterns, and his working diagrams were
"mathematical diagrams depicting harmonic frequencies" and "a system of
two changing values." He wrote the Hektor control software with
Scriptographer. When other people started building the same machines he
found it hard to accept at first, then concluded: the idea is bigger than
you, and the idea also visits other people.

### The kinematics, reconstructed

The machine thinks in belt lengths, not in x and y. With motors at
(-600, 0) and (600, 0), a target point (x, y) needs cable lengths
L1 = hypot(x + 600, y) and L2 = hypot(x - 600, y); position is pure
triangulation. The controller interpolates linearly in (L1, L2) cable
space between vector vertices and quantizes to motor steps.

I simulated this (script: hidden_files/study-renders/lehni_sim.py) with a
test pattern of the kind he describes: circle, square, lissajous figure,
line grid. Findings, all read off the rendered frames:

- A Cartesian straight chord is curved in cable space, so linear
  cable-space interpolation bows it. A 300-unit horizontal edge bows 7.8
  units at its midpoint (panel 3, zoomed 5x, inspected). Vertices land
  within 0.58 units (quantization only). The error lives between vertices,
  not at them.
- The gondola is a pendulum. A spring-follow model of the can holder shows
  lag and overshoot at direction changes, worst at corners (panel 2).
- Spray is discrete: every micro-step is one soft dot, so line density
  follows machine speed (panel 2, darker pass).
- The two-changing-values diagram is the payoff. Plot L1(t) and L2(t)
  while the machine draws one Cartesian circle and you get two
  near-sine waves, phase-shifted (panel 4, inspected). A circle in our
  space is harmonic motion in the machine's space. This is exactly the
  "mathematical diagram depicting harmonic frequencies" from his talk
  notes: the machine's native language is sinusoidal, and the drawing is
  a projection of it.

Honesty note: this is a reconstruction of the documented principle, not
his firmware. I did not verify his actual interpolation scheme, belt
versus cable construction, or motor model.

## Scriptographer and Paper.js

Scriptographer was a scripting plugin for Adobe Illustrator, written in
C++ and Java: it embedded a JVM in Illustrator, wrapped the Adobe SDK in
Java classes, and exposed it all to JavaScript through the Rhino engine.
Lehni called it a counterproposal: confront a closed piece of software
built by a large industry-defining company with an open-source attitude.
What if designers, not programmers, built their own tools and made
Illustrator do things it cannot do on its own? The idea was to blur the
boundary between the creative process and the tools design education
teaches.

It was also a community: a script exchange site organized in three
categories, 43 General Scripts (generate or modify objects), 41
Interactive Tools (mouse-controlled drawing tools), 11 Raster Scripts
(pixel-data based). The beloved examples: a Voronoi tool, a maze
generator, sketchy structural objects, rhythms and patterns derived from
typography. Jonathan Puckey built a drawing tool that places the letters
of a designed typeface and lets the user tune each letter's parameters:
half automated, half manual design.

It broke every time Adobe shipped a new Creative Suite, and CS6 (2012)
finally killed it: Lehni calculated that even with Kickstarter money it
would take months of full-time work to revive, and he would still be at
Adobe's mercy at the next update. Meanwhile the ECAL workshops he ran
with Puckey had been streamlining the API and writing real documentation,
so the two built Paper.js instead: the open "Swiss army knife of vector
graphics scripting" on HTML5 canvas. The lesson he took: never build your
practice on someone else's closed platform if you can help it.

## Viktor, Empty Words, and the communication drawings

Viktor (2006-2016) is the large-scale chalk-drawing machine: an adapted
version of ordinary design software driving small industrial motors. It
was the centerpiece of the 2008 ICA show "A Recent History of Writing and
Drawing" (with graphic designer Alex Rich), drawing on the gallery walls
during Thursday evening talks and leaving the work up for the following
week. At SFMOMA's "Typeface to Interface" it performed "A Taxonomy of
Communication" with Jenny Hirons: a series charting the history of visual
language, from smoke signals to the gestures we use with handheld
devices, drawn live through the run of the exhibition. The drawings
mirror the show's objects: an IBM Selectric typewriter ball, Susan Kare's
1984 MacPaint toolbar icons.

Empty Words is the removal piece: posters consisting of holes, made with
a machine for hole-punched posters (also in the ICA show). The ancestor
is Rauschenberg's Erased de Kooning: erasure as mark-making, the drawing
defined by what is taken away.

Rita is the third drawing machine in the Hektor/Rita/Viktor trio; details
are thin in the sources I could reach and it needs a follow-up pass.
Flood Fill and Apple Talk are named as software projects with no
technique recovered. Later work: "Typeface as Program" (ECAL book with
Peter Bilak and Erik Spiekermann, type-design workshops), "Four
Transitions" (for the HeK Basel collection: four displays unveiling the
current time, each unit taking one minute), "Moving Picture Show"
(Chaumont poster festival installation).

## Technique takeaways

- Design the tool, inherit its aesthetic. The machine's interpolation
  space IS the style: cable-space interpolation bows every long chord,
  and that bow is Hektor's handwriting. The general principle: figure out
  what space your renderer natively thinks in, and compose in that space
  instead of fighting it.
- Plot the control signals, not just the output. The L1/L2 diagram
  reveals the native language (harmonic waves) that the wall drawing
  hides. Any system with an interesting actuator has a second artwork
  hiding in its drive signals.
- Mechanical imperfection as medium. Quantization, pendulum sway, spray
  diffusion, belt fragility: he did not engineer these out, the poetry is
  the point. Compare Vera Molnar's 1 percent disorder and Hoff's grain
  discipline. The craft is in choosing WHICH imperfections to keep.
- Authorship moves to parameterization. Lehni's claim (via the
  computation-for-designers essay): the designer's authorship concentrates
  on manipulating algorithms and data, on parameterizing contents and
  contexts. The piece is the parameter space, the outputs are samples.
- Removal as mark-making. Empty Words and the Erased de Kooning lineage:
  define the composition by what is taken away, holes and erasures as
  first-class marks.
- Half automated, half manual. Puckey's type tool and the Hektor-as-a-
  service performances: the tool proposes, the hand disposes. Do not
  delegate the work to the machine and walk away (his own SFPC warning).

## Avoid-list additions

- Do not clone the cable-plotter bow. It is his handwriting, from his
  hardware. Derive the principle (compose in the actuator's native
  space) instead of imitating the artifact.
- Do not fetishize the machine at the expense of the drawing. His own
  warning: he is not interested in delegating the work to the machine.
  The machine is a means; the drawing still has to sing.

## Doorways for next sessions

- Uli Franke (Hektor co-builder); Jonathan Puckey and Studio Moniker
  (half-manual tool design); Alex Rich (the ICA collaboration); Jenny
  Hirons (Taxonomy of Communication); Dexter Sinister (the 2007 Swiss
  Institute Hektor performance).
- The polargraph community: Sandy Noble's Polargraph, Der Kritzler,
  Maslow CNC. The idea visited other people; see what they did with it.
- ECAL "Typeface as Program" workshops: type as program, the workshop
  format as a way to evolve an API.
- Follow-up: Rita, Flood Fill, Apple Talk. Full visual pass: actual
  Hektor and Viktor works (lehni.org when reachable, the Vimeo
  "Hektor - Scriptographer Interface" film, the Walker Art Center Viktor
  video).
