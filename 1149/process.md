# №1149 — Axes of Affordance

Rosa Menkman study block RM6, after *The BLOB of Im/Possible Images* (2021): as the
Axes of Affordance (X, Y, Z and α) cut the BLOB, they define what is possible to
resolve, and what images are compromised — will never be rendered.

## The piece

A dark cube volume holds 252 tiny generative image-cells (6×6×7 seeded grid with
jitter), each a flat neon mini-picture: an arc fan, a dot grid, a bar stack, a ring,
or a cross, in one of eight neon colors. Four axes cross the field — red X
(#FF1E3C), green Y (#00FF85), blue Z (#1E9CFF), and a shorter yellow α axis
(#FFD21E). A translucent cutting plane (white fill at 0.06 alpha, its four edges
stroked in the four axis colors) divides the volume on a slow oscillation.

Cells on the possible side of the plane render crisp and full-color, with a faint
neon plate outline and a slow brightness pulse. Cells on the impossible side
survive only as residue: the same glyph, mirrored, drawn in flat #3A3A3A and
checkerboard-erased (only two diagonal quadrants of the tile are kept), with one
or two small fragments of the tile's inverted color left behind. The residue is
always recognisably the mirrored ghost of a possible tile — never empty space.

## Mechanism

- Pseudo-3D on canvas 2D (no WebGL, no libraries): object-space points rotated by
  yaw/pitch matrices, weak perspective projection (F = 5), depth-sorted
  back-to-front each frame.
- The plane test happens in object space: signed distance of each cell to the
  plane with fixed diagonal normal (1, 0.55, 0.8); the plane offset breathes on a
  slow sine, so cells cross over and flip between resolved and residue as it moves.
- Cell glyphs, colors and fragment layouts come from a seeded mulberry32 stream;
  positions from a separate fixed seed, so a reseed changes the pictures but not
  the volume.
- Interaction: drag horizontally to rotate the view, drag vertically to move the
  cutting plane (and pitch slightly); drag targets ease toward the recorded values.
  Double-tap reseeds the cell tiles. Left untouched, the volume keeps its slow
  auto-rotation (0.055 rad/s yaw plus a gentle pitch sway). Never click-to-reload.
- Silent by design.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw().
- Phone detection via window.screen physical size (min dimension < 700 px), aspect
  fallback (h > w × 1.15); phones get a slightly larger field and cells.
- Determinism: the first frame is drawn synchronously at the fixed phase T0 = 7 s;
  the rAF loop (typeof-guarded) continues from that same anchored phase, so the
  QA thumb re-renders byte-identical.
- No gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no
  createElement, no audio or microphone APIs. No visible text except the title.
