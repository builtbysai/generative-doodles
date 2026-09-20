# Matt DesLauriers: Study Notes

**Site:** mattdesl.com | **Key works:** Meridian (2021, 1000 outputs), FOLIO (2022),
color-wander, canvas-sketch toolkit, tiny-artblocks scaffold

**2026-09-20 visual pass (deep):** 3 Meridian outputs inspected at full res
(tokens 53000414, 53000100, 53000160 via artblocks media), 1 FOLIO output
(token 8000034 via artblocks media), mattdesl.com works index read in full,
tiny-artblocks repo README read in full (incl. PRNG discussion).

## What the work actually looks like (visual findings)

### Meridian — three distinct registers across outputs
1. **Sparse sketch register:** thin jittered strokes, lots of white, landform
   reads as faint embroidery; strokes follow terrain flow lines and simply stop
   at region edges, leaving ragged, frayed boundaries. White voids inside the
   landform where the stroke field thins — the void is part of the composition.
2. **Dense quilt register:** saturated strata bands (teal/pink/ochre/rust),
   strokes packed tight, edges crisp where a color band meets the next; reads
   almost like woven textile.
3. **Prismatic register:** explosive near-primary color blocks (blue, orange,
   magenta, green) with heavy ink weight, strokes nearly black in overlap
   zones; the overlap darkening is load-bearing for the depth illusion.

**Construction details that matter:**
- Strokes are short, straight-ish dashes, each with slightly varied color and
  alpha; neighboring strokes in one band share a base hue that drifts slowly —
  the banding is the macro-shape, the jitter is the micro-life.
- Overlap zones go dark. No explicit shading; density IS shading.
- Background is paper-white, never tinted; the piece sits inside generous
  margins, like a print on a sheet.
- The landform is a tilted plane (isometric-ish) with a thin baseline slab;
  the composition floats, never bleeds to the edge.

### FOLIO (token 8000034)
- Exactly as described: ONLY typographic glyphs — parentheses, colons, dashes,
  percent signs, brackets — packed into clean rectangular bins. Black glyphs
  on white, no color at all in this output.
- Bins vary in mark density: dashed-line bins, solid-dot bins, parenthesis bins;
  composition reads as a concrete-poetry page. The bin edges are razor sharp —
  glyphs are clipped at boundaries, not allowed to leak.
- This is the strongest "constraint as engine" example in his body of work:
  no strokes, no curves, no color, yet unmistakably composed.

### Workflow (tiny-artblocks)
- canvas-sketch-descended scaffold: seeded PRNG as first-class citizen
  (MurmurHash → PCG; notes that xorshift128 is probably enough for most art),
  live reload, byte-size reporting on every build, code-golf tips as docs.
- The practice treats the toolchain as part of the artwork: reproducibility
  (hash → output) is a design feature, not an engineering afterthought.
  Meridian itself is only ~15kb of JS.

## Core techniques

### 1. Stratified landforms (Meridian)
Thousands of small individual strokes of colour build up layered, topographic landforms.
Different stroke styles emulate analogue media, charcoal, gouache, linogravure.
The trick: stroke-level detail creates texture that reads as "hand-made" at a glance
but reveals its algorithmic construction on close inspection.

**Takeaway:** Micro-mark accumulation. Don't draw the mountain, draw 10,000 strokes
that a mountain emerges from. The analogue-media emulation (varying opacity, jitter,
imperfect edges) is what separates this from flat vector work.

### 2. Recursive bin packing with glyphs (FOLIO)
A drawing system "constrained entirely by the use of typographic glyphs and a limited
mono-, duo-, or tri-colour palette." Recursively packs bins of data to fill the page,
concrete poetry meets early computer artwork.

**Takeaway:** Constraint as engine. Picking an extreme limitation (only glyphs, only 2–3
colours) forces the algorithm to be clever about composition. The limitation IS the style.

### 3. Tool-building as practice
Built canvas-sketch (the standard creative-coding scaffold: seeded random, export,
hot-reload), gifenc, and other open-source tools. His practice spans three modes:
artworks (serial output for print), tools (for the community), toys/demos (pure play).

**Takeaway:** Invest in the workflow. Seeded randomness + one-key export + fast iteration
is what makes daily practice sustainable. (Directly relevant to our doodles/ setup.)

### 4. Vector-field colour wandering (color-wander)
Particles follow vector fields derived from input images, laying down colour trails.
Pollock-like accumulation from simple rules.

## Philosophy (from Hyperrhiz interview, 2025)
- Self-defines as "generative artist" / "creative coder", hobbyist tinkering elevated
  to fine art.
- Work spans: algorithms for serial output, open-source tools, and toys that fit neither.
- Installations at the Louvre and AGO; responds to human presence (Lumos light sculpture
  shifts cold blue → warm red/orange on body heat).

## Techniques to steal (not copy)
- Micro-stroke accumulation for organic texture
- Extreme constraints (limited palette, limited mark types) as compositional engine
- Seeded-random workflow with export baked in
- Analogue-media emulation: jitter, opacity variation, imperfect edges
- Recursive space-filling (bin packing, subdivision)

## What NOT to do
- Don't clone Meridian's topographic look, stratified strokes are now strongly
  associated with him. Use the *method* (accumulated micro-marks) with different
  subject matter.
