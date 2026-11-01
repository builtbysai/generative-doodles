# No.1062 "Sixty-Seven Boards"

Study #130 hideaki-tai, HT7 / PP223: the rhizomatiks_multiplex 2021 PCB wall, 67 kinds of prototype boards in five years, shown as a self-portrait.

## Concept

A dark gallery wall of 24 prototype circuit boards, each one an individual. Every board is drawn procedurally from its own seed: its own solder-mask colour, its own copper trace runs, its own silkscreen label from Tai's real domains (OSC, ARTNET, SYNC, DMX, PWR, CLK, MIDI, HUB), and its own LED blink grammar running on its own phase. Nothing on the wall is synchronised with anything else; the wall is a collection of private behaviours, alive but unhurried. A slow camera pan drifts across a virtual wall larger than the frame. Dragging inspects: the view zooms toward the finger so traces become readable. Double-tap re-populates the wall with a new set of 24 boards.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no offscreen canvas: every board is redrawn from its seeded data on every frame.
- Virtual wall 1920 x 1280 world units, boards on a 6 x 4 grid with generous dark gaps; board width 70-80% of its cell, height 58-69%, with seeded position jitter, so prototypes are never uniform.
- Board generator (per-board mulberry32 stream): solder mask from {#0E5B3C, #123F2E, #1A1A1A}; 3-8 orthogonal copper traces (#B87333) walked on a 14-unit grid from a filled start pad to a ringed end pad; 2-5 copper vias; a shuffled unique silkscreen label (#EDE6DA, tiny mono, the only text in the piece besides the title); 3-6 LEDs in a bottom row or right column, one LED colour per board from {#FF2211, #3DDC84, #FFB800}.
- Grammar set, each a closed-form function of (board, t) with seeded period and phase:
  - heartbeat: double-thump pulse pair, period 1.5-2.0 s.
  - sweep: a bright kernel chasing across the LED row, period 2.2-3.5 s.
  - morse: a seeded 5-9 symbol dot/dash word with letter gaps, then a long dark rest of 1.4-2.8 s.
  - breath: slow raised-sine swell, period 4.2-6.8 s.
  - irregular: 3-5 single sparse blinks (0.09-0.20 s) inside a 9-14 s cycle, long dark gaps, never a strobing train.
- Grammars are dealt from a shuffled roster (5/5/5/5/4 across 24 boards) so the wall always holds all five behaviours; phases are independent, so boards never blink in sync.
- Camera: pan centre is a closed-form sum of two slow sines (90 s and 67 s periods), amplitudes clamped to the wall overflow. Frame one is the synchronous draw at fixed phase t = 14 s; the animation loop anchors elapsed rAF time onto that phase, so the first frame never depends on the clock.
- Interaction: pointer drag eases a zoom (to 1.85x) toward the grabbed world point and glides back on release; double-tap within 350 ms increments the seed and rebuilds the wall. No audio: the prompt specs none.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen (min dimension < 700) with aspect fallback; phone framing targets a taller slice of the wall so portrait works. Strict palette, no gradients, no shadowBlur, no ctx.filter.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png): all render cleanly, no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate render was deleted.
- Desktop frame one (t = 14 s, pan mid-drift): a wall of green and black boards with copper traces, pads, chips and legible silkscreen labels; several boards show LEDs lit in visibly different patterns (one bright red row, one red column part-lit, one dim green column, amber at the frame edge) while most boards sit quiet; no two boards alike, nothing in sync.
- Thumb: same wall section at square framing, labels readable, red LEDs visible on two boards.
- Mobile: portrait slice of the wall, boards whole or cleanly cropped by the pan, labels and traces legible, nothing broken at 390 wide.
- One tuning round: the first build dealt grammars by independent random picks and frame one landed nearly dark. Fixes: grammars dealt from a guaranteed-mix shuffled roster, sweep kernel widened, breath curve lifted, LED halo strengthened. Re-rendered all sizes; determinism re-verified.
- Hygiene greps clean: no Date.now, no createElement, no gradients, no shadowBlur, no ctx.filter, no getUserMedia, no AudioContext, no em dashes, no URLs. Visible text is only the silkscreen board labels plus the document title.

## Deviations

- Chips: 0-2 dark IC bodies with copper pin ticks per board, plus silkscreen-ringed mounting holes at the corners. The brief lists rectangles, traces, labels and LEDs; these two procedural details were added because bare rectangles read as clip-art, which the brief forbids. They are drawn from the same per-board seed and stay inside the strict palette (chip body is a near-black neutral, pins are the copper tone).
- Grammar mix is guaranteed by the shuffled roster rather than left to independent chance, so a reseed can never produce a wall missing a behaviour.
- The pan's vertical amplitude is smaller than its horizontal amplitude (the wall is wider than it is tall relative to the frame); the loop is two incommensurate sines rather than a strict rectangle circuit, which keeps the drift unhurried and non-repetitive at reading timescales.
