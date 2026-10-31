# No.611 "The Body as Lightning"

EXPANSION #74 adolfo-serra, prompt block 3 "Danzantes". His eme21mag dance cover
rebuilt as a motion loop: translucent dancer silhouettes in three flat colors
overlap on bare paper until the crossings deepen into the composition itself.

## Concept

- Paper ground only, no scenery, no horizon, no text. The piece is wordless.
- Fourteen parametric dancers fill the frame edge to edge, densest slightly
  above center, in vermilion #C8461F, indigo #2B3A67 and ochre #D9A441 over
  paper #F2EDE3. Nothing else exists in the palette.
- Each dancer is a filled silhouette body: a tapered torso mass and four
  tapered limbs posed from a five-pose dance set (leap, turn, crouch, reach,
  split), forever mid-leap or mid-turn.
- Watch-only loop: dancers morph between poses on slow 6-9 s cycles, drift
  sideways, breathe in alpha, dissolve at the edges and re-enter. The cast is
  endless and the arrangement never repeats, but every variation is drawn from
  seeded cycles, so frame one is fixed forever.
- Drag is a gust through the ensemble: nearby dancers lean and swirl with
  momentum, then recover. Tap does nothing, per the prompt.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Canvas size from the Visual Viewport API with resize listeners on both
  visualViewport and window; `canvas.style.width/height` are pinned in px
  inside every `draw()`. Phone detection via `window.screen` min dimension
  under 700px with the aspect fallback; the composition is full-bleed at every
  size.
- Dancer model: joints (neck, head, two elbows/hands, two knees/feet) defined
  per pose in dancer space with the hip at the origin. Pose at time t is a
  smootherstep interpolation between pose(cycle) and pose(cycle+1), where the
  pose sequence is a hash of the dancer's seed and the cycle index
  (mulberry32), so pose, drift, bob and alpha are all pure functions of t.
- Edge-bleed method (no shadowBlur, no filters, no offscreen canvas): each
  dancer's filled silhouette path is filled four times, pass widths stepping
  from 1.35x down to 0.82x of the design widths, each pass offset by a small
  static seeded jitter and drawn at low alpha. The stacked passes read as a
  watercolor wash with a darker core and a bleeding rim.
- Overlap deepening: dancer passes are drawn with
  `globalCompositeOperation = 'multiply'` over the paper fill (guarded with a
  try/catch fallback to source-over), at an overall dancer alpha near 0.6, so
  two crossing dancers visibly deepen in color where they cross.
- Anchors: fourteen dancers are dealt onto a jittered 5x3 grid (rows at
  0.20 / 0.46 / 0.72 of the height, which is what puts the density above
  center) with per-dancer scale 0.62-1.25 for layered depth. Drift wraps
  through an extended span with an edge fade zone so figures dissolve rather
  than pop at the frame edges.
- Gust: pointer drags accumulate a strength value from pointer speed; each
  dancer within radius gets a tangential swirl offset plus a lean rotation,
  weighted by a squared distance falloff. Strength decays exponentially once
  the drag ends. Gust state exists only after interaction and never affects
  the first frame.
- Determinism: the first frame is drawn synchronously at t = 0 before any
  rAF; the loop (typeof-guarded) anchors elapsed time to the first rAF
  timestamp. No Date.now, no Math.random anywhere; all randomness is
  mulberry32 streams seeded per dancer.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Read-back, round 1: dancers read clearly with washy edges and deepening
  overlaps, but pure-random anchors clumped at the top and left the lower
  left quadrant nearly empty, and limbs read too chunky.
- Fix round: anchors moved to the jittered 5x3 grid, figure unit reduced
  (0.185 to 0.168 of min dimension), torso width 0.34 to 0.30 and limb width
  0.21 to 0.165 of unit, scale range widened for depth layering. All three
  renders redone and re-read.
- Read-back, round 2 (final): desktop shows the ensemble filling the frame
  edge to edge, densest above center, leaps/splits/reaches legible, crossings
  deepened (indigo over ochre, vermilion over indigo), no hard edges, no
  text. Mobile shows the same field at 390 wide, full-bleed, nothing clipped.
  Thumb matches the desktop composition.
- Fix round 3 (fly's gate): the capsule-stroke figures read as stick figures
  and marionettes, with dark dots where round caps stacked at the joints.
  The figure rendering was rebuilt as filled silhouette bodies. Each dancer
  is now a single canvas path per pass: a tapered torso mass (hips, waist,
  shoulders), a neck bridge, four tapered limbs (thick at shoulder/hip,
  narrowing to hands/feet), rounded hand/foot caps, and a filled head circle
  merged into the neck. The path is filled once per pass, so overlaps inside
  a dancer never stack, and no joint dots can form. The wash bleed is kept:
  four jittered translucent passes with widths stepping 1.35 / 1.15 / 0.97 /
  0.82, same mulberry32 jitter stream, same alpha, same multiply overlap, so
  crossings between dancers still deepen. Pose set, pose-morph system,
  anchors, drift/wrap, gust, alpha envelopes and frame-one determinism are
  unchanged. All three renders redone; thumb byte-compare re-run, identical.
  Read-back: the figures now read as bodies in motion (leaps, splits,
  reaches, turns), densest above center, nothing clipped on mobile.

## Deviations

- Anchors sit on a jittered grid rather than a free scatter. Reason: free
  seeded scatter failed the read-back twice (clumping and an empty quadrant);
  the grid is invisible in the piece and only guarantees the prompt's
  edge-to-edge density. Recorded here per house rules.
- The prompt's technical note suggests shadowBlur-style soft edges; this
  build deliberately avoids shadowBlur (QA renderer risk) and gets the bleed
  from layered jittered silhouette fills instead, as briefed. The visual
  result (soft wash rim, darker core) is the same mechanism Serra's washes
  use: pigment pooling at the center of the stroke.
- "Never the same twice" is honored through very long combined seeded cycles
  (pose sequence, drift, bob, alpha breathing with incommensurate periods)
  rather than true randomness, because the determinism gate forbids
  Math.random. Over any normal viewing span the arrangement does not repeat.
