# №1526 — The Assembly Before the Solo (bintou-dembele BD7, PP773)

Gallery date: 2006 · 03 · 17 (recorded here only, never drawn in the piece).

## Spec

A wide field of small seated-mark glyphs (short vertical lines with a dot)
arranged in a loose circle, facing inward — an assembly. In the center, one
dancer-mark stands alone and moves slowly, its gestures answered by a ripple
through the circle: when it raises an arm-line, the nearest seated marks tilt
slightly, the tilt traveling around the ring like a wave. After a long solo,
the center mark sits down at the circle's edge and a different mark rises to
the center.

Palette: field warm dark #221e20; seated marks muted taupe #8a7a6a; center
mark bright ochre #c98f3d; ripple highlight pale bone #e0d6c0; ground line
faint #3a3238. No other color.

Composition: circle of seated marks large, centered; solo mark small in the
middle; generous dark margins outside the circle.

Motion: watch-first, assembly loop. Solo lasts a long interval, then the
exchange of places happens slowly, without a break in the ripple. Dragging on
the center mark extends its solo (the exchange waits); dragging on a seated
mark raises it early (it becomes the next soloist when the current one sits).
Drag never empties the circle, never adds a mark, never stops the ripple.

Technical: canvas 2D. Seated marks as a ring array with tilt values; solo mark
as an articulated glyph with a gesture sequencer; ripple as a traveling tilt
wave around the ring triggered by solo gestures; drag maps to solo timer or
next-soloist selection.

Avoid: an audience facing a stage, applause marks, a spotlight, text, a
microphone shape.

## Build

- 120 s loop. Solo phase 0–100 s; exchange phase 100–120 s (exchange start
  shifts later when the center mark is held, always completing at the loop
  end so the loop closes exactly).
- 24 seated marks on a ring (radius 0.38 × min dimension, 0.42 on phones).
  Each seated glyph is a short vertical line with a dot, drawn with its up
  direction pointing at the center, so the ring faces inward.
- Soloist: articulated glyph (torso + dot + arm lines + leg lines) in bright
  ochre, swaying gently around the center on closed-form sines with periods
  60 s and 40 s (both divide 120 s).
- Gestures at loop-local 5, 15, …, 95 s, cycling left arm / right arm / both
  arms. Each gesture raises the arm over 0.5 s, holds 2 s, lowers over 0.5 s,
  and triggers a tilt ripple: a Gaussian tilt wave traveling
  counter-clockwise around the ring (full circle in 8 s) with exponential
  decay. Seated marks with |tilt| above 0.18 are drawn in the pale-bone
  ripple highlight. A low ambient ripple (amplitude 0.05) runs throughout, so
  the ripple never fully stops, including during the exchange.
- Exchange: the old soloist travels from the center to the rising seat while
  that seat's mark travels to the center, both eased over the exchange window.
  A unified glyph morphs between the two roles (arms/legs scale with the
  morph parameter, color blends between the two specced colors), so the shape
  change is smooth and the frame at the loop end is byte-identical to the
  frame at the loop start. Total marks stay 25 throughout (24 seated + 1
  soloist in the solo phase; 23 seated + 2 traveling in the exchange).
- Next soloist: seeded mulberry32, seed 1526000, advancing per loop
  (loop 0 → seat 5, loop 1 → seat 6, …), never Math.random. Because glyphs
  are identity-agnostic, the frame at every loop boundary is identical even
  though a different seat rises each loop.
- Drag: pressing the center mark (within 70 × scale px) starts a hold
  session; the exchange start is recomputed in closed form from the recorded
  sessions (a hold ending before the exchange delays it by its duration; a
  hold straddling the exchange resumes it after release), capped so the
  exchange always completes by the loop end. Pressing a seated mark (within
  34 × scale px) selects it as the next soloist for the upcoming exchange
  (or the following loop's exchange if pressed during an exchange).
- Fully silent. No AudioContext, no getUserMedia, no gradients, no canvas
  fade, no visible text except the title. Canvas 2D only; rAF loop is a
  plain function declaration; frame one is draw(0) at a constant phase.
- Probe-only hook: window.__t26 exposes loop, tau, exchange start, phase,
  next seat, counts, max tilt, peak seat, solo position, and seat positions
  for pixel sampling. It draws nothing.

## Deviations and readings

- None beyond documented house-rule adaptations (canvas 2D, closed-form
  motion over loop-local time and recorded drag sessions, flat colors,
  fully silent) plus these recorded conventions:
  - Head-arc turn: the soloist's gesture is an arm raise (the prompt's
    "raises an arm-line"); arm angles interpolate from a resting diagonal
    to a raised diagonal, since the prompt does not specify turn geometry.
  - Drag target row/seat: pressing a seated mark selects it; it becomes the
    next soloist when the current one sits, per the prompt's parenthetical.
  - Look-away / ripple origin: each gesture's ripple starts at an origin
    angle stepping by the golden angle per gesture, traveling
    counter-clockwise; the whole ring carries the wave, peaking at the
    wavefront.
  - Seated glyph orientation: the dot end points toward the center, so the
    ring visibly faces inward (fixed after the first render showed dots
    pointing outward).
- Fix rounds: 1 piece fix (seated glyph rotation corrected from outward to
  inward, all renders re-done after the fix). No probe-side changes were
  needed after the final piece.
- QA: probe-1526.js, 29/29 checks pass (frame-one identity, loop closure at
  t=120 and t=240, ring structure, ripple strength and travel, exchange
  counts and completion, per-loop next-soloist change, center-hold exchange
  delay, seated-drag next-soloist selection, constant 25 marks). Thumb
  re-rendered twice, both byte-identical to the shipped thumb.
