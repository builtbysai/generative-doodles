# No.1564 "The Alphabet, Lit"

- Title: The Alphabet, Lit
- Prompt code: TW5 / PP811, EXPANSION #206 shunsuke-takawo
- Formula date: 2006 · 04 · 24
- Gallery note: "Sixteen neon tube letters in white, cyan and pink flicker like real signage on dark ground. Watch the letters flicker."
- Interaction cue: Watch the letters flicker.

## Felt driver

His 2021-12-20 neon alphabet as a shop sign after dark: sixteen tube letters
glowing on a near-black wall, each one alive on its own faulty circuit, the
grid never quite the same twice.

## Mechanism

- 4x4 grid of capital letters B through Q in reading order, each drawn with
  strokeText in a bold sans font. The neon glow is three concentric strokes
  at decreasing alpha (wide faint, mid, bright core); no blur filter, no
  shadowBlur, so the glow is drawn line work, not bloom.
- Tube colors assigned by a seeded shuffle: 6 white #F4F4F4, 5 cyan #7FE7F2,
  5 pink #F2A0C0. Each letter carries a slight seeded rotation jitter
  (within 0.06 rad either way).
- Ground is #0B0B10 with a seeded speckle texture of 420 faint dots, so the
  dark field has grain without any extra color.
- Flicker is a per-letter state machine, a closed-form function of piece
  time: each letter runs on for 3 to 9 s, drops out to a dim single stroke
  for 1 to 2.5 s, then buzzes back over 0.6 s at about 3 Hz, then runs on
  again. Dropouts last a second or more; nothing strobes above a few Hz.
- Every 30 s exactly one cell swaps to a different capital letter. The swap
  sequence comes from a seeded stream indexed by floor(t / 30) and replayed
  from epoch zero, so the grid never repeats and the swap target always
  differs from the letter currently in that cell.
- Watch-only: no pointer interaction, resize listeners only. Title, formula
  date and hint line are drawn on the canvas; no other text.

## Palette

- Ground #0B0B10; tube white #F4F4F4, cyan #7FE7F2, pink #F2A0C0.
  Nothing else.

## Composition

- Centered square 4x4 grid sized to 60% of the smaller viewport dimension
  (66% on phones), generous dark margins on all sides. The grid keeps its
  square shape on phones and desktop; the page ground is the piece's own
  #0B0B10 and the hint is drawn in dim white to match.

## Determinism note

- All randomness comes from mulberry32 seeds at load (1564000 for layout,
  colors, jitter, flicker parameters and speckles; 1564001 for the swap
  stream). Flicker brightness and the displayed letter in every cell are
  closed-form functions of piece time plus seeded state; there is no
  Math.random, no wall-clock phase, no frame-integrated state. One
  synchronous frame is drawn at load from t = 0, where every letter is on
  and the grid reads B through Q; requestAnimationFrame calls are
  typeof-guarded.

## QA renders inspected

- Desktop 1280x900: all 16 letters legible, three tube colors balanced
  (6 white, 5 cyan, 5 pink), layered-stroke glow reads as neon tubes,
  generous dark margins, title/date/hint in place, no clipping.
- Mobile 390x844: same 4x4 grid, smaller letters, no clipping; square grid
  centered on the dark ground.
- Thumb 720x720: final render, grid reads clearly at gallery size.
- One fix round: the first render failed because rgba() was passed
  pre-formatted alpha strings and called toFixed on them; rgba() now
  accepts a number or a string, and all three sizes re-rendered clean.

## Probe results (probe-1564.js)

- Frame one: letters read BCDEFGHIJKLMNOPQ, all 16 on at full brightness.
- Flicker: over t = 0 to 120 s sampled every 0.5 s, 531 dim samples and 172
  buzz samples across the 16 letters; dropouts are slow and irregular.
- Swap: exactly one cell changes per 30 s epoch (t = 30, 60, 90 checked),
  each replacement different from the letter it replaces.
- Frame-one determinism: two fresh 720x720 renders byte-identical
  (md5 d1a60814f42299720765dbe84b38dbab).
- No Math.random, no Date.now, no shadowBlur, no ctx.filter anywhere in
  the piece.
