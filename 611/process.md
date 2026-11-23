# №1927 Revisited in a New Light

Prompt block: LK8 / PP1174, study #251 lauren-kinsella.

Driver, in one sentence: one fixed melody line in candle gold with a piano line just below it, while twenty-eight ensemble lines in four arranger colors join one by one and then leave in reverse order, and a global light wash brightens and dims with the headcount, so the same song is heard twice, differently.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: dim room #171208, noon-bright room #f6efdc, voice candle gold #d9a441 with lighter glow #eec27a, piano near black #141414, arranger colors sage #8a9a7b, rust #b4552d, indigo #3d4a7a, copper #b87333. Plate ink is dark #241d12 on bright ground and bone #ece6d8 on dim ground, flipping with the light.

## Mechanism

- Cycle 120 s: duo for 15 s, growth from 15 to 75 s, full thirty-piece hold to 90 s, thinning from 90 to 105 s, duo again to 120 s. No crescendo: the arc is a change of light, not a build to a climax.
- The melody is one fixed path, a pure function of x (two slow sines across the width). It never changes shape at any headcount. The piano is a second fixed line 0.030 H below it, drawn as a dark core over a thin gold under-stroke so it reads on dim ground and on noon-bright ground alike.
- Twenty-eight ensemble layers stack above and below the melody in alternating pairs, each in one arranger color cycling sage, rust, indigo, copper, each with a fixed stack offset, wave frequency, phase, and five note dots from the seed. Each joins over a 2 s fade and leaves over a 1.5 s fade, in reverse join order.
- Light: a global wash mapped to the active layer count, counting partial fades, rising faster than the headcount (power 0.6) so a few joining lines already lift the room well out of the dark. The ground lerps from dim brown to warm paper, a sun glow in the upper right strengthens with the light, and faint room-wall seams appear as the light rises. The headcount readout at top right ("17 of 30" at frame one) and a phase word ("the room brightens") track the arc.
- Interaction: watch only. No pointer handlers, no click-to-reload.
- Audio: visual only, no WebAudio. A watch-only piece cannot autoplay sound, and the prompt's reward is seeing the same song grow large, not hearing a soundtrack.

## Determinism

- FIRST_T = 48. At t = 48 about sixteen ensemble lines have joined, the headcount is seventeen of thirty, and the light is mid-bright.
- Seeded PRNG mulberry32(1927), one fresh instance per draw for the melody note dots; layer geometry is fixed at load from the same seed. Every frame is a pure function of t.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. No clipped text, no plate collisions, the gold melody legible at thumb size, ensemble lines distinct from the melody, light wash mid-bright at frame one.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 8b70b41d56ae6b81d73361690a5aba0d).
- No em dashes in visible copy or in this file.

## Fix rounds

1. First frame (linear light mapping) read as dull taupe rather than mid-bright. Changed the light curve to rise with power 0.6 on the active fraction, lightened the noon ground to #f6efdc, and strengthened the sun glow. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt calls the growing ensemble a thirty-piece piece; the piece renders the duo plus twenty-eight joining lines, thirty lines in total at the hold, which matches the count.
- The prompt names no note positions or wall details; the note dots, the sun glow, and the faint room-wall seams are invented staging for the light and the headcount, not prompt content.
- The phase word and headcount readout are added as legible labels for the arc; the prompt does not ask for them, but they make the automatic arc readable at frame one.

## Known warts

- The composition is deliberately a horizontal band: large fields of warm paper above and below the stacked lines, which read as empty space in the thumbnail at a glance.
- The piano black line tangles visually with the lowest ensemble lines near the melody at frame one; it stays readable as the darkest line just under the gold melody.
- On phones the stack reads slightly crowded in the middle third, though every line stays distinct in its own color.
