# No.405 Pink Water

## Concept

After Nina Clausonet's Monet homage (MonthOfMasters25,
Claude Monet): her white-haired, closed-eye muse stands
in pink water, a field of flat pink and purple lily pads
on dark teal, wearing a hot-pink dress, holding a
dark-teal umbrella high, her hair and teal scarf
streaming behind her as wind ribbons under a flat pink
sky with a pink sun disc. WATCH-ONLY: a pure 45s motion
loop, no interaction at all. The pads ARE the water:
flat teal, no reflection, no gradient anywhere. One
white petal crosses the frame on a fixed schedule. Her
heavy paper grain sits over everything as fixed speckle
dot data.

Palette, closed: sky #F7A8C4; dress hot pink #FF1E7A;
umbrella and water dark teal #14524F; pads pink #F06292
and purple #B04BC0; hair white #FFFFFF; scarf teal
#1FA3A3; sun disc and clouds #F26B8A. Nothing else. The
face and limbs use the sky pink as her skin tone, the
only reading the closed palette allows.

## Construction

One self-contained canvas, design space 1280x900,
cover-fit full-bleed on every screen (phones included),
page ground in the sky pink. All marks are JS data drawn
directly each frame; no offscreen canvas, no gradients,
no filters, no shadowBlur, no text.

- Pads: exactly 46, asserted. A fixed table baked at
  load from a fixed-seed LCG: loose scatter across the
  water (y 512-860), depth-scaled (rx 30 at the horizon
  to about 100 near the bottom), each a flat ellipse
  with a centre notch (a wedge of water cut from the
  middle to one edge), a 1px darker rim (purple rim on
  pink pads, teal rim on purple pads) and a short vein.
  Six authored indices (4, 13, 22, 31, 38, 44) carry a
  tiny five-petal flower; the flower count is asserted
  at 6. Pads bob on per-pad sine cycles whose periods
  divide the loop (45s, 15s or 9s), so every pad is
  home at the wrap. Pads split at y 660: back pads draw
  before the muse, front pads after, so she stands
  among them.
- The muse: back hair mass, three-panel dress (one flat
  silhouette, seams in pad pink), short legs in the
  water, serene closed eyes and a small mouth in teal.
  The umbrella shaft is drawn in two stretches: the
  upper stretch before the head, so the face covers its
  middle, and the lower stretch with the handle hook in
  front of her chest, where her raised hand grips it.
  The scalloped canopy and finial sit high in the upper
  third.
- Ribbons: hair and scarf stream left as tapered filled
  streamers (full width at the head, pointed at the far
  end), each swung by one control point oscillating on
  a whole cycle that divides 45 (15s, 9s, 45s for the
  three hair ribbons; 9s for the scarf).
- Petal schedule: ONE white petal. Crossings last 9s
  and start at loop times 2, 11, 20, 29, 38 (5 per
  loop, asserted); they chain back to back and continue
  across the wrap, the path endpoints off-frame. The
  petal arcs downward as it crosses right to left (with
  the wind that streams the ribbons) and tumbles twice
  per crossing.
- Sky and clouds: flat pink sky; the sun is one flat
  disc upper right; 4 authored flat clouds (ellipse
  clusters in the sun pink) drift on the whole 45s
  cycle.
- Grain: exactly 800 static speckle dots, asserted, a
  fixed table drawn in the same order every frame over
  everything, palette colours only (white, teal) at
  flat alpha steps.
- Determinism: frame one is drawn synchronously at the
  constant phase T0 = 23.5s (field complete, ribbons
  mid-stream, the third petal crossing under way over
  the canopy). The animation clock advances from that
  anchor in fixed 1/60 ticks accumulated from rAF
  timestamps (rAF typeof-guarded); frame one never
  reads a wall clock.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical (md5 2acb4d0720771f43b87fdc9615170bc1).
- Desktop: muse centred under the scalloped canopy,
  streamers flowing left, sun and clouds in the upper
  corners, 46 pads filling the lower half with visible
  depth, the white petal caught mid-crossing on the
  canopy edge.
- First pass fixes: the hair and scarf ribbons were
  uniform round-cap strokes and read as stiff bars;
  rebuilt as tapered filled streamers with stronger
  control-point swing. The umbrella shaft originally
  crossed the muse's face; it is now layered behind
  the head and re-emerges at her chest, and the grip
  was lowered from chin height to chest height. The
  finial was first drawn inside the canopy where it
  could not be seen; moved above the canopy crown.
- Mobile (390 wide): cover-fit crops the sides (the
  sun sits outside the phone frame, as with the batch's
  other field pieces); muse, canopy, streamers and the
  near pads stay centred and legible on the continuous
  pink ground.
- Palette grep-verified closed at the seven specced
  hexes; no gradients, shadowBlur, offscreen canvas,
  Math.random or Date.now in the code (the words appear
  only in the header comment, as in sibling pieces).
