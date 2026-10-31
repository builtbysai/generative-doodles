# No.759 "Fractured Wire" — EXPANSION #92 robert-irwin, block 8

## Concept

Irwin's Fractured Light — Partial Scrim — Eye Level (MoMA, 1970-71): a room
divided by hairline stainless wires that seem to float, under fluorescent
light that slowly trades warm for cool. The wires are painted white only at
their wall connections, so the attachments vanish and nothing explains why
the wires stay up. There is nothing for the viewer to do but stand in the
room while its color temperature swings.

The piece is a flat wash of a room, a field of floating hairlines, and a
translucent scrim band overhead, all driven by one 4-minute cycle. No
fixtures, no text, no interaction affordances of any kind.

## Construction

- **Room wash.** One flat fill per frame. The temperature is
  `temp(t) = sin(2πt/240)`: at t=0 the room sits exactly at the neutral
  room base #E4E4E0, warms to full dominance of the warm wash #F5D8A8 at
  the cycle quarter (t=60), returns through neutral, and cools to the
  cool wash #B8D4E8 at t=180. The room is a single computed mix of the
  three palette anchors; it stays flat, no bands, no gradient.
- **Wire layout.** Precomputed at load from one mulberry32 stream
  (seed 759013): horizontal and vertical wires placed by a random walk
  with steps of 0.085–0.215 of the frame from a seeded start, so spacing
  is irregular and never a lattice. Each wire also carries a seeded phase
  in the temperature cycle and a seeded "keep" factor (0.08–0.63): how
  much of the wire survives at mid-span even when fully defined.
- **Wire fade.** Each wire is drawn as 56 stepped-alpha segments. Alpha
  follows a parabola across the span: full edge strength near the walls,
  dipping toward mid-span to `definition × keep`. Definition is
  `0.5 + 0.62·sin(2πt/240 + phase)` clamped to 0..1, so every wire rides
  the same 240 s cycle on its own phase, catching and losing definition
  as the temperature swings. At low definition the silver also lerps 35%
  toward the current room color, losing contrast as well as alpha, and
  mid-span segments below alpha 0.004 are skipped entirely, so faint
  wires genuinely vanish mid-run and survive only near their ends.
- **Connections.** After the wires, the last 6 px at each end of every
  wire is drawn in pure white #FFFFFF at alpha 0.85: the painted-out
  attachment. The stub is bright where the wire meets the wall, and the
  wire proper fades from it, which is what makes the span read as
  floating.
- **Scrim band.** Across the upper third (y from 0.16H to 0.36H): a base
  fill of scrim #F8F8F6 at a breathing alpha, six layered translucent
  strips whose alphas follow a half-sine profile to fake the sheen, and
  1 px hairline edges top and bottom. The breath is a 120 s sine
  (integer ratio 2 against the main cycle), phased so frame one is at
  its faintest (alpha ≈ 0.04, rising to ≈ 0.13).
- **Determinism.** Frame one is the synchronous draw at cycle t=0: room
  at base tone, each wire at the definition its phase gives at t=0, scrim
  at minimum. All state is a closed-form function of cycle time and the
  seeded layout; `Date.now()` is never read, there is no RNG after load,
  and the rAF loop (typeof-guarded) only advances t from its own first
  timestamp.
- **Sizing.** Canvas from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height pinned in
  px inside draw() every frame. Phone detection via window.screen
  (min dimension < 700px), aspect fallback h > w×1.15; wires span the
  full frame at every size, page ground is the room base tone.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  qa-desktop.png (1280×900), qa-mobile.png (390×844), thumb.png (720×720).
- Determinism: thumb.png rendered twice back-to-back, `cmp` byte-identical.
  Second render deleted.
- Frame one (all sizes): pale neutral room (#E4E4E0), irregular hairline
  wires visible across the frame, several already ghosting toward
  mid-span, small white connection stubs visible at the frame edges, the
  scrim band a barely-there lightening across the upper third. Mobile
  keeps the full composition, nothing clipped.
- Forced-state check: `?seed=t60` (cycle quarter) rendered at 1280×900,
  read back, then deleted: the room is unmistakably warm (#F5D8A8), the
  scrim band reads clearly across the upper third, and the wires are
  crisper and whiter than at frame one, confirming the temperature cycle
  and the definition coupling. The t=180 cool half is the same closed
  form with the sign flipped.

## Deviations

None from the prompt's substance. Two construction notes:

- The prompt's mid-span wire fade (a gradient stroke in the original
  technical note) is built from 56 stepped-alpha segments per wire, per
  the house no-gradient rule; the stepped falloff is below visible
  resolution at 1 px wire weight.
- Frame one is set at the temperature cycle's neutral midpoint rather
  than at a warm or cool extreme, so the thumbnail represents the room
  between states and both halves of the cycle read as departures from
  it. The warm peak is placed exactly at the cycle quarter so the
  warm-dominant state is easy to verify.
