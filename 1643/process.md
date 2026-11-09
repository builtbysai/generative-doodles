# №1643 — Wabi Sabi Engine (KT4, PP890)

Study #216 kazuhiro-tanimoto. Gallery date 2006 · 07 · 12 (formula
2002-01-10 + 1644 days). Gallery note draft: "A brush plops onto
pale paper and the system writes in calligraphic masses. Draw to
edit the ink; the engine answers every mark and rebalances."

## Driver

The artwork is never finished: the viewer edits the calligraphy and
the system re-balances the composition around the edit.

## The piece

The piece opens with the deliberate movement: an ink-soaked brush
plopped onto pale paper at a seeded off-centre point (0.38, 0.40),
ink splattering outward in 90 seeded grey streaks and 60 dots. The
system has already written three calligraphic masses in sumi black,
each of three strokes, with bristle-split accents in magenta and
green, on wide conscious blank space: the right half of the frame
stays empty by design, ink masses off-centre, splatter field at the
plop point.

## Mechanism (the edit loop)

- Every pointerdown is another brush plop: a small radial splatter
  burst spawns at the touch point (seeded per edit).
- Dragging lays down viewer strokes in the same bristled simulation
  as the authored masses: three fixed strands per stroke with
  perpendicular offsets, tapering width, a slow pressure wave, and
  magenta/green split strands.
- Holding still for 0.6 s washes the ink out where the brush rests:
  pale paper blooms thin the ink but never clear it; the ghost
  stays, and the mark remains in the composition's history.
- On pointerup the balance pass runs: the system measures the ink
  centroid (authored masses plus every viewer stroke), drifts the
  three authored masses a little toward the off-centre target
  (0.44, 0.46) over two seconds, and answers with a small fresh
  mass (two strokes plus a pool) fading in over 1.5 s in the
  emptiest quadrant. Nothing is ever cleared; there is no
  click-to-clear anywhere.

## Idle motion

Slow and flicker-safe by construction: ink breathes (stroke width
oscillates at a 9 s period, amplitude 4%), splatter dots pulse at
an 11 s period, and the accent palette drifts over a 120 s cycle
(magenta/green strands lean toward each other and back). All motion
is a pure function of piece time.

## Determinism

Frame one is drawn synchronously at t = 0, fixed phase, fixed seed
1643001. All randomness comes from mulberry32; no Math.random and
no wall clock anywhere in the draw path. The rAF loop advances a
clock from that phase by elapsed frame deltas. Thumb rendered twice
with the QA harness: byte-identical
(md5 28ee5ac3c6e5281ce32e78bc58344970).

## Acceptance criteria

1. Frame one shows the plop, the splatter field and the first
   calligraphic masses already present, never a blank sheet.
2. Blank space is generous: roughly half the frame stays empty by
   design, ink masses off-centre, splatter at the plop point.
3. Strokes read as violent bristled ink, not clean vector lines:
   split strands, magenta/green accents, tapering pressure.
4. A viewer edit is answered by the system: a plop burst at the
   touch, the stroke in the same simulation, a rebalance drift of
   the authored masses, and a fresh mass in the emptiest quadrant.
5. Holding still washes ink out without clearing it; no
   click-to-clear exists.
6. Title, date and hint legible at desktop, mobile and thumb sizes;
   hint reads "Draw to edit the ink."
7. Thumb re-renders byte-identical.

## Deviations from the prompt

- Palette drift per session is enacted as a slow 120 s lean of the
  magenta/green accent strands toward each other, not a full
  palette change: the sumi/paper ground stays fixed so the piece
  keeps its identity across the drift.
- The wash is a hold-still gesture (0.6 s without moving) rather
  than a separate mode or tool: there is no mode switch, and a
  drag always draws. This keeps the single-gesture interaction
  (draw to edit) intact while still offering washing out.
- Ink masses are built from precomputed strand segments rather
  than live brush agents with physics: the agents' behaviour
  (split strands, pressure, ink load) is baked into the seeded
  geometry at build, and viewer strokes join the same simulation,
  so the visible result matches the prompt's mechanism without a
  per-frame agent solver.

## What was avoided

No drawing-app behaviour (every edit gets a system answer), no
filling of the blank space (the emptiest quadrant gets one small
answering mass, the rest stays empty), no clean vector strokes,
no click-to-clear, no em dashes in visible copy.

## Fix rounds

- Round 1 (build): strokes rendered as beaded caterpillars, with
  visible gaps and width pulsing segment to segment. Cause: each
  segment re-randomised its strand offsets and widths. Fix:
  per-strand offset, width factor and colour are now fixed for the
  whole stroke; only a smooth taper and a slow pressure wave vary
  width along the path. Also softened the ink pools (14 points
  instead of 10, alpha 0.05) after they rendered as flat grey
  kites, and cut the accent-strand rate (magenta 7%, green 10%)
  after the first render read too pink.
- Round 2 (verify): re-rendered desktop, mobile and thumb; strokes
  now read as continuous bristled brush marks. A crop check
  suggested a stroke escaping the square's left edge; pixel
  sampling proved the clip holds (zero non-paper pixels left of
  the square, stroke starts at the border). No code change.
- Round 3 (mechanism probe): a probe harness simulated a viewer
  edit at (0.70, 0.72) and a hold at (0.65, 0.30), rendered at
  t = 2.5 s. Verified in state and pixels: 1 user stroke with its
  own splatter burst, 1 answering mass in the emptiest (upper
  right) quadrant, 1 wash bloom, rebalance drift applied. No
  code change.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Desktop:
square composition, masses off-centre left, right half empty,
splatter field at the plop point, plates legible. Mobile: full-bleed
field, same composition stretched, plates legible. Thumb:
byte-identical across two renders. Interaction verified via the
probe harness described above.
