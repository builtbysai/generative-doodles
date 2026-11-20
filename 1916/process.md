# №1916 Choir of One (RG5, PP1163, study #250 ruth-goller)

## Driver

One voice braided with one bass line, then the fission: the single voice
multiplies into a soprano spectra of herself, layer on layer over detuned
bass. The screen fills with a choir that is all one singer, each copy
slightly out of tune with the others, the bass one dark line at the bottom
holding the whole stacked structure up. The not-quite-together is the
whole piece.

## Mechanism

2D canvas, visual only, no WebAudio. A closed-form 60 s timeline runs left
to right across a vertical score layout. The duet braids alone for the
first 16 s, the braid tightening over the first 20 s; then a new vocal
copy is born every 8 s (16, 24, 32, 40, 48), up to six voices. Each copy
enters at the timeline position of its birth second, marked by a small
open ring, and braids rightward from there, fading in over 2 s. Each copy
is born off-pitch and drifts toward the chord on an exponential decay, but
a residual detune floor (4.5 to 7 px at unit scale, alternating direction
per copy) keeps it from ever arriving at unison. The bass is one thick
deep-umber line along the bottom third with a lighter core and a slow
pulse dot under each beat, holding the structure up. Where two voice
lines nearly coincide, a thin iridescent fringe (pale green, violet or
gold) is drawn along their midpoint: the shimmer of two copies almost in
tune. Faint vertical smoke streaks rise above the braid, one or two per
voice, fading as they climb: the multiplying spectra leaving the score.
A small tally top-right counts the voices singing.

## Frame one

FIRST_T = 38 s. The braid has tightened and three vocal copies have been
born (at 16, 24 and 32 s), so four voice lines braid above the bass: the
original in bright copper spanning the whole timeline, rose and copper
copies entering at their birth rings, with iridescent fringes where copies
nearly coincide and smoke streaks rising above. Every line, fringe, wisp
and pulse is a pure function of t, so frame one is deterministic and
byte-reproducible; the thumb and desktop renders came out md5-identical
on a second run.

## Interaction

Watch only. There are no pointer handlers and no audio. Never
click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists for
ruth-goller. Voice lines in warm copper #c97b4a and #e0a06a and rose
#d98a94 and #b45a68, the bass line in deep umber #5a3a22 with a lighter
core #7a5230, detuned differences shimmering as thin iridescent fringes
in pale green #a8d8c8, pale violet #c9b8e8 and pale gold #e8d28a, all on a
deep plum-black ground #171019 with a faint lift #221625 behind the braid.
Title and hint in warm off-white #f2e6da, date line in muted warm grey
#b9a394.

## Composition

A vertical score layout on a dark ground: the bass line along the bottom
third, the voice braid above it, the multiplying spectra rising like
smoke toward the top, the layering accumulating left to right as a
timeline. Field-like composition: full-bleed on phones, square on
desktop, the page ground set to the piece's own background color. The
title plate sits top-left with the voice tally top-right, the gallery
note centered at the bottom (two lines on narrow screens).

Gallery note: "Watch one voice multiply over the detuned bass, never
quite arriving at unison."

## Motion

All motion runs under 1 Hz, well under the 14 Hz ceiling.
Prefers-reduced-motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's voice and bass agents are carried
visually, not as real WebAudio: the piece is watch-only and visual-only,
with the counterpoint rules expressed as closed-form line functions and
the micro-tunings as vertical detune offsets. No drum track, per the
prompt's own note.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: four voice lines braid across the score band, birth
  rings visible where copies enter, fringes shimmering at near-coincidences,
  smoke streaks rising above the braid, bass line steady along the bottom
  third with pulse dots beneath, title, date, tally and hint all clear,
  no overlaps.
- Mobile 390x844: full-bleed framing holds; braid, birth rings, bass and
  all text legible, hint wraps to two lines, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Fix rounds: the hint first overflowed mobile width (now wraps to two
  lines under 560 px); the smoke first rendered as faint stray dots
  (redrawn as vertical fading streaks); the fringe threshold was
  tightened so the shimmer reads as short marks rather than long bands.
- Determinism: no Math.random, no Date.now, no wall clock; thumb
  md5 2627f7173836aac22b08effc1bd794f9 and desktop md5
  2dd4710cff76bf3e696ca2052ab19c1b identical on a second independent run.

## Known warts

The fringe marks read as small crosses where two lines cross rather than
merely approach; that is the shimmer of near-coincidence doing its job,
kept as is. The bass pulse dots are very faint on the dark ground.
