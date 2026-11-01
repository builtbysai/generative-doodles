# №1404 "The Changing Sky" (alison-odaniel AO5, PP627)

## Prompt
A dark field where a pair of procedural hands traces glowing neon shapes in the
air — each shape the arc of a signed word, drawn as light and left hanging in
the dark like a constellation, then slowly fading as the next shape begins.
Hands work center frame, large; each completed light-shape hangs in the dark
around them, forming a slow-accumulating constellation; the background stays
near-black so the neon carries. Hands draw one shape per ~8 seconds, the shape
lingering ~30 seconds before fading; dragging draws with the hands — the drag
path becomes a new light-shape in the constellation; the constellation never
fully clears, only thins.

Palette: neon cyan #3fd2c8, neon amber #f5c542, neon magenta #d42a8a, night
deep #0d0f14, hand silhouette #1a1a18.

## What was built
- Near-black field (#0d0f14). Two parametric hand silhouettes work center
  frame: palm ellipse + four fingers + thumb, filled in silhouette ink
  #1a1a18 with a faint white rim so the hands read on near-black.
- Light-shapes are seeded pseudo-gesture arcs: a smooth open curve generated
  from a per-shape mulberry32 seed (sweep, radius harmonics, center). Colors
  cycle cyan → amber → magenta by shape index. Each shape is drawn
  progressively over an 8-second cycle by the drawing hand's fingertip; the
  second hand trails the same path 0.15 of a cycle behind, offset down-left,
  so the pair reads as working together.
- Completed shapes hang in the constellation and fade exponentially toward a
  0.06 alpha floor — they thin but never vanish, and new shapes keep arriving
  every 8 seconds. Frame one is pre-seeded with three shapes at ages 25, 15,
  and 5 seconds, so the constellation is already hanging at load.
- Dragging draws with the hands: the drag path is captured live, and on
  release it joins the constellation in the next cycle color. The
  constellation buffer is capped at 40 shapes (oldest dropped first, at floor
  alpha where the pop is negligible).
- Fully silent. No audio of any kind; the piece is the sound's replacement,
  per the study's sound-is-felt-or-seen rule.

## Adaptations
- Hands are parametric silhouettes with finger articulation; the faint rim
  stroke is a readability addition (pure #1a1a18 on #0d0f14 would be nearly
  invisible), not a palette change.
- Shapes are closed-form seeded curves, never frame-integrated; fade is
  stored-history exponential decay, never canvas-fade; glow is a flat-alpha
  halo pass plus a core pass, never gradients.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, getUserMedia, or fillText/strokeText — so no
  readable text can leak in. Hands draw pseudo-gestures only, never real
  signed words; no text appears anywhere except `<title>`.
- Node-canvas quirks honored: every fading alpha is rounded to 4 decimals
  before stringifying (scientific-notation alphas like 2.5e-15 parse as
  opaque in node-canvas); dots are filled rects; every arc gets its own
  beginPath with a moveTo first.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window, pinned in draw(); phone detection
  via window.screen physical size (min dimension < 700px) with aspect
  h > w*1.15 as fallback; centered composition, page ground is the piece's
  own background color; no hint text. Determinism: synchronous first frame
  via a boot flag (frame one = draw(0), clock starts only with the rAF
  loop); all randomness from mulberry32 (seed 1404000 + index·7919), never
  Math.random; rAF loop is a plain function declaration behind a typeof
  guard. Interaction: drag draws, never click-to-reload.

## Verification
- Rendered at 1280×900, 390×844, and 720×720; all three inspected. Desktop
  frame one: near-black field, three pre-seeded constellation shapes
  (magenta brightest, amber mid, teal faintest) around center, two dark hand
  silhouettes with finger bars at center, current shape just beginning.
  Mobile keeps the same centered composition with no clipping.
- Thumb byte-identical across repeated renders; two fresh frame-one renders
  byte-identical.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280×900): non-background px grow
  51,239 (t=0) → 52,020 (t=4, shape half-drawn) → 57,180 (t=8, shape 0
  completed) → 73,586 (t=38, four shapes completed, older ones thinned to
  floor but still present — the constellation never clears). Drag test:
  drag-region px 0 before → 2,982 after a drag through that region, i.e.
  the drag path becomes a constellation shape exactly where dragged.
- Token scan clean: no AudioContext, getUserMedia, createElement, Path2D,
  gradients, shadowBlur, fillText/strokeText, or Math.random.
- No fix rounds needed.
