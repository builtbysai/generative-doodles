# Andreas Refsgaard: Study Notes

**Date:** 2026-09-27
**Artist:** Andreas Refsgaard (Copenhagen-based artist and creative
technologist; CIID Interaction Design 2015; Eye Conductor, Doodle Tunes,
Sound-Controlled Intergalactic Teddy, Poems About Things, Booksby.ai,
Perler Beads to Landscapes; 500+ creative-AI talks and workshops).
**Doorway:** hop from the Gene Kogan study. Refsgaard took Kogan and
Rebecca Fiebrink's "School of Machines" course in Berlin, and Kogan
invited him to the Nabi AI Hackathon 2016 in Seoul where they made
Doodle Tunes together. Where Kogan is the teacher of the ML-art scene
and Crespo the biomorphic pole and Anadol the monumental pole,
Refsgaard is the playful pole: the one who asks what eye-tracking,
doodles, and silly sounds can drive, and then lets anyone train their
own inputs. Next doorways: Tom White (Perception Engines); Francis
Tseng (ml4a co-author); Bjorn Karmann (Objectifier, quoted in the
essay as the purest version of train-your-own-interaction).

**Depth: deep.** andreasrefsgaard.dk index read (all 42 project
summaries), project pages read end to end: Doodle Tunes, Eye Conductor,
Sound-Controlled Intergalactic Teddy, Perler Beads to Landscapes,
Genetic Paintings, Video Painter, Sounds from the Mouth. His Culture
Machine essay "Playful Machine Learning" read end to end (all 232
lines, all 12 figures). The ml4a DoodleClassifier guide read end to
end (segmentation params, training procedure, OSC protocol). Seven
artworks visually inspected at full resolution available to the
session: Doodle Tunes hand-drawn instrument sheet (Culture Machine
fig. 5), Eye Conductor wheel-sequencer UI in use (fig. 2), YOLO movie
trailer magenta bounding-box filter (fig. 7), Poems About Things
suggest-API overlay text on a torso photo (fig. 10), Wolfenstein
sound-control still (fig. 1), Is It Funky training montage (fig. 4).
Two techniques re-rendered locally in Python and visually inspected:
the Video Painter dab-sampling mechanic (two brush paths) and the
Doodle Tunes few-shot doodle-to-sound mapping (4-class 1-NN poster,
all four test doodles classified correctly). Honest gaps: no model
was trained, so the classifier study is a geometric-feature analogue
of the real convnet pipeline; the project videos (Doodle Tunes Vimeo
197026662, Sounds from the Mouth Vimeo 804281986, Perler Beads
walkthrough) were not watched; Genetic Paintings was seen as text
only; the interactive demos (Video Painter p5js online version, Poems
About Things mobile site) were not run; Sound-Controlled Teddy's
audio classifier was read about, not heard.

## The doctrine: train your own inputs, map across domains

Refsgaard's essay names the move twice, once as engineering and once
as aesthetics. Engineering: machine learning flips the designer's job
from writing rules to collecting examples. Aesthetics: the best
mappings join two domains nobody put together before, the way Man
Ray's The Gift (an iron with tacks glued on) joins ironing and
wounding. Every project is the same sentence with different nouns:
gaze to music, drawings to music, sounds to game controls, webcam
pixels to landscapes, misclassified objects to poetry.

The naive reading is that the work is about AI. The closer reading is
that it is about agency. The Wolfenstein essay passage is the clearest
he has ever been: "the creative power shifts from the designer of the
system to the person interacting with it." The DoodleClassifier guide
says it with settings: define your own classes, draw 30-50 examples
each, set the threshold until the green rectangles wrap the doodles
and nothing else. Eye Conductor started as a fixed mapping (eyebrows
up = octave up, mouth open = reverb) and the essay records him
rethinking it into a trainable one, because his user research showed
not every user could raise their eyebrows. The disability context is
not garnish. It is where the train-your-own-inputs idea came from.

## Technique 1: the DoodleClassifier pipeline (Doodle Tunes, 2016)

Concrete mechanics, from the ml4a guide, worth remembering because
this is how you actually ship a "draw something, something happens"
piece with 2016 tooling:

- Overhead camera on a stand, paper on the table, thick markers (thin
  pen lines fragment under thresholding).
- Segment with a brightness threshold, then dilate to join broken
  lines, then filter by min/max contour area so shadows and paper
  grain do not become "doodles."
- Each segmented blob becomes a training sample: the convnet (ofxCcv,
  a GoogLeNet feature extractor via Caffe) reduces it to a feature
  vector, stored per class. 30-50 samples per class for hand-drawn
  instrument drawings with high inter-drawer variance.
- At classify time the pipeline is identical, and the result leaves
  the machine as an OSC message to /classification carrying the class
  name plus four floats: x, y, width, height of the bounding box. In
  Doodle Tunes those OSC messages hit Ableton Live, where each class
  launched a clip. The drawing becomes a launcher.

The visual signature of the whole family is the green rectangle: the
segmentation feedback shown to the user while training. That rectangle
is the UI of the doctrine. It says: this is what the machine sees;
make it see what you mean.

## Technique 2: sounds as controllers (Wolfenstein, Intergalactic Teddy)

Two versions of the same recipe. Wolfenstein (2017, with Lasse
Korsgaard): a dozen recorded examples per sound class, whistle = move
forward, clap = open door, two grunts = turn left/right, "pew pew" =
shoot. The training took minutes. Teddy (KIKK 2017): "ohhh" = jump,
clap = duck, trained on "a lot of diverse ohhhs and claps." The
engineering note that matters: diversity of the training set is the
robustness strategy. Nobody regularizes; they record more ohhhs. The
fun follows from the mismatch between the input domain (silly sounds)
and the output domain (a twitch platformer or a shooter). Note also
that the classifier does not need to be right about the world, only
about the player's intentions, which is a much easier bar and the
reason these pieces actually work in installations.

## Technique 3: detection filters as editing tools (Algorithm Watching a Movie Trailer, 2017)

YOLO-2 run over the Wolf of Wall Street trailer, three filters: keep
only detected objects (everything else masked out), blur detected
objects (auto-censor), remove visuals entirely (the "what the software
sees" cut). The still inspected shows the magenta boxes: person,
truck, cell phone labels, nested boxes on background bookshelves.
Two observations. First, the joke lands because the detector is
confident and wrong in scale, labeling bookshelf clutter with the
same authority as Leonardo DiCaprio. Second, this is a remix tool
disguised as a demo: the same page describes scrubbing between the
original Full House intro and a version with all objects replaced by
emojis. The takeaway for the seed file is the bounding box as a
compositional primitive: detection output is already a layout.

## Technique 4: the misclassification as material (Poems About Things, fAIry tales)

Poems About Things: point the phone camera at an object, an on-device
classifier guesses what it is, that guess is sent as a query to
Google's Suggest API, and the returned sentences are laid over the
photo as a poem. The still shows a lifted shirt and a hairy chest
with the lines "is my fur coat real / is my fur coat worth anything /
is my fur coat milk / is my fur coat fur / why is my fur coat
shedding." The chest was read as a fur coat. The essay is explicit
that the mistakes are the point: classification errors are where the
poetry comes from. fAIry tales does the same with YOLOv3 on COCO
images feeding titles into XLNet. The design lesson: when your model
will be wrong anyway, make the wrongness legible and charming instead
of hiding it. A displayed confidence of 12 percent is a punchline, not
a bug.

## Technique 5: physical tokens into latent space (Perler Beads to Landscapes)

Webcam watches perler beads on a table, "hacky programming" maps bead
colors to the segmentation-map colors of a SPADE/GauGAN landscape
model (Gene Kogan's RunwayML port), and the model renders a
photorealistic landscape from the bead arrangement. The interaction
pattern is worth isolating: a constrained physical construction set
(hundreds of beads, fixed color palette) becomes the control surface
for a generative model. The constraint is the feature. Beads are
discrete, griddable, and human-placable, which makes them a better
latent-space joystick than a freehand drawing would be. Not seen in
motion; the video was not watched this session.

## Technique 6: gaze-driven fitness (Genetic Paintings, 2016)

Made at the same Nabi hackathon as Doodle Tunes, solo. Interactive
genetic algorithm on paintings, from Daniel Shiffman's Nature of Code
chapter 9, with an Eye Tribe eye tracker feeding the fitness function
through a websocket. Stare at the painting you like and it breeds.
In the online demo the gaze is replaced by the mouse. The move is
small and perfect: fitness is attention, measured, not stated. This
pairs with the Memo Akten notes (body paint as input) and the Anna
Ridler notes (attention as labor): Refsgaard's version is the
lightest of the three, a hackathon sketch, and that lightness is why
it survives as an idea. Any "which of these do you prefer" UI is a
fitness function wearing a costume.

## Palette and composition notes

Refsgaard's own visuals are deliberately unstyled: white gallery
tables, overhead camera stands, marker on paper, webcam windows. The
aesthetic is the demo, not the render. This is the opposite pole from
Anadol and Crespo. The one place he lets images be beautiful is when
the model does it for him (the GAN landscapes, the outpainted Bloch).
Compositional habit across the stills: the camera looks down at the
table (Doodle Tunes, perler beads, the paper), and the screen looks
back at the player (Eye Conductor's wheel, the classifier GUI). The
work always shows its seams: green segmentation rectangles, magenta
bounding boxes, overlaid suggest queries. Nothing is hidden, and the
visibility is the charm.

## What makes it sing, what is overdone

It sings when the mapping crosses domains that have no business
meeting (drawings to music, gaze to evolution, misread chests to
poetry) and when the user trained the mapping themselves. It is
overdone when the mapping is one-to-one and literal (point at the
drum, hear a drum) or when the "AI" framing does the work the
interaction should do. The essay's own warning applies: people assume
ML means automation, and the pieces that lean into that assumption
read as press releases. The pieces that lean away from it, toward
surprise and agency, are the ones still exhibited.

## Avoid-list additions

- Gimmick AI: a model bolted onto an interaction that would work the
  same with buttons. (Test: if the mapping could be hard-coded without
  losing the piece, the model is decoration.)
- Hidden-model magic: classification results presented as oracles
  rather than guesses. Show the confidence, show the rectangle.
- Sound-control pieces where the sounds are chosen for the demo video
  rather than for the body making them. "Pew pew" is the exception
  that proves the rule because it is fun to say.

## Local re-renders (procedural analogues, visually inspected)

- Video Painter dab sampling: brush paints radial-graded dabs whose
  color is sampled from a synthetic "video frame" at the brush
  position. The spiral render shows the mechanic clearly: the paint
  color tracks the path through the source, which is the whole point
  of the piece. The wander render documented an honest failure mode:
  an unanchored path leaves the frame and the painting goes empty.
- Doodle mapping 1-NN: four hand-authored classes (drum, sax, piano,
  flute) with three jittered training samples each on geometric
  features (aspect, compactness, stroke count, curvature); four new
  test doodles all classified correctly with distances 0.05-1.0.
  This restates the doctrine (few-shot, trainable, cross-domain
  mapping to sound params) without the convnet.
