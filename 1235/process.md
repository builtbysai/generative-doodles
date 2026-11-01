# №1235 — Emulsion Lifts

Christina Battle study block CB4 (PP394), after her c.2004 emulsion-lift works: peel the emulsion off a film image and reapply it like collage, "resembling the shattered perspective of the Cubist painter."

A found-footage prairie street — four faded houses, a water tower, a road running to the horizon, a tornado cloud standing on the skyline — plays inside a film frame with sprocket holes down both sides. Every 12–18 seconds a section of the image lifts: a translucent emulsion sheet peels back from an edge in a curled shard, the blank leader (#E8E2D4) shows where it was, the shard drifts with a soft shadow under it, and then it re-adheres in the wrong place. The scene is never repaired. The collage keeps un-collaging itself.

## House adaptation

The prompt's offscreen-canvas shard texturing is replaced by **data shards**. The scene is a list of polygon shape records (house bodies, roofs, doors, windows, the water tower's tank, cone, band and legs; the sky, funnel, road and ground are locked background and are never lifted). Each shard is a polygonal region of the frame plus a lifecycle. When a shard lifts, its shapes are redrawn under a curl transform at the shard's drifted position, clipped to the shard's current outline, and the vacated region is painted back to blank leader. Shapes are captured approximately, as specced: a shape belongs to a shard if its centre falls inside the shard's polygon.

## Shard ownership model

- A deterministic schedule of 48 peel events is generated from the seed (№1235; double-tap increments a salt and rebuilds it). Events are spaced ~14.5 s apart; each flight lasts ~11–12.5 s, so at most one or two shards are ever in flight — under the cap of five.
- Ownership is resolved once per schedule, walking events in order: a shard captures every shape whose **current** centre (base position plus the settled offsets of its earlier owners) lies inside its polygon, skipping shapes already in flight at its start. A shape can therefore be lifted, settled wrong, and lifted again later from its new home.
- A shape's drawn position is the composition of its owners' transforms in event order. Settled owners contribute their final offset/rotation and a residual curl (p = 0.18 — a re-adhered shard never lies perfectly flat, and keeps a faint backing outline). Once more than nine shards have settled, the oldest stop drawing their backing and read as plain scene.
- Lifecycle per shard: dormant → **curl** (3 s, stick-slip progress curve — the emulsion resists, then gives) → **drift** (7–9.5 s, stepped in 14 reluctant increments, fold relaxing from p = 1 to 0.55) → **settle** (0.6 s, p → 0.18) → settled at the drift's end point, which is never the shape's home.

## The curl

The fold is computed in the shard's local frame: s runs 0 at the free edge to 1 at the hinge, and the fold line sits at s = 0.85·p. Points past the fold compress slightly; points behind it mirror back over the fold with a sideways slant (direction hashed per shard), so the flap lies over the attached part like wet emulsion, not like a stock page-curl. Fold shading is two flat alpha polygons — a darker tone on the flap, a faint light on the body — with a stroked fold line. No gradients anywhere.

One rendering subtlety worth recording: the fold mirror-flips the flap polygon's winding, so the silhouette region and the flap cannot share a single clip path — under nonzero winding they cancel in the overlap and the curled content vanishes. The sheet is therefore drawn in two passes (silhouette, then flap), which also makes the folded part sit visibly on top of the sheet, one layer thicker, the way folded film actually looks.

## Interaction

- **Drag on a shard** tugs it: the sheet follows the pointer (clamped), and on a still-curling shard the pull also deepens the lift by up to +0.3. On release the tug decays to half and that half is baked into the shard's final resting offset — you can help peel, never repair.
- **Double-tap** reseeds the peel order (salt + 1, schedule rebuilt).
- Watch-only otherwise; a peel event every ~14.5 s.

## Determinism

The synchronous first frame is drawn at fixed phase T0 = 21 s. The whole schedule is a function of the seed, so frame one is exact: shard 0 (house 3's roof and windows, lifted at t = 3 s) has already re-adhered at +74/+58 — the roof sits down-right of its house, over the grain elevator, the windows near the ground — and shard 1 is mid-curl at p ≈ 0.52 on the left edge, the water tower's tank and cone folded on the sheet, blank leader beneath, the tower's legs standing bare. The rAF loop is typeof-guarded and anchored as T0 + elapsed; gate weave (±1.2 units) and grain are functions of the 12 fps step index; all randomness is the seeded integer hash — no unseeded random source, no audio, no microphone, no offscreen canvas, no image data. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window, the canvas CSS size is pinned in draw(), and phone detection uses window.screen physical size (min dimension < 700) with an aspect fallback.
