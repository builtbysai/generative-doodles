# №9042 · Frost, process notes

Dendritic frost crystals growing inward from the corners of the print, the
way a real windowpane frosts on a winter morning. The middle of the pane
stays empty. That emptiness is part of the piece.

## Technique

Recursive fern fronds, not DLA. From each of two or three seeded corners,
2-3 long fronds fan inward; each frond is a wandering rib throwing dense
side branchlets near sixty degrees, each branchlet with its own
sub-branchlets, plus hairline feather ticks along every rib. Line weight
tapers from ~3 units at the root to hairline tips. One ink-blue
(#2e4a5e), monochrome discipline, alpha variation only.

Two structural fixes found by rendering:
- First pass: the turn noise was too strong and stems curled into twigs.
  Fixed with gentle mean-reverting wobble (never strays far from heading).
- Second pass: corner roots sat exactly on the print boundary, so the
  boundary check killed every corner frond on step one and only the loners
  drew. Roots now inset 12 units. (This bug survived two full render
  reviews before instrumentation caught it.)
- Third pass: radial fans read as starbursts, not frost. Redesigned as
  fern fronds: fewer, longer, much bushier.

Growth stops at a seeded breathing zone (radius ~185-230 around center)
and at the print bounds, so crystals reach but never meet.

## Print voice

Warm paper gradient, generous margins, wobbly hand-drawn plate frame,
5200 grain dots, subtle vignette. Viewport-invariant 1000x1000 layout.
Click reseeds via ?seed=. No em dashes anywhere.

## QA (2026-10-02, local, honest)

- `node --check` on extracted script: clean.
- CDP fail-closed exception probe (isolated port 9344), desktop and
  mobile 390px: zero exceptions, zero console errors.
- Rendered and visually inspected at 6 seeds (90210, 777001, 424242,
  555555, 999999, 314159): every seed reads as frost, corners composed,
  center breathing, no scribble, no mud. Default seed 777001 chosen for
  the most balanced three-corner composition.
- Desktop 800x800 and mobile 390x844 screenshots inspected: square print
  centers, caption holds, no overflow.
- Rejected during development: the twig phase (over-strong turn noise),
  the starburst phase (radial fans), the invisible-corner phase (boundary
  bug). None of those left the studio.
