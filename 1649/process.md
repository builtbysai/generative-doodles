# №1649 — A Theory of General Instability, No. 60 (HF2, PP896)

Study #217 HAL09999. Gallery date 2006 · 07 · 18 (formula
2002-01-10 + 1650 days). Gallery note draft: "A near-uniform field
condenses into filaments and voids. Tap to seed a new universe."

## Driver

A near-uniform field with a sub-1% irregularity grows its own
filaments and voids under an instability term.

## The piece

3,249 seeded particles start on a jittered lattice (the near-uniform
field; the jitter is the sub-1% inflation irregularity) and are
advected for a 60-second pre-history by a closed-form field: three
curl modes, four drifting growth wells plus a stronger off-center
core well with a tangential swirl, three void repulsors, a
deterministic hash-based thermal jitter, and a gas-pressure term
that pushes particles down the local density gradient. Frame one is
the universe at t = 60 s: filaments in electric blue and violet,
clumpy magenta cores, bright white knots where the local density
peaks, and black void bubbles that open where the field repels
matter. No void is ever drawn as a shape. Particle colour follows
measured local density on a 40x40 grid: sparse bins blue, mid bins
violet, dense bins magenta, densest bins (12 or more per bin) white.

The field keeps running live: the core and wells wander, the
filaments drift and rework, and the structure holds a steady state
instead of collapsing or dissolving. A tap deals the next seed from
a fixed eight-seed table and rebuilds a new universe with the same
physics; the page never reloads.

## Interaction

Watch-first and autonomous. Tap anywhere to seed a new universe
(pointerdown/mousedown, seed index advances through the fixed
table, index 0 at load). No click-to-reload, no settings, no audio.

## Determinism

Frame one is drawn synchronously at fixed phase t = 60 s after a
deterministic 150-step pre-advect (dt 0.4). All randomness comes
from mulberry32 with fixed seeds and from a hash of (particle,
step) for the thermal jitter; the rAF loop is anchored as the fixed
phase plus elapsed time since load. Grep-verified: no Math.random(),
Date.now(), createElement, or offscreen canvas calls in the code.
Thumb rendered twice with the QA harness: byte-identical
(md5 00b1db4f2cee918bc93ef7cd01703a1d).

## Acceptance criteria

1. Frame one (t = 60 s) shows a developed filamented field, not a
   uniform starfield: measured max bin 15 particles, 766 of 1600
   density bins empty (48%), 66 bins at 9 or more, core count 367
   within 0.12 of the core centre (uniform expectation about 147).
2. Voids emerge from the field: measured 0, 0, and 11 particles
   inside the three void discs of radius 0.06 (uniform expectation
   about 37 each).
3. The live field holds its structure instead of collapsing or
   dissolving: at t = 90 s max bin 35, core count 774; at t = 180 s
   max bin 41, core count 466, 678 bins empty. The t = 180 render
   visibly differs from frame one (core drifted, filaments
   reworked) while staying in the same statistical band.
4. Every tap seeds a different universe: seeds 1 and 2 measure
   max bin 16 and 18, core counts 372 and 377, with the densest
   bin at different positions from seed 0.
5. No click-to-reload; no em dashes in visible copy; motion is
   slow and flicker safe; reduced-motion visitors get the fixed
   frame.

## Deviations from the prompt

- The prompt names a 2.5-million-particle GPU system. Canvas 2D
  cannot run that; this piece runs 3,249 seeded particles through
  the same physics (closed-form curl field, growth wells, void
  repulsors), and the clumping is the point. Stated in the piece's
  header comment.
- The saturation mechanism is a gas-pressure term (density
  gradient pushes back, BETA 0.0004, tuned so a 10-count bin step
  repels at about 0.004 units per second) rather than fading
  wells: the growth term ramps in over the first 45 s and then
  holds at full strength, and the pressure is what stops runaway
  collapse. An earlier build that faded the wells instead dissolved
  the structure by t = 180 s.
- The box is periodic (positions wrap modulo 1) instead of
  clamped: the curl field is exactly period-1, so a particle
  leaving one edge re-enters at the opposite edge with the same
  velocity. Clamped walls trapped 342 particles in the corner bin.
- The white-knot threshold is 12 particles per bin, not 9: at 9
  the cores read mostly white; at 12 the magenta cores read
  magenta with sparse white knots.
- Void 3 holds 11 particles inside its r = 0.06 disc at frame one
  (the other two hold 0). The pressure term pushes a few
  stragglers in; it still reads as a black bubble against a
  uniform expectation of about 37.
- The core clump at frame one sits slightly high of the spec's
  (0.58, 0.44) anchor (densest bin at (0.6125, 0.4125), clump
  centred near (0.55, 0.35) in the render) because the core well
  wanders and the flow drags the clump; it remains slightly
  off-center as specified.

## What was avoided

No pretty space nebula: the beauty is the instability, so every
clump and void traces to the field (wells, voids, pressure,
diffusion), never to a drawn shape or a gradient. No uniform
starfield: the measured field is clumped at every scale probed.
No restarting the same seed: eight distinct fixed seeds, index 0
at load.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Desktop:
filamented magenta/blue/violet field, off-center core with white
knots, black void bubbles, title/date and hint plates legible.
Mobile: the same field stretched tall, core mid-frame, plates
legible. Thumb: same as desktop, reads clearly square. Interaction
probe (piece driven via window.__probe): reseed(1) and reseed(2)
produce visibly different universes with the same structure
statistics; advance(90) and advance(180) keep the field live and
in its statistical band. Two fresh thumb renders are
byte-identical.

Note on harness speed: the pre-advect takes about 280 ms as a
plain script (measured standalone) but about 7 s inside the
render-piece eval harness, which runs the same code unoptimized
(3.1 s in a vm context, 0.29 s as a file for the same loop). The
slowness is the harness, not the piece; the piece's load-time
block in a real browser is the 280 ms figure.

## Fix rounds

1. First build: wells too strong, pull peaked at one sigma, no
   diffusion. The field collapsed into a few point piles
   (max bin 564, 1466 of 1600 bins empty) with razor-thin white
   streamline arcs.
2. Weakened wells, added deterministic diffusion, raised the curl.
   Still collapsed (max bin 635) into the bottom-right corner bin:
   clamped walls plus the curl parked 342 particles at (1, 1).
3. Reflective walls did not fix the corner trap (the flow still
   converges there). Switched to a periodic box; the pile moved
   to the core and the live field drained into it (core count
   39 at frame one, 1238 at t = 90).
4. Added the gas-pressure term and let growth hold at full
   strength after the ramp. Collapse stopped (max bin 15 at
   frame one, 35 at t = 90, 41 at t = 180) and the core holds
   steady (367, 774, 466). Raised the white threshold 9 to 12
   after the first visual pass so magenta cores read magenta.
