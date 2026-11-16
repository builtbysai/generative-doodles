# No.1823 "Repertoire" (AD8, PP1070), #238 arnold-dreyblatt

## Spec
Built from the TASKS.md prompt block arnold-dreyblatt, AD8, PP1070.
Driver: a ledger of records that refuses to stay a list, becoming a
cloud sorted by time and then a list again.

## Build
Canvas 2D only, built from the live No.1812 template pattern. One
self-contained index.html, no external assets, no audio. Watch-only.

## Scene
A dark institutional room holds one vertical column of light: the
membership ledger, a sheet of ledger-paper white with a red header
rule, the label MEMBERSHIP LEDGER and a count of 500. A red academy
flyer with abstract white bars hangs on the right wall. Title
"REPERTOIRE", date "2007 · 01 · 08", state label and hint
"WATCH ONLY" are drawn on canvas.

## Loop and state machine (closed form, no live state)
Loop length 120 s. Four states, visited in order every cycle:
scroll 0-48 s, dissolve 48-66 s, sort 66-96 s, collapse 96-120 s.
The ledger scrolls upward two rows and wraps, then its records
dissolve row by row, top to bottom, into a point cloud above the
ledger. The cloud re-sorts by year, then collapses back into the
ledger, refilling it top to bottom. Each cycle the sort order
changes: cycle 0 sorts by year ascending, cycle 1 by year
descending, cycle 2 into decade bands.

## Records
500 abstract glyph records, each with a year 1952-2024 and one of
six glyph kinds (bar, circle, cross, triangle, square, double dash).
No names and no readable personal data anywhere: records stay
abstract glyphs, with a tiny decade dot at each cell corner. In the
ledger the records sit in a 20 by 25 grid, one per cell. In the
cloud each record is a point colored by decade.

## Palette
- Room and page ground: #1a1a1c, wall panels #232326
- Ledger paper: #f2f0e8, ledger ink: #3a3a3e, institutional grey: #6f6f74
- Academy flyer red (the one red accent): #c1272d
- Cloud by decade, greys toward white with red for the newest decade:
  #7d7d82, #8d8d88, #9c9c96, #ababa4, #babab2, #c9c9c0, #d8d8ce, #c1272d

## Frame one (t = 57 s, fixed phase)
Mid-dissolve: the top half of the ledger has emptied into the cloud
above while the bottom half still holds its glyph rows, so both the
ledger and the cloud read in a single frame. Frame one is
byte-comparable: seeded RNG only, no Date.now or Math.random, and
the animation loop continues from t = 57 s.

## Deviations from the prompt
None in intent. Two implementation notes: (1) the ledger is a 20 by
25 grid holding all 500 records at once, so the full count is
visible instead of a scrolling window showing only a few rows at a
time; (2) during collapse the records return to a stable unwrapped
grid rather than the scrolling wrapped grid, so the refilling ledger
does not rotate under the returning records. The dissolve stagger
runs top row to bottom row, which keeps the emptying legible.

## QA
- Harness check (/tmp/check1823.js, extracts the shipped script and
  runs it against stub canvas/window): records array length 500,
  state machine visits all four states at t = 10, 55, 75, 110,
  sort orders cycle 0, 1, 2, years span 1952-2024, all eight decades
  and all six glyph kinds present. HARNESS PASS.
- node render-piece.js at 1280x900, 390x844 and 720x720; all three
  PNGs read and inspected.
- First gate found the ledger nearly empty at frame one: records had
  been positioned by a full content-height wrap, so dissolved records
  landed far below the visible column, and the stagger ran by record
  index, emptying rows unevenly. Fixed by moving the ledger to a
  20 by 25 grid, staggering the dissolve top row to bottom row, and
  fixing frame one at t = 57 s.
- Second gate found the collapse refilling into a rotated wrapped
  grid, leaving a stray row of glyphs at the bottom edge. Fixed by
  returning records to the stable unwrapped grid during collapse.
- Event branches exercised by rendering time-shifted copies at t = 10
  (scroll, ledger full), t = 80 (sort, cloud sorted by year, ledger
  empty) and t = 110 (collapse, ledger refilling top to bottom):
  all render cleanly.
- Determinism: three consecutive 1280x900 renders of the shipped
  file are byte-identical (md5 6c16b851adfbd19302e46906643a8b6b).
- Desktop render: cloud above, glyph ledger below, title, date,
  state label, flyer and hint all legible, nothing clipped.
- Mobile render (390x844): centered column holds, cloud spreads
  above it, all plates legible.
- Thumb render (720x720): same composition, all plates legible.

## Gallery entry
- n: 1823, title: "Repertoire", date: "2007 · 01 · 08",
  note: "A ledger of 500 abstract records scrolls, dissolves into a
  cloud, and re-sorts by year. Watch the ledger scroll, dissolve,
  and re-sort."
