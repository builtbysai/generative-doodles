# №43 · Wall of Light - process notes

## Concept
Three long luminous curves only, sweeping wall to wall like a
projector beam on a dark gallery wall (after mathiaskrissmer;
prompt 8). Each curve is a Catmull-Rom chain through six control
points whose heights orbit slowly on a 35 second loop with
integer cycle counts. Sampled at 200 points and stroked in three
additive passes; curves always enter and exit beyond the canvas
edges, so no endpoint is visible. White on #050505, nothing else.

## Construction
- Single self-contained page, canvas 2D, no libraries. Drag adds
  a parallax offset, deeper curves moving more; the offset eases
  back on release.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop with the
  page ground matched to the piece.
- QA iteration: the first glow pass was too wide and read as
  ribbons; passes narrowed to light beams before shipping.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short. (No.42's caption is the
  generated binary string the prompt specifies.)
- Files: `43/index.html`, `43/thumb.png` (720x720, rendered from the live script), `43/process.md`. Gallery entry added to pieces.json with the formula date.
