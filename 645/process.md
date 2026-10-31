# No.645 "Cuaderno de Terreno" — EXPANSION #78 paulo-cox, block 5 "Recuadro"

## Concept

Paulo Cox's RETIRO explainer boxes (the framed recuadros on the back of the
leporello map-guides: what a piolet is, how a crampon works, the calafate,
the 45-degree slope rule) rebuilt as a field-guide plate. A paper ground
holds a strict 2x3 grid of equal bordered cards; each card is one specimen
drawn small, centered, with air around it, as a minimal ink line study with
seeded hand wobble on every stroke. No labels, no names, no numbers: the
drawings teach. Each specimen has exactly one subtle life channel, and each
card carries exactly one accent color on one element only.

Specimen / accent assignment (launch plate, reading order):

| Pos | Specimen | Accent | Accent element | Life channel |
|-----|----------|--------|----------------|--------------|
| 1 | Piolet (shaft, pick arc, adze tick, wrist loop) | moss #5C7A4D | wrist loop | pick glint, every 9 s |
| 2 | Crampon (sole frame, 10 spike ticks, 2 straps) | rust #B4572E | strap arcs | front spikes tap twice, every 11 s |
| 3 | Calafate (curved stem, leaves, berry cluster) | rust #B4572E | berry fill | berries swell on a 12 s sine |
| 4 | Chinchilla (body, round ears, tail spiral, whiskers) | dusk blue #3A4E6B | tail-tip tuft | ear twitch, every 7 s |
| 5 | Slope diagram (triangle, 45-degree line, handle dot) | dusk blue #3A4E6B | threshold line | threshold alpha pulse, 8 s |
| 6 | Summit (triangle, snow notch, altitude bar) | moss #5C7A4D | altitude bar | bar grows and settles, every 13 s |

Adjacency check for the launch plate: pos1 moss vs pos2 rust / pos3 rust;
pos2 rust vs pos4 dusk; pos3 rust vs pos4 dusk / pos5 dusk; pos4 dusk vs
pos6 moss; pos5 dusk vs pos6 moss. No two edge-adjacent cards share an
accent. (Pos1 and pos3 both sit in column 1 but are not adjacent; pos2 and
pos3 share only a corner.)

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette is exactly: paper #EFE7D3, border ink #1B2430, specimen ink
  #2A3340, accents rust #B4572E, moss #5C7A4D, dusk blue #3A4E6B.
- Plate model: `buildPlate(index)` derives the whole plate from mulberry32
  seeds keyed to the plate index. Plate 0 is the launch arrangement above
  (fixed specimen order, accents assigned by a seeded shuffle validated
  against the grid adjacency rule). Later plates shuffle specimen order,
  re-draw variants (piolet angle, crampon size, calafate berry count,
  chinchilla mirror flip, slope steepness, summit bar height) and
  re-assign accents under the same adjacency rule.
- Hand wobble: each card owns a precomputed table of 300 jitter values from
  its own mulberry32 seed; every polyline, ellipse and arc helper samples
  that table, so strokes wobble identically on every frame and every
  device.
- Grid: equal cards computed from the live viewport (margin and gap shrink
  on phones, but the 2 cols x 3 rows and equal-card discipline hold at
  every size).
- Micro-motion: every channel is a pure function of anchored elapsed time
  (`(t - chanStart) mod period`), where `chanStart` starts at 0. Frame one
  is the synchronous draw at t = 0; the animation clock anchors to the
  first rAF timestamp afterwards. Nothing is derived from Date.now().
  The piolet glint falls inside the first 0.35 s of its 9 s period, so a
  faint glint cross sits at the pick tip in frame one by design (phase 0
  of the channel).
- Interaction: tap a card and that card's `chanStart` resets to now, so
  its micro-motion performs immediately. Double-tap on the paper margin
  (not on a card) advances to the next seeded plate. Pointer input uses
  `pointerdown` only; a click listener was removed because pointerdown and
  click both firing for one physical tap would have made a single margin
  tap register as a double-tap and reseed by accident.
- Sizing: Visual Viewport API with resize listeners on both
  visualViewport and window; canvas backing store follows devicePixelRatio
  and `canvas.style.width/height` are pinned in px inside `draw()` every
  frame. Phone detection via `window.screen` min dimension < 700, aspect
  fallback `h > w*1.15`. Page ground is the paper tone.
- rAF is typeof-guarded; the piece needs no AudioContext, no
  document.createElement, no offscreen canvas, no ctx.filter.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` 1280x900: six equal bordered cards on paper; piolet
    with moss wrist loop and glint cross at the pick, crampon with rust
    strap arcs and ten spike ticks, calafate stem with rust berry cluster,
    chinchilla with ears, whiskers and curled tail, slope triangle with
    faint blue threshold line and handle dot, summit triangle with moss
    altitude bar and tick marks. Generous margins, nothing clipped.
  - `qa-mobile.png` 390x844: same plate refit to the tall frame, cards
    still equal, specimens legible, nothing clipped.
  - `thumb.png` 720x720: same composition at gallery size.
- Determinism: thumb.png rendered twice and byte-compared with `cmp`:
  identical. The comparison was re-run after the final code fix (wrist
  loop placement after a dead-variable cleanup) and still passes.
- Fix during QA: removing an unused variable in the piolet drawer broke
  the wrist loop (it referenced the removed values); the loop is now
  placed directly from the shaft's bottom point. Also removed the
  duplicate click listener described above. No visual change beyond the
  loop returning to its intended spot at the shaft foot.

## Deviations

- The slope card's 45-degree threshold line is drawn as a short segment
  centered on the handle point on the slope face, rather than spanning
  the whole triangle: at card scale a full-width line fought the minimal
  line-study brief, and the segment still reads as the threshold rule
  pinned to the measured point. Recorded here per the deviation rule.
- No other deviations. No text anywhere except the document title; no
  audio; no microphone.
