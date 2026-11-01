# №1126 — Symphonie Cinetique (Joachim Sauter, JS7)

Eleven brass pendulums of graduated length hang from a faint ceiling line in the
top sixth of a black stage, under one cool spotlight cone. They perform a
180-second movement in six sections — chaos, waves, canon, unison, a finale
where every bob eases to vertical and hangs for one held beat, then a release
back into chaos — and loop it seamlessly.

## Method

- **Score as closed form.** Every section defines each pendulum's angle as
  `A · sin(2π · k · t / 180 + φ)` with `k` a whole number of cycles per loop, so
  all section functions are 180-periodic and the movement wraps without a seam.
  Sections crossfade over 3 s at each boundary; the finale's "section" is the
  constant 0, so the held beat is just a crossfade to stillness.
- **Waves** share one frequency with phases marching −0.62 rad per pendulum (a
  traveling wave). **Canon** splits the row into three phase voices with slow
  per-pendulum amplitude swells. **Unison** gives all eleven one phase.
- **Trails** sample the same angle function at `t − k·0.2 s` and stroke the arc
  between successive samples in amber at fading alpha — never full circles.
- **Interaction.** Dragging a bob records a displacement; on release it decays
  as `delta · exp(−dt / 1.2)`, gone in ~4 s, so the bob rejoins the score.
  Double-tap sets a new epoch and restarts the movement at the chaos section.
  Nothing reloads.
- **Audio, house-ruled.** The prompt wants the Arnalds-esque piano-and-strings
  pad on by default; the house rule wins — sound starts only inside the first
  visitor gesture, through a typeof-guarded, lazily created WebAudio context.
  Felt-piano notes (triangle + lowpass, pentatonic ladder, one rung per
  pendulum) fire when a bob's angular velocity changes sign at a swing
  extremity; a detuned saw pad breathes with the section envelope. The piece is
  visually complete with the sound off.
- **Fit.** Layout narrows the pivot spread and scales rod lengths so the widest
  score swing on the longest rod stays inside the frame at square and portrait
  sizes (found in QA: the first pass swung bobs off-canvas on phones).
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both it and the window; canvas CSS size pinned in `draw()`;
  phone detection via `window.screen` (min dimension < 700) with an aspect
  fallback; synchronous first frame at the fixed phase t = 58 s (waves section,
  crest mid-row), rAF typeof-guarded and anchored as phase + elapsed. Seeded
  mulberry32 only; no gradients, no shadowBlur, no offscreen canvas, no
  microphone.

## Frame one

t = 58 s: the wave's crest travels through the middle of the row, bobs at
graduated heights on their rods, faint amber trail arcs behind the moving
bobs, the cool cone falling from top centre. Thumb rendered twice at 720×720 —
byte-identical.
