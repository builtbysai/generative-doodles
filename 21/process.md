# №21 · Ticks - process notes

## Concept
A clock face with no hands and no numbers: concentric rings of tick
marks, each tick a short radial line whose length is set by one
angular wave per ring, so every ring breathes at its own rate and
the waves interfere where they align. The longest tick of each ring
is gold. Warm white on near-black.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 21. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 9 to 11 rings; tick counts grow with ring index (36 + 10 per ring)
  so arc spacing stays near constant. Peak angle per ring found by
  sampling its own wave.

## Differentiation
- vs No.9 (Shimmer): dashed rings whose patterns interfere along the
  circumference. Ticks are radial marks on separate rings; the
  interference is between rings, read through length, not dash phase.
- Family name: "per-ring angular tick waves".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `21/index.html`, `21/thumb.png` (720x720, rendered from the live script), `21/process.md`. Gallery entry appended at the end of page3.html with the formula date.
