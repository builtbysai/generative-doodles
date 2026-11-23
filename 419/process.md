# №1351 "Kinetic Scroll" — eric-gottesman EG8 (PP574)

## The piece

A plywood frame holds three vertical etched-acrylic panels (left third) and a
scroll of cotton (right two-thirds) that unrolls left-to-right. As the scroll
advances, pigment-print bands reveal — deep indigo, rust, moss — and a crimson
thread stitches across them in long basting curves, binding the panels into
one continuous textile. The motor is the viewer: the scroll advances ONLY
while the pointer is moving; idle, and it holds. The scroll never runs out.

Palette (verbatim from the prompt): plywood #A87F4E, plywood edge #7A5A34;
acrylic #CFE0E8 at 40% alpha with etched hatch lines #8AA0B0; cotton
#EFE8D8; pigment bands #2E5A7A (indigo), #C86A3A (rust), #3E6B4A (moss);
thread #A02C2C; ground #171512. Frame occupies ~84% of frame, landscape;
acrylic panels: 3 vertical, left third; scroll: right two-thirds, unrolling
horizontally; thread path spans the full scroll width; pigment bands run the
scroll's length in 3 horizontal stripes; nothing outside the frame except a
soft shadow (one flat-alpha offset rect, never shadowBlur).

Interaction: pointer-move = the motor (scroll offset advances proportional to
pointer velocity, capped per event); pointer idle > 2 s = scroll eases to a
stop, thread needle "parks" (needle sits at its station, angle relaxes from
-0.35 rad while feeding to 0.15 rad at rest). TAP = a thread color shift
(crimson → indigo → moss → crimson, cycling). Tap vs drag separated by a
12 px movement threshold.

## Procedural bands and the endless scroll (adaptation)

No pre-rendered band buffer, no offscreen canvas (the QA renderer has none).
Scroll content is never stored: any scroll-space position maps to a segment
by pure function — segment length 260 scroll-px, segment (row, k) seeded by
mulberry32(1351000 + row·7919 + k·104729). Each of the 3 stripe rows is
dominated by its home pigment (indigo / rust / moss top to bottom) with a
25% seeded chance of one of the other two, plus seeded alpha, grain flecks,
and occasional accent slivers. Because content is a function of scroll-space
position, revealed sections recycle as new seeded bands ahead and the scroll
can never reach an end.

## The motor, closed-form (adaptation)

Pointer velocity is never frame-integrated state. Each pointermove event is
recorded with its piece time and capped displacement (±90 scroll-px); the
offset at time t is O0 + Σ dxᵢ·(1 − exp(−(t − tᵢ)/0.35)), so the scroll eases
in after each move and settles exactly as the exponentials saturate. Idle
holds to within antialiasing rounding (see probes). The needle station sits
at 55% of the scroll width: the needle stitches cloth as it feeds past, so
frame one shows the thread stitched partway across the scroll, and the
stitched region always reads from the scroll's left edge to the needle.
Thread dashes live in scroll-space (dash 26 px / gap 14 px of a 40 px cycle),
so stitches travel with the cloth.

## Study-wide rule

No readable text anywhere on screen: bands are color fields, stripe rows are
pigment, acrylic etchings are hatch lines plus abstract arcs/dashes/dots —
never letterforms.

## House-rule compliance

- Canvas size from Visual Viewport API + resize listeners on visualViewport
  and window; canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect h > w·1.15 fallback; centered landscape composition keeps its shape
  on phones, page ground takes the piece's own background color.
- Determinism: synchronous first frame at constant phase via boot flag
  (frame one = draw(0), clock starts only with the rAF loop); all randomness
  from seeded mulberry32, never Math.random. rAF loop is a plain function
  declaration behind a typeof guard.
- Silent: no AudioContext, no microphone, no gradients, no Path2D, no
  createElement, no offscreen canvas. (One comment mentions shadowBlur only
  to state it is not used.)

## Verification

- Rendered at 1280×900, 390×844, 720×720 with render-piece.js; all three
  inspected. Frame one: plywood frame, three hatched acrylic panels, scroll
  with three pigment stripe rows, crimson basting thread stitched to the
  needle at ~55% of scroll width. Mobile keeps the same landscape
  composition as a centered band.
- Thumb renders byte-identical across repeated renders and matches the
  shipped thumb.png.
- Probe harness (drives the piece's own pointer listeners through its rAF
  loop): frame one → 1 s of pointer travel changes 244,496 px (scroll
  feeding); 1 s → 4 s changes 30,736 px (still easing); 4 s → 8 s idle
  changes 0 px by more than 4/255 per channel (2,459 edge pixels differ by
  ≤4 — antialiasing rounding on the exponential tail, visually stopped);
  a tap after settling changes 1,975 px, confined to the thread/needle
  (crimson → indigo color cycle).
- md5 of index.html: 65065df563235284c153e8121f7e1c27
