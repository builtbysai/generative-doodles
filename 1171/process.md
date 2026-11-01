# №1171 — Beachball Metronome

Jon Satrom study block JS4 — the spinning beachball as conductor; kill -9 as
metronome. A minimal dark stage: the rainbow pinwheel sits center and six
small monochrome vignettes orbit it, advancing only while the ball lets them.
The freezes are choreographed, never real jank — the frame rate stays smooth
throughout; it is the vignettes' clock that stops.

## Composition

Background `#050507`. Six vignette cards (`#141416`, 1px `#26262B` borders)
in an elliptical ring around the beachball: bouncing dot (top), scrolling
diagonal stripes (upper right), pulsing ring (lower right), typing line
(bottom), rotating wireframe cube (lower left), dripping bar (upper left) —
all in `#E8E8E8`. The beachball is six flat pie segments (`#FF3B30`, `#FF9500`,
`#FFCC00`, `#34C759`, `#007AFF`, `#AF52DE`) with a white hub; during a freeze
it wears a pale ring highlight. Along the bottom, a progress bar (track
`#222222`, fill `#00FFC2`) is stuck at 99% forever: its fill is
`0.99 · (1 − 0.02 · twitch)`, twitch a seeded step function of piece time, so
it shudders backward in small steps and never reaches 100%. The only text is
the typing vignette's "loading the good part..." and the "99%" label.

## The freeze mathematics

Everything is a closed-form function of piece time T. Inside the 20 s loop
the rhythm is fixed: play [0,4), freeze [4,6), play [6,9), freeze [9,10),
play [10,16), freeze [16,20) — 7 s frozen per loop.

- `frozenBefore(T)` is the exact measure of frozen time in [0, T): full
  loops × 7 s plus a piecewise within-loop term, plus tap windows (below)
  counted only where the schedule had not already frozen that time — tap
  windows are merged first, and each contributes its length minus the
  schedule-frozen part inside it, so overlaps are never double-counted.
- Vignette time `vt = T − frozenBefore(T)`. Every vignette is a pure function
  of vt, so during any freeze all six hold perfectly still.
- Beachball angle `= 2π · (0.6 · playTime + 2.2 · frozenTime)` — the integral
  of its spin rate: 0.6 rev/s while playing, 2.2 rev/s while frozen. The ball
  speeds up exactly when everything else stops; that contrast is the piece.
- **Tap the beachball** (within 1.25× its radius) and a 3 s freeze window
  opens at that piece time. It enjoys the attention.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 5 s — inside the
  first freeze: vignettes visibly mid-action but held (the typing line is
  mid-delete at 22 characters, the dot hangs with its ghost trail), beachball
  mid-spin, freeze ring on. The rAF loop is `typeof`-guarded and anchored as
  T0 + elapsed since load.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height` are pinned
  in px in `fit()`. Phone detection via `window.screen` physical size
  (min dimension < 700 px) with the `h > w·1.15` aspect fallback; on phones
  the cards shrink and the ring's horizontal radius is solved so diagonal
  neighbours clear each other (centres at ±30° stay ≥ card width + 6 apart).
- All randomness is a seeded mulberry32 (the bar twitch). No gradients, no
  `ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`, no
  ImageData, no audio, no microphone. Pie segments and dots are each drawn
  as standalone paths (a `moveTo` before every arc), per the node-canvas
  batched-subpath lesson. Silent by design.

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp` identical);
  desktop (1280×800) and mobile (390×844) renders read by eye — the first
  mobile pass overlapped cards on the narrow stage, fixed by the phone
  layout rules above and re-rendered at all three sizes.
- Freeze probes (throwaway T0-shifted copies, deleted after): renders at
  T = 4.5 and T = 5.5 — both inside the first freeze, both vt = 4 — have
  pixel-identical vignette regions (0 differing pixels outside the ball and
  progress-bar masks) while the full frames differ by ~21k pixels (the ball
  kept spinning). Play-phase probes (vt = 2, vt = 4.5) differ from the frozen
  frame by ~16k vignette pixels. Vignettes advance only during play.
- The freeze math was also unit-checked against the shipped source:
  schedule boundaries (frozenBefore(20) = 7, (10) = 3, (9.5) = 2.5), a tap
  window [2,5) adding exactly 2 s beyond the schedule, and two rapid taps
  merging into one window with no double count.
