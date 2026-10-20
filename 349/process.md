# No.349 Murder in the Garden

## Concept

After Emi Bee's Dark Academia "Murder in the Garden"
series: a dense lattice of poisonous oleander-like blooms
on thorned stems over near-black, moody and cozy-noir.
Hidden among the blooms are one tiny key and one small
bird, and slow spores drift over all of it. Watch-only:
the garden breathes and the hunt for the two hidden
things is the piece. No interaction, no text, no chrome.

## Construction

- One canvas, 2D, self-contained. Design space 1280x900,
  cover-fit full-bleed on every screen; the ground fill
  is the piece's own near-black #0B0D0A so any edge reads
  as garden dark.
- Palette, flat only: ground #0B0D0A, deep green #2D4A2B
  stems, bone #E8DCC8 blooms, poison gold #C9A227
  accents, blood red #8C2F39. Nothing else.
- Blooms: exactly 30, asserted in code, on a jittered
  6 x 5 lattice. Each is a layered petal rosette: a green
  calyx disc, an outer layer of elongated petals and an
  inner half-step layer, with a poison-gold heart. Petal
  counts (5 to 8) come from the fixed seed table. The
  one-in-ten rule is exact: exactly 3 blooms (table
  indices 4, 14, 24) are blood red, asserted, the rest
  bone.
- Stems: one seeded-walk bezier vine per bloom column,
  walking from above the top edge to below the bottom,
  with thorn triangles and small leaves at fixed walk
  marks; four thin diagonal tendrils with curled ends
  tie the columns together; 14 tiny gold berries and 26
  small leafy sprigs fill the gaps so the lattice reads
  dense.
- Hidden objects, exactly one each: a tiny gold skeleton
  key (ring bow, shaft, collar, two teeth) at the
  lower-left rule-of-thirds point, and a small bone bird
  silhouette (gold beak, ground-pinhole eye) at the
  upper-right rule-of-thirds point. Both are fixed
  parametric paths drawn in the lattice's own inks, so
  they hide among the gold accents and bone blooms.
- Spores: exactly 40 flat bone dots, asserted, as JS
  data. No soft or blurred particles, no radial
  gradients, no shadowBlur, no offscreen layer.
- Motion: one 24s seamless master loop. The lattice
  drifts on sinusoids completing whole cycles in 24s;
  each spore rides its own sinusoid with a whole number
  of cycles (1 or 2) per loop, so frame 24s is
  pixel-identical to frame 0.
- Determinism: all layout data is built once at load
  from one fixed seed; the first frame is drawn at the
  constant phase T_OFFSET = 7s exactly, never from a
  wall clock, and the rAF loop advances from that same
  anchor by elapsed time since load. The thumb
  reproduces byte-identically (verified, same md5 over
  repeated renders).
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px
  with aspect fallback (h > w*1.15); synchronous first
  frame; requestAnimationFrame typeof-guarded.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png, rendered twice, byte-identical md5);
  all three inspected.
- Desktop: the lattice fills the frame, 30 rosettes
  countable across the six vine columns with the three
  blood-red blooms spread one to a region (upper right,
  centre, lower left). The gold key reads at the
  lower-left third, small but findable; the bone bird
  sits at the upper-right third with its gold beak and
  tail flick. Spore dots and gold berries are scattered
  over the whole field. Frame one is developed: lattice
  drifted off-centre, spores mid-drift.
- Mobile: cover-fit keeps the field full-bleed at 390
  wide; two vine columns, a blood-red bloom and a
  curled tendril stay legible, and the key just enters
  at the left edge, which suits a hidden object in a
  field composition.
- Thumb: fully legible at 720px; blooms, red accents,
  key and bird all read at gallery size.
- One build fix: the first pass read scattered rather
  than dense, so 26 leafy sprigs were added in the gaps
  between blooms (seeded table, lattice green only).
  The first sprig drawing clustered its leaves on the
  stem line and read as squiggles; the leaves were
  spread along the stem and offset along their own
  angle, after which they read as small fronds.
