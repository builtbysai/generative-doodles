# No.418 Daydreamers

## Concept

After Kitty O'Rourke's "Daydreamers" jigsaw mechanism (Piece & Quiet):
four character portraits in a strict 2x2 grid with thin white gutters,
each a woman whose sunglasses reflect a tiny dream scene. Top-left the
Boho Beach Babe in a striped top with ice-cream-cone earrings, beach in
her lenses; top-right the Intrepid Safari Explorer in a leopard-print
hat, giraffe and acacia in hers; bottom-left the Serene Spa Goddess in
a towel turban, a meditating figure in hers; bottom-right the Snow
Season Queen in a blue beanie and zigzag winter sweater, ski slopes in
hers. Each portrait sits on its own flat saturated ground (coral, teal,
lavender, mustard) with a hand-lettered caption under it: BEACH,
SAFARI, SPA, SKI. Black outlines on every shape, per her grammar in
this set. Kitty O does not sign these pieces, so there is no signature;
the only text is the four captions plus the small word RELAX held in
the spa lens scene, all drawn as hand-lettered stroke paths, never
system fonts.

## Construction

One canvas, design space 1280x900, full-bleed cover-fit. Flat colour
only; no gradients, no shadowBlur, no offscreen canvas anywhere.

- Grid: cells 622x432, gutter 12, outer margin 12, white gutters. Each
  quadrant is clipped to its cell; a shared bust recipe (halo disc,
  torso with a clipped garment pattern, hair mass, head, face, crown)
  is parameterised per quadrant: striped top for beach, spotted sand
  shirt and leopard hat for safari, white robe with a lavender sash and
  towel turban for spa, red zigzag sweater and sky-blue beanie with a
  white brim and pompom for ski.
- Sunglasses are the visual centre of each face: two 100x72 rounded
  lenses joined by a bridge, with temple arms. Each lens scene is a
  clipped draw region on the one canvas (the prompt's offscreen
  mini-canvases are not used): clip to the lens rounded rect, paint
  the scene in lens-local coordinates, unclip, add a flat highlight
  slash, stroke the frame.
- The scene pool is a fixed authored cycle of eight, in order: beach,
  safari, spa, ski, city, desert, aurora, underwater. Each recipe is
  sky, ground, two or three props and a horizon at miniature scale.
  Frame one shows beach, safari, spa, ski in grid order.
- Tap a quadrant (press and release close together in design space):
  that portrait's lenses advance one step through the authored cycle,
  cross-fading behind a sparkle wipe of exactly 300ms (18 fixed ticks,
  three authored sparkles swelling over each lens). A tap landing
  during a wipe is ignored, so the motion is always the authored one.
  Nothing is ever reseeded at runtime; the piece never reloads.
- Ambient 30s loop: every visible lens scene animates on whole cycles
  of the loop, so the loop wraps seamlessly. Beach waves lap on 3
  cycles; the safari giraffe's head bobs on 2; the spa meditator
  breathes on 2 with steam curls on 3; ski snow falls on 4; one city
  window twinkles on 5; aurora bands sway on 2 and its stars twinkle
  on 6; the underwater fish swims on 2 and its bubbles rise on 3.
- Captions are a tiny hand-lettered stroke font: each letter is a list
  of polylines in a unit box, stroked twice (a thick black pass under
  a thinner white pass) for an outlined hand-drawn read.
- Determinism: frame one is drawn synchronously at the constant phase
  T = 7.5s (scenes mid-motion, waves lapping, snow falling); the
  clock is anchored there and advances in fixed 1/60 ticks from the
  rAF timestamp, typeof-guarded. Frame one never comes from a wall
  clock, so the thumbnail reproduces byte-identically.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned via style width/height in
  px every frame; phone detection via window.screen (min dimension
  under 700px, aspect fallback); pointer coordinates converted
  through the stored fit transform (S, OX, OY). Fixed data only, no
  Math.random, no em dashes, no absolute URLs.
- QA probes (house seed pattern, not shipped behaviour): ?seed=scenes2
  starts the lenses on the back half of the cycle (city, desert,
  aurora, underwater) and ?seed=wipe freezes quadrant 0 mid-wipe, so
  all eight scenes and the cross-fade can be render-checked.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice from
  the shipped script: byte-identical.
- Desktop: all four portraits read at a glance; captions BEACH,
  SAFARI, SPA and SKI are legible hand lettering; the four frame-one
  lens scenes (beach palm and waves, safari giraffe and acacia, spa
  meditator with RELAX, ski pines and falling snow) all read at lens
  scale; black outlines hold on every shape.
- Probes: ?seed=scenes2 shows city (lit windows, moon), desert
  (cactus, dunes), aurora (swaying bands over snowy pines) and
  underwater (coral fish, bubbles, seaweed), all clean. ?seed=wipe
  shows quadrant 0 mid-cross-fade from beach to safari with the
  sparkle wipe over both lenses.
- Fix during QA: the ice-cream-cone earrings were first drawn before
  the sunglasses, so the lens frames covered the coral scoops and
  only the cone tips showed. The earrings now draw after the glasses
  and hang lower at the cheeks; both scoops and cones read clearly.
- Mobile: cover-fit centre-crops the grid on a portrait phone, as
  specced for this full-bleed piece; the four grounds and the gutter
  cross fill the frame and the outer quadrants crop symmetrically.
- Palette verified closed against the spec: the four grounds, four
  skins, four hair colours, sky, sand, palm, snow and ink only.
