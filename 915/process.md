# No.915 — UFO

Study #112 duncan_geere, PP76 "The Station Oscillator" (Geere's Norns script "UFO", 2023: an ultra-low frequency oscillator powered by the International Space Station).

## Concept

The station itself is the instrument. A dark sky holds one small partial Earth disc at the lower left, a thin orbit ring arcing across the frame, and the ISS as a single bright dot traveling the ring with a short fading cyan trail. Beneath, in the bottom third, the oscillator's waveform is drawn as a scrolling cyan sine. A tiny monospace telemetry line at the top-left (the only text besides the title) reads the live altitude and velocity. Everything drawn is a primitive: disc, arc, ellipse, dot, sine. No photo, no planets, no decoration.

The discipline is slowness: one orbit takes 92 seconds. The piece is watch-only at its core; the hand can ping the station, bend its orbit briefly, or send it once around in a fast pass, and then the sky goes back to its own pace.

## Construction

Single self-contained `index.html`, canvas 2D, strict seven-tone palette (sky #050810, earth #0E1626, limb #1E3A5F, ring #2A3A55, station #FFFFFF, cyan #7DF9FF, text #4A5A75). Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; `canvas.style.width/height` pinned in px inside `draw()`; phone detection via `window.screen` min dimension < 700px with aspect fallback (h > w*1.15), which only shrinks the telemetry type. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

Orbit/telemetry model (all closed-form in the piece's own elapsed time t; nothing reads the wall clock):

- Orbit: ellipse centered on the Earth center (0.09W, 0.74H), radii 0.46W x 0.30H. Station angle theta(t) = theta0 + 2 pi t / 92 + pass offsets, with theta0 = -0.30 pi so frame one catches the station about 40% around the ring, upper arc, trail behind it. The trail is not stored history: it is the same orbit function evaluated at theta - k*step for k = 1..14, drawn as segments with falling alpha.
- Telemetry: altitude = 408 + 8 sin(2 pi t / 46 + 0.9) km, one full altitude cycle per half orbit (46 s), range 400-416 km. Velocity = 7.66 + 0.05 sin(2 pi t / 46 + 2.0) km/s, same phase family, offset. Frame one reads ALT 414.3 KM, VEL 7.71 KM/S.
- The drawn waveform's cycle count (2.5-5.5 across the width) maps from altitude; its amplitude maps from velocity. The audio oscillator (below) takes its frequency from the same altitude value: 400 km -> 40 Hz, 416 km -> 90 Hz. One telemetry, three readouts: numbers, wave, voice.
- Earth: filled disc (radius 0.135 * min(W,H)) clipped by the left edge, a limb arc and a fainter inner arc in the limb tone, drawn over the ring and waveform so the disc occludes them like a body in front.

Interaction (recorded events; every visual is a function of t plus the event lists):

- TAP = the ping. Taps are derived at draw time: a lone tap draws an expanding cyan ring from the station's position at the ping moment (the station flies on; the ring stays where the hello was sent) and sounds a soft blip.
- DOUBLE-TAP = the pass. Two taps within 0.35 s are re-derived as one pass: an eased 2 pi is added to the orbit angle over 6 s, so the station laps the Earth once and settles back onto its stately schedule.
- DRAG = gravity. The most recent drag bends the ring: each orbit point is pulled toward the drag's last position with a Gaussian falloff (sigma 0.35 * min(W,H), max pull 0.05 * min(W,H)); the weight ramps in over 0.3 s while dragging and decays with tau 1.5 s after release, so the path warps toward the finger and relaxes back. The station rides the same warped function, so it never leaves its ring.

Audio (lazy, gesture-gated, typeof-guarded; the piece renders complete in silence): the AudioContext is created on the first pointerdown only. A single sine oscillator runs continuously afterward, frequency set from the altitude mapping each frame, gain 0.03-0.06 following the velocity factor. During a pass its frequency glides up an octave and back, mirroring the visual fast-forward. The ping is a short sine blip (920 -> 520 Hz) through a feedback delay (0.27 s, feedback 0.32, wet 0.4): one hello, echoed. No microphone input.

Determinism: frame one is the synchronous draw(0) — fixed theta0, fixed telemetry phase, no events. The rAF loop (typeof-guarded) measures t from a load-time performance.now() offset; telemetry is a function of that t only, never of Date.now().

Deviations, with reasons:

1. The ping's sound fires on the tap's release, before the draw-time derivation can know whether a second tap will convert the pair into a pass. The visual derivation is exact (paired taps show no ping ring), but a fast double-tap may still sound the first blip before becoming a pass. Recorded rather than engineered around: delaying every ping by 0.35 s to check for a partner would make the common lone ping feel late, and the blip reads as part of the pass's launch.
2. The prompt's trail is specified as a fading polyline of recent positions; it is computed analytically from past orbit angles instead of stored positions. Visually identical, and it keeps the whole frame a closed-form function of t plus events.
3. Earth radius is 0.135 of the smaller dimension rather than a larger disc, so the disc stays small and partial as specced even on tall phone frames.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece renders cleanly in total silence (no AudioContext in the harness; all audio paths guarded).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp — identical, verified after the final edit round as well. Duplicate render deleted.
- Desktop read-back: near-black sky; telemetry line top-left reading "ALT 414.3 KM · VEL 7.71 KM/S"; small dark Earth disc lower-left, clipped by the left edge, limb arcs in the blue limb tone; thin orbit ellipse arcing across the frame and off the lower edge; bright white station dot on the upper arc with a cyan trail segment behind it; cyan waveform scrolling along the bottom, passing behind the Earth. Nothing clipped.
- First render round: the Earth read too large (radius 0.17 of min dimension) against the spec's "small, partial". Reduced to 0.135 and nudged to (0.09W, 0.74H); all renders redone and the byte-compare rerun green.
- Mobile read-back: telemetry legible at 10px mono; the orbit becomes a tall ellipse with the station on its upper-left arc, trail visible; the Earth sits lower-left as a dark partial disc marked by its limb arcs (low contrast by palette: earth #0E1626 on sky #050810); the waveform runs along the bottom with more cycles across the narrow width. Nothing clipped.
