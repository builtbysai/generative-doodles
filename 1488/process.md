# №1488 "Rewind Until It Collapses" (nadja-ringart NR1, PP735)

## Frame one
Teal ground; cream-framed broadcast panel (grey ground) across the upper
two-thirds; two rows of four charcoal suited figures, still, at the panel
edges; one larger centered speaking figure with arms out; a short gold
sentence polyline, half-drawn, rising to the speaker's upper right; a thin
rewind bar across the lower third (grey track, gold fill, charcoal playhead).
Mobile keeps the same full-bleed composition with no clipping. No visible
text except `<title>`.

## Mechanics (all closed-form over loop-local time)
- 27 s collapse loop: 5 repeats of 5 s, then a 2 s collapse hold.
- Each repeat: a play phase (sentence draws to trim 1 − 0.2k, k = repeat
  index) then a rewind phase (sentence undraws to nothing). Play duration
  shrinks slightly per repeat (3.5 − 0.2k s), so playback speed rises.
- The speaker's gesture gets jerkier per repeat: head tilt and arm swing run
  at (2 + k) sine cycles per segment — integer cycles, so every segment
  starts and ends at zero and the loop closes exactly. Mouth opens/closes on
  2 cycles per play segment, closes through the rewind, and is shut during
  the collapse hold, when the figure stops entirely.
- Collapse hold (t = 25–27): the sentence is a single scarlet dot at the
  sentence origin; every figure stays on screen (the speaker never
  disappears). At the loop boundary the full sentence restores and repeat 0
  begins again — the restore is the wrap itself, a single state change.
- Drag along the rewind bar scrubs the collapse (pointer x maps to loop
  time); release resumes the automatic loop from the scrubbed position via
  a closed-form offset. Drags starting off the bar are ignored. Drag never
  edits the sentence, never deletes a figure, never restarts the panel.
  Never click-to-reload.

## Adaptations
- Sentence as a fixed seeded polyline (mulberry32, seed 1488000) with a trim
  parameter driven by the repeat counter, exactly as specced; the sentence
  shape never changes, only its drawn length.
- Frame one is phase-shifted +1.75 s into repeat 0's play so it opens on a
  half-drawn sentence rather than an empty start; loop closure is unaffected
  because all state derives from loop-local time.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. No
  fading alphas are used (every fill opaque). Dots as own-beginPath arcs,
  figures as rects + arcs (node-canvas quirks).
- Determinism: frame one = draw(0) via the boot path (constant PHASE),
  clock starts only with the rAF loop (plain function declaration behind a
  typeof guard); every animation sine runs on loop-local time with integer
  cycles per segment — the №1482 loop-closure lesson applied from the start.

## Flags
- TITLE DUPLICATE (verbatim, per precedent, not renamed): this title
  duplicates №1474 "Rewind Until It Collapses" (carole-roussopoulos CR4).
  The prompt's own wording carries the same title; it ships verbatim and
  the duplication is flagged here and in the gallery note.
- The rewind-bar mechanism echoes №1474's rewind strip by the study's own
  design, but the piece is distinct: №1474 rewinds a broadcast scene, this
  one trims a spoken sentence to a dot.

## Verification (forced-time probe, tmp/probe1488.js; vm-isolated instance,
real node-canvas, piece driven via window.__piece)
- t = 0 redraw 0 px; fresh instance t = 0 identical; t = 27 vs t = 0 = 0 px;
  t = 54 vs t = 0 = 0 px (loop closes exactly, twice over).
- Panel gold px at repeat mid-plays: 861, 694, 526, 367, 203 — strictly
  decreasing, the trim working as specced.
- Repeat 0 play vs rewind panel gold: 861 → 585 (sentence undraws).
- Collapse hold t = 26: panel gold 0 px, panel scarlet 183 px (the dot),
  charcoal 127,510 px (all figures present, speaker never disappears).
- Drag: down on the bar + move scrubs (frame differs 5,823 px); release
  then frame(0) equals draw(scrubT) exactly (0 px) — resume is exact.
- Off-bar drag ignored.
- Renders inspected at 1280×900, 390×844, 720×720; thumb byte-identical
  across repeated renders. Token scan: no Math.random, no forbidden APIs.
- No fix rounds needed. (One probe correction only: the first probe counted
  gold over the whole frame, which included the gold rewind-bar fill and
  made the trim look inverted; panel-restricted counting confirmed the
  sentence itself trims correctly.)

## Files
- index.html (md5 101737ad5e0d704b8d458c6461961a62)
- process.md (this file)
- thumb.png (720×720), qa-desktop.png (1280×900), qa-mobile.png (390×844)
- tmp/probe1488.js
