# No.402 Shrine

## Concept

After Nina Clausonet's body-as-landscape mechanism: the
white-haired muse in profile against a deep navy night,
her torso and shawl drawn as a purple mountain-night
scene held inside her own silhouette. A tiny nativity
manger sits in the landscape under an eight-point star
at her sternum; palms, a winding path and scattered
stars complete the miniature world. Her face is deep
red, serene, eyes closed, and she herself never moves.
Only the light inside her breathes: the star pulses,
the small stars twinkle, and sparkles drift up from the
path. WATCH-ONLY, a pure 40s motion loop.

## Construction

- One canvas, design space 1280x900, centred fit; the
  page ground takes the navy. Visual Viewport sizing
  with resize listeners on visualViewport and window;
  canvas pinned every frame via style width/height in
  px; phone detection via window.screen min dimension
  under 700px with aspect fallback.
- Palette closed at the specced hexes: ground navy
  #191D45, star white #FFFFFF, hair #F5F2EC, face
  #8C2F28, lips #E56B9B, and the shawl purples as five
  authored stepped flat bands from #6B3AA8 to #8F5AC9.
  All colour flat or at flat alpha steps: no gradients,
  no filters, no shadowBlur, no offscreen canvas.
- The body is one silhouette path (shoulders flaring
  into a wide shawl cloak filling the lower two
  thirds). That path is the clip region for the scene:
  inside it, the five purple bands run top to bottom
  (the house stepped-band treatment of her soft
  vertical ramp), a far ridge in navy at 0.28 alpha,
  and a near ridge in the darkest purple.
- Scene contents, all asserted at load: the manger is
  exactly 5 flat shapes (two posts, roof, crib, and
  the child as one pale bundle); palms exactly 3
  (curved trunk, five fronds each); the winding path
  is 1 curved band stroked in hair-white at 0.42 alpha;
  the shawl stars are exactly 40 dots with fixed
  twinkle phases and periods of 5s, 8s or 10s, each
  dividing the loop.
- The eight-point star (16 authored points) sits at
  the sternum. Its glow is three layered translucent
  flat discs whose alpha breathes on an 8s cycle,
  exactly 5 pulses per loop; the star scales gently
  with the same breath.
- Sparkles: 14 motes rising from the path on a 20s
  cycle (2 per loop), sine envelopes zero at both
  ends, fixed offsets from a seeded table.
- Paper grain per the batch grain rule: 700 static
  speckle dots from a fixed seeded table (alternating
  white and navy at 0.055 alpha), drawn last in the
  same order every frame. Asserted count: 700.
- Head in the upper third, in profile looking right:
  hair is one white mass floating left with scalloped
  lobes and three strand curves; face is a deep-red
  ellipse with a soft nose bump, one downward-bowing
  closed-eye line, a faint brow arc, and one small
  pink lip shape. The neck runs down into the shawl.
- Determinism: frame one is drawn synchronously at
  the constant phase T0 = 9.0s (scene complete, star
  rising through its breath, twinkles and sparkles
  developed). The animation clock advances from that
  anchor in fixed 1/60 ticks accumulated from rAF
  timestamps; rAF is typeof-guarded. Frame one never
  reads a wall clock, so the thumbnail reproduces
  byte-identically.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). Thumb rendered twice from the
  shipped script: byte-identical.
- Desktop: the muse reads instantly: white hair
  sweeping left, red profile with closed eye, the
  purple landscape inside the shawl with the glowing
  sternum star over the ridges, manger and pale child
  below, three palms, the pale path winding to the
  hem, sparkles rising around the manger.
- First pass fixes: the nose was first drawn as an
  angular triangle and read as a beak; replaced with
  a small soft ellipse bump and the lips reseated
  under it. The hair's top corner poked up in a blocky
  tab behind the head; the top curves were lowered so
  the mass tucks behind the head. The centred-fit
  letterbox showed black in the QA renderer; frame()
  now fills the full canvas navy before the design
  transform, so the ground is the piece's navy at
  every size.
- Thumb: figure, star glow, manger and palms all read
  at gallery size; letterbox is navy.
- Mobile: centred fit holds, the whole shrine sits
  inside the frame on continuous navy ground.
- No interaction handlers at all (watch-only). No
  text anywhere in the piece.
