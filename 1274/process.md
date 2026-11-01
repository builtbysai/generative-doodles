# №1274 — Wedded Bliss (suchitra-mattai SM3, PP433)

## Prompt

Two large facing forms, abstracted figures built from layered sari textiles,
joined by a dense field of embroidery-floss stitches bridging the gap between
them like sutures. The stitches pulse faintly. Grounded in Mattai's *wedded
bliss* (2019), reflecting on her family's history as indentured laborers from
India under British colonialism and the trauma that moves through generations.

Palette, verbatim from the prompt: bridal red #A4133C, sari gold #D4A017,
stitch floss pink #E88CA0, skin-toned ground #D9BFA3, shadow indigo #2A2F45,
background ink #121013.

## What was built

A square, centered composition on ink ground. Left figure: bridal red with
sari-gold bands, pink trim lines, and a gold dot field. Right figure: shadow
indigo with bridal-red bands, a gold trim outline, and skin-toned dots.
Skin-toned sash bars sit on the figures' outer edges. Between them, 28 pink
floss stitches in seven rows bridge the center gap as dashed thread curves,
each pulsing on its own phase. Neither figure touches the other; the
stitch-bridge is the visual center. No hearts, no romance iconography, no
visible text beyond the page title — the union is suturing, not sweetness.

## Interaction (all closed-form over recorded events and piece time)

- Drag a figure: pointerdown on a side selects that figure; pointermove shifts
  it horizontally, clamped to 10% of the square size. The stitch anchors follow
  the figure edges, so the bridge stretches, tightens, or slackens with the
  gap (sag grows as the gap widens, shrinks as it closes).
- Release: both figures return slowly. Displacement decays as
  exp(-dt / 1.4) from the recorded release event — no frame-integrated state.
- Pulse: stitch alpha is 0.68 + 0.25 * sin(2πt / 5 + phase), a slow faint
  pulse with a different phase per stitch.
- Never click-to-reload. Silent; no audio anywhere.

## Determinism and house rules

- First frame is drawn synchronously at t = 0 (constant phase); the rAF loop
  is anchored as offset + elapsed-since-load and guarded by a typeof check.
- Seeded integer LCG only — no Math.random anywhere.
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700px)
  with the aspect fallback. Centered geometric piece: the square composition
  is kept whole on every size and the page ground is the piece's own
  background color.
- node-canvas adaptations: no gradients, filters, shadowBlur, offscreen
  canvas, or element creation. Dots are drawn one path at a time (the
  batched-arc quirk), stitches as short line segments along quadratic
  beziers. The dark indigo figure carries a gold trim outline so it reads
  against the ink ground.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, and 720x720 thumb; all three inspected personally.
- Desktop and mobile both show both figures, the full stitch bridge, and the
  centered square on ink ground.
- Thumb rendered twice at 720x720, `cmp` byte-identical; re-verified a final
  time against the finished index.html.
- Fix round 1: the first pass rendered only the left figure. Cause: the
  dot-field edit had dropped the outer ctx.restore() in drawFigure, so the
  left figure's transform leaked and the right figure was drawn off-canvas
  (proven by pixel probe: zero indigo pixels, then a fill-count probe showing
  the indigo fill call had executed). Fix: restored the missing restore and
  added the trim outline. Re-rendered and probe-verified: 105,360 indigo
  pixels spanning the designed x range.
- Fix round 2: stitch alpha raised (0.55 to 0.68 base) and dash fraction
  raised (0.55 to 0.7) so the bridge reads as a dense field, not faint stubs.
- Mechanics probe (through the piece's own pointer handlers, temp harness,
  discarded): dragging the left figure +50 px moved its red bounding box
  from x 280 to x 331; on release the figure holds near the drag position
  and decays per the exp(-dt / 1.4) return law.
- Token scan: no Math.random, createElement, AudioContext, getUserMedia,
  gradients, filters, or shadowBlur. requestAnimationFrame appears only
  behind its typeof guard.
- index.html md5: 2edce14b35b26f2adca36753b0133fe9
