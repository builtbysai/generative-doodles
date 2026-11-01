# №1138 — Light Barrier

kimchi and chips study block KC3 (2014–2016): the concave-mirror array and its
volumetric phantoms, as a piece.

## The piece

Forty faceted mirror shards float in black space (#000000), near-invisible
ghosts in #0D141B. Each shard catches one incoming projector beam — drawn as a
very faint ray from off-frame — and the strike shows as a bright white line
across the facet (#FFFFFF, alpha rising with how squarely the facet faces its
projector). Each shard throws exactly one reflected beam (#BFE3FF at 0.3 alpha,
additive), its direction computed from the shard's live normal by the mirror
law. The beams cross in layered flat-alpha haze (#141E28), and where crossings
cluster, phantoms condense: layered #EAF6FF discs with a slowly turning
tetrahedron wireframe at the core. The form lives in the air between the
mirrors, never at the shards themselves. Monochrome blue-white only; no text,
no lens flare, no color.

## Motion and interaction

- Watch-only core: each shard's normal is a closed-form function of time —
  two seeded sines (a few degrees per second) plus a re-tune offset. Every
  30 s the array re-tunes: per-shard offsets step to a new seeded set and
  crossfade in over 1.5 s, so beams swing, crossings dissolve, and phantoms
  re-form in a new configuration.
- Phantoms are computed on demand, never integrated: all 780 beam pairs are
  intersection-tested at time t, the crossings are greedily clustered, and a
  cluster's alpha is a smoothed crossing density — the count at t blended with
  counts at t−0.9, t−1.8 and t−2.7, all evaluated closed-form. Phantoms pulse
  slowly and die as their cluster thins.
- Drag disturbs the haze: drag samples are recorded as events, and each beam
  bends toward the drag direction with a weight that falls off with distance
  to the beam and decays over ~4 s. Phantoms stretch and tear while the field
  is bent, then calibration pulls everything back.
- Double-tap re-tunes now: a manual segment boundary is recorded, shards snap
  to new tilts over 1.5 s, and the beams re-converge.
- Sound follows the house Franke rule — the visuals are complete silent.
  WebAudio starts only lazily inside the first visitor gesture, typeof-guarded:
  a very quiet low drone (55 Hz + 82.4 Hz + a soft 110 Hz triangle through a
  lowpass, master gain 0.045), a soft major-interval chime when a new phantom
  condenses, and a faint filtered-noise sweep at each re-tune.
- Frame one is drawn synchronously at a fixed phase (t = 137 s, mid-segment):
  the beam web fully formed, strike lines lit, and a field of phantoms already
  condensed at the crossing clusters across the middle of the frame.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); geometry in an
  isotropic unit space (x in [0, W/H], y in [0, 1], scaled by height) so the
  mirror geometry is true at any aspect.
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect fallback (h > w * 1.15).
- Determinism: seeded mulberry32 only, no Math.random; per-(shard, segment)
  re-tune offsets from a hash-seeded RNG so any segment is reproducible;
  all interaction state is recorded events with closed-form responses;
  requestAnimationFrame guarded by a typeof check and anchored to the fixed
  phase; the QA thumb re-rendered byte-identical.
- No gradients, no ctx.filter, no shadowBlur, no createElement, no offscreen
  canvas, no microphone; every haze ellipse is drawn as its own path with a
  moveTo before it per the node-canvas quirk.
