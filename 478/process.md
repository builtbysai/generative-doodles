# №1553 Hue Tornado

kiyoshinakauchi JK2, PP800, cron expansion study #205. Gallery date: 2006 · 04 · 13.

## Palette

Full hue cycle as flat bands: `hsl(hue, 85%, 55%)`, hue a strict function of
angle, radius, and time. Separators and ground near-black `#0d0d0d`. No
gradients, no blends, no soft edges: every color is `hue(angle, radius, time)`.

## Composition

Full-bleed, no margins, no center object. The spiral eye sits off-center at
about 0.62 of the width and 0.41 of the height (seeded fractions from
mulberry32(1553000), fixed at load), so bands enter from the edges. 26 rings
reach the farthest corner; 30 angular segments per ring on desktop, 24 on
phones. Each cell is one annular sector, filled flat and stroked with a thin
`#0d0d0d` separator, so the hue bands stay crisp at every radius.

## Motion

Watch-first pouring loop. The whole spiral rotates at one slow constant rate,
one revolution per 120 s (`BASE = TAU / 120`), and the hue phase advances with
it: `hue = angleDeg + radius * 0.55 + time * 4`, angles measured after
rotation, so color appears to pour outward as the spiral turns.

## Interaction

Dragging stirs the pour. While pressed, pointer angle around the eye is
tracked; the drag's angular velocity (smoothed, magnitude only) sets a spin
target clamped to 2.5 rad/s on top of the base rate, so a faster drag pours
faster. The spin eases toward its target with a 3/s exponential rate. On
release the target returns to zero and the spin eases back to the base rate.
Drag never reverses the rotation (magnitude only, base rate always applies),
never stops it, and never changes the hue function.

## Technical

Canvas 2D. Bands are annular-sector paths (`moveTo` then `arc`, outer then
inner reversed, per the batched-arc house rule); separators are the same paths
stroked. House rules followed from the №1551 template: Visual Viewport sizing
with resize on visualViewport and window, canvas element pinned in `draw()`
via `canvas.style.width/height` in px, phone detection via `window.screen`
(min dimension under 700 px) with aspect fallback, full-bleed field
composition on phones and desktop alike, one synchronous frame at load,
`requestAnimationFrame` guarded by a `typeof` check. Deterministic fixed-phase
first frame: no wall clock, no per-frame randomness; the only seeded values
are the eye fractions. No gradients, shadowBlur, Path2D, offscreen canvas,
createElement, localStorage, getUserMedia, or text drawing. No visible text
except the title.

## Probes

Probe harness `/tmp/probe-1553.js` drives the piece's own loop with a stubbed
rAF at fixed 60 fps steps and dispatches synthetic pointer events to its own
listeners (1280x900):

- Frame-one determinism: two fresh evals, t=0 PNG md5
  `55572d59a6c8a05dbe94e605f34697e5` both times. PASS, byte-identical.
- t=0 vs t=5 (no drag): md5 `55572d59...` vs `8ad9f960a003683badff18ea94bc0fa0`.
  PASS, differ. Rotation at t=5 is 0.2609 rad (expected 0.2618; the 0.0009 gap
  is the first frame's dt clamp, fixed-phase and reproducible).
- Baseline rotation: slope 0.0524 rad/s, exactly BASE. PASS.
- Drag: pointer moves at 6 rad/s around the eye for t=4 to t=6; rotation
  slope 2.0747 rad/s, 39.6x baseline; spin at release 2.4926 (clamped under
  the 2.5 cap), raw drag velocity 6.0 rad/s. PASS.
- Release: spin 1.8466 just after pointerup, 0.0003 by t=9; late slope
  t=8 to t=9 is 0.0543 rad/s against baseline 0.0524. PASS, eased back to
  the base rate. (The t=6 to t=9 average slope, 0.3224 rad/s, still carries
  the decaying spin tail; the late-window slope is the true settled rate.)
- Rotation monotonic throughout (r1 < r2 < r4 < r6 < r9). PASS.

## Renders

Rendered from the actual script with `node ~/workspace/tools/render-piece.js`:

- Desktop 1280x900: full-bleed rainbow spiral, off-center eye, flat bands,
  crisp black separators; the spiral wind is visible tracing any hue outward.
- Mobile 390x844: same spiral filling the tall frame, eye near the top third,
  separators 1 px, bands unbroken to every edge.
- Thumb 720x720: eye right of center, spectrum pouring outward to all edges.

## Fix rounds

None. First build passed render inspection and all probes. One probe-harness
bug (a `listeners` scoping error in the probe script itself, not the piece)
was fixed and the probe re-run; the piece file was untouched after its first
render.

## Gallery note

Full-bleed spiral of flat hue bands pouring outward from an off-center eye,
each band a strict function of angle, radius, and time, kept crisp by thin
black separators. Drag to stir the pour.
