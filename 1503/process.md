# №1503 "Emptiness Where Bonds Form" (claire-atherton CA8, PP750)

Gallery date: 2006 · 02 · 22 (formula date; not shown in the piece).

## Prompt, as built

A flat field with a large empty circle at its centre. Around the circle,
small elements drift: a doorway shape, a tree shape, a figure, a road
segment, a window. None enters the circle. As they pass near it, thin gold
threads briefly connect pairs of elements across the empty centre — bonds
that exist only because the centre stays empty. Watch-first, orbit loop.
Dragging outward from the circle widens it (threads grow longer and
rarer); dragging inward narrows it (threads grow shorter and more
frequent). Drag never fills the circle, never places an element inside
it, never freezes an orbit.

## Palette (no other color)

- Field cream #e8e0d0 (also the page ground and the circle interior)
- Circle edge charcoal #2a2a30
- Elements: slate #4a5a7a (doorway, window), teal #2e6f6a (tree canopy),
  brick #a8674a (figure), walnut #6b4a3a (road segment, tree trunk)
- Threads gold #d9a441

## Composition

Empty circle centred, radius 0.25 × min(W, H) at rest (diameter half the
frame's smaller dimension, so the circle fits without clipping on
portrait phones too; on landscape frames the smaller dimension is the
height, matching the prompt's "about half the frame height"). Five
elements orbit outside the circle, small (about 0.055 × min dimension),
nothing else on the field. Element shapes are flat abstract marks:
doorway = slate frame with cream opening; tree = walnut trunk with teal
canopy disc; figure = brick head, torso, and legs; road = walnut bar
with a cream centre line, tangent-oriented; window = slate frame with
cream panes and slate muntins. No visible text except `<title>`.

## Orbiters (seeded mulberry32, seed 1503000; phases in radians)

| element | revs per 60 s loop | orbit gap beyond circle radius | phase |
|---|---|---|---|
| doorway | 1 | 0.110 U | 3.3564 |
| tree | 2 | 0.150 U | 4.7735 |
| figure | 3 | 0.125 U | 5.8870 |
| road | 4 | 0.180 U | 0.5959 |
| window | 5 | 0.095 U | 5.4802 |

U = min(W, H). Every revolution count is an integer per loop, so every
angle returns exactly at t = 60 s. Orbit radius = circle radius +
element gap, so elements stay outside the circle at every radius: the
minimum element-centre clearance beyond the circle radius measured
68.4 px on a 720 canvas, and zero elements were ever inside the circle
in any probe (including after a maximum widening drag).

## Threads

A thread is drawn for a pair whose angular separation is within 0.32 rad
of exact opposition: alpha 1 while within 0.10 rad, tapering linearly
to 0 at 0.32 rad, drawn at 0.9 × alpha as a thin gold line
(lineWidth max(1, 0.004 U)) from element to element, under the elements
so endpoints tuck beneath them. Only the single strongest bond is ever
drawn at once (see fix round 1). Threads are present in 149 of 241
samples taken every 0.25 s across the loop, never more than one at a
time, and vanish between bonds — bonds exist only because the centre
stays empty; the circle itself is never filled, only edged in charcoal.

## Drag-to-radius mapping

Pointer down records the current radius and the pointer's distance from
the centre; each pointer move records a segment {t, r} with
r = clamp(anchorR + (dist − anchorDist) × 0.5, minR, maxR).
Radius at piece time t is the last recorded segment at or before t, or
the base radius if none — a closed-form function of recorded events,
never frame-integrated state, and it persists after release (no spring
back). On a 720 canvas: base 180 px, min 129.6 px (0.18 U), max
244.8 px (0.34 U). Because orbit radii are circle radius + gap,
widening the circle pushes the orbiters outward too, so threads between
opposite pairs grow longer; narrowing pulls them in, so threads grow
shorter and oppositions come round more often. A huge outward drag
clamps exactly at maxR. Drag never fills the circle, never moves an
element inside it, and never stops the orbit (positions at t = 10 vs
t = 11 after a drag still differ).

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style
  width/height in px. Phone detection via window.screen with aspect
  fallback; field-like composition is full-bleed at 390 wide, no
  clipping, page ground is the piece's own cream.
- Determinism: synchronous first frame draw(0); rAF loop is a plain
  function declaration, clock anchored on the first rAF call; every
  animation angle runs on loop-local time (t mod 60); no unseeded
  random anywhere visible; reseeding uses mulberry32(1503000).
- Fully silent: no AudioContext at all. No offscreen canvas, no
  Path2D, no gradients, no shadowBlur, no ctx.filter, no
  document.createElement, no WebGL, no getUserMedia, no localStorage
  (grep-verified). Fading alphas rounded to 4 decimals; dots are
  own-beginPath arcs with moveTo first (node-canvas quirks).
- Never click-to-reload / click-to-restart; drag is the only
  interaction. Abstracted figures and landscapes only; no likenesses,
  no real names, no readable text, no violence.

## Probes (forced-time harness, vm-isolated instance, real node-canvas,
piece driven via window.__piece)

- Loop closure: PNG at t = 60 and t = 120 byte-identical to t = 0.
- No element inside the circle: 0 violations across t = 0–60 s in
  0.5 s steps, before and after drags.
- Threads: max 1 simultaneous (after fix 1); present in 149/241
  quarter-second samples; fine track around t = 2.25 shows alpha
  ramping 0.20 → 1.0, holding, then handing to the next bond.
- Drag: outward drag at t = 5 raised radius 180 → 244.8 px; inward
  drag lowered it to 145 px; huge outward drag clamped exactly at
  maxR 244.8 px; orbit still advances after drags.
- Thumb byte-compare: thumb.png re-rendered twice after the final
  fix; all three renders byte-identical (cmp clean).
- Renders inspected: desktop 1280×800, mobile 390×844, thumb
  720×720, and a mid-loop frame at t = 2.25 showing one thin gold
  thread unbroken across the empty centre.

## Fix rounds (2)

1. Simultaneous threads read as a web. The first probe found up to 6
   threads at once (five orbiters can approach opposition together).
   Fixed by drawing only the single strongest bond at a time: the
   prompt forbids threads forming a net or web, and bonds still occur
   between many different pairs over the loop, just never together.
   All probes re-run after the fix.
2. Thread erased inside the circle. Threads were first drawn before
   the circle fill, so the fill covered the middle of every thread
   and only stubs showed outside the ring. Fixed by drawing the
   circle fill and edge first, then the threads, then the elements:
   the mid-loop frame now shows one unbroken gold line across the
   empty centre. Thumb re-rendered and byte-compared after the fix.

## Deviations from the prompt

None, except documented house-rule adaptations: the circle diameter is
0.5 × min(W, H) rather than literally 0.5 × frame height, so it does
not clip on portrait phones; the single-strongest-thread rule (fix 1)
is the prompt's own "never a net or web" avoidance applied to the
five-orbiter case. No audio, no text, no filled centre, no element
ever inside the circle.
