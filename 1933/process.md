# №1933 Arpeggiator: process notes

Driver: a home studio corner where one held key feeds an arpeggiator
and every tap adds another voice to the jam. The beads are the music
you can see: they climb in a spiral, scatter, and fall back to the
keys.

- Study: #252 chris-hyson (CH6, PP1180). studies/chris-hyson.md does
  not exist in the repo (404), so the palette is hand-picked from the
  prompt's named colors: home-studio warm brown #2a1a10, tapestry
  reds #8e3b1d / #a64a24 / #6e2a14 and oranges #c75b2a, tone-beads in
  biscuit gold #e8b64c with cream #f2d8a0, amber #ffc94d, bright
  orange #ff9a3d and coral #e0653a, synth keys #f5efe4 and #1c1512,
  biscuit #c98f3d on a cream plate #efe3c8.
- Formula date: 2007-04-28, displayed "2007 · 04 · 28".
- FIRST_T = 12 s. The arpeggiator steps every 0.5 s and beads live
  6 s, so at t = 12 the weave holds beads from thirteen steps
  (t = 6 to 12), four beads a step, mid-spiral. Frame one state: one
  note held (key 4, E, biscuit gold), 52 beads alive, the gold column
  rising to about 0.19H, the plate and tapestry static. Frame one is
  byte-reproducible: every bead is a pure function of its step index,
  bead index and t through a seeded mulberry32.
- Template: mirrored №1932 (page structure, title/date plate, hint
  styling, house rules). Visual Viewport sizing with resize on
  visualViewport and window; canvas pinned in draw(); phone detection
  via window.screen with aspect fallback; full-bleed on phones, square
  on desktop; one synchronous frame at load; requestAnimationFrame
  guarded with a typeof check.

## Mechanism

Twelve white keys and eight black keys anchor the lower third; the
tapestry (banded reds and oranges with a seeded diamond motif, fringe
along its bottom edge) hangs behind as the backdrop; the control
strip carries four knobs and a plate with a half-eaten biscuit (a
plate-colored bite taken out of its edge, crumbs scattered). A
held-note pool feeds the arpeggiator: every 0.5 s it steps to the
next note in the pool and emits four beads from that key. Each bead
lives 6 s, climbing in a widening spiral (angle speed 1.6 to 2.8
rad/s, radius up to 0.085W), scattering sideways, then falling back
to its key as it fades. Tap a key to press it: its note joins the
pool with its own color and its beads join the weave. Notes are
never lifted; they ring until they fade. The top-right plate counts
the held notes and names them. No audio: visual-only by design (the
Franke audio rule; no WebAudio, nothing autoplays). No
click-to-reload. One held note is enough to keep the texture alive.

## QA hook

location.search accepts ?tapkey=N (0-11) to press key N at t=0
before the first frame, and ?t= to move the first frame.
render-piece.js passes its seed argument as ?seed=N, so a small
integer seed is read the same way as ?tapkey=N.

## Fix log

- Round 1: first render read as a scene but the bead weave was
  nearly invisible: tiny faint terracotta beads lost against the
  tapestry, and the hint was illegible where it crossed the pressed
  key. The top-right plate had no wash, so the ink sat on gold
  diamonds.
- Round 2: beads enlarged (radius to 0.010H, halo alpha 0.38, core
  0.98), spiral widened (radius 0.085W, rise 0.55H, scatter 0.14W),
  four beads per step, and the note palette brightened to golds,
  cream, amber and coral so beads read against the reds. Hint moved
  onto a dark wash pill with cream ink; top-right plate got its own
  dark wash.
- Round 3: on phones the two top washes merged into one band across
  the top. Narrowed the title wash to 200 px and the held wash to
  140 px so a gap opens between them on narrow stages.

## Probe results (720x720 renders)

- Default: md5 b81ecece5df6c9aba19cd761ddb9cbc1, "held · 1 note", E,
  gold bead column.
- Default re-render: md5 b81ecece5df6c9aba19cd761ddb9cbc1, byte-identical
  across runs (cmp confirms).
- Probe ?tapkey=3 (rendered via ?seed=3): md5
  fd8801d84c75b02cf838d9efd83f5c09. The D# key is pressed (terracotta
  tint), the plate reads "held · 2 notes" and "E + D#", and a second
  coral bead stream joins the weave beside the gold one. The tap
  changes pixels and the mechanism, not just the label.

## Deviations from the prompt

- Visual-only, no WebAudio arpeggiator sound (see Mechanism above).
- The keyboard is a twelve-white-key span rather than a full synth
  range, so it fits the square stage; black keys follow the standard
  2-3-2-3 pattern within it.

## Known warts

- The bead column reads as a rising column more than a loose spiral;
  the spiral is visible in the overlapping orbits but the weave stays
  close to its key's x.
- On narrow phones the tapestry diamonds crowd behind the two top
  plates; the washes keep the text legible.
- The plate's biscuit reads as a crescent rather than a bitten disc
  at thumb size; the bite and crumbs carry it at full size.
