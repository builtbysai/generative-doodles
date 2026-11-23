# №1718 "Ribbon Twist" (PP965, EXPANSION #225 goodbad-png) - process.md

## Spec
Built per ~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/BATCH-1717-1719-SPEC.md,
section №1718 PP965. Title "Ribbon Twist", date 2006 · 09 · 25, gallery note:
"A white ribbon twists a half turn across blue-to-pink sky. Watch only."
Template: live №1716 index.html (fetched via fetch-blob.py, sha b042eaf95edb1d3c2ac60237aa9587d0c3db70bf).

## Build
- Canvas 2D only (node-canvas has no WebGL); p5.js-to-2D substitution per the spec's
  technical approach. No deviation from the prompt beyond that substitution.
- Sky: diagonal linear gradient, deep blue #1E40AF through #3B82F6 to pink #EC4899 / #F472B6.
  Hexes hand-picked from the prompt's named colors; no study file exists for f13.
- Ribbon: 15 separate parallel white lines, each a 64-sample polyline along a cubic
  Bezier spine entering the left edge (y 0.30) and exiting the right edge (y 0.62),
  never centered. Lateral offset is o * cos(twist), so the lines pinch together where
  the band turns edge-on and spread where it lies flat: a fabric turn, not a knot,
  and never a single thick stroked path. Edge lines run at lower alpha (0.62) than
  the center (0.92).
- Twist: angle(u, t) = PI * (u + t / 16). Half a turn across the band, travelling
  with time. The band is symmetric under a 180-degree turn, so angle + PI is the
  identical band and the 16s loop wraps with no pop. The spine control points flex
  with closed-form sin functions of the same 16s period.
- Stipple: 90 seeded dots (mulberry32 seed 1718) fixed along the band; each dot's
  alpha scales with (1 - |cos(twist)|), so dots appear where the band turns hardest.
- Soft shadow: a faint under-stroke of the spine (alpha 0.07, 1.4x half-width),
  offset 5px right / 8px down, for depth only.
- Interaction: watch-only seamless loop, 16s period. No pointer handlers, no
  click-to-reload. Reduced-motion honored (loop suppressed, frame one still drawn).
- Plates drawn on canvas: title plate "Ribbon Twist" / "2006 · 09 · 25" top left,
  hint plate "Watch only." bottom left. Dark plates with pink accent line, per №1716.
- House rules: Visual Viewport sizing, resize on visualViewport and window,
  canvas.style.width/height pinned in draw(), phone detection via window.screen
  (min dimension < 700px) with aspect fallback h > w*1.15, square stage on desktop
  with gradient ground filling the full canvas, full-bleed on phones, one synchronous
  frame at load, requestAnimationFrame guarded by typeof check.
- Frame one: fixed phase t = 4.0s of the 16s period (quarter period, twist shifted
  45 degrees, band mid-twist with the pinch and stipple legible). Seeded RNG only;
  no Date.now()/Math.random() affecting frame one.

## QA (node ~/workspace/tools/render-piece.js, all renders inspected)
- First gate: render failed with TypeError in rgba(): I had passed a string
  (`.toFixed(4)` result) as the alpha argument in two places (ribbon stroke,
  stipple fill). Fixed by passing the numeric alpha directly; `rgba()` itself
  rounds to 4 decimals. No other change.
- Re-gate after the fix (final files):
  - Desktop 1280x900: gradient clean blue top-left to pink bottom-right, no muddiness.
    Ribbon enters the left edge of the centered square stage and exits the right edge,
    15 separate white lines pinching to a twist left of center, stipple dots scattered
    along the twist edges, faint shadow barely visible. Plates legible.
  - Mobile 390x844: full-bleed gradient, ribbon sweeps diagonally edge to edge with
    the twist near the top, plates legible, no clipping of text.
  - Thumb 720x720: same composition as desktop, twist and stipple legible at small size.
- Loop check: by construction (see Twist above); spine flex and twist both have
  16s period and the band is 180-degree symmetric, so frame at t = 16s equals frame
  at t = 0s. Not rendered frame-by-frame in the gate; the render tool draws frame one.
- Acceptance: band reads as many separate parallel lines; twist reads as a fabric
  turn; gradient saturated and clean; no knot, no single thick path.

## Deviations from the prompt
- None, other than the spec's own p5.js-to-2D substitution (Canvas 2D throughout).
