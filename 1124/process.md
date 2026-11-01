# №1124 — Petalclouds

Joachim Sauter study block JS5. Sauter's Petalclouds (Changi Terminal 4,
2018) abstracted to pure atmosphere: six clouds of aluminum petals
re-sculpting themselves slowly over a dark terminal floor.

## The piece

A vast dim space, #0B0F16, horizon at the lower quarter, and almost
nothing in it. Six cloud-clusters drift overhead at three depths —
one far, three mid, two near — each built from 12–20 petals. A petal is
a hard-edged bezier leaf: a lit aluminum face (#C9CED6) over a shadow
sliver (#4A5058), with a faint warm glint (#FFE3B3) stroked along its
upper edge where the top light catches it. No cotton, no softness —
turned metal, floating.

Everything is a closed-form function of time:

- Each cloud's centre wanders on slow Lissajous drifts (periods of two
  minutes and more).
- Each petal orbits its cloud's heart on a seeded base angle and radius,
  breathed by two sine morphs on a shared 60-second cycle — one opens
  and closes the radius, one swirls the angle — while the cloud itself
  stretches and relaxes on the same cycle. The formation opens, closes,
  stretches, and returns; it never repeats a silhouette twice in a row
  but always comes home.
- A petal's orientation follows its own morph velocity (sampled from
  the same position function a fraction of a second ahead), so the
  leaves turn the way they travel.
- Under each cloud, a warm floor pool (#2A2118, three layered flat-alpha
  ellipses) rests in the floor band — and drifts against the cloud's
  own drift, so the light on the floor moves in counter-motion.
- A three-band flat wash of warm light lies across the very top of the
  frame, the terminal's unseen ceiling glow.

## Interaction

- Drag horizontally to pan the viewpoint: the layers shift by parallax
  (far 0.25, mid 0.55, near 1.0) and the view eases back to centre when
  released.
- Press on a petal and drag to nudge it: the petal follows, its
  neighbours in the same cloud shift at reduced weight as the formation
  re-balances, and on release the displacement rings down as a damped
  spring (a closed-form decaying cosine per recorded release).
- Double-tap reseeds all six formations.
- Never click-to-reload. Silent — no sound at all.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
the viewport and the window; CSS size pinned in `fit()` on every draw.
Phone detection via `window.screen` (min dimension < 700) with an aspect
fallback in spirit — the composition is unit-space, so the portrait
frame simply holds the same sky. The first frame is drawn synchronously
at the fixed phase t = 18 s — near clouds already crossing the top edge,
pools already resting on the floor — and the animation loop is anchored
at that phase behind a `typeof requestAnimationFrame` guard. Painter's
order far to near. No gradients, no `ctx.filter`, no shadowBlur, no
offscreen canvas, no `createElement`, no microphone. The only text is
the `<title>`.
