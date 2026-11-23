# №1369 "Xawiska Protocol" — sky-hopinka SH2 (PP592)

A ghost-flower myth that writes itself. After Sky Hopinka's *Fainting Spells*:
because no origin myth exists for the Xąwįska plant, the piece writes one —
a pale Indian-pipe plant grows center-low on a dark forest floor, a
handwritten poem in invented script scrolls across the upper third at camera
speed, a cloaked figure crosses in varying states of opacity, and the film
ends with small lights rising from the ground into the sky. Then the plant
regrows, and the myth retells itself.

## What you see

- Night sky (#050705) with a seeded star field; dark forest floor (#141A14)
  from 0.78H down, with faint seeded texture dots.
- Two poem bands in the upper third: a ghost-white row at 0.22H scrolling
  left at 6 px/s and a fainter spirit-blue row at 0.30H scrolling at 4.2 px/s.
  Every mark is an invented glyph (bar+dot, chevron, open arc, zigzag, loop,
  dot pair, wave, open triangle, arc+dot, double tick) — never a letter,
  never a readable word.
- The ghost flower, center-low: a translucent ghost-white stem with a
  drooping bell head, ringed by drifting spore-gold motes. No botanical
  realism — flat shapes, one stem, one bell.
- A cloaked figure silhouette crossing the frame, drawn behind the plant
  (foreground plant, background figure), in varying opacity per crossing.
- The ascent finale: 44 seeded lights in spore-gold, spirit-blue, and
  ghost-white rising from the ground into the upper half, each with a soft
  halo, then the plant fades and regrows.

## The loop (120 s, phase-shifted +24 s)

Frame one is 24 s into the loop, so it already shows a young plant
(growth ≈ 0.32) and a cloaked figure mid-crossing, rather than an empty
field. Growth runs 0–60 s (eased), the plant stands mature 60–100 s, the
ascent finale fills 100–115 s, the plant fades 115–120 s, and the loop
wraps to regrowth. Cloaked crossings run on their own ~25 s clock
(12 s crossing, alternating entry side, opacity from a seeded sequence
of "states of consciousness"), independent of the loop.

## Interaction

Watch-only, by the prompt's own rule (a myth is witnessed, not operated).
The script registers resize listeners only — no pointer, touch, mouse, or
click handlers of any kind, and nothing ever reloads.

## Adaptations

- L-system growth is a closed-form function of piece time (eased growth
  parameter + sine sway), not a frame-integrated simulation, so every
  frame is a pure function of time and the first frame is reproducible.
- The poem band is seeded glyph functions drawn on the main canvas each
  frame (no pre-rendered glyph-ribbon texture buffer); positions wrap
  closed-form with the scroll speed.
- The cloaked figure is a flat silhouette (no face, no detail), filled
  slightly lighter than the night sky (#1A2018 vs #050705) so it reads
  against it — sky-black on sky-black was invisible in the first probe,
  the same lesson as the Tremble Staves bird. It is drawn behind the
  plant: an early render had the figure veil the bell at frame one, so
  the draw order was changed to foreground plant / background figure.
- Ascent lights are seeded once and rise closed-form (delay + duration
  per light, fade in/out over the rise), drawn as fading segments with
  halos — never canvas-fade, never per-frame random.
- No audio at all. The prompt specs no sound; nothing autoplays.
- No offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  createElement, no localStorage, no getUserMedia, no device-locale
  reading. All randomness is mulberry32 (seed 1369000 + index·7919),
  never Math.random. The rAF loop is a plain function declaration behind
  typeof guards; frame one is draw(0) drawn synchronously, and the clock
  starts only with the rAF loop.

## Phone presentation

Centered composition keeps its shape on phones; the page ground is the
piece's own night color (#050705). Phone detection via window.screen
physical size (min dimension < 700 px) with the aspect fallback; canvas
sized from the Visual Viewport API and pinned in draw(). Verified at
390 px wide with no clipping.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 with the QA renderer and
  inspected all three; thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  real node-canvas rasterizer): center-strip ghost pixels 330 at t=0
  (young plant + bell over the figure), 1228 at t=36 (mature plant),
  71 at t=96 (regrowth sprout); figure-band difference t=5 vs t=13 is
  3871 px (figure present mid-crossing, gone between crossings);
  upper-half bright pixels rise 2692 → 3534 from ascent start (t=76)
  to mid-ascent (t=83). Probe renders inspected: t=83 shows the upper
  half filled with rising gold/blue/white lights; t=92 shows the mature
  plant still standing, slightly dimmed in its fade (a strict
  brightness threshold undercounts it; visually confirmed present).
- Token scan clean except the two sanctioned typeof-guarded
  requestAnimationFrame lines; listener list is resize-only.
