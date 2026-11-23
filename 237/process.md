# №451 Belleville Metro — process.md

## Concept
A station interior that is a garden that happens to be underground: white-tiled
vault with hanging plant cascades from the top corners, a terracotta
passive-cooling sculpture, wooden shelves of free books, baskets of produce,
painted mural panels, and a navy station sign. Small figures read, walk, and
water plants. No trains, no crowds, no metro-map UI.

## Construction
- Landscape, field-like: vault fills the frame full-bleed; floor strip is
  the bottom 20% with a track hint at the very bottom edge.
- Fixed authored tables, index 0 at load: sign texts [BELLEVILLE,
  IL FAIT BON, JARDIN, LECTURE]; mural compositions [sun, arches, waves,
  diamonds]; shelf and basket layouts (four each). Tap (pointerup without
  drag) advances all three together; never reloads.
- Plant strands sway with per-strand phases; the walker loops across the
  floor, the reader holds a book, the waterer drips. First frame is drawn
  synchronously at a fixed phase (1.5s); the rAF loop is anchored to that
  phase and guarded by a typeof check.
- Standing rules kept: Visual Viewport sizing with listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; no offscreen canvas, no document.createElement; the
  sign is the only designed lettering, from the fixed table.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Thumb 720x720 rendered twice: md5 d7c295e3ffda21ec9c072d8f9214e972
  both runs, byte-identical (determinism gate PASS).
- Desktop 1280x900 inspected: BELLEVILLE sign centered, sun murals flanking,
  terracotta sculpture center, book shelves left, produce baskets right,
  tile joints, plant cascades, floor strip with track hint, reader and
  waterer figures visible. Mobile 390x844 inspected: full-bleed field, all
  elements present, no clipping.
- Fixes during QA: first pass had the book shelves and baskets overlapping
  the mural panels; shelves and baskets were moved below the panels, figures
  were enlarged, and strand leaves were slightly reduced. Re-rendered and
  re-inspected after the fix.
