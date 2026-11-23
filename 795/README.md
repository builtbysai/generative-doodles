# № 9107 · The Last Light

[See the artwork](https://builtbysai.com/generative-doodles/9107/) · [Source](index.html)

## The story

**A tiny glowing marble carries the last light through a sleeping world.** This is not another infinite neutral-background obstacle course. The marble physically moves through three distinct environments, changing the setting and the machine's visual language as it goes.

| Chapter | What changes | What awakens the world |
| --- | --- | --- |
| **The Foundry** | Deep midnight blue, monumental industrial windows, copper/brass machinery and hanging lamps | Actual marble collisions slowly kindle the foundry lanterns and small instrument lamps |
| **The Glasshouse** | Luminous warm parchment, Victorian greenhouse roof, climbing vines, living blossoms and jade machinery | Marble impacts unfurl leaves and flowers and bring light through the glass |
| **The Observatory** | Deep indigo, crescent moon, astronomical charts, distant dome and silver mechanisms | Actual contact activates a linked constellation, one star at a time |

The colors of the **same glass marble** change with each chapter: warm ember → living green → moonlit lilac. A light ribbon follows its physical trajectory, not a generic particle emitter. Chapter boundaries create a brief in-world transition *at the marble's actual position*, without a cut or reset.

Two 1,400-unit machine sections comprise one narrative chapter. Every six sections the marble comes back to a **newly generated Foundry**. Scenery has stable seeded variations, so the cycles feel familiar but never play back a recording. Music plays a restrained original three-note cadence when the marble reaches a chapter boundary. Impact-specific tones remain tied to genuine physics contacts.

## The machine

21 rigid-body and pivoted modules (including torque-coupled belt transmission, hammer and resonant gong, contact-woken domino relay, switches, tipping rockers, chimes, stairs, rotors and peg cascades). The generator now pairs one chapter-signature module with a contrasting mechanism from the full shuffled vocabulary. This gives each environment a distinct rhythm while preserving uncertainty.

The animation is a 2D Canvas artwork. It contains no overlay title, progress dashboard, score pills, grid, card design, or disconnected animated gadgetry. Scenery is staged *behind* the real colliders; the marble only physically collides with the actual machine, not the theatrical backdrop.

## Controls

- Tap or click the artwork, or select the small **♪**, to enable sound (a browser gesture is required). Select it again or press **M** to mute.
- Drag near the ball to nudge it.
- **Space** pauses everything, including camera. **N** or double-click creates a fresh seeded journey.
- `?seed=1` reproduces a machine. `?seed=1&t=26` freezes at 26 simulated seconds (maximum 120) for inspection.

## Implementation / testing

The self-contained `index.html` holds **SIM9107** (480 Hz deterministic physics, bounded procedural generation), **CAM9107** (damped follow camera), and the Canvas/Web Audio renderer. The chapter and illumination logic is owned by the physics state, not by CSS or a fake timeline. Render decoration does not consume the physics random-number generator. Generated sections, scene events, source contacts and audio queues are bounded for long-running operation.

```sh
node 9107/physics.test.cjs
python3 -m http.server 8000
# open http://localhost:8000/9107/?seed=1
```

Regression coverage includes initial seeds, no physics NaNs/stalls, physical impact awakening, chapter traversal and return to Foundry, motor-coupled drive, real hammer/gong audio events, and sleeping domino chain activation. Mock Canvas rendering was tested for multiple seeds/times on wide and portrait displays. These checks **cannot replace visual browser playback on actual hardware or listening to the final sound design**. The latest public deployment cannot be asserted from a successful GitHub commit alone.

## Non-negotiables for further work

Keep building a **story**, not a list of obstacles. Favor carefully composed silhouettes, space, surprising interaction, tangible energy transfer, understated sound, and three sharply differentiated environments. Do not restore generic dashboards, gradients-as-UI, HUD elements, generic glows, or artificial animations that misrepresent the mechanical cause. Fix any stalled marble before expanding scope. Keep 9104, 9107's neighbors and unrelated art untouched.
