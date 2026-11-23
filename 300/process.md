# No.722 "Noise Halftone" — EXPANSION #88 okazzsp, block 3

## Concept

Okazzsp's build order made literal: grid first, shape second, one binary
rule third, a noise-driven parameter fourth. A strict grid of circles on
white paper; a slow seeded value-noise field sets each circle's radius,
so the grid reads as a breathing halftone — swells of big circles,
shallows of dots. The single binary rule splits the field at a vertical
divide near 55% width: solid ink on the left, hollow rings on the right.
No color, no image hidden in the field; the field is pure noise.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette is exactly two tones: paper `#FFFFFF`, ink `#111111`.
- Grid: 26×26 probes on desktop, 22×22 on phones (phone detection via
  `window.screen` min dimension < 700px, aspect fallback only). The grid
  is drawn on the largest centered square of the viewport with even
  margins; max radius is 0.46 of the cell pitch so neighbours keep small
  gaps even at full swell. Canvas sized from the Visual Viewport API
  with resize listeners on both `visualViewport` and `window`; the
  canvas is pinned in px inside `draw()` every frame.
- Noise: value noise whose lattice values come from an integer hash of
  the lattice point and the epoch seed (mulberry32-family mixing), so a
  seed fully determines the field with no stored lattice. Two octaves
  (broad swell + finer ripple), smoothstep interpolation, radius shaped
  by `pow(n, 1.25)` with a small floor so the shallowest probes still
  leave a dot. Ring stroke width scales with radius, clamped.
- Motion: watch-only 30 s loop. The swells travel because the noise
  sampling offset moves; the divide sways ±3.5% of field width around
  55% with the same 30 s period.
- Loop closure: the sampling offset travels a closed curve in noise
  space with period T = 30 s (a circle, with a diagonal bias term so
  the travel reads diagonal), and loop time is taken modulo T, so the
  field at t=T is the field at t=0 by construction. Verified
  byte-for-byte: the frame rendered at forced t=30 is identical to
  frame one.
- Determinism: frame one is the synchronous draw at loop t=0 from the
  epoch seed; it is never derived from `Date.now()` or the live clock.
  Elapsed time comes only from `performance.now()` relative to the
  epoch anchor, reduced modulo T. The animation loop is guarded by a
  `typeof requestAnimationFrame` check, and all motion is a closed-form
  function of (seed, t). TAP reseeds: it advances the epoch, anchoring a
  fresh noise field at t=0. An inert `?seed=tNN` hook (QA only) pins a
  forced loop time for state checks.
- No microphone, no audio, no gradients, no text anywhere except
  `<title>`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280×900): strict 26×26 grid; solid dots left of
    the divide, hollow rings right; clear swells (large rings top
    right, solid swell along the bottom) and shallows (fine dots mid
    right); nothing clipped.
  - `qa-mobile.png` (390×844): 22×22 grid refit to the phone frame,
    centered square on paper, nothing clipped, binary rule intact.
  - `thumb.png` (720×720): same field at square size.
- Determinism: `thumb.png` rendered twice and `cmp` byte-compared —
  identical; the duplicate was deleted.
- Loop closure: a forced render at t=30 s byte-compares identical to
  frame one; a forced render at t=7 s (read back, then deleted) shows
  the swells travelled (a large solid mass lower left, ring swells
  shifted) and the divide swayed left, confirming the breathing motion
  and the exact seam.

## Deviations

- None from the prompt's substance. The prompt leaves the loop period
  at "~30 s" and the divide near 55% width swaying "a few percent";
  both are fixed at exactly 30 s and ±3.5% so the noise path and the
  divide share one period and the loop closes exactly, as the prompt's
  technical approach requires.
