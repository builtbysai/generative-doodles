# No.1746 "The Recycling Loop" (PP993, ZM3, #229 studio-zimoun)

## Driver

The same parts, endlessly disassembled and reassembled, nothing created or destroyed. A field of box-motor units ticks as one mass, then calmly comes apart: motors unclamp, cotton lifts off, boxes flatten into sheets. The parts stream across the frame as ribbons and settle into a different formation, and the whole thing starts again. The felt phenomenon is reuse made visible: 95 percent reused, again and again, the material river never gaining or losing a single piece.

## Build

Canvas 2D. 24 units, each a part-set of 4 parts (box, motor, cotton ball, whisker), 96 parts total. Every part position is a closed-form function of piece time: no frame-integrated state, no wall clock, no Math.random().

Cycle: 180 s, two 90 s half-cycles. Half-cycle 1 runs grid rows to scatter; half-cycle 2 runs scatter back to grid rows, so t = 0 and t = 180 render identically.

Half-cycle schedule (h = position inside the 90 s half-cycle):
- h 0.00 to 0.30: ticking mass, formation assembled, whiskers ticking.
- h 0.30 to 0.45: disassembly. Boxes flatten into sheets (width grows, height shrinks, fold lines appear), motors unclamp and lift away, cotton lifts off.
- h 0.45 to 0.75: flow. Part anchors interpolate to the next formation along a flow field; detach vectors rotate toward the flow direction and a cross-flow sine wiggle turns the parts into streaming ribbons.
- h 0.75 to 0.90: reassembly. Parts settle onto their new anchors.
- h 0.90 to 1.00: ticking mass in the new formation.

Frame one: fixed phase t = 8.0 s, grid rows ticking, before any disassembly.

Whisker periods: 180 / n seconds with n a fixed seeded integer from 62 to 140 per unit (periods about 1.3 to 2.9 s). Distinct n per unit means no two whiskers agree, and because each period divides 180 exactly, the ticking is periodic with the cycle, which is what makes the t = 0 / t = 180 match exact. Scatter layout: the grid lattice shuffled with a fixed seeded permutation plus seeded jitter, so the scatter stays a loose floor scatter with guaranteed separation.

## Palette

studies/studio-zimoun.md does not exist locally, so hexes are hand-picked from the prompt's named colors: warm grey ground #A9A29A, cardboard tan #C9A876 with dark edge #A9854F and light #DCC49A, motor black #211D1A, cotton white #F6F1E7, whisker grey #5E5952. No other colour appears anywhere in the piece. Plates are dark #2B2622 with tan line and pale inks, the same plate treatment as No.1743.

## Part census

The piece counts every part it draws and shows the live total on a plate: "PARTS 96 / 96" with "24 BOX · 24 MOTOR · 24 COTTON · 24 WHISKER". Census probed at fixed times (node probe, 720x720):

| t (s) | Phase | Parts |
| --- | --- | --- |
| 0 | TICKING (grid) | 96 / 96 |
| 8 | TICKING (grid, frame one) | 96 / 96 |
| 10 | TICKING (grid) | 96 / 96 |
| 45 | FLOWING | 96 / 96 |
| 60 | FLOWING | 96 / 96 |
| 75 | REASSEMBLING | 96 / 96 |
| 100 | TICKING (scatter) | 96 / 96 |
| 135 | FLOWING | 96 / 96 |
| 150 | FLOWING | 96 / 96 |
| 165 | REASSEMBLING | 96 / 96 |
| 180 | TICKING (grid) | 96 / 96 |

Total identical at every probed time: nothing created, nothing destroyed.

## Seamless cycle

t = 0 and t = 180 rendered at 720x720, md5 0bbb5f421589b8064ff0d6f00b5639be for both: MATCH. First attempt mismatched because whisker periods were free reals; fixed by choosing periods as exact divisors of 180 (see above) and re-gated.

## House rules

Visual Viewport sizing, resize listened to on visualViewport and window. Canvas pinned in draw() via canvas.style.width/height in px. Phone detection via window.screen (min dimension under 700px) with aspect fallback (h > w * 1.15). Field-like composition: full-bleed on phones, centered square on desktop (page ground is the piece's own warm grey, so the square blends). One synchronous frame at load; requestAnimationFrame guarded with a typeof check. Seeded RNG only (mulberry32, seed 1746). Title, date "2006 · 10 · 23", and hint "Watch only." on plates that never cover the field. No em dashes in visible copy. Flicker safety: the fastest motion is the whisker tick at about 0.8 Hz, far below 14 Hz by construction. Watch-only, no pointer handling.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js:
- Desktop 1280x900: grid of 24 box-motor units reads, whiskers at varied angles, plates legible, nothing covered.
- Mobile 390x844: full-bleed field, units small but legible, hint and census plates adjacent at the bottom without overlapping.
- Thumb 720x720: same grid reading as desktop.
- Mid-cycle frames inspected: t = 40 (disassembly) shows boxes flattened into sheets with fold lines, motors unclamped, cotton lifted; t = 60 (flow) shows parts streaming across the frame as a material river between formations.
- Thumb re-rendered independently, byte-identical (md5 match, see below).

## Deviations

- Palette hand-picked from the prompt's named colors; the studies file does not exist locally (noted above).
- Whisker periods are exact divisors of 180 s rather than free irrational periods, so the 180 s cycle closes exactly. Distinct periods per unit keep the whiskers out of agreement, as the prompt requires.
- The scatter formation is a shuffled, jittered lattice rather than a Poisson scatter, to guarantee separation and determinism.

## Files

- index.html, md5 to be recorded by the parent at push time
- process.md (this file)
- thumb.png, md5 to be recorded by the parent at push time
