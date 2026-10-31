# No.770 Glitter Black

EXPANSION #94 mary-corse, prompt block 3 "Glitter Black".

## Concept

A large black field dense with glitter points, framed by six small white
microsphere squares in an E-pattern, three down each side. The field is not
self-lit: a warm pool of light sits in it, and the glints only answer to that
pool. Inside the pool they bloom warm white with amber cores; outside it they
fall to a near-invisible base. Black is the ground that lets light read. No
confetti colors, no star-photo realism, no twinkle that ignores the light.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette, strict: field #0A0A0C, glints warm white #F4F1E8 with amber cores
  #E8D9B8, white squares #F5F4F0, deep shadow wall #050506 (also the page
  ground).
- 5,200 glints precomputed once from a seeded mulberry32 stream: position in
  field units, size 1-3 px, twinkle phase and frequency, amber-core tendency,
  and a flare flag on about 2.5% of points (bright ones get a tiny 2 px cross
  flare). Drawn as small rects each frame.
- Pool/twinkle coupling: every glint's brightness is
  `0.05 + twinkle(t) * poolProximity`, where proximity is a powered falloff of
  distance to the pool center and twinkle is the point's own sine shimmer. The
  twinkle term is always multiplied by proximity, so a point outside the pool
  cannot sparkle on its own; it sits at the 0.05 base. The pool itself is
  drawn as 18 fine layered alpha discs (amber with every third in warm white),
  clipped to the field and kept faint: the pool is carried by the glints, the
  discs are only warm haze.
- Pool motion: idle drift is a closed-form lissajous (two sine periods, 53 s
  and 37 s) centered on the field, so at t = 0 the pool is exactly centered.
  Drag moves the pool with the pointer (grab offset recorded so there is no
  jump); on release the offset decays exponentially (tau 3 s) back onto the
  drift path. Pool position is a closed-form function of the recorded drag
  events and t.
- Layout: field is a centered square at 75% of the smaller frame dimension
  (78% on phones). The six white squares are 8% of the smaller dimension,
  centered in the side margins at field-relative heights 0.2 / 0.5 / 0.8 so
  the E-pattern tracks the field on any aspect ratio.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style width/height pinned in px inside
  draw(). Phone detection via window.screen (min dimension < 700 px), aspect
  h > w*1.15 as fallback only.
- Determinism: frame one is the synchronous draw(0) at load; no Date.now, no
  wall-clock reads anywhere. The animation loop is anchored to the first rAF
  timestamp and rAF is typeof-guarded, so the headless QA renderer (no rAF,
  no AudioContext, no createElement, no offscreen canvas, no ctx.filter)
  draws the same first frame and stops.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted.
- First pass fix: 7 coarse pool discs read as a concentric bullseye and the
  flanking squares were positioned by frame height, which pushed them past
  the field's top and bottom on the tall mobile frame. Pool rebuilt as 18
  fine low-alpha discs and square rows made field-relative; re-rendered and
  byte-compare re-run green.
- Final read-back: desktop and thumb show the black field with a soft warm
  haze at center, glints blooming in the middle and dying toward the edges,
  six white squares flanking in step with the field. Mobile shows the same
  composition centered in the tall frame, squares snug in the margins,
  nothing clipped.

## Deviations

None from the prompt's substance. Two construction choices: the pool glow is
layered flat alpha discs rather than a canvas gradient (house no-gradient
rule; same soft falloff), and the idle version is watch-only with drift as
the prompt prefers, with drag as the direct pool control.
