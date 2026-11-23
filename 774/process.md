# №9085 · Fission

A rectilinear recursive-subdivision composition in the concrete art tradition. Replaces the earlier "Orbit" (circles/arcs) at Hans's direction — same muted palette family, purely orthogonal vocabulary.

## Concept

The canvas is a field of rectangles that endlessly divides and heals. A binary space partition splits the bone ground into cells along the longer axis; each cell is a flat tone from a muted stone/graphite/paper palette, with one or two vermilion accents for the single shout. Thin ground-colored gaps read as grout lines between the blocks. Mondrian-adjacent, but the motion is contemporary: the composition is never finished, it breathes through fission and fusion.

## Motion

- Every 5–9 seconds (idle), a random cell splits with the divider sweeping in from the edge, or a clean pair merges back into one
- Splits favor the longer axis with occasional cross-splits; split positions land at 32–68%
- Tap any cell to split it (resets the idle clock)
- All animation eased in-out, ~0.7s per transition

## Palette

Bone ground #D8D4C8; graphite #2E2C28, #3A3833; slate #5A6068; stone #8A867B, #6E6A5E; warm greys #A39E8E, #B8B2A2, #CFC9B8; vermilion accent #C23E1D (max 2 cells).

## Technical

- Seeded RNG (mulberry32, seed 9085) for a stable canonical composition
- Binary space partition tree in normalized coordinates — resolution independent
- Canvas 2D, ~15–30 leaves, trivial per-frame cost, 60fps
- DPR capped at 2, visualViewport-safe full-bleed, touch-action none
- No text in artwork
- Date: 2026 · 11 · 26 (base 2002-01-10 + 9086 days)
