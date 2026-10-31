# No.858 — Final Ten Seconds

Study #105 hsin-chien-huang, PP19 "The Ten-Second Ekho". The Ekholux dead
repeat their final ten seconds forever, trapped in time's last breath. The
piece is a memorial: pale figures loop their paths on a black field above a
single grief-blue floor-line, and nothing the visitor does can interrupt
them. The visitor can only walk among them, and, if their own walk closes
into a loop, join them.

## Concept

- Black field #050505; one grief-blue #1B2A3A floor-line at 70% height,
  the only blue in the piece.
- Five translucent ekho-pale #D8D2C4 figures, faceless elongated
  silhouettes (soft head blob on a tapering body column), each tracing its
  own 10-second path on an endless loop in its own zone.
- Each figure drags a fading chalk trail in trail-fade #8A8678, and each
  loop carries one small deep-red #7A2018 marker at its closure point,
  which pulses at the moment the loop closes.
- Watch-only by default. Dragging walks among them and leaves a fading
  ghost path; closing a loop with the drag adds the visitor's own loop as
  a sixth, paler ekho. A tap pulses a red marker once. A double-tap
  releases all loops and reseeds five new paths.
- No faces, no eyes, no text, no scores, no objectives. The loops are
  monuments, not obstacles: no interaction path can pause, deflect, or
  break an ekho.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets.
Canvas size comes from the Visual Viewport API (resize listeners on
`visualViewport` and `window`); `draw()` pins `canvas.style.width/height`
in px every frame. Phone detection uses `window.screen` physical size
(min dimension < 700px), with the aspect test `h > w*1.15` as fallback
only; the phone path scales figures by 1.12.

Path families (all closed-form in `pos = (t + off) mod 10`, `a = 2π·pos/10`;
the anchor is the figure's base center, coordinates normalized):

- **Pacing** (x 0.30): horizontal oscillation, `x = cx + amp·sin a +
  0.018·sin(a+1.3)`, feet on the floor-line with a small double-frequency
  bob.
- **Reaching** (x 0.52): `x = cx + amp·sin a`, anchor rises on a 1:2
  lissajous term, `y = by − 0.105·(0.5+0.5·sin(2a+φ))`, and the body
  stretches up to 22% taller at the top of the reach.
- **Kneeling** (x 0.70): a small low ellipse, short wide silhouette,
  `y = by + 0.010·sin(2a+φ)`.
- **Swaying** (x 0.15): a plain ellipse loop, `y = by + 0.030·cos(a+φ)`.
- **Turning / figure-eight** (x 0.85): `y = by + 0.032·sin a·cos a +
  0.006·sin(2a+φ)`.

Trails are the same position functions sampled backward over 3.4 s in
0.14 s steps, stroked segment by segment with alpha
`0.52·(1 − s/3.4)^1.35`, plus a jittered second pass; because the trail is
the path function itself, it can never disagree with the figure. Chalk
texture on the silhouettes is layered: a main fill at 0.40 alpha, an
offset ghost fill at 0.15, and two jittered outline strokes, all offsets
precomputed per figure from a mulberry32 seed (no per-frame randomness,
no canvas filters, no gradients, no shadowBlur, no offscreen canvas).

Closure markers sit at each path's phase-0 point: a permanent small red
dot, plus an expanding ring whose alpha is `0.75·exp(−age·1.6)` where
`age` is seconds since the loop last wrapped, so the pulse is a pure
function of t.

User-loop capture rule: while dragging, samples are recorded with piece
timestamps. If the current point comes within `max(18px, 3.5% of min
dimension)` of a sample that is between 1.2 s and 10 s old, and the path
drawn since that sample is at least 22% of the min dimension long, the
segment from that sample is resampled to 96 points and becomes the user
ekho: a paler (0.55 alpha) figure replaying it forever, with its own
trail and closure marker. A tap (under 8px movement, under 0.4 s) drops
a red pulse at the tap point; two taps within 0.45 s reseed the five
seeded figures (generation counter into the mulberry32 seed), releasing
the user ekho and all tap marks.

Audio: on the first pointer gesture, a lazy, `typeof`-guarded
AudioContext starts one quiet sine hum per ekho (64.0, 64.7, 81.2, 96.4,
108.1 Hz, gains ≈0.028; the close 64.0/64.7 pair beats slowly; the user
ekho adds 87.3 Hz at 0.020). The hum bank is rebuilt on reseed and on
capture. Nothing is created where AudioContext does not exist.

Determinism: frame one is the synchronous `draw(0)` at load; no
`Date.now()` is used for any drawn state (the clock is elapsed time only,
and the QA renderer, which has no `requestAnimationFrame`, captures
exactly the synchronous frame). Frame-one loop positions are anchored at
0.55 / 3.2 / 5.6 / 7.4 / 2.1 s so all five figures open mid-loop with
developed trails, and the pacing figure sits 0.55 s past its closure so
its marker pulse is visible in the still.

Deviations, with reasons:

- The hum bank arms on the first `pointerdown` rather than waiting for a
  completed tap: a pointerdown is the gesture every tap and drag begins
  with, and this keeps the memorial audible while a visitor walks among
  the figures. It is still never automatic and never before a gesture.
- The captured user loop keeps its own recorded duration (clamped to at
  least 1.5 s) as its replay period instead of being re-timed to exactly
  10 s: the ekho replays the visitor's gesture faithfully, at the speed
  they drew it. All five seeded ekhoes are exactly 10 s.
- Chalk grain is simulated with layered jittered strokes because the
  house renderer offers no filters or offscreen surfaces.

## QA log

- Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas shim;
  no `requestAnimationFrame`, no `AudioContext`, no
  `document.createElement`). The piece rendered cleanly in silence at all
  three sizes; registered listeners were resize (window +
  visualViewport) and pointer handlers only.
- `qa-desktop.png` (1280×900): black field, grief-blue floor-line at 70%,
  five pale elongated figures in separate zones (sway, pacing, tall
  reaching, kneeling, eight), each with a fading chalk trail; deep-red
  closure dots visible, with the pacing figure's pulse ring open at its
  base by the floor-line.
- `thumb.png` (720×720): same composition; pacing's long trail sweeps
  left along the floor to its marker; the reaching figure's trail hooks
  down to its marker below its raised base.
- `qa-mobile.png` (390×844, phone path): figures scale up, zones remain
  separate, nothing clipped; floor-line and markers intact.
- Fix round: the first render's trails were too faint (alpha cap 0.30,
  ~2px). Raised to alpha cap 0.52 with exponent 1.35 and line width
  `max(1.6, H·0.0032)`; all three sizes re-rendered and re-read.
- Determinism: `thumb.png` rendered twice and `cmp` byte-compared,
  identical, in both the initial and post-fix rounds. Duplicate render
  deleted.
