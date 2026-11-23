# №120 Monolith Study - process

## Concept
From Zancan's garden-versus-monolith duality, through the lammetje
network study. Two generative regimes trade places on one canvas. The
garden: a dense chaotic line thicket grown from root points. The
monolith: one massive dark slab described by sparse contour lines,
floating in near-empty paper, always slightly off centre. Every 25
seconds the piece crossfades; the change is a slow dissolve, never a
wipe or a cut. Palette: paper #F2EEE2, garden ink #22221E, slab #14130F,
contours in paper, and one accent, oxide red #A03A22, used sparingly in
both regimes (rare garden lineages, one contour ring).

## Construction
- Canvas 2D. The garden is a compact version of the Grassline growth
  engine (16,000 segment cap, height-scaled tip lifetimes, pre-rolled at
  load). The monolith is a slightly skewed slab polygon filled at the
  blend alpha, with thirteen inset contour strokes whose offsets shimmer
  gently; the sixth contour is the red one.
- A global blend parameter runs a 25 second cycle (garden hold, 4s
  dissolve, monolith hold, 4s dissolve back) with smoothstep easing.
  Horizontal drag scrubs the blend by hand in either direction; on
  release the offset eases out and the timer resumes. Within each regime
  the piece keeps breathing: the garden keeps growing, the contours keep
  shimmering.
- The first frame is drawn mid-dissolve, since the trade between regimes
  is the subject. House scaffold: Visual Viewport sizing, canvas pin,
  screen-based phone check, guarded requestAnimationFrame.

## QA log
- Rendered at 1280x900, 390x844 and 720x720 and inspected.
- The garden engine received the same fixes as №119 (depth-weighted
  alpha, height-scaled tip lifetimes, capped pre-roll, gentle
  home-column pull), after the first mobile render left the garden
  hanging in the lower half of the tall frame.
- Final renders show the dissolve honestly: garden linework ghosts
  through the half-faded slab, contour rings and the single red contour
  visible; on mobile the slab sits monumentally at centre with the
  garden gathered around and below it.
