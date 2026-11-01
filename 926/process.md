# No.926 "Forwards Is Growth"

Study #113 miriam_quick, PP87 "Procession": Miriam Quick's US-economy jungle
episode (2021) as a rave loop-visualizer. A circular breakbeat ring spins at
the center of a black square; each quarter since 1968 is a segment. Growth
quarters spin the ring forwards and glow hot pink; recession quarters spin
it backwards and cool to ice cyan. The flip is the encoding.

## Concept

The ring IS the series: 232 arc segments on a thin white core circle, one
per US quarter, colored by direction only (two neons, never a third).
A playhead travels the series at one quarter per 1.1 seconds, and the
ring's rotation is the integral of the playhead's direction: clockwise
through expansions, counterclockwise through recessions, so the long
2008-09 run visibly drags the whole loop backwards. Gold sparks spray at
the playhead each time the direction flips. The legend sits in a thin top
strip ("forwards = growth · backwards = recession") and tiny decade labels
ride the rim on their own segments.

Interactions: tap a segment to drop that quarter (the ring spins only its
direction for 5 s while a caption names it, e.g. "Q2 2009: backwards");
drag around the ring to scratch it like a DJ, the ring following the
finger and the breakbeat bending with it; double-tap to jump to the long
2008-09 recession and hold it for 8 s. Sound is a synthesized Amen-style
breakbeat (kick, snare, hats, no samples) that starts on the first
gesture; in recession quarters the pattern steps backwards, and dragging
drives the pattern phase directly, like a finger on vinyl.

## Construction

- Data (synthesized, seeded, recorded here): 232 quarters, 1968 Q1 to
  2025 Q4. Recession clusters at the documented recessions: 1973 Q4-1975 Q1
  (6), 1980 Q1-Q2 (2), 1981 Q3-1982 Q4 (6), 1990 Q3-1991 Q1 (3),
  2001 Q1-Q3 (3), 2008 Q1-2009 Q3 (7), 2020 Q1-Q2 (2). Three
  single-quarter dips drawn by mulberry32(92687) from fixed candidates
  (1970 Q1, 1986 Q3, 1998 Q3, 2016 Q1); the draw picked 1986 Q3,
  1998 Q3, 2016 Q1. Totals verified in node before building: 32 recession
  quarters, 200 growth, longest run = 7 at 2008 Q1 (strictly longest).
- Rotation model (closed form): prefix sums A[k] of per-quarter angle
  steps, dir(k) = -1 for recession, +1 for growth, step = RATE x 1.1 s.
  RATE = 2pi x 5 / (1.1 x (200 - 32)) = 0.17000 rad/s, chosen so one full
  series loop (255.2 s) nets exactly 5 whole turns and wraps seamlessly.
  angleOf(tau) evaluates the prefix sum plus whole-loop turns for any
  playhead position tau. Frame one places the playhead at tau = 135.3,
  inside Q4 2001 (growth), 0.3 quarters after the flip out of the 2001
  recession, so the gold flip sparks are mid-spray in the first frame.
- Events: tap isolate, double-tap hold, and drag are recorded as data
  (tap time + quarter; drag start/end + timestamped cumulative angle
  samples). stateAt(t) folds the sorted event list: inside an isolate the
  ring spins at the tapped quarter's direction from its event-time angle;
  inside a hold it spins backwards continuously while the playhead cycles
  the 2008-09 run; inside a drag the angle follows the recorded finger
  samples with the playhead frozen. Every mode hands back an angle offset
  so the ring never snaps. During a live drag the same values are computed
  from the in-progress gesture and committed as an event on release.
- Sparks: flip boundaries precomputed (20 in the series); each carries a
  seeded field of 12 sparks (mulberry32(926232)) that spray outward over
  0.5 quarter-units of playhead travel past the boundary.
- Audio: lazy AudioContext created on first pointerdown, fully
  typeof-guarded and try/caught. Breakbeat at 142 BPM sixteenths:
  kick = sine drop 100 to 43 Hz; snare = bandpassed noise burst plus a
  190 Hz body; hats = highpassed noise ticks. Pattern phase advances with
  the current direction sign, so recession quarters literally step the
  pattern backwards; while dragging, pointer angle deltas feed the phase
  (6 steps per radian). The noise buffer is filled from mulberry32(9260).
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style width/height pinned in px every
  draw; phone detection via window.screen (min dimension < 700) with the
  h > w x 1.15 aspect fallback; ring radius = 0.36 x min(w, h) so the
  ring stays centered on the smaller dimension. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no Math.random, no
  Date.now. Visible text is only the legend, the rim decade labels, the
  isolate caption, and the title.

## QA log

- Data verified in node with the identical generator: 232 quarters,
  32 recession / 200 growth, longest run 7 at index 160 (2008 Q1),
  RATE = 0.17000 rad/s, net loop rotation exactly 1800 degrees.
- Renders via node ~/workspace/tools/render-piece.js: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720). Silent render
  clean (no AudioContext in the harness).
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted. Frame one is the synchronous draw(0);
  nothing drawn derives from Date.now.
- Read-back: all three sizes show a pure black field, a large ring of
  pink segments with cyan recession runs (the 7-quarter 2008-09 run at
  the bottom by the 2010 label), the thin white core circle, the legend
  strip at top, decade labels 1968/1980/1990/2000/2010/2020 on the rim,
  the playhead segment lit at Q4 2001 on the right with the white needle
  and a spray of gold sparks beside it. Mobile keeps the whole ring and
  labels in frame, nothing clipped.

## Deviations

- Quarter span: the study text says 1968-2026 and the brief fixes 232
  segments; 232 quarters from 1968 Q1 end at 2025 Q4, so the count wins
  and the series runs 1968 Q1 to 2025 Q4.
- Decade labels ride their segments' positions but are drawn upright
  rather than rotated tangentially, so they stay legible as the ring
  turns. Position is still segment-true.
- The breakbeat is a synthesized Amen-style step pattern, not the Amen
  sample; recession playback reverses the pattern by stepping its phase
  backwards instead of playing a reversed buffer (there is no buffer).
- During the double-tap hold, the ring keeps spinning backwards for the
  full 8 s while the playhead cycles the 7-quarter run (7 quarters at
  1.1 s is 7.7 s), instead of the playhead parking at the run's end;
  this keeps the ring angle continuous with no snap at release.
