# No.872 "No Input"

Study #107 xu-jared, PP33 "The Self-Feeding Desk": her no-input mixing board, outputs patched back into inputs, feeding on itself.

## Concept

A mixing desk with nothing connected to it still hums, breathes, and occasionally howls, because its output is its input. The piece is that desk as a field of light. A square of desk black holds flowing signal: phosphor-green filament rivers that are the loop's stable tone. Nothing is played into it and nothing is sampled from outside. The field only ever re-reads itself, so every disturbance, including the visitor's, becomes the property of the loop and is digested on the loop's own schedule. Sometimes the field settles into a slow breathing band; sometimes a patch of it flares feedback red and the system's own damping takes seconds to tame it back down. You never command it. You accompany it.

Interactions, all of them disturbances rather than controls:

- Drag: a knob twist. An amber fader line trails behind the hand (the desk answers late, on purpose) and injects gain where it passes. Release it and the fader dissolves back into the loop, which re-stabilizes in its own time, three seconds or thirty.
- Tap: a fader push. One clean pulse enters the loop at the tap point and recirculates, decaying over many seconds.
- Double-tap: a fader pull. The field drains toward silence, then re-boots itself from its own residual noise floor.

Sound, started only by the first gesture, is a real self-feeding WebAudio network (see Construction), so the hum you hear and the rivers you see are two readings of the same loop.

## Construction

Single self-contained index.html, canvas 2D, strict five-tone palette: desk black #0A0A0A, signal green #33FF66, howl red #FF2200, fader amber #FFB000, CRT white #E8E8E0. No text except the title. No external assets, no microphone, no input of any kind from outside the system.

### The feedback model

The loop is a closed simulation on a 48x48 energy field plus roughly 820 filament particles (520 on phones), run at a fixed timestep of 1/60 s from a seeded state (mulberry32):

- Particles stream left to right. The field's vertical gradient pulls each stream gently toward the nearest energy ridge, so streams hug the river bands; local energy sets stream speed. As a particle passes it deposits a small amount of energy into the cell under it. The stream feeds the field it rides, and the field steers and re-energizes the stream. That two-way coupling is the feedback.
- Each step the field diffuses toward its neighbor average and decays. Cells above the howl threshold (energy 1.15) decay much faster, which is the desk taming its own howls: a flare is a burst the system needs seconds to absorb, and while it lasts, particles crossing it draw red (white above 1.8, the rarest shimmer). Below the threshold the draw color is phosphor green with alpha from local energy.
- The field has a floor, not a zero: decay bottoms out at the desk's own hiss level, so the loop can always re-find itself after a drain.
- Visitor input is recorded as injection events and applied by the simulation step, never drawn directly. Drag gain is applied at a smoothed fader position that lerps toward the pointer at 0.055 per step, so the injection physically lags the hand; the amber fader line is drawn from that same lagging trail and fades over 1.6 s after release. Tap queues a single Gaussian pulse. Double-tap schedules a drain (field scaled to 5 percent) followed by a five-second reboot ramp that re-seeds energy from the simulation's own seeded noise, capped low so the desk comes back up mumbling, not shouting.
- Frame one is an initial condition, not a snapshot of nothing: the field is seeded with three winding river bands, the particles are seeded into those bands, the sim pre-rolls 40 fixed steps so the rivers are developed, and a small hotspot is then laid in at the right edge at birth size, a flare just beginning (peak energy about 1.3, a few red cells and one hot core). Frame one is drawn synchronously from that state at t=0.

### Audio

Created lazily inside the first pointer gesture, typeof-guarded throughout, and silent in any environment without AudioContext. The graph is an actual feedback network: a looped seeded noise buffer and a low sine oscillator feed a bandpass filter; the filter output runs through a gain stage and a 0.23 s delay whose output is fed back into the filter input and also tapped to the master. A DynamicsCompressor acts as the limiter and the master gain is kept low. Every eighth animation frame the network's parameters are retargeted from the same field statistics that drive the visuals (mean energy and flare fraction set filter frequency, feedback gain, oscillator frequency, and master level), so when the field howls the desk audibly leans toward howling, and when it calms the hum settles.

### Adaptations and deviations

- Analyser-drawn visuals (per the prompt's technical sketch): the gallery renderer provides no AnalyserNode, and frame one must exist in total silence before any gesture. The visuals therefore read the simulation's field state directly, and the audio network is driven by that same state. Sound and image remain two readings of one loop, which is the substance of the requirement; only the metering point moved.
- Pixel readback feedback (the prompt's readPixels sketch): replaced by the field model above. The house renderer has no offscreen canvas or getImageData route for this, and a state model makes the loop provably closed and deterministic: every value in the system traces to the seed or to a recorded disturbance. No pixel ever enters from outside, which keeps the "provably self-fed" requirement intact.
- The prompt's filaments sample the previous frame's pixels; here they sample the field, which persists and evolves across frames in the same role.
- Audio feedback is a delay-line loop rather than a literal microphone-free desk patch cord, since a browser graph needs a delay to feed back without instant DC runaway; the loop gain is staged under the limiter so it can flare without ever clipping hard.

### House mechanics

Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width and height in px every frame. Phone detection uses window.screen physical size (min dimension under 700px) with the aspect fallback h > w*1.15 only when screen is unavailable. The field is full-bleed at every size and the page ground is the desk black. The rAF loop is typeof-guarded and steps the simulation with an accumulator capped at 8 steps per frame. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no getImageData anywhere.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), which provides no requestAnimationFrame and no AudioContext, so all QA renders are the synchronous frame one, drawn in silence.

- Determinism: thumb.png rendered twice at 720x720 and byte-compared with cmp after every tuning round; identical in all rounds, including the final one. No Date.now or Math.random anywhere in drawn state (grep-verified, along with shadowBlur, gradients, getImageData, createElement: all absent).
- Round 1 read-back (failed, fixed): curl steering around local maxima collapsed the rivers into discrete oval vortex rings and the deposit term (scaled by local energy) ran away into red flares everywhere. Rebuilt the flow as a base left-to-right stream with gentle vertical gradient-hugging, flat small deposit, faster hot-cell damping, and the white threshold raised to 1.8.
- Round 2 read-back (failed, fixed): rivers formed but single-file and sparse, and the seeded hotspot decayed below the red threshold during the pre-roll, so no flare was visible. Broadened the bands (sigma 0.028 to 0.045), seeded particles on each band's own center function, raised the particle count, weakened the gradient pull so streams keep width, and re-laid the hotspot at birth size after the pre-roll.
- Round 3 read-back (failed, fixed): a faint graph-paper grid showed across the tinted regions, an artifact of drawing the river bed as per-cell alpha rects at fractional cell widths. Removed the cell bed; river body now comes from a wide faint stroke pass under the thin bright pass of each filament. Flare cells kept (small area) but drawn as soft discs instead of squares.
- Final read-back: desktop 1280x900 shows three phosphor-green filament rivers winding across desk black with body and drift sparks in the quiet zones, and a small cluster of soft red discs with one hot core at the right edge, a flare just beginning. Thumb 720x720 shows the same composition. Mobile 390x844 takes the phone path (520 particles), rivers and edge flare intact, nothing clipped. No amber in frame one, as specced: the fader only exists while a hand is on the desk.
