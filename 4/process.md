# №4 · Orbits - process notes

## Concept
String art as a rule: three concentric rings of points, and on each
ring every point is joined by a hairline to the point k steps away, k
different per ring. The rings themselves are never drawn; only chords
exist, and their envelopes fake the circles. Warm white on black
(brief concept 4, chord orbits).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 4. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 64 to 111 points per ring, radii 0.97 / 0.68 / 0.40 of the half-side.
- Compositional safety: k/N gated to 0.10 to 0.42 per ring; too small
  hugs the rim into a plain circle, too close to half collapses into
  diameters. Up to 24 derived-seed attempts.

## Differentiation
- vs No.9063 (Loom): threads between nested rings at two radii sets
  with gold warps. Orbits chords stay within each ring; no crossings
  between rings, one ink only.
- Family name: "intra-ring chord envelopes".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `4/index.html`, `4/thumb.png` (720x720, rendered from the live script), `4/process.md`. Gallery entry appended at the end of page3.html with the formula date.
