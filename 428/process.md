# №1378 "Moving Along Image" — adam-piron AP3 (PP601)

## What it is

An LED dot-matrix departure-board panel streaming endless orange glyphs on
black: dense rows of pseudo-script scroll continuously, like an airport board
of images in circulation. Full-bleed pixel grid; rows stream horizontally at
slightly different speeds; occasional mirrored or inverted glyph clusters
interrupt the stream. Motion never stops.

## Palette and composition

- LED orange `#ff7a18`, dark amber `#c25a08`, panel black `#0a0906`.
- Glyphs are 5×7 dot-matrix bitmaps from a seeded set of 24 abstract cipher
  marks (mulberry32, seed 1378000). No glyph spells a readable word, and no
  real language or brand text appears anywhere except `<title>`.
- Each row carries its own 48-glyph stream, so horizontal scroll wraps
  seamlessly, and its own speed (14–36 px/s, varying by row).
- About 12% of 8-glyph blocks are mirrored; about 10% are inverted (off-dots
  drawn in dark amber), giving the board its glitch clusters.

## Interaction (never click-to-reload)

- **Vertical drag** scrubs scroll speed and direction: each drag movement
  records a velocity sample that decays exponentially (tau 2.5 s), so the
  board surges, reverses if dragged hard enough, and always settles back to
  its base speeds. The scrub is a closed-form sum over recorded samples, so
  frame one and every later frame are reproducible.
- **Tap** inverts a burst of cells within 70 px of the touch for exactly one
  beat (0.8 s), then restores them exactly.

## Adaptations from the prompt

- The prompt's optional low hum is refused as autonomous audio: the piece
  ships fully silent, with no AudioContext anywhere in it.
- Per-pixel bloom is flat-alpha halos behind each lit dot, not radial
  gradients (the QA renderer handles gradients unreliably).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement, or
  getUserMedia. Canvas 2D throughout.
- Viewport from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen physical size with aspect fallback; field-like composition
  goes full-bleed on phones (checked at 390 wide).

## Determinism

Frame one is `draw(0)` via the boot-flag pattern; the rAF clock starts only
with the loop (plain function declaration behind a typeof guard). All
randomness comes from the seeded mulberry32 PRNG, never Math.random. The
thumb renders byte-identical across repeated renders.

## Verification (probe harness driving the piece's own rAF loop and pointer listeners)

- Motion never stops: frame at t=0 vs t=1 differs in 232,890 px.
- Row speeds differ: best-shift matching over 2 s gives row 0 ≈ 14 px/s
  (−29 px) and row 1 ≈ 21 px/s (−43 px), matching the specced speeds.
- Vertical drag scrubs exactly as specced: a +100 px drag at t=5 shifts row 0
  by −330 px at t=6, a −100 px drag by +329 px (direction reversal works),
  matching the closed-form 400 × 2.5 × (1 − e^(−1/2.5)) ≈ 330 px.
- Speed returns to base after decay: row 0 shifts −15 px from t=59 to t=60
  in the dragged run, i.e. the base 14 px/s.
- Tap burst: amber pixels in the tap region rise 900 → 2,186 during the
  beat, and the region matches the untapped render exactly (0 px diff) after
  the beat ends.
- Frame-one determinism: two fresh setups render byte-identical frames.
- Renders inspected at 1280×900, 390×844, and 720×720: full-bleed LED grid,
  orange glyphs on black, darker amber inverted clusters visible, no
  clipping on mobile, no readable text.
