# №1784: A Is One Inch (PP1031 / SR1, steve-roden)

- Title: A Is One Inch
- Gallery date: 2006 · 11 · 30 (formula date for №1784)
- Gallery note: "A reading head translates each letter into a measured ink stroke, word by word in flat color. Tap for the next phrase."
- Ground: cream paper #F2EDDF. Template: live №1780 (Self-Playing Pendulum), fetched fresh 2026-11-14.
- Title check: "A Is One Inch" is clear against live pieces.json (fetched via the git blob API, sha 85bbecb9, 1,257,930 bytes, 1,981 entries). No verbatim-title collision.

## What it is

A reading head moves left to right across an invisible line, translating a
source phrase letter by letter into measured ink strokes. Each letter becomes
one straight line whose length equals its alphabet position (a short, z long),
drawn at a slight wandering angle. Each word is laid in its own flat muted
color. The lattice accumulates row after row down the page, one full phrase
pass per row; when the page is full it holds 12 seconds, then the next source
phrase begins on a fresh page. Watch-first; tap anywhere switches to the next
source phrase early. Never click-to-reload.

## Phrase table

Rotation order, fixed:

| # | Phrase | Words (colors) | Row time | Page (desktop, 20 rows) |
|---|--------|----------------|----------|-------------------------|
| 0 | the silent world | the red, silent blue, world ochre | 4.44 s | 88.8 s + 12 s hold = 100.8 s |
| 1 | 4'33" | 4'33" red | 1.14 s | 22.8 s + 12 s hold = 34.8 s |
| 2 | surface of the moon | surface red, of blue, the ochre, moon green | 5.16 s | 103.2 s + 12 s hold = 115.2 s |

Full cycle: 250.8 s (about 4 minutes) on desktop, phone and thumb alike
(20 rows on every size). Word colors cycle through muted
red #B0492F, blue #3E5C8A, ochre #B98A2F, green #5A7A4A, violet #6E5578.

## Per-letter lengths and colors

Length in pixels on the desktop field (S = 860): L = S * (0.010 + pos * 0.0028).
Letters map to alphabet position (a = 1 .. z = 26); digits map to their value
(0 counts 10); apostrophe and quote in 4'33" become short ticks of length 1.
Spaces move the pen with no stroke. Colors are per word, not per letter.

Phrase 0, "the silent world" (row time 4.44 s: 14 letters at 0.30 s + 2 spaces
at 0.12 s):

| Step | Char | Kind | Length (pos) | px | Word / color |
|------|------|------|--------------|----|--------------|
| 0 | t | letter | 20 | 56.8 | the / red #B0492F |
| 1 | h | letter | 8 | 27.9 | the / red |
| 2 | e | letter | 5 | 20.6 | the / red |
| 3 | (space) | space | - | - | - |
| 4 | s | letter | 19 | 54.4 | silent / blue #3E5C8A |
| 5 | i | letter | 9 | 30.3 | silent / blue |
| 6 | l | letter | 12 | 37.5 | silent / blue |
| 7 | e | letter | 5 | 20.6 | silent / blue |
| 8 | n | letter | 14 | 42.3 | silent / blue |
| 9 | t | letter | 20 | 56.8 | silent / blue |
| 10 | (space) | space | - | - | - |
| 11 | w | letter | 23 | 64.0 | world / ochre #B98A2F |
| 12 | o | letter | 15 | 44.7 | world / ochre |
| 13 | r | letter | 18 | 51.9 | world / ochre |
| 14 | l | letter | 12 | 37.5 | world / ochre |
| 15 | d | letter | 4 | 18.2 | world / ochre |

Phrase 1, "4'33"" (row time 1.14 s): 4 = 4 (18.2 px), ' = tick (11.0 px),
3 = 3 (15.8 px), 3 = 3 (15.8 px), " = tick (11.0 px); all red #B0492F.

Phrase 2, "surface of the moon" (row time 5.16 s: 16 letters + 3 spaces):
surface s19 e5 r18 f6 a1 c3 e5 (red), of o15 f6 (blue), the t20 h8 e5
(ochre), moon m13 o15 o15 n14 (green). Pixel lengths follow the same formula:
a 11.0, c 15.8, e 20.6, f 23.0, h 27.9, m 39.9, n 42.3, o 44.7, r 51.9,
s 54.4, t 56.8, u 59.2, w 64.0, z 71.2.

## Frame one (fixed phase, t = 60 s)

- Phrase 0, "the silent world", row 13 of 20, 2.28 s into the 4.44 s row
  (51% through the row, head 53% across the line).
- Current step: step 8, letter "n" (9th character, 7th letter of the phrase),
  20% through its 0.30 s interval; the stroke draws in the first 70% of
  the interval and dwells the rest, so it is 49% drawn (eased).
- Reading head: ink dot at viewport (682.7, 621.5) on the 1280x900 render,
  field-relative (472.7, 601.5). Stroke anchor (663.2, 628.6), angle -0.347
  rad, length 42.3 px. A faint vertical hairline crosses the current row at
  the head. On the 390x844 render the head is at (214.4, 594.5), same step.
- Rows 0-12 are fully laid (13 complete rows); row 13 is in progress. The
  lattice covers roughly the top two-thirds of the field on desktop, phone
  and thumb alike. The page holds 20 rows on every size.

## Deviations and interpretation notes

1. Pen speed retuned from the first build (1.6 s per letter) to 0.55 s per
   letter (spaces 0.2 s). At 1.6 s the frame-one render showed only 2.5 rows
   on a mostly empty page; the spec's frame one calls for rows already laid
   down the page with the head mid-line, so the faster pen puts 7 full rows
   down by t = 60 s with the head 45% across row 7. The pen still visibly
   lays one stroke at a time with a dwell at each stroke end.
2. Stroke length scale raised (L = S * (0.010 + pos * 0.0028)) so long
   letters reach past their slot and the rows interweave into a lattice
   instead of reading as isolated dashes.
3. The prompt says both "ink black for the strokes" and "one flat color per
   word" for a polychrome lattice. Resolved as: strokes in each word's flat
   muted color (the polychrome lattice is the work), pen head and caption
   ground in ink black #1A1712. The caption at the top is drawn word by word
   in the matching word colors so the viewer can map words to lattice colors.
4. Non-letters in 4'33": digits map to their numeric value, apostrophe and
   quote are short ticks (length 1). Documented in the table above.
5. Angle jitter is a seeded hash of (phrase, row, step), plus one slow sway
   term (0.08 rad, one-hour period) so the lattice breathes without
   repeating quickly. No Math.random() or Date.now() anywhere in the piece;
   frame one is a closed-form function of piece time.
6. Soft tick per letter is optional WebAudio, created lazily inside the first
   tap gesture only, gain 0.02, never autoplay. The piece is complete muted.
7. Canvas 2D throughout (no WebGL), per the house rule for node-canvas QA.
8. Fix round (gate finding, 2026-11-14): at t = 60 s the first build laid
   only 7 of 20 rows on desktop (top 40%) and 7 of 44 rows on phones (top
   25%), leaving the bottom half empty cream. Two changes, both in the
   timing/geometry, none in the cycle structure: the pen sped up from 0.55 s
   to 0.30 s per letter (spaces and ticks 0.20 s to 0.12 s), so a phrase-0
   row now takes 4.44 s and 13 full rows plus a partial row 13 are laid by
   t = 60 s; and the row count is fixed at 20 on every size with row height
   derived from the field height ((F.h - 108) / 20), so the phone lattice
   fills at the same rate instead of spreading 44 shallow rows. The pen
   still lays one stroke at a time with a 30% dwell at each stroke end
   (0.21 s draw, 0.09 s dwell per letter), the phrase/hold/next-phrase
   cycle and tap-to-next-phrase are unchanged, and frame one stays a
   deterministic fixed phase (row 13, letter "n", 49% drawn).

## House rules check

- Visual Viewport sizing; resize listened to on visualViewport and window.
- Canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with aspect
  fallback (h > w * 1.15); field-like lattice is full-bleed on phones, square
  on desktop, page ground is the piece's own cream.
- One synchronous frame at load; requestAnimationFrame guarded with a typeof
  check; prefers-reduced-motion freezes at frame one.
- No em dashes in visible copy; no AI-signature copy; never click-to-reload.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js
and read all three PNGs; re-gated after every edit.

- Desktop 1280x900: cream ground, title plate top left ("A Is One Inch",
  "2006 · 11 · 30"), caption "the silent world" small and centred at top in
  word colors, 13 full lattice rows plus row 13 in progress in three
  word-color columns (red, blue, ochre), pen head dot mid-line in the blue
  column with its faint hairline, hint plate bottom left ("Tap for the next
  phrase."). The lattice covers roughly the top two-thirds of the field;
  plates legible, no overlaps. First build showed only 7 rows and a mostly
  empty page; retuned per deviation 1, then fix round per deviation 8, and
  re-rendered.
- Mobile 390x844: full-bleed, same 13 full rows plus row 13 in progress,
  lattice covering the top two-thirds, plates legible, no overlap between
  the title plate and the caption.
- Thumb 720x720: same composition as desktop, legible at gallery size.
  thumb.png IS the 720x720 render.
- Extra time checks (probe drawAt): t = 100.8 s starts phrase 1, "4'33"",
  at row 0; t = 120 s shows phrase 1 as five vertical columns of short red
  ticks, head in column 4, row 16. Tap simulation from the first build
  (unchanged code path): a tap at t = 200 s starts phrase 2 at row 0; a tap
  during the hold starts phrase 1 at row 0.

## Files

- index.html: md5 4aaa216b85a4642809fc1db7f1394837
- thumb.png: md5 4f0da67e10f49a420e373ff1ca403025 (720x720 render)
