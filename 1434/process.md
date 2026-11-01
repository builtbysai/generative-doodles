# №1434 "Blake in Three Colours" (nikolaus-utermoehlen NU3, PP657)

A visionary Last Judgment scene — a radiant judge figure with raised arms
and halo rays, tumbling figures, descending winged hosts, and a cloud band
below — rendered three times over in translucent red, yellow, and blue,
the layers slightly shifted, so the figure is never single: it flickers,
pulses, and melts at the edges into pure pattern.

## Frame one (t = 0, boot flag, all three layers on)

Parchment ground with faint seeded speckle. The judge stands center, head
with halo ring and radiating rays, robe drawn as outline + fold lines,
arms raised. Six tumbling figures (head dot + body bar + limb ticks) fall
around the judge; four winged hosts (diamond wings + head dot) hover
above; a row of soft cloud dots runs below. All three colour layers are
fully on at frame one, so the overlap zone at the center is the most
active area. No visible text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- One procedural motif, drawn identically in each colour at its own
  registration offset (red −0.030/−0.020, yellow +0.030/−0.016, blue
  0/+0.030 of min(W, H)). The figures themselves never move.
- Combination sequencer, 24 s loop: triple 4.8 s, red+yellow 3.6 s, red
  alone 1.2 s (one beat only, per the prompt's "never alone for more than
  a beat"), yellow+blue 3.6 s, yellow alone 1.2 s, red+blue 3.6 s, blue
  alone 1.2 s, triple 4.8 s. Boundaries crossfade over 0.8 s via
  smoothstepped layer weights — slow rhythm only, never a rapid flash
  train, never a full-field polarity flip.
- Drag: pointerdown picks the layer whose motif centre is nearest the
  pointer; dragging shifts that layer's registration (clamped to 0.06 of
  min(W, H)); on release the offset decays exponentially (tau 4 s) back
  to the layer's base offset. A small drag rewrites the overlap pattern
  (faces into rosettes); a larger drag turns the scene toward ornament.
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas,
  no gradients, no shadowBlur, no Path2D, no createElement, no
  fillText/strokeText.

## Adaptations

- The judge's robe is outline + fold lines, NOT a solid fill: the first
  build filled the robe solid, and the triple overlap of saturated
  primaries at 0.55 alpha collapsed into a muddy gray-brown mass — the
  prompt's own "avoid" case. Line work keeps the interference in clean
  orange/violet/green crossings.
- Flicker comes from alpha compositing only, never from moving the motif.
- Fading alphas rounded to 4 decimals; dots as own-beginPath arcs
  (node-canvas quirks). Seeded mulberry32 (seed 1434000), never
  Math.random (the single grep hit is a comment stating so).
- Canvas sized from the Visual Viewport API, pinned in draw(); phone
  detection via window.screen with aspect fallback; centered composition
  keeps its shape on phones with the page ground in the piece's own
  parchment colour; verified at 390 wide with no clipping.
- Determinism: frame one = draw(0) via boot flag; clock starts only
  with the rAF loop (plain function declaration behind a typeof guard).

## Verification (forced-time probe harness, stubbed rAF + clock)

- Two fresh instances byte-identical at t = 0 (0 px diff).
- t = 24 vs t = 0: 0 px diff — the 24 s loop closes exactly.
- t = 6 (red+yellow pair) vs t = 0 (triple): 50,240 px differ.
- t = 9 (red-alone beat) vs t = 0: 88,988 px differ.
- Mid-drag (+60 px near centre) vs pre-drag at the same t: 78,829 px
  differ — the drag visibly rewrites the overlap.
- 20 s after release, vs a fresh instance at the same t: 12,282 px
  differ — the offset has decayed to ~0.46 px (exp(−5)), so only
  anti-aliasing edges still differ; the registration is effectively home.
- Renders inspected at 1280×900, 390×844, and 720×720; thumb
  byte-identical across repeated renders after the final fix.

## Fix rounds (1)

The robe first rendered as a solid trapezoid; its triple overlap read as
a muddy gray-brown mass. Rebuilt as outline + two fold lines; all renders
re-done after the fix.
