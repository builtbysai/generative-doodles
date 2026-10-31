# No.857 — The Measurement Breaks In

Study #105 hsin-chien-huang, PP18 "Voronoi Mourner".

## Concept

The *Bodyless* mechanism translated out of photorealism: a calm, flat slate
field with a pale moon is progressively invaded by crystalline measurement.
A frost of voronoi-like facets spreads from a seed point in the lower-left,
each cell hardening into one of three flat facet tones with a bright neon
edge — mechanical order compressing the world into computable forms. One
cell, and only one, is crimson: the donor thread. The shatter never
completes. It decelerates and holds at the edge, the moon almost consumed,
forever.

## Construction

- **Cell field.** A 20 x 20 grid (400 cells) whose interior vertices are
  jittered by a seeded mulberry32 stream (base seed 857018, stream continues
  across reseeds so no two generations repeat a layout, seed point, or
  crimson position). Cells are quads over shared jittered vertices, stored in
  normalized coordinates and scaled at draw time, so resizing never
  regenerates the field.
- **Shatter model.** Each cell's start time is a closed-form function of its
  distance from the generation's seed point: `150 * dn^2.2 + noise * 12`,
  where `dn` is distance normalized by the field maximum. The 2.2 exponent
  makes the front decelerate — fast early, slow late — so frame one (spread
  clock anchored at 20 s) already shows ~15% coverage while the full spread
  takes roughly three minutes. Cells under the moon receive a resistance
  bonus (larger toward the moon's core), so the moon is eaten last. The top
  8% of cells by start time are marked never-shatter: the spread asymptotes
  to a 92% hold and stops there, leaving the moon's core and the far corner
  unconsumed. Progress per cell is `(spread + boost - start) / dur` clamped
  to [0,1], eased with a smootherstep for the fill mix from field tone to
  facet tone (or crimson for the donor cell). Edges stroke in neon teal once
  a cell passes 50% personal progress, alpha ramping with progress.
- **Moon.** A flat moon disc drawn beneath the cell layer; unshattered cells
  over the moon stay transparent, shattered ones fade in with progress alpha,
  so the disc is visibly eaten away rather than covered. Three faint maria
  are palette-internal slate mixes at low alpha.
- **Drag (the measurement point).** While the pointer is held and moved,
  cells within a radius of the pointer accumulate boost (spread-time credit)
  at a rate scaled by a quadratic falloff, pulling their shatter earlier;
  their edges also brighten while the pointer is near. Boost is event-driven
  recorded state folded into per-cell values; frame one has no events and is
  unaffected.
- **Tap / double-tap.** A tap freezes the tapped cell at its current
  progress (its effective spread time is pinned) and marks it with a small
  neon ring. A double-tap reseeds: a new generation is drawn from the
  continuing RNG stream (new jitter, new seed point, new crimson cell, new
  moon placement) and the spread clock restarts.
- **Audio.** Created lazily inside the first pointer gesture, fully
  typeof-guarded. A 90 ms lookahead scheduler reads the same start-time
  schedule and plays a short, quiet square-wave tick (45 ms envelope) for
  each cell crossing its shatter threshold. The piece is fully silent in the
  QA renderer, which has no AudioContext.
- **Determinism.** Frame one is a synchronous draw at the fixed anchor phase
  (spread t = 20 s). All drawn state is a function of the seeded generation,
  the recorded interaction state, and elapsed time since load — never
  `Date.now()` wall time. A `?seed=<seconds>` query hook overrides the
  anchor for QA renders only.
- **House rules.** Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas CSS size pinned in px inside `resize()`
  on every resize; phone detection via `window.screen` min dimension
  (< 700 px) with aspect fallback; canvas 2D only, no gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas; strict six-tone palette;
  no visible text besides the `<title>`.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All read back: slate field, pale
  moon upper right of center untouched, a crystalline facet patch grown
  from the lower-left with neon teal edges, exactly one crimson cell inside
  the patch, nothing clipped on mobile.
- First pass used a linear distance front; the frame-one patch read too
  small (~4%). Retimed to the decelerating `dn^2.2` front; frame one now
  sits at ~15-20% coverage with the total spread unchanged at ~3 minutes.
- Determinism: thumb.png rendered twice and byte-compared with `cmp` —
  identical. Duplicate deleted.
- Hold state verified with a throwaway render at `?seed=210`: ~92% of the
  field shattered, the moon reduced to a small unconsumed remnant, the far
  corner unshattered, the spread stopped. Throwaway deleted.
- Deviations: (1) tick audio follows the base start-time schedule; a cell
  hurried by drag boost may tick a fraction late relative to its hurried
  visual crossing — inaudible in practice and noted rather than simulated.
  (2) The moon-distance metric uses normalized coordinates, so on very
  non-square frames the resistance zone is slightly elliptical; the visual
  result is unchanged in character. (3) The prompt's voronoi cells are
  realized as a jittered quad grid (voronoi-like polygons) instead of a
  computed Voronoi diagram — same crystalline read, closed-form and cheap.
