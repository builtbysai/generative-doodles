# Process — №8969 "Value Ramp Grid" (2026-08-01)

Sketchbook seed 130: "The Embrace-the-Chaos mechanic, derived not copied.
A grid of half-square triangles, random diagonal orientation per cell, one
hue family, value ramped by position (not random: a deliberate gradient the
randomness plays against). Success: the large-scale flow is legible at
thumbnail size; a viewer can feel the ramp before seeing any single triangle."

## Concept

A 32x20 grid of half-square triangles on warm paper. Each cell flips two
seeded coins: which of the two diagonals splits the cell, and which half
goes darker. Lightness follows a deliberate positional ramp — a diagonal
sweep across the piece, L 0.10 to 0.90 in a single indigo hue family
(hue 222, sat 48%). Each cell's two triangles sit at ramp value +/- 0.15
(plus small per-cell jitter), so the eye averages every cell to its ramp
value: the large-scale flow reads first, the random diagonal texture second.
Slightly imperfect triangle edges (tiny seeded vertex jitter) and a fine
paper-grain overlay keep it print-like, not screensaver-like. A thin plate
mark borders the field. Seeded still per load; click or tap the piece for a
fresh seeded variation via ?seed=. Default seed 130 (the sketchbook seed).

## Differentiation (from used concept families)

- №8999 "Storm Grid": a grid of nested SQUARES with a fixed disorder budget
  concentrated into storm cells. This piece uses TRIANGLES, a VALUE RAMP, and
  no storm cells or disorder budget.
- №9021 "Subdivide": irregular RECURSIVE subdivision with texture fills. This
  piece is a REGULAR grid with no recursion and no textures.
- №9017 "Strata Break": concentric RINGS. This piece has no rings; its
  macro-structure is a diagonal value sweep.

## What was tried (all renders inspected at 100% and at thumbnail scale)

- Ramps: diagonal sweep, radial (from a corner), wave (sine bands). The
  diagonal sweep won decisively at thumbnail scale; radial produced an
  awkward dark blob, wave read as banding rather than flow.
- Hue families: indigo 222 (winner), terracotta 18 (close second, attractive
  but dark triangles went near-black-brown and harsh), violet 265 (muddy
  midtones, weakest).
- Half-cell value gap: 0.30 (winner: strong quilt bite, flow still legible)
  vs 0.20 (smoother flow but mushy texture).
- Grid density: 32 cols (winner) vs 44 cols (texture dissolved into noise at
  thumbnail, flow weaker).
- Seeds compared at full size: 130, 42, 777, 2026. Seed 130 (the sketchbook
  seed, TL dark to BR light) chosen as default; 42 (opposite diagonal) also
  strong, kept as a click variation. Ramp sweep direction rotates among the
  four corners by seed, so clicks vary direction too.

## Final QA

- Renders: desktop 1440x900 and mobile 390x700 inspected, no scroll or
  overflow (scrollWidth/scrollHeight equal viewport at both sizes).
- Click verified via CDP: canvas click rewrites ?seed= to a fresh random
  seed on both viewports.
- Zero console errors / exceptions at 1440x900 and 390x700
  (~/workspace/tools/cdp_exceptions.py exit 0, isolated Chrome port 9336).
- thumb.png is exactly 1280x800, captured in full-bleed thumbmode (?thumb=1)
  with the default seed 130.

## Files

- index.html: self-contained piece page, no libraries
- thumb.png: 1280x800 gallery thumbnail (seed 130)
- process.md: this file
