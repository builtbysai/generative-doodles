# No.782 Center Light

EXPANSION #95 doug-wheeler, prompt block PP7 "Center Light".
Wheeler's rare center-light encasement variant: a dark room and,
hovering in it, a condensed radial glow with no frame, no panel, no
edges, light dematerialised from its source. The only bounded
thing in the frame is the light itself. Drag moves it; release lets
it drift home. Exactly one gesture, and nothing on screen hints at
it.

## Concept

Total darkness, one glow. Three layers built from the strict
palette: a white-hot core (about 15 percent of the frame across),
a blue-white inner aura, and a deep blue-gray outer aura reaching
about 60 percent of the frame, all strictly white-family on black,
no color, no lens flare, no geometry, no text. A breath of seeded
grain at about 1 percent rides inside the aura so the light feels
like lit air rather than a digital disc.

The piece's single gesture is the drag. The core follows the
fingertip with a soft lag; the aura layers follow with longer time
constants and trail behind like disturbed water. On release the
target becomes the frame center and the core drifts back over
about six seconds, the aura settling behind it. Pointer targets
are clamped to one core radius from every edge, so the core can
never touch the frame.

Palette, strict and complete: ground #0B0C0E, core #FFFFFF, inner
aura #DCE8FF, outer aura #3A4A63. No other colors appear anywhere.

## Construction

Single self-contained index.html, canvas 2D, no external assets,
no visible text except the title.

- Layered-spring motion, closed form throughout. The drag target
  is recorded as a timeline of spans: on each span the target
  lerps linearly between consecutive pointer samples (thinned to
  at most one sample per 30 ms or 4 px), and a final tail span
  holds the rest target (frame center) or the latest pointer
  position while dragging. Each layer's position at time t is
  computed by integrating the exact solution of
  dx/dt = (T − x)/τ span by span, an exponential approach per
  segment, never frame-integrated state, so the position is a
  pure function of the recorded samples and t. Time constants:
  core τ = 0.9 s, inner aura τ = 1.7 s, outer aura τ = 2.8 s,
  which is what makes the aura trail and gives the roughly
  six-second settle after release (the core is effectively home
  by ~4–5 s, the outer aura still easing in behind it).
- The integration only looks back 40 s: after that long every
  layer is within a few parts per million of the target it was
  chasing, so restarting the integral at the target's value there
  is invisible and keeps long drag sessions cheap.
- Glow rendering: each layer is many concentric flat discs drawn
  with the 'lighter' composite. A point at radius r is covered by
  every disc wider than r, so equal-alpha discs (46 outer, 38
  inner, 30 core) stack into a smooth triangular falloff peaking
  at the center; a small solid heart disc (alpha 0.85) guarantees
  the very center reads white-hot. No canvas gradients anywhere.
- Grain: 700 specks precomputed from a mulberry32 seeded stream
  (seed 782001) as unit offsets in a disc of radius 0.34 of the
  frame's smaller dimension, drawn around the outer aura center
  with a closed-form alpha shimmer between about 0.006 and
  0.013, in inner-aura pale or white. They ride with the glow.
- All sizes derive from the smaller frame dimension, so the glow
  scales identically on phone and desktop. Canvas size comes
  from the Visual Viewport API, with resize listeners on both
  visualViewport and window; draw() pins canvas.style.width and
  height in px every frame. Phone detection uses window.screen
  physical size (min dimension under 700 px) with the aspect
  fallback; the page ground is the ground tone. A resize resets
  the drag timeline and re-anchors the rest target at the new
  center.
- The animation loop is guarded by a typeof check on
  requestAnimationFrame; the QA renderer has none, so only the
  synchronous first frame draws there. Frame one is the
  synchronous draw at t = 0: no events recorded, every layer at
  the center. No Date.now anywhere (event times come from
  performance.now on the same clock as the rAF timestamps), no
  audio, no tap action, no click handler of any kind.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720
  (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with
  cmp: identical. The duplicate render was deleted.
- Read-back: all three renders show a single white glow centered
  in darkness, white-hot core, blue-white inner aura, deep
  blue-gray outer aura falling off smoothly to the black ground,
  nothing else in frame, nothing clipped on mobile (the glow is
  proportionally smaller in the tall frame and fully inside it).
- Interaction check: in a temporary copy (deleted after use) the
  recorded-sample timeline was driven with scripted timestamps,
  a 1.5 s drag toward the upper left, release at t = 2.0, drawn
  at t = 2.8. The render shows the glow displaced up-left of
  center mid-drift home, the core leading and the outer aura
  trailing behind it, confirming the closed-form lag, the layered
  time constants, and the release-to-center behavior end to end.
- First-render bug, fixed before QA: the rest timeline was
  initialized before the first measure(), anchoring the glow at
  (0, 0); the timeline is now re-anchored after measuring, and
  all renders were redone.

## Deviations

- The prompt calls for stacked radial gradients and a
  critically-damped spring. Gradients are realized as layered
  flat discs under 'lighter' compositing, and the spring as
  per-layer first-order exponential approaches with the exact
  per-segment solution, because the QA renderer has no reliable
  gradient/blur pipeline and the house determinism gate requires
  closed-form motion rather than frame-integrated springs.
  Reason: renderer limits and the determinism gate; the visible
  behavior, soft lag, trailing aura, slow drift home, matches
  the prompt.
- Settle timing: with τ core 0.9 / inner 1.7 / outer 2.8 s, the
  core reads as home in about 4–5 s and the outer aura finishes
  settling around 6 s, rather than the core alone taking the
  full six seconds. Reason: a single 6 s core constant made the
  drag lag feel unresponsive; the layered constants keep the
  prompt's six-second settle as a whole-glow event.
