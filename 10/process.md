# №10 · Bloom - process notes

## Concept
Four hundred nodes scattered in three gaussian clusters, and one
rule: any two nodes closer than a threshold are joined by a hairline.
The web is dense inside each bloom and nearly empty between them;
nodes near a cluster center take a slight tint from that cluster
(pale gold, pale cyan, pale rose). Drawn once, static: a system that
looks organic but is pure rule (brief concept 10, bloom network).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 10. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- Nodes assigned round-robin to clusters so the blooms stay balanced;
  positions from a four-sample approximate gaussian, clamped to the
  frame.
- Compositional safety: the edge count under the 0.088 threshold is
  measured per candidate and gated to 500 to 2800 (16 attempts), so
  the web is neither a hairball nor a scatter of loners. When two
  cluster centers land close, their blooms merge into one landmass;
  the rule, not the layout, decides, and the merge is kept.

## Differentiation
- vs No.4 (Orbits): chords on exact rings, every join prescribed by
  k. Bloom's joins are distance accidents among scattered points.
- Family name: "threshold-cluster node web".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `10/index.html`, `10/thumb.png` (720x720, rendered from the live script), `10/process.md`. Gallery entry appended at the end of page3.html with the formula date.
