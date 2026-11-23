# №55 · Sonic Lumina - process notes

## Concept
A full field of small quarter-circle flags on dark ground after
Angela Johal's op-effect work. Each flag is two flat colors
meeting at a diagonal hard edge. A diagonal band travels across
the field and flips the flags it covers, like music passing
over the canvas.

## Construction
- Single self-contained page, canvas 2D, no libraries. A 14 by
  14 grid, each flag seeded with a color pair and one of four
  diagonal orientations. No gradients, no outlines, two colors
  per flag.
- The band crosses in about 22 seconds and wraps toroidally.
  Touch makes the touch point a wave source: a radial wave
  emanates from the finger and flips flags it crosses; release
  returns to the diagonal auto-wave.
- Full-bleed on both layouts on the matching dark ground;
  Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `55/index.html`, `55/thumb.png` (720x720, rendered from the live script), `55/process.md`. Gallery entry added to pieces.json with the formula date.
