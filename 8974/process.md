# №8974 · Negative Space — process

Seed 132 from the FUTURE_PIECES.md seed list ("Negative Space Birds").

## Concept
The figure/ground flip: a dense, loud field of overlapping bold shapes
(discs, bars, triangles) in three bright inks on a quiet warm ground, with
one recognizable silhouette punched out of the field via
`destination-out`. Nothing is drawn where the subject is. The bird, the
letter, the key, the fish are made of empty paper; painting over the
"empty" middle would destroy the piece, which proves the composition
lives in the ground.

Gallery caption: "Three loud inks crowd the paper and leave one shape
untouched. The bird is the part nobody painted."

## How it is built
- Quiet ground `#f1ebdb`. One of four loud three-ink palettes per seed
  (vermilion/ultramarine/ochre, teal/magenta/orange, indigo/red/gold,
  forest/purple/crimson).
- A tight jittered grid of discs first, covering the ground almost fully,
  so the only quiet ground left is the silhouette; then a second layer of
  larger bold discs, bars, and triangles for the loud overlap.
- Five hand-built silhouette families, one per seed: a bird in side
  flight (fan tail, beak, one wing up and one down), a perched songbird
  (head, beak, plump body, long tail, branch), a serif letter, an old key,
  a fish. Seed 132 is pinned to the flying bird as the strong default;
  other seeds roll their own kind. Click re-rolls seed and kind.
- `?kind=` overrides the family (testing hook), `?mask` renders the
  silhouette alone in dark ink (debug view used during development).

## Differentiation from adjacent used families
№9000 "Interruptions" is a dense field of equal-length randomly-rotated
ink dashes with SHAPED ERASURE VOIDS reading as the figure: erasure is
the drawing tool, the mark is a hairline dash, the palette is monochrome
ink on paper. This piece uses NO erasure: loud overlapping colored
shapes are placed across the whole field and a silhouette mask is punched
out of the shape layer, so the background reads as the figure. Different
mechanism (placement around a silhouette, not carving voids out of a
dash field), different mark (bold discs/bars/triangles, not hairline
dashes), different palette (three loud inks, not monochrome). It does not
read as another dash-field piece.

## Seeds tried
- 132 (default, pinned flying bird): winner. Dense teal/magenta/orange
  field, bird reads instantly at desktop and at 390px mobile.
- mask-mode iterations of the flying bird: the first wings-up gull pose
  read as a bird in isolation but dissolved into thin spikes inside the
  loud field, so it was replaced with the side-flight pose (beak + fan
  tail + two wings), which reads unambiguously in noise.
- perched bird: the first profile read as a banana; rebuilt with a
  distinct head circle, beak, plump body, tail wedge, and branch.
- letter (A), key, fish masks all read cleanly on first pass; the key's
  bow/shaft junction was changed from tangent-touch to a 50-unit overlap
  to kill a hairline antialias seam.
- Real bug found and fixed: the perched bird's head floated detached in
  the mask. Cause: overlapping subpaths with opposite windings cancel
  under the nonzero fill rule and leave a hole. Fix: every subpath is
  now filled separately (beginPath/fill per part), so overlaps union.

## QA notes
- Viewports: 1280x800 desktop and 390x844 mobile full-page renders; no
  scroll or overflow at either (scrollWidth/Height equal viewport).
- Console: `cdp_exceptions.py` reports zero exceptions/errors.
- Click: verified via CDP that clicking the stage rewrites `?seed=` and
  reloads a fresh variation.
- Real bug found and fixed: screenshots showed a cream band below the
  art while the live layout measured correct. Cause: the canvas bitmap
  was sized from `getBoundingClientRect()` during the first layout pass,
  which can report a wrong height (bitmap desynced from the CSS box).
  Fix: the bitmap is now sized deterministically from
  `stage.clientWidth` at the known 8:5 ratio, and the canvas carries its
  own `aspect-ratio: 8/5` instead of `height: 100%`. Verified bitmap and
  CSS box agree at both viewports by reading the canvas pixels directly
  (bypassing the compositor, which can also serve stale surfaces).
- Thumb: `thumb.png` is 1280x800, captured from `?thumb&seed=132`.
