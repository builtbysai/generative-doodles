# №9068 · Quarry - process notes

## Concept
A cut face read from above: 20 to 27 nested irregular polygons, each one
the bench line of the next cut down. Every level is a closed decagon whose
radius is a low-harmonic wobble of angle (2 and 3 harmonics), with phases
shared loosely between neighbors, so benches roughly parallel each other
without ever matching. Only ten vertices per level keeps every bench
faceted, like a cut, not smoothed like a contour map. Levels fill from a
mineral palette walked in small steps; a thin shadow line under each bench
gives the stack depth, and the deepest polygon is a small dark pit.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9068. `?seed=` shareable; click mints a new build. Square
  composition on a bone ground inside the dark page; DPR capped at 2;
  canvas sized from the Visual Viewport API with resize listened to on
  visualViewport as well as window, per the standing viewport rule.
- Radii fall from 0.97 to about 0.07 in slightly uneven steps. The outer
  bench is fitted to 94 percent of the half-square by measured maximum
  extent, so no bench ever leaves the square.
- Compositional safety: the outer bench's vertex radius ratio (max over
  min) is measured; seeds under 1.25 are rejected (16 derived-seed
  attempts), because a regular stack reads as a diagram, not a quarry.
- Palette walk: at most one index per level, no identical neighbors.

## Differentiation
- vs No.9066 (Undertow): stroked concentric rings whose subject is
  interference between neighboring rings. Quarry is filled and faceted;
  nothing is stroked but the thin bench shadows, and there is no center
  field, only depth.
- vs No.9072 (Well): also nested, but Well is stroked open squares on
  bone, a single repeated square turned. Quarry polygons are irregular,
  filled, and mineral colored; no two levels share an angle set.
- Family name: "faceted bench polygons".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Mobile letterboxes the square
  correctly; hint legible.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9068/index.html`, `9068/thumb.png` (720x720, rendered from the live script), `9068/process.md`. Gallery index updated with the №9068 entry.
