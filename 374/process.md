# №1096 — Immaterial Terrain

Onformative study block OF1 (PP257): Immaterials (2011) as a piece. A flowing terrain drawn entirely as dense iso-contour lines — icy blue-white linework on near-black — with faint scan-grids trailing off the form's edges. The terrain breathes as its noise field evolves, and every 15 s a bright scan band sweeps across, brightening and re-drawing the contours it crosses. Watch-only; the piece is one luminous event on black.

## How it works

- **Heightfield.** Seeded value noise (integer-lattice hash, smootherstep interpolation), domain-warped by a second fBm so the ridges flow instead of blotting: four octaves for the main field plus a ridged component for sharper crests. The raw field is shaped (plains lifted, peaks sharpened) and multiplied by an envelope that weights the mass into the left two-thirds and lets the right side subside into the grid.
- **Closed-form evolution.** Every drift term is a sinusoid with an integer cycle count over the 45 s loop (fundamental for the main offset, 2× for the warp drift and the breathing amplitude), so the field at time t is a pure function of t — no state, no integration — and the loop seam closes exactly.
- **Contours.** Marching-squares-lite over a 96×96 grid (76×76 on phones): per cell, only the iso levels inside the corner range are tested; edge crossings are collected in cyclic order and paired into segments, with the cell-centre value resolving the four-crossing saddle. Sixteen levels are bucketed and stroked once per level — colour lerps from the edge blue #9FD8FF at low elevations to the core #DFF2FF at the peaks, alpha rising with elevation. Lines only: no filled meshes, no surface fills, anywhere.
- **Projection.** Oblique: the ground plane is compressed vertically and each grid point is lifted by its height, with lift foreshortened toward the back rows, so the mass reads as a terrain receding to the right rather than a flat map.
- **Scan band.** A closed-form sweep: in each 15 s third of the loop the band crosses in 8 s on a smootherstep ease, then rests off-form. Cells near the band are promoted to a "hot" bucket (brighter, whiter, higher alpha) and additionally emit the half-step iso levels, so line density visibly doubles under the band — it re-draws the terrain as it passes and never freezes it. Two white hairlines mark the band's plane.
- **Trailing grids.** The flat ground-plane wire grid (#2A4A66 at 0.25) is drawn past the terrain on every side — beyond the right edge, behind the back rows, out the front — the scan-grid residue of the observed artifact.
- **Determinism.** Frame one is drawn synchronously at the fixed phase t = 18.5 s: terrain mid-evolution, second sweep standing at u ≈ 0.39 with its brightened, densified contours. The rAF loop is typeof-guarded and anchored at that phase plus elapsed time.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, CSS size pinned in draw(), phone detection via `window.screen` (aspect fallback), square stage centred and full-bleed ground. No audio, no interaction, no gradients, no offscreen canvas, no `ctx.filter`, no shadowBlur, no `createElement`. No visible text except the `<title>`.

## QA

- `qa-desktop.png` (1280×800): near-black ground; a luminous blue-white contour terrain massed in the left two-thirds, ridges bunching at the peaks and the right side flattening into the faint trailing grid; the scan band's white hairlines stand mid-form with visibly brighter, denser contours under them.
- `qa-mobile.png` (390×844): square stage centred, the full terrain and band legible, nothing clipped.
- `thumb.png` (720×720) rendered twice and compared with `cmp`: **byte-identical**; the duplicate was deleted.
- One frame renders in ~0.5 s end-to-end under the node-canvas QA renderer (including interpreter start-up), well inside budget.
