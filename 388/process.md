# №1141 — Optical Rail

Kimchi and Chips study block KC6 (Optical Rail series, 2021–2025): "motion
without a moving-image display."

## The piece

A completely static, back-lit print panel — warm paper #F2EDE3 against a
near-black #0B0C0D surround — carries two diagonal hatch bands at two angles,
a halftone dot field whose dot radius follows a smooth analytic field, three
bold circular forms in deep charcoal #1A1C1E (a heavy ring, a filled disc, a
concentric ring pair), one faded signal-red band #C8463C, and a fine plate
border. The print never moves, translates, or redraws differently: it is one
draw function, `drawPrint(shift)`, and in the base pass it is only ever
called with shift 0.

Above the print, six vertical cylinder-lens strips ride an invisible rail,
crossing the panel in about twenty seconds and wrapping seamlessly. A lens
is near-invisible — a 0.03-alpha white body, a faint central sheen, and two
0.25-alpha edge highlights. What betrays it is the refraction: under each
strip the print is re-sampled column by column (4 px columns, clipped), each
column calling `drawPrint(-disp)` with a cylinder profile — displacement
strongest at the lens centre (max ~16 px), zero at the edges. Hatching bends,
the ring and disc stretch, the halftone ripples — crisply, geometrically,
and only beneath the glass. Between lenses the print is untouched and still.
The image never moves; the seeing moves.

## Motion and interaction

- The train is closed-form: lens positions are a wrapped function of an
  accumulated distance D(t), integrated over recorded direction segments,
  so reversing the rail never makes a lens jump.
- DRAG a lens: it follows the pointer; on release it rejoins the train with
  its offset decaying exponentially (τ ≈ 0.85 s) — the mechanism, touched.
- TAP a lens: it holds still for 4 seconds while the others continue, then
  catches up on the same exponential spring. A tap that turns out to be the
  first half of a double-tap has its hold undone.
- DOUBLE-TAP (anywhere): the whole train reverses direction, positions
  continuous. Never click-to-reload.
- Sound, per the house Franke rule: the visuals are complete silent.
  WebAudio starts only lazily inside the first visitor gesture,
  typeof-guarded — a very quiet rail hum (46 Hz saw through a 140 Hz
  lowpass, plus a 92 Hz sine) and a soft glassy tick whenever a lens
  crosses one of the bold circles.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in fit(), which runs
  at the top of every draw().
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback (h > w * 1.15); on phones the panel widens to 86%.
- Determinism: frame one is drawn synchronously at the fixed phase
  T0 = 1.2 s — lenses spread across the panel, the heavy ring crossed by
  two strips, a third at the disc's edge — and requestAnimationFrame is
  typeof-guarded, anchored to that phase plus elapsed time. No
  Math.random anywhere; the print is entirely analytic.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas,
  no createElement, no microphone. Halftone dots are drawn as individual
  beginPath arcs. No visible text except the <title>.
