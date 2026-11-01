# №1330 "Black Orpheus" (rashid-johnson RJ3, PP497)

## Source
Rashid Johnson's Cosmic Slop "Black Orpheus" (2011, MoMA): waxy black
soap-and-wax pours over ceramic tile, melting and solidifying in front of
the artist as he gestures inside the material's drying window. The piece
is a landscape of cooling lava, not a picture of one: a new kind of
landscape left behind once the flow sets.

## Frame one
A dark, near-square field of cooling lava, full-bleed. A dense waxy mass
runs the dominant diagonal from top-left toward bottom-right: overlapping
flat-alpha molten-edge masses whose thicker overlaps read as deeper
material. Raised blisters dot the surface; faint scratched arcs hint at
faces that never fully emerged; drip tongues freeze at the right and
bottom edges. The top-right corner is kept nearly pure black as the void;
the edges are darker than the center. Palette only: cooling black
#0D0C0A, molten edge #3A2A1E, ceramic glint #7A6F5C (rare), scratch
ghost #4D463B. No grid, no figurative forms beyond the ghost arcs, no
colored blobs, no space framing.

## Motion
Watch-only, seamless 60-second pour loop, phase-shifted 20 seconds so
frame one opens mid-pour (the hold-phase precedent: the pour is already
developed at load). 0-38 s: material creeps forward along the diagonal.
38-50 s: a solidification front sweeps the field; masses behind it turn
matte and stop, masses ahead stay glossy and keep moving. 50-60 s: the
frozen end state crossfades into the next cycle's liquid start on the
main canvas, so the loop never cuts. Idle: the surface breathes with tiny
blister pulses. Drag redirects the flow direction; the drip tongues
re-aim toward the drag vector (closed-form decay, tau 2.5 s). Never
click-to-reload. The faces stay ghosts: no sudden reveal.

## Adaptations
- Flow as flat-alpha blobby masses on a seeded flow field. No gradients,
  no waxy-shader gradients: the QA renderer cannot render them reliably.
  Matte-to-gloss variation is alpha and sheen-arc variation, not shading.
- Solidification as decreasing flow amplitude behind a moving front.
- Loop via crossfade of two offset simulations on the main canvas. No
  offscreen canvas anywhere.
- Determinism: frame one is exactly t = 0 via a boot flag; the clock
  starts only with the rAF loop. All layout, flow, blister, and glint
  variation comes from seeded mulberry32 streams (seed 1330000 + cycle
  x 7919), never Math.random. Drag state is a closed-form function of
  recorded drag events and piece time.

## House rules
Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw(); phone detection via window.screen
physical size with aspect fallback; field-like composition full-bleed on
phones. One synchronous developed frame at load; rAF loop is a plain
function declaration behind a typeof guard. No requestAnimationFrame,
AudioContext, document.createElement, WebGL, offscreen canvas, ctx.filter,
shadowBlur, or gradients in the QA path. Dots drawn as paired arcs with a
moveTo before every batched arc (node-canvas ellipse/arc quirk). No
visible text except the title. No audio, no microphone, silent.

## Fix rounds
1. First render showed only rings: the cooling-black blob bodies were
   identical to the background, so only molten rims showed, and frame
   one opened before the pour developed. Fixed by giving bodies visible
   molten-alpha fills and phase-shifting the cycle 20 seconds so frame
   one opens mid-pour.
2. Second render still read as donuts: per-blob dark cores ringed every
   mass. Fixed by removing the cores, so overlapping bodies merge into
   one continuous pour with thicker overlaps reading as deeper material.

## Verification
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
inspected. Thumb rendered three times plus a final re-verification,
all cmp byte-identical. A forced-time probe (temp copy, discarded)
confirmed the solidification phase: the solidify-phase render differs
from frame one in 243,073 of 518,400 pixels. Token scan clean except one
comment stating Math.random is not used.
