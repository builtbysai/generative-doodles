# №37 · Fourteen Paths - process notes

## Concept
A Dyck path of semilength 4 climbs 4 steps and descends 4 without
ever dropping below its start level. There are exactly 14, the
Catalan number C4, generated here by recursion and asserted. The
hero path draws itself step by step as a staircase on a lattice
with a faint diagonal guide, holds, then gives way to the next.
A strip below shows all 14 as mini staircases, the active one in
indigo. Drag across the strip to choose the hero. Spec:
BATCH-36-40-SPEC.md.

## Construction
- Single self-contained page, canvas 2D, no libraries. Staircases
  are drawn as right-then-vertical segments, so the paths are true
  lattice paths, not skylines. Idle, the hero cycles all 14.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing; enumeration contents verified against
  the generation order (No.37 was iterated once: diagonal skylines
  replaced by true staircases). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `37/index.html`, `37/thumb.png` (720x720, rendered from the live script), `37/process.md`. Gallery entry added to pieces.json with the formula date.
