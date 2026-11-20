# №1923 Saoirse

Prompt block: LK4 / PP1170, study #251 lauren-kinsella.

Driver, in one sentence: A single linen-gold melodic thread runs horizontally through a dark theatre while a 48 second state machine hands it between singer, sax, viola, and piano, with loose loops hanging off the line wherever it is borrowed and all four sounding it together in a brief reel before it returns to the singer.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo, so hex values were hand-picked from the prompt's named colors:

- Dark theatre green ground: #0c1f16, deepening to #06120c
- Curtain folds: #123324
- Thread, linen gold: #d9b96a, bright core #eed28f
- Sax, breath blue: #6fa8c9
- Viola, dried-grass amber: #c08a3e
- Piano and harmonium, low candle orange: #c96a2e
- Title ink: #e8e0c8; muted linen for date and hint: #9a937a

## Mechanism

- The thread is a pure function of time: a slow two-sine melody line whose amplitude grows with the borrow amount B, plus a quicker figure that rides it only while the reel sounds.
- The borrowing protocol is a 48 second cycle: singer 0 to 8, sax 8 to 18, viola 18 to 30, piano 30 to 40, reel 40 to 44, return 44 to 48.
- B is keyframed across the cycle (0.15 at rest, 0.45 sax, 1.00 viola, 1.25 piano, 0.70 reel, back to 0.15), smoothstepped between keys, so the stray distance of the borrowed passages decays back to the thread by rule, never by script.
- The sax mirrors the thread in breath blue, offset below the gold line and phase shifted, fading in and out with its turn. The viola stretches the thread wide. The piano lets it wander. In the reel all four gesture arcs brighten and the thread gains a dense ornament figure, but it stays a reel, not a jig caricature.
- Six loose loops hang off the line at fixed positions, above and below, in the current holder's color. Their radius follows B, so they swell while the thread is borrowed and shrink as it comes home.
- Six sean-nos curls sit fixed on the thread, brightening in the reel.
- Each agent has one gesture arc reaching from the line; the holder's arc draws bright, the others faint. A small label at the bottom left names who holds the thread now, in that agent's color.
- Dust motes drift in the theatre air from a seeded PRNG, mulberry32 with seed 1923, at fixed positions.
- Watch only. No pointer handlers, no click-to-reload. Visual only, no WebAudio: a watch-only piece cannot autoplay sound, and the prompt asks for watching the borrowing protocol, not for hearing it.
- Flicker safety: all motion runs under 1 Hz, well under the 14 Hz ceiling. Reduced motion freezes at the first frame.

## Determinism

FIRST_T = 24. At 24 seconds the viola is mid-turn, stretching the thread wide with loose amber loops hanging off the line and the sax's blue echo just faded. Frame one is byte-reproducible: every thread point, loop, arc, curl, and dust mote is a pure function of t.

## Deviations from the prompt

- The prompt names the piano and harmonium as one agent; they are treated as a single orange agent, labeled "the piano".
- The prompt's "old melody" has no score to quote, so the thread is an original two-sine melody line with fixed ornamental curls rather than a transcription.
- The theatre is suggested by curtain folds at the edges and dust in the air rather than a literal stage set.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png. All three inspected visually: title and date legible, thread unbroken edge to edge, loops and arcs visible, holder label and hint legible on all sizes. No fix rounds needed.

thumb.png is byte-identical to the 720x720 render (md5 96a272579a7bfef65f7510627094c80e).

## Known warts

- On phones the thread's wave reads steeper because the full-bleed frame is narrow, and two loops crowd the first peak; the line stays unbroken and legible.
- The lower half of the desktop frame is mostly empty dark green, since the thread and its gestures live near the center; that spareness is the prompt's composition, not a clipping error.
