# №1374 "Hosted Ceremony" (sky-hopinka SH7, PP597)

A drum circle that only exists while witnessed. When the piece loads, the
circle is empty ground with a fire at its center. Each active touch becomes
a drummer silhouette at the nearest of 12 ring positions around the fire.
One touch is one drum, a faint heartbeat. Two or more touches voice the
circle, with call-and-response across it. When all touches lift, the
drummers fade over 1.2 s and the ground is empty again.

## Composition

Night ground #07090C with a darker ground disc under the fire. The fire
sits at center: layered flat-alpha glow discs, a teardrop flame in
firelight #C96A2C, an ember core #7A2E12 with a bright heart, two crossed
logs, smoke-grey wisps rising, and 24 seeded embers rising from the fire.
Drummers are flat silhouettes (#26221C with a smoke-grey outline) seated
around the ring, facing the fire, each with a drum-hide #B99B6B drum,
an ember-rimmed edge, and arms that raise on the strike. No visible text
except `<title>`; no buttons, no start screen, no demo mode.

## Mechanics (all closed-form over piece time and recorded events)

- Fire flicker is a seeded function of quantized time (0.12 s steps hashed
  through seed 1374000), never per-frame random, so frame one is
  reproducible.
- Strike schedule per drummer: period 0.85 + 0.13 × (slot mod 4) seconds,
  phase offset slot × 0.37 s, slightly quickened as touch count grows.
  The strike visual is an arm raise plus a drum glow and an expanding
  ring, decaying over 0.28 s from the strike time. Strike times are
  computed from piece time, never frame-integrated.
- Single touch: the lone drum carries a faint heartbeat — a soft glow
  pulsing on a 1.1 s cycle.
- Two or more touches: strikes alternate pitch (110 Hz call / 82 Hz
  response) across the circle, so harmonies emerge only from cooperation.
- Touch → slot mapping: a touch maps to the ring position nearest the
  touch point (nearest free slot if that one is taken); dragging a touch
  moves its drummer to the nearest free slot. Lifting a touch starts a
  1.2 s fade; when the last touch lifts, the whole circle fades and the
  ground is empty again.
- Frame one (no touches) is the unwitnessed state: empty ground, fire
  only. The gate thumb is that state.

## Audio adaptation

Drum voices exist only inside active touch gestures: the AudioContext is
created lazily inside the first pointerdown handler, behind `typeof`
guards, and each strike crossing while a touch is held plays one
membrane thump (sine dropping 110/82 Hz toward ~40 Hz, 0.35 s decay).
There is no autoplay, no demo mode, no recorded loop, and no microphone
(the piece contains no getUserMedia call). In an audio-less harness the
piece runs silently and identically.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style
  width/height in px.
- Phone detection via window.screen physical size (min dimension <
  700 px) with aspect h > w × 1.15 as fallback; the centered composition
  keeps its shape on phones and the page ground is the piece's own
  background color (#07090C). Checked at 390 wide.
- Determinism: frame one = draw(0) via boot flag; the rAF loop is a
  plain function declaration behind a `typeof` guard; all randomness
  from mulberry32 (seed 1374000 + index × 7919), never Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  localStorage, or getUserMedia. Every arc has its own path with a
  moveTo first (node-canvas batched-arc quirk).

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three;
thumb byte-identical across repeated renders, including a final
re-verify after process.md was written. Probe harness driving the
piece's own rAF loop and pointer listeners at forced timestamps
(1280×900, drum-hide pixels counted within ±22 of #B99B6B):

- Frame one: 0 drum pixels — unwitnessed, as specced.
- One touch at the slot-0 position: 2,322 drum pixels total, 2,318 of
  them inside the slot-0 region — the drummer appears at the nearest
  ring position.
- Second touch at the slot-3 position: 4,661 drum pixels total, 2,330
  inside the slot-3 region — two drummers, call-and-response voicing.
- Both touches lifted, rendered 1.5 s later (fade is 1.2 s): 2 pixels
  of drum-hide tolerance residue, effectively empty ground again.
- Token scan clean except one comment stating Math.random is never
  used and the typeof-guarded AudioContext creation inside the gesture
  path.

One fix round during QA: embers initially shared phase 0, so at frame
one all 24 sat at the fire base in a dotted row. Each ember now carries
a seeded phase offset, so embers are already spread along their rise at
frame one; all renders re-done after the fix.
