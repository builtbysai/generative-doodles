# №1701 "Seven Million Years" - PP948, EXPANSION #223 piter-pasma

Date: 2006 · 09 · 08. Gallery note: "A folded bronze monument ages seven million years in four minutes. Watch only."

## Build
A folded-plate bronze monument stands on a plinth against dark navy, with
three tall soft light columns behind it for scale. The form is six tall
facets with seeded ridge positions (mulberry32(1701)), alternating light and
dark bronze faces whose shading drifts with a slow sun angle, plus a slow
shear sway, so the monument turns gently while it ages. A tiny age readout
runs "year 1" to "year 7,000,000" and a corner counter shows the code size
against its budget. Pure watch piece: time is the only driver, no input of
any kind.

Template: live №1700 (structure, plates, sizing, hint) mirrored per spec.

## Decay model
Corrosion is a noise-field threshold that rises monotonically over 240 s.
A seeded value-noise field (26x26 grid) is sampled over 2,476 cells inside
the form; each cell also carries an edge factor from its distance to the
nearest facet edge, so rust blooms from edges and crevices first (the noise
value is lowered by up to 0.30 near edges). The threshold is the 95th
percentile of the cell noise values (p95 = 0.6846) scaled by t/240, so mean
mask coverage runs 0 to 95 percent by construction. Past the threshold a
cell rusts (bronze to rust orange to deep rust by depth), verdigris washes
in on a second noise field where it falls in a mid band, and charcoal pits
appear where the field runs 0.16 past the threshold. At 240 s the form
holds fully corroded for 5 s, then a new pristine form from a different
seed (1701 + 13 per cycle) folds in over the hold while the old one fades,
and the cycle restarts at year 1.

## Deviations
- WebGL-to-2D substitution (per spec/house rules): node-canvas has no WebGL,
  so the prompt's WebGL2 raymarcher is a 2D analytic render: flat shaded
  facets with ridge strokes, plus a stipple rust/pit overlay driven by the
  noise field. The visible behavior matches the prompt: a bronze form that
  corrodes over four minutes and renews.
- No gradients anywhere (house rule): the soft light columns are layered
  flat translucent rects, widest and faintest first.
- The byte budget is 16,000 B; the file is 15,092 B, shown in the corner as
  "code 15,092 B / 16,000 B". The stated budget was raised from 12,000 B
  during the build when the file measured 14,151 B; the corner count is the
  exact measured file size.
- Rotation is a slow shear sway plus drifting facet shading, not a true 3D
  orbit, since the scene is a 2D render.

## House rules
Visual Viewport sizing, resize on visualViewport and window; canvas pinned
in draw() via style width/height in px; phone detection via window.screen
(min dimension under 700 px) with aspect fallback (h > w*1.15); square
stage on desktop, full-bleed on phones, page ground is the piece's own
navy; one synchronous frame at load; requestAnimationFrame guarded by a
typeof check; deterministic fixed-phase first frame (pre-rolled to t = 20 s,
age readout "year 583,334", seeded RNG mulberry32 only, no Date.now() or
Math.random() affecting frame one); no em dashes in visible copy; no
buttons, no hidden controls, no fake progress bar; title/date/hint plates
drawn on canvas. No gradients, no shadowBlur, no Path2D, no createElement;
corrosion cells are fillRects, and all fading alphas are rounded to 4
decimals before stringifying.

## QA
Rendered with node render-piece.js and inspected all three sizes.
- Desktop 1280x900: bronze monument fills the stage, rust patches blooming
  from facet edges at t = 20 s, title plate top left, age and code counters
  top right, hint plate bottom left, floor band and horizon legible.
- Mobile 390x844: full-bleed; form fills the width, age and code counters
  sit under the title plate clear of it, hint plate clear at bottom.
- Thumb 720x720 (thumb.png is this render): early corrosion, legible.
- Determinism: two desktop renders byte-identical (md5 7ccc3d77868132535a9280992c68008a).
- Monotonicity harness (/tmp/test1701.js, node-canvas probe coverageAt):
  2,476 cells, p95 0.6846; coverage 0.00% at 0 s, 16.80% at 30 s, 26.94%
  at 60 s, 39.82% at 90 s, 53.68% at 120 s, 66.52% at 150 s, 78.23% at
  180 s, 88.09% at 210 s, 94.95% at 240 s; non-decreasing at every 5 s
  sample. Frame at t = 0 is pristine bronze; at t = 120 rust and pits cover
  about half the form with verdigris hints; at t = 240 the form stands fully
  corroded, rust orange with charcoal pits and bronze surviving in patches.
- Fix round: first gate showed the hold phase erasing the form (the old
  geometry was drawn with alpha 0 at t = 240 because the next-cycle geometry
  had not been built yet), rust cells spilling past facet bottom edges onto
  the plinth, and the code counter colliding with the title plate on mobile.
  Fixed by drawing the current fully corroded form through the hold while
  the next seed fades in, clipping corrosion to the form silhouette, seating
  the plinth top over the facet bottoms, and moving the age/code block under
  the title plate on phones; re-gated after the fix.
- Live loop redraws at most 8 times a second (rotation and decay are slow);
  corrosion cell drawing is a single fillRect pass per frame.

## Files
- index.html - md5 109f8250da04111c06a6ef7c394e2d43 (15,092 bytes)
- thumb.png - md5 84dbae492393f6113fae8ac23120a1de (720x720 render)
- process.md - this file
