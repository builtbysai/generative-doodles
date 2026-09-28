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

**Depth: deep (visual pass 2026-09-28).** Preliminary text pass 2026-09-24
(see kinematics section below) plus this visual pass: full SFMOMA essay
"Jurg Lehni and the Poetic Potential of Drawing Machines" read end to end,
full 2020 postdigitalgraphicdesign interview read in the Hektor/Scriptographer/
Paper.js sections, and 8 images visually inspected at full res: Hektor
installed on a gallery wall drawing a spray rosette (SFMOMA, 1024px), Hektor
live at the Swiss Institute 2007 (Core77), Hektor writing "Design and the
Elastic Mind" at MoMA 2008 (1000px), Viktor drawing on a black ICA-style
wall (Makezine), Viktor's chalk mind-map at SOMArts 2014 (SFMOMA, 1024px),
Lehni training Viktor's gondola by hand (SFMOMA, 1024px), and the
Scriptographer palette/console inside Adobe Illustrator (SFMOMA, 1024px).
One image-search hit for Viktor turned out to be Tinguely's Metamatic No. 13
(SIK-ISEA); excluded, not Lehni. lehni.org is dead and archive.org was
offline in-session, so no pages from his own site were seen.

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

## Visual pass 2026-09-28: the works, seen

### Hektor, finally seen

The SFMOMA install photo is the single most informative image of Hektor
in the wild. The machine hangs on a gallery wall drawing on a taped-up
paper sheet: a black spray rosette of short dashes spiraling outward, the
spray-can gondola caught mid-drawing at the rosette's right edge, two
belts running up to small motors at the wall's top corners, the
"HEKTOR OUTPUT DEVICE" suitcase on the floor, and a laptop beside it
showing the same rosette as clean blue vector lines. Screen and wall in
one frame: this is the anti-WYSIWYG as a photograph. The dashes are
Hektor's test-pattern vocabulary (his earliest work was test patterns),
and each dash has soft spray edges, slightly uneven density, the line
carried by dot accumulation rather than a continuous stroke.

The Core77 photo (Hektor live at the Swiss Institute, New York, 2007)
shows the performance mode: red spray on a white wall, a large looping
harmonic form of interlaced ovals, the can in its cardboard holder at
bottom right, belts and cables, laptops and cable spaghetti on the floor.
The loops read as "mathematical diagrams depicting harmonic frequencies,"
the phrase from his SFPC talk notes. A machine that draws sine waves
because its native language is sinusoidal.

The MoMA 2008 photo ("Hektor writes out the name of the exhibition
Design and the Elastic Mind") shows the handwriting at full strength:
four lines of black spray capitals, every letter wrapped in big round
overshoot loops, a diagonal transit line crossing the whole text. You can
read "DESIGN AND THE ELASTIC MIND" through the loops. The gondola hangs
mid-word at top right; belts run to the top corners.

### Where the loops come from (his own account)

The 2020 interview gives the origin story, and it is better than the
reconstruction. Hektor was supposed to have FOUR motors, like Viktor
later did: two lower motors for stability. But the stepper motors kept
blocking each other and losing steps, and with two weeks left before the
ECAL thesis deadline, Lehni and Franke cut the lower pair. The only fix
available was software: make the motion careful and smooth. His mental
model: "what if this were a car, and I was driving without brakes and
reaching out of the window with a brush, with the car moving at a constant
speed and I was trying to steer at the same time. How would you draw a
square in these circumstances? You would drive away on circles in the
corners and come back to the next line and then push the brush again."

He thought of it purely visually; when it became actual movement it turned
into Hektor's identity, "a lucky accident." People watching said it was
like a painter "anticipating or planning their next stroke." The signature
was a deadline workaround. He also confirms the copy story from the other
side: hundreds of versions of the two-string principle now exist, "you
can't own the simplicity of such an elemental idea," and he and Franke
deliberately did not publish the recipe: "we wanted to explore Hektor's
potential on our own, give it an identity and create a body of work
around it."

I re-rendered this locally (script in the evidence dir): a test square
plus the word HEKTOR in a stick font, driven at constant speed with
corners replaced by tangent circular arcs, then through quantized
two-cable kinematics with a spring pendulum gondola and spray dots. Two
passes at the render: the first was too faint and polite, the second
(R_TURN larger, denser spray) shows the signature clearly. Square corners
become loops, letter corners become loops, chords bow in cable space, the
line wobbles from the pendulum. Next to the MoMA photo the mechanism
reads as confirmed: constant speed plus no-brake cornering IS the
handwriting. Honest note: my arcs are clean; his are messier (belt
stretch, wall friction, stepper loss). Both renders visually inspected.

### Viktor, seen: four belts and a voice

The Makezine photo: Viktor on a black wall, white chalk spirals and
rectangular loop motifs, the aluminum cross gondola with its motor mounts
visible mid-wall, chalk dust on the strokes. Four belts, not two: "a lot
of math involved in solving the geometric calculations, for example to
always keep tension on all four belts."

The SOMArts 2014 photo (the "mind map" for All Possible Futures): a huge
chalk concept map on a black wall, hand-lettered nodes connected by
sweeping arcs. XEROX PARC, MENLO PARK, AMPEX, INTERNET, DOUGLAS ENGELBART,
DARPA, IVAN SUTHERLAND, MILITARY INDUSTRIAL COMPLEX, VANNEVAR BUSH, NASA,
ATOMIC BOMB, SPACESHIP EARTH, MOON LANDING, STEWART BRAND, BUCKMINSTER
FULLER, WHOLE EARTH CATALOG, CYBERNETICS, PERSONAL COMPUTER, FREE MARKET,
MIND EXPANSION, THE WELL, PSYCHEDELIA, COUNTERCULTURE, COMMUNES, FREE
SPEECH MOVEMENT, DECENTRALIZED ORGANISATION. The map charts exactly the
cyberculture-meets-counterculture marriage he talks about: "hippies,
back-to-the-landers... versus the military industrial complex,
researchers, and scientists, all connected way more tightly than you might
think." Four motor modules visible at the wall's corners, cables, the
gondola hanging at bottom center. Chalk dust, uneven letterforms, the
hand of the machine.

The training photo: Lehni in an orange sweater holding Viktor's gondola
against the wall mid-draw ("SPACEWAR =" in chalk behind his hands). The
machine needs training like an instrument needs tuning; the human hand is
part of the performance.

Technique detail from the essay: Lehni and Jenny Hirons selected the
photographs and drawings for A Taxonomy of Communication through a long
research process, then re-traced them in Illustrator to convert analog
sketches into line-based vector instructions. "The focus isn't so much on
the final result as on the dance of the machine. Each sequence is
carefully choreographed." The machine reenacts hand drawings; the
choreography is the artwork. And the naming is deliberate: "By choosing
the drawings that it will execute, the machine gains a voice and topics
to 'talk' about." The "Frankenstein moment": when the machine first works
it is different than imagined, then you discover its character.

New facts: SFMOMA first wanted Hektor, then chose Viktor, partly practical
(chalk has no fumes, works during public hours) and partly conceptual
(chalk's associations with lecturing and education). The essay dates the
acquisition to 2016 (other sources say 2014; SFMOMA's own essay wins).
Viktor broke during the Typeface to Interface run, which raised the
conservation questions (who fixes him, what can be replaced). Otto, the
Long Now Foundation commission, is the workhorse version: every component
chosen for long-term use, maintained and programmed by someone other than
Lehni. Viktor is the delicate prototype.

### The anti-WYSIWYG, stated plainly

"Viktor and Hektor have their own handwriting. Whatever you see on the
screen will definitely not be what you see on the wall in chalk or spray
paint. It's both a critical position and a playful one." The desktop
publishing revolution promised WYSIWYG; his machines are a counter
proposal to the whole promise. Scriptographer was the same move in
software: "a Trojan Horse, a parasite, but not in a negative sense," a
way to blunt the dependency on Adobe. Paper.js is "a new escape route...
like the Japanese Ise shrine, where every twenty years they take it
apart, move it to a new location, and rebuild it."

The Scriptographer screenshot shows the idea working: Illustrator's
familiar document window ("Clouds.ai @ 100%") with the Scriptographer
palette tree (Examples, Rasters, Scripts, Tools: Clone Brush.js,
Clouds.js, Dripping Brush.js, Fancy Brush.js, Friction.js, Grid.js,
Growth.js), a console ("print('Hello World!'); Hello World!"), and a
CLOUDS parameter dialog (Minimum Size: 20, Fixed Size, Flip) drawing
scalloped clouds in the document. A designer building their own tools
inside the tool they were taught to obey.

### Teaching notes (for the practice's own pedagogy)

His teaching vocabulary: "making drawing tools that have some sort of
autonomy or behavior which you still use by hand. You go back and forth
between being the engineer or craftsperson of your tool, and also the
user of that tool." That is the half-manual principle, stated as
curriculum. And the Bret Victor "immediate connection" reference: the
shorter the feedback loop between modifying a program and seeing its
effect, the better. Scriptographer won on this because Illustrator's
document model is "almost physical": an emulated sheet of paper with
layers of visual objects, so the programmer can reason by analogy with
hand processes. Paper.js keeps the object model (paths, points, handles)
while Processing/p5 tell the machine what to draw every frame; the
object model is "closer to the way a designer thinks."

On p5's dominance in schools: "a massive library... a patchwork of
sorts... I went in the opposite direction with Paper.js. There, the aim
was to have a high level of control of the tool; a clear sense of design
and of how elements are named, how things are structured, that follows a
consistent methodology throughout the library." On tool monoculture:
"real diversity means we have lots of tools, and we use all of them."

On machine learning (2020, worth keeping because the ML thread ran long
in this study queue): "A few years back, it was data visualization, now
it's machine learning until the next new thing. The fact that you're
using code is not enough. You have to have a really good reason for
using it." And: "this whole narrative about how machine learning will
replace the artists is kind of defeating... I remain very suspicious of
this celebration of the complexity, romanticizing the complexity of the
machine, of its ability to process massive amounts of data." And the
kicker for the whole practice: "I don't think it is our place as artists
and designers to be in awe of technology."

## Technique takeaways (visual pass additions)

- The deadline signature: Hektor's entire handwriting came from a
  two-weeks-to-deadline constraint (four motors down to two, fix it in
  software). Constraint-forced invention, kept because it sang. When a
  limitation produces a beloved artifact, the limitation becomes the
  medium. Compare Hoff's grain discipline, Molnar's 1 percent.
- Choreography over image: for Viktor, the drawing sequence is composed
  like dance; the wall is the score's residue. A generative piece can be
  judged by its motion, not just its final frame.
- Reenactment as method: Viktor's drawings start as human hand drawings,
  researched, selected, re-traced into vectors. The machine does not
  invent the drawing; it performs it. Authorship sits in the repertoire
  choice ("the machine gains a voice and topics to talk about").
- The repertoire is the voice: choosing WHAT the machine draws is the
  artistic act. A drawing machine with no repertoire is a printer.
- Screen and wall in one frame: the Hektor install photo with the laptop
  showing blue vectors next to the black spray rosette is the whole
  anti-WYSIWYG thesis as an image. Show both states when documenting
  machine work.
- Prototype vs workhorse: Viktor the delicate prototype (breaks, raises
  conservation questions) versus Otto the workhorse (built for strangers
  to maintain). Design the maintenance model with the machine.

## Avoid-list additions (visual pass)

- Do not draw loopy cable-plotter lettering as a style. The loops are
  Hektor's handwriting from his hardware and his deadline. Derive the
  principle (compose in the actuator's motion constraints) instead.
- Do not romanticize the machine's complexity. His own warning, aimed at
  the ML moment but general: awe at the technology is the wrong message;
  the work has to earn it some other way.

## Doorways for next sessions

- Uli Franke (Hektor co-builder); Jonathan Puckey and Studio Moniker
  (half-manual tool design); Alex Rich (the ICA collaboration); Jenny
  Hirons (Taxonomy of Communication); Dexter Sinister (the 2007 Swiss
  Institute Hektor performance).
- The polargraph community: Sandy Noble's Polargraph, Der Kritzler,
  Maslow CNC. The idea visited other people; see what they did with it.
- ECAL "Typeface as Program" workshops: type as program, the workshop
  format as a way to evolve an API.
- Otto (Long Now Foundation commission): the workhorse version of Viktor,
  built for long-term use and stranger maintenance. The prototype vs
  workhorse design split.
- Jonathan Puckey and Studio Moniker: half-manual tool design, the
  engineer-craftsperson-user loop as curriculum. Conditional Design as a
  method (Luna Maurer, Edo Paulus, Puckey, Roel Wouters).
- Dexter Sinister and the 2007 Swiss Institute Hektor performance.
- Follow-up: Rita, Flood Fill, Apple Talk.
- COMPLETED 2026-09-28: full visual pass on Hektor and Viktor works
  (SFMOMA essay, 2020 interview, 8 images, no-brakes re-render). lehni.org
  still dead, archive.org offline in-session; his own site's pages and the
  Vimeo films remain unseen.
