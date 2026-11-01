# №1392 "Physiological Flicker" (zack-khalil ZK1, PP615)

A dark field where a single procedural form — a seeded nine-vertex
polyhedron with facet chords and an inner hub echo — is only fully
visible in strobe. The image pulses in and out of existence at a
flicker rate the piece controls, like frames torn out of reality.
Long dark holds, then brief illuminations; the edges of each flash
leave a decaying after-image ghost. The form never moves, only the
light does.

## Palette and composition

- Strobe white #f2f0e8, phosphor amber #e0962a, void black #0a0a09,
  after-image teal #2e8f86.
- The form is centered and large (radius 38% of the smaller viewport
  dimension). No visible text except `<title>`.
- Centered composition keeps its shape on phones; the page ground
  takes the piece's own background color. Checked at 390 wide with
  no clipping.

## Motion

- Seamless loop. The flicker rate breathes between ~6 Hz and ~12 Hz
  (the alpha band of the Dreamachine) on a slow 24 s cycle:
  baseRate(t) = 9 + 3·sin(2πt/24 − π/2).
- The strobe envelope is a smooth partial-contrast pulse train:
  each cycle rises over 10% of the cycle, holds briefly, and falls
  over 14% of the cycle (smoothstep edges, duty ~0.28–0.42).
  Form alpha runs from a 0.18 floor to a 0.72 ceiling, so the image
  is never fully dark and never full white-on-black.
- After-image ghosts: each flash peak (envelope crossing 0.9
  upward) is recorded; ghosts are the same polyhedron drawn in teal
  at a scale growing 1 + 0.12·age, with alpha fading over 1.4 s.
  Ghosts are stored history redrawn each frame, never canvas-fade.
- Dragging left/right shifts the rate (drag dx × 0.02 Hz, decaying
  with tau 8 s so the loop resumes). The rate clamps to 4–14 Hz.
  Above 10.5 Hz the palette desaturates toward grey as the
  high-end warning (desatAt). No click actions, never click-to-reload.

## Adaptations

- Photosensitivity safety first, per the prompt itself: the strobe
  is partial-contrast by construction (never full white-on-black,
  never a hard cut — the envelope is smoothstep-continuous), and
  the rate caps at 14 Hz, following the Conrad precedent.
- The prompt's offscreen buffer becomes a seeded procedural redraw
  each frame: the QA renderer provides no offscreen canvas, so the
  polyhedron is drawn from its fixed seeded vertex set every frame.
- Sub-bass is gesture-gated only: no AudioContext exists until the
  first pointerdown, and blips sound only while the pointer is held
  down, one soft 55 Hz sine pulse per flash peak. The piece is
  fully visual without audio. No getUserMedia/microphone anywhere.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  fillText/strokeText, or localStorage. No readable words anywhere.
- Determinism: frame one is draw(0) via a boot flag (clock starts
  only with the rAF loop, plain function declaration behind a
  typeof guard). All randomness comes from mulberry32 seeded
  1392000 (vertex radii/angles, facet chords); Math.random is never
  used. Canvas size comes from the Visual Viewport API with window
  size only as fallback; canvas is pinned in draw(); phone
  detection uses window.screen physical size with the aspect
  fallback.

## Fix rounds

1. The QA renderer provides no `document.body`: the body-background
   line is now guarded by a typeof/document.body check.
2. Scientific-notation alpha bug (found by forced-time probing):
   when a ghost's age landed within floating-point epsilon of its
   1.4 s expiry, its alpha stringified in scientific notation
   ('2.5e-15'), which the QA renderer's color parser misreads as
   OPAQUE — producing a one-frame opaque teal flash once per
   ~9 frames. Fixed by rounding every alpha to 4 decimals in
   rgb(), so such alphas become exactly 0 ('rgba(...,0)'),
   transparent in every parser. Verified: the teal-spike frames
   are gone from the forced-time series, and the strobe, drag
   response, and frame-one image are unchanged. Lesson worth
   carrying forward: any fading alpha that can fall below ~1e-6
   must be rounded before stringifying, or the QA renderer will
   paint it opaque.

## Verification (forced-time probe harness)

The harness stubs rAF, drives the piece's own loop at controlled
timestamps, and fires pointer events at its own listeners
(1280×900 canvas for probes, 640×480 for the pixel series):

- Frame one: form visible at partial illumination (max channel
  199, never full white), 0 teal pixels (no ghosts yet), no text.
- Flash rate: 14 peaks in a 2 s window at t = 2–4 s (baseRate
  ~6.4–7.5 Hz there); at t = 10–12 s, 24 crossings at exact
  0.083 s intervals (12.0 Hz, matching baseRate 11.6–12.0).
- Drag: a 3000 px rightward drag moves the 2 s peak count from
  14 to 28 (rate clamped at the 14 Hz ceiling).
- Ghosts: teal after-image pixels present after flashes and
  tracking flash history; ghost-only variant confirms the
  underlay is the stored-history ghost field.
- Stroke train (near-grey bright pixels) confirms a single
  ~7 Hz flash train at t ≈ 3–4 s; the earlier double-train
  reading was a metric artifact of the ghost tint pushing fill
  pixels across the brightness threshold, resolved by the
  stroke-only measurement and the alpha-rounding fix.
- Token scan: no getUserMedia, createElement, Path2D, gradients,
  shadowBlur, fillText, or strokeText. The single Math.random
  hit is a comment stating it is never used. AudioContext
  references exist only inside the gesture-guarded ensureAudio.
- Renders inspected at 1280×900, 390×844, and 720×720. Thumb
  renders byte-identical across repeated renders.

## Files

- index.html (md5 74fd89a26246a881f7afe5f8fa098f1e) — self-contained,
  no external assets.
- process.md (this file).
- thumb.png (720×720), qa-desktop.png (1280×900),
  qa-mobile.png (390×844).
