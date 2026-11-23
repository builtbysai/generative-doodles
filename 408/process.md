# №1294 "Rabari Embroidery" (swapnaa-tamhane ST7, PP461)

## Prompt
A deep indigo achadiya field over which bright Dhebariya Rabari embroidery
creeps: chain-stitch borders in orange, pink and green forming mirror-centered
rosettes and zigzag bands that deliberately avoid the palest ghost-print areas,
"forcing a more careful reading" of the cloth beneath. Grounded in Tamhane's
*When Was Modernism?* (2023-24, Stewart Hall; with Jasuben Prabhu Rabari,
Madhubhen Vana Rabari, Jivaben Rupa Rabari of Qasab Kutch Women's Collective).

## Frame one (t = 0, fixed phase)
Deep indigo field #1E3A5F, full-bleed. Three soft pale ghost washes (the
palest areas) plus 26 faint ghost block motifs (diamond, rosette, square-dot)
scattered at low alpha. Three seeded diagonal bands cross the field on gentle
slopes, drawn as chain stitches in orange, pink and green, each band detouring
around the pale washes rather than crossing them. Five seeded mirror rosettes
sit along the bands: small irregular-pentagon mirror centers with 10 radiating
chain stitches each. Two buttonhole-edged patches (dashed borders with short
perpendicular ticks) sit clear of the pale washes. Embroidery covers well under
40% of the field; the indigo shows. No visible text except `<title>`.

## Mechanics (all closed-form over recorded events and piece time)
- Drag to embroider: a needle-following stitch line extends from the last
  rosette (or last stitch) toward the pointer, laying chain stitches in the
  current thread color at 9 px spacing with alternating lateral offset for the
  chain-link look. Probe-verified: a 200 px drag added ~1,000 orange stitch
  pixels.
- Double-tap places a mirror rosette at the tap point (mirror center plus 10
  radiating chain stitches); the thread color cycles orange, pink, green per
  completed rosette. Probe-verified: a double-tap in a clear area added ~590
  mirror-white pixels plus spokes; a single tap places nothing.
- Mirror glint on pointer pass: a mirror flashes white with an expanding ring
  when the pointer passes within its radius + 24 px, decaying over 0.6 s.
  Mirrors never glint on their own.
- Watch-only otherwise: nothing happens without a drag or double-tap.
- No symmetrical mandala generators: rosettes cluster along the wandering
  bands; threads are dyed-wool saturated, never neon.

## House adaptations
- Visual Viewport sizing (window.visualViewport with window fallback; resize
  listeners on both); canvas pinned in draw() via style width/height in px;
  phone detection via window.screen physical size, aspect fallback; field
  composition full-bleed at all sizes, checked at 390 wide.
- Determinism: synchronous first frame draws at exactly t = 0 via a boot flag;
  the clock starts only with the rAF loop (armed from the real scheduler, as a
  plain function declaration, per the №1278 lesson). All layout comes from a
  seeded mulberry32 PRNG; no Math.random anywhere (the one grep hit is a
  comment stating that).
- QA renderer limits respected: no requestAnimationFrame unguarded, no
  AudioContext, no document.createElement, no WebGL, no offscreen canvas, no
  ctx.filter, no shadowBlur, no gradients (glints as flat alpha shapes).
  Every dot is its own path with a moveTo before the ellipse (node-canvas
  ellipse/arc quirk).
- The QA shim has no document.body, so the body-background line is guarded.

## Fix rounds
1. First QA run threw on `document.body.style` (undefined in the shim);
   guarded the line.
2. First renders showed two rosettes clipped at the frame edge (the pale-area
   nudge had pushed them outward) and the bands crossing the pale washes.
   Fixed with a band detour that pushes path points radially out of the
   expanded pale ellipses, a rosette clamp (x 0.09-0.91, y 0.12-0.88), and
   patches repositioned clear of the washes. Re-rendered and re-inspected at
   all three sizes.
3. Drag stitching first lagged one pointer event behind (stitches laid toward
   the previous pointer, not the current one) and tap detection used max
   single-step movement; fixed to lay toward the current pointer and to
   accumulate total movement.

## QA
- Desktop 1280x900, mobile 390x844, thumb 720x720 rendered and inspected.
- Thumb rendered four times total (three fresh renders plus the shipped
  thumb): all byte-identical.
- Mechanics harness (node-canvas, stubbed DOM, fake rAF clock, through the
  piece's own pointer handlers): frame one identical before/after rAF arming
  at t = 0; drag lays stitches; double-tap places a rosette; single tap
  places nothing. One probe initially showed no mirror gain because the
  double-tap landed exactly on a seeded rosette's mirror; re-probed in a
  clear area and confirmed the gain.

## Files
- index.html (md5 fa9920710def0cab0009ee0886045c8c), process.md, thumb.png
  (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844).
- Build only: nothing pushed, nothing outside the output dir touched.
