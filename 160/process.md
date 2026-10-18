# No.160 Follow the Ribbon

## Concept
Jay Bonner's braided panel finished as carved wood: an Atlas cedar
ground, a network of carved straps with gold bezel lines at the
crossings, and ONE ribbon picked out in amazonite winding through
the whole field, entering bottom-left and leaving top-right. The
rest of the panel never moves. Watch-only: follow the ribbon.

## Construction
Canvas 2D, single self-contained page, watch-only. The strap
network is built from a 4.6.12 grid: dodecagon rosette centres on a
triangular lattice (spacing 2.4 units, alternating rows offset),
each dodecagon sending 12 spokes to tangent points on its
neighbours, clipped to the panel. Every strap is drawn twice, a
wide carved-shadow pass (#4A2C17) under a narrower cedar pass
(#7A4A2B), with a hairline gold bezel (#C9A227) along both edges.
The amazonite ribbon is one continuous Hamiltonian-style path
threaded through 53 stations of the same lattice, drawn as a dim
base (#5E8A7A) under a brighter core (#7FD1B9) so it reads as
inlaid stone rather than paint. The 24 second loop sends a soft
glow along the actual ribbon path at walking pace: a lighter
segment (#CFF5E9 core, #A8E6CF halo) whose arclength position is
the only animated parameter. From 45 to 55 percent of the loop the
glow splits into two parallel strands offset either side of the
centreline, weaving independently, then rejoins. The clock is
offset 6 seconds so frame one opens with the glow already
mid-panel. House rules held: Visual Viewport sizing with both
resize listeners, canvas pinned in px, window.screen phone check
with aspect fallback, synchronous first frame, typeof-guarded
requestAnimationFrame. No pointer listeners and no hint element
exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. Frame one: the cedar strap field fills
the frame edge to edge, gold bezels tracing every strap edge, and
the amazonite ribbon reads as one continuous woven thread with
its lit segment mid-panel. The phone frame goes full-bleed with
the same lattice at a tighter crop; the ribbon stays traceable.
Palette audit: cedar #7A4A2B, carved shadow #4A2C17, amazonite
#7FD1B9, gold bezel #C9A227 only, plus the flat lighter shades of
the ribbon itself for the travelling glow. Watch-only: no
interaction, no hint. Gallery entry ready: 2002 · 06 · 20, "A
braided cedar panel where one amazonite ribbon winds through the
whole field, entering bottom left and leaving top right,
splitting into twin strands halfway and rejoining. Watch only:
follow the ribbon."
