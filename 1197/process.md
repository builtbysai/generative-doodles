# №1197 — Dirty New Media

joncates study block JC6, grounded in *Dirty New Media* (2005): the interrogation of "the kind of cleanliness that I associate with more commercial or corporate styles of digital art and design." Cleanliness is the target; dirt is the default state of the world.

## The piece

A perfect corporate-minimal composition: white field `#FAFAFA`, a precise `#E5E5EA` grid, a 6×6 field of immaculate rounded squares in generic grays (`#8E8E93`, `#48484A`, `#C7C7CC`). Then the rot starts in one corner and spreads like mold across the grid over a 120-second cycle, until the clean design is barely legible. At the seam, a one-frame white flash hard-cuts back to perfect clean — and a differently-seeded rot begins.

**The flood (core mechanism).** The spread is a closed-form schedule, never accumulated state. Per cycle, a seed corner cell is chosen by hash. Each cell's corruption start time is computed by Dijkstra over the 8-neighbour grid graph, with per-edge delays `(0.45 + 0.9·hash(edge, cycle)) × 18s` (diagonals ×1.35), the seed starting at 8s. Because the front advances cell-to-cell with hashed delays, it reads as organic spread with a visible front, in a new pattern every cycle. Rendering each cell is a pure function of `(cell, cycleTime − start(cell))`:

- **Stage 1 (0–30% of the 14s progression):** clean fill, corners fraying — hash-placed scanline nicks eat in from the edges.
- **Stage 2 (30–65%):** the fill dissolves into hash-static — 10×10 subtiles switch over in hash order to dark gray with magenta `#FF2BD1` and green `#33FF66` flecks (the seed cell's stage 2 is the "first square glitches to magenta static" beat).
- **Stage 3 (65–100%):** rot black `#0B0B0D` takes the cell in a second hash-order pass, leaving static remnants and a cyan `#00E5FF` tear line.

**The ghost.** At the 60% mark (72s) a chromatic ghost of the *clean* composition slides in over one second — the full grid redrawn offset (+20px, +6px) in cyan at 18% alpha and (−14px, −4px) in magenta at 14% — and stays, a misregistered print haunting the rot.

**The squeegee.** Dragging is the inversion of the usual glitch interaction: the finger is a *clean* squeegee. Drag samples (capped at 60) reset the visible corruption of any cell whose centre falls within 52px — the cell renders clean again, with a brief white wipe sheen — but the cleanliness only lasts 5 seconds; over the last second the rot creeps back. Dirt is the default. Nothing stays clean, and there is no clean button.

## Frame one

Fixed phase T0 = 84s into cycle 0. The cycle-0 seed is cell 5 (top-right corner). At T0: 16 cells fully rotted, 9 more mid-corruption along a coherent diagonal front, 11 still pristine (bottom row and left column) — the design half-eaten, worst at the seed corner, ghost already in place. First frame is drawn synchronously at this constant phase; the rAF loop is anchored as T0 + elapsed-since-load, and the thumb byte-compare passes.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; CSS size pinned in draw(); phone detection via `window.screen` physical size (min dimension < 700px) with aspect fallback. Seeded integer hashes only — no `Math.random`. No gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no ImageData/offscreen canvas, no audio, no microphone. The static is computed per tile per frame from hashes, so it shimmers at 7 steps/second without ever storing a noise buffer. Silent by design; no visible text beyond `<title>`.
