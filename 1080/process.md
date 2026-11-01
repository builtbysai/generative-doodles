# №1080 "Six Hundred Kilos" — Tatsuya Ishii study block TI1

Syn's large mobile wall as a pure piece. A 7.6×4 m wall hangs from a barely
visible ceiling rail in a dark gallery and advances toward the viewer like
freight, carrying a pulsing blue sphere over a cyan wireframe grid horizon.
Tiny audience silhouettes sit far below. Watch-only; no interaction, no audio.

## How it works

- **Closed-form in t throughout.** Wall depth comes from a piecewise-linear
  60 s program: 0–45 s advance at constant speed (never eased — the wall moves
  like freight, not a camera), 45–50 s hold, 50–60 s retract. Wall width runs
  0.50→0.84 of the frame and height follows the real 4:7.6 wall ratio, bottom
  edge riding the floor line, so the advance reads as changing volume.
- **Sphere heartbeat.** A 4 s periodic pulse with sharp attack and slow decay
  plus a softer second thump (lub-dub): scale 1.0–1.06 and glow breathing,
  slow, never a flash. Glow is layered flat-alpha discs of #4A7DFF — no
  gradients anywhere.
- **Grid.** Perspective fan lines from a vanishing point on the wall face plus
  horizontal rows whose scroll offset is a closed-form function of t, so the
  grid floor streams toward the viewer. Clipped to the wall face.
- **Floor reflection.** The wall drawn flipped and squashed in fading strips
  at 0.25 alpha, a squashed sphere glow beneath its source, and a few mirrored
  grid lines at very low alpha.
- **Audience.** Two seeded rows (mulberry32, seed 1080) of tiny head-and-
  shoulder silhouettes in #05070C along the bottom.
- **Rail and hangers.** A thin rail line near the top edge; three hangers drop
  from it to the wall's top edge and track the wall as it advances.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via window.screen physical size (min < 700) with aspect fallback.
  The composition is a centered square stage on the void-colored page ground,
  so the wall keeps its middle-third placement on phones.
- Determinism: the first frame is drawn synchronously at the fixed phase
  t = 20 s (wall mid-advance, sphere mid-beat); the rAF loop is guarded by a
  typeof check and anchored as phase + elapsed.
- No audio (none specced), no interaction handlers, no visible text beyond
  the <title>, no gradients, no offscreen canvas, no ctx.filter, no
  shadowBlur, no createElement.

## QA

- Rendered with the house renderer at 1280×800, 390×844, and 720×720.
- Thumb rendered twice at 720×720 and byte-compared with cmp: identical;
  duplicate deleted.
- Frame one: near-black blue void, rail line at top with hangers, dark wall
  face mid-frame carrying the glowing blue sphere above the cyan wireframe
  grid, faint floor reflection below, tiny black audience silhouettes along
  the bottom. Mobile keeps the same composition, nothing clipped.
