# No.496 Sign Painter

EXPANSION #59 eugenio-bertozzi, prompt EB8.

## Concept

His hand-painted Belfico shop sign (Pennabilli, 2026) as a watch-only
panel. A deep green shop-sign board carries a cream hand-painted serif
wordmark with flared wedge serifs and slightly wonky verticals, a thin
gold keyline inset from the panel edge, and a small condensed-caps
descriptor line centred under the name, on the "OSTERIA DI PAESE"
pattern. The wordmark is an invented shop name, SELVANO: seven letters,
plausible and Italianate, never a real business. Nothing moves but the
light: a soft brightness wave crosses the panel every twenty seconds,
like a cloud passing. The paint itself is still, down to its grain.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette: green #0F3B2E, cream #F2E8C9, muted gold #C9A227. The panel
  face is the same green family a shade deeper (#0D3227, the ground
  scaled by 0.85) so the board sits on the green that continues to the
  frame edges; no other colour appears anywhere except the sweep's
  white, which is a light effect, not a wash.
- Composition: the panel keeps sign proportions, 3:1, centred in the
  frame at every size; on desktop (1280x900) it spans 97% of the width,
  on the square thumb it sits mid-frame, and on phones (390x844) it
  keeps its 3:1 shape centred with the page ground in the deep green.
  The gold keyline is inset by the lesser of 6% of panel width and 16%
  of panel height. The wordmark runs to 60% of panel width (the brief's
  55-70% band); the descriptor is set at 38% of the wordmark's cap
  height, condensed to 0.72 with wide tracking, centred under the name;
  wordmark and descriptor are centred as one block inside the keyline.
- Letters are parametric, never font-rendered: twelve glyphs (A D E I L
  N O P R S T V and space) built from polygon subpaths in a unit cap
  box: stems with wedge-flared ends, plain slab bars, elliptical bowl
  bands for O D P R, a two-band S with a diagonal spine, and diagonals
  whose ends carry the same wedge flare along the stroke axis. Each
  letter instance gets seeded wobble from mulberry32 (seed 496059):
  rotation, baseline shift, horizontal shear, height jitter and a
  per-letter flare multiplier, so no two verticals stand quite alike
  and nothing reads as perfect vector type. The descriptor letters get
  gentler wobble and about half the flare.
- Brush grain: short horizontal dashes of the panel green at low alpha
  (0.04-0.09), rejection-sampled per letter against a winding-number
  point test over the glyph polygons, so every dash lands on paint and
  reads as the brush showing through. The array is precomputed at load
  and drawn identically every frame; the grain never moves.
- Motion is watch-only, a 20s loop: a soft light sweep, one wide
  gradient band (white at 0.055 alpha at its centre, the single
  gradient in the piece), crosses the panel over the first 8 seconds
  and is off-panel for the remaining 12. No interaction, no hint, no
  other text.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; the panel logic is the
  same at every size, only its scale changes.
- Determinism: the first frame is drawn synchronously at a constant
  loop phase (t = 13s pre-roll baked in, when the sweep band sits
  off-panel to the right, so frame one is the still sign). The
  animation loop, when running, is anchored as that fixed offset plus
  elapsed time since load, and requestAnimationFrame is typeof-guarded
  so the node QA renderer draws the same frame. All layout uses the
  seeded RNG; no Math.random, no Date.now(), no offscreen canvas.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical. Second render deleted after the check.
- Desktop and thumb: the panel reads at once as a hand-painted shop
  sign: cream SELVANO with flared wedge serifs, letters visibly wonky
  in rotation and shear without losing their shapes; gold keyline
  clean around the lettering block; OSTERIA DI PAESE small, condensed
  and centred beneath; grain a faint texture inside the strokes, not
  damage. Deep green runs unbroken to every edge.
- Mobile: panel keeps its 3:1 shape centred on the green; wordmark and
  descriptor both fully legible, nothing clipped, keyline complete.
- Two build iterations on the letterforms: the first pass gave the
  horizontal bars fishtail flares that read as spiky flags and left
  floating serif chips beside the S; bars are now plain slabs, the
  serif character carried by the stems' and diagonals' wedge flares,
  and the S stands on its band terminals alone. The A apex was then
  tamed (diagonals shortened a touch, apex flare reduced) where the
  crossed flares had starred. Grain count and alpha were also halved
  after the first render read as erosion rather than brush texture.
- Deviations from the prompt letter: none of substance. The wordmark is
  sized to 60% of panel width, inside the specified 55-70%; the
  descriptor is 38% of the wordmark cap height against the specified
  ~40%. The panel face is one shade deeper than the surround, within
  the same green family, as the prompt's centring alternative allows.
