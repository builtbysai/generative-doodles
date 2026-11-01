# No.962 — Follower

Study #118 lauren-lee-mccarthy, PP123. After FOLLOWER (2016): a service that
sends a stranger to follow you for a day, leaving you with a single photograph.

## Concept

A white dot — the followed — wanders an abstract night city for one six-minute
day. It is never alone: a follower walks its exact route 14 seconds behind.
The follower has no body and is never drawn. It exists only as its trace, a red
polyline replayed from the followed's own path history, fading from 0.9 alpha
when fresh to 0.1 after three minutes. The trace is the only red thing in the
world, and it is meant tenderly, not as a threat: surveillance as care, the
record as the relationship.

Periodically (every 50–90 seconds) the followed looks back. For five seconds
the trace hides entirely, and the stretch of path the follower covered during
the glance is permanently erased from the record — when the trace resumes there
is a visible gap in it. At the end of the day everything freezes, a white flash
fires, and a white-bordered frame stamps the frozen moment for four seconds:
the only photograph. Then the city reseeds and a new day begins.

Interactions follow the prompt: tap = look back (the trace hides, a gap is cut);
drag = redirect the followed to a new waypoint (the follower re-routes behind
it, the tail never breaks); double-tap = take the photograph now and start a
new day. Sound, after a first gesture only: a low city hum, the followed's
footstep ticks with the follower's echoing a beat behind, the hum dropping out
for two seconds at a glance (a held breath), a shutter snap at the photograph.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. The script
  is deterministic: a mulberry32 seeded stream (base seed 962123, offset per
  day index) builds the city and drives every random choice.
- City: an 8×8 lattice of intersections over a 1000×1000 virtual world, inner
  nodes jittered by the seed, edge nodes pinned so the lattice fills the frame.
  Streets are drawn as thick polylines through the lattice rows and columns in
  #23262E on ground #101116; blocks are the ground showing between them. No
  labels, no real map.
- The followed walks the lattice graph: waypoint targets are chosen by seed,
  routed by breadth-first search, walked at a constant 46 world units/s in the
  fixed-timestep simulation, with seeded pauses at some corners and longer
  lingers at destinations.
- Simulation: fixed timestep of 1/120 s, run as pure state (position, path
  queue, pause timer). The followed's position is recorded every step into a
  per-day Float32Array history. The follower's position at time t is the
  followed's recorded position at t − 14 s, read back with linear interpolation.
  The trace is drawn from that history over a 180 s window, sampled every
  0.12 s, stroked in runs of equal quantized alpha.
- Frame one is the synchronous draw after exactly 5400 fixed steps (45 s of
  day one), so the trace is already developed, the dot has walked 14 s beyond
  the trace's fresh end, and the day-arc is about one eighth advanced. Nothing
  in frame one is derived from the wall clock.
- The day-arc is a thin cyan stroke (#4FD6FF at 0.5 alpha) on a circle just
  inside the frame edge, sweeping a full turn per 360 s day.
- Photograph: when day time reaches 360 s (or on double-tap) the sim enters a
  4 s photo phase: the scene freezes, a white flash decays over 0.4 s, and a
  2 px white border inset 9% from the frame edge is held. Then the day index
  increments and the city, walk, and trace are reseeded and cleared.
- Tap vs double-tap: a tap queues a look-back event 0.35 s of piece time ahead;
  a second tap inside that window cancels it and queues the photograph instead.
  All queued events are consumed by the simulation in timestamp order.
- Audio is lazy: an AudioContext is created only inside the first pointerdown,
  everything typeof-guarded and wrapped so the piece renders and runs in
  complete silence where audio is unavailable. No microphone is ever used.
- House rules observed: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height pinned
  in px on every draw; phone detection from `window.screen` physical size
  (min dimension < 700 px) with the `h > w*1.15` aspect fallback; the dark page
  ground is the piece's own ground color at every size; requestAnimationFrame
  is typeof-guarded and the live loop advances the same fixed steps, capped per
  frame; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; no
  visible text anywhere except the `<title>`.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), and 720×720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with `cmp` —
  identical. The duplicate was deleted.
- Desktop and thumb: dark street lattice, one white dot on the left edge mid
  wander, a red trace ribbon snaking from the lower right up the east side and
  west along the top street, ending 14 s of walking behind the dot, fading
  gently toward its oldest end; the cyan day-arc begun at the top. No follower
  body anywhere — only the trace.
- Mobile: the lattice stretches to the tall frame, trace, dot, halo, and arc
  all present, nothing clipped.
- A throwaway debug render (in /tmp, not shipped) verified the model numbers
  directly: after the preroll, dayT = 45.00, the followed sits at the position
  the trace implies, and the trace's fresh end is exactly the followed's
  position 14 s earlier.

## Deviations

- The followed carries a faint halo (a flat low-alpha disc and hairline ring)
  so the eye can find a 3 px dot on a dark city. The prompt says the followed's
  mark is "just the dot"; the halo is drawn in the followed's own color at
  0.08–0.22 alpha and reads as a location cue, not a second element.
- The follower's lag is implemented as a pure time delay on the followed's
  recorded path (the prompt's own "position lagging N frames behind" model),
  fixed at 14 s rather than a frame count so it is identical at any frame rate.
- Footstep ticks are distance-based (one per 16 world units walked) instead of
  per-step; the follower's echo tick is scheduled 0.23 s after the followed's,
  an audible "beat behind", rather than a literal 14 s echo which no listener
  could connect to its source.
- A tap's look-back is delayed 0.35 s of piece time so that a double-tap can
  pre-empt it; this is the standard tap/double-tap disambiguation and is
  invisible in practice.
