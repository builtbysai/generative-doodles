# 9107 · Wonderworks

A full-bleed rolling-ball sculpture. One marble descends through a growing series of distinct physical mechanisms. Unlike a looping video, its route is generated indefinitely from a seed, and sections behind the marble are freed.

[View the piece](https://builtbysai.com/generative-doodles/9107/) · [Source](index.html)

## Mechanical vocabulary

21 modules: switchbacks, lever-triggered dominoes, enclosed spinner, seesaw, gap, pendulum alley, stepped zigzag, bumper, bifurcating fork, bell alley, chime garden, diamond rain, clock stairs, ribbon gate, twin rockers, ricochet pegs, spring switch, resonant key staircase, twin transfer wheels, **belt-linked paddlewheels**, and an **open-air pendulum hammer with a sprung sounding plate**.

Each module uses real colliders, rigid bodies, or pinned spring-damped bodies. The drive has a damped angular coupling, visible tangent belt, and two collision-driven pulley wheels. A marble dropped from a short rail can strike a hammer, whose actual rigid-body contact causes a sprung gong to swing and ring. The metal keys and wheels respond to contact, not an unrelated animation clock. Dormant dominoes cannot fall before a strike; the marble triggers a counterweighted arm that wakes a seven-piece chain. A separate exit avoids wedging beneath fallen tiles.

The seeded shuffle bag tries the whole module vocabulary before repeating it, and avoids three recent acts. A single section has two different acts. The construction is always downhill with generous catcher rails and open throats between stages.

## Interaction

- Tap the small **♪** once to enable audio (browser autoplay requires a gesture). Tap again or press **M** to mute.
- Drag near the marble to exert a physical nudge.
- Press **Space** to pause/resume, including the camera.
- Press **N** or double-click the canvas to generate another run.
- Use `?seed=123` for a reproducible layout.
- Use `?seed=123&t=16` for a static inspection at sixteen simulated seconds (`t` is limited to 120 seconds).

## Structure

The single HTML file contains three modules:

1. **SIM9107:** Fixed 480 Hz substeps, circle/box/segment collision solver, impulses, friction, spring pins, and on-demand machine construction with bounded sections.
2. **CAM9107:** A stable lens following the marble with restrained velocity lead. No shot changes or automatic zoom pumping.
3. **Canvas and Web Audio:** Draws actual machine geometry, metal and wood details and the rolling marble. Collision events are buffered at physics frequency, then rendered as pitched, spatialized sounds after the user enables audio.

The simulation is intentionally a small custom 2D engine, **not Box2D**. Reference principles: [Box2D Simulation](https://box2d.org/documentation/md_simulation.html), [MDN Web Audio autoplay](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices), and [Rolling Ball Sculpture Elements](https://www.rollingballsculpture.com/post/rolling-ball-sculpture-elements).

## Regression checks

```sh
node 9107/physics.test.cjs
```

Deterministic checks cover 12 initial seeds, generation and garbage collection, sound-impact events, non-finite physics and stalls, four formerly unreliable domino approaches, coupled drive-wheel motion, and the actual hammer/gong event. Two rejected cradle prototypes were not shipped because they trapped the marble. In this revision, 100-second simulations of seeds 5, 6, and 29 advanced through 9–10 segments each, exercised every module type, used at most five loaded segments, and produced no non-finite physics events. Mocked Canvas rendering also completed on desktop and portrait-mobile sizes. These are **not** substitutes for visual review in a real browser or listening on actual hardware.

## Design constraints

Keep the work edge-to-edge. No title overlay, HUD, unnecessary controls, grid or disconnected decorative gears. New parts must either contact the ball or be a credible structural part of an actual mechanism. Favor clearly staged handoffs, distinct motion and audible cause-and-effect over quantity of parts. Never change 9104 while iterating on this separate piece.
