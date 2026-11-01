# №1375 "Lost in the Rain" (sky-hopinka SH8, PP598)

A 45-record structure: the piece has an A-side and a B-side, flipped by
dragging vertically across the screen like turning a record. Frame one is
the A-side.

## A-side

Rain over a highway landscape: rain-grey sky, layered translucent hill
silhouettes (the "layers of experiences" overlaid between landscape images),
a shoulder strip, and a wet-asphalt road band with dashed center line. A
pair of headlight glows drifts across the road. Rain falls downward as
stored-history streak segments.

## B-side

The same landscape at night, stranger: night-rain ground, a peyote-meeting
circle of seven small fires (flat-alpha teardrop flames with ember glows,
flickering on seeded phases), and a lone figure in figure-bone walking
rightward, head bowed, against the rain's slant — the rain slants left as
it rises, so the figure walks into it. Rain falls upward: drops rise and
wrap from the top edge to the bottom.

## The flip

Drag vertically: the target side is revealed by a vertical wipe that
follows the drag (downward from A reveals B from the top; upward from B
reveals A from the bottom). On release, a drag past 35% of frame height
commits — the wipe completes over 0.6 s with a brief vinyl crackle flash
(flat-alpha speckles flickering during the wipe) and the palettes settle on
the new side. A shorter drag springs back over 0.5 s. The side indicator is
a thin pulsing label-circle at the right screen edge, headlight-pale on A,
fire-orange on B — no words, never A/B letters, nothing readable anywhere
except `<title>`.

## Adaptations (from the brief and house rules)

- Rain as stored-history streak segments: each drop's position is a
  closed-form function of piece time (seeded origin, speed, slant; modulo
  frame height, sign flipped per side), never canvas-fade, so the QA
  renderer paints one correct frame.
- The flip as a closed-form vertical wipe over recorded drags, with
  spring-back on short drags and committed crossfade on long ones.
- The vinyl crackle flash is VISUAL only (flat-alpha flicker).
- The prompt's A-side road-drone and B-side detuned pulse are refused as
  autonomous audio: the piece ships fully silent, the side structure
  carried by rain direction and palettes. No AudioContext exists in it.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  getUserMedia, or microphone anywhere. No readable English anywhere.
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style
  width/height in px; phone detection via window.screen physical size
  (min dimension < 700 px) with aspect fallback; the composition is
  full-bleed on every size.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1375000 + index × 7919), never
  unseeded randomness. Thumb renders byte-identical across repeated
  renders and shows the A-side.

## Verification

Probe harness (stubbed rAF driving the piece's own loop, pointer events
to its own listeners, pixel sampling at 1280×900):

- Frame one: sky pixel exactly rain-grey (122,131,140), road pixel exactly
  wet asphalt (58,63,69).
- Rain falls on A: drop 0 moves y 131 → 785 in 1 s (its seeded speed,
  654 px/s); its old streak position returns to exact sky colour.
- Mid-wipe (drag held at 50%): top pixel night (11,14,20), bottom pixel
  asphalt — the wipe reveals B from the top while A holds below.
- Committed drag (dy 500 > 315 threshold): after the 0.6 s animation the
  sky is night (11,14,20), ground is night ground (18,22,29), and the
  fire-circle region holds 841 fire-orange pixels.
- Rain rises on B: drop 0 moves y 377 → 623 in 1 s, which is 377 − 654
  modulo 900 — it rose past the top edge and wrapped, as specced.
- Short drag (dy 100 < 315) springs back: sky still rain-grey, still
  A-side.
- Code scan: no fillText/strokeText, no createElement, Path2D,
  AudioContext, getUserMedia, gradients, shadowBlur, or unseeded
  randomness.

Renders inspected at 1280×900, 390×844, and 720×720. Desktop and mobile
both show the A-side full-bleed with no clipping; the label-circle sits
at the right edge in headlight pale.
