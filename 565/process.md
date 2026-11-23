# №1711 "One More Day" (PP958) — process notes

Completes EXPANSION #224 aaron-penne. Built 2026-11-11 from
BATCH-1709-1711-SPEC.md, following the live №1708 template for house rules,
plates, and probe hooks. Gallery date 2006 · 09 · 18. Note: "Dots burst,
drift, and fade along diagonal streaks, then burst again. Watch only."

## Build

- Canvas 2D only. The prompt is written for p5.js; node-canvas has no WebGL
  and the piece needs no 3D, so the whole burst is plain Canvas 2D. This is
  the p5-to-2D substitution the spec anticipates, not a deviation from the
  motion or the look.
- Seeded particle system, mulberry32(1711), 1,800 dots. Each dot gets a
  direction biased along one of the two diagonals (+45 / -45 degrees, spread
  about 12 degrees, both travel directions, plus an 8 percent isotropic
  minority for fullness), a max radius as a fraction of the stage
  half-diagonal, a burst time constant of 0.5 to 1.8 s, and a slow
  perpendicular settle drift. Distance follows a closed-form exponential
  approach, so motion is a pure function of loop time.
- Palette exactly four colors on white: signal red #D91E1E, cobalt blue
  #1E40AF, black #17120F, white #FFFFFF. Weights red 30, blue 30, black 22,
  white 18. White dots are drawn last so they punch through overlaps, and
  each carries a thin black rim at 0.30 of its own alpha so it stays legible
  on the white field; the rim uses only palette colors.
- Streak structure: 16 faint diagonal lanes (blue/black, alpha 0.04 to 0.09)
  crossing the whole field, plus 6 anchor strokes radiating from the burst
  origin (red/blue/black, alpha 0.12 to 0.18). A small black core with a red
  ring marks the origin.
- Loop: 12 s period. Envelope rises 0 to 1 over the first 0.3 s, holds, then
  fades to 0 between 8.2 and 11.7 s, so the wrap at t = 12 is a full fade and
  the re-explosion has no pop. Watch-only; no click handler of any kind.
- Frame one: fixed pre-roll t = 4.2 s, mid-burst. Dots are spread across the
  field, the origin is legible, and the diagonal anchors are visible. Not
  the full-fade moment.
- House rules: Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen (min dimension under 700 px) with aspect
  fallback; field-like composition is full-bleed on phones, square on
  desktop; one synchronous frame at load; requestAnimationFrame guarded with
  a typeof check; deterministic first frame (seeded RNG only, no
  Date.now()/Math.random() touching frame one). Title/date/hint plates drawn
  on canvas: "One More Day", "2006 · 09 · 18", "Watch only."
- node-canvas quirks honored: fading alphas rounded to 4 decimals via the
  rgba() helper; dots drawn as filled rects (no batched arcs).

## Deviations from the prompt

- None in motion, palette, or composition. The only substitutions are the
  p5-to-2D build (above) and the thin black rim on white dots (palette-only,
  for legibility on white).

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected.

- Desktop: dots spread edge to edge along both diagonals, origin legible at
  center, faint lanes visible, plates crisp. Streak structure reads clearly;
  not confetti randomness.
- Mobile: full-bleed, same structure, plates fit.
- Thumb (720x720): burst reads at small size, origin and anchors visible.
- Loop wrap probed via window.__probe.drawAt: t = 11.9 renders a clean
  white field with only the plates (env = 0.0000); t = 0.0 is the same;
  t = 0.6 shows the burst mid-flight with dots clustered near the origin.
  Explode-drift-settle-fade-re-explode is one seamless loop with no pop at
  the wrap; dots fade out, never pop out.
- No post-gate edits were needed, so no re-gate was required.
