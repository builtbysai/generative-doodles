# No.160 Follow the Ribbon

## Concept
Jay Bonner's braided panel finished as carved wood: an Atlas cedar
ground, a network of carved straps edged with gold, and ONE ribbon
picked out in amazonite winding through the whole field, entering
bottom-left and leaving top-right. The route brightens as a glow
travelling along it, and halfway across the field the ribbon
splits into twin strands that weave separately and rejoin. The
rest of the panel never moves. Watch-only: follow the ribbon.

## Construction
Canvas 2D, single self-contained page, watch-only. The base is a
true 4.6.12 tiling grown by breadth-first contact from one
dodecagon: across every edge the neighbour alternates between the
other two kinds (12 touches 6/4, 6 touches 12/4, 4 touches 12/6),
placed by shared-edge geometry with edge labels so the rule stays
consistent around every vertex. Bonner's five moves run on the
grown base: from every edge midpoint, two rays leave at the
median angle (75 / 60 / 45 degrees for dodecagon, hexagon,
square), clipped to their polygon; crossings are computed inside
each polygon and over/under alternates along every strap. Every
chord is discovered twice, once from each endpoint midpoint, so
chords are deduplicated on their endpoints before the weave is
built. Straps draw as a gold bezel pass (ribbon width + 3) under
the main pass; the ground polygons are never drawn, so the panel
reads as finished carving. The ribbon is a route through the
chord graph (nodes are chord endpoints): a Dijkstra search over
directed chord states with a turning cost finds a backbone that
flows from the entry corner to the exit corner, then the route is
deliberately lengthened by splicing in detours that avoid every
other route node, until it winds through the whole field. Its
chords are picked out in amazonite at 0.55 alpha in the same
woven passes. Over the 24 second loop a fully lit segment of the
ribbon travels its arc length end to end (window 9 percent, empty
at both loop ends so the seam is invisible); through the middle
of the loop (seconds 10.5 to 15.5) the ribbon's middle stretch is
drawn as twin strands offset either side of the centreline, each
gapping at alternate crossings, and the glow rides both strands.
The clock is offset 5 seconds so frame one opens with the glow
already on the field and the split still to come. House rules
held: Visual Viewport sizing with both resize listeners, canvas
pinned in px, window.screen phone check with aspect fallback,
synchronous first frame, typeof-guarded requestAnimationFrame.
No pointer listeners and no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three, plus debug overlays of the computed
route. Two real faults were found and fixed during QA. First,
the route search: a greedy best-first walk tangled itself in the
top-right and dead-ended mid-field, and a least-turning variant
skimmed the bottom edge; the route is now the Dijkstra backbone
plus node-avoiding detours, and the overlay shows it entering
bottom-left, winding through the centre and the star inside one
dodecagon, and leaving through the top-right. Second, before
chord deduplication the surviving twin of a route chord repainted
it in shadow, so the ribbon showed only as tips at crossings; a
pixel probe at chord midpoints proved it, and after deduplication
the ribbon reads as one continuous inlaid strap on all three
renders. Frame one: panel fills the frame edge to edge on desktop
and phone (full-bleed field), the amazonite ribbon traceable
through the field, the lit segment already travelling. Palette
audit: cedar #7A4A2B, carved shadow #4A2C17, amazonite #7FD1B9,
gold bezel #C9A227 only. Watch-only verified: the renderer reports
only the two resize listeners. Gallery entry ready: 2002 · 06 ·
20, "A braided cedar panel where one amazonite ribbon winds
through the whole field, entering bottom left and leaving top
right, splitting into twin strands halfway and rejoining. Watch
only: follow the ribbon."
