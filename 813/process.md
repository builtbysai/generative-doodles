# No.813 — Candle Room

EXPANSION #99 jacob-kassay, block 6 "Candle Room" (from "X," von ammon co DC 2019).

## Concept

A dark industrial gallery room lit by a single candle. White structural columns stand mid-ground with foggy silvered canvases hung on them; a bronze slatted curtain hangs under a beam. The candle flame, low in the frame, is the only light source: the silver faces catch it as warm patches, the curtain slats glow faintly on their flame side, the floor holds a small warm pool. The light is the medium; everything else just reports it. The darkness is most of the image. No candle body is drawn beyond the glow point, there are no other light sources, and the only text is the page title.

## Construction

Canvas 2D only, single self-contained file. Palette is strict: room #0C0C0C, columns #E8E8E8, silver #B0B0B0, flame core #FFB43C, flame edge #FF7A1A, bronze #5E4128, rust #8A4A1F. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas: every glow is built from layered alpha ellipses.

Light model. Each surface's illumination is an inverse-square-style falloff, 1 / (1 + (d/scale)^2), from the flame's live position, multiplied by the flame intensity. Silver canvases are drawn as a dim silver base with seeded fog patches, then a warm patch of three nested ellipses (edge tone, edge tone, core tone) whose centre is pulled toward the flame's position and swings with the gust. Columns get a base wash plus a warm ellipse on the flame-facing edge. Curtain slats are bronze rects whose alpha rises with flame proximity, with a warm ellipse crawling each slat and seeded rust streaks on top. The floor is a faint trapezoid with seeded grain and a three-layer warm pool under the flame. The flame itself is seven stacked ellipses along a curve that leans more toward the tip, over a three-layer halo.

Flicker. Intensity and position jitter are a closed-form sum of six seeded sines (mulberry32 seed 813001: frequencies 0.6–3.2 Hz, random weights and phases), normalised to −1..1. Nothing is random per frame; the flicker at time t is a pure function of t. Frame one is the synchronous draw at t = 0, a fixed phase of that sum, so the thumbnail byte-matches on re-render.

Gust mechanics. Dragging is air disturbance. While dragging, the pointer's horizontal velocity becomes a live lean. On release, an impulse {t0, vx} is recorded; the gust at time t is the sum of recorded impulses times exp(−dt/2.2) with a small sinusoidal settle, so the flame leans away, the light patches swing on the canvases by the same gust value, and everything settles back over a few seconds. All closed-form in (recorded drag events, t).

Static detail (curtain rust streaks, canvas fog patches, floor grain) is seeded data (mulberry32 seed 813777), rebuilt identically on resize. Sizing comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas style width/height are pinned in px inside draw() every frame. Phone detection uses window.screen's physical min dimension (< 700px) with the aspect fallback h > w × 1.15. The rAF loop is typeof-guarded; without rAF the piece rests on its synchronous first frame. No audio, no microphone.

## QA log

- Rendered with tools/render-piece.js at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- First read-back caught three defects: warm patches and fog ellipses bled outside the canvas faces as floating ovals, the column wash spilled off the shafts, and rust streaks dripped below the curtain's foot. Fixed by clipping all canvas-face drawing and the column wash to their panels/shafts and clamping streak lengths to the slat; re-rendered and re-verified (determinism re-checked after the fix).
- Desktop read-back (final): near-black room, two pale columns with dim silver canvases, both canvases catching warm patches low on their faces, bronze slat curtain faintly glowing at centre under the beam, small warm flame low-centre with a floor pool. Mostly darkness.
- Mobile read-back (final): full room composition holds at 390 wide, flame and warm patches legible, nothing clipped.
- Deviations: none. The prompt's gallery is realised in simple flat perspective rather than full perspective projection, which the brief permits ("room in perspective" with flat shapes under the house renderer limits); light falloff is computed per surface rather than per pixel for the same reason.
