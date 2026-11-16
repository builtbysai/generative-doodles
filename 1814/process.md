# Equal Rights Grid, No. 1814

PH7 / PP1061, study #237 paul-panhuysen. Watch-only counting piece.

Gallery note: "Red, yellow and blue keep equal rights; chance disturbs, the count restores. Watch only."

## Build log

Built 2026-11-16 from the TASKS.md prompt verbatim: a strict grid of tilted
egg-blobs on paper white in red, yellow and blue in exact equal count, after
"Equal rights for Red, Yellow and Blue" (1990). A counting system fills the
grid cell by cell, a chance procedure disturbs it, and the count restores the
equality.

## Decisions

- Grid: 12 columns by 9 rows, 108 cells, 36 per color. Colors are assigned
  in repeating red, yellow, blue order along the fill sequence, so any
  filled prefix divisible by three is exactly balanced.
- Cycle: 24 seconds. The count fills the grid over the first 12 seconds
  (9 cells per second), holds full, then at t=14 the chance procedure fires:
  four seeded color swaps, one cell recolored, and row 4 re-tilted. The
  recolor is restored at t=21 and the tilt eases back to zero by t=24, so
  every cycle ends with the tallies exactly equal again.
- Frame one is fixed at t = 6.0 s: the grid is half filled (54 of 108) with
  tallies 18/18/18 and the counter visible. All randomness is mulberry32
  seed 1814; no wall clock is read.
- Blobs: flat tilted ellipses with a small offset cap so each reads as an
  egg rather than a disc. No gradients, no textures, no animation
  flourishes. Thin black grid lines over the paper-white field.
- Counter: top-right plate shows the running count ("COUNT 054 / 108")
  and the three live tallies with color chips. Title and formula date
  ("2006 · 12 · 30") top left, hint "Watch only." bottom left. Plates are
  paper white with a black rule, measured to fit, and the title shrinks
  until both top plates fit side by side on a phone.
- Motion is the placement and swapping only, well under the 14 Hz ceiling.
  Reduced-motion renders the still frame. Watch-only: no pointer handlers
  at all, never click-to-reload.

## Enumeration (asserted)

A node harness evaluated the piece's own script logic through its
`__probe.talliesAt(t)` function:

- Grid 12x9 = 108 cells, 36 per color.
- t=6.0: filled 54, tallies 18/18/18.
- t=12.0, 13.9, 23.9: filled 108, tallies 36/36/36.
- t=15.0 (during the disturbance): filled 108, tallies 36/35/37,
  proving the perturbation actually disturbs the count.
- Every sampled instant of the fill phase (t=0 to 12 in 0.5 s steps) keeps
  the running tallies balanced whenever the filled count is divisible
  by three.
- Result: TALLY CHECK PASS.

## QA

- Rendered the actual script with node render-piece.js at 1280x900
  desktop, 390x844 mobile, and 720x720 thumb; inspected all three.
- Two defects found and fixed: (1) the counter plate's tally row was
  wider than its measured width, clipping "B 18" at the right edge on all
  three renders; the plate width is now measured from the tally row as
  actually drawn. (2) On the portrait phone the cells are tall, so the
  blobs first rendered as thin vertical pills, then as dots too small to
  read; blob height is now capped relative to cell width so the eggs stay
  egg-shaped and legible on phones. Re-rendered and re-inspected all
  three after each fix.
- Final renders: desktop and thumb show the half-filled grid with legible
  title, date, counter (COUNT 054 / 108, R 18 Y 18 B 18) and hint, nothing
  clipped or overlapping. Mobile shows tilted eggs, both top plates fit
  side by side, counter fully legible.
- Determinism gate: thumb.png rendered twice independently, md5 identical
  both times (bc26c3318fb22f08aaaddbc591258879).
- No em dashes in visible copy. No AI-signature copy.

## Deviations

None from the prompt. The prompt's "small counter in the corner" is the
top-right plate; the title/date plate sits top left and the hint bottom
left, as in the house plate layout.
