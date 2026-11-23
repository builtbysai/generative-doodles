# Doodle №8967: Bleed Ledger (2026-07-30)

**File:** `8967/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept

From the Tir wound map (private sketchbook, seed 208): every color trail
carries its wound at the head, a pitted dark hole from which the streak
falls. The composition is negotiated by three hands:

1. **The artist** places hidden pigment pockets (six seeded cluster
   centers, spread across the panel).
2. **A marksman** sets each wound as a gaussian draw around one pocket
   (Box-Muller sigma ~5.5% of panel diagonal), re-shooting up to 40 times
   if the hole would land on another wound, so every crater stays readable.
3. **Gravity** finishes each streak: 46-72 individual streaklets fall from
   just below the wound with per-segment gaussian turbulence, a slight
   seeded lean, tapered fade-in at the top and fade-out at the tail,
   occasional drip beads where a streaklet gives up, and fine spatter.

Colors never mix at the source: each wound draws from one unmixed
pigment bag (madder, vermilion, ochre, viridian, ultramarine, iron
black; four bags chosen per piece). Streaklets vary only in tone of the
same bag. Each wound is drawn first: an irregular dark crater with a
radial pit-black gradient, a shadow rim lower-right, a light crescent
upper-left, darker-than-dark pits with hairline highlights, satellite
splatter pits, and a faint seep halo of its own color. The trail follows,
so any streak can be read backward from its edge to the exact hole that
made it, and no color sits on the panel without a point of injury.

The ground is a pale plaster ledger page with faint ruling, a thin plate
rule, and paper tooth. Tap/click re-runs the three hands with a fresh
seed (`?seed=` in the URL).

Gallery caption: "№8967 · Bleed Ledger. The artist hides the pockets,
the marksman sets the wounds, gravity bleeds them down. Tap to
renegotiate."

## Differentiation

- vs №9014 Bloom (exact ink geometry overlaid with simulated watercolor
  washes): Bloom is a calm, layered watercolor system, Gaussian
  midpoint-displacement glazes, edge pooling, granulation, wet/dry
  variance over precise ink geometry. Bleed Ledger shares the
  painterly-paper mood but has a completely different physics and
  subject: ballistic falling streaks drawn from dark wound holes, three
  negotiating hands (pockets, gaussian marksman, gravity), streaklets
  instead of washes, pitted crater detail instead of glaze pooling.
- vs №9022 Accumulation (animated procedural density-field sandpainting,
  grain-by-grain reveal): Accumulation is about accumulation, thousands
  of translucent grains rejection-sampled from authored motif fields
  revealed over time. Bleed Ledger is a single frozen negotiation with
  no grains and no reveal animation: one wound, one unmixed bag, one
  gravity-finished fall, with the hole and the trace-back as the subject.

## Seeds tried, default seed

Rendered headless at 1280x800 and inspected, then 390x844 for the
finalists: 208 (sketchbook seed), 41, 7, 99, 1400, 20804.

- 208: decent but palette missed red/green and the left half sat empty.
- 7 (first version): wounds clustered on one pocket into a muddy blob
  that hid craters; this found the structural fix, min-separation
  re-shooting in the marksman step.
- 41: strong, even spread, four-pigment palette, but streaks shorter and
  less varied in length.
- 99, 1400: fine but left dead zones in the panel.
- **20804 (default):** won. All five non-black pigments present
  (ochre, iron black, vermilion, madder, ultramarine), wounds spread
  across the full panel width, the widest range of streak lengths
  (including one very long ochre fall on the left and a long madder
  fall center), visible drip beads, every trail traceable straight up
  to its pitted hole, no two craters overlapping.

## QA

- Zero console errors and zero exceptions on desktop 1280x800 and
  mobile 390x844, verified with `~/workspace/tools/cdp_exceptions.py`
  (exit 0 both viewports).
- No scroll or overflow at either viewport; caption and seed tag do not
  overlap at 390px.
- `thumb.png` is exactly 1280x800, captured from the shipped page at the
  default seed.
- All captures on isolated remote-debugging port 9338.
