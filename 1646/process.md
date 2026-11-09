# №1646 — The Absorption (KT7, PP893)

Study #216 kazuhiro-tanimoto. Gallery date 2006 · 07 · 15 (formula
2002-01-10 + 1647 days). Gallery note draft: "Draw a shape into the
running field and watch the system eat it. Draw to feed the field."

## Driver

The death of a gesture. You draw a mark and it lasts three seconds as
yours, then the system eats it, and you watch it forget you.

## The piece

A running two-species cellular automaton in muted teal and rust on a
near-black ground (#121417), full-bleed field, no center, no edge
narrative. The grid is 160 columns on desktop (72 on phones), rows
sized to the viewport aspect. Each cell carries a species and a
vitality; teal reads the 8 Moore neighbours, rust reads 4 orthogonal
plus 4 at distance two, so the two species genuinely see different
worlds. Per generation a sampled neighbour decides attack (a
stronger foe converts the cell and absorbs half the loser's
vitality), assimilation (kin share vitality), or growth into empty
cells; weak cells die and empty cells are reborn when three or more
neighbours of one species surround them. Colour comes from species
plus vitality, quantized to eight shades per species, so borders
carry a soft gradient of strength.

## Interaction

Pointer drag draws directly into the frame: strokes rasterize into
bright white cells at vitality 1, in a 3x3 brush, rate-limited to
900 cells per second so the field is never overwhelmed. There is no
moment when the shape is not part of the automaton: white cells
proliferate into empty neighbours for their first second, then the
local rules take hold. Conversion is structural and visible: an
attacked white cell turns gold for six generations while the rules
take hold, then becomes teal or rust (the dominant foe species
around it) and leaves a fading gold ghost on the trace layer, which
decays with a ~14 s half-life, so the places where gestures were
absorbed stay faintly marked for about 20 seconds. No eraser, no
undo, no click-to-reload anywhere; the field never pauses or
restarts. The hint plate reads "Draw to feed the field."

## Determinism

Frame one is generation 120 of the seeded field, pre-run
synchronously at load from fixed seeds (field mulberry32(1646001),
step stream mulberry32(1646093)); no gesture yet, no wall clock. All
randomness comes from those two streams; no Math.random anywhere.
The rAF loop advances the automaton at 12 generations per second
from the fixed phase plus elapsed time, with every
requestAnimationFrame call guarded by a typeof check. Thumb rendered
twice with the QA harness: byte-identical
(md5 3cfa6a968d8fc3ffbaaeecf5a861f1d1).

## Acceptance criteria

1. Frame one (generation 120) shows a developed, contested
   teal/rust field with no gesture; the thumb re-renders
   byte-identical.
2. A drawn shape is bright white immediately, proliferates briefly,
   then is converted by the local rules within about 3 s, passing
   through a visible gold converting state and leaving fading gold
   traces.
3. The field keeps transforming over minutes; both species stay
   present with shifting territory.
4. Input is rate-limited; drawing can never overwhelm the field.
5. No click-to-reload; no em dashes in visible copy; motion is a
   12 Hz cellular step, flicker safe.

## Deviations from the prompt

- First build's white conversion was near-instant: the attack
  probability (0.05 + 0.09 per foe neighbour) converted most drawn
  cells within 2-3 generations, so the gesture never lasted its
  three seconds. Retuned to a slow burn with a hard deadline
  (0.008 + 0.015 per foe, plus a ramp after 2 s that forces
  conversion by ~3 s). Probe counts after the fix: 331 drawn white
  cells, 215 at 1 s (58 already gold), 105 at 2 s, 5 at 3 s, 3 at
  4 s, 0 after a further minute.
- Growth and white proliferation run as a second pass over the
  current state instead of inside the main loop: the first build
  wrote spreads into the next-state buffer for cells the loop had
  not processed yet, and the loop's per-cell copy erased them.
  Caught by reading the code before QA, fixed, re-gated.
- Seed blobs raised from 26 to 34 and radius from 4-14 to 5-16
  cells after the first desktop render read too sparse (large
  black voids); frame one is now 83.4% occupied.
- Reduced motion: the autonomous loop does not run. A stroke is
  still drawable, and on pointerup it is absorbed in one
  synchronous 36-generation burst, so the gesture is eaten without
  continuous motion. The field itself is static for reduced-motion
  visitors.
- Flagged, not fixed: over minutes the field saturates (empty cells
  reach 0 after about a minute of simulation) as birth refills
  every death. Both species stay present and their counts keep
  shifting (teal 8534 to 9785, rust 6539 to 8295 over 60 s), so
  the war continues, but the visual becomes a full mosaic with no
  dark ground showing. A long-session visitor sees a denser field
  than frame one.

## What was avoided

No drawing tool with a CA filter on top: the stroke writes cell
states, never pixels, and the same rules that run the war eat the
gesture. No delayed processing, no eraser, no undo, no settings.
No gradients, no shadowBlur, no offscreen canvas.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Dense
contested teal/rust field with ragged borders reads clearly at all
sizes; title, date, and hint plates legible. Interaction probe
(vm-isolated instance, stubbed rAF, piece driven via
window.__probe): frame one teal 8534 / rust 6539 / white 0 / gold 0 /
empty 3007 on a 160x113 grid; a drawn circle of 331 white cells
follows the absorption curve above; after a further 60 s both
species are alive (teal 9785, rust 8295); a separate 5-minute run
on the pre-retune code (teal/rust rules unchanged by the retune)
also kept both species contested (teal 9777, rust 8303). A
mid-absorption frame at ~1.5 s was rendered and inspected: the
white ring is half-eaten with gold flecks at the converting edge.
Two fresh thumb renders are byte-identical.

## Fix rounds

Two. (1) Spread-erasure bug in the first build, fixed by moving
growth and proliferation to a second pass. (2) White conversion
too fast plus sparse seeding, fixed by the conversion retune and
the blob-count raise, then re-gated end to end.
