# No.1066 The Orb Fleet

Study #131 yoichi-sakamoto, YS3 / PP227 (24 Drone Flight).

## Concept

Ten skeletal drones fly a recorded indoor-localization choreography on a dark
stage. Each machine is drawn honestly: a dark X of arms, an exposed center
board, red wiring marks, and a glowing white-blue orb on top. The flock holds
tight formations, breaks them, and re-forms; each drone's full flight path is
drawn faint behind it, because the recording is part of the piece. Dragging
disturbs the flock: nearby drones swerve away from the finger, then return to
their recorded paths. The return is the content.

## Construction

- Single self-contained canvas 2D page. Canvas size comes from the Visual
  Viewport API with resize listeners on both visualViewport and window; the
  canvas CSS size is pinned in px on every draw. Phone detection uses
  window.screen physical size (min dimension < 700px) with an aspect fallback
  (h > w*1.15). Page ground is the stage tone; the airspace is the centered
  square of side min(w, h), full width on phones.
- Palette, strict: stage #0A0B0D, chassis #16181C, wiring #C33A2B, orbs
  #BFE3FF (halo layered at alphas 0.06 / 0.12 / 0.30, no gradients), recorded
  paths #2A2E35 at 0.4. No text anywhere except the document title. No
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas.
- Choreography is closed-form in piece time t (mod 60 s), so frame one is
  exact: 4 formation phases of 15 s each, each holding 11 s then morphing
  over 4 s with a smootherstep blend:
  - 0-15 s: ring (10 drones on a circle, radius 0.88)
  - 15-30 s: diamond (rows of 1 / 2 / 4 / 2 / 1)
  - 30-45 s: scatter (seeded per-drone disc positions, the break)
  - 45-60 s: stack (vertical column, alternating x zigzag), morphing back
    into the ring at the loop seam.
  The formation center follows a slow Lissajous (periods 60 s and 30 s), the
  whole formation sways by +/-0.18 rad over the loop, and each drone adds a
  small seeded hover bob with an integer cycle count, so the 60 s loop is
  seamless. Frame one is fixed at t = 22 s, inside the diamond hold.
- Depth is per-drone and seeded (scale 0.62 to 1.25); drones draw far-first.
  Wiring is 2-3 seeded red strokes from the board per drone.
- Interaction as recorded events, evaluated in closed form:
  - Drag: each pointer sample pushes impulse events onto nearby drones
    (radius 0.16 world units). A drone's swerve offset at time t is the sum
    of its impulses shaped by a rise-and-decay bump (peak at 0.9 s, zero by
    4 s), clamped to 0.22 units: drones leave the path and provably return.
  - Tap: the nearest orb records a flash event; brightness boost decays as
    exp(-3.2 s) over about a second, and a soft sine ping sounds.
  - Double-tap: reseeds the choreography (new scatter, depths, wiring,
    center phases) and restarts the schedule from that moment.
- Sound: per-drone sawtooth motor buzzes through lowpass filters, pitch and
  level driven by each drone's closed-form speed, plus the tap ping. The
  AudioContext is created lazily inside the first visitor gesture and every
  use is typeof-guarded; the piece is silent and complete without it. No
  microphone input anywhere.

## Deviations

- Drone count fixed at 10 (the prompt allows 8-12): keeps the diamond's
  1 / 2 / 4 / 2 / 1 rows exact and the fleet readable at phone size.
- Audio begins only after the first visitor gesture rather than on load:
  browser autoplay policy and the house rule both forbid starting sound
  uninvited. The visual piece is complete in silence.
- The disturbance is written as impulse events with a closed-form decay
  instead of an integrated steering simulation: this keeps every drone's
  position a pure function of (schedule time, recorded events), which the
  determinism gate requires, while still reading as swerve-and-return.

## QA log

- Rendered with the house node-canvas harness:
  - qa-desktop.png 1280x900: dark stage; 10 skeletal drones in the diamond
    formation at varied scales, X arms and red wiring ticks visible on the
    nearer machines, pale orbs glowing, the faint recorded-path web behind
    the whole fleet. Nothing clipped.
  - qa-mobile.png 390x844: the whole airspace fits the 390 px width,
    centered vertically on the stage tone; orbs and wiring still legible,
    nothing clipped.
  - thumb.png 720x720: same composition as desktop.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Frame one is the synchronous draw at the fixed phase t = 22 s;
  the rAF loop (typeof-guarded) is anchored as T0 + elapsed since load, and
  no state derives from Date.now().
- Hygiene checks: no external assets, no absolute URLs, no date strings, no
  em dashes, no visible text besides the title, no getUserMedia.
