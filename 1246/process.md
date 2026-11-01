# №1246 "A Space for Reflection" — process

Adán De La Garza study block ADG7 (PP405), after his
2012 room of mirrors and a rotating LRAD speaker: "the sound bounces off the
mirrored surfaces filling the space, and since the speakers rotate, the sound
moves in a way that can be disorienting or pleasing."

## What it is

A dark room in flat isometric-ish perspective: floor trapezoid, back wall,
side walls. Three tall mirror planes stand on the floor at angles — left
angled along the left wall, center-right freestanding on a diagonal, right
angled toward the viewer. A speaker on a stand at front-center sweeps a
visible amber beam across the room. The beam is sound made spatial, not a
laser: a translucent cone with a hard edge (4° half-angle, alpha 0.15). Where
it strikes a mirror it bounces — second segment thinner and brighter (1.6°,
alpha 0.26), third thinner still (0.9°, alpha 0.38) — leaves a bright streak
up the mirror face, and sheds expanding teal sound-rings across the floor.

## House adaptation (silent)

The prompt's spatialized band-passed noise score ships as the ripple
geometry only. The piece is silent: no audio APIs, no microphone. The rings
are the score, drawn.

## Model

All beam math happens in a 2D floor plane (u left→right, v front→back),
then projects to the screen trapezoid. Mirrors are base segments in that
plane; the raycast tests mirrors and the four room walls, reflects by
d' = 2(d·t̂)t̂ − d across the mirror's unit tangent, up to two bounces.

- Sweep: φ(t) = −50°·cos(2πt/60) — a 100° arc, one full rotation cycle in
  60 s, easing at the ends by the cosine.
- Speaker at floor (0.500, 0.030). Layout 0 mirrors:
  M1 (0.05, 0.60)→(0.26, 0.82); M2 (0.55, 0.55)→(0.75, 0.80);
  M3 (0.88, 0.62)→(0.99, 0.44).
- Ripples: spawn events are derived by stepping the beam at a fixed 1/30 s
  from t = 0 — a ripple spawns at a segment's end point whenever its target
  changes (new mirror / wall) and on a cadence while a target is held
  (1.1 s / 1.7 s / 2.3 s by bounce depth). Stored events then render as pure
  functions of t: radius 62 px/s × perspective scale, two concentric rings,
  alpha fading over a 4 s life, capped at the last 40. Spawn points are
  always mirror faces or walls, never the speaker.

## Frame one, verified numerically (piece's own code, T0 = 18 s)

- θ(18) = 0.26967 rad = 15.45°; beam direction (0.2664, 0.9639).
- Segment 0: (0.5000, 0.0300) → (0.6932, 0.7290), length 0.7252 floor units,
  striking the center mirror M2 at r = 0.7160 along its base.
- M2's line sits at 38.66° from the +v axis. Incoming direction 15.45°,
  reflected direction 61.87° — each exactly 23.21° from the mirror line
  (angle in = angle out); incidence 66.79° from the mirror normal.
- Segment 1: (0.6932, 0.7290) → right wall (1.0000, 0.8930), length 0.3479.
  Exactly one bounce at frame one.
- Five ripples are alive at T0 (ages 0.27–2.97 s): at the back wall, at the
  center mirror's near end, at the right wall, and two along the beam's
  current path — the room is already filling with ring geometry.

## Interaction

- Drag anywhere: the speaker re-aims, beam following the pointer (pointer
  position inverted through the floor projection, φ clamped to ±77°). Aim
  is recorded as timestamped samples, so the beam state stays a closed-form
  function of recorded events + t.
- Release: the sweep resumes from the released angle, with the sweep phase
  solved so φ and its pre-drag direction of travel are both continuous.
- Double-tap: reseeds the room — layouts cycle (three hand-set rooms,
  small seeded jitter on the mirror endpoints from salt > 0, applied
  instantly: it is a new room, not a rearrangement) and the ripple field
  restarts.

## Rules kept

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas CSS size pinned in draw(); phone
detection via window.screen (min dimension < 700 px) with aspect fallback.
Synchronous first frame at the fixed phase T0 = 18 s; the rAF loop is
typeof-guarded and anchored at T0 + elapsed. Seeded integer hashes only.
No canvas gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData or offscreen canvas, no Math.random, no audio. No visible text
beyond the title.
