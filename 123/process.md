# No.162 Not a Quasicrystal

## Concept
Jay Bonner's forensic rebuttal of the Darb-i Imam "quasicrystal"
reading, made visible. A field of ten-pointed stars in ink on
paper reads as quasiperiodic scatter; in fact every star is
generated from a perfectly periodic tessellation of decagons
and bow ties (wallpaper group cmm). Tap X-rays the hidden
tessellation in red over the stars: it draws on from the tap
point, holds, and fades. The grid was never hidden; it was the
drawing.

## Construction
Canvas 2D, single self-contained page. Decagon centres sit on a
staggered periodic lattice (rows offset by half a pitch, cmm
mirrors); bow ties sit at the horizontal midpoints between
neighbouring decagons and at the diagonal midpoints between
rows. Each decagon carries a true {10/3} star polygon drawn as
one continuous path (the polygonal technique: the star arises
from the decagon), a centre dot, and a faint pencil
circumcircle left as construction residue. Each bow tie carries
one small diamond at its heart. The reveal layer is the same
tessellation objects, decagon and bow tie outlines stroked in
red (#B03A2E) under a circular clip that grows from the tap
point over 2s, holds 3s, fades over 1.5s; a second tap fades
it early. No Penrose tiling anywhere: the underdrawing is
periodic by construction. Palette only: paper #F4F1E8, ink
#1A1A1A, red #B03A2E, pencil #8A8A8A. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in
px, window.screen phone check with aspect fallback, field
full-bleed on phones, synchronous first frame, typeof-guarded
requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three, plus a forced-reveal test render (tap
state set directly in a test copy, since the tap cannot be
driven headlessly): the red decagon-and-bowtie lattice draws
over the stars exactly registered to them, and its regularity
reads instantly. Two faults caught and fixed during QA. The
first star used the alternating outline formula with inner
radius ratio 0.727, which read as a blunt gear rather than a
star; replaced with the true {10/3} star polygon path, and the
reveal decagons re-registered to the same vertex-up rotation.
The bow tie motif began as two diamonds per tie, which collided
with the star points; reduced to a single small diamond at each
bow tie's heart, and the revealed bow tie outlines shrunk
slightly so they interlock with the decagons instead of
overrunning them. Frame one is the finished star field, reveal
off.
