# №1656 "Alien Tongue, Study 14" — process notes

Driver: one white hairline writes an alien script, glyph by glyph, and over minutes you start to believe there are rules.

## Build
- EDG1 (PP903), #218 eric-de-giuli. Title "Alien Tongue, Study 14", gallery date 2006 · 07 · 25, gallery note: "One white hairline writes an alien script, glyph by glyph. Watch only."
- Pure black ground; one white hairline (#F5F5F2); nothing else. Portrait writing area in the middle third with generous black margins: desktop a centered portrait area (min(0.55W, 0.62H) wide), phones full-bleed portrait (0.86W). No UI, no frame beyond the standard title/date/hint plates, drawn as hairline white outlines on black.
- Glyph library: 24 parametric stroke primitives (loops, tall loop, stacked figure-eight loops, kink, cross, hook, wave, spiral, stem-loop, arch, bowl, slant-cross, curl, step, dip-rise, loop-tail, two humps, stem-loop-below-baseline, swoosh, zig-down, circle-stem, arch-hook, triple wave, knot). Every glyph starts and ends near the baseline, so glyphs thread onto the line like cursive.
- Syntax model: each glyph belongs to one of 7 classes (loop, kink, cross, wave, hook, arch, stem). The next glyph is sampled with weights biased by the previous two glyphs (same-class affinity 3.0, cross-class affinities 0.7-1.8, per-glyph base weights 0.7-1.3), so repetition-with-variation reads as language. All randomness comes from one mulberry32 stream seeded 1656, consumed in glyph order, so the sequence is identical on every load.
- One continuous path per line: between glyphs the pen travels down to the baseline, along it, and up to the next glyph's first point (first 15% of each glyph slot is connector travel). A full line drops the pen to the next (0.5 s drop); a full page (5 lines) fades out over 1.5 s and a fresh page starts after a 2 s turn gap. Schedule is precomputed to a 1200 s horizon and is a pure function of viewport size.
- Writing speed is handwriting speed: each glyph takes 0.45-1.3 s depending on its stroke count, plus an 8% chance of a 0.7-1.8 s "thinking" pause after a glyph. A small hairline dot marks the pen tip.
- Watch-only: no pointer listeners at all. No WebAudio; the piece is silent.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; fixed PHASE = 24 s first frame (first line complete, pen partway through the second line); rAF loop guarded by typeof check; no Math.random, all seeds fixed; moveTo before the pen-tip arc; page-fade alpha rounded to 4 decimals.

## Acceptance criteria (numbers)
- Glyph library has 20-30 primitives (24).
- Same-class transition rate well above the uniform baseline of 0.191 (measured 0.417 over 200 glyphs).
- All 24 glyphs appear in the first 200 (repeat rate 0.88, i.e. heavy repetition of a small alphabet, not uniform randomness).
- Frame one at t = 24 s: line 0 complete, pen mid-glyph on line 1 (desktop col 2 of 18, progress 0.16; mobile col 8 of 12, progress 0.16).
- Writing advances left to right and drops a line when full: column increases monotonically within each line in sampled states; 7 line drops in 120 s (lines 0-6).
- Two fresh loads produce identical frame-one glyph sequences and identical desktop frame-one md5.
- Thumb rendered twice at 720x720: byte-identical md5.

## What was probed / measured
- Probe harness (/tmp/probe-1656.js, node-canvas, same shim as render-piece.js): glyphLibrarySize 24; layout desktop 18 glyphs/line, 5 lines/page, 1043 events to the 1200 s horizon; mobile 12 glyphs/line, 5 lines/page, 1021 events.
- Sequence stats over 200 glyphs: distinct 24, repeat rate 0.88, same-class transition rate 0.4171 vs uniform baseline 0.1910 (110/576 from class sizes). First 60 glyphs: [0,18,23,18,21,21,13,6,14,0,1,7,0,6,2,3,5,2,20,11,23,4,2,23,0,1,14,18,3,2,11,5,6,11,7,8,2,1,16,1,18,7,8,5,15,2,6,22,22,6,6,0,18,21,15,0,22,14,3,13] — identical at desktop and mobile sizes and across runs.
- State samples (desktop): t=5 line 0 col 4; t=15 line 0 col 14; t=20 line 1 col 0 (just dropped); t=24 line 1 col 2 progress 0.16; t=40 line 2 col 0; t=90 line 4 col 12; t=120 line 6 col 0, page 1 (page turn happened after line 4).
- Determinism: two fresh runs, desktop frame-one md5 2116fe958778594933b959b00ef50b50 both times; mobile frame-one md5 8d7a981333eff72ffd9a8ad5541509fb.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 twice. Thumb md5 72fbfba9c8c1e7fc5f19622273bf2093 both runs, byte-identical.
- All three renders visually inspected: desktop shows one complete line of loop/kink/cross glyphs threaded on a baseline plus the pen starting the second line; mobile shows a full first line and most of a second; thumb reads the same at small size. Plates "Alien Tongue, Study 14 / 2006 · 07 · 25" and "Watch only." legible in all three. Nothing reads as legible real text.
- Extra time renders checked: t=100 (new page just started, one glyph in) and t=125 (page 1, line 5 complete, line 6 underway) — page turn and fade work, script stays intentional.
- No Math.random, no pointer/mouse/touch listeners, no em dashes in any visible copy (grep-verified).

## Deviations
- Page turn added (not in the prompt): the prompt describes writing "over minutes" but the writing area holds only 5 lines, so when the area fills the page fades out over 1.5 s and a fresh page starts, with the glyph sequence continuing from the same seeded stream. Without this the pen would run out of room in about 90 seconds.
- Pen-tip dot added: a 2 px hairline dot at the live pen position, so the moving pen is visible against the static script. Single stroke weight is otherwise kept throughout.
- The prompt's "one continuous path per line" is implemented as glyph strokes joined by baseline connector travel (first 15% of each glyph slot), rather than a single uninterrupted stroke with no pen lifts.

## Fix rounds
- Round 1: removed a dead `connectorPts` stub left in the first draft and refactored the probe's `stateAt` to a pure pen-position computation, so probing never draws onto the render canvas.
