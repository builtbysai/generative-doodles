# No.726 "Alignment" — EXPANSION #88 okazzsp, block 7

## Concept

A 12x12 grid of cells on black, each cell holding four quarter-circle arcs
in saturated colors. Each arc carries its own seeded phase offset, so most
of the time the field is scattered rainbow shrapnel: arcs overlap and gap
at unrelated angles. Twice per 24-second loop an alignment wave travels
diagonally across the grid; as the front crosses a cell, its four arcs
converge onto exact quarter positions and, briefly, a complete circle
exists where none was drawn. Then the phases drift apart again. No full
circle is ever stroked directly: circles exist only as the emergent
result of alignment.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette is exactly the specced eight tones: background `#08080A`, arcs
  `#FF3838`, `#FF9F1A`, `#F7E731`, `#54A0FF`, `#2E5BFF`, `#1DD1A1`,
  `#FFFFFF`. Flat thick strokes only (lineWidth ~18% of cell, butt caps),
  no glow, no background changes, no text besides the title.
- Geometry: the largest centered square of the viewport (94% of the
  smaller dimension) split into a 12x12 grid; each cell's arcs are drawn
  at radius 30% of cell size around the cell center, each arc spanning
  exactly 90 degrees minus a 0.055 rad seam inset at both ends. Canvas
  sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; the canvas is pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` min
  dimension < 700px, aspect fallback only; the grid refits the phone
  frame, still 12x12.
- Per-cell seeded state (mulberry32 from the epoch seed): four arc colors
  held constant for the whole epoch, a base rotation rho0, one phase
  offset per arc in [-1.9, 1.9] rad, a slow drift oscillation (amplitude
  0.25-0.75 rad, integer frequency 1 or 2 so the loop closes exactly), a
  per-arc wiggle, and the aligned target rotation rhoA = rho0 rounded to
  the nearest multiple of 90 degrees.
- Phase convergence function. With u = (t mod 24)/24 the loop phase and
  d = (cx+cy)/22 the cell's normalized diagonal coordinate, the alignment
  strength is

    A(cell, u) = E(u) * W(cell, u)
    E(u) = smoothstep(0.03, 0.18, u) * (1 - smoothstep(0.82, 0.97, u))
    W(cell, u) = smoothstep(0.55, 0.92, cos(2*pi*frac(2u - 1.15d + 0.35)))

  E is a trapezoid envelope: zero at u=0 and u=1, so frame one is fully
  scattered and the loop closes on the identical scattered field; it
  ramps in over the first fifth of the loop, holds at 1, and ramps out
  at the end. W is the diagonal wave: the factor 2 on u gives two waves
  per loop, the 1.15 sweep carries each front corner to corner, and the
  cosine pulse shaped by smoothstep(0.55, 0.92) means a band a few
  diagonals wide reaches full alignment as the front passes, with softer
  partial convergence on either side. Each arc's drawn angle is
  theta = aligned + wrapPi(scattered - aligned) * (1 - A): shortest-path
  interpolation, so convergence is a smooth phase lock, never a jump.
  At A = 1 the arc sits exactly on its quarter.
- Interaction: watch-only. Tap reseeds the phase field: the epoch
  advances, all colors, offsets, and drift parameters regenerate from
  the new seed, and the loop clock re-anchors at the next frame. No
  drag, never a reload.
- Determinism: frame one is the synchronous draw at loop t=0 from the
  epoch seed; it is never derived from `Date.now()` or the live clock.
  Every time term is a closed-form periodic function of u with integer
  frequencies, so the frame at t=24 is the frame at t=0 by construction.
  An inert `?seed=tNN` hook (read from `location.search`) forces the
  loop time for QA renders; it is empty in the gallery.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and `cmp` byte-compared
  identical; the duplicate was deleted.
- Loop closure: a forced render at t=24 `cmp` byte-compared identical
  to frame one.
- Mid-wave check: a forced render at t=14.7 (the second wavefront
  crossing the central diagonal at full envelope) shows a diagonal band
  of completed four-color circles ringed by partially converged cells,
  dissolving back into shrapnel away from the band; the scratch render
  was deleted after read-back.
- Read-backs: frame one at all three sizes is scattered thick
  quarter-arcs on black, colorful shrapnel with no completed circles;
  mobile keeps the full 12x12 grid in the tall frame, nothing clipped.
- Deviations: none from the prompt's substance. One implementation
  note: alignment is gated by the trapezoid envelope E(u) so that frame
  one (t=0, the gallery thumbnail moment) is the fully scattered field
  the prompt specifies rather than catching a wavefront mid-pass; the
  two diagonal waves per loop run at full strength through the middle
  of the loop.
