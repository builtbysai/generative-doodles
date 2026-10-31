# No.891 "Lit Bottle" — process

Study: #109 klsr.av, PP52 "Lightning Bottle".

## Concept

Klsr's live-show teaser: literal lightning in a bottle, a white-violet
electrical discharge column in smoke on near-black. The bolt never leaves
its column; the violence is contained. The visitor charges the bottle by
pressing and holding, and the strike is earned by the charge: release and
one full discharge fires, scaled by how long the bottle was held. A short
tap only crackles a fork. A double-tap grounds the bottle into two seconds
of total darkness, after which the smoke rebuilds.

## Construction

Palette (strict, nothing else): ground #08060C, discharge #DCD2FF, bolt
core #FFFFFF, smoke #3A3344, afterglow #8A7AB8. No text anywhere except
the title; the only furniture is a thin unlabeled charge meter bar along
the bottom edge.

Charge model (closed-form): charge is a piecewise function of recorded
press/release segments, never frame-integrated. While pressed it builds at
0.25 per second toward the cap of 1 (a full charge takes about four
seconds of holding). After interaction it bleeds slowly at 0.045 per
second. On release after a press of at least 0.25 s, if charge is at least
0.15 a strike event fires with strength equal to the charge and charge
resets to zero; below that the release fizzles into a fork crackle. A tap
(press under 0.25 s) records a crackle; a second tap within 0.35 s instead
records a ground event: charge zeroed, darkness for 2 s, then the smoke
rebuild factor ramps back over 2.5 s.

Single-flash bound (hard safety rule): a strike is exactly one event per
release. Its flash is a single white overlay whose envelope is a linear
ramp down over 0.15 s, and the bolt and smoke brightness boosts read the
same envelope. There is no strobe mode, no flash train, and no way to fire
a second flash without a new press, a new charge build, and a new release.
Ambient bolt flicker is a per-frame brightness multiplier between 0.72 and
1.0 on the discharge itself, not a flashing overlay.

Bolt: a 27-point vertical polyline down the center, recomputed per frame
index (30 per second) from a mulberry32 stream seeded by the frame number,
a random walk pulled gently back toward the center line, with step size
growing slightly with charge. Drawn in three passes (wide low-alpha glow,
discharge body, white core) with no shadowBlur and no gradients. Two branch
forks below charge 0.6, three at or above, each a short jittered polyline
whose brightness also rises during a crackle envelope.

Smoke: 200 seeded particles (130 on the phone path) on slow closed-form
drift, drawn as flat low-alpha discs. Each particle's alpha is a Gaussian
of its distance to the bolt's x at its own height, scaled by charge,
flicker, strike boost, and the ground-event rebuild factor, so the smoke
visibly catches the column's light. After a strike, a second pass in the
afterglow tone decays over about four seconds.

Audio (lazy, gesture-gated, typeof-guarded): the first pointerdown creates
the context. A looping seeded noise buffer runs through a bandpass whose
frequency is 250 + charge x 2600 Hz (the meter is the frequency), plus a
48 Hz sine hum; both gains track charge. A strike fires one shaped noise
burst through a highpass as the crack, and the hum drops to silence because
charge has reset to zero. The piece renders complete in total silence in
the QA harness.

Sizing: canvas from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas style width and height are pinned in px
inside draw() every frame. Phone detection uses window.screen physical
size (min dimension < 700) with the aspect fallback h > w x 1.15.

Determinism: frame one is the synchronous draw at t = 0. Charge at t = 0
is the held ambient pre-charge of 0.35 (a recorded choice, so the thumb
shows the bottle already alive: bolt mid-flicker, two forks out, smoke lit
near the column, meter at 35 percent). Bolt jitter is seeded per frame
index, smoke is seeded data, all envelopes are closed-form in the event
list and t. Nothing is derived from Date.now; performance.now only drives
the live loop clock after frame one.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All
  rendered cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted.
- Read-backs: desktop shows the near-black field, the centered jittered
  bolt with a white core and two small forks, dim gray-violet smoke
  catching light around the column, and the thin charge bar filled to
  about a third at the bottom. Thumb matches. Mobile (phone path) holds
  the same composition in the tall frame, column centered, meter intact,
  nothing clipped.

## Deviations

- Frame one carries a held ambient pre-charge of 0.35 instead of an empty
  bottle at zero, per the brief's own frame-one spec, so the gallery frame
  shows the living column rather than a near-empty field. The pre-charge
  is a constant of the initial segment; it does not decay until the first
  interaction.
- A release with charge below 0.15 (only possible on a press begun from
  near zero) fizzles into a fork crackle rather than a weak strike, so the
  strike always reads as earned.
