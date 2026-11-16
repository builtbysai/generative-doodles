# No.1818 "Twenty Slots" (AD3, PP1065)

## Source
Prompt block arnold-dreyblatt, AD3 (PP1065), EXPANSION #238, TASKS.md.
Gallery date 2007 · 01 · 03 (formula date 2002-01-10 + 1819 days).

## Driver
Twenty unequal slots from the overtone series; the wheel is a tuning, not a clock.

## What was built
- One ivory wheel (#EFE8D6) on a charcoal ground (#232326), dominating
  a centered square field on desktop and phone alike, with the page
  ground set to the same charcoal and the hint in ivory.
- Exactly 20 slots. Slot widths are the just-intonation steps between
  successive partials 16 through 36: width i is proportional to
  log2((17+i)/(16+i)), normalized so the twenty steps fill the whole
  wheel. Widths run from 26.9 degrees for slot 0 down to 12.5 degrees
  for slot 19, all unequal, summing to 360 degrees. Charcoal radii
  divide the slots; a charcoal hub with an amber center sits at the
  middle. No 12-slot equal-temperament grid, no piano keyboard, no
  chromatic scale anywhere.
- Chords: every 6 s a new chord of 3 to 5 slots is born, chosen by a
  deterministic hash (no Math.random) as harmonic offsets from the
  current root, drawn from the first eleven partials folded into the
  wheel. Slots in a chord light in turn over the first 2 s, then fade
  together over the chord's 6 s life, so the wheel keeps breathing.
  Only one chord is lit at a time.
- Root shift: every 48 s the wheel steps over 4 s so a new slot
  becomes the root under a fixed amber pointer at the top. The pointer
  never moves and the fundamental never moves: chords are always built
  as offsets from the slot under the pointer. The root partial is
  labeled above the pointer in amber (P17 at frame one).
- Five small players in a semicircle below the wheel: charcoal robes,
  ivory heads, arms that rise in amber toward the wheel when their
  player is sounding. The two outer players carry a short bow stick.
  They bob gently on a 4 s cycle.
- Watch-only. No pointer or keyboard handlers are registered at all,
  so input does nothing by design.
- True time: after the fixed first frame, phase is computed from a
  wall-clock start captured at load, so dropped frames never lose time.
- Reduced motion: prefers-reduced-motion renders a still frame.
- House rules: single HTML file, inline JS/CSS, canvas 2D only, no
  document.createElement; Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700px) with aspect fallback; square field on
  desktop and phone, page ground charcoal; one synchronous frame at
  load; all requestAnimationFrame calls guarded with a typeof check.
  Title/date/hint plates drawn on canvas. Flicker is at most 0.5 Hz
  by construction (chords every 6 s, shifts every 48 s), far below
  14 Hz.

## Slot width table
Widths in degrees, slot 0 first, slot 19 last. Each is the log step
from partial 16+i to partial 17+i, normalized to the wheel.

| Slot | Step | Width |
| 0 | P16 to P17 | 26.9 |
| 1 | P17 to P18 | 25.4 |
| 2 | P18 to P19 | 24.0 |
| 3 | P19 to P20 | 22.8 |
| 4 | P20 to P21 | 21.7 |
| 5 | P21 to P22 | 20.7 |
| 6 | P22 to P23 | 19.7 |
| 7 | P23 to P24 | 18.9 |
| 8 | P24 to P25 | 18.1 |
| 9 | P25 to P26 | 17.4 |
| 10 | P26 to P27 | 16.8 |
| 11 | P27 to P28 | 16.1 |
| 12 | P28 to P29 | 15.6 |
| 13 | P29 to P30 | 15.1 |
| 14 | P30 to P31 | 14.6 |
| 15 | P31 to P32 | 14.1 |
| 16 | P32 to P33 | 13.7 |
| 17 | P33 to P34 | 13.3 |
| 18 | P34 to P35 | 12.9 |
| 19 | P35 to P36 | 12.5 |

## Fixed phase (frame one, t = 63 s)
Deterministic, reproducible every load; no wall clock is read for
frame one. The wheel has completed its shift to root slot 1 (partial
P17, labeled above the pointer). The chord born at 60 s is 3 s old:
all four of its slots have lit and are fading together at half
strength. The chord is slots 15, 8, 4 and 1, all distinct, with the
root slot 1 among them. Next chord birth at t = 66 s; next root shift
at t = 96 s (to slot 2, P18).

## Deviations from the prompt
- Slot construction: the prompt asks for slot angles from harmonic
  series ratios. The build uses the log steps between successive
  partials 16 to 36 rather than log positions of 20 ratios in one
  octave, because octave folding duplicates ratios (partial 32 lands
  on partial 16, partial 34 on partial 17), so 20 log positions cannot
  give 20 distinct slots. The step construction gives exactly 20
  unequal slots, all derived from harmonic ratios.
- Players below the rim: the prompt puts the players in a semicircle
  in front of the wheel. The build stands them just below the wheel
  rim instead of overlapping the disc, so their ivory heads stay
  visible against the charcoal ground rather than vanishing against
  the ivory wheel.
- Root label: the slot under the pointer is labeled by its partial
  number (P17) rather than a ratio, since the slot is defined by a
  partial step, not a single ratio.
- No other deviation. Chords are 3 to 5 slots, lit slots fade, the
  root stays fixed under the pointer while the wheel shifts, and
  nothing lands between slots.

## QA
Rendered the actual script with node ~/workspace/tools/render-piece.js:
- 1280x900 desktop: PASS. Ivory wheel dominates the square field,
  20 visibly unequal slots, 4 amber lit wedges (top, right, lower
  right, left), P17 label legible in amber above the pointer, five
  players clear below the rim with raised amber arms, title/date
  and "Watch only." plates legible, nothing clipped.
- 390x844 mobile: PASS. Square field centered, wheel and 4 lit
  slots read clearly, P17 legible, players clear below the rim,
  plates legible, nothing clipped.
- 720x720 thumb.png: PASS. Same fixed-phase frame as desktop, wheel,
  lit slots and players reading at first glance. Thumb was rendered
  last from the final index.html.
- Determinism: thumb rendered twice independently, md5 identical
  both times (83b192f2f687fedb56d4bcac7db00d31).
- Numeric check: probe of the live script reports 20 slots, widths
  26.9 down to 12.5 degrees, all unequal, summing to 360.0 degrees;
  chord at t = 63 s has 4 distinct slots; sampled chords at t = 6 s
  (5 slots) and t = 30 s (4 slots) are within the 3 to 5 range.
- Two fix rounds: the first render used ratios 16/16 to 35/16 as slot
  boundaries, which put partial 35 outside the octave and gave slot
  19 a negative width; the geometry was rebuilt on partial steps.
  The second render showed the players overlapping the wheel with
  ivory heads invisible against ivory, and the charcoal root label
  invisible against charcoal; players were moved below the rim and
  the label changed to amber. All three sizes were re-rendered and
  re-inspected after each fix.
- No post-gate edits were made after the final renders.
