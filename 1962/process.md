# №1962 Camera 07

CW3 / PP1209, study #256 caius-williams. Gallery date 2007 · 05 · 27 (formula date 2002-01-10 + 1963 days). Gallery note: "Five detuned bass drones swell in a dim CCTV room under a paper moon, timestamp ticking. Watch the room." Interaction: watch-only. Hint in piece: "Watch the room."

## What it is

A surveillance camera wide shot of a crowded dim room. Five double basses stand left, right, center, and two in the crowd. Each bass carries a low drone that swells and recedes on its own detuned period (23, 31, 37, 43, 53 seconds), shown as a phosphor glow ring that breathes around the instrument plus five faint wave lines near the floor. A paper moon hangs top right on a string, swaying slowly. Thirty seeded crowd silhouettes drift across the lower room. The timestamp ticks in the lower right, CAMERA 07 sits top left, REC blinks top right at 1 Hz, corner brackets frame the shot, scanlines and 7 Hz camera static cover the frame.

## FIRST_T

FIRST_T = 47 s. At t = 47 the drones are mid swell (bass 1 near peak, bass 4 near trough), the crowd has drifted off its start pose, and the timestamp reads 06-11-2025 19:24:49. The first frame is drawn from this fixed phase, never from a wall clock.

## Palette

- Room green gray #232b26, wall #2e3831, floor #171d19
- Timestamp phosphor green #7fd08a, dim phosphor #5d9a68
- Paper moon white #f4f1e6
- Crowd shadow #10140f and #1c241d
- Bass wood #5a4a33, dark wood #3d3222
- Breath white #e8ece4, REC red #e05a4e

## Interaction

Watch-only. No click, drag, or reload behavior. The drones phase in and out on their own cycle, the crowd drifts, the timestamp never stops.

## Technical

Self-contained index.html, canvas 2D only, no external assets. Visual Viewport sizing with resize listened to on visualViewport and window. Canvas element pinned in draw() via canvas.style.width/height in px. Phone detection via window.screen (min dimension under 700px) with aspect fallback (h > w*1.15). Field-like composition: full-bleed on phones, square on desktop. One synchronous frame at load; requestAnimationFrame guarded with a typeof check. prefers-reduced-motion shows the still first frame. Flicker ceiling: static at 7 Hz, REC at 1 Hz, drones at 23 to 53 s periods, crowd drift near 0.05 Hz, all under 14 Hz by construction. Alphas rounded to 4 decimals. Each bass body lobe is drawn in its own beginPath so the node-canvas ellipse quirk cannot join shapes. QA hooks: window.__draw(t) and window.__piece1962 with timestamp(t), amps(t), cycle, firstT. Probe hooks ?t= and ?seed= set the virtual clock at load.

## Deviations from the prompt

- Timestamp is a fixed timeline, not a real clock overlay. The prompt prescribes a real clock, but determinism wins: the timestamp renders from 06-11-2025 19:24:02 plus the fixed timeline t, so frame one is reproducible and the byte gate holds.
- Audio is not built. Per the Franke audio rule the prompt's WebAudio is visual-only: the five drones run as a closed-form sound model (sine LFO swells with detuned periods), no autoplay audio.

## Probes

- Desktop 1280x900, mobile 390x844, thumb 720x720 rendered from the actual script with node ~/workspace/tools/render-piece.js. All three inspected visually: overlays legible, timestamp reads 06-11-2025 19:24:49 at FIRST_T, mobile fills the viewport with the hint pill clear of the timestamp.
- Determinism: re-rendered the 720x720 thumb at t = 47, md5 identical to the first render (4a054423470f4774f85e1acb38c4c561).
- Motion: render at t = 80 differs (md5 d531c0f87f065dc5961e8f2d7a73a2fb). Timestamp reads 06-11-2025 19:25:22, REC dot on, drone glow rings resized, crowd heads shifted.

## Fix rounds

None. First build passed the gate on all three sizes with no rework.

## Warts

- The basses read as stylized upright basses; at small sizes the body lobes can suggest a guitar shape, but the long neck, scroll, and four strings keep the double bass reading.
- Crowd shoulders are simple half-ellipse silhouettes, so some heads sit slightly high above their shoulders at the back rows.
- The drone glow rings overlap heavily on desktop where the center bass sits between the side basses; the overlap reads as shared light rather than five separate rings.
