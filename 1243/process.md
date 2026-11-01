# №1243 — "Scream but Not Cry"

Adán De La Garza study block ADG4, after his *Giving myself a reason to
scream but not cry* (2015–ongoing):
screaming while a white flag burns on the Racetrack Playa — "through burning
it, it becomes a sign of not giving up or giving in."

## The scene

A white flag on a pole over the playa, drawn flat. Sky `#9FC2D8`, two hashed
ridge bands for the distant mountains, playa `#D8C8A4` with seeded speckle.
Four dark rocks sit in the mid-ground, small, never the focus. Behind each
rock a pale trail stroke (the Racetrack's famous sliding-rock trails) fades
in slowly over the first 60 seconds of the cycle. No text anywhere in the
piece — none on the flag, none in the frame.

## The flag and the burn

The flag is a 14×9 grid of quads. Every grid point's offset is a closed-form
sum of sines over (column, row, phase), with amplitude scaled by the wind
level W and pinned to zero at the hoist, so the cloth stays attached to the
pole and ripples toward the fly end. Cells are shaded with two flat whites
by the sign of the ripple, so the folds read without gradients.

The burn line is a per-column height `bcol` — the mean burn fraction times
two hash octaves, so neighbouring columns burn to noticeably different
heights. Cells whose top is below the line are gone (not drawn); cells at
the line are fully charred in one of two scorch tones; cells just above it
take ragged hash-chosen "bite" scorches that reach up from the line. Along
the line, flame tongues (flat `#E86A2C` polygons with a `#C23B2E` core) are
drawn per column, their height, width, centre and very presence re-hashed
every 1/7 s, so the front flickers and has gaps. Embers lift off the line on
closed-form hashed paths, their count proportional to the flame level F.

Base burn is slow: `0.55 · (cycle/90)^0.8` — about 19% of the flag gone at
24 s, about 55% by the end of the 90-second cycle. At the cycle boundary a
fresh, whole flag replaces the burned one. The loop is the burning; the
piece resets plainly rather than pretending otherwise.

## The scream, and its futility

Press-and-hold anywhere is the scream. The scream meter S is a closed-form
walk over the recorded hold intervals: it rises at 1/1.2 s while held
(capped at 1) and decays at 1/3 s on release. S drives three things, all
inside the flag only:

- wind level `W = 0.35 + 0.65·S` — the flag whips harder;
- flame level `F = 0.5 + 1.1·S` — taller tongues, more embers;
- burn rate — the burn fraction gains `0.10 · ∫S dt` within the current
  cycle, so screaming genuinely consumes the flag faster.

And that is all screaming does. The rocks keep their schedule, the trails
fade in on theirs, the rain comes at 70 s whether or not anyone screamed.
Nothing is unlocked, nothing is won, no score changes. The scream changes
nothing in the world except how fast the flag is used up — that futility is
the piece.

## Rain

Once per 90-second cycle, at t ∈ [70, 80), a grey wash (`#8A8D94`) fades in
and diagonal rain streaks fall. Across the rain the rock trails erase —
alpha driven to zero by t = 76 — and stay gone for the rest of the cycle.
Next cycle they fade in again, slowly: those rocks will move again, whether
we bear witness or not.

## Determinism and house rules

- First frame is drawn synchronously at the fixed phase T0 = 24 s: burn
  line at ~19% with flames along it, flag rippling at base wind, rock
  trails faintly visible, no rain, scream at zero (holds are visitor
  events). The rAF loop, guarded by a `typeof` check, anchors at
  T0 + elapsed-since-load.
- All variation comes from a seeded integer hash; there is no
  `Math.random`, no canvas gradient, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no `document.createElement`, no audio or microphone.
  The piece is silent.
- Canvas is sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `draw()` pins `canvas.style.width/
  height` in px. Phones are detected via `window.screen` (min dimension
  < 700) with aspect fallback; on phones the pole moves left and the flag
  widens so the full cloth stays in frame.
- Thumb is rendered from the shipped script at 720×720 and byte-compared
  across two renders (identical).
