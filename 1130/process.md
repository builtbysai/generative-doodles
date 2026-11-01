# №1130 — Petalclouds (Jussi Ängeslevä, JA3)

Ängeslevä's creative-lead reading of the Changi Terminal 4 piece (2018): six
cloud-clusters of large aluminum leaves drift in a vast dim sky-interior. The
title deliberately duplicates №1124 (Sauter's reading of the same work) and
ships verbatim. This reading differs from №1124 by its bluer sky dusk
(#0A0E15 vs #0B0F16), cooler leaf shadows (#454B54), and one mechanism №1124
does not have: the whole composition slowly traverses the frame, airside to
landside, and never sits still.

## Mechanism

- **World wider than the frame.** The world is 2.2 stage-widths wide; the
  camera is fixed and the cloud centers themselves migrate through it at
  WW/300 per second (a full migration takes ~5 minutes), wrapping around.
  Screen position = wrapped (worldX + traverse·t − view − pan·parallax).
- **Leaves.** Each cloud holds 12–18 bezier leaves (near 18, mid 15, far 12).
  A leaf is drawn hard-edged in two tones: a #454B54 shadow body, a #C9CED6
  lit upper face, and a faint warm #FFE3B3 glint stroked along the top edge.
  No cables are drawn — the winches are invisible.
- **Morph.** All leaves re-form around their cloud center on a shared 60 s
  cycle: per-leaf seeded sine morphs drive angle (swirl) and radius
  (breathing), and a cloud-level stretch term opens, closes and elongates the
  cluster. Leaf orientation is taken from the leaf's own morph velocity
  (position sampled at t and t+0.35), plus a small spin wobble. A slow 47 s
  bob lifts each cloud gently. Everything is a closed-form function of t —
  nothing is integrated frame to frame.
- **Depths.** Three layers: 2 near (scale 1.0, parallax 1.0, alpha 1.0),
  3 mid (0.62 / 0.55 / 0.92), 1 far (0.36 / 0.25 / 0.80). Drawn far to near.
- **Floor pools.** Under the horizon (lower quarter), each cloud casts one
  faint warm pool of layered flat-alpha ellipses (#241D14, #4A3620, a whisper
  of #FFE3B3). Pools are computed from a counter-drifting world position
  (−1.4× the traverse rate, parallax 0.45), so they slide against the clouds'
  motion. No gradients anywhere; softness comes from layered alpha only.
- **Top light.** Three wide, very-low-alpha #FFE3B3 ellipses wash the top of
  the frame.

## Interaction

- **Drag horizontally** on empty sky: pans the view; each layer shifts by its
  own parallax factor (far 0.25 / mid 0.55 / near 1.0). On release the pan
  decays back to center as a closed-form exponential of the recorded release
  event (τ ≈ 2.4 s).
- **Drag a leaf**: on release, the drag vector is recorded as a nudge event;
  that leaf answers with a closed-form underdamped spring (exp decay ×
  cos/sin), and its cloud-mates shift at 0.35 weight with a small per-leaf
  delay — the cloud re-balances around the disturbance.
- **Double-tap**: reseeds all six formations (new generation of the seeded
  layout). Never click-to-reload.
- Silent by design; no audio at all.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via window.screen (min dimension < 700) with aspect fallback
  (h > w·1.15); leaves scale up ×1.25 on phones so the field still reads.
- Determinism: frame one is drawn synchronously at fixed phase T0 = 26 s,
  before any rAF; the loop, when requestAnimationFrame exists, is anchored
  as T0 + elapsed-since-load and guarded by a typeof check. Seeded
  mulberry32 throughout; no Math.random, no Date.now in the drawing path.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no
  createElement, no microphone/audio APIs. No visible text except <title>.

## QA

- Rendered with the house renderer: qa-desktop.png (1280×800),
  qa-mobile.png (390×844), thumb.png (720×720).
- Frame one (t = 26 s): blue-dusk void, six distinct leaf clusters overhead
  at three clearly separated depths — two large near clouds at the left and
  right top with leaves crossing the frame edges, three mid clusters, one
  small dim far cluster top-center — a vast empty middle, and faint warm
  pools resting on the floor band. Mobile holds the same read.
- A scratch copy at t = 140 s was rendered to confirm the traverse: clusters
  have migrated and re-formed, pools counter-drifted, no errors (scratch
  deleted).
- Two QA tuning rounds: (1) leaf size and cloud radius cut (~30%) so the six
  clusters separate and negative space dominates; (2) floor pools shrunk,
  dimmed and given per-cloud vertical offsets so they read as discrete warm
  pools instead of a single band.
- Thumb byte-compare: thumb rendered twice at 720×720, `cmp` byte-identical;
  duplicate deleted.
