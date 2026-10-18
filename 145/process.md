# No.145 Emblem Almond Ring

## Concept
The {8/2} Emblem, the Rub' al-Hizb eight-pointed star framed by four
cardinal crosses, tiled as an almond ring on the silver grid: cream
die-cut modules in a 5 by 5 field, each unit carrying 4 almonds (100 in
all), each module pierced by a square hole that reads as a void.
Positive modules and their mirror negatives alternate; drag flips whole
rows between the two, and the field ripples as the rows turn over.

## Construction
Canvas 2D, single self-contained page. A module is two squares (one
turned 45 degrees, orientation canonical, never rotated) seamed in the
module seam colour, four small cardinal crosses, four almond vesicas on
the diagonals, and a central square hole filled with the cut-hole
colour. The negative module is the same glyph mirrored, filled dark and
drawn in seam outline, its almonds swung tangential so the mirroring
reads, its centre square inverted to paper (interpretation: the punched
hole of a negative shows the paper beneath). Grid positions follow the
silver tune: cumulative gaps [1, sqrt2, sqrt2, 1] on both axes, field
span 70 percent of the frame. Horizontal drag accumulates travel; every
85px commits the next row's flip (top down dragging right, bottom up
dragging left), and each row animates a cos(pi p) mirror with the glyph
swapping at the halfway point. Double-tap cycles three curated layouts:
checker, striped, all-positive. House rules held: Visual Viewport
sizing with both resize listeners, canvas pinned in px, window.screen
phone check with aspect fallback, synchronous first frame, guarded rAF.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass: the negative modules read on the
octagram outline alone, their crosses and almonds lost in the dark;
stroked the negative fittings in the seam colour, after which the
mirrored units read as fine filigree against the solid positives. Final
frames: clear checker of solid cream and outlined dark modules, holes
reading as voids in both, silver-tune spacing visible in the uneven
gaps, field centred on the phone frame. Palette audit: paper #EFE8D6,
cut-hole #1A1A1C, seam #CFC5AC, background #0D0D0F only. Interaction is
horizontal drag row flips plus double-tap reseed; no click-to-reload.
Gallery entry ready: 2002 · 06 · 05, "The eight pointed Emblem star
tiled as an almond ring of cream die-cut modules, positives and mirror
negatives alternating in a five by five field. Drag to flip the rows."
