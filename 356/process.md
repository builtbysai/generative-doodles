# No.947 "Weather Inside the Machine"

Study #116 refikanadol, PP108 "The Room Responds" (Unsupervised's site-specific discipline: the work reads its room).

## Concept

A PP105-style latent-walk dreamscape (particles advected by curl noise, molten trail buffers on black) whose parameters are driven by the environment instead of a fixed design:

- The local clock owns the palette. Hue temperature is interpolated by minute of day through keyframes: night #1A2A8C (00:00), dawn #FFD166 (06:00), noon #27E6FF (13:00), dusk #FF2A9D (19:00), back to night. The piece looks different at 6am and 11pm because it is a different piece at 6am and 11pm.
- The calendar owns the weather's base. A smooth annual wave over the day of the year sets base turbulence; a seeded "room weather" value modulates turbulence, global brightness, and a slow drift direction.
- A thin hand-style strip at the bottom makes the environment legible, legend-first: "00:53 · night drift · room calm". Tap toggles the strip's second half to the turbulence reading ("turbulence 0.50 · day 305 of the year"); drag sends a gust front through the field; double-tap reseeds the room character only, the clock keeps running.

## Construction

- Engine: 2,200 particles (1,500 on phones) advected by the analytic curl of a 2-octave value-noise potential (permutation-table lattice, derivatives computed in closed form, sample coordinates drifting slowly so the field itself evolves). Each particle carries an 18-position trail buffer drawn fresh each frame as two fading polyline passes plus a near-white head; no canvas-fade, no offscreen canvas, no gradients, no shadowBlur, no ctx.filter.
- Sim: fixed timestep at 120 Hz from a mulberry32-seeded initial state; frame one is the state after exactly 3,000 synchronous pre-roll steps (25 s) at load. Pointer events are recorded with sim-step stamps and consumed in step order.
- Environment model: env = { minuteOfDay (integer, from the real local clock), dayOfYear (real date), roomNoise }. Room weather is `hash01(dayOfYear, hourBlock, 9470 + roomGen * 131)`, giving a value in [0,1) that maps to a 0.7-1.3 room factor, a brightness of 0.72-1.22, and the drift angle. Turbulence target = clamp(annualWave(dayOfYear) x roomFactor, 0.25, 1.6); the sim relaxes toward it. In the live piece the env is re-read every 30 frames; because minuteOfDay is minute-quantized and the room is hour-block-seeded, nothing changes inside a minute.
- Clock adaptation (house rule): all env drivers are quantized (minuteOfDay integer; room seeded by day + hour block), so frame one is reproducible inside the minute for the byte gate. The thumb is a minute-stamped snapshot of the current weather, exactly like the Turrell/Irwin clock pieces.
- Gusts (drag): each drag segment records {step, origin, direction, magnitude}; in the step loop a front travels from the origin along the direction at 210-380 px/s, applying a Gaussian band force (lateral falloff 340 px) that decays as exp(-age/5) and is gone by 15 s, so the room settles.
- Sound: created lazily inside the first pointer gesture, typeof-guarded throughout. Two detuned sines (48 Hz / 48.7 Hz) through a lowpass whose cutoff follows the temperature's warmth ((r - b) mapped to 160-2360 Hz; warm = open, cold = closed). The piece renders complete in silence.
- Viewport: size from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px on every draw; phone detection via window.screen physical size (min dimension < 700 px) with the h > w*1.15 aspect fallback.

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844, and 720x720. All renders produced on this VM on 2026-11-01 between 00:52 and 00:53 UTC (Sat 2026-10-31 20:52-20:53 EDT local): the VM clock is UTC, so the snapshot shows the night keyframe.
- Final frame one (thumb, 720x720, rendered 00:53 UTC): black field webbed with curl-vortex trail contours in deep night blue (#1A2A8C blended toward head white #F4F7FF), bright particle heads, strip reading "00:53 · night drift · room calm". Env snapshot for that minute: dayOfYear 305, roomVal 0.289 (room calm), turbulence target 0.505, brightness 0.864. Desktop and mobile show the same weather at their sizes; the mobile strip fits on one line and nothing is clipped.
- Determinism gate: thumb.png rendered twice within the same minute (00:53 UTC) and byte-compared with cmp: IDENTICAL. The duplicate render was deleted. (First alpha pass was strengthened before the final renders: trail alphas 0.10/0.20 to 0.14/0.27, heads 0.75 to 0.85, after the first read-back showed the night frame reading sparser than the molten-trail intent; re-rendered and re-verified after the change.)
- Silence: no AudioContext exists in the QA renderer; the piece renders fully without it (all audio code is behind the first-gesture lazy init).
- Microphone: grep-verified zero occurrences of getUserMedia in index.html; also zero shadowBlur / gradient constructors / createElement.

## Deviations

- Microphone omitted entirely (house gallery rule). The prompt's optional mic input (default OFF, with toggle) is not implemented: no getUserMedia anywhere. The strip's tap toggle switches between the room reading and the turbulence/day reading instead of a mic-energy reading. Recorded per the brief's instruction.
- Trail rendering draws the 18-position history buffers as two alpha passes rather than the prompt-family canvas-fade technique; this is the house rule for this gallery (deterministic frame one, no accumulation state).
- The QA snapshot renders at the VM's UTC night rather than the EDT evening dusk the brief anticipated, because the piece honestly reads the clock of the machine it runs on; on a visitor's machine it reads their local time. This is the sanctioned clock-piece behavior, recorded here so the gate does not mistake the deep-blue thumb for a palette bug.
