# №1624 "Rippling" (YL1, yi-wen-lin #214, PP871)

## Design
A dark pond at night in monochrome ink-wash, after his "Rippling - Heavy
rain in the night" reel. Rain falls at a seeded rate; each drop strikes the
surface and emits an expanding set of 4-6 concentric rings. Rings intersect
and build interference moire across the frame; older rings fade as new ones
arrive. Rain streaks slant across the upper frame and spatter marks pepper
the edges. Strict monochrome, no color. The pond fills the frame edge to
edge on every screen (portrait field composition); no UI, no captions, only
the title, formula date, and hint drawn lightly on the water.

## Driver
Invisible rain made visible only as expanding rings; the pond is a surface
that remembers each drop briefly, and interference is the drawing.

## Mechanism
- Drop spawner on a seeded Poisson schedule (mulberry32, seed 1624007, rate
  9 drops/s, exponential inter-arrival times). Drops are generated on demand
  as piece time advances and pruned once their last ring has faded, so the
  storm runs indefinitely from a fixed seed with no Math.random and no wall
  clock anywhere.
- Each drop is an origin with 4-6 rings: linear expansion at 40-62 px/s,
  max radius 180-320 px, alpha falling linearly with radius, 0.13 s stagger
  between rings in a set, quick fade-in over the first 0.12 s. Rings are
  drawn with `lighter` blending, so interference moire emerges naturally
  wherever rings overlap.
- Rain streaks: 56 seeded streaks confined to the upper 42% of the frame,
  slanted about 15 degrees from vertical, falling 50-110 px/s and wrapping
  within the upper band. Spatter: 70 seeded dots inside a 7% edge margin.
- Press and hold: pointerdown makes the pointer a storm cell, dropping rain
  at about 18 drops/s wherever it rests (pointermove updates the cell);
  pointerup, pointercancel, or pointerleave ends it and the seeded rain
  resumes. No drag-to-stir, no tap-to-clear, never click-to-reload. With
  prefers-reduced-motion the frame is static, and a press drops a burst of
  8 rings already mid-flight at the pointer instead of starting the loop.

## Fixed frame-one phase
Frame one is drawn synchronously at t = PHASE = 1.0 s. The Poisson schedule
starts at t = -10 s, so by frame one roughly 100 seeded drops have already
fallen; ring lifetime is now up to ~8 s (max radius 180-320 px at 40-62
px/s), so about 45 drops still show rings and the pond reads as an active
storm across the whole field, not empty water. All streak and spatter
positions are pure seeded functions of the viewport size, and ring geometry
is a closed-form function of piece time, so the first frame is
byte-reproducible. Verified: two independent 720x720 thumb renders have
identical md5 (d5691a3e81e3e7fa4d24e087bed6cb96).

## Deviations
- Spec palette values (#0B0D10 water, #D8DDE2 rings, #3A4048 streaks,
  #8A929B spatter) are near-greys with channel deltas up to 5. They are
  rendered as exact greys (#0C0C0C, #DADADA, #4A4A4A, #8B8B8B) so the
  strict-monochrome gate holds exactly: pixel check over all three QA
  renders shows max channel delta 0. The visual difference is nil.
- Streak grey was lifted from #3C3C3C to #4A4A4A in the fix round (see
  below) so the streaks read at all on the near-black water.

## Fix rounds
- Round 1 (first render): the pond was active with clear concentric sets and
  moire, but the rain streaks were nearly invisible (alpha 0.08-0.22, grey
  #3C3C3C) and the desktop frame was sparse in the lower half.
- Round 2: drop rate 6 to 7/s, streak count 46 to 56, streak alpha to
  0.14-0.32, streak grey to #4A4A4A. Re-rendered all three sizes: streaks
  now slant visibly across the upper frame, the storm is denser, moire
  stays strong in overlap zones, and all three renders still pass the
  monochrome pixel check (max channel delta 0).
- Round 3 (gate fix, 2026-11-08): frame one still read half-empty — rings
  clustered in the upper two-thirds, lower third nearly empty black water
  on desktop and thumb. Root cause: with rate 7/s and ring lifetime only
  ~3 s (max radius 130-230 px at 46-72 px/s), only about 20 drops showed
  rings at frame one, and lengthening the pre-roll alone could not help
  because drops older than the ring lifetime show nothing. Fix: rate 7 to
  9/s (top of the plausible-rain band), pre-roll -8 to -10 s, ring speed
  46-72 to 40-62 px/s, max radius 130-230 to 180-320 px, prune window 8 to
  10 s so the longest-lived rings are never cut early. Frame one now shows
  about 45 ring sets across the whole field. Side effect: the denser rain
  put bright ring sets behind the hint, washing it out; a shadowBlur halo
  (tried at 10 and 18) barely dimmed the rings, so the title/date/hint are
  now stroked in the water colour (lineWidth 5, round joins) before being
  filled, a halo that clears rings hugging each glyph. Seed, PHASE,
  palette, and the press-and-hold storm cell are unchanged.

## Verification
- Desktop 1280x900, mobile 390x844, thumb 720x720 renders inspected: rings
  are concentric sets from distinct origins, interference moire visible
  where rings overlap, streaks slant in the upper frame, spatter at the
  edges, title/date/hint legible at all sizes, no color anywhere. Pixel
  check over the final three renders: bright-pixel share per horizontal
  third is 12.35/10.34/6.40% (desktop), 23.65/20.98/13.93% (thumb),
  33.37/27.74/19.26% (mobile) — no empty third anywhere; max channel
  delta 0 on all three.
- Storm-cell harness (node, fake rAF, stepped clock), re-run after the drop
  code changed: holding the pointer at (360,360) drove local mean
  brightness from 22.5 to 220.5 over 2 s while a control box stayed at
  13.7; after release it decayed to 49.6 as seeded rain resumed. The
  mechanism works and releases cleanly.
- Flicker is at most the smooth expansion of rings; no flashing or
  oscillation by construction. Reduced-motion renders a static frame.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; portrait field fills the frame edge to
edge on phones and desktop; one synchronous frame at load;
requestAnimationFrame guarded by typeof check; reduced-motion support.
Title "Rippling", date "2006 · 06 · 23" (formula date), hint "Press and hold
to call the rain." No em dashes in visible copy.
