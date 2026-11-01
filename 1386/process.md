# №1386 "Monument Edit" (adam-khalil AK3, PP609)

A procedural bronze statue on a plinth; a bright cyan scan-line sweeps over it
every 12 seconds and the monument rematerializes mid-pass into something else
— a flock of birds, then growing vines, then running water — then reverts,
endlessly. The transformation happens only inside the scan band.

## Composition

- Sky gray (#c8c4b8) field; a darker flat-alpha plaza band below the plinth.
- Bronze (#7a5a34) statue silhouette centered in the middle band: head circle
  plus a tapered torso polygon. Abstract by construction — no recognizable
  monument or person.
- Plinth stone (#8b8578) block on a wider base step.
- Scan line in scan-line cyan (#57e6ff), 3 px, full width, with a faint
  translucent cyan wash marking its band (band height 30% of statue height).

## Motion (all closed-form functions of piece time and recorded drags)

- 12 s sweep cycle, phase-shifted +4 s so frame one already shows the line
  mid-statue with a transformation underway, never an empty sweep.
- Seeded form rotation (mulberry32(1386000) shuffle): pass 0 = vines,
  pass 1 = birds, pass 2 = water, then the rotation repeats every 36 s.
- Inside the band, the bronze is dissolved by a striped sky-colored alpha
  envelope (32 strips, alpha following distance from the line) and the target
  form is drawn clipped strictly to the band rect:
  - Birds: 14 seeded chevron birds, flapping closed-form, drifting sinusoidally.
  - Vines: 5 seeded stems with leaf ticks, curving closed-form.
  - Water: 6 seeded expanding ripple rings plus sine wave lines.
- Drag vertically re-times the sweep: each drag sample adds dy * 0.02 s of
  phase shift, decaying exponentially (tau 4 s) so the 12 s cadence always
  resumes. No buttons, never click-to-reload.

## Adaptations (QA renderer constraints)

- Statue as a procedural silhouette (no mesh); crossfade-dissolve between form
  states masked to the scan band as closed-form alpha envelopes.
- Birds as closed-form flock positions (no frame-integrated boids); vines as a
  closed-form growth function; water as closed-form ripple rings (no shader).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia — the piece ships fully silent.
- Dots drawn as paired arcs or rects with a moveTo before every batched arc
  (node-canvas subpath quirk); no visible text except `<title>`.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window, pinned in draw(); phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback;
  centered composition keeps its proportions on phones (statue width derived
  from statue height, plinth capped at 90% of viewport width).
- Determinism: frame one = draw(0) via a boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1386000 + index * 7919), never Math.random.

## Verification

- Rendered at 1280x900, 390x844, 720x720 with node-canvas and inspected.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners):
  - t=0: scan line mid-statue, vines in band (744 px), 0 form px outside band.
  - t=6: line moved to y 461.5, vines in band (800 px), 0 outside band.
  - t=12: birds pass (chevron flock visible in a t=12 render), 0 outside band.
  - t=24: water pass (284 water-blue px in band), 0 outside band.
  - t=36: vines pass again — the 36 s rotation closes exactly.
  - Drag: a 100 px upward drag at t=5 shifts the t=6 line by -60.5 px
    (predicted -60.8 px from the decayed -1.56 s phase shift); the offset
    decays back toward the base cadence.
  - Transformation strictly inside the band at every probed time.
- Thumb byte-identical across repeated renders.
- Fix rounds (2): statue width was viewport-derived and went thin on phones
  (now derived from statue height, plinth capped); the erase envelope went
  from 12 to 32 strips so the dissolve reads smooth instead of striped.
- Token scan clean: no Math.random, createElement, Path2D, shadowBlur,
  AudioContext, getUserMedia, or gradients.
