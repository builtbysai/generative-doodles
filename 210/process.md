# No.397 Mushroom Hat Parade — process

## Concept

After Anna Galitskaya's (@galitskaya.illustration)
anthropomorphic costume grammar: a seamless parade loop
of six flat kidlit animals marching left to right across
near-black, each wearing one oversized costume piece.
A kitten under a red mushroom cap with cream spots and
a teal ribbon, an elephant in a teal tutu with red
stars, a tabby in teal gardener overalls with a red
pocket, a cat in a teal frog hat, a lama in a red
poncho with teal stripes, and a leopard with red spots
carrying a red cello. Flat neon-on-black shapes, each
animal mid-stride. The dark is the stage: no scenery,
no text, no interaction. WATCH-ONLY.

Palette, closed: ground #141210, bodies cream #F7EFD9,
mushroom red #E6484D for caps and costume accents, teal
#3FBFBF for secondary costume pieces, tiny gold
#E8A93D eyes. Flat colour only; the ground hex is also
used flat for small ink details (noses, the cello neck,
tabby stripes). The prompt's yellow star tutu and blue
ribbon are carried in the palette's own terms: the
tutu is teal with red stars, the ribbon is teal.

## Construction

- One canvas, design space 1280x900, cover-fit (the
  spec's full-bleed field composition), page ground in
  the near-black so the stage is continuous at any
  aspect. Sizing comes from the Visual Viewport API
  with resize listeners on both visualViewport and
  window; the canvas element is pinned by style
  width/height every frame; phone detection uses the
  window.screen physical size with the tall-aspect
  fallback.
- The parade band is motif DATA, never a second
  canvas: a 1560px band holding six slots of 260, one
  animal centred in each slot, asserted at exactly 6.
  The band scrolls right at one whole band width per
  24s loop, and each animal is drawn at three wrapped
  offsets (px - BAND, px, px + BAND), so the wrap is
  seamless at both edges and silhouettes never overlap
  their neighbours. The 260 slots are wider than the
  1280 design width, so on desktop five animals share
  the stage while the sixth is mid-wrap; all six pass
  through every loop. The band rides a ground line at
  y 648, leaving generous dark margins above and
  below.
- Animals are flat blob, ellipse and thick round-cap
  stroke recipes in local space (origin at the ground
  contact point, facing the direction of march). Legs
  are a shared two-frame walk: near and far pairs swing
  in opposite phase, toggled every 0.75s (32 whole
  stride cycles per loop), far legs at 0.62 alpha for
  depth. The whole animal bobs 3.2px on the same
  0.75s cycle, phase-offset per animal. Costume pieces
  sway on a 3s cycle (8 whole cycles per loop) as a
  small rotation lag about their anchors: the mushroom
  cap about the head, the tutu about the waist, the
  frog hat about the head, the poncho about the neck
  base, the cello about its base, and the tabby's
  ringed tail in place of a costume sway.
- Costumes: the mushroom cap is a red dome raised so
  the kitten's face, gold eye and nose stay visible
  under the teal ribbon band and bow. The elephant's
  tutu is a scalloped teal blob with four red stars.
  The tabby's overalls are a teal bib with two straps
  and a red pocket; its forehead stripes and tail
  rings are the ground hex. The frog hat is a teal
  dome with two eye bumps carrying gold frog eyes,
  over a red collar. The poncho is a red draped blob
  with two teal stripes kept inside its silhouette.
  The leopard's 11 spots are baked from the fixed
  seed by polar coordinates scaled inside the body
  ellipse, so no spot ever strays off the silhouette;
  the cello is two red bouts and a waist with a
  ground-hex neck and scroll and a cream bridge, held
  close at the leopard's front with one paw to the
  neck.
- Loop: 24 seconds, watch-only and seamless. It holds
  exactly one whole band width of scroll, 32 whole
  stride and bob cycles of 0.75s, and 8 whole sway
  cycles of 3s. All periods are asserted at load.
- Determinism: the first frame is drawn synchronously
  at the constant phase T = 7.3s (parade mid-march,
  scroll well into the loop, animals mid-stride). The
  animation clock advances from that anchor in fixed
  1/60 ticks accumulated from rAF timestamps; rAF is
  typeof-guarded. Frame one never reads a wall clock.
  All scatter comes from a fixed-seed LCG baked at
  load.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms both
  resize listeners register (watch-only: no pointer
  listeners).
- First pass fixes: at a 1280 band the animals'
  silhouettes collided into one merged chain, so the
  band widened to 1560 (six 260 slots) and neighbours
  now clear each other at every phase. The mushroom
  cap sat too low and hid the kitten's face; the dome
  rose and shrank until the face, eye and nose read
  under the ribbon. Several leopard spots landed
  outside the body ellipse and floated on the ground;
  spot placement is now polar and scaled inside the
  ellipse. The cello read as a detached red snowman;
  it moved closer to the body, shrank, and its paw now
  reaches its neck. A redundant second ear ellipse on
  the elephant (same colour, invisible seam) was
  removed, and the poncho's lower stripe was pulled
  inside the poncho silhouette. All renders redone
  after the fixes.
- Desktop: five animals share the stage at frame one
  with the lama mid-wrap at the left edge - lama in
  its striped poncho, spotted leopard with its cello,
  the kitten's face visible under the spotted cap,
  the elephant's trunk and star tutu, the tabby's
  overalls and ringed tail - evenly spaced on the
  continuous near-black, generous dark above and
  below.
- Thumb: leopard, kitten and elephant read instantly
  at gallery size; the parade band sits mid-frame on
  the dark ground.
- Mobile: cover-fit crops the band to the kitten at
  full bleed, mushroom cap and face large, ground
  continuous to every edge.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients, no
  shadowBlur use (the word appears once, in a comment
  noting its absence), no offscreen canvas, no
  Math.random, no Date.now, no em dashes, no absolute
  URLs. The palette holds only the five specced hexes,
  each used flat or at flat alpha steps.
