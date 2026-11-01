# №1440 "Forty-Eight Rows, Sewn" (kathe-kruse KK1, PP671)

A sheet of off-white paper fills the frame with a narrow margin on a
shadow-tone ground; row after row of short sewn stitches marches down it
in the 48 standard colours of polyester yarn, one colour per row. The
rows are the whole picture; nothing else is on the paper.

## Prompt fidelity

- 48 rows, one yarn colour per row, from the prompt's 18-colour ramp
  (crimson through cream) interpolated to 48 steps. Every row keeps its
  own hue, never blended.
- Each row slightly uneven: per-stitch positional jitter, a seeded
  per-row drift of a few pixels, one over-long stitch per row, and one
  row (seeded) a touch off-register. The error stays visible, never
  smoothed out — the study's ALTER, DON'T INVENT rule.
- Bottom rows still being sewn: frame one sits mid-stitch on the last
  row (row 47, stitch 26 of 43 at desktop width), needle point visible
  with a thread line trailing from the last completed stitch.
- Slow continuous loop: the needle lays one stitch per 0.28 s at base
  speed, completes all 48 rows over a 577.92 s cycle at desktop width,
  then re-sews from the top. The sheet itself never blanks; only the
  needle's own row is partial while it is being re-sewn.
- Completed rows breathe almost imperceptibly: a 0.5 px-amplitude sine
  (1 px total travel) on a 60 s period, phase seeded per row.
- Drag down the paper sews faster (up to 3x) and pulls the rows
  slightly off-parallel under the finger (up to 6 px, falling off over
  three row gaps); drag up slows the needle to a careful crawl
  (down to 0.25x). Never a still frame, never click-to-reload.
- No visible text besides `<title>`. Fully silent.

## Adaptations

- Rows as stitched dashes: short line segments with round caps,
  per-stitch jitter from a stable per-(row, stitch) hash, so the
  errors are identical every loop rather than flickering.
- Needle as a small steel point with a thread line trailing to the
  last stitch.
- Ground outside the paper uses the prompt's ink-line shadow tone
  (#d8d0c0) so the paper reads as a handled sheet, not a floating
  card.
- The cream final row (#fff8e8 on paper #f2ede2) is faint by the
  prompt's own palette; the needle dot on it marks the active row.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. No fading alphas at all (all colours
  opaque). Dots use a single own-beginPath arc; stitches are stroked
  line segments (node-canvas quirks respected).
- Determinism: frame one = draw(0) via boot flag; clock starts only
  with the rAF loop (plain function declaration behind a typeof
  guard); all randomness from seeded hashes / mulberry32, never
  Math.random (the single "Math.random" string in the file is a
  comment stating it is never used). Drag influence is closed-form
  over the recorded drag-segment list and piece time, never
  frame-integrated state.
- Piece clock shared between the rAF loop and drag timestamps
  (anchored on the first rAF callback), so drag segments line up
  with needle progress in both browsers and the probe harness.

## Verification (forced-time probe harness, vm-isolated instance,
stubbed rAF driving the piece's own loop, pointer events to its own
listeners)

- Two fresh instances byte-identical in recorded draw calls at t = 0.
- 48 distinct row yarn colours drawn at t = 0; 4,098 stitch segments.
- Frame-one needle: row 47, stitch 26 of 43 (last row, mid-stitch).
- Needle advances with time (t = 10: row 0, stitch 18 after wrapping).
- Loop closes exactly: needle at t = 577.92 s equals frame one.
- Breathing: row 5 stitch y shifts 0.155 px between t = 0 and t = 15
  (within the 1 px spec, nonzero).
- Drag down (dy +100) puts the needle ahead of control at t = 20
  (row 2, stitch 39 vs row 1, stitch 11); drag up (dy -100) puts it
  behind (row 0, stitch 0).
- Token scan clean (no AudioContext, getUserMedia, createElement,
  Path2D, shadowBlur, gradients, fillText/strokeText).
- Renders inspected at 1280x900, 390x844, and 720x720: 48 uneven
  stitched rows in ramp order on both sizes, needle mid-stitch on
  the last row, mobile full-bleed with no clipping.
- Thumb byte-identical across repeated renders.

No fix rounds needed.
