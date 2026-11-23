# №1803 Seeing in the Dark (SC4, PP1050)

EXPANSION #236 robin-rimbaud. Gallery date 2006 · 12 · 19.
Gallery note: "A shaft, a cloud, and the echo of a carriage never seen. Watch only."

## What it is

A near-black vertical shaft in the central column, with eight thin
cool-grey floor lines evenly spaced down its height. Inside the shaft
drifts a cloud of 90 small particles, faint white with 10 dim cyan,
each leaving a short trail darker than its head. A carriage travels
the shaft on a fixed schedule and is never drawn; only its effect
shows, as the cloud bunches, scatters and echoes after each rebound,
then settles into thin layers during long pauses. Watch-only.

## Carriage schedule (closed form)

- 8 floors, floor f at shaft-height fraction 0.07 + f * (0.86 / 7):
  0.070, 0.193, 0.316, 0.439, 0.561, 0.684, 0.807, 0.930.
- Floor order per leg: 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1,
  then repeat. 14 legs per round trip, 196 s cycle.
- Each leg is 14 s: dwell 9 s at the floor, then a 5 s smoothstep
  travel (3u^2 - 2u^3) to the next floor.
- Rebounds (arrivals) happen at t = 14k for integer k.
- Carriage acceleration is the second derivative of the smoothstep
  during travel, zero during dwell. It is never drawn.

## Frame one (t = 60 s, fixed phase)

- Leg k = 4, leg time 4 s: the carriage is in dwell at floor 4
  (5th floor from the top, shaft-height fraction 0.5614).
- Last rebound at t = 56 s, when the carriage arrived at floor 4.
  Next departure at t = 65 s, arrival at floor 5 at t = 70 s.
- Particles are mid-echo after the t = 56 rebound and, 4 s into the
  dwell, are half settled toward their thin layers (settle weight
  1 - exp(-4/6) = 0.49).

## Particle model (closed form)

- 90 particles, seeded RNG mulberry32(1803 + 7). No Math.random,
  no wall clock in frame one.
- Each particle has a seeded home position, echo amplitude
  0.010-0.032 of shaft height, decay time 2.5-4.0 s, echo frequency
  1.1-2.0 rad/s, wander phases, radius 1.1-2.2 px, base alpha
  0.42-0.75. The first 10 particles are dim cyan (#7FA8B8); the
  other 80 are faint white (#EBF0F5).
- Echo: a delayed copy of the carriage field. Each rebound at t_r
  kicks the cloud 1.5 s later (the documented delay), ringing down
  as amp * exp(-age / tau) * sin(om * age + phase), signed by the
  arrival direction. Only rebounds within the last 20 s contribute.
- Settle: during a dwell the field is near zero and each particle
  drifts toward its nearest of 26 thin layers with weight
  1 - exp(-(t - last rebound) / 6), pulling 85% of the way.
- Wander: small seeded sinusoidal x drift, clamped inside the shaft.
- Trails: closed-form fading history polylines, 8 samples 0.18 s
  apart, drawn at 0.28x head alpha, so trails are darker than heads.

## Deviations from the prompt

- Trails use closed-form fading history polylines instead of fading
  framebuffer accumulation, per the adaptation flag in the brief.
  This keeps frame one byte-comparable.
- The cyan accent is 10 of 90 particles rather than a single one,
  so the dim cyan reads as a presence in the cloud at all sizes.
  No glow, no bloom, no drawn carriage, no literal architecture.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and
  window. Canvas pinned in draw() via canvas.style.width/height.
- Phone detection via window.screen (min dimension under 700 px)
  with aspect fallback (h > w * 1.15). Shaft is full-bleed height on
  phones (central column 66% of width); on desktop it is a centered
  column (min 300 px, 32% of viewport width) with the page ground
  set to the piece background near-black (#07080A).
- One synchronous frame at load; requestAnimationFrame calls guarded
  with typeof checks. Reduced-motion viewers get the fixed frame only.
- Title, date and "Watch only." hint drawn on canvas in plates.
  No em dashes in visible copy. No input handlers; watch-only.

## QA

- Rendered from the actual script with node-canvas:
  1280x900 desktop, 390x844 mobile, 720x720 thumb.
- Desktop: near-black shaft centered, 8 evenly spaced cool-grey
  floor lines, faint white and dim cyan particles with short darker
  trails, title/date plate top left, "Watch only." plate bottom left.
- Mobile: shaft full-bleed height, central column, same floor lines
  and cloud; plates legible.
- Thumb (720x720): shaft column and cloud read clearly at small size.
- Determinism: two desktop renders at 1280x900 are byte-identical
  (md5 6b92720debb523d1a709d55d0352ce44 both runs).
- Schedule check: at t = 60 the carriage is at floor 4 (y 0.5614),
  last rebound t = 56, dwell until t = 65, arrival at floor 5 at
  t = 70. No em dashes in index.html.
