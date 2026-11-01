# №1473 "Morning Tape, Afternoon Screen" (carole-roussopoulos CR2, PP720)

## What the piece is

Two panels stacked. Upper panel (two-thirds): an interior room, cream wall, where
four abstracted figures gather and talk — simple shapes with voice-lines. Lower
panel (one-third): the outside brick wall of the same building, with three
monitor screens mounted on it and a row of six slate crowd shapes below them.

The piece cycles a 60 s day loop: record (0–30 s, upper panel live, monitors
dark), select (30–32 s, brief white splice tick on each monitor frame),
playback (32–60 s, monitors play the recording, crowd shapes turn toward them
and nod slowly). Then the day restarts at a fresh record phase.

## Interaction

Drag along the lower panel during playback scrubs the playback position
(forward or back); releasing resumes playback advance from the scrubbed point.
Drag never restarts the day and never re-records. Drags on the upper panel, and
drags during the record/select phases, are ignored. Never click-to-reload.

## Technical

- Record phase writes speaker states into a history buffer in the prompt's
  sense: the speaker schedule is a seeded, closed-form function of time (four
  figures, durations 3–6 s from mulberry32 seed 1473000 + index*7919, cycling),
  and playback reads that same function at the playback position. No state is
  accumulated frame by frame, so every frame is reproducible.
- Playback position is closed-form over piece time and recorded events: while
  a lower-panel drag is held it equals the pointer-derived offset; after
  release it equals release offset + elapsed since release (mod 30 s); with no
  scrub in the current day it equals the natural playback clock. A scrub in one
  day never leaks into the next.
- The three monitors show the same recording with staggered lags (0 s, −2 s,
  −4 s), so the three screens read as one recording seen at three moments.
- Crowd nod is a slow sine per figure, active only during playback.
- Splice mark is a brief white tick on each monitor frame for the first 0.5 s
  of the select phase, then gone.
- During playback the upper figures stand idle (no speaker, no voice-lines);
  during select the upper panel freezes at the end-of-record speaker.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. Voice-lines
  are stroked segment polylines in clothes blue (#4a5a7a), a palette colour.
  Fading alphas are not used; dots are own-beginPath arcs with moveTo first
  (node-canvas quirks).

## Adaptations

- The prompt's palette carries no gold, so voice-lines use clothes blue
  instead of gold; the splice mark stays white exactly as specced.
- Dark monitors read via a thin pale border around a charcoal screen; during
  playback the screens turn pale and carry miniature figures.
- On phones the monitors go portrait-narrow (width capped by the narrow
  viewport) but the full composition — room, monitors, crowd — stays
  unclipped and full-bleed.

## Determinism

Frame one = draw(0) via boot flag; the rAF loop is a plain function declaration
behind a typeof guard; all randomness is seeded mulberry32, never Math.random.
One fix round: the first build animated head tilt, mouth, and crowd nod from
absolute piece time, so t = 60 differed from t = 0 and the day loop never
closed exactly. All animation sines now use day-local time, and t = 60 vs
t = 0 renders byte-identical.

## Verification (forced-time probe harness, vm-isolated instance, real
node-canvas, piece driven via window.__piece; harness at tmp/probe1473.js)

- t = 0: record phase, speaker 0 live, cream upper 685,901 px, brick lower
  234,238 px, pale lower pixels only the 4,280 px of monitor borders, blue
  voice-line 27,707 px upper.
- Record speakers advance (speaker 1 by t = 10); select phase shows 45 white
  splice-tick pixels at t = 30.2 and 0 by t = 31.5.
- Playback at t = 40: position 8.00 s, monitor speakers 1/1/0 (lag stagger),
  pale screen pixels 96,104; crowd slate pixels differ between t = 40.5 and
  t = 42.5 (nod live).
- Scrub: drag to x = 960 during playback sets position 22.50; release at
  t = 41 resumes advance (23.50 at t = 41, 24.50 at t = 42).
- Loop closes exactly: t = 60 vs t = 0 byte-identical; t = 0 redraw 0 px.
- Upper-panel drags and record-phase drags leave the playback position
  unchanged.
- Renders inspected at 1280×900, 390×844, 720×720; thumb byte-identical
  across repeated renders. Token scan clean (no fillText, AudioContext,
  getUserMedia, createElement, Path2D, shadowBlur, gradient, or Math.random
  calls; the single Path2D hit is a code comment).
