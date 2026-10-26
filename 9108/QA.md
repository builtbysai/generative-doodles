# 9108 QA — connected procedural assemblies

Feature commit: `bdd615e`. Earlier motion/story work: `2fac500`, `c562883`.
Only 9108 and its gallery note changed. Concurrent gallery edits were preserved;
9107 was not edited. Research and playback findings are in [RESEARCH.md](RESEARCH.md).
The private reference MP4 was unavailable; no footage, music or assets were copied.

## Implemented and exercised

Production generates compatible source/receiver pairs, with seeded orientation,
continuous spacing and height variation. Source docking extends a physical bridge.
The free marble rolls over a pressure key, unlocking the receiver. Loading the
receiver retracts the bridge. A physical, spring-pinned return deck tips under the
marble's load and opens the exit gate. Color coatings transfer pigment on contact.

The new rowing boat travels sideways with displacement-driven oars and a docking
stroke. There are 13 transport/launch kinds and 40 available modules; the signature
catalog is 5/5/6/5 across the four worlds. This is not eight signatures per world.
Standalone legacy acts remain fixtures; production focuses on connected carriers.

Capture keeps the mechanism at its dock and smoothly settles the marble's seat
offset. New stages start with progress zero. Coaster joins have matching tangents
and its carriage follows the rail without angular lag. A stable camera lens
previews the next receiver without capture/release zoom changes.

## Confirmed defects fixed

- **Capture origin jump:** the carrier previously adopted the marble's impact
  coordinates instantly. The dock now stays fixed while the same marble settles
  continuously into its cradle. Regressions check both positions at capture.
- **Wrong pose at stage boundaries:** incrementing the stage left progress at one,
  briefly drawing the next stage's final pose. Progress now resets to zero.
- **Coaster orientation discontinuity:** tangent mismatches and orientation lag
  could separate the drawn carriage from the rail. The loop joins now agree and
  the unwrapped angle follows the actual curve.
- **Mirrored ticket travel:** the count must use local signed displacement. Both
  orientations now advance the same three earned perforations.

Prototype failures caught before this release:

- A bridge could intersect a diving/surfacing carrier. It now extends only after
  docking, before release, and retracts only after the receiver captures.
- Narrow spacing let a release miss its pressure key. Receiver placement, a
  longer rolling connection and continuous seat settling now preserve the order.
- An open gate could still obstruct the throat approach. Its hinge now sits
  outside that approach and the gate swings downward.
- The return rail and tipping deck could pinch a marble: seed 33 paused for 2.41s;
  seed 7 failed after about 366s in its second garden cycle. A receiving stop and
  a short visible jump separate the collision surfaces by more than a marble
  diameter throughout the sampled deck travel. The regular seed-7 regression now
  runs 400s to cover the failure. There is no stall-triggered nudge or teleport.

Previously fixed pointer cancellation, remote grabs, reduced-motion resume and
bounded world history remain covered. The old support-deck fallback regression
remains for standalone fixtures.

## Final deterministic verification

All three commands passed on the final physics geometry:

```sh
node 9108/physics.test.cjs
LONG_TEST=1 node 9108/physics.test.cjs
SEED_SWEEP=1 node 9108/physics.test.cjs
```

The normal suite includes 39 isolated carrier fixtures (13 kinds × 3 seeds),
identity, real capture, ordered stages, continuous per-step travel, active-rail
clearance, restored collision masks, dyes, three earned tickets and thirteen
distinct motion signatures. Three legacy domino fixtures test sleeping before
arrival and activation by the actual trip. Production currently has no domino row.

Sixteen seeds produce sixteen different constructions, three mechanical openings
and both travel directions. Full-chain checks require source release → actual
key contact → receiver capture, and a loaded/rotating plank before gate opening.
A passed section cannot have an unvisited receiver or unopened gate. Sampled
hinge angles verify that the feed rail cannot pinch a marble against the deck.

| Seed | Simulated seconds | Depth reached | Cumulative upward travel | Free rolling distance |
| --- | ---: | ---: | ---: | ---: |
| 1 | 300 | 31192 | 5521 | 14398 |
| 7 | 400 | 43681 | 7576 | 19068 |
| 23 | 300 | 31208 | 5451 | 14131 |
| 44 | 300 | 31164 | 5341 | 13789 |

Distances are simulation pixels. The rolling metric counts lateral travel while
unconstrained and while vertical speed is less than half horizontal speed.

| Long-run seed | Seconds | Depth | Portals | Max sections | Max solver bodies | Max cooldown keys |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 7 | 600 | 63549 | 9 | 5 | 6 | 24 |
| 23 | 600 | 62556 | 8 | 5 | 6 | 25 |

Each long run traversed at least two complete world cycles. Carrier state is
bounded at two per retained section; events, world, dye and sound histories are
also bounded. This establishes model-state bounds, not hours of browser heap QA.

Seeds 1–50 each ran for 60s. Minimum depth was **5157px**; maximum low-speed
interval was **0.711s**. No three-second stall or skipped-chain assertion failed.
The first-minute progress condition is three completed assemblies (4200px),
rather than treating fast downward travel as the goal of this sideways/upward pass.

## Browser verification

Local actual Chromium: 1440×900 desktop and 390×844 mobile emulation, with exact
inline-script comparison. No script errors or horizontal overflow. The opening
assembly completed through its exit on both viewports, with **zero offscreen
marble frames**. Dock/release/key/capture and loaded-plank/gate timing were checked
in the browser, in addition to the solver tests.

Gesture-gated AudioContext activation, note scheduling, Space pause,
near-ball drag, pointer cancellation, remote-pointer exclusion and reduced-motion
initial pause/gesture resume passed. The short initial observations delivered
414 desktop and 390 mobile frames while CPU-heavy tests were running; these are
host observations, not performance promises for physical devices.

Inspected timed screenshot sequences from normal playback of the opening,
vine/bee → mushroom, rowboat → submarine, and ticket → coaster, including the
rowing transfer on mobile. Later-world inspections advanced the real simulation
to the selected capture, then resumed ordinary playback. No fixture replaced the
production route during those observations.

The deployed `/generative-doodles/9108/` page passed the same Chromium suite
with exact comparison against all three committed inline scripts. The deployed
initial observations delivered 466 desktop / 462 mobile frames. Both complete
opening chains had zero offscreen marble frames; key, capture, plank and gate
times matched the deterministic local run. Deployment of `bdd615e` was confirmed
successful before this check.

## Remaining limitations and opportunities

No unresolved stall or skipped mechanism was confirmed in the final samples;
finite testing is not a guarantee over every seed or arbitrary pointer nudges.

1. The generator has one connected assembly grammar with 16 compatible carrier
   pairings and varying geometry. More distinct chain topologies are the highest
   priority: different ordering, branching, intermediate rolling interactions,
   and stronger inter-section connections. It is not a catalog of ~100 setpieces.
2. Carrier propulsion, bridge extension and gate opening are explicit authored
   constraints/actuators. The boat is not a fluid simulation; the drawn cables
   are not a tension solver. The return plank and free marble use rigid-body
   forces, contacts, spring torque and hinge stops.
3. The available signature counts remain 5/5/6/5. Several older biome acts are
   fixture-only. Reintroduce them through tested handoffs, rather than restoring
   disconnected slots or decorative motion.
4. Web Audio scheduling is tested; audible mix/timbre quality still needs human
   listening. Safari/iOS, physical budget Android hardware, multi-hour browser
   heap stability and background/resume profiling remain unverified.
5. Portals still mark continuous spatial crossings. A separate entrance/exit
   transport choreography remains future work.
