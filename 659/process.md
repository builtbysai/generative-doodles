# No.659 "Pluma de Sietecolores"

EXPANSION #80 angela-leible, prompt block 3. The 20 m Panamericanos feather
"Pluma de sietecolores" (2023) as a two-authorship generator: his stone form
first, her seven colors second, on a 36 second watch-only loop.

## Concept

The original work is credited in two halves: "Forma F Gazitua / Color Angela
Leible". The piece takes that credit line literally as its architecture. A
stone-gray feather is built as pure geometry, barb by barb, the way a
sculptor's form accumulates. Only when the form stands complete do the colors
arrive: seven discrete stain fields, one horizontal band at a time, each
masked strictly to the feather silhouette, bleeding only a little into the
neighbouring bands. The colors hold at full saturation, then drain away,
leaving the bare gray form, and the next loop begins with a new form and a
new coloring. No interaction: the division of authorship is the point.

Loop timeline (36 s):
- 0 to 8 s, THE FORM: quill shaft draws first, then 46 barbs grow in
  sequence from the quill outward; the granite silhouette fills behind them.
- 8 to 24 s, THE FLOOD: the seven colors arrive one band at a time in the
  order cinnabar, gold, turquoise, indigo, violet, ember orange, bone white
  (band 0 at the feather's top takes the first color, and so on downward).
  Each band's flood runs about 5 s, staggered 1.6 s apart.
- 24 to 30 s, HOLD at full saturation.
- 30 to 36 s, DRAIN: the stains shrink away in staggered reverse order,
  back to the bare gray form.

## Construction

Two-seed architecture (the point of the piece, also documented in a comment
at the top of the script):

- FORM PASS, from the form seed only (mulberry32, FORM_BASE 659001).
  Parametric feather: a gently bending spine (49 samples), 23 barbs per
  side attached along the vane, each a quadratic curve with seeded length
  and angle jitter, a length profile that swells mid-vane and closes at
  the tip, and a tip taper on the last barbs so their tips land on the
  spine tip. Rendered as a granite (#9A9A9C) filled silhouette from the
  barb tips, a tapered shaft strip along the spine, nine fracture facet
  wedges (#3A3A3D, half alpha) seated between neighbour barbs, and the
  barb curves stroked in fracture dark over everything, so the carving
  reads through any color laid on top.
- COLOR PASS, from the color seed only (mulberry32, COLOR_BASE 659101).
  The color generator receives nothing but the finished silhouette
  polygon. It lays a jittered grid of flat blotches across seven
  horizontal bands spanning the vane; a blotch is kept only if its centre
  falls inside the silhouette (point-in-polygon), and at draw time all
  blotches are drawn under a canvas clip of the same silhouette, so color
  can never touch the ground. Each blotch carries a wake threshold based
  on its distance from its band's entry edge (bands alternate entry from
  top and bottom) plus a seeded jitter; blotch centres are allowed a
  third of a band height outside their band, which is what bleeds color
  across the boundaries. Bands drawn in arrival order, later bands over
  earlier ones.
- Seed advance: both seeds advance by loop index (form seed 659001 + k *
  7919, color seed 659101 + k * 104729 for loop k). Every quantity on
  screen is a pure function of anchored elapsed time: loop index, loop
  time, growth and flood progress are all closed-form, so any loop time
  renders identically on any run.
- Frame one is the synchronous draw at loop time 0: bare ground, the
  quill shaft at 15 percent reveal, and the first (lowest) barb pair at
  about a third of its growth. No Date.now anywhere; the clock is
  performance.now anchored at load, and frame one is drawn with an
  explicit time argument.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width and
  height pinned in pixels inside draw(); phone detection by window.screen
  minimum dimension under 700 px, aspect ratio (h > w * 1.15) only as a
  fallback when screen is unavailable; rAF guarded by a typeof check;
  canvas 2D only, no offscreen canvas, no filters, no audio, no text
  anywhere but the title tag.

Palette is strict: ground #0A0A0B, granite #9A9A9C, fracture #3A3A3D, and
exactly the seven stains #C0392B, #D9A441, #2FA3A0, #2B3A7A, #6B4E9B,
#E2703A, #EDE4D0. Stains are drawn at 0.85 alpha flat fills, never
gradients, so the seven stay discrete and the stone grain shows through.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim, no
rAF, so only the synchronous frame is exercised headlessly).

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720):
  frame one reads as specced at all three sizes: near-black ground,
  centered at the foot the granite quill stub with the first barb pair
  beginning as a small chevron diamond. Nothing else on screen, nothing
  clipped on mobile; the feather layout is height-limited so the tall
  mobile frame keeps the same composition.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- State-forced checks (via the inert location.search "seed=tNN" clock
  freeze, rendered to /tmp, read back, then deleted):
  - t=17 (mid-flood): bands 1 to 5 fully stained, ember present only as
    young blotches low on the feather, bone not yet arrived; fracture
    wedges and barb strokes visible on the still-gray lower form.
  - t=27 (hold): all seven stains at full coverage, bands discrete with
    blotchy bleed at the boundaries, no color outside the silhouette,
    granite quill foot below the bone band.
- One fix during QA: the first flood render's ink bounding box touched
  the top edge of the frame (ink top = 0), because near-tip barbs kept a
  length floor and pointed steeply enough to overshoot the spine tip by
  more than the top margin. Fixed with the tip taper in the length
  profile; re-rendered ink bounding box is top 24, bottom 874 on the
  1280x900 frame, and determinism was re-verified after the fix.

## Deviations

- Band-to-color assignment: the prompt lists the seven colors and says
  they arrive as horizontal bands in sequence, without fixing which band
  takes which color. Recorded choice: bands are numbered from the
  feather's top, and band k receives the k-th color in the listed order,
  so cinnabar arrives first at the top and bone white last at the foot.
- Seed advance per loop: the prompt asks for the choice to be recorded.
  Each loop gets both a new form seed and a new color seed, both
  advancing by loop index, so no loop repeats a previous form or a
  previous coloring.
- No other deviations. No interaction was implemented, per the prompt's
  watch-only ruling.
