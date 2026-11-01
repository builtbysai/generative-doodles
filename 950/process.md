# No.950 "Facade, Dreaming"

Study #116 refikanadol, PP111 "The Building Dreams" (WDCH Dreams / Living
Architecture). Build and QA only; nothing pushed.

## Concept

A building facade in perspective is the constant; data-paint is the dream
that flows over it. Roughly 3,000 particles stream left to right across
the front, their paths warping with the perspective bands, pooling and
eddying at three curved (Gehry-ish) bays, deflecting around the darkest
bays, and surging across the whole facade in a bright wave every ~90 s.
The architecture never changes mid-piece: tapping wakes one bay (it
lightens and its paint speeds up), dragging is the wind, and a double-tap
starts a new dream by reseeding the paint only.

## Construction

- Facade (master seed 950111, built once in `buildFacade()` before any
  paint stream exists): a building CORNER, two facade planes meeting at a
  vertical corner edge at 0.63 W on a horizon at 0.36 H, which is where
  the brief's vanishing point sits (the corner/horizon junction). Each
  wall's floor lines are straight segments that kink at the corner: the
  left wall's lines all converge on a vanishing point on the horizon to
  the right (1.5 W, 0.36 H), the right wall's on one to the left
  (-0.19 W, 0.36 H), so floor spacing compresses toward the corner from
  both sides. Bay lines on both walls converge on a shared point far
  below (corner x, 4.2 H), so the verticals stay near-upright and lean
  gently toward the corner. 9 floor bands; 7 bays on the left wall, 4 on
  the right (11 total); the corner edge is itself a mullion. Cell tones
  are seeded per wall: mostly indigo #1B2A6B, about a quarter steel
  #3A4A7A, six shadow #0A0B12 cells across both walls. Mullions stroke in
  #8A8F98 at 0.42 alpha. Three seeded bay columns are curved (two left,
  one right): their mullions bow away from the corner as quadratic
  curves, and each curved column carries an eddy centre computed from
  its middle cells' centroid, pushed along the bow.
- Facade constancy: `buildFacade()` creates and fully consumes its own
  mulberry32 stream from SEED_FACADE. Paint generations use a separate
  stream seeded from SEED_PAINT + generation x 7919, consumed only by
  `reseedPaint()`, which reassigns particle hues, speed jitter, per-band
  speed biases and per-eddy strength biases. Particle placement uses a
  third stream (SEED_INIT). No code path from a double-tap reaches the
  facade arrays, so the building is byte-identical across dreams; only a
  viewport resize rebuilds it, from the same seed.
- Paint: each particle owns a floor band and a fractional position inside
  it; its target height is the perspective interpolation between the two
  bounding floor lines at its current x, using whichever wall it is on,
  so streams run straight across the corner kink and converge toward the
  corner instead of running flat. Velocity relaxes toward a stream
  target speed; eddy centres add tangential swirl plus a weak inward
  pull and cut the target speed by up to 55% (pooling); shadow cells
  repel from their centroids (checked only against the particle's own
  band and its neighbours); a woken bay boosts speed x1.6 within its
  radius. Trails are 16-point buffers recorded every 5 steps, drawn in
  two alpha bands (0.10 old, 0.24 new); heads are small squares whose
  alpha rises with the particle's pool value.
- Surge: first at step 4800 (40 s), then every 10800 steps (90 s),
  lasting 480 steps (4 s). Speed multiplier is 1 + 1.2 sin(pi f) (peak
  2.2x) and a white band sweeps left to right, drawn as five flat alpha
  slices (no gradient). The 3000-step (25 s) pre-roll ends at step 3000,
  before the first surge, so frame one is calm.
- Sim: fixed timestep 120 Hz; frame one is the synchronous draw after
  exactly 3000 pre-roll steps in `init()`. Pointer input is recorded as
  step-stamped events and consumed by the sim in step order. A tap waits
  42 steps (0.35 s): a second tap inside the window converts it to a
  reseed, otherwise it wakes the bay under the point (wall chosen by the
  corner edge, then a point-in-quad two-triangle test). Drag moves push
  wind events (force with distance falloff around the pointer, decaying
  after release). Audio is lazy and typeof-guarded behind the first
  pointerdown: low architectural hum (46 Hz + 92.7 Hz sines through a
  lowpass) plus a band-passed noise band whose gain swells and whose
  stereo pan follows the surge band; silent in QA. Canvas size comes
  from the Visual Viewport API with resize listeners on visualViewport
  and window; `draw()` pins canvas.style.width/height in px. Phone
  detection via window.screen (min dimension < 700 px) with aspect
  fallback; phones run 2,000 particles, desktop 3,000. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no Date.now; frame one
  derives only from the fixed step count.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png); the
  piece renders complete in silence, about 1 s per size.
- Determinism: thumb.png rendered twice and compared with `cmp`:
  byte-identical. The duplicate render was deleted.
- Read-backs: all three sizes show the dark indigo corner facade filling
  the frame edge to edge, grey mullions, floor lines kinking at the
  corner edge and converging toward the horizon, neon paint streams in
  magenta/gold/cyan/violet flowing and bending across both walls with
  visible trails, bright swirling pools at the curved bays, and paint
  deflecting around the black shadow cells. Mobile keeps the whole
  corner and streams inside the tall frame; nothing clipped.
- One design round: the first construction ran both line families
  through the single in-frame vanishing point, which collapsed the
  bands into an hourglass wedge and left the frame's far corners bare
  (no cells, mullion lines hanging in black space). It was rebuilt as
  the two-plane corner described above; the shipped renders are from
  the rebuilt geometry, re-rendered and re-verified for determinism.

## Deviations

- The brief's single in-frame vanishing point (given as an example,
  63% x, 36% y) is realised as the corner/horizon junction of a
  two-plane corner facade. A single point for both line families makes
  every floor/bay intersection collapse to that point (wedges, no quad
  cells), and a one-plane fan through an interior point cannot tile the
  frame; the corner is the construction where an in-frame convergence
  point at the brief's coordinates and a frame-filling facade coexist.
  Each wall still has a true vanishing point on the same horizon.
- Particle count is 3,000 on desktop (2,000 on phones), the brief's own
  figure; the pre-roll and per-step force checks (3 eddies, same-band
  shadow cells) keep the fixed-step budget comfortable.
- A woken bay's speed boost is applied by radius around the cell
  centroid rather than exact per-step polygon containment for all 3,000
  particles; the lit fill itself is exact per cell.
- A double-tap's first tap never wakes a bay (the 42-step pending
  window), so starting a new dream has no side effect on the facade's
  lighting.
