# Doodle №9011: Congregation (2026-09-12)

**File:** `9011/index.html` (self-contained, vanilla canvas + WebAudio, no dependencies)

## Concept
A living voronoi web of typed agents, after the SYSTEM of Raven Kwok's Skyline #1
(typed seeds inside one voronoi primitive), not its look. 340 seeds in two agent
types share one driver field of four drifting dark masses:

- **Drifters** (76%) do gradient ascent toward the dark with audio-scaled jitter,
  tethered loosely to a home blob so the field keeps four lobes instead of one.
- **Orbiters** (24%) circle their dark mass; orbit radius breathes with the bass
  band, angular speed with the mid band. Their cells are the only phosphor-green
  in the piece.

A synthesized slow-techno sequencer (104 BPM, four-on-the-floor with swing,
seeded per-2-bar variation, 8-bar bass progression in Am F C G, sparse pentatonic
lead through a dub delay) is the single driver. Crucially the kick is an EVENT
in agent behavior, never a pulse: on every kick seeds stream toward the beat
origin at bounded speed and the web flashes white near it; on every 4th bar a
staged big kick moves the origin to the darkest mass with a stronger pull and a
longer flash; then everything disperses. Every 16 bars the field morphs to a new
seeded layout over two bars, so the piece has Kwok's multi-stage structure and no
two minutes look alike.

## Interaction (decided, one clear model)
- **Click / tap** the web: congregation on demand at the click point. The first
  click also starts the synthesized sound (autoplay policy needs the gesture).
- **Drag**: stirs the field, a swirl impulse around the pointer.
- Corner buttons: **sound off/on** toggle, **new field** reseeds a fresh
  variation (seed in the URL, shareable). Click never reseeds; the button never
  congregates.

## Technique notes
- **Voronoi via half-plane clipping**, not Bowyer-Watson. Timed both headless on
  identical 360-seed fields: BW 77-186ms (allocation-heavy, and it carries the
  study's supertriangle wedge risk), half-plane 29-41ms, then optimized to
  **5.3ms/frame** (flat Float64Array polygon buffers, carried previous-vertex so
  each vertex's inside-test runs once, no per-edge closures, no per-seed
  allocation). Full frame averages **17.5ms** in headless Chrome (~57fps);
  phones land around 30-40fps, fine for this slow-breathing aesthetic.
  Correctness spot-checked against BW: 358/360 cells within 5% area; the two
  outliers are border cells where the definitions legitimately differ.
- **Deterministic**: mulberry32(seed) + fixed 1/60 timestep. `?seed=` picks the
  field, `?t=` freezes an exact frame (used for all captures below),
  `?bare=1` drops the chrome for thumbnail capture, `?perf=1` reports frame
  timing in the title. `prefers-reduced-motion` renders one still frame.
- Audio and visuals share one pure music model: the band envelopes (kick, big,
  bass, hat) are analytic functions of song time, so the visuals stay in sync
  with the audible kicks whether or not sound is on.

## Seeds / variants tried
- **90110** (default, shipped): balanced four-lobe field; verified at t=0.15
  (big-kick flash), 2, 8, 9.0/9.35/10.5 (full gather-flash-disperse cycle),
  40 (mid stage-morph), 55, 75 (settled post-morph). Chosen because the kick
  reads as a clear event and the groove frames stay web-like, never blobby.
- **424242**, **777** at t=8: both cohesive and distinct from 90110 and from
  each other, which confirmed the system is robust, not seed-lucky.

## Tuning iterations (each verified by looking at renders)
1. First build: everything collapsed into one blob. Cause: kick pull was a stiff
   spring (a = dx*200) plus gradient ascent to a global max. Fix: congregation
   became bounded-speed streaming toward per-seed offset targets, and drifters
   got home blobs with personal anchors.
2. Green orbiters dominated the frame (their sparse cells made long green
   strokes). Fix: orbiters 32% to 24%, tighter orbit radii, green stroke dimmed
   to 0.20+0.45*flash. Green is an accent again.
3. Blob amplitudes 0.55-1.0 let one mass win the gradient; now 0.8-1.0 with
   quadrant-separated bases so four lobes persist between kicks.
4. Bug found by synthetic-event test: `setPointerCapture` with a non-active
   pointer id throws and killed the whole pointerdown handler. Now in
   try/catch. Click-congregation and drag-stir verified via dispatched
   pointer events (1 kick at the click point; drag adds none).
5. Audio scheduler verified headless: 60 steps scheduled, zero JS errors; the
   only console entries are Chrome's autoplay warnings, which don't occur on a
   real user gesture (context is created inside the click handler).

## Verification
- Desktop + 390px mobile viewports: no scroll, no overflow; composition holds.
- Zero console errors on load, during animation, freeze, and perf modes.
- Frame captures (all at `?seed=90110`): kick flash, groove, gather, disperse,
  stage morph, and two alternate seeds, all inspected visually.
- Distinct from №9015 Oscillons (Lissajous traces) and №9016 Interference
  (rotating moire): this is a living voronoi web with typed agents and
  behavioral audio reactivity.

## Local captures
- `~/workspace/generative-doodles/9011/thumb.png` (720x720, from
  `?seed=90110&t=55&bare=1`)
- Scratch frames: `/tmp/cong/c9011c_t035.png` (kick), `c9011d_pre.png`,
  `c9011d_kick.png`, `c9011d_dis.png` (gather/flash/disperse sequence),
  `c9011e_t8.png`, `c9011e_t55.png`, `c9011e_t75.png` (groove + post-morph),
  `c9011f_s424242.png`, `c9011f_s777.png` (alternate seeds),
  `c9011g_mob.png` (390px mobile)
