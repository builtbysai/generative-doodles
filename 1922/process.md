# №1922 Language of Ghosts

Prompt: LK3 / PP1169, study #251 lauren-kinsella. Build spec in the task brief, verbatim from TASKS.md.

Driver: a slow word clock feeds invented narrative lines into the lower third while an unsynced veil agent wanders the upper field, its attention brightening and misting the words it chooses.

## Palette

Hand-picked from the prompt's named colors. The study file studies/lauren-kinsella.md does not exist in the repo, so no hex values could be lifted from it.

- Stage blue-black ground: #070b18, near-black back of stage #04060f
- Poet's text, faded newsprint grey: #8f8a7d, brightening to #ece9dd where the veil touches
- Ghost veil, pale smoke white: #d8d6e2
- Ghost veil, dim violet: #7d6fa8, deep violet #4a3f73
- Title #dfe3ea, date and hint #8f97ad

## Mechanism

- Text scheduler: five invented lines, one word every 1.5 s, each line holding 4.5 s then fading out over 1.2 s. Full cycle about 96 s. Lines are original inventions, no real poem text.
- Veil agent: a focus point wanders on two slow sines and dips down to the text band on a separate slow cycle. It is not synced to the word clock.
- Attention: a soft gaussian around the focus, sigma 0.15 of stage width. A word brightens from newsprint grey toward pale smoke as attention rises, and a soft radial smoke patch grows over it, so a fully haunted word is felt and not read.
- Syllable sprites: 36 fragments on a 48 s cycle, unsynced to the words. Each drifts in the upper two-thirds; when its assigned word slot is lit, the sprite pulls toward that word. Syllables are invented breath fragments, never words from the poem, so the voice stays texture and never illustration.

## Determinism

- FIRST_T = 31. At 31 s, line two is eight words in and the veil is dipping onto the words on the right.
- Seeded PRNG mulberry32(seed = 1922) fixes the sprite cast. Every word, sprite and veil blob is a pure function of t, so frame one is byte-reproducible.
- Motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.

## Audio

Visual only. No WebAudio: a watch-only piece cannot autoplay sound, and the voice is texture in the image, not audible audio.

## Interaction

Watch only. No pointer handlers, no click-to-reload. Gallery note cue: "Watch the veil choose its words."

## Dates

Gallery date 2007 · 04 · 17, formula 2002-01-10 + 1923 days.

## Deviations from the prompt

None material. The prompt's "framing whole phrases" is rendered as the soft smoke patch plus brightening on individual words; no separate phrase frame is drawn, since the patch already reads as the veil choosing its words.

## Known warts

- The upper field is deliberately sparse and dark; at some moments only a few syllable sprites are visible, which is the veil being breathy, but the first frame can read quiet next to busier pieces.
- On narrow phones the narrative line can sit close to the hint; both stay legible and unclipped in the 390x844 render.
- A sprite can drift across the stage line or overlap a word without being lit; that is intended drift, not a bug.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected visually. Fix rounds: 3.

1. Veil too sparse and focus never reaching the words at first frame: raised sprite count 26 to 36, lifetimes 8-14 s to 10-18 s, peak alpha up, and rephased the dip so it lands on the text band at FIRST_T.
2. Word halos read as hard soap-bubble ellipses: lowered halo and wash alphas.
3. Hard outlines still showed: replaced the ellipse halo and wash with a single soft radial-gradient smoke patch per chosen word.

thumb.png is byte-identical to the 720x720 render, md5 beb92e5bd3868728d59a3e549221d96a. No em dashes in visible copy.
