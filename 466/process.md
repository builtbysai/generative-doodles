# №1510 "Night Dances: Two Voices, One Room" (sonia-wieder-atherton SW7, PP757)

Gallery date: 2006 · 03 · 01 (formula date; recorded here only, never drawn in the piece).

## Palette (exactly as specced, no other color)

- Room: charcoal #2a2a30 (full-bleed ground)
- Spoken shape: cream #e8e0d0 (active) / resting state grey #b8bcc0 (dimmed)
- Cello line: gold #d9a441 (active) / resting state grey #b8bcc0 (thin trace)
- Room edge: slate #4a5a7a (thin frame stroke)

## Composition

- Column at left (x 0.10W–0.21W): 14 seeded abstract marks — horizontal bars,
  dots, squares, short ticks — stacked from 0.14H to 0.85H. Abstract only:
  no letterforms, no readable words, no book, no poet figure.
- Cello line across the right two-thirds (x 0.36W–0.94W, mid-height).
- The centre between them (0.26W–0.34W) is kept clear; nothing else is in the room.
- Slate room-edge frame stroke, inset 2% of min dimension.
- Full-bleed on phones; same fractional composition at 390 wide, no clipping.

## Turn scheduler

Two layers with active/rest states, driven by a per-loop schedule. Loop k:
column turn, silence, line turn, silence. Durations come from a mulberry32
stream seeded with (1510000 + k × 1013904223), so every loop index is
reproducible and no Math.random is used anywhere (the one grep hit for
"Math.random" is a code comment stating exactly that).

Loop 0 measured durations: column 7.853 s, silence 3.460 s, line 7.316 s,
silence 3.141 s, total 21.770 s. Loop totals vary per loop by design
("repeating with varying lengths"); determinism is per loop index, not
per fixed loop length: the same loop index re-renders byte-identically.

- Column active: cream marks with a gentle turn-local sway
  (sine on time-within-turn, 6 s period, ~0.4% of min dimension).
- Line active: gold sine curve ("breath") with a fainter gold echo line,
  amplitude breathing on a 7 s turn-local sine, phase on a 9 s turn-local sine.
- Resting voice: grey at 0.45 alpha — thin straight trace for the line,
  dimmed marks for the column.
- Silence states are real: both voices rest, centre empty.

## Drag mapping (closed-form, never frame-integrated)

Pointer events record rate segments: pointerdown opens a segment, each move
closes it and opens a new one with the new x, pointerup closes it. While a
segment runs, the turn clock runs at 0.75 only when the drag side matches
the turn active at the segment's start (x < 0.35W = column side, else line
side); otherwise it runs at 1. After release the clock runs at 1 from the
shifted anchor, so the loop's own rhythm resumes. Drag never makes both
voices active at once, never deletes a silence, never turns the column
into readable text, never restarts anything.

## House-rule compliance

- Canvas 2D only; viewport from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw()
  (style width/height in px); phone detection via window.screen physical
  size (min dimension < 700 px) with aspect h > w × 1.15 fallback.
- Fixed-phase first frame: draw(0) at load, column turn active, resting
  grey line trace visible. rAF loop is a plain function declaration;
  the rAF timestamp anchors the clock (no Date, no performance.now).
- All animation on loop-local / turn-local time; event state closed-form
  over recorded drag segments.
- Fully silent: no AudioContext at all. No offscreen canvas, no Path2D,
  no ctx.filter, no gradients (flat-alpha layers only), no shadowBlur,
  no document.createElement, no WebGL, no getUserMedia, no localStorage.
- Dots/marks drawn as filled rects (no batched arcs); fading alphas
  rounded to 4 decimals before use.
- No visible text except `<title>`. No click-to-reload / click-to-restart.

## Probe results (probe-1510.js, vm-isolated instance, real node-canvas)

- Loop 0 durations: col 7.853 s, sil1 3.460 s, line 7.316 s, sil2 3.141 s.
- Column turn (t = col/2): 791 cream px in column zone, 0 gold px in line zone.
- Silence 1: 0 cream, 0 gold, 0 non-room px in centre zone.
- Line turn: 2484 gold px in line zone, 0 cream px in column zone.
- Silence 2: 0 cream, 0 gold, centre empty.
- Both voices never active at once: 91 samples at 0.5 s steps over loops 0–1,
  0 violations.
- Drag toward column during column turn (down t = 1.0, still held at
  t = col + 0.5): state still "col" (eff 6.515 < col 7.853).
- After release, line starts at the shifted real time (eff threshold
  col + sil1 reached at t = 13.151): state sil1 at tStar − 0.5, line at
  tStar + 0.5.
- Mismatched drag (toward line during column turn): column turn NOT
  lengthened — state sil1 at col + 0.5.
- Same drag sequence in two fresh instances: byte-identical buffers.
- Loop 1 mid-column frame identical across instances; frame one
  identical across instances.
- Thumb byte-compare: two independent 720×720 renders byte-identical to
  the shipped thumb (md5 efa97ba928e2569fa6069d3b86dae450).
- Renders inspected: desktop 1280×720 (cream abstract column, grey resting
  line, slate edge, empty centre), mobile 390×844 (same composition,
  full-bleed, no clipping).

## Fix rounds

None to the piece. One probe-harness correction only: the first drag/
release probe computed the shifted line-start time in the wrong domain
(added the eff-time lag to the eff threshold instead of converting it to
real time); the probe math was corrected and re-run, the piece unchanged.

## Deviations from the prompt

None, apart from the documented house-rule adaptations: canvas 2D
throughout, closed-form drag state, seeded (never random) turn lengths,
fixed-phase first frame, fully silent, flat-alpha resting states.
