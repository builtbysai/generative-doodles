# №1558 "Number Waterfall"

- Prompt code: JK7 / PP805, EXPANSION #205 kiyoshinakauchi
- Formula date: 2006 · 04 · 18
- Title: Number Waterfall

## Visual

Columns of seven-segment digits cascade down a dark field like a departure
board in free fall. Each column falls at its own rate; digits tick over as
they fall (0-9 cycling, never random flicker). Occasionally a column stalls,
holds its number, then drops. The glyphs are the only marks: phosphor green
on near-black, crisp, no glow. No katakana, no trails, no readable words or
meaningful numbers: every glyph in a column shows that column's single
current digit, so no row ever spells anything.

## Palette

- Ground: near-black #0d0d0d
- Digits: phosphor green #33FF66
- Nothing else. No glow, no blur, no shadowBlur, no gradients.

## Composition

Full-bleed columns, even spacing, generous top margin (0.09 of frame height)
where columns enter; the digit field is clipped to below that margin, so
glyphs slide in from under a clean dark band. Column count scales with
width: 14 at 1280 px, 7 at 390 px. No other object.

## Motion and interaction

Watch-first cascade loop. Columns scroll downward continuously, wrapping;
digit values increment on a per-column clock (0.45-1.3 s per step, seeded
per column). Each column has its own seeded stall cycle (period 7-16 s,
stall 0.8-2.2 s): while stalled it holds its position and its number, then
drops again.

Dragging on a column scrambles it: while pressed, that column's digits cycle
rapidly (22 steps per second) under the pointer, settling back to the column
clock on release. Drag never stops a column, never writes a word, never
adds a column. No click-to-restart, no click-to-reload.

## Technical

Canvas 2D. Columns are arrays of seven-segment glyph renderers with
per-column speed and digit clock; drag maps the pointer to the nearest
column and applies a temporary fast cycle. Seven-segment digits are drawn
as vector segments (fillRect per segment from the standard a-g map), never
a font, so they read as segments.

## Determinism

Fixed phase at load: all layout randomness comes from mulberry32(1558000),
never Math.random, never a wall-clock-derived phase. Motion is a pure
function of piece time plus recorded pointer events. Stall time is a
closed-form function of piece time (total stall before t computed from the
seeded period, offset, and duration), so fall offset and digit value both
derive from effective time = t minus stall time, never from frame-integrated
state. One synchronous frame is drawn at load; requestAnimationFrame calls
are typeof-guarded, so node-canvas QA works.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; all three
renders inspected visually.

- Desktop: 14 even columns, crisp seven-segment digits, phosphor green on
  near-black, clean dark top band, no clipping at the sides, no glow.
- Mobile: 7 columns, same composition, no clipping, digits legible as
  seven-segment glyphs.
- Thumb (720x720): matches the desktop composition at square size.

Fix rounds (1): the first build let entering glyphs bleed above the top
margin and clip at the viewport top edge. Fixed by clipping the digit
field to the region below the top margin (0.09H), so columns visibly enter
from under a clean dark band. All three renders re-done after the fix.

Determinism: two 720x720 renders of the final file are byte-identical
(md5 b669e4f1b549f041275c587f5fafe0ef, re-verified after the fix).

Probe harness (probe-1558.js, 11 checks, all passed): frame-one
byte-identical; all 14 columns fall and all 14 digits tick by t=5 s; a
stalled column holds identical y-offset and digit across two times inside
one stall window (col 1, t=6 s, digit 6); pointerdown grabs only column 3;
while held its digit scrambles (3 vs clean 2) while its fall offset matches
the undisturbed run exactly and all 13 other columns match; on release the
digit settles back to the column clock; t=0 vs t=5 pixels differ.
