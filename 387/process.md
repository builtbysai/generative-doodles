# No.387 Sun Moon Cloud

## Concept

After Maryna Lagereva's Spoonflower folklore register (EXPANSION #41,
prompt ML3): her "celestial-folklore-sun-moon-cloud" and
"minimalist-folklore-mountains-pine-trees" designs as a living field.
Folk-art suns with simple face lines (closed eyes, small smile),
crescent moons, scalloped-band clouds and stacked-triangle pines
scatter across a khaki green ground in three registers: large
suns/moons sparse, mid clouds/pines, micro stars/berries dense.
Non-directional, full-bleed, flat naive fills, no text, no UI.

Palette, closed: ground #9AA06B (khaki green); sun/moon/cloud/pine
cream #F3EBDD; night accent navy #22354F, used on moons and stars
only; rust accent #B4552D, used on sun centres and tiny berries only.
Nothing else.

## Construction

One canvas, 2D, design space 1280x900, cover-fit full-bleed
(Visual Viewport sizing, resize listeners on visualViewport and
window, canvas pinned via style width/height every frame, phone
detection via window.screen min dimension < 700px with the
h > w*1.15 aspect fallback). All motifs are flat path recipes drawn
directly each frame from fixed seeded data (LCG, seed 387) baked at
load: no sprites, no offscreen canvas, no gradients, no filters,
no shadowBlur.

Registers, counts fixed and asserted at load (total 179 motifs):

- Suns: exactly 3. Cream disc with 12 cream ray triangles, a rust
  centre disc, and the face stroked in cream on the centre (two
  closed-eye arcs, one smile arc, round caps).
- Moons: exactly 3 (large register total 6, inside the specced
  4-6). Two-arc crescents built as an outer circle cut by an offset
  inner circle, filled even-odd; two cream, one navy, each at a
  fixed tilt.
- Clouds: exactly 9. Five overlapping circles ride on a flat base
  band in the same cream fill, every bump bottom landing flush with
  the band's underside, so each cloud reads as one scalloped strip.
- Pines: exactly 14. Three stacked cream triangles per pine along
  the lower field.
- Stars: exactly 90 navy four-point sparkles.
- Berries: exactly 60 tiny rust dots.

Motion, 48s ambient loop, seamless because every period divides
48 exactly:

- Clouds drift horizontally across an extended wrap span at four
  parallax periods (48, 24, 16 or 12s per crossing, larger clouds
  on slower periods), each completing whole crossings per loop.
- Suns pendulum +-3 degrees on a 24s swing (2 whole swings per
  loop), each with its own phase; the whole sun, rays and face,
  rotates about its centre.
- Stars twinkle at opacity 0.5-1 on periods drawn from
  {4, 6, 8, 12, 16, 24}s, all whole divisors of 48.
- Moons, pines and berries are still unless stirred.

Interaction: DRAG stirs the sky. Pointer coordinates are converted
to design coordinates through the stored fit transform (S, OX, OY).
While the pointer is down, every motif within 190 design px takes a
tangential swirl force plus a slight outward push, falling off to
the rim, integrated in fixed 1/60 ticks alongside a stiff spring
toward its anchor. On release the force stops, the springs settle,
and any offset and velocity below a hair snap to exactly zero, so
the settled field is the authored field bit for bit. Never
click-to-reload.

Determinism: frame one is drawn synchronously at the constant
phase T = 17.3s into the loop (clouds mid-crossing, suns
mid-swing, stars spread through their twinkles by phase); the rAF
loop, typeof-guarded, advances T from that same anchor in fixed
ticks. Frame one never reads a wall clock.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical
  (md5 8d0bd04a970994c77a7db9c44d502a1c).
- Desktop inspection: three registers read clearly; sun faces
  legible (cream closed eyes and smile on the rust centre); two
  cream crescents and one navy crescent; pine band along the
  bottom; stars and berries dense but quiet. Palette audit: only
  the four specced hexes appear.
- Fix during QA 1: the cloud recipe's lower bumps hung below the
  base band and left a semicircular ground-coloured notch between
  lobes. Bumps were raised and the band deepened so every bump
  bottom lands flush with the band's underside; clouds now read
  as scalloped bands as specced.
- Fix during QA 2: the second cream crescent's authored position
  straddled a drifting cloud's underside at the first-frame phase,
  so its even-odd cutout read as a bite taken out of the cloud.
  The crescent was repositioned to (500, 348), clear of every cloud
  at frame one; re-rendered and re-inspected clean.
- Mobile inspection: cover-fit crop stays full-bleed on the khaki
  ground, showing a crescent, a full sun, cloud bands and a pine;
  no letterboxing, no doubled canvas.
- No deviations from the spec or its adaptation flags.
