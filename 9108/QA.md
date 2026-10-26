# 9108 continuation QA — 26 October 2026

Implementation began at `7822c36`; the first verified feature commit is `9978c0b`.
The distinct-motion continuation is `d6f61c0`; the four-act expansion is
`2fac500`. Story/composition is `c562883`, rebased over independent upstream
work without editing 9107. Changes are limited to `9108/` and its gallery note.
The private reference MP4 was not present in the workspace;
no footage, soundtrack or reference assets were copied. The public X reference
was attempted in Chromium but navigation failed with
`ERR_HTTP_RESPONSE_CODE_FAILURE`; the checked-in scene inventory guided this pass.

## Story and composition pass

Four authored chapter openings/payoffs replace the undifferentiated random act
pairing. Seed and cycle vary the middle; supporting acts stay within biome casts.
Three carrier homes change horizontal staging. One-bank collection removes the
unused bank from actual collisions as well as the drawing. Contact awakens
scenery; a closer carrier camera, quieter rails, frog pond/limbs and scalloped clam
make individual scenes easier to read. The piano leaves a phrase-ending rest.

The isolated refill regression reproduced a real generator defect: with an
exhausted mechanical cast, the old fallback picked `ticketPress` from the unrelated
deck head. The corrected fallback picks an allowed act (`domino` in that fixture).
Chapter membership assertions now run through the normal, long and sweep suites.
Fixture release checks now observe the actual collision-enabled release, even if
the marble enters another carrier before the fixture's 16-second endpoint.

Inspected actual seed-7 trajectory renders at workshop lift (~3s), garden frog
(~83s), seabed clam (~154s), carnival press (~208s), plus a mobile garden frame.
These views advance the real simulation to the scene; they do not substitute a
scene fixture or teleport the production marble. Local and deployed Chromium
integration passed with the exact committed inline scripts, gesture-gated audio,
pointer cancellation, pause and reduced motion. The deployed desktop/mobile runs
each delivered 468 frames during the observation window. Physical devices and
audible musical quality remain unverified.

## Previous mechanism expansion

Scissor lift/trolley, frog catch/hop, pearl-dye clam and roller-driven ticket press
add four new silhouettes and contact-triggered sequences. The press produces one
numbered perforation per 60px of loaded travel, with exactly three event records
and bell accents. The clam recolors only after capture and closure. Regression
coverage explicitly checks both behaviors. The frog returns toward its lily pad
after releasing the marble; the clam stays closed during its dwell.

Normal tests passed with all 36 fixtures. Browser inspection covered all four
new mechanisms; desktop/mobile integration checks passed. The long-run results
below cover their final trajectories; the subsequently added ticket event/audio
records were checked by the normal suite and browser audio scheduling checks.
Human listening, physical devices and hours of browser heap profiling remain open.

## Distinct-motion continuation

Added bucket swing/launch, compressing/recoiling mushroom, paddlewheel boat transfer
and full-loop coaster. Lift/cart, vine/bee, submarine and claw now each own a unique
path and timing. Mushroom release is a real upward velocity followed by ordinary
physics; no carrier constraint remains during flight. Coaster and paddlewheel
paths each have about 140px of upward travel within their arcs. The pendulum
constraint swings on a fixed-length arm, then releases upward/right.

The eight carriers remain explicit authored machines; coaster rails constrain the
train through the loop rather than simulating wheel forces and derailment. All
capture routes clear the actual collision rails in the isolated regressions.
Original one-marble identity, four-world order and endless cleanup are preserved.
Updated drawing reduces collection-rail weight, distinguishes flower pendulums,
adds water depth and shows the coaster car's tangent and safety hoop. New release
accents use the current world's harmonic root. The desktop camera uses a closer,
stable lens; mobile retains its prior scale.

## Confirmed defects addressed

- An exhausted supporting deck could fall back to an unrelated biome act.
  Refill now defaults to the first allowed entry, with a targeted regression.

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
  checks, chapter order/cast membership, exhausted-deck regression, three seeded
  staging arrangements, 36 carrier fixtures (twelve sequences × three seeds/entry
  offsets), ball identity, continuous per-step motion, exact capture/stage/release
  ordering, distinct motion signatures, upward travel,
  clearance from all real rails during capture,
  restored collision masks and downstream handoff. Three isolated domino fixtures
  verify sleeping before marble arrival and activation by the real trip.
- `SEED_SWEEP=1 node 9108/physics.test.cjs`: passed on the final carrier
  geometry. Seeds 1–50 each ran for 60 simulated seconds. Minimum depth was 7450;
  maximum low-speed interval was 0.844 seconds. No three-second stalls, premature
  domino activation, non-finite marble state or retained-history bounds failed.
- `LONG_TEST=1 node 9108/physics.test.cjs`: passed, 600 simulated seconds each.

  | Seed | Depth | Portal crossings | Max loaded sections | Max bodies | Max cooldown keys |
  | --- | ---: | ---: | ---: | ---: | ---: |
  | 7 | 75977 | 10 | 5 | 29 | 33 |
  | 23 | 76457 | 10 | 5 | 25 | 31 |

  Both completed more than two four-world cycles without a three-second stall.
  Assertions cover retained machine/world/color/portal/impact histories and finite
  marble state. This tests bounded model state, not hours of browser heap profiling.
- Actual headless Chromium, local and deployed `/generative-doodles/9108/`:
  1440×900 desktop and 390×844 mobile emulation. No script errors or horizontal
  overflow. Opening carrier captures/releases; audio schedules only after click,
  AudioContext reports `running`; Space freezes simulation. Desktop/mobile runs
  delivered 369 desktop / 422 mobile frames over the short 7.5-second
  observation plus page/screenshot overhead, under concurrent CPU-heavy tests.
  These are environment observations, not physical-device performance targets.
- Browser input regressions additionally cover near-ball drag, pointer cancellation,
  reduced-motion initial pause, canvas gesture resume and remote pointer exclusion.
- Inspected browser renders of all eight isolated transport/launch sequences at selected capture/transport times,
  plus the desktop/mobile opening shots. Four worlds and original UI remain intact.

## Remaining limitations and further opportunities

No marble stall or premature domino activation was confirmed in the completed
runs above. This is a finite sample, not a universal guarantee.

1. Each world has five signature sequences, not eight. Add web transfer,
   real buoyancy/winch and richer chained gates. The new ticket press is a local
   three-ticket mechanism, not the reference finale or cumulative score counter.
   The existing counterweight bridge and rocking floats should not be described
   as complete cable or fluid simulations.
2. Chapter curation now excludes most of the 19 legacy modules from ordinary
   playback. Long ramps still separate many acts. Replace more of these with
   directly coupled releases and moving transfers; improve scene-to-scene
   composition before adding more related chime/peg/switchback variations.
3. Keep the same-ball authored constraint model explicit. Test real route clearance
   and downstream catches for every new carrier; never use it to recover a stall.
4. AudioContext scheduling is verified; audible mix, timbre and musical quality
   need human listening. Test Safari/iOS and physical budget Android devices.
5. Run multi-hour browser heap and background/resume profiling. Current evidence
   is short browser sessions plus ten-minute deterministic model simulations.
6. Boundary portals still mark continuous spatial crossings rather than a separate
   entrance/exit transport machine. Complete that scenic choreography without
   replacing the ball or hiding a stuck route.
