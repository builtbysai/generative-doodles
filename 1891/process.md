# Micro-Gesture Percussion, No.1891

Study #247 beatrice-arrigoni. Prompt block BA4, PP1138, from TASKS.md.

## Driver

A quiet field holds a small library of gesture atoms, an intake-of-breath
spiral, a cluck tick, a ding flash, a sigh ribbon, a trill comb, a whisper
scatter. The atoms sequence stochastically across the field, each leaving a
fading trace; the pattern never repeats verbatim but keeps a voice-like
density. A tap drops a fresh impulse into the field; the sequencer may
absorb it, echo it, or refuse it. The refusal is the improv etiquette of
the piece.

## Mechanism

2D canvas with WebAudio. A stochastic sequencer schedules atoms from a
weighted library (spiral .18, tick .22, flash .12, ribbon .18, comb .15,
scatter .15) at nine stations on a loose 3 by 3 grid, with 0.9 to 2.4 seconds
between events. All six atoms are genuinely distinct mechanisms:

- Spiral: a polyline uncoiling from its center over 3.0 s, with a head dot.
- Tick: one sharp angled mark, struck and gone in 1.1 s.
- Flash: an expanding ring, a bright center, four radial ticks, 1.3 s.
- Ribbon: a quadratic curve breathing itself out in two parallel strokes,
  drawn progressively over 2.6 s.
- Comb: teeth appearing one after another along a rotated rail, 2.1 s.
- Scatter: ten to fourteen grains appearing at staggered times and drifting
  apart, 2.3 s.

Each atom fades in quickly and out slowly, and on retirement leaves a faint
residue (a chalk dot, or a bone ring for the flash) that decays over 4 s.
Faint station dots and hairline breath lines mark the field. No drum machine
pads, no quantized grid, no metronome.

The visual sequencer is time driven, a closed-form sound model: it runs
without any audio. WebAudio is only a renderer for tap-triggered sounds,
created lazily inside the first tap and never before it. Each atom type has
its own sound: breath-filtered noise sweep for the spiral, a short pitched
tick, a sine ping for the flash, a lowpass noise swell for the ribbon, five
rising ticks for the comb, six highpass noise grains for the scatter, and a
quiet low thud for a refusal.

## Frame one phase

Fixed phase t = 10 s, all randomness seeded from 1891. The simulation is
warmed with 200 fixed steps of 0.05 s from t = 0, then three atoms are placed
mid-trace at fixed stations: a spiral 1.4 s in, a ribbon 0.9 s in, a tick
0.5 s in. No wall clock or random seed at frame one; the first render is
reproducible.

## Interaction

Tap earned. A tap is a call the piece may answer or ignore, mirroring
call-and-response improvisation. The sequencer rolls on each tap: under 0.45
it absorbs the impulse (an atom of a weighted random type appears where
tapped), under 0.75 it echoes it (the atom appears, plus the same type
repeats nearby 0.6 s later), otherwise it refuses (a brief ash-grey ring
fades where tapped). No drag, no scrubbing, no loop of the gesture, never
click-to-reload. Tap impulses enter 0.1 s into their gesture so the answer
is visible on the tap frame. A sound plate at bottom right toggles sound;
taps on it do not inject impulses.

Flicker stays at or below 14 Hz by construction: all motion is slow fades
and expanding shapes, nothing strobes. prefers-reduced-motion freezes the
piece at frame one.

## Deviations from the prompt

The study file studies/beatrice-arrigoni.md does not exist in the repo, so
the hexes were hand-picked from the named colors in the prompt: deep umber
ground #2E2118, pale chalk #EDE6D6, bone #E8DFC8, ash #8A8578. Everything
else follows the prompt as written.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected visually. Desktop
frame one shows the spiral top right, the ribbon center, the tick bottom
left, plus one warmup spiral bottom center; mobile is full-bleed with no
clipping and plates intact. A test copy spawning all six atom types at once
confirmed each mechanism renders distinctly and legibly. A tap probe
(fire pointerdown at field center, advance the clock 0.5 s through the
requestAnimationFrame steps) confirmed pixels change: the tap spawned a
spiral at the tap point and the field advanced around it.
