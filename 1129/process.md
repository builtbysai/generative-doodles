# №1129 — Kinetic Rain

Jussi Ängeslevä study block JA2. His Changi Airport Terminal 1 work
(2012, creative director — "it's about the dream of flying") as a
piece: 1,216 copper droplets on 1,216 motors, morphing through shapes.
The title deliberately duplicates №1120's — same installation, his
reading of it; Sauter's version was bronze waves, this one is copper,
shapes, and shadows.

## The piece

Two fields side by side, each 20 columns × 30 depth rows of copper
droplets (16 × 22 on phones), 1,200 droplets in all. Each droplet rides
a vertical track; its height comes from the choreography and its colour
follows its height — shadowed copper #4A2E16 down low, copper #B87333
mid-track, bright specular #FFD9A0 at the top of the travel. Below the
fields, the bottom third is an implied floor (#0D1117): two warm
spotlight pools breathe there, and every droplet throws a soft copper
echo onto it, doubling the image. Palette is the prompt's and nothing
else: terminal void #06080C, the three coppers, floor, echo #7A5228,
spotlight #FFE0B0.

## The choreography

A 3-minute cycle (the real cycle is 15 minutes) of five shape phrases,
~36 s each, crossfading over the last 6 s. The shapes live only in the
droplets' heights — analytic masks over each field, never drawn:

1. **Balloon** — a dome profile (highest at the heart) with rigging
   lines running down to a small basket.
2. **Paper airplane** — two soft triangles sharing a raised fold ridge,
   banking slowly.
3. **Kite** — a diamond with a swaying tail and three bows.
4. **Flock** — seven birds in a V, each two elongated wing gaussians
   that flap, plus a body.
5. **Dragon** — a segmented sine-spine ridge travelling slowly, with a
   gaussian head.

Masks blend between phrases, then map to height: deep shade outside a
shape, near-specular at its heart. Travelling sine ripples run
throughout, damped over the shapes so the forms stay legible. Every
height is a pure function of (column, row, t) from a seeded
choreography; nothing is integrated frame to frame.

The floor echoes are batched by height tertile under 'lighter' — two
soft layers per tertile in the echo tone, plus a warm spotlight core
for the highest droplets — so the shadow field brightens where the
shape rises.

## Interaction

- Dragging across the field records impulses. Each droplet answers
  with the analytic response of an underdamped spring — radial falloff
  from the touch point, a ~0.85 s oscillation inside a ~2 s decay
  envelope — added to its choreographed height. Drag down pushes
  droplets down; drag up lifts them. They settle back into the
  choreography on their own.
- Double-tap reseeds the choreography: a new shape order (and new
  ripple and sway parameters), same mechanism.
- Left alone it simply performs its cycle. Never click-to-reload.
- Silent. No sound at all.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on
both the viewport and the window; CSS size pinned in `fit()` on every
draw. Phone detection via `window.screen` (min dimension < 700, aspect
fallback), grid reduced on phones. First frame drawn synchronously at
the fixed phase t = 15 s — mid-hold of the balloon phrase, a dome
reading across both fields, echoes on the floor — and the animation
loop is anchored to that phase plus elapsed time behind a
`typeof requestAnimationFrame` guard. Droplets are drawn as paired
arcs in per-brightness-bucket batches (26 buckets), with a moveTo
before every arc so the batched paths stay clean in both node-canvas
QA and real browsers. No gradients, no `ctx.filter`, no shadowBlur, no
offscreen canvas, no `createElement`, no microphone. Visible text is
the `<title>` only.

QA notes: the first render's balloon read as vertical strands — fixed
by deepening the off-shape shade, widening the dome, damping the
ripples over shapes, and raising the height amplitude. The spotlight
pools first read as hard-edged discs crossing the floor seam; shrunk
and softened. The flock's birds were enlarged after a phase-check
render showed them as sparse specks at grid resolution. Extra phases
(dragon, flock) were verified from phase-shifted scratch copies,
since removed.
