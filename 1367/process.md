# №1367 "The Naming of Names" (raven-chacon RC8, PP590)

Canyons of two worlds after *The Naming of Names* (2026): layered topographical
contour etchings of a desert canyon and a Martian canyon, superimposed on
starfield black, with silent-film grain and short pseudo-script text fragments
drifting along the contour lines.

## Frame one

Starfield black ground (#060606) with a static seeded star field. Two contour
systems overlap at the center: the Earth canyon in canyon rust (#A0522D),
centered at 0.38W / 0.55H, and the Mars canyon in Mars dust (#C1440E),
centered at 0.64W / 0.45H. Each system is 14 closed loops, each loop perturbed
by three seeded periodic harmonics so it reads as a hand-etched contour, not a
perfect ellipse. Small archival-gray pseudo-script fragment clusters sit on
several contour lines. No readable text except `<title>`.

## Motion

- **Contour draw-on/fade loop (48 s):** every loop carries a staggered phase
  offset (line index × 1.7 s). Within its phase a line draws on over 10 s
  (partial polyline, rising alpha), holds fully for 24 s, then fades over
  14 s. At frame one the lines sit at mixed stages, so the field already
  reads as mid-drawing.
- **Fragments:** 10 invented-glyph clusters drift slowly along their assigned
  contour loops (0.008–0.02 of loop length per second), oriented along the
  path tangent. Marks are bars, dot pairs, chevrons, arcs, and ticks only.
- **Grain:** 320 faint archival-gray dots whose alpha is a seeded function of
  (dot index, quantized 2 s time index), so the grain shimmers slowly and
  reproducibly, and is always present.

## Interaction

Drag scrubs the blend between the two canyons: blend is the last dragged
x fraction of the frame width, default 0.5 (both superimposed). Left = Earth
canyon, right = Mars canyon. Each system's alpha is 0.06 + 0.94 × its blend
share, so the losing canyon never fully vanishes. On release the blend stays
where the visitor left it. No tap action, never click-to-reload.

## Adaptations

- **Contours from seeded noise fields:** loops are generated from seeded
  periodic harmonics (a closed-form noise field over angle) as flat-alpha
  strokes on the main canvas. No pre-rendered texture buffer, no offscreen
  canvas.
- **Grain as a seeded function:** alpha = f(dot index, floor(t/2)); never
  per-frame random, so the grain is reproducible at any quantized time.
- **Audio refused:** the prompt's subtle WebAudio static bed is refused as
  autonomous audio under the house no-autoplay rule. Static is visual grain
  only. The piece contains no AudioContext at all and is fully silent.
- **Text fragments are pseudo-script only:** invented marks drifting along
  contour lines, never readable words, never letterforms.
- **No photorealism, no NASA-logo literalism:** etchings and grain only;
  both canyons are abstract loop systems, not imagery.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w×1.15 fallback; the field-like composition is full-bleed
  on phones (verified at 390 wide).
- Determinism: frame one = draw(0) via boot flag; the rAF loop is a plain
  function declaration behind a typeof guard and starts the clock only with
  the loop. All randomness from mulberry32 (seed 1367000 + index×7919),
  never Math.random. No gradients, shadowBlur, Path2D, createElement,
  offscreen canvas, or getUserMedia anywhere in the file.

## Verification

- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders including a final re-verify.
- Probe harness (stubbed rAF driving the piece's own loop, piece's own
  pointer listeners): t=16 vs t=0 differs in 55,983 px and t=40 vs t=16 in
  64,034 px (lines drawing on and fading through the loop); a drag to the
  far left vs no drag differs in 71,061 px; a drag to the far right vs far
  left differs in 79,874 px with Mars-dust-classified pixels appearing
  (7,341 vs 0); spatial check at t=10: drag-left concentrates warm pixels
  on the left half (20,623 vs 10,177 right) and drag-right on the right
  half (9,350 vs 4,027 left), confirming the scrub direction. Gray
  (grain/star/fragment) pixels present at all probed times (2,516 at t=0,
  2,347 at t=40).
- Token scan clean except one comment stating Math.random is never used and
  the two sanctioned typeof-guarded requestAnimationFrame lines.
