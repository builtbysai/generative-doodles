# No.457 Sitter's Ghost

EXPANSION #55 paul-blow, prompt PB1.

## Concept

One visual one-liner, held in a single flat scene. A dark-brown desk stands on a
beige field with a bright red lamp on its left and the black back of a chair
centered behind it. Nobody is sitting there. But the desk's only two legs are not
at its corners: they are planted together in the middle, thighs slanting out to
knees, shins dropping to flat feet that point outward, so for a moment they read
as the legs of an invisible person sitting at the desk, in front of an empty
chair. The joke stays one joke: no person, no extra props, nothing else in the
room.

## Construction

- Single self-contained index.html, canvas 2D, layered flat vector shapes in
  exactly the prompt palette: ground #E8DCC3, desk #4A3226, lamp #D9261C,
  silhouette #1A1512.
- Order of drawing: beige ground, lamp glow, chair back, legs, desk apron and
  top slab (drawn over the tops of the legs so the legs emerge from under the
  desk like any desk legs), then the lamp.
- Legs are each built from three parts drawn in desk brown: a thick stroked
  thigh from hip to knee, a thinner stroked shin from knee to ankle, and a
  rounded flat foot that reads as both a cabriole foot and a shoe. Each leg
  carries spring state (offset and velocity, stiff spring with damping);
  offsets grow from hip to foot so a disturbed leg bends the way a fidgeting
  leg does.
- Lamp glow is one small radial gradient around the shade, in the lamp red at
  low alpha, fading to nothing. It is the only gradient and the only glow in
  the piece, and it breathes slowly (radius and intensity on a sine).
- Interaction follows the prompt: watch-only at rest. A pointer drag through
  the leg area pushes the legs sideways with spring physics proportional to
  drag speed and proximity; they sway and settle on release. No tap, no reseed,
  never click-to-reload, no hint text and no UI of any kind.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw() every
  frame. Phone detection via window.screen (min dimension under 700px) with
  the h > w*1.15 aspect fallback; the composition is centered, keeps its shape
  on phones, and the page ground is the piece's own beige.
- Determinism: the first frame is drawn synchronously at a constant loop phase
  (t = 6s pre-roll baked in, glow mid-breath, springs at rest). The animation
  loop, when running, is anchored as that fixed offset plus elapsed time since
  load, and requestAnimationFrame is typeof-guarded so the node QA renderer
  draws the same frame. All load-time layout uses a seeded mulberry32 RNG;
  Math.random appears only inside gesture handlers.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical. Second render deleted after the check.
- Desktop and thumb: desk spans the frame center with wide negative space on
  all sides; red lamp and its soft halo at the left of the desk; black
  chair-back with its slot centered behind the desk; the two central legs read
  immediately as a seated figure's legs, knees apart, feet flat and pointing
  outward. No clipping, no blank areas beyond the intended empty field.
- Mobile: composition keeps its shape, centered, desk near full width, legs,
  feet, lamp and chair all legible. Ground colour matches the page ground.
- Deviations from the prompt letter: two small ones, both in service of the
  dual reading. (1) The chair back has a horizontal slot cut out in the ground
  colour, a common chair-back form; without it the black silhouette risked
  reading as a seated torso, which would break the "no visible person" rule.
  (2) The lamp glow gradient uses the lamp's own red at low alpha rather than
  a fifth colour, so the palette is untouched in hue. No other deviations:
  no person, no horror tone, no extra props, no text.
