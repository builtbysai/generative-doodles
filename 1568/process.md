# No.1568 "The God of Water Fleas" (SB1, PP815, #207 senbaku-deconbatch)

Gallery date: 2006 · 04 · 28. Interaction cue: "Tap to reseed the rhythm."
Palette: pale grey ground #DCDCDC; moss rust #8A4A2B, olive #7A7A3A, fresh green #4E7A3A. Nothing else.
md5 index.html: 986e6ef8871eee3fdbe821c2f8c01958
md5 thumb.png: 8bc8d3aebed24b6311775ed9794098ea

## Spec (verbatim from TASKS.md)

A ring of moss growing inward/outward on a pale grey ground: thousands of
tiny dots accreting into coral-like branches, colored by age from deep rust
(oldest, near the seed ring) through olive to fresh green (newest tips). The
growth is radial and rhythmic, not random. Square frame; the moss ring
centered, occupying ~80%, generous pale margin. Motion/interaction:
watch-only. The colony grows over a ~60s loop, then the loop restarts; growth
itself is the motion. Tap anywhere: reseed with a new firing rhythm (new moss
personality). Technical: seed points on a ring; particles fired from outside
along straight lines whose angle doubles each step modulo 2PI; on collision
with the cluster, the particle sticks and the hue advances slightly. Render
each stuck particle as a 2px dot. No random() in the firing rhythm, that is
the whole point. Avoid: Brownian jitter; photorealistic moss; filling the
center (the ring void is the composition). Reference study:
senbaku-deconbatch Poor Man's DLA.

## Deterministic growth schedule

The colony is a pure function of seed only, precomputed once per seed in
buildColony(seed) and cached; draw() only selects how many of the
precomputed dots to show. Nothing is frame-integrated.

- Seed ring: 120 dots evenly spaced on a ring of radius 0.24 * S, where S is
  the square side (min of viewport width/height). The ring void inside it is
  never filled: no particle can stick below the seed ring radius.
- Firing rhythm: theta starts at mulberry32(seed) * 2PI and doubles each
  step modulo 2PI. No Math.random() anywhere in the rhythm.
- Each particle travels straight inward along its ray from radius 0.46 * S.
  It sticks at the first cluster point it comes within STICK (0.0055 * S) of,
  computed exactly: for each cluster point, the ray's closest approach and
  the entry parameter along the ray; the largest entry parameter (first hit
  coming from outside) is the stick point. With no hit it lands on the seed
  ring. Stick radius is clamped to the outer bound 0.41 * S, so the ring
  spans ~80% of the frame.
- Growth schedule: shown = floor(total * loopT / 60), linear in loop time,
  where loopT = (18 + elapsed) % 60. At frame one loopT is 18, so 30% of the
  colony (1,282 of 4,275 dots) is already visible and branches are
  established.
- Age color: dot i is colored by i / shown, so the seed ring is always deep
  rust, the middle always olive, and the newest tips always fresh green at
  every moment of the loop. See Deviations for why the denominator is the
  grown-so-far count rather than the full-loop total.
- Loop: 60 s, then restarts on its own clock. Tap reseeds (seed advances by
  the deterministic LCG seed = seed * 16807 mod 2147483647, never
  Math.random()) and restarts the loop from the tap; the 18 s phase offset
  is kept, so the ring is never empty right after a tap. Tap vs drag is
  separated by a 12 px movement threshold on pointerdown/pointerup.

## Phase-shifted first frame

draw(0) at load renders loopT 18, i.e. 18 s into the 60 s loop: 1,282 dots,
branches established, ring void clearly empty. Verified by the probe state
(elapsed 0, loopT 18, shown 1282, total 4275, seed 815).

## House rules

Visual Viewport sizing (visualViewport with window fallback, resize listened
to on both); canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension < 700 px) with aspect
fallback (h > w * 1.15); centered geometric piece, square on desktop and
phone, page ground is the piece's own #DCDCDC with a dark-ink caption; one
synchronous frame at load; every requestAnimationFrame call guarded by a
typeof check; no em dashes in visible copy; no AI-signature language; no
click-to-reload; no Path2D, no gradients, no shadowBlur; dots are 2 px
fillRects (no batched arcs at all).

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: ring centered, void empty, coral-like branches, rust
  inner ring through olive to green tips, generous pale margin, caption
  legible bottom-left. Clean.
- Mobile 390x844: same square composition centered, no clipping, caption
  fits. Clean.
- Thumb 720x720: same, staged as thumb.png. Clean.
- Determinism: two desktop renders byte-identical (md5
  7f1c6bcd51bd3d5dcd536767d75302fa twice).
- Tap probe (harness driving the piece's own pointer listeners): tap at
  (100, 100) changed seed 815 to 13697705, rebuilt the colony (4,270
  particles), loopT stayed 18, no crash.

## Fix rounds (2)

1. Straight spoke at 3 o'clock. The first desktop render showed one long
   straight dotted line shooting right from the ring to the outer bound. Cause:
   the doubling map dwells near angle 0 (theta, 2*theta, 4*theta ... stay in
   one narrow wedge for several steps), and every particle fired there stuck
   just past the last tip, extending a straight spoke. Fix: a firing whose
   angle is within 0.02 rad of the previous kept firing is skipped. The
   rhythm still advances (k keeps doubling, the angle still doubles each
   step) but the spoke never forms. 45 of 4,200 firings are skipped; the
   colony totals 4,275 dots including the 120-point seed ring.
2. Green tips invisible at frame one. Age was first colored by i / total, so
   at loopT 18 the newest visible dots sat at f = 0.3, in the rust-to-olive
   band, and the whole ring read brown-olive. Fix: color by i / shown, so the
   newest tips are fresh green at every loop time while the seed ring stays
   deep rust. The colony state is still a pure function of loop time and
   seed.

## Deviations from the prompt

- Age color denominator: i / shown instead of i / total (see fix round 2).
  The prompt's "fresh green (newest tips)" would otherwise never appear
  until halfway through the loop; with the relative age the gradient reads
  rust to green across the visible colony at every instant.
- Tap restart keeps the 18 s phase offset: after a tap the new colony is
  shown at loopT 18 rather than from a bare seed ring, so the ring is never
  empty. The loop still restarts from the tap time; only the display phase
  is fixed, the same fixed phase frame one uses.
- Near-duplicate firing angles are skipped (fix round 1): a guard against the
  doubling map's near-zero dwell drawing a straight spoke. The firing angle
  still doubles each step; skipped firings simply do not place a dot.
- Dots are 2 px fillRects rather than arcs; visually identical at this size
  and avoids the node-canvas batched-arc quirk entirely.
