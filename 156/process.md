# No.156 Acute, Median, Obtuse

## Concept
The companion worksheet to Delete the Base: one live 4.8.8 panel,
base left on the page in faint pencil, and a single design
variable, Bonner's ray mode. Acute, median and obtuse angles grown
from the same edge midpoints of the same grid produce three
different star families; the grid never changes, only the angle
table does. A tap cycles the mode, the rays regrow, the braid
reweaves. The mode name sits bottom-left as a small ink caption, a
worksheet annotation rather than chrome, exactly as the prompt
allows.

## Construction
Canvas 2D, single self-contained page, tap-only. The grid
generator, midpoint rays, polygon clipping, crossing computation
and woven rendering are the same pipeline as No.155, driven by a
mode parameter: for a polygon of n sides the median ray angle is
90 minus 180/n, and acute and obtuse sit half a step (90/n) below
and above it, so the octagon runs 56.25 / 67.5 / 78.75 degrees and
the square 22.5 / 45 / 67.5. Median grows the classic woven
eight-pointed star; acute opens the star into a wide ring with a
large empty centre; obtuse drives the rays toward the centre into
a dense radiating sun-star. The base stays drawn throughout in
pencil #A9A9A9 under the ink, and the finished state of each mode
is the full woven panel, never three panels at once. A tap
anywhere on the panel advances the mode and restarts a 1.2 second
regrow: rays draw on with a stagger, widen, and the weave gaps
open in the last stretch. The piece opens on median, fully woven,
so frame one is a finished panel. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in px,
window.screen phone check with aspect fallback, synchronous first
frame, typeof-guarded requestAnimationFrame, lowercase hint. The
only pointer listener is the tap; no drag, no buttons.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three, plus two off-list test renders with the mode
forced to acute and obtuse to verify the families differ. They do:
acute reads as open wreath-stars around large empty centres,
obtuse as dense sun-stars with pin-hole centres, median as the
classic woven khatam. Two faults were caught and fixed during QA.
The caption originally sat inside the panel's lower edge where a
strap crossed it; the panel now runs at 86 percent and the caption
sits in the clear paper margin below it, legible in every render.
The first angle offsets (three quarters of a step) collapsed acute
into blobs and obtuse into a solid disc; halving the offset to
half a step restored three legible families. Palette audit: paper
#F4F1E8, pencil grid #A9A9A9, rays and caption ink #1A1A1A only.
Interaction: tap cycles acute, median, obtuse. Gallery entry
ready: 2002 · 06 · 16, "One octagon square panel, three ray modes:
acute, median and obtuse grow three different star families from
the same grid. Tap to change the mode."
