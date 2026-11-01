# №1505 "A Voice Is Never Heard Alone" (sonia-wieder-atherton SW2, PP752)

Gallery date: 2006 · 02 · 24 (formula date, not drawn in the piece).

## What it is

Two lines travelling together across a charcoal field, never alone: a gold
line slightly above a teal line, both horizontal across the middle band,
undulating on one shared sine phase. The interval between them is the
subject. When the lines run close, the cream interval glow between them is
bright and both lines are at full strength; when they drift far apart, the
glow vanishes, both lines dim together to a 0.55 floor (never vanish), and
faint grey distant-state underlines grow beneath them. No other elements,
no text except `<title>`.

## Palette (exactly as specced, no other color)

- Field charcoal #2a2a30
- Line one gold #d9a441
- Line two teal #2e6f6a
- Interval glow faint cream #e8e0d0 (flat-alpha band, never a gradient)
- Distant state grey #b8bcc0 (flat-alpha underlines, growing with distance)

## Composition and timing

- Both lines span the full width; stroke width max(2.5 px, 0.007 × min(W, H)).
- Undulation: amplitude 0.018 × min(W, H), wavelength 0.38 × W, shared phase
  offset derived from mulberry32 seed 1505000 (fixed constant, so frame one
  is reproducible).
- Pairing loop 48 s; separation wave period 24 s (two waves per loop, so the
  loop closes exactly). Separation = 0.12U − 0.10U·cos(2π·lt/24), U =
  min(W, H): 0.02U at lt = 0 and lt = 24 (nearly touching, glow 0.30,
  line alpha 1.0), 0.22U at lt = 12 and lt = 36 (glow 0, line alpha 0.55).
- Frame one is the closest state: the pair and its glow are visible
  immediately, not after a wait.

## Drag mapping (closed-form over recorded events, never frame-integrated)

- Dragging vertically moves the separation by the change in distance from
  the middle band: moving toward the middle band pulls the lines closer
  (glow strengthens); moving away pushes them apart (both dim, never
  vanish). Offset = clamp(Δdistance × 0.35, −0.08U, +0.12U).
- On release the offset decays exponentially (tau 2 s) back to the
  scheduled separation, so the loop's own rhythm resumes with no jump.
- Final separation is clamped to [0.015U, 0.30U]: the lines can never merge
  into one (0.015U still exceeds the stroke width) and never leave the
  frame. Drag never deletes a line, never swaps colors, never restarts
  anything.

## House-rule compliance

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px. Phone detection via window.screen with aspect fallback; the field
  composition is full-bleed at 390 wide with no clipping.
- Fixed-phase first frame: boot draws draw(0); the rAF loop is a plain
  function declaration anchored as offset + elapsed-since-load. Every
  animation sine runs on loop-local time (lt = t mod 48).
- Fully silent: no AudioContext at all. No offscreen canvas, Path2D,
  ctx.filter, gradients, shadowBlur, document.createElement, WebGL,
  getUserMedia, localStorage, fillText, Math.random, or Date.now
  (grep-verified, 0 matches). No visible text except `<title>`.
- node-canvas quirks: no dots are drawn (lines only, each on its own path);
  every fading alpha passes through a 4-decimal rounding helper before
  stringifying, so no scientific-notation alpha reaches the canvas.
- Never click-to-reload / click-to-restart; pointer interaction is drag
  only. Study guard honored: musical mechanism only, abstract lines only,
  no likenesses, no real names, no readable text, no depicted event.

## QA and probe results (forced-time harness, real node-canvas, probe-1505.js)

All probes pass, no fix rounds needed:

- P1 frame-one redraw identical: 0 px.
- P2 loop closure: t = 48 vs t = 0 = 0 px; t = 96 vs t = 0 = 0 px.
- P3 pairing waves: separation 14.4 px at t = 0, 158.4 px at t = 12,
  14.4 px again at t = 24 (720 canvas); glow 0.30 → 0, line alpha
  1.0 → 0.55 over the same span.
- P4 drag toward centre at t = 20: separation 50.4 → 17.6 px, glow
  0.225 → 0.293; after release, t = 60 frame is 0 px vs a fresh
  undragged instance (decay back to schedule exact).
- P5 drag outward at t = 0: separation 14.4 → 59.8 px, glow 0.30 →
  0.206; gold pixels 3,835 and teal pixels 42,939 still present (the
  teal count includes the broad dim band; both lines visibly drawn).
- P6 extremes: max pull-in separation clamps at 10.8 px (0.015U, lines
  still distinct); max push-out clamps at 100.8 px (within the 0.30U cap).
- Thumb re-rendered twice: both byte-identical to the shipped thumb.
- Desktop (1280×720) and mobile (390×844) renders inspected: gold above
  teal, nearly touching at frame one with the cream interval glow between
  them, generous empty field, no clipping, no text.

## Deviations from the prompt

None, apart from the documented house-rule adaptations above (canvas 2D
throughout, closed-form drag state, flat-alpha glow band instead of any
gradient, silent by rule). The prompt's "distant state grey" is carried as
flat-alpha grey underlines that grow as the lines drift apart, and "when
one fades, the other dims with it" is carried by the single shared
line-alpha factor for both voices.
