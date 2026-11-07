# Contours, No Noise — №1594

Driver: soft ink-blue cloud contours breathe and reform on white paper while hand-hatched rain falls denser wherever the clouds darken.

## Mechanism

- Ten cloud contours, each a sine-warped superellipse (exponent 2.4–3.6, three sine warp harmonics) with per-point hand jitter from a fixed mulberry32 seed per cloud. No Perlin noise anywhere; every wobble is a seeded sine or a seeded jitter offset.
- Contours re-form on a closed-form 60 s cycle: warp amplitudes, phases, and centers ease between two fixed seeded target sets with a cosine morph parameter, plus a slow breathing scale. Frame one is at t = 30 s, mid-cycle, so clouds and rain are fully present.
- Rain is ~1500 short vertical hatch strokes placed by rejection sampling against cloud darkness at frame one, so strokes cluster under the clouds; a sparse 10% drizzle covers the open paper. Each stroke falls at a fixed seeded speed, wrapping the field, and its alpha and length follow the live cloud darkness at its current position, so density tracks the reforming clouds.
- Palette is paper white #F7F4EC and ink blue #2A4E8A only. Watch-only: no pointer or touch listeners of any kind. prefers-reduced-motion renders a single static frame.
- Field is square and centered on desktop, full viewport on phones. Viewport sizing uses the Visual Viewport API with resize listened to on visualViewport and window; the canvas element is pinned in draw() via style width/height in px. First frame is drawn synchronously at load; every requestAnimationFrame call is typeof-guarded.

## Deviations

- None from the spec. One fix round during QA: the first render had the phone field as a square at the top of the viewport, leaving the lower half blank; the field rect was split into FW/FH so phones are genuinely full-bleed while desktop stays square. Desktop and thumb renders were byte-identical before and after that fix.

## QA

- Rendered the actual script with node-canvas at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually: 10 legible jittered contours, rain visibly denser under dark clouds, only the two palette colors, mobile full-bleed, no blank frame.
- Thumb rendered twice; md5 identical both times (13664f725a3aec734b63debb49c3c5b3).
