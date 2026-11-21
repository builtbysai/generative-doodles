# №1956 Vernell's Dice

Prompt block: TC5 / PP1203, study #255 tom-challenger.

Driver, in one sentence: a child's hand-drawn game board rests on a wood table with a pair of dice on its corner, five small tokens, and blue triangle/dash/dot marks in every square, and tapping the dice throws them so the dice decide which of the four sections plays while the tokens in that section set how dense the light shapes blooming above the board are, so the piece feels like serious improvisation played over a child's rules.

## Palette

Named colors from the prompt, hand-picked hexes: paper cream #f7f2e4 with edge shade #e9e2cf; crayon blue #2b4fd8 with darker blue #1e3a9e; crayon red #d9261c; table wood #8a5f3c with light #a87a52 and dark #6b4a2f; dice white #fdfcf7 with near-black pips #2b2b28; plate ink warm dark brown #3a3128, plates in cream on the wood.

## Mechanism

- Table and board: warm wood with plank seams and faint grain strokes fills the stage; the board is a cream paper square with a soft shadow, a hand-drawn 4x4 grid (wobbly lines, heavier double-drawn border), centered and a little below center. Field-like composition: full-bleed on phones, square on desktop.
- Notation: every square holds one Yarns-like mark, a blue triangle, a red dash, or a blue dot, placed with a seeded jitter so each square reads hand-marked. Marks in the playing section draw a touch larger, and a faint blue wash covers the playing 2x2 quadrant, with a small blue triangle marking its column on the board's top edge.
- Sections and dice: the four 2x2 quadrants are sections 1 to 4 (top-left, top-right, bottom-left, bottom-right). The dice sum picks the section: section = ((d1 + d2 - 2) mod 4) + 1. The dice rest on the board's bottom-right corner, spilling onto the wood.
- Tokens and density: five tokens, blue and red alternating, are dealt into five distinct squares from a seeded shuffle. Density is the count of tokens in the playing section (0 to 5). The bloom above the board holds 4 plus 6 marks per token in the section, and its size follows the dice sum: sums 2 to 4 small, 5 to 8 medium, 9 to 12 large.
- Bloom: the current state made visible above the board, blue triangles, red dashes, and cream dots drifting slowly over the playing section's column, over a faint cream glow. A fresh throw fades the bloom in over about a second.
- Throw: tapping either die (generous hit area around both dice) throws. New dice come from the seeded throw sequence, the tokens are re-dealt, and the section and density shift. The board, the marks, the palette, and the layout stay put, so a throw is a structural event, not a reseed. There are no scores and no winner; the dice are a score, not a contest.
- Audio: visual only, no WebAudio. The improvisation is a closed-form visual sound model, per the Franke audio rule. No click-to-reload; a tap on the dice never reloads.

## Determinism

- FIRST_T = 6. At t = 6 the dice show 3 and 4, so section 2 plays, two tokens sit in section 2 for density 2, the bloom holds 16 marks, and the glow is open, so the piece reads at once.
- Seeded PRNG mulberry32(1956), fresh instances per draw from the piece number and fixed salts; every frame is a pure function of t plus the dice and token state, which only changes through a throw, so frame one is fully reproducible. The throw sequence is seeded too: throw 1 is always 4 and 6, throw 2 is always 4 and 1.
- Motion is slow: bloom drift about 0.05 to 0.1 Hz, glow pulse about 0.06 Hz, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?throw=<n> to apply n throws at load, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1956 exposes throwDice(), section(), density(), tokensInSection(), dice(), throwCount(), bloomCount(), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 6, dice 3 and 4, section 2 of 4, density 2, bloom 16 marks, thumb md5 4a69bc03c124330922bf004c2df47fbe. Second 720x720 render byte-identical to thumb.png.
- Time probe: ?t=12 at 720x720, md5 a9a8964f194fc566a62d257471a8a8e9, different from frame one.
- Throw probe (tap simulation: throwDice() then draw at t = 7): dice 4 and 6, section 2 to 1, density 2 to 3, bloom 16 to 22 marks, md5 28e79438dfb23b2d8cfd971bf8325121, different from frame one; the render shows the bloom moved to the left column and grown denser, the wash moved to the top-left quadrant, the tokens re-dealt, and the plate reading Section 1 of 4, Density 3.
- Throw 2 probe: dice 4 and 1, section 4, density 1, bloom 10 marks, md5 81cfb66a5c99c5a3ecc6598a620a9948.
- ?throw=1 at load: dice 4 and 6, section 1, density 3, bloom 22, md5 9e0b285205a109ef94a27a4a0fc16b14 (differs from the tap simulation only by the bloom fade state, which is settled at load).
- index.html md5 7f7106f53f83623c3cc50818347109de.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its cream pill on all sizes, board centered with the bloom above it, dice on the bottom-right corner, tokens and marks reading as a child's board, hint pill clear of the dice.
- Throw probe render inspected: section and density changed, bloom reconfigured, no full reseed (board, marks, palette, layout unchanged).
- No em dashes in visible copy or in this file.

## Fix rounds

1. First probe showed frame one at density 0 (no tokens dealt into section 2), so the bloom held only 4 marks and read thin, and the first throw kept section 2. Adjusted the deal salt (77 to 85) so the opening deal puts 2 tokens in section 2, and the dice salt (5 to 6) so throw 1 lands on 4 and 6, section 1. Re-probed: frame one density 2 with 16 bloom marks, throw 1 section 1 density 3 with 22 marks.
2. First renders showed the bloom glow as a hard-edged tan disc that read like a moon, with marks spilling past its edge, and two tokens in adjacent squares overlapping across a grid line. Widened the glow (radius 0.11u to 0.16u) and made it fainter (alpha 0.10 to 0.05), narrowed the bloom spread (0.34u to 0.30u), and tightened the token jitter (0.34 to 0.22 of a cell). Re-rendered all three sizes and re-gated byte-identical.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The opening dice 3 and 4, the five tokens, the section formula from the dice sum, the density rule (tokens in the section), the bloom count 4 plus 6 per token, the dice-sum size bands, and the board and dice placement are invented staging for the named mechanism, so frame one already reads as a game mid-play.
- The prompt calls the dice a score, not a contest, with no scores. The piece keeps no score anywhere; the plate shows only the section and the density.
- The prompt says the state blooms above the board as light shapes. The bloom is a faint cream glow plus drifting triangles, dashes, and dots in the band directly above the board, over the playing section's column.

## Known warts

- The bloom glow is a flat disc, so its edge is faintly visible against the wood at desktop size even at low alpha; it reads as a pool of light, but the edge is there if you look for it.
- On a tall phone the board sits in the middle of a long wood field with empty table below it; the dice and the hint pill anchor the bottom, but the lower third is plain wood.
- Two tokens in vertically adjacent squares can sit close across the shared grid line and read as a stacked pair; they are distinct discs with rims, but the pairing is accidental, not a rule.
- A token can cover most of the mark in its square; the marks under tokens are partly hidden at thumb size.
