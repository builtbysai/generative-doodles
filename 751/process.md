# №9062 Driftlines: process notes

## Concept
A fine-line flow field where tone comes from velocity. Hundreds of hairline
curves are advected through a domain-warped fbm noise field that carries both
direction and speed. Local field speed drives three things at once: how densely
lines seed (rejection sampling against speed^1.6 on a jittered grid), how heavy
each line draws (stroke weight and alpha follow mean speed along the trace), and
how long lines run (fast lines are shorter, packing into dark masses; slow
lines run long and whisper-thin). Tone emerges from the field's own motion:
fast reaches gather into dark tonal masses, slow reaches fall back to sparse
traces on bone. Warm-black ink on bone ground (#ece5d3), with a rare rust line
class at about 1 in 40 (#a33b2e). Hairline frame at the margin boundary; lines
die at the margin and never cross it. Finished with restrained 1px paper grain.

## Construction
- Single self-contained `index.html`, canvas 2D, no libraries. mulberry32 PRNG,
  seeded permutation gradient value noise, 4-octave fbm, domain warp by
  sampling fbm at warp-offset coordinates (classic two-stage warp).
- The field is two independent fbm systems: one warped field for direction
  (angle = TAU * turbulence * fbm(warped coords)), one separate fbm for speed
  magnitude, remapped and shaped with a 1.35 power curve. Per-seed personality
  parameters (direction scale, warp strength 3.0-5.6, angle turbulence 0.7-1.7,
  speed scale) drawn from the seed's PRNG stream.
- Seeds: jittered stratified grid (inner area / 46 cells), accepted with
  probability speed^1.6 plus a 3% floor so slow regions keep a few traces.
  Each seed traced forward and backward from the origin point, ~2.4px steps,
  terminating at the margin rect, after 100-250 steps (fewer when fast).
- Draw order: thin lines first, heavy dark masses last, so tonal masses settle
  on top without burying the whispers. Line width 0.55-2.55px scaled by
  composition size; alpha 0.42-0.80 by speed; rust lines slightly hotter.
- Compositional safety: a 20x20 density grid over the inner square measures
  the 10th/90th percentile segment density. Retry with a derived seed (up to
  8 attempts) unless: surviving lines >= 120, (p90-p10)/p90 >= 0.75,
  p90 >= 200 (real dark masses exist), p10 <= 120 (real light regions exist,
  guards against muddy mid-gray).
- Layout: S = min(viewport w,h), square composition centered and letterboxed
  on the dark page background; DPR capped at 2; debounced redraw on resize;
  click re-seeds and updates the URL query string.

## Iteration
1. First build: worked, but the angle turbulence was low (0.55-1.45) and the
   default seed 9062 came out too laminar, mostly horizontal drift with weak
   tonal masses. Bumped warp to 3.0-5.6 and turbulence to 0.7-1.7; 9062 gained
   pronounced meanders, dark convergence bands, and a focal knot at right
   center while staying in the same family.
2. First tonal metric was (max-min)/max over the density grid; it saturated
   near 1.0 on every seed (one sparse cell guarantees it), so the retry guard
   was meaningless. Replaced with percentile spread (p90-p10)/p90 plus
   absolute floors on p90 and ceiling on p10. Measured real values across ten
   seeds before setting thresholds (typical tonal 0.87-0.95, p90 625-1131,
   p10 41-81).
3. Checked the darkest knots (e.g. seed 777001's diagonal channel) for mud:
   kept line character everywhere, no solid black blobs, so no width/alpha
   clamp was needed. Left max width and alpha as built.
4. Verified margins on every render: lines terminate at the 8.5% margin rect,
   none cross; the hairline frame reinforces the boundary and tested well.

## Differentiation
- vs №9059 Crosscurrent: Crosscurrent uses THICK two-family (dark/pale)
  ribbons with collision checking and frayed tails. Driftlines is hairline
  only, near-monochrome, and its logic is density-driven tone from velocity,
  not ribbon collision. Different mark, different logic, different read.
- vs №9061 Underdrawing: Underdrawing is wash plus construction lines.
  Driftlines has no wash and no construction geometry; every mark is an
  advected trace. Different.
- vs FUTURE_PIECES seed 5 "Field Notes" (unbuilt straight flow-field study):
  Field Notes is a plain flow field; Driftlines commits to the
  velocity-to-tone mapping (speed drives seeding density, weight, and length),
  which Field Notes does not do. The concept stands on that mapping.

## QA log
- Seeds rendered and visually reviewed at 1280px: 9062 (default), 424242,
  777001, 271828. All compose: distinct personalities (laminar drift with
  convergence bands; vortex cluster; diagonal dark channel; interwoven
  currents), strong tonal range, margins respected, rust accents rare and
  well placed, no margin escapes, no muddy mid-gray.
- Compositional safety stats (first attempt, all seeds): lines 424-714
  (floor 120), tonal 0.87-0.95 (floor 0.75), p90 625-1131 (floor 200),
  p10 41-81 (ceiling 120). Six additional random seeds (5, 99, 1234567,
  31415926, 20261103, 8675309) all passed on the first attempt; the retry
  loop was never triggered in testing but remains as the guarantee.
- Responsive: rendered at 390px width (mobile). Square composition centers
  and letterboxes correctly, hint text legible, line weights hold at small
  size, no layout breakage.
- Console check via CDP (console-check.js): zero messages, zero errors on
  the final file. Temporary debug logging was used during tuning and removed.
- Visible copy rules verified by grep: no em dashes, no date strings, no
  absolute URLs anywhere in index.html. Hint text is lowercase and short
  ("click for another drift"). Title is "№9062 · Driftlines".
- Deliverables: `9062/index.html` (self-contained piece), `9062/thumb.png`
  (720x720 crop of the square composition from a live 720px render),
  `9062/process.md` (this file). Best full-size screenshot for review:
  `/tmp/build-9062/review.png` (seed 9062, 1280px).
