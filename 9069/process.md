# №9069 · Bastion - process notes

## Concept
A wall of 60 to 83 vertical slabs standing on a baseline. Each slab's
height is set by two unseen sources inside the square: height falls off
with horizontal distance from each source as a Gaussian, and the two
fields add, so towers rise where a source sits and the wall sags where
neither reaches. Slabs are colored by height: low slabs deep teal, mid
slabs slate and ochre, tall slabs rust. The single tallest slab is
vermilion, found by measurement after the skyline is built, never placed
by hand.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9069. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing per the standing rule.
- Sources: x in 0.10 to 0.45 and 0.55 to 0.93, amplitude 0.60 to 0.90,
  radius 0.09 to 0.20 of the width. A small ripple (amplitude 0.03 to
  0.08) and per-slab jitter of 0.01 keep the top edge from looking
  machined. Heights clamp to 0.05 to 0.97 of the floor height.
- Compositional safety: height range and the count of slabs above 0.80
  are measured; a seed needs range above 0.55 and at least four slabs
  above 0.80 (16 derived-seed attempts, best score kept).
- Iteration: v1 sources were wide Gaussians and the wall came out as one
  clamped red plateau. Narrowed the radii, dropped amplitudes so peaks
  form only near a source, and raised the rust threshold to 0.86 so
  color bands track the skyline instead of flooding it.

## Differentiation
- vs No.9064 (Grainfield): loose dots in a flow field. Bastion is solid
  slabs on a shared floor; the field is invisible and only sets heights.
- vs No.9067 (Silt): horizontal strata spanning the full width. Bastion
  is vertical, discrete, and stands on a baseline with air above it.
- Family name: "two-source slab skyline".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Mobile letterboxes the square
  correctly; hint legible.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9069/index.html`, `9069/thumb.png` (720x720, rendered from the live script), `9069/process.md`. Gallery index updated with the №9069 entry.
