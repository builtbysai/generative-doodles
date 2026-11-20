# №1920 Somewhere In Between

Prompt block: LK1 / PP1167, study #251 lauren-kinsella.

Driver, in one sentence: one voice agent whose register state drifts on two slow incommensurate sines and never settles, rendered as a ribbon whose local mode (gold sung curve, pale grey typewriter text, moss and rust phoneme beads) follows the state with hysteresis, while dragging biases the state toward sung on the left and sounded on the right.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: deep ink black #0b0b0e, lyric fragments bone white #ece6d8, sung curve warm gold #d9a441 with lighter glow #e8c37a, spoken text pale grey #b9b9b2, phoneme beads moss green #7d8f5a and rust #b4552d, date and hint muted grey #8a8a82.

## Mechanism

- State s on [-1, 1]: -1 sung, 0 spoken, +1 sounded. Target drifts as 0.55 sin(0.05t + 1.3) + 0.35 sin(0.11t + 4.0); the displayed state chases the target at 0.45/s, so transitions smear instead of snapping.
- Local register adds a slow spatial wave (amplitude 0.7) so the states bleed left to right and different parts of the ribbon sit in different registers at once.
- Sung: smooth gold curve with a soft glow, plus bone-white lyric fragments riding the curve. Spoken: three pale grey fragments typed letter by letter with a steady block cursor, on alternating rows below the ribbon. Sounded: 64 seeded phoneme beads (oh, el, hem, ph, ah, tsk) in moss and rust that scatter from the ribbon and re-gather on a slow cycle; about a third carry their label.
- Vowel stretch: three seeded vowels (o, a, e) stretch up to three times their natural width on a slow breath before the line proceeds.
- Interaction: drag only. Drag left biases toward sung, drag right toward sounded; release lets the state drift back to the liminal middle. A thin gold ring marks the hand while dragging. No click-to-reload, no other interaction.
- Audio: visual only, no WebAudio. A watch/drag piece cannot autoplay sound, and the prompt asks for a voice that refuses to settle, not a soundtrack.

## Determinism

- FIRST_T = 45. At t = 45 the voice is crossing the liminal middle: gold curve left, typewriter text center, beads right.
- Seeded PRNG mulberry32(1920), one fresh instance per draw, so every frame is a pure function of t.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Drag probe via the ?sx=/ ?sy= QA hook: default thumb md5 0621594393d8231711a20c8194fd822e; probe sx=200 (drag left) md5 15da80a423e3c30caba04f2ccd4039d7, the ribbon runs as a full gold curve with all three lyric fragments and almost no beads; probe sx=560 (drag right) md5 3dede6bba8d1ec35b60874c37d519d1f, the ribbon dissolves into beads across the full width and the gold curve is gone. Both probes show the gold hand ring at the drag point.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 0621594393d8231711a20c8194fd822e).

## Fix rounds

1. First frame (FIRST_T 17, spatial amplitude 0.45) showed almost no gold curve, and the five spoken fragments overlapped each other on narrow widths. Changed FIRST_T to 45, raised the spatial amplitude to 0.7, cut lyrics to three and spoken fragments to three shorter ones, and staggered the spoken rows.
2. After round 1 the right spoken fragment still collided with its neighbour when clamped at the edge. Shortened the third fragment to "one by one" and put the spoken fragments on alternating rows below the ribbon. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt names lyric fragments only in passing, so the three sung fragments ("somewhere in between", "a note half sung", "held between registers") and the three spoken fragments ("the voice flattens", "slow, like typing", "one by one") are original lines written for the piece, not quoted lyrics.
- The phoneme set is the prompt's own list (oh, el, hem, ph, ah, tsk); the "tsk, tsk" pair appears as two separate beads rather than a paired glyph.

## Known warts

- At the default first frame the first spoken fragment is mid-typing ("the v" with its block cursor); that is the typewriter working as designed, but the frame reads slightly unfinished on first glance.
- A stretched vowel can sit on top of a bead label where the registers overlap; the layering is intentional, but at small sizes the "a" and a nearby "ph" can look crowded.
- The composition is deliberately sparse: a large field of ink black above and below the middle-third ribbon, which reads as empty space in the thumbnail at a glance.
