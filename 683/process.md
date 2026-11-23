# Doodle №8979: Almost Perfect (2026-08-11)

**File:** `8979/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Seed 20 from the Vera Molnar deep study: her Hypertransformation recipe.
One continuous pen path draws twenty-some nested squares on warm paper in
black ink at a constant stroke weight, the pen never lifting. Rotation
drifts as the path goes: the outer rings hold near-perfect, the twist
accumulates ring by ring, and the pen runs out of room in a small spiral
at the center. The twist is the strain of order resisting itself. The
piece draws itself like a plotter over ~8 seconds and rests on the
finished frame; click (or Enter/Space) reseeds and replays.

## Technique synthesis (from study, not copied)
- **The continuous pen** (Molnar recipe from the 2026-09-23 study): one
  polyline, one stroke call per frame. Between rings the pen travels
  inward along a short connector, so the rotation drift is literally
  accumulated along the path, not applied to N independent squares.
- **Drift as a rate function with resistance**: per-ring rotation
  increment is seeded (0.9-3.2 deg, capped at 68 deg total sweep) and
  modulated by 1-2 gaussian "stalls" where the twist briefly eases,
  plus an optional slow waver. The stall is the order-fighting-back
  moment Pettis's "almost perfect" points at.
- **Closed trembling rings**: perpendicular wobble along each edge is a
  smooth periodic function around the ring (integer cycle counts), so
  corners stay anchored and every ring closes on itself exactly.
- **Hand plus machine**: bounded center wander (<=12 VU on a 1000-unit
  sheet) and small tremble keep it from reading as CAD; constant weight
  and uniform ink keep it plotter-honest.

## Deliberate differentiation from №8999 Storm Grid
Same study, opposite construction. 8999 is a 7x7 grid of 49 independent
nested-square cells with a disorder *budget* spent as rare localized
storm cells. 8979 is a single large composition: one unbroken path, no
grid, no cells, no disorder events. The only disorder here is the
accumulating rotational drift along the one line. They share paper and
ink only.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new drawing
- Default seed 424242: near-axis-aligned opening rings, gentle inward
  sweep, tidy spiral core

## Seeds tried
Rendered 6 finished frames headless (1440x900-class + 390px mobile) and
one mid-draw frame: 897911, 897912, 12345, 777, 424242, 20260811. All
six hold together as compositions; every seed keeps the squares reading
as squares, no degenerate tangles, drift capped at 68 deg total sweep.

**Why 424242 won:** it tells the story with the most restraint. The outer
rings are essentially perfect squares, the twist visibly creeps in ring
by ring, and the center gives way into a clean spiral. The more dramatic
seeds (20260811, 12345) twist harder but start tilted, which reads as
off-balance rather than "almost perfect"; 424242 opens calm and lets the
strain arrive.

## Verification
- Zero console errors via cdp_exceptions.py on desktop (1440x900) and
  mobile (390x844), exit 0 both
- No horizontal overflow at desktop or 390px; stage stays square, page
  chrome intact
- Mid-animation capture confirms the plotter draw-on with a live pen tip;
  animation ends on the finished frame
- prefers-reduced-motion honored (jumps to the finished frame)
- thumb.png exactly 1280x800 (paper square centered on the page ground)

## Note for the ledger
Task brief said "dated 2026-08-25", but the day-0 epoch maps №8979 to
2026-08-11 (2026-08-25 is №8993, already issued as "What Isn't There").
This piece is dated 2026-08-11. Suggested ledger concept-family line:
"one continuous pen path drawing nested squares with accumulating
rotational drift, warm paper, constant stroke weight (Molnar
Hypertransformation lineage; single composition, distinct from the 8999
grid)".
