# No.625 — Nothing Ends, Everything Transforms

EXPANSION #76 soledad-romero, prompt block 1 "Ciclo Infinito" (INFINITO doctrine).

## Concept

One organism lives at the center of a near-black field and cycles forever through
six phases — seed/egg, first shoots, full bloom, heavy fruit, decay, ash — each
phase melting into the next with no cut. The ash does not vanish: its ~120
particles drift outward, then visibly re-coalesce and re-form the seed, and the
cycle begins again. Around the organism a thin orbit ring carries three paired
markers turning on the same rhythm: a full moon and a crescent, a snow asterisk
and a green sprout, an amber sun and a blue night disc. No text, no scenery, no
horizon.

Watch-only by default. Dragging tangentially stirs time: clockwise pushes the
cycle forward, counterclockwise pulls it back, and the organism morphs along.
Double-tap reseeds: the current organism dissolves into ash early, the ash
gathers, and a new species' seed forms and begins the same six-phase cycle.

Frame one is the synchronous first draw at a fixed phase: species 1 (plant) at
cycle u = 0.30, full bloom, ring markers at their fixed-phase positions.

## Construction

- Single self-contained `index.html`, canvas 2D only. No external assets, no
  audio, no microphone, no text on the canvas (only the `<title>`).
- Palette is strict: near-black #0E0B08, night amber #E8B93B, moon silver
  #D9D4C5, deep blue #1E4D8C, leaf green #5C8A4D, bloom pink #E87B9C, ember
  orange #C9562E. Ash uses one derived tone, silver desaturated toward the
  ground (#8E897C), as the brief specifies.
- Morph engine: six phase keyframes (length, droop, fan, petal amount, fruit
  amount, body scale, desaturation, appendage alpha) are blended cyclically
  with smoothstep easing across each phase, so every parameter is a pure
  function of (species, u). An organism is a body shape plus a fan of tapered
  ribbon appendages (quadratic splines) with tip ornaments: petal clusters in
  bloom, hanging fruit in the fruit phase. Decay is droop plus a lerp of all
  colors toward moon silver.
- Ash: 120 particles per species, seeded with mulberry32 (72 sampled from the
  appendage curves, 48 from the body disc), each with a seeded drift vector.
  In the ash phase a bump-shaped spread curve carries them out and a gather
  curve pulls them back to the center while the seed sphere re-forms over the
  last 40% of the phase, so phase 5 hands a whole seed to phase 0.
- Cycle: ~90 seconds, always forward. The animation clock is an anchored
  elapsed time from the rAF timestamp; drags add a tangential offset to the
  cycle parameter. Reseeds run a 2.4 s timeline (dissolve, drift, gather, new
  seed) driven by the same elapsed clock, then the clock offset is re-anchored
  so the new species resumes at its seed phase.
- Species table (fixed cyclic order on reseed):

  | # | Species | Seed phase | Shoots | Bloom | Fruit phase | Ash origin |
  |---|---------|-----------|--------|-------|-------------|------------|
  | 1 | Plant | amber seed sphere | green radial splines, upward bias | pink three-petal clusters | amber/ember spheres weighing stems down | stems + bulb |
  | 2 | Bird | silver egg (tall ellipse) | amber feather ribbons, two wing fans + crest | wings spread, silver feather tips | heavy body: body swells, wings droop laden | feathers + body |
  | 3 | Pine | ember cone with amber scallop arcs | green needle fan upward | amber pollen dots at needle tips | ember mini-cones hang from the needles | needles + cone |
  | 4 | Fish | silver egg (wide ellipse, blue dorsal shade, eye dot) | blue fin ribbons: tail fan, dorsal, pectorals | fins spread wide, silver fin tips | heavy belly: body bulges downward, fins droop | fins + body |

- House rules: canvas size from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas pinned in px inside draw(); phone
  detection via window.screen (min dimension < 700px) with the aspect fallback
  only; the organism and ring refit the phone frame; page ground is the
  near-black tone. rAF is typeof-guarded; no offscreen canvas, no ctx.filter,
  no shadowBlur.
- QA hook: a `?seed=` query value (ash, ashdrift, or a number) forces the drawn
  cycle phase for state-forced verification renders. Production loads carry no
  query and are unaffected. This follows the precedent set by earlier pieces.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Frame one derives from the constant u = 0.30 only; no Date.now()
  anywhere in the piece.
- Read-backs: desktop and thumb show the plant in full bloom — wide green
  stems radiating from the central bulb, a pink petal cluster at every tip,
  the thin marker ring clear of the flower heads; day/night pair at top, moon
  pair at right, season pair at lower left. Mobile refits the same composition
  with nothing clipped.
- First render round read too spindly (thin stalks, dot petals, organism small
  against the ring). Fixed by widening the plant ribbons, softening the taper,
  drawing each flower head as a three-petal cluster, enlarging the organism
  (R factor 0.265 to 0.28) and tightening the ring (1.42R to 1.34R). Re-rendered
  and re-verified, including a second determinism byte-compare.
- Ash verification (state-forced throwaway renders in /tmp, read, then
  deleted): at u = 0.875 the body has dissolved and the ash particles drift
  spread across the disc; at u = 0.96 the particles have gathered tight around
  the center and the amber seed sphere has visibly re-formed inside them —
  the ash-to-seed re-coalescence reads clearly.

## Deviations

- Reseed species order is a fixed seeded cycle (plant, bird, pine, fish)
  rather than a random pick. The prompt says a double-tap starts "a new
  species" and lists examples; a fixed order keeps the piece deterministic
  and guarantees every species is reached.
- The prompt's "heavy fruit" phase is species-specific weight rather than
  literal fruit on every body: the plant bears fruit spheres and the pine
  bears mini-cones, while the bird's phase is a heavy swollen body with laden
  drooping wings and the fish's is a heavy belly. Same phase law, body plans
  kept coherent per species.
- The ring's paired markers are small glyphs (moon disc/crescent, snow
  asterisk/sprout, sun/night disc) rather than literal landscape pairs; the
  prompt bans background scenery, so the pairs live on the orbit ring only.
