# No.1539 "The Grid That Swells" (arthur-jafa AJ4, PP786)

Gallery date: 2006 · 03 · 30 (recorded here only, never drawn in the piece).

## What it is

A neat 6-by-4 grid of small square tiles on near-black ground (#121014), like a
contact sheet. Each tile holds one tiny abstract mark (disc, bar, ring, zigzag,
dot cluster) in one flat muted color (bone #cfc8b8, muted red #8f3a2c, ochre
#a87f3d, teal #4a615a, silver #b8b8b8). On a slow timer one tile swells to fill
the frame in discrete steps, holds, sinks back in steps, and then another tile
swells. The grid itself is never disturbed: tiles around the swollen one stay
exactly where they are, and the grid redraws identically underneath every
swell.

## Schedule (closed-form, seeded)

- Seed: mulberry32, seed 1539000. All variation (tile bank, swell intervals,
  swell choices) comes from this stream, never unseeded randomness.
- Tile bank: 24 tiles; mark types and colors are distributed evenly (each type
  and color appears 4–5 times) and shuffled by the seeded stream.
- Swell schedule: 10 start-to-start intervals in [8, 15] s drawn from the
  stream. The loop length is their exact sum, 107.802 s, so the schedule
  repeats exactly and no swell crosses the loop boundary (each swell spans
  6.6 s, below the 8 s minimum interval). Frame one is the plain grid: the
  first event starts at t = 0 in its 1x step.
- Step timeline per swell (never interpolated, only discrete jumps): 0–0.6 s
  at 1x, 0.6–1.2 s at 2x, 1.2–1.8 s at 4x, 1.8–4.8 s full-frame (3 s hold),
  4.8–5.4 s at 4x, 5.4–6.0 s at 2x, 6.0–6.6 s at 1x, then idle.
- Pairing rule: each scheduled tile after the first rhymes in outline (same
  mark type) or inverts in color from the previous scheduled tile. Inversion
  is a fixed rotation of the palette order: bone -> ochre, red -> teal,
  ochre -> silver, teal -> bone, silver -> red. The first tile is a seeded
  pick. Candidates always exclude the previous tile.
- Swollen rendering: at 2x/4x the tile is drawn centered on its cell at that
  multiple of its size, on the slightly lighter swollen ground (#2a2622);
  at full-frame it covers the whole frame on that ground with its mark drawn
  large at center. At 1x it is just its normal cell.

## Drag

- Pressing a grid tile swells that tile early with the same step pattern
  (a manual swell session, 6.6 s from the press). A manual swell supersedes
  a scheduled swell for its duration, so exactly one tile is ever swollen;
  a press while a manual swell is already active is ignored.
- Pressing the currently swollen tile (hit-tested against its current rect,
  which at full-frame is the whole frame) holds it full-size while pressed;
  on release the scheduled/manual timeline resumes from that time.
- Drag never rearranges the grid, never swells two tiles at once, never
  zooms smoothly. All drag state is a log of press/release events; every
  frame is a closed-form function of piece time and that log.

## Adaptations

- Canvas 2D only; no gradients, no offscreen canvas, no text except
  `<title>`. Fully silent, no audio of any kind.
- Fixed-phase first frame (`draw(0)`); the rAF loop is anchored as offset +
  elapsed-since-load, as a plain function declaration. Every animation step
  is on loop-local time, so t = loop equals t = 0 exactly.
- The grid rect is the largest 3:2 rect fitting the viewport, centered, so
  tiles stay square on every screen; the page ground is the grid ground.
  Viewport comes from the Visual Viewport API, canvas pinned in `draw()`.
  Phone detection via `window.screen` physical size (min dimension < 700 px)
  with aspect fallback.
- Dots are filled rects; single arcs use a `moveTo` before the arc; canvas
  state (lineCap, lineWidth, colors) is set explicitly in every drawing
  branch, since canvas state persists across `draw()` calls.
- Probe-only hook `window.__t39` exposes the loop length, event schedule,
  tile bank, grid cells, current swell, and field rect. It draws nothing.

## QA

- `probe-1539.js` (vm-isolated, real node-canvas, driving the piece's own
  rAF loop): 22/22 pass — frame-one identity across fresh instances; loop
  closure at t = LOOP and t = 2 * LOOP byte-identical; grid exactly 6x4 with
  uniform, fixed cells; swell intervals all in [8, 15] s including the wrap
  interval; pairing rule holds for every consecutive pair; exact step pattern
  1, 2, 4, full, 4, 2, 1 with no intermediate scales in a dense 0.05 s sample;
  a far cell pixel-identical during a 2x swell; grid-tile drag swells the
  pressed cell early with the same steps and supersedes a scheduled swell;
  swollen-tile drag holds full-size while pressed and resumes the scheduled
  step on release; cell positions unchanged after drags; identical drag
  sequences byte-identical.
- Renders inspected personally: desktop 1280x720 (neat 6x4 grid, one mark per
  tile, even margins), mobile 390 wide (full-width grid, square tiles,
  centered, no clipping), plus a mid-swell render at full-frame (swollen
  tile's mark large at center on the lighter ground, covering the frame).
- Thumb byte-compare: three independent 720x720 renders byte-identical to
  the shipped thumb.
- Forbidden-API grep: 0 hits (no unseeded randomness, wall-clock timers,
  audio, microphone, gradients, or drawn text).

## Fix rounds

1. Comment-only: the word for the unseeded-random API appeared in a code
   comment and tripped the forbidden-API grep. Reworded; no behavior change;
   thumb md5 unchanged after the edit (all probes re-run).
