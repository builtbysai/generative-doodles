# No.1540 "The Black Ocean" (arthur-jafa AJ5, PP787)

Gallery date: 2006 · 03 · 31 (recorded here only, never drawn in the piece).

## What it is

A single roiling dark surface fills the lower two-thirds: a horizon line
displaced by slow noise into rolling berms of near-black, tar-like waves.
Above it, a low hazy sun disc hangs in a dark amber sky. The waves swell
slowly until they rise and eclipse the sun entirely; then they recede and
the sun returns, dimmer. Brief bright streaks across the water surface and
vanish like transmissions. The whole piece is slow, heavy, and unhurried;
nothing here is fast.

Palette (exactly the prompt's): sky deep amber-brown #2a1e12; sun muted
amber #c98f3d at low opacity with a hazy halo #5a4526; ocean near-black
#0d0c10 with wave highlights #26221e and #3a352e; transmission streaks
faint bone #8f8878. No other color. Sun low and centered in the upper
third; ocean horizon across the middle; waves occupy the lower two-thirds;
no other elements.

## How it works (closed-form, no frame integration)

240 s loop. The swell envelope over loop-local time u: calm 0-40 s
(amplitude 0.08), rising 40-140 s (smoothstep 0.08 to 1), eclipse hold
140-170 s (amplitude 1), receding 170-240 s (smoothstep back to 0.08).
The horizon is a 1D noise-displaced polyline: three seeded sines with
whole cycles per loop, plus a gaussian bump centered on the sun's x.
Displacement = envelope * (0.34 * bump + 0.08 * noise * (1 - bump)), so
at the sun's x the bump dominates and the eclipse is guaranteed at peak
amplitude regardless of noise phase: crest reaches 0.11 of field height
against the sun's top at 0.165, so the disc is fully covered.

The sun's dimming after eclipse is a closed-form function of loop-local
time: full brightness before the eclipse, a 0.6 multiplier through the
receding phase (170-240 s), resetting at the loop boundary. That reset is
the film-loop restart, and it is what keeps t=240 byte-identical to t=0.

Transmission streaks come from a seeded schedule (mulberry32, seed
1540000): irregular gaps of 4-11 s, each streak 2.5-4 s with a fade-in /
hold / fade-out alpha envelope, drawn only in the water region (y from
0.58 to 0.92 of field height, always below the lowest trough).

Interaction, all closed-form over recorded drag events: dragging on the
ocean records a drag session whose gaussian bump (0.10 field height,
0.10 field width) follows the pointer by linear interpolation between
recorded move points, ramps in over 0.3 s, and decays exponentially over
1.2 s after release. Dragging on the sun adds a brightness offset
(up brightens, down dims, clamped to +/-0.25) that decays the same way
after release. Drag never speeds the swell, never clears the sky, never
adds a second sun.

## Adaptations (house rules)

- The prompt's radial sun halo is rendered as layered flat-alpha discs
  (3.4x / 2.5x / 1.7x the sun radius at alphas 0.05 / 0.08 / 0.14), never
  a smooth radial falloff.
- Phrase and cycle variations come from the seeded mulberry32 stream,
  never unseeded randomness.
- Fading alphas are rounded to 4 decimals before stringifying.
- Canvas state (lineCap, lineWidth, strokeStyle, fillStyle) is set
  explicitly in every drawing branch.
- Fully silent: no audio of any kind.
- Probe-only hook `window.__t40` exposes loop time, envelope, crest
  height at the sun, sun geometry and alpha, active streaks, and field
  rect. It draws nothing and changes no behaviour.

## QA (probe-1540.js, vm-isolated, real node-canvas, driving the piece's
own rAF loop; 27/27 pass)

- Frame one identical across fresh instances; loop closure at t=240 and
  t=480 byte-identical to t=0.
- Envelope phases: calm 0.08 at u=20 with the crest below the sun's
  bottom; rising between calm and peak at u=90; eclipse 1.0 at u=155
  with the crest above the sun's top and the sun-center pixel occluded
  by ocean color; receding between peak and calm at u=200 with the crest
  partly returned (sun center visible, lower sun still covered); fully
  clear by u=225.
- Sun brightness: calm red channel above receding by more than 15;
  receding above eclipse by more than 15.
- Streaks: the schedule contains both active and idle times; a
  near-full-strength streak's midpoint pixel reads bone-bright over dark
  water; no bone pixels while idle.
- Ocean drag raises the local wave more than 10 px above control, leaves
  the swell envelope unchanged, and falls back within 5 px of control
  after release.
- Sun drag upward brightens and downward dims by more than 5 red-channel
  points; sky pixels stay sky-colored under drag; exactly one sun;
  brightness returns after release.
- Determinism: the same drag sequence is byte-identical across
  instances.
- Thumb byte-compare: two independent 720x720 renders byte-identical to
  the shipped thumb. Forbidden-API grep: 0 hits. Desktop (1280x720) and
  mobile (390 wide) renders inspected personally: amber sky, low centered
  sun with halo, dark rolling ocean, no clipping, no other elements.

## Fix rounds

Gate-caught fix (1 round, after the first build passed all 27 probes):
fly's pixel check found the desktop (1280x720) ocean inset — at y=500
the left and right frame edges read sky color #2a1e12 while only the
middle read ocean #0d0c10 — because size() used a centered square
field on non-phone sizes. The prompt specs the ocean fills the lower
two-thirds and the horizon runs across the middle, so the field is now
full-frame on all sizes (fieldX = 0, fieldY = 0, fieldW = W,
fieldH = H); phone detection still runs unchanged, and every other
behavior (240 s loop, seeded phases, sun fractions, eclipse rule,
0.6 return dimming, streak schedule, drag behaviors, flat-alpha halo)
is untouched. Re-verification after the fix: desktop pixel check at
y=500 reads ocean color at x=0, x=640, and x=1279; desktop and mobile
renders re-inspected personally (ocean spans the full width, horizon
across the middle, sun low and centered in the upper third); all 27
probes pass unmodified (no probe expectation depended on the old
inset field); loop closure at t=240 and t=480 still byte-identical;
thumb byte-compare still passes with the thumb md5 unchanged, as
expected — on the square 720x720 canvas the old centered field already
equalled full-frame. Forbidden-API grep: 0 hits.

Earlier probe-only corrections (no piece behaviour change): (1) the
first recede check demanded full clearance at u=200, but the envelope
only clears the sun fully near u=210; the check now asserts partial
return at u=200 and full clearance at u=225. (2) The first
streak-pixel check scanned a coarse grid that could step over a 2 px
line; the hook now exposes active streak positions and the probe
samples a near-full-strength streak's exact midpoint. The hook addition
changed no drawing code; the thumb md5 is unchanged before and after.

## Deviations

None beyond the documented house-rule adaptations above.
