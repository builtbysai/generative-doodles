# No.684 - Whistling Vessel

EXPANSION #83 lachimuchina, prompt block 4 "Whistling Vessel". The ensemble's
whistling-vessel mechanism made visible: water level displaces air, and the
displaced air becomes pitch. Where No.675 (EXPANSION #82 clemente-mckay) was
the physical instrument - a two-reservoir tilt-to-pour huaco with cutaway
gauges, slosh physics and mist puffs - this piece strips the physics to a
single state variable and makes the sound itself the subject: a ribbon of
pitch rises from the spout, drawn by the same level that would set the tone.

## Concept

A large burnished-clay vessel with a stirrup spout (Andean profile, no
European teapot styling) sits on a faint water-table line against a dark
ground. A cutaway through the body shows the water standing inside it and
the air chamber above. From the spout mouth a pale ribbon curls upward and
dissolves: low water sends it thin and high, high water makes it thick,
low and tightly curled. Dragging vertically pours - down raises the level,
up lowers it - and while the level moves, a quiet breathy sine whistle
sounds at the pitch the ribbon is drawing. Idle, the level breathes slowly
and the ribbon stays alive; the piece never makes a sound on its own.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets, no
  visible text except the title. Strict six-color palette: vessel clay
  #A4552F, vessel shadow #5E2F1B, engobe band #E4D3B8, water #3E7C8C,
  pitch ribbon #F5E9C8, background #14100F.
- One parameter drives everything: w, the water level as a fraction of the
  body interior, integrated at a fixed dt of 1/120 on an anchored clock.
  Pointer gestures are recorded as timestamped events and consumed by the
  step loop, so the state at any elapsed time is a pure function of the
  event timeline. Frame one is the synchronous draw at t = 0 with w at its
  rest value 0.5; no frame is ever derived from a wall clock.
- Level / ribbon / tone mapping:
  - ribbon base half-width = U * (0.008 + 0.034 * w): about 9 px thin at
    w = 0.06, about 36 px thick at w = 0.94 (at U = 900).
  - ribbon reach = mouthY * (1.02 - 0.42 * w): at low water the ribbon
    climbs nearly to the top edge; at high water it stays low.
  - ribbon curl: the centerline's phase sweeps (1.2 + 2.4 * w) * PI
    radians along its length and sway amplitude also grows with w, so a
    full vessel curls harder. Segment edges are offset along the local
    normal, so the band keeps its width around bends.
  - whistle frequency = 920 Hz at w = 0 falling to 300 Hz at w = 1, with
    a 5.4 Hz vibrato; gain follows |dw/dt| above an onset threshold.
- The ribbon is 30 sampled centerline points drawn as stacked quads; alpha
  decays as (1 - s)^1.25 so it dissolves with height using flat segments,
  no gradients. Edge fray is precomputed from a seeded mulberry32 RNG.
- Interaction: vertical drag only. The drag delta maps to a target level
  (full travel over half the unit size), chased by a spring (k = 42,
  c = 10.5) so the pour has inertia and a slight slosh. Idle, the target
  is a breathing sine around 0.5 (amplitude 0.045, period 11 s); its peak
  rate of change (about 0.026 /s) sits below the whistle onset threshold
  (0.05 /s), so idle motion is silent by construction.
- Audio: WebAudio created lazily inside the first pointer gesture only,
  typeof-guarded and wrapped in try/catch. No autoplay, no microphone.
  In the headless QA renderer there is no AudioContext and no
  requestAnimationFrame; the piece renders frame one and stops, silently.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height
  pinned in px on every draw; phone detection via window.screen physical
  size (min dimension < 700 px) with the h > w * 1.15 aspect as fallback
  only - on phones the vessel rides higher in the tall frame (table line
  at 0.84 H instead of 0.895 H, body slightly taller) while all
  proportions stay driven by U = min(W, H); no ctx.filter, no shadowBlur,
  no offscreen canvas, no gradients.
- QA hooks (inert without the query string): ?seed=tNN pins the elapsed
  time, ?seed=wNN pins the water level in percent, so forced states can
  be rendered headlessly and deleted after inspection.

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- thumb.png rendered twice and compared with cmp: byte-identical, so
  frame one (idle phase 0, w at rest) is deterministic. The duplicate
  render was deleted. Two fix rounds got it there: the first boot draw
  read the live clock and drifted between renders, so the boot draw is
  now pinned to exactly t = 0 (the 680 lesson); and the ribbon's first
  build zigzagged like smoke at desktop size, so its curl sweep was
  widened and its edges are offset along the local normal, after which
  all renders were redone and the byte-compare re-run.
- Forced states checked through the seed hook and deleted after reading:
  a low level (w pinned near 0.1) sends the ribbon thin and high toward
  the top edge; a high level (w pinned near 0.9) makes it thick, low and
  tightly curled; a mid-loop time pin shows the breathing phase advanced
  with the ribbon swaying off its frame-one position.
- Read-back of the three kept renders: burnished globular vessel with
  stirrup spout and engobe banding, water standing at mid-body with the
  darker air chamber above it, pale ribbon curling up from the spout and
  dissolving before the top edge. On mobile the vessel refits the narrow
  frame with nothing clipped and the ribbon clear of the edges.

## Deviations

- None from the prompt. Two mechanism notes: the whistle sounds only
  while the level is changing (per the prompt, pitch follows the level;
  tying loudness to the pour rate keeps an idle, breathing piece silent,
  which the no-autoplay rule requires), and the cutaway reads the air
  chamber in the shadow tone at low alpha rather than as an empty void,
  so the interior stays inside the strict palette.
