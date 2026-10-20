# No.384 Peaceful Birch — process

## Concept

After Jen K's (@jenkbdoodles) cabincore birch forest. Her study
offered the forest in a bright-vs-moody duality; this piece ships
the MOODY variant only: eleven pale birch trunks with black bark
marks rising full-bleed through a deep teal-black ground, a sparse
understory of tiny sage leaves clustered low and mid, gold
leaf-dots falling slowly, and a faint mist band drifting through.
Watch-only and meditative, by design: no interaction, no animals,
no glare, nothing loud.

Palette, closed: ground #0E1A1C, trunks #EFE8DC, bark marks
#1E1E1E, leaves #7A9B76, falling dots #C9A24B. The mist is the
trunk pale at low alpha. Flat colour only.

## Construction

- One canvas, design space 1280x900, cover fit, so the forest is
  full-bleed at any aspect and the ground runs edge to edge.
  Sizing comes from the Visual Viewport API with resize listeners
  on both visualViewport and window; the canvas element is pinned
  by style width/height every frame; phone detection uses the
  window.screen physical size with the tall-aspect fallback.
- Trunks: exactly 11, asserted at load (the prompt's 9-13 resolved
  to a fixed 11). Base positions run from x -140 to 1420, past both
  edges of the design space, so the cover crop is forest at any
  viewport. Each trunk is a sampled tapered form (14 segments,
  base half-width 24-44px for near trunks narrowing to about
  two-thirds at the top, rounded cap, trunk length 1140px from a
  base 80px below the frame), with a slight lean that eases in
  with height squared. Bark marks are seeded per trunk: 11-16
  short horizontal black dashes placed in trunk-local coordinates
  and clipped to the trunk path, so they follow the taper and
  lean. Three trunks (indices 1, 5, 8) are far trunks: narrower
  (half-width 15-22px), drawn first at alpha 0.45 behind the
  mist. Every value comes from a fixed-seed LCG baked at load;
  nothing is random per frame.
- Mist, per the batch adaptation flag: no layer, no offscreen
  canvas. Two sets of wide flat ellipses in the trunk pale drawn
  directly each frame: a back set of 7 at alpha 0.055 (y bands
  230-700) and a front veil of 4 at alpha 0.028 drifting the
  other way. Each set crosses one full wrap span of 1760px per
  30s, and every ellipse is drawn at x, x - SPAN and x + SPAN,
  so the crossing wraps seamlessly across the extended field.
- Leaves: seeded clusters at alternating low (y 640-870) and mid
  (y 380-560) heights across the field: 10 clusters of 6-9 leaves
  fanning upward from a point, plus 16 scattered singles. A leaf
  is a pointed oval (two quadratic curves) in sage with a 1px
  ground-colour vein at low alpha. Static data; the quiet of the
  piece is in the dots, mist and sway.
- Falling dots: exactly 26, asserted. Each owns a phase and a
  whole fall count per loop (1 or 2), so over 60s every dot
  completes only whole falls and wraps seamlessly from bottom
  back to top; the sideways drift runs on the same whole-cycle
  count. Gold, radius 2-3.6px, sparse.
- Loop: 60 seconds. It holds 2 whole trunk-sway cycles of 30s
  (rotation about each trunk's base, plus or minus 0.5 degrees,
  phased per trunk) and 2 whole mist crossings of 30s per set,
  so the loop is seamless.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 11.25s, 0.375 through the sway and mist
  cycles (trunks mid-lean, mist mid-drift) with the dots spread
  through their falls by their phases (mid-fall). The animation
  clock advances from that anchor in fixed 1/60 ticks accumulated
  from rAF timestamps; rAF is typeof-guarded. Frame one never
  reads a wall clock. No pointer handlers exist: watch-only.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png).
- Desktop: eleven trunks across the frame (eight near at full
  pale, three far dimmed behind the mist), bark dashes reading
  as birch marks at all scales, mist bands faint and horizontal,
  gold dots sparse, sage clusters low and mid.
- Thumb: trunks, mist and dots all read at gallery size; the
  moody ground stays continuous.
- Mobile: cover crop keeps the forest full-bleed with whole
  trunks in frame, no letterbox break.
- Thumb rendered twice from the shipped script: byte-identical.
- Grep-verified: no gradients, no shadowBlur, no offscreen
  canvas, no Math.random, no Date.now, no em dashes, no
  absolute URLs.
