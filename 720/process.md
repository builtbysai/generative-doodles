# №9026 · Flight Deck — process notes

## Concept
Seed 101: Sassarini's z-stack flight rig (seven fogged depth levels, additive
sprites, slow forward camera flight, gentle rotation on approach, wrap-around
layer cycling) pointed at a different cargo: 3D flow-field particle trails.
1680 additive particles (240 per level, 110 on mobile) advect on a true 3D
curl-noise flow field (seeded simplex, finite-difference curl of a vector
potential, plus a gentle divergence-free swirl about the flight axis and a
slow axial current) and leave fading trail ribbons in world space via a
per-level ring buffer of line segments with birth-time alpha fade in the
shader. Each level spawns its particles in an annulus around the flight axis,
so every depth level reads as a luminous gate of swirling trails you fly
through; gates rotate faster as they approach and reseed with a fresh flow
phase when they wrap from behind the camera to the far end. Palette is a
curated phosphor/warm journey across depth (five seeded pairs, e.g. phosphor
green to amber) with warm-white spark accents on ~10% of particles. Click or
tap crossfades to a fresh seeded system; pointer gives subtle look-around
parallax; sim pauses when the tab is hidden.

Deliberate differentiation from №9009 "Corridor": Corridor is a camera
flythrough of a flat quadtree composition projected down a corridor. Flight
Deck is true volumetric 3D: seven independent particle volumes at real
depths with exponential fog, parallax, and a camera that physically passes
through the gates. The cargo is flow-field trails, not Hopalong orbits, not
flat geometry.

## Seeds tried
902607, 7, 424242, 99, 11 (all at 1280x800, ~12-14s to let the flight develop).

- v1 (uniform-box spawn, no gates): read as flat scribble, no depth, muddy
  center clump. Rejected the approach, not the seed: respawned particles into
  an annulus per level so each depth level becomes a gate.
- v2 (strong swirl 0.10-0.32): gates appeared but trails were near-perfect
  circles, curl texture invisible. Cut swirl to 0.02-0.07, added slight level
  tilt and a weak axial current.
- v3: tunnel read beautifully on 902607 and 7; 424242 produced harsh
  warp-drive streaks when the camera sat inside the nearest gate (axial
  current dominating in weak-curl regions). Cut axial current 8-30 to 3-11.
- v4: 424242 calmed into a proper tunnel; 99 and 11 confirmed the other
  palette pairs render (teal/cyan outer arcs with warm cores).

## Why seed 7 won
Most dramatic first impression: an asymmetric spiral with a bright warm-amber
core pulling the eye down the tunnel, organic variation in the outer arcs,
phosphor green to amber journey exactly matching the dark-studio brief. The
runner-up 902607 was calmer and more concentric; 7 has more energy and reads
better at thumbnail size.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0) on isolated port 9331.
- Click reseed tested via CDP: seed line 7 -> 419034334, trails rebuilt,
  no stuck fade.
- 390x844 mobile: no overflow, tunnel reads even better in portrait; fixed a
  bottom-UI collision (seed line vs hint) with a small-screen media query.
- thumb.png is exactly 1280x800.
