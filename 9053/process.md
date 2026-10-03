# №9053 · Misregister

## Study
Instagram generative-art search (2026-10-03): the CMYK misregistration
current — overlapping offset color plates mimicking print registration
error, as seen in plotter pieces layering cyan/magenta/yellow linework.
The color IS the misregistration.

## Concept
One geometric form — nested twisting squares — pulled three times in
cyan, magenta, yellow, each plate offset and rotated slightly. Multiply
blending lets the inks overlap like real print. Registration marks in
the corners, also misregistered, sell the print-shop fiction.

## Process
- 9-13 nested squares, twisting inward, hand-wobbled corners.
- Three plates (C #00a3c8, M #d8367f, Y #e8b400), ±13px offset,
  ±0.025 rad rotation, multiply blend, 0.85 alpha.
- Line weight thickens outward.
- Corner registration marks (circle + cross) per plate.
- Click reseeds.

## QA
- Desktop 1280x800 inspected: chromatic fringing reads as misprint.
- Zero exceptions (cdp_exceptions.py).
