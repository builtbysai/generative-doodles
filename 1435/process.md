# №1435 "Two Friends, Wrong Mirrors" (nikolaus-utermoehlen NU4, PP658)

## What it is
Two pairs of figures in grass, each pair centered in its own parchment clearing on a
seeded grass field. Each figure stands in passive composure — one lying, one sitting,
arms behind the head — above a mirror line, and below that line sits its reflection:
not its own body, but its pair-partner's body, flipped. One figure's reflection in each
pair is a negative (dark silhouette with a light head-ring); the other's is a positive
in normal skin tones. The mismatch is legible at a glance: the lying figure's mirror is
a compact vertical dark shape; the sitting figure's mirror is a long horizontal
skin-toned shape. Transparent varnish layers in gold and teal breathe over the
reflections, and a gold contour line flickers slowly across them, like reflections in
water. The bodies never move; only the varnish breathes.

## Interaction
Drag a figure to swap which mirror it is paired with. The reflection cycles through
the OTHER pair's bodies only, so a figure is never paired with its own mirror and the
piece never offers a "correct" pairing. A drag must travel 12 px before it swaps, once
per drag. No click-to-reload, no reset, no resolving state.

## Technical
- Self-contained canvas 2D. No offscreen canvas, gradients, shadowBlur, Path2D,
  createElement, AudioContext, getUserMedia, localStorage, or fillText/strokeText.
  Fully silent: the mismatch is visual, not heard.
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport
  and window; canvas pinned in draw() with style width/height in px. Phone detection
  via window.screen physical size (min dimension < 700 px) with aspect h > w*1.15 as
  fallback: pairs sit side by side on desktop, stacked on phones (field-like
  composition goes full-bleed on phones); checked at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, plain function
  declaration behind a typeof guard). All randomness from a seeded mulberry32 PRNG
  (seed 1435000 + index·7919), never Math.random. All ambient periods (15/20/30 s)
  divide the 60 s loop, so the loop closes exactly.
- Node-canvas quirks: fading alphas rounded to 4 decimals before stringifying
  (scientific-notation alphas parse as opaque); dots as filled rects or
  own-beginPath arcs; every ellipse on its own beginPath.
- Figures are stylized, non-sexualized body forms in passive repose (lying, sitting,
  arms behind heads) — the same register as a life-study painting, never eroticized.
  No visible text except `<title>`.

## Verification (forced-time probe harness, node-canvas, stubbed rAF + pointer events)
- Two fresh instances byte-identical at t = 0 (full-frame pixel diff 0).
- Loop closure: t = 60 vs t = 0 pixel-identical (diff 0).
- Mismatch at t = 0: figure 0's skin bounding box 240 wide × 79 tall (wide lying
  body); its reflection's dark bounding box 53 wide × 100 tall (narrow sitting body).
- Drag on figure 0: reflection zone changes 10,660 px; the figure itself is
  unchanged (the 47 px that differ inside the figure zone sit at y 454–459, the
  mirror-line boundary, and are the old reflection's foot tips disappearing when
  the reflection reassigns — a true mirror flip, not a figure change).
- Second drag reassigns again (9,308 px change in the reflection zone).
- Never-correct control: a copy of the piece with figure 0's reflection forced to
  its own body differs from the initial state (10,233 px), the first drag state
  (3,961 px), and the second drag state (8,885 px) in the reflection zone — no drag
  state ever equals the own-body pairing.

## Fix rounds (1)
The first build's sitting figures read as fat vertical pills with merged heads, the
mirror line was invisible, and the varnish ellipses were muddy blobs. Fixed: sitting
torso slimmed with a distinct head on a neck gap and a clear arm behind the head;
lying head shrunk with a gap from the torso end; limb shading reduced; mirror line
redrawn dark with end ticks; varnish cut to two ellipses (gold, teal) at lower alpha
and smaller radii; reflections drawn at 0.92 alpha. All renders re-done after the fix;
thumb byte-identical across repeated renders including a final re-verify.
