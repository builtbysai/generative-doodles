# No.533 "Arcadia" (EXPANSION #64 naida-mazzenga, prompt NM5)

## Concept

Her "Arcàdia" riso print as a generative piece. A single small swimmer
stands on a rocky shoreline at the left third, one arm raised in a wave,
facing a calm flat sea. Behind her rises one bold abstract tree: a thick
trunk with a flat circular canopy that breaks the horizon line. The sky
takes the top 45% of the frame and stays empty. Contemplative and still;
the figure's smallness is the mood. Three spot inks only, riso logic
throughout. Watch-only, no interaction, no hint text.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Design space 1080x1080, square stage centred via the Visual Viewport
  API (resize listeners on visualViewport and window); canvas pinned in
  px inside draw() every frame. Phone detection via window.screen
  (min dimension < 700px) with the aspect fallback; the composition is
  the same centred square on every device and the page ground is the
  paper cream.
- Palette, three inks and nothing else: water/tree blue #2B5FA6,
  terracotta #C96F4A (rocks and swimmer), paper cream #F7F1E3. Flat
  fills only, no gradients anywhere.
- Riso layering: each ink is drawn as its own layer with a slight
  misregistration offset (each component within +/-2px at the 1080
  scale) that drifts very slowly on its own sine. Blue layer: the sea
  band (y 486-800), the shimmer, the tree, the leaf, the blue grain.
  Terracotta layer: the three rock ellipses and the swimmer.
- Sea: flat blue band across the middle. Shimmer is two offset dashed
  sine bands stroked in cream at alpha 0.16 over the blue, phases
  moving at different speeds and wavelengths, so the water moves
  without any gradient.
- Tree: trunk is a 44px-wide blue rectangle running from the canopy
  down behind the rocks (it merges with the sea band where they cross,
  both being the same ink; the silhouette union is the riso read).
  Canopy is a circle of radius 172 centred at (222, 330), dipping just
  past the horizon line at 486, its edge notched by three seeded sine
  harmonics totalling about 3% radius variation.
- Swimmer: flat terracotta glyph 162px tall (15% of frame height)
  standing on the tallest rock at x=335: circle head, ellipse torso,
  tapered stroke legs, one arm resting down, the other raised. The
  raised forearm waves once every 8 seconds (two swings inside a 1.6s
  window with a sine envelope) and rests raised the rest of the cycle.
- Leaf: one blue leaf per 16-second loop. It sits attached at the
  canopy's lower-right edge until t=9s, falls with a sideways sway and
  rotation to the sea surface by t=13.5s, then is gone until the loop
  restarts.
- Grain: precomputed seeded speck arrays (mulberry32), one per ink,
  rejection-sampled so blue specks land only in the sea or the canopy
  disc and terracotta specks only inside the rock ellipses; drawn
  directly each frame at low alpha inside their layer's transform.
  (House adaptation: the QA renderer has no offscreen canvas, so the
  grain cannot be pre-rendered; seeded arrays give the same static
  riso texture.)
- Determinism: frame one is drawn synchronously at the constant phase
  PHASE0 = 3.0s: arm raised and at rest between waves, leaf attached
  at the canopy edge (not mid-fall), misregistration offsets at their
  fixed values for that phase. The rAF loop is typeof-guarded and
  anchored as PHASE0 + elapsed since the first frame; no Date.now()
  anywhere. Fixed seeds: canopy 533101, grain 533202.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js index.html`:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and `cmp` byte-compared:
  identical. Re-verified after the fix pass; duplicate render deleted.
- Palette audit (programmatic, on thumb.png): every pixel lies inside
  the RGB triangle spanned by the three ink colours (0 of 518,400
  pixels outside, max distance 0.0), so no fourth colour exists
  anywhere; all non-ink pixels are blends of the three inks
  (anti-aliasing, the alpha shimmer, the alpha grain). Nearest-ink
  shares: cream 57.9%, blue 34.8%, terracotta 7.3%.
- Visual read-back: desktop and thumb show the bold round canopy in
  the sky breaking the horizon, the small waving swimmer on the
  terracotta rock mound at the left third, the calm sea band with two
  shimmer lines, the attached leaf at the canopy edge, and a large
  empty cream sky. Mobile letterboxes the square on the cream ground,
  composition unchanged, nothing clipped.
- Fix during QA: the first pass drew the canopy too low and too
  wobbly (seeded harmonics up to ~8% radius), so it read as a blob
  merging into the sea. Raised the canopy to centre (222, 330) with
  radius 172 and cut the edge harmonics to about 3% total; the tree
  now reads as a circular canopy on a trunk, and determinism and the
  palette audit were re-run clean.
- Deviations from the prompt: none of substance. Two notes: the grain
  is a seeded speck array drawn per frame instead of a pre-rendered
  grain canvas (renderer limit, above), and the trunk merges with the
  sea band where they cross because trunk and water share the blue
  ink, which is the prompt's own riso layering.
