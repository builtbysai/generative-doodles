# №9039 · Wind Field, process notes

A gust frozen mid-passage through wheat. Hundreds of blades lean downwind,
the bend swelling in a gaussian core so the gust's shape reads across the
field. One poppy stands unbent among them, the only red in the piece.

## Concept

One idea, stated plainly: wind made visible by what it bends, plus one
thing it cannot bend. The poppy is drawn erect on purpose while every blade
around it leans; the contrast is the whole piece.

## Technique

- 700 wheat blades, each a quadratic stem with a hand-wobble control offset,
  an elliptical seed head rotated to the tip tangent, and five fanning awns.
- Bend per blade: base lean + gaussian gust swell (seeded center/width) +
  faint sine ripple + per-blade jitter, clamped. Downwind is +x.
- Depth cueing: blades scale up and darken toward the foreground; back rows
  are small and pale. All blades sorted by base y and drawn back to front,
  the poppy inserted at its own depth so wheat overlaps it naturally.
- Poppy: straight ink stem, two ink leaves, five plain red petals with
  per-petal shade jitter, ink center. Red appears nowhere else.
- Print finish: warm paper gradient, faint distant wash at the low horizon,
  wobbly plate frame, 5200 grain dots, vignette. Viewport-invariant 1000x1000
  composition units. Click reseeds via ?seed=.

## QA (2026-10-02, local, honest)

- `node --check` on extracted JS: clean. No em dashes in copy or comments.
- CDP fail-closed exception probe (isolated port 9341), desktop + mobile:
  zero exceptions, zero console errors.
- Rendered at five seeds (424242, 777001, 90210, 123456, 555555) and looked
  at every one: all composed, gust readable in each, poppy visible but never
  dominant, no dead sides, no seed rejected.
- Default seed 90210: poppy sits at the visual center with the gust swelling
  just right of it, the strongest telling of the concept.
- Desktop 800x800 and mobile 390x844 inspected: square print centers, caption
  holds, no overflow.
- Not verified: click-reseed in a live browser (same one-line pattern as the
  shipped №9038, which works); nothing else outstanding.
