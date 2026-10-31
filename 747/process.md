# No.747 — Wedgework Drift

EXPANSION #91 james-turrell, prompt block 4 "Wedgework Drift" (from TASKS.md).
After Turrell's Wedgework series (1969–2024, incl. Key Lime 1994): two planes of
projected light crossing inside a dark room; where they cross, brightness sums
additively and the room's walls dissolve beyond their physical bounds.

## Concept

A dark room, barely legible: a faint floor plane along the bottom and one
vertical corner seam. Two blades of light, Key Lime and violet, cross
diagonally off-center and extend past every edge of the frame, so the light
never shows a source or an end. In a seamless 60-second loop the blades slowly
pivot around their crossing point (plus/minus 8 degrees), the crossing point
itself drifts a few percent, and the blades settle again. At the pivot
extremes the corner seam fades to nothing: the dissolve, the moment the room
reads as extending beyond its walls. Watch-only; Turrell's rooms ask for
sustained looking, not input.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette, strict: room `#08080A`, floor `#111114`, blade one `#D4F24A`
  (Key Lime), blade two `#9A6AE8`. The overlap color is only ever the
  additive sum of the two blade colors.
- Layered-strip blade construction (house rule: no linear gradients): each
  blade is drawn as seven stacked alpha strips of the same color, widest and
  faintest first (alpha 0.045) down to a hard bright core (alpha 0.95), all
  rotated rectangles centered on the crossing point and long enough to exit
  the frame on both ends. The stepped alphas approximate the soft falloff of
  a projected wedge while keeping a hard centerline.
- Additive overlap: blade one (lime) is drawn with `source-over`; blade two
  (violet) is drawn over it with `globalCompositeOperation = 'lighter'`, so
  in the crossing zone the two colors genuinely sum channel by channel and
  the overlap reads visibly brighter, near white at the core crossing, than
  either blade alone.
- Motion as closed-form functions of loop phase u (period 60 s, integer
  cycle counts throughout, so the loop closes exactly): pivot =
  sin(2 pi u); lime angle = -0.58 rad + 8 deg * pivot; violet angle =
  0.66 rad - 6.8 deg * pivot (counter-pivot); crossing drift x = +3.5% *
  sin(2 pi u), y = +2.8% * sin(4 pi u + 1.1). Seam alpha = 0.16 * (1 -
  |pivot|): full faint visibility at settle, zero at both pivot extremes.
- Room: flat `#08080A` fill; floor band (bottom 22%) in `#111114`; seam =
  1.2 px vertical line at x = 66% plus a dimmer horizontal floor-edge line,
  both drawn only while their alpha is above a hair threshold.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in px inside draw()
  every frame. Phone detection via window.screen physical size (min
  dimension < 700 px) with aspect h > w * 1.15 as fallback only; on phones
  the crossing re-centers slightly (x 46%) so both blades keep their run.
- Determinism: frame one is the synchronous draw at loop t = 0 (base angles,
  seam faintly visible, drift at origin). The animation loop is anchored as
  elapsed time since load; no Date.now(), no Math.random(), no wall-clock
  input anywhere. rAF is typeof-guarded so the piece still draws its first
  frame in renderers without it. No audio, no microphone, no interaction
  handlers at all.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- Read-back, desktop: two broad diagonal blades, lime rising left-to-right
  and violet falling, crossing left of center; the crossing core is a bright
  near-white point and the overlap zone is visibly brighter than either
  blade; corner seam and floor edge faintly visible; blades exit all four
  edges, no clipping, no text.
- Read-back, mobile (390x844): full crossing composition refits inside the
  tall frame, seam still faintly visible, floor band present, nothing
  clipped.
- One refinement round: the strip unit was widened from 1.2% to 1.7% of the
  smaller dimension after the first read-back, where the blades read too
  thin and neon-like; re-rendered all sizes and re-verified determinism.

## Deviations

- None from the prompt's substance. The prompt's gradient-bar blades are
  realized as layered alpha strips per the standing house no-gradient rule;
  the additive overlap the prompt specifies is implemented literally with
  the canvas 'lighter' composite.
