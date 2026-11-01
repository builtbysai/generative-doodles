# No.992 "Fork This"

Study #122 satoshi-horii, PP153: the Perfume "Global Site Project" (2012-13),
where the artwork is an open platform: motion-capture choreography data given
away, and over 500 projects worldwide forked from it.

## Concept

The piece is a lineage, not a collection. One large white dancer glyph, drawn
as a neon motion-capture skeleton, dances at the left. Tapping any figure
forks it: a mutated child spawns beside it and starts dancing its own loop,
joined to its parent by a hairline lineage line. Children are colored by
generation (1 cyan, 2 magenta, 3 yellow, 4+ mint, each dimmed by 0.9^depth)
and shrink by 0.85x per generation, so the family tree reads left to right as
history. Dragging across a branch prunes it: the figures fade while collapsing
back along their lineage lines into their parent. Double-tap reseeds the
parent and the whole tree restarts from a new founding family. The piece never
ends; it only forks.

## Construction

- Pose engine: each node owns a skeleton in local units (pelvis origin, figure
  height 1): pelvis, chest, head circle, shoulders, elbows, wrists, hips,
  knees, ankles, all placed by forward kinematics. Joint angles are layered
  sines over an 8 s phrase loop plus per-node seeded mutations: phrase phase,
  speed multiplier (0.9-1.1), lean bias, and arm/leg joint biases. A node's
  pose is a closed-form function of (piece time, its parameters), so every
  figure on screen is live and animating every frame, parents and descendants
  alike.
- Mutation: a fork copies nothing verbatim. The child gets the generation
  palette, a fresh phase (so it is visibly out of step with its parent),
  fresh joint biases (a visibly different pose), and a rolled line density:
  sparse (core segments only, no joint dots), full, or echo (a second offset
  stroke pass at 0.45 alpha). Palette, pose, or density always change.
- Tree and layout: nodes carry fixed world positions assigned at fork time
  (x = parent.x + parent.size * 1.14, y from a sibling-offset table plus
  seeded jitter; size = parent.size * 0.85). A fit transform recomputes the
  tree bounds over all living nodes and scales the whole tree to fit the
  frame with margin; changes glide over 0.65 s through closed-form transform
  keyframes, and a reseed snaps. The founding family is scripted (parent,
  2 generation-1, 3 generation-2, 2 generation-3 children, all born at t = 0)
  so frame one shows the tree, not a lone figure.
- Events: tree state changes only through recorded events evaluated as
  functions of time. Fork grow-in is a 0.5 s smoothstep of the child's scale
  with a white fork-flash ring (0.45 s). Prune marks a whole subtree; each
  pruned node's drawn position lerps toward its own parent's drawn position
  (recursively, so a branch funnels into the surviving line) while its alpha
  fades over 0.8 s. Fully closed-form; no frame-integrated state anywhere.
- Interaction: tap a figure to fork it (tap resolves after a 0.35 s window so
  a double-tap can preempt it and reseed instead, the series pattern from
  No.991); drag across branches to prune what the drag touches; double-tap
  reseeds. Children per figure capped at 3 and living nodes at 48 so the
  tree stays readable.
- Sound (lazy AudioContext, created on first gesture, typeof-guarded): the
  parent is a 55 Hz sine drone; each living child adds a detuned sine one
  octave higher per generation (110 / 220 / 440 / 880 Hz, detune from the
  node hash), so the chord grows with the tree; fork is a tiny split click,
  prune a soft lowpassed collapse noise. The mix is normalized once the tree
  passes 14 voices. Silent in QA; the visual is complete without it.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in
  draw() every frame; phone detection via window.screen min dimension
  (< 700 px) with aspect fallback; page ground is the piece ground tone.
  No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no
  visible text anywhere (no labels, no UI; the title element only).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
  Renders cleanly in silence; the script's only load-time draw is frame one
  at the fixed offset T0 = 6 s.
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical. The duplicate render was deleted.
- Desktop and thumb reads: large white neon dancer glyph at left mid-pose;
  cyan generation-1 pair below and mid-frame; magenta generation-2 figures
  right of them; smaller yellow generation-3 glyphs at the right edge;
  hairline lineage lines connect every child to its parent; nothing clipped.
- Mobile read: the fit transform scales the whole tree to the 390 px width,
  centered vertically on the tall frame; all eight figures whole and
  legible, lineage lines intact, nothing clipped.
- Hygiene grep: zero hits for gradients, shadowBlur, ctx.filter,
  createElement, Date.now, external URLs, or fillText.

## Deviations

- Two generation-2 siblings overlap at frame one: one parent drew two
  children whose seeded layout boxes and extreme arm swings cross (the same
  overlay class recorded for No.977). In motion the two dancers separate and
  re-cross continuously, and both remain fully readable as individuals;
  shipped as specced rather than re-rolled.
- Forks resolve through the 0.35 s pending-tap window (needed so double-tap
  reseed can preempt a fork), so a child appears a beat after the tap rather
  than on pointer-up. The fork flash marks the event when it lands.
- The audio chord's per-voice gains are normalized down once more than 14
  figures are alive, so a large tree stays a chord instead of a wall of
  volume; every living figure still has its own voice.
