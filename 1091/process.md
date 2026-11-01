# №1091 "Pop-Up 1895" — Marco Tempest study block MT4

Dahmen's Tesla pop-up book as a pure piece. A white paper spread on black:
from the center fold rise a cloud canopy, two trees, a picket fence and a
small house, all carrying a monochrome projection skin of gear linework and
a gear-cityscape. The numeral "1895" sits on the house face — the observed
TED artifact — under a faint red stage wash from the top edge.

## How it works

- **One master parameter.** Everything hangs off the page-spread angle
  (0–90°). Unattended, the angle breathes on a 40 s loop as a closed-form
  sine between 15° and 80°, so the book slowly opens and closes but never
  shuts in the loop. Element rise height is V-fold math:
  `rise = sin(angle) × maxRise` per element. At angle 0 every element is at
  zero height and skipped entirely — the book is fully flat, nothing
  intersects.
- **The pages.** Two white polygons share the center spine; as the angle
  closes, the outer edges draw inward and lift slightly, the spine crease
  shadow widens toward the bottom, and a whisper of gray shades the left
  page so the fold reads.
- **The elements.** Cloud, trees, fence, house, drawn back-to-front, front
  elements larger. Each is a white silhouette with a crease-gray extruded
  edge offset up-right (paper thickness), outlined in #C9C9C4. The house is
  the largest face and carries "1895" in a serif face, a small gear at two
  corners, and a plain crease door.
- **The projection skin.** Monochrome linework clipped to each front face:
  toothed gear outlines (rim, hub, teeth, spokes) turning slowly at
  per-gear rates in t, and rect skylines whose window lights blink softly
  on sine phases. The whole skin is offset downward by
  `(1 − riseFactor) × 0.03` of frame, so it visibly slides over the faces
  as they rise and flatten. Line drawing only — no photoreal gears.
- **Red wash.** Two flat-alpha red bands (#FF3B30 at 0.15 and 0.05) laid
  over the top edge of the spread: the TED stage lights, faint.
- **Drag.** A vertical drag records its start angle and pointer position;
  while held, the angle is `start + Δy × 140°` clamped to 0–90 (drag down
  to open, up to close — flat is reachable by hand). On release the angle
  eases back to the breathing loop over 6 s with a smootherstep blend.
  State lives only in the recorded events; the angle at any t is a
  closed-form function of them.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via `window.screen` (min dimension < 700) with aspect fallback.
  The spread stays edge-to-edge within the centered square stage on
  phones; page ground is the same #0A0A0A black.
- Determinism: the first frame is drawn synchronously at the fixed phase
  t = 12 s (book ~64° open, elements risen, gears mid-turn); the rAF loop,
  typeof-guarded, continues as phase + elapsed. Thumb rendered twice and
  byte-compared: identical.
- No gradients, no offscreen canvas, no ctx.filter, no shadowBlur, no
  createElement. No audio (none specced). The only visible text is the
  specced "1895" and the <title>.

## Frame one (t = 12 s)

Black ground; the white spread open with its center fold; risen cloud,
trees, fence and house with crease-gray edges; gear linework turning on
the cloud and tree faces; the city skyline along the fence; "1895" legible
on the house; the faint red wash across the top of the spread.
