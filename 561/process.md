# Sixteen Mirrors (№1706, PP953, #224 aaron-penne)

Driver: one noise-wiggled wedge mirrored into a 16-sector black and white mandala.

## Mechanism

A single source wedge spanning 22.5 degrees is drawn once per frame and mirrored radially 16 times: even sectors are rotated copies, odd sectors are rotated and reflected with scale(-1, 1). The wedge holds 7 warped black bands (alternating 0.88 and 0.55 alpha), 14 noise-perturbed concentric polylines, 3 radial spokes, 5 dotted rings, and 2 edge lines. The wiggle is a sum of integer harmonics (2, 5, 9) in the wedge coordinate u, so wig(0) equals wig(1) by construction and sector edges meet their mirrored neighbours with no drift. Dots sit strictly inside the wedge (half-step offset) so none doubles at a seam. Dot radius jitter comes from a seeded mulberry32(1706) stream fixed at load. A black central disc with a paper ring and pin closes the middle. The wedge evolves slowly: clock advances at 0.15x real time, so the source drifts and the mirror turns small changes into large symmetric blooms. Watch-only, no pointer handling. Ground is paper white (#F7F4EC); every ink is black (#111111) or a black alpha; plates are white with a black hairline, black ink. No color anywhere.

## Acceptance numbers (measured, not assumed)

- Sector count (probe): 16.
- Seam alignment (probe seamGap over radii 40 to 400 px at t = 4.0): 3.8e-14 px, effectively zero.
- Per-sector contents (probe counts): 7 bands, 14 polylines, 3 spokes, 2 edge lines, 90 dots; 1,440 dots total across the mandala.
- Frame one is a fixed pre-roll at t = 4.0; no Math.random or Date.now in the drawing path (the one grep hit is the comment stating that). Seeded RNG only.
- Renders inspected: desktop 1280x900, mobile 390x844, thumb 720x720. All three read clean: symmetric mandala, no seam lines, plates legible, hint plate clear of the mandala on desktop and thumb; on mobile the circle keeps its shape in the tall viewport with quiet margins top and bottom, per the centered-geometric house rule.

## Deviations from the prompt

- The spec asks for the sector rendered to an offscreen buffer and drawn 16 times. That is what the shipped code does in the browser (document.createElement buffer, rebuilt each frame as the wedge evolves). The node-canvas QA shim has no document.createElement, so under QA the code falls back to drawing the same sector function directly 16 times with identical transforms; the renders above are that path and are visually identical to the buffer path.
- The wiggle is harmonic value-noise (integer harmonics with radius and time dependent phase) rather than a grid value-noise field, chosen so the wedge edges are exactly periodic and seams cannot drift.

## Gallery note

"Watch the mandala bloom."
