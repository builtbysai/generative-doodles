# №1139 — Halo

kimchi and chips study block KC4: Halo (2018, Somerset House) — 99 robotic
mirrors tracking the sun and throwing its light into water mist to sustain
a single glowing ring. The sun itself never appears; only its effects do.

## Idea

A perfect pale ring hangs in dark, misty space. Along the bottom, 24 small
mirror petals tilt to track an unseen sun on a compressed 3-minute day.
Each petal catches the sunbeam and throws it into the mist to sustain one
arc-segment of the ring, so the ring's brightness is literally the sum of
the petals' contributions. When the sun swings low the geometry closes and
the ring burns; at noon the required mirror tilts fall outside the petals'
travel and the ring dims to a ghost. In the last seconds of the day the
petals lose their aim, the ring breaks into scattered glints, and the cycle
restarts at dawn.

## Implementation

- The sun is a closed-form arc over the 180 s cycle: azimuth sweeps
  linearly from −65° to +65°, elevation is a sine peaking at 62° at noon.
- Each petal has a seeded position along the bottom arc, an assigned ring
  segment, a home normal (the mirror angle that reflects a reference
  mid-morning sun onto its segment), and a preferred sun-elevation window
  (12–38°). Per frame, the required mirror normal comes from the reflection
  law (n ∝ d_in − d_out); a petal's contribution is a Gaussian in the
  angle between required and home normal, times a Gaussian in
  (sun elevation − preferred elevation), times a horizon ramp. That is why
  noon goes quiet: steep sun, steep normals, petals out of range.
- Servo lag is a first-order lag expressed as a phase offset: petals aim
  at the sun as it was 0.3 s ago (during a drag, at the recorded pointer
  history sampled 0.3 s back).
- The ring is 64 arc segments; each segment's alpha is the sum of nearby
  petal contributions (Gaussian falloff in angle) times a slow mist-density
  sine field, plus a small scatter floor proportional to the total burn so
  the mist itself holds a ghost of the ring. Drawn in two passes — a wide
  faint pass and a core pass — with additive compositing. No gradients.
- Mist is 14 seeded flat-alpha ellipse blobs in three layered shells each,
  drifting on slow sine paths behind everything (every ellipse on its own
  path with a `moveTo`, per the node-canvas batched-arc quirk).
- Sunset scatter: over the final ~7% of the cycle each petal's aim target
  is perturbed by a seeded offset and contributions fall, so the ring
  dissolves into per-segment glints before the end-of-day fade.
- Petals are near-black quads (#101820) with a dim outline; only the
  sun-facing edge lights up, with alpha proportional to that petal's
  current contribution. Beams are 1 px lines from petal to ring segment at
  contribution × 0.35 alpha in #B8DCF5.

## Interaction

- **Drag horizontally** to move the sun along its arc: petals re-track
  with the ~300 ms servo lag, the ring re-forms from the new angles. On
  release the day cycle resumes from the dragged position (the phase
  anchor is re-set to the dragged progress).
- **Double-tap** resets to solar noon: the sun snaps to zenith and the
  petals re-calibrate (the ring ghosts — noon is the quiet hour).
- Never click-to-reload. A plain tap does nothing but wake the audio.

## Sound (house Franke rule)

The prompt specs an airy pad pitched by sun elevation plus soft servo
clicks. Per house rules the visuals are complete silent; the audio layer
is created lazily inside the first visitor gesture, is `typeof`-guarded,
and stays very quiet (master gain 0.016): two sine oscillators whose pitch
follows sun elevation, and a short triangle blip when the petals re-track
during a drag or on the noon reset.

## House rules

Visual Viewport sizing with resize listeners on both the viewport and the
window; canvas CSS size pinned in `fit()` and re-pinned every draw; phone
detection via `window.screen` (min dimension < 700) with an aspect
fallback; synchronous first frame at fixed phase T0 = 28.8 s (cycle
progress 0.16 — morning, sun low, ring burning); `requestAnimationFrame`
guarded by a `typeof` check and anchored at phase + elapsed. Interaction
state is recorded events only (phase anchor, drag samples) and every
visual is a closed-form function of piece time plus those events. No
gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas, no
`createElement`, no microphone. No visible text except the `<title>`.
The sun is never drawn.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile),
and 720×720 (thumb). Frame one shows the bright pale ring in dark misty
space — strongest across the top and sides, softer along the bottom arc —
with the 24 petal mirrors along the bottom throwing faint beams up into
it, their sun-facing edges lit. Mobile holds the same composition. One
tuning round: the home-normal model was re-derived to match the real
petal layout (petals sit ~1.37 radii below center, under their targets),
the alignment and segment falloffs were widened, and the mist-scatter
floor was added, after the first pass left the ring's left side too dim
to read as one halo. Thumb rendered twice and byte-compared with `cmp`:
**byte-identical**; the duplicate was deleted.
