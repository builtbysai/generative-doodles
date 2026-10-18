# No.139 Twist Weave Screen

## Concept
A flat screen of interlocking blue paper modules in the kamikyodai manner:
square twists where the silver grid crosses, 8-fold rhombi between them,
and empty square negative spaces left as part of the pattern. The piece is
a weaving machine at work: watch-only, no interaction, no hint. Over a 26
second loop a folding ripple travels diagonally across the screen, holds,
then returns inverting every twist's shading before the screen rests flat.

## Construction
Canvas 2D, single self-contained page. Cell boundaries sit at cumulative
sums of the silver-grid tune [1, sqrt2, sqrt2, 1] repeated along both axes
from one shared unit, so every cell is square: the sqrt2 by sqrt2 cells
carry the twists, the 1 by 1 cells are the negative spaces (background
showing through a hairline frame), and the rectangular crossings carry
flat-shaded rhombi. A twist is a square cell with a rotated inner square
connected by crease triangles; faces are flat-shaded only (paper #3A5A9C,
shadow #24355F, highlight #6E8FD4), never gradient-filled. Each cell's fold
amount comes from its diagonal index against the loop timeline: ripple in
over 6s with per-cell stagger, hold 3s, return ripple over 6s with the
highlight and shadow faces exchanged, hold 3s, then a flat rest to close
the 26s loop (the prompt's 6+3+6+3 segments sum to 18s; the remaining 8s
is the flat rest, so every stated segment keeps its exact duration).
Frame one is drawn at 3.4s into the loop so the ripple is mid-travel and
the fold states are developed. House rules held: Visual Viewport sizing
with both resize listeners, canvas pinned in px every frame, synchronous
first frame, typeof-guarded requestAnimationFrame. No pointer listeners
exist in the file and there is no hint element.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three; the renderer's listener report confirms watch-only
(only the two resize listeners). Two fixes during QA: the first fold
shading collapsed into muddy dark cells, replaced with edge triangles
alternating highlight and shadow around the rotated inner square; and the
grid unit was unified across axes (it had stretched cells on the tall
phone frame) and relaxed so roughly eight twist columns cross the frame.
Final frames: blue paper screen with legible twists mid-ripple on the
left, flat crease diagrams to the right, rhombi and black negative
squares woven between. Palette audit: #3A5A9C / #24355F / #6E8FD4 on
#0E0E10 only. Gallery entry ready: 2002 · 05 · 30, "A screen of
interlocking blue paper twists on the silver grid, negative space
breathing between them as a folding ripple crosses and returns inverted.
Watch only: it weaves itself."
