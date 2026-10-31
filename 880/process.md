# No.880 Murmuration

Study #108 bnsh_av, PP41 "Murmuration Field". Title suggestion shipped: "Murmuration".

## Concept

His "boids" reel: a few hundred small white triangular particles on solid black,
moving through three recurring phases: dispersed loose drifting streams, a dense
vertically-elongated swirling cluster near center, and a compact elongated
horizontal flock streaming like a starling murmuration. The piece is that flock,
live and monochrome: every bit of beauty comes from the flock's own motion.
Density reads as brightness; there is no color, no shading, no second flock.
The only text is the prompt-specced phase readout at the bottom edge
(SCATTER / VORTEX / MURMURATION), small and quiet.

## Construction

- Single self-contained index.html, canvas 2D. Palette is exactly two tones:
  pure black #000000 and particle white #FFFFFF at varying alpha. No gradients,
  no shadowBlur, no ctx.filter, no offscreen canvas.
- Simulation space is measured in units of the min viewport dimension, so the
  composition scales across sizes. Canvas size comes from the Visual Viewport
  API with resize listeners on visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection via
  window.screen physical size (min dimension < 700px), aspect h > w*1.15 as
  fallback only.
- Boid model: 380 agents on desktop, 220 on phones. Classic Reynolds rules
  (separation / alignment / cohesion) with per-phase weights, a per-boid seeded
  wander (phase offset + rotation rate drawn at seed time), and a gentle global
  flow term that keeps scatter streams coherent. Neighbour tests use the
  minimum-image convention on a wrapping field, so streams cross edges cleanly.
  Agents render as small triangles oriented to velocity, alpha by speed.
  Frame one is seeded as five loose stream bands with shared drift directions,
  so the first frame already reads as drifting streams, not random scatter.
- Phase machine: a pure function of a phase clock. Three 24 s phases
  (SCATTER, VORTEX, MURMURATION); weights blend with a smoothstep over the
  first 3 s of each segment. SCATTER has no attractor and high wander. VORTEX
  applies an anisotropic spring to the center (weaker restoring force in y, so
  the cluster elongates vertically) plus a tangential swirl term. MURMURATION
  moves the attractor on a slow 40 s figure-eight and adds a feed-forward of
  the attractor's own velocity, with the strongest cohesion and alignment, so
  the flock streams as one compact body. Phase-dependent max speed, cohesion,
  alignment and wander are blended from the same weights.
- Interaction (RETHINK rule: the flock is a system to disturb, never a button):
  drag becomes a gravity well that streams the flock into an orbit; the well's
  strength ramps in over 0.25 s and overrides the phase attractor, the orbit
  ring radius shrinks with drag speed (fast = tight, slow = wide), and on
  release the well fades over 2 s while the autonomous cycle resumes. Tap fires
  a recorded shockwave pulse: an expanding radial band force that scatters the
  flock, which then regathers on its own forces. Double-tap locks the current
  phase: the phase clock freezes (snapped to mid-segment so the hold is the
  pure phase) until the next double-tap releases it. Tap and double-tap are
  disambiguated with the house 260 ms pending-tap window; taps are only tap-like
  gestures (short, near-stationary), so drags never misfire as pulses.
- Audio: lazy, created only inside the first pointer gesture, typeof-guarded,
  never required by the visuals. A soft airy band-passed noise bed; per-phase
  voices driven from the same phase weights (SCATTER: sparse high sine ticks;
  VORTEX: a sine sweep that rises across the phase segment; MURMURATION: dense
  short noise grains); a low hum under the drag well whose pitch follows the
  smoothed drag speed and whose gain follows the well strength.
- Determinism: frame one is the synchronous draw at t=0 from the seeded flock
  (mulberry32, seed 880041). The simulation advances at a fixed timestep
  (DT = 1/60) from that seeded state plus recorded events (pulses, locks, drag
  samples); the phase clock is a function of stepped sim time and recorded
  locks only. No Date.now anywhere; frame one never derives from a wall clock.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  renders cleanly in total silence (no AudioContext in the harness).
- Determinism gate: thumb.png rendered twice and cmp byte-compared: identical.
  The duplicate was deleted.
- Read-back, desktop and thumb: pure black field, hundreds of small white
  arrowheads in loose coherent drifting streams across the frame, alpha varying
  with speed, SCATTER readout small and quiet at the bottom center. No color
  anywhere, no clipping.
- Read-back, mobile (phone path, 220 boids): same stream composition held in
  the tall frame, readout legible at the bottom, nothing clipped.
- No fix rounds were needed.

## Deviations

- None from the prompt's substance. Two implementation choices worth recording:
  (1) the phase-lock double-tap snaps the phase clock to the middle of the
  current segment, so a lock taken during a 3 s blend holds the pure incoming
  phase rather than a frozen half-blend; (2) the field wraps at the edges
  (minimum-image neighbour math), which keeps scatter streams continuous across
  the frame boundary instead of bouncing them off invisible walls.
