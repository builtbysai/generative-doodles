# №1616 "3021" (SP1, sableraph #213, PP863)

## Design
A single faceted eight-point star in pale ice-blue (#A9DCEB) rotates on a
near-black ground (#0A0E14) inside a thin luminous frame (#3A4A5A). The star
is two thirds of the frame width, centred at 55 percent of the frame height,
with generous dark margins. Beneath it, rendered as part of the piece, a
caption line shows the live angle and the rest date: "ANGLE 320.47° ·
REST 3021-03-21". After sableraph's "1000 years" (HEN, May 2021): the star
began turning in May 2021 and comes to rest on 3021-03-21, a thousand years
later. Nothing else. Title "3021" and formula date "2006 · 06 · 15" sit at
the top inside the frame; the hint "Drag to add energy." sits below it.

## Decay model
Spin starts at T0 = 2021-05-01 and must reach rest at T1 = 3021-03-21.
Normalised elapsed time u = (now - T0) / (T1 - T0), u in [0, 1]. Angular
velocity follows omega(u) = OMEGA0 * (1 - u)^2 with OMEGA0 = one turn per
day at T0, so omega hits exactly zero at u = 1. Angle is the closed-form
integral theta(u) = THETA_TOTAL * (1 - (1 - u)^3), where
THETA_TOTAL = OMEGA0 * span / 3. The angle is a pure function of wall-clock
time: no accumulation, no drift, and the piece is continuous across visits
by construction. At the current epoch the star turns about once a day, so
over a minute of watching it creeps a quarter of a degree; the caption
angle readout (two decimals, zero-padded, monospace tabular numerals) is
the visible proof that it turns.

## Frame-one determinism
Frame one is drawn synchronously at load from a fixed reference instant:
U_PHASE = 0.005, giving PHASE_ANGLE = theta(0.005) = 320.47°. No stored
state, no wall clock, and no randomness enter the first frame, so two
node-canvas renders are byte-identical (verified: thumb.png md5
9c45e32e275b7a564bdd199266a7c48c on two consecutive renders). The live loop
then continues from the real wall-clock angle. There is no randomness
anywhere in the piece (no Math.random; a mulberry32 helper is present but
unused, the star geometry is fully deterministic).

## Drag energy injection
Flicking the star is the one honest interaction. A pointerdown inside the
star disc starts a drag; pointermove turns the star with the finger and
tracks a smoothed pointer angular velocity; on pointerup, if the drag
moved more than 0.15 rad and the release velocity exceeds 0.05 rad/s, the
velocity is added to the extra velocity, clamped to +/-1.5 rad/s. The
extra velocity decays exponentially with a 25 s time constant and is added
on top of the schedule angle, so an injection visibly spins the star up
and then lets it settle back onto the schedule. Each injection increments
a counter shown in the caption as "ENERGY ADDED ×N · REST DATE
UNCHANGED". The rest date never moves: injections add transient energy
only and the schedule's zero-crossing at 3021-03-21 is untouched. Angle,
extra velocity, injection count and wall-clock are persisted in
localStorage (guarded with typeof localStorage !== 'undefined'; the
node-canvas QA harness has none), with the stored velocity decayed by the
elapsed time since saving, so the piece is continuous across visits.

## Deviations
- The prompt's "today it turns; next week it has barely moved" is read as
  the star's motion being glacial on human timescales (one turn per day at
  the current epoch, decaying to zero by 3021), with the live angle
  readout as the proof of motion. A literal reading (near-zero weekly
  displacement) would contradict the "today it turns" half of the same
  sentence, so the slow base rate plus the readout carries the idea.
- The injected energy decays with a 25 s exponential rather than
  lengthening the schedule: the rest date is displayed as fixed and the
  spec forbids moving it, so transient extra velocity that bleeds away is
  the only reading that keeps both the counter and the fixed rest date
  honest.
- No other deviations. No particles, no scoring, no reset, no
  click-to-reload.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centred geometric piece keeps its
shape with the page ground set to the piece's own background colour
(#0A0E14) and the hint colour flipped to match; one synchronous frame at
load; requestAnimationFrame guarded by typeof check; reduced-motion
support (static frame at PHASE). Title "3021", date "2006 · 06 · 15"
(formula date), hint "Drag to add energy." No em dashes in visible copy.
