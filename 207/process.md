# No.393 Wimmelwald — process

## Concept

After Anna Galitskaya's (@galitskaya.illustration)
seek-and-find Wimmelbuch mechanism, from her first
Wimmelbuch "Weihnachten im Winterwimmelwald": a snowy
forest village at dusk as a living scene, candle-lit
windows, a frozen lake, the bakery hut, and ten tiny
stories hiding in it. Each findable is one small looping
animation in flat kidlit shapes: bear children skating
the lake, the Badger family carrying a tree, gnomes
queuing at the bakery, a fox delivering letters, an owl
in the lantern tower, a rabbit family building a
snowman, a deer pulling a sled, a mouse choir, a cat
asleep on a bakery sack, a hedgehog lighting lanterns.

Tap a findable and the camera eases in close while a
soft gold ring pulses once around it, no label, no
text; double-tap steps back to the wide view. Never
click-to-reload. There is no text anywhere in the
piece.

Palette, closed: paper #F4EBD8, night navy #24425E,
candle gold #E8A93D for windows and lanterns only, rust
#C0562F for the sled and the choir scarves. Every
colour is used flat or at flat alpha steps.

## Construction

- One canvas, design space 1280x900, centred fit, page
  ground in the paper tone so the scene sits in its own
  paper at any aspect. Sizing comes from the Visual
  Viewport API with resize listeners on both
  visualViewport and window; the canvas element is
  pinned by style width/height every frame; phone
  detection uses the window.screen physical size with
  the tall-aspect fallback.
- Layout: ONE fixed authored arrangement, asserted at
  exactly 10 findables (the prompt's per-load seeded
  placement resolved to a single layout per the batch
  adaptation flag). The only seeded data is hand-wobble
  jitter (1.5px), the pine ridge, the snowline, the
  stars and the snowfall, all baked at load from a
  fixed-seed LCG; placement of the village and the
  finds never varies.
- Scene: dusk sky as navy at a flat 0.88 alpha step over
  the paper, so full-strength navy silhouettes read in
  front of it; a paper moon and 26 stars, a few
  twinkling on the 6s cycle; a distant pine ridge at
  0.45 alpha; a wobbled snowline; the frozen lake as a
  pale navy wash with a firmer rim, paper skate arcs
  and darker scratches; a faint village path with
  footprint dots. Four houses (house A with smoking
  chimney, a tiny house, a cottage, the bakery with
  awning and shop window) and the lantern tower are
  navy silhouettes with paper snow caps, paper doors
  and gold windows with navy mullions; framing pines
  stand at both edges; two lantern posts carry gold
  lamps whose flames step their alpha on the 2s cycle.
- The ten findables, each 3-6 flat shapes with 2-frame
  limb cycles, all micro-cycles whole divisors of the
  60s loop (2, 3, 4, 5 or 6 seconds): skating bears
  circling the lake on the 6s cycle in opposite
  phases; three badgers swaying along the path on 6s
  with the tree held above them; three gnomes
  shuffling in the bakery queue on 3s, out of phase;
  the fox trotting the path on 6s with its letter held
  out; the owl in the gold lantern room, bobbing and
  blinking on 5s; two rabbits hopping on 2s beside
  their paper snowman; the deer gliding back and forth
  on 6s, turning at the ends, the rust sled behind it;
  four mice bobbing staggered on 2s in rust scarves,
  the second one conducting; the cat breathing on 4s
  on its paper sacks, tail tip flicking; the hedgehog
  reaching up with a lit taper on 3s.
- Snow: exactly 120 particles, asserted. Each flake
  falls a whole number of field heights per 60s loop
  and sways on a period that divides the loop, so the
  snowfall wraps seamlessly; each flake is a paper dot
  over a faint navy shade dot, so it reads on both the
  dusk sky and the snowfield.
- Camera and tap: the camera lives inside the design
  transform (the batch's camera-piece rule). A tap is a
  press and release within 16 design px and 0.8s of the
  piece clock; client coords convert through the
  stored centred-fit transform and then through the
  inverse camera. The nearest findable centre inside
  its hit radius wins (radii grow 1.25x on phones);
  the camera target becomes that find at 2.35x zoom
  (3.0x on phones) and a gold ring pulses once around
  it over 1.2s, an expanding stroke over a soft gold
  fill. A second tap within 0.45s is a double-tap and
  returns the camera to the wide view. The ease runs
  in step() on fixed ticks (0.085 lerp with a snap
  threshold), the same on every device.
- Loop: 60 seconds, ambient and seamless. It holds
  whole cycles of every micro-narrative (2/3/4/5/6s),
  the star twinkle (6s), the lantern flames (2s), the
  chimney smoke (6s) and the snowfall.
- Determinism: the first frame is drawn synchronously
  at the constant phase T = 21.4s (village complete,
  skaters mid-glide, fox and deer mid-path, snowfall
  mid-fall, camera wide). The animation clock advances
  from that anchor in fixed 1/60 ticks accumulated
  from rAF timestamps; rAF is typeof-guarded. Frame
  one never reads a wall clock.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms all
  five pointer listeners register alongside the resize
  listeners; the load assertions (exactly 10
  findables, exactly 120 snowflakes) pass silently.
- Desktop: the dusk village reads whole, moon and
  stars in a deep navy sky, gold windows across four
  houses and the bakery, the owl clear in the gold
  tower room, the skating bears on the pale lake, the
  deer and rust sled on the path, the choir's rust
  scarves in front of the cottage, the gnome queue at
  the tower base, rabbits and snowman on the right
  snowfield, the hedgehog's gold taper at the left
  lantern post.
- Thumb: village, lake, tower and snowman all read at
  gallery size on the continuous paper ground.
- Mobile: centred fit keeps the whole village in
  frame, ground continuous above and below.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients, no
  shadowBlur use, no offscreen canvas, no Math.random,
  no Date.now, no em dashes, no absolute URLs. The
  palette holds only the four specced hexes, each used
  flat or at flat alpha steps.
