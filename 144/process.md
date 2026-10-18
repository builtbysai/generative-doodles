# No.144 Two Fold Hexagon

## Concept
A regular hexagon constructed from a paper square with only two folds.
A square sits on a dark surface; two diagonal creases draw themselves;
then the controlled collapse: corners cross inward along the split
mountain, the excesses fold away, and the hexagon cuts free, glowing
white against black and turning once before the trick resets. Watch
only: a magic trick, and the motion teaches.

## Construction
Canvas 2D, single self-contained page, seamless 24s loop with integer
phases: square settles in (2s), first diagonal crease draws as an
animated dashed stroke (4s), second diagonal (4s), collapse (8s),
hexagon hold with one full rotation (4s), crossfade back to the square
(2s). The shape is an 8-point polygon (square corners plus edge
midpoints) interpolated to the hexagon: corners travel to the hexagon
vertices at (+-0.5, +-0.866), midpoints settle onto its edges, so the
outline is an exact regular hexagon at collapse = 1. During the
collapse the four corner excesses are drawn as separate valley-shadow
flaps whose free corner reflects across the emerging hexagon edge,
folding away one after another. Exactly two crease lines, both diagonal,
dashed, fading as the collapse completes; the held hexagon fills with
the highlight white and a soft glow. No interaction, no hint, no text.
House rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect fallback,
synchronous first frame (loop clock offset into the hold, so frame one
is the glowing hexagon mid-turn), typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. The offset frame shows exactly the intended reveal:
a regular white hexagon, turned partway through its single rotation,
glowing on the near-black ground, square footprint (60 percent of frame)
respected on desktop, phone and thumb. Palette audit: paper #F5F1E6,
creases #C9C0AA, valley #8A8574, background #0A0A0C, highlight #FFFFFF
only. Watch-only verified: no pointer listeners, no hint element.
Gallery entry ready: 2002 · 06 · 04, "A paper square on a dark surface
draws two diagonal folds, collapses through the split mountain, and
cuts free a glowing hexagon. Watch only: a magic trick."
