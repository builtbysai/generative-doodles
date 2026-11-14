# Hydrophone, No. 1760

Felt driver: listening, not looking. A hydrophone cable hangs from the
surface into black-green water; the world below stays half-heard, and the
only thing that reads clearly is the glow at the cable tip, where plankton
gather like sound around a microphone.

Spec: TASKS.md prompt block PP1007, study #231 simon-scott (SS1), cited
verbatim in the build task. No spec file was invented; the build follows
PP1007 as given.

Mechanism: canvas 2D, two layered particle fields. The surface ripple is
a slow sine warp of three cold grey lines plus expanding rings where the
cable pierces the surface, on a 47 s period. The underwater drift is
per-particle noise: 130 seeded motes orbit the cable tip with slow
sinusoidal drift and twinkle, plus 7 large faint blobs for the half-heard
shapes, on a 47 x sqrt(2) s period, an irrational pair, so surface and
depth never synchronize. Brightness falls off with distance from the
cable tip, so the tip is the brightest point in the piece.

Palette: near-black green water (#04100B ground to #020805 deep), cable
in rust orange (#B4551F to #7A3410), motes in pale phosphor green
(#9FE8B0) and dim amber (#D9A45B), surface ripple in cold grey (#8FA6A0).

Periods: surface 47 s, depth 47 x sqrt(2) s (about 66.5 s).

Frame one: fixed phase t = 60.0 s, surface mid-ripple, motes gathered
around the tip. All randomness is seeded (mulberry32, seed 1760); no
Date.now, no unseeded Math.random, no performance.now in the visuals.
Watch only; prefers-reduced-motion renders a still frame. Flicker is
slow sinusoidal drift only, well below 14 Hz by construction.

Deviations from the prompt: none. The horizon sits high (16 percent of
frame height), the cable enters from top center, the underwater field is
deep and empty with activity clustered at the tip, and the camera never
goes below the surface.

Gallery: date 2006 · 11 · 06 (formula 2002-01-10 + 1761 days). Note cue:
"Watch only."
