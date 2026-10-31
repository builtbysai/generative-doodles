# No.546 Nine Small Dooms

EXPANSION #66 cristina-daura, prompt CD2. The Pictoplasma-poster mechanism:
one giant lexicon animal ringed by vignette medallions, each a self-contained
micro-scene.

## Concept

A giant black cat head with yellow slit eyes and a red nose floats over a
green triangle and a band of green brickwork on a stippled orange-red ground.
Ringed around it in a loose arc, seven circle vignettes of uniform diameter,
each holding one small doom from her lexicon: a parrot on a soda can beside a
ghost, a palm tree, a smoking man on blue tile, a duck with flame eyes, a
smiley-faced doner kebab carved by a cook, an open door pouring smoke, a
closed blue door with a tiny table. Watch-only, no interaction, no hint text,
no text anywhere in the piece.

Palette, nothing else on the fills: cat black #111111, cat-eye yellow
#FFD400, nose red #E63B2B, ground orange-red #E0532F with black stipple,
triangle green #1E9E6A, brick green #2AA37A, vignette grounds yellow #FFD400,
blue #00AEEF, teal #2AA5C4. Heavy black outlines everywhere. Flat fills only,
no gradients.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Design space 1080x1080, contain-fitted and centred; the orange-red ground
  fills the whole canvas first, so page ground and stage ground are one
  surface and the letterbox is invisible at any aspect.
- One shared 30s clock drives everything with integer cycle ratios, so the
  loop is seamless. Each vignette centre drifts on a small parametric ellipse
  (amplitudes 12 x 9 design px, 1 or 2 full orbits per loop, fixed phases);
  the scene is drawn in local space under a circular clip, so the whole
  medallion, contents included, drifts as one object and no vignette ever
  changes content mid-loop.
- The cat is layered flat shapes: ear triangles, head disc, yellow almond
  eyes with black slit pupils, red triangle nose. The blink is a vertical
  squash of the eye group on a smooth sine bump placed once per loop
  (seconds 26 to 28.2 of the cycle); frame one sits at PHASE0 = 3.0 with the
  eyes fully open.
- Stipple is a precomputed seeded dot field (mulberry32, seed 546066; 300
  dots, radius 1.6 to 3.8) drawn directly each frame; no offscreen canvas.
- The brick band is clipped to the stage rectangle so the stagger pattern
  cannot paint a stray line into the letterbox (caught in QA, fixed).

Micro-motions, one per vignette:

1. Parrot and ghost: the parrot bobs on its can (2 sine cycles per loop);
   the ghost drifts on a small Lissajous path beside it.
2. Palm tree: the frond group sways (rotation sine, 1 cycle per loop) around
   the crown point; trunk and coconuts stay fixed.
3. Smoking man: three cigarette-smoke curls rise on a 5s sub-cycle, growing
   and fading as they climb, wraparound; the figure is a still silhouette.
4. Duck: the red flame eyes flicker by flat shape swap, two flame scales
   alternating on a fixed step clock (floor(t x 2.2) parity).
5. Kebab: stripe marks drift downward across the meat stack (reads as the
   spit turning) and the cook's arm and knife slice on a 5-cycles-per-loop
   sine; the smiley stays fixed on the meat.
6. Open door: five smoke puffs rise out of the dark opening on a 6s
   sub-cycle, swelling and thinning as they climb, wraparound.
7. Closed door: still door; the tiny table lamp pulses (radius sine, 2
   cycles per loop).

- Sizing follows the house rules: Visual Viewport API with resize listeners
  on visualViewport and window; canvas.style.width/height pinned in px
  inside draw(); phone detection via window.screen physical size (min
  dimension < 700px) with aspect h > w*1.15 as fallback only. On phones the
  stage spans the full width and centres vertically on the same ground.
- Determinism: frame one is drawn synchronously at the constant phase
  PHASE0 = 3.0s. The rAF loop is typeof-guarded and anchored as
  PHASE0 + elapsed since load; frame one is never derived from Date.now().

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical, re-verified after the band-clip fix. The second render was
  deleted.
- Desktop read-back: giant black cat head with yellow slit eyes and red nose
  over the green triangle shoulders and brick band; seven uniform vignette
  circles in a loose arc overlapping the band, all seven scenes identifiable
  (parrot and ghost, palm, smoker on tile, flame-eyed duck, smiley kebab
  with cook, smoking open door, closed door with table lamp); stippled
  orange-red ground throughout.
- Mobile read-back: stage spans the full 390px width centred on the same
  ground; cat, band, and all seven vignettes whole and legible, nothing
  clipped.
- Thumb read-back matches the desktop composition.
- One fix during QA: the brick stagger loop painted one vertical line past
  the stage's right edge into the letterbox on landscape renders; the band
  is now clipped to the stage and the stray line is gone.

## Deviations

- White #FFFFFF is used for exactly three things the visual description
  names but the palette list does not carry: the smoke pouring from the open
  door, the cigarette smoke in the smoker vignette, and the small ghost
  beside the parrot (drawn in the same flat white as the smoke family). No
  other colour was added; every other fill is one of the nine specced
  palette colours.
- The cat occupies slightly more than the top third of the stage (head disc
  radius 252 of 1080, chin reaching mid-stage) because the seven uniform
  vignettes at readable size (diameter 236) plus the band fill the bottom
  two-thirds and the cat must overlap the triangle to float over it, as
  specced. The triangle reads as green shoulders either side of the head.
