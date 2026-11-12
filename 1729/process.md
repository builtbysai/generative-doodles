# Voice-Leading Spiral - No.1729

A slow amber pulse climbs a staircase of thin bone-white rungs that winds upward and inward, one voicing per rung, and resets silently at the seam.

## Mechanism

The 4-note cell [0, 3, 7, 10] is expanded into its complete vocabulary: all 24 orderings (4!), generated lexicographically and presented in bass-note order so the staircase climbs with the voicings. Each rung is one ordering. Rung vertical position rises with its index along the spiral plus a small offset from its bass note; rung length is set by its interval span (distance between first and last note of the ordering, 0 to 10 semitones); four small dots along each rung mark the four notes in ordering order, placed by pitch. The rungs orbit the center through two full turns while their radius winds inward, and faint risers connect consecutive rung centers so the staircase reads as a spiral rather than a stack. The pulse travels the spiral over a 32 second loop, climbing one full bass octave, and its brightness falls off as a Gaussian over circular rung distance, so at the seam the last rung fades as the first rung lights and the loop closes with no jump in brightness.

## Interaction

Watch-only. No input. The loop is seamless and closed: the pulse returns to the bottom rung at the seam with no brightness jump.

## Counts asserted

- Exactly 24 rungs, one per ordering of the 4-note cell. Verified by construction (lexicographic enumeration of all 24 permutations) and by the render.
- Exactly one amber rung at any moment: the rung nearest the pulse, drawn in warm amber #D9A02B with a soft halo; all other rungs are bone white #EFE9DD on deep charcoal #1E1E1C.
- Loop closes: pulse position is periodic mod 32 s and brightness uses circular distance, so frame at t = 32 s matches frame at t = 0 s.

## Deviations

None from the prompt. The seeded shuffle of presentation order is superseded by the bass-note sort, which keeps the voicing pitch contour rising along the spiral; the set remains the complete 24 orderings.

Gallery note: "Twenty-four rungs, one voicing each, wind upward as a pulse climbs one bass octave and resets at the seam. Watch the pulse climb the spiral."
