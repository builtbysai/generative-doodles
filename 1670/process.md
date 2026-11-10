# №1670 "Deviations from Design" (JV7, EXPANSION #219 jos-vromans)

Formula date: 2006 · 08 · 08. Gallery note: "Five deviations strain a perfect guilloche lattice. Drag to bend the design."

## Build

Template: live №1667 (`/tmp/t1667.html`), same house-rules skeleton: Visual
Viewport sizing with resize on visualViewport and window, canvas pinned in
draw() via style width/height, phone detection via window.screen (min
dimension < 700px) with aspect fallback, one synchronous frame at load
(t = FIRST_T = 6.0), requestAnimationFrame guarded by typeof, seeded RNG
(mulberry32(1670)) only, no Date.now()/Math.random() in frame one.

Composition: 5x5 lattice of guilloche line-burst ornaments on an off-white
ground (#f4f1ea). Each ornament has a wavy inner guilloche ring, radiating
line bursts (24 to 64 rays by stroke density), and an outer hairline ring
holding it to its cell. Square on desktop (94% of the min dimension,
centered); on phones the square is full-bleed width and centered
vertically, per the centered-geometric house rule.

Five deviation values, each drifting on its own slow LFO when untouched
(periods roughly 48 to 126 s):

- SYM symmetry breaking: per-ray angle offsets and per-ornament rotation.
- CUR band curvature: rays bend with the square of radius, alternating
  direction per ray.
- DEN stroke density: ray count from 24 to 64.
- TMP color temperature: ink shifts from black toward warm magenta or
  cool green as it moves away from neutral 0.50.
- JIT ornament jitter: perpendicular vertex wobble per ray, seeded.

Total deviation also drives data-noise bands: wobbly concentric rings in
pink, magenta, and green, drawn behind the plates, alpha and count rising
with deviation. The lattice can strain but never collapses: every value
is clamped to [0,1] and ornaments always return to their grid.

Interaction (the earned-interaction piece): pointer drag anywhere remaps
touch position to the two dominant knobs, x to symmetry and y to
curvature, with a fast lerp toward the dragged target; the other three
keep their LFOs. On release the two knobs drift back to their LFO values
at a slow rate. No click-to-reload, no reseed button. The five live
values are shown in tiny monospace at the bottom edge (bottom-right on
desktop, stacked above the hint plate on phones), alongside the
"Drag to bend the design." hint.

## Deviations from the prompt

None material. Two judgment calls: the spec says drag "remaps the touch
position to the nearest deviation knobs"; the implementation maps x to
symmetry and y to curvature, the two dominant knobs named in the spec's
Technical paragraph, and leaves the other three on LFOs. The readout
plate sits bottom-right on desktop and above the hint on phones so the
two bottom plates never collide on narrow screens.

## QA

Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
desktop, 390x844 mobile, and 720x720 (thumb.png IS the 720x720 render).
All three PNGs read and visually inspected:

- Desktop: clean 5x5 guilloche lattice, faint pink/green deviation rings
  visible behind the ornaments, title/date plate top-left, hint plate
  bottom-left, readout "SYM 0.12 CUR 0.09 DEN 0.26 TMP 0.64 JIT 0.04"
  bottom-right. Frame-one values are the fixed LFO phase at t = 6.0.
- Mobile: square lattice centered in the portrait frame, plates stacked
  cleanly at the bottom with no overlap, no clipping.
- Thumb: same lattice composition, legible at 720x720.

Determinism: two independent 1280x900 renders are byte-identical
(md5 e0d2817b75f46c03044fe30d79478bb2 for both). No post-gate edits.

md5: index.html daa5a3c543d5d2d35e71893164086183; thumb.png 80d91e9e7dc71c1fb72e744dc6d228fd.
