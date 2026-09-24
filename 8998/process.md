# Doodle №8998: Palette Walk (2026-08-30) — REPLACEMENT

**File:** `8998/index.html` (self-contained, vanilla canvas, no dependencies)

Replaces the original №8998 "Tennis Ball" (tiny raytraced room), retired at
Hans's request on 2026-09-24: "Not a fan of №8998 redo/replace it." The
raytraced-room concept family is RETIRED and must never be built again.

## Concept
A map of a palette's journey. Three anchors sit on a native hue wheel
(angle = hue, distance from center = lightness); a luminous ribbon walks
between them through color space, with sampled station-dots along the way.
The strip below is the same walk told as legend — one color function feeds
both, so they can never disagree.

## Technique synthesis (from study, not copied)
- **Palette journey as cartography** (meodai poline lineage, seed 21): the
  eased anchor-to-anchor path is the artwork, not a means to recolor
  something else. Hue travels the shortest arc; lightness rides its own
  easing.
- **Per-axis easings**: three path modes — sine (both axes eased), drift
  (hue linear, lightness eased — the walk spirals), plunge (hue eased,
  lightness quadratic — sharp climbs and dives). The button visibly bends
  the ribbon.
- **Direct manipulation**: drag any anchor to a new hue/lightness (pointer
  events, touch-safe); tap an anchor to nudge it somewhere new; click empty
  space for a fresh seeded walk. The map re-resolves live.
- Anchors are seeded with minimum 55° hue separation so every default walk
  has a real journey in it.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click empty space for a new walk
- Default seed 899801: A 355°/46 → B 277°/38 → C 138°/55, saturation 63 —
  red through violet and blue out to green, with a lightness valley
  mid-journey. Chosen over 899802/04/05/06 for the widest mood swing.

## Verification
- Zero console errors on load (desktop + 390px mobile); no overflow
- CDP interaction tests: ease button cycles sine→drift→plunge with caption
  update; anchor drag moves the anchor (355°→67° in test); empty-space
  click regenerates all three anchors
- Rendered 5 seeds headless and inspected each; ribbon/dots/legend/anchors
  all correct in every one
