# No.500 — Letter Sprinkle

EXPANSION #60 giulia-tassi, prompt GT4 ("Atmosfere" letter-sprinkle device).

## Concept

Giulia Tassi's "Atmosfere" texture world rebuilt as a quiet generative
landscape: magenta-pink cliffs at the back, a stand of white birch trunks
with purple stripes in the middle, teal water with white squiggle waves in
the foreground, and a green shore strip with pink dash clusters at the
water's edge. Single uppercase letters are sprinkled as texture inside the
foliage canopies and inside the water only — never in the sky, never
forming words. One standing figure in a green polka-dot dress, drawn in
her face grammar (2-arc eyes, L-line nose, short-curve smile, flat hair
block), watches from the shore with an orange rim hairline. Watch-only,
meditative, 60-second loop: waves and water letters drift left and wrap,
foliage letters rustle with a tiny rotation jitter, the hairline sways.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- All layout is seeded (mulberry32, seed 50060) and size-independent:
  every element is stored as fractions of canvas width/height, so the
  portrait composition holds at any viewport.
- Cliffs: two seeded jagged ridge polygons (14 points each) filled from
  the top edge — hot pink behind, magenta in front — each with a hot-pink
  ridge stroke so the magenta-on-magenta front cliff still reads against
  the magenta sky.
- Birches: 11 trunks as tapered quads with slight seeded leans; purple
  stripes are clipped inside each trunk polygon. Canopy = 3–5 seeded
  ellipse blobs per tree in hot pink / magenta.
- Letters: single glyphs picked one at a time from A–Z (scrambled by
  construction, never assembled into words). Foliage letters are placed
  inside a specific canopy blob and drawn clipped to that blob's ellipse
  at 50% alpha in dark magenta or birch white. Water letters are placed
  in the water band, clipped to it, drawn at 45% alpha in deep teal or
  white, and drift with the same phase offset as the waves, wrapping
  horizontally.
- Waves: 7 seeded rows of sine squiggle polylines tiling across the
  water, translating left by 25% of width per 60s loop with wraparound.
- Figure: seeded x at the water edge, 30% of canvas height. Trapezoid
  dress with a clipped polka-dot grid, skin legs and arms, flat dark
  hair cap, orange hairline arc whose center is offset by
  sin(phase) so it sways.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style pinned in px
  inside draw(); phone detection via window.screen min dimension
  (< 700px) with aspect fallback; page ground is the palette magenta.
- Determinism: the first frame is drawn synchronously at a constant
  pre-roll phase (t = 12s of the loop), never derived from Date.now();
  the rAF loop is typeof-guarded and anchored as 12s + elapsed since
  load, so frame one is identical in every viewer and in the QA
  renderer (which has no rAF).

## QA log

- Renders: qa-desktop.png (1280x900), qa-mobile.png (390x844),
  thumb.png (720x720) via ~/workspace/tools/render-piece.js.
- Determinism gate: thumb.png rendered twice and byte-compared with
  cmp — identical, re-verified after the fix pass. Second render
  deleted.
- Read-back, pass 1: composition, birches, water, figure, and shore all
  read, but (a) foliage letters were clipped to one wide ellipse per
  tree and spilled onto open sky between canopies, (b) the hair block
  rendered as a sliver and the figure had a long bare neck, (c) the
  magenta front cliff was invisible against the magenta sky, leaving
  the hot-pink back cliff reading as floating blobs.
- Fixes: letters now clip to their own blob ellipse; hair rebuilt as a
  clean half-disc cap with a longer orange rim arc; dress top raised to
  close the neck gap; cliff ridges given more points and amplitude, a
  hot-pink ridge stroke, and the canopy blobs made smaller and tighter
  so the cliff band stays distinct behind them.
- Read-back, pass 2: cliffs read as a layered back band, letters sit
  inside foliage and water only, hair and hairline read at all three
  sizes, figure fully in frame on mobile, nothing clipped.

## Deviations

- None against the prompt. Two judgment calls inside its latitude:
  the front cliff layer is the palette magenta on a magenta sky, so a
  hot-pink ridge line (also palette) traces its silhouette — the only
  way to keep that layer legible without adding a color; and the
  figure's hair block is a deep violet (#4A3566) rather than a palette
  color, because the prompt specifies "flat hair block" and an orange
  hairline but no hair color — the purple family matches the birch
  stripes. Letter size is 2.4% of canvas height, inside the specified
  2–3% band.
