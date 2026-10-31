# No.679 — Sotar Condi

EXPANSION #82 clemente-mckay, prompt block 7. A memorial for Sotar Condi, the
Atacama hummingbird deity burned by Jesuits in 1635, "silenciada por el
estruendo de las campanas" (silenced by the roar of the bells). Restraint is
the whole piece: no text, no UI, no drama, no bright color.

## Concept

A near-black field. In the lower half, nine dull fragments of a sacrificed
ceramic bell lie heavy and still. In the upper third a small hummingbird
hovers, barely lit, its wings only a blur. At the lower right a single ember
point flickers like an altar candle. The fragments are silent unless touched,
and touching one produces only a dead thud, never a ring. The bird is the
only living thing, and once per hover loop it utters one thin rising cry —
the sound the bells could not silence.

## Construction

- **Shards.** Nine broken arc segments of an implied bell-rim circle. Each
  shard is a closed path between an outer and an inner arc; both arcs carry
  seeded radial jitter (mulberry32, seed 679001) so the broken rims are
  rough, never clean geometry. A shard-edge stroke traces the outer broken
  rim, plus one faint fracture hairline across each face. Positions, radii,
  arc spans and rotations are fixed layout data; the shards never move.
- **Bird.** A parametric hummingbird: body ellipse, head, long bill stroke,
  small tail fan, one dim eye point. It hovers on a slow Lissajous drift
  (period ~30 s across, ~18 s vertically) with a small fast bob. The wings
  are drawn six times per frame as arcs at staggered phases of a fast
  oscillation, each at low alpha in the wing tone, so they read as a blur
  and never as distinct flapping shapes. A subtle tilt follows the drift.
- **Ember.** One point at the lower right, drawn as layered low-alpha discs
  (no shadowBlur) plus a slightly elongated core. Its brightness follows a
  seeded flicker: a 256-entry mulberry32 table sampled periodically,
  blended with a slow swell, so the flicker is gentle and deterministic.
- **Thud model.** Tapping a shard (hit test against generous circles
  around each shard center) plays a dead ceramic thud and the shard does
  not move. The thud is a ~200 ms low-passed (420 Hz) noise burst with a
  fast exponential decay, plus a faint low sine knock (118 Hz falling to
  64 Hz) for body. No resonance, no ring: a killed bell. Taps elsewhere do
  nothing. Tap events are recorded with anchored-clock times.
- **Cry model and gating.** The hover loop is 26 s. At loop phase 0.52
  (13.5 s into each loop) the bird reaches its cry moment: a 1.5 s thin
  rising sine, 1980 Hz sweeping to ~2560 Hz, with 6.4 Hz vibrato, slow
  attack, peak gain 0.055 — quiet, never startling. **Gating:** the
  AudioContext is created lazily on the first pointer interaction and is
  fully typeof-guarded. The cry sounds only if audio has been unlocked by
  a prior visitor gesture (in practice, a shard tap). If audio was never
  unlocked, the cry moment passes in silence, but the bird's throat shows
  a barely visible pulse (a small swelling ellipse at the throat, alpha
  peaking around 0.36) so the moment is present visually either way. The
  cry fires at most once per loop index.
- **Clock and determinism.** Frame one is the synchronous draw at loop
  t = 0 before any clock read. All motion (hover, bob, wing phase,
  flicker, throat pulse) is a pure phase function of the anchored elapsed
  clock. No Date.now, no Math.random in the render path (Math.random is
  used only inside the thud's noise buffer, an audio waveform that is
  never drawn). Canvas size comes from the Visual Viewport API with
  resize listeners on both visualViewport and window; the canvas CSS size
  is pinned in px inside draw() every frame. Phone detection uses
  window.screen min dimension < 700 px with the tall-aspect test as
  fallback; on phones the bird scales up slightly. rAF is typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and compared with cmp: byte-identical,
  re-verified after the placement fix below.
- Visual read-back confirmed: near-black field; nine dull clay shards
  scattered across the lower half; the small muted-green hummingbird in
  the upper third with its wings reading as faint blurred arcs; one ember
  point glowing at the lower right beside a shard. Nothing clipped on
  desktop, thumb or mobile.
- Fix during QA: in the first render pass, three shards whose centers sat
  at y 0.92–0.95 ran past the bottom edge on the landscape desktop frame
  (radius is scaled by the smaller dimension, so their reach exceeded
  their center offset). Their centers were raised (0.885 / 0.895 / 0.915,
  one radius trimmed) and all renders were redone and re-verified.

## Deviations

- The prompt's palette is followed exactly; the bird's eye and throat
  pulse reuse the wing-blur tone (#9AA8A4) rather than adding a color.
- Audio gating (cry only after a visitor gesture) is implemented exactly
  as specced in the build brief, for browser autoplay policy: an
  AudioContext cannot start before a gesture, so an ungated cry would
  silently fail on first load anyway; the throat pulse keeps the moment
  visible in that case.
