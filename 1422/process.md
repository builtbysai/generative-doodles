# №1422 "164 Noses" (thomas-mader TM7, PP645)

## What it is
A field of noses, drawn in pencil and color, filling the frame in rows —
164 of them, counted. All but one are drawn with a condescending snort
(a small curl plus a faint red dot at the nostril). The one exception is
plain and unadorned, its outline in gold only, placed off-center (row 8
from the bottom, column 9 of 12). As the rows rise toward the top of the
frame the noses turn hospital-green, one row at a time. A small row
counter ticks as rows complete, drawn as tally marks, not text.

## Composition
- 14 rows, rising bottom to top. Rows 0–12 hold 12 noses each; the top
  row holds 8, centered (columns 2–9). 13 × 12 + 8 = 164 noses exactly.
- Loose grid: each nose gets a seeded position jitter (±0.10 cell),
  rotation jitter (±0.12 rad), and size jitter (±8%).
- Faint row separator lines in row-line gray.
- Tally chip, bottom-left: paper chip with a thin border, tally marks in
  pencil (groups of five: four vertical strokes plus a diagonal). The
  chip wraps to multiple lines as the count grows.
- No visible text except `<title>`. No hint text: the interaction is
  dragging a nose, and the visible-text rule leaves no room for a hint.

## Motion (all closed-form over piece time and recorded events)
- Seamless 168 s loop. Row k draws during [k×12, k×12+8] seconds of
  cycle time: its noses draw one by one (0.6 s stagger), each profile
  tracing over 0.6 s, then its snort curl animating in over 0.5 s.
  The plain nose draws last in its row.
- The hospital-green wash advances one row behind the drawing: row k
  turns green when row k+1 starts (top row greens at the end of its
  draw window). The plain nose never turns green.
- Frame one is phase-shifted to cycle time 66 s (boot flag draw(0)):
  rows 0–4 are complete, row 5 is mid-draw in pencil, and rows 6–13
  still show the previous pass, green — so the field reads full at load.
- The field never clears: rows not yet reached in the current pass keep
  showing the previous pass until their redraw begins, and at the loop
  wrap only the bottom row is in flux (verified: non-paper pixels hold
  at a 0.916 ratio across the wrap).
- Drag a nose to flip it between snort and plain. Flipping is
  persistent: a flipped nose keeps its new state when its row redraws,
  and the tally changes immediately when the flipped nose sits in an
  already-completed row. The original plain nose, flipped to snort, gains
  a curl and loses its gold; a snorting nose flipped to plain loses its
  curl (and never gains gold — gold marks only the original exception).
- Tally = snorting noses fully drawn in the current pass. It ticks up
  by about 12 per completed row (53 at frame one → 107 by cycle time
  106), resets at the loop wrap, and ticks up again as the redraw pass
  progresses. It is a per-pass counter; the field itself never resets.

## Adaptations
- Noses as parametric line sprites (profile polyline + nostril curl
  parameter + green parameter); no physics sim, no frame-integrated
  state; everything is a closed-form function of cycle time and the
  recorded flip list.
- Row sequencer with a counter state; tally marks, not text; no wipe.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, localStorage, or fillText/strokeText.
  Token scan clean.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals
  before stringifying; dots as filled rects; no arc() calls at all
  (profiles and curls are polylines, each with its own beginPath).

## House rules
- Canvas size from the Visual Viewport API (visualViewport width/height
  + resize listeners on visualViewport and window, never
  window.innerWidth/Height alone); canvas pinned in draw().
- Phone detection via window.screen physical size (min dimension
  < 700 px) with aspect h > w×1.15 as fallback; field-like composition
  goes full-bleed on phones; checked at 390 wide.
- Determinism: synchronous first frame at a constant phase via a boot
  flag (frame one = draw(0), clock starts only with the rAF loop);
  all randomness from a seeded mulberry32 PRNG (seed 1422000 +
  index×7919), never Math.random.
- rAF loop as a plain function declaration behind a typeof guard.
- Interaction: drag a nose to flip it; never click-to-reload; no win
  state (the plain nose is findable but not flagged, and flipping is
  free play, not a game).

## Verification (forced-time probe harness: stubbed rAF driving the
piece's own loop, pointer events to its own listeners, 1280×900)
- Two fresh frame-one renders byte-identical; thumb byte-identical
  across repeated renders.
- Gold pixels: 78 total, all inside the plain nose's cell, 0 outside;
  at t=100 (cycle time 166) the plain cell still holds 75 gold pixels
  and 0 green pixels — the plain nose never greens.
- Wash advance: row-5 band green pixels 383 at t=0 → 1059 at t=30.
- Row-by-row drawing: row-6 band changes 1000 px from t=0 to t=10
  (row 6 starts drawing at cycle time 72).
- Tally: chip-region dark pixels 1732 at t=0 → 2664 at t=40
  (tally 53 → 107, groups 11 → 22). One probe fix, not a piece fix: the
  first tally probe used a fixed-height chip region and missed the
  chip's second line once the tally wrapped — the region was widened
  and the growth confirmed.
- Drag flip: dragging the row-5, column-6 nose at t=20 changes its
  cell (555 → 520 non-paper px, curl gone) and drops the chip count by
  one mark (2138 → 2108 dark px).
- No fix rounds needed for the piece itself.
