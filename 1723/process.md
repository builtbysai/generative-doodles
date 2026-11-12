# №1723 - The Intrusion (zach-bodtorf PP970/ZB4, EXPANSION #226)

Driver: a flat marigold calm holds against a block of fBm turbulence entering from the right; the hard mask boundary is the tension, and tap moves where the intrusion originates.

## Spec

- Title: The Intrusion. Gallery date: 2006 · 09 · 30 (formula 2002-01-10 + 1724 days).
- Hint: "Tap to reseed the intrusion."
- Interaction: tap (pointerdown) advances to the next origin in a fixed 8-entry reseed table; the noise lattice is rebuilt from that origin's seed and the piece redraws. Never a reload, never click-to-reload.

## Acceptance criteria (numbers)

- Turbulence coverage: 0.34 of frame width (mask boundary at u = 1 - 0.34 = 0.66), occupying about a third of the frame from the right edge.
- Octaves: 5 fBm octaves, lacunarity 2, gain 0.4, base frequency 1.8, plus domain warp (low-frequency value noise, amplitude 0.55) so the field reads as billowing fractal turbulence, not static.
- Grid: 120 x 120 cells, rendered blocky (imageSmoothingEnabled off in browsers; per-cell rects in the node-canvas fallback).
- Churn rate: fBm sample coords drift on a 24 s period (drift amplitude 0.06, slow sine/cosine); the boundary wobbles with two slow sines on the same period. No strobing, nothing above 14 Hz by construction; no audio.
- Tap reseed: 8 fixed origins (x in 0.70-0.92, y in 0.15-0.85), each with its own lattice seed; tapping cycles 0-7 then wraps. The origin shifts the noise sample offset and anchors the boundary wobble phase.
- Mask edge: rectangular mask with a soft animated edge, feather width 0.022 of frame width, plus a thin ember boundary line (rgba(58,5,0,0.55)) traced along the wobbling boundary curve.

## Palette (hand-picked hexes; see Deviations)

- Marigold ground: #F5A623
- Hot ramp (fixed 8-stop colormap, dark ember to white-hot):
  #3A0500, #7A0C02, #A81300, #D93A0B, #F2620F, #FF8C1A, #FFB347, #FFE9A3
- Plates: #17120F ground, #FFFDF8 title ink, #F5A623 hint/date ink, plate line rgba(255,166,35,0.55).

## Frame one

- Fixed phase t = 3.0 s of a 24 s period; origin index 0; PRNG mulberry32(1723); lattice from mulberry32(1723 * 1000 + 0 * 7919). No Math.random, no wall clock for frame one. requestAnimationFrame guarded by typeof check; reduced-motion respected.

## House rules

- Visual Viewport sizing, resize listeners on both visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension < 700 px) with aspect fallback (h > w * 1.15).
- Field-like composition: marigold fills the whole frame in every viewport; the turbulence block is anchored to the frame's right edge (full frame height), not to a centered square stage.
- One synchronous frame at load; no em dashes in visible copy; no AI-signature copy.

## Deviations from the prompt

1. 2D canvas instead of p5.js/shader: node-canvas QA has neither p5 nor WebGL, so the fBm is seeded value-noise octaves in plain canvas 2D with a fixed colormap. The visual result (hot inferno ramp, churning field) matches the prompt.
2. Hexes hand-picked: studies/zach-bodtorf.md does not exist in the repo, so the marigold and hot-ramp hexes were chosen from the prompt's named colors (flat marigold ground, red-orange turbulence, hot inferno-like ramp) and recorded above.
3. Boundary is a wobbling near-vertical curve rather than a perfectly straight rectangle edge: the prompt asks for a "slightly soft animated edge", and the slow two-sine wobble plus feather gives that while keeping the boundary sharp and geometric in character.
4. The turbulence is rendered as chunky 120x120 blocks (per the prompt's "blocky region") rather than smooth per-pixel noise.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually. Round 1 was too fine-grained (read as static); fixed by lowering base frequency to 1.8, adding domain warp, dropping gain to 0.4, and coarsening the grid 200 to 120. Final renders: marigold calm dominant, turbulence block about a third from the right, sharp wavy boundary with ember line, hot ramp with no pastel, plates not colliding at any size. thumb.png is the 720x720 render output.

Fix round (2026-11-12): the turbulence was clipped to the centered square stage, so on desktop it ended ~190 px short of the frame's right edge and read as a floating column. Fixed by drawing the turbulence over a full-frame rect anchored to the viewport's right edge in all viewports (stage clip and stageRect removed); boundary, feather, ramp, reseed, and fixed-phase frame one unchanged. Re-gated at all three sizes: desktop render shows the block touching the right edge with no marigold strip beyond it, about a third of the frame, plates clear. Two desktop renders byte-identical (md5 39c7b598a6b3a94ea9a0a4a17abdbe32).
