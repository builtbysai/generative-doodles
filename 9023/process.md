# Doodle №9023: Self-Planned Town (2026-09-24)

**File:** `9023/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A fictional antique county plat of a town that planned itself. Surveyor vectors
walk outward from scattered starts, turning slowly, and stop the moment they
touch another road. When the primaries finish, side streets sprout off the long
roads at rough right angles. The map is dressed as a real survey plate: aged
paper, a faint plot grid, double border frame, compass rose, and a cartouche
with a recombined town name and surveyed date per seed.

## Technique synthesis (from study, not copied)
- **Growth vectors with stop-on-contact** (Robert Hodgin road-growth lineage):
  two vector types (curving vs straight), grid-bucketed collision so roads end
  in T-junctions instead of crossing, line weight proportional to road length
  so arterials read wide and lanes thin.
- **Branch sprouting**: long roads seed 1-2 child streets at 25-75% along their
  length, launched near-perpendicular with a collision grace period so they
  clear their parent before the contact rule bites.
- **Antique plate dressing**: warm paper with radial-gradient mottling, survey
  grid at 0.10 alpha, lifted-ink halo under each stroke, dashed centerlines on
  arterials, serif cartouche, "400 rods" scale bar, N-arrow compass rose.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new survey
- Default seed 902302: Quillfield, surveyed 1847

## Verification
- Zero console errors on load (desktop + 390px mobile); no overflow at either
- Rendered 3 seeds headless: all produce interlocking, grown-feeling networks;
  default seed is the strongest (clear arterial, readable branches)
- Two real bugs fixed during iteration: (1) roads self-collided on step one
  because the contact check had no self-exclusion, fixed structurally with
  per-road IDs; (2) curving vectors made perfect donut loops from constant
  turn, fixed with a damped random-walk turn rate; branch sprouts died
  instantly on their parent's stamp, fixed with a 10-step collision grace
