# Alternation, Not Blending (№1873, SM2, PP1120)

## Spec
Two incompatible visual systems share one screen and never mix. System A is a skronk field on black: fourteen seeded wires in white, rust orange and signal red that jitter, snap and spray like bowed-wire noise, plus 110 spray particles bursting from fixed sources. System B is a stripper-beat blues grid in warm amber on tobacco brown under a deep blue stage light: twelve chord blocks (I I I I IV IV I I V IV I V) marching left to right, a cream playhead, a backbeat pulse on beats 2 and 4, and a baritone-guitar silhouette strumming at bottom center. A cut sequencer hard-cuts between them: about 20 seconds of A, one black frame, exactly twelve bars of B (19.2 s), one black frame, back to A with a different seeded wire variant. No crossfade ever. Each system finishes its phrase before the cut.

## Palette
A: black #000000, white #F2F0EA, rust orange #C65A1E, signal red #D92323. B: amber #E8A33D, tobacco brown #4A3220, cream #F2E3C2, deep blue stage light #1E2A52. Plates: near-black ground, pale title ink.

## Motion / interaction
Watch only. No interaction, no click-to-reload. The refusal to blend is the mechanism. A durations are irregular (20.8 s, 22.4 s, 19.6 s across three seeded variants); every B segment is exactly twelve bars at 1.6 s per bar. Cuts are single 0.12 s black frames, so no flicker concern. Supports prefers-reduced-motion by freezing at the fixed first frame.

## Deviations from the prompt
None in the concept. The prompt's "WebAudio" note is set aside: as a watch-only piece it is visual-only with no audio, since audio cannot autoplay and there is no gesture to start it from. The guitar silhouette sits in the lower foreground and its neck is kept short so it never covers the chord numerals.

## QA
Rendered the actual script with node render-piece.js at 1280x900, 390x844 and 720x720; inspected all three. Frame one (t = 4.0 s, system A) reads as a clear skronk field on desktop, mobile and thumb, with title, date "2007 · 02 · 27" and hint plates legible and unclipped. Also rendered system B (t = 25.0 s) and the black frame (t = 20.86 s) from temporary copies: B shows the twelve amber blocks, chord numerals, playhead and strumming guitar silhouette cleanly on both sizes; the cut frame is fully black apart from the plates. One fix round: shortened the guitar neck (0.30w to 0.23w) and lowered the body so the neck no longer overlapped the chord numerals, then re-rendered and re-inspected. Deterministic first frame: fixed phase t = 4.0 s, seeded mulberry32 RNG only, no Date.now or Math.random anywhere.
