# Doodle №002: Three Shapes (2026-09-19)

**File:** `002-three-shapes/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A tangent chain: each new shape sits tangent to the last, the chain wandering
at golden angles across the page. Circles, squares, and triangles only. The
construction scaffolding (tangent links, bounding circles) stays visible as
part of the piece. Two muted inks on paper, one translucent accent fill.

## Technique synthesis (from study, not copied)
- **Construction geometry as the artwork**, Zitzmann's Geometry Daily lesson:
  the guides are not hidden, they are the composition's skeleton
- **Tangent-chain placement**, my own rule: golden-angle walk with bounding
  circles tangent, reflected at margins so every seed stays composed
- **Two-ink discipline**, Zitzmann's palette logic: slate blue foreground
  shapes, warm taupe construction lines, paper-white ground
- **Overlap-transparency accent**, Zitzmann's rosette trick: one shape gets a
  translucent terracotta fill, layering doing the color work
- **Grain pass + vignette**, the print finish from №001's lessons, kept subtle

## Parameters
- 7-10 shapes, seeded PRNG (mulberry32), `?seed=` in URL or click for new variation
- Start size 0.13-0.18 of canvas, decay 0.72-0.95 per step (gentle, so the
  chain travels instead of collapsing)
- Chain starts off-center at a golden-ratio point (avoids centered sameness)

## Verification
- Rendered via headless Chromium CDP at seeds 424242, 777001, 123456, 20260919
- First pass had over-aggressive size decay (0.52-0.90): chains collapsed into
  cramped clusters. Retuned to 0.72-0.95 and larger starts; all four seeds now
  read as open, wandering constructions
- Every seed distinct, every seed composed; no console errors; DPR-aware rendering
