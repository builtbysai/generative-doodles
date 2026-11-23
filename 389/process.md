# №1142 — Unread Characters

kimchi and chips study block KC7 (2023–). A lens-array light panel in the spirit of
their Unread Characters series: Mimi Son's handwriting, encoded as a light field,
decoded only at an angle.

## The piece

A dark panel (#05060A) of 300 frosted lens cells (20 × 15) hangs on a pure black
wall. Each cell holds one warm-white bokeh spot (#F5EDDC) behind glass (#0E141C)
with a faint rim (#2A3542). Hidden in the field is a single line of hand-drawn
text, in the spirit of Yi Sang's "Crow's Eye View":

> the crow's eye counts the unlit windows

Head-on, the line is not there. Stroke alpha is a Gaussian of the viewpoint's
x-tilt against a hidden encoding angle (σ = 4.2°), so at rest the strokes sit at
exp(−16) ≈ 0 and the frame shows only bokeh. Drag to tilt the viewpoint (up to
±35°): each cell carries its own small sweet-angle offset (±2.4°), so the line
resolves in a sweep across the panel as you pass the angle, the bokeh dimming
where the strokes surface, then dissolves again past it. The characters are
hand-authored stroke polylines — per-glyph polylines with seeded jitter, uneven
baselines and per-character scale wobble — never a font (there is no fillText
anywhere in the file).

## Interaction

- **Drag** — tilt the viewpoint. Dots parallax by their per-cell depth seed;
  legibility follows the x-tilt. Release and the viewpoint springs back to
  head-on rest (critically damped spring, folded analytically over recorded
  target events; idle sway is ±2°, never near the angle).
- **Tap** — hold the current viewpoint for 6 seconds, then it releases.
- **Double-tap** — re-encode: the cell field re-scrambles (dot jitter blooms and
  decays over ~1 s) and the same line re-encodes at a new readable angle
  (13–29°, either side). Find it again.
- No instructions are shown anywhere. Discovering the angle is the piece.

## Sound (Franke rule)

Visuals are complete silent. On the first visitor gesture only, a typeof-guarded
WebAudio layer starts: a looped noise buffer through a narrow bandpass as a
granular shimmer whose gain follows mean legibility (max 0.02), and one quiet
struck sine (587 Hz, gain 0.045) the first moment mean legibility crosses 0.8.
Never autoplays; no microphone.

## House rules applied

- Canvas sized from the Visual Viewport API, resize listeners on visualViewport
  and window; CSS size pinned in fit(). Phone detection via window.screen
  (min < 700) with aspect fallback; dots and stroke weight scale up on phones.
- Determinism: synchronous first frame at fixed phase T0 = 6 s, head-on — pure
  bokeh, nothing to read. rAF guarded by a typeof check, anchored at T0.
  All state is recorded events evaluated in closed form (spring folding,
  encoding events); nothing is frame-integrated.
- No gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no
  createElement, no fillText. Every bokeh circle is drawn on its own path
  (node-canvas ellipse quirk). Dots and strokes are clipped to the panel rect,
  so parallax never spills light past the rim.

## QA

- qa-desktop.png (1280×800): head-on — 300 frosted cells, warm bokeh of varied
  size and brightness, no readable text.
- qa-mobile.png (390×844): same field, denser relative scale, no text.
- thumb.png (720×720) rendered twice and byte-compared: identical.
- Sweet-angle probe: a probe render with the tilt forced to the encoding angle
  (+18°) showed the full line clearly legible in glowing hand-drawn strokes,
  bokeh faded to ghosts, resolution sweeping per cell as designed. Probe copy
  deleted after inspection.
