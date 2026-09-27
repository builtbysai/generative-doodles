# Refik Anadol: Study Notes

**Date:** 2026-09-27
**Artist:** Refik Anadol (b. 1985, Istanbul; MFA Bilgi University, MFA UCLA;
director of Refik Anadol Studio, Los Angeles; teaches Design Media Arts at UCLA).
**Doorway:** hop from the Memo Akten study, the monumental counterpart to
Akten's instrument. Where Akten builds a piano and hands you the keys, Anadol
builds a cathedral and lets the machine dream inside it while you walk through.
Both came through Google's Artists and Machine Intelligence residency, and they
are the two poles of the ML art question: the loop versus the monument.

**Depth: deep.** refikanadol.com works index read; Artnet's Unsupervised
article read end to end; Hivemind's "Inside the Collection" essay (Synthetic
Dreams, Winds of Yawanawa) read end to end; process details from the Art
Newspaper's "On Process" coverage of the On NFTs Taschen chapter, the 60
Minutes transcript excerpts, and the studio's Konig gallery statement; 3
artworks visually inspected at full res (Unsupervised at MoMA install shot
1680x945, the studio's own Unsupervised portrait 1217x1400, Machine
Hallucinations Sphere still 1200x1200). Latent-walk dye field with boundary
currents and pigment stipple re-rendered locally in Python and 3 frames
visually inspected. Honest gaps: no GAN was trained here and the studio's
custom pigment pipeline code is not public; the motion was studied from
stills and descriptions, not watched as video; the Winds of Yawanawa visuals
were not inspected.

## The founding move: data as pigment, buildings as canvas

Anadol coined the phrase "data painting" in 2008, before he had the ML to
back it up, and the phrase tells you everything. Data is not information to
him, it is a material with weight, velocity, and temperature. It does not
need to dry. It can move in any shape, in any form, any color, any texture.
The Hivemind essay nails the doctrine: he selects each dataset to convey a
message or elicit a feeling, hope, joy, inspiration. The dataset is the
concept; everything after is craft.

Scale is not a side effect of his work, it is the thesis. The data paintings
go where crowds gather: Casa Batllo's facade, the Las Vegas Sphere, MoMA's
lobby, the Intuit Dome, a beach in Mykonos. The sensorium is the target, not
the screen. One human figure in the MoMA install shots stands dwarfed in
front of the 24-foot LED wall, and that dwarfing is the composition. Where
Akten's lesson was "build the loop before the look," Anadol's is "build the
room before the image." If our pieces ever go large, the space is the frame.

## The documented pipeline

The Art Newspaper's breakdown of the Casa Batllo process (from the Taschen
On NFTs chapter) is the clearest published recipe, and it has five steps:

1. Collect an enormous themed dataset (Gaudi sketches, archive files, public
   images of the house).
2. Process it with machine vision: object detection, image classification.
3. Sort the classified data into thematic categories, to understand the
   "semantic context of the data universe."
4. Train an AI model (DCGAN, PGAN, StyleGAN; StyleGAN2 ADA for the Coral
   series) on the sorted archive.
5. Build a "pigment pipeline" from the visual archive into the final output,
   expressed in the swirling fluid-inspired movements that have been his
   signature for over a decade.

The 60 Minutes piece fills in the middle step: the curated images are
converted into data points of color, texture, and shape, plotted into
multi-dimensional space. The AI learns patterns and creates images that "only
exist in the mind of a machine." Then custom software blends those outputs
into the fluid style.

For Unsupervised at MoMA, there is a sixth step before the GAN: a UMAP
reduction. The 138,151 pieces of MoMA collection metadata get dimensionally
reduced by UMAP (developer Leland McInnes is on record about the MoMA use)
into a similarity layout, the "data universe." The GAN then hallucinates on
that universe, and the studio tinkers with color, the interconnectedness of
data points, and the specific moment in time and space of the rendering. Two
of the three Unsupervised chapters are genuinely generative and live; the
third is precomputed. "It is all machine made. We do not know which work
will play when and how."

## The latent walk: continuous, never repeating, bent by weather

The signature motion is a slow continuous interpolation through the trained
model's latent space, the machine "dreaming" of the dataset. The dream never
repeats, and that non-repetition is load-bearing, not decorative. Then the
environment bends it. At MoMA, sensors read crowd movement, light changes,
and acoustic volume, and the visualization is "subtly inflected by this live
feedback from the atmosphere, like a river affected by the wind." At the
Sphere, the Nature chapter animated 400 million flora/fauna photographs with
live wind and gust speed, precipitation, and air pressure captured from
sensors in Las Vegas. He compares the method to Monet being inspired by the
atmosphere. The input does not drive the piece, it perturbs it. The dream
continues underneath.

## The visual signature, from the three inspected stills

MoMA lobby shot (1680x945): the form is sculptural, like thick poured paint
or crumpled paper, cobalt blue against molten red-orange against cream,
granular stipple across the folds, deep black shadow pockets, the whole mass
glowing from inside the frame. The studio's portrait shot (1217x1400) shows a
different chapter: the pigment built from visible granular dots, almost a
point cloud, red and cyan masses with spray breaking off the top edge into
the pink-lit frame.

Sphere still (1200x1200): the entire dome marbled like ebru, Turkish paper
marbling, which reads as deliberate from an Istanbul-born artist. Magenta
and amber and lime masses separated by darker boundary currents, with fine
inner striations inside each mass, small-scale combing texture. The dark
lines are as important as the color: they are where two pigment worlds meet.

Three things make it sing: (1) the palette is always fully committed, no
muddy in-between, every mass at full saturation; (2) the boundary currents
give the abstraction a physical logic, it reads as fluid even when it is
just color; (3) the granular stipple at the finest scale, which reads as
material rather than pixels.

## Sound as data too: Winds of Yawanawa

The Yawanawa series (2023, with chiefs of Aldeia Sagrada and Nova Esperanca)
runs on weather data from the sacred village: wind speed from tempestuous to
tranquil, temperature from freezing to scorching, and origin coded from star
(ishti) to flower (uwa). The data manifests as visual traits borrowed from
two young Yawanawa artists' imagery, rendered in the signature undulating
pigments. Each of the 1,000 data paintings is a 60-second loop with one of
four generative soundtracks; the three data sculptures are 8-minute loops
shown immersively. The studio's word for the doctrine is "intermediality":
the combination of visual, auditory, and tactile registers is supposed to do
more than the sum of its parts, and proceeds went to the Instituto Nixiwaka
for the villages. Technique note: pairing a data dimension to a visual trait
borrowed from a collaborator's hand is a portable move. The dataset carries
the message, the collaborator's imagery carries the voice.

## What the local re-render taught

The study script walks two procedural "modes" (standing in for latent-space
regions) with a non-repeating trajectory, stretches the dye field to the full
palette, paints dark boundary currents where the field crosses its middle
band along a large-scale curl flow, adds thin contour striations inside the
masses, and stipples along the strongest currents. Three frames inspected.

What worked: the dark current lines are what sell the fluid read; without
them the same field is just marbled wallpaper. The inner striations carry
the ebru/marbling echo at almost no cost. Stipple only reads if it is sparse
and glued to the currents.

What did not: my render is flat 2D contour bands. His sculptural chapters
have real volumetric shading, occlusion, depth of field, the poured-paint
look, and that needs a renderer, not a colormap. Also his modes are learned
from real archives, so the masses carry echoes of real content (the Grand
Canyon is recognizable in one Synthetic Dreams painting). Procedural noise
can do the motion grammar, never the memory.

## Avoid list additions

- The giant fluid-marble look without a dataset that justifies it. The look
  is cheap now; the dataset is the piece.
- A smooth seamless loop. His work's power is partly that it will never show
  you the same frame twice. A perfect loop is a screensaver.
- Treating the model as the artist. Every published process description ends
  with human curation: dataset choice, theme sorting, pigment pipeline,
  parameter tinkering. The machine dreams, the studio directs the dream.
