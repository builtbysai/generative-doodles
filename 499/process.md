# No.499 — Eye Threads

EXPANSION #60 giulia-tassi, prompt GT3. Built and QA'd only; not pushed.

## Concept

Giulia Tassi's "Incroci di culture" device as a watch-only loop: seven flat
figures walk in place across a field of white zebra stripes on indigo, and
dashed threads in red, mustard, and teal run horizontally through every
figure's eyes, edge to edge of the canvas, so the crowd reads as one
connected system. Each figure uses her face grammar (2-arc eyes, L-line
nose, short-curve smile, flat hair block, optional dot-cluster beard),
varied skin tones, and exactly one low-density texture (dots, dashes, or
squiggles) per clothing region. Threads pulse along their length via
dash-offset drift; figures step on a 2-frame, 1.2 s walk cycle; eyes blink
on seeded 6-9 s staggers. No interaction.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette exactly per prompt: indigo #3D488A, white stripes, skins
  {#E8833A, #F397BE, #9DB4DD, #F8F5F0}, threads {#B93439, #E9A63B,
  #87CECA}; clothing/hair colors drawn from the wider giulia-tassi study
  palette. Flat fills only, no gradients anywhere.
- Seeded with mulberry32 (seed 499003): stripe band pattern, figure skins,
  hair styles (cap / cap+bun / side panels), beards, shirt and pants
  colors and textures, walk phases, blink periods are all fixed per run.
- Composition is laid out on a centered square stage (side = min(W, H))
  that keeps its shape at any aspect; the indigo ground and the -30 deg
  zebra stripes bleed to the full canvas. Canvas size comes from the
  Visual Viewport API with resize listeners on visualViewport and window;
  canvas style width/height are pinned in px inside draw() every frame.
- Threads are drawn last, over the figures: one dashed quadratic segment
  per span (canvas edge to first eye, eye to eye, last eye to canvas
  edge), colors cycling red/mustard/teal, with a small knot dot at each
  eye anchor so the chain reads as a single threaded line.
- Determinism: the first frame is drawn synchronously at the constant
  pre-roll PHASE = 2.35 s (figures mid-stride at fixed phases, fixed dash
  offset, all eyes open — blink offsets are adjusted at setup so no figure
  is mid-blink at PHASE). The rAF loop is typeof-guarded and anchored as
  PHASE + elapsed from the first rAF stamp; no Date.now() anywhere; no
  requestAnimationFrame / AudioContext / document.createElement /
  offscreen canvas, so the QA renderer runs it as-is.

## QA log

Rendered with ~/workspace/tools/render-piece.js (node-canvas):

- qa-desktop.png (1280x900): seven figures in a row over diagonal white
  stripes on indigo; the dashed thread chain runs through all seven eye
  lines and off both canvas edges, segments alternating red, mustard,
  teal, knots at each face. Faces show the full grammar. Every shirt and
  pair of pants carries its texture. Nothing overlaps or clips.
- thumb.png (720x720): same read at gallery size; threads stay legible as
  one connected system.
- qa-mobile.png (390x844): square stage centered in the portrait frame,
  ground and stripes full-bleed, all seven figures complete, thread chain
  spans the full width; nothing clipped.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical; second render deleted. Re-verified after each fix below.

Fixes during QA:

1. First pass: hair caps were drawn after the face and their arc chord
   dipped below the eye line, covering the eyes on most figures. Hair is
   now a shallower cap drawn before the face features, so the grammar
   always sits on top of the hairline.
2. First pass: the alternate walk frame splayed the legs into a deep
   scissor X. Angles were split into a wide stride frame and a
   legs-passing frame, and the trailing foot lifts slightly; the walk now
   reads as stepping.
3. The beard was two dense dot rows that read as a mask; reduced to one
   jaw row plus three chin dots.

Deviations from the prompt: none of substance. Two implementation choices
worth noting: the thread is built from per-segment dashed quadratics
rather than one continuous path (required so each span carries one of
the three thread colors while the dash phase stays continuous), and the
square-stage letterboxing described above, which is how the square
composition rules are kept on portrait phones per house rules.
