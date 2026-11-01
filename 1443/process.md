# №1443 "Wallpaper Museum" (kathe-kruse KK4, PP674)

## What it is

A very long wall covered edge to edge in clashing wallpaper patterns, with
small works hung casually on it, without museum spacing or reverence. The
wallpaper is not background; it is the work the works hang on.

## Frame one

Counter-clockwise from the left at 1280×900: a wide floral bay (cream ground
#f2e8d8, rose motifs #c83a5a, leaf ticks #4a7a2a), then a narrow geometric
bay (navy #1a2a5a, gold diamonds #e8b83a), then a stripe bay (teal #1a7a6a,
cream stripes) entering at the right edge. Hung works at mixed heights with
slight tilts: a framed painting (ochre, gold block, pale disc), a stitched
pillow (umber, cream stitching), a lamp (slate shade, umber stem), and a
photograph partway in at the right edge. One work (a costume) straddles the
seam between the geometric and stripe bays. Mobile (390×844) keeps the same
full-bleed composition with no clipping.

## Motion and interaction

- Seamless loop. Wallpaper patterns drift almost imperceptibly: florals sway
  (3 px sine), stripes breathe (±6% width sine), dots wobble (2 px sine).
  Hung works stay put.
- Every 10 s one work quietly re-hangs itself: a small lift (16 px arc), a
  small set-down a few pixels from its old spot. The re-hang displacement is
  a pure function of (work, cycle), seeded, so it is stable and reproducible;
  completed re-hangs accumulate, so the wall genuinely changes over time.
- Drag horizontally on empty wall: pans along the 35-metre wall (wall width
  ≈ 4.2 viewport widths at load, bays cycling floral / geometric / stripe /
  dot in unequal widths: wide, narrow, wide, medium). Pan clamps to
  [0, wallW − viewportW].
- Drag a work: lifts it and lets the visitor re-hang it anywhere on the
  wallpaper; on release it stays where dropped. The dragged work draws last
  (on top) with a soft drop shadow while lifted.
- Never click-to-reload, never a white-cube gallery, never evenly spaced
  frames. No visible text except `<title>`. Fully silent.

## Construction

- Wallpaper as tiled procedural patterns per bay (floral, geometric, stripe,
  dot generators), drawn only for bays intersecting the viewport, clipped to
  the bay rect.
- Works as small filled shapes (painting, pillow, lamp, costume, photograph)
  in muted oil tones (ochre #c88a2a, umber #5a3418, slate #5a6a7a), each
  with a seeded rotation of at most ±2°, mixed heights, one overlapping a
  bay seam by construction.
- All motion is closed-form over piece time and recorded events: pattern
  drift is sine of t, re-hangs are functions of (work, cycle), pan and
  re-hanging are functions of the recorded pointer list. No frame-integrated
  state.
- Determinism: frame one = draw(0) via a boot flag; the rAF loop starts the
  clock only after load (plain function declaration, typeof-guarded). All
  randomness from mulberry32 (seed 1443000 + index·7919), never Math.random.
  Bay layout and work placement are generated once per size in a fixed
  order, so two fresh instances are byte-identical at t = 0.

## Adaptations

- The prompt's "35-metre wall" is realised as a wall ≈ 4.2 viewport widths
  long with nine bays at load; panning reveals new bays and new hung works,
  including the dot bay (coral #e86a4a, white dots) which sits beyond the
  first viewport.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. Fading alphas are literal fixed decimals
  (the lift shadow is rgba(0,0,0,0.15)); dots are filled rects or
  own-beginPath arcs (node-canvas quirks).
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px; phone detection via window.screen physical size (min dimension <
  700 px) with aspect fallback; field-like composition full-bleed on phones.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness (shimmed
canvas/window matching render-piece.js, pointer events driven through the
piece's own listeners, probe hook on window):

- Two fresh instances byte-identical at t = 0.
- Bay grounds present in frame: floral cream 639,266 px, geometric navy
  275,434 px, stripe teal 22,901 px at pan 0; dot coral 429,430 px after
  panning to the dot bay (pan 1928).
- Bay list: floral@0 w821, geometric@821 w399, stripe@1220 w708, dot@1928
  w542, floral@2469 w764, geometric@3234 w437, stripe@3671 w648, dot@4319
  w523, floral@4842 w772 — unequal widths, clashing neighbours.
- Seam overlap: bay-2 seam at x = 1220; a costume work spans x = 1217 to
  1396, straddling it.
- Re-hang: work 0 y = 194.2 at t = 0, 177.4 at t = 5 (lifted ≈ 16.8 px),
  192.7 at t = 11 (settled 1.5 px up / 22.0 px left of its start — a new spot).
- Pan drag: 100 px left drag moves pan 0 → 100; a 5,928 px drag clamps at
  4333.6 (wallW − W = 4334).
- Work drag: dragging work 1 by (+60, −40) moves it exactly (+60.0, −40.0).
- Token scan: no fillText/strokeText, createElement, AudioContext,
  getUserMedia, Path2D, gradients, or shadowBlur; the single "Math.random"
  hit is a comment stating it is never used.

No fix rounds needed.
