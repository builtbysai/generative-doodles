# No.1738 Seed Intervals (TD3, #228 taylor-deupree, PP985)

Date: 2006 · 10 · 15

## Mechanism

A bare snow-white field. Marks arrive one by one on their own clocks:
arrival gaps are drawn from a seeded stream (1.1 to 2.5 s apart), and each
mark pulses on its own period taken from a small set of ratios
(0.75, 1, 1.25, 1.5, 2, 2.5, 3 times a 3.4 s base). Brightness and radius
follow the mark's phase, so each mark breathes on its own interval and no
two share a beat. Positions come from seeded rejection sampling with a
minimum spacing, so the scatter is wide and never reads as a grid.

A slow subtractive pass begins at t = 34 s and every 13 s after: the
oldest mark still on the field is quietly carved away, fading out over
2.5 s. Arrivals continue, so the field keeps accreting and thinning at
once. The most recent arrival is always pale winter blue, with a faint
halo; every older mark is deep ink black.

Frame one is fixed at t = 16 s, so nine marks are already present as a
sparse constellation in progress, the newest one blue. All state at any
time is a pure function of that time, so the first frame is identical on
every load.

## Interaction

Drag a mark sideways to retune its interval: dragging right stretches its
period, dragging left compresses it (clamped to 1.2 to 14 s). The pulse
phase is held continuous across the change, so the mark never jumps. While
dragging, a thin ring around the mark shows its current period. The piece
is watch-only otherwise; there is no click-to-reload.

## Deviations

None from the prompt. The removal pass start (t = 34 s) and its 13 s
cadence are my choice of numbers for "slow"; the prompt leaves them open.
