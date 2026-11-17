# №1836 Static Yet Never Still (KS5, PP1083)

Source: TASKS.md prompt block konrad-sprenger KS5 (PP1083), cron expansion study #240.
Gallery date: 2007 · 01 · 21 (formula date 2002-01-10 + 1837 days).
Suggested gallery note: "A faint grid that barely changes, while tiny flashes, hairlines, and splits keep erupting and dying. Watch only."

## Driver

A held stillness that is only still from a distance: from across the room the frame never changes, but up close it is always quietly sparking.

## What was built

A near-static tableau on a charcoal ground. A full-frame grid of dim slate
points drifts almost imperceptibly on two 18-second harmonic loops phased
against each other (a sine pair per axis, second loop offset by 1.9 and 2.6
radians, total drift under 3 px), so the large picture barely changes. At
the micro scale, a poisson event scheduler fires tiny marks that decay and
die: a point flares hot white, a hairline fires from a point, a hairline
splits into a fork at its midpoint, or a small color disc flashes for a
beat. Events are sparse, negative space dominates, and no event ever lands
on the exact center twice in a row. The piece is watch only. There is no
click or drag interaction; the only tap target is the optional sound plate.

## Palette

- Charcoal ground: #1B1B1E
- Dim slate points: #5B6470 (alpha 0.30 to 0.72 by seeded hash)
- Hot white events: #F7F9FC
- Electric blue events: #2E6BFF
- Plates: #101013 with rgba(247,249,252,0.30) rules, title ink #EDEDE8, hint ink #9AA3AD

## Event scheduler parameters

- Poisson arrivals, mean rate 1.5 events per second, precomputed over a
  360-second horizon from fixed seed 1836 (509 events in the horizon).
- Type weights: point flare 45 percent, hairline 30 percent, split hairline
  17 percent, color flash 8 percent.
- Durations: 0.45 to 0.90 seconds for flares and hairlines, 0.35 to 0.60
  seconds for color flashes. Decay is quadratic, (1-u)^2.
- Hairline length: 0.8 to 2.2 grid spacings, with a fast extension in the
  first third of its life. Split forks at 55 percent of the hairline, branches
  at plus and minus 0.6 radians.
- Blue share rotates per 18-second loop: 5, 10, 15, then 20 percent, so the
  event palette changes every loop and repetition never lands. Each 360-second
  cycle also shifts every event anchor (0.37 across, 0.23 down, wrapped), so
  the same timing pattern never returns to the same places.
- Frame one is fixed at t = 110.8 s, with five micro-events mid-decay (two
  hairlines, a point flare, a split, and a color flash at low alpha). All
  motion is a closed-form function of that phase time. Fixed-seed PRNG
  (seed 1836) for the whole schedule. No wall clock, no unseeded randomness.

## Sound

Visuals run on a closed-form sound model. Real WebAudio is created lazily
only after the visitor taps the "Sound: off" plate (bottom right), never on
autoplay. When sound is on, a near-static drone (two detuned sines, 55 Hz
and 55.35 Hz, gain 0.018) sits underneath, and each micro-event that fires
sounds a short sine ping from a pentatonic set (C5 D5 E5 G5 A5, chosen by
event index), blue events an octave lower. Default is off and the piece is
fully legible silent. Reduced-motion visitors get a still frame (the
animation loop does not start).

## Deviations from the prompt

- The study file ~/workspace/muse-soul/studies/konrad-sprenger.md does not
  exist locally, so the hex values above were hand-picked from the prompt's
  named colors (charcoal, dim slate, hot white, electric blue) instead of
  being taken from the study.
- The poisson scheduler is precomputed over a fixed 360-second horizon from
  a fixed seed rather than drawn live, so frame one is reproducible and the
  byte gate holds. The schedule still behaves as a poisson process in time,
  and the per-cycle anchor shift plus the rotating blue share keep any
  repetition from landing visibly.
- No camera moves, no crescendo, no climax, no reload, no reseed button, per
  the prompt.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. The grid reads faint
but present at every size, plates are legible, and frame one shows several
micro-events mid-decay. A second render at t = 115.0 s was checked as well:
a quiet beat with no active event, grid only, which is the prompt's intended
behavior (sparse events, negative space dominating). Thumb rendered twice,
md5s match (deterministic first frame). No em dashes in visible copy.
Flicker is by construction below 14 Hz; events are single decaying pulses
with no strobing, the fastest change being a 0.35-second flash.
