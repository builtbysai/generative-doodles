# №117 Topomembrane - process

## Concept
From Lammetje's Resonance and Ryokou. A rippling membrane fills the frame:
a grid of roughly nine thousand points displaced by layered sine waves,
drawn as dots only, never mesh lines. Where the displacement gradient is
steep the dots brighten from deep teal #0E3B3B to amber #E8A33D on
near-black #060A0A, so the field reads as agate, tree rings, or a
topographic map of water. Two knot centres at golden-ratio points pinch
the contours into rings.

## Construction
- Canvas 2D. The height field sums three travelling sines plus a damped
  ring wave around each knot. Heights are computed once per point into a
  grid buffer; the gradient comes from neighbouring grid values, and the
  colour is picked from a precomputed 33-step teal-to-amber lerp.
- Motion is a gentle endless oscillation. Pressing or dragging injects a
  ripple at the fingertip: an expanding damped ring added to the field,
  decaying over about five seconds.
- Full-bleed at every size. House scaffold: Visual Viewport sizing,
  canvas pin, screen-based phone check, synchronous first frame, guarded
  requestAnimationFrame.

## QA log
- Rendered at 1280x900, 390x844 and 720x720 and inspected.
- Fix 1: the first brightness mapping saturated almost the whole field to
  amber (the gradient sums run far hotter than the initial threshold
  assumed). Remapped to a higher threshold and gentler gain, after which
  the renders show a dark teal membrane with amber contour bands ringing
  the knots, as intended.
- Mobile is full-bleed with the same contour structure; thumb reads
  clearly as amber rings on dark teal.
