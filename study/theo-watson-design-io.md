# Theo Watson and Emily Gobeille / Design I/O: Study Notes

**Artists / studio:** Theo Watson and Emily Gobeille, Design I/O, Cambridge,
Massachusetts. Watson is a co-creator of openFrameworks (with Zach Lieberman
and Arturo Castro). The studio builds immersive interactive installations for
museums and festivals. Doorway: a hop straight out of the Zach Lieberman
study into the openFrameworks family tree, and a territory break into
full-room immersive interaction, nothing on screen smaller than a wall.

**Depth: deep on design doctrine and visual vocabulary (primary interview
read in full, installation photos visually inspected); technique-deep on the
two signature mechanics, both re-rendered locally and the pixels inspected.
The actual installations were not visited; no source code is public.**

## Primary sources

1. Print Magazine, October 2013, "Inside Story" by Karli Petrovic: a long
   interview with both principals, read end to end. This is where the doctrine
   lives, in their own words.
2. design-io.com project pages for Connected Worlds, Funky Forest,
   Weather Worlds, Terrarium. Text read in full.
3. digiart21.org writeup on Connected Worlds (infrastructure figures).
4. Two Funky Forest installation photographs, visually inspected at full
   resolution. One Connected Worlds habitat photo, visually inspected.

## The doctrine (in their words, condensed)

They start from story, not medium. "We start with a story and then figure out
the best way to tell it," says Gobeille, "it is always better to design the
medium and interaction around the content of the story, so that a digital,
technological approach contributes something meaningful to the experience."

Two layers of interaction in every piece: direct and immediate feedback that
pulls people in, then subtle interactions that reward exploration, with
longer feedback loops that let the audience discover deeper connections
between things. The immediate reaction gets them; the subtle layer sustains.

Hand over control. "In a sense, a key part of an interactive experience is to
hand over control to the audience," Watson. They tune until the feel is
right, and the tuning is brutally fine-grained: "changing the timing of
something by one-tenth of a second can make a huge difference in how people
engage with the work." Different age groups get different interaction targets:
children get open play, adults get the slower reveals.

Story is also how the work survives the mainstreaming of its technology.
Watson: "as it becomes more mainstream, with interactive walls and floors
commonplace, what will differentiate them is the quality of the stories being
told and the marriage of interaction and storytelling."

## The works

**Funky Forest (2007, Cinekid Amsterdam; 2010 version, Singapore Art Museum).**
An interactive ecosystem: children create trees with their bodies, then use
physical logs to divert water flowing from a waterfall to keep the trees
alive. Tree health feeds forest health, which decides which creatures appear.
The 2010 version added new creatures, trees, and a new particle system.
The photos show the whole vocabulary at once: a dark room, floor projection
of a glowing green gradient with white water streaks and particle rivers,
wall projections of generated trees with orange-brown trunks, coral-orange
ring fruits, lime-green spiral-dot canopies, drifting butterflies and
fireflies, a waterfall of white vertical streaks on the side wall, physical
black log bolsters on the floor that the kids move to divert the water. One
photo catches the body-tree moment exactly: a child with arms outstretched,
a trunk passing through them, fruits ringing their torso.

**Connected Worlds (2015, New York Hall of Science).** The grown-up Funky
Forest: six unique habitats spread across the walls of the Great Hall, joined
by a 3000 sq ft interactive floor and a 45 ft waterfall. Children divert the
floor water with physical logs into the habitats, then plant seeds with hand
gestures. Plants grow when watered; creatures appear based on habitat health
and plant type; healthy habitats exchange creatures, which sets off chain
reactions. Fixed water budget across the whole system, so the habitats
compete; clouds carry water back from the habitats to the waterfall, which
rains it down again. Infrastructure per digiart21: 15 projectors, 8 MacPros,
12 Kinects. Team: Gobeille, Watson, Nicholas Hardeman, plus animation by
Josh Goodrich and game consultation by Zach Gage. All openFrameworks.
Gage's note is the design thesis in one line: "a system of simple rules, but
deep emergent complexity." The habitat photo reads as storybook-botanical:
teal-green forest walls, tall stalk plants, hanging blue vines, alien
creatures, children reaching up into the projection.

**Terrarium.** An interactive ecosystem fueled by participants' voices: sound
creates seeds, seeds change appearance based on the sound, plants feed fish,
a whole food chain driven by the room's noise. Voice as the input device
instead of body.

**Puppet Parade.** Children step into the environment and perform alongside
large-scale puppets: pet them, create food for them to eat.

**Rise and Fall (2010).** An interactive story for the front and back covers
of Boards Magazine: hold the cover right side up or upside down in front of
a webcam and the tale reveals itself through story nodes, light and skyward
one way, darkness the other. A pre-Kinect marker-less magazine cover, which
is a fun ancestor of the body-tracking work.

**Faces (San Francisco, Lights on Market St).** Captured and sketched
portraits of passersby, projected larger than life on a building side.
The adult-targeted piece in their portfolio.

**Skataviz.** An iPhone strapped to a skateboard records runs and tricks,
visualized on screen. The honest engineering note: some phone sensors are
accurate, others need "intelligent guessing" on the data. Born from a
misread project: they thought a friend's video was this thing, then built
what they thought it was.

## Technique breakdown

**Body as emitter (Funky Forest).** The Kinect skeleton becomes a seed bank:
head, hands, torso positions each sprout recursive branch trees that grow
while the pose holds. The body is not a cursor, it is soil. This is the
inversion that makes it work: the child does not steer a tree, the child
becomes the place trees grow. Re-rendered locally in Python/PIL from a
scripted T-pose (the arms-out pose from the photos): recursive branches from
four body keypoints, tapered orange-brown trunks, coral ring fruits and lime
concentric-dot leaves at branch ends, fireflies, waterfall streaks, grass.
The render confirmed the visual economy: four element types (trunk, fruit,
leaf, firefly) and two palettes (warm fruit/trunk vs cool leaf/water) carry
the whole forest.

**Floor water as shared resource (Connected Worlds).** The floor projection
is a continuous flow field from the waterfall to the habitats, and the
physical logs are obstacles the flow must route around. Re-rendered as a
wave-equation heightfield with a constant top-edge source (the waterfall)
and a blocked-cell row (the log): the frames show the ripple fan spreading
downstream, a shadow zone forming directly below the log, and diffraction
fringes curling around its ends. The mechanism the kids feel, diversion by
placement, falls straight out of the physics: block cells, flow routes
around. Palette reads from the photos as height to teal-white glow on deep
floor green.

**Voice to seed (Terrarium).** Amplitude and character of the room's sound
spawn seeds whose appearance encodes the sound that made them; plants feed
fish, closing the food chain. Input device as instrument, output as ecology.

**Timing as a material.** The one-tenth-of-a-second note is a technique in
itself: in full-body interaction, latency and decay envelopes are the
difference between "it follows me" and "it is alive." Everything in these
pieces is tuned around response envelopes, not rendered frames.

**Palette and composition.** Night-forest teals and deep greens as the ground;
warm coral-orange as the life signal (fruits, creatures); white as water and
light. Compositions are always readable at a glance from across a dark room:
big shapes first, detail on approach, which is the two-layer interaction
doctrine expressed visually.

**What makes it sing.** The physical props. The logs are the genius move:
a digital water sim would be a screensaver, but a heavy foam log a child can
drag turns the floor into a negotiable shared resource. Digital for the
system, physical for the argument. Same with body-as-soil: the interaction
is legible with zero instruction, so the room teaches itself.

**Avoid-list additions.** Interaction that only rewards the first five
seconds and has no deeper layer; instructions on the wall instead of
legibility in the piece; technology as the story instead of the servant of
one.

## What is overdone elsewhere

The "interactive floor" as a genre has been strip-mined by retail and
corporate lobbies: ripples that follow feet, logos that scatter. Design I/O
escapes it by making the floor a resource to argue over rather than a mirror
to admire. Any piece in this territory needs the argument, not the mirror.
