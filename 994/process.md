# No.994 "The Invisible Blade"

Study #122 satoshi-horii, PP155: the Fencing Tracking and Visualization
System. Horii's system detects a fencing blade tip with a neural
detector and synthesizes its trajectory in AR, making an unreadable
sport readable. Built 2026-10-31 for the generative-doodles backfill.

## Concept

The fastest thing on screen is drawn by the slowest-looking line. A
warm-white fencer-dot runs seeded phrases on a dark piste: advance,
lunge, hold, sometimes a remise, retreat. Its blade tip moves too fast
to follow, so the tracking system draws it -- but the system has
latency, and the lag is honest: the glowing trail follows the DETECTED
tip, not the true one. Every property of the trail encodes the tip's
true physics at the moment that path point was made: brightness is
speed, width is acceleration, color is turning (cyan straight, magenta
turning). No decorative swooshes, no score, no opponent: the trajectory
is the piece.

At each lunge's end (remises count as lunges) the detected path freezes
into a gray engraving that settles downward; the arena keeps the last
twelve as a stacked score of trajectories. Along the top, a thin
latency bar carries two dots, raw detection (amber) and smoothed
(cyan), so the machine's own uncertainty stays visible.

Interactions: tap launches a lunge toward the tap point; drag draws a
path the tip then replays at the drag's own recorded speeds (fast drags
draw bright and thick, slow ones thin and dim), ending as an engraving;
double-tap clears the score and reseeds the phrases.

## Construction

Closed-form throughout: every drawn value is a function of piece time
plus recorded visitor events. Frame one is the synchronous draw at
T0 = 14.78 s; no wall clock feeds any drawn state.

- Phrase timeline. Phrases are generated sequentially from a seeded
  hash stream (mulberry-style hash2 over seed 994155). Each phrase
  carries its segment table (advance / lunge 0.35 s / hold / optional
  remise / retreat), its anchors (x0, xA, xL, xR, x1), a lunge arc, and
  its lunge end times. Facing is chosen so the phrase's full reach
  (advance + lunge + remise) stays within +-0.40 stage units; anchors
  are hard-clamped to +-0.42. The blade vector extends from 0.115 to
  0.21 stage units during a lunge and pitches with the arc.
- Physics. Tip position is the fencer state plus blade vector. Speed,
  acceleration, and turn rate come from central finite differences of
  the tip function (h = 0.01 s), evaluated at any t on demand.
- Detection model. Detected tip = true tip at (t - 140 ms) plus sensor
  noise: a seeded hash of the 240 Hz sample index, +-0.003 stage units
  per axis, identical on every run. The drawn detection is a 4-tap
  average over the last 50 ms of raw detections. The live trail is 65
  samples of the smoothed detection over a 1.6 s window; each sample's
  brightness (alpha 0.30 to 1.0 over speed 0 to 1.05 units/s), width
  (1 to 5 px over acceleration 0 to 10 units/s^2), and color (cyan to
  magenta over turn rate 0 to 4 rad/s) come from the TRUE physics at
  the corresponding true-tip time, so the encoding describes the
  motion that produced that path point.
- Reticle and ghost. Amber corner brackets sit on the smoothed
  detection. A faint dot at 0.3 alpha marks the true tip, so the
  detection gap can be seen rather than inferred.
- Records. Each record resamples the smoothed detection over its
  lunge's detected window and draws it in gray at 0.5 alpha,
  translating its centroid over 2.2 s (ease-out) to its row in the
  bottom stack. Twelve most recent, newest on top.
- Latency bar. Hairline strip mapping stage x over +-0.66 (the tip's
  full range); raw dot amber, smoothed dot cyan.
- Layout. Stage units are isotropic for physics; drawing maps x
  through UX = min(S, (W/2 - 10) / 0.66) so a full lunge plus blade
  stays on the piste at any aspect, y through S = min(W, H). The
  piste compresses on phones; the engraving stack spreads into the
  taller frame. Canvas sized from the Visual Viewport API, CSS size
  pinned in draw() every frame, phone detection from window.screen
  with the aspect fallback. Page ground is the arena tone.
- Audio (lazy, typeof-guarded, first gesture only). A quiet 110 Hz
  carrier hum under the latency bar; a band-passed noise whoosh at
  each lunge start; a short tick when turn rate crosses threshold at
  speed; a soft two-partial chime when a record freezes. Triggers are
  evaluated in the rAF loop off the same closed-form counters the
  drawing uses. Silent in QA renders.

## Deviations

1. Ghost tip dot included (the brief marks it optional): without it,
   the detection gap can only be inferred from the trail; with it, the
   140 ms lag is directly measurable on screen. Drawn at 0.3 alpha so
   it stays a ghost, never a second fencer.
2. Records sample the detected window [lungeStart + LAG, lungeEnd +
   LAG], so each engraving holds the complete lunge as the system saw
   it. At the literal freeze instant the detected trail still shows
   only part of the lunge (that is what the lag means); the record is
   the system's completed account of it.
3. Frame one sits mid-remise (T0 = 14.78 s) rather than mid-lunge.
   Probing showed mid-lunge instants put the DETECTED tip behind the
   fencer dot itself: the dot darts at up to 3 units/s early in the
   lunge, outrunning its own detection, and the reticle read as
   tracking the body. Mid-remise keeps the reticle on the blade,
   between dot and ghost tip, with a lag gap of about 0.09 stage units
   and seven engravings already scored.
4. After a visitor lunge or replay, the fencer blends back to the
   seeded phrase over 0.6 s rather than rejoining a shadow copy of the
   interrupted phrase. The blend is part of the stored event, so the
   state stays a pure function of (t, events).

## QA log

- Rendered index.html with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
  All render cleanly in silence; listeners registered: vv:resize,
  win:resize, pointerdown/move/up/cancel.
- Frame one (all sizes): dark arena; the detected lunge-plus-remise
  path drawn as a bright cyan band, shading magenta at its tail (the
  turn into the phrase) and purple at its head (the remise snap);
  fencer-dot below the trail head with the faint blade hairline
  running to the ghost tip; amber reticle brackets on the detected
  tip, visibly short of the ghost; two dots on the top strip; seven
  gray engravings settled into the bottom stack. Nothing clipped on
  mobile; the ghost tip stays inside the frame at every size.
- Fix round 1: phrases could lunge past the piste edge (facing only
  considered the phrase start, not its full reach), pushing the tip
  off-canvas on square and portrait frames. Facing now accounts for
  the full reach, anchors are clamped, segment positions lerp between
  anchors, and the draw mapping compresses x on narrow frames.
- Fix round 2: frame-one instant moved from mid-lunge (13.84 s) to
  mid-remise (14.78 s) per deviation 3, and the latency bar range
  widened from +-0.46 to +-0.66 so its dots stop clamping together at
  the strip end during long lunges.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Hygiene: source greps clean for Date.now, Math.random, gradients,
  shadowBlur, ctx.filter, offscreen canvas, external references, and
  em dashes. The only text in the piece is the <title>.
