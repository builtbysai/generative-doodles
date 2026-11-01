# №1216 — Ten Skies, One Cloud

Clint Enns study block CE1 (PP375), after his chroma-key remake of James
Benning's *Ten Skies*: ten skies keyed into one frame until the film's reason
for existing is removed. What remains is the keying itself.

## What you see

One full frame of flat sky, always. Ten independent cloud systems drift
through it at their own speeds and directions — some left, some right, one
(layer 5) effectively still. Each sky is flat: two blues (#7FB8E8 / #A8D0F0)
carried by layer parity, cloud whites #FFFFFF / #E8F0F8. There is no ground,
no horizon object, no weather. Depth is only layering — clouds overlap in
impossible stacks that no single sky would allow.

Where a cloud from one sky crosses a cloud from another, the bad key shows,
and it is never cleaned up:

- a hard green edge (#00B140, 3 px) traces the silhouette of the upper
  cloud wherever it sits over a lower sky's cloud;
- a magenta fringe (#FF2BD9) sits 3 px outside the green, the classic
  chroma spill;
- sparse cyan flecks (#00E5FF) sparkle inside the overlap zones, changing
  every 0.4 s;
- the seam brightness shimmers in steps at ~2.5 Hz, per seam segment —
  the seams are alive the whole time, not printed on.

## Seam method

Seams are computed, not painted. Each frame, the frame is sampled on a coarse
grid (cell ≈ W/56, clamped 16–30 px). A cell is a *seam cell* when its centre
falls inside the bounding ellipses of clouds from two or more different
layers. For every seam cell, each side that faces a non-seam cell gets the
fringe + green-edge treatment — so the marks land exactly on the boundary of
the overlap region, hugging the upper cloud's edge as it moves. All state is
a pure function of piece time: drift, bob, shimmer step and fleck step are
hashed from t, nothing accumulates.

## Motion and interaction

- Watch-only seamless loop of 156 s (2:36, the *Ten Skies* runtime). Drift is
  quantised to whole wrap-lengths per cycle and the vertical bob to whole
  cycles per loop, so frame 156.0 is frame 0.0 exactly.
- Drag (press and hold) on a cloud **solos its sky**: over 0.4 s the other
  nine skies' clouds fade to 25% and the whole field washes toward key-green
  while the held cloud's layer renders alone at full strength. Release, and
  over 0.6 s the ten skies collapse back together. Solo strength is computed
  from the recorded hold intervals, never integrated frame-by-frame.

## House adaptations

- Clouds are clusters of overlapping filled circles (one `beginPath` +
  `moveTo` per arc, flattened under a 0.66 vertical transform) — no
  `ctx.ellipse`, no gradients, no offscreen matte pass; the "key" is faked
  analytically from cloud geometry each frame.
- Cloud size is measured against the frame's short side, so the sky's density
  survives portrait phones instead of one cloud swallowing the whole width.
- First frame is drawn synchronously at a fixed phase, T0 = 47 s, well into
  the loop with several cross-sky overlaps mid-frame; the animation is
  anchored as phase + elapsed-since-load, with `requestAnimationFrame`
  typeof-guarded.
- Canvas is sized from the Visual Viewport API with resize listeners on both
  the viewport and the window; the canvas CSS size is pinned in `draw()`.
  Phones are detected via `window.screen` physical size (min dimension
  < 700 px) with an aspect fallback.
- Silent. No visible text beyond the document title.
