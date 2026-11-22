# №1961 Third Hand Dealt

CW2 / PP1208, study #256 caius-williams (opening piece of the study).
Gallery date: 2007 · 05 · 26 (formula date 2002-01-10 + 1962 days).
Gallery note: "Three voices trade the same small motifs, dealing in and out around the ink field. Tap to deal a new hand."

## What it is

A dark gray ground with black gestural calligraphic brush marks, after the
GRAIN Series#1 covers. Three voices sound, each a hand dealt into the trio:
tenor-like (ochre), bass-like (rust), percussion-like (chalk). The same
small set of six motifs persists across deals; only the voicing changes.
Three motif tokens orbit the centre, dealing in and out on slow elliptical
paths. The full motif bank is drawn along the bottom, the three currently
dealt marked with a voice-coloured tick.

## Palette

- Ground: #26262a dark gray
- Ink: #111114 black, softened ink #1c1c20
- Tenor accent: #d9a441 ochre
- Bass accent: #b4552d rust
- Percussion accent and plate text: #e8e4d8 chalk
- Non-dealt bank motifs: #6a6a72 mid gray

## Determinism

FIRST_T = 18 s. At t = 18 the three tokens sit mid-orbit at spread angles,
radii mid-pulse, and the opening hand (deal 0: motifs sweep, dot run, arc)
is fully in. Frame one is a pure function of t and the deal count; the ink
field is seeded once from the piece number (mulberry32, seed 1961) and is
identical on every deal and every render. Motion is slow by construction:
orbit drift 0.045 to 0.08 rad/s, radius pulse about 0.035 Hz, well under the
14 Hz ceiling. prefers-reduced-motion shows the still first frame.

## Interaction

Tap (pointerdown on the canvas) deals a new hand: deal count increments,
the trio re-voices, and the old hand crossfades to the new over 1.2 s.
Deal d gives voice v the motif (d + 2v) mod 6, so each deal sounds three
of the six and the set rotates through all six over successive deals.
Tap is a deal, never a reseed: the motif bank never changes, only the
hands. The plate reads "Hand N of the trio" and the hint reads
"Tap to deal a new hand."

## Audio

Visual only, per the Franke audio rule. The prompt's WebAudio trio is not
built; the visuals run on a closed-form sound model (orbit drift and radius
pulse as the sounding). No audio, no autoplay.

## QA probes

- Desktop 1280x900, mobile 390x844, thumb 720x720 rendered from the actual
  script with node render-piece.js; all three inspected visually.
- Determinism: thumb rendered twice, md5 identical:
  ec74bda619a533e4cbf495a043ab6b9e
- Deal probes (?seed= as the deal alias): deal 0 thumb md5
  ec74bda619a533e4cbf495a043ab6b9e, deal 1 eba83bc9363eb182106b8d77c145964b,
  deal 2 bbec8b6bec97c8cd642758e7d4ef85fb. Deal 1 render inspected: readout
  "Hand 2 of the trio", tenor now slash, bass now cross, percussion now
  stab, while the bank shows the same six motifs with the ticks moved.
- Logic probe (node harness, /tmp/probe1961.js): bank is the fixed array
  ["sweep", "slash", "dot run", "cross", "arc", "stab"]; hand(0) = [0,2,4],
  hand(1) = [1,3,5], hand(2) = [2,4,0], hand(3) = [3,5,1]; two simulated
  taps moved deal 0 to 1 to 2; all six motifs are covered over three deals
  and all three hands are distinct.

## Fix rounds

1. First build: the motif bank was too faint and cramped. Non-dealt bank
   glyphs were drawn in softened ink at 0.75 alpha and nearly vanished
   against the ground, and on mobile the six glyphs crowded into 280 px
   with the caption touching them. Fixed: bank glyphs enlarged
   (desktop 0.042u, mobile 0.045W), row widened to 0.86W, non-dealt glyphs
   redrawn in mid gray #6a6a72 at 0.9 alpha, caption moved to bankS*1.25
   below the row, mobile bankY moved to 0.82H. Re-rendered all three sizes
   and re-gated determinism after the edit.
2. Same round: the sweep motif read almost identically to the arc motif.
   Widened the sweep to plus/minus 0.62u with a flatter rise so it reads
   as a rising stroke rather than a half circle.

## Deviations from the prompt

- The prompt's three voice agents with per-timbre synth settings and
  WebAudio are visual only (see Audio above); the voicing is carried by
  accent colour, orbit speed, and motif assignment instead of sound.
- The prompt names no explicit motif shapes; the six-motif bank (sweep,
  slash, dot run, cross, arc, stab) is the fixed set the piece invents
  once and then never changes, per the prompt's own discipline.

## Known warts

- In some deals a low-orbiting voice label can sit close to a bank tick
  dot (for example the "bass" label near the cross tick in Hand 2). The
  two do not overlap, but the gap is tight.
- The long horizontal brush stroke crosses the motif bank row on desktop;
  the bank glyphs stay legible over it, but the slash and cross read
  slightly thinner where the stroke passes behind them.
- The stab motif, rotated by its token angle, reads as three horizontal
  bars in Hand 2 rather than vertical strokes; the motif identity is
  still clear from the bank.
