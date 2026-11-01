# №1178 — neural goldberg (chatter)

Jason Soliday study block SD3 (PP337), grounded in neural goldberg, his duo
with Christopher Burns: "setting up semi-autonomous systems in software and
hardware and letting them chatter away at each other with occasional
interference from us."

## The piece

Two systems face each other across a split screen (background #0D0D10,
divider #2A2A30). SYSTEM-A (left) is angular: cyan #00E5FF node-link
constellations with white node dots, each burst snapping in over 0.15 s,
with one faint re-route link reaching back to the previous burst's nearest
node. SYSTEM-B (right) is organic: magenta #FF2BD6 blobs that merge where
they overlap and split into droplet rings, with pale #FFD6F5 center dots.
They speak different languages and never share a field — the gap is the
point.

They chatter in turns of 2–9 beats (beat = 0.42 s). The burst count
cross-triggers: B splits its blob into exactly as many droplets as A's
last burst had segments; then the count is nudged by the hash stream
(±0–2, clamped 3–9) before A speaks again, so the numbers wander on their
own. About one burst in five is cross-talk, drawn in the other system's
color. Every ~37 s a seeded dropout silences one system for ~5 s — its
turns are swallowed, the floor passes quickly, and the other free-runs; a
DROPPED OUT tag appears under the silenced system's activity bar. Each
system keeps a fading field of marks (14 s lifetime, six hard alpha steps,
200-mark budget per system, oldest shed first). The header carries the
prompt's line verbatim — "semi-autonomous chatter — interference:
occasional." — plus per-system activity bars and a turn counter
("A → B ×9" at frame one).

Tapping is the occasional interference: one burst is injected into
whichever system is currently quieter (lower recent burst energy, the
same measure the activity bars show), landing near that system's own last
centroid. It does not aim, erase, restart, or alter the turn schedule.
There is no loop point and no reset.

## How it is built

- Closed-form seeded event stream. Scheduled event k is generated once,
  in time order, from mulberry32 hashes of (master seed, k): turn length,
  count chain, centroid random walk (clamped inside the field), cross-talk
  flag, mark seed. A frame at time t draws exactly the events whose age
  lies in [0, 14 s). Marks are pure data per event — A's node ring, ring
  edges, seeded chords and the re-route link; B's parent blob, ambient
  blobs, and the droplet ring whose radius eases out over ~1.1 s and
  pulses with age. No offscreen canvas, no ImageData, no canvas-fade
  trails; fades are stepped alpha computed from event age.
- Dropouts are a pure function of t (one per 37 s block, start 26–34 s
  in, 5 s long, side seeded per block), used both by the generator to
  swallow turns and by the header to tag the silent system.
- Sound: none. The piece ships silent.

## House adaptations

- The prompt's fading mark buffers (canvas alpha trails) become the
  stepped-alpha event model above — the QA renderer paints one frame, so
  trails are stored event lists redrawn per frame, per house precedent.
- First frame is a fixed phase, T0 = 17.35 s into the stream: both fields
  carry layered fading marks, a fresh B droplet burst has just landed,
  the counter reads mid-exchange. The synchronous first frame is drawn at
  that phase; the rAF loop is anchored as phase + elapsed and guarded by
  a typeof check.
- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in fit();
  phone detection via window.screen physical size (min dimension
  < 700 px) with the aspect fallback. On portrait phones the split
  stacks — A over B — and the header band grows so the centered header
  line, the counter, and the corner labels/bars never collide.
- Node dots are drawn as small rects, arcs are standalone paths (a
  moveTo before every arc) — the node-canvas batched-subpath lesson.
  No gradients, no ctx.filter, no shadowBlur, no createElement, no
  network, no microphone. Grep-verified clean (the one "ImageData" hit
  is this file's design note echoed in a source comment).

## QA

Rendered with the house node-canvas renderer at 1280×800, 390×844 and
720×720. Frame one shows the split screen, cyan constellations with
fading older bursts on the left, magenta blob clusters with a fresh
droplet ring and cyan cross-talk blobs on the right, the verbatim
header, both labels with activity bars, and the turn counter. First
mobile pass overlapped the corner labels with the centered header;
fixed by the taller stacked header band and re-rendered at all three
sizes. Thumb rendered twice at 720×720: byte-identical.
