# Multiplication Mass, No. 1744

ZM1 / PP991, study #229 studio-zimoun. Watch-only piece.

Gallery note: "Hundreds of unsynchronized ticking units, their summed pulse breathing at the base. Watch only."

## Driver

The felt phenomenon is hundreds of unsynchronized ticking units whose
summed pulse breathes irregularly. The mechanism is per-unit oscillators
with irrational period pairs, grouped into twelve slow breathing clusters
whose envelopes drift in and out of phase, with the emergent aggregate
rendered as the pale band at the base. No stage directions: the piece is
the asynchrony and its sum.

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim: a dark field holding
hundreds of tiny ticking units, each a small mark with a rotating whisker;
their whiskers never agree, and the field's overall pulse swells and
thins in a rhythm that never repeats.

## Decisions

- Palette hand-picked from the prompt's named colors; studies file
  studies/studio-zimoun.md does not exist locally. Near-black ground
  #0B0A09, units in warm cardboard tan #C8A06A with a darker tan #9A7648
  for about a quarter of them, pale whisker grey #C9C4BB, aggregate band
  in pale #D8D2C4.
- Units: exactly 600 on a jittered 30 by 20 grid filling the frame edge
  to edge, like the Le Centquatre wall. Each unit is a tan dot with one
  pale whisker. Whisker angle turns once every 5 to 13 seconds; whisker
  length follows the unit's own tick size times its cluster envelope,
  damped by a per-unit friction factor from 0.5 to 1.
- Tick: product of two sines with irrational period pairs (2.1 to 6.8 s),
  golden-ratio spaced, so no two units share a beat and nothing
  quantizes to a metronome.
- Aggregate: twelve clusters of fifty units, each cluster with a slow
  breathing envelope of 19 to 50 seconds, irrationally spaced. The band
  shows the mean unit energy (absolute tick times cluster envelope),
  normalized by the theoretical mean of |sin*sin|, (2/pi)^2 = 0.4053.
  Band height and glow follow that aggregate, confined to the bottom
  margin (at most 7.5 percent of frame height).
- First fix, caught by the probe: the naive aggregate (mean of
  0.5 + 0.5*tick) averaged out to 0.48-0.52 across 600 independent
  units, moving the band only 43.0 to 44.7 px. The cluster-envelope
  energy measure replaced it; the band now swings 38.7 to 49.7 px.
- Interaction: watch-only. No pointer handlers, no click-to-reload.
- Determinism: mulberry32 seed 1744 for every unit property, frame one
  fixed at t = 10.0 s of the 60 second cycle. The thumb re-rendered
  byte-identical across runs.
- Plates: title, formula date 2006-10-21 and hint on dark plates with a
  tan rule, title top-left and hint top-right, so neither covers the
  pulse band at the base. Field-like composition: full-bleed on phones,
  square on desktop.
- Flicker safety: fastest motion is the 2.1 s tick, about 0.5 Hz by
  construction, well under the 14 Hz ceiling.

## Verification

- Unit count assertion (node probe): unitCount = 600 PASS.
- Aggregate amplitude probe (normalized 0 to 1, band height at 900 px
  frame): t=0s 0.5154 / 44.6px, t=2s 0.5330 / 45.4px, t=5s 0.6228 /
  49.7px, t=8s 0.6223 / 49.7px, t=10s 0.5466 / 46.1px, t=13s 0.5003 /
  43.9px, t=17s 0.4015 / 39.2px, t=21s 0.3907 / 38.7px, t=25s 0.4055 /
  39.4px, t=30s 0.4929 / 43.5px, t=37s 0.5421 / 45.9px, t=44s 0.5460 /
  46.0px, t=50s 0.4888 / 43.3px, t=57s 0.5235 / 45.0px. The pulse
  swells to 0.62 and thins to 0.39 irregularly, never repeating.
- Renders inspected: desktop 1280x900, mobile 390x844, thumb 720x720.
  Field fills the frame on all three, plates legible, band visible at
  the base.
- Thumb re-render byte-identical (md5 match).

## Deviations

None from the prompt. Palette hexes hand-picked, as the studies file
does not exist locally; the aggregate measure uses cluster envelopes
(see first fix above) so the band visibly breathes, as the prompt
requires.
