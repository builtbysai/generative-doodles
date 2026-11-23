# No.517 "Balloon Belly": process

EXPANSION #62 giulia-pastorino, prompt GP5 (after "Hai mangiato un
pallone?", 2020).

## Concept

A split stage: cream on the left, a full-bleed olive-green crayon
block on the right, hard edge at 50%. On the cream side a tiny mother
in a teal dress holds a giant pink balloon by its string. The balloon
is belly-shaped and roughly six times her height, so it reads as an
absurd pregnancy belly she is carrying around. On the green side a
giant orange profile face looms in from the right edge, always
partially cropped, watching her. Dragging the balloon stretches it
toward the pointer; on release it springs home and wobbles. The giant
face blinks slowly. A quick tap reseeds the balloon size and
position and the face crop.

## Construction

- Single self-contained `index.html`, 2D canvas, no external assets.
- Palette exactly as specced, flat fills only, no gradients: cream
  #F7F2E4, olive block #7A7A2E, balloon pink #F0608E, face orange
  #E8722A, dress teal #2AA6A0. Texture tones are flat neighbours of
  the specced colours (olive hatch tones, pink grain tones, one
  darker pink for the knot).
- Square stage letterboxed and centred on any screen; page ground is
  the cream, so phones keep the composition's shape.
- Seeded layout via mulberry32, base seed 517010: the roll gives
  balloon diameter 0.378 of stage, centre (0.309, 0.577) with its
  right edge at 0.498, just inside the split; face radius 0.385
  centred at (1.103, 0.375), off-stage so it is always cropped.
  Reseeds step the seed with an LCG and re-clamp the balloon to the
  cream side and above the ground line.
- Balloon: ellipse, a touch taller than wide (belly), with a small
  knot triangle at its lower left and 150 precomputed grain specks
  clipped inside it. The string is a quadratic curve from the knot
  to the mother's raised hand, recomputed every frame so it follows
  the balloon when dragged.
- Mother: height is exactly balloon diameter / 6. Trapezoid teal
  dress, olive legs and shoes, cream head with a thin olive outline,
  pink hair cap and bun, two-dot face with a bent-line smile
  (Pastorino's face grammar, nothing more).
- Giant face: orange disc plus a nose bump on its left contour,
  one cream dot eye and a cream smile arc, all placed relative to
  the face centre so any reseed crop keeps them on the visible
  crescent. Blink is a 4.4s cycle squashing the eye dot's height
  for 0.26s; the eye is open at t = 0.
- Crayon texture: the olive block carries 560 precomputed seeded
  hatch strokes in five flat olive tones at 0.55 alpha; the cream
  side carries 110 faint strokes. Both arrays are drawn directly
  every frame.
- Interaction: pointer down inside the balloon grabs it; moving
  past a small threshold drags it (offset clamped to 0.20 of
  stage). While dragging, the balloon stretches along the drag
  direction (up to +38% on axis, volume-ish squash across it) and
  rotates toward the pull. On release an underdamped spring
  (k = 85, c = 10.5) returns it home and the stretch deviation
  rings down on its own spring (k = 130, c = 7.5), giving the
  wobble. A pointer up within 400ms that was not a drag is a tap
  and reseeds. At rest the balloon bobs gently on a 1.15 rad/s
  sine, plus or minus 0.0055 of stage.
- Canvas sized from the Visual Viewport API with resize listeners
  on visualViewport and window; canvas CSS size pinned in px
  inside draw() every frame. Phone detection via window.screen
  physical size (min dimension < 700px) with the aspect fallback;
  on phones the hatch line weight is bumped slightly so the crayon
  texture stays legible.
- Determinism: frame one is drawn synchronously at load with
  simT = 0 (balloon at home, no stretch, face eyes open, bob at
  zero crossing). No clock reads feed frame one; the rAF loop is
  typeof-guarded and advances time from its own first timestamp.
- One lowercase hint word, "drag", bottom-left of the stage, low
  alpha. No other text.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png).
- Determinism: thumb.png rendered twice and compared with `cmp`:
  byte-identical; the duplicate render was deleted.
- Read-back: hard cream/olive split at 50% on all three renders,
  heavy crayon hatch visible across the olive block; the giant
  orange profile face enters from the right edge with nose bump,
  cream dot eye and smile, cropped by the stage edge on desktop,
  thumb and mobile alike; the huge pink balloon sits on the cream
  side with its right edge just inside the split, grain specks
  visible, knot at its lower left; the tiny teal mother stands at
  its lower left holding the string, pink hair cap and two-dot
  face readable at desktop and thumb sizes; nothing else clipped
  on the mobile render, square stage centred on the cream ground.
  No fix pass was needed.

## Deviations

- Crayon texture is precomputed seeded stroke and speck arrays
  drawn directly each frame instead of a pre-rendered texture
  canvas: the QA renderer has no offscreen canvas. Same static
  read, same flat colours.
- The balloon knot sits at the balloon's lower left (about 130
  degrees) rather than dead bottom: at the specced 1:6 scale a
  bottom knot would put the string start below the mother's head,
  and the lower-left knot is what lets the string reach her raised
  hand and sell the "holding it" read.
- Tap reseed fires on any quick tap that did not become a balloon
  drag (a small movement threshold separates the two gestures),
  which is how the prompt's tap-reseed and drag-to-disturb coexist
  on one pointer stream.
- Face features and the mother's face dots use cream and olive
  from the specced palette rather than an added ink colour, to
  keep the piece inside the five specced colours plus their flat
  texture tones.
