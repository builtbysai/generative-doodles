# №1965 The Underpass Plays

CW6 / PP1212, study #256 caius-williams, continuing the caius-williams block.
Gallery date: 2007 · 05 · 30. Gallery note: "An underpass played like an
instrument: drums, plates and a leaning bass bloom amber ripples from the
walls as the room re-tunes. Watch the room re-tune."

## What it is

An urban underpass receding to a night blue mouth, corrugated concrete
walls with rust ribs, a floor catching an amber reflection streak and a
dark puddle. On stands at left: a small rust drum with a skin top on a
tripod, and a tilted bronze resonant plate. At right a double bass leans
against the wall, a dark silhouette with an amber rim light. Resonances
are visualized as soft amber ripples and blooms on the walls, tied to
resonator amplitude. The space reads as found, temporary, a little
illegal: no concert hall, no polish.

## Palette

- Concrete gray #8a8680 (walls), lighter #948f88, darker #7a766f
- Floor concrete #4a4741, dark page ground #2e2c2a
- Corrugated rust #8a4a2e, lighter #a85a34, dark #5f3320
- Tone bloom amber #d9a441, pale amber #e8c88a
- Plate bronze #b98a3e, drum skin #d8cdb8
- Night blue #16233c through the mouth, lighter #22345a
- Bass silhouette near black #211f1d, plate text off white #f2efe8

## Interaction

Watch-only. No pointer handlers. The room plays itself: three
exciters fire on a fixed schedule (drum every 7 s from 3 s, plate
every 11 s from 5 s, bass every 23 s from 8 s), each strike blooming
then decaying exponentially. Five resonators per mode set are driven
by the exciters, with a slow 47 s drift on top. Every 180 s the
venue re-tunes: the old room mode set crossfades out over 8 s and
the next of three seeded mode sets blooms in. The bottom-right plate
reads ROOM MODE n / 3. All motion is on multi second timescales,
well under the 14 Hz ceiling. prefers-reduced-motion renders a
still frame. No audio: visuals run on a closed-form sound model,
per the Franke audio rule.

## Determinism

FIRST_T = 12 s. At t = 12 the first venue cycle is running (mode
set 1 of 3), the drum struck 2 s ago, the plate 7 s ago, the bass
4 s ago, so frame one shows live tone blooms already decaying into
the corrugation. Every frame is a pure function of t: seeded
mulberry32 mode sets, exponential strike envelopes, sine drift.
QA hooks: window.__draw(t), window.__piece1965 with modeSet(t),
exciterEnv(t, i), resonatorAmp(t, setIndex, i), redraw(t), firstT.
Query params: ?t= sets the virtual clock, ?seed= is an alias for it.

## Probes

- Frame one (t=12): thumb md5 2d924650a41490ff5baad4a885af0079,
  re-rendered with identical md5, deterministic frame one confirmed.
- Advanced clock probe: t=60 md5 399a4b2c48c70185e7841214c9907732,
  t=200 md5 b87d6afbf8681ea4c51421b4e10737e2, both differ from t=12
  and from each other; the t=200 render visibly shows ROOM MODE 2 / 3
  with resonator ripples at new wall positions, proving the
  venue-cycle re-tune changes the frame.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. All three inspected visually.
Thumb is the 720x720 render of the final script, md5
2d924650a41490ff5baad4a885af0079.

## Fix rounds

1. First build rendered clean, but the drum floated above the
   floor line (its tripod ended at 0.74H while the wall/floor
   boundary at its x sits at 0.82H) and the bass hung on the wall
   instead of leaning on the floor. Fix: drumY 0.74H to 0.80H,
   bassY 0.60H to 0.72H, so both rest on the floor boundary at
   their x positions. Re-rendered all three sizes and re-gated;
   thumb md5 updated to the final render.

## Deviations from the prompt

None material. The prompt prescribes the underpass, corrugated
walls, objects on stands, bass at right, ripples on the walls,
watch-only venue-cycle re-tuning, and the found/temporary/illegal
read; all are present. The mode set count (3) and the exciter
periods (7/11/23 s) are builder choices; the prompt names no
numbers. A dark puddle and an amber floor reflection are added
presentation, not art changes.

## Known warts

- On mobile the bass is small and reads more as a dark blob than
  a bass; the neck and scroll still identify it.
- The plate stand pole is thin and dark, so at thumbnail scale
  the plate can look like it floats; the pole is visible at full size.
- The drum skin flash at a strike is subtle at the decay tail;
  the bloom is strongest in the first two seconds after a strike.
