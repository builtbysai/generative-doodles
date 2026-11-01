# №1190 — Ice Cream Truck at Channel 19

Jeff Kolar study block JK7 / PP349, grounded in Ice Cream Truck Songs and Channel 19 (2018): the ice-cream-truck jingle repertoire and the CB band as found material — "mundane sonic nuances of everyday electronic devices," sent through a transmission chain and degraded by distance.

## The piece

A dark city-block grid (#0E0E11, block lines #222228). A tiny ice-cream-truck glyph — orange box body (#FF8A00) with a white/pink striped awning (#FFFFFF / #FF2B6E), cab window, wheels, a roof antenna and a tiny "CH 19" band marking — drives a slow figure-eight route (one lap = 90 seconds, route traced faintly on the grid). Every 4-second bar the antenna broadcasts a music-box motif: 8 note-dots (#FFE14D) that arc above the truck at seeded pitch heights, one every half second.

Three CB receivers sit fixed at three corners of the grid. Every note also flies from its emission point to each receiver in a straight line, at a signal speed of 0.55 field-widths per second, and on arrival the receiver replays it — degraded by its distance class, which is fixed per receiver because the corners hold stable typical distances to the route:

- **NEAR** (#00FFC2, top right): clean replay — every note, full dot, full brightness.
- **MID** (#C77B3F, bottom left): drops every other note — only the even notes replay.
- **FAR** (#4D9FFF, bottom right): stretched and detuned — notes land as horizontal smeared ribbons with seeded pitch jitter, at reduced alpha, lingering longer.

Dragging across the grid raises a temporary **building**: a dark rectangle that lives 6 seconds (fading over the last 2). A note whose straight-line path to a receiver crosses a live building arrives one fidelity step worse — NEAR starts dropping notes, MID smears, FAR smears fainter and with gaps. The truck cannot be steered and the motif cannot be chosen; the viewer can only build in the signal's way.

## Method

- The truck is a pure function of time: position on a Lissajous figure-eight (`x = cx + A·sin u`, `y = cy + B·sin u·cos u`, `u = 2πt/90`), heading from its analytic derivative, drawn rotated in local coordinates and flipped upright on leftward legs so the glyph and its CH 19 marking stay readable. The antenna tip pulses on each half-second emission.
- The motif is hashed, never stored: note *j* of bar *k* gets its pitch level (0–4) from an integer hash of (bar, note). Each note's emission origin — the truck's position at its emission moment plus its arc offset — is recomputed in closed form every frame, so flights and replays are pure functions of *t* given the building list.
- Transmission is per note per receiver: travel time = emission-to-receiver distance / signal speed; before arrival the note is a yellow dot on the straight segment, after arrival it joins the receiver's replay arc (2.4 s life for dot fidelities, 3.0 s for smears, with stepped fades). Occlusion is decided per note at its emission time by sampling its segment against the buildings then alive.
- Degradation classes are fixed per receiver (NEAR clean / MID drops / FAR smear), with buildings adding exactly one dynamic step, capped at a fourth state (faint smear with gaps).
- Drag buildings are an event list (capped at 12, minimum 8 px) with birth times in piece-time; the in-progress drag rectangle is drawn live and committed on release.
- Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; CSS size pinned every frame; phone detection via `window.screen` with aspect fallback; all glyph sizes scale from min(W,H)/720 so the composition holds on phones.
- The first frame is drawn synchronously at a fixed phase, T0 = 26.4 s — truck mid-route on the right lobe, bar 6's motif arcing above it with its later notes still in flight to all three receivers, NEAR replaying a clean cyan arc, MID showing sparse amber dots, FAR mid-smear. The animation loop is anchored to that phase plus elapsed time and is guarded by a `typeof requestAnimationFrame` check.
- No gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas, no audio: the jingle is drawn, never heard.
