# №1835 Where the Acoustic Ends (KS4, PP1082)

Source: TASKS.md prompt block konrad-sprenger KS4 (PP1082), cron expansion
study #240.
Gallery date: 2007 · 01 · 20 (formula date 2002-01-10 + 1836 days).
Suggested gallery note: "Sound particles keep switching between struck
string and glitch pixel, so no event can be pinned as acoustic or digital.
Watch only."

## Driver

A dark field of sound particles, each one unable to settle on being
acoustic or digital.

## What was built

An open indigo field with no horizon. 110 seeded particles drift slowly;
each carries a material flag that flips on its own stochastic clock
(1.6 to 6.0 s per particle), so the same particle keeps switching
mid-flight between a struck string fragment (a vibrating silver line
with nodes, 5 to 8 Hz tremble) and a glitch pixel (a hard acid-green
rectangle with scanline flicker at 6 Hz). Behind everything sits a low
held-chord band of indigo mist that breathes slowly, five muted amber
horn swells drift through as soft washes with no visible source, and
faint silver rings bloom and fade as tuned percussion blips. Nothing
is labelled, no instrument is modelled, no waveform is shown.

## Palette

- Deep indigo field: #0C0E26, deep ground #07081A
- Mist band: #23265A, soft #1B1E4A
- String fragments: silver #C8CCD4, dim #8E93A3
- Glitch pixels: acid green #A8E10C, dim #6FA307
- Horn swells: muted amber #C08A3E, dim #8A6428

## Material-flip schedule

Each particle has a seeded starting material (base 0 or 1, about half
each) and a flip period of 1.6 to 6.0 s with a seeded phase offset.
Material is a closed-form function of time: floor((t + offset) /
period) added to the base, parity deciding string or glitch. At the
fixed frame-one time t = 2.6 s the field holds 57 string fragments
and 53 glitch pixels. All motion is a closed-form function of phase
time. Fixed-seed PRNG (seed 1835) for particles, swells, and blips.
No wall clock, no unseeded randomness.

## Sound

Visuals run on a closed-form sound model. Real WebAudio is created
lazily only after the visitor taps the "Sound: off" plate (bottom
right), never on autoplay. When sound is on, plucked-string blips
(triangle oscillator, fast decay) sound about every 2.7 s and
horn-like swells (sawtooth through a slow lowpass sweep) about every
9.5 s, all drawn from one shared pitch set (110, 130.81, 146.83,
164.81, 196, 220, 246.94 Hz) so the timbres blur. Default is off and
the piece is fully legible silent. Reduced-motion visitors get a
still frame (the animation loop does not start).

## Deviations from the prompt

- The sampled-instrument MIDI layer is represented by the shared
  pitch set and the horn-like filtered swells rather than a literal
  sample player; no sample files are bundled and no source is exposed.
- The amber seam first drawn inside the mist band was removed: the
  straight line read as a horizon, which the prompt forbids. The mist
  band is now a pure soft gradient.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Three defects
found and fixed: an rgba() helper was first passed pre-formatted
strings and threw at load; the first frame skewed heavily toward
glitch pixels, fixed with a seeded starting material per particle;
and a precedence slip in the particle wrap let glitch rects spill
past the square edge onto the desktop margin, fixed by wrapping the
position before scaling and verified by a pixel scan (0 green pixels
in either margin). Thumb rendered twice, md5s match (deterministic
first frame). No em dashes in visible copy. Flicker is by
construction below 14 Hz; string tremble runs at 5 to 8 Hz and
scanline flicker at 6 Hz.
