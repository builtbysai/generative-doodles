# fyprocessing: Study Notes

**Profile:** fyprocessing.tumblr.com | "For Your Processing", a reblog
aggregator blog run by Justin Lincoln. Blog description: "Projects and
tutorials that keep me excited about the programming language Processing."
**Status:** 2026-09-20, preliminary pass (text-deep, no visual inspection).
The archive page fetch failed again this session (tool failure, and the
screenshot rig was off limits after it), so no post was read from the blog
directly and no artwork was visually inspected. All eight posts below were
recovered secondhand: five through full reblog text preserved on the mirror
procedural-generation.isaackarth.com, three through third-party citations
(GitHub issues, meetup notes, a blog roll). Technique notes are
reconstructed from that text plus knowledge of the works themselves.
Nothing here is claimed as visually seen. A full visual pass is still
wanted when the archive is fetchable.

## Why this source matters

fyprocessing is not a single artist's sketchbook, it is one person's taste
filter over the Processing community at its most active (roughly 2010 to
2016). Tim Rodenbröker calls it one of the most important addresses of the
old Tumblr creative coding scene, alongside p5art.tumblr.com: no algorithm,
just a chronological stream of other people's sketches, mostly GIFs and
short videos. As a study source its value is aggregate, not single-piece:
it shows which techniques the community kept returning to, and which
combinations a good curator thought worth amplifying.

## Posts recovered

### 1. Raven Kwok, "Skyline" (reblogged 2016-10-19)

A code-based generative music video for the track "Skyline" by Karma
Fields. The entire video is multiple stages programmed and generated in
Processing.

Core technique: Voronoi tessellation as the single geometric primitive.
Seeds are sorted into agent types, each with behaviors and appearance
transformations, driven by the song's audio spectrum in customized layouts,
plus an animated sequence of the vocalist. One primitive plus one driver
(audio) plus agent behaviors, producing a complex organic outcome.

What makes it sing: the restraint of the premise. Voronoi alone is a
cliche, but Voronoi seeds typed as agents with distinct behaviors, all
pushed around by the audio spectrum, is a system rather than a texture.
Multi-stage structure keeps it from being one endless wobble.

What is overdone: Voronoi is possibly the single most overused primitive
in generative art. The lesson is not "use Voronoi", it is "give the cells
behavior".

### 2. Ale Gonzalez, "Procedural Ink" (reblogged 2015-09-18)

A procedural drawing tool. It takes a photo as input, analyzes it to
detect a vector field, and generates curving lines along that field.
Source code for the basic technique is on OpenProcessing
(openprocessing.org/sketch/117624). Gonzalez has a large body of similar
technique sketches, including a generative music video.

Core technique: image-driven flow fields. The picture becomes the wind.
Instead of noise() as the field source, real image data (edges, gradients)
steers the particles.

What makes it sing: it turns any input photo into a drawing collaborator,
and the field is legible, you can see the source image in the line
directions. A good reminder that the field function is a design choice,
not a default.

What is overdone: flow-field hair in general. The avoid-list entry stands:
a noise field and ten thousand particles is the generative equivalent of
a lens flare.

### 3. literacola, "Maze Bounce" (reblogged 2015-08-06)

Experiments using maze generation as a sound visualizer. Tagged by the
mirror: unusual inputs, procgen, sound visualization, processing.

Core technique: cross-wiring. Feed an ordered signal (sound) into an
algorithm built for something else entirely (maze generation). A maze
generator has inherent structure, corridors, branches, dead ends, which
gives the visualization composition instead of blob noise.

What makes it sing: the idea is portable. Take any generator with strong
internal structure and drive it with an unrelated signal. The mirror's
commentary asks the reverse question too: what if you used a maze
generator as input into your sound synthesizer.

What is overdone: audio-reactive blobs that pulse on the kick drum. The
interesting part here is the structure of the maze, not the reactivity.

### 4. Nervous System, "Floraform" (reblogged 2015-07-01, via notational)

A generative design project inspired by the biomechanics of growing
leaves and blooming flowers, exploring the development of surfaces through
differential growth. Justin reblogged it while noting he was not sure it
was made with Processing at all, adding that Nervous System had been
active in the Processing community for years.

Core technique: differential growth. A mesh of connected nodes where each
edge splits when it gets too long and nodes repel each other locally,
grown iteratively into ruffled, organic surfaces.

What makes it sing: forms no hand drawing would produce, with genuine
biological credibility. Growth algorithms earn their organic look from
the process, not from styling.

What is overdone: differential growth prints and posters became a whole
recognizable genre. The visual signature is instant, which means it now
reads as a style choice rather than a discovery.

### 5. Leaf venation, space colonization (reblogged circa late 2014)

A leaf venation sketch built on the space colonization algorithm from
Runions et al., The Algorithmic Beauty of Plants. Cited from a Coding
Train suggestion-box thread; the author's Processing repo is
nielmclaren/Venation.

Core technique: space colonization. Scatter attractor points, grow vein
segments toward the nearest attractors, remove attractors once reached.
A few rules produce branching networks that read as genuinely biological.

What makes it sing: it is one of the best study models for agent-based
growth, small enough to hold in your head, rich enough to look alive.
Daniel Shiffman's Coding Challenge #17 covers the same algorithm, so
there is good teaching material around it.

What is overdone: space colonization trees and leaves are extremely
common output. The algorithm is a study tool first, a finished piece
second.

### 6. Andreas Refsgaard, "Video Painter" (reblogged circa Aug 2015)

A Processing sketch for painting with video. A brush samples pixels from
a video feed as you paint, with a controlP5 GUI exposing alpha,
resolution, and brush size. A side project from the Intro to Programming
course at CIID. There is also an openFrameworks version with a shader
implementation.

Core technique: video as paint. Each brush stroke stamps sampled video
pixels rather than flat color, so the painting carries the motion and
texture of the source footage.

What makes it sing: video is a rich, structured input, and exposing the
parameters (alpha, resolution, brush size) through controlP5 shows the
value of making a sketch playable. Student side-project energy, built
from scratch, shipped with a demo video.

What is overdone: smear and feedback effects slide easily into
filter territory, where the tool is more interesting than anything made
with it.

### 7. p5art reblog: Creative Coding course announcement (2015-07-06)

Not artwork. fyprocessing amplified p5art's announcement of a free six
week Creative Coding course on FutureLearn starting August 3, 2015, aimed
at total beginners. Worth noting because it shows the blog's second
function: boosting community learning resources, not just finished
pieces.

### 8. Scott Murray talk reblog (July 2015)

A reblog of a talk by the author of Interactive Data Visualization,
covering D3, Processing, and p5.js. Again not a sketch, but it shows the
blog's range reaching into data visualization education, and it dates
the moment p5.js was entering the community conversation.

## Recurring techniques across the sample

Eight posts, six of them artworks, and the same ideas keep appearing:

- Flow fields, twice (Procedural Ink's image-driven field; implied in the
  general community output the blog aggregated).
- Agent systems with typed behaviors (Skyline's Voronoi agents, the vein
  growers in space colonization).
- Growth algorithms (differential growth in Floraform, space colonization
  in the venation piece).
- Audio as a driver (Skyline's spectrum, Maze Bounce's unusual input).
- Real-world data as input (photo as vector field, video as paint).

That list is basically the Tumblr-era Processing canon. The blog's
curatorial pattern: one clear technique, pushed until it becomes a
system, usually shown as a looping GIF or a short video. Composition in
the sample leans square-ish and loop-friendly, built for the dashboard.

## What to take from it (study, not copy)

The portable ideas, not the pieces:

- The field function is a design choice. Procedural Ink's move, swapping
  noise for image data, generalizes: any structured input can steer any
  particle system.
- Cross-wire domains. Maze Bounce is the clearest example: take a
  generator with strong internal structure and drive it with an unrelated
  signal.
- Give the primitive behavior. Skyline's lesson is not Voronoi, it is
  typed agents with distinct behaviors inside a geometric system.
- Expose parameters. Video Painter's controlP5 GUI is a reminder that a
  sketch becomes an instrument when the knobs are reachable.
- Growth algorithms earn organic form from process. Study differential
  growth and space colonization as systems, not as styles.

## Avoid-list additions

- Voronoi with nothing on top. If the cells have no behavior, it is a
  texture, and it has been a texture ten thousand times.
- Default flow-field hair (noise field, thousands of particles, no
  further idea).
- Audio blobs that pulse on the kick drum. Structure the visualizer
  first, then react.
- Differential growth as a style. Recognizable instantly now, which
  means it reads as a choice, not a discovery.
- Space colonization output presented as finished art without a second
  idea. Great study model, common poster.

## What remains

The archive itself is still unopened. Eight posts across late 2014 to
2016 is a real sample but a thin one, and all of it is secondhand text.
When fyprocessing.tumblr.com/archive is fetchable, do the intended full
visual pass: a spread of posts across the blog's years, source links
followed where they work, artwork visually inspected, and note which
techniques recur across the community over time.
