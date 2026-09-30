# №8947 · Over Under (2026-07-10)

Seed: 427 (default; click mints a fresh seeded knot, ?seed= also honored)

Concept: seeded Celtic knotwork as a study of the over/under decision.
A barrier grid is scattered with walls; every wall forces the strands to
turn, walls are traced into continuous straps, and at each crossing the
over strand is chosen by cell parity so the weave alternates correctly
along every strand. The knot sits inside a plaited frame: two strands
braided around the full rounded-rectangle perimeter, pinned at the
corners by bosses. Nothing is audio; the batch neighbors are all tuning
theory, this one is pure ornament.

Technique notes:
- Grid 6-12 x 5-16 cells sized to the field aspect; boundary walls at
  0.9 probability so strands turn back and close instead of terminating;
  interior walls at 0.40-0.52 for meandering strands without long
  corduroy runs. Cells with four walls are reopened.
- Strands traced through shared edge-midpoint nodes (each interior node
  joins exactly two segments, so the tracing never branches); smoothed
  with midpoint quadratics at draw time.
- Tube shading per strand: outline, base, inner, highlight strokes;
  every over-pass redrawn on top with a soft cast shadow so the weave
  reads in depth.
- Border: perimeter-parameterized two-strand braid with alternating
  over strand at each crossing, corner bosses, flanking hairline rules.
- Paper grain rendered once per seed to an offscreen canvas (specks +
  fibers); four curated palettes (parchment, slate, night, moss), strands
  one- or two-tone per seed.
- Load/click reveal: strands draw in with a staggered dash reveal over
  ~1.9s, then the frame is static (no perpetual animation).
- No em dashes in visible copy; no date strings in page copy.

What I inspected:
- Desktop 1280x800 and mobile 390x844 screenshots viewed as pixels.
- Iterated three times on visual grounds: v1 had too many strand
  terminals and a small knot in a large field (read as maze); v2 filled
  the field but strands ran in parallel corduroy; v3 (more walls,
  boundary walls 0.9, aspect-fit grid) reads as genuine knotwork.
- Mobile pass: knot now fills the tall field (gh up to 16); caption
  shortened via media query so it never overlaps the seed tag.
- Click regeneration verified live via CDP (seed tag changed, no errors).
- cdp_exceptions.py exit 0 at 1280x800 and 390x844 on the default seed.
- Thumbnail 1280x720 captured from the live render, viewed, kept.
