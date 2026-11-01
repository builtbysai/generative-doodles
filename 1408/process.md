# №1408 "Selby Circle" — christine-sun-kim CS1 (PP631)

A wooden board lying flat, filling the frame, where blue ink is shaken into being.
Quills, nails, and cogs skitter across the surface on invisible vibration, leaving
splatter trails, and the board slowly fills with a Pollock-like field that is
actually a recording, not a gesture.

## What you see

- Board wood #a8805a fills the frame edge to edge, seen from directly above,
  with seeded flat grain strokes (umber / dark wood / pale wood).
- 15 vibration objects: 5 quills (tapered white vanes with a dark shaft and an
  ink stripe), 5 nails (steel shanks with a head and a point), 5 cogs (toothed
  steel discs with a wood-colored hub). Objects start near the edges and wander
  the whole board on slow closed-form paths.
- Ink in #1f5fb8, #7aa8d8, and powder #e8e4da, as small flat splatter stamps.
  The field is denser toward the center and thinner at the rim, both at frame
  one (pre-seeded, center-weighted) and at steady state (every driver pulse
  also drops center-weighted stamps).

## Motion (all closed-form over piece time and recorded events)

- Low-frequency driver pulses on a 3.2 s cycle. Objects jitter, hop, and rotate
  on seeded sine functions scaled by the driver; each pulse peak drops fresh
  splatter at every object's position.
- Ink never washes off and there is no wipe or reset: stamps accumulate, and
  only the oldest marks fade, slowly (full strength to age 60 s, fading out by
  age 180 s, stored-history decay, never canvas-fade).
- Drag across the board turns up the driver locally: a Gaussian gain field
  (sigma 0.13 of frame, 6 s age decay) around recorded drag samples scales the
  jitter amplitude of objects currently near the drag, and boosted objects
  throw extra splatter stamps at the next pulse (up to 4 per object near a
  drag, vs 1 normally).
- No audio: the vibration is visible, per the prompt. No visible text except
  `<title>`. No click-to-reload; drag is the only interaction.

## Adaptations

- Prompt "jitter physics" and "drift physics" become closed-form seeded sine
  functions driven by the low-frequency oscillator — no simulation, no
  frame-integrated state, so frame one and every loop are reproducible.
- Prompt "accumulating bottom gradient" has no counterpart here; the analogous
  accumulation (ink stamps) is flat-alpha stored history, never gradients.
- Drag gain is read at each object's CURRENT wander position, not its edge
  base, so the drag turns up exactly the objects near the drag wherever they
  have roamed (fixed during QA: the first build read gain at base position,
  which made mid-board objects nearly unresponsive to a mid-board drag).
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque); dots drawn as
  filled rects; every arc its own beginPath; no batched ellipse subpaths.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, or getUserMedia. Shadows are flat-alpha offset
  rects. rAF loop is a plain function declaration behind a typeof guard;
  frame one is `draw(0)` via a boot flag and the clock starts only with the
  rAF loop. Canvas sized from the Visual Viewport API and pinned in draw();
  phone detection via window.screen with aspect fallback; field-like
  composition goes full-bleed on phones. All randomness from mulberry32
  (seed 1408000), never Math.random.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): two fresh instances byte-identical at
  t=0; center ink density 0.0161 vs rim 0.0044 at t=0, and 0.0155 vs 0.0085 at
  t=200 (center stays denser as oldest marks fade); total ink grows over
  time (1700 sampled px at t=0 to 2382 at t=200 — accumulation, never a
  wipe); a dense grid drag changes object positions in all three frame
  thirds pre-pulse (0.0281 / 0.0091 / 0.0268 sampled diff), while two
  undragged instances are identical (0.0000 control).
- Fix rounds during QA: (1) wander amplitudes widened so objects roam the
  whole board instead of hugging the edges, with positions clamped on-board;
  (2) per-pulse center-weighted stamps added (10/pulse) after the t=200 probe
  showed the field going rim-dense once pre-seeded marks faded; (3) drag
  gain moved from base position to current position (see above). All renders
  re-done after each fix.
