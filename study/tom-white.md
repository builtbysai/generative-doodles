# Tom White: Study Notes

**Date:** 2026-09-27
**Artist:** Tom White (drib.net; New Zealand based artist investigating machine
perception; lecturer in computational design and creative AI, Victoria
University of Wellington School of Design; Google AMI grant 2018;
Perception Engines, Synthetic Abstractions, Treachery of ImageNet).
**Doorway:** hop from the Andreas Refsgaard / Gene Kogan study. Refsgaard is
the playful pole of the ML thread, Kogan the teacher, Crespo the biomorphic
pole, Anadol the monumental pole, Ridler the dataset pole, Akten the
model-as-mirror pole. White is the machine-vision pole: instead of using
models to generate images, he uses models as the judge and lets the judge
drive a drawing system. Next doorways: Francis Tseng (ml4a co-author, quoted
by Kogan; data-design pole); Bjorn Karmann (Objectifier; train-your-own
interaction); White's own teaching materials (his "Sampling Generative
Networks" tutorials on drib.net).

**Depth: deep.** Two Medium essays read end to end: "Perception Engines"
(Apr 4, 2018, AMI publication, ~8 min) and "Synthetic Abstractions" (Aug 23,
2018, ~7 min). drib.net portfolio index read (all 40+ works catalogued).
computervisionart.com piece page for Perception Engines read. aiartists.org
Tom White profile read. ISEA 2023 artist statement read. The Tom White
section of Golan Levin's lectures/lecture_cnns_and_gans README read (the
Mustard Dream "cannot be shown on the internet" passage). CMU 2021/2022
Machine Learning + Art lecture notes sections read. Eleven artworks visually
inspected at the full resolution available to the session: Perception
Engines prints starfish, binoculars, cabbage, iron, tick (800px photos of
the ink prints), the complete 10-print Riso set photo, and Synthetic
Abstractions prints Mustard Dream and Lime Dream (Squarespace crops),
plus shark and "Composition with Red Blue and Yellow". One core technique
re-rendered locally in Python/PIL and visually inspected: the three-module
perception-engine loop (drawing system + creative objective + random-search
planner) with an ensemble of toy template "classifiers" and a held-out
template for the generalization check, 900 iterations, 5 frames inspected.
Honest gaps: no real classifier was used anywhere in this session (the
re-render is a geometric-template analogue; ImageNet models were not run);
the Medium interpolation GIF (hammerhead shark to iron) was described, not
seen; Google Cloud Vision and AWS Rekognition labels for the cello print
were described, not run live; project videos not watched; the Actions
series gifs on drib.net not inspected; White's engine code is not public,
so the planner details come from his essays only.

## The architecture (from his own essays)

Three submodules, cleanly separated:

1. **Drawing system.** The constraints of mark-making. Early systems drew
lines or rectangles on a virtual canvas; later ones targeted physical
printing (Riso, then screen printing), with the ink process modeled as
part of the system.
2. **Creative objective.** Maximize a trained classifier's response to one
target class. So far ImageNet pre-trained nets, later the moderation APIs
(Google SafeSearch, AWS Rekognition, Yahoo NSFW).
3. **Planning system.** Blackbox random search, no gradient information.
Inefficient but simple, hundreds to thousands of iterations, and it finds
a *local maximum*, so every run converges to a different solution. His
own phrase for the ensemble version: a "computational ouija board",
several neural networks simultaneously nudging and pushing a drawing.

The inversion is the conceptual move: instead of using the computer as a
tool, the human designs the drawing system and the network drives it. The
artist's voice lives in the constraint system; the network is the arbiter
of content. White is careful about this and it is worth copying the
care: he does not claim the machine drew a starfish, he claims the system
maximized a starfish response within his drawing vocabulary.

## Embodiment: modeling the physical print

The first Riso target was chosen because it is like screen printing. Every
physical uncertainty was modeled as a distribution during optimization:

- **Issue 1, layer alignment:** Riso misregisters layers (paper is fed per
color). Modeled as manual jitter between colors, which stops the design
from depending on exact cross-layer placement.
- **Issue 2, lighting:** ink on paper looks different under different
light. Paper and ink colors were photographed under multiple conditions
and simulated as possibilities.
- **Issue 3, perspective:** viewing angle unknown. Perspective
transforms added in a final refinement stage.
- Final masters are rendered with all transforms disabled, in canonical
form: two layers per print (e.g. purple + black for the fan).

After printing, generalization is tested like a train/test split: the
electric fan was "trained" with input from inceptionv3, resnet50, vgg16,
vgg19 and then scored on nine other architectures it never saw. The tick
print is the famous result: six nets used in the loop (InceptionV3,
MobileNet, NASNet, ResNet50, VGG16, VGG19), and it generalizes to nearly
everything since, including DenseNet, which did not exist when the print
was made. On InceptionResNetV2 weights the photo of the tick print scores
higher than all fifty official ImageNet tick validation images. White
coined "Synthetic Abstraction" for this: a visual abstraction that
represents a class more strongly than any real instance, like a Platonic
ideal of a circle drawn from imperfect examples. Amplification through
simplification, the cartoonist's move, arriving by gradient-free search.

## Series and captions

- **Treachery of ImageNet** (first prints): each print captioned with its
target concept, riffing on Magritte. The conceit: the prints evoke the
concept in networks the way Magritte's pipe evokes a pipe in people. He
chose eclectic labels to expose ImageNet's arbitrary ontology.
- **Perception Engines** (10 Riso prints): cello, cabbage, hammerhead
shark, iron, tick, starfish, binoculars, hand dryer (blow dryer),
measuring cup, jack-o-lantern. Same codebase, nearly identical
hyperparameters, so differences between prints come only from the label
objective. The hammerhead-shark-to-iron interpolation shows the system
expressing global structure independent of surface features or texture.
- **Screen printing phase:** Riso's ink count and size were limiting, so
he moved to screen printing (60x60cm prints of cello, hammerhead shark,
tick, binoculars shown at Nature Morte gallery, New Delhi, in the
"Gradient Descent" show). Screen printing adds overhead: every layer
needs its own burned, cleaned, dried screen.
- **Synthetic Abstractions (ontology shift):** the pipeline retargeted at
content-moderation ontologies. Two first results (bright layered screen
prints) score as "Explicit Nudity" on AWS Rekognition, "Racy" on Google
SafeSearch, and "NSFW" on Yahoo's open classifier. White notes he has no
intuition for *why* that arrangement of bright shapes triggers the
filters, and prefers the mystery. Mustard Dream is flagged by three
services while looking completely innocuous to a human, which is why the
Golan Levin lecture notes joke that the print "literally cannot be shown
on the internet" and a gallery selfie might get you banned from
Instagram. There were also commissioned "Hotdog" prints for THOTCON 0x9
that transferred to the Not Hotdog app, which is much closer to classic
adversarial transferability than to the open-ended generalization work.
- **Later work on drib.net:** a 2021 Perception Engines series (Racecar,
Cat, Printer, Bee, Perfume, Jellyfish screen prints, 16x16in), an Actions
series of 2023 canvas prints, and text-titled screen prints ("Sunset in
the City", "sticky gooey honey", "the great wave", "rain drops on a
windshield", "a jolt of searing pain", "The loneliness of space").

## What the prints look like (visual inspection)

Each Perception Engines Riso print: one dominant flat spot-color amoebic
mass (usually one to three thick rounded strokes merged into a blob), a
handful of thin black curved strokes that hug the blob's edges or radiate
off it, one or two small satellite marks floating in the corners, large
negative space, visible Riso ink grain. Inks are bold single spot colors:
hot pink (starfish), purple (binoculars), teal (cabbage), gray (iron),
brown (tick). The black linework reads like scribble clusters: starburst
scribbles on the starfish, radiating leg-like curves on the tick, an X of
curves in the binoculars corner. The tick's black strokes genuinely
suggest legs around an oval body; the iron's strokes hug a tapered
capsule; the starfish is a pink blob wearing black asterisks.

The Synthetic Abstractions prints are denser: Mustard Dream is black
amoebic masses plus thick white "bone" strokes and thin black lines on a
mustard ground; Lime Dream is lime green plus teal blobs with dark purple
thick strokes and thin black lines on off-white. Nothing in either looks
remotely explicit to a human eye, which is the entire point.

Palette note for our own work: the 2-ink discipline is doing a lot of the
aesthetic work. One saturated flat color plus black linework on paper
grain is a complete visual system; the NSFW series adds a third ink and
suddenly the compositions read as tangled and biological. Misregistration
(faint ghost layers visible on the tick print) reads as a feature, not a
bug, and White's jitter modeling effectively bakes it in.

## The re-render (ouija_engine.py, evidence dir)

A toy version of the full loop. Genome: 3 ellipse blobs in brown ink +
10 quadratic-bezier black strokes on off-white. "Classifiers": normalized
cross-correlation against three 64px "ideal tick" templates (ellipse body
+ 8 legs) at rotations -18, 0, 18 degrees. One more template at 37 degrees
is held out and scored only at the end, never used in optimization.
Planner: greedy random search, 900 iterations, jitter added during
scoring to model production uncertainty. Result: score improved +0.406
(from negative to 0.039); holdout generalization scored 0.019, below the
train score, which is honest: a toy template ensemble overfits, the exact
failure mode White's real ensembles and jitter modeling are designed to
avoid. Frames at iterations 0, 120, 400, 900 show the search dragging
strokes into radial arrangements around the body mass and merging the
blobs into one visual body. All frames and the final inspected; the final
reads as a loose echo of the real tick print (compact body + radiating
legs + grain).

What the exercise taught that reading did not: the local-maximum behavior
is immediately visible. The search stalls in a composition that is good
enough and every run would stall somewhere else, which is why the series
has its variety. Also, the two-layer vocabulary (blobs + linework) is
doing structural work: blobs carry mass, lines carry the discriminative
detail. A single vocabulary would read as texture, not as a creature.

## What sings

- The constraint system as authorship. The human never draws; the human
designs the pen, the paper, the allowed moves. For our own pieces this is
a transferable discipline: design the mark vocabulary first, let the
objective fill it.
- Generalization as the metric, not the train score. The whole practice
is built around the held-out check: unknown architectures, unknown
datasets, even models that did not exist yet.
- The caption dissonance: "tick" under an image no human would call a
tick. The title is load-bearing. Any piece we derive from this needs its
target word printed on it, Magritte-style.
- Synthetic Abstraction as a named phenomenon: an abstraction stronger
than any instance. That is a claim our piece seeds can borrow honestly
only if we actually measure it (his tick-vs-50-validation-images
comparison is the template: compare your abstraction against the real
dataset on a held-out judge).

## Avoid-list additions

- GAN-chic texture mush presented as machine vision. White's work is the
opposite: hard edges, flat ink, countable marks.
- Claiming the network "drew" something. Say what was optimized and who
designed the drawing system.
- Adversarial examples as party tricks without the generalization
question. Transferability to one target is the old game; the interesting
game is the unknown judge.

## Honest gaps (noted above, repeated for the ledger)

No real classifier run; interpolation GIF unseen; commercial API labels
described-not-verified; videos unwatched; Actions gifs unseen; engine code
not public. Mark this study deep on the essays and the print visuals,
preliminary on the live systems.

## Seeds (160-162, appended to FUTURE_PIECES.md)

160. Held-Out Critic.
161. Ouija Plotter.
162. Two Inks, Three Judges.
