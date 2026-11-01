# No.1020 "170,000 Dreams, One Cube"

Study #125 yuta-asai, PP181 "Inside the Model" (Rhizomatiks, Beyond Perception, Model Visualization 1).

## Concept

The inside of a diffusion model, exhibited as a room. Nothing in the frame is an output: no finished image ever appears. A border of dense thumbnail strips stands for the 170,000-image training corpus, present only as texture. Above, an attention graph drifts and reconnects. At the center, two latent image-fields morph into each other forever without resolving, around a small dark wireframe cube, the machine that holds the model, deliberately subordinate to its own insides. Below, thin loss curves descend in steps, redraw, and descend again. The organism is the composition: thought above, dreaming at the center, learning grounded underneath, corpus framing everything.

## Construction

Single self-contained canvas 2D file, no assets, no text on canvas (the title lives only in the document title).

- Determinism: all state derives from mulberry32 seeded streams (base seed 1020181) and closed-form functions of piece time. Frame one is drawn synchronously at fixed phase T0 = 14 s; the animation loop, when requestAnimationFrame exists, is anchored at T0 plus elapsed-since-load. No wall clock feeds any drawn state.
- Internals model:
  - Data wall: a one-cell-thick frame of #14161C strips tiling the viewport edge. Each cell is a pure function of an integer hash of its grid coordinates; roughly a third carry a faint #8A8D84 micro-mark whose alpha shimmers on a slow hash-bucketed clock, so the corpus glitters without ever resolving into individual thumbnails.
  - Attention constellations: 15 nodes (11 on phones) with seeded home positions in the upper region, drifting on pairs of slow seeded sinusoids. An edge between two nodes is drawn only while they are near and their seeded lifetime envelope (period 17 to 35 s per pair, 42 percent duty, sine envelope) is open, so connections dissolve and reform. Nodes are white cores with three layered-alpha halo discs; no gradients or shadowBlur anywhere.
  - Latent fields: two procedural fields, each a seeded sum of sinusoids plus 4 to 6 Gaussian blobs. The center grid (48 columns, 34 on phones) samples field A and field B at the same point and mixes them by a morph parameter that travels as a slow wave over position and time. The mix is clamped to [0.22, 0.78], so no cell ever fully becomes either field: the between is endless by construction. Color maps the mixed value through the three muted anchors #4A6B8A, #4A8A6B, #8A4A6B.
  - Loss curves: four seeded curves, each an exponential decay interrupted by 2 to 4 seeded step drops, drawn in thin white over the lower region. Each redraws on a 46 s loop with a bright head dot while it extends, then holds complete before the next loop.
  - The cube: a true projected wireframe cube (two-axis rotation, perspective divide) in #1E2A4A, half-size 8.5 percent of the smaller viewport dimension, at the exact frame center, drawn over the latent field.
- Interaction (all state is a function of recorded pointer events plus piece time):
  - Drag traverses latent space: the drag vector becomes a sampling offset for both fields, held while dragging and decaying exponentially (5 s time constant) after release, when the endless morph resumes.
  - Tap on the cube reseeds the attention graph (new salt, new epoch for that subsystem only).
  - Double-tap reseeds the whole model: new fields, new losses, new attention, epochs reset.
- Audio: created lazily inside the first pointer gesture, typeof-guarded at every step, silent in the QA renderer. A low two-oscillator drone whose pitch follows the morph wave, a very quiet descending sine that tracks the loss loop, a looped seeded-noise shimmer through a bandpass for the wall, and short pentatonic chimes fired when an attention edge is born (detected by diffing the live edge set between frames).
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width and height pinned in px on every draw; phone detection from window.screen physical size (min dimension under 700 px) with the tall-aspect fallback; page ground is the room tone #050507; strict palette only.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean renders, no errors, all listeners registered.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. Re-checked after the retune below: byte-identical again.
- Read-back, desktop: dark room with a visible strip-wall border; a connected white attention constellation upper left with fainter nodes right; a muted green and rose latent cell field across the center with local patch structure; the small dark cube wireframe at the exact center over the field; four thin white descending loss curves with step drops along the bottom, one caught mid-redraw. Matches the brief.
- Read-back, mobile (390x844): phone path taken (11 nodes, 34-column latent grid); regions compress vertically, cube stays central and small, loss curves intact, nothing clipped.
- One retune round: the first field build read as smooth horizontal bands because the Gaussian blob amplitudes were too weak against the sinusoid base. Blob amplitude range widened and radii tightened; the shipped field shows distinct local patches in both hues at all three sizes. Determinism re-verified after the change.
- Compliance greps: no Date.now, no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no document.createElement, no external URLs, no em dashes in the file. Only visible text in the document is the title element.

## Deviations

- A tap on the cube resamples attention immediately rather than waiting out a disambiguation window; if a second tap lands within 0.38 s the gesture is promoted to a double-tap and the whole model reseeds (which includes the attention graph). Reason: keeps the cube tap responsive; the end state of a double-tap is identical either way.
- Edge births for the chime are detected by diffing consecutive live frames, so chimes exist only in the running piece, never in the synchronous first frame. Reason: frame one must stay a pure function of the seed and T0; the audio path is gesture-born anyway.
- The latent morph wave is clamped to [0.22, 0.78] instead of reaching 0 or 1 at its extremes. Reason: the prompt requires the fields to never resolve; the clamp is the mechanism, recorded here so the choice is explicit.
