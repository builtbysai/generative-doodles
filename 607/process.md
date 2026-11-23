# №1913 The Tension It Adds (RG2, PP1160, study #250 ruth-goller)

## Driver

One bass string stretched across a dark field, vibrating. Its harmonics
bloom upward as thin light lines: fundamental plus micro-tuned overtones.
Drag along the string pulls it off pitch; the harmonics jitter, split, and
argue with each other. On release the string settles back and the overtone
stack re-locks, one by one, lowest first. The tension is visible
dissonance and then resolution.

## Mechanism

2D canvas, visual only, no WebAudio. A physical string model: the string
is a curve sampled at 91 points, displaced by a triangular pluck envelope
centered at the drag position plus a gentle standing-wave vibration at
0.9 Hz. Above it, seven overtones form a stack fanning upward, each a
standing wave sin(k pi u) at frequency k times the fundamental, alternating
pale violet and ice cyan, amplitude falling with sqrt(k).

Detune is a single 0..1 state. While dragging it tracks the pull depth;
on release it decays exponentially (tau 0.9 s), so resolution is gradual,
never snapped. Each harmonic carries a phase divergence that grows with
detune and with k, so higher overtones argue first and re-lock last,
lowest first. While detuned, a magenta copy of each harmonic is drawn
offset by its divergence, the dissonance fringing, and a fast wobble
(11 rad/s) is added to the phases. A small finger-point shadow marks the
drag position: a dark disc below the pulled point with a short tick and a
steel contact dot on the string. A faint echo of the string, mirrored at
half amplitude, sits below it in the dark field.

## Frame one

FIRST_T = 1.0 s. The string is at rest, vibrating gently at its
fundamental, and the overtone stack is locked: seven thin lines standing
above it in phase, no fringing, no pull, no finger shadow. Every line is
a pure function of t, so frame one is deterministic and byte-reproducible;
the thumb and desktop renders came out md5-identical on a second run.

## Interaction

Drag only, never click-to-reload. Pointer down and move set the drag
position and pull depth; release lets detune decay and the stack re-lock.
The drag state is settable from the URL for QA: render-piece.js passes
its seed argument as ?seed=VALUE, and a value 0..1 renders the string
pulled at that fraction, so a probe render shows the off-pitch frame.

## Palette

Hand-picked from the named colors in the prompt; no study file exists
for ruth-goller. Deep black-blue field #050914 with a darker edge
#03060f, string in steel white #e8eef4, anchors in muted steel #8fa3b5,
harmonics in pale violet #b9a7e8 and ice cyan #9fd8e8, dissonance
fringing in magenta #ff4fd8, hint text in muted steel blue #7d8fb0.

## Composition

A field-like composition: the string spans edge to edge horizontally,
centered at 54 percent of the height, with the overtone field fanning
upward above it and a faint echo below. Full-bleed on phones, square on
desktop, per the house rule. The title plate sits top-left, the hint
"Drag to pull the string off tune." centered at the bottom. Gallery date
2007 · 04 · 08, gallery note "Drag to pull the string off tune."

## Motion

The string vibrates at 0.9 Hz; the overtone wobble runs at 11 rad/s,
about 1.75 Hz, well under the 14 Hz ceiling. Prefers-reduced-motion
shows the static first frame.

## Deviations

Per the Franke audio rule, no real audio is built: the string model is
visual only, with detune carried by the drag state instead of WebAudio.
No quantized pitch steps; the drag is continuous and the resolution is
a smooth exponential settle.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: string straight across with anchors, seven harmonic
  lines standing above it with visible standing waves, faint echo below,
  title, date and hint all clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; string, harmonics, echo and
  all text legible, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Drag probe (?seed=0.6): the string pulls up into a clear triangle at
  the drag position, harmonics jitter and split with magenta fringing,
  finger shadow and contact dot at the peak; the frame differs
  visibly from the at-rest frame.
- Fix rounds: the probe first rendered the string flat because dragY
  stayed zero while detune was set (probe now pulls upward from detune
  directly); the harmonic waves first read as nearly flat lines
  (amplitude raised from 0.011 to 0.016 of height); the lower field
  first sat empty (faint mirrored echo added below the string).
- Determinism: no Math.random, no Date.now, no wall clock; thumb and
  desktop renders md5-identical on a second run.
