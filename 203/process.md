# No.385 Toile, But Make It Yoga

## Concept

After Maryna Lagereva's classic-pattern subversion:
classic Toile de Jouy vignette tiling on warm paper,
but the pastoral scenes inside the cartouches are
yoga poses, and the restrained toile palette goes
LOUD. Eight poses (warrior II, tree, downward dog,
dancer's, lotus, cobra, child's, crescent moon) sit
in faint oval cartouches in a half-drop field, each
breathing slowly like a held pose while its ink line
pulses, a wallpaper caught in the act of being inked.
Watch only; the calm is the piece.

## Construction

- One canvas, design space 1280x900, cover-fit
  full-bleed field. Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas
  pinned every frame via style width/height in px;
  phone detection via window.screen min dimension
  < 700px with aspect fallback.
- Palette is exactly six flat colours: ground
  #F7F1E3, ink #3A2E2A, and four loud line colours,
  two poses each (asserted at load): warrior II and
  tree in coral #E4572E; downward dog and dancer's
  in teal #2E8B8B; lotus and cobra in mustard #E8A93D;
  child's and crescent moon in plum #7A4E8C. Palette
  audited in the file: no other hexes, no gradients,
  no shadowBlur, no em dashes.
- The prompt's sprite pre-render takes the data-only
  treatment required by house rule: each pose is
  bezier path data (capsule-limbed strokes, round
  head, curved spine) drawn directly on the one
  canvas every frame. Figures are authored in a
  local box (floor at y=+42, crown at y=-46) with
  2.5px round-cap strokes, then scaled x2 so each
  vignette stands about 180px tall, roughly 1/5 of
  the canvas height. A fixed 1.5px hand wobble (0.75
  local units) is baked into the point data from a
  seeded stream per pose, so the line is hand-drawn
  but identical on every frame and every load. Head
  circles are filled with the ground colour before
  being stroked, so arm lines passing behind a head
  (tree's meeting palms, crescent's overhead arc)
  occlude cleanly instead of scribbling through it.
- Every vignette is drawn in three passes: a faint
  oval guide stroke (ink at 0.2 alpha) framing the
  cartouche; a thin ink underdrawing of the figure
  (ink at 0.35 alpha, offset 1 design px, 1.5 local
  px line) beneath; and the loud colour line on top
  (2.5 local px).
- Tiling: half-drop on a 256x180 cell grid, odd
  columns dropped half a cell; exactly 49 instances
  asserted, bleeding one cell past every design edge
  so the cover-fit crop never opens a gap. Pose per
  cell comes from one seeded stream (mulberry32),
  and each instance rotates within +-12 degrees,
  non-directional, the way toile scenes sit in their
  cartouches.
- Motion: one seamless 40s master loop. Each
  vignette breathes, scale 0.97-1.03, on a staggered
  cycle drawn from whole divisors of the loop (40,
  20, 10, 8 or 5s), and its colour line pulses
  opacity 0.75-1.0 on a second whole-divisor cycle,
  so frame 40s is pixel-identical to frame 0. The
  underdrawing and oval hold constant alpha.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 17.3s (field complete,
  breaths mid-cycle), and the rAF loop (typeof-guarded,
  fixed 1/60 ticks) is anchored at that constant plus
  elapsed time. No wall-clock phase anywhere.
- Interaction: none. Watch-only per the prompt and
  Hans's RETHINK rule; no pointer handlers, no text,
  no UI, no click-to-reload.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js
  at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png); all three inspected.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Desktop: loud half-drop field edge to edge; warrior
  II, lotus and downward dog read instantly, tree,
  dancer's, cobra, child's and crescent read as their
  poses at a beat's glance, each inside its faint
  oval with the ink underdrawing ghosting beneath the
  colour line. Thumb: the field reads at gallery
  size, vignettes and loud colours clear. Mobile:
  cover-fit crop, vignettes large, ground continuous
  to every edge.
- Fix during QA: arm lines crossing behind the head
  circles (crescent's overhead arc, tree's meeting
  palms) scribbled through the faces on the first
  render; heads are now ground-filled before stroking
  so the lines occlude cleanly, and all renders were
  redone and re-verified byte-identical afterwards.
- Asserts verified in the render runs: exactly 8
  poses, exactly two poses per loud colour, exactly
  49 field instances (the script throws otherwise,
  and all renders completed).
