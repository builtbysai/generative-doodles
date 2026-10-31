# No.899 — Phy/s[a]/ru.'m

Study #110 sakrmusic, PP60 "Slime Vein".

## Concept

A pale-grey slime mold under a microscope: a reticulated network of tubular
veins with bright lumens, granular in texture, spread across a pale ground.
The piece is the growth and dissolution cycle, never a static print. The mold
grows outward from seed clusters while it is fed; unfed, its deposit thins,
the lattice melts into soft cloudy puffs gathered toward the corners, and at
full dissolution it reseeds itself from a single seed and starts over. Drag
to feed it, tap to drop a new seed, double-tap to starve it. Palette
discipline is total: pale ground, mid-grey tubes, bright lumen cores, one
soft puff grey, one grain grey. No color anywhere.

## Construction

- One self-contained `index.html`, canvas 2D only, no external assets.
  Palette is strict: ground `#ECEAE6`, vein tube `#8A887F`, vein core
  `#F5F4F0`, dissolution puff `#C4C2BA`, shadow grain `#A5A39A`.
- The mold is a classic Physarum agent model on a deposit grid. The grid is
  220 cells wide; its height follows the frame aspect (220 at square, up to
  400 on a tall phone) so cells stay square and the veins never stretch.
  2,500 agents (1,500 on phones, detected via `window.screen` min dimension
  under 700 px with the aspect fallback). Each step, every agent senses the
  deposit 4.6 cells ahead at -0.45, 0, and +0.45 rad, turns 0.38 rad toward
  the strongest reading (small seeded wander when the center wins), moves
  1.5 cells, and deposits. The field is diffused each step with a 3x3 blur
  mixed at 0.12 and decayed (x0.993 fed, x0.988 starving). Edges wrap.
- Rendering is flat rects only, one per cell, through a 65-step tone LUT:
  deposit runs ground to shadow grain (0 to 0.20), grain to vein tube
  (0.20 to 0.58), tube to bright lumen (0.58 to 1). A static per-cell seeded
  grain factor (0.78 to 1.23x) breaks the field into fine granular texture,
  and cells with almost no deposit show sparse grain speckle instead of a
  flat wash. No gradients, no shadowBlur, no `ctx.filter`, no offscreen
  canvas.
- Hunger: a feed level starts at 1 and drains over about 55 s. Deposit per
  agent scales with it (0.35 + 0.65 x feed), so as the feed runs out the
  deposition thins and decay wins: the network melts. While starving, 14
  seeded corner-biased puffs (three layered flat-alpha discs each) fade in
  with the dissolved fraction, 1 - meanDeposit / 0.07, clamped. When the
  starving mean deposit falls under 0.006 the grid clears and the mold
  reseeds from one cluster at a seeded position, feed restored.
- Interaction: drag lays nutrient along the path (deposit +0.45 in a small
  disc at each point along the segment, feed +0.0012 per px dragged), and
  the agents grow toward it through the ordinary sensing rule. A tap drops
  a 220-agent seed cluster at the tap point. A double-tap sets feed to 0:
  forced dissolution, then the automatic reseed. Nothing reloads.
- Audio starts only on the first pointer press: a bubbling granular texture
  of short band-passed noise grains (a 0.09 s seeded noise buffer with a
  baked decay envelope, playback rate and band frequency jittered per
  grain). Grain rate and brightness follow mean deposit, so growth thickens
  and brightens the bubbling and dissolution thins it to a whisper. All
  AudioContext use is lazy and typeof-guarded; the piece renders complete
  and silent with no audio support.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `draw()` pins `canvas.style.width`
  and `canvas.style.height` in px every frame. The page ground is the pale
  ground at every size.

### Determinism

Frame one is the synchronous draw after a fixed pre-roll of **80 sim steps**
at full feed from the seeded initial state (three clusters, mulberry32 seed
89960). No drawn state derives from `Date.now()`; the live loop runs on a
fixed 1/30 s timestep accumulator fed by rAF timestamps, and every random
draw in the system comes from the seeded streams (one for the sim, one for
audio grain jitter).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`: `qa-desktop.png`
  1280x900, `qa-mobile.png` 390x844, `thumb.png` 720x720. Renders clean in
  silence (no AudioContext in the harness).
- Determinism: `thumb.png` rendered twice and compared with `cmp`:
  byte-identical, re-verified after the final tuning round. The duplicate
  was deleted.
- Tuning round 1: the first build (150x150 grid, diffusion mix 0.5, 220
  pre-roll steps) read inverted and flooded: diffusion filled the ground
  between veins with mid-level deposit, so the frame showed fat white
  tubes on grey clouds at near-full coverage. Diffusion mix cut to 0.2,
  decay strengthened, LUT stops remapped so low deposit stays near the
  ground tone, pre-roll cut to 130, and the grid made aspect-aware so the
  tall phone frame stopped stretching the veins vertically.
- Tuning round 2: still too blobby at desktop size. Grid widened to 220
  cells (sense distance and step rescaled to match), diffusion mix cut to
  0.12, deposit raised to compensate for the sparser agents, pre-roll cut
  to 80. Result: distinct seed hubs, thin tubular veins with bright lumen
  cores and grey walls, open pale ground between the hubs.
- Read-back, final: pale ground with a grey reticulated vein network
  spreading organically from three seed hubs, granular speckle texture in
  the open ground, no color, no text. Mobile render keeps the same
  organism undistorted in the tall frame with nothing clipped.

## Deviations

- Grid height follows the frame aspect instead of the brief's square grid,
  so cells stay square and veins keep their width on tall phone frames.
  Recorded here; the agent model is unchanged.
- Tap seeds land after a 0.35 s deferral (the house disambiguation window)
  so a double-tap can cancel the seed and starve the mold instead of doing
  both.
- Starving uses a faster field decay (x0.988 per step against x0.993 fed)
  so a double-tap starve melts the network in seconds. Without it the melt
  would take most of a minute and the gesture would read as broken.
