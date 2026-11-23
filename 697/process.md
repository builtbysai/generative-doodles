# №9001 · Kaleid 99 — process

Seed 17 from the 2026-09-23 Olivia Jack / Hydra study ("Kaleid 99"): the
live-coding "99 is a magic number" trick as a print-like piece.

Recipe, from the study's re-rendered patch A
(`osc().mult(shape().repeat()).kaleid(5)`), translated to a seeded still:
an oscillator sampled on kaleidoscope-folded coordinates (99 mirrors),
thresholded into hard op-art stripes, pixelated in folded space for a print
blockiness, monochrome with one accent color, tight grain and sparse ink
speckle on warm paper. No rainbow: the study's own avoid-list warns that
unmodulated full-saturation osc plus kaleid is generic psychedelic
wallpaper, so this piece keeps one ink, one accent (seeded: rust, indigo,
or ochre), one modulator (an angular warp on the oscillator).

Structural fix found during inspection: one candidate seed rendered as a
near-blank sheet because the fixed threshold missed the band distribution.
Fixed at the root: the threshold is now the seeded quantile of the actual
band-value distribution, so every seed lands a real print (35-65% ink).
Deterministic per seed.

Seed 99017 is the default: concentric bands with an indigo accent ring and
pixelated kaleid edges, the clearest op-art print read of the candidates.
Click regenerates with a fresh random seed.
