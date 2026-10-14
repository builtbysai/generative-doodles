# №35 · Fifteen Chords - process notes

## Concept
Six points around a circle can be perfectly matched in exactly 15
ways. This piece enumerates all 15 by recursion at load (pair the
first free point with each later free point) and lays them in a
5x3 grid: six cream dots on a circle per panel, three straight
neon chords pairing them, crossings drawn plain. A wave visits the
panels in reading order; in the visited panel the chords fade,
their endpoints slide along the circle, and the chords redraw as
the next matching. After the last panel the grid resets. Ground
#101010, dots #f4f1ea, chords flat neon #d8ff3e with no glow.

## Construction
- Single self-contained page, canvas 2D, no libraries. Chord morphs
  run on presence values over all 15 possible pairs, with endpoint
  angles offset while a chord is between states, giving the slide.
- Motion and interaction per Hans's direction: perfect loop, never
  click-to-reload. Drag horizontally to scrub the wave; on release
  it holds 4 idle seconds, then resumes.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check (panels reflow to 3x5), square
  on desktop.

## Series note
- This completes the five Ruud de Rooij study prompts set by Bug on
  2026-10-14: No.31 Eleven Nets, No.32 Sixteen Trees, No.33 Ten
  Ways In, No.34 Twelve Cells, No.35 Fifteen Chords.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing, including a mid-assembly frame for
  No.34 and a mid-morph frame for No.33 and No.35. The enumeration
  contents were verified panel by panel against the recursion
  order. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `35/index.html`, `35/thumb.png` (720x720, rendered from the live script), `35/process.md`. Gallery entry added to pieces.json with the formula date.
