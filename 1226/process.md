# №1226 — Finding the Truth in the World Among Us

Leslie Supnet study block LS3. After her 2013 EVP spirit-summoning piece
(sound by Clint Enns): a dark field of AM-radio static, and pale geometric
forms materializing out of it like voices half-heard on a night-time band.
Contemplative, not scary — no ghosts, no jump scares, nothing literal.
What you get is tuning, patience, and the occasional lock.

## How it works

- **The static.** A full-bleed field on #0B0C0E, built from hashed gray
  speckle in the #1E2228 family, redrawn on a 12 fps step — the noise
  steps, it never flows. Speckle density follows a band profile: four
  slow-drifting horizontal bands, plus a loud region around the tuned
  frequency φ (base 0.5), where the speckle thickens and brightens.
  Faint signal-blue #2E4A5A waveform traces drift across the field.
- **The signal model.** Spawns are driven by a closed-form signal
  strength S(t): three summed slow components (periods 7 s, 13 s, 29 s,
  seeded phases, amplitudes 0.32 / 0.26 / 0.20 over a 0.5 baseline,
  clamped to [0, 1]; the sum is periodic with period lcm(7, 13, 29) =
  2639 s, and crossings are precomputed once per period). When S crosses
  0.72 upward at a 12 fps step boundary, a form tries to spawn. At most
  four forms are alive at once.
- **Where forms can emerge.** Spawn points cycle through a 24-point
  golden-ratio lattice, seed-shuffled. A crossing only lands if the next
  lattice point in sequence sits inside the tuned band (|pointY − φ| ≤
  0.20); if none qualifies, the crossing is missed — the static swallows
  it. The sequence pointer advances past each chosen point, so the same
  point never hosts twice in a row. Tuning is therefore not decoration:
  where you listen decides what can appear.
- **The forms.** Rings, triangles, eyes, waveforms, diamonds — thin chalk
  lines in #D8D4C4, each stroked twice, the first pass a faint ±1 px
  hash-offset ghost. Alpha flickers in hash steps at 12 fps with
  occasional dropouts; nothing fades smoothly. Lifecycle, all a function
  of age: a 0.5 s stuttering flicker-in; a hold; at a hashed lock age
  (4–7 s) a 0.8 s LOCK — the form scales up 10% and a dark red #7A1F1F
  accent strokes under the chalk; then it shatters into 12 line
  fragments that fly outward on hashed velocities, stepped-fading over
  1.2 s back into the static.
- **Interaction.** Drag horizontally to scrub φ (0.0016 per px, clamped
  0.04–0.96), live while you drag and replayable afterwards — every
  spawn decision is evaluated against φ at its own moment, so tuning
  history is part of the piece. Double-tap reseeds: the reseed count
  salts both the static speckle and the form hashes (type, lock age,
  size) for everything that spawns after it. All state is closed-form
  functions of recorded event lists and t; there is no frame-integrated
  state.
- **First frame.** The synchronous first frame is drawn at the fixed
  phase T0 = 22.5 s (rAF, when present, is anchored at T0 + elapsed).
  Verified against the model: two forms are alive — seq 1, a wave at
  lattice (0.18, 0.55), age 6.08 s, is IN LOCK (its lock age is 5.70 s,
  the lock spans to 6.50 s), red accent showing at +10% scale; seq 2, a
  wave at (0.80, 0.30), age 1.25 s, holds in plain chalk. No other form
  is alive. Re-rendering the thumbnail from the shipped script is
  byte-identical.

## Audio adaptation

The prompt specs WebAudio band-limited noise driving the spawns, sound
on by default, as in the original piece where the noise soundtrack IS
the score. House rule overrides: this piece ships silent, and the spawn
driver is the closed-form signal model above — spawns trigger on
threshold crossings of S(t) exactly as an amplitude envelope would
trigger them. The visuals are complete with no audio, no AudioContext
is ever created, and nothing is gesture-gated, because there is nothing
to hear. The silence is also true to the subject: these are voices you
almost hear.

## House rules kept

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas CSS size pinned in draw(); phone
detection via window.screen physical size (min dimension < 700 px) with
the aspect fallback; full-bleed at every size; seeded integer hashes
only (no Math.random); no gradients, no ctx.filter, no shadowBlur, no
createElement, no ImageData or offscreen canvas, no microphone; no
visible text beyond the <title>.
