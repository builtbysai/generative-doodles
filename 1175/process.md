# №1175 — Net Art Battle

Jon Satrom study block JS8 (PP334), grounded in CH1C4G0.COM (2006), Satrom's
"live net.art battle". Two algorithmic players duel over one shared source
image; the bout always ends in a draw.

## The piece

A split-screen arena. Left is the cyan corner (#00FFC2 on #06110E), right the
magenta corner (#FF2B6E on #11060C). Both halves show the same flat geometric
landscape (navy #0B1026 sky, seeded stars, a pale sun, dark-gold and #FFE14D
hills). Every 4 seconds a player attacks: a VOLLEY flash bar sweeps into the
defender's half, the half jolts, and a corruption lands — a row-tear, a
channel split, or a pixel-sort, seeded per volley. Ten volleys make a 40s
bout. The scoreboard at top center tracks CORRUPTION DEALT per side. A fake
crowd chat ticker (30 prewritten lines, seeded order) scrolls along the
bottom. At 40s the scoreboard digits scramble, glitch, and settle on
"DRAW (REMATCH?)" for a 4s card while the halves dim; then both reset clean
and the next bout starts. There is no winner, ever — the draw is the piece.

Coaching: during the draw card, or in the first 4 seconds of a bout, tap a
side to coach it — that side's first volley of the bout hits 50% harder and
its header reads "+ COACHED". One coach per bout, then it locks; taps at any
other time do nothing.

## How it is built

- The landscape is a pure function `baseRGB(u, v)` sampled per channel, so a
  channel split is just the same function read at three x-offsets.
- Each half keeps a corruption *mapping*, not pixels: three arrays
  (mapX, mapY, chan) saying which source cell each display cell samples and
  how far its channels are offset. Received volleys compose in order as data
  transforms — tear resamples row bands sideways, channel accumulates an
  offset, sort permutes runs of cells by the luminance of what they currently
  show. Rendering walks the mapping and run-length-merges flat color runs.
  No offscreen canvas, no ImageData, no accumulated canvas state: the frame
  is a closed-form function of (bout, landed volleys, coach state).
- Volleys are deterministic per bout (mulberry32 seeded by bout index):
  attacker alternates, LEFT first; routine and strength (7–13%) drawn from
  the bout's seed. Dealt % is the sum of a side's landed volley strengths,
  capped at 99.
- The ticker is a pure function of t: the shuffled message sequence scrolls
  at a constant 55 px/s and wraps.
- Sound: none. The piece ships silent.

## House adaptations

- The prompt's offscreen-canvas/ImageData corruption copies are replaced by
  the mapping-array model above (the QA renderer has no offscreen canvas);
  the visual result — tears, splits, sorts stacking over a shared source —
  is the same.
- First frame is a fixed phase, T0 = 21s into bout 1: five volleys landed
  (three on magenta's half, two on cyan's), scoreboard reading CYAN 29% /
  MAGENTA 20%. The synchronous first frame is drawn at that phase; the rAF
  loop is anchored as phase + elapsed and guarded by a typeof check.
- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in fit(); phone
  detection via window.screen physical size (min dimension < 700px) with the
  aspect fallback. On portrait phones the arena stacks — cyan over magenta,
  scoreboard as a full-width strip — and the volley bar sweeps vertically.
- No gradients, no ctx.filter, no shadowBlur, no createElement, no network,
  no microphone. Grep-verified clean.

## QA

Rendered with the house node-canvas renderer at 1280×800, 390×844 and
720×720. Frame one shows the split arena corrupted differently per half
(cyan's sun row-torn, magenta's sun channel-split into RGB), both headers,
the scoreboard with two percentages, and the chat ticker. Thumb rendered
twice at 720×720: byte-identical.
