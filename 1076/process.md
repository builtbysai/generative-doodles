# №1076 — The Stack

Momoko Nishimoto study block MN5 (PP237): the 24 Drone Flight still as composition.
Three vertical columns of drone pairs hang in a bright gray studio void, holding
altitude against drift. The stack is the subject: vertical order, held.

## Composition

- Void `#E9E9E7` (daylight studio gray, full-bleed; page ground matches).
- Three columns at 1/4, 1/2, 3/4 of frame width. Each column is 2 pairs of
  drones (4 per column, 12 total); pairs separated by exactly 25% of frame
  height, upper pair higher. No performer.
- Drone frames `#131315`: X-arms, four rotor discs with spinning blades, dark
  body, orb on a short mast above — layered flat-alpha circles in `#CFE8FF`
  (0.10 spill / 0.22 halo / 0.95 core / white center), gently pulsing.
- Thin altitude lines at each pair level with tiny mono labels in `#8A8A88`
  at 0.7 — "ALT 14.2m" etc., the live slot altitude ((1 − y) × 16 + 3 m).
  The only visible text besides the title, as specced.

## Motion and interaction

Everything is a closed-form function of time and recorded events; no state is
frame-integrated.

- **Watch-only core:** each drone micro-corrects around its seeded slot with
  small sine offsets whose frequencies are integer cycles of the 60 s loop,
  so the loop is seamless. Station-keeping, not flocking.
- **Drag = wind:** pointer velocity is recorded as impulse events. Each drone's
  lean is the sum of damped-spring impulse responses (exp decay × sine, per-drone
  gain and delay), clamped — the drones lean into the stroke and the springs
  pull them back to their columns. They never scatter.
- **Tap = restack:** a recorded event collapses all columns to one altitude
  over 1.1 s, then re-forms at new seeded heights over 1.5 s. Slot layouts are
  resolved by folding the event list, so the animation is analytic.
- **Double-tap = new airspace:** reseeds column slot heights with a 1.6 s
  analytic blend, and advances the micro-correction phase seed.
- Never click-to-reload.

## Audio

Lazy and gesture-gated: the first pointerdown creates a typeof-guarded
AudioContext (silent before that, no microphone ever). A looped noise buffer
through a bandpass gives a soft rotor wash; a 58 Hz sine plus its harmonic is
the low holding tone. Wind magnitude (mean lean) raises the filter frequency
and gains, so the tone wavers while the stack resists a gust.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style width/height pinned in draw();
  phone detection via window.screen (min dimension < 700) with aspect fallback.
- Determinism: first frame drawn synchronously at fixed phase t = 20 s; the
  rAF loop (typeof-guarded) anchors to that phase plus elapsed time.
- No canvas gradients, no offscreen canvas, no createElement, no ctx.filter,
  no shadowBlur. Orb glow is layered flat-alpha circles.
- QA: desktop 1280×800, mobile 390×844, thumb 720×720 rendered twice with
  render-piece.js and byte-compared — identical.
