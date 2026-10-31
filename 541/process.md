# No.541 Object Icons

EXPANSION #65 nadia-hafid, prompt NH5. Objects as rhythm markers: "mark time, time to breathe."

## Concept

A horizontal band of six isolated object icons, each centred in its own flat
colour panel, alternating dusty blue and terracotta with thin black dividers.
Left to right: a vinyl record, two dice, a radio, a coffee cup, a key, a small
potted plant. Every icon sits in its own flat black shadow pool. The band runs
full-bleed across the frame, centred vertically on a white page. No text, no
UI, no labels, no hint: the strip is a breathing rhythm, not an interface.

Watch-only and meditative. In a 24-second seamless loop each icon bobs gently
on its own staggered sine, and once per loop a single icon briefly flips to
its "night" version (black panel, white object) before returning. Which icon
flips rotates by one panel each loop, so the night visits every object in
turn over six loops.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Strict four-colour palette, nothing else: dusty blue #A8C8CC, terracotta
  #D89A80, black #111111, white #FFFFFF. Each icon is drawn with an
  (ink, paper) colour pair: black shapes with white detail by day; the night
  version is the same draw function called with the pair swapped on a black
  panel. Flat fills only; no gradients anywhere, no drop shadows, only the
  flat black pools.
- Design space 1080x1080. Band y 350..730, six panels of 180 units; icon
  centre line y 522, shadow-pool centre y 614 (flat ellipse, 58x13).
- Bob: per-icon sine with an integer cycle count (1-3) over the 24s loop and
  a seeded amplitude of about 4px at stage scale, so the loop closes exactly.
  Seeded values come from mulberry32 with fixed seed 541065.
- Night swap: loop index mod 6 picks the panel; the swap is a hard flat
  palette remap while the loop phase is in [9s, 13s). The shadow pool stays
  black and simply merges into the night panel.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style width/height pinned in px inside
  draw(). Phone detection via window.screen physical size (min dimension
  under 700px), aspect ratio only as fallback; on phones the square stage
  takes the full width so the band spans edge to edge, page ground white.
- Determinism: the first frame is drawn synchronously at the constant phase
  PHASE0 = 0, where every bob sine is at neutral and no night swap is active.
  The animation loop is typeof-guarded and anchored as PHASE0 + elapsed since
  the first rAF timestamp, never derived from Date.now().

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844 and
  720x720.
- thumb.png rendered twice and byte-compared with cmp: identical; the second
  render was deleted.
- First pass read-back: the shadow pools sat too far below the icons and the
  cup's full-width coffee ellipse made it read slightly like a hat. Pool line
  raised (648 to 614), coffee ellipse inset, handle enlarged; re-rendered.
- Desktop and thumb: six panels alternating blue/terracotta, all six icons
  legible (record, dice, radio, cup, key, plant), each over its black pool,
  thin black dividers, band centred on white, nothing clipped.
- Mobile: band spans the full width, stage centred vertically on white,
  all six icons whole and legible, nothing clipped.

## Deviations

- The brief repeats the prompt's "no offscreen canvas" renderer limit; this
  piece needs no offscreen canvas anyway, since each icon is a direct
  flat-shape draw function.
- Hafid's own rule (no glazes or textures) is honoured: unlike most pieces in
  this series, there is no grain or speck layer at all.
- The night version keeps its shadow pool black; on the black night panel the
  pool is invisible rather than redrawn in another colour, keeping the strict
  four-colour palette.
