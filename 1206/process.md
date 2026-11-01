# №1206 — Float / Sink

Evan Meaney study block EV7 (PP365), after the Ghosttown Spirit
Simulator (Meaney led the 3D ghosttown design; SAIC archive): "Press
spacebar to float weightless. Press C to sink… Hey tumbleweed, yer
system clock's a tick'n…!"

## Relationship to №1194

№1194 "Ghosttown, Never Twice" built this same town from jonCates'
side: a fixed side view that watches era-seeded towns dissolve and
regenerate, the visitor a witness who can only summon the dissolve.
This piece is Meaney's side of the collaboration — the first-person
3D-design side. There is no side view and no era counter; the visitor
is *inside* the town and the mechanic is altitude itself. The two
pieces share a subject, not a system.

## The view

A first-person drift at the blue hour, canvas 2D / 2.5D parallax — no
WebGL. The sky is 12 flat bands running from deep Meaney blue #0A1E5E
at the top to #2A4FD8 at the horizon; a pale moon hangs upper right.
Below the horizon a dark street corridor runs from the vanishing point
at frame center out to the bottom edge, buildings #141019 scattered
left and right, the main street always empty, the horizon always
visible. Fifty dust motes (#8A8A93) drift through the air.

The town is drawn in three depth layers (far 6 buildings, mid 7, near
5), each building a silhouette box with a flat, gabled, or parapet
roof, a top face tipped toward the vanishing point, and a few dim
blue-hour windows. One mid-layer building on the right is always the
water tower (#1E1420): cross-braced legs, a tank with a rust #6B4F35
band at its foot and a rust conical roof. Rust fences at 60% alpha run
along both street edges in the near layer. Every layout is generated
from the arrival seed (mulberry32): widths, heights, roofs, sides, and
lateral jitter are hashed per seed, the street gap always central.

## Buoyancy — the only control

There is no HUD, no score, no map, no buttons, no text. Altitude
(0–40, units shown nowhere) is the whole interface:

- **Press and hold** — float up at +3.2 units/s.
- **Second touch, or a hold at the bottom edge of the screen** — sink
  at −4.5 units/s.
- **Release** — hang in the air with a slow hover bob,
  0.25·sin(t·0.11).

Altitude is **not** frame-integrated state. Every change of touch mode
is recorded as a rate segment {time, rate}, and altitude at any moment
is a closed-form walk over that segment list, clamped to [0, 40]. The
same event list always replays to the same altitude.

Parallax math: a building at depth d (0 = horizon, 1 = nearest) bases
at `baseY = horizonY + (H − horizonY) · d^1.4 · (1 + a·0.011·(0.25 +
0.75d))`, so altitude pushes nearer bases down-screen up to ~1.44×
their ground offset while far bases barely move; apparent height
scales by `1 / (1 + a·0.005·(0.3 + 0.7d))`, a mild shrink. Rising drops
the near buildings toward and past the bottom edge and opens the sky;
sinking brings the fences and facades back up. Fences ride the same
ground formula, so the whole town breathes as one body.

## Arrivals, shear, dissolution

The town is laid out per arrival: session start, and again after 60
seconds with no touch, when a 1.6 s dissolve of hashed static bands
fires and the seed increments — you can never step into the same
Ghosttown twice. The idle state is a pure function of piece time and
the recorded activity times (before the first touch, the town only
re-seeds once piece time passes 240 s). The new town takes over at the
dissolve's midpoint.

Every 10–20 seconds (hashed schedule) a shear event wipes the view for
1.1 s: the scene is drawn in 10 horizontal strips, each translated by
a stepped hash offset (re-hashed every 0.18 s) under a sine envelope,
and magenta #FF2B8D fringe lines run along the rooftops that sit in
displaced strips. Slivers the strips vacate are backed by a full-frame
deep-blue fill, so a tear reads as sky, never as void.

## Determinism / house rules

- Synchronous first frame at the fixed phase **T0 = 14 s**, altitude
  ≈ 6.25 hovering, no shear active (the first shear starts at
  t ≈ 16.96 s): three depth layers, the tower mid-frame right, the
  street vanishing to the center horizon, fences near. The rAF loop
  (typeof guarded) is anchored at load + elapsed; no wall-clock state.
- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via `window.screen` (min dimension < 700 px) with
  the aspect fallback — full-bleed at every size.
- Seeded hashes / mulberry32 only. No gradients, no `ctx.filter`, no
  shadowBlur, no `createElement`, no ImageData or offscreen canvas, no
  audio, no microphone. The moon's arc is its own path with a `moveTo`.
- Silent by design. No visible text beyond `<title>`.

## QA

Rendered with the house node-canvas renderer at 1280×800, 390×844 and
720×720. The 720×720 thumb was rendered twice and `cmp`-verified
byte-identical. Off-phase test renders (temporary copies, discarded)
confirm the mechanics: at t = 17.4 s, mid first shear, the whole view
tears into stepped strips with magenta fringes on the rooftops; with a
synthetic hold injected, altitude walks the segment list to the 40
clamp and the near buildings sink past the bottom edge while the tower
clears the rooftops; with a synthetic two-touch, altitude walks to 0
and the town settles to street level.
