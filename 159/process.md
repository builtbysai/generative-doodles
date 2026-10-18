# No.159 Eleven and Thirteen

## Concept
Bonner's most original territory: a field mixing 11-pointed and
13-pointed stars in one design, the regime he calls
nonsystematic. Six elevens in construction red and six thirteens
in deep blue share the paper, joined by black interwoven straps,
reading as two interleaved constellations. It is a system to
explore: dragging scrubs the two-point contact offset, the
symmetric edge-point parameter of Bonner's two-point ray mode,
and the whole field breathes between sharp and blunt while the
straps re-route.

## Construction
Canvas 2D, single self-contained page. The twelve stars are
hand-placed at fixed fractional positions (a re-dealt portrait
layout on phones) so no rectangular repeat exists anywhere in
the field. Each star is drawn from the two-point construction:
its inner radius is set by the contact offset delta, q = 0.60
minus 0.30 delta, so delta at -1 gives blunt near-polygons and
at +1 gives sharp stars; the outline also twists slightly with
delta. Straps join near stars (centre distance under 2.55 times
the summed radii); their endpoints are not fixed but ride on the
stars' outlines at angles slid by delta, found by ray-casting
the live outline, so scrubbing genuinely re-routes them. While
dragging, straps are drawn plain and cheap; when the field
settles (delta eased to its target, no throw), crossings are
computed pairwise, ordered along each strap, assigned
alternating over/under, and the weave is drawn by gapping the
under-strap and laying the over-strap back across, the same
braid engine as No.155. Frame one opens settled at delta 0.15
with the weave already computed. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in px,
window.screen phone check with aspect fallback, synchronous
first frame, typeof-guarded requestAnimationFrame, lowercase
hint drawn on the canvas ("drag to scrub the contact offset").

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. The desktop frame passed as built:
twelve stars, six of each kind, straps weaving with visible
over/under gaps, accents legible. One fault was caught and fixed
during QA: the first phone frame stretched the landscape layout
over a tall screen, crowding the stars into two chains with a
hollow band between them, because positions scale per-axis while
radii scale with the short side. The fix is a dedicated portrait
layout (same constellations, re-dealt over six rows) selected by
the phone check, plus a slightly wider strap-joining threshold;
the phone frame now fills edge to edge as a zigzag ladder of
stars. Palette audit: paper #F4F1E8, straps #1A1A1A, 11-star
accents #B03A2E, 13-star accents #1E3A5F only. Gallery entry
ready: 2002 · 06 · 19, "Eleven pointed and thirteen pointed
stars interleaved in one nonsystematic field, black straps on
paper, the two folds reading as twin constellations. Drag to
scrub the contact offset and watch the stars breathe."
