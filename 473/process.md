# No.473 The Knot

EXPANSION #57 julandthefox (Giulia Neri), prompt GN1.

## Concept

Her "complicated relationship" piece as a generative system. The recurring
woman (dark brown hair, closed eyes, mustard dress with a white peter-pan
collar) stands calm at the center-bottom of a huge sage-green field,
enclosed by a towering knotted tangle of thorny green stems with a few red
roses. She does nothing; the knot does all the drama. Dragging toward her
pulls the tangle tighter (stems contract toward the center, thorns angle
inward), dragging outward loosens it and the roses open. It never fully
untangles and never fully strangles. A tap reseeds the knot. Ambient
layer: the stems breathe on a 6s sway. The top third of the field stays
nearly empty sage; the only text is the one-word hint "drag".

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt palette:
  sage #B8C4BC, stems #4E6B3A, thorn tips / back stems #33482A, roses
  #D61F26, dress #D9A03F, collar #F5F0E4, hair #3B2A24, skin #EBC9A8.
  Flat tints throughout.
- Knot: 14 seeded stems (mulberry32, fixed seed 473), ten closed loops and
  four open arcs. Each stem is a curling parametric path around the knot
  center: the angle sweeps while the radius is modulated by two seeded
  sine harmonics and clamped to a wide band, so each stem wanders between
  hugging the woman and flaring to the edge of the mass. That wandering,
  plus dense self-crossing, is what makes the mass read as a knot.
  Paths are sampled at 120 points and drawn as smoothed polylines
  (quadratic segments through midpoints) with round caps and joins.
- Weaving: seven stems are drawn behind the woman and seven in front,
  back to front. Front stems first stroke a thin sage halo wider than
  the stem itself, cutting a gap through whatever lies beneath, so
  crossings read as over and under rather than as a flat blob.
- Geometry is derived from frame height, not from min(W, H): knot radii
  are Rx = min(0.40 W, 0.46 H) and Ry = 0.27 H around a center at
  (0.5 W, 0.655 H), so on a tall narrow phone the knot still towers past
  her head and fills the middle band instead of collapsing to the width.
- No-touch rule: every stem point is projected out of a snug clear-zone
  ellipse fitted around the woman (center (0.5 W, 0.755 H), radii
  0.115 H by 0.20 H, enclosing dress, arms and legs with margin).
  Projected points land at a target factor that varies per stem (seeded
  1.05 to 1.18) and along the stem (a seeded sine), so wrapping stems hug
  her at uneven distances and never trace a clean oval. Thorns sit on the
  stems, outside the same zone, so they never touch her either.
- Thorns: small dark triangles at seeded stations along each stem, set
  perpendicular on the outward side and rotated toward the knot center
  as tightness rises (factor tight x 0.85).
- Roses: seven, each pinned to a seeded point on a seeded stem, drawn as
  five petal bumps around a filled heart with a faint dark spiral. Rose
  scale follows looseness (0.70 + 0.50 x (1 - tight)), so a relaxed knot
  blooms and a tightened one closes.
- The woman: simplified silhouette at center, feet at 0.93 H, height
  0.35 H. A-line mustard dress, mustard sleeves with skin hands at her
  sides, skin legs and feet, hair falling behind the shoulders with a cap
  over the crown, white peter-pan collar as two rounded halves, closed
  eyes as two short curved strokes. No nose, no mouth, no expression.
- Tightness is one parameter in [0.08, 0.92] (clamped at both ends by
  design), starting at 0.45. While dragging it is driven by the pointer's
  distance from the knot center (near center tight, far loose) and eased
  at 0.06 per frame, so the knot only ever tightens or loosens slowly.
  Stem positions scale toward the knot center by 1.10 - 0.28 x tight.
  It stays where a drag leaves it. A tap (short, unmoved press)
  increments the seed and rebuilds the knot. Never click-to-reload.
- Sway: each stem gets a seeded phase; points are rotated by up to
  0.012 rad and swelled by 1 percent around the knot center on a 6s
  sine period.
- Grain: 750 precomputed seeded dots in the collar cream and the dark
  green at 0.025 to 0.055 alpha, stored as fractions of the frame and
  redrawn identically every frame over everything.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px in
  draw() every frame. Phone detection via window.screen (min dimension
  under 700px), aspect h > w x 1.15 as fallback only. The composition is
  full-bleed sage on all sizes and the page ground is the sage.
- Determinism: the first frame is drawn synchronously at load with the
  knot fully formed at mid tightness and the sway pre-rolled to a fixed
  phase of 7.0s. No layout derives from Date.now() (the clock is read
  only for the tap-duration test in the pointer handler). The animation
  loop is anchored as the fixed offset plus elapsed time since load, and
  requestAnimationFrame is typeof-guarded, so the node QA renderer
  (which has no rAF, no AudioContext, no createElement, no offscreen
  canvas) draws the identical frame. No audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- Earlier draft in this folder failed the read-back and was rebuilt:
  its clear zone was a large ellipse centered on the knot, so most stems
  collapsed onto its boundary and the knot read as a tidy egg-shaped
  wreath with an empty middle; on mobile its radii scaled to min(W, H)
  and the knot shrank to a small halo around her head. The rebuild uses
  the snug woman-fitted clear zone with per-stem, per-point hug targets,
  strongly radius-modulated curling stems, the sage-halo weave pass on
  front stems, and height-driven knot radii.
- Final read-back, desktop (1280x900): sage field with the top third
  empty; a dense, wild, clearly knotted thorny tangle fills the middle
  band, rises well past her head, and wraps around her without touching
  her; seven red roses visible in the stems; the woman reads clearly at
  center-bottom (mustard dress, white collar, dark hair, closed eyes,
  arms at her sides); "drag" hint quiet in the bottom-left corner.
- Final read-back, thumb (720x720): same composition in square form;
  knot top at about 37 percent of frame height, woman and roses legible
  at thumbnail size, nothing clipped.
- Final read-back, mobile (390x844): full-bleed sage, generous empty
  field above, the tangle forms a tall enclosing mass around her from
  about 43 percent of the height down, roses visible, thorns clear of
  her body, nothing clipped, hint legible.
- Deviations: two, both mechanical. (1) The prompt's "curling beziers"
  are realised as smoothed polylines through seeded parametric curl
  points (quadratic segments), which is the same visual family and keeps
  every point available cheaply for thorn placement and the clear-zone
  projection. (2) True per-crossing over/under alternation is not
  computed; the weave is produced by the back/front stem passes plus the
  sage halo cut on front stems. Everything else follows the prompt:
  palette, composition, drag semantics, tap reseed, 6s breathing sway,
  grain, no text beyond the one-word "drag" hint.
