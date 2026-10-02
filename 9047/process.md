# №9047 · Deliberately Uninteresting, process notes

From the Sol LeWitt deep study (2026-10-02), seed 374: the late scribble
drawings (#1185), where draftsmen fill areas with graphite scribble until
a tonal gradient emerges, and LeWitt's line from the Paragraphs, "it is
best that the basic unit be deliberately uninteresting."

Second attempt at the LeWitt territory after №9046 The Copy Relay was
disliked and removed the same evening. This one goes the opposite way:
dense and textural instead of sparse, print voice instead of white wall.

## Concept

One boring mark, nine thousand times. The composition lives entirely in
coverage, never in the mark: up close the sheet is nothing but tiny
handwritten scribbles, at distance a single arch curve emerges from the
tonal gradient. No single mark ever asks for attention.

## Technique

- Seeded arch curve (height, baseline, center, and band thickness all
  wander per seed).
- Jittered grid, ~8100 cells; per-cell tone from gaussian falloff around
  the arch, windowed at the edges, with a whisper of tone everywhere and
  large-scale draftsman unevenness from value noise.
- Dense cells get up to 3 overlapping marks; the overlap is what builds
  the darks, the way a real hand does.
- The mark: one 3-4px curved graphite stroke at a random angle, alpha
  0.45-0.8. Identical everywhere, deliberately.
- Print voice: warm paper, grain, vignette, wobbly plate frame.

## QA (2026-10-02, Bug direct)

- node --check on extracted JS: clean. No em dashes anywhere.
- CDP fail-closed exception probe (isolated Chrome :9333): zero
  exceptions, zero console errors.
- Rendered at 3 seeds (374001, 90210, 777), all inspected: the arch
  reads at distance in each, with distinct height/position/fullness.
  First render failed review for being too faint (dense areas never
  passed 30% gray); mark count, overlap, and alpha were all raised and
  the band tightened until the darks went near-black.
- Mobile 390x844 inspected: field centers, arch legible, caption holds.
- Default seed 374001.
