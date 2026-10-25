# №446 Jewel Beast

## Concept
A natural-history-serious animal in monochrome blues wearing one oversized
jewel, on a white ground with a faint pink backdrop architecture and a thin
geometric border with squared corners. The joke is only the jewelry: the cat
sits upright, ears up, gaze level, and wears an oversized emerald-cut ring
on its front paw like it means it. The gemstone facets cycle a slow 8s
sparkle sweep and the animal breathes at 5s; the eyes never blink. Drag
orbits the light source (facets and eye-shine shift with pointer angle);
double-tap cycles a fixed authored table of animal and jewel pairings:
cat plus emerald-cut ring (paw), fawn plus diamond pendant on a gold chain
(neck), hare plus sapphire brooch (chest), owl plus diamond pendant (neck),
then back to cat. The prompt names three jewel types for four animals, so
the pendant repeats once, per the spec's fly resolution.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets.
- House rules from №441: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; one synchronous frame at load from a constant phase
  (PHASE0 = 1.5s, rAF loop anchored as offset plus elapsed); rAF guarded
  by a typeof check; no offscreen canvases, no document.createElement,
  single script block, no in-piece hint or UI text.
- Palette verbatim from the spec: ground #FDFBFA; animal blues #1E3A8A /
  #2E4B9E / #0E1E5B; backdrop pink #F2D5D8 at 12% opacity (two columns, an
  entablature, and a central arch); gold #D4A017 with #F5D78E facets;
  gemstone #3AA6D8 with white 4-point star sparkles; border #2E4B9E,
  inset 4% of the short side, with filled square corner ornaments.
- The cat is drawn in local unit space (seated haunch, curled tail, chest
  patch, head turned toward the viewer, whiskers, seeded fur-edge tufts
  placed on the silhouette outline). The emerald-cut gem is a cut-corner
  rectangle with four corner facet triangles whose white overlay alpha
  follows the rotating glint sweep, plus a gold table tint and three
  pulsing star sparkles on glint peaks.
- Body shading is clipped to each animal's own body path (a rect gradient
  was tried first and left a hard vertical edge against the ground).
- The diamond pendant chain is drawn as two bows from the neck down to
  the pendant bead so the chain always joins, for both the fawn and owl
  necklines. The sapphire brooch is a gold bead ring around a faceted
  blue oval. The diamond gem is a pale blue-white brilliant cut; the
  sapphire uses the spec's mid blues with white facet wedges.
- The hare is the tallest pairing (ears to local y -0.82), so it renders
  at 0.60 of the short side instead of 0.65 with its span recentered,
  keeping every ear tip inside the border at all sizes.

## QA log
- node render-piece.js at 720x720 twice: both renders byte-identical,
  sha256 4ecb79e76ce694cc6e23066a6332d41ce854130dd208f8d41642ce754216fb6c
  (both runs). Saved as thumb.png.
- 1280x900 desktop render inspected: cat centered, border intact with
  square corners, faint pink architecture behind, ring and gem legible
  on the front paw, no clipping.
- 390x844 mobile render inspected: subject keeps its shape and stays
  centered, border intact, no clipping; ground is the piece's own
  background color, so no phone ground flip is needed.
- All four double-tap pairings rendered via temporary copies with the
  pairing index forced (harness cannot fire pointer events): fawn,
  hare, and owl all render without errors and read as their animals
  with the correct jewel placement. Two fixes resulted: the fawn
  pendant chain was reworked to join neck to bead, and the hare was
  rescaled and recentered after its ear tips clipped the canvas top.
- First-pass issues fixed and re-rendered: the unclipped body shadow
  left a hard vertical band (fixed by clipping shade to the body
  path), and fur tufts floated off the silhouette (repositioned onto
  the outline).
- No push, no repo touch, no pieces.json edit, per the build brief.
