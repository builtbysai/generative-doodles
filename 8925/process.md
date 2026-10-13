# №8925 · Chord Orbits - process notes

## Concept
Three concentric rings of points; every k-th pair joined by a hairline.
k differs per ring, so one ring weaves a dense diamond lattice while
another draws a slower star polygon. Warm white thread on near-black,
nothing else. The seed chooses point counts, steps, radii and phase;
click for another. Brief concept #4 (chord orbits).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 8925. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
- Centered radial piece: ground (#0d0b14) is the page color, composition
  centers at any size on desktop and phone.
- Rings: 48-95 points each, step k 2..n/2 seeded per ring, radii 0.30 /
  0.62 / 0.94 of piece size with jitter, seeded phase. Hairline strokes
  at alpha 0.34-0.56; one resting dot at center.
- Warm white #f2ead8 on near-black #0d0b14.

## Differentiation
- vs No.9078 (Shimmer): Shimmer is concentric dashed rings with
  interference. Chord Orbits is straight chords between ring points;
  its interest is in the woven webs.
- vs No.9077 (Compass): Compass is radial/directional. Chord Orbits is
  pure chord geometry, no compass reading.
- vs No.8926 (Desordres): Desordres is a rectilinear grid on bone.
  Chord Orbits is radial string art on black; opposite camp.
- Family name: "string geometry".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  desktop 1280x800, mobile 390x844 (phone screen simulated), and thumb
  720x720. All three inspected: three distinct webs read clearly, no
  clipping, no doubling, centered on phone.
- Piece date 2026-06-19 from the 2002-01-10 + (N+1) formula.
