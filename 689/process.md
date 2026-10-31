# No.689 Quipu Field

EXPANSION #84 ceciliavicuna, prompt block 1 "Quipu Field": the quipu as a
data structure, an ancient census in a language you do not speak.

## Concept

A dark void filled with 120 hanging cords of raw-wool fiber. Every cord
is one record. Along each cord sit knot clusters: their colour encodes a
category (red, brown, charcoal, ochre), their bead size and count encode
magnitude, and their position down the cord encodes sequence. The field
is denser toward the centre and thins at the edges, like a gathered
sheaf. No legend, no labels, no decoding aid is drawn anywhere: the
unreadability is the point. The whole field breathes on a slow master
phase; a visitor drags through it to part the cords, as if walking
through the Aran Quipu corridor, and the cords settle back with
wool-soft damping.

## Construction

Single self-contained `index.html`, canvas 2D, strict six-colour
palette (fiber #E8DDC8, knot red #A83232, knot brown #5C3A21, knot
charcoal #2A2A2A, knot ochre #C07A3A, ground #0D0B09). No text except
the `<title>`, no audio, no external assets.

Census data: one mulberry32 stream (seed 689001) generates all 120
records at init and never changes. Anchor positions use a triangular
distribution peaked at the centre; cord lengths run 0.40 to 0.95 of the
frame height; each cord carries 3 to 9 knot clusters sorted by depth.
Beads step along the cord alternating sides, like a wound binding, with
four short radial fuzz strokes under each bead.

Closed-form sway, not verlet: the prompt brief for this build required
frame one to be an exact function of t=0, so no integrated rope
simulation is used. Each cord's shape is a closed-form pendulum curve:
the lateral offset grows as v^1.6 down the cord (pinned at the top,
free at the tip), the swing frequency derives from cord length (longer
cords swing slower), and a small travelling wave runs down each cord.
A master breath (26 s period) scales all sway amplitude between 0.45
and 1.15, so the field inhales and exhales as one body. Everything is a
pure function of the anchored elapsed clock; `draw(0)` is rendered
synchronously at load, and the rAF loop (typeof-guarded) re-derives
each frame from elapsed time alone.

Drag: pointer samples are recorded with their anchored timestamps. A
sample pushes nearby cord points sideways with a quadratic falloff
inside 0.17 of the frame's short side; the push decays as
exp(-age/2.4) and is gone by about 7 s, so the corridor closes slowly
behind the visitor. Total push is capped so cords can never be flung.

Viewport: canvas size comes from the Visual Viewport API with resize
listeners on both visualViewport and window; the canvas CSS size is
pinned in px inside every draw. Phone detection uses window.screen
(min dimension < 700 px) with the tall-aspect fallback. On phones the
field keeps the innermost 84 of the 120 records (cords are stored
edge-first, centre-last, so the phone draw takes the centre-most
subset and the sheaf density survives); the field stays full-bleed.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and compared with `cmp`:
  byte-identical. Second render deleted.
- Desktop read-back: dense hanging cord field, centre-weighted, knot
  clusters in all four category colours, varying cord lengths, nothing
  clipped, no text.
- First mobile render exposed a bug: the phone subset took the
  edge-most cords and left a gap at the centre. Fixed by drawing the
  last (centre-most) 84 records; re-rendered mobile shows the gathered
  sheaf centred with nothing clipped.
- Phase check at t=13 s (via the piece's `?seed=t13` hook, scratch
  render inspected then deleted): cords lean at varied per-cord
  phases, confirming the pendulum sway and breath are live; frame one
  remains the t=0 state.
- Grep checks: no `Date.now`, no `Math.random`, no `createElement`,
  no offscreen canvas, no `ctx.filter`, no audio APIs, no external
  URLs. rAF access is typeof-guarded throughout.

## Deviations

- Verlet rope physics replaced by closed-form pendulum curves, per
  this build's implementation rule: the determinism gate requires
  frame one (and every frame) to be an exact function of the anchored
  clock, which an integrated sim cannot guarantee across renderers.
  The visible behaviour (per-cord phase-offset sway, drag parting,
  slow settle) is preserved.
- Phone cord count thinned from 120 to 84 records for legibility and
  performance, as the brief allows; the thinning keeps the
  centre-most records so the sheaf composition is unchanged.
