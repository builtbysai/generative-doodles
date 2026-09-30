# №8944 · Seventeen Microns (2026-07-07)

Seed: 249 (Seventeen Microns, from the cloud droplet arithmetic)

Concept: a cloud is a negotiation between falling and rising. The slider
sweeps droplet diameter on a log scale from 5 to 100 µm. Live Stokes-law
settling velocity is computed against a fixed 1 cm/s ambient updraft
(rising arrows in the chamber). Below the crossover the droplets float
and glow; above it they streak and rain. The number is found by play,
then revealed: ~18.2 µm, computed from the constants, not asserted.

Technique notes:
- Stokes law in SI units: v = g·d²·(ρw−ρa)/(18·μ), updraft 0.01 m/s.
  Crossover solved analytically: sqrt(updraft·18·μ/(g·(ρw−ρa))) ≈ 18.2 µm.
- 46 droplets advected by net velocity through a chamber mapped to 12 cm
  of cloud; floaters glow amber with a soft halo and bob, rainers draw
  motion streaks scaled to fall speed.
- Log-scale slider; "show the number" toggles the crossover readout and a
  dashed marker on the slider track.
- QA: desktop 1280x800 and mobile 390x844 inspected (both floats and
  rains states), zero console/page exceptions. Thumbnail at 1280x720.
