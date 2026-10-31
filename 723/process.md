# No.723 — Eight-Spoke Cipher

Expansion #88 (okazzsp), prompt block 4. A 7×4 chart of abstract signs on
off-white paper, every sign a subset of one scaffold: a circle of 8 arc
segments plus 8 radial spokes. Line art only, no letters, no text.

## Concept

Okazzsp's scaffold cipher: one fixed construction kit (a circle with 8
spokes) generates a whole vocabulary of signs by subsetting. The piece
rebuilds that discipline as a living chart — the signs slowly reconfigure,
one segment at a time in reading order, so the chart breathes instead of
spinning. Exactly four signs break the black discipline with a single
red or blue segment.

## Construction

- **Scaffold mask design.** Each sign is two 8-bit masks: `arcs` (the 8
  arc segments of 45°) and `spokes` (the 8 radial segments from centre to
  rim). Segments are indexed 0–15 (0–7 arcs, 8–15 spokes) so a single bit
  flip addresses any segment. Signs are generated with mulberry32 from
  the epoch seed; a candidate is accepted only if its total segment
  count is 5–11 and it holds at least 2 arcs. The arc minimum is the
  letter-guard: spokes-only subsets can collapse into letter shapes
  (a vertical spoke with two diagonals reads as "K"), and the prompt
  demands that any subset resolving into a character be broken. No two
  signs in a chart share an identical mask pair (enforced by a used-key
  set during generation).
- **Reconfiguration.** The 50-second loop flips one segment per sign in
  reading order, one sign per second starting at t=6s, each flip fading
  over 0.5s. A per-cycle flip plan is generated from the same seeded
  stream: each sign's flip bit is chosen from a seeded shuffle, and a
  bit is accepted only if the post-flip mask pair stays unique across
  the chart and keeps at least 2 arcs. At the loop boundary the flipped
  masks become the next cycle's base, so the chart keeps rewriting
  itself indefinitely while every frame remains a pure step function of
  (epoch seed, cycle, t).
- **Accent rule.** Exactly 4 signs carry exactly one accent segment,
  chosen in 4 distinct seeded rows, one per row; the accented bit is
  always a segment present in the sign's mask, and colours alternate
  red (#E63946) / blue (#1D6FE0). The accent follows the segment
  identity, so if that segment is flipped off in a later cycle the sign
  simply draws in plain ink until it returns.
- **Construction circles.** 3 seeded signs get a faint dotted full
  circle under the line art (ink at alpha 0.22), the process-slide feel
  from the reference chart.
- **Layout.** 4 columns × 7 rows of square cells fitted to the viewport
  with a 7% margin; sign diameter is 55% of the cell. Arcs are inset by
  0.035 rad at each end so adjacent segments stay visually distinct;
  all strokes use round caps.
- **Determinism.** Frame one is a synchronous `draw(0)`; the animation
  clock is anchored to the first rAF timestamp, never to `Date.now()`.
  Canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window; `canvas.style.width/height` are
  pinned in px on every draw. Phone detection uses
  `window.screen` (min dimension < 700px) with aspect fallback. rAF is
  typeof-guarded. Tap (pointerdown) advances the epoch and reseeds all
  28 signs; there is no drag and nothing reloads.

## QA log

- Rendered with `render-piece.js`: desktop 1280×900, mobile 390×844,
  thumb 720×720. Thumb rendered twice and byte-compared: identical.
- Desktop: 28 abstract signs, all visibly built from the same circular
  scaffold; 4 accent segments (blue arc row 4, red arc row 5, blue arc
  row 6, red spoke row 7), each in a distinct row; dotted construction
  circles under 3 signs. Nothing resolves into a letter.
- First QA pass caught a spokes-only sign in the bottom-left cell that
  read as "K"; added the at-least-2-arcs rule to generation and to the
  flip-plan acceptance test, re-rendered, and confirmed the cell now
  shows an abstract arc/spoke mix.
- Mobile: chart refits the tall frame, all 28 signs visible, nothing
  clipped.
- Palette held to paper #FAFAF7, ink #141414, accents #E63946 / #1D6FE0
  only. No text anywhere except the `<title>`.

## Deviations

- None from the prompt's substance. Two implementation choices worth
  noting: (1) flips fade over 0.5s rather than switching instantly, so
  the reconfiguration reads as breathing; the schedule itself is still a
  step function of the seeded plan. (2) The letter-guard is implemented
  as a structural rule (minimum arc count in both generation and flip
  planning) instead of checking finished signs by eye each cycle, which
  keeps the guarantee for every future cycle and reseed, not just the
  first chart.
