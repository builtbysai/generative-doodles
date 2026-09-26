# №8985 · Two Values

A wall plotter imagined living in two spaces at once: the drive signals and
the wall output they draw, side by side.

## Concept

A virtual wall plotter existing in two spaces at once. Two motors hang at the
top corners of a wall; two cables run down to a gondola that carries the pen.
The drive signals are two phase-shifted near-sine cable-length waves, and
those waves ARE the composition: they are drawn large, as a musical score,
in the left panel ("signal space"). The right panel ("wall space") hangs the
plotter output computed live from the same signals: each frame, the gondola
position is resolved from the two cable lengths by circle intersection, the
cables are redrawn in the two signal colors, and the pen lays ink on a fading
layer. A hairline ghost of the full 60-second cycle is printed under the ink,
so you see the plan and the execution together. The piece loops seamlessly
every 60 seconds.

## Method

- Seeded RNG (mulberry32). Each seed picks: wave frequencies (1, 2, or 3
  cycles per 60 s master period, never equal), base phases (kept at least
  ~0.55 rad apart so the shift stays legible), amplitudes, second-harmonic
  strength and phase (this is what makes them near-sines rather than pure
  sines), and one of four paper/ink palettes.
- Gondola math: with motors at (±D/2, 0) and lengths L1, L2,
  a = (L1² − L2² + D²) / 2D, h = sqrt(L1² − a²), gondola at (motorX + a,
  motorY + h). Amplitudes are bounded so the circles always intersect.
- Left panel: full-period static traces with wash fills, dashed rest-length
  line, time ticks, a sweeping playhead with now-dots, and live cable-length
  readouts in centimeters (motors imagined 120 cm apart).
- Right panel: fading ink layer (destination-out fade, 18 s time constant),
  so the drawing grows and breathes instead of clogging.
- Click anywhere (or press R) for a new seeded variation.
- Vanilla canvas, no libraries, no network. Responsive: side-by-side panels
  on desktop, stacked on narrow screens.

## Seed

Default seed: 271828 (recorded in the file as `let seed = 271828`).

## What was tried

Rendered 12 seeds headless and looked at every one. Early builds had two
real bugs, both caught on the screenshots: the playhead was stuck at the left
edge (the trace sampler took a sample index, I passed a 0..1 fraction), and
the ink vanished instantly (the fade used 1 second instead of the frame dt,
so it decayed 60x too fast). Both fixed. Amplitudes were raised once
(0.10-0.15 to 0.13-0.19 of D) after the first renders showed the drawing
reading too small against the wall. One rejected direction: an oscilloscope
style with scrolling waves; the full-period score with a sweeping playhead
felt more composed and made the phase relationship between the two signals
legible at a glance, which is the whole point.

## Why the final variant won

Seed 271828 gives the best balance of the two spaces: cable 1 shows the
near-sine character most clearly (three humps with visible harmonic
shoulders, not pure sine), cable 2 answers with two smooth humps, the phase
offset reads instantly, and the drawn path is the largest and most expressive
of the batch (a sweeping loop with a cusp). Palette is blue/crimson ink on
cool paper. Every seed rendered clean: no degenerate paths, no console
errors (verified with cdp_exceptions.py, exit 0).
