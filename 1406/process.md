# №1406 "Plants Are Protected" (alison-odaniel AO7, PP629)

A truck bed full of plants in a storm, the camera trapped low among the
leaves. Rain beats the exterior, windshield wipers keep steady time, and
the plants shake, then gyrate with human-like intensity, then settle, on a
slow storm cycle — as if singing an alien song. Throat-caption descriptions
drift across the frame as material text.

## What is on screen

- Leaves fill the frame edge to edge in three depth layers (dark back,
  mid leaf-green, lighter front), each plant a cluster of 5–9 pointed leaves
  drawn as quadratic-curve shapes.
- Rain streaks fall with a slant; their count is gated by the storm
  envelope, so the storm visibly thickens and thins.
- A dark wiper blade sweeps a steady 2.4 s rhythm from a bottom-right pivot
  across the right edge, over a faintly cleared band.
- Four throat-caption phrases drift slowly across the frame like weather,
  at staggered heights and speeds: "rain beats against the exterior",
  "vibration in the throat" (the prompt's own two example phrases), plus
  "hum felt in the chest" and "tongue pressed to the roof of the mouth" —
  short felt-sound phrases in the same register, never a subtitle strip,
  never narrative.
- A slow thunder-gold wash breathes with the storm peak. It is a wash,
  never a flash.

## Motion (all closed-form over piece time and recorded events)

- Storm envelope: a 48 s cycle. A Gaussian bump centered mid-cycle drives
  rain intensity (0.30–0.95), sway amplitude (0.30–1.05), sway speed, and
  the gold wash. The bump is continuous at the wrap, so the cycle breathes
  without a seam: shake → gyrate → settle → shake.
- Leaves sway as sine functions of piece time, per-leaf seeded phase and
  frequency; nothing is frame-integrated.
- Rain: seeded streaks with fixed fall speeds and per-streak visibility
  thresholds; a streak draws only when the storm intensity exceeds its
  threshold. Positions wrap closed-form in both axes.
- Wiper: blade angle is a closed-form sinusoid on the 2.4 s rhythm.
- Captions: each phrase's x position is a closed-form wrap of piece time
  and its own drift speed.
- Drag: pointer samples are recorded; each leaf's parting displacement is
  a closed-form sum over recent samples (Gaussian falloff, exponential
  decay, total displacement capped at 60 px so a dense drag path parts a
  channel instead of clearing a void), and nearby plants gain sway
  amplitude ("sing harder"). No click actions, never click-to-reload.

## Adaptations

- The prompt's "drift physics" and "sway driven by a storm envelope"
  become closed-form functions (no simulation), so frame one and every
  loop are reproducible for the byte gate.
- The prompt's captions are carried verbatim as material text per the
  explicit text exception: only the two example phrases the prompt itself
  gives, plus two more short phrases in the same felt-sound register.
  Nothing else on screen is readable text.
- Wiper as a sweeping masked band: a dark blade plus a faintly cleared
  right-edge band (flat alpha, never a gradient).
- Fully silent: the prompt's sound is felt and seen (sway, captions, rain),
  never merely heard. No AudioContext, no getUserMedia, no offscreen
  canvas, no gradients, no shadowBlur, no Path2D, no createElement.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying (scientific-notation alphas parse as opaque);
  dots as filled rects; every arc avoided — leaves are quadratic curves
  with their own beginPath; no batched ellipse subpaths.
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen physical size (min dimension < 700 px) with aspect
  h > w*1.15 as fallback; field-like composition goes full-bleed on phones.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1406000 + index·7919), never Math.random.

## Verification

- Rendered at 1280×900, 390×844, and 720×720; all three inspected.
  Desktop: leaves edge to edge, rain streaks, all four captions readable,
  wiper blade sweeping the right edge. Mobile: same full-bleed composition,
  no clipping.
- Thumb byte-identical across repeated renders, including a final
  re-verify after the last fix.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280×900): two fresh instances
  render byte-identical frame-one images; rain-silver pixels 6,132 at t=0
  (shake) → 12,499 at t=24 (gyrate peak) → 2,897 at t=44 (settle);
  cream caption pixels shift left-half 3,404 → 4,193 and right-half
  1,327 → 580 from t=0 to t=10 (phrases drift leftward); wiper-zone dark
  pixels change 3,908 → 3,481 from t=0 to t=0.6 (blade sweeps); a drag
  through the center parts a visible channel (full-frame green pixels
  170,282 undragged vs 168,595 dragged — leaves displaced, not vanished).

## Fix rounds (2)

1. The wiper blade first swept an up-right arc from the bottom-right
   pivot and spent most of its swing off-canvas. The sweep now covers the
   up-left arc from the pivot, so the blade stays in frame and reads
   clearly at the right edge.
2. Rain streaks first drifted unboundedly rightward with piece time and
   left the frame at late cycle times, and a dense drag path summed
   per-sample pushes into a void. Rain x now wraps closed-form, and total
   parting displacement is capped at 60 px: the drag parts a channel,
   verified visually, instead of clearing the region.
