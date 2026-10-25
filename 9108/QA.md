# 9108 continuation QA — 25 October 2026

Implementation began at `7822c36`; the first verified feature commit is `9978c0b`.
Only `9108/` is changed. The private reference MP4 was not present in the workspace;
no footage, soundtrack or reference assets were copied. The public X reference
was attempted in Chromium but navigation failed with
`ERR_HTTP_RESPONSE_CODE_FAILURE`; the checked-in scene inventory guided this pass.

## Confirmed defects addressed

- A pointer-down away from the marble could become a near-ball nudge later in the
  same drag. Dragging now requires initial proximity.
- Pointer cancellation and loss of window focus could leave a nudge active.
  Both now clear the input state.
- Reduced motion paused the film without a touch playback path. A canvas gesture
  now explicitly starts playback; Space remains available.
- `worldsVisited` grew once per portal forever. Retained history is now capped at 12.
- The new authored carrier paths were adjusted during development to leave room
  below the loading rails. Captured marbles intentionally bypass ordinary contacts;
  this clearance must be preserved when changing paths.

Also guarded the box-contact clipper when clipping yields fewer than two points;
this is defensive audit work, not a claim of a reproduced production crash.

## Verification

- `node 9108/physics.test.cjs`: passed. Includes existing seeded physics/portal
  checks, 12 carrier fixtures (four sequences × three seeds/entry offsets), ball
  identity, continuous per-step motion, exact capture/stage/release ordering,
  restored collision masks and downstream handoff. Three isolated domino fixtures
  verify sleeping before marble arrival and activation by the real trip.
- `SEED_SWEEP=1 node 9108/physics.test.cjs`: passed on the final carrier
  geometry. Seeds 1–50 each ran for 60 simulated seconds. Minimum depth was 6286;
  maximum low-speed interval was 0.898 seconds. No three-second stalls, premature
  domino activation, non-finite marble state or retained-history bounds failed.
- `LONG_TEST=1 node 9108/physics.test.cjs`: passed, 600 simulated seconds each.

  | Seed | Depth | Portal crossings | Max loaded sections | Max bodies | Max cooldown keys |
  | --- | ---: | ---: | ---: | ---: | ---: |
  | 7 | 75439 | 10 | 5 | 22 | 31 |
  | 23 | 73611 | 10 | 5 | 22 | 29 |

  Both completed more than two four-world cycles without a three-second stall.
  Assertions cover retained machine/world/color/portal/impact histories and finite
  marble state. This tests bounded model state, not hours of browser heap profiling.
- Actual headless Chromium, local and deployed `/generative-doodles/9108/`:
  1440×900 desktop and 390×844 mobile emulation. No script errors or horizontal
  overflow. Opening carrier captures/releases; audio schedules only after click,
  AudioContext reports `running`; Space freezes simulation. Desktop/mobile runs
  delivered roughly 55–60 frames/s during short observations under concurrent
  CPU-heavy physics tests. These are environment observations, not hardware targets.
- Browser input regressions additionally cover near-ball drag, pointer cancellation,
  reduced-motion initial pause, canvas gesture resume and remote pointer exclusion.
- Inspected browser renders of all four isolated new sequences at 3.4 seconds,
  plus the desktop/mobile opening shots. Four worlds and original UI remain intact.

## Remaining limitations and further opportunities

No marble stall or premature domino activation was confirmed in the completed
runs above. This is a finite sample, not a universal guarantee.

1. Each world has three signature sequences, not eight. Add mushroom/web/frog,
   paddlewheel/real buoyancy/winch, coaster and physical ticket-counter sequences.
   The existing counterweight bridge and rocking floats should not be described
   as complete cable or fluid simulations.
2. Lift/cart and claw intentionally share their transport timing. More distinct
   motor profiles, gate linkages and varied compositions are the next craft task.
   The supporting vocabulary still relies heavily on downward collection funnels.
3. Keep the same-ball authored constraint model explicit. Test real route clearance
   and downstream catches for every new carrier; never use it to recover a stall.
4. AudioContext scheduling is verified; audible mix, timbre and musical quality
   need human listening. Test Safari/iOS and physical budget Android devices.
5. Run multi-hour browser heap and background/resume profiling. Current evidence
   is short browser sessions plus ten-minute deterministic model simulations.
6. Boundary portals still mark continuous spatial crossings rather than a separate
   entrance/exit transport machine. Complete that scenic choreography without
   replacing the ball or hiding a stuck route.
