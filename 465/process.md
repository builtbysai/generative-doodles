# №1501 "Walking the Cut" (claire-atherton CA6, PP748)

Gallery date: 2006 · 02 · 20 (formula date; not shown in the piece).

## Prompt, as built

Three screens side by side in a dark gallery: left screen shows a border fence
in a short loop, centre screen the same fence in a medium loop, right screen
the same fence in a long loop. The three loops run out of phase, so the fence
is never in the same state on all three screens at once — except for rare
moments when all three align.

## Palette (prompt-verbatim, no other color)

- Gallery charcoal #2a2a30 (ground, fence, frames' shadow field)
- Screens' sky grey #b8bcc0 (screen interiors, viewer-figure)
- Ground dust #b8bcc0 (same hex as the sky by the prompt's own values, so
  the screen interior reads as one flat field; the fence is grounded by its
  charcoal base line)
- Alignment flash gold #d9a441, brief
- Screen frames cream #e8e0d0

## Composition

Three equal vertical screens across the frame with thin gaps between them,
cream frames, charcoal gallery ground. A single small abstract viewer-figure
(sky-grey head disc + body rect) stands at the bottom centre, below the
screens, facing them. It never enters a screen: its row sits below the screen
bottoms and drags only move it horizontally.

## Motion

- Three loop players with incommensurate periods: 7 s (left), 11 s
  (centre), 17 s (right). Each screen's fence carries a travelling gate gap
  (a 3-post-wide opening framed by two slightly taller gate posts) whose
  centre crosses the screen once per loop. Phase offsets 0, 0.37, 0.71 of
  each loop put the three fences in visibly different states at frame one.
- Alignment: when all three loop phases fall within a circular distance of
  0.08 of each other, all three screens take a flat gold wash (alpha 0.30)
  for the beat while the window holds. First alignment at t ≈ 8.15 s.
- Drag-to-walk: a pointerdown on the viewer-figure followed by a horizontal
  drag moves the figure (closed-form sum of recorded drag deltas, clamped to
  0.08W–0.92W). Viewer position maps to a per-screen brightness weight
  (0.85 + 0.30 · exp(−(d/0.18)²), d = distance to the screen centre as a
  fraction of width): the approached screen brightens slightly via a
  flat-alpha cream overlay, the others dim via a flat-alpha charcoal
  overlay. Drag never pauses a loop, never syncs the loops, never moves
  the screens, never restarts anything.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen (min dimension < 700 px) with aspect
  fallback; checked at 390 wide — same composition, no clipping, figure
  small at the bottom as specced.
- Determinism: fixed-phase first frame (draw(0) at load, clock starts with
  the rAF loop); every animation value is a function of loop-local time;
  each screen closes exactly at its own period. No Math.random in visible
  state; post-height jitter comes from a seeded mulberry32 PRNG (seed
  1501000), fixed for the piece's life.
- rAF loop is a plain function declaration, typeof-guarded. Fully silent:
  no AudioContext at all. No offscreen canvas, gradients, shadowBlur,
  Path2D, createElement, WebGL, getUserMedia, or localStorage.
- node-canvas quirks: dots as filled rects or own-beginPath arcs with a
  moveTo first; fading alphas rounded to 4 decimals.
- No visible text except <title>. No click-to-reload / click-to-restart.
  Study guard: abstracted figure and landscape only, no likenesses, no
  real names, no readable text, no violence.

## Probes (forced-time harness, vm-isolated instance, real node-canvas)

- Phases at t = 0: 0.000 / 0.370 / 0.710 — out of phase; alignedAt(0) false.
- Per-screen loop closure: screen 0 at t = 7 vs t = 0 = 0 px; screen 1 at
  t = 11 vs t = 0 = 0 px; screen 2 at t = 17 vs t = 0 = 0 px (region diffs,
  >4/255 threshold).
- Alignment: first aligned time t ≈ 8.15 s; gold-classified pixels 0 at
  t = 0 → 180,285 at the alignment time.
- Drag: pointerdown on the figure (640, 660) + move to x = 213 moves the
  viewer to 213.0; brightness flips from (0.864, 1.150, 0.864) to
  (1.146, 0.860, 0.850) — the left screen brightens, the others dim.
  Phase values at t = 5 are byte-identical before and after the drag
  (0.7143 / 0.8245 / 0.0041), proving drag neither pauses nor syncs loops.
- Thumb byte-compare: two independent 720×720 renders byte-identical.

## Fix rounds (1)

1. Screen-clip fix: the first build failed the screen-0 closure probe
   (1,375 px at t = 7 vs t = 0). Cause: when a neighbouring screen's gate
   travelled near its edge, its taller gate post spilled across the gap
   onto the adjacent screen. Fix: drawFence now clips to its own screen
   interior rect (save/clip/restore). All probes re-run after the fix;
   frame one is unchanged (no spill at t = 0). All renders re-done.

## Files

- index.html (md5 931d72fb280dd705722acec3f1557f9d)
- thumb.png (720×720, md5 cd1a7e10dcf90ad6823a81bd8ed2e602)
- qa-desktop.png (1280×720), qa-mobile.png (390×844) — inspected, no
  clipping, fences in three different states, figure small at bottom centre.

## Deviations

None from the prompt. The only adaptations are the documented house-rule
ones (canvas-2D flat rendering, closed-form drag, loop-local time, and the
screen clip, which enforces the prompt's own "three screens" separation).
