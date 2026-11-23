# No.1550 "Atoms From Then to Now" (elissa-blount-moorhead EM7, PP797)

Gallery date: 2006 · 04 · 10 (formula date, recorded here only, never drawn in the piece).

## What it is

The frame is split by a faint vertical seam at 0.42 of the width into a
"then" side (left, deep cool grey #232830, dimmer) and a "now" side
(right, warm dark #2a2118, brighter). Twenty-six small particles drift
slowly left to right. On the left they are cool slate #7a8a9a and small;
as each crosses the seam it lerps over a short distance to warm amber
#e8b04b or gold #c9a86a at 1.6x radius, with a brief pale #f0e8d0 flash
exactly at the crossing. Crossed particles fade over the far right of
the frame (u in 0.86–0.98) and reappear on the left as cool particles.
The seam never moves on its own and the two sides never mix.

## Loop

240 s, closed-form. Each particle's horizontal position is
u = frac(x0 + laps * t / 240) with laps in {1, 2, 3} from a seeded
mulberry32 stream (seed 1550000), so every particle completes an integer
number of traversals per loop and t = 240 repeats t = 0 exactly.
Speeds at 720 px wide are 3, 6, and 9 px/s — slow, never rushing. Color,
radius, flash, and fade are all pure functions of position, so they
repeat with it. Drags are recorded sessions folded into the position
function; a released drag decays back to schedule (3 s for particles,
2 s for the seam), so the loop still closes.

## Drag

- Particle drag (press within ~22 px of a particle): while held, that
  particle's clock runs at 3x, so its crossing comes sooner; other
  particles are untouched, and the flow never reverses. On release the
  boost decays linearly to zero over 3 s and the particle resumes its
  schedule exactly.
- Seam drag (press within ~16 px of the seam): the seam bends by the
  drag delta (clamped to ±0.03 of the width) with a gaussian falloff
  around the drag height, so only particles crossing near the bend
  shift their path. On release the bend decays linearly to zero over
  2 s and the seam springs back straight. Backgrounds are never touched,
  so a drag can never flood a side or remove the seam.

## Adaptations and readings

- Canvas 2D only; fully silent; no gradients, no Path2D, no offscreen
  canvas, no localStorage, no text except the title.
- Fixed-phase first frame (draw(0)); rAF loop as a plain function
  declaration, anchored on the first callback.
- Fading alphas rounded to 4 decimals before stringifying.
- Particles drawn as individual beginPath arcs (never batched subpaths).
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback; the field
  composition goes full-bleed on phones.
- No top-level W/H names (the QA renderer declares them in its eval
  scope); the piece uses VW/VH.
- The seam x is rounded to an integer pixel: a fractional split left
  the boundary column semi-transparent after the two background rects,
  so a redraw over a previous frame composited differently from the
  first paint and broke loop closure by one green-channel byte. The
  integer seam keeps every background pixel opaque, and all later
  alpha blends are deterministic across redraws.
- "Hurries its crossing" is realized as a 3x clock while the particle
  is held (the pointer need not steer the particle's position); the
  particle still follows its own path, only faster.

## QA

probe-1550.js (vm-isolated, real node-canvas, driving the piece's own
rAF loop with a dummy anchor call) — all 25 checks pass:

- Frame one identical across fresh instances; loop closure byte-identical
  at t = 240 and t = 480.
- Particle 0 drifts left to right monotonically (mod 1, no reversal);
  speeds varied, all in [2, 10] px/s at 720.
- Left-side particle is cool slate at base radius; right-side particle
  is warm at 1.6x radius; flash above 0.7 within |d| < 0.002 of the seam
  and below 0.05 beyond |d| > 0.05.
- Crossed particle fades in u in (0.88, 0.96), is invisible past
  u = 0.985, and reappears cool on the left after wrap.
- Seam x and effective seam constant at all sampled times without
  drags; corner background pixels exact at all times.
- Particle drag hurries the crossing, leaves other particles exactly
  untouched, resumes the schedule exactly after release + ease-back,
  and never reverses the flow.
- Seam drag bends the seam by the drag delta, shifts only nearby
  crossing paths (far effective seam within 2 px of base), keeps the
  seam drawn and both backgrounds exact, and springs back to zero
  after release.
- Thumb byte-compare: two independent 720x720 renders byte-identical
  to the shipped thumb. Forbidden-API grep: 0 hits.

## Fix rounds

1. Piece fix (gate-caught by the probe): loop closure failed by a
   single green-channel byte at the seam boundary column. Cause was
   the fractional seam x (0.42 * 720 = 302.4) leaving that column
   semi-transparent after the two background rects. Fixed by rounding
   the seam x to an integer pixel; loop closure then byte-identical.
2. Probe-side corrections only: the drag test now scans for a
   (time, particle) approaching the seam instead of assuming one at
   t = 5, and a stale variable reference from that restructure was
   removed. No piece change in either case.
