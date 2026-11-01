# №1395 "Infinite Recurrence" — zack-khalil ZK4 (PP618)

A sphere of swirling matter dissolves into a hand releasing grains into dark
water, which resolves back into the sphere — a seamless morph-loop across
geological, biological, and cosmic scales, all sharing one noise field.

## Palette (flat fills only)

- Sphere gold `#e0962a`, grain amber `#d4a24e`, water deep `#0e1a20`,
  void `#0a0a09`, ember red `#a8321e`, water line `#274b57`.
- No gradients anywhere (the QA renderer handles them unreliably); glow and
  water read through flat fills and flat-alpha strokes.

## Structure

- 60-second cycle, dead center, background stays near-black and quiet:
  sphere [0, 20), hand [20, 40), water [40, 60), with 4-second smoothstep
  cross-dissolves at 16–20, 36–40, and 56–60. The cycle closes exactly:
  t = 0 and t = 60 render byte-identical (0 px difference in probe).
- Sphere: gold disc with 36 seeded spiral swirl strokes (amber, ember, pale
  gold) perturbed by the shared value-noise field, plus 700 seeded swirl dots
  rotated by a closed-form swirl of radius.
- Hand: a simple procedural silhouette, never realistic — palm polygon, four
  tapered finger quads fanned slightly, thumb quad, wrist taper — in grain
  amber. 48 seeded grains fall from the four fingertips on closed-form
  periodic paths (period 5–8 s each, sway by sine); grains are visible only
  while the hand state holds.
- Water: dark water ellipse with four noise-perturbed wave lines and ripple
  rings. Each grain's landing time is periodic (fall duration 55% of its
  period), so each ripple ring's age — and therefore radius and fade — is a
  closed-form function of piece time, never frame-integrated.
- Film grain: 240 seeded dots keyed by (dot, quantized 0.5 s index); frame
  jitter is a seeded function of quantized 0.25 s time (±1.5 px). Both wrap
  modulo the 60-second cycle so the loop closes exactly.

## One shared noise field

All three states sample the same seeded value-noise / fbm field (hash-based,
no external library): the sphere's swirl perturbation, the water's wave-line
perturbation, and the dot alphas. The field is sliced differently per state —
different octaves and scales — so rocks, magma, and neurons read as one
process, per the prompt.

## Interaction

Drag scrubs the morph timeline forward (drag right) or backward (drag left):
recorded drag samples contribute a signed offset (0.06 s per px, tau-4 s
exponential decay, clamped ±25 s) to the effective piece time. No buttons,
never click-to-reload. No visible text except `<title>` (study-wide
pseudo-script rule; this piece needs no text at all).

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w × 1.15 as fallback; centered composition keeps its shape,
  page ground takes the piece's own background color.
- Determinism: frame one = draw(0) via boot flag; the rAF clock starts only
  with the rAF loop, which is a plain function declaration behind a typeof
  guard. All randomness from mulberry32 (seed 1395000 + index × 7919), never
  Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, getUserMedia, or fillText/strokeText. Fully
  silent. Dots are filled rects; every arc/ellipse uses its own beginPath
  (node-canvas quirk).

## Adaptations from the prompt

- Morph via cross-dissolving three procedurally drawn states sharing one
  seeded noise field (slice the field differently per state), as briefed.
- Falling grains as closed-form seeded particle paths with ripple response
  computed closed-form, never frame-integrated.
- Grain and film-frame jitter as seeded functions of quantized time, wrapped
  to the 60-second cycle so the loop closes exactly.
- The prompt's "3D noise volume" is a 2D value-noise fbm field sampled at
  different octaves/scales (canvas 2D only; no WebGL in the gallery).
- Sphere motion is periodic in the cycle (one full swirl rotation per cycle,
  noise inputs via sin/cos of cycle phase) so the morph loop is truly
  seamless, not just weight-closed.

## Verification (forced-time probe harness, stubbed rAF + pointer events)

- t = 0: sphere dominant (128,277 gold/amber px), 0 water px.
- t = 30: hand state (26,249 amber px: hand silhouette + falling grains),
  0 water px; hand render inspected: palm, four fanned fingers, thumb,
  wrist, grains at fingertips.
- t = 50: water state (68,846 water px), 0 gold/amber px; water render
  inspected: dark ellipse, ripple rings, wave lines.
- t = 0 vs t = 60: 0 px difference (loop closes exactly).
- Drag scrub: +200 px drag at t = 31 moves the frame from hand (26,213 px,
  0 water) to water (71,018 water px); −200 px drag at t = 50 collapses the
  water band from 68,846 px to 2,114 px (timeline scrubbed back toward the
  hand phase, half-alpha states falling outside the full-strength buckets).
- Thumb renders byte-identical across repeated renders; desktop, mobile,
  and thumb renders inspected.

No fix rounds needed beyond the cycle-closure change (sphere swirl made
periodic in the 60-second cycle) and the probe-script correction (an early
probe saved the dragged frame instead of the clean hand frame; the piece
itself was unaffected).
