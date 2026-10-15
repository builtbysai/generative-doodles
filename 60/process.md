# №60 · One Stroke - process notes

## Concept
A single unbroken line drawing a Lissajous bouquet after
automination's single line variant: one pen, never lifted.

## Construction
- Single self-contained page, canvas 2D, no libraries. The figure
  x = A sin(a t + pi/2), y = B sin(b t) is precomputed as a 3,000
  point polyline per figure; draw state is how many points show.
  The pen tip is one flat vermilion dot, the only marker.
- 7s seamless loop per figure: draw 5s, hold 1s, retract 1s along
  its own path in reverse. The scheduled ratio sequence cycles
  (3,2), (5,4), (4,3), (5,3), (2,1), (3,1).
- Drag quantizes a and b to integers between 1 and 6 from the
  drag position and draws that figure; release resumes the
  scheduled sequence after 4s.
- Full-bleed on phones via the screen-size check where the
  composition is a field, otherwise centered on the matching
  ground color; Visual Viewport sizing; canvas pinned by style.

## QA log
- The thumbnail frame was moved to the near-complete figure so
  the bouquet reads in the gallery.
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `60/index.html`, `60/thumb.png` (720x720, rendered from the live script), `60/process.md`. Gallery entry added to pieces.json with the formula date.
