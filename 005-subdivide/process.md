# Doodle №005: Subdivide (2026-09-22)

**File:** `005-subdivide/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
One rectangle split again and again until every piece earns its texture.
Recursive subdivision with jittered split ratios, occasional terminal diagonal
cuts, and nine fill treatments: paper, hatch, crosshatch, stipple, dot grid,
solid ink, solid accent, rings, waves. One dominant accent plus a rare second
per piece, drawn from an earthy set (rust, ochre, indigo, teal, plum); accent
solids get a slight misregistration slip past the ink line, a nod to №003's
print voice. Mondrian-adjacent in method only: the voice here is texture,
hand-wobbled ink lines, and the odd diagonal.

## Technique synthesis (from study, not copied)
- **Irregular recursive subdivision** (Gorillasun method, my own rules):
  axis chosen by aspect ratio, split ratio 0.30-0.70, depth 4-5.
- **Texture fills as the fill language**: hatching/stipple/rings carry the
  composition instead of flat primaries; solids are capped so the piece never
  goes muddy.
- **Viewport-invariant layout**: all subdivision math happens in fixed
  virtual units (1000x1000), scaled only at draw time, so a seed draws the
  identical composition at every screen size. (First version laid out in
  screen pixels; floating-point threshold flips near cell-size boundaries made
  compositions diverge between desktop and phone. Rebuilt structurally.)
- **Failure-mode hardening**: stop probability scales with cell area and
  cells over 30% of the area must split, so no click can land on a two-slab
  composition; large cells are never left plain paper.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for new variation
- Default seed 867530: diagonal cut, indigo/ochre/ink solids, grid and waves

## Verification
- Rendered via headless Chromium CDP at 10+ seeds across two code iterations;
  every seed cohesive, no two-slab or dead-space failures; thumbnail from
  seed 867530 (720x720 canvas crop)
- Viewport invariance verified: identical composition at 900px, 800px, and
  390px viewports (pixel-diffed)
- Mobile 390px viewport: no overflow, composition holds
- Click regeneration verified via CDP (seed updates in URL)
- Zero console errors/log events on load and click
