# №1945 Standing Next to a Guitar Amp

Prompt block: LR2 / PP1192, study #254 lucy-railton.

Driver, in one sentence: a near-black field holds one blue flare blooming very slowly at center, a face half-dissolved behind it, and the flare breathes on a just-intonation sound model, so the waiting itself is the piece and the beating between partials is visible as slow swell and cancellation.

## Palette

Hand-picked from the prompt's named colors, since the study file gives no hex values: near-black field #02030a with black edges #01020a, blue to black gradient through #0a1730 and #050b1c, flare deep blue #1c3a7a, flare blue #5f8cff, soft flare white core #eaf2ff, the face in deep shadow #0d1526 with darker eye hollows #01020a. Plate ink is soft blue white #c8d6f2, hint muted blue #7d90b8.

## Mechanism

- Sound model, closed form: eight just-intonation partials of a 55 Hz drone, ratios 1, 9/8, 5/4, 4/3, 3/2, 5/3, 7/4, 2, with base amplitudes 1.00, 0.45, 0.62, 0.38, 0.55, 0.30, 0.22, 0.40 and slow amplitude drift periods 180, 97, 143, 61, 211, 83, 127, 173 seconds. Each partial amplitude is base times (0.55 plus 0.45 sin(2 pi t / period plus phase)), so it lives in [0.10, 1.00] of its base. Phases are seeded from the piece number with mulberry32(1945).
- Beating: the fifth partial (3/2, 82.5 Hz) carries a near-unison twin detuned by 0.4 percent, a beat frequency of 0.33 Hz and a period of about 3.03 s. The beating is NOT smoothed: it modulates the flare core brightness and radius directly, so the core visibly pulses on the beat.
- Flare: three nested radial gradients at center. Radius follows the strongest partial, R = S times (0.14 plus 0.10 times strongest amplitude), where S is min(W, H). Halo extends to 2.0 R, bloom to 1.15 R, core to 0.42 R plus 0.10 R times the beat value. Eight overtone rings, one per partial, radius and alpha from that partial's own amplitude, so overtones bloom and cancel on screen exactly as they do in the model.
- Face: an abstract oval in deep shadow, slightly left of center and tilted 0.03 rad, with a brow shadow, two dark eye hollows, a nose shadow gradient, and a faint mouth line. 260 seeded speckles of field color dissolve the oval from inside, and 40 more speckles drift with a 173 s sine, so the dissolve itself breathes. No feature is drawn legibly and no recognizable portrait is possible.
- Interaction: none. No pointer handlers exist at all. Drag does nothing by design; the tuning does not negotiate.
- Audio: visual only, no WebAudio. The sound model is closed form and drives the visuals; real audio would only ever start lazily inside a first gesture, and this piece has no gesture.

## Determinism

- FIRST_T = 30. At t = 30 the fundamental is at full amplitude (1.000), the strongest partial is index 0, flare radius is 0.24 of S, and the beat value is 0.7393.
- Every frame is a pure function of t. Seeded PRNG mulberry32(1945) fixes phases and speckles; nothing reads the wall clock at load.
- All motion is slow: fastest drift about 0.016 Hz, beating 0.33 Hz, both far under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: window.__draw drives draw() with a virtual clock, and window.__piece1945 exposes partialAmp, strongest, beat, flareRadius, redraw, and firstT.

## Acceptance criteria

- Flare radius at frame one: 0.24 of S (strongest partial amplitude 1.000 at t = 30).
- Partial count and ratios: 8 partials, ratios 1, 9/8, 5/4, 4/3, 3/2, 5/3, 7/4, 2.
- Time probes at two distant times differ: t = 90 md5 f9a3b5038bfb46d08a44aac39d207fa3, t = 210 md5 395c23e02f3caf30e2de10a38ede537f, both different from frame one.
- Frame one re-renders byte-identical: two 720x720 renders both md5 7a1d91c853aa2f0c2d7ef17834aa7a64.
- No interaction handlers that change the field: zero pointer listeners registered (render harness reports only win:resize and vv:resize).
- No em dashes in visible copy or in this file.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible on all sizes, no collisions, the face oval with eye hollows and mouth line barely legible behind the flare, the hint readable, the field full-bleed on the phone and square on desktop.
- Time probes (probe harness evals the actual script, calls window.__draw at chosen times): t = 30 md5 7a1d91c853aa2f0c2d7ef17834aa7a64, flare R/S 0.2400, beat 0.7393; t = 90 md5 f9a3b5038bfb46d08a44aac39d207fa3, strongest partial index 1 at 0.4500, flare R/S 0.1850, beat 0.9915, the flare visibly smaller; t = 210 md5 395c23e02f3caf30e2de10a38ede537f, flare R/S 0.2400 but beat 0.0483, the core visibly dimmer at the bottom of the beat. Partial amps at t = 30: 1.000, 0.099, 0.573, 0.100, 0.549, 0.099, 0.026, 0.049. At t = 210: 1.000, 0.264, 0.174, 0.065, 0.436, 0.030, 0.190, 0.040. The overtone set has turned over between the two times while the fundamental holds.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 7a1d91c853aa2f0c2d7ef17834aa7a64).

## Fix rounds

1. The first build washed the face out entirely: the halo reached 2.6 R and the dissolve speckles spilled outside the oval, reading as dust in the blue with no face behind the flare. The face is now larger (0.40 by 0.52 of S, up from 0.34 by 0.46), the oval fill is stronger (0.72 alpha), the halo is tighter (2.0 R) and dimmer, and the speckles are confined to the oval. Re-rendered; the brow, eye hollows, and mouth line are now barely legible behind the flare on desktop, mobile, and thumb.
2. The first build also carried a horizontal amp glow bar low in the frame that read as a floating rectangle, disconnected from everything. It is removed; the title carries the amp. Re-rendered; the lower field is clean black to the hint.

## Deviations from the prompt

- The prompt calls the visuals a WebGL gradient field. This build uses Canvas 2D radial gradients, which produce the same bloom and are covered by the node-canvas QA harness; no WebGL is required for the effect.
- The prompt names a single bowed drone and sine swells. The model is a closed-form just-intonation additive synth with eight partials; no real audio is rendered. Visual only, per the Franke audio rule.
- The face is staged larger than the prompt's middle third, so its edges stay visible outside the flare at all times; the flare itself still fills the middle third.

## Known warts

- The face oval is large: on desktop its top reaches almost to the title plate, so the piece reads as one vast dark egg behind the flare rather than a head sized to the flare.
- At the bottom of the beat (t near 210) the flare core goes noticeably dim and grey; that is the beating doing its work, but a first glance at that moment can read as the piece being switched off.
- The dissolve speckles are visible as faint dots in the blue where the oval catches the bloom; they are meant to eat the face, but at thumb size a few read as dust motes.
- The overtone rings are very faint at low partial amplitudes; at some times only two or three rings are visible at all.
