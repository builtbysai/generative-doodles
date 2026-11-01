# No.1405 "Sound Segregations" (alison-odaniel AO6, PP628)

A domestic scene turned inside out: a room's walls flattened into a diagram
where sound arrives as physical objects. Cut-out steel glyph-words drift in
through the window at upper left like weather and settle around the
furniture; a plane shadow sweeps the floor on a strict two-minute cycle and
the room's objects shiver as it passes; dust settles as a visible ochre
layer along the bottom edge, thickening through the cycle and resetting
when the cycle turns. Dragging a settled word lifts it back into the air,
where it drifts and re-settles elsewhere.

## Palette and composition

Wall cream #e8e2d4, floor #d5cdb6, window blue #7a9ab0, steel gray #8a8f94,
plane shadow #4a4a44, dust ochre #c89a5e. The room is a flat elevation:
window upper left (the source of everything), table, chair, shelf, and
sideboard as flat diagram furniture. Seven steel glyph-words hang in the
room at varied depths. No readable text anywhere except `<title>`: the
words are cut-out pseudo-script letterforms (chevrons, arcs, crosses,
hooks, bars, dot pairs, triangles, zigzags), never readable sentences.

## Motion, all closed-form over piece time and recorded events

- Words: each word drifts on a 150 s schedule, staggered 23 s apart. Round 0
  drifts in from the window point; later rounds drift from the previous
  settle point to a new seeded settle point (seed 1405000 + word x 7919 +
  round x 104729), with a smoothstep ease, a small arc lift, and a tumble
  rotation. Between drifts a word sits settled. Frame one is unshifted
  piece time, so the mix reads immediately: one word still at the window,
  one nearly arrived, the rest settled.
- Plane shadow: a flat-alpha band (alpha 0.22) sweeps the floor on a fixed
  120 s timer (cycle time = piece time + 45 s, so frame one already shows a
  partial dust layer). The band crosses during cycle seconds 100-112;
  during the crossing, furniture and words shiver on small closed-form
  sine offsets (amplitude up to 1.6 px, envelope-shaped).
- Dust: a flat-alpha ochre band along the bottom edge whose height grows
  with cycle progress (up to 7% of frame height), with seeded stipple dots
  inside it. During cycle seconds 112-120 the band fades out, then resets
  to zero at the cycle turn.
- Drag: pointerdown near a word (within 60 px) picks it up; it follows the
  pointer while dragged. On release (movement >= 14 px) it interpolates
  over 3 s to a new seeded settle point (seeded by word + drag count) and
  stays there until its next scheduled drift, which then departs from the
  manual settle point, so no pop ever occurs.

## Adaptations

- The prompt's "drift physics" and "accumulating bottom gradient" become
  closed-form drift paths and a flat-alpha dust band (never gradients,
  which the QA renderer handles unreliably).
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement, no fillText or
  strokeText anywhere, so no readable text can leak in.
- Node-canvas quirks honored: every computed alpha is rounded to 4
  decimals before stringifying (scientific-notation alphas parse as
  opaque in node-canvas); dots are filled rects; every arc gets its own
  beginPath with a moveTo to the arc start.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window, pinned in draw(); phone
  detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; the centered flat-elevation composition keeps its
  shape on phones with the page ground in the piece's own background
  color. Determinism: synchronous first frame at constant phase via a
  boot flag (frame one = draw(0), clock starts only with the rAF loop);
  all randomness from seeded mulberry32, never Math.random; the rAF loop
  is a plain function declaration (a named function expression followed
  by requestAnimationFrame would throw ReferenceError in a real browser).

## Verification

Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness
(stubbed rAF driving the piece's own loop, pointer events to its own
listeners, 1280x900):

- Two fresh instances render byte-identical frame-one images.
- Dust: ochre pixels in the bottom band grow 29,279 (t=0) to 49,676 (t=30)
  and reset to 0 at the cycle turn (t=75).
- Word drift: steel pixels in the window zone fall 788 (t=0) to 0 (t=12)
  as the entering word leaves the window.
- Plane shadow: floor mid-right mean red drops 213.0 (t=55, no shadow)
  to 182.0 (t=61, band mid-floor).
- Drag: after a 120 px drag on a settled word, steel pixels near its old
  settle fall 553 (control) to 0 (dragged) while pixels near its new
  seeded settle rise 248 (control) to 791 (dragged) — the word left and
  re-settled elsewhere.

No fix rounds needed.
