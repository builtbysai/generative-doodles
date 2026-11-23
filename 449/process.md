# №1455 "Germany, Retold Plainly" (tabea-blumenschein TB8, PP686)

## What it is

A series of three plain, easy-to-read scenes from German myth and everyday
cliché, drawn without lavish ornament: a figure in folk costume dancing at
an Oktoberfest table with beer mugs and pretzels; a fairy-tale forest path
with a small cottage; a brass band figure with a tuba. Each scene is flat,
clear and calm — the ornament is stripped away and the motif stands on its
own. One scene at a time, centered at ~70% of frame height, on a constant
paper ground (#f2ead8) across all scenes.

## Scenes

1. **Oktoberfest** — dancer in a dirndl (green dress, white apron, arms
   raised, stepping with a 2.4 s bob) behind a wooden table holding two
   beer mugs (gold with foam tops, lifting in turn on a 5 s cycle) and two
   pretzels (tan double-loop shapes).
2. **Forest path** — pale sky, a small cottage (cream walls, rust roof,
   door, two windows), three forest-green trees, a path running to the
   cottage door, and twelve leaves drifting down with seeded sway.
3. **Brass band** — figure in white shirt and brown trousers holding a
   brass tuba whose bell pulses at 2 s, with a small flat-alpha music
   puff beside the bell.

## Motion and interaction

- Slow loop: each scene holds ~5 s with small life (mugs lift, dancer
  steps, leaves drift, tuba bell pulses), then wipes gently (1.2 s
  horizontal slide) to the next scene; after the third scene the sequence
  returns to the first. Full cycle 18.6 s.
- Dragging sideways scrubs the wipe under the finger: the current scene
  slides with the finger and the neighbouring scene enters from the edge
  the finger pulls toward. On release, a drag past 30% of the scene width
  completes the transition (0.6 s eased tween) and re-anchors the timer on
  the new scene; a shorter drag snaps back (0.4 s). Dragging back returns
  to the previous scene. Never click-to-reload, never buttons, never a
  cut, never a slideshow UI.

## Adaptations

- Scenes as flat contour drawings with micro-motion per element; scene
  change as a horizontal wipe tween driven by timer or drag offset; drag
  scrubs the wipe, release completes or reverses it based on distance.
- Fully silent by design (no AudioContext at all); the tuba's music is a
  small flat-alpha puff, never sound.
- No visible text besides `<title>`: no captions, no labels, no scene
  menu. Letters never appear.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. Fading alphas rounded to 4 decimals;
  dots as filled rects or own-beginPath arcs (node-canvas quirks).

## Determinism

- Frame one = draw(0) via a boot flag; the rAF loop (plain function
  declaration behind a typeof guard) starts the clock only after frame
  one. All randomness from a seeded mulberry32 PRNG (seed 1455000),
  never Math.random. Leaf positions, sway phases, and fall speeds are
  seeded once, so every loop is reproducible.
- Phone detection via window.screen physical size (min dimension <
  700 px) with aspect h > w*1.15 as fallback; centered composition keeps
  its shape, page ground takes the piece's own paper colour. Canvas sized
  from the Visual Viewport API with resize listeners on visualViewport
  and window; canvas pinned in draw() via style width/height in px.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three;
thumb byte-identical across repeated renders. Forced-time probe harness
(vm-isolated instance, stubbed rAF driving the piece's own loop,
pointer events to its own listeners): t=0 scene 0 only (dirndl 12,567 px,
forest 0, brass 0); t=5.6 mid-wipe shows both scenes (dirndl 6,279 px,
forest 16,250 px); t=8 scene 1 only; t=14.2 scene 2 only (brass 15,999 px);
t=18.6 cycle wraps to scene 0 (dirndl 12,443 px); +300 px drag shows both
scenes mid-drag and completes to scene 1 after the tween; drag back
returns to scene 0. Token scan clean (the only Math.random / gradient /
shadowBlur / Path2D hits are comments stating they are never used).

No fix rounds needed (one dead code block in the drag branch was removed
before rendering; frame one unchanged).
