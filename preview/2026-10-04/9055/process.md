# №9055 · Tide Worm - process notes

## Concept
FUTURE_PIECES.md seed 74: a chain-follow worm creature with INVERTED escalation.
Move the pointer slowly and calmly and the worm unfurls into a long graceful
ribbon with soft bioluminescent bands, following the pointer with lag and
weight. Move fast and agitated and it knots into a tight ember ball and hides.
The calm state is only discoverable by being calm. The piece rewards stillness.

Default state: with no pointer input at all, the worm drifts on a slow seeded
path, fully unfurled, so the piece is gorgeous with zero interaction.

## Construction
- Single self-contained page, canvas 2D, no libraries. All randomness from
  mulberry32(seed); default seed 555 (violet family, 26 segments, 4 bands).
- Head eases toward its target with lag; body segments chain-follow with
  fixed rest spacing, so the ribbon has weight. A render-time perpendicular
  traveling wave gives the idle swim (physics untouched, so the chain never
  destabilizes).
- Pointer speed is estimated with an exponential moving average. Below
  55 px/s the worm is calm; above 420 px/s it is fully knotted; smoothstep
  crossfade between, with fast engage (1.6/s) and slow release (0.45/s) so
  unfurling feels like a reward.
- Unfurled: segments space out, gentle idle wave, per-segment band
  brightness traveling along the body, additive glow pass under a soft body
  pass under a bright core thread, luminous bulb head, tail dissolving into
  the dark over the last stretch.
- Knotted: rest spacing collapses and segments ease onto a tightening spiral
  around the head with a slow tremble; bands dim and shift to ember
  (hue 14, low lightness).
- Field: near-black blue-green gradient, two barely-there color washes in
  the family hue, 110 drifting marine-snow specks, vignette.
- With no pointer for 2.5 s the head follows a seeded drift path with a soft
  radial leash toward center, so the long trailing body stays composed in
  frame. Body is pre-settled before the first frame (S-curve lay plus 4
  simulated seconds at 1x speed).
- Click mints a fresh worm in place (new seed, new palette family among
  teal/violet/amber, 24-40 segments, wave and band params, glow intensity)
  with a short fade, and writes ?seed= via replaceState for sharing.
- One-line hint caption only, no other UI chrome.

## Seed mechanics
Deterministic per seed: same seed always builds the same worm design
(palette family, segment count, band count, wave params, glow, head size,
drift choreography). Verified: two rebuilds of seed 555 produce identical
seeded params and identical 600-fixed-step simulation digests; seed 999
differs. Live motion integrates wall-clock time, so two loads sample the
same choreography at different moments, which is the honest meaning of
deterministic here.

## Differentiation
Checked against the ledger's used concept families. Nearest live neighbors:
№8972 Eye Garden (field of eye-pair sprouts with per-sprout energy meters,
pointer proximity dilates pupils, wake relaxes back) and №9024 Personal
Weather (interaction-residue wind field with pointer-painted barbs).
Tide Worm is distinct: a single ribbon creature, one body, where the
interaction axis is pointer SPEED (calm vs agitated) with inverted
escalation, not proximity. No other piece uses speed-gated regime
crossfade, knotting behavior, or bioluminescent banding on a chain-follow
ribbon. Concept family: "calm-responsive ribbon creature: chain-follow
body, speed-EMA calm/agitated regimes, unfurl vs ember-knot."

## Variants considered
- Variant A (shipped): layered round-cap strokes per segment, wide faint
  additive glow plus soft body plus bright core thread. Reads as a living
  bioluminescent creature.
- Variant B (rejected): hand-built quad strip with flat per-segment fills
  plus one underlay glow stroke. Rendered comparison showed visible seams
  at quad joints and a segmented, mechanical, caterpillar-armor read.
  Killed: it looked like a toy, not an animal.
- Iteration history: first warmup ran the head along the drift path at 5x
  speed and folded the chain into a zigzag (seed 7 read as broken);
  fixed with an S-curve lay plus 1x-speed settle. Body shortened and a
  center leash added after tails kept exiting the frame. Band floor raised
  so the body reads continuous rather than beaded.

## QA log
- cdp_exceptions.py (Runtime enabled before navigation, continuous
  collection), isolated Chrome 152 on port 9343: desktop 1280x800 default
  seed, desktop ?seed=12345, mobile 390x844: all exit 0, zero console and
  page errors.
- CDP input test: rest knot 0, fast zigzag wiggle drives knot to
  0.94 (tight ember ball, spiral structure visible, dims correctly), slow
  moves plus stillness recover to knot 0. Screenshots of calm, knotted,
  and recovered states all inspected.
- Determinism: rebuild(555) twice then 600 fixed steps gives identical
  digests; rebuild(999) differs.
- Viewports: no scroll or overflow at 1280x800 and 390x844; caption wraps
  cleanly on mobile.
- thumb.png: 720x720 captured straight from the live canvas via
  toDataURL (pixel-fresh, bypasses compositor staleness); three moments
  captured, the 19 s frame chosen for its full S-curve composition.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
