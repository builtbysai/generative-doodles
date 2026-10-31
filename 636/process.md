# No.636 "The Healthy Mycelium"

EXPANSION #77 seba-ilabaca, prompt block 4 "Red de Vida". His Pantera covers
(#15 fungi, #17 mycelium network) as a living system: pale hyphae grow from
spore nodes across a near-black field, fuse where lineages meet, fruit
sparingly, overgrow, dim, release spores, and regrow, endlessly.

## Concept

The network is the subject; there is no text, no UI, no scenery. Five spore
nodes seed the field. Hypha tips wander with a slight upward bias, branch,
and when a tip comes within reach of a strand from a different lineage the
two fuse: a gold pulse ring fires once at the junction, and a few junctions
bear a small rust mushroom cap (never more than six in a generation).
Abundance is checked by a density cap: past it, the oldest strands dim over
a few seconds and shed spore dots as they go; the spores drift, settle, and
seed new nodes elsewhere. Dragging through the web severs what the finger
crosses (those strands dim and reseed the same way, never vanish outright).
Double-tap reseeds the whole network.

Palette, strict: ground #0C0F0A, hyphae cream #E6DDBE, fusion pulse gold
#E8B93B, spore dots #F2EDDA, fungi rust #B4572E (caps only).

## Construction

Simulation model:

- The sim lives in a fixed 100x100 unit field, drawn cover-fit, so it is
  resolution independent and identical at every canvas size. All geometry
  is generated data drawn directly each frame; no offscreen canvas.
- Time advances in fixed steps (STEP_S = 1/30 sim second) driven by an
  accumulator fed by the anchored rAF clock (first-timestamp anchored,
  capped catch-up). Frame count alone never advances the sim.
- One mulberry32 stream per generation drives every random decision:
  node placement, tip wander jitter, branching, tip lifetimes, spore
  drift and settling, density shedding. Base seed 636077, generation g
  uses 636077 + g * 7919.
- Strands are point lists grown by tips (random walk, angle jitter 0.55,
  upward bias 0.16, step 0.85 units). Branch probability 0.014 per tip
  step. Active tips capped at 380; a strand stops growing at 950 points.
- Lineage is per spore node. Fusion uses a spatial hash (cell 2.4 units):
  a tip within sqrt(2.6) units of a live point of a different lineage
  fuses, stops, and emits a pulse. Cap probability per fusion is 0.16,
  hard cap 6 per generation.
- Density model: total strand points are counted incrementally. Above
  POINT_CAP 30000, oldest-first current-generation strands are marked
  dimming until the shed reaches POINT_TARGET 21500. Dimming strands
  fade linearly over 100 steps (~3.3 s) and release a spore from a random
  point every 13 steps; on completion their points are returned to the
  budget. Severed strands use the same machinery with a 60 step (~2 s)
  fade and three immediate spores.
- Spores drift with damped seeded velocity and a slight rise for 80 to
  160 steps, then settle (clamped inside the field) and seed a node with
  three fresh tips. If tips and spores both reach zero, a new node is
  seeded so the cycle can never stall.
- Frame one: at load the sim is pre-grown synchronously for 520 steps
  (~17 sim seconds), so the first frame is already a young branching
  network. The fusion junction nearest the field center is re-timed to
  mid-pulse (age 0.45 of the 1.7 s pulse life) so one gold ring is
  visible at every aspect ratio despite cover-fit cropping.
- Interaction: pointer drag queues segments in field units; each sim
  step, live strands with a point within 2.7 units of a queued segment
  are severed. Quick double-tap (anchored clock, 0.38 s window) calls
  reseed: the old strands are kept as a fading ghost generation (45 step
  fade, excluded from fusion, density, and severing) while a fresh
  generation starts from five new nodes with a 150 step head start.
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas CSS size pinned in px inside draw();
  phone detection via window.screen (min dimension < 700) with aspect
  fallback (layout is full-bleed either way, ground is the page color);
  rAF typeof-guarded; no Date.now, no Math.random, no audio, no text
  beyond the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical, re-verified after every fix round. Second render deleted.
- Round 1 read-back: network, pulse, and caps all present, but six rust
  caps (the generation maximum) already stood in frame one, too many
  against the prompt's restraint, and the frame-one pulse sat near the
  right edge where cover-fit crops it out of the phone frame.
- Fix round: cap probability 0.55 to 0.16; frame-one pulse now chosen as
  the pregrow fusion nearest the field center; node halo alpha softened
  0.28 to 0.18. Read-back: pulse visible at all three sizes, but the
  changed RNG consumption still landed six caps in frame one.
- Fix round 2: pregrow caps are trimmed to the first two formed (the
  lifetime cap of six still applies to live growth). Final read-back:
  all three sizes show the branching cream network edge to edge on the
  near-black ground, one gold pulse ring near the center, exactly two
  rust caps, soft node dots, no text, nothing clipped or broken on
  mobile (full-bleed field, cover-fit).

## Deviations

- One deviation, recorded per the brief's restraint rule: fruiting
  bodies formed during the deterministic pregrow are trimmed to two in
  frame one, even though the prompt allows up to six per piece. Reason:
  pregrow fusions are numerous enough that an untrimmed frame one
  showed the lifetime maximum at once, reading as decoration rather
  than rarity. Live growth after load can still raise the count to six.
- The prompt's "about 20 sim units" of pregrow is realized as 520 fixed
  steps (~17.3 sim seconds); close to the brief and enough for fusions
  to have occurred. No other deviations.
