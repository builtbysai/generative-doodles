# Doodle №9014: Bloom (2026-09-15)

**File:** `9014/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
First the ruler draws, then the water takes over. Exact geometric
compositions (a circle-triangle-bar construction, concentric arcs from a
corner, a 3x3 grid with a diagonal sweep) are laid down in crisp ink, and then
simulated watercolor washes bloom over the anchor points and dry where they
want. The tension is the piece: geometry that refuses to wobble, pigment that
refuses to stay inside the lines.

## Technique synthesis (from study, not copied)
- **Watercolor geometry** (Tyler Hobbs' simulated-watercolor method, my own
  compositions): each wash starts as a plain polygon, gets recursively
  deformed by Gaussian midpoint displacement, and is stacked as 40-70 nearly
  transparent glazes. Wet washes bleed far with high edge variance; dry ones
  stay tighter.
- **Restrained pigment**: three triads (indigo/ochre/madder, teal/sienna/
  indigo, madder/ochre/umber), one per piece, cycling across the washes. One
  darker boundary pass per wash for edge pooling, plus speckled granulation
  and a cotton-paper grain underneath.
- **Staged animation**: ink draws first over about 1.4 seconds, then washes
  bloom one after another, each over about a second. `?t=` freezes any point
  in the timeline; reduced-motion users get the finished sheet.
- **Failure-mode hardening**: an early version redrew the full frame every
  animation tick and the ink darkened with each pass; rebuilt as incremental
  delta drawing so nothing is ever overdrawn. A resize listener was
  restarting the animation from zero on load in some browsers; it now
  preserves the frozen progress. Click reseeds everything through one seeded
  stream so the composition is stable per seed.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a fresh sheet
- Default seed 901415: arcs composition, teal/sienna/indigo triad

## Verification
- Rendered via headless Chromium CDP at multiple seeds across all three
  composition kinds; every seed cohesive, geometry crisp, washes feathered
- Partial-reveal frame (`?t=.45`) shows ink complete and washes mid-bloom
- Mobile 390px viewport: no overflow, composition holds
- Click regeneration verified via CDP (seed updates in URL)
- Zero console errors/log events on load and click
