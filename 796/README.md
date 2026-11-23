# № 9108 · Marble Atlas

[Open the interactive piece](https://builtbysai.com/generative-doodles/9108/) · [Gallery](https://builtbysai.com/generative-doodles/) · [Source](index.html)

**One marble, four worlds, a changing score, no final frame.** This experiment branches the independently developed 9107 physics system into a world-based kinetic sculpture. It is a working foundation and a **work in progress**, not yet the reference video's ~100-item choreography.

## The worlds

| World | Color / mood | New functional acts |
| --- | --- | --- |
| Mechanical | Light blue, brass, counterweights | Counterweight cart, bucket launch, scissor lift/trolley, balance rig, paddlewheels |
| Garden & Nature | Warm cream, leaves and blossoms | Vine/bee, mushroom launch, frog tongue/hop, berries, flower chimes |
| Ocean & Maritime | Pale blue sea, teal and mooring elements | Rowing boat, submarine, paddlewheel boat, pearl-dye clam, buoys, coral |
| Neon Arcade & Carnival | Deep ink, precisely outlined pastels | Claw, loop coaster, roller-driven ticket press, pachinko, flippers |

The film now builds **connected procedural assemblies**, rather than placing independent acts in two fixed slots. A seed chooses the devices, travel direction, separation and height difference. The receiving machine is positioned from the source's exit geometry. The source docks and extends a real rolling bridge; the marble presses a key to unlock the receiver; loading the receiver retracts the bridge. Below them, the marble rolls across a long return deck and tips a physical spring-loaded plank, which opens the exit gate.

Each biome supplies a different transport cast: cart/scissor lift/bucket; vine/bee/frog/mushroom; rowing boat/paddlewheel/submarine/clam; claw/coaster/ticket press. The boat rows across the scene, and carriers can run in either horizontal direction. The return decks have distinct materials and spring responses; their pigment coatings transfer color only on contact. The 19 legacy core modules and other standalone biome acts remain available to fixtures, not the normal assembly generator.

A world lasts five 1400px sections. The four-world cycle repeats with freshly generated combinations, not a fixed opening/finale playlist. Progress follows **depth reached**, while individual sequences climb, traverse, roll and reverse. Unused sections and their linked mechanisms are freed behind the same continuously simulated marble.

Dimensional crossing generates a spinning localized ring at the ball's actual crossing position, changes the world rendering palette and applies a portal pigment. Contact with certain props paints the same continuously simulated marble again. These are triggered events rather than random time-based sprite effects.

Scenes have illustrated settings: workshop windows and contact-lit lamps, a growing garden and frog pond, lighthouse coast and kelp depths, and a carnival stage. Marble contact wakes the scenery. The camera keeps a stable lens and looks toward the next receiver during a transfer. The piano leaves phrase endings open for mechanical replies.

## Audio

There is no copyrighted backing track or external media dependency. An original four-harmony piano-like synthesizer plays eighth-note motifs at 110 BPM, timed from the simulation clock and scheduled with an 85ms lookahead on Web Audio's audio timeline. Each world has a distinct motif; seed and world cycle vary phrase rotation. Physics impacts create additional pitched sounds with limited stereo positioning. World crossings add a three-note cadence. The user must opt into sound; the browser cannot autoplay it.

## Controls

- Tap or click anywhere on the canvas to activate audio; the small **♪** toggles mute.
- Drag near the marble to nudge it physically. Pointer cancellation releases the nudge.
- Reduced motion starts with a still scene; tap the canvas to opt into playback, or use Space.
- Space: pause/resume. N or double-click: generate a new run. M: sound toggle.
- `?seed=7`: deterministic machine; `?seed=7&t=30`: freeze at 30 seconds for inspection, up to 120 seconds.

## Test / develop

```sh
git clone https://github.com/builtbysai/generative-doodles.git
cd generative-doodles
node 9108/physics.test.cjs
LONG_TEST=1 node 9108/physics.test.cjs
python3 -m http.server 8000
# open http://localhost:8000/9108/?seed=7
```

Do the audio test **with a real gesture and audible speakers/headphones**. Headless simulation and a mocked AudioContext cannot confirm final sound quality. The user asked **not to use TinyFish**.

The new lifts/carriers use explicit authored constraints: real contact with the loading pan captures the same marble; a mechanism-specific sequence carries it visibly; the latch opens and restores free physics onto the next rolling route. The thirteen transport/launch mechanisms have distinct trajectories and timing: angular swing, spring compression/ballistic launch, semicircular paddlewheel ride, full coaster loop, horizontal cart, winding growth/bee flight, submarine dive, and grip/lift/leftward/lower claw, scissor lift/trolley, frog tongue/hop, closing clam, ticket press and a rowing/docking boat. The clam repaints the captured marble pearl white; the ticket press earns one numbered perforation per 60px of roller travel, with a short bell accent. They are authored constraints rather than full cable/fluid/animal simulations and never activate as stall recovery. The available signature catalog is **five/five/six/five** across the four worlds; eight per world remains a target. The common relay bridge, balance and gate are not counted as three new biome-specific acts.

Current validation and confirmed bugs are recorded separately from future opportunities in [QA.md](QA.md). Optional browser checks require Playwright and Chromium:

```sh
SEED_SWEEP=1 node 9108/physics.test.cjs
node 9108/browser.test.cjs
VERIFY_SOURCE=1 BASE_URL=https://builtbysai.com/generative-doodles/9108/ node 9108/browser.test.cjs
```

## For continued Codex development

Read **[CREATIVE_BRIEF.md](CREATIVE_BRIEF.md)** first for the original long-form creative goals and *all* reference scene beats, then **[CODEX_HANDOFF.md](CODEX_HANDOFF.md)** for current capabilities, gaps, phases, strict design and QA criteria.

The project is deliberately self-contained today. If you modularize the large HTML, retain a deployment-compatible standalone `9108/index.html`. Protect 9107 from accidental changes and avoid generic UI decoration. The source MP4 was not copied into the repository.
