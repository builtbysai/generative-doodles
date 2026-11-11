# Wildfire Eats the Grid - №1687 (KG8, #221 kjetil-golid, PP934)

Date: 2006 · 08 · 25
Interaction: watch-only. "Watch the fire burn and the geometry regrow."

## What it feels like

A clean Archetype-style block field stands in mustard, red, and cream.
Then wildfire comes in from the left edge: a turbulent black-and-white
front eats the geometry block by block, each block scorching dark,
crumbling to an ash streak, and dissolving into rising smoke. At the
peak of the burn almost nothing is left but drifting smoke and a sliver
of geometry at the right edge. From that surviving sliver the blocks
regrow, color returning as they swell back to full size, and the field
stands clean again before the next fire. Order, wildfire, order. This
is the only piece in the set that moves, because the destruction needs
it.

## Mechanism

- Block tree: recursive subdivision of the unit square, fixed seed 934
  (mulberry32, PP934). Splits alternate vertical and horizontal at
  ratios 0.38 to 0.62, depth to 5, giving 19 leaves: 16 in the main
  field plus a 3-block survivor strip at x >= 0.93 that the fire never
  reaches. Colors assigned by the same fixed sequence: 6 mustard
  #D9A01F, 6 red #C23B2A, 7 cream #F2EDE2, on ground #EDE3CB.
- Cycle: 36 seconds. Burn 0-18s: the front sweeps left to right,
  base position -0.02 to 0.90 eased smooth, plus a three-sine
  turbulence on the front line (amplitudes 0.020, 0.012, 0.008).
  Hold 18-22s at full burn. Regrow 22-31s: a reverse front travels
  right to left from the surviving edge. Rest 31-36s, field whole.
- Burning: a block's alive value falls as the turbulent front crosses
  it. Its color mixes toward black #141210, it crumbles inward (up to
  45 percent of its smaller side) and fades out below alive 0.3, so
  burned blocks vanish rather than lingering as black slabs. The two
  tall blocks just left of the survivor strip only partly char and
  stand as scorched remnants at full burn, which is the intended
  almost-nothing-remains state.
- Smoke: strictly black #141210 and off-white #F2EDE2, no color. Each
  block emits 5 particles when the front reaches it; particle age,
  rise, drift, growth, and fade are pure functions of cycle time, so
  every frame is reproducible. A wisp band also rides the front line
  during burn and hold. Smoke alphas are rounded to 4 decimals.
- First frame: t = 0, the clean field with the front just at the left
  edge and a few faint wisps, so the thumb reads as geometry with a
  hint of smoke. All randomness comes from the fixed seed and
  deterministic hashes; time is a pure function of t. Thumb
  re-rendered twice, md5-identical: 6536542ae77d4d75a1aae8044558fcb7.
- Watch-only: no interaction, no click, no reload. Reduced motion
  shows the static first frame. No audio. Flicker is not an issue:
  the only motion is the slow 36-second burn-regrow cycle.

## Asserted counts

- 19 blocks (16 field + 3 survivor strip), verified by leafCount in
  the script probe.
- 3 survivor blocks at x >= 0.93, verified by survivorCount.
- 3 geometry colors: mustard #D9A01F, red #C23B2A, cream #F2EDE2.
- 2 smoke colors only: black #141210, off-white #F2EDE2.
- 1 interaction: none. Watch-only.

## Deviations from the prompt

None material. Two judgment calls: the prompt's "smoke wisps and ash
streaks" is rendered as soft overlapping alpha circles plus the
crumbling charred remnants, which read as ash streaks while a block
is mid-burn; and the burn front's maximum reach is 0.90 plus
turbulence (up to about 0.94), so the two tall blocks immediately
left of the survivor strip survive as dark scorched monoliths at full
burn instead of vanishing entirely. That keeps the "almost nothing
remains" peak while the survivor sliver stays unmistakable.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected visually.
Mid-cycle frames rendered at t = 9 (front mid-field, left half
charred and smoking, right half intact), t = 20 (full burn: empty
ground, drifting smoke, survivor strip and two scorched remnants),
and t = 27 (regrowth returning from the right edge, color coming
back) and inspected on desktop and mobile. A phone-layout bug was
caught and fixed in QA: block y-coordinates were scaled by the
square side instead of the viewport height, leaving the bottom half
of the phone view empty; blocks now scale by viewport width and
height separately, so the field goes full-bleed on phones per house
rules. Thumb re-rendered twice after the fix, md5-identical.
