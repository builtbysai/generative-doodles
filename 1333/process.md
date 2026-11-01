# №1333 "Sanguine Stage" (rashid-johnson RJ6, PP500)

A modular black-steel scaffold stage, built for activation: a set waiting for a
performance. Open cube frames with grow lights, cascading plants, shea-butter
busts on pedestals, stacked books, ceramic vessels, and a working piano at the
visual center.

## Frame one (t = 0, boot flag)

Dark empty ground, stage platform, black-steel scaffold spanning the field with
heavy base bars (grandfather-era steel). Two grow-light bars with flat-alpha
glow across the upper frames. Three African-mask silhouettes on the uprights
(father-era: eye slits and mouth slit only, never detailed faces). Cascading
plants hang from the top bars. Two shea-butter busts on pedestals flank the
piano, glowing yellow with brow ridge and nose hint, deliberately featureless
otherwise. Dark-cloth book stacks and two ceramic vessels flank the set. The
piano sits at the visual center: black body, ivory key strip. A muted speaker
icon (shapes only) sits bottom-right: the piece is silent by default.

## Motion and interaction

- Grow lights pulse on a slow cycle (per-bar phase offsets); plants sway on
  closed-form sines.
- Every 90 s idle, a performance begins (60-78 s of the cycle): lights shift,
  masks sway harder, and a pianist's shadow (a soft shape on the floor, never
  a figure) pulses while three keys dip in a repeating three-note visual
  phrase. Then it settles.
- Touch the piano: a three-note visual phrase plays (keys dip in sequence)
  and the light rows brighten. If the sound toggle is on, the same three notes
  (C4-E4-G4, warm triangle tone) play through lazily created, typeof-guarded
  WebAudio inside the tap gesture only.
- Drag orbits the camera around the stage (per-layer parallax shifts,
  clamped to +/-0.6 rad). Never click-to-reload.
- Sound rule: default silent, visible toggle. The idle performance and the
  pianist's-shadow phrase are visual only; audio exists only inside a piano
  tap while the toggle is on.

## Adaptations

- Canvas pseudo-3D only (no WebGL, no three.js): orbit expressed as
  per-layer horizontal shifts plus a thin side-face hint.
- Grow-light glow, shea glow, and shadows are layered flat-alpha shapes;
  no gradients, no shadowBlur, no filters, no offscreen canvas.
- Book spines are color/pattern only, never readable text.
- No visible performers or avatars; no concert-laser theatrics; no
  photoreal instruments.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop (plain function declaration behind a typeof
guard). Light pulses, plant sway, the performance cycle, and drag orbit are
closed-form functions of piece time and recorded events. All layout jitter
comes from a seeded mulberry32 stream (seed 1333000); no Math.random.

## QA

Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
inspected. Thumb rendered three times plus a final re-verification, all
`cmp` byte-identical.

Fix rounds:

1. The rAF loop was first written as a named function expression followed by
   `requestAnimationFrame(loop)`, which throws ReferenceError in a real
   browser (the №1278 lesson, invisible to node-canvas). Rewritten as a
   plain function declaration before rendering.
2. The ceramic vessels were first drawn before the piano and hidden behind
   it. Moved to after the piano block, at cx +/- 0.205W, so they read as
   foreground objects flanking the keys on desktop and mobile.
3. Phone piano width narrowed from 0.52W to 0.46W so the flanking busts still
   peek from behind the piano edges on narrow screens instead of vanishing
   entirely.
