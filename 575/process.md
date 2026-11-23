# Collapsed for Half-Speed, No. 1742

TD7 / PP989, study #228 taylor-deupree. Watch-only piece.

Gallery note: A pale melodic trace drifts across cracked basalt at half
tempo, thinning with every pass and occasionally remembering itself
brighter. Watch only.

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim: a pale melodic trace
drifts across a dark cracked texture at half tempo, thinning with every
pass, fragments occasionally re-surfacing brighter, the piece always
looking for something that used to be.

## Decisions

- Driver: a melody decaying a little with every half-tempo pass, never
  quite gone, with fragments occasionally remembering themselves brighter.
- Trace: five layered sine paths in chalk white and pale grey, strongest
  first, crossing the full stage width in a central band with wide empty
  margins top and bottom. A small second sine term (0.12) keeps the line
  melodic rather than jagged.
- Decay: 24 second loop. Each completed loop multiplies trace alpha by
  0.86 and drops a harmonic every two loops (5 down to a floor of 3),
  with the alpha floor at 0.45 of full strength, so the trace thins but
  never vanishes.
- Resurfacing: nine fragments along the trace, each with a slow 53 second
  sine bloom (eighth power, so peaks are narrow and rare), staggered by
  the golden ratio. A blooming fragment is redrawn in faint warm white
  with a soft wide underlay, as if remembering.
- Crack texture: 30 seeded random-walk polylines plus 320 speckles on dark
  basalt #141518, drawn full-bleed beneath the trace on every viewport.
- Determinism: frame one is fixed at t = 52 s, loop 2 of the 24 s cycle,
  trace already thinned to 0.74 of full strength with 4 of 5 harmonics,
  fragments 2 and 7 mid-resurface. All randomness is mulberry32 seeded
  1742. No wall clock, no unseeded random.
- Plates: title, formula date 2006-10-19 and hint "Watch only." on dark
  plates top-left and bottom-left, clear of the trace band.
- Stage: field-like composition, full-bleed on phones, centered square on
  desktop, with the crack texture filling the whole viewport in both cases.

## Deviations

- On desktop the trace crosses the square stage rather than the full
  viewport width, per the field-like house rule (square on desktop,
  full-bleed on phones); the crack texture itself is full-bleed on both.
- First build had too strong a ripple term and too much weight on the
  upper harmonics, so the trace read as scribble; the ripple was cut from
  0.35 to 0.12 and the upper layers thinned until one melodic line
  dominates with fainter echoes behind it.

## Probes

- Trace decay, desktop band pixel count (channel max over 110): t = 52 s
  (loop 2, decay 0.740, 4 harmonics) 4,393 px; t = 100 s (loop 4, decay
  0.547, 3 harmonics) 3,292 px; t = 148 s (loop 6, decay floor 0.450,
  3 harmonics) 1,063 px. Alpha and detail measurably lower at later
  loop phases, trace still present at the floor.
- Resurfacing: warm-white pixel count in the band varies with the long
  schedule (938 px at t = 52 s, 356 px at t = 60 s, 527 px at t = 100 s,
  607 px at t = 148 s); fragment blooms peak at different times per the
  53 s staggered schedule, confirmed in the renders.
