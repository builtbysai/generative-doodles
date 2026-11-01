# №1328 "Anxious Grid" (rashid-johnson RJ1, PP495)

## Source
Johnson's Anxious Men (Drawing Center, 2015): black soap mixed with wax poured
onto a grid of white tiles, then scraped and scratched away to create
hollow-eyed, grotesque visages. Subtraction is the image: what survives being
carved out of a poured surface.

## Frame one
A wall-sized 8 x 10 grid of off-white ceramic tiles (#EDE9E0) with slightly
uneven gray grout (#9A978C), filling the field. A black waxy pour (#14120F)
sits thick at the edges and thin toward the center, with greasy sheen patches
(#2E2A24, flat alpha shapes) and drip runs at the pour boundaries. Scraped out
of the black in tile color, with scratch-glint (#5C564B) accents, are
hollow-eyed skull-faces: some just eye-sockets, some full screaming ovals, each
face a different scratch gesture from an 18-combination set (3 eye styles x 3
mouth styles x outline on/off), assigned uniquely per cycle. Faces appear in
clusters of 1-3 with long empty stretches between; negative tile space is
about 60% of the surface, exceeding the prompt's 40% floor. Frame one opens in
the hold phase: pour settled, faces fully scraped.

## Motion and interaction
60-second seamless loop, phase-shifted 24 seconds so frame one opens in the
hold phase: pour grows 0-12s, faces scrape in stroke by stroke 12-24s, hold
24-48s, fade to bare tile 48-60s, then pour again with a newly seeded layout.
No hard cuts. Touch a face: it darkens and a new scrape appears beside it.
Drag: leaves a smear trail that renders wet (sheen highlight) for 4 seconds,
then hardens. Wet/dry state and all touch/drag state are closed-form functions
of piece time and recorded events. Never click-to-reload.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop. All layout, pour, drip, sheen, and face
variation comes from seeded mulberry32 streams (seed 1328000 + cycle x 7919),
never unseeded randomness. The rAF loop is a plain function declaration behind
a typeof guard.

## Adaptations
- Hold-phase frame one (established precedent): the pour/scrape loop still
  runs every cycle, but the gallery thumb and first paint show the settled
  state.
- Sheen and vignette as layered flat alpha shapes: no gradients, no
  shadowBlur, no filters, no offscreen canvas (QA renderer constraints).
- Faces are clipped to the pour polygons so no scraped mark spills onto bare
  tile; faces cut by a pour boundary read as carvings at the pour edge.

## Fix rounds
1. First faces rendered at 0.42 of the smaller cell dimension and read as tiny
   glyphs: enlarged to min(cellW, cellH x 0.75) and face density raised
   (placement probability 0.30 to 0.50), so faces read as skulls at about one
   tile each.
2. Enlarged faces spilled past pour boundaries onto white tile: face drawing,
   touch-darkening, and extra scrapes are now clipped to the pour polygons.

## Verification
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; inspected all
three. Thumb rendered three times plus a final re-verification, all
byte-identical. Forced-time probes on discarded temp copies confirmed every
phase: t = 0 hold 207,143 black pixels of 518,400 (about 40% pour coverage);
t = 50 scrape phase 293,278 black pixels (pour grown, faces partly revealed);
t = 30 fade phase 3,204 black pixels (nearly bare tile). Token scan clean:
no unseeded randomness, no createElement, no AudioContext, no getUserMedia,
no gradients, no shadowBlur, no offscreen canvas. md5 of index.html:
c586ef58bd3d93a9f8e7ef8d6d3e2980.
