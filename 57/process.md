# №58 · Pentagon Swarm - process notes

## Concept
Ninety particles streaming around a pentagon after automination's
pentagon and particle work, snapping inside out into the dual star.

## Construction
- Single self-contained page, canvas 2D, no libraries. The base
  path is the pentagon perimeter; the rewire path is the pentagram
  through the same vertices. Particle i sits at path position
  (t flow + i/90), with six short ghost steps behind it.
- Seamless 10s loop: 4s pentagon, 1s rewire snap (a flat magenta
  ring flashes), 4s star, 1s snap back; the whole figure rotates
  one full turn per loop. Snap windows lerp the two paths with
  smoothstep easing.
- Drag adds a swirl offset from the drag angle around the center;
  it damps out on release and the path never pauses.
- Full-bleed on phones via the screen-size check where the
  composition is a field, otherwise centered on the matching
  ground color; Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `58/index.html`, `58/thumb.png` (720x720, rendered from the live script), `58/process.md`. Gallery entry added to pieces.json with the formula date.
