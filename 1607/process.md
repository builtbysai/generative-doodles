# No.1607 — J Walks Like a Collie (AW8, study #211 aluan-wang, PP854)

Driver: the piece is a lineup of living parameter presets; the mechanism is
four visibly different walk cycles from one parametric quadruped rig.

## Mechanism

- One rig, four presets. Each breed is a parameter vector: body length and
  height, leg length, stride length, cadence, body bob, foot lift, head and
  muzzle proportions, tail type, ear type, body colour, accent. The walk
  cycle is a phase-offset sine on four legs (walk gait, quarter-cycle apart:
  front-left, back-right, front-right, back-left) with body bob at twice the
  cadence and a slight seeded wobble, all pure functions of piece time, so
  frame one byte-compares.
- J Collie: long low stride (0.84), slow cadence (0.75 Hz), long legs, plume
  tail, semi-flop ears, near-black #1A1A1A body with a white chest blaze.
  K Shiba: short stride (0.48), quick trot (1.50 Hz), compact body, curled
  tail, point ears, ink body with an orange #E07A3F collar.
  M Sighthound: longest stride (1.00), slowest cadence (0.65 Hz), tallest
  legs, deep chest, long thin tail, folded ears.
  L Corgi: short legs, low body, quick trot (1.70 Hz), cropped ears, nub tail.
- Each creature walks in place in its quadrant of a 2x2 lineup, ~20% of frame
  height, centred in its quadrant. Far-side legs render at 0.38 alpha so the
  near/far pair reads. Faint dashed ground lines mark each one's stride
  length and pulse in alpha with the footfalls (twice per cycle).
- Labels beneath each creature in small grey monospace type, as in the dev
  screenshot: code, CJK breed name, English name, plus a parameter line
  (stride and cadence in Hz), e.g. "J 邊牧 COLLIE" / "stride 0.84 · 0.75 Hz".
  Watch only: no pointer listeners at all.

## Deviation from the prompt

- The two unnamed breeds are the prompt's "two generated variants": the
  builder defined them as a tall sighthound-type (M 灰狗 SIGHTHOUND, long
  stride, low cadence, long tail) and a short-legged low trot (L 柯基 CORGI,
  cropped ears, nub tail), distinct from the collie and shiba in stride,
  cadence, posture, tail and ears.
- Corgi leg length raised from the first build's 0.30 to 0.36 (in creature
  units) so its legs read under the body instead of vanishing into it.
- No title, date or hint text inside the piece, per the batch standing rule
  (only the labels the prompt requires). Gallery date 2006 · 06 · 06.
  Hint: "Watch only. Four breeds, four walks."

## House rules

- Visual Viewport sizing, resize listened to on visualViewport and window;
  canvas pinned in draw() via style.width/height in px; phone detection via
  window.screen (min dimension under 700px) with aspect fallback; centred
  geometric lineup keeps its shape, page ground set to the piece's own
  background #F4F4F6.
- One synchronous frame at load; requestAnimationFrame guarded by typeof
  check; deterministic first frame (fixed PHASE 2.5, seeded mulberry32 only,
  no Math.random, no Date). Reduced-motion visitors get the single frame.
- No em dashes in visible copy. Flicker-safe by construction: cadences
  0.65-1.70 Hz, well under 14 Hz; stride-line pulse is a slow alpha sine.
- CJK labels probe-rendered in node-canvas first (邊牧 / 柴犬 legible in
  monospace at label size) before shipping as fillText.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; inspected all
three. Forced-time probe via the exposed draw hook: t=3.5 differs from
t=2.5 (the walks move) and a repeat t=2.5 render is byte-identical to the
shipped thumb.

Fix rounds: 1. Round 1: the collie's white chest blaze sat over the front
leg and read as a white sock; the corgi's nub tail was hidden inside the
body ellipse; stride lines were barely visible on mobile. Round 2
(shipped): blaze moved up onto the chest front and shrunk; nub tail moved
just outside the rear body edge; corgi legs lengthened 0.30 to 0.36;
stride-line alpha floor raised 0.20 to 0.35 and line width raised.

Determinism check: two separate 720x720 thumb renders are byte-identical
(md5 4bd743a741d987192c26449aa9f5d4b7).
