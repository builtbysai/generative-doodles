# №45 · Thirty Seconds - process notes

## Concept
Seven points fly Lissajous paths in 3D, projected flat (after
mathiaskrissmer; prompt 10). Each leaves a luminous trail that
fades over exactly 30 seconds, the length of the loop. All
frequencies are integer ratios of the loop, so every path closes
exactly and the trail fading out is the trail fading in: seamless.
Positions are analytic in time, so the trail buffer (900 samples
per point at 30 per second) is recomputed from the clock each
frame with no stored state, and a time scrub rebuilds it
deterministically. White trails on black; no markers, no HUD.

## Construction
- Single self-contained page, canvas 2D, no libraries. Trail alpha
  ramps by age in chunks; drawn trails only, never the points.
- Drag horizontally to scrub time; release holds 4 idle seconds,
  then resumes. Visual Viewport sizing; canvas pinned by style;
  full-bleed on phones via the screen-size check.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short. (No.42's caption is the
  generated binary string the prompt specifies.)
- Files: `45/index.html`, `45/thumb.png` (720x720, rendered from the live script), `45/process.md`. Gallery entry added to pieces.json with the formula date.
