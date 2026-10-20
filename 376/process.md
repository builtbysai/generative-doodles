# No.376 Hydrangea Bloom

## Concept

After Olena Kovalova's (al_kovalyova_design) bold-contour
hydrangea tile: the canvas reads as one giant motif tile. A
single hydrangea head sits centred on deep green, built from
four-lobed florets in her tile grammar, where the dark-brown
contour is the style and no petal exists without it. Below the
head, an ochre stem flanked by two ochre veined leaves. The
watercolor blue-to-lavender wash of the original is rendered
as stepped flat tones, quantised from a shared light angle,
so the head still shades like a lit dome without any gradient.

## Construction

- One self-contained canvas, design space 1280x900, centred
  fit: the tile keeps its shape at any aspect and the page
  ground stays the piece's deep green #3E6B46. Canvas pinned
  every frame via style width/height in px; sizing from the
  Visual Viewport API with resize listeners on visualViewport
  and window; phone detection via window.screen physical size
  (min dimension under 700px) with the aspect fallback.
- Palette, closed: ground #3E6B46, contour #4A2E1E, petals a
  five-step flat ramp from #9BB8D3 to #8E7AA8, highlights and
  centres #F5EFE2, stem and leaves #D9973B. Flat colour only:
  no gradients, no filters, no shadowBlur, no offscreen canvas.
- Exactly 25 florets, asserted at load, in an authored dome
  table around the head centre: 1 centre floret, a ring of 6
  at 120px, 6 accents at 178px, an outer ring of 12 at 235px.
  Drawn outer ring first, centre last, so the dome overlaps
  like a real head. Five authored florets are cream highlights.
- Each floret is four rounded lobes plus a radial dot-starburst
  centre (eight dots around a centre dot; cream dots, lavender
  on the cream florets). Lobes are drawn in two passes in the
  same construction, fill then stroke, so every petal edge
  carries the #4A2E1E contour at 3-5px by construction; a
  contourless petal cannot occur.
- Petal tone per floret: the floret's position is dotted with
  the current light vector and quantised into the five ramp
  steps. Double-tap advances a fixed light table of three:
  top-lit blue (light blue steps at the crown), bottom-lit
  lavender (lavender steps lead at the base), all-cream.
- Loop: seamless 16 second master loop. Every floret pulses
  between 0.97 and 1.03 on exactly 2 whole cycles per loop
  with an authored phase stagger, so frame 16s matches frame 0.
- Interaction: drag across the head drops damped radial
  ripples along the pointer path (one every 26 design px).
  Each floret is displaced outward from a ripple centre on a
  sine that decays with distance and age; ripples are removed
  outright after 3.5s, so the settled displacement is exactly
  zero and the head returns to its authored layout. Drag and
  tap are separated by a 12 design px movement threshold;
  double-tap is two sub-threshold taps within 350ms. Taps are
  state changes only, never a reload. No text, labels or chrome.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 5.7s (head developed, pulses mid-wave),
  the clock anchored there and advanced in fixed 1/60 ticks,
  requestAnimationFrame typeof-guarded. Pointer coordinates
  convert through the stored centred-fit transform (S, OX, OY).

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Desktop: full dome legible, stepped shading
  reads top to bottom, cream highlight florets placed around
  the head, stem and both veined leaves clean below. Mobile:
  centred tile intact on the matching green ground, head,
  stem and leaves all in frame. Thumb: the head reads as one
  bold-contour motif at gallery size.
- Thumb rendered twice from the shipped script and compared:
  byte-identical.
- Fixes during QA: the first pass inverted the tone ramp, so
  top-lit mode put lavender at the crown; the step mapping was
  flipped so the light side takes the named end of the ramp.
  Leaf veins were also tightened (spread narrowed) so no vein
  endpoint crosses the blade contour.
- Floret count asserted in code (25). Light modes and the
  drag ripple are pointer-driven and cannot be exercised by
  the headless renderer; they follow the same transform and
  table machinery as the shipped sibling pieces and are
  reasoned through in the construction notes above.
