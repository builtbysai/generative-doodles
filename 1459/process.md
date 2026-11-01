# №1459 "Five Episodes, One Orlando" (ulrike-ottinger UO4, PP706)

One single figure stands center-frame while the world around her changes era:
a department store where myths are auctioned, a medieval hall, an inquisition
chamber, a carnival sideshow, a festival square. Her costume swaps wholesale
at each era: modern suit, medieval gown, inquisitor black, sideshow spangles,
festival finery. Her face and stance never change.

## Palette (verbatim from the prompt)

Background per era, one flat tone each: store #d8d2c4, hall #3a2e28,
chamber #1e1e24, sideshow #7a1f2b, square #e8c9a8; figure ivory skin #f2ead8;
costume accents scarlet #c1272d, gold #d9a441, teal #2e6f6a. No other colour,
except contour ink #1a1a1a for outlines, shoes, and the inquisitor's black
robe (the prompt itself names that costume "inquisitor black").

## Composition

Figure centered, large, spanning 0.15H–0.85H (70% of frame height). Era
background as flat panels and props behind her: store shelves with auctioned
myth items and a podium; hall arches and banners; chamber arch and candles;
sideshow tent stripes and bunting; festival square bunting and a stall awning.
Nothing else moves except the era change. No visible text except `<title>`;
no era labels, per the prompt.

## Motion and interaction

Watch-first with drag-to-scrub time. Dragging horizontally scrubs through the
five eras; at each era boundary the costume swaps in one frame with a brief
distorting-mirror ripple across the figure (a horizontal sine displacement on
the figure layer only, amplitude decaying over 0.8 s — a wobble, not a blur
filter). Releasing the drag holds the era: the scrub float snaps to the
displayed era index. Drag never restarts the figure, and there is no
auto-advance, so a released era genuinely holds. Never click-to-reload,
never morphing between costumes, never a plot.

## Adaptations

- Figure as a layered sprite: body geometry (head, face, arms, legs, stance)
  is drawn identically every era; only the costume layer changes. The
  inquisitor hood is drawn as a frame around the head, with the face and hair
  cap re-drawn over it so the face itself never changes.
- Ripple as a per-primitive horizontal sine offset on the figure layer only;
  backgrounds and props are never displaced.
- Flat fills throughout: no gradients, no shadowBlur, no offscreen canvas,
  no Path2D, no createElement, no AudioContext (fully silent), no
  getUserMedia. Dots as filled rects or own-beginPath arcs; fading alphas
  rounded to 4 decimals (node-canvas scientific-notation quirk).
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), era 0 store, modern suit); clock starts only with the
  rAF loop, which is a plain function declaration behind a typeof guard.
  All randomness from a seeded mulberry32 PRNG (seed 1459000), never
  Math.random; decorative prop values are fixed at load.
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px; phone detection via window.screen physical size (min dimension <
  700 px) with aspect h > w*1.15 as fallback; centered composition keeps its
  shape on phones and the page ground takes the current era background
  colour. No visible hint text, per the prompt's no-text rule.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders, including after the fix below.
Forced-time probe harness (kept at tmp-probe.js; vm-isolated instance,
shimmed canvas/window matching render-piece.js, pointer events to the
piece's own listeners, pixel counts via window.__piece):

- Frame one: era 0, store background, scarlet blazer 42,164 px, teal
  trousers 17,754 px, ivory face 4,077 px.
- All five eras: corner background matches the era tone; signature costume
  colour present in each (scarlet blazer, teal gown, ink robe, scarlet
  bodice, gold dress); face ivory 3,497–4,127 px in every era.
- Era 0 vs era 1 differ by 1,122,015 px: a wholesale one-frame swap, not a
  blend. Ripple frame vs settled frame differ by 2,665 px: the wobble is
  present after a swap and decays away.
- Drag scrub: a +2-stop drag lands on era 2 and release holds it; dragging
  back returns to era 0; a sub-stop drag snaps back to era 0.
- Token scan clean (the single "Math.random" hit is a comment stating it is
  never used).

## Fix rounds (1)

The first probe showed era 2's face reading as a full ivory disc (7,058 px
vs ~4,000 px elsewhere): the hood was drawn, then the face re-drawn as a
full circle over it, losing the hair cap the other eras show. Fixed by
re-drawing face dot, then hair cap, then features over the hood, so the
face matches every other era (3,877 px after the fix). All renders re-done
after the fix; frame one (era 0) unchanged.
