# No.886 "Until Observed"

Study #108 bnsh_av, PP47 "Superposition" (his sketch 001, 2026-03-15).

## Concept

A particle is in all its states at once until observed. The field holds 150
particles (110 on phones), and each one is drawn not as a point but as a smear
of four ghost positions around its true place: everywhere it could be, dim
blue-grey, shimmering, never settling. Touch is the observer. Where a finger
presses, a collapse wavefront travels outward at a visible speed; particles
the front has passed give up their ghosts and become single sharp white
points. Certainty is temporary: lift the finger and the sharp region smears
back into ghosts over about three seconds. A double-tap observes everything
at once, the whole field hard and lonely for two seconds, then releases it
all back to maybe. The collapse is the beauty, and so is the loss.

The only text on the piece is the specced readout at the bottom edge: the
state word and the collapsed share, in the form `COHERENT · 0%` at rest,
flipping to `COLLAPSED` once half the field or more has collapsed. No
explanation, no equations; the interaction teaches the idea.

## Construction

- Coordinates live in width units (x across the frame, y in the same units),
  so distances, ghost radii, and the front speed are isotropic. Each particle
  has a seeded base position plus a slow closed-form wander (two sine axes),
  so the field drifts without ever repeating.
- Ghosts: four per particle, each with a seeded angle, radius
  (0.010–0.030 width units), shimmer frequency, and slow rotation. Radius and
  alpha scale with the particle's coherence, so the cloud visibly tightens
  and fades as collapse takes it.
- Coherence model (closed form, the heart of the piece): every observation
  is a recorded source event in a list. A field source (press or drag
  segment) has an origin, start time, release time, and a radius cap; a
  global source (double-tap) has a faster front and a hold-until time. For a
  particle at distance d, the front arrival time is t0 + d / speed (0.35
  width-units/s for touch, 0.95 for total observation). Collapse ramps in
  over 0.4 s after arrival. After release, the particle's achieved collapse
  decays as exp(-(t - release) / 1.0), essentially gone in about 3 s. A
  particle's coherence is 1 minus the strongest source contribution; no
  frame-integrated state exists anywhere.
- Drag: pressing lays a source; moving more than 0.05 width units closes the
  current source and opens a new one at the new point, so the front follows
  the finger and the region behind decoheres while the region ahead is still
  ghosts. A faint ring in the wavefront grey marks each front still
  spreading.
- Tap: a press shorter than 0.30 s with no drag becomes a pinpoint source
  with its radius capped at 0.06 width units and a 1.1 s hold: one bright
  star in the fog. Double-tap (second tap within 0.35 s) retires the
  pinpoint and fires the global source instead.
- Sound (first gesture only, lazily created, typeof-guarded): five faint
  sine oscillators at 196 Hz form the ghost chorus. Their detune offsets
  (±42, ±21, 0 cents) are multiplied by the field's mean coherence and
  retargeted a few times a second, so collapse narrows the maybe-chord to a
  single clear tone and release blooms it back out. Master gain 0.045: a
  whisper, never a performance. The piece renders complete in total silence
  in the QA harness.
- House compliance: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style pinned in px inside draw();
  phone detection via window.screen min dimension under 700 px with an
  aspect fallback; strict four-tone palette (#020203, #4A4A52, #FFFFFF,
  #8A8A86); no gradients, shadowBlur, ctx.filter, offscreen canvas, or
  microphone; rAF typeof-guarded; frame one is the synchronous draw(0).

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png). All clean, silent.
- Determinism: thumb.png rendered twice and cmp byte-compared: identical.
  The duplicate was deleted. No Date.now or any wall-clock read anywhere in
  the piece; all motion is closed-form in t or a function of the recorded
  event list.
- Read-back: all three sizes show the untouched frame one as specced: a
  black field of dim blue-grey ghost clusters (four-dot smears) across the
  whole frame, no sharp points, no wavefront ring, and the readout
  `COHERENT · 0%` small at the bottom center. Mobile keeps the full field
  and readout inside the tall frame, nothing clipped.
- Deviations: (1) the readout format is `WORD · NN%` (middle dot separator,
  collapsed percentage), the minimal form of the specced state word plus
  percentage. (2) Drag is segmented into successive sources at 0.05 width
  units of travel rather than one continuously moving source, which is what
  keeps every particle's coherence a closed-form function of the event list
  (and produces the intended trail of decoherence behind a moving finger).
  (3) Decoherence is an exponential with a 1.0 s time constant rather than a
  linear 3 s ramp; it reads as "over ~3 s" while never leaving a hard edge
  of certainty. No other deviations.
