# №1926 Climates for the Ear

Prompt block: LK7 / PP1173, study #251 lauren-kinsella.

Driver, in one sentence: three emitter agents at triangle points in a dark field, the Voice breathing out words, the Sax fluttering amber moths, the Piano sitting a low brown drone like weather, with iridescent climate pockets forming where the emissions overlap and words surviving longest sheltered inside them, all drifting on a slow current with no pulse and no conductor.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: near-black blue #070b14, word-breath pale smoke #cfd4d6, sax-moths dusty amber #c9a35f with lighter glow #e2c98d, the drone deep organ brown #4a3220 with lighter haze #6b4a2e, climates in shifting iridescent washes of teal #5fa8a0, violet #8d7fc0 and rose #c08a9a, date line and hint muted blue grey #7e8a99.

## Mechanism

- Emitters at triangle points: Voice upper left, Sax upper right, Piano lower center, each a small quiet mark with a lowercase label.
- Voice words: twelve short original words (low, air, hush, slow, blue, held, thin, warm, drift, soft, near, still) on staggered cycles of 30 to 48 seconds, fanning out across a wide arc and drifting toward the center on the slow current. Ages are staggered evenly across the cycle so the words spread along their whole flight path instead of bunching young at the emitter.
- Word-breath: thirty pale smoke puffs exhaled by the Voice, expanding and thinning as they drift.
- Sax moths: thirty-four dusty amber specks fluttering away from the Sax on two incommensurate sines each, so the swarm never moves as one; about a third carry a faint wing tick.
- The drone: four wide deep brown bands around the Piano emitter, each undulating on its own slow frequency, sitting like weather rather than pulsing.
- Climates: four pockets, one at each pair overlap plus a small central one where all three emissions meet. Each center drifts on its own slow sines and its radius breathes slowly, so pockets merge and dissipate on the current. Each pocket is two layered radial washes in its own pair of hues, drawn additively with a faint rim.
- Density: a word's decay rate is computed from the strongest climate pocket covering it; sheltered words decay at a third of the open-air rate, so words survive longest inside their own climate.
- The slow current is a field-wide drift on incommensurate frequencies, so nothing ever repeats in lockstep.
- Interaction: watch only. No pointer handlers, no click-to-reload, no drum or pulse layer.
- Audio: visual only, no WebAudio. A watch-only piece cannot autoplay sound, and the prompt asks for weather, not a soundtrack.

## Determinism

- FIRST_T = 60. By then every climate pocket is formed, the voice climate hangs upper center, the sax climate lower right, the piano climate lower left, and a small central pocket sits where all three overlap, with words mid-flight and several sheltered inside climates.
- Seeded PRNG mulberry32(1926), one fresh instance per draw, so every frame is a pure function of t.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 dd592d5a8faa9d135a55cc061532d4e6).

## Fix rounds

1. First frame showed the words piled in a knot at the Voice emitter, hiding the voice label, the climate rims read as hard bubble edges, and the brown drone haze dominated the lower half. Moved the voice label above its mark, shrank the climate radii and softened their washes and rims, cut the drone to four narrower fainter bands, and fanned the words across a wide arc.
2. After round 1 the words still bunched young at the emitter. Staggered word ages evenly across each cycle and raised the minimum flight distance, so the words spread along their whole path.
3. After round 2 desktop and thumb passed but mobile words still crowded in one horizontal band. Widened the vertical component of the word fan on tall phone fields. Clean on all three sizes after this round.

## Deviations from the prompt

- The twelve words are original lines written for the piece, not quoted lyrics; the prompt names no words.
- Climate pockets are computed as drifting discs at the pair overlaps plus a central disc, rather than from a live particle-density field; the disc centers and radii are the overlap model, and word decay reads the pocket density at each word's position.
- The drone is rendered as wide soft brown bands around the Piano emitter rather than a single flat haze, so the weather has slow visible structure without ever pulsing.

## Known warts

- Not every word is visible at frame one: a few are early in their cycle or fully decayed, which is the weather working as designed, but the first frame shows about nine of the twelve words.
- On mobile the breath puffs drift across the voice label now and then; they are faint and the label stays legible.
- The composition is deliberately sparse in the lower corners: large quiet field around the triangle, which reads as empty space in the thumbnail at a glance.
