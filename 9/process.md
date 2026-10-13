# №9 · Shimmer - process notes

## Concept
An op-art target that vibrates without moving: concentric rings, each
drawn as dashes whose length cycles with the ring index (three-step
cycle) and whose coverage alternates between rings. Neighboring rings
therefore carry different dash patterns, offset by half a period on
alternate rings, and the interference between patterns is the shimmer.
Exactly one ring, in the middle band, is vermilion (brief concept 9,
shimmer target).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on its own off-white ground.
- 26 to 33 rings; dash count per ring computed from circumference so
  dash arc length follows the cycle, not the radius. Each dash is its
  own subpath: a shared path joins arcs with straight spokes.
- Iterated once: v1 used dash counts growing linearly with ring index,
  which made outer rings near-continuous with a spiral seam. The
  arc-length formulation fixed the vibration.

## Differentiation
- vs No.9066 (Undertow): wobbled continuous rings, interference from
  a flow field. Shimmer's rings are perfect circles; the motion is
  dash-pattern interference only.
- Family name: "dash-interference target".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9/index.html`, `9/thumb.png` (720x720, rendered from the live script), `9/process.md`. Gallery entry appended at the end of page3.html with the formula date.
