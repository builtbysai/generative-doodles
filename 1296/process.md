# №1296 "The Tailor" (karen-kraven KK1, PP463)

## Prompt
A dark field whose center is EMPTY; at the periphery drift irregular offcut
polygons, pattern-piece negatives with armhole-like concave curves, notched
necklines, long selvedge edges, their translucent contours tracing the shape
of a body that is not there. Grounded in Kraven's The Tailor, 2024: "the
contours and transparency index an absent body, a body that refuses its
confines, and a body remembered."

## Palette
Charcoal-black ground #17161A; offcut linen #D8CFC0 (warm, low alpha);
contour line #B8935A (aged brass thread); shadow seam #6B6257; deep red
interrupt #7A2E2B (a single offcut in tailor's chalk red).

## Composition
Portrait panel: full-bleed on phones, centered portrait shape (0.68 aspect)
on desktop with the page ground in the piece's own charcoal. The empty
center occupies the middle third in roughly human-torso proportions. Ten
offcuts orbit at the edges and never enter the center; offcuts 0 and 1 share
a neighbourhood so they overlap like pinned pattern layers, their
translucent fills darkening where they cross. One offcut is the single red
interrupt. No body is rendered anywhere; nothing looks like clothing, only
its leftovers.

## Mechanics (all closed-form over piece time and recorded events)
- Elliptical orbits: each offcut drifts on its own ellipse (period 42-72 s,
  seeded phase) and rotates a few degrees per loop (0.06 rad sine).
- Refusal: over each 60 s cycle, one offcut (index = loop number mod 10)
  slides 10% of the way toward the center during phase 0.25-0.45, holds,
  then retreats during 0.55-0.75, via smoothstep bumps.
- Reseed: offcut shapes, orbit phases, and periods regenerate each loop
  from a seeded mulberry32 sequence (seed 1296 + loop x 7919), never
  Math.random, so repeated loads produce the same sequence.
- Drag: pointer drags record impulses; each offcut is displaced by
  distance-falloff-weighted impulses decaying exp(-age/1.2), so offcuts
  yield under the pointer and settle back. Watch-only otherwise.
- Center guard: any offcut position that would enter the middle third is
  pushed back out along the nearer axis, so the absence stays empty even
  under drag and refusal.

## House adaptations
- Frame one draws synchronously at exactly t = 0 via a boot flag
  (`draw(0)`); the rAF clock starts only with the real scheduler, and the
  loop is a plain function declaration armed from the real scheduler (the
  №1278 lesson: a named function expression followed by
  requestAnimationFrame would throw in a real browser and the QA renderer
  defines no rAF, so it would pass silently).
- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size (min dimension < 700 px) with
  aspect fallback.
- node-canvas safe: no rAF/AudioContext/createElement/WebGL/offscreen
  canvas/filter/shadowBlur/gradients; dots drawn as arcs with moveTo
  before batched arcs; no visible text except <title>.

## QA
- Desktop 1280x900, mobile 390x844, thumb 720x720 all inspected.
- Fix round: first mobile render clipped two offcuts at the left/right
  frame edges. Fixed by clamping offcut anchors inside the panel by the
  offcut's max radius and halving orbit radii; mobile now holds all ten
  offcuts fully inside with the center still empty.
- Thumb rendered three times at 720x720, cmp byte-identical, and matching
  the shipped thumb.png. index.html md5: 3acbffc7c9299e2ce385e0a79f18925c.
