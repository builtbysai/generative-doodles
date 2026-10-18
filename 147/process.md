# No.147 Sinan's Rings

## Concept
Serap Ekizler Sonmez's kirigami method: a white paper hexagon, folded
and cut, unfolding into the 12-fold ring pattern Architect Sinan's
windows carry. The drawing shows its own making: the cut design is
drawn once, on a single 30 degree wedge, and the finished ring is that
wedge replicated by the dihedral group D12. Cut lines in deep ink
blue, fold lines and construction in red, and the wedge geometry is
still outlined at the centre of the finished ring.

## Construction
Canvas 2D, single self-contained page, watch-only. The wedge design is
nine polylines in unit space (three ring arcs, two mirrored petal
curves, a radial spoke, a chevron arc, an inner chord, a centre
petal), each sampled to points with cumulative arc lengths so any
fraction of the design can be drawn by length. Replication applies
the group properly: twelve rotations of 30 degrees, alternate wedges
mirrored with a scale(1,-1), never a radial stamp. The 30 second loop
runs: blank hexagon with its fold diagonals and the one marked wedge
(4s), the cuts drawing inside the wedge by arc length (6s), the
unfold bloom as each wedge in turn draws its copy of the design (10s),
the finished ring held with red dashed construction circles and the
fundamental wedge outlined (6s), then a soft fade (4s). The loop
clock is offset 21 seconds so the first frame is the finished ring
held, construction still on it. Fold lines are red dashed strokes at
0.6 alpha; paper is one flat fill, no gradients, no texture. House
rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect fallback,
synchronous first frame, typeof-guarded requestAnimationFrame. No
pointer listeners and no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First frame originally opened mid-bloom at 15s;
the half-swept ring read sparse, so the offset moved to the hold at
21s where the ring is complete. A second pass shortened the fold
lines and the wedge outline arc from 0.99R to 0.93R after the first
render showed red dashes poking past the paper's edge near the
hexagon vertices. Final frames: the full 12-fold scalloped ring in
ink blue on the cream hexagon, red fold radii and construction
circles over it, ring at 80 percent of frame on desktop and phone,
centred and keeping its shape on the near-black ground. Palette
audit: paper #F5F1E6, cut ink #1E3A5F, construction red #C0392B,
background #0B0B0D only. Watch-only: no interaction, no hint.
Gallery entry ready: 2002 · 06 · 07, "A white paper hexagon unfolds
by true twelve fold replication into Sinan's ring, cut lines in deep
ink blue, fold lines in red, the wedge geometry still visible at the
centre. Watch only: the fold becomes the pattern."
