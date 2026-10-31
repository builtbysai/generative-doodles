# No.613 "Garden of Myths" — EXPANSION #74 adolfo-serra, prompt block 5 "Bestiario de Mitos"

## Concept

Adolfo Serra's Crete sketchbook as a living bestiary. A clay-ochre ground
(Minoan pottery) with a faint darker border band, like the edge of a
sketchbook page, holds four parametric mythic creatures in charcoal line
with Aegean-blue accents. Faces stay minimal (a single bone-white eye, a
nostril dot, a forked tongue) — mythic, never cute. Creatures wander
slowly with a stepped gait, keep their distance from each other, and the
set breathes: tap empty ground and a new creature walks in from the
nearest edge (past five, the oldest resident walks off), drag a path and
the nearest creature follows it, double-tap a creature and it molts into
a new variant of the same body plan.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets,
  no visible text beyond `<title>`. Strict palette: clay `#C98F5F`,
  charcoal `#26221E`, Aegean blue `#3E6B8C`, bone `#EDE4D2` (eyes and
  horns only). The border band and ground shadows are shades/washes of
  those same colors (clay darkened one step; charcoal at low alpha).
- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  inside `draw()` every frame. Phone detection via `window.screen` min
  dimension < 700px, aspect fallback `h > w*1.15`.
- Ground grain: seeded speckles and faint scratch strokes precomputed per
  resize from mulberry32(613001), drawn directly each frame. No offscreen
  canvas, no `ctx.filter`, no image data.
- Body-plan system: four plans, each a parametric bezier silhouette with
  its own detail set.
  - 0 quadruped: four stepped legs, tail, crest row, horns.
  - 1 serpent: undulating bezier body, blue dorsal fins, small horns,
    forked tongue.
  - 2 winged horse: quadruped body plus blue wing (three silhouette
    variants) and a blue mane.
  - 3 horned head: a long neck column rising to a horned head, nostril
    dot, neck shading arcs.
  Variants come from `makeVariant(seed)`: wing shape (swept / tall /
  layered), horn form (straight / curled / forked), tail (plain / tufted
  / forked), crest (none / spikes / fan), blue coverage and body bulk.
  Every creature's part set is derived from its seed, so a molt (new seed
  from the molt counter) yields a new variant of the same plan, and the
  whole history is reproducible. Summons likewise draw plan and seed from
  the summon counter.
- Gait: leg phase and body bob quantize the anchored elapsed time to a
  6-step cycle, so motion steps slightly, like a hand-drawn walk.
  Wandering uses simple steering toward a seeded target plus separation
  steering (min distance 0.20 normalized) so no creature ever fully
  overlaps another; positions clamp inside the ground.
- Determinism: frame one is drawn synchronously at load with elapsed 0,
  gait phase 0, from fixed seeds (613100 + plan index * 17) at four fixed
  spots, one per body plan. No `Date.now()`, no `Math.random()` anywhere;
  the animation loop is anchored to elapsed-since-first-frame and the
  rAF call is `typeof`-guarded (the QA renderer has no rAF, AudioContext,
  createElement, offscreen canvas or filter, and none are used).

## QA log

- Rendered with `~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and `cmp` byte-compared —
  identical; the duplicate was deleted. Gate re-run and passed after each
  refinement round below.
- Desktop/thumb read-back: clay ground with border band; quadruped with
  blue crest spikes and curled bone horns; serpent with fins seated on
  its back and tongue out; winged horse with a clearly blue wing and
  mane; horned head with forked antlers — all spaced apart, bone spent
  only on eyes and horns, nothing clipped.
- Mobile read-back: all four creatures legible and inside the frame with
  generous margins; ground fills the phone frame.
- Refinement rounds during QA:
  1. Body wash alpha raised (0.68 -> 0.84) so creatures read as charcoal
     rather than brown against the clay; wing fill strengthened so the
     blue reads as blue, not gray.
  2. The horned head's ground shadow crossed its neck; shadow moved to
     the neck base and narrowed, base flare adjusted to match.
  3. Horns on the legged plans and serpent scaled down and seated lower
     so they attach to the head instead of floating.
  4. The serpent also drew the shared crest row, which floated above its
     undulating back; crests are now restricted to the legged plans and
     the serpent keeps only its dorsal fins.

## Deviations

- None from the prompt block's prohibitions. Two construction notes:
  the border band uses the clay darkened one step (`#B57E4E`) since the
  prompt's "faint darker border band" needs a shade of the ground itself;
  it is a tint of the specced clay, not a fifth color. And per the
  parent brief there is no on-canvas hint text at all — interactions
  (tap to summon, drag a path, double-tap to molt) are discoverable and
  recorded in the gallery note instead, keeping the page a clean
  sketchbook sheet.
