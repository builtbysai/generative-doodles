# №1120 — Kinetic Rain

Joachim Sauter study block JS1. Sauter's Changi Airport installation
(2012) as a piece: 1,216 bronze drops on wires, breathing in waves —
here, two fields of them in a dark hall.

## The piece

Two arrays side by side, each 40 columns × 24 depth rows of bronze
droplets (28 × 18 on phones), 1,920 droplets in all. Each droplet rides
a vertical track: its height is a closed-form choreography, and its
colour follows its height — shadowed bronze #5A3F22 down low, bronze
#C08A3E mid-track, bright specular #FFD9A0 at the top of the travel, so
the wave crests catch the light. A faint flipped echo under each
droplet stands in for the reflection. Rows toward the viewer sit lower
and larger — a low viewing angle across both fields. Palette is the
prompt's and nothing else: hall void #07090E, the three bronzes, and a
faint cool ambient #16202E pooled low in the hall.

## The choreography

A 25-second loop of four phrases, crossfaded over the last 1.6 s of
each 6.25 s segment:

1. **Swell** — two travelling plane waves summed over the whole double
   field, so a bright crest rolls diagonally across both arrays.
2. **Peak** — a gaussian mound whose centre orbits inside each array,
   droplets converging up into it over a small counter-ripple.
3. **Spiral** — arms winding around each array's centre, amplitude
   falling off with radius.
4. **Trough** — the gaussian inverted: a bowl the field sinks into.

Every height is a pure function of (column, row, t) from a seeded
score; nothing is integrated frame to frame.

## Interaction

- Dragging across the field records impulses. Each droplet answers with
  the analytic response of an underdamped spring — radial falloff from
  the touch point, a ~0.85 s oscillation inside a ~2 s decay envelope —
  added to its choreographed height. Drag down pushes droplets down;
  drag up lifts them. They settle back into the score on their own.
- Double-tap reseeds the score: new wave numbers, orbit and spiral
  parameters, same mechanism.
- Left alone it simply performs its loop. Never click-to-reload.
- Silent. No sound at all.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
the viewport and the window; CSS size pinned in `fit()` on every draw.
Phone detection via `window.screen` (min dimension < 700), grid reduced
on phones. First frame drawn synchronously at the fixed phase t = 3 s —
squarely inside the swell, crest mid-field — and the animation loop is
anchored to that phase plus elapsed time behind a
`typeof requestAnimationFrame` guard. Droplets are drawn as paired arcs
in per-brightness-bucket batches (28 buckets), with a moveTo before
every arc so the batched paths stay clean in both node-canvas QA and
real browsers. No gradients, no `ctx.filter`, no shadowBlur, no
offscreen canvas, no `createElement`, no microphone. Visible text is
the `<title>` only.
