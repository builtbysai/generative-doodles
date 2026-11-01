# No.993 — Chains

Study #122 satoshi-horii, PP154 ("chains", 2016): a live trading stream rendered
as geometry. No numbers, no axes, no labels — the river is the data.

## Concept

A dark riverbed crossed by three hairline threads. Trade events arrive as
bright pulses that flow left to right along the threads; every six arrivals
compress into a solid block on the center thread, colored by net direction
(buys cyan, sells magenta) and sized by total volume. The chain of blocks
scrolls leftward as new blocks close at the assembler gate on the right. A
thin white price trace runs through the block midpoints — each midpoint is a
price level, drifted up or down by its block's net flow, so the trace is drawn
by the blocks and by nothing else. Rare oversized whale pulses arrive in
yellow; when a whale's block closes, a shockwave ring passes through the
ledger and nearby blocks swell and settle.

Cause and effect are the mechanism throughout: no pulse exists that does not
flow, block, and move the trace; no block exists without its six pulses.

## Construction

- **Event stream.** A seeded Poisson process (mulberry32, rate 2.2/s,
  exponential inter-arrivals). Each event carries a lane (one of three
  threads), a skewed volume (0.3–1.45), and a direction. The schedule is
  generated lazily ahead of the playhead; whale events are interleaved on
  their own seeded schedule (every 45–70 s, volume ~3x, yellow).
- **Pulses.** An event is drawn in flight for exactly TRAVEL = 4.5 s, moving
  at constant speed from the left edge to the assembler gate at 0.8 W. Dash
  length and thickness scale with volume. Arrival time = spawn + TRAVEL.
- **Blocks.** Arrivals are sorted and grouped in sixes; a block closes at its
  sixth arrival. Height = total volume (capped at 0.34 H, scaled 0.036 H per
  unit); color = sign of net signed volume; a small tick notch is cut on the
  top-right edge (an index mark, not a number). Block x-positions use even
  slot spacing: a block's offset from the gate is (closed blocks after it +
  fractional fill of the block currently forming) × slot width, so the chain
  scrolls smoothly and blocks never overlap.
- **Price level.** A cumulative walk: level += net × 0.010, clamped to
  [0.22, 0.78], seeded at 0.5. The trace connects visible block midpoints and
  ends at a head point at the gate at the current level.
- **Whale shockwave.** For each closed whale block, age = T − close drives an
  expanding yellow ring centered on the block, plus a swell on blocks within
  index distance 3: scale += 0.38 × falloff × exp(−age/1.05) × cos(7·age −
  0.85·distance), floored at 0.55. Gone by ~3 s.
- **Interaction.** Tap injects a trade at the left edge: nearest thread,
  volume mapped from tap height (higher tap = larger), direction by side of
  the center thread; injected pulses carry a white core. Drag horizontally
  time-dilates the stream (target factor 1 + dx/220, clamped 0.25–3); on
  release the factor eases back to 1 over ~3 s. Because stream time is
  accumulated rather than read from a clock, dilation bends the whole model
  (pulses, closes, rings) coherently. Double-tap reseeds the market with a
  deterministic LCG step from the current seed and restarts at T0.
- **Sound.** Lazily created on the first pointer gesture, typeof-guarded.
  Per-event ticks (pitch by volume), a low thunk per block close, a deep
  two-oscillator boom per whale, and a quiet drone whose pitch follows the
  current price level. The piece is visually complete in silence.
- **Determinism.** Frame one is the synchronous draw at fixed stream time
  T0 = 30 s after a full seeded reseed at load; no wall clock feeds any drawn
  state. Canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window, and the canvas CSS size is pinned in px
  on every draw. Phone detection uses window.screen (min dimension < 700)
  with a tall-aspect fallback; the page ground is the riverbed tone. No
  gradients, shadowBlur, ctx.filter, or offscreen canvas anywhere.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png). Renders clean in silence (no audio,
  no rAF in the harness).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Duplicate deleted.
- First pass bug, found on read-back: all blocks stacked at the gate.
  blockX counted "blocks closed after this one" by scanning from the newest
  block and breaking at the first unclosed close-time, so the count was
  always zero. Rewrote with an explicit last-closed index and a time-aware
  fractional slot (arrivals since last close as of T). Also softened the
  level step (0.016 → 0.010, clamps widened) after the walk pinned itself
  against the upper clamp, and raised T0 from 24 to 30 so frame one holds
  ten closed blocks; block height scale trimmed 0.042 → 0.036.
- Read-back after fixes: three faint threads across a dark field; ten
  cyan/magenta blocks chained along the center-right with the newest at the
  gate; ~10 bright pulses mid-flow spread across all three threads; the
  white trace weaving through the block midpoints and extending to the gate.
  Mobile shows the same system compressed, nothing clipped.

## Deviations

- **Block geography.** The prompt describes pulses stacking into blocks on
  the center thread with the ledger flowing right-to-left. Implemented
  literally as: pulses ride all three threads to a single assembler gate at
  0.8 W where every sixth arrival closes a block; blocks then scroll
  leftward. This keeps the pulse → block → trace causal chain legible in one
  reading direction instead of splitting assembly across lanes.
- **First whale timing.** The seeded whale schedule starts at 40–60 s, just
  after frame one (T0 = 30), so the thumbnail shows the pure stream/block/
  trace system; the shockwave arrives early in any real viewing session.
- **Dilation ease.** The prompt's stretch/compress is applied to stream time
  itself (with a ~3 s ease back to 1× on release) rather than to pulse speed
  alone, so blocks, rings, and audio stay in sync with the pulses.
