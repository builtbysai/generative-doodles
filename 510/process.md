# No.510 "Evasion" — process

EXPANSION #61 alice-piaggio, prompt AP6 (Il Foglio Review "Evasione" cover, 2023).

## Concept

A crouching blonde woman glimpsed through a foreground mask of vertical
orange-red bars on a flat blue ground, after Alice Piaggio's "Evasione"
cover. She holds a tiny key in her mouth: the smallest and brightest
element in the piece. The bars are the default state; the figure is
never fully unobstructed at rest. Dragging slides the bars aside like a
curtain parting; past a 40% reveal her eyes open and the key drops
with a bounce. Double-tap reseeds the prop, the bar count and the pose.

## Construction

- Single self-contained `index.html`, 2D canvas, no external assets.
- Palette exactly as specced, flat fills only, no gradients: blue
  ground #1E5FC0, bars #E8541A, figure white #F2F0EA, hair #F2C41C,
  line ink #1A3A6B.
- Square stage letterboxed and centred on any screen; page ground is
  the same blue, so phones keep the composition's shape.
- Seeded layout via mulberry32, base seed 510001: the roll gives
  9 bars, the key prop, and the crouch pose, so the shipped first
  frame matches the prompt's named configuration. The bar layer is
  phase-shifted so a gap, not a bar, centres on the face.
- Figure built from circle/ellipse unions in white with ink line
  work: hunched torso, raised knees, one bare foot and one foot in a
  white sock with blue stripes clipped into the foot ellipse. Face
  grammar: closed curve eyes at rest, arc eyes with pupils when
  revealed, L-nose, small mouth holding the prop. Hair is a flat
  yellow cap with a side strand.
- Bars are a foreground rect array (bar width 4% of stage, full
  height). Drag maps horizontal travel to a symmetric parting offset
  (left half slides left, right half right, max 30% of stage);
  release runs an underdamped spring (k=90, c=13) back to closed.
  Reveal fraction is part / (0.16 * stage); crossing 0.4 opens the
  eyes and starts the prop's fall (gravity, one damped bounce,
  rests on the floor line). Closing the bars resets the prop to the
  mouth and the eyes to closed.
- Double-tap reseeds from an LCG step of the seed: new prop
  (key / coin / match), new bar count (9-13), new pose
  (crouch / sit / stand pose geometry sets).
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside
  draw() every frame. Phone detection via window.screen physical
  size (min dimension < 700px) with the aspect fallback.
- Determinism: the first frame is drawn synchronously at load in the
  rest state (part = 0, eyes closed, prop in mouth). No clock reads
  feed frame one; the rAF loop is typeof-guarded and only advances
  the drag/spring/prop physics from interaction state.
- One lowercase hint word, "drag", bottom-left of the stage,
  low alpha.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png).
- Determinism: thumb.png rendered twice and compared with `cmp`:
  byte-identical; the duplicate render was deleted.
- Read-back: orange-red bars over the blue ground; the white
  crouched figure glimpsed between them, blonde hair cap and side
  strand clear; her face sits in the central gap with the yellow key
  at her mouth; one blue-striped sock visible at the far foot;
  nothing clipped on the mobile render, square stage centred.
  First pass had the key's bow slipping behind the neighbouring
  bar; the glyph was compacted so the whole key stays inside the
  central gap, then all sizes were re-rendered and the
  determinism check re-passed.

## Deviations

- None against the prompt. The parting is symmetric from the centre
  (both halves slide apart) rather than a one-direction layer slide:
  the prompt's own composition rule puts the face in the middle
  third, and a symmetric part is what actually reveals her; the
  spring-back, threshold behaviour and rest state are as specced.
