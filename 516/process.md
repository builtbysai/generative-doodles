# Maze No. 129 — process notes

## What it is
Study #214 yi-wen-lin, prompt YL7. After his fxhash "Maze" (the companion
to Hex, 128 editions) and the "Seal" study: a cream field with a maze
carved in thick ink walls. The carver works in real time, depth-first,
the wall growing like a root; when the maze completes, a single solution
path traces through in a contrasting tone, then the field rests.

## Design decisions
- Grid: fixed 21 x 21, 441 cells, asserted in code (GRID = 21,
  N_CELLS = GRID * GRID). Maze generation is an iterative recursive
  backtracker seeded with mulberry32(SEED + edition * 1013), so every
  edition is a different maze but fully deterministic.
- Carve: one cell every 15 ms (CELL_MS = 15), 441 cells, so the full
  carve takes 6.615 s. A wall segment is drawn once either neighbouring
  cell has been visited, so the wall structure grows like a root from the
  entrance; the outer border is drawn from the start except the entrance
  and exit gaps. A small dot marks the carver's head at the current cell
  while carving.
- Entrance bottom-left (bottom wall of cell row 20, col 0 removed), exit
  top-right (top wall of cell row 0, col 20 removed). Both gaps are
  visible in the renders.
- Solution: A* over open passages, Manhattan heuristic, entrance to
  exit. Drawn as a single continuous stroke through cell centres over
  2.5 s after the carve completes, then the field rests. Verified in a
  completed-state render: the path runs unbroken from entrance to exit.
- Palettes: twelve fixed editions, one palette per edition, never mixed.
  Paper is constant cream #F4F0E6. Edition 1 is the spec palette: rust
  walls #B4502A, dark teal solution #1E5A52. Editions 2-12 cycle teal,
  ochre, charcoal and muted relatives (brick, sage, mustard, umber,
  dusty rose, slate, olive, plum), each with a dark complement solution
  colour. Edition persists in localStorage ('doodle-1630'); tap advances
  to the next edition and carves a fresh maze; ?edition=K (or ?seed=K)
  previews an edition without touching storage.
- Composition: square, centred, maze grid fills the frame with a narrow
  paper margin (4.5% of the square). Page ground is the piece's own
  paper cream; title, date, edition label and hint are dark ink on
  solid paper plates over the maze, so they read at every size.
- Title "Maze No. 129", date "2006 · 06 · 29", hint "Tap to carve a new
  edition." No em dashes in visible copy.

## Deviations from the prompt
- None material. The prompt says "cycle twelve" for editions; the piece
  cycles all twelve palettes, each with its own seeded maze. The prompt
  names four wall colours (rust, teal, ochre, charcoal); the remaining
  eight editions are muted relatives in the same family, as the prompt
  allows ("others drawn from the same family").

## House rules applied
- Boilerplate adapted from №1625 (Hex Study): Visual Viewport sizing
  with resize on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback (h > w * 1.15);
  square centred composition, page ground the piece's own background;
  one synchronous frame at load; requestAnimationFrame guarded with a
  typeof check so node-canvas QA works.
- Deterministic fixed-phase first frame: frame one is at 220 cells
  carved (half the maze), so the thumb shows a partly carved maze with
  visible wall structure, never a blank cream field. No Math.random
  anywhere in layout; all randomness is the seeded PRNG.
- Flicker: none by construction; the only motion is the slow carve
  (15 ms per cell) and the solution trace, well below 14 Hz.
  Reduced-motion: draws the completed maze with the full solution
  immediately; tap jumps straight to the completed state.
- Watch-first; tap carves a new edition. Never a playable maze, never a
  timer, never a win state, never click-to-reload or click-to-restart.

## Asserted counts
- Grid 21 x 21 = 441 cells.
- Twelve palettes, twelve editions.
- Carve 15 ms per cell; solution trace 2.5 s.

## QA
- Rendered from the actual script with node render-piece.js at
  1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three renders
  inspected visually. Walls read as thick ink paths; entrance gap
  bottom-left and exit gap top-right visible; frame one is half carved
  with the carver dot visible; title, date, edition label and hint all
  legible on both sizes.
- Completed-state render (PHASE forced to COMPLETE_T + SOL_S in a /tmp
  copy only) inspected: full maze, single continuous dark teal solution
  from entrance to exit.
- Edition 2 render (?seed=1) inspected: teal walls, a different seeded
  maze, label "EDITION 02 / 12".
- Thumb byte-identical across two consecutive renders:
  md5 9e59a16514e2ac6bf4d56803d273f9b2, both runs.
