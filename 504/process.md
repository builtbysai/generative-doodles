# №1597 History Is Continuous (NY6, study #210 newyellow, PP844)

Driver: a dense field of small seeded gestural contour figures in five saturated
colors drifts almost imperceptibly on a white ground, watch-only.

Build: one self-contained index.html. Each figure is a parametric contour glyph
(head arc, torso curve, two arm hints, two leg hints) drawn with hand-jittered
strokes only, never fills. Every figure gets its own mulberry32 seed, so lean,
limb pose, arc span, scale, color and jitter all differ; no two glyphs repeat.
The grid holds 2304 figures on a square desktop comp (48 x 48) and rescales on
tall screens to stay inside the 1500-2500 band (2409 on 390x844). Figure height
is capped at 3% of frame height. Drift is a global slow translation of about
0.5% of frame width with a ~2 minute period plus a sub-pixel per-figure phase
sway, zero at the fixed-phase first frame; figures drifting past an edge wrap
to the opposite edge. Watch-only: no pointer listeners of any kind. Title, date
and hint sit on soft white grounds so they read over the crowd. House rules
followed: Visual Viewport sizing with resize on visualViewport and window,
canvas pinned in draw(), phone detection via window.screen with aspect
fallback, field-like composition full-bleed on phones and square on desktop,
one synchronous frame at load, requestAnimationFrame guarded by a typeof check,
seeded RNG only (no Math.random anywhere).

Deviation from the prompt: none in mechanism. The prompt's "figures subtly
re-seed at edges" is implemented as edge wrap (figures re-enter on the opposite
edge); glyphs themselves are fixed per grid cell so frame one stays
deterministic. The gallery date is 2006 · 05 · 27 and the gallery interaction
cue is "Watch only. The crowd breathes."

QA: rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile and 720x720 thumb; visually inspected all
three. Round 1 was too sparse and grid-regular on desktop, so the grid went
from 44 to 48 columns, figure overlap from 1.18x to 1.30x cell height, jitter
from 0.7x to 1.0x cell, stroke alpha 0.82 to 0.85 and per-figure scale 0.85-1.15
was added. Round 2 passes: dense hand-jittered contour crowd in all five
palette colors on every size, no empty ground inside the comp, no repeated
identical glyphs, title/date/hint legible, drift near-still by construction.
Determinism check: two desktop renders produce byte-identical PNGs
(md5 c41d870b9328a2e3d8c1548932981c57). Thumb is the 720x720 render.
