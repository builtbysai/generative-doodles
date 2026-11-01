# №1198 — Blue Moon Burning

joncates study block JC7 (PP357), after *blueMoonBurning* (2024, edition 28):
glitch → rotating planet → moon surface. The piece keeps the source's
three-movement structure and its pace — everything breathes at a drone's
speed, and the movements are joined by hard cuts only. The cut is the
aesthetic: there are no fades or cross-dissolves anywhere in the piece.

## Structure — one 90 s loop, three movements

- **Movement 1 (0–25 s) — glitch.** Fourteen seeded blocks in the four
  glitch colors (#FF2BD1, #00E5FF, #FFB000, #33FF66) jump inside their home
  zones in hash steps every 0.4 s, changing size, color and mode (solid,
  translucent, outline); every fourth block trails cyan/magenta
  channel-split ghosts. Three horizontal tearing bands sweep dashes
  sideways in the same 0.4 s steps under a thin tear line. Thirty sparse
  stars sit behind. Coverage: a typical frame has ≈14% of the frame under
  blocks; the worst case (all 14 blocks at maximum jittered size,
  0.207 W × 0.115 H each) is ≈33% — always under the 40% cap.
- **Movement 2 (25–60 s) — the planet.** A flat-shaded planet, 45% of the
  frame width, centered on a 160-star field (step-twinkle, a third of the
  stars tinted blue). Ocean is flat #2B6CB0. Seven landmass blobs in
  #1E3A2F are defined in longitude strips: screen x = cx + R·sin(lon +
  rot), width compressed by cos(lon), drawn only while facing. Rotation is
  30° per 90 s cycle. Ten cloud wisps (#E8F4FF flat ellipse clusters)
  ride their own strips at half the rotation rate plus an independent
  drift, so the weather slides over the land. Shading is two flat tone
  bands only — offset circles in #1D4E79 and #13314E clipped to the disc.
  No gradients, no NASA render.
- **Movement 3 (60–89.85 s) — the moon.** An extreme close-up: base
  #9AA0A6 with flat mottling, 40 seeded craters (darker rim, lighter floor
  offset toward the light, inner shadow disc), and faint ray triangles
  from the largest crater. The surface field is larger than the frame and
  pans 5% of the width across the movement. A flat shadow disc
  (#04060D at 88%) lays the terminator over the right ~45% with a curved
  edge; craters ghost faintly through it.
- **89.85–90 s — white flash**, then the loop restarts at movement 1.
  Rotation and pan reset at the seam, hidden by the flash and the cuts.

## Interaction

Drag (press and hold) is a gravity lens: stars and cloud wisps within
180 px of the touch point swirl tangentially around it (max ≈10 px),
crater and mottle centers warp the same way on the moon, and glitch-block
centers shift slightly in movement 1. Release and the displacement springs
back with an exponential decay. The viewer warps, never pilots: no
scrubber, no movement select, no steering.

## Sound

None. The piece ships silent — *blueMoonBurning*'s low drone is part of
the source work, not drawn or synthesized here.

## Determinism & house rules

- The first frame is drawn synchronously at a fixed phase, T0 = 41 s —
  movement 2, the planet centered with landmasses and cloud wisps
  visible. The animation clock is anchored (piece time = T0 + elapsed
  since load), so frame one is byte-stable; the 720×720 thumb was
  rendered twice and `cmp`-verified byte-identical.
- All randomness is seeded (mulberry32 fields precomputed at load,
  integer hashes for per-step variation). No `Math.random`.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; the canvas CSS size is pinned in
  `draw()`; phone detection uses `window.screen` physical size (min
  dimension < 700) with an aspect fallback (portrait phones get the same
  composition, planet still 45% of width).
- No gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
  ImageData or offscreen canvas, no audio or microphone APIs. Every arc
  and ellipse is drawn as its own path.
- No visible text beyond the `<title>`.
