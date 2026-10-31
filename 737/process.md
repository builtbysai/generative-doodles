# No.737 "River Panes"

EXPANSION #90 spencer-finch, prompt block 2 "River Panes", after
The River That Flows Both Ways (2009, High Line): 700 glass panes,
each locking in the color sampled at the center of the river scene.

## Concept

A slow procedural river fills the frame: dark water built from
layered horizontal sine bands with pale light streaks drifting
through it. Over the river, a wall of glass panes grows from the
top-left, one pane every 0.5 seconds. Each pane's color is the
scene's center at the instant it locks, clamped to the purple-grey
family Finch used. When the wall is full it holds for 10 seconds,
then clears pane by pane in reading order and the sampling begins
again. The piece is watch-only; a tap anywhere force-samples the
current center immediately, filling the next pane at once and
jumping the queue. It never reloads.

## Construction

- Palette (strict): ground #0D0E12, grout #14161B, scene water
  #10141C with light streaks #C7D0E0, pane tones #6B5B7E, #8A7BA0,
  #4A4458, #9AA0B8, #5C4A6B. Nothing else.
- The river is a closed-form brightness field: three sine band
  terms over (x, y, t) plus 30 seeded light streaks (mulberry32,
  seed 737090), each a Gaussian falloff in x and y around a center
  that drifts and wraps. The drawn field is rendered as 48x8 px
  segments shaded from a 48-step precomputed ramp between the water
  and streak colors, evaluated at each segment center.
- Analytic center sample (renderer adaptation): the prompt's
  technical approach samples the center pixel from an offscreen
  render of the scene. The QA renderer has no offscreen canvas and
  no document.createElement, so the scene is defined as a pure
  function and the "center pixel" is that same function evaluated
  analytically at (W/2, H/2, sample time). The evaluated brightness
  is then clamped into the purple-grey family by choosing the
  nearest of the five specced pane tones by luminance. The panes
  stay honest samples of the computed river; no rainbow sampling is
  possible.
- Pane grid: pitch targets roughly 700 panes at any frame size
  (pitch = sqrt(W*H/700), clamped to 27..54 px), so a full wall
  takes about 6 minutes at desktop size and proportionally less on
  smaller frames. Panes are drawn in reading order with a grout
  cell behind each, a light bevel on the top and left edges, a
  shaded bottom and right, and a faint inner glow layer.
- Cycle state: a cycle is fully described by its start time and
  the recorded tap times within it. Sampling events are the merge
  of the 0.5 s tick schedule and the taps, sorted; pane k takes
  the color sampled at event k. Hold and clear boundaries derive
  from the moment the last pane locks. All rendering derives from
  (seed, taps, t).
- Progress readout ("pane n / N", bottom-left, monospace, low
  alpha streak color) is the specced content text.
- House rules: canvas sized from the Visual Viewport API with
  resize listeners on visualViewport and window; canvas.style
  width/height pinned in px inside draw(); phone detection via
  window.screen (min dimension under 700 px) with the aspect
  fallback (h > w*1.15), used for the readout size; the field is
  full-bleed at every size and the page ground is the ground tone.

## QA log

- Determinism: frame one is the synchronous draw at cycle t = 0,
  with pane 0 already locked (its sampling event is at t = 0).
  No Date.now, no Math.random anywhere; the rAF loop is anchored
  at the first frame timestamp and typeof-guarded, so the headless
  renderer draws exactly one fixed-phase frame.
- thumb.png rendered twice at 720x720 and cmp byte-compared:
  identical.
- Renders read back: desktop 1280x900, mobile 390x844, thumb
  720x720, plus a forced-state render at t = 60 via the inert
  ?seed=t60 hook (scratch only, deleted after inspection).
- Deviations:
  - Offscreen scene buffer replaced by the analytic center
    evaluation described above (renderer limit). Visible behavior
    is unchanged: each pane still locks the scene center's color
    at its sampling instant.
  - The original work's 700 panes at one photo per minute would
    take far too long; per the prompt's own adjustment the cadence
    is 0.5 s per pane and the grid targets about 700 panes, so a
    wall completes in roughly 6 minutes at desktop size, less on
    smaller frames.
  - Taps during the hold and clear phases are ignored: the wall
    is already full, so there is no next pane to force.
