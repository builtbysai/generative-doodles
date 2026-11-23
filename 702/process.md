# Doodle №9006: Overprint (2026-09-07)

**File:** `9006/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A grain study in the discipline of Matt DesLauriers's print work: two inks on
warm paper, indigo and rust, laid over one simple geometric system. I committed
to a 7x7 grid of quarter-annulus Truchet tiles. Each tile carries a single
quarter ring anchored at one of its corners; a low-frequency noise field picks
the anchor, so neighboring tiles agree often enough that long meandering bands
grow across the grid, with dead ends where they disagree. The indigo pass prints
the full grid. The rust pass prints tighter, thinner arcs on only some cells,
gathered in a soft seeded region, and lands a few units off register with a
slight rotation, the way a tired press would lay it down. Overlaps use multiply
blending, so the two inks darken where they cross, exactly like real overprint.
Faint crop marks sit outside the print block.

## Technique: grain that lives inside the ink
No overlay filters anywhere. The texture is baked at draw time:

- **Paper tooth first.** Warm cream base, then large soft mottling (warm darker
  and lighter blotches at very low alpha), then per-pixel luminance noise
  composited with `overlay` so it bites into the paper tone instead of sitting
  on it, plus a few hundred faint fibre strokes.
- **Ink drawn as starved bands.** Each arc is 44 small quads, not one smooth
  stroke. Per-quad alpha follows a noise field (ink starvation along the
  stroke), and each quad's inner/outer radii are jittered independently for
  rough letterpress edges.
- **Stochastic grain cut into the ink.** After a pass is drawn, a per-seed
  grain mask (broad density drift plus finer mottling plus speckle dropouts)
  is applied with `destination-in`, so the grain exists only inside the ink
  areas. The paper shows through the speckles.
- **Misregistration as structure.** The rust pass is drawn to its own canvas
  and composited offset by a few units with a ~0.24 degree rotation, so the
  echo between the passes is a real spatial shift, not a blur.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click the piece for a new
  variation.
- Default seed 314159: rust gathers bottom-left, long indigo bands sweep the
  top, good breathing room. Chosen over 4177, 90210, 555, 271828, 161803 after
  side-by-side renders; 314159 had the strongest compositional focus and the
  cleanest band flow.

## Verification
- Rendered headless via Chromium CDP (isolated port 9331) at 7 seeds across
  three code iterations; every seed cohesive, no dead or empty grids.
- Click regeneration verified via CDP: seed updates in URL, zero console
  errors on load and after click.
- Viewport invariance by construction: all layout in fixed 1000-unit virtual
  space, fixed 1200px backing canvas; identical composition at 1280px desktop
  and 390px mobile. Mobile: no overflow, footer intact.
- Thumbnail 720x720 captured from the stage canvas at default seed.
