# №1730 New Primes

Nine discs sized by the first nine primes breathe against each other as two octave bands cross-fade in a slow tide.

## Mechanism

A single horizontal row of large translucent discs sits centered vertically on a deep blue-black ground (#0B0F1A), with generous margins above and below. Each disc's radius is base times a prime: 2, 3, 5, 7, 11, 13, 17, 19, 23, so the row grows from a small dot on the left to a disc nearly half the stage tall on the right. Two layers share the row. The lower octave is pale gold (#D9C08A) at alpha 0.14 to 0.26 per disc; the upper octave is cool white (#E8EDF2) at alpha 0.12 to 0.22, its radii halved and its centers offset by half a step. The two layers cross-fade on a 30 second phase: at t = 0 the gold band is fully present and the white band is silent, at t = 15 they have swapped, and at t = 7.5 they meet at equal mix. The base radius also drifts plus or minus 5 percent on the same 30 second cycle, so the whole field breathes like a slow chord change. There is no beat and nothing pulses; all motion is the tide.

## Interaction

Drag horizontally to retune the fundamental. Dragging right raises the base radius, dragging left lowers it, clamped to 0.45x to 1.6x of the drift value so the largest disc never clips the viewport edge. On release the base eases back to its drift value over about 4 seconds. The system is a tuned sine network, so retuning the base retunes every disc at once while the prime ratios hold.

## Counts asserted

- Exactly 9 discs per layer, 18 discs total.
- Primes are the first nine: 2, 3, 5, 7, 11, 13, 17, 19, 23.
- Radii verified in exact prime ratios via the window.__probe harness (discRadii() / base is 2, 3, 5, 7, 11, 13, 17, 19, 23 to within 1e-9).
- Tide weights verified: t = 0 gives lower 1 / upper 0, t = 15 gives lower 0 / upper 1, t = 7.5 gives an equal 0.5 / 0.5 mix.
- Drag verified: a pointer drag from x = 640 to x = 900 at 1280 wide raises baseTarget from 10.19 to 14.74.
- Frame one is deterministic: drawAt(7.5) renders byte-identical PNGs across calls. Seeded mulberry32(1730), fixed phase t = 7.5 of a 30 s tide, no unseeded Math.random or Date.now in the first frame.
- Render QA inspected at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three read as a centered prime row with no clipped disc at any edge.

## Deviations from the prompt

None in substance. Two layout choices were made to keep the spec's own rules intact: the base radius is capped by stage size (largest disc = min(stage height x 0.25, stage width x 0.28)) so the largest disc fits the row on phones as well as desktop, and the row's rightmost center sits one largest-radius in from the stage edge so no disc ever clips the viewport. Drag retune is clamped to 1.6x for the same reason. Per-disc alphas are seeded in the 0.12 to 0.26 range, inside the specified 0.10 to 0.28 band.

## Gallery note

Nine discs sized by the first nine primes breathe against each other as two octave bands cross-fade in a slow tide. Drag to retune the fundamental.
