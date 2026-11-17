# Upcycled Plumage, №1860

Driver: a heap of thrown away clothes on a gray floor keeps rising up as stitched birds that parade around the room, shedding scraps and sewing themselves back together a little different every time around.

## Mechanism

Three abstract stitched bird creatures travel a slow elliptical loop (one full lap every 240 seconds) marked on the floor by a faint dashed stitch line. Each creature is built from cloth panels: a patched body, a sleeve wing that lifts and falls, a lace fin tail, dashed stitch seams, thin stepping legs, a folded scrap beak, and a stitch cross where an eye would be, so no face is drawn. Behind each creature, six seeded scraps fall away along the loop and fade. Each completed lap swaps every creature to the next garment module set, so no creature wears the same colors twice around. A heap of folded garments anchors the lower left, with loose threads spilling toward the loop, and at the fixed first frame one creature is mid emergence from the heap, re-stitching itself. Motion is a pure function of a fixed phase (FRAME_T 60.0) plus elapsed time, with all randomness from a mulberry32 PRNG seeded by 1860, so frame one is deterministic. Flicker stays at or under 14 Hz by construction: all motion is slow sinusoidal drift and flapping. Reduced motion renders a still frame. The field is full bleed on phones and a centered square on desktop, with the title and formula date drawn on a plate on the canvas.

## Palette

Hand picked from the prompt's named colors, since the reference study file studies/carla-kihlstedt.md does not exist in the repo: concrete gray #8A8D90 and #6E7174, floor #B7B8B4, thrift red #B03A2E and #8C2B22, faded orange #D97B3F and #B45F2C, tie-dye blue #3E6E9E and #2F5578, lace white #F2EFE6 and #D8D2C2, stitch thread black #26221F.

## Interaction

Watch only. The parade reforms itself; the viewer watches matter cycle and does not direct it. There is no pointer input, no click to reload, and no sound toggle.

## Deviations from the prompt

The piece is visual only with no WebAudio: a watch only piece cannot autoplay audio, and no sound toggle is wanted here, so the prompt's bowed strings and breathy winds are not implemented. The reference study file does not exist in the repo (404), so the palette hexes above were hand picked from the prompt's named colors. The heap sits at the lower left of the loop rather than a literal corner, so the parade route passes through it and the re-stitching creature reads clearly at frame one. No fashion runway gloss and no sustainability messaging text appear anywhere.

Gallery note: On a gray concrete floor, stitched birds rise from a heap of discarded clothes and parade in a slow loop, shedding scraps and re-stitching themselves a little different with every lap. Watch the parade re-stitch itself.
