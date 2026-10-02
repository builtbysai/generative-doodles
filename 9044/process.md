# №9044 · Smoke — process

A single column of smoke rising from a point low on the sheet: stacked
translucent curls that widen, drift sideways on a gentle S-curve, and
dissolve before the top margin. Monochrome ink wash on warm paper.
Meditative and minimal: one breath, made visible.

## Technique

- The column is ~60 soft puffs along a rising path. Each puff is two
  offset radial gradients (never one hard circle), sizes growing with
  height (26 to ~126 units), alpha falling as age^2.8.
- Spacing grows with puff size so the overlap ratio stays roughly
  constant; a billow rhythm (sine on alpha along the column) gives the
  rising puff-by-puff cadence of real smoke.
- A darker young core low down: small tight blobs along the path where
  the smoke is born, plus a faint breath mark at the source point.
- Puffs paint top-first so the young dense smoke draws over the old faint.
- Print voice: warm paper gradient, wobbly hand-drawn plate frame, 5200
  grain dots, subtle vignette, generous empty margins. No accent color;
  restraint is the point.
- Viewport-invariant 1000x1000 virtual units; seeded RNG (mulberry32);
  ?seed= selects, click reseeds.

## QA (2026-10-02, local, honest)

- `node --check` on extracted JS: clean. No em dashes anywhere.
- CDP fail-closed exception probe (desktop 900px and mobile 390px):
  zero exceptions, zero console errors.
- Rendered at 5 seeds (424242, 777001, 90210, 123456, 555555) and looked
  at every one. First pass FAILED my own bar: the top accumulated into a
  dark blob (alpha fell slower than puff area grew) and the column read
  as a vertical smudge. Retuned: alpha now falls as age^2.8, spacing
  scales with puff size, S-curve amplitude raised to 80-140 units.
  Second pass: all 5 seeds read as rising smoke, density correct
  (dense at source, gone at top), no lollipop circles, no banding.
- Default seed 555555: the most graceful S-drift of the five, good body
  through the middle, clean dissolve.
- Desktop 800x800 and mobile 390x844 inspected: square print centers,
  caption holds, no overflow.
- Not verified: click-to-reseed (trivial location.search assignment,
  same mechanism as shipped pieces).
