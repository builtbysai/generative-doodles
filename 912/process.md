# No.912 — Sforzinda

Study #112 duncan_geere, PP73 "The Star City" (Ekistics "Sforzinda", 2020).

## Concept

A plotter draws an ideal star city on paper, live. Each city is a random-point
star plan in thin uniform ink: radial streets run from a central piazza to
outer points with tower marks and to inner gates (small squares on an inner
circle), a circular moat rings the city at 0.72R, the star outline closes the
figure, and a dense cluster of tiny building blocks stamps in near the center.
"Porta" labels sit at the outer points; a small generative scribble (not text)
signs the sheet bottom-right. The randomness is bounded but real: the point
count and placement change with every city, so it never settles into a
symmetric mandala. The drawing-in is the piece — once plotted, the plan holds
until it is reseeded.

Interactions: tap reseeds (a new city plots itself), drag rotates the sheet
like a plan on a drafting table (rotation persists, with a brief settle from
release velocity), double-tap inverts to white ink on black for 8 seconds.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- City model: generation g is produced by mulberry32 seeded with
  `91273 + g * 1013904223`. Point count n = 6..12; outer points at ~R with
  per-point angular jitter (±0.55 of the sector) and radius factor 0.94–1.00;
  inner gates at ~0.45R offset half a sector. Blocks (80–109) are placed along
  randomly chosen streets at 0.06–0.32R with lateral jitter, each carrying a
  stamp threshold; blocks are sorted by threshold so they stamp in one by one.
- Draw-on: progress p in [0,1] over 20 s. Each element owns a reveal window:
  center piazza [0, .05], moat [0, .18], gate circle [.05, .15], streets
  staggered [.10, .48], star outline [.35, .60] (per-segment reveal), gates
  stamp from .45, towers from .50, Porta labels from .50, blocks stamp across
  [.55, 1.0]. After p = 1 the finished plan holds.
- State derivation: all drawn state is a closed-form function of (t, event
  log). Taps are resolved by a pure scan: a tap confirms as a reseed 0.35 s
  later unless a second tap lands within 0.35 s, in which case the pair is an
  inversion (8 s window). Rotation is the sum of timestamped drag angle
  deltas plus a decaying inertia term (v · 0.6 · (1 − e^(−Δt/0.6))) recorded
  at release. No `Date.now()` anywhere; the clock is performance.now offset
  from load, and frame one is the synchronous draw at t = 0.
- Frame one: generation 0's draw clock carries a +12 s phase offset, so the
  first frame sits at p = 0.60 — streets, moat and outline drawn, gates and
  towers stamped, about half the Porta labels in, blocks still stamping.
- Palette is strict: paper #FAFAF8 / ink #111111; inversion swaps to ground
  #0B0B0D / ink #F2F0EB, including the page ground behind the canvas.
- Sizing: Visual Viewport API with resize listeners on visualViewport and
  window; canvas style width/height pinned in px inside draw() every frame.
  Phone detection via window.screen min dimension < 700 px, aspect
  h > w × 1.15 as fallback only. The plan is sized from the smaller viewport
  dimension (R = 0.36 · S) and stays centered at all sizes.
- Audio: lazy AudioContext created on the first pointerdown, typeof-guarded.
  A filtered sawtooth servo (82 Hz through a 320 Hz lowpass, gain 0.012)
  sounds only while p < 1; each newly stamped block fires a short bandpassed
  noise pen-tap scheduled from draw progress; a confirmed reseed plays a
  paper-rustle (noise through a sweeping lowpass). The piece renders complete
  in total silence in the QA harness.
- No gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All three
  show the paper ground, the star plan mid-draw: radial streets converging on
  the piazza, moat ring, gate squares on the inner circle, tower circles with
  radial ticks, tiny blocks near the center, Porta labels at drawn points,
  scribble signature bottom-right. Nothing clipped on mobile; the plan holds
  the center of the tall frame.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. The duplicate render was deleted.
- Fix round: the first pass started Porta labels at p = 0.60, so only one
  label showed in frame one; the label window now opens at p = 0.50 so
  roughly half the labels are present in the first frame, matching the
  frame-one spec. Re-rendered and re-verified after the fix.

## Deviations

- None from the prompt's substance. Two implementation notes: (1) the reseed
  from a tap lands 0.35 s after the tap, the disambiguation window that lets
  a double-tap become the inversion instead (established house pattern);
  (2) outer-point radii carry a small seeded jitter (0.94–1.00 R) alongside
  the angular jitter, keeping the star hand-plotted rather than compass-true,
  inside the randomness-within-limits discipline.
