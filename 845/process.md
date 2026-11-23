# №845 Remix the Cassette Archive, process notes

SN7 / PP1245, study #260 syd-nuku. Drag interaction.
Gallery date: 2004 · 05 · 05. Hint: "Drag to remix the archive."
Renumbered from №1998 to №845 on 2026-11-23 (Hans renumbered the
gallery 1-843); number and date strings are the only change from the
original build brief.

## Driver: the piece as a felt phenomenon

A marsh at dusk, the water gone blue-green under a gold horizon, and
an archive that has washed up in it. Paper fragments float on the
surface as if the marsh were a shallow tray of water: a stencilled
title panel, a scrap of script, four small sea-and-umbrella pictures,
a curl of loose tape, two cassette shells sunk to their middles in
reeds. Nothing is still. The reeds lean and recover, the fragments
drift a few pixels on slow water, and on the big cassette a spool
turns, patiently, once every 24 seconds. The tape head rests on the
big cassette's label like a hand left on the archive. Dragging it
across the frame is reaching into the water: fragments near the head
stir, change places, and settle into a new collage order. Let go and
the marsh goes back to swaying, with the archive rearranged.

## Build

- Template: the MC8 (№1991) structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with
  aspect fallback, field-like full-bleed on phones / square on
  desktop, one synchronous frame at load, requestAnimationFrame
  guarded by typeof check).
- Marsh background: dusk sky gradient (deep teal-green to a gold band
  at the horizon), a half-sunk gold disc with a reflection column,
  flattened dark cloud streaks drifting slowly, 64 distant reed
  silhouettes along the horizon, dark blue-green water with 16 gold
  shimmer streaks breathing on 9-29 s periods.
- Nine fragments, all seeded at load with mulberry32 (seed 845):
  title panel (stencilled "REMIX THE / CASSETTE ARCHIVE", letter by
  letter in bold monospace, with paper-colored bridge bars cutting
  each line twice for the stencil effect), script scrap (three lines
  of abstract wavy glyph strokes with dots, no legible words, plus a
  torn corner), four sea-and-umbrella panels (orange, gold, black and
  teal canopies, each with ribs, stick and sea reflection, at odd
  scales and rotations), a tape ribbon curl, and two cassette shells
  (orange labels with abstract label lines, tape windows, spooled
  reels, corner screws, soft water shadows).
- Reeds: 30 back reeds behind the fragments and 24 front reeds in
  front of them, so the cassettes read as half-buried. Each blade
  sways on its own 6-11 s period. About half the front reeds carry
  seed heads.
- The turning spool is the big cassette's left reel, one revolution
  per 24 s. The other reels counter-rotate at 0.7x.
- No audio. No em dashes in visible copy. No external assets.

## Interaction

- Drag scrubs a tape head across the frame. The head rests on the big
  cassette's label when idle. While dragging, a thin gold tape line
  runs from the head to the turning spool.
- On pointerdown and pointermove while dragging, every fragment whose
  center lies within 0.30 * min(stageW, stageH) of the head is
  affected: the affected fragments rotate their slots in the draw
  order by one, and each gets a new target offset (up to 0.035 of the
  stage horizontally, 0.025 vertically) and a small target rotation
  (up to 0.08 rad) from a deterministic stream seeded by the drag
  count, then eases to it over 1.4 s with a smoothstep and a small
  decaying wobble. A 0.5 s cooldown per fragment keeps a long drag
  from re-rolling the same fragment continuously.
- Release settles to a stable arrangement: after the last drag event
  plus 1.4 s, every offset sits exactly at its target and stays there
  until the next drag. The settled arrangement is deterministic given
  the same drag path (same pointer positions and event times), because
  the targets come from a seeded stream keyed on the drag count. A
  drag far from every fragment moves only the head and remixes
  nothing.
- Reduced motion: the piece renders one still frame at FIRST_T and
  runs no animation loop. Drag still remixes, but the settle jumps
  straight to the target instead of animating.

## Determinism

- FIRST_T = 12 s, cycle = 90 s.
- At t = 12 the spool has turned half a revolution (angle pi), the
  reeds are mid-sway, and every fragment is visible. The first frame
  shows the archive at rest in the marsh, legible, never empty.
- No wall-clock or random seed at load; all motion is a pure function
  of t, and all layout is seeded at load. The animation clock starts
  at FIRST_T and advances from performance.now only in the live loop.
- Determinism check: rendering the 720x720 thumb twice gives
  identical md5 (3bfd88e426e6e3da4efef41773826cd4).

## Probe results (probe-845.js, desktop 1280x900 renders, final file)

- Time probes: t = 12 md5 5fdd1d91d20825b6610d3d1c4c4d7c5c; t = 57 md5
  a28b98846fc6832903ded59d18ca2af7; t = 80 md5
  212f00ef0b648076de3f4469b956b579. Spool angle at t = 12 is 3.142 rad
  (half a revolution), at t = 57 is 14.923 rad, at t = 80 is 20.944 rad.
- Pixel diffs (threshold > 8 per channel, 685,584 px total): t12 vs
  t57 78,541 px changed (11.46%); t12 vs t80 83,246 px changed
  (12.14%). Reeds sway, the spool turns, fragments drift.
- Determinism: rendering t = 12 a second time gives identical md5
  (5fdd1d91d20825b6610d3d1c4c4d7c5c).
- Drag probe (synthetic pointer events dispatched through the real
  canvas handlers: down on the big cassette, moves across the frame,
  up): collage order changed from [0,1,2,3,4,5,6,7,8] to
  [2,1,4,6,5,7,3,0,8]; 8 of 9 fragments changed settled offsets;
  mid-settle offsets at t = 12.7 differ from settled offsets at
  t = 20; settled offsets at t = 20 and t = 40 are identical (the
  arrangement holds still); settled frame md5 at t = 20 is
  50ccaf77fc67a54cfc3e62e33a72d919, different from the no-drag t = 20
  frame; pixel diff drag-settled vs no-drag is 118,231 px (17.25%),
  and mid-settle vs settled is 97,800 px (14.27%).
- Far drag probe (down and move at canvas (10,10), far from every
  fragment center): collage order unchanged, nothing remixes.
- Renders inspected: desktop 1280x900, mobile 390x844, thumb
  720x720. All three read cleanly: title panel, script scrap, four
  umbrella panels, ribbon curl, two cassettes, reeds, sun disc.

## Fix rounds

1. First gate: the sky clouds rendered as distinct dark discs,
   reading as blobs behind the title and script panels. Fixed by
   flattening the clouds (vertical scale 0.30) and lowering alpha
   from 0.10 to 0.08, so they read as horizontal dusk streaks.
2. Re-gated fully after the fix: desktop, mobile and thumb
   re-rendered and inspected; time, determinism and drag probes
   re-run on the final file. No edits since.

## Deviations from the prompt

- The Arabic script fragment is drawn as abstract script-like glyph
  strokes with dots, per the brief's rule to draw abstract strokes
  and not copy real legible text. It suggests script without saying
  anything.
- The tape head rests visibly on the big cassette's label when idle,
  so it reads as part of the archive rather than a floating cursor.
  While dragging, the gold tape line to the turning spool shows the
  head doing work.
- The release arrangement is deterministic given the same drag path,
  but it is not frame one: the archive stays remixed until the next
  drag. This is the brief's own settle rule, documented above.

## Known visual warts (honest)

- The script scrap's torn corner reads as a small dark notch at the
  top-right edge rather than a tear.
- The soft water shadows under the cassettes read as dark pools in
  the water, slightly heavier under the small cassette.
- On phones the title panel and the script scrap crowd the top of
  the frame, and the sea panels sit in a tight row; the portrait
  stage stretches the marsh vertically.
- At rest, the tape head can read as a small dark block on the big
  cassette's label until the first drag reveals what it is.
- The umbrella reflection strokes in the sea panels are subtle and
  can read as stray vertical lines at thumb size.
