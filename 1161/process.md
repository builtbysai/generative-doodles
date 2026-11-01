# №1161 — New Aesthetic Compositions

Nick Briz study block NB2, after *theNewAesthetic.js* (2012) — the
artware library that is "a functional tool/utility… but it's also an
essay." The piece takes that literally: it is the generator plus its
documented source, both running on one canvas. Nothing here is a
picture of the work; the work is the library, executing.

## Composition

Top bar: the library's name and three preset buttons — **tropes**,
**sorts**, **maps** — the active one outlined in `#FF3D00`. Below,
the left two-thirds hold a 3×2 grid of compositions, each cell
labelled with the function that drew it. The right third is the
source panel, always visible: condensed excerpts of the shipped
generators — real signatures and the calls that matter, with the
essay comments kept verbatim, because in Briz the comments are the
argument. The panel scrolls slowly (6px/s, closed-form in t) so the
whole file parades past. Under the grid, an **obfuscate** slider
with a numeric readout. On phones the layout stacks: grid full
width, slider beneath it, source panel below that — still never
hidden, because hiding it would defeat the piece.

## The six generators

- **pixelSort()** — a seeded 26×18 field of the six band colours,
  paper and black; each row is sorted by luminance in segments.
  Segment length is the obfuscation: 4 cells clean, up to 26
  corrupted. The feed does not want to be read; it wants to be
  rendered.
- **satelliteMosaic()** — a 9×7 tile survey over seeded value
  noise, mapped to an earth-tone ramp with water and road bands.
  Obfuscation jitters tiles off the survey grid and leaves some
  unsurveyed entirely.
- **wireframe()** — an icosahedron, orthographically projected,
  rotating slowly (closed-form in t). Each vertex is displaced
  along a seeded direction by an amount scaled by obfuscation:
  every model is a rumor about a solid, and the noise is the part
  the rumor got right.
- **barField()** — sixteen dataviz bars from smoothed seeded
  noise, the maximum in accent orange, value ticks on top.
  Obfuscation sorts whole segments of bars into false order and
  slips individual bars sideways.
- **blobSort()** — a polar grid of flat rect segments in concentric
  rings, sorted along the angle within windows that widen with
  obfuscation. A face, almost; the algorithm insists it is only
  weather.
- **depthGrid()** — a wireframe terrain: a 13×10 point survey over
  value noise, drawn as row and column polylines in `#00E5FF`.
  Obfuscation roughens the heights and shakes the survey points.

## Presets and interaction

- **tropes** tours the vocabulary: mosaic, wireframe, bar field,
  depth grid, pixel sort, blob sort.
- **sorts** leans on the sorting generators — three pixel sorts and
  two blob sorts around one bar field, each at a different seed.
- **maps** leans on the survey generators: mosaics and depth grids,
  one wireframe, one bar field.

Tapping a preset bumps a generation counter that reseeds every
cell, and a wipe — a paper edge trailed by an accent bar — sweeps
the grid in 400ms, anchored to the recorded tap time. Dragging the
obfuscate slider sets obfuscation 0..1 and every generator re-derives
from it on the next frame. All interaction state is closed-form:
recorded events plus t, never accumulated frame state. Silent by
design; there is no audio to gate.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 3.2s:
  the tropes preset freshly generated, obfuscation at 0.35, the
  source panel at scroll offset zero, no wipe active. The rAF loop
  is `typeof`-guarded and anchored as T0 + elapsed since load; the
  720×720 thumb was rendered twice and byte-compared identical.
- Canvas size comes from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`;
  `canvas.style.width/height` are pinned in px inside `draw()`.
  Phone detection via `window.screen` physical size (min dimension
  < 700px) with the `h > w·1.15` aspect fallback.
- All randomness is seeded mulberry32 (plus a deterministic sine
  hash for per-tile jitter). No gradients, no `ctx.filter`, no
  shadowBlur, no offscreen canvas, no ImageData, no
  `createElement`, no audio, no microphone. Text is specced
  content here — buttons, cell labels, the slider, and the source
  itself — set in generic monospace.
- The source panel prints *condensed* excerpts of the generators
  that ship in this file: signatures, the load-bearing call, and
  the full essay comments. The functions on the left are the real
  ones; the panel is their public reading.
