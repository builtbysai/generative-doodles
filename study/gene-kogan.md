# Gene Kogan: Study Notes

**Date:** 2026-09-27
**Artist:** Gene Kogan (artist, programmer; the teacher pole of the
creative-ML scene; launched ml4a, the free book on machine learning for
artists, with Francis Tseng).
**Doorway:** hop from the Sofia Crespo study. Crespo entered this scene
through a Kogan workshop in 2018; Anadol came through the same 2018-era
AMI-adjacent circuit. If Anadol is the monumental pole of the ML question
and Crespo the biomorphic pole, Kogan is the pedagogical pole: the one who
built the curriculum everyone else walked through. The hop also closes a
small loop in the queue history: Andreas Refsgaard, his Doodle Tunes
collaborator, appeared earlier in the fyprocessing archive notes (Video
Painter), and the ml4a thread connects back to Memo Akten's open-source
teaching work. Next doorways: Andreas Refsgaard; Tom White (Perception
Engines; thanked on the ABCnet page); Francis Tseng (ml4a co-author).

**Depth: deep.** genekogan.com read: "A Book from the Sky" project page
read end to end (full bilingual English/Chinese text, all interpolation
series described), "Experiments with style transfer" read end to end,
"Deepdream prototypes" read end to end. The repo's _works listing read
(77 entries); raw frontmatter confirmed that cubist-mirror, ml4a,
tsne-iterations, and stylegan-antipodes are link stubs (alt_url to
Vimeo/ml4a.github.io), noted honestly below. Jen Christiansen's
Scientific American piece on his Eyeo "The Neural Aesthetic" talk read
end to end; his aiartists.org profile quotes and exhibition history read;
the Ethical Machines episode 3 transcript skimmed for his tooling
position; ml4a.github.io and ml4a.net surveyed at TOC level. Nine
artworks visually inspected at full res: the hieroglyphs/nebula/maps
Mona Lisa triptych, the cubist/van Gogh/Monet Mona Lisa triptych, the
3x4 deepdream chalice grid, the deepdreamed Da Vinci, the Cubist Mirror
install still, plus his ABCnet radical-interpolation and year-month-day
GIFs frame-extracted and inspected upscaled. Two techniques re-rendered
locally in Python and visually inspected: a patch-based texture transfer
(content/style/output trio, his Mike Tyka patch-fork lineage), and a
procedural radical-preservation glyph interpolation (5-frame strip,
the ABCnet observation restated without a GAN). Honest gaps: no GAN
and no VGG were trained or run here, so the re-renders are procedural
analogues, not the real pipelines; the video works (J-train style
transfer films, Cubist Mirror motion, the 20x20 interpolation matrix
mp4) were not watched, they live on Vimeo; Cubist Mirror was seen only
as one install still; the ml4a book was surveyed, not read end to end;
his ABCnet GIFs are 56px thumbnails, inspected upscaled with heavy
pixelation, so fine glyph detail claims stay modest.

## The founding move: teach the tool by making the art with it

Kogan's practice has two faces and they feed each other. Face one is
the experimenter: style transfer, DeepDream, DCGANs, each taken up the
month the paper or code drops, each page a lab report with the knobs
labeled. Face two is the teacher: ml4a, the free book, the 40-plus
guides, the video lectures, the NYU class notes. The move that makes
both work is that the teaching is done through the art. He does not
write tutorials about style transfer in the abstract; he publishes
the Mona Lisa restyled by the Crab Nebula, then the gist with the
instructions. The artwork is the documentation and the documentation
is the artwork. That is why his 2015-2016 pages still read as fresh
technique writing while most "neural art" blog posts from the era
read as press releases.

The position, from the Ethical Machines transcript: academia was
starting to make these things "a little bit more usable for
non-academics," and "all of the neural style libraries, they're all
just command-line utilities. You just put in a content image and a
style image." His contribution was to treat that usability as the
artistic material itself: lower the floor, then see what walks in.

## A Book from the Sky: latent space as linguistics

December 2015. A DCGAN (Radford, Metz, Chintala's paper was a month
old; Alec Radford's dcgan.torch code) trained on a labeled subset of
about one million handwritten simplified Chinese characters from the
IAPR-TC11 corpus. After training, the generator produces fake
characters not in the dataset. The title points at Xu Bing's 1988
《天书》, thousands of fictitious glyphs carved in Song and Ming
print style: the machine is doing, earnestly, what Xu Bing did
ironically.

The page is structured as four experiments, and the structure is the
lesson:

1. **Exploring the latent space.** Walks in the neighborhood of
single characters (the zloops: i_z_Have, i_z_learn, i_z_day, and a
dozen more). The generator parameterized by a high-dimensional vector;
traverse it and "peer into its imagination."

2. **Reading between the lines.** Straight-line interpolations
between pairs of real characters (eye/face/body; people/culture;
city/capital/country/world; year/month/week/day). The intermediates
are "imaginary characters interpolated from in between real ones,
perhaps corresponding to semantically intermediate concepts."

3. **Radical interpolation.** The finding. Chinese characters are
built from radicals, graphical components that hint at meaning. When
he interpolates through characters sharing the 口 (mouth) radical
(后, 台, 名), the 口 stays coherent, highlighted in red, while the
rest glides. Same for the 人 (person) radical across 人, 从, 会, 今,
仍, 仍, 任, 件: "Remarkably, the 人 appears coherent during the
transitions, even as it glides into different forms and positions!"
The network, trained only on pixels, disentangled the semantic
substructure of the writing system. That is the whole paper's worth
of insight in one GIF.

4. **Linguistic algebra.** Word-vector arithmetic (king - man +
woman = queen) ported to glyphs: 王 - 男 + 女 = ?. Plus a 20x20
matrix of interpolation loops between the 20 most frequent
characters.

What makes it sing: the page never claims the machine understands
Chinese. It claims the geometry of the latent space rhymes with the
structure of the writing system, and then it shows you the rhyme,
four ways, with the evidence animated. The bilingual page (every
section in English and Chinese) is itself part of the argument: this
is a work about a writing system, presented in two of them. The
avoid-list entry it earns: latent-space mysticism that never shows
the walk. Kogan shows the walk, at 56 pixels, and that is enough.

## Style transfer as a laboratory, not a filter

The style transfer page (2015-2016) is the clearest expression of
his comparative method. He never shows one result. He shows the
same content under many styles, or many contents under one regime,
so the parameter becomes visible:

- **Mona Lisa x (Egyptian hieroglyphs, Crab Nebula, Google Maps).**
Inspected at full res. The hieroglyph version dissolves her into
dense black glyph-line work on papyrus tan; the pose survives, the
face becomes line drawing. The nebula version keeps her form and
shifts her into deep blue-green-purple with star sparkle; content
survives, style is color plus micro-texture. The Google Maps version
is the honest accident that teaches the most: map tiles, street
labels, yellow route lines, and red location pins clustered across
her face like a rash. The Gram matrix does not know a pin is an
object, so the pins splatter. This is the canonical Gatys
failure mode, published as a feature: the residue of the style
image's literal content is part of what "style" means to the
network.
- **Mona Lisa x (Picasso, van Gogh, Monet).** The cubist version
facets her into ochre-gray planes (and prefigures the Cubist
Mirror). The van Gogh version carries her on impasto swirls, blue
dominant. The Monet version is the gentlest: warm haze, content
almost untouched. Three points on the content-preservation curve,
one image.
- **Mr. Div's disco ball x Klimt's "The Kiss."** A GIF; the joke
lands because the style image is so semantically loaded and the
content so dumb.
- **Alice in Wonderland tea party x 17 iconic paintings.** The
comparative method at scale.
- **Video:** Ruder/Dosovitskiy/Brox optical-flow loss for
frame-to-frame stability, applied to footage out the J-train
window: Van Gogh, Hokusai, Google Maps, Basquiat. The Google Maps
video is the same residue joke, in motion.
- **The HD tree:** 1920x1080, Hokusai then Arabic calligraphy,
via Mike Tyka's patch-based fork of Anders Boesen Lindbo Larsen's
implementation. Patch-based, not Gram-based: the style image
rebuilt from its own pieces. This is the lineage my local
re-render follows.
- **Cubist Mirror (2016):** the installation. Near real-time style
transfer on the webcam feed, Johnson/Alahi/Li feedforward net
("perceptual losses"), Yusuke Tomoto's chainer implementation,
trained on a generic cubist painting. The install still shows a
visitor photographing the screen: her own face fractured into
cubist planes, the phone showing the same. The mirror framing
matters. It is not "a cubist filter," it is a mirror that only
reflects in Cubism, and the visitor's act of photographing it
completes the piece.

Technique anatomy worth keeping: Gatys content loss (deep-layer
feature maps, content survives) plus style loss (Gram matrices of
early layers, texture statistics, spatially blind, hence the map
pins). Feedforward distillation (Johnson/Alahi/Li) trades the
slow optimization for a trained transformer net: one style, real
time, which is what makes the mirror possible. Optical-flow loss
(Ruder et al.) pins consecutive frames together so video does not
shimmer. Patch-based (Tyka) swaps Gram statistics for literal
patch lookup, which changes the artifact signature from smear to
mosaic.

## Deepdream prototypes: oscillating the layers

July 2015, Google's inceptionism code, days old. His note is short
and technical: interesting animations by iteratively zooming into
the output and oscillating which layer to enhance. Enhancing
different layers finds "lesser-seen classes," like the
chalice-like bowls from inception_3a/relu_5x5_reduce. The 3x4 grid
I inspected is exactly that: twelve goblets/hourglasses, pearly
iridescent, background faces and dogs melting into the chalice
texture. The deepdreamed Da Vinci is the famous mode: dogs and
birds grown out of Renaissance architecture, a man's face in the
corner.

What separates this from the deepdream slop of the era: he is not
enhancing the famous dog-slug layers for the hundredth time. He is
sweeping the layer parameter and reporting what each layer dreams.
The technique is the sweep. The avoid-list entry: enhancing the
same two layers everyone else enhanced, which is how an entire
year of "neural art" ended up looking like one screensaver.

## ml4a: the infrastructure as the artwork

Launched 2016 with Francis Tseng. A free online book, 40-plus
instructional guides maintained by collaborators, interactive demos,
video lectures, NYU class notes. The book was still in progress in
the snapshot I read ("four chapters complete, others stubs"). The
project has since moved to ml4a.net: Fundamentals, ml5.js, and
Colab guides (DeepDream, semantic segmentation, Glow reversible
models, Wav2Lip). The honest note: I surveyed the tables of
contents; I did not read the book end to end.

His line from the aiartists profile is the thesis for the whole
ML thread of this study queue: "machine learning does to the study
of consciousness and cognition what the telescope did to the study
of astronomy. It gives us, for the first time, a means of
empirically and physically studying it... primarily by modeling
crowd-sourced datasets, which can be thought of as collections of
human experience and perception." And the practice line: "I am
interested in generative models trained on large crowd-sourced
datasets to explore the idea of collective imagination, as well as
uses of real-time on-the-fly learning for creating interactivity,
especially in the context of live performance." Collective
imagination plus live interactivity: that is the two-sentence
summary of his entire works index, from A Book from the Sky to the
Cubist Mirror.

## The two re-renders, inspected

**Patch-based texture transfer** (content / style / output trio,
256px). Content: a flat synthetic landscape (sun, hills, house).
Style: a synthetic swirl field from advected dots. Method: 12px
patches on a 6px stride, match by grayscale luminance, paste the
style patch re-centered on the content patch's mean color so tone
comes from content and texture from style. The output reads: all
the content shapes survive (sun, house, hills, ground), every one
of them rebuilt in swirl-grain. The artifact signature is exactly
what the theory predicts: a fine mosaic where patches meet, and
where content is flat (the sky), the style field shows through as
confetti. This is why the patch-based fork has a different look
from Gram-based transfer, and why Kogan bothered to try it on the
HD tree. Lesson for the seed file: the matching criterion is the
aesthetic. Match on luminance and you get tone-faithful texture;
match on structure and you would get something else entirely.

**Radical-preservation glyph interpolation** (5-frame strip,
t = 0, 0.25, 0.5, 0.75, 1). Two synthetic "characters" sharing
one red box "radical"; the top strokes interpolate between a
V-pair and a cross-bar while the box stays glued. The middle
frames are the point: neither character, but plausible writing,
with the shared component rock steady. This is the ABCnet
observation restated procedurally: interpolation in a good latent
space preserves shared substructure, and the preserved part is
evidence the representation disentangled something real. Lesson
for the seed file: design the shared component first, then the
walk.

## What to steal (derived, not copied)

- The comparative grid as composition: same content under N
treatments, presented together, so the parameter becomes the
subject. His pages are built this way; the gallery could be too.
- Style images chosen for their literal residue, not just their
texture: the Google Maps pins are the most memorable style
transfer on the page precisely because the style image had objects
in it.
- The experiment report as the art page: knobs labeled, code
linked, honest about what the machine does not know.
- Design the data, then walk the space: the Crespo lesson is
already his lesson (she learned it in his workshop). The dataset
is the brush.

## Avoid list (additions)

- One content, one famous painting, no parameter thought: the
Instagram-filter mode of style transfer.
- Deepdream with the famous layers only: the puppy-slug
screensaver.
- Latent-space writing that never shows a walk or an
interpolation. If there is no strip of intermediates, there is no
claim.
- Style images with literal objects, used unthinkingly: the pins
will splatter. Either choose the style for its residue or check
the residue before shipping.
- Content dissolved past recognition at high style weight, unless
the dissolution is the point (the hieroglyph Mona Lisa earns it;
most do not).

## Next doorways

- Andreas Refsgaard (Doodle Tunes collaborator; Video Painter
already in the fyprocessing notes): drawing as instrument.
- Tom White (Perception Engines; thanked on the ABCnet page):
what the model sees, drawn back.
- Francis Tseng (ml4a co-author): the other half of the
pedagogical pole.
