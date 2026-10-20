# No.347 Cheater Quilt

## Concept

After Emi Bee's cheater-quilt patchwork fabric, printed
with sew-lines "so you can sew along the lines": a quilt
you never have to sew, twenty printed squares on deep
indigo with dashed sew-lines between them, each square
running its own tiny pattern machine. The title is hers
verbatim and duplicates No.327 (a different artist's
cheater quilt); per the batch spec's title flag the two
entries are distinguished by date and by the artist line
in the gallery note, as with the Crackle pair before them.

## Construction

One self-contained canvas, design space 1280x900,
cover-fit (full-bleed field) with the page ground in the
piece's own deep indigo #14121E. Visual Viewport sizing
with resize listeners on visualViewport and window; the
canvas is pinned every frame via style width/height in
px; phone detection via window.screen min dimension under
700px with the aspect fallback (h > w*1.15). Palette is
closed at five, all flat: ground #14121E, bone #E8DCC8,
moon gold #C9A227, dusty rose #B76E79, slate blue #5B7B9A.

The grid is 5 columns x 4 rows = exactly 20 squares
(asserted in code), pitch 256x225 with a 16px gutter, so
each square's pattern field is 240x209. Printed sew-lines
are dashed bone strokes at half alpha running through the
centre of every gutter, plus a dashed line around the
quilt's edge. Exactly five mini generators exist, no
sixth (asserted): celestial (sun/moon), faux tweed,
pinstripe, twisty-floral damask, 8-point star. A fixed
authored layout gives each generator exactly four squares
(asserted).

Every square animates inside a shared 20s master loop
(asserted): celestial stars twinkle on whole cycles and
the sun's rays turn once per loop; the tweed sheen band
sweeps once per loop; pinstripes drift exactly two stripe
periods per loop; damask motifs breathe on one cycle;
stars turn one whole turn per loop. Because every phase
completes whole cycles in 20s, frame 20s is
pixel-identical to frame 0.

Each cell owns a fixed table of four authored seeds (held
as literal JS data, asserted 20 x 4). Variant parameters
(star fields, moon side, thread data, stripe angle and
spacing, damask tiling, star arrangement) derive from the
seed by a deterministic integer hash: never runtime
random, every state reproducible. The faux tweed is
roughly 200 short thread strokes per square held as JS
data and stroked fresh every frame, not an offscreen
layer.

Interaction is double-tap only (350ms window, per the
standing precedent). A double-tap advances only the
tapped square to the next seed in its own table and fires
a stitch-flash: a dashed bone seam flashing inside that
square for 0.45s. A single tap does nothing. The tap is
hit-tested in design coords through the stored cover
transform (S, OX, OY). Nothing ever reseeds or reloads
the whole piece.

Frame one is drawn synchronously at the constant phase
T = 7.35, all twenty squares already mid-loop; the
animation clock advances from that fixed anchor by fixed
1/60 ticks off the rAF timestamp, never from Date.now()
minus an offset, and requestAnimationFrame is
typeof-guarded. One canvas only: no offscreen canvas, no
shadowBlur, no gradients, no filters, no text.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from
the piece's own script; all in-code assertions passed at
every size (20s loop sum, 20 squares, each generator
exactly 4 times, no sixth generator, 20 x 4 seed table).

- qa-desktop.png (1280x900): the full quilt; celestial
  squares on slate with gold crescent and sun, tweed
  squares reading as woven thread fields, pinstripes in
  horizontal, diagonal and vertical variants, damask
  squares of rose blooms on twisty slate stems, star
  squares in single and quad arrangements; dashed
  sew-lines clean in every gutter and around the edge.
- qa-mobile.png (390x844): cover crop fills the phone
  frame with whole and part squares, sew-lines intact,
  nothing distorted.
- thumb.png (720x720, in this folder): square crop keeps
  the patchwork, the sew-lines and all five pattern kinds
  legible. Rendered twice and compared: byte-identical.
- T=12.0 variant (offset copy in /tmp): mid-loop state;
  stars and sun rays visibly turned, tweed sheen band
  moved, twinkles shifted, nothing broken.
- T=27.35 variant (offset copy in /tmp): frame at
  T = 7.35 + 20 compared against thumb.png:
  byte-identical, confirming the seamless loop seam.

Fixes during the build: the first render crashed on a
name collision, the viewport height variable H shadowed
the seed hash function H; the hash was renamed (hashN)
and every call updated, after which all renders passed.

Deviations: none from the spec or its adaptation flag.
The double-tap path is event-driven and cannot fire in
the headless renderer; it is guarded, hit-tested in
design coords, advances one square's seed index only,
and never reloads.
