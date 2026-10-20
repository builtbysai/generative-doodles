# No.382 First Collection, Again

## Concept

After Jen K's (jenkbdoodles) archive mining: the gems
from her very first collection, dropped into new designs
again and again. The piece makes that mechanism literal.
A bank of exactly ten of her recurring motifs (crescent,
star, eye, moth, crystal, tulip, raven, dragon-scale,
cactus, birch leaf) is recombined into a maximalist toss
on near-black; each generation pulls five to seven of
the motifs and lays them down in a single palette duo.
Double-tap mines the archive again: the field crossfades
into the next generation. Generativity as curation.

## Construction

- One canvas, design space 1280x900, cover-fit full-bleed
  field. Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame
  via style width/height in px; phone detection via
  window.screen min dimension < 700px with aspect
  fallback.
- Palette is exactly seven flat colours: ground #101014
  and three duos, one per generation: gold #C9A24B +
  cream #F3EBDD; teal #5BA3C4 + purple #B565A7; oxblood
  #7A2E4A + amber #D97E36. Palette audited in the file:
  no other hexes, no gradients, no shadowBlur, no
  em dashes.
- The motif bank is exactly 10 path recipes, asserted at
  load, each drawn directly every frame on the one
  canvas (no offscreen sprite anywhere): crescent from
  two arcs with exactly computed intersection angles;
  star as a ten-point polygon; eye as a duo-outline
  almond with pupil and centre dot; moth as four wing
  ellipses, body and curved antennae; crystal as a
  diamond outline with three facet lines; tulip as a
  three-petal head on a stem with one leaf, head and
  stem in opposite duo colours; raven as a flat flight
  silhouette (raised wing, round head, heavy beak,
  notched tail fan, ground-colour eye dot);
  dragon-scale as a domed scallop with inner arc and
  ring; cactus as a saguaro drawn in one thick
  round-capped stroke path with a duo flower on the
  crown; birch leaf as a pointed oval with a centre
  vein.
- Generations are a FIXED AUTHORED TABLE of eight
  entries, never runtime random. Each entry names its
  motifs (asserted 5-7, all inside the bank), exactly
  one duo (asserted), and a scatter seed:
  1. crescent, moth, eye, tulip, star, crystal;
     gold + cream; seed 38211.
  2. raven, cactus, eye, leaf, scale, star;
     teal + purple; seed 38222.
  3. crescent, tulip, moth, cactus, crystal, leaf;
     oxblood + amber; seed 38233.
  4. raven, eye, scale, star, leaf, crystal;
     gold + cream; seed 38244.
  5. crescent, tulip, cactus, moth, star, scale, leaf;
     teal + purple; seed 38255.
  6. raven, tulip, eye, crystal, leaf, star;
     oxblood + amber; seed 38266.
  7. crescent, moth, cactus, eye, scale, crystal;
     gold + cream; seed 38277.
  8. raven, tulip, eye, moth, leaf, star;
     teal + purple; seed 38288.
  Each generation builds exactly 240 icons, asserted at
  build: 24 large, 72 mid, 144 micro, in three scale
  bands on seeded jittered grids (mulberry32 from the
  entry's seed), band membership by each motif's
  natural size class, anchors bleeding 50px past the
  design edges so the toss never opens a gap. Per icon,
  the duo colour is dealt by the seeded stream (primary
  and secondary carried per icon, so two-colour motifs
  like the eye and tulip use both).
- Motion: one seamless 40s master loop. Each icon
  drifts on a tiny sine path (amplitudes 3-11px) whose
  x and y cycle counts are whole numbers (1-3) per
  loop, so frame 40s is pixel-identical to frame 0.
  Stars and crystals twinkle at 8 or 10 whole cycles
  per loop (periods 5s and 4s, whole divisors of 40),
  alpha 0.6-1.0.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 13.7s (generation 1 complete,
  drift mid-cycle, no fade running), and the rAF loop
  (typeof-guarded, fixed 1/60 ticks) is anchored at
  that constant plus elapsed time. No wall-clock phase
  anywhere.
- Interaction: double-tap only. A tap is a press and
  release within 12 design px and 0.5s on the piece
  clock; two taps within 0.45s advance the table, and
  the pairing resets after each advance so a triple
  tap cannot skip two generations. The prompt's two
  offscreen generation buffers take the data-only
  treatment: the old generation is drawn as usual,
  then the new generation is drawn over it on the same
  canvas at rising alpha across a 1.5s crossfade,
  integrated on the same fixed ticks; the old field is
  dropped the tick the fade completes. The generation
  counter stays internal; no text, no UI, no
  click-to-reload. Single taps and drags do nothing.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js
  at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png); all three inspected.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Desktop: dense gold + cream toss edge to edge,
  crescents, eyes, moths, tulips, stars and crystals
  all legible in three scale bands, stars caught at
  varied twinkle opacity. Thumb: generation 1 reads
  instantly at gallery size. Mobile: cover-fit crop,
  ground continuous to every edge, icons large.
- Temporary probes (copies in /tmp, not shipped)
  verified the rest of the table and the fade:
  generation 2 (teal + purple) shows ravens reading as
  birds in flight, saguaro cacti, domed dragon-scales
  and birch leaves; generation 6 (oxblood + amber)
  shows ravens, tulips, eyes, crystals, leaves and
  stars in the third duo; a probe frozen mid-crossfade
  (fade 0.75 of 1.5s) shows generation 1 at full alpha
  with generation 2 ghosting in over it, exactly the
  specced data-only crossfade.
- Asserts verified in the render runs: bank of exactly
  10 motifs, every table entry 5-7 motifs with one
  valid duo, and exactly 240 icons per generation (the
  script throws otherwise, and all renders completed).
