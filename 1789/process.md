# №1789 "Six Sound Installations (a cover that keeps score)" SR6, PP1036

The driver is the prompt's own rule: a document being kept, with six fixed installation data sets retyping themselves under three drifting translucent discs.

## Source

Spec: BATCH-1786-1790-SPEC.md, section №1789 SR6 (PP1036), EXPANSION #234 steve-roden. Prompt block verbatim from TASKS.md (steve-roden PP1031-PP1038, TASKS lines 23277-23358, cron expansion study #234). Gallery date 2006 · 12 · 05, formula date for №1789. Gallery note: "Six installations retype themselves under drifting translucent discs. Watch only."

## Build

Template: live №1785 index.html, fetched fresh at build, matched for page structure, plates, and sizing code. Canvas 2D only.

Six data sets, one per installation (HALL, STAIRWELL, COURTYARD, BASEMENT, ROOF, PASSAGE). Each set is a fixed authored table built once from seed 1789: a header line, data rows typed row-major across the set's columns, and a footer line ("SET 0n OF 06 - SIX INSTALLATIONS - RETYPE CYCLE 40 S"). Column layouts differ per set: set 1 has 3 columns, set 2 has 3, set 3 has 4, set 4 has 2, set 5 has 3, set 6 has 3. Row formats differ per set (value plus time, value plus time plus ratio, value only, long value plus time plus ratio). Typing is closed form: each character's type time is its index times charDt (36.8 s divided by the set's total character count) plus a seeded jitter of at most 0.04 s, and each character carries a seeded position jitter of at most 0.8 px, so frame one is byte-comparable. A block caret sits at the next character to type.

Three discs (blue #2F6FD0, orange #E8762B, pale teal #7FC4B5) drift on independent slow sine orbits as closed-form functions of piece time, drawn with multiply blending so their intersections darken. Photo scraps are canvas-drawn at the four corners: tree leaves top left and bottom right, clouds top right, striped paper bottom left. Annotations are ballpoint blue (#1F4C9C) italic notes with a wavy underline, fading in over 3 s on a fixed schedule per set (three per set). Watch-only: no pointer handlers at all. No audio: the prompt offers none for this piece.

## Frame one (fixed phase t = 60 s)

Set 2, INSTALLATION 02 - STAIRWELL (set index 1), 20 s into its 40 s cycle: 401 of 736 characters typed, caret after "B7 10.9 09:40" in column 3 of row B7, rows B1-B6 fully typed across all three columns. Two annotations visible, both fully faded in: "louder here" (starts 6 s) and "check the hum" (starts 14 s). The third, "too quiet" (starts 27 s), has not started. Disc centers at frame one: blue (0.300, 0.350), orange (0.585, 0.394), teal (0.442, 0.693), in field fractions; the blue and orange discs overlap over the middle columns and their intersection darkens there.

## Deviations from the prompt

1. Photo scraps are drawn beneath the typed field, not above it. As first built, the top-left leaves scrap covered the first three rows of column 1 and the top-right clouds scrap clipped column 3, hiding typed data. The typewriter now types over the pasted scraps, which still anchor the four corners, and the discs still float above both text and photographs, as specced.
2. Annotations sit in the gap between rows (0.026 field-height above their row baseline) rather than on the same baseline. At phone width the inline gap between columns is too narrow and the annotation covered the next column's label. They remain beside the rows they annotate.
3. The set header sits at 0.095 of field height instead of 0.07, so the title plate never clips it at 720x720 or 390x844.
4. No other deviations. No WebGL was needed, so no 2D substitution. No click-to-reload anywhere.

## QA

Rendered with node ~/workspace/tools/render-piece.js and read all three PNGs.

Desktop 1280x900: dense paper-white document field, header "INSTALLATION 02 - STAIRWELL" clear of the title plate, three typewritten columns with rows B1-B7 legible, caret visible after "B7 10.9 09:40", both annotations visible between rows without covering text, blue and orange discs overlapping with a darkened intersection over the middle columns, teal disc below, four corner scraps visible, title/date plates and "Watch only." hint plate clean. Pass.

Mobile 390x844: full-bleed field, same content legible at 10 px type, header clear of the plate, annotations clear of the columns, discs and scraps in place. Pass.

Thumb 720x720 (this file's thumb.png): same composition as desktop, header clear of the plate, all rows and both annotations legible. Pass.

Fix rounds: first gate caught scraps covering typed text and annotations covering column labels; fixed by moving scraps under the text and annotations into the row gaps, then re-rendered. Second gate caught the title plate clipping the set header at 720x720 and 390x844; fixed by moving the header to 0.095 field height, then re-rendered all three sizes. The renders above are the post-fix gate; no edits were made after them.
