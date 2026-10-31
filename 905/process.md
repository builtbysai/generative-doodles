# No.905 — "flow fields" (study #111 simondavidryden, PP66 "The Curl Vortex")

## Concept

A full-bleed river of light on dark blue-black: roughly 2,400 fine streaks advected
through a curl-noise field, all of them bending into one fixed vortex set off-center
at a third of the frame. There is no border, no frame, no text — the streaks run
edge to edge and the eye is meant to fall into the current. Brightness is geography:
streaks near the vortex core and moving fast burn near-white, the body of the field
is mid blue-gray, and the far edges fade toward the ground tone. The piece is
watch-only at heart. A drag plants a temporary second vortex under the finger that
the field obeys for a few seconds; a tap surges the whole current to triple speed
for four seconds; a double-tap drains the field to a 10% ghost and lets it rebuild.
Sound, when a first gesture wakes it, is a slow filtered-noise wash whose lowpass
cutoff follows the same mean streak speed the simulation computes, with a resonant
band swell under an active drag vortex.

## Construction

- **Field.** The curl field is analytic, not gridded: a stream function built from
  five summed sine/cosine components whose amplitudes, frequencies, phases, and
  slow time-drift rates are drawn once from a seeded mulberry32 stream (seed 90566).
  Velocity is the perpendicular gradient of the stream function, evaluated on the
  fly at each particle position, so the flow is divergence-free by construction.
- **Vortex.** A fixed attractor at (W/3, H/3) adds a tangential swirl with an
  exponential falloff (radius 0.50 * min(W,H)) plus a gentle inward pull at 22% of
  the tangential strength, so streaks spiral in rather than orbit forever. The
  drag vortex uses the same code path at 90% strength.
- **Simulation.** Fixed timestep (1/60 s) with an accumulator in the rAF loop.
  Each particle records its last 8 positions as its trail; trails are simulation
  state, redrawn as polylines every frame and bucketed into four palette colors so
  each color is a single stroke. Particles respawn at seeded positions when they
  age out (5–11 s) or leave the frame, keeping density constant. Phones (screen
  min dimension under 700 px, aspect fallback) run 1,400 particles instead of 2,400.
- **Pre-roll: 110 fixed steps** (about 1.83 s of sim time) run synchronously at
  init, so frame one already shows formed streaks flowing into the vortex instead
  of a blank field of dots.
- **Events.** Surge, drain, and the drag vortex are pure functions of recorded
  event times and the simulation clock: surge is a speed multiplier envelope
  (3x for 3 s, linear settle in the fourth), drain is an alpha envelope (down to
  0.1 in 0.4 s, rebuild over the next 4 s), and the drag vortex decays as
  exp(-t/2.7) after release, reaching about 5% at 8 s. A second tap within
  0.35 s of the first converts the tap into the double-tap drain.
- **Sizing.** Canvas size comes from the Visual Viewport API with resize
  listeners on both the viewport and the window; draw() pins the canvas CSS
  width/height in px every frame. Full-bleed at every size.
- **Audio.** Lazily created on the first pointerdown only, fully typeof-guarded;
  a looped pinkish-noise buffer feeds a lowpass (cutoff driven by mean streak
  speed, brightened during a surge) and a bandpass whose gain follows the drag
  vortex strength. No AudioContext means the piece runs silently, which the QA
  harness exercises.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png). All three render cleanly in silence
  (no AudioContext, no requestAnimationFrame in the harness; frame one is the
  synchronous post-pre-roll draw).
- Determinism: thumb.png rendered twice and byte-compared with `cmp` —
  identical. Frame one never reads Date.now() or any wall clock; all randomness
  comes from the seeded mulberry32 stream.
- Read-back: desktop shows dense laminar streaks sweeping diagonally and curling
  into a bright, tight vortex eye at the upper-left third, edges dimming to the
  fade tone, no border anywhere. Mobile (1,400-particle phone path) shows the
  same field in the tall frame with a crisp spiral eye and nothing clipped.
  The square thumb reads as a bright curling vortex region off-center with the
  current wrapping around it. Streaks read as continuous short flow lines
  everywhere; no dotted texture.
- One tuning pass during QA: widened the vortex falloff (0.42 -> 0.50 of S) and
  strengthened the speed term in the brightness bucketing so the core reads
  brighter in the square format; renders redone and the byte-compare rerun green.

## Deviations

- **Offscreen trail buffer replaced by recorded-position polylines.** The source
  prompt renders streak persistence by drawing into an offscreen buffer with a
  decay pass. The house renderer forbids offscreen canvases, and canvas feedback
  would break the determinism gate, so each particle instead carries its last 8
  simulated positions as explicit state and the trail is redrawn from that state
  every frame. The visual result is the same short laminar streak; the drain
  effect, which the prompt implements by starving the buffer, is reproduced as
  an equivalent alpha envelope over the redrawn trails.
- **Curl field computed analytically instead of on a 90x90 grid.** The prompt
  describes a precomputed curl grid; evaluating the summed-sine stream function
  directly at each particle is the same field without grid interpolation error,
  and it keeps the whole simulation a closed function of the seeded stream.
