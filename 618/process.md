# №1959 Two Generations

Prompt block: TC8 / PP1206, study #255 tom-challenger.

Driver, in one sentence: lineage as exchange: two agents with different phrase-length and register priors trade calls and responses over a shared drone bed, their phrases arcing between them as fading light trails, with silences as dark gaps; it is a lineage, not a contest.

## Palette

Named colors from the prompt, hand-picked hexes: stage black #0d0d10; young reed gold #f2c14e with highlight #f7d774; old bronze #a97c3f with dark bronze #7d5a2c; breath white #f2ede1; drone bed warm dark #3a3226.

## Mechanism

- The stage: stage black ground, full-bleed on phones, square on desktop. Two voices stand on a baseline at 60 percent of stage height on desktop (52 percent on phones): the young voice left in bright reed gold, the old voice right in dark bronze. Each voice is a glowing point with a short reed flare of lines, bright and wide while its phrase sounds, dim and small while it listens.
- The exchange: one 64 second cycle, repeated with per-cycle variation. The template is young calls (0 to 4 s), old answers (6 to 16 s), young darts (17 to 20 s), overlap with both voices (21 to 31 s), silence (32 to 40 s), old calls (40 to 49 s), young answers (50 to 55 s), and a close together (57 to 63 s). Silences are dark gaps where only the drone bed sounds.
- Phrase-length and register priors: the young voice speaks in short phrases of 2 to 5 seconds with 5 to 9 quick notes, high register (arc apex 0.75 to 1.0 of the arc height band). The old voice speaks in long phrases of 6 to 12 seconds with 2 to 4 long notes, low register (arc apex 0.25 to 0.5 of the band). Note counts and per-note jitter vary by cycle through a seeded rng, so each cycle is a fresh exchange under the same priors.
- Phrase trails: each phrase draws as a light arc from its speaker across toward the other voice, apex height by register, with notes as dots along the arc and a bright breath-white head dot at the leading edge. A finished phrase fades as a ghost over 8 seconds, then the stage goes dark again. The plate names the current phase (Call, young; Response, old; Overlap; Silence; and so on).
- The drone bed: a low warm band with a thin breath-white line under the whole exchange, breathing slowly at about 0.08 Hz. It is the shared ground both voices stand on.
- Watch only. There is no pointer interaction, no click-to-reload, no score, no winner. The viewer witnesses the lineage.
- Audio: visual only, no WebAudio. The improvisation is a closed-form visual sound model, per the Franke audio rule. Never autoplay, because there is no audio at all.

## Determinism

- FIRST_T = 24. At t = 24 the exchange is in overlap: the young phrase (21 to 26 s) is 60 percent played and the old phrase (22 to 31 s) is 22 percent played, so two arcs cross the stage at once and frame one already shows the lineage in motion.
- Seeded PRNG mulberry32(1959), fresh instances per draw from the piece number, cycle, and phrase index; every frame is a pure function of t, so frame one is fully reproducible. Motion is slow: the drone breathes at about 0.08 Hz and the exchange advances through its 64 s cycle, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, and ?seed=<seconds> is accepted as an alias for the same clock so the node-canvas render tool (which passes its probe value as ?seed=) can verify that the frame changes over time. window.__draw drives draw() with a virtual clock, and window.__piece1959 exposes phase(t), cycle, redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 24, phase Overlap, both arcs visible, thumb md5 530fd3a9e6df6a01a6c9a1ff8c5e9808. Second 720x720 render byte-identical to thumb.png.
- Time probe t = 36 at 720x720, md5 9faa32a619f952f2084e2b86a6e3dfe3, phase Silence: no active phrase, only fading ghost arcs, voices dim. Different from frame one.
- Time probe t = 52 at 720x720, md5 13a0c7237e7b083990f835cacdcae8b7, phase Response, young: young arc active with a bright head dot, old arc a fading ghost. Different from frame one and from t = 36.
- index.html md5 b55e7abaca97d1265b0e3f02d99ae82b. No em dashes in visible copy or in this file. No WebAudio anywhere.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its dark pill on all sizes, voices and arcs clear, phase readout correct at each probe.
- Time probes inspected: t = 36 shows the Silence phase with only ghosts, t = 52 shows the young response with a bright head dot. The exchange visibly differs across t.

## Fix rounds

1. First mobile render showed the exchange sitting low in a tall black field, with a large empty band above the arcs. Added a phone branch to layout(): baseline at 52 percent of height instead of 60, arc height 0.42 of the short side instead of 0.30, drone line at 70 percent instead of 82. Re-rendered all three sizes and re-gated byte-identical; the desktop and thumb renders were unchanged by the fix (thumb md5 identical before and after).
2. First edit of that fix dropped the shared voice-position lines from layout() and left a syntax error, caught immediately by the render tool (SyntaxError). Restored the shared lines after the phone/desktop branch and re-rendered cleanly.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The 64 second cycle, the phrase template with its exact starts and durations, the note counts (young 5 to 9, old 2 to 4), the register bands, the 8 second ghost fade, the voice positions, the arc geometry, and the drone band are invented staging for the named mechanism, so frame one already reads as an exchange mid-course.
- The prompt says the 53 minute duo is compressed to a watchable exchange. The piece compresses it to a repeating 64 second cycle of call, response, overlap, and silence, which is the compression the prompt asks for.
- The prompt says phrases arc between the voices as light trails. Each phrase arcs from its speaker toward the other voice, stopping short of the far side, so the two arcs meet and cross in the middle of the stage rather than spanning the full width.

## Known warts

- On a tall phone the composition is a horizontal band in the middle of a dark stage, with large black areas above and below. The stage black is the point of the piece, but the phone render reads sparser than the desktop square.
- The old voice glow disc is large and reads a little like a brown planet, especially at thumb size, because the old voice is drawn bigger than the young one and its glow is wider.
- During overlap the young active arc and the fading ghost of the young dart phrase run nearly on top of each other, so the gold line doubles for a few seconds. It reads as a trail, but the doubling is accidental, not a rule.
- In the silence phase the ghost arcs and their dots float without any sounding voice, which is correct per the mechanism but can read at first glance as stray marks rather than fading trails.
