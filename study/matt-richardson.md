# Matt Richardson / the Descriptive Camera (deep; 2026-09-27)

Hop from the Ross Goodwin study: Goodwin named Richardson's Descriptive
Camera as the human-powered ancestor of his own word.camera, and Golan
Levin's experimentalcapture lecture (docs/conceptual-cameras.md, read in
full) places Richardson at the head of the whole word-camera lineage:
Descriptive Camera (2012) to word.camera (2015) to Poetry.Camera to Kyle
McDonald's Neural Talk and Walk (2015) to WordsEye (the inverse, text to
image). Richardson is the block-composition pole of that lineage. He is
now the Raspberry Pi community engagement lead and a MAKE contributor;
in 2012 he was an NYU ITP master's student in Dan O'Sullivan's
Computational Cameras class.

## The piece: a camera whose only output is text

Point it at a subject, press the shutter, and instead of a photograph
the camera prints a written description of the scene on a slip of
thermal paper. The pipeline: USB webcam captures the frame, the
BeagleBone (embedded Linux board) uploads it through Amazon's
Mechanical Turk API as a Human Intelligence Task, a stranger on the
internet writes a short description for $1.25, the text comes back, and
an Adafruit thermal printer dispenses it like a grocery receipt. The
wait is the photograph's "developing" made literal: a yellow LED
labeled DEVELOPING lights up, and three to six minutes pass before the
paper feeds out.

Richardson's own framing, from his site (read in full; the current page
is a slim redesign, the original 2012 writeup survives in coverage):
modern cameras capture gobs of parsable metadata about settings, time,
and place, but nothing about the content of the photo. The Descriptive
Camera outputs only the metadata about the content. His stated motive
was practical, image search and cataloging, but his answer when Tech.li
asked whether it was tech study or conceptual art was "a bit of both":
conceptual art that nods at our changing relationship with technology.

## The hardware and the software, as documented

The build is a stack of bought blocks, and Richardson is open about
that (Amp Hour interview transcript, read in full: "putting blocks
together," one block the thermal printer, one block the BeagleBone,
one block Mechanical Turk). USB webcam plus Adafruit thermal printer
plus BeagleBone plus three status LEDs plus a shutter button. Python
scripts define the interface and glue capture to processing to error
handling to printed output; his own mrBBIO module handles GPIO for the
LEDs and the button; open-source command line utilities talk to the
Mechanical Turk API; Philip Heron's fswebcam does the capture; the
printer runs over UART serial following Dan Watts' writeup. It tethers
over Ethernet and takes an external 5V supply. He acknowledged every
dependency by name. The code was never published (searched GitHub and
the open web: no repository surfaces), so the internals are known only
from his descriptions.

Two cheaper modes matter. "Accomplice mode": instead of paying
Mechanical Turk, the camera instant-messages a friend a link to the
photo with a form to type the description. Faster, free, lower quality.
And the Gizmo hands-on at ITP (Gizmodo follow-up, read in full):
Richardson supplied props, a yarn mustache and a black clip-on bow
tie, and had friends on AIM writing the descriptions. The accomplices
had more fun than the Turkers.

## The descriptions: candor as aesthetic

The famous first printout, quoted everywhere: "Looks like a cupboard
which is ugly and old having name plates on it with a study lamp
attached to it." NYT's demo shot of a building: "This is a faded
picture of a dilapidated building. It seems to be run down and in the
need of repairs." Fast Company: "It's a dark room with a window. The
image is quite pixelated." The recurring note is the stranger's
candor: "ugly and old," "quite pixelated," a paid stranger with no
reason to flatter your furniture. Fast Company put it well: richer
than automated image processors could identify at the time, precisely
because a human is doing the seeing. The receipt format completes it:
the text is a photographic print in another medium, a souvenir of a
moment, torn off and pocketable. Hyperallergic (opinion piece, read in
full) reads it as a return to describing images without showing them,
which is what everyone did before ubiquitous cameras.

## Visually inspected

Device photo via the project video thumbnail (480x360, inspected):
clear acrylic enclosure, beige side panel, the Adafruit thermal printer
module mounted on the front face, wiring visible through the case,
status LEDs up top. It looks like a prototype and is proud of it; the
receipt slot is the lens. Levin's lecture embeds the same video still.
Levin's word.camera illustration is a daguerreotype plate camera, a
joke image about old cameras rather than Goodwin's actual device, so it
tells us nothing about hardware; the lineage section's value is the
text, not the pictures.

## Local re-render: the ritual

One HTML page reenacting the full ritual, built and screenshotted in
headless Chrome at 1100px, zero console errors (checked with the
exception collector): a finder with three drawable scenes (the
cupboard-and-lamp from the famous printout, the yarn-mustache portrait
from the Gizmodo hands-on, the dilapidated building from the NYT
demo), DEVELOPING/READY LEDs, a shutter button, and a thermal printer
slot that feeds out a receipt line by line with a torn bottom edge.
The wait is compressed from 3 to 6 minutes to 6 seconds. The
descriptions are synthesized by a small local template grammar that
keeps the stranger's candor in ("ugly and old," "seen better days,"
"It is a strange thing to photograph"), honestly labeled as a stand-in
for the Turk backend. Two frames inspected: mid-print and finished,
receipt reading "This is some drawers and a lamp. The drawers have
seen better days. It is a strange thing to photograph." with footer
"described by a stranger for $1.25 / *** THANK YOU ***".

What the re-render taught: the piece is one LED, one wait, and one
receipt. The developing delay is not a limitation, it is the
composition. Removing it would kill the work. And the candor is not
decorative; it is the entire aesthetic difference between a human
describer and a model, and it is what a generated-text piece would have
to earn some other way.

## Technique breakdown

- Inversion of metadata: the camera keeps the camera-shaped ritual
  (point, shutter, developing, print) and replaces every pixel with
  prose. What is preserved is the social form of photography.
- Crowdsourced perception as a module: Mechanical Turk used as a
  function call with latency, cost ($1.25), and an approval/reputation
  system as the quality knob. The price is part of the piece; every
  photograph costs a fixed amount of human attention.
- Developing as theater: the amber LED replays darkroom language so
  the wait reads as craft instead of network lag.
- Receipt as print: thermal paper makes the output disposable,
  physical, and funny. The photograph becomes a grocery list.
- Accomplice mode as social variant: swapping anonymous labor for
  friends changes the voice of the output. Two backends, two pieces.

## What sings, and the avoid list

What sings: the pun "developing" carried all the way through to a
yellow LED; the receipt; the stranger's unflattering honesty; the
honesty of the parts list, BeagleBone and all. It is funny without
trying to be a joke, because the form is played completely straight.

Avoid: reducing it to "lol the camera roasts your furniture." The
candor is a byproduct of the real mechanism, outsourced strangers with
no stake in your feelings, and the piece is about what counts as a
photograph, not about insults. A re-derivation that fakes the candor
with a snark template and skips the wait and the receipt is the piece
with everything removed.

## Honest gaps

The original code was never published, so the HIT interface design,
the polling loop, and the print formatting are known only from his
prose descriptions. The full six-image press gallery was JS-gated and
only one image was retrievable in-session. The YouTube demo video was
seen only as a thumbnail; the camera in motion (paper feeding out) is
described, not seen. McDonald's Neural Talk and Walk and the
Poetry.Camera, the next two links in Levin's lineage, are not yet
studied; McDonald is the natural next hop.

## Seeds

178-180 in FUTURE_PIECES.md: Developing LED, One Dollar Twenty-Five,
Accomplice Backend. Notes pushed as study/matt-richardson.md.
