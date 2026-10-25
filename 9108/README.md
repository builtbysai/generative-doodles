# № 9108 · Marble Atlas

[Open the interactive piece](https://builtbysai.com/generative-doodles/9108/) · [Gallery](https://builtbysai.com/generative-doodles/) · [Source](index.html)

**One marble, four worlds, a changing score, no final frame.** This experiment branches the independently developed 9107 physics system into a world-based kinetic sculpture. It is a working foundation and a **work in progress**, not yet the reference video's ~100-item choreography.

## The worlds

| World | Color / mood | New functional acts |
| --- | --- | --- |
| Mechanical | Light blue, brass, counterweights | Hinged counterweight rig, two physical paddlewheels |
| Garden & Nature | Warm cream, leaves and blossoms | Contact-painted berry ricochet, pendulum flower chimes |
| Ocean & Maritime | Pale blue sea, teal and mooring elements | Tipping buoys, physically struck coral field |
| Neon Arcade & Carnival | Deep ink, precisely outlined pastels | Staggered pachinko pegs and hinged pinball flippers |

The 19 core mechanisms from 9107 remain available. Each generated 1400px section combines one of the two biome-specific acts with a varied core act. A world lasts five sections; the entire world cycle repeats after 20 sections with a continuing seeded act order, real ball trajectory and changing music. Biome progression follows **depth reached**, not a scripted stopwatch. The machine generates ahead and frees unused sections behind.

Dimensional crossing generates a spinning localized ring at the ball's actual crossing position, changes the world rendering palette and applies a portal pigment. Contact with certain props paints the same continuously simulated marble again. These are triggered events rather than random time-based sprite effects.

## Audio

There is no copyrighted backing track or external media dependency. An original four-harmony piano-like synthesizer plays eighth-note motifs at 110 BPM, timed from the simulation clock and scheduled on Web Audio's audio timeline. Physics impacts create additional pitched sounds with limited stereo positioning. World crossings add a three-note cadence. The user must opt into sound; the browser cannot autoplay it.

## Controls

- Tap or click anywhere on the canvas to activate audio; the small **♪** toggles mute.
- Drag near the marble to nudge it physically.
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

One simulated run (seed 7) was checked for 210 seconds: world transitions occurred at approximately 63s (Garden), 114s (Ocean), 163s (Arcade), and 204s (back to Mechanical). All 27 available mechanisms appeared in its generated sequence; at most five sections remained loaded; non-finite physics event count was zero. This is a headless simulation, **not** a real browser quality guarantee. Duration varies by generated arrangement.

## For continued Codex development

Read **[CREATIVE_BRIEF.md](CREATIVE_BRIEF.md)** first for the original long-form creative goals and *all* reference scene beats, then **[CODEX_HANDOFF.md](CODEX_HANDOFF.md)** for current capabilities, gaps, phases, strict design and QA criteria.

The project is deliberately self-contained today. If you modularize the large HTML, retain a deployment-compatible standalone `9108/index.html`. Protect 9107 from accidental changes and avoid generic UI decoration. The source MP4 was not copied into the repository.
