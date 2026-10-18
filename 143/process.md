# No.143 Eleven Nine Segment

## Concept
Regular 9-pointed and 11-pointed stars alternate in a dense flat field,
each star built from 3-plane petals: every other outer vertex is raised
on the z-axis, so the petal planes intersect mutually and cast soft
blue-grey shadows on each other, like Kami's folded paper segments. Drag
turns the whole field in pseudo-3D; release lets it settle flat.

## Construction
Canvas 2D pseudo-3D, no engine. Each star is a true {n/2} star polygon:
inner vertex radius R cos(2pi/n) / cos(pi/n). Petals are the 2n triangles
from consecutive vertices to the centre; outer vertices alternate raised
and flat, inner vertices alternate two lower lifts, centre slightly
raised. Projection is a two-axis rotation with orthographic drop; petals
are painter-sorted back to front so they overlap and intersect rather
than clip. Each petal first casts a flattened copy of itself, offset
along the light by its mean height, in the shadow colour at 0.45 alpha.
Petal tone follows the fold: petals hinged on a raised point take the
paper colour, petals hinged on a flat point fall toward the crease tone,
with a small slope term, all blends between the two given paper colours.
Three curated arrangements cycle on double-tap: (9,11) alternating,
(7,9) paired clusters, (11,13) alternating. Drag sets target rotation
angles (clamped), release eases both back to flat rest; the field opens
slightly turned and settles. Five stars, edges bleeding off-frame.
House rules held throughout, synchronous first frame, guarded rAF.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass read as pale pinwheels: petal tones were
too close together and the cast shadows stacked into dark blobs. Gave
petals a decisive folded-paper alternation by hinge height, alternated
the inner vertex lifts, and pulled the shadow offset in. Final frames:
five matte stars with legible points, alternating lit and creased petals,
soft blue-grey shadows tucked under the raised planes, full-bleed on the
phone frame. Palette audit: paper #F5F2EA, crease #DDD6C2, shadow
#6E7B93 at 0.45 alpha, background #101013 only. Interaction is drag
rotation plus double-tap reseed; no click-to-reload.
Gallery entry ready: 2002 · 06 · 03, "Nine and eleven pointed paper
stars in a dense field, every other petal lifted so the planes intersect
and shadow each other. Drag to turn the field."
