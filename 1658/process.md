# No.1658 — Phantom, Study for a Spectral Being

Study #218 eric-de-giuli, prompt PP905 (EDG3). Date: 2006 · 07 · 27.
Watch only. No audio.

## Driver

A statistical body condenses out of drifting particles, holds a breath,
and disperses. You are never sure it is there until it is, and never
sure when it left.

## Mechanism

2,400 soft particles drift on a near-black ground (#050505). Each cycle
the particles are drawn, weakly and with per-particle lag, toward
target points sampled from a stick-figure density map (segment lengths
weighted by warmth: torso and head warmest, legs coolest), then
released back into drift. The pose is a probability field, never a
mesh: every target point carries Gaussian jitter, 15 percent of the
particles never join the figure at all, and each particle reaches the
pose on its own lag, so the body condenses rather than snaps. Particles
are pale grey-white, warming toward (255, 233, 205) where the figure is
densest, drawn as additive soft points (a faint halo plus a small core)
so the figure reads as smoke. The figure sits centered and modest in
size (height 0.58 of the short side, never touching the edges) with vast
empty dark around it. The field is full-bleed on phones and held to the
centered square on desktop.

## Cycle timings (asserted)

48 second cycle, closed-form function of piece time: drift 12 s,
condense 10 s, hold 6 s, disperse 8 s, drift 12 s. Six pose seeds in a
fixed authored table (index 0 at load): the extended arm alternates
side and angle (from 28 degrees raised to 30 degrees lowered), with
small variations in lean, stance, and head tilt, so each cycle catches
a different pose. Frame one is fixed at t = 20 s, late condensation,
so the thumb shows the figure mostly caught with stragglers still
streaming in.

## Asserted counts

- Particles: 2,400 (2,040 figure-bound, 360 free drifters).
- Pose seeds: 6, fixed table.
- Cycle: 48 s (12 + 10 + 6 + 8 + 12).

## Determinism and safety

All randomness comes from a seeded mulberry32 RNG (seed 20260727);
no bare Math.random anywhere. First frame is a fixed phase, and the
720x720 thumb re-rendered byte-identical. Motion is slow by
construction (drift frequencies 0.05 to 0.15 Hz, flicker well below
14 Hz). prefers-reduced-motion renders a single still frame. No
interaction, no audio, no external assets.

## Deviations

- Frame one sits at late condensation (t = 20 s) rather than the drift
  phase named in the batch spec, so the thumb shows the figure
  emerging; the task brief asked for a mid-condensation first frame
  and this is the same phase family, pushed later so the figure reads.
- The head is sampled as a filled disc rather than a ring, so it reads
  as a particle cloud instead of a hollow outline.
