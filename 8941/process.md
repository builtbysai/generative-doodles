# №8941 · The 3:5:7 — process notes

## Concept
Seed 240: the 13-EDT tritave scale (13 equal divisions of 3:1, ~146.3 cents
per step, reaching the tritave at 1902 cents) and its 3:5:7 cadence, which
the seed notes "really slaps". The piece is a monumental brass staircase of
13 steps ascending left to right, each step labeled with its ratio and
cent value, each carrying a cluster of odd-partial light columns (1, 3, 5,
7, 9) with the even-partial slots left visibly hollow. A walker orb climbs
the steps playing a seeded random-walk melody in 13-EDT (f = 146.83 ×
3^(s/13)), leaving a fading trail; a giant "3:1" watermark looms behind the
stairs. At the end of each 26-note phrase the 3:5:7 cadence fires: three
teal pillars labeled 3, 5, and 7 rise from the steps nearest those ratios and
fall, then a new ascent begins. Tap enables audio built only from odd
partials, so the sound obeys the same rule as the light.

## Seeds tried
240001 (shipped). The seed drives the melody's random walk and the walker
timing; click starts a new seeded ascent.

## Revisions
- The cadence is the payoff and fires ~14s in, past the normal QA window.
  Verified it by freezing cadenceT mid-flight in a test copy: three pillars
  labeled 3/5/7 rise from steps 0, 6, 10 with the "the 3:5:7 cadence"
  caption, then fall. No exceptions across the full cycle.
- QA fix (2026-09-30): step numbers on the brass tops were near-illegible
  9px type on desktop. Now scaled to the step width
  (constrain(stepW*0.22, 8, 13)). Re-verified.
- QA fix (2026-09-30, real bug): the 3:5:7 cadence never displayed in the
  natural cycle. advanceWalker() called fireCadence() then buildMelody(),
  and buildMelody() reset cadence to null, wiping the cadence on the same
  frame it was born (the earlier frozen-frame verification masked this).
  buildMelody() no longer resets cadence, so the pillars play out over the
  start of the new ascent. Also cached the static backdrop (giant "3:1"
  watermark + horizon glow) into a p5.Graphics rendered once per layout
  instead of re-rasterized every frame. Verified: pillars labeled 3/5/7
  rise from steps 0/6/10 with the caption, zero exceptions.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0), including a 22s run.
- 390x844 mobile: staircase and walker read well; no UI collisions.
- thumb.png is exactly 1280x800.
