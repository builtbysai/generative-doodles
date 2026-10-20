# No.369 Thistle Crest

## Concept

After Olena Kovalova's (al_kovalyova_design) Dark Academia
damask: a mirrored heraldic thistle crest in antique-gold
linework on near-black, repeated in a half-drop lattice,
with a secondary tossed field of spread-wing ravens flying
upward between the crest columns in the same gold line.
Watch-only gold breath, drag sideways to shear the lattice,
double-tap to advance the crest through an authored heraldic
table: thistle, pinecone, artichoke, acorn, all drawn from
one shared crest grammar. The gold is always a flat stroke
colour, never a metallic gradient.

## Construction

- One canvas, design space 1280x900, cover-fit full-bleed
  field. Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via
  style width/height in px; phone detection via
  window.screen min dimension < 700px with aspect fallback.
- Palette is exactly four flat colours: ground #1A1512,
  antique gold #C9A24B, deep gold shadow #8A6A2E, bud
  brown #6B4C2A. No fill anywhere except the tiny bud dots;
  the crest bodies are line only, with crosshatch for shade.
- Lattice: columns step 256px, rows step 190px, odd columns
  dropped half a row; 64 crests asserted, authored oversized
  so the field covers the frame at any shear. Crest tile is
  about 150px tall, one sixth of the frame height. Ravens:
  exactly 28 asserted, on a checkerboard sublattice between
  the crest columns, about 90px tall, rotations from an
  authored table in the range plus/minus 20 degrees.
- Crest grammar (shared by all four motifs): a central bulb,
  mirrored acanthus ornaments drawn for the right half from
  authored points and reflected: a bottom spiral scroll, a
  big veined leaf, a small mid leaf, a bud on a stem and
  bud-brown dot trios. Only the bulb changes per motif:
  thistle is a crosshatched cup under two rows of crown
  spikes (deep gold back row, gold front row, centre spike
  tallest); pinecone is an oval of six rows of scale arcs
  with a deep gold foot row and a stem curl; artichoke is a
  pointed teardrop of six scale rows with a centre scale
  petal; acorn is a crosshatched cap over a smooth nut with
  deep gold side lines and a curled stem.
- Hand-line wobble: every path is sampled to points and each
  point is offset by a fixed jitter (about 1-2px) from a
  deterministic hash of its position and path index. The
  hash uses |x|, so a mirrored point gets the mirrored
  offset and the halves stay true mirrors. The jitter is
  baked into the geometry, identical every frame and every
  repeat, never per-frame noise.
- Crosshatch is drawn as two families of diagonal deep-gold
  lines clipped to the bulb outline; no fill, no gradients.
- Motion: one seamless 24s master loop. The gold breath is
  opacity 0.75 to 1.0 on an 8s cycle (three whole cycles per
  loop), phase offset per crest and per raven from lattice
  position, so frame 24s is pixel-identical to frame 0.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 10s into the loop (breath mid-cycle,
  shear at rest), and the rAF loop (typeof-guarded, fixed
  1/60 ticks) is anchored at that constant plus elapsed
  time. No wall-clock phase anywhere.
- Interaction: drag is a shear, not a pan. While dragging,
  the lean follows horizontal pointer travel (clamped to
  plus/minus 0.42, applied per crest as a shear transform);
  on release a spring integrated on the same fixed ticks
  returns the shear to exactly zero and snaps it dead at
  rest. A tap under 14 design px within 400ms counts toward
  a double-tap inside 350ms, which advances the crest motif
  through the four-entry table. Pointer coords convert via
  the stored cover transform S, OX, OY. No text, no UI, no
  offscreen canvas, no gradients, no shadowBlur.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png); all three inspected.
- Thumb rendered twice: byte-identical.
- Desktop: half-drop damask field edge to edge, thistle
  crowns and crosshatched cups crisp, ravens woven between
  the columns at varied rotations, scrolls and bud dots
  reading at the crest bases. Mobile: dramatic full-bleed
  crop, ground continuous, crests large. Thumb: crests and
  ravens legible at gallery size.
- The three double-tap motifs were also probe-rendered at
  720x720 from temporary copies with the motif index preset
  (copies not shipped): pinecone, artichoke and acorn all
  draw correctly inside the same ornament grammar, acorn
  cap hatch and nut clean, no stray marks.
- Palette audit: the file contains exactly the four specced
  hexes and no others; no em dashes.
