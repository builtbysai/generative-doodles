# №1947 The Cathedral Keeps Time

LR4 / PP1194, study #254 lucy-railton. Gallery date 2007 · 05 · 12 (formula 2002-01-10 + 1948 days).

## Driver

One cello phrase, four rooms, and the tails do the talking. The phrase
never changes; what changes is how long the room holds it. In the stone
cathedral a note hangs in the air for seconds, thick with harmonics, a
ribbon you can watch rise and dissolve. In the parking structure the
same note is cut off almost at once, two short brutal strands that die
on the concrete. The piece is the comparison: sit still, and the rooms
take turns answering the same eight notes.

## Mechanism

- The phrase is one fixed seed: A3 G3 C4 Bb3 D4 A3 F3 G3, eight notes
  over 12 seconds, onsets at 0, 1.8, 3.1, 5.0, 6.4, 8.2, 9.6, 11.0 s,
  repeating on a global 12 s metronome. The phrase array is a single
  module-level constant, identical for every room.
- Four rooms rotate on a 600 s cycle, 150 s each, with a 6 s crossfade:
  I. The Stone Cathedral, II. A Paris Church, III. The Triangular
  Church, IV. The Parking Structure.
- Each note onset in the current room draws one ribbon: a set of
  parallel gold strands, one per harmonic, that drift upward and fade
  on an exponential envelope. Ribbon length, strand count, decay and
  width come from the room, never from the note.
- Room parameters: cathedral tail 5.2 s, 7 harmonics, decay 1.6 s;
  church tail 3.4 s, 5 harmonics, decay 1.1 s; triangular church tail
  2.6 s, 4 harmonics, decay 0.85 s; parking structure tail 1.15 s,
  2 harmonics, decay 0.4 s. Parking ribbons use a jagged high-frequency
  sway; the other rooms sway smooth.
- Each room has its own faint architecture behind the ribbons: pointed
  arches and a rose window (cathedral), candle glows and a candle-lit
  arch (church), one great concrete triangle in blue-violet haze
  (triangular church), horizontal slabs and columns with one harsh
  sodium bar (parking structure).
- A small label names the current room (top right on desktop, stacked
  under the title on phones) with four index dots; a baseline holds one
  note dot per pitch, labelled with its note name.
- Watch only. No room UI, no knobs, no click-to-reload.
- Audio: visual only. The sound is a closed-form model (fixed phrase
  plus four synthetic impulse-response parameter sets); no WebAudio is
  used, so there is nothing to autoplay and nothing lazy to wire.

## Acceptance criteria

- Frame one is the cathedral (room 0) at FIRST_T = 22 s, mid first
  room, phrase cycle position 10 s, four notes ringing.
- Ribbon length at stage height 828 px: cathedral 310 px, church
  203 px, triangular church 155 px, parking structure 69 px.
  Strand counts: 7, 5, 4, 2. Measured by window.__piece1947.metrics(t).
- Time probes in two different rooms differ: t=200 (church) reports
  room 1, tail 3.4, 5 harmonics, 203 px ribbons; t=499 (parking)
  reports room 3, tail 1.15, 2 harmonics, 69 px ribbons. The phrase
  string is identical in every probe: A3 G3 C4 Bb3 D4 A3 F3 G3.
- Frame one re-renders byte-identical: render-piece.js desktop output
  and the probe harness at t=22 share md5
  977006e2afdb1d931590ab7dee42905b.
- Motion is slow by construction: ribbon drift 18 to 26 px/s, sway
  0.6 Hz (2.2 Hz jagged in the parking structure), room changes every
  150 s. Well under the 14 Hz ceiling. prefers-reduced-motion renders
  a still frame at FIRST_T.

## FIRST_T

22 s. Room 0 (cathedral, 0 to 150 s). Four notes of the phrase are
ringing with visible tails: Bb3 age 5.0 s, D4 age 3.6 s, A3 age 1.8 s,
F3 age 0.4 s. The youngest ribbon is still unfolding, which is the
tail being born, not a gap.

## Probe results

- t=22, cathedral: room 0, tail 5.2, harmonics 7, ribbon 310 px,
  phrase A3 G3 C4 Bb3 D4 A3 F3 G3, fade 1. Desktop, mobile and thumb
  renders visually inspected; arches, rose window and four ribbons read.
- t=152, crossfade: room 1, fade 0.33. Cathedral arches ghost out
  while the church arch and candles fade in; the new room's ribbons
  are already sounding. Blend reads as a dissolve, as intended.
- t=200, church: room 1, tail 3.4, harmonics 5, ribbon 203 px, same
  phrase. Dark warm ground, candle glows, five-strand ribbons.
- t=350, triangular church: room 2, tail 2.6, harmonics 4, ribbon
  155 px, same phrase. Blue-violet ground, great triangle, haze bands.
- t=499, parking structure: room 3, tail 1.15, harmonics 2, ribbon
  69 px, same phrase. Dusk concrete, slabs, one short jagged
  two-strand ribbon at D4. At t=500 no ribbon is visible (the last
  note died 1.6 s earlier and the next has not sounded); t=499 was
  chosen so the probe catches a live tail.
- Frame one byte-identical across three independent renders
  (render-piece.js twice, probe harness once): md5
  977006e2afdb1d931590ab7dee42905b.

## Deviations from the prompt

- The prompt names the rooms "a stone cathedral, a Paris church, a
  triangular concrete modernist church in blue haze, a raw concrete
  parking structure". They are labelled I. The Stone Cathedral,
  II. A Paris Church, III. The Triangular Church, IV. The Parking
  Structure. No other naming change.
- The prompt's "slow cycle moves room to room every few minutes" is
  set to 150 s per room, 10 minutes for the full cycle, with a 6 s
  crossfade between rooms instead of a hard cut.
- The prompt's four synthetic convolution impulse responses are
  parameter sets (tail, harmonic count, decay) driving the ribbon
  model, not audio convolution: the piece is visual only, per the
  Franke audio rule.

## Known warts

- A note struck a fraction of a second before the probe instant reads
  as a small gold knot: the ribbon stub, its head dot, its note dot
  and its label all sit within about 30 px. Visible at t=350 near G3.
  It is the tail being born, but at a glance it looks like a smudge.
- In the parking structure the Bb3 note dot lands on a column line
  by coincidence. Harmless, but the dot is half hidden there.
- During the 6 s crossfade the two rooms' architectures overlap and
  the frame goes briefly muddy, most visibly the rose window showing
  through the church arch. That is the dissolve doing its job, and it
  clears within seconds.
- The parking structure can show no ribbon at all for a second or two
  between notes, since its tail visibility window (2.5 s) is only just
  longer than the longest gap between phrase notes (1.9 s). The
  emptiness is the point of the room, but a first-time viewer may read
  it as the piece stalling.

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js
  at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three PNGs
  visually inspected. Desktop and thumb are square stage; mobile is
  full-bleed with the room label stacked under the title.
- Fix rounds: 2. Round 1 fixed a non-idempotent first frame
  (drawRibbon set ctx.lineCap to round, which leaked into the next
  frame's architecture strokes; draw now resets lineCap, lineJoin and
  globalAlpha) and a ground-fill bug (the frame was filled with the
  previous room's background when fade reached 1, so rooms 2 to 4 wore
  the wrong ground). Round 2 fixed the mobile plate collision, raised
  the room subtitle contrast, lengthened ribbons, and gave each pitch
  one shared home height instead of one per note occurrence.
- Re-gated after the final edit: frame one md5 unchanged across
  render paths, all three sizes re-rendered and re-inspected.
