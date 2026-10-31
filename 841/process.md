# No.841 "The Deadpan" (EXPANSION #103 lou-reed, PP2)

## Concept

Lou Reed's deadpan, made literal: a flat spoken line held steady while the
content around it is extreme. Here the extreme content is a Berlin-style
shattered-glass spider crack spreading across an olive duotone ground, and
the flat line is one perfectly horizontal red line crossing the full width
at mid-height. The crack grows, completes, and fades; the line does nothing,
for the entire loop, forever. Its indifference is the whole piece.
Watch-only; no interaction, no hint text, no sound.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Palette (strict, four tones): olive `#4A5A34`, dark olive `#2A331E`,
  crack white `#F2F2EE`, flat line `#C1121F`. The ground is the olive field
  with a flat horizon split to dark olive at 64% of the height.
- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; canvas pinned in px (`style.width/height`)
  inside `draw()` every frame. Phone detection via `window.screen` physical
  size (min dimension < 700px), aspect `h > w*1.15` as fallback only.
- Crack generation: the full crack tree is precomputed at resize time from
  a fixed mulberry32 seed (841002), so it is identical on every load and at
  every size. Ten primary rays leave the single impact point at
  (0.36 W, 0.40 H); each ray is a chain of short segments with seeded angle
  wander, and segments fork child chains recursively (depth <= 3, thinning
  widths). Three concentric rings around the impact carry partial arcs for
  the glass-webbing read.
- Closed-form reveal: every segment and arc stores a birth time and a growth
  duration. Birth is a function of distance from the impact (the crack front
  travels at a constant seeded speed, reaching full extent at ~18 s) plus a
  per-depth delay, so at any loop time the visible portion of each branch is
  a pure function of t. Loop is 30 s seamless: growth 0-20 s, hold 20-26 s,
  fade 26-30 s (alpha only), at 30 s the crack is invisible and the loop
  restarts cleanly.
- The line's constancy: the red line is a single `fillRect` from the palette
  constant, drawn last in every frame with fixed geometry (full width,
  y = H/2, thickness max(3, 0.011 x minDim)) and alpha 1. It is drawn after
  the crack, so branches pass behind it visually, but the line itself has no
  time-dependent term of any kind: no twitch, no brightening, no reaction.
- Frame one anchor: the synchronous first draw is at loop t = 4 s
  (`LOOP_OFF = 4`), so the shipped thumb shows a young crack (impact knot
  plus the first radial branches) with the line already crossing, exactly as
  it will in every other frame. Frame one is never derived from `Date.now()`;
  the rAF loop is anchored to elapsed time since load plus the same offset.
- No gradients, no shadowBlur, no `ctx.filter`, no offscreen canvas.
  rAF is `typeof`-guarded; the QA renderer (no rAF, no AudioContext) runs
  the synchronous frame only. No audio code at all: the piece is silent.

## QA log

- Rendered with `render-piece.js`: qa-desktop.png (1280x900),
  qa-mobile.png (390x844), thumb.png (720x720). All three show the olive
  field, the dark-olive region below the horizon split, a young white
  spider crack at the impact point, and the flat red line crossing the full
  width at mid-height, perfectly straight. Mobile: line spans edge to edge,
  nothing clipped.
- Determinism gate: thumb.png rendered twice and byte-compared with `cmp`:
  identical.
- Throwaway check at loop t = 20 s (temporary copy with the anchor set to
  20, rendered, read, then deleted): the completed crack reads as glass:
  long radial forks, recursive sub-branches, and concentric webbing arcs
  spanning most of the frame, all passing behind the unchanged red line.
- Deviations: none. The brief's two ground options (horizon split or large
  flat shapes) were resolved to the horizon split.
