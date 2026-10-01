# №9032 · Chain Reaction: process

Commissioned 2026-10-01 by Hans: study wustep's "contraptions"
(github.com/wustep/contraptions) and make a piece after it. The first
build cloned the wrong half of the project: Explorations, the grid of
tiny looping machines the repo grew out of. Hans corrected this
directly: "Missed the point completely. It's a beautifully animated
rube goldberg machine." The subject is Machine, the repo's front door:
one ball running an endless Rube Goldberg chain, the camera following
it, a portal at the end of each map leading to a new world with a new
palette.

This is a rebuild from zero around that correction. All new code,
single self-contained `index.html`, plain canvas 2D, no libraries.

## How it works

- One ball with a simple face travels an endless procedurally built
  chain. The camera follows with a forward lookahead so the next
  contraption is always entering the frame.
- 12 contraption archetypes, each with its own motion path and
  triggered animation: roll, ramp up/down, funnel, seesaw, bell,
  mill wheel, spinner (valve), elevator (pulley + counterweight),
  cannon, loop-the-loop, catapult, and the portal itself.
- The chain is generated in chunks ahead of the ball and old nodes are
  dropped behind it, so it runs forever without growing memory.
- Four worlds cycle through portals: workshop (warm gray), garden
  (cream), harbor (pale blue), arcade (lavender). Each world has its
  own ground, ink tone, accent set, and background decor (bolts,
  tufts, ripples, plus-signs). The portal glows with the *next*
  world's accent; crossing it fires a white flash wipe and the whole
  scene re-skins.
- Height is biased back toward the middle (high chains pull down,
  low chains lift) so the journey undulates instead of drifting away.
- Particles: muzzle puffs, sparks, splash drops, portal sparkles,
  landing dust, and motion ghosts on fast moves.
- Click/tap re-seeds with a fade; `?seed=` makes any machine
  shareable. Default seed 7, which opens roll, catapult, elevator.

## Decisions

- Thick ink linework with flat color fills, no gradients on the
  machine itself; light paper grounds, one accent family per world.
- Cause and effect over decoration: every contraption visibly acts on
  the ball (tips, lifts, fires, swirls, carries) before handing it on.
- No HUD, no score, no instructions beyond the quiet caption:
  "one ball, no end. click for a new machine".

## QA (2026-10-01)

- Zero console exceptions over 25s live runs (exception capture from
  before navigation).
- Every contraption visually inspected mid-action: roll, ramps,
  funnel (ball spiraling), seesaw (plank tipping under the ball),
  bell, mill wheel (turning under the bridge), spinner, elevator
  (ball riding the platform, counterweight dropping), cannon (muzzle
  puff + sparks, ball mid-flight), loop (ball inside the ring, flag),
  catapult (arm mid-swing), portal (glow + flash wipe + world swap).
- 200s fast-forward sim: ball height stays bounded (oscillates a few
  hundred px around zero), camera never loses the ball, no NaN, node
  count stable (old nodes pruned).
- Portal transitions verified across worlds; bg, ink, accents, and
  decor all re-skin together, portal glows with the next accent.
- Click re-seed verified: URL seed changes, machine rebuilds.
- Mobile 390px: machine fills the frame, caption unclipped, no
  overflow. (One headless CDP capture returned a blank compositor
  frame; re-capture was clean and the sim state was consistent, so it
  was filed as a capture flake, not a piece bug.)
- Animation verified alive via frame pixel diffs (14-24 mean diff
  across ~3s intervals).

Held for Hans's verdict before replacing the live piece. The published
v1 ("Tiny Machines") stays up until he approves this rebuild.
