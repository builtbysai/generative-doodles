# №1112 — Live Miniature

Markus Kison study block MK1: *Live Miniature*. A miniature city block sits
on a dark table, but its faces are not model plastic — each one carries a
live procedural "webcam feed": window grids with tiny people moving inside
lit interiors and blind shadows sweeping across the glass. The feeds are
deliberately mis-registered by a few pixels at the corners, so the
projection seams show. The prompt's Three.js spec is adapted to canvas 2D
pseudo-3D per house precedent.

## Construction

- **City**: 18 seeded buildings on a jittered 5×4 plot grid (two plots
  dropped so the block breathes), heights 0.28–1.10 with a few towers, warm
  gray model-paint bases, a third of them carrying a plain roof block. All
  parameters come from one mulberry32 stream; no `Math.random`, no wall
  clock.
- **Projection**: orthographic pseudo-3D. Each building is a box; the two
  vertical faces whose normals face the camera are drawn (painter-sorted
  far to near by block depth) plus the roof. Azimuth is closed-form:
  a slow idle oscillation (±0.45 rad over 90 s) plus a drag offset that
  eases back exponentially (τ ≈ 2.8 s) on release.
- **Feeds**: every face owns a seeded window grid (2–6 cols × 2–9 rows).
  Each cell knows whether it is occupied, whether it lights at night, its
  blind phase/speed and its people — one or two dots drifting on slow
  sine paths inside the cell. Cells are drawn by bilinear interpolation
  inside the face quad, the whole feed layer translated by the face's
  seeded mis-registration offset (±3 px at 720 scale) while the base
  polygon stays true — that gap is the seam. On top of the cells, per-cell
  blinds creep down and back on 70–160 s clocks, and a soft shadow band
  sweeps the full face every ~77 s.
- **Day/night**: a 40 s cycle keyed day → dusk → night → dawn. A flat
  alpha wash (gold #FFC46E, dusk blue #5678C8, night #1C264E) unifies each
  face as it is drawn; the night factor simultaneously darkens the model
  paint, flips lit cells to warm #FFD9A0 (with a faint mains flicker),
  drops unlit cells to dark glass, and wakes the street lamps' glow.
  Verified at both ends of the cycle in QA renders.
- **Determinism**: frame one is a fixed phase (t = 12 s, full day, orbit
  showing two faces of the block); the rAF loop is anchored at that phase
  plus elapsed time. The thumb renders byte-identical on repeat runs.

## Interaction

- **Drag** horizontally to orbit the block; release and the view eases
  back into the slow idle orbit. Watch-only by default — the miniature
  runs its day and its feeds on its own.
- **Double-tap** reseeds the layout (new seed, same mechanism). Never
  click-to-reload; a single tap does nothing.
- **Sound**: a faint city hum (58 Hz + 116.5 Hz sines and low-passed
  brown noise under a slow master fade) starts lazily inside the first
  pointer gesture, fully typeof-guarded, never autoplays; the piece is
  complete with the sound off.

## House rules honoured

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; CSS size pinned in `fit()` and re-pinned in
`draw()`; phone detection via `window.screen` min dimension < 700 with
the `h > w*1.15` aspect fallback; rAF guarded by a typeof check (the QA
renderer draws the synchronous first frame only); feed textures drawn
directly in 2D — no offscreen canvas; lighting is flat alpha washes — no
canvas gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
microphone. The only text is the `<title>`.
