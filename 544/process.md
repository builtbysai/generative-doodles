# Archetype, Rebuilt - №1680 (KG1, #221 kjetil-golid, PP927)

## What it feels like

An empty field becomes a city while you watch. A cut lands, a rectangle
doubles into two, and the new blocks rise out of the plane and settle.
Big quiet zones sit next to dense shards of small blocks, the way a real
city has parks next to tower blocks. After a few minutes the whole scene
changes its mind: a new palette, a new angle, and the city rebuilds itself
from empty under the new rule. The mechanism is the picture.

## Mechanism

A recursive binary split tree grows one split at a time. The plane starts
as a single rectangle; every 1.1 seconds the largest-ish leaf (area
weighted, seeded) splits along its longer side at a seeded position
between 35% and 65%, and its two children rise from height zero over half
a second with an ease-out. No leaf ever overlaps another: the no-overlap
constraint is the mechanism. Each leaf is extruded into a shallow
isometric block with fixed-light face shading (top full color, one side
0.70, the other 0.52), drawn far to near by painter order. Black gap
lines (#1A1A1A) come from the black plane base showing through a fixed
inset around every block.

Three traits rotate on a 150-second cycle, each with its own seeded tree:

1. Mustard/red/cream (#D9A021 / #B33A2B / #EFE6D4), straight top-down,
   flat rectangles, no extrusion.
2. Rose/maroon/cream (#D97B7B / #7A2A35 / #F2EAD8), shallow isometric,
   blocks rise with face shading.
3. Purple/yellow/blue (#6B4E8E / #E8B425 / #2B4A8C) in a turquoise frame
   (#5BB8B0), extreme angle: the plane compresses toward the top edge,
   blocks cluster there, flat near-white space below.

On a trait swap the camera and palette morph over 5 seconds while the
geometry rebuilds from empty; the geometry is never morphed mid-build.
Between swaps the camera drifts slowly (rotation plus or minus 1.5
degrees, squash plus or minus 0.015), zero at frame one. Color is
systematic, never random per block: leaves of area 0.06 or more are the
quiet color (cream, cream, yellow); smaller leaves alternate the two
saturated colors by leaf id, so siblings always differ.

## Asserted counts

- 64 leaves and 63 splits per trait tree, all three traits (verified by
  instrumented render; log line removed before staging).
- Build completes 68.2 seconds into each trait window; the trait holds
  with ambient drift until the 150-second swap.
- 20 blocks visible at frame one (t = 20 s): splits 0 through 18 landed.
- Split positions 35% to 65% of the side; minimum leaf side 0.028;
  maximum depth 7.
- First frame is deterministic: fixed seeds, fixed phase (t = 20.0),
  drift zero at frame one. Thumb re-rendered three times, md5 identical:
  cef67d571e51c60b7bb82b81914cbd07.

## Deviations from the prompt

- The prompt names the third palette "purple/yellow/blue in a turquoise
  frame" with no quiet color of its own; yellow (#E8B425) plays the quiet
  role there, as the lightest of the three.
- The prompt says blocks cluster at one edge "leaving flat white space";
  the space is near-white (#F6F1E7) rather than pure white, so it sits
  with the cream grounds of the other traits.
- Trait windows are 150 seconds ("every few minutes"); the prompt gives
  no exact interval.

## Interaction

Watch-only. No interaction. "Watch the city assemble."

## House rules

Motion loop with fixed-phase first frame; canvas pinned in draw() via
canvas.style.width/height in px; resize listened to on visualViewport
and window; phone detection via window.screen (min dimension under
700 px) with aspect fallback; field full-bleed on phones, square on
desktop; one synchronous frame at load; requestAnimationFrame guarded
by a typeof check; reduced-motion renders the static first frame only.
No em dashes in visible copy.
