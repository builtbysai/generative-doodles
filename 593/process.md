# №1833 "Metrical Discomfort" (KS2, PP1080), #240 konrad-sprenger

## Prompt source
TASKS.md, study #240 konrad-sprenger, prompt KS2 (PP1080), verbatim brief:
a ring of twelve strike points around a dark circle, like a clock face
with missing hours; a thin beam sweeps the ring at constant speed and
fires a small flare and a low thump when it crosses a live point; the
live points are scattered unevenly so the groove keeps slipping; fired
points leave fading trails that reveal the algorithm's shape. Palette:
near-black ground, strike points in bone white, flares in signal
orange, trails in faint violet. The ring is centered and large; the
firing trails accumulate into a visible constellation of the rhythm.
WATCH ONLY. Technical approach: 2D canvas, one rotating phasor,
Euclidean pattern E(k, n) with k changing every 8 bars, each fire
scheduling a percussion hit and drawing a radial flare with a decaying
trail. WebAudio short membrane-ish hits at a fixed tempo, sound only
via an opt-in toggle on first tap, never autoplay. Avoid: no
quantize-to-grid option, no beat counter, no metronome overlay, never
resolve into a clean 4/4 for relief, no click-to-reload. The study file
~/workspace/muse-soul/studies/konrad-sprenger.md does not exist locally,
so hex values were hand-picked from the prompt's named colors.

## Driver
One rotating phasor sweeps a ring of twelve clock positions, and the
ear keeps expecting a grid the Euclidean pattern refuses to give it.

## Palette
- Ground, near-black: #0b0b0e
- Disc, one shade lighter: #121218
- Strike points, bone white: #e8e2d4
- Flares, signal orange: #ff5c1a
- Trails, faint violet: #8b7fd4
- Plate text, dim bone: #8a8578 and #6a6558

## Euclidean pattern schedule
- Tempo fixed at 96 BPM. One bar is 2.5 s, one beam revolution per bar.
- n = 12 strike points, one per clock position, point 0 at the top.
- k changes every 8 bars (20 s) through [5, 7, 9, 11], then repeats.
  Full pattern cycle is 32 bars, 80 s. No k in the schedule gives a
  clean 4/4 (k = 6 and k = 4 are never used).
- Patterns are computed with the maximally even distribution
  (floor(i*k/n) minus floor((i-1)*k/n)), rotation starting with a hit
  at position 0, not tabled:
  - E(5,12) = 1,0,0,1,0,1,0,0,1,0,1,0
  - E(7,12) = 1,0,1,0,1,0,1,1,0,1,0,1
  - E(9,12) = 1,0,1,1,1,0,1,1,1,0,1,1
  - E(11,12) = 1,0,1,1,1,1,1,1,1,1,1,1
- Live points in the current bar are filled bone; the rest are hollow
  outlines, so the missing hours are visible. A fired point shows a
  signal orange flare (glow rings, hot core, four spikes) decaying over
  0.9 s, and a violet arc trail on the ring decaying over 6 s, so the
  last two bars of fires stay visible as a constellation.
- The beam is a thin bone line from the centre pin to just past the
  ring, with a faint wedge trailing behind it.

## Sound
WebAudio only, opt-in. Tapping anywhere toggles sound on or off; the
first tap creates and resumes the AudioContext. Each fire schedules one
membrane-ish hit: a sine dropping 150 to 52 Hz under a fast attack and
a 0.32 s decay. The hint plate reads TAP FOR SOUND when off and SOUND
ON, TAP TO MUTE when on. No autoplay, no tempo control, no beat
counter, no metronome overlay.

## Frame one (t = 61.35 s, fixed phase)
Bar 24 (k = 11), beam at 194.4 degrees. Seven fires have already landed
this bar: the 180 degree flare is 0.10 s old and bright, the 150 degree
flare is mid-decay, and the previous bar's nine fires (k = 9) still show
as violet trails, so the rhythm's shape is visible at once. Frame one
is byte-comparable: seeded PRNG only (mulberry32, seed 1833), no
Date.now or Math.random, and the animation loop continues from t =
61.35 s. All fire ages are a pure closed-form function of time, so
trails and flares never depend on accumulated live state.

## Deviations from the prompt
None in intent. Two implementation notes: (1) the beam makes one
revolution per bar (2.5 s) rather than per 8-bar block, so a fire lands
every time the beam crosses a live point's angle within the bar, which
is the reading that makes the phasor and the pattern share one clock;
(2) the disc the ring sits on is one shade lighter than the ground
(#121218 on #0b0b0e) so the ring reads as a body, not a floating
outline.

## QA
- node render-piece.js at 1280x900, 390x844 and 720x720; all three PNGs
  read and inspected.
- Desktop render: ring centered and large, hollow non-live point at 30
  degrees, orange flares at 90, 120, 150 and 180 degrees in visible
  decay stages, violet trail arcs around the ring, beam and wedge
  legible, title, date and hint plates clear.
- Mobile render (390x844): centered geometric composition holds, ring
  fits with margin, all plates legible, flares and trails readable at
  small size.
- Thumb render (720x720): same composition, all plates legible.
- Determinism: four consecutive 1280x900 renders of the shipped file
  are byte-identical (md5 76118aea4f8569091e3def3ec12dd9ab).
- No em dashes in visible copy. No click-to-reload, no drag, no tempo
  control; tap only toggles sound.

## Gallery entry
- n: 1833, title: "Metrical Discomfort", date: "2007 · 01 · 18",
  note: "A beam sweeps a ring of twelve points and the groove keeps slipping. Watch only."
- Title checked against the local pieces.json copy: zero verbatim
  duplicates. №1833 does not exist yet.
