# Codex handoff — 9108 Marble Atlas

You are continuing a **live code-art project**, not writing a proposal. Work in `builtbysai/generative-doodles`, specifically `9108/`. Do not modify `9107/` or earlier pieces. Main entry point: [index.html](./index.html); published route: https://builtbysai.com/generative-doodles/9108/.

Read [CREATIVE_BRIEF.md](./CREATIVE_BRIEF.md) in full before touching code. It preserves the source user's desired four-world, five-minute reference choreography and improvement goals. Reference: https://x.com/wustep/status/2102197062381253063. The user provided a ~301.9-second, 1920×1080 source MP4 in the ChatGPT session; it has **not** been committed to the public repository. Ask the user to attach the video to your environment only if you need frame-level comparison. Never publish its footage, soundtrack or copied assets.

## Connected procedural assemblies — latest continuation

Implementation: `bdd615e`. This supersedes the fixed chapter openings/payoffs below. Production sections now
choose two distinct carriers from a biome-specific grammar, with seeded continuous
spacing/height and reflected left/right geometry. The source exit determines the
receiver location. Do not restore independent two-slot V-funnel composition.

Causal order: loading-pan contact → source transport → docking → bridge extension
→ free rolling → actual pressure-key contact → receiver unlock/capture → bridge
retraction → receiver release → real spring-pinned return plank → exit gate.
The plank must receive a collision and physically rotate before it can open the
gate. A receiving stop and short jump separate the feed rail from its full swept
shape; the old overlapping connection pinched seed 7 after six minutes.
No event is activated by a stall timer. No marble replacement or recovery teleport.

New module 39 is a rowing/docking boat (13 carrier kinds, 40 modules available).
Oars derive their stroke from traveled distance. This is explicit authored
propulsion, not a fluid solver. The gate and telescoping bridge are also authored
actuators whose triggers come from contact/docking state. The return plank itself
uses ordinary rigid-body impulses, spring torque, damping and hinge stops.

Capture now stores the actual seat offset and eases it into the loaded cradle;
the carrier no longer jumps to the impact point. Advancing stages resets progress
to zero for rendering. Coaster loop joins share tangents, and its orientation
follows the rail without angular lag. A stable camera lens avoids capture/release
zoom changes. Mirrored ticket presses earn perforations from signed local travel.

`S.relay` owns the source, receiver, pressure key, extending rail, return plank and
exit gate. All references are freed with the section. `stepRelays` updates actual
rail endpoints and gate collision geometry; a fully retracted zero-length rail
has no collision mask. `buildEndless(seed, fixtureAct)` retains the older isolated
fixture layouts for regression testing; those are not the production generator.

Tests check the full contact chain and prohibit bypassed receivers/gates, along
with seeded geometry variation, captured-route clearance, capture/stage visual
continuity, upward/free-rolling distance, bounded state and dormant legacy dominoes.
See [QA.md](QA.md) for final measurements and [RESEARCH.md](RESEARCH.md) for the
primary sources and playback findings behind this change.

Next priorities: more than one connected assembly topology per biome; richer
physical couplings and rolling corners; closer physical-device and listening QA.
The signature catalog is 5/5/6/5, not eight per world or the reference's ~100 acts.

## Story and composition — 26 October 2026

Implementation: `c562883`. This pass supersedes the random supporting-deck composition below. Four
five-scene chapters have fixed beginnings/payoffs and three seeded middle orders:
workshop → bucket launch; garden → mushroom leap; coastal ocean → pearl clam;
carnival → ticket press. The same continuous marble drives every chapter.
Support selection is restricted to each biome. Fixed a refill fallback that could
otherwise select an unrelated act when all allowed acts were recently used.

Carriers now occupy three possible horizontal homes. Their renderer translates
the exact same geometry as the constraint. Removed the unused receiving bank
from both physics and drawing; long connecting rails have quieter linework.
The desktop camera eases closer during capture. Contact awakens illustrated
settings; the garden grows across its chapter, the ocean moves below water,
and the frog has an articulated hop, a rooted lily pad and a landing pond.
The clam has a scalloped shell and seabed cradle. Piano phrase endings leave
space for collision replies. No new mechanism count is claimed in this pass.

Tests now assert chapter openings/payoffs, supporting-cast membership, seeded
staging variation and collision-enabled release even when a second carrier is
entered during a fixture. See QA.md for measured runs and deployment verification.
Next: make transitions between neighboring acts more directly causal and less
reliant on long ramps, then expand the distinct cast toward eight per world.
Human listening, physical-device QA and multi-hour browser heap profiling remain.

## Further mechanisms — latest continuation

Implementation commit: `2fac500`. Five signature acts per world; 39 available modules. IDs 35–38 add scissor lift /
traversing trolley, frog tongue / hop / release, clam closure / pearl dye / ejection,
and a roller-driven ticket press. These remain contact-latched authored constraints.
The press advances three numbered perforations from marble travel, with bounded
physical-event records and bell accents; it is not an accumulated game-score finale.
The clam's pigment event occurs only after capture and closure.

The normal suite now exercises 36 fixtures and twelve distinct motion signatures;
adds clam-dye and exactly-three-ticket assertions; retains route clearance,
continuous movement, identity and release checks. See QA.md for current runs.
Next priorities remain spatial composition and pruning related legacy supporting
acts, plus reaching eight signature acts per biome and physical-device/listening QA.

## Motion and drawing update — next continuation

Feature commit: `d6f61c0` (subsequent QA/gallery documentation follows in git history).
The world now has **four signature acts per biome**, 35 available modules total.
New fixture IDs: 31 bucket pendulum, 32 mushroom, 33 paddlewheel boat, 34 coaster.
`MOTION` defines variable-length sequences and `machinePose` supplies their shared
simulation/render geometry. The eight transport mechanisms now have different
trajectories/timings, not a recolored common path. The 19 legacy supporting modules
remain; several still share too much downward/funnel vocabulary.

New acts add angular swing/release, spring compression and real upward ballistic
launch, semicircular wheel transport, and a complete coaster loop. The claw travels
left after closing/lifting; rooted flower and curved bee flight separate; submarine
uses curved dive/surfacing. Coaster car rotates with the track tangent. Collection
rails are quieter, garden pendulums have flower silhouettes, ocean has a waterline
and depth wash, and the fixed desktop lens is closer. Release accents follow the
current world harmony. Gallery thumbnail now depicts working new mechanisms.

Tests cover 24 isolated transport fixtures, unique motion signatures, upward travel,
no captured ball crossing real rails, restored collisions and downstream handoff.
Normal, 50-seed sweep and both ten-minute runs passed; see updated [QA.md](QA.md).
Remaining: four more signature acts per world; stronger scenic composition and
fewer repeated supporting funnels; physical ticket counter; human audio and device QA.

## Continuation update — 25 October 2026

This update supersedes the older baseline counts below. Implementation commit: `9978c0b`; subsequent craft/QA/documentation changes appear after it in git history.

- Added four contact-latched, three-stage sequences: **lift/cart, vine/bee, submarine and gantry claw**. Each world now selects among three signature sequences, alongside the 19 shared modules (31 modules total). This is not eight signature acts per world or the reference's ~100 setpieces.
- A solver contact with a loading pan creates an explicit carrier constraint on the existing marble. `stepMachines` advances a continuous path, logs capture/stage/release, then restores collision masks and free motion. No stall-triggered recovery or ball replacement. Captured balls deliberately bypass ordinary collision resolution; routes must therefore be checked for clearance when edited. This is authored actuation, not a full cable or fluid simulation.
- Machines are stored in `w.machines`, owned/removed with sections. `buildEndless(seed, fixtureAct)` optionally puts a chosen module in section zero for isolated tests; production calls only pass seed. Current carrier module IDs: 27–30.
- Fixed remote pointer grabs and stale nudges on cancellation/blur; reduced-motion mobile users can tap the canvas to start. Bounded world history at 12 entries. Guarded empty box-contact clipping.
- Piano retains the original harmony, with four distinct motif shapes, deterministic seed/cycle phrase rotation and 85ms Web Audio lookahead rather than stacked overdue timestamps. Listening quality still needs a human headphone/speaker check.
- Mechanism regressions assert real capture, ordered stages, continuous motion, identity, restored masks and downstream progress, plus dormant/triggered domino cases. `SEED_SWEEP=1` checks 50 seeds for 60 seconds; `LONG_TEST=1` checks seeds 7/23 for 600 seconds each and two full world cycles.
- `browser.test.cjs` uses actual Chromium at desktop/mobile viewport sizes to verify gesture-gated audio scheduling, progression, frame delivery, no overflow/errors, pause, near-ball drag, pointer cancellation and reduced-motion resume. It can target the deployed page using `BASE_URL`.

Read [QA.md](QA.md) for exact measured results, unresolved limitations and next priorities. Do not interpret bounded ten-minute simulations as hours of measured browser heap stability, or emulated mobile Chromium as a physical Android/iPhone test.

## Non-negotiable visual direction

The original reference succeeds through **legible chain reactions**, a clear single-ball protagonist, clean flat geometric shapes with precise outlines, consistent world palettes and synchronized music. Make a more sophisticated kinetic artwork: better silhouettes, composition, material rhythm, playful anticipation, varied world-specific mechanical behavior and seamless transitions. Prioritize the *actual pieces and movements*, not UI decoration. No large header, cards, gradients, generic game HUD, fake score spam, sci-fi glass panels, particle fog, ornamental gears or gratuitous typography. Avoid 'AI slop'. No page scrolling. Mobile responsive, stable and beautiful on desktop.

**The ball must physically interact with mechanisms**. Avoid disconnected prop animations. Novelty isn't merely a random number generator. Use causality: approaching marble → contact/sensor/lever → actuation → earned handoff → controlled descent. Where literal mechanics are infeasible (flying carriers, portals, time-varying conveyors), make a clear finite-state machine that controls transfer and show it in-world. Do not secretly teleport when the ball gets stuck.

## Baseline already committed

The 9108 file was copied from proven 9107's custom 2D engine, preserving 480 Hz substeps, circle/box/segment contact resolution, spring-pinned arms, fixed camera, seeded world generation, play/pause and drag-nudge, event-buffered audio, domino sleeping/trigger and old-section cleanup.

Work completed in this ChatGPT session:
- Four environments: **Mechanical** (pale blue), **Garden** (warm ivory), **Ocean** (coastal blue), **Arcade** (deep ink/neon).
- Worlds advance every five generated 1400px sections (20-section round trip), then repeat. Per-world background/rail/stage cues are tied to actual generated section coordinates.
- Swirling illustrated boundary portals where the new world's physical funnel begins; the ball carries its identity across boundaries.
- Eight new physics-driven biome acts, in addition to 19 inherited core modules:
  - Mechanical: counterweight balance rig, linked paddlewheels
  - Garden: four berry ricochet/dye pegs, hinged flower chimes
  - Ocean: rocking buoy bridge, coral cascade/dye
  - Arcade: pegboard/pachinko and paired elastic flippers
- Each generated section contains one world-specific act and one shared act. Additional structures inherit the old safe open-throat funnels.
- Ball's pigment changes on actual dye-object contact and at the dimensional portal threshold, with a brief localized ring. Its color is rendered in the marble shader.
- An **original** generative piano-like Web Audio score follows simulation time at 110 BPM eighth notes. Harmonic palettes change between worlds. Real collision impulses add per-part sounds, with stereo pan; portal crossing adds a small cadence. Autoplay is off until user taps canvas or the small sound mark.
- Gallery entry and separate `9108/thumb.svg` are committed.
- A dedicated `CREATIVE_BRIEF.md` documents **every** named scene in the reference as a creative and engineering backlog.

**Important honesty:** This is an interactive first generation, **not** an authored reproduction of the reference's ~100 unique actions. Most of the listed crane/lift/submarine/frog/UFO/Tetris/ticket examples are not yet built. The new mechanisms share a common route vocabulary; they need more distinct actual silhouettes and handoff behaviors to reach the reference's density. The piano is synthesized, not a recorded acoustic instrument or transcription. Cross-browser visual and audible playback has not been independently confirmed. Never report those as tested until verified.

## Implementation plan (execute, don't just describe)

**Phase A — reliability before expansion**
1. Run deterministic physics tests, observe the app visually on desktop and mobile browsers, and play with sound enabled.
2. Fix all wedging, one-way routing errors, off-screen camera behavior, low-FPS drift and audio unlock issues. A headless simulation alone is not enough.
3. Maintain bounded active sections, impact histories, oscillators and visual events for **hours**, not minutes.
4. Check sampled seeds 1–50 for first-minute progress; a few seeds through two complete four-world cycles. Record stall and completion stats.
5. Ensure the exact `?seed=...` parameter makes scene order, physical geometry, dye interactions and musical phrase deterministic, not just the opening track.

**Phase B — make each world recognizable from a silent screenshot**
1. Mechanical: functioning lift/crane or counterweight conveyor, bucket pendulum, hinged drawbridge, four-blade turnstile, physical spray station, rolling cart/cannon, piston, timed spring, bell.
2. Garden: vine growth lift with an authored mechanism, flower petal bounce, bee carrier, spiderweb slingshot, mushroom springs, watering/sprinkler, frog-tongue lift, wheelbarrow and croquet strikes. Distinct botanical craft, not just teal bars.
3. Ocean: buoyancy, hinged floating docks, sailboat/mast transfer, whale spout, crab claw, paddlewheel, anchor winch, submarine transport, clam dye, fishing net; above/below-water composition.
4. Arcade: pinball bank/flipper/popper, slot reel, basketball basket, spring tower, scored targets (localized and earned), claw picker, Whac-a-Mole, falling tetromino gate, coaster, Ferris carrier, pinball lift, ticket countdown that **restarts a freshly seeded world cycle**.
5. Finish each new mechanism with its own visual identity, working interaction, animation states if necessary, and safe handoff into the shared funnel. Make every act work in isolation with a seed. Include regression coverage.

**Phase C — world portals and journey**
1. Portal must be a readable *cause-and-effect* transfer, not just an oval painted behind the ball: enter ring, clear exit, wrap or offset world coordinates as appropriate, preserve one ball and audio beat, reframe camera.
2. Build mini-arcs of varied pacing: tiny clicks, suspenseful catches, rising lifts, rapid cascades, satisfying release. Avoid 20 sections of identical downward ramps.
3. Make the world cycle endless while changing composition and harmonic development each pass, with adaptive pacing and counterweight/elevator *upward* moments. No hard reset at 5:02.
4. Color transformations should occur through visually unmistakable machinery; dyes and actual contact events must agree.

**Phase D — score/audio**
1. Keep original melody (copyright-safe). Compose proper four-world phrases with voice-leading, chord progression, recurring leitmotif, call-and-response and musical cadences across portals.
2. Schedule with `AudioContext.currentTime` lookahead, not loose display-frame intervals; account for pause, tab suspension, mobile audio resume and the difference between audio and simulation clocks. See MDN Web Audio.
3. Couple important triggers to beats where possible without faking contacts. A physical impact can trigger a musical accent; a scored/sensed mechanism can wait for the next downbeat *after* the actual trigger.
4. Balance music, mechanical clicks, bells, and silence. Test real speaker/headphone playback. No autoplay before gesture.

**Phase E — maintainability/performance**
1. Break apart the giant HTML only with a deploy-safe bundling workflow; GitHub Pages/build still needs `9108/index.html` to work. Prefer meaningful modules for simulation/renderer/generator/audio/worlds.
2. Support seed fixtures and replayable events for reproducible QA.
3. Render only on-screen sections, cap particle count, avoid O(n²) checks where safe and profile Canvas on budget Android hardware. Prefer authored SVG/path shapes to blurry shadows.
4. Respect reduced-motion preference and don't hijack gestures needed to exit the page. Keep the unobtrusive single sound control; keyboard controls are optional, not HUDs.
5. Update `pieces.json` and `9108/thumb.svg` only when the art meaningfully changes.

## Acceptance conditions

- A single visible marble journeys without disappearances through **all four** differentiated worlds in the right order, then through new iterations without repeating a frozen reel.
- Each of the four worlds contains at least **8 visually distinct, functional kinetic acts**, plus varied common transitions.
- Each act must visibly cause the next movement; color changes are triggered by collisions or authored environmental events, not arbitrary timer cues.
- Portal arrival and departure are visually complete; score transitions are smooth.
- Each world contributes a recognizable musical phrase, with readable percussion synced to actual impacts.
- On desktop and mobile, no blank frame, unreasonable camera jitter, stuck dominoes, unintentional scrolling or inaccessible critical controls.
- Tests run for many seeds through long periods, including second-cycle world transitions; bounded memory and stable physics.
- Never claim the site is live merely because the GitHub commit succeeded. Verify deployment separately. Give accurate summary and commit references.

## Immediate practical commands

```sh
git clone https://github.com/builtbysai/generative-doodles.git
cd generative-doodles
node 9108/physics.test.cjs
python3 -m http.server 8000
# open http://localhost:8000/9108/
# use ?seed=7 ; enable ♪ using a real click
```

Start with a thorough source/behavior audit, fix concrete issues, then implement one **excellent mechanically convincing example per world** (e.g. drawbridge lift, flowering vine sling, functioning paddlewheel, pinball machine) before multiplying parts. Do not merely recolor existing pieces. Build, test, deploy, visually verify. Preserve everything user approved about UI minimalism. The user explicitly asked not to use TinyFish; do not use it.

The exact user video remains a reference, not a source-code dependency. Cite ideas and build a distinct original work.
