# №1648 — H-Emitters, Iteration 49 (HF1, PP895)

Study #217 HAL09999, opening EXPANSION #217. Gallery date
2006 · 07 · 17 (formula 2002-01-10 + 1649 days). Gallery note draft:
"Two emitters breathe a field of interference dots into being. Drag an
emitter to reshape the field."

## Driver

Two drifting wave sources sum into a field, and matter condenses only
where the sum peaks.

## The piece

A dark field holds two cyan point emitters, one high at (0.30, 0.28)
and one low at (0.70, 0.74), each drifting on its own slow orbit
(periods roughly 100-160 s, so the drift reads as breathing rather
than travel). Each emitter radiates expanding concentric rings in cold
cyan: crest radii are computed live as (2*pi*n + w*t - ph)/k, so the
rings keep emitting and travel outward as time advances. The two
sinusoidal waves are summed on a coarse grid (13 px desktop, 15 px
mobile); brightness is |sum|^2. Dots are drawn only at real
constructive maxima: a grid cell whose brightness exceeds 2.0 (the
sum peaks at 4.0 where the waves fully agree) and is brighter than
all eight neighbours. Dot size and whiteness follow the peak strength,
from near-white gold at threshold to white-hot cores at the strongest
peaks. Nodal lines are pure absence: nothing is drawn where the waves
cancel. The interference band crosses the middle third between the two
emitters, and the dot lattice brightens, dissolves, and re-ignites as
the sources drift.

## Interaction

Watch-first and autonomous. The earned interaction is the drag: a
pointerdown within 36 px (48 px on phones) of an emitter grabs it,
and dragging moves its orbit base so the whole interference field
recomputes live around the new position; release lets it resume
drifting from there. There is no click-to-reload and no other control.

## Determinism

Frame one is drawn synchronously at fixed phase t = 6 s: the rings
are developed and the dot lattice is already breathing. All source
parameters are fixed authored literals; no Math.random and no
Date.now() anywhere. The rAF loop is anchored as the fixed phase
plus elapsed time since load. Thumb rendered twice with the QA
harness: byte-identical (md5 a50979345ef285564601875df982354a).

## Acceptance criteria

1. Frame one (t = 6 s) shows a dark field, two cyan emitters with
   expanding rings, and a dot lattice along the ring-crossing curves;
   the thumb re-renders byte-identical.
2. Every dot is a real constructive maximum: probe measures 177 dots
   at t = 6 on desktop with field maximum 3.9998 (theoretical peak
   4.0), and 142 dots on mobile at 390x844.
3. The field is live, not static: a frame at t = 30 s differs from
   frame one (170 dots, emitters in new positions), and the rings
   keep advancing with phase.
4. Dragging an emitter reshapes the field: dragging emitter 0 to the
   frame centre moves it to exactly (640, 450) at 1280x900, the dot
   count changes 170 to 151, and the rendered frame differs.
5. No click-to-reload; no in-piece text of any kind; no em dashes in
   visible copy; motion is slow and flicker safe; reduced-motion
   visitors get the fixed frame.

## Deviations from the prompt

- No title/date/hint plates in the piece. The batch spec states no
  in-piece UI or hint text anywhere in this batch (HF1-HF5 carry no
  labels), and the interaction cue lives in the gallery note instead.
  This differs from the №1647 template, which carried plates, but
  follows the batch spec and the build brief.
- Two emitters, not three: the prompt allows "two or three", and two
  sources keep the crossing geometry readable and the lattice honest
  (every dot traces to the sum of exactly two waves).
- Wavelengths are set from the frame's smaller dimension (0.105 and
  0.125 of min(VW, VH)), so the ring spacing and lattice density hold
  across desktop, phone, and thumb instead of being fixed pixel
  values.

## What was avoided

No decorative dots: every dot passed the 8-neighbour local-maximum
test on the measured field. No static interference art: rings are
phase-driven and keep emitting. No moire wallpaper: the sources move
on slow orbits and the lattice re-forms continuously. No gradients,
no shadowBlur, no offscreen canvas, no audio.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Desktop:
dark field, cyan ring families from both emitters, white-gold dots
along the crossing curves, emitters legible with glow. Mobile:
full-bleed field, same reading at 390x844, 142 dots. Thumb: the
lattice and both emitters read clearly at 720x720. Interaction and
motion probe (vm-isolated instance, stubbed rAF, piece driven via
window.__probe): t = 6 vs t = 30 frames differ; drag moves the
emitter and reshapes the field; a fresh instance renders frame one
byte-identical to the first. Two fresh thumb renders are
byte-identical.

## Fix rounds

None. The first build passed the visual check and the probe with no
changes.

## Parent fix round (fly, 2026-11-09, after builder gate)
The builder shipped with no title/date/hint plates, reading the batch spec's
"no in-piece UI" line literally. The house template (No.1647 and the rest of
this batch) carries title/date + hint plates, so fly added drawPlates() in
the No.1651 style (light plate, dark ink): title "H-Emitters, Iteration 49",
date "2006 · 07 · 17" top-left, hint "Drag an emitter to reshape the field."
bottom-left. No field code touched. Re-gated by fly: desktop 1280x900 and
mobile 390x844 inspected, thumb rendered twice byte-identical (new thumb
md5 0aaa7af06cff20596919a3856cbf654d).
