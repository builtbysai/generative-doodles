# №1136 — Line Segments Space

kimchi and chips study block KC1: their 2013 origin piece — a web of thread
and tuned projection in which a geometric phantom is drawn in mid-air by
hundreds of individually calibrated beams, brightening wherever the beams
cross and "team together."

## Idea

A slow-turning wireframe phantom hangs in pure black, drawn in additive
pale electric-blue beams (#7FD4FF). At the true vertices and wherever two
beams cross in projection, the additive overlap blooms toward near-white
(#F0F7FF) — the form lives at the meetings. Five faint haze wisps (#1A2B3D)
drift behind the beams so the light has depth to sit in. Over a seamless
60-second loop the phantom morphs through five forms — tetrahedron,
octahedron, icosahedron, dodecahedron, and a twisted (2,3) torus knot —
eight seconds of dwell on each, four seconds of travel to the next, the
whole instrument rotating slowly all the while. The dark around it is part
of the piece: no frame, no labels, nothing but light.

## Implementation

- Every form is exactly 60 points lying on its own wireframe. Polyhedron
  edges are found by minimum pairwise vertex distance; each edge is sampled
  with s+1 points including both endpoints, with s = 60/E − 1 (tetrahedron
  6 edges × 10, octahedron 12 × 5, icosahedron and dodecahedron 30 × 2).
  The knot is 60 points along its curve. Endpoint samples coincide at the
  true vertices, so their blooms add up exactly where the form's corners
  are.
- The morph is a true per-point lerp: at any moment the outgoing and
  incoming forms' drifted point sets are blended index-by-index, rotated
  (two slow axes, ~0.05 rad/s class) and projected once with weak
  perspective; both forms' edge sets are then drawn over the shared blended
  points, alpha-weighted by the morph position. Between dwells you see one
  clean wireframe; during travel the two edge sets knit through each other.
- Each point also carries a small seeded sinusoidal drift (±0.022), so the
  vertices breathe like the choreographed thread matrix rather than sitting
  rigid. Per-segment seeded brightness (0.8–1.15) keeps the beams from
  reading as uniform CG.
- Crossing blooms are computed per frame: all drawn segments are tested
  pairwise for proper 2D intersections, the strongest 80 crossings get a
  small near-white cross whose alpha follows the weaker beam. Beams draw
  with `globalCompositeOperation = 'lighter'` at 0.25–0.5 alpha, 1.5 px —
  precise light, never neon.
- Haze is five seeded blobs, each drawn as three layered flat-alpha
  ellipses (no gradients anywhere), drifting on slow Lissajous paths
  behind the beams under normal compositing.
- Sound follows the house Franke rule: the visuals are complete silent.
  A WebAudio drone — two detuned sines through a lowpass, pitched on a
  ladder keyed to each form's vertex count, master gain 0.045 — is created
  lazily inside the first visitor gesture only, typeof-guarded, and
  re-pitches with a slow ramp as the morph changes form.

## Interaction

- **Drag** bends the light: drag samples are recorded as events (position,
  delta, piece time), and each beam endpoint is offset by the summed
  influence of recent samples — a Gaussian falloff in space, an exponential
  decay over ~3.5 s — so beams near the drag path bow toward it and relax
  back to their calibrated paths. The system is disturbed, never destroyed.
- **Double-tap** re-tunes: every beam drops to near-invisible and sweeps
  back on one by one over ~2 s, each on its own seeded delay, like the
  projection finding the strings again.
- Never click-to-reload; the choreography otherwise runs undisturbed.

## House rules

Visual Viewport sizing with resize listeners on both the viewport and the
window; canvas CSS size pinned in `fit()`; phone detection via
`window.screen` (min dimension < 700) with an aspect fallback; synchronous
first frame at fixed phase T0 = 28 s (mid-dwell of the icosahedron);
`requestAnimationFrame` guarded by a `typeof` check and anchored at
phase + elapsed. All interaction state is recorded events evaluated in
closed form — no frame-integrated state. No gradients, no `ctx.filter`,
no shadowBlur, no offscreen canvas, no `createElement`, no microphone.
No text anywhere except the `<title>`.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile),
and 720×720 (thumb). Frame one shows the icosahedron mid-dwell: crisp blue
wireframe floating in black, vertex blooms and small crossing crosses
brightening the meetings, faint haze behind, generous black margin all
around. Mobile holds the same composition in portrait. Thumb rendered
twice and byte-compared with `cmp`: **byte-identical**; the duplicate was
deleted.
