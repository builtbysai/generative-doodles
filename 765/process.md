# No.765 "Mirage" (EXPANSION #93 larry-bell, block 6)

## Concept

Bell's early-80s heat-and-light illusion rebuilt as stacked film transparencies,
not temperature. A landscape field: pale glare-white sky warmed toward warm
gray, a horizon line at the upper third, a dark warm-gray ground below. Just
under the horizon sits the whole subject: a mirage band of seven translucent
film strips (glare white, amber, mirage blue) whose color is strongest at the
mirage line itself and dissolves as the strips step away from it. Watch-only:
heat is a phenomenon, not a toy, so there is no touch control and no
click-to-reload anywhere in the piece. No text except the title, no objects,
no desert imagery.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no
  gradients, no shadowBlur, no offscreen canvas, no `ctx.filter`. All softness
  comes from layered flat alpha fills.
- Strict four-color palette: amber #E8A33D, glare white #F5F2EA, mirage blue
  #6FA8C8, shadow warm gray #8A8078. Sky and ground are the same colors at low
  alpha, layered in many thin steps (14 sky steps, 16 ground steps) so the
  warming and deepening read as haze rather than visible strata.
- Mirage strips: each strip is a 72-segment polygon whose top and bottom edges
  follow the same displacement field (bottom edge sampled at a slight x
  offset). Strips are drawn farthest-first, then the two strongest strips get
  a second low-alpha pass under `lighter` compositing so overlaps brighten
  additively, as stacked transparencies do.
- Loop-seamless displacement math: for strip s, displacement at normalized
  x and loop time t is
  `amp * (w1 * sin(2π*k1*x - f1*φ + p1) + w2 * sin(2π*k2*x + f2*φ + p2))`
  where φ = 2π * t / 18 s, the spatial frequencies k1=2, k2=3 are integers,
  and the temporal frequencies f1=1, f2=2 are whole cycles per loop. Because
  every temporal term completes an integer number of cycles in exactly 18 s,
  displacement at t=18 s equals displacement at t=0 exactly: the loop closes
  with no seam. Amplitude is a fraction of canvas height scaled by a falloff
  factor that shrinks with the strip's distance from the mirage line, so the
  air moves most at the line and settles above and below it. A faint alpha
  "breath" (2 integer cycles per loop) keeps the band alive without breaking
  the seam.
- Grain: 1600 precomputed specks from a mulberry32 stream (seed 987123) in
  normalized coordinates, palette tones at 3-12% alpha, drawn every frame to
  kill banding in the flat fields.
- Sizing: canvas from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  inside `draw()` every frame. Phone detection via `window.screen` minimum
  dimension (< 700 px) with the `h > w*1.15` aspect check as fallback only;
  the composition is proportional and full-bleed at every size, so the
  horizon holds the upper third on phones unchanged. Page ground is the warm
  gray #8A8078.
- Determinism: frame one is a synchronous `draw(0)` at load; no clock is read
  for it. The rAF loop derives t from its own first timestamp, and rAF is
  typeof-guarded so the headless QA renderer (no rAF) simply keeps frame one.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared:
  identical (re-verified after the fix round below; duplicate deleted).
- First read-back: correct composition, but the sky and ground washes showed
  hard horizontal step lines (strata) from too few, too strong layers.
- Fix round: sky rebuilt as 14 thin steps ramping 0.02 to ~0.065 alpha,
  ground as 16 thin steps over the base wash, same colors. Re-rendered all
  three sizes and re-ran the byte-compare.
- Final read-back: desktop shows a smooth pale sky, the horizon at the
  upper third, a bright seam at the line, then the wavy glare/amber/blue
  strips dissolving downward into a smooth warm-gray ground that deepens
  toward the bottom; faint grain throughout. Mobile (390x844) keeps the
  horizon at the upper third proportionally, the full band visible, nothing
  clipped. No text anywhere except the document title.
- Deviations: none. Watch-only per the prompt; no interaction was specced
  and none was added.
