# №1250 "Greeting Algorithm" — process

Jenna Maurice study block JM3, after her *Forming an Affectionate
Relationship with the Seemingly Unaffectionate* — the saguaro hugs — and
her mimicry/reaction method: building relationships with landscape
through non-verbal gestures. This piece is that method as a small
algorithm: approach, lean, hold, release, walk on, greet the next thing.
Greeting, never conquering — the agent never climbs anything, plants
nothing, and has no face. It is a body, not a mascot.

## What it is

A pale procedural desert in the specced palette — sky #EFE6D4, sand
#D6B981 in three flat dune bands, one saguaro (#6B7F4E, ribbed, two
arms) standing centre-left, one faceted boulder (#8A8177 with light and
dark flat facets) at right. A small soft-bodied agent in blush #C98A7D
(a plump teardrop, about 8% of frame height, two plain feet) walks the
ground line — its feet follow the dune height function — and alternates
its greetings between the two features, forever.

**The cactus hug.** The agent stands at the trunk's right side, tilts
its whole body toward the saguaro (hashed lean per greeting; the first
cycle leans 13.8°), and its contact side flattens against the trunk
while the rest of it squashes slightly. It settles in over 1.2 s, holds
with a slow breathing sway (±0.8° on a 5.3 s period, a ±1% breath in
the squash), and releases over the last second.

**The boulder mirror.** The agent walks to the boulder's left slope,
climbs only to the slope's lower third (s = 0.27 along the base edge,
never higher), and lies along it: body tilted to the slope's own angle
(36.6° from vertical at desktop proportions), underside flattened,
feet aligned to the surface. Mirroring, not mounting.

## Greeting cycle

Greetings are indexed g = 0, 1, 2, … and alternate cactus / boulder.
Every parameter is a seeded hash of g, so each repetition differs a
little:

- **Hold:** 22 + 18·hash seconds (22–40 s). First cycles: g0 cactus
  31.6 s, g1 boulder 37.9 s, g2 cactus 28.9 s, g3 boulder 33.4 s.
- **Walk speed:** 0.030–0.042 of frame width per second. The first
  walk (spawn at the left edge → cactus) takes 9.5 s at desktop size.
- **Lean / tilt:** cactus lean 0.20–0.25 rad; boulder tilt is the true
  slope angle ± 0.03 rad of jitter.
- The schedule is a closed-form walk over greetings: each frame, the
  builder steps g from 0 accumulating walk + hold durations until it
  covers the current agent-time. Walk paths are segment lists (ground
  runs that follow the dune function; slope runs that lerp along the
  boulder's edge), positioned by eased distance; foot-step phase is a
  function of distance travelled, never of frame count.

## Interaction

- **Tap:** pauses the agent's clock — a held hug, held as long as you
  leave it. Pauses are recorded intervals in piece-time; agent-time
  subtracts them in closed form. The desert is still by design, so
  what freezes is the agent alone, breath and all.
- **Drag starting near the agent** (within 25% of the frame's smaller
  dimension): records a target flip. A flip retargets every greeting
  *after* the one in progress, so the current hug or walk is never
  yanked mid-gesture — the agent finishes what it is doing, then
  greets the other feature next.
- **Double-tap:** reseeds the landscape (salt increments): dune
  phases, feature placement, cactus proportions and arm heights, and
  all per-greeting hashes change; the agent clock restarts and the
  pause/flip records clear.

All interaction is recorded state; no frame ever integrates anything.

## Determinism

The synchronous first frame is drawn at the fixed phase **T0 = 26 s**:
the first walk ends at 9.5 s, so the frame sits 16.5 s into the first
hug — 52% through its 31.6 s hold, settle long finished (λ = 1),
release not begun — the agent fully leaned against the saguaro. The
rAF loop, guarded by a `typeof` check, is anchored as
T0 + elapsed-since-load, with recorded pauses subtracted. All
variation comes from the seeded integer hash `ih(seed, k)`; no
`Math.random`, no gradients, no `ctx.filter`, no shadowBlur, no
offscreen canvas, no ImageData, no audio. Canvas size comes from the
Visual Viewport API with resize listeners on both visualViewport and
window; the canvas CSS size is pinned in `draw()`; phone detection
uses `window.screen` physical size (min dimension < 700) with the
aspect fallback. Every ellipse/arc is drawn on its own path (the
node-canvas batched-subpath quirk).

One fix during QA: the ground-band paths stepped x by 16 px and could
stop short of the right edge (visible as a sky sliver at 390 px
width); each path now closes through the exact point at x = W.

## QA

Rendered with the house node-canvas renderer:

- `qa-desktop.png` (1280×800) — pale desert, ribbed saguaro
  centre-left, faceted boulder right, blush agent mid-hug at the
  trunk: flattened contact side, planted feet, full lean.
- `qa-mobile.png` (390×844) — same read at phone size; the hug, the
  boulder, and all three dune bands intact, ground reaching both
  edges.
- `thumb.png` (720×720) rendered twice and byte-compared with `cmp`:
  **byte-identical**; the duplicate was deleted.
- Off-phase temp renders (discarded) verified the other poses: the
  agent walking upright mid-desert at 46 s, and lying along the
  boulder's lower slope, underside flat, at 70 s.
