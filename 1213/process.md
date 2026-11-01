# №1213 — The Instrument Room

Amy Szczepanski study block AS6. A dark room (#08080C) holding a wall of 24
Null_Sets prints in a strict grid — 6 columns × 4 rows on desktop, 4 × 6 on
phones — each print computed from a different text. Beneath each print a tiny
phosphor-green (#33FF66) monospace readout gives the text's byte length, the
band count, and its dominant hue. The camera dollies slowly across the wall
(2 minutes out, 2 minutes back over a wall 160% of the viewport width).
Dragging up on a print zooms it full-frame, microscope-style, with an enlarged
readout; dragging down returns to the wall. The grid is democratic: no
centerpiece, no wall text beyond the readouts.

## How the prints are computed

Every print is 24 horizontal bands rendered from its text's bytes through the
same quantization mapping as AS1/AS5: for band b, take the 16 bytes at
(b·16 + i) mod len, sum them; the sum mod 10 selects a sector of the fixed
10-color table (#E5484D, #F76B15, #FFC53D, #46A758, #12A594, #0090FF, #6E56CF,
#D6409F, #FF4D6D, #101010), and floor(sum/16) mod 3 selects a flat shade
(×0.74 / ×1.00 / ×1.22). No color is hand-placed. The dominant hue in each
readout is the histogram mode of that print's 24 band sectors. Print height
scales with log(byte count) — the genome, the largest text, is the tallest
print — and the phone book, flagged widest, fills 98% of its cell width while
other widths jitter by hash. The bottom 8% of the frame is a floor band
(#0E0E14) carrying the bottom row's dominant colors at 10% alpha as a flat
reflection.

## The 24 texts

The byte counts below are the piece's own counts, shown honestly in the
readouts: literary and historical sources are embedded as verbatim excerpts
(truncated representatives of the full works); the genome, phone book, weather
log, timetable, tide table, and seed catalog are generated deterministically
in-code from seeded hashes.

1. US Constitution — 2302 B · 2. human genome — 12150 B · 3. car insurance
policy — 1384 B · 4. Romeo and Juliet — 1020 B · 5. Moby Dick — 1305 B ·
6. Origin of Species — 1187 B · 7. Pride and Prejudice — 1077 B · 8. a phone
book — 4847 B · 9. Python source code — 1063 B · 10. the Magna Carta — 863 B ·
11. Hamlet — 1162 B · 12. Frankenstein — 1267 B · 13. a weather log — 5256 B ·
14. the periodic table — 1368 B · 15. a train timetable — 638 B · 16. Alice in
Wonderland — 1237 B · 17. Declaration of Independence — 1059 B · 18. a sitemap
(XML) — 841 B · 19. Don Quixote — 1008 B · 20. a chess game (PGN) — 576 B ·
21. the Odyssey — 968 B · 22. a tide table — 2143 B · 23. Jane Eyre — 912 B ·
24. a seed catalog — 1315 B.

## Interaction and house rules

Zoom state is a recorded event: a vertical drag (≥ 40 px) starting on a print
opens the zoom over 0.8 s (smoothstep interpolation of the view transform);
a downward drag anywhere closes it. While a zoom is open the pan clock is
frozen — pan phase is computed from piece time minus recorded zoom durations,
so the dolly resumes exactly where it paused. Everything else is closed-form:
pan is a triangle wave over 240 s, all layout is a pure function of viewport
and the computed text data.

Sizing comes from the Visual Viewport API with resize listeners on both the
visual viewport and the window; the canvas CSS size is pinned in fit() (called
at the top of every draw). Phones are detected via `window.screen` physical
size (min dimension < 700 px) with an aspect fallback (h > w × 1.15), and get
the 4 × 6 grid. The first frame is drawn synchronously at a fixed phase —
T0 = 38 s, mid-pan, with columns 2–5 dominating the frame and the genome the
tallest print on the wall. The rAF loop is typeof-guarded and anchored as
phase + elapsed. Seeded hashes only; silent; no gradients, no ctx.filter, no
shadowBlur, no createElement, no ImageData/offscreen canvas, no microphone.
