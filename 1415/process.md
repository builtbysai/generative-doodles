# №1415 "Ghost(ed) Notes" (christine-sun-kim CS8, PP638)

## Prompt essence
A musical staff with only four lines instead of five, drawn across a pale
field — and the lines refuse their notes: they bend, dip, and swerve to
avoid the note-heads, which hover above and below the staff but never on
it, like guests kept outside a room.

## Composition
- Field paper #e8e2d4, otherwise empty except 26 seeded faint charcoal
  smudges, so the refusal reads.
- Exactly four staff lines (staff ink #1a1a18) running horizontally across
  the middle third, from 8% to 92% of the width, slightly contorted.
- 16 note-heads (note black #26241f, tilted filled ellipses with a faint
  ghost halo) clustered above and below the staff: two denser zones
  (around 30% and 68% of the staff span) where the swerves are hardest,
  plus spread notes. Note bands sit at least 52 px from the nearest staff
  line at rest, so no note-head ever touches a line.
- Avoidance red #b01e24 used sparingly: any line segment whose
  displacement exceeds 22 px is drawn in red instead of ink.

## Motion
- Seamless loop, no cut, no wipe. Note-heads drift slowly along the
  staff's length (4–11 px/s, seeded directions), wrapping across the
  field; each bobs gently on its own seeded sine.
- Staff lines steer away from notes in real time: each line is a polyline
  sampled 160 ways, and every sample is displaced vertically away from
  every nearby note (Gaussian falloff in x, linear falloff in vertical
  gap, clamped to ±44 px), then relaxes back as notes drift on.
- Drag a note-head toward a line and the line swerves harder (held-note
  repulsion strength 46 px vs 27 px ambient); hold a note against a line
  and the line retreats and thins (1.1 px vs 2.4 px) near the hold.
  The notes never land, the staff never accepts them.
- Drag release: the note resumes drifting from its release point at its
  seeded velocity (closed-form over the recorded release event, so
  history never rewrites). A released note held against a line keeps the
  line bent away from it — the refusal holds.

## Study-wide rules honored
- Touch/drag, never click-to-reload. No win state, no "fix the staff"
  goal. Pseudo-gestures only in the study sense: no readable text
  anywhere except `<title>` (no fillText/strokeText at all in this
  piece). Nothing asks the viewer to "experience deafness" by muting or
  muffling; there is no audio of any kind. The piece is about sound
  politics and access — a notation system that refuses its own notes —
  not imitation.

## Adaptations (house rules)
- Staff lines as polylines with avoidance steering (repulsion from
  nearby note-heads, spring return to baseline via the closed-form
  displacement field); notes as drifting particles with slow horizontal
  velocity; drag as note-head manipulation with live avoidance response.
- Charcoal rendering: soft-alpha main lines plus a faint 1.5 px-offset
  ghost copy; smudges as flat-alpha ellipses; no gradients, no
  shadowBlur, no offscreen canvas, no Path2D, no createElement, no
  AudioContext, no getUserMedia.
- Determinism: frame one = draw(0) via a boot flag; the rAF clock
  anchors on the first rAF call (plain function declaration behind a
  typeof guard). All randomness from a seeded mulberry32 PRNG (seed
  1415000), never Math.random (the one grep hit is a comment saying so).
- Node-canvas quirks: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs/ellipses,
  with a moveTo before every batched arc (segments each get their own
  beginPath).
- Viewport from the Visual Viewport API with window fallbacks and
  resize listeners on both; canvas pinned in draw() with
  style.width/height in px. Phone detection via window.screen physical
  size (min dimension < 700 px) with aspect h > w*1.15 as fallback;
  centered composition keeps its shape and the page ground takes the
  piece's own paper color.

## Verification
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Desktop and mobile keep
  the same centered composition with no clipping.
- Thumb byte-identical across three renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280x900):
  - Two fresh instances byte-identical at t=0.
  - Exactly 4 dark line crossings in a quiet column (x=640) across the
    middle third — no fifth line.
  - t=0 vs t=10 differ in 20,354 px (notes drift, lines re-steer).
  - Drag test at x=264 (column profile, since a naive darkest-row scan
    ties between note centers and line ink): undragged top line sits at
    y≈385.5 (baseline 376 + 9.5 ambient displacement); dragging a note
    to 12 px above the line pushes it to y≈418.5 and thins it to a
    faint ~1 px trace (row sum 362 vs 116 solid undragged); on release
    at the same clock time it relaxes to y≈408.5 (ambient strength).
    The second line is pushed consistently too (425 → 439.5 held,
    433.5 released), matching the closed-form model.
  - The dragged note at y=364 sits 54 px clear of the retreated line
    at y≈418: notes never land, even when held against a line.
- Token scan clean: no fillText/strokeText, no AudioContext,
  getUserMedia, createElement, Path2D, shadowBlur, or gradients.

## Fix rounds
None needed. (The first probe's darkest-row measurement tied between
note centers and line ink and was replaced by a column-profile
measurement, which confirmed the mechanics; no piece code changed.)
