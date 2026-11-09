# №1641 — The Murmur of the Cells (KT2, PP888)

Study #216 kazuhiro-tanimoto, second piece of the arc. Gallery date
2006 · 07 · 10 (formula 2002-01-10 + 1642 days). Gallery note draft:
"A dark grid churns and murmurs: every bloom you see is a note you
hear. Tap to let the grid speak."

## Driver

One grid, two senses. The sound IS the grid made audible, so a visible
bloom spreading and the chord thickening are the same event: a cell
changing state past a threshold.

## The piece

A Brian's Brain cellular automaton churns continuously on a deep
indigo ground, full-bleed, no frame, no UI. Cell states are phosphor
green, amber and violet (each cell carries a fixed seeded hue class).
A fixed 20x20 lattice of 400 sounding points is sampled every
generation; when a point's state change crosses the threshold (birth,
or on-to-dying), it sounds and flashes white briefly, the flash
spreading as a fading ring: the bloom is the note.

- CA: 120x68 grid on landscape/square viewports (68x120 transposed on
  portrait phones, so cells stay near-square), fixed seed 1641001,
  one generation every 0.15 s, toroidal neighbours.
- Sound: per-trigger oscillator voice, frequency from hue class
  (green E4, amber C4, violet G4, octave up when bright), ADSR
  envelope from local brightness, stereo pan from screen x, at most
  10 voices per generation and 24 concurrent. Harmony layer is a
  fixed authored chord progression, Am9 / Fmaj7 / Cmaj7 / G6, one
  chord every 8 s of piece time, as a low sine pad. The tap also
  releases a wave sound built from white noise through a bandpass,
  swelling gently and settling as a low bed.
- Audio is lazy WebAudio only: created inside the tap gesture, never
  autoplay. Before the tap the piece is silent motion; after it the
  piece is an environment. No mute toggle. The visual is complete
  without audio.

## Interaction

Tap anywhere: the grid begins to speak (audio starts, hint changes to
"The grid is speaking." and its border brightens). That is the only
interaction. No click-to-reload anywhere.

## Determinism

Frame one is the CA at generation 40 (t = 6.0 s), pre-run
synchronously from the fixed seed at load, so the first frame is
already developed. The rAF loop is anchored as that phase plus
elapsed time since load, never Date.now(). All randomness comes from
mulberry32 with fixed seeds. Thumb rendered twice with the QA
harness: byte-identical (md5 101d6c92a39ff069e175d786d67ce5cb).
Probe check: 400 lattice points, 349 live cells at frame one, 340 at
t = 12 s, 222 at t = 30 s, and rewinding to t = 6 s reproduces 349
live cells exactly, so draw(t) is a pure function of piece time.

## Deviations from the prompt

- CA is Brian's Brain on CPU (the prompt's GPU option was not taken,
  per the batch spec's adaptation flags); the small fixed grid runs
  in canvas 2D.
- The grid transposes to 68x120 on portrait viewports so cells stay
  near-square; a fixed 120x68 grid stretched into 3 px wide vertical
  slivers on phones in the first build (see fix rounds).
- Chord progression is fixed and authored (Am9 / Fmaj7 / Cmaj7 / G6)
  rather than derived per frame from the grid; the grid supplies the
  melody voices, the progression supplies the harmony layer, as the
  prompt's "chord progressions from human music theory" asks.
- Title, date and hint are drawn as small plates on the grid (the
  batch spec's no-labels note notwithstanding, the build brief
  requires the interaction cue as the hint); there is no other UI.

## What was avoided

No unrelated ambient track: every voice is triggered by a grid
event, and the pad and noise bed exist only after the tap. No
volume-only interactivity, no synesthesia theatrics: the
correspondence is structural (one trigger, one flash, one voice).

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, 720x720 thumb; all three inspected. Desktop and
thumb: indigo ground, green/amber/violet cells, white flash blooms,
title, date and hint legible. Mobile after the fix round: near-square
cells, same character as desktop. Later frames (t = 12 s, t = 30 s)
rendered via the __probe.drawAt hook and inspected: the automaton
keeps churning with a changing configuration. Audio path is guarded
behind typeof AudioContext checks; the harness (no audio) renders
silently with audioOn false. Flicker safe by construction: one CA
generation per 0.15 s (6.7 Hz) and flashes that decay smoothly over
0.5 s, no strobing.

## Fix rounds

1. Mobile cell stretch: the first build used a fixed 120x68 grid on
   all viewports, so on a 390x844 phone the cells rendered as thin
   vertical slivers. Fixed by transposing the grid to 68x120 on
   portrait viewports, decided once at load from the viewport
   orientation. Re-rendered all three sizes; mobile now matches the
   desktop character, desktop and thumb byte-identical to before.
