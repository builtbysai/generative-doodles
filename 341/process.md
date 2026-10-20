# No.341 Make Shake

## Concept

After MyClayCo's Make Shake dice game (2026-04-30): three
chunky dice across the top, each die one parameter of a
small generative system, and below them the current rolled
combination rendered as a study, so the dice read as the
cause of the picture. Die 1 rolls a profile (bird, bow,
frame, leaf), die 2 a stack count (3 to 7), die 3 a
palette from four fixed duos. Faces carry pips only: pip
counts encode the rolled values, never glyphs, never
numbered faces, never any text. Double-tap shakes again;
otherwise the study just breathes. No single-tap action.

## Construction

- One canvas, design space 1280x900, centred fit, page
  ground in the piece's own paper #F4EFE3. Visual Viewport
  sizing with resize listeners on visualViewport and
  window; canvas pinned every frame via style width and
  height in px; phone detection via window.screen min
  dimension under 700px with aspect fallback (h > w*1.15).
  Synchronous first frame: a roll already settled, its
  study already rendered. Every rAF typeof-guarded.
- Exactly 3 dice (asserted in code). Cream #FBF7EE faces,
  ink #1C1A17 pips and rims. Pip layouts are dot data for
  values 1 to 7: die 1 shows profile index + 1, die 2
  shows the stack count itself, die 3 shows duo index + 1.
- Exactly 4 profiles (asserted), hand-authored anchor
  loops as JS data: bird (beak, neck saddle, round breast,
  wedge tail), bow, frame, leaf. Exactly 4 palette duos
  (asserted): (teal #2E8B8B / ink #1C1A17), (terracotta
  #C25E3C / paper #F4EFE3), (gold #D9A441 / cream
  #F2EBD8), (red #D64545 / cream #F2EBD8). The prompt
  names the profiles and the count range but never lists
  the duos; per the batch spec flag these are fly's
  replaceable resolution, taken from this set's own
  earlier palettes, and swap straight out if Bug supplies
  the study's duos.
- The study uses ONLY the No.337 stack grammar:
  concentric outlines of the rolled profile at the rolled
  count (asserted 3 to 7 in every roll table entry), at a
  x1.5 geometric size progression, in the rolled duo, with
  that grammar's gentle breathing loop. Profiles are drawn
  as closed bezier paths: Catmull-Rom handles offset per
  control point from a fixed wobble table (static offsets
  in the anchors, breath offsets on the handles completing
  whole sine cycles in the 20s loop, seamless), so the
  line is never a clean bezier. No No.338 or No.339
  renderer is imported. One construction note: the
  outermost outline is filled with the duo's second colour
  under strokes in the first, because the paper and cream
  duos would otherwise lose half their outlines to the
  paper ground; only duo colours are used.
- Fixed seeded roll table: 12 authored entries, each a
  full profile / count / duo triple, ranges asserted at
  load. Double-tap (350ms window) advances to the next
  entry. The tumble runs 950ms (rotation easing out, hops
  decaying, faces cycling), and the settled roll swaps in
  atomically before the settle frame draws, so the study
  re-renders from the new roll in the same frame the dice
  land. The study never changes on its own.
- No offscreen or stacked canvas, no filters, no
  gradients, no shadowBlur, no audio, no text or UI.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js
  from the actual script: qa-desktop.png at 1280x900,
  qa-mobile.png at 390x844, thumb.png at 720x720, all in
  this folder; all three inspected.
- Frame one verified in all three renders: roll 1 of the
  table settled (bird, count 5, teal/ink). Die 1 shows 1
  pip, die 2 shows 5 pips, die 3 shows 1 pip; the study
  below shows exactly 5 concentric bird outlines, teal
  strokes on the ink silhouette, in the lower two thirds.
- Bird profile took three authoring passes. Pass 1 read
  as a leaf (beak at mid height, dome back, long tail
  flick). Pass 2 read as a flat wedge (one long top slope,
  no head). Pass 3 added the neck saddle dip between tail
  and crown, a round breast and a wedge tail: the profile
  now reads as a plump bird at desktop, thumb and mobile
  sizes.
- Mobile render: phone path taken, centred fit holds the
  composition, paper ground seamless, dice row and study
  both legible.
- Source checked: no em dashes, no absolute URLs, no
  text anywhere in the piece (titles and code comments
  aside, nothing renders as glyphs; pips are dots).
