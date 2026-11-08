# №1623 "WCC 214" (SP8, sableraph #213, PP870)

## Driver
The header is a contract: each week's composition must visibly obey the
posted constraint, and the only control is the week itself.

## Design
A weekly creative constraint piece after sableraph's #WCCChallenge (weekly
themed challenge, Discord submissions, Sunday Twitch reviews; #210 Newyellow
trained there through 2023). A square sheet on paper (#F2EFE6) carries a
header strip at top (week number, constraint text, days remaining) and the
composition fills the rest, edge to edge. Frame one is week 214: a
hand-jittered contour field in ink blue (#2B4C7E). Motion is watch-first: the
composition drifts subtly within its constraint over the week (a one-week
sine phase, so frame one is a fixed point). Tap advances to the next week's
constraint; the header updates and the composition regenerates under the new
rule, cross-fading over 0.8 s.

## Constraint list and generators
Five constraints cycle by week index, constraint = list[(week - 214) mod 5].
Each has its own genuine generator, not a reskin:

- 214 NO NOISE, HAND-DRAWN ONLY, ink #2B4C7E: contour field. Iso-lines of
  a pure sine-sum field (four sine terms, seeded phases; no noise function
  anywhere) traced by marching squares on a 48x48 grid at 7 levels, each
  vertex hand-jittered by a fixed hash and double-stroked for a sketchy
  hand-drawn pass.
- 215 ONLY CIRCLES, ink #B3402A: circle packing. Seeded rejection sampling
  places up to 64 non-overlapping circles (gap 3 px) inside the field; every
  mark is a circle, stroked, about a third filled at low alpha. No other
  shape is drawn.
- 216 ONE COLOR, ink #2E5B3E: jittered grid. A 9x9 grid of squares in a
  single ink, each cell seeded-jittered in position, size, rotation and
  alpha; about one cell in eight is left empty. One color only.
- 217 VERA MOLNAR GRIDS, ink #5B2E5E: Molnar-style displaced grid. A 10x10
  lattice whose points are seeded-displaced up to a quarter cell, joined by
  wobbly polylines, with three seeded cells holding a rotated inner square.
- 218 NO STRAIGHT LINES, ink #222222: freehand wobbly contours. Five nested
  closed contours whose radius is wobbled by seeded sine sums, plus six
  wobbly open curves; every segment is short and wobbled, no ruler-straight
  line anywhere (the header divider is a wobbly hand-drawn rule in all
  weeks, so 218 stays honest).

## Week epoch and days remaining
Epoch: Monday 2026-11-02 00:00 UTC (Date.UTC(2026, 10, 2)), chosen so week
214 is the week of this build. calendarWeek = 214 + floor((now - epoch) /
7 days). daysLeft = 7 - (floor((now - epoch) / 1 day) mod 7); on the build
day (Sunday 2026-11-08) that is 1, shown as "1 DAY LEFT". Tap advances the
week by one and persists {week} in guarded localStorage key 'doodle-1623'
(try/catch, never throws); on load the stored week wins only if it is at or
ahead of the calendar week, so a tap survives a reload within the week but
the calendar takes over once it passes. A ?week=N query parameter overrides
the displayed week for QA only.

## Frame-one determinism
Frame one is drawn synchronously at t = PHASE = 1.0 s. All drawing
parameters are pure seeded functions of the week index (mulberry32, no
Math.random anywhere). The wall clock is used only for the week/day
computation, quantized to whole days, never for the drawing phase; the
one-week drift sine is a fixed near-zero value at t = 1.0 s. The thumb is
therefore reproducible within a calendar week.

## Deviations
- None from the spec. The week epoch is a piece-local anchor (Monday
  2026-11-02, chosen so week 214 is the build week), not the challenge's
  actual historical start; the spec left the epoch to the builder.
- A ?week=N query parameter overrides the displayed week; it exists only
  for QA and is documented above, not a user-facing control.

## Fix rounds
- Round 1 (mobile hint): the first mobile render showed a contour line
  crossing the hint text, because the phone field ran to the bottom of the
  viewport. Fixed by ending the phone field 40 px above the bottom (hint
  strip), matching the 1620 template. Re-rendered mobile: hint clear.
- Round 2 (week 218): the first 218 render had the outer ring clipped by
  the field edge and the open curves drawn as spiky zigzags that ran off
  the field. Fixed by shrinking ring radii, shortening and gentling the
  curves (lower wobble amplitude and frequency, starts inside the central
  half), then scaling rings elliptically to the field so the composition
  fills the sheet without clipping. Re-rendered 218: rings fit, curves
  read as freehand wobbles, no straight lines anywhere.
- Tap verified in a node probe harness (/tmp/probe-1623.js): dispatching
  pointerdown and advancing rAF time past the 0.8 s fade renders week 215
  ONLY CIRCLES (md5 313defd27b7b8921b08e51b150c0fcb4, distinct from frame
  one). All five weeks verified by forced-week renders: 214 contour field,
  215 circle packing, 216 one-color jittered grid, 217 Molnar displaced
  grid with rotated squares, 218 wobbly contours.
- Thumb determinism: two independent 720x720 renders have identical md5
  (e0faefa0cde4fea22999356c0dc1d628).

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centered square sheet on desktop with
the page ground set to the piece's own paper color (#F2EFE6) and a dark ink
hint; full-bleed on phones with title/date strips above the sheet and the
hint below; one synchronous frame at load; requestAnimationFrame guarded by
typeof check; reduced-motion support (static frame at PHASE). Title
"WCC 214", date "2006 · 06 · 22" (formula date), hint "Tap for next week's
constraint." No em dashes in visible copy.
