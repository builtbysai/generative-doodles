# No.150 Polygonal Erasure

## Concept
The Bonner polygonal technique, shown as a method rather than a
result. A grey octagon-square (4.8.8) base tessellation draws itself;
its contact points, the midpoint of every edge, are marked and pulse;
then the pattern lines draw through those midpoints as a second
tessellation, and the base erases, leaving only the braided interlace
with its red shadow. The erasure is the point: the scaffold was real,
and it is gone.

## Construction
Canvas 2D, single self-contained page, watch-only. The base is built
exactly: octagon centres on a square lattice with spacing s(2 plus
root 2), squares in the diagonal gaps, every polygon edge registered
once in an edge map that also yields the midpoint set. The pattern is
derived from the midpoints, as the technique prescribes: in each
octagon, chords joining each midpoint to the one two steps away (the
two interleaved squares of the eight-point star); in each square, the
midpoint diamond plus both diagonals. All segment crossings are
computed pairwise, and over/under alternates along each strand; the
braid is rendered as a red shadow pass offset down-right, the ink
pass over it, then at each crossing a small disc of background is
punched and the over-strand redrawn inside a clip, which opens a
clean gap in the under-strand. The 32 second loop runs: base draws
edge by edge (6s), contact points pulse (4s), the second tessellation
draws from the centre outward (8s), the base and the points erase
(4s), the braid holds (6s), fade (4s). Interlace gaps are applied
once the pattern is complete. The clock is offset 20 seconds so the
first frame is mid-erasure: braid complete, base at half alpha. Flat
line work throughout, no shading. House rules held: Visual Viewport
sizing with both resize listeners, canvas pinned in px, window.screen
phone check with aspect fallback, full-bleed on phones, synchronous
first frame, typeof-guarded requestAnimationFrame. No pointer
listeners and no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. The first complete render already showed the
intended end state: eight-point braid stars in the octagons, crossed
diamonds in the squares, the grey base ghosting underneath at half
strength, and visible over-under gaps at the crossings. The geometry
needed no correction pass; the checks that mattered were the counts
(about seven octagons across on desktop, full-bleed on the phone)
and that the red reads as a shadow pass under the ink, not a second
pattern, which the offset and the narrower ink width keep true.
Palette audit: base grid #8A8F98, pattern #1F2A44, braid shadow
#C0392B, background #101013 only. Watch-only: no interaction, no
hint.
Gallery entry ready: 2002 · 06 · 10, "A grey octagon square
tessellation draws itself, then a second pattern threads its
midpoints and the base erases, leaving only the braided interlace.
Watch only: the method is the piece."
