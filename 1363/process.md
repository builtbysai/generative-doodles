# №1363 "Silent Choir" — raven-chacon RC4 (PP586)

A lightless antechamber after Chacon's *Silent Choir* (2017): a near-black
field holding a faintly pulsing field-recording waveform, one small contained
breath (a vial-like glowing point, low-center), and a slow-rising cloud of
uncontainable breaths (soft particles that refuse containment).

## Composition

- Ground: near-black `#050505`, full-bleed, never brightened.
- Waveform: a thin ash horizon line at 0.42H, drawn as a fixed seeded sum of
  sines over x; its amplitude breathes on the 30 s cycle
  (base 2.5 px plus up to 3.5 px at the cycle peak, scaled by field size).
- Vial: low-center (0.5W, 0.78H). A small upright capsule outline in ash,
  a bright core dot, and two layered flat-alpha ember glows. It pulses once
  per 30 s cycle: a gaussian envelope centered at cycle phase 0.45, so frame
  one shows the vial at its quiet base glow and the pulse arrives mid-cycle.
- Breath particles: 110 seeded particles across the whole field. Each has a
  life of 14–28 s, a phase offset, a sway amplitude/period, a size of
  1.2–4.6 px, and a tone (breath-white, ash, or ember tint). Position and
  alpha are closed-form functions of piece time: rise from bottom to top
  over the particle's life, fade in over the first 15%, out over the last
  30%. Phase offsets distribute ages at load, so frame one is already
  populated — the cloud is present from the first frame, never empty.
- Grain: 240 faint dots whose alpha is a seeded function of (dot index,
  quantized 2 s time index), so the grain shimmers slowly and reproducibly
  rather than flickering per frame.

## Interaction

None. Watch-only by design: the script registers resize listeners only and
no pointer, mouse, touch, or click handlers of any kind. The piece is about
silence and staring; it ignores the visitor entirely and never reloads.

## Adaptations

- Silence: the prompt's optional barely-audible filtered-noise bed at
  −40 dB is refused under the house no-autoplay rule. This piece contains
  no audio at all — no AudioContext, no oscillators, no noise source.
- Grain: implemented as a seeded function of the quantized time index,
  never per-frame random, so the overlay is reproducible.
- Particles: stored closed-form paths (position buffers in the sense that
  each particle's whole trajectory is a function of time), never canvas
  fade — the QA renderer paints a single frame, so an rgba-fillRect fade
  would leave no history.
- No gradients, no shadowBlur, no Path2D, no offscreen canvas, no
  createElement anywhere. Glow is layered flat-alpha discs; the waveform
  is a stroked polyline.

## Determinism

Frame one is drawn synchronously at t = 0 via a boot flag; the clock starts
only with the rAF loop, which is a plain function declaration behind a
`typeof requestAnimationFrame` guard. All randomness comes from mulberry32
streams (seed 1363000, plus index × 7919 offsets for waveform and grain);
`Math.random`, `Date.now`, and `performance.now` are never used. Thumb
renders are byte-identical across repeated renders.

## QA

Rendered with `~/workspace/tools/render-piece.js` at 1280×900, 390×844,
and 720×720; all three inspected. Desktop and mobile both read as a dark
room: thin waveform horizon, scattered breath particles, vial low-center
with ember glow. Harness listener list confirms resize listeners only —
no pointer interaction exists to test. Token scan clean (one comment
states `Math.random` is never used).
