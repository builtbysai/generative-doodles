# No.426 Golden Sun — process

After Yael Hofri (@yaelhofri), EXPANSION #46 prompt YAE2
(Sweetemberdays26 Prompt 1). Gallery date 2003 · 03 · 13
(formula date). Built 2026-10-20 per
BATCH-425-429-SPEC.md.

## Concept

Her balcony mechanism: one huge flat golden sun
dominating the sky, a woman watering her plants below
it. A flat radiant disc with exactly 12 ray triangles
turns slowly over a brown railing and a terracotta
floor band; terracotta pots in three sizes stand along
the bottom edge; leafy trails on bezier stems trail in
from the upper left; the woman, lower right at exactly
half the canvas height, holds a tilted watering can
whose stream of golden dots falls into the big pot at
her side. Warm saturated flat fills, no text anywhere,
no signature.

## Construction

One canvas, design space 1280x900, all marks drawn
directly each frame from JS data. No offscreen canvas,
no gradients, no shadowBlur, no filters.

- Palette, closed: sun #F5A623, rays #F7D354, sky
  #A8D8F0, balcony terracotta #C97B4A, railing brown
  #5B3A29, leaves #4E7A3A / #6FA84F, dress #F06A8A,
  skin #F2C49B. Nothing else. Two resolutions inside
  the closed set: the watering dots take the ray
  yellow (drops catching the sunlight — the only
  palette colour visible against sky, dress and
  terracotta alike), and the hair takes the railing
  brown. The pots carry a brown edge in the same
  brown so their terracotta separates from the
  terracotta floor band.
- Loop: 30s, seamless, asserted. The rays rotate
  exactly one ray pitch (30 degrees, a twelfth of a
  turn) per loop, so the wrap is invisible by the
  sun's own 12-fold symmetry. The sun pulses 1.0 to
  1.04 on 3 whole cycles per loop. Every animated
  quantity runs on whole cycles of the loop.
- Sun: centre (640, 280), disc radius 205 (diameter
  410, about a third of the width), 12 ray triangles
  asserted, drawn rotated then the disc scaled by the
  pulse.
- Leaves: three bezier trails (stems stroked in the
  dark green) carrying exactly 12 leaves asserted at
  fixed curve parameters, each swaying on 2, 3 or 4
  whole cycles per loop with a fixed seeded phase.
  Pot foliage: exactly 30 leaves asserted, six per
  pot, fanning over the rims, swaying on whole cycles
  at a smaller amplitude with the same air.
- Pots: exactly 5 asserted, scales 0.50 / 0.58 /
  0.62 / 0.88 / 1.02 (three sizes), rimmed trapezoids
  standing on the 884 baseline. The big pot (x 838,
  scale 1.02) is the watering target.
- Woman: feet on the 884 baseline, head top at 434 —
  exactly half the canvas height. Hair is a brown
  disc behind the shoulders (lower half covered by
  the dress) plus a crescent cap and a bun; face is
  two closed-eye arcs, a smile and dress-pink cheeks,
  all in the palette brown and pink. Her left arm
  ends at the can handle's end; the can (terracotta,
  brown handle arc) tilts at -0.38 rad over the big
  pot, spout tip at (821, 701).
- Stream: exactly 7 dots asserted on one quadratic
  path from the spout tip to (838, 782); each falls
  12 whole times per loop, staggered by sevenths, and
  wraps at pot level. The target pot's foliage is
  drawn after the stream, so the drops sink into the
  plant.
- Drag (the air): pointer velocity is smoothed from
  move events; while dragging, an air value eases
  toward a target set by that speed, and the leaf
  sway amplitude scales by (1 + 2.4 x air). On
  release the air decays geometrically per tick and
  snaps to exactly zero below 0.002, so the sway
  settles back to exactly the ambient loop. The sway
  itself is a pure function of the loop clock and
  the air value.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 7.5s (sun turned a quarter
  of a ray pitch, pulse at exactly mid-scale 1.02,
  dots spread down the stream); the clock is
  anchored there and advances in fixed 1/60 ticks
  from rAF timestamps, never from Date.now().
- Sizing: Visual Viewport size with resize listeners
  on visualViewport and window; the canvas element
  is pinned via style width/height in px every
  frame; phone detection via window.screen min
  dimension < 700px with the aspect fallback.
  Desktop uses cover fit. Phones take a width fit
  instead (the No.413 precedent): at 390 wide a cover
  crop would cut the woman or the sun whole, while
  the width fit keeps the full composition with the
  sky continuing above the design and the terracotta
  floor band continuing below it, both seamless
  because the design's own grounds run to its edges.
  Pointer coordinates convert through the stored fit
  transform (S, OX, OY).

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). The thumb was rendered twice
  from the shipped script and compared byte-identical
  (final thumb md5 ede39599...).
- First pass fixes: (1) the pot bodies vanished into
  the floor band, sharing its terracotta — the pots
  gained a brown edge (body and rim stroked in the
  railing brown), and the small pots' foliage was
  scaled up so all five plants read. (2) The stream
  at 16 dots merged into a continuous yellow ribbon
  over the short fall — reduced to exactly 7 dots,
  which read as separate falling drops and land in
  the target plant. (3) The hair fall behind the
  shoulders was a hard-edged rectangle reading as a
  board — replaced with a brown disc the dress
  covers, leaving hair beside the face. (4) The
  grip hand floated below the can handle — the arm
  and grip now meet the handle's end and the can
  hangs from the hand.
- Desktop render: sun centred in the top third with
  all 12 rays, trails in from the upper left, five
  outlined pots along the floor, the woman whole at
  half height with the dotted stream falling into
  the big pot.
- Mobile render: width fit holds the whole scene;
  sky above, terracotta below, nothing cropped.
- Thumb: the cover crop keeps the sun, the woman,
  the can, the stream and the target pot; the
  composition reads instantly at gallery size.
- Deviations: the phone width fit (No.413 precedent)
  in place of a phone cover fit, documented above;
  the golden watering dots and brown hair are
  resolutions inside the closed palette, documented
  above. Nothing else departs from the spec or its
  adaptation flag.
