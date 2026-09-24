# Doodle №8999: Storm Grid (2026-08-31)

**File:** `8999/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Seven by seven nested squares in the lineage of Vera Molnar's (Des)Ordres:
order is the subject, disorder the rare event. A fixed disorder budget is
spent on two or three storm cells that are never adjacent: heavy corner
jitter, extra rings, a slight rotation, three ink overdraw passes so they
read darker. The other forty-six cells stay near-perfect with only a
micro-tremble in the hand.

## Technique synthesis (from study, not copied)
- **Disorder as budgeted events** (Molnar recipe from the 2026-09-23 study):
  storm cells carry the whole accident load; calm cells get tremble only,
  no random disasters anywhere.
- **Closed trembling paths**: each ring is drawn as one continuous polyline
  whose perpendicular offset is a smooth periodic function around the
  perimeter, so jittered corners always close cleanly.
- **Storm signature**: corner jitter up to 7.5% of cell size, 8-11 rings vs
  the usual 4-6, rotation up to 4 degrees, 3-pass overdraw for the dark-ink
  look of a pen gone back over itself.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new plot
- Default seed 899901: three storm cells, top-right, mid-left, bottom-right

## Verification
- Zero console errors on load (desktop + 390px mobile); no overflow
- Rendered 3 seeds headless: storm cells read as surviving accidents in all
  three; the calm grid never looks noisy, the storm cells never look clean
