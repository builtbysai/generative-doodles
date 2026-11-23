# №8924 · Contour Drift - process notes

## Concept
Sixty horizontal lines, each displaced by layered 1D value noise whose
phase slides line to line, so the field reads as slow topographic drift.
One warm-charcoal ink on paper white; negative space does the work. The
seed chooses noise offsets, amplitude profile and phase rate; click for
another. Brief concept #5 (contour drift).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 8924. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
- Field piece: lines run full-bleed edge to edge on desktop and phone.
- Two octaves of 1D value noise (9 + 25 lattice points), phase slides
  per line via phaseRate; amplitude swells toward the middle band via a
  sine envelope and eases at the edges. Hairlines at alpha 0.55-0.85.
- Paper white #f7f4ec, warm charcoal #26221c.

## Differentiation
- vs No.8925 (Chord Orbits): chord webs on black. Contour Drift is
  horizontal waves on white; opposite camp, opposite energy.
- vs No.8926 (Desordres): grid of squares on bone. Drift has no grid
  at all, just continuous lines.
- vs No.9078 (Shimmer): Shimmer is concentric op-art on bone. Drift
  is linear and calm.
- Family name: "topographic calm".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  desktop 1280x800, mobile 390x844, and 720x720 thumb. All three
  inspected: lines read as slow drift, full-bleed on phone, no
  clipping, no doubling.
- Piece date 2026-06-18 from the 2002-01-10 + (N+1) formula.
