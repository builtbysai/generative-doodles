# №1585 — Orchid, Regrown Every Minute (CW2, #209 che-yu-wu)

Formula date: 2006 · 05 · 15. Gallery note: "An orchid grows, dissolves into paint-dust, and is reborn every sixty seconds. Watch only."

## What the piece does

A warm white field (#FAF6EF) holds a single impressionistic orchid,
about 70% of frame height, its stem rooted at the bottom edge with
generous white margins. One life lasts exactly 60 seconds: the stem
curves up (0-14 s), green leaves open along it (8-24 s), buds swell
(18-34 s), then petals open in loose brushstrokes of magenta #D83A8C,
violet #7A3FD1 and crimson #C02448 over green #4E9A51 leaves (28-46 s),
with a gentle sway in full bloom (46-55 s). At 55 s the flower
dissolves into paint-dust over five seconds, and a new orchid with
different parameters (flower shape, bud count, colour, stem curve)
grows in its place. One flower, one minute, one life. A small
elapsed-seconds counter in the top-left corner ("00:38") shows the
mechanism. Watch-only: no pointer interaction at all.

## Mechanism

- The orchid is stored geometry, not an image: a 31-point quadratic
  bezier stem, 3-4 flowers (five fan petals plus a darker accent lip
  petal each, drawn as three overlapping brush dabs per petal), 2-4
  buds and 2-3 leaves, all in orchid space (units of the orchid
  height U) so the layout is size-independent.
- Growth is a pure function of the fixed loop phase: each part has a
  start time and duration, eased, so stem, leaves, buds and petals
  emerge in the prompt's order and the frame at any second is
  reproducible.
- Dissolve is particle scatter of the stored geometry: ~200 paint-dust
  dots sampled from the petals, stem, leaves and buds (JS array, each
  with a seeded velocity and size), drifting outward and fading over
  the 55-60 s seam while the geometry itself fades. No getImageData
  pixel scatter, no offscreen layer.
- Cycle seeds come from a fixed authored table of eight seeds,
  advancing one entry per 60 s cycle. The prompt's "new seed from
  Math.random every cycle" is not used: no Math.random() anywhere in
  the piece (the only occurrence of the string is this note's
  wording in a comment). Each life's parameters (stem lean and bend,
  dominant hue, accent hue, flower/bud/leaf counts, lateral offsets,
  sway phase) derive from a fixed-seed LCG (mulberry32) per cycle.
- The elapsed-seconds counter is fillText of the fixed loop phase
  ("00:SS"), never a wall clock.
- Determinism: the synchronous first frame is drawn at a constant
  loop phase of 38 s (stem, leaves and buds done, petals mostly open,
  so the thumb is a developed bloom, not a bare stem). The rAF loop
  is anchored as 38 + elapsed-since-load. Thumb renders byte-compare
  identical across runs (verified, md5 df4b3e434ec004f81849d09df6811370).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with the aspect h > w*1.15 fallback;
  one synchronous frame at load; typeof-guarded requestAnimationFrame;
  no click-to-reload; no in-piece UI except the counter the prompt
  requires; no artist signature.

## Deviation from the prompt

One, as flagged in the batch spec: the per-cycle seed is a fixed
authored table, not Math.random(), so every life is reproducible and
frame one byte-compares. The orchid's per-life parameters still vary
(3-4 blooms, 2-4 buds, 2-3 leaves, three dominant hues, stem lean and
bend), exactly as the prompt's "different parameters" asks, only from
a fixed table instead of the wall clock.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile and 720x720 thumb; all three inspected. Desktop and
mobile at 38 s show one orchid (stem rooted at the bottom edge, three
leaves, two buds, four violet blooms, counter "00:38" legible, generous
white margins). A phase-8 s render shows stem only (growth order
legible: stem before leaves, buds, petals). A phase-58 s render shows
the dissolve: geometry faded, paint-dust scattering in the orchid
hues. Thumb rendered twice, byte-identical (md5
df4b3e434ec004f81849d09df6811370). One fix round: the first build's
petals read as separated finger-like dabs, so the petal fan was
narrowed, the dabs widened and overlapped, and a soft centre wash was
added to unify each bloom; re-rendered and re-inspected after the fix.
