# №9048 · Log Argument - process notes

## Concept
Seed 110 ("Log Argument"): the Connected Worlds shared-resource mechanic
without the museum. A waterfall feeds a glowing river with a fixed water
budget. The river forks into three distributary channels feeding three
habitat pools (reed, moss, stone). The viewer drags fallen logs to divert
the current; because the source is fixed, feeding one pool starves another.
Twelve fish live in the pools and migrate to the healthiest one; every
arrival sets off a small chain reaction (expanding ripple, glow pulse,
startle darts in the residents, spark motes). Each pool's share of the flow
is shown on a meter with a white tick at 12%: fall below the tick and the
pool goes thirsty (amber), and its fish leave. Tap open water (or the
"new river" button) for a fresh seeded watershed; ?seed= makes variations
shareable.

Success criterion from the seed: two viewers argue over where the log goes.
The piece earns that by making the tradeoff legible in under a minute:
named pools, live share meters, a survival tick, and fish that visibly
vote with their fins.

## Concept family
"shared-resource river diversion toy" - an interactive flow-diversion game
with a fixed water budget, draggable obstacles, competing consumers with
visible meters, and migrating agents. Checked against the ledger's used
families before building:
- №9043 River Stones is a still-life of stones from above (no water
  simulation, no interaction, no agents). Structurally different.
- №9007 Old Courses is a fictional antique survey plate of a meandering
  river (static cartography). Structurally different.
- №9030 adaptive-vehicle river (Reynolds steering, feeding/crowding
  memory, hold-to-starve) is the closest neighbor, but it is RETIRED
  (Hans disliked it) and its mechanic is creature-behavior research, not
  a resource-diversion game with a budget, meters, and draggable
  obstacles. The family does not overlap.
- №8939 pair-budget oscillator economy has a budget mechanic but is an
  audio piece in a different domain.
No conflict found; built as specified.

## Seed mechanics
- mulberry32. Default seed 777001 (chosen after comparing 8+ seeds on
  desktop, mobile, and square viewports; it is the best all-rounder:
  desktop 0% waste with all three pools alive, mobile 0.3% waste).
- Seed determines: waterfall notch x (0.34-0.66) and width, pool x
  jitter and radii, the three logs' positions/lengths/angles, the water
  budget (210-300 drops/s, shown in the source line), flow noise field,
  ground texture, and fish wander phases.
- Layout is deterministic per seed; the water itself is a live
  simulation, so two runs of one seed share the watershed, not the
  exact drops.

## How the water works
Two stacked canvases: a back layer redrawn crisp every frame (ground,
cliff, pools, logs, waterfall sheet) and a front additive layer with a
destination-out fade for water trails, foam, sparks, ripples, and fish.
Particles spawn at the waterfall notch at the fixed budget rate and are
advected by a seeded field:
- a widening sheet above the fork (logistic spread, saturating, so the
  sheet always covers the three channel mouths),
- three distributary channels as bezier curves from fork mouths to pools,
  steered by nearest-sample tangent (stored in screen-fraction space so
  the fork is aspect-independent),
- position-projection log collision (no tunneling; tangential velocity
  survives so water slides along logs with no added energy),
- an elliptical pool watershed for capture plus a short-range funnel so
  spillover still finds a basin; side walls bounce, the bottom edge
  absorbs (counted as soak-away).
Pool inflow is smoothed (slow decay, so meters show the river's recent
average). Fish decide every couple of seconds: move to a pool that beats
home by 5+ points, or flee a pool under 4.5%. Travel is a bezier swim;
arrival fires the chain reaction.

## What I tried and rejected
- Velocity-only log deflection: particles tunneled through logs at high
  speed. Replaced with position projection. (Then removed a compounding
  slide boost that turned deflections into water jets.)
- Long-range pool attraction instead of channels: collapsed to
  winner-take-all (one pool 100%, others dead) because a thin stream can
  only be in one place. The forked distributary design gives genuine
  simultaneous splits.
- Divergent fan from screen center: pushed the whole stream to one side.
  Replaced with a saturating widening sheet around the notch.
- Bottom wall bounce: created "zombie water" sliding along the bottom
  edge (visible streak, inflated waste). Reverted to bottom absorption
  with an alpha fade; side walls still bounce.
- u-space channel geometry: broke down on portrait aspects (mouths
  collapsed relative to steering width). Moved channels and funnel to
  screen-fraction space; kept capture/deflection isotropic in u-space.
- Static meander for splitting: still winner-take-all over time.
  Abandoned for the fork.
- Fish without separation: 10+ fish in one pool merged into an
  overexposed white blob. Added gentle schooling separation and
  reduced glow.

## QA log
- Rig: headless Chromium on isolated port 9361, egress proxy healthy.
- Iterated over ~15 renders across 8 seeds (desktop 1280x800, mobile
  390x844, square 720x720); every render visually inspected.
- Mechanic proven headlessly via evaluate hook: damming reed's branch
  moved its share 51% -> 14% -> 7% across two log placements, fish
  migrated 8 -> 1 -> 0; clearing logs on mobile gave stone 75%.
- Interactions verified with synthetic pointer events: drag log body
  moves it; drag amber handle rotates it; tap on empty water reseeds
  and rewrites ?seed= in the URL.
- Mobile 390x844: no scroll/overflow, HUD fits, game plays (0.3% waste).
- cdp_exceptions.py on the final build: exit 0, zero console/page
  errors.
- Static profile: no em dashes, no date strings in visible copy, no
  absolute URLs, viewport meta present.
- Known honest limits: run-to-run water paths vary slightly with frame
  timing (layout per seed is deterministic; the sim is live). Some
  seeds start heavily dammed (e.g. 424242) - playable, the viewer drags
  the logs out, but the default was chosen to start balanced. Square
  aspect is the weakest viewport for a few seeds; the default seed was
  picked partly for cross-aspect robustness.

## Files
- index.html - the piece (single file, no dependencies, no CDN)
- thumb.png - 720x720 capture of the real piece (default seed)
