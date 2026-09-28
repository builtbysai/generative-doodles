# Kyle McDonald (deep; 2026-09-27)

Hop from the Matt Richardson study, which placed McDonald in the
word-camera lineage: Richardson's Descriptive Camera (2012) to
Goodwin's word.camera to Poetry.Camera to McDonald's Neural Talk and
Walk (2015). This session followed that doorway and read McDonald's
selected-work archive substantially, plus the full Fast Forward Labs
interview, the full 2026 Le Random "Computer Softness" interview, the
Hyperallergic Exhausting a Crowd article, the complete Exhausting a
Crowd frontend source (276 lines of TypeScript), the complete
openFrameworks gist behind Neural Talk and Walk, most of Golan Levin's
Augmented Hand Series page, and the Terrapattern landing copy with
supporting coverage. Two techniques were re-rendered locally and
visually inspected: Terrapattern-style query-by-example and the
Exhausting a Crowd note-accumulation mechanic. This is a deep study of
technique, not biography.

## The through-line: humans as the AI, tools as the bridge

McDonald's recurring move is to build a system whose "intelligence" is
supplied by people, then treat that as a preview of what machine
intelligence would feel like. He said it plainly about Exhausting a
Crowd: "I was still a year or two early... I could build a preview by
crowdsourcing it and treating humans as the AI." That sentence is the
key to his whole practice. The Descriptive Camera used Mechanical Turk
as its vision system; Exhausting a Crowd uses museum visitors as its
tracker and captioner; Neural Talk and Walk is the one place he let the
machine actually do the seeing, and the charm of that piece is how bad
at it the machine was.

He is also a toolmaker first. Years as openFrameworks community
manager, ofxAutostereogram, the FaceOSC lineage, a habit of sharing
unfinished work in public. His pieces read like tools that got
interesting enough to exhibit, which is why they are unusually
inspectable: the repos and gists are part of the work, not an
afterthought.

## Exhausting a Crowd (2015): surveillance as a group activity

The headline piece, and the one this session read deepest. Commissioned
by the V&A for "All of This Belongs to You" (with Ross Goodwin, on the
same brief), installed above the museum's Exhibition Road entrance,
looking down at the crowd.

### How it was shot

McDonald's own writeup (read in full): twelve hours of Piccadilly
Circus, shot on a GoPro Hero 4 at 4K with a 12mm lens, USB-powered from
the V&A window, memory cards swapped every two hours. Six videos went
onto YouTube in three playlists, and YouTube did the streaming. That
last decision is characteristic: outsource the hard infrastructure to
whoever already solved it.

### How it worked, from the actual source

The repository README and the full frontend.ts give the whole machine:

- The video is prerecorded, but the interface strips every cue that it
  is not live. The README is explicit: prerecording was chosen so there
  would be an abundance of notes at any moment, while the chrome around
  the video was minimized to fake liveness. Deception as a design
  material, stated openly.
- A visitor drags a pointer across the frame following a person or
  object. The frontend records the timed pointer path (a minimum of
  about three seconds of tracked time before the note UI unlocks),
  zooms the video fourfold to the path's start point, and prompts for a
  note capped at 140 characters. Path plus text goes to a Postgres API.
- Future visitors see past notes drawn as lines that follow the
  recorded path, synced to video time. The client polls the API every
  15 seconds for 20-second windows of note data, so annotation density
  is always high no matter when you arrive.
- The README's most telling decision: an early version used
  computer-assisted object tags, and McDonald killed them. "It felt more
  disturbing to know that all the notes left behind were left there by
  a real human clicking and typing." The surveillance feeling he wanted
  was not algorithmic. It was social.

### What it looked like

The live site (exhaustingacrowd.com/london) was visited; the loading
screen's typography was captured, but the video player sat on a spinner
in headless Chrome, so the in-motion look comes from the Hyperallergic
article's GIF, which was pulled apart frame by frame (13 frames
extracted, first/middle/last inspected closely). The visual grammar:
night streets, dark translucent chips with white text pinned to moving
points with thin leader strokes, notes accumulating and overlapping
until the frame carries dozens of them. One sequence the article
highlights: a couple kissing on a corner, picked out of the crowd by
strangers' notes ("yes, kiss me right on the lips" is a real note from
the archive). The piece's power is that the crowd is both the watched
and the watchers. Faces are unresolvable at that distance and
bandwidth, which is what made the UK public-space filming defensible;
McDonald addressed the privacy question head-on in his writeup.

### The local re-render

The accumulation mechanic was rebuilt as a stand-in: scripted walker
agents cross a night street, each carrying a real note from the archive
pinned to its tracked path with a leader stroke, fading trails behind
them. Rendered at 1100x800 and inspected. What the re-render confirmed:
the mechanic reads even with crude stand-ins, because the grammar is
doing the work. Dark chip, white text, thin tether to a moving point,
trail showing where it has been. The accumulation is the aesthetic.
What the re-render could not test: real density. A dozen notes is
decoration; hundreds of notes is the piece.

## Neural Talk and Walk (2015): the word-camera goes for a walk

The direct descendant of the Descriptive Camera in the lineage from the
Richardson study. The complete openFrameworks gist is only about a
kilobyte, and the whole piece is in it:

- Webcam grabs at 1280x720. Every quarter second (4 fps sampling), the
  app writes the current frame to feed.jpg (resized to 640x360 JPEG)
  and reads the latest line of description.txt.
- A second, separate process runs Karpathy's NeuralTalk2 on feed.jpg
  and overwrites description.txt with the new caption.
- The screen shows the camera full-bleed with the caption in large
  white Avenir over a 50 percent black box.

Two processes coupled by two files on disk. Nothing more. He walked
around Amsterdam (Damstraat, Oudezijds Voorburgwal) with the laptop in
his hands, narrating to the camera while the captioner tried to keep
up. Gizmodo's coverage (read) gets the tone right: the misreads are the
piece. A hot dog read as a cellphone. "It takes a while for the
software to decide," and the lag is part of the walk.

Technique note for the sketchbook: the two-file seam is the whole
architecture. The watcher does not know the describer exists. You could
swap the describer for a human, a newer model, or a random phrase
generator, and the watcher would never notice. That decoupling is why
the piece survived its model's obsolescence.

## Augmented Hand Series (2014): editing anatomy, not pixels

Built with Golan Levin and Christine Sugrue. A box you put your hand
into; a screen shows your hand with its logical structure edited.
Levin's project page (read in detail, including the full scene
catalogue) lists around twenty scenes: extra or missing fingers,
altered knuckles, fractal recursion, throbbing and meandering fingers,
breathing palms, spring-driven exaggeration, Lissajous warps,
Procrustes stretches.

The key technical distinction, and the reason it belongs in this
study: the transforms are hand-aware. The system segments the hand and
edits inside its anatomy. A whole-frame distortion would be a filter;
this is surgery. That is what makes it uncanny instead of merely
wobbly. The installation photo (inspected at 665x443) shows the setup:
a kid's hand in the black box, the screen showing a six-fingered hand,
rear-projected large.

Levin's page is unusually honest about limits, which is worth
emulating: it works from about age five up, across a broad range of
skin tones, with jewelry and tattoos; it is undefined for fists and for
hands that do not have five fingers. Stating the failure modes in the
project description is part of the work's maturity.

## Terrapattern (2016): search by pointing

With Levin, David Newbury, and others. Query-by-example over satellite
imagery: click any spot on the map and a conv-net embedding returns the
nearest-neighbor tiles that look like it. Trained with OpenStreetMap
labels (per the Fast Company coverage). The canonical examples: boat
wakes, container yards, cul-de-sacs, Christmas tree farms, fracking
wells. The inspected thumbnail shows the result UI: a 3x3 grid of
matched satellite tiles for a container-yard query.

McDonald's 2026 framing is that the general idea was embedding distance
as a medium, and that the project was part of the moment "computers
were soft again," meaning the outputs were suggestive rather than
authoritative. The local re-render (inspected at 1100x800) stood in a
simple color, saturation, and variance feature for the learned
embedding, labeled honestly as a substitution: click a tile, the
nearest neighbors by that crude metric highlight with a yellow ring and
the rest dim. Even the crude version communicates the interaction
grammar, which is the point. The interaction is the piece; the
embedding is a dial you can turn from crude to learned.

Honest gap: the live terrapattern.com returned a 526 from this
network, so the production UI was studied from the thumbnail and
coverage only, not visited directly.

## Binary Stacks (2008, revisited 2026)

A 2008 generative system, translated this year with Glitchwear into
knitted garments: one pixel per stitch, one of 1,024 designs, with the
seed printed near the collar. The inspected photo shows the knit
reading cleanly as the generative output. The through-line to the rest
of his work: the system is the work, and the translation between media
(one pixel equals one stitch) is stated as plainly as the two-file
coupling in Neural Talk and Walk. Honest gap: the original 2008
system's internals were not recovered this session, and the Glitchwear
storefront fetch failed on a local browser disconnect, so this section
rests on the project description and the garment photo.

## What works, and what is overdone

What works: the commitment to the human layer. Every one of these
pieces gets better the moment a person is inside the loop, whether as
annotator, walker, or hand in the box. The technical choices are
always the smallest ones that could work (YouTube for streaming, two
files for IPC, 140 characters for notes), and the smallness is what
makes the pieces legible. The stated limits (Augmented Hand's failure
modes, Exhausting a Crowd's privacy reasoning) read as confidence, not
apology.

What is overdone, or at least exhausted: the word-camera as a novelty
is done. Neural Talk and Walk charmed in 2015 because the model was
bad in interesting ways; a 2026 captioning demo with a good model is
just a product. The surveillance-chic of Exhausting a Crowd has also
been widely imitated, usually without the consent reasoning that made
the original defensible. Anything derived from this study should take
the mechanisms (crowd annotation, file-coupled processes, anatomical
editing, embedding search) and leave the aesthetics of 2015 behind.

## Avoid list additions

- Surveillance aesthetics without the consent framing. The V&A piece
  works because the privacy reasoning is in the writeup. Without it,
  it is just watching people.
- "AI describes your photo" as a piece. The novelty belonged to the
  era of bad models. The interesting version now is the human layer,
  not the caption.
- Whole-frame distortion presented as transformation. The Augmented
  Hand lesson is that the edit has to respect the object's structure
  to be uncanny. Filters are not surgery.

## Visual evidence inspected this session

- exhaustingacrowd.com/london live (loading screen captured; video
  player spinner noted as a headless limitation)
- Hyperallergic article GIF: 13 frames extracted, frames 0, 6, and 12
  inspected (night street, pinned chips, the kiss sequence)
- Complete frontend.ts (276 lines) and repo README, read in full
- Complete Neural Talk and Walk gist (1.5 KB openFrameworks), read in
  full
- Levin's augmented-hand-series.jpg (665x443): installation with the
  six-finger hand on screen
- kylemcdonald.net thumbnails: terrapattern result grid, exhausting
  crowd, binary-stacks knit
- Local re-render 1: Terrapattern-style query-by-example (tile 7 as
  query, neighbors ringed, rest dimmed), inspected at 1100x800
- Local re-render 2: Exhausting-style note accumulation (5 walkers,
  archive notes pinned to tracked paths, fading trails), inspected at
  1100x800

## Honest gaps

- The Exhausting a Crowd video was not watched in motion (headless
  player stuck on a spinner); the in-motion reading comes from the
  article GIF.
- The Neural Talk and Walk Amsterdam video and the Augmented Hand
  demo videos were not watched.
- terrapattern.com was unreachable from this network (HTTP 526), so
  the production UI was not visited directly.
- The 2008 Binary Stacks system internals were not found; the 2026
  knit translation rests on the project description and one garment
  photo.
- No model was trained and no satellite tiles were fetched; the
  Terrapattern re-render uses a labeled stand-in feature.
