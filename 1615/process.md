# №1615 "Replenishing the Wall" (JL8, jinyao-lin #212, PP862)

## Design
A dark gallery wall (#101014) tiled 4x3 with small generative works in Jinyao Lin's
five line systems: etched alleys, stippled cabins, scallop fields, whorl storms,
blade fans. Every 20 seconds the oldest tile retires and a new system mints into
its slot, after his Art Basel Hong Kong 2022 fxhash installation where visitors
live-minted 1/1 works that appeared on the wall in real time. The wall is never
finished; it is a living surface.

Each tile is a small instance of one of the five mini-systems, drawn from a seed:
alley (converging hatch lines to a vanishing point with receding horizontals and
a doorway), cabin (roof, walls, door, window, chimney, ground line, stipple field
around it), scallop (offset rows of semicircular arcs with a baseline per row),
whorl (two or three Archimedean spirals plus drifting dashes), fan (two or three
blade fans radiating from bases along the bottom edge). Tiles cycle through his
systems' palettes only: paper #F2F1EC/ink #191920, slate #5B7A8C/#DCE6EC,
oxblood #6E2A2E/#1E1416, indigo #2E4A6B/#EFE6D4. Grout is the wall itself
showing through the gaps between tiles.

## Fixed-phase scheduler
Frame one must be byte-reproducible. All tile seeds and the mint schedule are
pure functions of piece time from fixed seeds (mulberry32). Mint counter
m = floor(t/20); the slot being minted is m mod 12, so a full wall cycle is
240 seconds. Slot s shows generation k = m - ((m - s) mod 12); its seed is a
hash of (s, k) and the retiring generation is k - 12, or the fixed initial
seed for the wall's first filling. The minting tile draws in over 2 seconds
(p = clamp((t - k*20)/2, 0, 1)): the old tile crossfades out while the new one
wipes in left to right and plots its strokes in staggered order. At frame one
(t = PHASE = 1.0s) slot 0 is mid-draw at p = 0.5, so the thumbnail shows the
replenishment mechanism in action. Tap reseeds only the tapped slot from a
fixed tap seed sequence (hash of slot and tap count, never Math.random), and
the tapped tile draws in over the same 2 seconds from the tap's piece time.

## Deviations
- The prompt's composition line says "one tile is always mid-draw", while its
  technical approach fixes a 2s draw-in per 20s cycle, so a tile is visibly
  mid-draw only during those 2 seconds. The technical approach wins: the
  draw-in is 2s, and frame one (PHASE 1.0s) catches slot 0 mid-draw. The wall
  is otherwise alive through the 20s retirement cycle.
- No other deviations. No NFT or price language anywhere; interaction is tap
  only, never click-to-reload.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; field-like composition full-bleed on
phones, square on desktop; one synchronous frame at load; requestAnimationFrame
guarded by typeof check; reduced-motion support (static frame at PHASE).
Title "Replenishing the Wall", date "2006 · 06 · 14" (formula date), hint
"Tap a tile to mint one." No em dashes in visible copy.
