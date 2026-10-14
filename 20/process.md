# №20 · Harmonograph - process notes

## Concept
The Victorian drawing machine simulated honestly: two pendulums per
axis, each a sine with its own frequency, phase and exponential
decay, summed into one continuous pen line. Early swings are wide;
friction shrinks the figure beat by beat until the pen settles near
the center. One warm-black ink at low alpha on cream, so crossings
darken where the pen returned.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 20. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- Frequencies sit near 2:3 ratios with a seeded detune of at most
  0.6 percent, so the figure almost repeats but never quite does.
- Compositional safety: the trace's radius at t=240 must be under
  0.22 (settled) and at t=60 above 0.25 (still alive mid-trace);
  otherwise derived-seed retry.

## Differentiation
- vs No.18 (Lissajous): periodic, dotted, undecayed. Harmonograph is
  one decaying line; the shrinking is the composition.
- Family name: "decaying pendulum trace".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `20/index.html`, `20/thumb.png` (720x720, rendered from the live script), `20/process.md`. Gallery entry appended at the end of page3.html with the formula date.
