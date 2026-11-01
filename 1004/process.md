# No.1004 — The Input Is a Whisper

Study #123 yuya-hanai, PP165 "Messaging Mask": the quietest input amplified into the largest image.

## Concept

A tiny sensor circle (44 px) sits at the center of a dark field. Inside it, a simulated whisper: a trembling line, a slow breath dot, three jitter specks, all faint gray. That micro-signal is the only input the piece ever has, and it is seeded and simulated — there is no microphone access of any kind in the file, no permissions, no sensing of the room. Three lanes amplify the whisper x50 into the full frame: WAVEFORM (cyan) draws the tremor's Y channel as a scrolling seismic band, BREATH (magenta) births expanding rings on each breath peak, CURRENT (mint) advects 350 particles through a curl field driven by the X channel. The only text is the specced label along the bottom: "INPUT: WHISPER. OUTPUT: ROOM." The scale contrast is the piece: 44 pixels of input, a whole frame of output. Double-tap silences the whisper for 5 s and the lanes decay to black — what remains when the input stops is near nothing, which is the point.

## Construction

- **Whisper model.** The micro-signal is pure data, never read back from pixels. Tremor position per axis is a sum of four seeded sine components (three slow, 0.35–1.85 Hz, plus one fast small 3–5 Hz component whose velocity gives the channels their tremor texture). Channels are analytic derivatives of the same functions: X = tremor x-velocity, Y = tremor y-velocity (sensor px/s, clamped ±30), B = breath brightness and its derivative, the breath being a seeded 4.6–6.4 s sinusoid. All parameters come from mulberry32.
- **Sim.** Fixed timestep 120 Hz; 1920 pre-roll steps (16 s) run synchronously at load so frame one is mid-whisper, and the synchronous first draw never uses a wall clock. The rAF loop (typeof-guarded) advances the same sim in fixed steps, capped per frame.
- **Lanes.** WAVEFORM stores one Y sample per step (last 6 s drawn), amplified x50 with a tanh soft-compression into the band so the trace stays organic and never clips flat. BREATH detects breath peaks by the sign change of the breath derivative and spawns a ring (4.6 s life, ease-out expansion, three layered-alpha strokes, no gradients); a faint alpha disc at center swells with breath brightness. CURRENT advects 350 seeded particles through a seeded sin/cos curl field plus a global drift from the X channel x50.
- **Silence.** Double-tap sets a 5 s silence window; an activity envelope A decays exponentially (time constant ~0.55 s, lanes visibly black within ~2 s) and recovers after. Channels are multiplied by A, ring births require A > 0.5, the particle field slows toward stillness, and inside the sensor the tremor line stills and the breath dot fades.
- **Interaction.** Tap within ~42 px of center = tap the sensor: reseeds the whisper (seed advances deterministically), clearing waveform history and rings so the lanes re-amplify the new signal. Drag = lean in: the drag's starting vertical third selects the lane (top third WAVEFORM, middle third CURRENT, bottom third BREATH — recorded here per the brief's simplification); that lane's gain eases up to 2.3 while dragging and eases back to 1 with a 5 s time constant (about 15 s to settle). Double-tap anywhere = silence. Tap-vs-drag is decided by travel distance; double-tap is checked before the sensor reseed fires.
- **Audio.** Lazy AudioContext, typeof-guarded, created only inside the first pointerdown (never at load, silent in QA): a band-passed noise loop at 0.010 gain (the near-silent whisper texture), a 92 Hz swell whose gain follows breath brightness x activity, and a soft sine chime on each breath-ring birth.
- **House rules.** Visual Viewport sizing with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen min dimension < 700 with aspect fallback; page ground is the field tone; strict six-value palette; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no external assets, no date strings, no em dashes.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png); renders cleanly in silence (audio never initialises without a gesture).
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical. Duplicate deleted.
- Read-back: dark field; one triple-stroked magenta breath ring mid-expansion behind everything plus the soft breath disc at center; cyan seismic waveform with irregular peaks and tremor texture crossing mid-frame; mint current particles drifting throughout; the tiny hairline sensor at center holding a faint gray squiggle, breath dot and specks; the label "INPUT: WHISPER. OUTPUT: ROOM." legible at the bottom. Mobile keeps the sensor centered and tiny, the label legible, nothing clipped.
- Fix round: the first build's waveform read as a clipped square wave — the Y channel was clamped at ±10 px/s and hard-clamped at the band edge, so it sat flat at its extremes. Fixed by raising the channel clamp to ±30, adding the fast tremor component, and mapping the x50 amplification through tanh soft compression; the CURRENT drift coefficient was rebalanced (x50 x 0.05) for the wider channel range. Re-rendered at all sizes; determinism re-verified.

## Deviations

- The breath "radial pulse" is rendered as layered-alpha stroked rings plus one flat alpha disc instead of any radial gradient — house rule, same visual idea.
- Drag lane selection uses the drag-start vertical third (top WAVEFORM, middle CURRENT, bottom BREATH) rather than tracking which drawn element is under the pointer; the lanes overlap spatially (rings behind everything, waveform crossing the current field), so region-of-origin is the legible mapping.
- Frame one shows a single breath ring: rings live 4.6 s against a ~5.5 s breath period, so one ring (occasionally two, occasionally none for a beat) is the honest steady state.
