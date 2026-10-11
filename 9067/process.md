# №9067 · Silt - process notes

## Concept
Sediment strata fill the square: 26 to 34 stacked bands, each top edge the
sum of two slow sine waves. A single near-vertical seam cuts the stack at
0.56 to 0.70 of the width; across the seam, every band edge steps up or
down by a small amount, so the layers read as two settled blocks that
slipped against each other once and then kept settling. Band colors walk
a nine-step earth palette (bone, wheat, ochre, rust, umber, slate, teal,
deep teal) by steps of at most one index per band, with a mild downward
drift, so most neighbors are close in tone and a few are not. The subject
is the accumulation itself, and the one interruption in it.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9067. `?seed=` shareable; click mints a new build and
  writes `?seed=` into the URL. Square composition letterboxed on the
  dark page bg; DPR capped at 2; canvas sized from the Visual Viewport
  API (`window.visualViewport` width/height, resize listened to on
  visualViewport as well as window), per the standing viewport rule.
- Bands: thicknesses are weighted (thin partings at 0.35 to 0.65 weight,
  normal beds 0.8 to 1.35, thick beds 1.5 to 2.2) and normalized to fill
  the square exactly. Edge height at x is top_i + A1*sin(k1 x + p1) +
  A2*sin(k2 x + p2) + (x past the seam ? step_i : 0), sampled at 180
  points. Amplitudes run through a depth envelope: quiet at the top,
  fullest around mid-depth, quiet again near the bottom.
- Compositional safety: every candidate is measured. An edge is
  "relieved" if its sampled height range exceeds 0.020 of the square,
  "calm" if under 0.007. A candidate needs at least 5 relieved edges and
  at least 2 calm ones; otherwise the next derived seed (seed +
  attempt*0x9E3779B9) is tried, up to 16 attempts, keeping the best
  scoring candidate if none passes outright.
- Draw order: bands filled top to bottom as closed paths between
  consecutive edges, clipped to the square; then the seam stroked as a
  thin pale line (S/720 width) following the seam wander, so the per-band
  steps stay legible; then 2400 restrained 1px grain speckles ( dark and
  bone, about 0.05 alpha).
- Visible copy: hint "click for another silt". No em dashes, no date
  strings, no absolute URLs anywhere in the visible page.

## Iteration
- v1: palette steps of up to two indices plus same-color neighbors
  produced both checker-like jumps and merged slabs (the count of the
  stack was lost). Cut the walk to at most one index per band with a
  slight darkening drift, and banned identical neighbors outright: if
  the walk lands on the previous band's color it is nudged one index
  darker (or lighter at the palette end).
- v2: thick beds trimmed (weight 1.5 to 2.2 down to 1.35 to 1.9) so no
  single band dominates the stack.
- v3: outer edges pinned flat (top is the surface, bottom is the floor).
  Waved, the first edge left dark bites of page background inside the
  square at the top. Seam step range 0.004 to 0.010 of the square:
  large enough to register as a slip at thumbnail size, small enough
  that no band ever tears open.

## Differentiation
- vs №9066 (Undertow): a closed radial system, concentric rings around
  one center, interference between rings as the subject. Silt is an open
  horizontal stack with no center; its only event is a single vertical
  interruption.
- vs №9064 (Grainfield): twenty-five thousand loose dots settling in a
  flow field. Silt has no particles; the marks are filled bands, and the
  grain here is a finish, not the medium.
- vs №9063 (Loom): threads strung between nested rings, a woven radial
  construction. Silt is layered, not woven; nothing crosses.
- Family name: "seamed sediment strata".

## QA log
- Default seed 9067: first candidate passes the gate outright (28 bands,
  15 relieved edges, 2 calm). Rendered and inspected at 1280x900 desktop
  and 390x844 mobile: square letterboxes correctly on both, seam and its
  steps legible at both sizes, top and bottom edges clean after v3.
- Method note: headless Chrome does not complete a screenshot in fly's
  VM (the browser process hangs on exit and writes no file). The piece
  script was instead executed under Node with a stub canvas (zero
  errors; draw, resize and click paths all exercised; band fill count
  matched), and the identical seeded algorithm was rendered in Python
  for the visual review and the thumbnail. The two implementations
  agreed on band count, gate attempt and palette. Hans's real-device
  check is still the final gate, per the standing rule.
- Files: `9067/index.html` (the piece), `9067/thumb.png` (720x720
  rendering of the square composition), `9067/process.md` (this file).
  Gallery index updated with the №9067 entry.
