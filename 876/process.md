# No.876 - Tape That Has Since Been Lost

Study #107 xu-jared, PP37 "Lost Tape". After her 2026 release Lost Tape 21': a recording made in late 2021 on a recycled Denon DX60, played on a TEAC deck and a Sony MiniDisc, where "the roughness, haze, and subtle instability of the tape became an essential part of the sound." This piece is a tape that plays itself to death.

## Concept

A single amber tape-line unspools across the middle of a black field, carrying the recording as small white marks. Every pass of the playhead wears the tape a little; every scrub wears it a lot. Wear smears the marks, wobbles the line (wow and flutter), eats dropouts where the damage is worst, and blooms hiss at the edges of the frame. When the wear reaches 100% the recording is gone: only hiss and the bare line remain, and then, quietly, a new tape loads and the dying starts over. PLAYS never resets. Wear is one-way. There is no restore and no rewind that heals; the decay is kept beautiful on purpose, haze rather than punishment.

Interactions: drag horizontally to scrub the playhead (it follows the pointer and the scrub speed writes wear under it, slow for gentle wear, fast for heavy smear). Tap drops the needle: one clean sweep at two and a half times play speed starting at the tap point. Double-tap flips the tape: it plays backwards once at double wear cost, and finishing the backward pass counts as a play.

## Construction

- Tape model: 240 segments. Each segment holds a seeded mark (tick, dash, or tick pair, from mulberry32) or silence, plus a float wear value. Mean wear is the global WEAR figure; local wear above 0.93 renders as dropout void, a darker than black gap.
- Wear model: the crawling playhead adds 0.0011 wear per fixed step to the segment under it (doubled while flipped). Scrubbing adds 0.002 to 0.047 per step scaled by pointer speed, spread over a five segment brush. A full play pass takes 90 seconds of crawl, so a tape lives for a long session of plays and scrubs before it is lost.
- Rendering of wear: mark smear is drawn as four ghost copies offset horizontally by up to 1.1 segment widths times local wear, at falling alpha. Wow and flutter is a two sine vertical offset of the line and its marks, amplitude proportional to local wear. Hiss is a precomputed field of 2600 seeded speckles concentrated toward the top and bottom edges; the number drawn and their alpha scale with global wear.
- Lifecycle: when mean wear reaches 0.995 the interlude starts. The recording fades, the frame dims for about 4.5 seconds with only hiss and the bare line, then a fresh tape is built with new seeded marks and a 2% wear seeding. PLAYS carries over.
- Counter: the prompt specifies a visible counter ("the counting is the honesty"), so PLAYS and WEAR % are drawn small in monospace tape-amber at the bottom left. This is the one piece of text besides the title, and it is sanctioned by the prompt itself.
- Sound: nothing sounds until the first pointer gesture. A lazy, typeof-guarded AudioContext runs two detuned oscillators and a looped noise buffer through a feedback delay and a lowpass whose cutoff falls from 3400 Hz toward 500 Hz as wear rises; a wow oscillator detunes the pair; a highpassed noise channel carries the hiss, its gain rising with wear. Dropout gates dip the master gain on a schedule seeded by sim time, play count, and tape number, so the audio dropout pattern is a performance of the same deterministic state as the visuals. At 100% wear only hiss and wow remain. The piece renders completely in silence in the QA harness.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen minimum dimension under 700 px with the aspect fallback; strict five tone palette (#0A0A0A, #FFB000, #E8E8E0, #8A8A86, #020203); no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; no Date.now anywhere.

## QA log

- Frame one is the synchronous draw(0) from the seeded initial state; the simulation runs at a fixed 1/30 s timestep from that state plus recorded pointer events, so frame one is exact by construction.
- Frame one choice, recorded: the first tape is a found tape, so its wear patches are normalized to a mean of exactly 7% before first draw. The counter therefore opens at PLAYS 0 / WEAR 7%, the playhead sits at 30% of the tape, and the worn patches already show mild wobble and light smear.
- Renders: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720), all produced with render-piece.js from the shipped index.html. Read back: amber tape-line across the middle with white recording marks, visible wobble and smearing at the worn patches, the playhead line with its cap, faint grey hiss speckle toward the edges, and the counter PLAYS 0 / WEAR 7% at bottom left. Mobile takes the phone sizing path; the band stays in the middle third and the counter is unclipped.
- Playhead position verified by pixel scan: brightest column fraction 0.299 in all three renders.
- Determinism: thumb.png rendered twice and byte-compared with cmp, identical, before and after the single tuning fix below. The duplicate render was deleted.
- Fix round: the first read-back showed the hiss almost invisible at 7% wear. Speckle floor count and alpha were raised slightly so the hiss reads as a gentle bloom at the edges while staying quiet. All renders redone and the byte-compare re-run.
- Deviations: none from the brief. Two recorded choices: the found-tape 7% pre-wear at frame one (above), and audio dropout randomness keyed to deterministic state (sim time, plays, tape number) instead of a live random source, so sound and image stay performances of one state.
