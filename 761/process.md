# No.761 "Three States"

EXPANSION #93 larry-bell, prompt block 2 "Three States".

## Concept

Bell's dictum is that a coated pane of glass reflects, transmits, and
absorbs all at the same time. The piece is one full-height pane,
edge to edge, divided into three vertical states that bleed into
each other instead of splitting: at left, REFLECTION, a silver-blue
mirror carrying a bright diagonal streak and a thinned, flipped
sheen of the room's one lit arch; in the middle, TRANSMISSION, the
honest window, where a dim, deliberately unfocused gallery (arch
glow, two plinth silhouettes read by their rim light, a far wall
band, a violet floor) shows through warm; at right, ABSORPTION,
graphite soot with a violet undertone that has nearly swallowed
the room, leaving only a ghost of it and a few film flecks. Where
the states meet, thin iridescent lines run violet to gold, dusted
with grain that shimmers.

The boundaries are alive. Idle, they breathe on a 12-second cycle.
Drag horizontally and you push them: right widens the mirror and
its streak deepens; left widens the window and the view through
it clears. Release, and over about six seconds the bands settle
back to their resting thirds. A tap is not a control, per the
prompt, and nothing ever reloads.

## Construction

- Single self-contained `index.html`, canvas 2D, no external
  assets. Sizing from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`; the canvas CSS
  size is pinned in px on every draw. Phone detection via
  `window.screen` physical size (min dimension < 700 px), aspect
  `h > w*1.15` as fallback only; the bands stay vertical either
  way and the page ground is the graphite tone.
- Band/mask construction: the prompt's per-pixel smoothstep masks
  and blurred background sampling cannot use `ctx.filter` or an
  offscreen buffer in this renderer, so everything is analytic.
  The pane is drawn as narrow vertical strips (4 px, 3 px on
  phones) crossed by fine rows. Per column, the three band
  weights come from smoothstep masks across a 0.045-unit bleed
  zone at each boundary, exactly summing to 1, so adjacent strips
  step the mask finely enough to read as a smooth bleed (stepped
  smooth masks). Per cell, the three state colors are evaluated
  as closed-form functions of unit position and blended by those
  weights. The "blurred" gallery is unfocused by construction:
  every background shape is a smooth falloff (an elliptical arch
  glow, rim-lit plinth boxes, a soft wall band), with no hard
  edge anywhere, rather than a blurred bitmap.
- The seams are added per column as a narrow gaussian of
  iridescence, its hue sliding violet to gold down the line, and
  then 460 seeded grain dots (mulberry32, seed 7610193) are drawn
  hugging the live boundary positions, so the grain follows the
  bands as they breathe and are dragged; each dot's alpha shimmers
  on its own seeded phase. 130 fainter flecks sit inside the
  absorption band so the soot reads as coating, not flat fill.
- Boundaries are a closed-form function of recorded drag events
  and elapsed time: rest thirds plus the 12 s breathing sines plus
  a drag offset (boundary 1 takes the offset in full, boundary 2
  at half rate, which is what makes a rightward drag widen
  reflection and a leftward drag widen transmission). The offset
  clamps to ±0.30, boundary 1 to [0.08, 0.62], boundary 2 to
  [b1 + 0.12, 0.94]. On release the offset decays exponentially
  (tau 2.2 s), home in about six seconds. The reflection streak's
  depth and the transmission clarity are derived from the live
  boundary positions, so the states respond to being widened, not
  just move.
- Palette is strict: #A8B8C4, #E8ECF0, #E8DCC4, #23262B,
  #3A3A4A, #7A6FA8, #D8B46A. Every pixel is one of these or a
  blend of two.
- Determinism: frame one is the synchronous draw at t = 0, bands
  at rest, no drag recorded. No `Date.now()`, no `Math.random()`
  anywhere; the animation loop is anchored at its first rAF
  timestamp and rAF is `typeof`-guarded, since the QA renderer
  has no rAF, no AudioContext, no `document.createElement`, no
  offscreen canvas and no `ctx.filter`. No audio, no microphone.
  An inert `?seed=tNN` hook lets QA draw a later cycle time;
  normal viewing always starts at t = 0.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice back-to-back and
  byte-compared with `cmp`: identical. The duplicate was deleted.
- Read-back, desktop and thumb: one pane, three bleeding states,
  mirrored silver-blue with a diagonal highlight streak at left,
  the warm arch glow and a plinth rim legible through the middle
  window, graphite-violet soot at right, iridescent gold/violet
  seams with visible grain at both boundaries, subtle frame edge
  inset. Mobile keeps all three bands and both seams in the tall
  frame; nothing clipped.
- One fix round: the first render's row pitch (H/72) left visible
  horizontal banding across the arch glow; row pitch tightened to
  H/120 and all renders redone, byte-compare re-verified.
- Grep audit clean: no `Date.now`, `Math.random`,
  `createElement`, `AudioContext`, `ctx.filter`, `shadowBlur`,
  canvas gradients, external URLs, or em dashes in the piece.
- Deviations from the prompt's technical sketch, with reasons:
  (1) the background is an analytic unfocused scene instead of a
  sampled-and-blurred bitmap, because the QA renderer offers no
  filter or offscreen sampling; the visible behavior, a dim room
  that reads clearly only through the transmission band, is
  unchanged. (2) The boundary masks are stepped strips rather
  than true per-pixel masks, the standard renderer-safe route in
  this series; at 3-4 px pitch the bleed reads smooth. No
  deviation from the prompt's substance: three states at once,
  bleeding bands, drag-only control, tap inert.
