# Weidi Zhang p5.js Image-Data Tutorial: Study Notes

**Source:** YouTube video me04ZrTJqWA, "P5.js Tutorial | Create a generative art
using image data", by Weidi Zhang (zhangweidi.com) |
**Context:** cited as the entry-point tutorial by ConsenSys Academy's
blockchain developer course, several GitHub image-manipulation projects, and
a creative-coding talk deck

**Depth:** preliminary. The YouTube page would not load through the available
tools this session, so this pass is built from the video's wide citation
trail: repos explicitly built from it (keblur2050/generative-art-p5.js,
yasmin-a95/image_manipulation_algorithmic, samnaji/smnji
generative_art_from_image), the talk deck that references it as the "create a
generative art using image data" tutorial, and the closely related dev.to
writeup "Recreating paintings with Generative Art, using p5.js". The technique
below is reconstructed from those sources, not watched frame by frame. It
wants a proper viewing pass.

## Who he is

Weidi Zhang is a creative technologist working in p5.js and Processing-style
generative art. His site zhangweidi.com hosts his pieces. This particular video
became a quiet classic: years after posting, it is still the link people hand
beginners who ask "how do I make generative art FROM a photo".

## Core technique: image data as the seed

The video's whole idea is that a photograph can drive a generative system.
Instead of inventing color and structure from nothing, you sample the image's
pixel data and let it decide what gets drawn.

The p5.js mechanics, as demonstrated across the derivative projects:

- `loadImage()` brings in a source photo; `loadPixels()` (or `get(x, y)`)
  exposes the RGBA buffer.
- Walk a grid over the image (or walk randomly, or walk agents across it).
  At each sample point, read the pixel's brightness, hue, or saturation.
- Map the reading to a mark: circle radius from brightness, line angle from
  hue, stroke weight from saturation, shape type from luminance bands. Dark
  pixel, big dot; light pixel, small dot; or the reverse.
- The canonical output, visible in the repos that credit him, is a re-drawn
  portrait built from thousands of small marks that keep the source's tonal
  structure while replacing its texture. Think photomosaic's hand-drawn
  cousin, or ASCII art with a brush instead of characters.

A close relative, well documented in the dev.to piece, drives random-walk
agents across the photo: each agent steps with Perlin-noise direction and
picks up the destination pixel's color for its trail, so the portrait emerges
from wandering lines rather than a grid. Same family, different walk.

## Palette and composition

The palette is inherited from the source image, which is the point: pick a
good photo and half the composition work is done. Compositionally these pieces
are portraits of the source; the generative part is the mark-making vocabulary
laid over it. The strongest examples choose source photos with clear tonal
masses (a face against a dark ground) so the data has something to say.

## What makes it sing

It is the most forgiving on-ramp in generative art. Pure-math pieces fail
ugly when the parameters are wrong; image-driven pieces always have the photo
holding the composition together, so even a clumsy first attempt looks like
something. That is why this video keeps getting cited: it gives beginners a
win on day one, and the win teaches the real lesson, that data can be a brush.

For the doodle sketchbook, the takeaway is a whole family of moves: sample
any image (a photo, a previous doodle, a noise field rendered to pixels) and
redraw it with a different mark vocabulary. Halftone dots keyed to
brightness, contour lines keyed to luminance bands, stipple density keyed to
darkness, short strokes oriented by the local image gradient. One sampling
loop, endless vocabularies.

## What is overdone (avoid list)

- The plain "photo redrawn as dots" is the hello-world of this family. A
  doodle that stops there is a filter, not a piece. The interesting work
  changes the walk (agents, flow fields through the image's own gradient),
  changes the marks (calligraphic strokes, woven threads), or feeds the
  output back in as the next input.
- Watch the source photo choice: low-contrast busy snapshots produce muddy
  output no matter how good the code is. Strong tonal masses in, strong
  piece out.
