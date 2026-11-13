# Wind Organ Sessions, No. 1750

ZM7 / studio-zimoun #229. Watch-only piece.

Gallery note: "One slow bronze machine turns on incommensurate periods while faint chalk session marks accumulate at the left edge. Watch only."

## Driver

A single large machine at the center of a dark frame, a ring of vent-like
vanes turning almost imperceptibly, and a quiet column of pencil marks
growing down the left margin, one per session. The slowness is the
instrument: nothing hurries, nothing resolves, the piece is still going
when you look away.

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim, with No. 1748 as the
house template.

## Decisions

- Machine: three concentric vane rings plus a hub, centered at (0.56, 0.54)
  with radius 0.34 of the short side, so the left margin stays clear for
  the session marks. Each vane is a tapered vent blade pitched off the
  radial line, drawn in a rotated frame, with a seeded shade per blade so
  the rings read as separate vanes rather than a solid disc.
- Vane periods (incommensurate, hours-scale ratios compressed to watchable
  drift): outer ring 24 vanes at 997 s, middle ring 16 vanes at 631 s
  counter-rotating, inner ring 10 vanes at 401 s, hub 6 spokes at 271 s
  counter-rotating. No two rings line up twice the same way. All motion is
  a closed-form function of piece time, far under the 14 Hz ceiling.
- Housing: two thin shadow-grey circles, a 48-tick ring, and a faint bronze
  radial glow behind the machine.
- Palette, hand-picked from the prompt's named colors
  (studies/studio-zimoun.md does not exist locally): near-black ground
  #0B0A09, dark bronze #6B4E2E, light bronze #8A6A3C, dark bronze #3D2C1A,
  shadow grey #3A3A38 and #555550, session marks in faint chalk white
  #D8D2C4 at alpha 0.30 to 0.65.
- Session marks: a vertical column at x = 0.045 of the width, starting at
  0.20 of the height, spaced about 0.032 of the short side apart. Each mark
  is a short chalk stroke with seeded length (0.55 to 1.45 of the base
  length), tilt (within 0.05 rad) and alpha jitter, round-capped like a
  pencil line. Three marks are pre-rolled and one more is added every
  600 s of piece time, capped at 22, so the column keeps growing across a
  long session without ever becoming a timeline.
- Determinism: mulberry32 seed 1750 for every vane shade and mark
  parameter; frame one fixed at t = 1500.0 s with five session marks
  already on the wall. No Date.now, Math.random or performance.now
  anywhere in frame one. Frame one re-rendered byte-identical in the
  probe, and the 720x720 thumb re-render is byte-identical to thumb.png.
- Plates: title, formula date 2006 · 10 · 27 and hint "Watch only." on
  dark plates (#171310) with chalk ink and a bronze rule, top-left and
  bottom-left. The centered composition keeps its shape on phones and the
  page ground takes the piece's own near-black color.

## Deviations

- None from the prompt. The prompt says marks accumulate "one per
  session"; the build schedules one per 600 s of piece time with three
  pre-rolled, so five are visible at frame one and the column grows
  slowly thereafter. No playhead, no scrubber, no timeline UI anywhere.

## Probe results (node probe, 1280x900)

- Frame-one mark count: 5 (asserted by schedule: 3 + floor(1500/600)).
- Vane periods: 997, 631, 401, 271 s.
- Desktop 1280x900, mobile 390x844 and thumb 720x720 renders inspected:
  ring structure readable mid-turn on all three, five marks visible at
  the left edge, plates clear of the machine on desktop and mobile.
