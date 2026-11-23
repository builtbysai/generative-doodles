# №1710 "Berry-Light Drapes" — PP957, EXPANSION #224 aaron-penne

## Build
- Spec: BATCH-1709-1711-SPEC.md (№1710 section), built 2026-11-11. Template: live №1708
  (Interloper), fetched via fetch-blob.py, adapted to the house-rules scaffold.
- Palette, hand-picked from the prompt's named colors (no study file exists in the
  repo): raspberry #A92E4F, plum skin #5E3A55, sage #7F9271, warm grey #8C8178,
  cream #F4EEE3 (ground). Sage was deepened from the first pick #8A9B7A after the
  first QA pass, where it washed out against the cream ground.
- Composition: three large draped forms crossing the stage diagonally on a cream
  field, generous negative space at the corners. Raspberry runs top-left to
  bottom-right (30 lines), plum runs bottom-left to top-right (26 lines), sage
  crosses shallow near the top (22 lines, every 4th line warm grey).
- Technique: Canvas 2D (p5.js-to-2D substitution, per house rules; node-canvas has
  no WebGL). Each drape is a bundle of parallel polylines warped by a shared
  closed-form fbm flow field, plus one very low alpha envelope fill so the plane
  reads as cloth. Lines drawn at low alpha (0.17 max, folded across the bundle)
  so overlaps deepen into soft shadows through layering alone. No cloth-sim
  literalism: no pins, gravity, or springs, only the flow field and a slow
  whole-drape sway.
- Motion: watch-only. Warp phase travels slowly along each drape (lines sliding
  along their warp direction) and each drape sways as one. Composite order
  cycles through three permutations every 8 s of loop time, a fixed-phase
  function of phaseT, never Math.random(), so different overlaps win over the
  loop while frame one stays deterministic.
- Frame one: fixed pre-roll t = 6 s (PERIOD 24 s), order [raspberry, plum, sage].
  All randomness from mulberry32(1710); no Date.now() or Math.random() anywhere.
- House rules: Visual Viewport sizing, resize on visualViewport and window;
  canvas pinned in draw() via style width/height; phone detection via
  window.screen (min dimension < 700 px) with aspect fallback; square stage on
  desktop, full-bleed on phones; one synchronous frame at load; rAF guarded by
  typeof check; reduced-motion respected; no click-to-reload; no em dashes in
  visible copy; title/date/hint plates drawn on canvas.
- Gallery date: 2006 · 09 · 17 (formula 2002-01-10 + 1711 days). Gallery note:
  "Sheer berry-toned drapes drift like slow fabric in air. Watch only."

## Deviations from the prompt
- None structural. Two tuning deviations, both inside the spec's palette:
  sage deepened #8A9B7A to #7F9271, and line alpha raised 0.11 to 0.17 with the
  envelope fill 0.05 to 0.07 after the first QA pass (see below). The p5-to-2D
  substitution is documented here per house rules.

## QA
- Rendered from the actual script with node ~/workspace/tools/render-piece.js:
  1280x900 desktop, 390x844 mobile, 720x720 thumb (thumb.png IS the 720 render).
- Pass 1 (alpha 0.11 / fill 0.05): drapes legible and crossing correctly, overlaps
  deepening, but the whole piece read washed out and the sage drape nearly
  vanished against the cream ground. Fix: sage deepened, line alpha 0.17,
  envelope fill 0.07.
- Pass 2 (final files, re-gated after the edit): desktop shows three sheer
  diagonal drapes crossing with a visibly deeper mauve shadow at the central
  overlap, still sheer, generous negative space, plates legible. Mobile shows
  the same composition full-bleed with plates legible. Thumb matches the
  desktop composition. No overlaps, no clipping, no opaque shapes. Accepted.
