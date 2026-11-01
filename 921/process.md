# No.921 "On Standby"

Study #113 miriam_quick, PP82 "Ten Hours of Standby" (Miriam Quick, "On Standby", 2024).

## Concept

Seven volunteers' overnight devices, drawn as seven sleeping lanes on a near-black ground. Nothing in the piece moves faster than a heartbeat: it is designed to be slept to, the room at 3am. Each lane is one device's night. When a device draws power, even just a trickle, a soft mint pulse of light lives on its lane: brightness is wattage, length along the lane is draw duration. Warm white appears only on fast transient peaks. No numbers are shown anywhere; the trickle is felt, not read. A small caption at the bottom states the compression plainly: "10 minutes = 10 hours".

## Construction

- **Time model.** One seamless 600 s loop stands in for the 10 hours, so 1 loop-second equals 1 real minute. The lane is the night itself: the left edge is lights-out, the right edge is morning, and an event's position and width on the lane are its start time and duration mapped onto the loop. A bright head travels the event's segment while the draw runs, and the segment afterglows with an exponential decay (tau 20 s, gone by 130 s) once the draw ends, so the loop wraps without a cut. The loop starts at loop-time 300 (PHASE0), the middle of the night, so frame one is mid-night.
- **The seven profiles** (synthesized, all in loop seconds; captions verbatim):
  1. `fridge`: 90 W square cycles, 30 on / 30 off, phase 45, so the on-window [285, 315] holds loop-time 300 with its head at mid-lane. The loudest thing in the house and still just a slow breath.
  2. `router`: a constant 6 W trickle all night (one wrap event), the lane faintly lit end to end with its head sweeping.
  3. `phone charger`: one spike to 15 W early in the night ([35, 50], spike-flagged), then nothing. Dark at frame one, its spike long past.
  4. `tv`: standby flicker: seeded short draws of 4-14 s at 1.1-2.2 W with 3-18 s gaps, covering the night unevenly.
  5. `games console`: 8 W standby all night, plus three update bursts ([120, 150] at 34 W, [310, 335] at 28 W, [470, 505] at 38 W, all spike-flagged).
  6. `laptop`: 3 W sleep all night, plus four brief wake spikes at 12 W ([80, 86], [205, 211], [388, 394], [512, 519], spike-flagged).
  7. `smart speaker`: 4 W steady all night, plus tiny query blips at 9 W (2-4 s); one blip at [297, 300] is live at frame one.
- **Brightness.** Alpha is `0.10 + 0.90 * (w/90)^0.65`, so the 90 W fridge is the one full-bright pulse and everything else is a fraction of it. Glow is two layered strokes (a wide pass at 0.16 alpha, a narrow core at 0.85) drawn with the `lighter` composite; no gradients, no shadowBlur. Spike-flagged events (fast transient peaks: the charger spike, the console bursts, the laptop wakes) draw their core and head in the warm-white spike color; sustained draws, including the fridge, stay mint.
- **Interaction.** Drag toward a lane to listen closer: the nearest lane's multiplier ramps to 2.6 over 0.8 s while the others dim to 0.45; on release the multipliers decay back to even with a 2.5 s time constant. Tap a lane to leave a trickle: a small visitor pulse starts at the lane's left edge and crosses in 24 s with a sine envelope. There is no double-tap action. Drag episodes and taps are recorded event lists; lane amplification and visitor pulses are closed-form functions of the time and those lists, and a tap cancels the drag episode it began as, so the two gestures never stack.
- **Sound.** Audio starts only on the first pointer gesture (lazy, typeof-guarded AudioContext). Each lane owns a low sine hum (fridge 50, console 51, charger 52, router 55, laptop 57, tv 58, speaker 60 Hz) whose gain follows the same draw function that lights the lane, capped very low (0.055 at a full 90 W), scaled by the drag amplification, and all seven hums share one lowpass at 420 Hz: the room. A tap adds a soft band-passed click and a brief swell on that lane's hum. Without a gesture the piece is silent and complete.
- **House mechanics.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw() every frame. Phone detection via window.screen's smaller dimension (< 700 px) with the h > w*1.15 aspect fallback. Seeded randomness is mulberry32 only, used at init for the tv flicker and speaker blip placement. Frame one is the synchronous draw(0) at the fixed phase offset; no Date.now() anywhere. No offscreen canvas, no ctx.filter, no em dashes. Visible text is only the seven device captions and the compression caption; the title is "On Standby".

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). The piece renders cleanly in silence (the harness has no AudioContext; all audio paths are guarded).
- Determinism: thumb.png rendered twice and compared byte-for-byte with cmp: identical.
- Desktop frame one (mid-night): seven faint baselines with their captions at the left; the fridge lane carries the one bright soft mint pulse at mid-lane; the router lane is faintly lit along its whole length; the smart speaker lane shows its steady faint line with a small blip near the middle; tv, console, and laptop sit at faint standby levels; the phone charger lane is dark; the compression caption sits small at the bottom center.
- Mobile frame one: lanes span the width, captions shrink to 8.5 px and stay clear of the baselines, the fridge pulse and the faint lanes read the same, nothing clipped.

### Deviations

- **Spike color reading.** The prompt calls the warm white the color of "the highest-draw moments" and names the charger spike and console bursts as its examples, while the frame-one description keeps the 90 W fridge mint. I therefore flag spike-ness as a property of fast transient events (charger spike, console update bursts, laptop wakes) rather than a pure wattage threshold: sustained draws stay mint at whatever brightness their wattage earns, transient peaks flash warm white. Recorded here so the reading is explicit.
- **Pulse travel reading.** The prompt has a pulse "travel the lane" with width equal to draw duration. The lane here is the night timeline, so a pulse's segment is fixed at its true time position and width, and what travels is the bright head sweeping the segment while the draw runs, followed by the afterglow. This keeps position honest (a 3am draw lights at 3am's place on the lane) while preserving the motion, and it makes the router's all-night trickle read as a whole faintly lit lane, as the frame-one description asks.
- **Loop length.** Her broadcast ran 10 hours; the piece states her own compression in its caption and loops at 600 s, per the prompt's technical approach.
