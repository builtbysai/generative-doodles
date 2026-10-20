# No.371 Hummingbird Trailing

## Concept

After Olena Kovalova's (al_kovalyova_design) Timeless Nursery:
William-Morris-style trailing vines on cream, fine-line
hummingbirds hovering among them. Four winding stems carry
alternating lanceolate leaves, seed clusters and curling
tendrils; four hummingbirds hover at vine nodes, wings
fluttering on their hover bob. The whole field drifts slowly
downward. Tap a bird and it darts to a new node along the
vines; drag pans the trailing field vertically.

Palette (closed, five flat colours): ground cream #F1EBDC,
stems and leaves sage #8FA88F, bird bodies mauve #9B7E86,
throats terracotta #C4704E, seed dots, eyes, beaks and the
fine body outline #7A5C44. The study's watercolor washes are
rendered as flat muted fills. No gradients, no shadows, no
text, no UI.

## Construction

- One canvas, design space 1280x900, cover-fit. Visual
  Viewport sizing with resize listeners on visualViewport
  and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen
  minimum dimension < 700px with aspect fallback
  (h > w*1.15). Pointer coordinates convert through the
  stored cover transform (S, OX, OY).
- The field is authored on a 900px vertical period. Four
  vine columns (base x 170 / 480 / 800 / 1100) sway as
  sinusoids with wavelength 450px, which divides the period
  exactly, so stems, leaves and nodes all tile seamlessly.
  Stems are polylines sampled every 12px. Twelve stations
  per column per period (75px spacing, odd columns offset
  37px): a lanceolate leaf at each, angled down and out,
  alternating sides, with a 1px cream centre vein; a seed
  cluster (drooping stem arc, six dots) on the opposite side
  at every fourth station; a small tendril curl at every
  third. Leaf sizes vary by a fixed pure function of the
  station indices.
- Loop: 36 seconds, seamless. Over one loop the downward
  scroll travels exactly one whole period (900px), so the
  field is identical at loop rest. Everything cyclic is a
  whole number of cycles per loop.
- Birds: four, each about 165x95 design px (roughly 1/8 of
  canvas height). One authored glyph drawn from path data:
  slim forked tail, teardrop body with a fine seed outline,
  terracotta gorget, seed eye, needle beak. The far wing is
  the same shape smaller and paler behind the body. The
  beak always points back toward the bird's vine.
- Hover: a sine bob of 21 whole cycles per loop (period
  about 1.71s), each bird phase-offset. The wing flutter is
  two authored poses (raised blade sweeping up and back /
  pressed blade swept down and back) chosen at three
  wingbeats per bob cycle, so wing phase is locked to the
  bob exactly as specced.
- Tap a bird: it flies to the NEXT node on its own authored
  route table (five [column, station] nodes per bird,
  cycling, never random). The flight is a 0.85s eased arc in
  field coordinates, vertical delta taken the short way
  around the period, with an upward lift and the bob
  amplitude eased down mid-flight. Tap is a state change
  only; pointer-up counts as a tap only below an 8px
  movement threshold, so taps and drags never blur.
- Drag: vertical pan only, clamped to plus/minus 240 design
  px, position persists on release. The field is authored a
  full period tall in both directions, so the pan never
  opens an edge.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 13.25s (scroll 331.25px into the loop,
  vines developed, birds mid-hover, three wings raised and
  one pressed). The animation clock advances from that
  constant by elapsed time in fixed 1/60 ticks; frame one
  is never derived from a wall clock. requestAnimationFrame
  is typeof-guarded; no offscreen canvas, no filters, no
  shadowBlur.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop),
  390x844 (qa-mobile) and 720x720 (thumb) and inspected all
  three.
- Thumb rendered twice from the shipped script: byte
  identical (md5 77b964e6af81b2e2cae310af19690692).
- Desktop: four winding columns edge to edge, leaves seated
  exactly on the stem curve, clusters and tendrils legible,
  all four birds hovering beside their vines with beaks
  toward the stems.
- First pass fix: the wings were one shape rotated about the
  shoulder, which swung the raised wing into the tail and
  read as a paddle; the tail was also too wide. Rebuilt as
  two authored wing poses plus a slimmer forked tail, then
  re-rendered everything.
- Mobile: cover-fit crop shows the two middle columns
  full-bleed with leaves and clusters large; the outer
  columns' birds sit outside the phone crop (only beak tips
  at the edges), which is the expected cover behaviour for a
  field piece.
- Palette grep-checked against the five specced hexes; no
  em dashes, no absolute URLs.
