# №453 Glitch Pastoral — process.md

## Concept
A sepia hand-drawn mountain valley with a giant rust-red sun, a lone woman
seen from behind standing on rocks at the lower-right third, and flowers in
the foreground. Every so often horizontal error bands tear across the
landscape and the colors fracture, then heal completely. Calm is the default
state. No permanent glitch overlay, no cyberpunk neon.

## Construction
- Square, centered: the square keeps its shape on phones and the page ground
  takes the sepia ground. Sun centered in the top third at about 30% of
  frame width; mountains as four horizontal strata with fixed seeded
  ridges; grass sway and flower bob throughout.
- Glitch storms are DATA-ONLY, no offscreen canvas: fixed schedule (first
  storm at t=22s, then intervals cycling 35, 35, 40, 30 seconds, each storm
  2s). During a storm, the scene is redrawn clipped to each band rect with
  a horizontal offset sweeping 0 to max and back (sine of storm progress),
  then thin cyan and magenta edge lines are stroked on the band boundaries.
  Band sets (3 to 5 bands) cycle through three fixed authored sets. Outside
  storms the frame is the calm frame exactly.
- Watch-only: no interaction handlers. First frame is drawn synchronously
  at a fixed phase (1.5s, calm, before the first storm); the rAF loop is
  anchored to that phase and guarded by a typeof check.
- Standing rules kept: Visual Viewport sizing with listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; no offscreen canvas, no document.createElement.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Thumb 720x720 rendered twice: md5 a2e1edc68a148a5c3d191c918915b2a2
  both runs, byte-identical (determinism gate PASS).
- Desktop 1280x900 inspected: sepia valley, rust sun with halo ring, four
  strata, figure on rocks lower-right, flowers bottom-left, grass strokes.
  Mobile 390x844 inspected: square keeps its shape centered, page ground
  sepia, all elements present.
- Storm behavior verified with temporary PHASE0 overrides (test files in
  /tmp only, not shipped): at t=23s (mid-storm) three bands show with cyan
  top edges, magenta bottom edges, and visibly shifted sun/mountain
  segments; at t=25s (after the storm) the frame is fully healed with no
  band or edge lines remaining.
- Deviation: the prompt's "tiny title credit" is omitted. The spec's standing
  rule limits designed in-piece lettering to the №451 station sign and the
  №452 poster title only, and the batch carries no in-piece UI or hint text;
  the gallery note carries the piece's description instead.
