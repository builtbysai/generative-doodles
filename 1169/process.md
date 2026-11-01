# №1169 — I Love Resets

Jon Satrom study block JS2, after I ♥ PRESETS (2004–08+, with Rob Ray and
Jason Soliday): "do everything wrong the right way" — instrument presets
glorified by abusing them. A trio console runs a seeded procedural jam,
and every control on it is wired to the real sequencer.

## The console

Three panels on `#0D0D0F`, bodies `#1A1A1E`:

- **VOX** (`#FF2B6E`) — a square-wave bassline. Its display is a waveform
  strip drawn from the live parameters: corner rounding follows CUTOFF,
  the tanh fold follows FOLD, and past a few percent of DETUNE a detuned
  ghost wave appears behind the main one.
- **VID** (`#00FFC2`) — a shard viewport. Triangles and quads orbit and
  rotate; SHARDS sets how many exist, SPIN sets their speed and
  direction (negative spin runs them backwards), GLITCH teleports
  individual shards for single steps on a seeded hash.
- **DRUM** (`#FFE14D`) — a 4-lane × 16-step grid. Each cell has a seeded
  threshold; DENSITY decides how many fire, SWING visibly shifts the
  odd steps, and the current step column lights white.

Below the panels, a full-width `#FF3B30` RESET bar.

## Parameters and the wrong-right event

Nine parameters, each with a sane preset (CUTOFF 100%, DETUNE 0%,
FOLD 40%, SHARDS 60%, GLITCH 35%, SPIN 50%, DENSITY 70%, BRIGHT 55%,
SWING 10%). Display percent runs −100% to 400%. Knobs drag vertically,
sliders drag horizontally; the value a control shows is the value the
sequencer reads — there are no decorative controls.

Parameter state is closed-form: preset + recorded drag offsets, mixed
toward an extreme by the event envelope. The transport runs on a
10-bar cycle at 132 BPM, 16 steps per bar. On the last two beats of
bar 7 (counting the 8-bar phrase), every parameter slams to a seeded
extreme (drawn from 400%, 385%, −100%, −65%, 330%, …) in four hard
steps, holds for two bars of wrongness, then AUTO-RESET slams back to
presets in one step — with a 2px screen shake for 0.15s and the RESET
button flashing. Tapping RESET does the same slam-back immediately,
clears all drag offsets, and re-anchors the bar counter.

## Sound

Silent until touched, by house rule. The first tap anywhere creates
the WebAudio graph lazily (fully typeof-guarded): square oscillator
per bass note through a shared lowpass (CUTOFF) and waveshaper (FOLD),
DETUNE on the oscillator, noise bursts through a bandpass (BRIGHT)
for the drum lanes, SWING delaying odd 16ths in the lookahead
scheduler. Master gain 0.15. The audio scheduler walks the same step
clock and reads the same parameter state as the visuals, so a knob
drag is audible the step it lands. Display extremes are clamped to
safe audio ranges (filter 40–4000 Hz, detune ±600 cents) even when a
readout says 400%. Where WebAudio is absent — including the QA
renderer — the piece runs as a complete silent performance; the
auto-event cycle runs on the visual clock from load either way.

## Determinism and house rules

- First frame drawn synchronously at fixed phase T0 = 4.6s (bar 2,
  step 8): presets everywhere, waveform mid-shape, shards
  mid-formation, step column lit, "TAP TO START THE JAM" showing.
  The rAF loop is typeof-guarded and anchored as T0 + elapsed.
- All randomness is seeded (mulberry32 + integer hashes); no
  Math.random, no offscreen canvas, no ImageData, no gradients, no
  ctx.filter, no shadowBlur, no createElement, no microphone.
- Canvas size from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height pinned
  in px inside draw(). Phone detection via window.screen physical
  size (min dimension < 700px) with aspect fallback; on phones the
  panels stack vertically in a compact layout that keeps all nine
  controls on screen (verified by pixel scan: all three slider fills
  present at 390×844).
- QA: thumb.png rendered twice at 720×720 and byte-compared (`cmp`
  identical); desktop (1280×800) and mobile (390×844) renders read
  by eye.
