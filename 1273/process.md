# №1273 "Self-Portrait in Thread" (suchitra-mattai SM2, PP432)

## Prompt
An antique tapestry in ruins — irregular fragments of faded damask/floral
patterns, torn at the edges, pieced with seams — carries a female figure drawn
entirely in thread: short chain-stitch dashes tracing silhouette and face,
magenta and rust thread on the faded ground. The stitching draws itself
slowly, dash by dash, then holds. After Mattai's *self-portrait as I never
was* (2018, thread on tapestry pieced from ruins).

## Palette (verbatim from prompt)
Faded damask rose #C9A59A; tapestry umber #7A5C42; thread magenta #B01E5A;
thread rust #A6502E; seam charcoal #3A332C; ground dark #161311.
Fragment base tones are mixes of the rose and umber only.

## Composition
Square. Sixteen tapestry fragments (4x4 grid with jittered corners) fill the
frame; the figure stands full-length, off-center (x ≈ 600/1000). No text
anywhere except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)
- Stitch-in: every dash carries a fixed order index; dash i reveals at
  (i / total) × 20 s. Frame one (t = 0) shows the first 28 dashes — the top
  arc of the head — so the deterministic first frame reads as stitching just
  begun. After 20 s the figure holds, fully stitched.
- Tap-and-hold (380 ms, under 12 px of movement) re-stitches the region:
  dashes within 110 units fade out over 0.3 s, then redraw one by one at
  0.04 s intervals in distance order.
- Drag near a fragment edge (within 28 units) nudges that fragment: it
  follows the drag at 0.6×, then settles with a decaying oscillation
  (exp(-2.2 dt) × cos(7 dt)), clamped to ±45 units.
- The rAF loop is anchored as offset + elapsed-since-load; frame one is an
  explicit draw(0), never derived from Date.now().

## House adaptations
- No typed input, no audio, no gradients, no filters, no shadowBlur, no
  offscreen canvas, no element creation, no unseeded randomness (single
  mulberry32 seed, 1273). Dashes are stroked line segments; motif flowers
  are flat rotated rects; dots are rects — no ellipse/arc batching, per the
  node-canvas quirk.
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px; phone detection via
  window.screen physical size with the aspect fallback; centered square
  composition with the page ground in the piece's own background color.

## QA
Rendered with node ~/workspace/tools/render-piece.js at 1280×900 desktop,
390×844 mobile, and 720×720 thumb; all three inspected personally.
Thumb rendered twice, `cmp` byte-identical.
Forced late-phase probe (temp copy with the initial draw forced to t = 25 s,
discarded): the fully-stitched figure reads — rust silhouette, magenta
brows/eyes/nose/mouth and waist/hem seam lines, left arm hanging, right arm
bent, full-length, off-center. No other fix round needed after the probe.

## Fix rounds
1. First render: independently jittered fragment edges opened black wedge gaps
   between neighbours. Fixed by generating each grid edge once and sharing it
   between adjacent fragments (top/right/bottom/left assembly); torn look
   kept, seams now meet as charcoal lines.
2. Frame-one seed raised from 10 to 28 dashes so the head arc reads at
   first frame while still being only the beginning of the stitch-in.
