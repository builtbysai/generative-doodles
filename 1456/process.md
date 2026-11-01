# №1456 "One-Way Ticket" (ulrike-ottinger UO1, PP703)

A silent elegant figure in a scarlet coat walks a night street lined with bars,
endlessly, left to right. Three abstract chorus figures trail her at fixed
offsets: a slate triangle (Social Question), a slate circle (Exact
Statistics), a slate square (Common Sense). They tilt toward her when she
passes a bar and never touch her or change anything.

## Composition

- Night street `#101820` filling the frame; pavement band `#232c38` from
  58% height to the bottom, with a faint ivory edge line.
- Three bar doorways at 30%, 58%, 84% of frame width: teal `#2e6f6a`
  blocks with a dark interior panel and an amber `#e8a33d` neon sign bar
  above each. Flat colours only, no gradients.
- Figure: ivory `#f2ead8` head, hands and legs; long scarlet `#c1272d`
  coat trapezoid from shoulders to below the knee; coat-coloured arms.
  Height 42% of frame height, feet on the pavement line.
- Frame one: figure left-of-center (32% of width), passing the first bar,
  whose neon already glows brighter than the other two.

## Motion

- Watch-first, slow endless walk: one full street crossing per 48 s at base
  speed. Walk cycle is a few frames (legs swinging in opposition, coat
  swaying slightly); the walk phase is tied to distance walked, not wall
  time, so the gait matches her speed.
- Passing a doorway flashes its neon briefly: sign brightness is a
  Gaussian function of the figure's distance to the doorway, layered with
  a slow breathing term and flat-alpha halo rects around the sign
  (never a gradient).
- Chorus tilt is a function of the figure's nearness to the nearest bar
  (up to 0.38 rad toward her); at frame one she is near the first bar, so
  the square already shows a slight tilt.
- Drag: dragging horizontally speeds her up (right drag) or slows her
  down (left drag), clamped to 0.15x–4x base speed, never reversing her,
  never restarting the walk. On release the speed decays exponentially
  (tau 0.9 s) back to base. Position is the analytic integral of speed
  over recorded drag segments, so every frame is a closed-form function
  of piece time and the event list — no frame-integrated state.
- Note on looping: this is an endless walk, not a fixed-length loop.
  Her position wraps exactly after one crossing (48 s), but the neon
  breathing term and the leg phase are time-based, so t = 48 is not
  pixel-identical to t = 0. That is per the prompt ("walks the street
  endlessly"), not a determinism failure: two fresh instances are
  byte-identical at t = 0, and every frame is reproducible from the same
  event list.

## Adaptations

- Street as a horizontal band with doorway rectangles; walk as a frame
  cycle over distance walked; neon flash as a timed distance function;
  chorus tilt as a distance function; drag as a speed parameter over
  recorded events.
- Fully silent (no AudioContext at all). No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
  Fading alphas rounded to 4 decimals; dots drawn as own-beginPath arcs
  (node-canvas quirks).
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in px in draw(); phone
  detection via window.screen physical size with aspect fallback.
  Field-like composition goes full-bleed on phones; page ground is the
  piece's own night-street colour.

## Verification

- Rendered with node-canvas at 1280x900, 390x844, 720x720; all three
  inspected. Desktop: figure, three doorways, all three chorus shapes
  trailing behind her, first bar's neon bright. Mobile: same composition,
  full-bleed, no clipping; chorus sits at head height so all three
  shapes stay readable beside her on narrow frames.
- Thumb byte-identical across repeated renders, including a final
  re-render after the last edit.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving
  the piece's own loop, pointer events to its own hooks): two fresh
  instances byte-identical at t = 0 (0 px diff); frame-one scarlet
  18,982 px, slate 3,257 px; distance monotonic (0 / 332.8 / 665.6 px at
  t = 0 / 10 / 20 s); doorway-2 sign mean red channel 101 (figure far)
  → 187 (figure passing) → 72 (figure past); t = 0 vs t = 0.6 differ by
  45,646 px (walk live); right drag raises speed to 99.8 px/s from a
  33.3 px/s base, decaying to 35.7 px/s 3 s after release; left drag
  slows to 5.0 px/s but never reverses; distance keeps increasing
  through both drags.
- Token scan clean (the single "Math.random" hit is a comment stating
  it is never used).

## Fix rounds (1)

- Chorus offsets were first scaled by figure width, which pushed the
  square off-frame on desktop (wrapped to the far right edge) and hid
  the triangle behind the figure on phones. Offsets changed to frame
  width fractions (10% / 17% / 24% behind her centre, no wrap), and the
  chorus row moved from shoulder height to head height so all three
  shapes read clearly beside her on narrow frames. All renders re-done
  after the fix.
