# №1299 "Tarp & Tempo" (karen-kraven KK4, PP466)

## Prompt
Two long cloth panels side by side, wind-blown: the left one weathered and
patched, the right one new and clean, choreographed to make the SAME gesture.
They rise, billow, and fall in unison, the new one always a half-beat behind,
learning the old one's memory. Where they overlap visually, moire shimmer
forms. Grounded in Kraven's Tarp & Tempo (2019): one found tarp scrap, one new
tarp "unravelled to mimic the found one", fans and rope to sync gestures.

## What was built
- Landscape, storm-sky ground #2B2E33. Two panels hang in the left and right
  thirds with a visible gap of sky between them, never touching, only rhyming.
- Left panel: weathered tarp olive #6E6A52, flat-alpha fold shading, five
  seeded stitched patch squares #7C7F66 with dashed stitch borders, zigzag
  frayed bottom hem.
- Right panel: new tarp pale blue-grey #AEB6B9, clean, fold shading, subtle
  light hem band. The two are distinguishable at all times.
- A single rope line #8A6F4D runs across the bottom third with a slight sag,
  behind the panels, with knot dots at the panel centers.
- Moire shimmer: nine low-alpha #D8DEDD diagonal lines in the gap whose alpha
  (0.04 to 0.14) peaks when the two panels' mid-height billow displacements
  align.

## Mechanics (all closed form in piece time and recorded events)
- Shared wind field: slow sine gusts (periods 13 s, 7 s, 23 s) drive both
  panels' billow, which grows toward the free bottom edge.
- Learning loop, 45 s: the new panel's billow amplitude converges 0.018W
  toward 0.032W (weathered: 0.035W), its period 12 s toward 9.6 s (weathered:
  9 s), and its lag 1.2 s toward 0.45 s. It never reaches the weathered
  values and never fully synchronizes; the half-beat lag is the point.
- Drag = a gust: pointer drags record velocity impulses that decay with
  tau 1.5 s; both panels answer, the new one 0.4 s later.
- Watch-only otherwise. Never click-to-reload. No flag or sailboat reading:
  tarps are work covers.

## House adaptations
- Visual Viewport sizing with window fallback; canvas pinned in draw() via
  style width/height in px. Field-like composition, full-bleed at all sizes
  (page ground is the piece's own storm-sky color); checked at 390 wide.
- Determinism: synchronous first frame draws at exactly t = 0 via a boot
  flag; the rAF clock starts only with the loop. No Math.random anywhere;
  patches use a seeded mulberry32 PRNG. No gradients, filters, shadowBlur,
  offscreen canvas, or audio. Dots drawn as paired arcs with moveTo first.
- rAF loop is a plain function declaration armed from the real scheduler
  (the №1278 lesson: a named function expression followed by
  requestAnimationFrame(loop) throws in a real browser).

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Thumb rendered three times at 720x720, cmp byte-identical.
- Harness probe (temp copy, discarded): fake rAF clock drove the loop
  without error; the t = 5 s frame differs from frame one (wind field moves
  the panels); a drag-gust frame at the same time differs from the calm
  frame (gusts answer, new panel delayed).
- Fix round: the first panel path traced the left edge and the bottom edge
  but never the right edge, so closePath cut a diagonal across each panel
  and both rendered as triangles. Restructured to left edge, bottom edge,
  right edge, then close; re-rendered and re-inspected at all three sizes.

## Files
- index.html (md5 958b54ddc9fe70d22a3f90f8e9a8b784), process.md, thumb.png
  (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844).
- Build only. Nothing pushed.
