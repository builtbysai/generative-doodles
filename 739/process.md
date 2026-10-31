# No.739 Cosmic Latte

EXPANSION #90 spencer-finch, prompt block 4 "Cosmic Latte".

## Concept

Cosmic Latte is the average color of the universe, a warm yellowish-white
(#FFF8E7). Finch's installation arranges bulbs of that color in the gently
arching shape of the Milky Way (Northern Hemisphere, March), clustered as
molecular models of the pigments that make the color: big sparse
titanium-white clusters, medium Mars-yellow and chrome-yellow clusters, and
tiny rare cadmium-red sparks. This piece rebuilds that sky at gallery scale:
600 bulbs along a diagonal arch on deep gallery black, warm and dim, with no
cool white, no blue, no constellations, no labels. It is a sky, so it has no
interaction at all. You just stand in front of it.

## Construction

- Palette is strict: ground #08090B, bulbs #FFF8E7, titanium clusters
  #F5F2E8, Mars yellow #D9A441, chrome yellow #F2B234, cadmium red #E30022.
  Nothing else is drawn.
- The arch is a quadratic bezier in unit field coordinates from upper-left
  to lower-right, bowing gently upward. Cluster centers are placed along it
  with a band offset drawn from a centered three-sample mean, so density
  falls off away from the spine. Positions are unit coordinates, so the sky
  is identical at every canvas size; on phones the arch keeps its diagonal
  run in the tall frame.
- Cluster and molecule placement: each cluster gets a type by seeded
  probability (titanium 70%, Mars yellow 15%, chrome yellow 12%, cadmium
  red 3%). A cluster is a molecule: one central bulb, always drawn in the
  latte color itself, with satellite bulbs on short spokes around it in the
  pigment color. Titanium molecules are the largest and sparsest (6 to 9
  satellites, longest spokes), Mars and chrome are medium (4 to 6), cadmium
  is a tiny spark (2 to 3, shortest spokes, smallest cores). The build runs
  until exactly 600 bulbs exist; the final cluster's satellite count is
  trimmed so the total lands on 600 exactly.
- One mulberry32 stream (seed 73901147) generates the whole sky once at
  load: placement, cluster types, spoke angles, breathing phases. No
  randomness is drawn per frame.
- Motion is a 40 second seamless loop. Each bulb breathes at brightness
  0.85 + 0.15 sin, with a seeded phase and an integer cycle count (1 or 2
  full cycles per loop), so every bulb returns to its frame-one brightness
  exactly at the loop point. The whole arch makes a sidereal crawl: a closed
  sine offset that is zero at loop start and end and peaks at about 6 px
  mid-loop.
- House adaptation, glow: the renderer has no radial gradients and
  shadowBlur is unreliable, so each bulb's glow is built from layered alpha
  discs in three passes over the field: a wide faint disc (4x core radius,
  alpha 0.05), a nearer halo (2.2x, alpha 0.13), and a hard core dot (alpha
  0.92), each scaled by the bulb's breathing brightness.
- Frame one is the synchronous draw at loop t = 0, bulbs at their phase-0
  brightness and the drift at zero. The animation loop is anchored at load
  and advances by elapsed time only; no frame is ever derived from a wall
  clock phase. requestAnimationFrame is typeof-guarded.
- Canvas size comes from the Visual Viewport API with resize listeners on
  visualViewport and window; the canvas element is pinned in draw() via
  canvas.style.width/height in px. Phone detection uses window.screen
  physical size (min dimension under 700px), aspect h > w*1.15 as fallback
  only. The page ground is the piece's own ground color.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted.
- Desktop read-back: a warm diagonal arch of clustered bulbs running
  upper-left to lower-right on deep black, generous dark above and below.
  Titanium clusters read as dense warm-white molecules; Mars and chrome
  clusters read as distinct golden knots along the band; cadmium is present
  only as a rare tiny red spark. No cool or blue tones anywhere.
- Thumb read-back: same arch and clustering at square size; the band stays
  coherent and dim, gallery-dark rather than space-poster.
- Mobile read-back: the arch keeps its full diagonal run in the tall frame,
  steepened by the aspect, nothing clipped at either end; clusters and the
  yellow knots remain legible at the smaller bulb scale.
- No text in the piece other than the <title>. No audio, no microphone, no
  interaction handlers.

## Deviations

- None from the prompt's substance. The layered-disc glow above replaces
  the gradient glow sprite named in the prompt's technical approach, per
  the house renderer rules; the visible result (soft warm halo, hard core)
  is the same.
