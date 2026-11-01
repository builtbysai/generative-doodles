# №1319 "Event Score" — leslie-hewitt LH8 (PP486)

A bone-colored still life as a playable score, from Hewitt's Dia Bridgehampton
suite (2022-23): Untitled (Basin Hmm, Hum, or Hymn) and For Solo Hammond B3
Organ, Double Contrabass Flute, or Tambourine… (2024, with Jamal Cyrus).

## Frame one

Landscape diptych, full-bleed. Left 62%: a low concave frame in shadow
bronze holding a Moroccan tile grid (cobalt / white / terracotta, seeded
pattern, small diamonds on cobalt tiles) with three bone-colored instruments
on it — a cast-bronze conch (spiral arc fan with spire wedge and lip line),
a triangular tambourine (bone triangle, copper jingle dots at corners and
edge midpoints), and a flat cymbal (bone disc with shadow-bronze rim and
copper center dot). Five copper wire staff-lines run horizontally across the
frame; the frame's inner edge is bowed inward top and bottom, marking the
concave frame. Right 38%: a black monitor with a thin bone frame holding
three phosphor line icons (conch spiral, triangle, cymbal ellipse) above a
scrolling metadata list: object names and short material notes only
(CONCH - CAST BRONZE, TAMBOURINE - TRIANGLE, CYMBAL - BONE, BASIN HMM, HUM,
HYMN, with intake/layering/stamping/hold/release/return timestamps). At
frame one the conch is struck: a soft layered flat-alpha halo around it, a
ring around its monitor icon, and a copper beat dot at the left of the top
staff line. A "4/4" readout sits at the monitor's bottom.

## Motion (all closed-form over piece time and recorded taps)

- 4/4 pulse, slow (1.1 s per beat): each beat lights one instrument in
  sequence — conch, tambourine, cymbal, rest — as a soft glow that decays
  within the beat, with a matching ring on its monitor icon and a copper dot
  riding the staff line. Wire vibrates faintly on beats.
- Metadata scrolls continuously (closed-form offset from piece time; frame
  one sits at offset zero).
- Tap toggles the pulse between 4/4 and a broken 7/8 (0.55 s eighth notes,
  pattern conch / tambourine / rest / cymbal / conch / rest / tambourine).
  Mode is a closed-form function of recorded tap times. Never tap-to-reload.

## Rules honored

- Silent: no audio of any kind. The prompt forbids audio; the rhythm is
  visual only.
- No literal musical notation, no drum-machine UI, no photorealistic
  instruments (bone-colored abstractions throughout).
- Determinism: frame one is exactly draw(0) via a boot flag; the clock starts
  with the rAF loop. Tiles, scroll, pulse, and glow are closed-form functions
  of piece time and recorded taps; no Math.random anywhere (seeded
  mulberry32 only, seed 1319000 for the tile field).
- House rules: Visual Viewport sizing with resize listeners; canvas pinned
  in draw(); phone detection via window.screen physical size with aspect
  fallback; on phones the diptych stacks (frame top 62%, monitor below) and
  holds the same read at 390 wide. One synchronous developed frame at load;
  rAF guarded by typeof check and written as a plain function declaration.
  No gradients, shadowBlur, filters, offscreen canvas, WebGL, or AudioContext;
  glows and shadows are layered flat alpha shapes; dots use moveTo before
  every batched arc (node-canvas quirk).
- Visible text is prompt-specced content only: the monitor's metadata and
  the 4/4 / 7/8 readout, plus <title>. No sentences, no slogans.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb; all three inspected. Forced-time probes (temp copies, discarded):
t=2.2 (4/4 cymbal beat) differs from frame one in 34,968 of 518,400 pixels;
t=3.5 (rest beat) in 32,254; a tap-seeded t=2.2 (7/8, conch beat) in 7,494 —
confirming the pulse sequence, the scroll, and the tap toggle. Thumb
rendered four times total, all cmp byte-identical.

Fix rounds: (1) first render's conch glow washed half the panel — glow radii
and alphas cut roughly in half; (2) the conch spire first read as a detached
flag triangle — replaced with a tapered wedge hugging the fan's upper-left
edge; (3) monitor icon highlight rings tightened; (4) the mode label
overlapped the metadata list on mobile — the list clip now reserves a label
strip at the monitor's bottom.
