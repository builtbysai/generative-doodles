# No.1662 Zero (Broken Symmetry), Study

Study #218 eric-de-giuli, prompt PP909 (EDG7). Gallery date 2006 · 07 · 31.
Silent. Tap for a new performance.

## Driver

Flat grey bands hold their calm for a long time, so long you start to
believe they will never change. Then a microscopic tremble runs
through them, a tear opens somewhere off-center, and the tear spreads
until the whole field has bloomed into fluid color. The watchable
thing is the rupture itself: the long calm before it, the first tear,
the cascade.

## Mechanism

The field is a closed-form cell grid, a pure function of piece time
and the current performance seed, so frame one is reproducible. 24
horizontal bands in muted greys span the full width; each band's grey
is fixed by its index. A rupture front leaves the performance's seed
point at its first-tear time and travels outward at one unit of
aspect-corrected distance per 16 seconds, with a 3 second soft edge
and a fixed noise term that makes the front ragged, so the tear
spreads unevenly instead of as a clean disc. In the 4 seconds before
the front reaches a point, that point trembles: the band edges wobble
with growing amplitude. Behind the front, the bands warp (up to about
46 px of vertical displacement, plus a horizontal swirl) and their
grey gives way to color advected by a slow flow field: a six-color
palette of amber, teal, coral, ochre gold, plum, and deep blue,
sampled from three-octave value noise that drifts slowly with piece
time, so the resolved field keeps moving gently after the rupture
completes. A short bright slit flashes at the seed point for 2.5
seconds as the tear opens. All time-varying terms run at or below
about 0.5 Hz, so flicker stays well under 14 Hz by construction.
Reduced motion renders one still frame.

## Interaction

A tap starts a new performance of the same score: same laws, new
trajectory. The piece cycles through a fixed table of 8 performances,
each with its own rupture site (all off-center), first-tear time, and
flow seed. The tap restarts from the calm phase of the next
performance behind a short 0.6 second fade to grey. Watch-first
between taps; nothing reloads.

## Asserted counts

- 24 bands, full-bleed on phones and desktop.
- 8 performances in the fixed seed table. Performance 0: seed 101,
  rupture site (0.63, 0.38), first tear at 8.0 s.
- Rupture timing (performance 0, probed): calm 0 to 8 s with the
  tremble growing from 0; first tear at 8 s; rupture 1.0 at the seed
  point by 12 s and 0.0 at the far corner; full rupture of the field
  by about 26 s; resolved fluid color drifting slowly after 30 s.
- Cell grid about 13,000 cells at desktop (cell 9.4 px), about 8,100
  at thumb size.
- Probe: bandCount 24, seedCount 8, onset 8.0 for performance 0.
  Performance 3 at t = 20 renders a visibly different trajectory
  (rupture centered left, different color distribution) from
  performance 0 at t = 20.

## Deviations

- The prompt seeds each run's micro-noise from performance.now() so
  no two runs are identical. The gallery requires a deterministic
  first frame, so instead each tap deals the next performance from a
  fixed table of 8 authored seeds. Every performance differs in
  rupture site and trajectory, and frame one is always performance 0
  at t = 0: flat calm bands. The prompt's "each performance must
  differ" is honored; the wall-clock seeding is not.
- The tap restart uses a 0.6 second fade to grey over the new
  performance's calm phase rather than a crossfade between the old
  and new performances; the old performance is gone the moment the
  tap lands.
- The rupture front carries a fixed noise term (plus or minus 3 s of
  arrival time) so the tear spreads raggedly; a perfectly circular
  front read as a growing disc, not a rupture.

## QA

Rendered from the actual script with node-canvas at 1280x900
desktop, 390x844 mobile, and 720x720 thumb; all three inspected.
Frame one reads as perfectly flat muted grey bands with legible
title, date, and hint plates at every size. Thumb re-rendered a
second time: byte-identical (md5 b9e20a36e0bf445c777ecfb826c267e8).
index.html md5 2b6c0e8759e2a2e726c677dd6245ee97.
