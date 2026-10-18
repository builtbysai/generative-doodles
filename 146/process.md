# No.146 Sinan Rings

## Concept
The 12-fold rings reconstructed from Architect Sinan's works, as
kirigami: a paper disc scored with concentric 12-fold rings, then cut,
the rings lifting out of the plane as concentric perforated halos over a
dark ground, light falling through the cuts. Vertical drag is the cut
itself: pull down and the rings rise in sequence, outer first.

## Construction
Canvas 2D, single self-contained page. Rings are perforated annuli: the
paper ring is an even-odd ellipse pair, its slots (12 per ring at base
density) punched as dark tangential rectangles, each slot pre-drawn in
the cut-shadow colour slightly offset so the cut has depth. A lifted
ring is drawn as a slightly squashed ellipse (far edge rising toward
the viewer), over an offset shadow annulus, with an inner shadow arc
that grows with lift and a white highlight catching the upper-left rim.
Lift per ring is a staggered smoothstep of the global cut parameter,
outer rings first; rings stay concentric throughout. Below them sits
the dark well they lift from and the still-flat centre medallion with
its 12-spoke score star; score rings show on any ring not yet lifted.
Release eases the cut halfway back toward where the drag began and
holds there. Double-tap cycles Sinan's three period variants:
apprentice (4 rings), journeyman (6 rings, alternate rings double
slotted), master (8 rings, double slots). The piece opens at cut 0.45,
outer rings lifted, inner rings still scored flat. House rules held:
Visual Viewport sizing with both resize listeners, canvas pinned in px,
window.screen phone check with aspect fallback, synchronous first
frame, typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass overdid the lift: full-cut defaults and
heavy ground shadow arcs turned the disc into a tilted ellipse with
dark swooshes underneath. Removed the ground arcs, replaced the ring
shadow with a quiet offset annulus, halved the squash and centre shift,
and set the opening cut to 0.45 so lift reads as a sequence. Final
frames: concentric perforated paper rings on the dark ground, slots
reading as clean cuts with shadowed depth, outer rings visibly lifted,
centre medallion flat, disc at 75 percent of frame on desktop and
phone. Palette audit: paper #F4F0E4, cut shadow #3A3F52, highlight
#FFFFFF, ground #0E0E12 only. Interaction is vertical drag (the cut)
plus double-tap variant reseed; no click-to-reload.
Gallery entry ready: 2002 · 06 · 06, "A paper disc scored with twelve
fold rings that lift out of the plane in sequence as you drag, light
falling through the cuts. Drag to make the cut."
