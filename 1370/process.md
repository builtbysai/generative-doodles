# №1370 "Kicking the Clouds" (sky-hopinka SH3, PP593)

Three generations of "recordings" as overlapping waveform-handwriting ribbons
laid over a slow-moving coastal landscape in Whatcom County tones.

## Frame one

Salt-grey sky with soft flat-alpha cloud bands; a low hill-green ridge along a
fixed horizon at 0.40H; dark sea below with faint slow wave lines. Three
ribbons stack across the middle third, offset in depth:

- Grandmother (top, 0.44H): wide and slow — large amplitude, long wavelength,
  6 px/s scroll, heavier stroke.
- Mother (middle, 0.54H): tighter — medium amplitude and wavelength,
  13 px/s scroll.
- Present voice (bottom, 0.64H): quickest — small amplitude, short wavelength,
  24 px/s scroll, lightest stroke.

Each ribbon carries seeded waveform-glyph marks (ticks, dot pairs, loops,
crosses, chevrons, occasional rust accents) that are never letters. No
readable text anywhere except `<title>`; no playhead, no waveform labels.

## Motion and interaction

The ribbons scroll at their three speeds on independent clocks and drift out
of phase, sometimes aligning into brief legibility-like moments that stay
unreadable. Drag scrubs time: dragging left pulls the ribbons toward
alignment (generations converging), dragging right lets them drift apart.
Release and they resume their own clocks. The convergence parameter is a
closed-form function of recorded drag samples (leftward distance, exponential
decay tau 3 s, 6 s window, clamped 0–1); each ribbon's effective scroll offset
blends from its own offset toward the shared mean offset by that parameter,
so the effect settles fully after release. When offsets agree mod 90 px (the
mark spacing) after t > 2 s, the mother and present ribbons tint rust — the
alignment resonance made visible. The horizon never moves: only cloud drift
(1 px/s) and wave phase (0.05 rad/s) move in the landscape, and the horizon
line pixel is identical at t = 0 and t = 30 in probes.

## Adaptations

- Ribbons are seeded waveform-glyph functions with independent scroll
  velocities (no pre-rendered ribbon buffers); marks repeat every 3600 px of
  ribbon-local coordinate, so scrolling is seamless.
- The prompt's optional three detuned sine beds are gesture-gated only:
  created lazily inside the first pointerdown behind `typeof` guards, sounding
  only while dragging, converging from 220/233/247 Hz toward 233 Hz as the
  ribbons align, silenced on release. Never autoplay, never on the clock.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement, or
  getUserMedia. Dot-pair marks are filled, never stroked, so no connecting
  spokes appear (node-canvas arc quirk); every arc sits on its own path with
  a `moveTo` first.
- Determinism: frame one = `draw(0)` via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a `typeof` guard); all
  randomness from mulberry32 (seed 1370000 + ribbon index × 7919), never
  `Math.random`. Canvas size from the Visual Viewport API with canvas pinned
  in draw(); phone detection via `window.screen` with aspect fallback;
  field-like composition goes full-bleed on phones.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify after
this file was written. Probe harness driving the piece's own rAF loop and
pointer listeners at forced timestamps:

- Frame one: sky pixel above the horizon matches salt-grey, sea pixel below
  matches sea color, horizon-line pixel identical at t = 0 and t = 30.
- t = 0 vs t = 30 differ in 40,167 px (ribbons scroll; landscape nearly static).
- Drag-left at t = 5, rendered at t = 6: rust pixels in the middle third jump
  from 141 (undragged, accent marks only) to 3,338 (mother and present ribbons
  tinted rust = alignment signal firing); dragged vs undragged differ in
  22,061 px.
- Drag-right at t = 6 matches undragged exactly (141 rust px): dragging right
  does not force convergence; the ribbons keep drifting apart on their own
  clocks.
- Dragged vs undragged at t = 16 differ in 0 px: the convergence fully
  settles after release and the independent clocks resume.
- Grandmother's band stays bone in the dragged run (2,123 bone-ish px).

One fix round during QA: the first render tinted the mother and present
ribbons rust at frame one, because all scroll offsets are trivially zero at
t = 0 and the alignment test fired. The test now requires t > 2 s, so frame
one shows all three ribbons bone and the rust signal means a real alignment.
The far hill ridge was also softened (smaller amplitude) in the same round;
all renders were re-done after the fix.
