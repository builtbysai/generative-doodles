# No.806 "Two Orange Bars" — EXPANSION #98 olivier-mosset, PP7

## Concept

The stripe program's endgame, from the two orange bars shown at VNH Paris
2018. A wide white panorama with exactly two vertical orange bars, at 1/4
and 3/4 of the width, each bar 1/8 of the canvas wide. The emptiness is
the subject; the discipline is the work. No third bar, no color
variation, no flourish.

## Construction

- Palette (strict): ground #F6F3EC, bars #E06A1B. Two tones, nothing else.
- Ground fills the whole frame, wall to wall, every frame. The panorama
  is a horizontal band: on a landscape frame the band is the full frame
  height; on a portrait frame (phone) the band is a 3:1 strip centered
  vertically. Because the ground continues above and below the band in
  the identical white, the band's edge is invisible; only the height the
  bars span gives the panorama away. This matches how the VNH hang reads
  in a tall room: bars of a fixed height floating in more white.
- Bars: width W/8, spanning the band's full height. Nominal centers at
  W/4 and 3W/4.
- Motion: watch-only, seamless 36 s loop. Each bar drifts ±5% of W on a
  slow sine: bar one completes 1 cycle per loop, bar two completes 2
  cycles per loop (integer period ratio 1:2), so positions are
  closed-form in t and the loop closes exactly. Drift ranges are
  0.20W–0.30W and 0.70W–0.80W, so neither bar ever leaves its quarter
  zone. Frame one is loop t=0 with both sines at 0: the bars sit at
  their exact nominal quarters. No phase offset is used or needed.
- House mechanics: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas CSS size pinned in px
  inside draw(); phone detection via window.screen physical size (min
  dimension < 700px) with the h > w*1.15 aspect fallback; rAF
  typeof-guarded; frame one drawn synchronously at t=0; no Date.now(),
  no RNG (nothing in the piece is random), no gradients, no shadowBlur,
  no ctx.filter, no offscreen canvas, no audio, no text except <title>.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png).
- Determinism: thumb.png rendered twice, byte-identical (cmp clean);
  duplicate deleted.
- Read-backs: desktop and thumb show the white field with exactly two
  orange bars at the quarters spanning the full height; mobile shows the
  centered panorama band with both bars spanning the band only, white
  above and below.
- Deviations: none. The portrait-band presentation is the documented
  composition choice for phone frames, made in the build brief itself;
  landscape frames are full-bleed as specced.
