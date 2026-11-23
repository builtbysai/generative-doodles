# №450 The Big Disc — process.md

## Concept
One huge flat celestial disc hanging over a silhouetted city edge: rooftops,
a crane, cypress trees. Everything else goes quiet so the disc is the event.
The disc stays abstract and flat, never a realistic sun. No stars, no text,
no UI.

## Construction
- Square, centered: the square keeps its shape on phones and the page ground
  takes the current sky color. Disc diameter about 40% of frame width,
  centered in the upper third.
- Three palette modes in fixed order (lilac, sepia, cream), each holding 30s
  with a 5s cross-fade into the next; full cycle 90s. The disc breathes
  over the same 90s (slight rise/fall and radius swell). A thin cloud band
  crosses the disc once per minute.
- Watch-only: no interaction handlers at all. First frame is drawn
  synchronously at a fixed phase (1.5s, pure lilac mode); the rAF loop is
  anchored to that phase and guarded by a typeof check.
- Standing rules kept: Visual Viewport sizing with listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; no offscreen canvas, no document.createElement.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Thumb 720x720 rendered twice: md5 8268910c75588a44d65339466658de06
  both runs, byte-identical (determinism gate PASS).
- Desktop 1280x900 inspected: flat peach disc on lilac sky, skyline filling
  the bottom 30% of the square with crane and cypresses, generous negative
  sky. Mobile 390x844 inspected: square keeps its shape centered, page
  ground matches the lilac sky, disc and skyline intact.
- No fixes needed.
