# №1316 "The Refusal" (leslie-hewitt LH5, PP483)

## What it is

A maple block resting on a stack of three clothbound books, photographed
straight down on a studio floor. The block is both surface and density: it
occludes whatever is beneath it and offers nothing in return. The books'
spines are flipped away from the viewer, showing only blank cloth backs.
One corner of the bottom book peeks out, dog-eared.

Grounded in Hewitt's Untitled (Perception) (2013): a maple block on three
books in a tilted maple box-frame, "a square sheet of elm balanced on a
stack of books with their spines flipped away from the viewer."

## Frame one (t = 0, deterministic)

Shellac-brown studio floor with faint plank seams and scuffs. The stack
sits slightly below the middle of a square panel: three cloth covers
offset so each peeks out (oxblood at the top edge, ochre at the left and
bottom edges, slate on top), each with a darker blank spine band on its
top edge and a thin cream paper fore-edge on its right edge. No readable
text anywhere. The maple block dominates the stack top, covering 45% of
the top book's area (0.67 x 0.67), with dense seeded grain lines and three
knots. A small cream dog-eared triangle with a fold line peeks out at the
bottom book's bottom-right corner. At t = 0 the raking light comes from
the left, so the stack and block shadows fall to the right.

## Motion

Watch-only. Over a 2-minute loop the raking light rotates a full 360
degrees around the stack once: stack shadows and the block's shadow swing
with it, and a thin cream highlight rides the block edge facing the
light. The block never moves and never reveals what is under it. The
refusal is the performance.

Double-tap rotates which book is on top: the stack order reseeds from a
seeded mulberry32 stream (seed 1316000 + reseed index x 7919). A single
tap never reloads. Never click-to-reload.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop. All randomness (grain,
scuffs, stack order) comes from seeded mulberry32 streams, never
Math.random. The rotating light is a closed-form function of piece time.

## House-rule compliance

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen physical size (min dimension < 700px) with
aspect fallback; square panel centered on desktop, centered square on
phones, page ground in the floor color so no panel edge shows. No
requestAnimationFrame in the QA path (typeof-guarded plain function
declaration), no AudioContext, no document.createElement, no WebGL, no
offscreen canvas, no ctx.filter, no shadowBlur, no gradients: shadows,
grain, and highlights are flat alpha shapes. No visible text except
<title>. No getUserMedia. Silent.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb; all three inspected. Thumb rendered three times, cmp
byte-identical. Forced-time probe (temp copy, discarded): t = 60 differs
from frame one in 20,988 of 518,400 pixels, confirming the shadow swing.

## Fix rounds

1. First render hid the dog-ear: it was drawn before the upper books and
   the top book's paper edge strip covered the visible sliver. Fixed by
   widening the bottom book's right offset (0.014S to 0.030S) and drawing
   the dog-ear last, sized to the visible right strip, so the cream
   triangle with its fold line reads at the stack's bottom-right corner.
