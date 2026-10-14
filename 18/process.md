# №18 · Lissajous - process notes

## Concept
A Lissajous curve drawn as a dotted trace instead of a line:
thousands of points sampled along x = sin(a t + d), y = sin(b t)
with a small integer ratio a:b, so the figure closes on itself. Dot
radius pulses slowly with t, thickening and thinning the trace as it
travels. Pale cyan on near-black.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 18. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 2800 points over one full period; ratios from a fixed table
  (3:2, 4:3, 5:3, 5:4, 7:4, 7:5, 8:5).
- Compositional safety: phases whose |sin d| is too small collapse
  the figure to a zero-area curve; those seeds are rejected
  (derived-seed retries).

## Differentiation
- vs No.20 (Harmonograph): also pendulum mathematics, but there the
  pen never lifts and decay is the subject. Lissajous is periodic,
  undecayed, and made of dots, not line.
- Family name: "dotted lissajous trace".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `18/index.html`, `18/thumb.png` (720x720, rendered from the live script), `18/process.md`. Gallery entry appended at the end of page3.html with the formula date.
