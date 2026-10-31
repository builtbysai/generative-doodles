# No.501 "Every Surface Patterned" (EXPANSION #60 giulia-tassi, GT5)

## Concept

Giulia Tassi's Zanichelli "La poesia dei nostri giorni" interior at peak
pattern density, rebuilt as a seeded room generator. One interior: wall,
floor, sofa, rug, blanket, lamp, framed picture, a figure reclining on
the sofa with a laptop, and a cat on the rug. The governing rule of the
source is absolute: every closed region carries exactly one texture from
the set {dots, dashes, squiggles, stars, pinstripes, zigzag}, no plain
fills except white, and no two neighbouring regions share a texture.
Figure and cat use her face grammar (arc eyes, L-line nose on the
figure, short-curve smile, flat hair block). The framed picture holds a
tiny poem as plain lines, never real text. Watch-only: the room is
lived in, not played with.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. The
  scene is laid out in a 1600x1000 design space and scaled to fit the
  viewport (Visual Viewport API, resize listeners on visualViewport and
  window), so the landscape composition keeps its shape on phones; the
  page ground is the wall cream #F4EBD3. Canvas style width/height are
  pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700px) with the h > w*1.15 aspect
  fallback.
- Palette: a seeded shuffle (mulberry32, seed 501001) picks 4 of the 7
  prompt accents. This run: pink #F397BE, mustard #E9A63B, teal
  #87CECA, green #47AE65, on the cream wall. Flat fills only; no
  gradients anywhere.
- Texture assignment is a small constraint solve: the laptop screen is
  fixed to dots (it is a flickering dot field by definition) and the
  picture's inner field is fixed to dashes (the poem lines). Every
  other region is assigned greedily in seeded order, choosing a texture
  none of its already-assigned neighbours use, with a least-conflict
  fallback. Assignment for this seed, verified by evaluating the
  script's own logic: wall stars, floor pinstripes, frame squiggles,
  inner dashes, shade dots, sofa dashes, rug squiggles, blanket zigzag,
  clothes squiggles, laptop dots, cat stars. Every adjacent pair
  differs (same-texture pairs such as wall/cat stars are never
  neighbours).
- Textures are drawn clipped inside each region path (save/clip, no
  offscreen canvas); mark jitter is regenerated from a per-region seed
  on every frame so it never moves. Face and hands are flat skin
  #F8F5F0 per the face grammar (the grammar is the prompt's own
  exception to the texture rule, like white).
- Motion, all phase-driven from one t: the cat's tail swishes in a
  2-frame loop (pose flips at 2.2 Hz), the laptop screen redraws its
  dot pattern from a new seeded bucket at 2.5 Hz, the lamp glow is
  four concentric low-alpha mustard circles whose alpha pulses +/-4%
  on a slow sine (light, not a fill), and the dash textures drift
  slowly sideways. First frame is a synchronous draw at the constant
  phase PHASE0 = 2.35 (tail mid-swish pose, screen on a fixed bucket);
  the rAF loop, typeof-guarded, is anchored as PHASE0 + elapsed and
  never reads the wall clock for frame one.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and
  byte-compared with cmp: identical. Second render deleted.
- Region-by-region audit of the desktop render: wall (stars), floor
  (pinstripes), picture frame (squiggles) and its inner poem lines,
  lamp shade (dots), sofa (dashes), rug (squiggles), blanket (zigzag),
  figure clothes (squiggles), laptop screen (dots), cat (stars). No
  region is plain; no adjacent pair shares a texture; the only flat
  fields are the white picture field behind its lines and the faces,
  per the grammar.
- Three geometry passes on the figure: the first torso read as a thin
  ribbon, so the torso and legs were rebuilt as chunky segment quads
  starting at mid-head height, and the blanket was narrowed so the
  legs and shoes stay visible. The rug base was also reassigned by
  rule (first accent unused by floor, sofa and cat) after the first
  pass left rug and floor the same mustard.
- Mobile render: composition keeps its landscape shape, centred on
  the cream ground, nothing clipped.

## Deviations

- The lamp glow is drawn as flat concentric low-alpha circles exactly
  as the prompt prescribes; no radial gradient is used anywhere.
- The cat's tail is a stroked appendage, not a closed region, so it
  carries the cat's flat base colour rather than the cat's star
  texture; the closed cat body/head/ears region is textured.
- Skin (faces, one hand) is flat per the face grammar; the prompt's
  texture rule is applied to every surface region, with faces treated
  the way the source treats them.
