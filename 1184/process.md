# №1184 — Signal Territory

Jeff Kolar study block JK1 / PP343, grounded in RANGE: Local, Distant, Fringe (2012, with Meredith Kooi): "signal strength broadly delimits that station's territories — economic, political, and technical dimensions of the electromagnetic spectrum."

## The piece

One transmitter (signal orange, #FF6A00) sits at the exact center of a black spectrum field (#0B0E13) and divides it into three territories, drawn as the study specifies: LOCAL, a crisp circle at 25% of the half-width; DISTANT, a wobbling ring at 55%; FRINGE, eight broken blue dashes rotating slowly out to the edge.

Four hundred signal-particles drift over the field, and each one's look is dictated entirely by which territory it currently occupies:

- **LOCAL** (#FFD9A0): a sharp bright dot with a clean two-step trail.
- **DISTANT** (#C77B3F): a weak amber dot whose alpha stutters in seeded steps.
- **FRINGE** (#4D9FFF): a small fragment that blinks into existence only on rare frames (a seeded hash admits it roughly 30% of half-second steps).

Every 4 seconds the transmitter pulses: a single ring expands to the edge of the field. A particle caught in the pulse band renders one territory *up* for that frame — fringe fragments briefly hold together as distant dots, distant dots shine as local ones. Dragging a finger or pointer across the field lays down an **interference shadow**: temporary dead-zone discs (3-second recovery) inside which particles drop one territory *down* — locals stutter, distants fragment, fringe particles go silent. The transmitter itself never moves; there is no control over broadcast power. The territory gradient is the piece.

## Method

- Particles are pure functions of time: each has a seeded base position and drifts as `base + A·sin(w·t + p)` per axis, with small amplitudes and slow frequencies, so every particle wanders its own patch forever and frame one is reproducible. Territory is recomputed per frame from the drifted distance to center; LOCAL trails are the same function evaluated at t−0.3 and t−0.6.
- The distant ring's wobble is `sin(angle·7 + t·0.7)·3px`, drawn as a polyline; the fringe ring is dashed arcs. The pulse is `(t mod 4)/4` mapped to a radius with fading alpha.
- The interference shadow is an event list of drag samples (capped at 60, sampled at most every 60 ms); particles within 46 px of a live sample are demoted, and the discs themselves are drawn faintly so the shadow reads as a hole in the coverage.
- Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; CSS size pinned every frame; phone detection via `window.screen` with aspect fallback, and the field stays a centered square on phones.
- The first frame is drawn synchronously at a fixed phase, T0 = 6.3 s (pulse ring mid-field, all three territories legible); the animation loop is anchored to that phase plus elapsed time and is guarded by a `typeof requestAnimationFrame` check.
- No gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas, no audio: the broadcast is drawn, never heard.
