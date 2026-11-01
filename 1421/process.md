# №1421 "Pretty / Ugly" (thomas-mader TM6, PP644)

## Prompt
A single hand shape, held still in the center of the frame, while the face
behind it changes — neutral, then pleased, then extreme — and the background
color intensifies with it, so the same sign reads first as one word, then as
its opposite, with nothing but the face having moved. One sign, two meanings,
face alone decides (Find Face 2021–22; native vs. learner fluency).

## What it is
A centered face drawn in simple lines on a flat field, with one large hand
shape fixed over its center. The face cycles neutral → extreme → neutral
over a seamless 40 s loop while the hand never moves: the control in the
experiment. As intensity rises, the brows slant harder, the eyes open wider,
the mouth opens, the blush deepens, the face lines thicken, an extreme
shadow gathers behind the face, and the background grades from pale paper
(#e8e2d4) to full red (#b01e24). At the extreme end the background hits full
red, then the cycle relaxes back. Dragging the face's brow or mouth re-grades
the intensity directly; the background follows the drag, not the clock.

## Mechanics (all closed-form over piece time and recorded events)
- Intensity I(t) = 0.5 − 0.5·cos(2πt/40): 0 at t=0, 1 at t=20, 0 at t=40.
  Seamless loop, no cut.
- I drives: brow slant (inner ends drop up to 0.055·S), eye openness
  (ellipse height 0.004·S → 0.042·S), mouth size (0.05·S → 0.095·S wide,
  0.004·S → 0.055·S tall, dark fill above I=0.7), blush alpha
  (0.12 → 0.67), line weight (1.5 → 5.0, scaled by S/720), extreme-shadow
  alpha (0 → 0.22), and background color (flat lerp neutral → intense).
- Hand: a fixed sprite (palm ellipse + four finger bars + thumb) drawn from
  constant geometry only — verified pixel-identical at t=0/10/20/40.
- Drag: pointerdown near the brow band (|y − browY| < 0.09·S, |x − cx| <
  0.32·S) or mouth (|y − mouthY| < 0.09·S, |x − cx| < 0.16·S) starts a drag;
  dragging up raises I, down lowers it (scale 0.35·S). On release the offset
  from the clock curve decays exponentially (tau 3 s), so the background
  eases back to the clock, never jumps.
- No audio of any kind. No caption, no translation, no second hand sign.

## Adaptations
- Face as a parametric line drawing with an intensity parameter driving
  line weight, blush, and background saturation; hand as a fixed sprite;
  cycle timer as default driver when untouched.
- Background grade is a flat fill lerped by I, never a gradient.
- No offscreen canvas, shadowBlur, Path2D, createElement, AudioContext,
  getUserMedia, or fillText/strokeText. No visible text except `<title>`.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs; every arc and
  ellipse on its own beginPath with a moveTo.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w·1.15 fallback; centered composition keeps its shape,
  page ground takes the piece's background color.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock anchors on the first rAF call); rAF loop as a
  plain function declaration behind a typeof guard; all randomness from a
  seeded mulberry32 PRNG (seed 1421000, static paper speckles only), never
  Math.random.

## Verification
- Rendered at 1280×900, 390×844, 720×720; all three inspected. Mobile keeps
  the same centered composition with no clipping.
- Thumb byte-identical across repeated renders, including a final re-verify.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): two fresh instances byte-identical
  at t=0; background corner pixel 232,226,212 at t=0 → 204,128,124 at t=10 →
  176,30,36 at t=20 → 204,128,124 at t=30 → 232,226,212 at t=40 (exact 40 s
  cycle); hand-center pixel identical (38,36,31) at t=0/10/20/40; brow-zone
  ink 1040 px at t=0 vs 3890 px at t=20 (lines thicken); eye-zone ink 522 px
  vs 1864 px (eyes open); brow drag up 200 px at clock t=0 moves background
  to 196,102,100 (I≈0.64); after release the background eases back
  (216,170,161 at +3 s, matching exp(−1) decay); mouth drag up 250 px moves
  background to 188,70,72; off-hand corner ink 0 px (no second hand).
- Token scan clean (the single "Math.random" hit is a comment stating it is
  never used). No fix rounds needed.
