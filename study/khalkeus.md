# khalkeus / dlch: "binary clock" (OgVzpq)

**Pen:** https://codepen.io/dlch/pen/OgVzpq (queued under the old URL
https://codepen.io/khalkeus/pen/OgVzpq; CodePen redirects to the current
username dlch)
**Author:** dlc (Twitter creator handle @khalkeus3d)
**Status:** 2026-09-21, deep. Source read in full from the live pen,
re-rendered locally from the authored code, pixels inspected.

Facts: tags clock, binary, canvas. Created 2017-06-06, updated 2017-06-08.
No description text on the pen. No mouse, click, or keyboard handlers. The
layout recalculates on window resize.

## Technique

Vanilla canvas 2D with a requestAnimationFrame loop. The clock is a 6 column
by 3 row grid of squares: hours on top, minutes in the middle, seconds on
the bottom. Each row renders the current time unit as a binary string. A 1
bit is a solid black filled square, a 0 bit is a thin outlined square.
Columns left of the first significant bit are drawn as outlines too, so the
grid is always a full 6 by 3. Square size is relative to window height
(canvas.height / 15) with fixed 20px gaps, and the whole grid is centered
with computed x/y offsets.

The full JS is about 40 lines. The only state is the current Date. There is
no seed, no library, no interaction.

## Palette and composition

Black on pure white, thin strokes, generous spacing, grid dead center. It
looks like a museum placard. The aesthetic is restraint: one rule, one
palette, nothing decorative.

## What makes it sing

The binary grid turns a clock into a quiet little puzzle you decode by
reading left to right, and the filled/outlined square language is legible at
a glance once you know the trick. The seconds row visibly churns, which is
the only motion in the piece and exactly enough.

## Avoid-list notes

Nothing overdone here. One observation for the discipline: a full redraw
every animation frame (white fill clear, then redraw the grid) is the
standard approach for clocks and fine at this complexity; there is no
reason to get clever.

## Cross-links

Pairs with the BinaryClock entry from the interactive classics batch 2
study (same bit logic, different presentation). Minimal geometry plus
restraint is the same family as the xdesro chord and triangle studies.
