# No.1573 "Flesh and Bone" — SB6, PP820, #207 senbaku-deconbatch

Gallery date: 2006 · 05 · 03. Interaction cue: "Watch it breathe."

## Spec (verbatim prompt, from TASKS.md)

Radial tentacled organism on paper-white, grown from a De Jong attractor —
dozens of fleshy tentacles in reds, pinks, ochres radiating from a dense
core, each tentacle a thicket of fine lines with translucent membrane webs
between them; between a sea anemone and an anatomical drawing. Palette:
paper ground #F7F4EE; tentacles crimson #B83A4A, rose #D4697E, ochre
#C98A3A, deep maroon #6E2430. Nothing else. Composition: organism centered
at ~60% of frame, generous paper margin, thin dark frame line (her
presentation habit). Motion/interaction: watch-only. The organism breathes
— tentacle tips sway on slow Lissajous paths and membrane webs pulse in
alpha, ~12s loop. Never any pointer interaction. Technical: De Jong
attractor iterated to build a point cloud, rendered as radial tentacle
strokes (map attractor points to polar tentacle arms); membranes as
low-alpha filled quads between adjacent arms; sway via per-arm phase
offsets. Avoid: horror-movie gore; photorealism; tentacles detaching from
the core; color outside the flesh family.

## Build

- Seeded PRNG (mulberry32, seed 1573). De Jong attractor (a 1.2..1.8,
  b -2.6..-1.8, c 2.0..2.8, d -2.4..-1.6, seeded) iterated 16,000 times
  into a point cloud, normalized by max radius.
- Arms: 26 radial arms. Each attractor point falls into one arm's wedge;
  per arm the angular deviation from the arm's center angle is binned by
  radius (24 bins), averaged, smoothed with a 3-bin moving average, and
  clamped inside the wedge, so each tentacle is a smooth wavy path that
  follows the attractor's structure. Tentacle path runs from r=0.06 to
  r=1.0 of the organism radius.
- Render: organism radius 0.30*minDim (diameter ~60% of frame), centered.
  Each arm is a tapered polyline (lineWidth 4u down to 1u) in one flesh
  color, plus two faint parallel lines (alpha 0.28, offset 1.8u) for the
  thicket of fine lines. Membranes: low-alpha rose quads between adjacent
  arms at radii 0.35/0.6/0.85, alpha 0.05 pulsing with the breath. Dense
  core: maroon disc, crimson heart, ring of 10 paper dots. Thin maroon
  frame line inset 14u. No gradients, no Path2D, no shadowBlur; every
  batched arc preceded by moveTo; fading alphas rounded to 4 decimals.
- Breathing: per-arm sway is a Lissajous pair, x = sin(TAU*t/12 + phase),
  y = sin(2*TAU*t/12 + phase2), both whole cycles of the 12 s loop, scaled
  by (r/R)^2 so bases stay glued to the core and only tips sway. Membrane
  alpha pulses 0.6 + 0.4*sin(TAU*t/12 + phase).
- House rules: Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; centered geometric
  piece keeps its shape, page ground is the piece's own paper color, hint
  chip maroon with paper text. One synchronous frame at load; every
  requestAnimationFrame call guarded by a typeof check. No em dashes in
  visible copy. No pointer interaction of any kind. No click-to-reload.

## QA

Rendered from the actual script with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile,
and 720x720 thumb; all three inspected visually.

- Fix round 1 (zigzag tentacles): first build sorted each arm's raw
  attractor points by radius into a polyline; consecutive points jumped
  around inside the wedge, so tentacles read as lightning zigzags and the
  membranes as big pale washes. Rebuilt the arms from binned, smoothed
  angular deviations (see Build). Re-rendered: smooth wavy tentacles
  radiating from a dense core, membranes faint webs.
- Fix round 2 (waviness): the smoothed tentacles read too radial and
  sun-like, the attractor's signature barely visible. Amplified the
  smoothed offsets 1.8x (still clamped inside the wedge). Re-rendered:
  tentacles now wander organically while staying attached to the core.
- Probe (probe-1572-1575.js, hand-driven rAF clock): frame one
  deterministic, 0 differing bytes across two t=0 draws at 1280x900;
  26 arms, attractor a=1.529, b=-2.538, c=2.645, d=-2.246; 231,068 bytes
  changed t=0 -> t=6 (breathing visible); loop seam t=0 vs t=12 is
  exactly 0 differing bytes; thumb re-render byte-identical
  (md5 89eca661591ac26e8d1f5aacf9583e09).

## Deviations

None from the prompt. One interpretation note: the attractor's angular
deviation is amplified 1.8x after smoothing so the De Jong character
reads; the amplification is clamped inside each arm's wedge so arms never
cross or detach from the core.
