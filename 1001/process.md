# No.1001 "The Stage Is a Medium"

Study #123 yuya-hanai, PP162 "antiparallel" (ELEVENPLAY x Rhizomatiks, Canon MREAL).

## Concept

Dancers inside a visible medium. Three white articulated silhouettes move slowly
through the middle of a dark blue-gray room while roughly 300 translucent pale-cyan
boxes tumble around them in projected 3D. The boxes are the architecture: there is
no floor, no wall, no stage. Where a body passes, the medium is displaced: boxes
near a figure are pushed aside and trail a brighter wake, so each dancer's path
stays written in the field for a moment. Every 36 seconds the whole field exhales,
drifting outward for 4 seconds while the colors cool, then settles and warms back.

Interactions: tap a figure to track it (the view eases to keep it centered for
10 s), drag to pour the field in the drag direction, double-tap for a new phrase
and a reseeded field. Sound, started only by the first gesture: one low drone per
figure pitched by its speed, a glassy tick when a box strikes a body, and a noise
swell under the exhale.

## Construction

- Sim: fixed timestep 120 Hz, seeded with mulberry32. Frame one is the synchronous
  draw after exactly 2400 steps (20 s of sim); nothing in the drawn state reads a
  wall clock. The rAF loop (typeof-guarded) advances the same fixed steps, capped
  per frame.
- Boxes: each box carries a world position (x, y), a fixed depth d in [0, 1), a
  slow base drift plus a sinusoidal wobble, a rotation, a size, and a deflection
  velocity that decays exponentially. Projection is a simple perspective scale,
  persp(d) = 0.5 + 0.85d, applied to both position and size, so far boxes are tiny
  and near boxes large. Boxes are sorted far to near once at build (depth is fixed)
  and drawn in two layers around the figures (d < 0.45 behind, the rest in front),
  which puts the dancers inside the field rather than on top of it.
- Box drawing: a rotated quad with face at alpha 0.08 and edges at 0.5. Near boxes
  (d > 0.55) additionally draw an offset back quad and four connecting edges. Every
  20th box is lit and carries a bright #E8FBFF core.
- Figures: closed-form choreography. Each figure's root follows layered sines
  inside the middle third; its pose interpolates with smoothstep easing between
  five seeded keyframe poses (neutral, reach, fold, turn, step, shuffled per
  figure) over a 16-22 s phrase. Joints are computed by forward kinematics; the
  silhouette is thick round-capped strokes, white #F2F4F6 over a wider, fainter
  cyan under-stroke for the edge glow, with a filled head.
- Displacement and wakes: each step, boxes within 0.30 world units of any of a
  figure's seven body points (head, neck, pelvis, hands, feet) receive a radial
  deflection kick, scaled by depth proximity, and their wake value rises. A box
  records its position every 2 steps into a 13-point history; the wake is drawn as
  a polyline through that history in #2BD8FF at alpha up to the specced 0.25,
  scaled by the current wake value, which decays over about 2 s.
- Exhale: envelope sin(pi * c / 4) for c = t mod 36 < 4. While active it adds a
  radial outward velocity to every box and a full-frame wash toward the cool tone
  #141A22 at up to 0.30 alpha, so figures and field cool together and warm back as
  the envelope falls.
- Camera and pour: tracking eases a camera offset toward 0.6 of the tracked
  figure's pelvis position inside the sim step; drag adds to a tilt vector that is
  applied to all boxes and decays with a 1 s time constant (settled by ~3 s).
- Sizing: canvas follows the Visual Viewport API with resize listeners on both
  visualViewport and window; style width and height are pinned in px on every
  draw. Phone detection uses window.screen's smaller dimension (< 700 px) with an
  aspect fallback (h > w * 1.15). Page ground is the room tone #0A0D12.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). Each render
  completes in about 1 s, silent, no errors.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical.
  The duplicate render was deleted. Re-verified after each tuning round.
- Read-backs: desktop and thumb show the dark room filled with cyan translucent
  boxes at strongly varied sizes (tiny far, large near, several cropped at the
  edges), about one box in twenty carrying a bright core, and three white
  silhouettes mid-phrase in the middle (one upright, one folding forward, one
  standing), with cleared, disturbed space around each body. Mobile keeps the
  figures centered and whole with the field intact around them; nothing essential
  is clipped.
- Tuning rounds: (1) wakes were initially invisible at frame one, so wake gain was
  raised (x14 accumulation, slower 0.5/s decay), history lengthened to 13 samples,
  and the deflection kick strengthened until the displaced halo around each dancer
  read clearly in the still; (2) the figures' cyan edge under-stroke was softened
  (1.6x width, 0.22 alpha) so the glow reads as an edge, not an outline.
- Deviations:
  - Phone box count is 220 instead of 300, as allowed by the brief, for fill
    rate on small screens.
  - Box depth is fixed per box; the tumble is carried by x/y drift, wobble, and
    rotation. This keeps the far-to-near sort static and the draw cost flat while
    the projected sizes still span the full depth range.
  - Exhale cooling is a single translucent wash toward #141A22 over the finished
    frame rather than per-element color mixing; it cools figures and boxes
    uniformly (the spec cools everything) at negligible cost.
  - Audio Math.random is used only for tick pitch jitter inside the
    gesture-gated audio path; it never touches drawn state, so frame one stays
    deterministic.
