# №1402 "Deaf Club" (alison-odaniel AO3, PP625)

A punk show felt, not heard. A tower of amplifiers dominates upper center
stage; a crowd of flat signing silhouettes fills the lower half; percussion
instruments visibly react to being struck; the whole frame vibrates with
the beat. Sound is felt and seen, never merely heard — the piece is about
sound politics and access, not about simulating deafness.

## Composition

- Dark club wash background, quiet so the vibration reads.
- Amp tower, upper center: three stacked black amps with stage-red trim,
  speaker cones, and grille dots (filled rects, no text anywhere).
- Stage platform in stage red below the tower.
- Drum kit at stage front center: kick drum, snare (left), cymbal on a
  stand (right, gold).
- Crowd, lower half, two rows of flat signing silhouettes in varied flat
  skin tones (#c89a72 / #8a5a3a / #e8c4a0), hands as sign-motion white
  dots. Hands move in continuous looped pseudo-gestures only — never
  real ASL words, never readable lyrics or band names.

## Motion (all closed-form over piece time and recorded events)

- Beat as a master clock: 120 BPM (0.5 s per beat). Kick on even beats,
  snare on odd beats. Each kick lands as a visible gold shockwave
  (expanding ring + a weaker inner ring) radiating from the kick drum
  through the crowd; each snare lands as a white ring from the snare.
  Kick drum skin ripples (radius pulse) on the kick envelope; cymbal
  shimmers as a thin white ring on snare beats.
- Signing figures' arms loop on seeded sine cycles (pseudo-gestures);
  figures bob on the kick envelope.
- Drag across the crowd "turns up" the vibration locally: recorded drag
  samples form a gain field (Gaussian falloff, tau-2.5 s decay) scaling
  nearby figures' arm swing and bob amplitude. The show never ends,
  never quiets; vibration is visible, never screen-shaking.

## Adaptations

- Beat, shockwaves, membrane ripples, and arm cycles are closed-form
  functions of piece time and recorded drags — no frame-integrated
  simulation anywhere.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or fillText/strokeText,
  so no readable text can leak in.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying (scientific-notation alphas parse as opaque);
  dots drawn as filled rects or arcs with their own beginPath and a
  moveTo before every batched arc.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback; field-like
  composition goes full-bleed on phones.
- Determinism: frame one = draw(0) via boot flag, clock anchored on the
  first rAF call (rAF timestamps are not epoch time), rAF loop as a
  plain function declaration behind a typeof guard; all randomness from
  mulberry32 (seed 1402000 + index·7919), never Math.random.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 and inspected all three;
  thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): t=0 vs t=0.25 differ in 56,667 px
  (kick ring expanding, arms moving); kick ring point goes from
  background [16,14,13] to gold-tinted [116,94,35] at t=0.25; snare ring
  point lightened to [89,87,84] at t=0.75; dragged vs undragged at t=2.5
  differ in 37,970 px (29,456 px in the crowd band alone — drag gain
  ripples nearby figures harder); top-left background corner identical
  across times (no screen shake); two fresh instances render
  byte-identical frame-one images.
- One fix during the build: the rAF loop first mixed Date.now() (epoch)
  with rAF timestamps, which would have frozen the clock at 0 — fixed
  by anchoring the clock on the first rAF call; all renders re-done
  after the fix.
