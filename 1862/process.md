# No.1862 - Burn Into Light (CK7, PP1109)

Source prompt: TASKS.md, carla-kihlstedt block, PP1109 - "Burn Into Light".
A winter forest at dusk; hooded figures in ornate red robes carrying candles
and an open book process in a slow loop along an S-curve through the trees,
never arriving. As each figure passes a tree, the tree answers with a low
resonant tone and its bark briefly shows the red of the robes reflected. The
book is read aloud in fragments: rules for the last human beings. The candles
gutter but never go out. Palette: winter blue dusk, snow gray, robe crimson,
candle gold, page white. Watch only.

Driver in one sentence: five hooded crimson figures wind along an S-curve
through a snowy dusk forest, their candle flames the only small bright points,
and every tree they pass flushes red and lets a faint ring spread from its
trunk while the lead figure's open book offers one short fragment per lap.

## Palette (hand-picked hexes from the prompt's named colors)

- Winter blue dusk: #16233A (sky top), #223252, #2E3E5C, ground #1C2A45
- Snow gray: #AEB6C0 ground drift, #C9CED4 flakes and snow edges, #8A97A8
- Robe crimson: #A4121F lead robe, #7E0E1B trailing robes, #C22430 flush
- Candle gold: #F2C14E flame, #E8A44A glow
- Page white: #F5F1E6 book pages, moon, and plates

## Mechanism

- Five figures move along a fixed S-curve path, one 90-second lap, spaced
  0.13 of the path apart; figure size scales with depth (near figures loom,
  far ones are small). Robes are crimson bells with fold lines and a
  rippling hem; hoods are dark cowls with no faces.
- Each figure carries a candle: a white stick with a teardrop gold flame
  whose flicker is a slow sum of sines (about 1-3 Hz) inside a soft radial
  glow. The lead figure also carries an open page-white book.
- Trees are 15 seeded conifers (mulberry32, seed 1862) in three tiers with
  snow resting on the tier edges. Tree response is a pure function of time:
  bark flushes crimson as a figure's distance to the trunk shrinks, and a
  faint crimson-and-gold ring spreads from the trunk for 7 seconds after a
  figure's most recent pass, computed from the lead figure's path position.
- Snow: 110 seeded flakes drifting down with a slow sinusoidal sway, pure
  function of time. A pale low moon is the only light in the sky.
- The book's fragment is a page-white plate at bottom right, one short
  phrase per lap, cycling: "keep the light", "walk slowly",
  "the snow remembers", "one candle is enough", "do not hurry home".
- Watch only: no pointer handlers, no sound. Hint plate reads "Watch only."

## Frame one

Fixed phase t = 60.0 s. All positions, flushes, rings, flakes, and the
fragment are pure functions of phase time; tree and flake placement uses the
seeded PRNG only. No wall clock, no unseeded Math.random at frame one.

## House rules

- Visual Viewport sizing, resize listened to on both visualViewport and
  window; canvas element pinned in draw() via canvas.style.width/height.
- Phone detection via window.screen (min dimension < 700px) with aspect
  fallback h > w*1.15. Field-like composition: full-bleed on phones, square
  centered on desktop; page ground is the piece's own dusk blue.
- One synchronous frame at load; requestAnimationFrame guarded by a typeof
  check so node-canvas QA works.
- Title/date plate drawn on the canvas: "Burn Into Light",
  "2007 · 02 · 16" (formula date 2002-01-10 + 1863 days). No em dashes in
  visible copy, no AI-signature language.
- node-canvas quirks respected: moveTo before every batched arc/ellipse;
  fading alphas rounded to 4 decimals via the rgba() helper.

## Deviations from the prompt

- Visual-only adaptation (per build brief): no WebAudio and no sound toggle;
  the piece is silent. The tree's "low resonant tone" is shown, not heard:
  bark flushes crimson and a faint ring spreads from the trunk.
- The book's fragments are single short phrases shown in a plate, not spoken
  lore; the text stays abstract and brief.
- Cloth-simulated robes are approximated with a rippling hem and fold lines
  rather than a full cloth simulation.
- A pale moon was added as the only sky light, to keep the dusk readable.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected:
composition reads on desktop (centered square) and mobile (full-bleed),
plates legible, no clipping past edges, thumb reads at small size. First
render showed trees reading as disconnected white chevrons with long bare
trunks; fixed by lowering tier bases, overlapping tiers, and softening the
snow edge to 0.38 alpha, then re-rendered all three sizes clean.
