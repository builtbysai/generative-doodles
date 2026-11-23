# No.904 "noise on top of noise"

Study #111 simondavidryden, PP65 "The Displaced Wireframe", after Rydén's
"noise on top of noise on top of noise displaced by noise" (2023-09-05).

## Concept

A pale pink wireframe mesh floats small in a black void. No shading, no fill:
the hairline lines are the whole image. The form is a parametric torus whose
surface is pushed in and out along its normals by 3D fbm noise, so the stacked
contour rings warp like a softly dented vase. It tumbles slowly, endlessly.
The visitor can lean the tumble with a drag, reseed the noise with a tap, or,
with a double-tap, drain the noise away for six seconds to read the perfect
torus underneath, before the noise floods back in. A low two-sine drone hums
once sound is enabled; the detune beating between the sines is the current
displacement amount, and the clean read silences the beating to one pure tone.

## Construction

- Torus grid 110 around x 36 tube (3,960 vertices). Rendered as the grid's
  ring rows only: each row is a closed polyline of hairline segments. Segments
  are grouped into 14 depth buckets; each bucket is stroked in one pass with a
  color interpolated shadow pink (#C9A9B8, far) through mesh pink (#F2D7E3) to
  white (#FFFFFF, near) and alpha rising with nearness. No fill anywhere.
- Noise: seeded 3D value noise (integer lattice hash, trilinear interpolation
  with smoothstep easing), fbm of 3 octaves. Displacement is sampled at the
  vertex's base position scaled by 1.55, plus a slow drift along the third
  noise axis (0.045 units/s) so the warp breathes over time. Displacement runs
  along the analytic torus normal, amplitude 0.35 x tube radius, centered on
  zero.
- Scale: the object's full displaced diameter is fit to 37% of the smaller
  viewport dimension, so it always sits in the middle third with black
  emptiness around it, on desktop and phone alike.
- Motion model (determinism): everything is a closed-form function of
  (t, recorded events). Base tumble: main axis one revolution per 40 s,
  secondary tilt one per 97 s, from a fixed initial pose (ax 0.92, ay 0.35).
  Drag deltas are recorded as timestamped events; the lean at time t is the
  sum over events of delta x (1 - exp(-dt/0.25)) x exp(-dt/18) x 0.005, so a
  lean arrives fast, lingers, and settles back like a spun top. Reseeds append
  a new field seed; displacement lerps between the previous and current field
  over 2 s (smoothstep), so the mesh morphs and never pops. Double-tap
  appends a freeze event; its envelope drains displacement to zero over
  0.8 s, holds the clean torus until 5.2 s, and floods back by 6 s. Frame one
  is the synchronous draw at t = 0 with empty event lists. performance.now is
  used only as the loop clock after load, never as image input.
- Viewport: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height are pinned in
  px every draw. Phone detection uses window.screen (min dimension < 700 px)
  with the h > w x 1.15 aspect as fallback only.
- Audio: created lazily inside the first pointerdown, fully typeof-guarded.
  Two sine oscillators at 54 Hz; the second's detune factor is proportional
  to the live displacement envelope (freeze envelope), the base pitch bends
  slightly with accumulated lean. No microphone input.
- Palette (strict): ground #050505, mesh #F2D7E3, highlight #FFFFFF, mesh
  shadow #C9A9B8. No other colors. No visible text except the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness,
  no AudioContext, no rAF): the piece draws its full frame one in silence.
- qa-desktop.png (1280x900): warped pale-pink hairline torus centered, small
  on the black void, contour rings visibly noise-displaced, brighter toward
  the near side, fainter shadow pink at the back. No fill, no text.
- thumb.png (720x720): same composition at gallery size; reads as a soft
  warped ring stack.
- qa-mobile.png (390x844, phone path via screen min dimension): object stays
  in the middle third of the 390 px width, centered vertically, nothing
  clipped.
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. The duplicate render was deleted.
- Deviations: (1) The brief suggests both grid directions read as a mesh;
  this build strokes the ring rows only, which is the brief's stated render
  method and matches the reference's stacked-contour read. (2) The double-tap
  "6 s at zero" is implemented as 0.8 s drain + hold at zero until 5.2 s +
  0.8 s flood back, so the clean read lasts about 4.4 s inside a 6 s gesture;
  a hard cut to zero was rejected because the brief's own language for the
  return is a flood, and a cut would pop. (3) Tap vs drag is separated by a
  6 px movement threshold; a tap that lands within 0.35 s of the previous tap
  is treated as the double-tap and does not also reseed.
