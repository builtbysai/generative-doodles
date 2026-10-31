# No.545 — Host

EXPANSION #66 cristina-daura, prompt CD1 ("The Host Face"). Title from the
prompt's suggestion line: "Host".

## Concept

Daura's mechanism, verbatim from the prompt: the face is a stage, never just a
face. A giant frontal woman's face in yellow skin and a black bob fills the
square, cropped at the edges over a pink ground. Her eye slots are not eyes:
a red rabbit sits in the left slot, a red horse in the right, both at
human-eye scale, staring straight out. Blue tears drip from under both
occupants down the cheeks, seven small blue ghosts drift across the skin like
freckles, and a tiny black Satan head with horns sits centred on the red lips.
The only real facial features allowed are a single nose line and the lips.

Drag interaction, per the prompt: the two occupants track the drag point with
slow lagged movement inside their slots (pupils shift, heads translate a few
pixels and tilt; they never leave the slots). On release the gaze target
decays home and the occupants settle back to front-facing over about 3
seconds. Tears fall continuously and splash flat at the chin; ghosts rise on
one shared clock at integer-ratio speeds (2, 3, 4) so the loop is seamless.

Palette, strict, nothing else: skin #FFD400, ink #111111, occupant red
#D93A2B, tear blue #2AA5C4, ghost blue #3FB3D9, lips #E23B2B, ground #F0438F.
Flat fills only, no gradients, no blush, no soft shading. The smiley face is
deliberately absent: the prompt reserves it for CD5.

## Construction

Single self-contained index.html, 2D canvas, 1080-unit design space.

- Face stack: one big black ellipse for the hair mass (cropped by the top
  edge), the yellow face ellipse over it, two black strand ellipses straddling
  the face's side edges (the bob), yellow ears with ink outlines over the
  hair at the sides, and a bangs cap clipped to the face path with a fringe
  curve dipping at centre. Eyes sit at 38% of stage height as specced.
- Occupants are parametric head functions anchored to the eye slots. Rabbit:
  round head, two long ears with pink inners, dot pupils, small nose/mouth
  strokes. Horse: frontal long head tapering to a pink muzzle band with two
  nostril dots, triangular ears, a small filled forelock blob. Gaze enters
  both as (gx, gy): pupils shift up to 10 units, heads up to 6, tilt up to
  0.05 rad.
- Tears: two columns of 3 droplets each on a 2.6 s period, falling from under
  the slots (y 472) to the chin (y 950); past 93% of the cycle a droplet is
  replaced by a flat splash ellipse at the chin. Tears and ghosts are drawn
  clipped to the face path so they stay on the skin.
- Ghosts: 7 seeded drifters (mulberry32, seed 545066), rising 700 units per
  cycle across the face's middle band with a small shared-phase sway.
- Satan: black head disc, two horn paths, two skin-yellow dot eyes, centred
  on the lips.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on visualViewport and window, canvas style pinned in px inside draw(),
  phone detection via window.screen physical size (min dimension < 700) with
  the aspect fallback only if screen is unavailable; page ground is the
  palette pink.
- Determinism: frame one is the synchronous draw at the constant phase
  PHASE0 = 7.3 (tears mid-fall, ghosts spread, gaze front). The rAF loop,
  typeof-guarded, anchors time as PHASE0 + elapsed since the first frame;
  it never reads Date.now(). No audio, no microphone, no external assets.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice and
  byte-compared with cmp: identical. Second render deleted.
- Desktop/thumb read-back: giant yellow face with black bob over pink, red
  rabbit (left) and red horse (right) occupying the eye slots, blue tear
  droplets on both cheeks, seven blue ghost freckles, tiny horned Satan head
  centred on the red lips, thin black frame, subtle "drag" hint bottom-right.
- Mobile read-back: composition keeps its shape, occupants, tears, ghosts and
  Satan all legible, stage centred on the pink ground, nothing clipped.
- Fix pass 1: the bob side strands first sat wholly on the cheeks and read as
  two black stickers; moved outward to straddle the face edges, and the face
  ears redrawn after them so they stay visible.
- Fix pass 2: the horse's zigzag forelock stroke read as a crown and pushed
  the head toward "demon"; replaced with one small filled forelock blob, eyes
  raised, muzzle widened. Horse now reads as a horse.
- Grep audit: zero gradient calls, zero Date.now, no external URLs.

## Deviations

- None from the prompt's visual spec. Two construction notes: (1) tears and
  ghosts are clipped to the face ellipse, an implementation of the prompt's
  "drip down the cheeks" / "drift across the face" rather than a change to
  it; (2) ghost and droplet fields are precomputed seeded data drawn directly
  each frame, because the QA renderer has no offscreen canvas.
