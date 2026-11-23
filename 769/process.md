# №9080 · Concrete

A hard-edge geometric composition in the concrete art tradition, after Lucien Groen.

## Concept

Precise geometric shapes (rectangles, circles, triangles, bars) arranged on a strict 5×7 grid over a warm paper ground. Flat muted colors, crisp edges, no gradients, no texture. The beauty is in proportion and relationship.

## Motion

The composition is alive but restrained:
- Every ~9 seconds, one shape glides to a new grid cell with smooth easing
- All shapes breathe at 1.5% scale on slow phase-offset oscillation
- Tap to trigger an immediate reconfiguration

## Palette

Paper ground #E4DDCC with muted concrete-art colors: deep slate, brick red, ochre, sage, charcoal, steel blue, burnt sienna.

## Technical

- Seeded RNG (9080) for stable composition
- Occupancy grid prevents overlaps
- DPR capped at 2, 60fps, phone-safe (visualViewport, touch-action none)
- No text in artwork
