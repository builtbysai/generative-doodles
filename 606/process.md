# №1912 Muscle Memory Dies (RG1, PP1159, study #250 ruth-goller)

## Driver

A bass neck seen from the player's angle, four strings running the
frame's length. Tuning pegs are alive: at irregular intervals one peg
turns itself a fraction, and the whole field of fretted positions
shifts. The player's hands keep reaching for the old shapes, miss,
and the ear corrects them: notes bend mid-phrase toward the new tuning
until the line finds its footing again. Each correction leaves a faint
ghost trace of the wrong note behind. The whole piece is the failure
and the recovery.

## Mechanism

2D canvas, visual only, no WebAudio. One fretboard agent carries a
per-event tuning table: detune events land on an irregular schedule
(first at t = 3 s, then gaps of 5 + 4 * hash(k) seconds, 5 to 9 s
apart, never synced to the phrasing), each picking one string and
shifting its tuning by 0.12 to 0.34 semitones up or down. Every note
position is computed from the current tuning table, so the misses are
systemic, not scripted: the phrase (one note every 0.55 s, string and
fret from seeded hashes) is fixed, and when a detune lands during a
note the finger starts at the old-tuning position and bends toward the
new one over 1.2 s with smoothstep easing. Each detune leaves a red
ghost ring at the position the old tuning demanded, decaying over 4 s.
The peg that turned carries a brief amber ring. The settled notes trail
behind in amber dots, so the line visibly finds its footing again.

Note positions use standard 12th-root-of-2 fret spacing from the nut.
The tuning shift is magnified 2.5x in the position math so the miss
reads at gallery size; the shift itself is systemic, computed from the
tuning table.

## Frame one

FIRST_T = 9.6 s. The first detune hits at t = 8.42 s (string 3, +0.33
semitones, its peg turns a fraction). At 9.6 s the player is 1.18 s
into the recovery: the note is still bending from the old position
toward the new tuning, the red ghost of the wrong note is still
visible beside it, and the third peg sits freshly turned with its
amber ring. Every event, note and ghost is a pure function of t, so
frame one is deterministic and byte-reproducible; the thumb render
came out md5-identical on an independent second run.

## Interaction

Watch only. There are no pointer handlers and no audio. The mechanism
is the visible recovery; a tap-to-advance would turn it into a
flipbook and kill the waiting. Never click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists
for ruth-goller. Dark rehearsal brown #221710 (page ground), fretboard
wood #2e1f13 with edge #3a2718, darkness #1a110a swallowing the frets
at the lower edge. String silver #c9c2b4, fret wire warm silver
#a89c88, wrong-note ghost red #c0392b, correction amber #d89a3a with
dim trail amber #8a6a2e. Title in warm paper #e8dcc4, hint in muted
tan #b09a78. Hands in dark warm brown #4a3220 with rim light #6a4a2e.

## Composition

Extreme close-up neck filling the frame diagonally, rotated -32
degrees: headstock with four pegs at the upper-right corner like
small hands, frets receding into darkness at the lower-left edge.
Field-like composition, full-bleed on phones and square on desktop
with the page ground set to the piece's own dark background and the
hint color flipped to match. The title plate sits top-left, the hint
"Watch the hands re-learn the neck as the tuning drifts." centered at
the bottom. The fretting hand reaches from below the neck with three
fingers spread across neighbouring frets, middle fingertip landing
exactly on the bending note; the plucking hand works down in the
darkness near the far end, mostly silhouette.

Gallery note: "Watch the hands re-learn the neck as the tuning drifts."

## Motion

All motion runs near 1 Hz, well under the 14 Hz ceiling: note onsets
every 0.55 s, the plucking hand bobbing at 0.9 Hz, the fretting hand
swaying slowly. Prefers-reduced-motion shows the static first frame.

## Deviations

Per the Franke audio rule, the prompt's implied sound is not built:
the piece is watch-only and visual-only, with the detune and recovery
carried by a closed-form event table instead of real audio. No
WebAudio at all.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: diagonal neck reads (four silver strings, frets
  receding and fading toward the lower-left darkness, nut bar, pegs
  at the upper corner with the fresh-turn amber ring); red ghost ring
  beside the amber note; fretting hand with three fingers on the
  strings; trail of amber dots; title, date, hint all clear, no
  overlaps.
- Mobile 390x844: full-bleed framing holds; neck, pegs, ghost, hand
  and all text legible, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Motion spot-checks at t = 4.0 (ghost from the first detune still
  fading, clean line otherwise), t = 17.5 (recovery after the second
  detune), t = 40.5 (fresh detune: amber ring on the top peg, red
  ghost near the nut, note low on the neck).
- Fix rounds: the fretting hand first read as a large brown disc
  (palm shrunk, fingers spread across neighbouring frets, thumb
  braced on the neck's far side); the plucking hand first read as a
  circle with two antennae (shrunk, dimmed to a silhouette in the
  darkness, fingers shortened and thickened).
- Determinism: no Math.random, no Date.now, no wall clock; thumb
  render md5-identical on an independent second run.
