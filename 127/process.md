# No.169 Absolute Rosette

## Concept
The same eight fold rosette in two universes. Left panel: flat Euclidean space, the motif stamped on a square lattice, perfectly still. Right panel: a Poincare disc, where the same motif bends into hyperbolic space and shrinks toward the boundary in endless regression while the disc slowly turns. One construction, two geometries, no labels. Watch only.

## Construction
The rosette is built once as a path function (eight point star, inner octagon, centre ring) and used by both panels, so the pairing is literal. Euclidean panel: a 5 by 5 square lattice, centre motif in vermillion #D64533, the rest in indigo #2A2A72 on paper #F4EFE6. Hyperbolic panel: motifs are placed in hyperbolic polar coordinates, not by warping the flat panel. Ring radius follows the Poincare map r = tanh(rho/2) for hyperbolic radius rho in steps of 0.5; ring populations grow with sinh(rho), holding hyperbolic spacing near constant; each motif's Euclidean radius scales with the conformal factor (1 - r^2), at a hyperbolic radius of 0.23 so motifs abut without overlapping. The boundary circle is indigo at 40 percent and the centre rosette is vermillion, matching the left panel. Animation is a rotation about the disc centre, an exact isometry of the disc, one full turn per 40 second loop; the Euclidean panel never moves. Panels sit side by side on wide screens and stack vertically on portrait phones.

## QA log
Rendered at 1280x900, 390x844 and 720x720 and inspected all three. First pass drew the hyperbolic motifs 1.55 times too large and they overlapped into a woven mass; with the conformal sizing corrected, individual rosettes stay distinct from the vermillion centre out to the dotted regression at the rim. The two panels read as one idea in two geometries at every size, the vermillion centres align the comparison, and the phone stack keeps both panels square and legible. Renderer reports resize listeners only, confirming watch-only.
