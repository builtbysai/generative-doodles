# №5 · Contours - process notes

## Concept
Sixty horizontal lines on paper white, each displaced by the same
slow wave whose phase drifts a little more on every line, so the wave
seems to travel down the page as it crosses. One ink, no fill, most
of the page left empty (brief concept 5, contour drift).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 5. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- Two sine components per line, amplitudes 0.55 to 0.95 and 0.16 to
  0.30 of the line spacing; second component's phase runs 1.7 times
  the drift so the lines do not move as one cloth.
- Compositional safety: total phase drift gated to 0.30 to 1.75 turns;
  under a quarter turn the lines sit in lockstep like a comb, over two
  turns the page churns.

## Differentiation
- vs No.9067 (Silt): filled strata bands with their own waves and a
  seam. Contours are single stroked lines sharing one travelling wave.
- Family name: "phase-drift contour lines".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `5/index.html`, `5/thumb.png` (720x720, rendered from the live script), `5/process.md`. Gallery entry appended at the end of page3.html with the formula date.
