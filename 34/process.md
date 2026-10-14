# №34 · Twelve Cells - process notes

## Concept
There are exactly 12 free pentominoes. This piece hardcodes the 12
canonical cell sets (F I L N P T U V W X Y Z, 5 cells each) and one
exact 6x10 rectangle tiling, found by exact-cover search and
verified complete: 60 cells, no overlaps, no gaps. The loop runs
two phases. Phase A: the twelve sit in a grid, breathing gently,
the P pentomino in flat rust, everything else ink. Phase B: the
pieces slide into the rectangle one at a time with a small settle
spin, hold as a full grid of seams, then scatter back. Ground
#f4f1ea, ink #1a1a1a, rust #b5542d for the P in grid view only.

## Construction
- Single self-contained page, canvas 2D, no libraries. Each piece's
  cells interpolate from their grid pose to their tiling pose on a
  staggered schedule; the tiling is data, not luck, so the assembly
  is exact on every loop.
- Motion and interaction per Hans's direction: perfect 21 second
  loop, never click-to-reload. Drag horizontally to scrub the loop;
  on release it holds 4 idle seconds, then resumes.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing, including a mid-assembly frame for
  No.34 and a mid-morph frame for No.33 and No.35. The enumeration
  contents were verified panel by panel against the recursion
  order. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `34/index.html`, `34/thumb.png` (720x720, rendered from the live script), `34/process.md`. Gallery entry added to pieces.json with the formula date.
