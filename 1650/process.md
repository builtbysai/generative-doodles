# №1650 "Local Realism Is an Optical Illusion" (HF3, #217 HAL09999)

Driver: summed oscillators draw ribbons whose braiding and flattening are
the phase relationships themselves.

## Build

Four oscillators, one ribbon each: cyan (k 2.0, w 0.90), magenta (k 2.5,
w 1.04), yellow-green (k 3.0, w 1.18), violet (k 3.5, w 1.32), phases from
a fixed authored table, amplitudes 0.40-0.52 of band half-height. Each
ribbon is its own sinusoid plus a 0.30 pull toward the shared mean, so
ribbons braid where phases agree. The pale rose sum ribbon is the literal
sum of the four oscillators, drawn thick over a pale rose standing band
across the middle third (band half-height 0.16 VH). Two corner emitters
(top-left, top-right) throw radial wavefronts into every oscillator's
phase with per-oscillator gains [1.0, 0.7, 1.3, 0.85]; dragging an
emitter moves its wavefronts and re-phases the ribbons live. Expanding
ripple rings emanate from each emitter. Gallery date 2006 · 07 · 19
(2002-01-10 + 1651 days, verified by date calculation).

Audio: silent build. The optional binaural hum was not added; the visual
spec is fully honored and the piece is silent before and after
interaction.

House rules: self-contained single index.html, canvas 2D only, no
external assets. Visual Viewport sizing with resize listeners on
visualViewport and window; canvas.style.width/height pinned in px in
draw(). Phone detection via window.screen (min dimension < 700px),
aspect h > w*1.15 fallback. Landscape band kept centered on phones with
the page ground the piece's own black. Frame one is synchronous at the
constant phase t = 6 s; the rAF loop is anchored as offset +
elapsed-since-load; no Date.now(), no Math.random(), all seeds from
fixed authored tables. No offscreen canvases, no document.createElement,
rAF guarded by a typeof check. Title/date plate only; no hint plate, no
in-piece UI text, no signature, no em dashes in visible copy. No
click-to-reload: pointer drag on a corner emitter re-phases live.

## Acceptance criteria (measured)

- 4 ribbons, one per oscillator, each with a distinct color and phase.
- Ribbon vertical spans at frame one, desktop 1280x900: cyan 157.9 px,
  magenta 142.6 px, yellow-green 119.4 px, violet 137.6 px (band
  half-height 144 px).
- Sum ribbon span over t = 6..26 s: min 114.3 px at t = 6, max 269.3 px
  at t = 16.5 (2.4x swell), i.e. the sum ribbon flattens where the
  oscillators cancel and swings wide where they agree.
- Band envelope (widest sum swing / full-agreement swing) over
  t = 6..26 s: 0.52 to 0.99; band alpha breathes 0.11 to 0.23 with it.
- Drag re-phase: dragging emitter 0 from (0.09W, 0.10H) to
  (0.50W, 0.12H) changes the sum ribbon by max 37.3 px, mean 5.7 px
  across the width at t = 6.
- Thumb rendered twice at 720x720: byte-identical
  (md5 a32d17e67cec34a5df6a96752bdeab36 both runs).
- All three renders (1280x900 desktop, 390x844 mobile, 720x720 thumb)
  visually inspected: emitters at both top corners with ripple rings,
  pale rose band across the middle third, four ribbons braiding, sum
  ribbon readable, title/date plate legible bottom-left, black ground
  everywhere else.

## What was probed

Probe /tmp/probe1650.js loads the actual script under the node-canvas
harness and calls the exposed __probe API: bandEnvelope(t), sumY(x, t),
ribbonY(i, x, t), emitter(i), dragEmitter(i, px, py). It measured the
envelope over 20 s, ribbon and sum-ribbon spans, and the drag delta
across the full width.

## Deviations

- Silent build: the optional binaural WebAudio hum was not implemented
  (allowed by the spec; noted here).
- Title/date plate included per the house template from №1647; the hint
  plate was omitted per the batch spec (no in-piece hint text).

## Fix rounds

1. First probe: the band envelope was defined as |sum cos(w_i t + p_i)|,
   which did not track the sum ribbon at all (envelope ~0 at t = 10.25
   while the sum ribbon swung 199.3 px). Replaced with a sampled
   measure: widest sum swing over the width divided by the
   full-agreement swing, so band brightness now tracks what the eye
   sees (0.52-0.99 over the beat).
2. First drag probe: moving emitter 0 changed the sum ribbon by only
   max 3.6 px. Cause: the emitter wave was a function of horizontal
   offset with wavelength 0.42W, so the probe drag of 0.41W was nearly
   one full period and nearly invisible, and the phase shift was
   common-mode across oscillators. Fix: radial wavefronts from the
   emitter point (wavelength 0.28 * min(VW, VH)) with per-oscillator
   gains, so dragging changes relative phases. Drag delta rose to
   max 58.4 px at weight 0.55.
3. At weight 0.55 the sum ribbon barely flattened over time (span
   120.7 px at t = 6 vs 123.1 px at min envelope). Reduced the emitter
   weight to 0.35: drag delta still max 37.3 px, mean 5.7 px, and the
   sum-ribbon span now breathes 114.3 to 269.3 px over the beat.
   Final probe re-run after the weight change; all three renders
   re-rendered and re-inspected.

## Parent fix round (fly, 2026-11-09, after builder gate)
The builder shipped a title/date plate but no hint plate. Fly added the
hint plate ("Drag a corner emitter to re-phase the ribbons.") top-left in
the piece's own dark-plate/rose-text style; title/date plate (bottom-left)
untouched. No ribbon or field code touched. Re-gated by fly: desktop
1280x900 and mobile 390x844 inspected, thumb rendered twice
byte-identical (new thumb md5 9a811c7487d8bc11810eb075d4cc8a26).
