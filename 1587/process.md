# №1587 Thirty-Five Years, Woven

EXPANSION #209 che-yu-wu, prompt PP834 / CW4 "The Carbon Cloth".
Gallery date: 2006 · 05 · 17 (formula 2002-01-10 + 1588 days).

## Mechanism

A cloth is continuously woven on a dark field, row after row of colored
thread. Each row is one year of carbon-emission data, 1990 through 2024.
Row length is the year's total; the thread colours in a row are the
sector mix: energy red #D94A3A, forest green #4E9A51, ocean blue #2E7DC4,
coal charcoal #3A3A40. A slow gold shuttle #D9A441 sweeps back and forth
laying the current row, its gold pointer thread trailing behind it with
a slight delay. The cloth grows top-down and never finishes: one full
weave takes 70 seconds (2 seconds per row), then a new cloth begins.

The data table is fixed and authored: global CO2 in gigatonnes, rising
from 22.7 Gt (1990) to 37.8 Gt (2024), ordered and cumulative-looking,
with the 2009 and 2020 dips. The sector mix shifts slowly across the
years: energy share grows from 52% to 60%, forest shrinks from 14% to
9%, ocean from 7% to 5%, coal takes the remainder. Thread strokes are
short horizontal dashes with a fixed per-row seed (mulberry32), so every
row always weaves the same way. A faint vertical warp runs across the
whole cloth area.

Palette swatches (ENERGY, FOREST, OCEAN, COAL, SHUTTLE) float in the
top margin. A slow vertical scroll of white index cards (year, value in
Gt) runs along the right edge, drawn with fillText, not HTML.

## Interaction

Drag across the cloth: the finger's x-position selects which year's row
the shuttle weaves next, dragging through time. The chosen row gets a
gold underline and its index card a gold border; the underline and
border stay on the last chosen year after release, while the shuttle
resumes the cycle row. Watch-only otherwise; the weaving never stops.
No click-to-reload anywhere.

## Determinism

Growth is a pure function of the fixed loop phase: frame one is drawn at
a constant offset (PHASE0 = 26.7 s into the 70 s cycle, 13 rows woven,
shuttle mid-row), and the animation loop is anchored as offset plus
elapsed time since load. No Math.random, no Date.now in the draw path.
Thumb rendered twice, byte-identical.

## Deviations

None from the prompt. The swatch labels (ENERGY, FOREST, OCEAN, COAL,
SHUTTLE) are the only text besides the index cards, per the batch rule
against in-piece UI text. No caption bar.

## Gallery note

"Thirty-five years of carbon data woven into cloth, row by row. Drag across the cloth to select a year."

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual
script at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three
read as woven cloth with coloured thread rows of growing length, a gold
shuttle mid-row with its thread trailing, legible swatches and index
cards. Drag probed with a harness-mimicking script: pointerdown at x=300
selected row 8 (1998), move to x=900 selected row 28 (2018), move to
x=60 selected row 1 (1991); on release the shuttle resumed the cycle
row and the 1991 row kept its gold underline and gold-bordered card.
One fix round: PHASE0 moved from 26 to 26.7 so frame one shows the
shuttle mid-row instead of parked at the row start; re-rendered and
re-inspected after the fix.
